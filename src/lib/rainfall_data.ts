import { Isohyets, Station, AsciiData, AsciiGrids } from "@/lib";
import Papa from "papaparse";
import JSZip from "jszip";
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

export async function getInchesAsciiGrids(): Promise<AsciiGrids> {
  return fetchAsciiGridData(`${baseURL}/GISLayers/StateASCIIGrids_inches.zip`);
}

export async function getMMAsciiGrids(): Promise<AsciiGrids> {
  return fetchAsciiGridData(`${baseURL}/GISLayers/StateASCIIGrids_mm.zip`);
}

export async function fetchAsciiGridData(url: string): Promise<AsciiGrids> {
  const asciiZip = await fetch(url)
    .then(res => res.arrayBuffer())
    .then(res => JSZip.loadAsync(res));

  const asciiGrids: AsciiGrids = {};
  
  for (let fileName in asciiZip.files) {
    const file = asciiZip.files[fileName];

    if(file.name.endsWith(".txt")) {
      const dataAsText = await file.async("string");
      const textToParsedData = grabAsciiData(dataAsText);
      asciiGrids[file.name] = textToParsedData;
    }
  }

  return asciiGrids;
}   

//helper func
function grabAsciiData(dataAsText: string): AsciiData {
  const lines = dataAsText.split('\n');
  // Grab only values from metadata/header
  let asciiData: AsciiData = {
    ncols: parseInt(lines[0].split(/\s+/)[1]),
    nrows: parseInt(lines[1].split(/\s+/)[1]),
    xllcorner: parseFloat(lines[2].split(/\s+/)[1]),
    yllcorner: parseFloat(lines[3].split(/\s+/)[1]),
    cellsize: parseFloat(lines[4].split(/\s+/)[1]),
    NODATA_value: parseInt(lines[5].split(/\s+/)[1]),
    gridLocValPair: [],
  }
 
  let i;
  let dataIndex = 0; // Curr grid location, increment for each grid that's parsed
  // Iterate over each line, and each value of all lines
  for(i = 6; i < lines.length; i++) {
    const lineValues = lines[i].trim().split(/\s+/);

    let j;
    for(j = 0; j < lineValues.length; j++) {
      const currGridVal = parseFloat(lineValues[j]);
      if(currGridVal !== asciiData.NODATA_value && !isNaN(currGridVal)) {
        asciiData.gridLocValPair.push([dataIndex, currGridVal]); // [grid loc, value (from range min to max)]
      }
      dataIndex++;
    }
  }

  return asciiData;
}
