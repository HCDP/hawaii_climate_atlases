import { AsciiGrid, Month, Hour, Units } from "@/lib/types";
import { getCachedFileBuffer } from "@/lib/data_cache";
import path from "path";
import JSZip from "jszip";

const CACHE_PATH = path.join('evap', 'raw');

const BASE_URL = 'https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/';

const FILE_NAMES: Record<string, string> = {
  'Evapotranspiration': 'AET',
  'Transpiration': 'Transpiration',
  'Wet-Canopy Evaporation': 'WetCanopyEvaporation',
  'Soil Evaporation': 'SoilEvaporation',
  'Grass Reference Surface Potential ET': 'GrassReferenceET0',
  'Penman-Monteith Potential ET': 'PenmanET0',
  'Priestly-Taylor Potential ET': 'PriestlyET0',
  // 'Latent Heat Flux': 'AET', can't find file (maybe w/m^2)
};

// no units in file name (only one unit is used)
const FILE_NO_UNITS: Record<string, string> = {
  'Solar Radiation': 'SolarRadiation', // no units
  'Clear Sky Radiation': 'ClearSkyRadiation',
  'Cloud Frequency': 'CloudFreq',
  'Net Radiation': 'RNet',
  'Air Temperature': 'Tair',
  'Relative Humidity': 'RH',
  'Vapor Pressure Deficit': 'VPD',
};

// only one file
const FILE_EXCEPTIONS: Record<string, string> = {
  'Wind Speed': 'WindSpeed',
  'Albedo': 'Albedo'
};

const MONTH_SUFFIX: Record<Month, string> = {
  [Month.January]: 'jan',
  [Month.February]: 'feb',
  [Month.March]: 'mar',
  [Month.April]: 'apr',
  [Month.May]: 'may',
  [Month.June]: 'jun',
  [Month.July]: 'jul',
  [Month.August]: 'aug',
  [Month.September]: 'sep',
  [Month.October]: 'oct',
  [Month.November]: 'nov',
  [Month.December]: 'dec',
  [Month.Annual]: 'ann',
};

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
async function fetchAsciiGridData(asciiZip: JSZip, month: Month, hour: Hour): Promise<AsciiGrid> {
  const fileNames = Object.keys(asciiZip.files)
    .filter(fileName => fileName.endsWith(".txt"))
    .sort();

  // doesn't include varName since the file naming convention is different than the name of the zip file
  const fileName = fileNames.find(name => {
    const matchesMonth = name.includes(MONTH_SUFFIX[month]);
    const matchesHour = name.includes(`${hour}`);
    
    // For month + hour (e.g. aet_in_jan_01.txt) NOT annual
    if (hour !== Hour.HR_00 && month !== Month.Annual) {
      return matchesMonth && matchesHour;
    
    // For annual + hour (e.g. aetc_in_01.txt) since annual_hr has it's own zip
    } else if (hour !== Hour.HR_00 && month === Month.Annual) {
      return matchesHour;

    // For month + 00HR (which is all hours) (e.g. aet_in_jan_.txt)
    } else 
    return matchesMonth;
  });
  if (!fileName) {
    throw new Error(`No file found for month: ${month}, hour: ${hour}`);
  }
  const file = asciiZip.files[fileName];
  const dataAsText = await file.async("string");
  console.log(`Loading ${fileName}`);
  const asciiGrids = grabAsciiData(dataAsText);
  // annotate with source filename so clients can confirm which file was used
  (asciiGrids.header as any).sourceFileName = fileName;
  return asciiGrids;
}


// need to alter so that it can read multiple files
export async function getAETGrids({
  units,
  month,
  hour,
  varName,
}: {
  units: Units,
  month: Month,
  hour: Hour,
  varName: string,
}) {
  let fileName, fetchUrl;

  let filePrefix = FILE_NAMES[varName];
  let unitPrefix = units === Units.IN ? 'in' : units === Units.MM ? 'mm' : units === Units.WM2 ? 'wm2' : null;

  // file name convention doesn't work for Latent Heat Flux
  if (varName === 'Latent Heat Flux') {
    filePrefix = 'AET';
    unitPrefix = 'wm2';
  }

  // some variables don't have unit-specific files (e.g. Solar Radiation)
  if (!filePrefix) {
    filePrefix = FILE_NO_UNITS[varName];
    unitPrefix = ''; // no unit in file name
  }

  // only one file
  if (!filePrefix) {
    filePrefix = FILE_EXCEPTIONS[varName];
  }
  
  if (!filePrefix) {
    throw new Error(`Variable name ${varName} not found in file mappings.`);
  }

  if (!unitPrefix) return null;

  if (hour === Hour.HR_00) {
    fileName = `${filePrefix}_${unitPrefix}_month_ascii.zip`;
    fetchUrl = new URL(`${BASE_URL}${fileName}`);
  } else if (month === Month.Annual) {
    fileName = `${filePrefix}_${unitPrefix}_ann_hr_ascii.zip`;
    fetchUrl = new URL(`${BASE_URL}${fileName}`);
  } else {
    fileName = `${filePrefix}_${unitPrefix}_month_hr_ascii.zip`;
    fetchUrl = new URL(`${BASE_URL}${fileName}`);
  }

  const gridsFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!gridsFileBuffer) {
    return null;
  }

  const asciiGrids: AsciiGrid = await JSZip.loadAsync(gridsFileBuffer)
    .then(asciiZip => fetchAsciiGridData(asciiZip, month, hour));

  console.log(`AET zip file used: ${fileName}; units: ${units}; month: ${month}; hour: ${hour}; var: ${varName}; internal file: ${(asciiGrids.header as any).sourceFileName}`);

  return asciiGrids;
}
