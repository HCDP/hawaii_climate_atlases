import { FeatureCollection } from "geojson";

export enum Units {
  IN = 'IN',
  MM = 'MM',
  Others = 'Others',
}

export enum Period {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
  Annual,
}

export enum Month {
  Annual = 'ann',
  January = 'jan',
  February = 'feb',
  March = 'mar',
  April = 'apr',
  May = 'may',
  June = 'jun',
  July = 'jul',
  August = 'aug',
  September = 'sep',
  October = 'oct',
  November = 'nov',
  December = 'dec',
}

export enum Hour {
  HR_00 = 'All',
  HR_01 = '01',
  HR_02 = '02',
  HR_03 = '03',
  HR_04 = '04',
  HR_05 = '05',
  HR_06 = '06',
  HR_07 = '07',
  HR_08 = '08',
  HR_09 = '09',
  HR_10 = '10',
  HR_11 = '11',
  HR_12 = '12',
  HR_13 = '13',
  HR_14 = '14',
  HR_15 = '15',
  HR_16 = '16',
  HR_17 = '17',
  HR_18 = '18',
  HR_19 = '19',
  HR_20 = '20',
  HR_21 = '21',
  HR_22 = '22',
  HR_23 = '23', 
  HR_24 = '24', 
}

export interface Station {
  SKN: number,
  Name: string,
  Lat_DD: number,
  Lon_DD: number,
  ElevFT: number,
  ElevM: number,
  Observer: string,
  MinYear: number,
  MaxYear: number,
  JanAvgIN: number,
  FebAvgIN: number,
  MarAvgIN: number,
  AprAvgIN: number,
  MayAvgIN: number,
  JunAvgIN: number,
  JulAvgIN: number,
  AugAvgIN: number,
  SepAvgIN: number,
  OctAvgIN: number,
  NovAvgIN: number,
  DecAvgIN: number,
  AnnAvgIN: number,
  JanAvgMM: number,
  FebAvgMM: number,
  MarAvgMM: number,
  AprAvgMM: number,
  MayAvgMM: number,
  JunAvgMM: number,
  JulAvgMM: number,
  AugAvgMM: number,
  SepAvgMM: number,
  OctAvgMM: number,
  NovAvgMM: number,
  DecAvgMM: number,
  AnnAvgMM: number,
  JanSD_in: number,
  FebSD_in: number,
  MarSD_in: number,
  AprSD_in: number,
  MaySD_in: number,
  JunSD_in: number,
  JulSD_in: number,
  AugSD_in: number,
  SepSD_in: number,
  OctSD_in: number,
  NovSD_in: number,
  DecSD_in: number,
  AnnSD_in: number,
  JanSD_mm: number,
  FebSD_mm: number,
  MarSD_mm: number,
  AprSD_mm: number,
  MaySD_mm: number,
  JunSD_mm: number,
  JulSD_mm: number,
  AugSD_mm: number,
  SepSD_mm: number,
  OctSD_mm: number,
  NovSD_mm: number,
  DecSD_mm: number,
  AnnSD_mm: number,
  DataSources: string,
  StationStatus: 'Current' | 'Discontinued' | 'Virtual',
}

export type Isohyets = {
  [key in Units]: FeatureCollection[];
};

export type AsciiGrid = {
  header: {
    ncols: number,
    nrows: number,
    xllcorner: number,
    yllcorner: number,
    cellsize: number,
    NODATA_value: number,
    // Optional: name of the source file inside zip used to build this grid
    sourceFileName?: string,
  },
  values: {
    [gridIndex: number]: number,
  },
}

export type Grids = {
  [key in Units]: AsciiGrid[];
}

export type TileLayerProps = {
  name: string,
  url: string,
  attribution?: string,
  maxZoom?: number
}
