"use client"

import { AsciiGrid, Grids, Isohyets, Station } from "@/lib";
import JSZip from "jszip";
import shp, { FeatureCollectionWithFilename } from "shpjs";

// const baseURL = 'https://atlas.uhtapis.org/rainfall/assets/files';

export async function getStations(): Promise<Station[]> {
  return await fetch('/api/stations').then(res => res.json());
}

export async function getOtherStations(): Promise<Station[]> {
  return await fetch('/api/other_stations').then(res => res.json());
}

export async function getIsohyets(): Promise<Isohyets> {
  const inchesSHP = await fetch(`/api/in_isohyets`)
    .then(res => res.arrayBuffer());
  const mmSHP = await fetch(`/api/mm_isohyets`)
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

export async function getGrids(): Promise<Grids> {
  const inchesAsciiGrids: AsciiGrid[] = await fetchAsciiGridData(`/api/in_grids`);
  const mmAsciiGrids: AsciiGrid[] = await fetchAsciiGridData(`/api/mm_grids`);
  const grids = {
    IN: inchesAsciiGrids,
    MM: mmAsciiGrids,
  }
  return grids;
}

export async function fetchAsciiGridData(url: string): Promise<AsciiGrid[]> {
  const asciiZip = await fetch(url)
    .then(res => res.arrayBuffer())
    .then(res => JSZip.loadAsync(res));

  const asciiGrids: AsciiGrid[] = [];
  const fileNames = Object.keys(asciiZip.files)
    .filter(fileName => fileName.endsWith(".txt"))
    .sort();
  // for (const fileName of fileNames) {
  //   const file = asciiZip.files[fileName];
  //   const dataAsText = await file.async("string");
  //   const textToParsedData = grabAsciiData(dataAsText);
  //   asciiGrids.push(textToParsedData);
  // }

  /* TODO: Temporarily only returning the annual data. Returning all the data together makes everything slow,
      need to figure out how to fix this. */
  const fileName = fileNames[12];
  const file = asciiZip.files[fileName];
  const dataAsText = await file.async("string");
  const textToParsedData = grabAsciiData(dataAsText);
  asciiGrids.push(textToParsedData);

  return asciiGrids;
}

//helper func
function grabAsciiData(dataAsText: string): AsciiGrid {
  const lines = dataAsText.split('\n');
  // Grab only values from metadata/header
  const asciiGrid: AsciiGrid = {
    header: {
      ncols: parseInt(lines[0].split(/\s+/)[1]),
      nrows: parseInt(lines[1].split(/\s+/)[1]),
      xllcorner: parseFloat(lines[2].split(/\s+/)[1]),
      yllcorner: parseFloat(lines[3].split(/\s+/)[1]),
      cellsize: parseFloat(lines[4].split(/\s+/)[1]),
      NODATA_value: parseInt(lines[5].split(/\s+/)[1]),
    },
    values: {},
  }
  let i;
  let currGridIndex = 0; // Curr grid location, increment for each grid that's parsed
  // Iterate over each line, and each value of all lines
  for(i = 6; i < lines.length; i++) {
    const lineValues = lines[i].trim().split(/\s+/);

    let j;
    for(j = 0; j < lineValues.length; j++) {
      const currGridVal = parseFloat(lineValues[j]);
      if(currGridVal !== asciiGrid.header.NODATA_value && !isNaN(currGridVal)) {
        asciiGrid.values[currGridIndex] = currGridVal; // [grid loc, value (from range min to max)]
      }
      currGridIndex++;
    }
  }

  return asciiGrid;
}
