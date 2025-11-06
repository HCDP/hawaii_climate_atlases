import { Period, Station, Units } from "@/lib";
import { LatLng, LatLngBounds } from "leaflet";

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
  maxBounds: LatLngBounds,
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
  maxBounds: new LatLngBounds(
    [28.20669537226454, -147.83353061000466],
    [13.35682561201245,-166.7595452880443]),
}
