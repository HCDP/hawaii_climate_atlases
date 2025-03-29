import { Isohyets, Station } from "@/lib";
import Papa from "papaparse";
import shp, { FeatureCollectionWithFilename } from "shpjs";

const baseURL = 'https://atlas.uhtapis.org/rainfall/assets/files';

export async function getStations(): Promise<Station[]> {
  return fetchStations(`${baseURL}/Tabular/FinalStationData_Used_csv.csv`);
}

export async function getOtherStations(): Promise<Station[]> {
  return fetchStations(`${baseURL}/Tabular/FinalStations_NotUsed_csv.csv`);
}

async function fetchStations(url: string): Promise<Station[]> {
  try {
    const response = await fetch(url);
    const dataAsText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(dataAsText, {
        worker: true,
        header: true, // treats top line of CSV as names for columns
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as Station[]),
        error: (error: never) => reject(error),
      });
    })
    
  } catch (error) {
    console.error("Error fetching CSV data", error);
    return [];
  }
}

export async function getIsohyets(): Promise<Isohyets> {
  const inchesSHP = await fetch(`${baseURL}/GISLayers/StateIsohyetsSHP_inches.zip`)
    .then(res => res.arrayBuffer());
  const mmSHP = await fetch(`${baseURL}/GISLayers/StateIsohyetsSHP_mm.zip`)
    .then(res => res.arrayBuffer());
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
