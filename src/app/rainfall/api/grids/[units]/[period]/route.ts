import { NextRequest, NextResponse } from 'next/server';
import { getCachedFileBuffer } from "@/lib/data_cache";
import path from 'path';
import { AsciiGrid, Period, Units } from "@/lib";
import JSZip from "jszip";
import { isUnits, isPeriod } from "@/utils";
import { invalidUnitsResponse, invalidPeriodResponse } from "@/lib/responses";

const CACHE_PATH = path.join('rainfall', 'raw');

const IN_GRIDS_FILE_NAME = 'StateASCIIGrids_inches.zip';
const IN_GRIDS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_inches.zip');

const MM_GRIDS_FILE_NAME = 'StateASCIIGrids_mm.zip';
const MM_GRIDS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_mm.zip');

export async function GET(_: NextRequest, { params }: {
  params: {
    units: string,
    period: string,
  },
}): Promise<NextResponse<{ error: string } | AsciiGrid>> {
  const units: string = params.units;
  if (!isUnits(units)) return invalidUnitsResponse;
  const period: string = params.period;
  if (!isPeriod(period)) return invalidPeriodResponse;
  let fileName, fetchUrl;
  if (units === Units.IN) {
    fileName = IN_GRIDS_FILE_NAME;
    fetchUrl = IN_GRIDS_FILE_URL;
  } else if (units === Units.MM) {
    fileName = MM_GRIDS_FILE_NAME;
    fetchUrl = MM_GRIDS_FILE_URL;
  } else {
    return invalidUnitsResponse;
  }

  const gridsFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!gridsFileBuffer) {
    return NextResponse.json({ error: 'Unable to retrieve the requested information.' }, { status: 503 });
  }

  const desiredPeriod = Period[period as keyof typeof Period];
  const asciiGrids: AsciiGrid = await JSZip.loadAsync(gridsFileBuffer)
    .then(asciiZip => fetchAsciiGridData(asciiZip, desiredPeriod));

  return NextResponse.json(asciiGrids, { status: 200 });
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
