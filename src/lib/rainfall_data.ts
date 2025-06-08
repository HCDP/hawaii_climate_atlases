"use client"

import { AsciiGrid, Grids, Isohyets, Station } from "@/lib";
import { FeatureCollection } from "geojson";

// const baseURL = 'https://atlas.uhtapis.org/rainfall/assets/files';

export async function getStations(): Promise<Station[]> {
  return await fetch('/api/stations').then(res => res.json());
}

export async function getOtherStations(): Promise<Station[]> {
  return await fetch('/api/stations?filter=other').then(res => res.json());
}

export async function getIsohyets(): Promise<Isohyets> {
  const inchesGeojson: FeatureCollection[] = await fetch(`/api/isohyets/in`)
    .then(res => res.json());
  const mmGeojson: FeatureCollection[] = await fetch(`/api/isohyets/mm`)
    .then(res => res.json());
  const isohyets: Isohyets = {
    IN: inchesGeojson,
    MM: mmGeojson,
  }
  return isohyets;
}

export async function getGrids(): Promise<Grids> {
  /* TODO: Temporarily only returning the annual data. Returning all the data together makes everything slow,
      need to figure out how to fix this. */
  const inchesAsciiGrids: AsciiGrid = await fetch(`/api/grids/in/annual`)
    .then(res => res.json());
  const mmAsciiGrids: AsciiGrid = await fetch(`/api/grids/mm/annual`)
    .then(res => res.json());
  const grids = {
    IN: [inchesAsciiGrids],
    MM: [mmAsciiGrids],
  }
  return grids;
}
