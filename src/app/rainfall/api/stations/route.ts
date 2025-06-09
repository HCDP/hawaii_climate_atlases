import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import Papa from "papaparse";
import { Station } from "@/lib";
import { getCachedFileBuffer } from "@/lib/data_cache";
import { unableToRetrieveResponse } from "@/lib/responses";

const CACHE_PATH = path.join('rainfall', 'raw');

const STATIONS_FILE_NAME = 'FinalStationData_Used_csv.csv';
const STATIONS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used_csv.csv');

const OTHER_STATIONS_FILE_NAME = 'FinalStations_NotUsed_csv.csv';
const OTHER_STATIONS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed_csv.csv');

export async function GET(request: NextRequest): Promise<NextResponse<{ error: string } | Station[]>> {
  const searchParams = request.nextUrl.searchParams;
  // valid filters: "all" | "used" | "other"
  const filter = searchParams.get('filter');

  const includeUsedStations: boolean = !filter || filter === 'all' || filter === 'used';
  const includeOtherStations: boolean = filter === 'all' || filter === 'other';

  let stations: Station[] = [];
  if (includeUsedStations) {
    const usedStations: Station[] | null = await getStations(STATIONS_FILE_URL, CACHE_PATH, STATIONS_FILE_NAME);
    if (!usedStations) {
      return unableToRetrieveResponse;
    }
    stations = stations.concat(usedStations);
  }
  if (includeOtherStations) {
    const otherStations: Station[] | null = await getStations(OTHER_STATIONS_FILE_URL, CACHE_PATH, OTHER_STATIONS_FILE_NAME);
    if (!otherStations) {
      return unableToRetrieveResponse;
    }
    stations = stations.concat(otherStations);
  }
  return NextResponse.json(stations, { status: 200 });
}

async function getStations(fetchUrl: string | URL, cachePath: string = '', fileName: string): Promise<Station[] | null> {
  const stationsFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, cachePath, fileName);
  if (!stationsFileBuffer) {
    console.error("Error fetching CSV data");
    return null;
  }

  try {
    const stations: Station[] = await new Promise((resolve, reject) => {
      Papa.parse(stationsFileBuffer.toString('utf-8'), {
        worker: true,
        header: true, // treats top line of CSV as names for columns
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as Station[]),
        error: (error: never) => reject(error),
      });
    });
    return stations;
  } catch (error) {
    console.error("Error parsing CSV data", error);
    return null;
  }
}
