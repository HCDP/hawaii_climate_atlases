


export interface Station {
  SKN: number,
  Name: string,
  Lat_DD: number,
  Lon_DD: number,
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
  DataSources: string,
  StationStatus: 'Current' | 'Discontinued' | 'Virtual',
}