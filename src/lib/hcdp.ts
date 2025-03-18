import { promises as fs } from "fs";
import { Station } from "@/lib";
import shp, { FeatureCollectionWithFilename } from 'shpjs';

export async function getDefaultData(): Promise<Station[]> {
  return await fs.readFile(process.cwd() + '/public/data/FinalStationData_Used_json.json', 'utf8')
    .then(file => JSON.parse(file));
}

export async function getSHP(): Promise<FeatureCollectionWithFilename | FeatureCollectionWithFilename[]> {
  const data = await fs.readFile(process.cwd() + '/public/data/OahuIsohyetsSHP_mm.zip');
  const geojson = await shp(data);
  console.log(typeof geojson);
  return geojson;
  // const geojsons: FeatureCollectionWithFilename[] = [];
  // const oahuGeojson: FeatureCollectionWithFilename = await shp(data);
  // geojsons.push(oahuGeojson);
  // return geojsons;
}
