import { Period, Station, Units } from "@/lib";
import { LatLng } from "leaflet";

export const LEAFLET_POSITIONS = {
  top: 'leaflet-top',
  bottom: 'leaflet-bottom',
  left: 'leaflet-left',
  right: 'leaflet-right',
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
} as const;

export const defaultSettings: {
  startPosition: LatLng,
  selectedStation: Station | null,
  selectedUnits: Units,
  selectedPeriod: Period,
  showIsohyets: boolean,
  showGrids: boolean,
  showRFStations: boolean,
  showOtherStations: boolean,
  zoom: number,
} = {
  startPosition: new LatLng(20.8, -157.3),
  selectedStation: null,
  selectedUnits: Units.IN,
  selectedPeriod: Period.Annual,
  showIsohyets: false,
  showGrids: true,
  showRFStations: true,
  showOtherStations: false,
  zoom: 7.5,
}
