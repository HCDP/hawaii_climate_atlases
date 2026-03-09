import { AsciiGrid, Period, Month, Hour, Units } from "@/lib/types";
import { getCachedFileBuffer } from "@/lib/data_cache";
import path from "path";
import JSZip from "jszip";

const CACHE_PATH = path.join('evap', 'raw');

// const BASE_URL = 'https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/';
 
const IN_AET_ANN_HR_NAME = "AET_in_ann_hr_ascii.zip";
const IN_AET_ANN_HR_URL = new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_in_ann_hr_ascii.zip');

const MM_AET_ANN_HR_NAME = "AET_mm_ann_hr_ascii.zip";
const MM_AET_ANN_HR_URL = new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_mm_ann_hr_ascii.zip');
 
const IN_AET_MON_NAME = "AET_in_month_ascii.zip";
const IN_AET_MON_URL = new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_in_month_ascii.zip');

const IN_AET_MON_HR_NAME = "AET_in_month_hr_ascii.zip";
const IN_AET_MON_HR_URL = new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_in_month_hr_ascii.zip');

// helper func parses the ascii files
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

/* 
Gets all ascii data from zip file
Calls helper func (grabAsciiData) above to parse the ascii data
*/
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

// need to alter so that it can read multiple files
export async function getAETGrids({
  units,
  period,
  // month,
  // hour,
}: {
  units: Units,
  period: Period,
  // month: Month,
  // hour: Hour,
}) {
  let fileName, fetchUrl;
  if (units === Units.IN) {
    fileName = IN_AET_ANN_HR_NAME;
    fetchUrl = IN_AET_ANN_HR_URL;
  } else if (units === Units.MM) {
    fileName = MM_AET_ANN_HR_NAME;
    fetchUrl = MM_AET_ANN_HR_URL;
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
