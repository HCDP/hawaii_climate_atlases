"use client"

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Period, Station, Units } from "@/lib";

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

export const SettingsContext = createContext<{
  selectedStation: Station | null,
  setSelectedStation: Dispatch<SetStateAction<Station | null>>,
  selectedUnits: Units,
  setSelectedUnits: Dispatch<SetStateAction<Units>>,
  selectedPeriod: Period,
  setSelectedPeriod: Dispatch<SetStateAction<Period>>,
  showIsohyets: boolean,
  setShowIsohyets: Dispatch<SetStateAction<boolean>>,
  showGrids: boolean,
  setShowGrids: Dispatch<SetStateAction<boolean>>,
  showRFStations: boolean,
  setShowRFStations: Dispatch<SetStateAction<boolean>>,
  showOtherStations: boolean,
  setShowOtherStations: Dispatch<SetStateAction<boolean>>,
  zoom: number,
  setZoom: Dispatch<SetStateAction<number>>,
} | undefined>(undefined);

interface Props {
  children: React.ReactNode,
}

export const SettingsProvider: React.FC<Props> = ({ children }: Props) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(defaultSettings.selectedStation);
  const [selectedUnits, setSelectedUnits] = useState<Units>(defaultSettings.selectedUnits);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultSettings.selectedPeriod);
  const [showIsohyets, setShowIsohyets] = useState<boolean>(defaultSettings.showIsohyets);
  const [showGrids, setShowGrids] = useState<boolean>(defaultSettings.showGrids);
  const [showRFStations, setShowRFStations] = useState<boolean>(defaultSettings.showRFStations);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(defaultSettings.showOtherStations);
  const [zoom, setZoom] = useState<number>(defaultSettings.zoom);

  return (
    <SettingsContext.Provider
      value={{
        selectedStation,
        setSelectedStation,
        selectedUnits,
        setSelectedUnits,
        selectedPeriod,
        setSelectedPeriod,
        showIsohyets,
        setShowIsohyets,
        showGrids,
        setShowGrids,
        showRFStations,
        setShowRFStations,
        showOtherStations,
        setShowOtherStations,
        zoom,
        setZoom,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
