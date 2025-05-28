import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_PATH = path.join('public', 'data', 'rainfall', 'raw');
const FILE_NAME = 'FinalStationData_Used_csv.csv';
const FETCH_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used_csv.csv');

export async function GET(): Promise<NextResponse<string>> {
  const cachedFilePath: string = path.join(process.cwd(), CACHE_PATH);
  const cachedFile: string = path.join(cachedFilePath, FILE_NAME);

  let data: string | undefined = undefined;
  // if the file has already been cached, return it
  try {
    const file = await fs.readFile(cachedFile);
    data = file.toString();
    return new NextResponse(data, { status: 200 });
  } catch (e) {
    console.log('Could not read cached file, either an error occured or the file had not been cached yet.', e);
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
    return new NextResponse(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(null, { status: 503 });
  }
}
