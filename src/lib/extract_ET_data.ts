import { AsciiGrid, Month, Hour, Units } from "@/lib/types";
import { getCachedFileBuffer } from "@/lib/data_cache";
import path from "path";
import JSZip from "jszip";

const CACHE_PATH = path.join('evap', 'raw');

const BASE_URL = 'https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/';
const MAX_CACHED_ARCHIVES = 3;
const archiveCache = new Map<string, Promise<JSZip | null>>();

const FILE_NAMES: Record<string, string> = {
  'Evapotranspiration': 'AET',
  'Transpiration': 'Transpiration',
  'Wet-Canopy Evaporation': 'WetCanopyEvaporation',
  'Soil Evaporation': 'SoilEvaporation',
  'Grass Reference Surface Potential ET': 'GrassReferenceET0',
  'Penman-Monteith Potential ET': 'PenmanET0',
  'Priestly-Taylor Potential ET': 'PriestlyET0',
  // 'Latent Energy': 'AET', uses AET wm2 files
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

function getAsciiArchive(fileName: string, fetchUrl: URL): Promise<JSZip | null> {
  const cachedArchive = archiveCache.get(fileName);
  if (cachedArchive) {
    archiveCache.delete(fileName);
    archiveCache.set(fileName, cachedArchive);
    return cachedArchive;
  }

  const archivePromise = getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName)
    .then(buffer => buffer ? JSZip.loadAsync(buffer) : null)
    .catch(error => {
      archiveCache.delete(fileName);
      throw error;
    });

  archiveCache.set(fileName, archivePromise);
  if (archiveCache.size > MAX_CACHED_ARCHIVES) {
    const oldestArchive = archiveCache.keys().next().value;
    if (oldestArchive) archiveCache.delete(oldestArchive);
  }

  return archivePromise;
}

function findGridFileName(asciiZip: JSZip, month: Month, hour: Hour): string {
  const fileNames = Object.keys(asciiZip.files)
    .filter(fileName => fileName.endsWith(".txt"))
    .sort();
  const fileName = fileNames.find(name => {
    const matchesMonth = name.includes(MONTH_SUFFIX[month]);
    const matchesHour = name.includes(`${hour}`);
    if (hour !== Hour.HR_00 && month !== Month.Annual) return matchesMonth && matchesHour;
    if (hour !== Hour.HR_00 && month === Month.Annual) return matchesHour;
    return matchesMonth;
  });
  if (!fileName) throw new Error(`No file found for month: ${month}, hour: ${hour}`);
  return fileName;
}

function getAsciiPointValue(dataAsText: string, latitude: number, longitude: number): number | null {
  const lines = dataAsText.split(/\r?\n/);
  const headerValue = (line: string | undefined) => {
    if (!line) return NaN;
    const fields = line.trim().split(/\s+/);
    return Number(fields[fields.length - 1]);
  };
  const ncols = headerValue(lines[0]);
  const nrows = headerValue(lines[1]);
  const xllcorner = headerValue(lines[2]);
  const yllcorner = headerValue(lines[3]);
  const cellsize = headerValue(lines[4]);
  const nodataValue = headerValue(lines[5]);
  const column = Math.floor((longitude - xllcorner) / cellsize);
  const row = Math.floor(nrows - (latitude - yllcorner) / cellsize);

  if (column < 0 || column >= ncols || row < 0 || row >= nrows) return null;
  const rowValues = lines[row + 6]?.trim().split(/\s+/);
  const value = Number(rowValues?.[column]);
  return Number.isFinite(value) && value !== nodataValue ? value : null;
}

function getAETArchiveSource(units: Units, month: Month, hour: Hour, varName: string) {
  let filePrefix = FILE_NAMES[varName];
  let unitPrefix: string | null = units === Units.IN ? 'in' : units === Units.MM ? 'mm' : units === Units.WM2 ? 'wm2' : null;

  if (varName === 'Latent Energy') {
    filePrefix = 'AET';
    unitPrefix = 'wm2';
  }
  if (!filePrefix) {
    filePrefix = FILE_NO_UNITS[varName];
    unitPrefix = '';
  }
  if (!filePrefix) filePrefix = FILE_EXCEPTIONS[varName];
  if (!filePrefix) throw new Error(`Variable name ${varName} not found in file mappings.`);
  if (!unitPrefix) return null;

  const fileName = hour === Hour.HR_00
    ? `${filePrefix}_${unitPrefix}_month_ascii.zip`
    : month === Month.Annual
      ? `${filePrefix}_${unitPrefix}_ann_hr_ascii.zip`
      : `${filePrefix}_${unitPrefix}_month_hr_ascii.zip`;
  return { fileName, fetchUrl: new URL(`${BASE_URL}${fileName}`) };
}

async function getAETPointValue(
  units: Units,
  month: Month,
  hour: Hour,
  varName: string,
  latitude: number,
  longitude: number,
): Promise<number | null> {
  const source = getAETArchiveSource(units, month, hour, varName);
  if (!source) return null;

  const asciiZip = await getAsciiArchive(source.fileName, source.fetchUrl);
  if (!asciiZip) return null;

  const fileName = findGridFileName(asciiZip, month, hour);
  const dataAsText = await asciiZip.files[fileName].async("string");
  return getAsciiPointValue(dataAsText, latitude, longitude);
}

export async function getAETPointValues({
  units,
  varName,
  latitude,
  longitude,
}: {
  units: Units,
  varName: string,
  latitude: number,
  longitude: number,
}): Promise<{ monthly: (number | null)[], hourly: (number | null)[] }> {
  const months = [
    Month.January,
    Month.February,
    Month.March,
    Month.April,
    Month.May,
    Month.June,
    Month.July,
    Month.August,
    Month.September,
    Month.October,
    Month.November,
    Month.December,
    Month.Annual,
  ];
  const hours = Object.values(Hour).filter(hour => hour !== Hour.HR_00);
  const values = await Promise.all([
    ...months.map(month => getAETPointValue(units, month, Hour.HR_00, varName, latitude, longitude)),
    ...hours.map(hour => getAETPointValue(units, Month.Annual, hour, varName, latitude, longitude)),
  ]);

  return {
    monthly: values.slice(0, months.length),
    hourly: values.slice(months.length),
  };
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

  // Latent Energy uses AET wm2 files
  if (varName === 'Latent Energy') {
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

  const asciiZip = await getAsciiArchive(fileName, fetchUrl);
  if (!asciiZip) {
    return null;
  }

  const asciiGrids: AsciiGrid = await fetchAsciiGridData(asciiZip, month, hour);

  console.log(`AET zip file used: ${fileName}; units: ${units}; month: ${month}; hour: ${hour}; var: ${varName}; internal file: ${(asciiGrids.header as any).sourceFileName}`);

  return asciiGrids;
}
