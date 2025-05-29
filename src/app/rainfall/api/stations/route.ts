import { NextResponse } from 'next/server';
import path from 'path';
import Papa from "papaparse";
import { Station } from "@/lib";
import { getCachedFileBuffer } from "@/lib/data_cache";

const CACHE_PATH = path.join('rainfall', 'raw');
const STATIONS_FILE_NAME = 'FinalStationData_Used_csv.csv';
const STATIONS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used_csv.csv');

export async function GET(): Promise<NextResponse<Station[] | null>> {
  const data: Buffer | null = await getCachedFileBuffer(STATIONS_FILE_URL, CACHE_PATH, STATIONS_FILE_NAME);
  if (!data) {
    return NextResponse.json(null, { status: 503 });
  }

  try {
    const stations: Station[] = await new Promise((resolve, reject) => {
      Papa.parse(data.toString('utf-8'), {
        worker: true,
        header: true, // treats top line of CSV as names for columns
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as Station[]),
        error: (error: never) => reject(error),
      });
    });
    return NextResponse.json(stations, { status: 200 });
  } catch (error) {
    console.error("Error fetching CSV data", error);
    return NextResponse.json(null, { status: 500 });
  }
}
