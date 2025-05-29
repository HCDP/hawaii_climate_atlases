import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import Papa from "papaparse";
import { Station } from "@/lib";

const CACHE_PATH = path.join('public', 'data', 'rainfall', 'raw');
const FILE_NAME = 'FinalStations_NotUsed_csv.csv';
const FETCH_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed_csv.csv');

export async function GET(): Promise<NextResponse<Station[] | null>> {
  const cachedFilePath: string = path.join(process.cwd(), CACHE_PATH);
  const cachedFile: string = path.join(cachedFilePath, FILE_NAME);

  let data: string;
  // if the file has already been cached, use it
  try {
    const file = await fs.readFile(cachedFile);
    data = file.toString();
  } catch (e) {
    console.log('Could not read cached file, either an error occurred or the file had not been cached yet.', e);
  }

  // the file was not cached, so fetch it and cache it
  try {
    const response = await fetch(FETCH_URL);
    if (!response.ok) {
      throw new Error(`Error fetching ${FETCH_URL}.`);
    }
    const fetchedData = await response.text();
    await fs.mkdir(cachedFilePath, { recursive: true });
    await fs.writeFile(cachedFile, fetchedData);
    data = fetchedData;
  } catch (e) {
    console.error(e);
    return NextResponse.json(null, { status: 503 });
  }

  try {
    const stations: Station[] = await new Promise((resolve, reject) => {
      Papa.parse(data, {
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
