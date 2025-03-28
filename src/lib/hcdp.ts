import { promises as fs } from "fs";
import { Isohyets, Station } from "@/lib";
import shp, { FeatureCollectionWithFilename } from 'shpjs';

export async function getDefaultData(): Promise<Station[]> {
  return await fs.readFile(process.cwd() + '/public/data/FinalStationData_Used_json.json', 'utf8')
    .then(file => JSON.parse(file));
}

export async function getIsohyets(): Promise<Isohyets> {
  const inchesSHP = await fs.readFile(process.cwd() + '/public/data/StateIsohyetsSHP_inches.zip');
  const mmSHP = await fs.readFile(process.cwd() + '/public/data/StateIsohyetsSHP_mm.zip');
  // For each FeatureCollectionWithFilename array, indices 0-11 is jan-dec and 12 is annual
  const inchesGeojson: FeatureCollectionWithFilename[] = await shp(inchesSHP) as FeatureCollectionWithFilename[];
  const mmGeojson: FeatureCollectionWithFilename[] = await shp(mmSHP) as FeatureCollectionWithFilename[];
  const sortGeojsons = (a: FeatureCollectionWithFilename, b: FeatureCollectionWithFilename) => {
    if (!a.fileName || !b.fileName) {
      return 0;
    }
    return a.fileName > b.fileName ? 1 : a.fileName < b.fileName ? -1 : 0;
  }
  inchesGeojson.sort(sortGeojsons);
  mmGeojson.sort(sortGeojsons);
  const isohyets: Isohyets = {
    IN: inchesGeojson,
    MM: mmGeojson,
  }
  return isohyets;
}
