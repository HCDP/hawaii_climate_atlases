import { promises as fs } from "fs";
import { Station } from "@/lib";
import shp, { FeatureCollectionWithFilename } from 'shpjs';

export async function getDefaultData(): Promise<Station[]> {
  return await fs.readFile(process.cwd() + '/public/data/FinalStationData_Used_json.json', 'utf8')
    .then(file => JSON.parse(file));
}

export async function getIsohyets(): Promise<FeatureCollectionWithFilename[]> {
  const data = await fs.readFile(process.cwd() + '/public/data/StateIsohyetsSHP_inches.zip');
  const geojson: FeatureCollectionWithFilename[] = await shp(data) as FeatureCollectionWithFilename[];
  return geojson; // indices 0-11 is jan-dec, 12 is annual
}
