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
