import { AsciiGrid, Period } from "@/lib/types";
import JSZip from "jszip";
import path from "path";
import { promises as fs } from 'fs';

// Solar radiation ZIP file paths (relative to project root)
const SOLAR_RADIATION_FILE_PATH = path.join(process.cwd(), 'public', 'variables', 'data', 'Solar Radiation', 'MONTHLY', 'SolarRadiation_month_ascii.zip');
const DIFFUSE_RADIATION_FILE_PATH = path.join(process.cwd(), 'public', 'variables', 'data', 'Solar Radiation', 'MONTHLY', 'DiffuseRadiation_month_ascii.zip');
const LONGWAVE_DOWN_FILE_PATH = path.join(process.cwd(), 'public', 'variables', 'data', 'Solar Radiation', 'MONTHLY', 'LWDown_month_ascii.zip');
const LONGWAVE_UP_FILE_PATH = path.join(process.cwd(), 'public', 'variables', 'data', 'Solar Radiation', 'MONTHLY', 'LWUp_month_ascii.zip');
const NET_RADIATION_FILE_PATH = path.join(process.cwd(), 'public', 'variables', 'data', 'Solar Radiation', 'MONTHLY', 'RNet_month_ascii.zip');

// Month mapping: Period (0-11) to month abbreviations
const MONTH_TO_ABBREV: Record<number, string> = {
  0: 'jan', 1: 'feb', 2: 'mar', 3: 'apr', 4: 'may', 5: 'jun',
  6: 'jul', 7: 'aug', 8: 'sep', 9: 'oct', 10: 'nov', 11: 'dec',
  12: 'ann' // Annual
};

/**
 * Extract ASCII grid data from ZIP archive
 * Solar radiation files use month abbreviations: r_net_jan.txt, r_net_feb.txt, etc.
 */
async function extractAsciiFromZip(zipBuffer: Buffer, period: Period): Promise<AsciiGrid | null> {
  try {
    const zip = await JSZip.loadAsync(zipBuffer);
    const fileNames = Object.keys(zip.files).filter(name => name.endsWith('.txt'));
    
    if (fileNames.length === 0) {
      throw new Error('No .txt files found in ZIP');
    }
    
    const monthAbbrev = MONTH_TO_ABBREV[period];
    const fileName = fileNames.find(name => name.toLowerCase().includes(monthAbbrev));
    
    if (!fileName) {
      throw new Error(`File not found for period ${period}`);
    }
    
    const file = zip.files[fileName];
    const content = await file.async('string');
    return parseAsciiGrid(content);
  } catch (error) {
    console.error('Failed to extract solar data:', error);
    return null;
  }
}

/**
 * Parse ASCII grid file content
 */
function parseAsciiGrid(content: string): AsciiGrid {
  const lines = content.trim().split('\n');
  
  const header = {
    ncols: parseInt(lines[0].split(/\s+/)[1]),
    nrows: parseInt(lines[1].split(/\s+/)[1]),
    xllcorner: parseFloat(lines[2].split(/\s+/)[1]),
    yllcorner: parseFloat(lines[3].split(/\s+/)[1]),
    cellsize: parseFloat(lines[4].split(/\s+/)[1]),
    NODATA_value: parseFloat(lines[5].split(/\s+/)[1])
  };
  
  const values: { [key: number]: number } = {};
  let gridIndex = 0;
  
  for (let i = 6; i < lines.length; i++) {
    const rowValues = lines[i].trim().split(/\s+/);
    for (const valueStr of rowValues) {
      const value = parseFloat(valueStr);
      if (value !== header.NODATA_value && !isNaN(value)) {
        values[gridIndex] = value;
      }
      gridIndex++;
    }
  }
  
  return { header, values };
}

/**
 * Get Solar Radiation grids
 */
export async function getSolarRadiationGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  try {
    const zipBuffer = await fs.readFile(SOLAR_RADIATION_FILE_PATH);
    return await extractAsciiFromZip(zipBuffer, period);
  } catch (error) {
    console.error('Failed to read solar radiation file:', error);
    return null;
  }
}

/**
 * Get Diffuse Radiation grids
 */
export async function getDiffuseRadiationGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  try {
    const zipBuffer = await fs.readFile(DIFFUSE_RADIATION_FILE_PATH);
    return await extractAsciiFromZip(zipBuffer, period);
  } catch (error) {
    console.error('Failed to read diffuse radiation file:', error);
    return null;
  }
}

/**
 * Get Longwave Down Radiation grids
 */
export async function getLongwaveDownGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  try {
    const zipBuffer = await fs.readFile(LONGWAVE_DOWN_FILE_PATH);
    return await extractAsciiFromZip(zipBuffer, period);
  } catch (error) {
    console.error('Failed to read longwave down file:', error);
    return null;
  }
}

/**
 * Get Longwave Up Radiation grids
 */
export async function getLongwaveUpGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  try {
    const zipBuffer = await fs.readFile(LONGWAVE_UP_FILE_PATH);
    return await extractAsciiFromZip(zipBuffer, period);
  } catch (error) {
    console.error('Failed to read longwave up file:', error);
    return null;
  }
}

/**
 * Get Net Radiation grids
 */
export async function getNetRadiationGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  try {
    const zipBuffer = await fs.readFile(NET_RADIATION_FILE_PATH);
    return await extractAsciiFromZip(zipBuffer, period);
  } catch (error) {
    console.error('Failed to read net radiation file:', error);
    return null;
  }
}