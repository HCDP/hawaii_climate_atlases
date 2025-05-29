import { promises as fs } from 'fs';
import path from 'path';

const CACHE_BASE_PATH = path.join('public', 'data');

export async function getCachedFileBuffer(fetchUrl: string | URL, cachePath: string = '', fileName: string): Promise<Buffer | null> {
  const filePath: string = path.join(process.cwd(), CACHE_BASE_PATH, cachePath, fileName);

  // if the file has already been cached, use it
  try {
    return await fs.readFile(filePath);
  } catch (e) {
    console.log(`Could not read cached file, either an error occurred or the file had not been cached yet. Will fetch data from ${fetchUrl}.`, e);
  }
  // the file was not cached, so fetch it and cache it
  try {
    const response: Response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`Error fetching ${fetchUrl}.`);
    }
    const fetchedData: Buffer = Buffer.from(await response.arrayBuffer());
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, fetchedData);
    return fetchedData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
