import { AsciiGrid, Period, Station, Units } from "@/lib/types";
import { getCachedFileBuffer } from "@/lib/data_cache";
import Papa from "papaparse";
import shp, { FeatureCollectionWithFilename } from "shpjs";
import { FeatureCollection } from "geojson";
import path from "path";
import JSZip from "jszip";

const CACHE_PATH = path.join('rainfall', 'raw');

const STATIONS_FILE_NAME = 'FinalStationData_Used_csv.csv';
const STATIONS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used_csv.csv');

const OTHER_STATIONS_FILE_NAME = 'FinalStations_NotUsed_csv.csv';
const OTHER_STATIONS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed_csv.csv');

const IN_ISOHYETS_FILE_NAME = 'StateIsohyetsSHP_inches.zip';
const IN_ISOHYETS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_inches.zip');

const MM_ISOHYETS_FILE_NAME = 'StateIsohyetsSHP_mm.zip';
const MM_ISOHYETS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_mm.zip');

const IN_GRIDS_FILE_NAME = 'StateASCIIGrids_inches.zip';
const IN_GRIDS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_inches.zip');

const MM_GRIDS_FILE_NAME = 'StateASCIIGrids_mm.zip';
const MM_GRIDS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_mm.zip');

export async function getStations({
  other
}: {
  other?: boolean
}): Promise<Station[] | null> {
  let fetchUrl: URL, fileName: string;
  if (!other) {
    fetchUrl = STATIONS_FILE_URL;
    fileName = STATIONS_FILE_NAME;
  } else {
    fetchUrl = OTHER_STATIONS_FILE_URL;
    fileName = OTHER_STATIONS_FILE_NAME;
  }

  const stationsFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!stationsFileBuffer) {
    console.error("Error fetching CSV data");
    return null;
  }

  try {
    const stations: Station[] = await new Promise((resolve, reject) => {
      Papa.parse(stationsFileBuffer.toString('utf-8'), {
        worker: true,
        header: true, // treats top line of CSV as names for columns
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as Station[]),
        error: (error: never) => reject(error),
      });
    });
    stations.forEach((station) => {
      Object.values(station).forEach(value => {
        if ((value as string).includes("*")) {
          console.log(station.Name, value);
        }
      });
    });
    return stations;
  } catch (error) {
    console.error("Error parsing CSV data", error);
    return null;
  }
}

export async function getIsohyets({
  units
}: {
  units: Units
}): Promise<FeatureCollection[] | null> {
  let fileName, fetchUrl;
  if (units === Units.IN) {
    fileName = IN_ISOHYETS_FILE_NAME;
    fetchUrl = IN_ISOHYETS_FILE_URL;
  } else if (units === Units.MM) {
    fileName = MM_ISOHYETS_FILE_NAME;
    fetchUrl = MM_ISOHYETS_FILE_URL;
  } else {
    return null;
  }

  const shpFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!shpFileBuffer) {
    return null;
  }

  let geojson: FeatureCollectionWithFilename | FeatureCollectionWithFilename[] = await shp(shpFileBuffer);
  if (!Array.isArray(geojson)) {
    geojson = [geojson];
  } else {
    const sortGeojsons = (a: FeatureCollectionWithFilename, b: FeatureCollectionWithFilename) => {
      if (!a.fileName || !b.fileName) {
        return 0;
      }
      return a.fileName > b.fileName ? 1 : a.fileName < b.fileName ? -1 : 0;
    }
    geojson.sort(sortGeojsons);
    geojson.forEach(g => delete g.fileName);
  }
  return geojson;
}

export async function getGrids({
  units,
  period,
}: {
  units: Units,
  period: Period
}) {
  let fileName, fetchUrl;
  if (units === Units.IN) {
    fileName = IN_GRIDS_FILE_NAME;
    fetchUrl = IN_GRIDS_FILE_URL;
  } else if (units === Units.MM) {
    fileName = MM_GRIDS_FILE_NAME;
    fetchUrl = MM_GRIDS_FILE_URL;
  } else {
    return null;
  }

  const gridsFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!gridsFileBuffer) {
    return null;
  }

  const asciiGrids: AsciiGrid = await JSZip.loadAsync(gridsFileBuffer)
    .then(asciiZip => fetchAsciiGridData(asciiZip, period));

  return asciiGrids;
}

async function fetchAsciiGridData(asciiZip: JSZip, period: Period): Promise<AsciiGrid> {
  const fileNames = Object.keys(asciiZip.files)
    .filter(fileName => fileName.endsWith(".txt"))
    .sort();

  const fileName = fileNames[period];
  const file = asciiZip.files[fileName];
  const dataAsText = await file.async("string");
  const asciiGrids = grabAsciiData(dataAsText);
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
  for (i = 6; i < lines.length; i++) {
    const lineValues = lines[i].trim().split(/\s+/);

    let j;
    for (j = 0; j < lineValues.length; j++) {
      const currGridVal = parseFloat(lineValues[j]);
      if (currGridVal !== asciiGrid.header.NODATA_value && !isNaN(currGridVal)) {
        asciiGrid.values[currGridIndex] = currGridVal; // [grid loc, value (from range min to max)]
      }
      currGridIndex++;
    }
  }

  return asciiGrid;
}
