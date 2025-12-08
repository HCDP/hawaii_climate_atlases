import { AsciiGrid, Period, Units } from "@/lib/types";
import { getCachedFileBuffer } from "@/lib/data_cache";
import JSZip from "jszip";
import path from "path";

// Cache subdirectory for ET data files
const EVAP_CACHE_PATH = path.join('evapotranspiration', 'raw');

const ZIP_FILES = {
  AVAILABLE_ENERGY_MONTH: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AvailableEnergy_month_ascii.zip'),
  AVAILABLE_ENERGY_ANNUAL: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AvailableEnergy_ann_hr_ascii.zip'),
  CANOPY_CONDUCTANCE_MONTH: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/CanopyConductance_month_ascii.zip'),
  CANOPY_CONDUCTANCE_ANNUAL: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/CanopyConductance_ann_hr_ascii.zip'),
  AIR_DENSITY_MONTH: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AirDensity_month_ascii.zip'),
  AIR_DENSITY_ANNUAL: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AirDensity_ann_hr_ascii.zip'),
  AET_IN_MONTH: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_in_month_ascii.zip'),
  AET_IN_ANNUAL: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_in_ann_hr_ascii.zip'),
  AET_MM_MONTH: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_mm_month_ascii.zip'),
  AET_MM_ANNUAL: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_mm_ann_hr_ascii.zip'),
  AET_WM2_MONTH: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_wm2_month_ascii.zip'),
  AET_WM2_ANNUAL: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_wm2_ann_hr_ascii.zip'),
  AET_IN_MONTH_HR: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_in_month_hr_ascii.zip'),
  AET_MM_MONTH_HR: new URL('https://atlas.uhtapis.org/evapo/assets/files/AsciiFiles/AET_mm_month_hr_ascii.zip')
};

/**
 * Extract ASCII grid data from ZIP archive
 */
async function extractAsciiFromZip(zipBuffer: Buffer, period: Period): Promise<AsciiGrid | null> {
  try {
    const zip = await JSZip.loadAsync(zipBuffer);
    
    const fileNames = Object.keys(zip.files)
      .filter(name => name.endsWith('.txt') || name.endsWith('.asc'))
      .sort();
    
    if (fileNames.length === 0) {
      throw new Error('No ASCII files found in ZIP');
    }
    
    // For monthly data, use period index; for annual, use last file
    const fileName = period === 12 ? fileNames[fileNames.length - 1] : fileNames[period];
    const file = zip.files[fileName];
    
    if (!file) {
      throw new Error(`File not found for period ${period}`);
    }
    
    const content = await file.async('string');
    return parseAsciiGrid(content);
  } catch (error) {
    console.warn('ZIP extraction failed:', error);
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
 * Get Actual Evapotranspiration (AET) grids
 */
export async function getEvapotranspirationGrids({
  units,
  period,
}: {
  units: Units,
  period: Period
}): Promise<AsciiGrid | null> {
  
  const zipUrl = units === Units.IN 
    ? (period === 12 ? ZIP_FILES.AET_IN_ANNUAL : ZIP_FILES.AET_IN_MONTH)
    : (period === 12 ? ZIP_FILES.AET_MM_ANNUAL : ZIP_FILES.AET_MM_MONTH);
  
  const zipFileName = zipUrl.pathname.split('/').pop() || 'unknown.zip';
  const zipBuffer = await getCachedFileBuffer(zipUrl, EVAP_CACHE_PATH, zipFileName);
  if (!zipBuffer) return null;
  
  return await extractAsciiFromZip(zipBuffer, period);
}

/**
 * Get Air Density grids
 */
export async function getAirDensityGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  const zipUrl = period === 12 ? ZIP_FILES.AIR_DENSITY_ANNUAL : ZIP_FILES.AIR_DENSITY_MONTH;
  
  const zipFileName = zipUrl.pathname.split('/').pop() || 'unknown.zip';
  const zipBuffer = await getCachedFileBuffer(zipUrl, EVAP_CACHE_PATH, zipFileName);
  if (!zipBuffer) return null;
  
  return await extractAsciiFromZip(zipBuffer, period);
}

/**
 * Get Available Energy grids
 */
export async function getAvailableEnergyGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  const zipUrl = period === 12 ? ZIP_FILES.AVAILABLE_ENERGY_ANNUAL : ZIP_FILES.AVAILABLE_ENERGY_MONTH;
  
  const zipFileName = zipUrl.pathname.split('/').pop() || 'unknown.zip';
  const zipBuffer = await getCachedFileBuffer(zipUrl, EVAP_CACHE_PATH, zipFileName);
  if (!zipBuffer) return null;
  
  return await extractAsciiFromZip(zipBuffer, period);
}

/**
 * Get Canopy Conductance grids
 */
export async function getCanopyConductanceGrids({
  period,
}: {
  period: Period
}): Promise<AsciiGrid | null> {
  const zipUrl = period === 12 ? ZIP_FILES.CANOPY_CONDUCTANCE_ANNUAL : ZIP_FILES.CANOPY_CONDUCTANCE_MONTH;
  
  const zipFileName = zipUrl.pathname.split('/').pop() || 'unknown.zip';
  const zipBuffer = await getCachedFileBuffer(zipUrl, EVAP_CACHE_PATH, zipFileName);
  if (!zipBuffer) return null;
  
  return await extractAsciiFromZip(zipBuffer, period);
}

