import { FeatureCollection } from "geojson";

export enum Units {
  IN = 'IN',
  MM = 'MM'
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
