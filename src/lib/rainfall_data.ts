"use client"

import { AsciiGrid, Grids, Isohyets, Station } from "@/lib";
import { FeatureCollectionWithFilename } from "shpjs";

// const baseURL = 'https://atlas.uhtapis.org/rainfall/assets/files';

export async function getStations(): Promise<Station[]> {
  return await fetch('/api/stations').then(res => res.json());
}

export async function getOtherStations(): Promise<Station[]> {
  return await fetch('/api/stations?filter=other').then(res => res.json());
}

export async function getIsohyets(): Promise<Isohyets> {
  const inchesGeojson: FeatureCollectionWithFilename[] = await fetch(`/api/isohyets/in`)
    .then(res => res.json());
  const mmGeojson: FeatureCollectionWithFilename[] = await fetch(`/api/isohyets/mm`)
    .then(res => res.json());
  const isohyets: Isohyets = {
    IN: inchesGeojson,
    MM: mmGeojson,
  }
  return isohyets;
}

export async function getGrids(): Promise<Grids> {
  const inchesAsciiGrids: AsciiGrid[] = await fetch(`/api/grids/in`)
    .then(res => res.json());
  const mmAsciiGrids: AsciiGrid[] = await fetch(`/api/grids/mm`)
    .then(res => res.json());
  const grids = {
    IN: inchesAsciiGrids,
    MM: mmAsciiGrids,
  }
  return grids;
}
