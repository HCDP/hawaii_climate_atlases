import { Period, Units } from "@/lib";

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

export const defaultSettings = {
  selectedStation: null,
  selectedUnits: Units.IN,
  selectedPeriod: Period.Annual,
  showIsohyets: false,
  showGrids: true,
  showRFStations: true,
  showOtherStations: false,
  zoom: 7.5,
}
