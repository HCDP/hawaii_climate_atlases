import React, { useEffect, useRef, useState } from "react";
import L, { LatLng, Map } from "leaflet";
import { useMap, ZoomControl } from "react-leaflet";
import LocationField from "@/components/LocationField";
import { Period, Units } from "@/lib";
import { LEAFLET_POSITIONS } from "@/constants";
import { Button, ButtonGroup } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";

const parseLocation = (input: string): LatLng | null => {
  const [lat, lng] = input.split(",").map(s => parseFloat(s));
  if (lat && lng) {
    return new LatLng(lat, lng);
  } else {
    return null;
  }
}

interface Props {
  selectedUnits: Units,
  setSelectedUnits: (units: Units) => void,
  selectedPeriod: Period,
  setSelectedPeriod: (period: Period) => void,
  showRFStations: boolean,
  setShowRFStations: (show: boolean) => void,
  showOtherStations: boolean,
  setShowOtherStations: (show: boolean) => void,
  showIsohyets: boolean,
  setShowIsohyets: (show: boolean) => void,
  showGrids: boolean,
  setShowGrids: (show: boolean) => void,
  mapMaximized: boolean,
  onToggleMaximize: () => void,
};

const MapOverlay: React.FC<Props> = (
  { 
    selectedUnits,
    setSelectedUnits,
    selectedPeriod,
    setSelectedPeriod,
    showRFStations,
    setShowRFStations,
    showOtherStations,
    setShowOtherStations,
    showIsohyets,
    setShowIsohyets,
    showGrids,
    setShowGrids,
    mapMaximized,
    onToggleMaximize,
  }
) => {
  const map: Map = useMap();

  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(overlayRef.current) {
      L.DomEvent.disableClickPropagation(overlayRef.current);
    }
  });

  const handleLocationChange = (input: string) => {
      const parsedLatLng = parseLocation(input);
      if (parsedLatLng !== null) {
          map.setView(parsedLatLng);
      }
  };

  // I put this here instead of in the onPress function because if I do that the resize might not happen properly.
  useEffect(() => {
    map.invalidateSize()
  }, [mapMaximized]);

  // For menu and options/fields behavior (temp)
  const [showMenu, setShowMenu] = useState<boolean>(false);
  //const [rainfall, setRainfall] = useState<boolean>(false);
  const [uncertainty, setUncertainty] = useState<boolean>(false);

  // Array of the string keys of the Period enum ("January", "February", etc.)
  const periodNames: string[] = Object.keys(Period).filter(period => isNaN(parseInt(period)));

  return (
    <div ref={overlayRef}>
      <div className={LEAFLET_POSITIONS.topleft}>
        <div className="leaflet-control flex">
          <LocationField onLocationChange={handleLocationChange}/>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.topright}>
        <div className="leaflet-control rounded-full shadow-md">
          <Button
            onPress={onToggleMaximize}
            radius="full"
            size="lg"
            isIconOnly
            title="Maximize map (hide header and footer)"
            className="bg-white shadow-md"
          >
            {mapMaximized ? <FullscreenExit /> : <Fullscreen />}
          </Button>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomleft}>
        <div className="leaflet-control">
          { showMenu ?

            <Table
              hideHeader
              aria-label=""
              className="rounded-xl shadow-md mb-2"
            >
              <TableHeader>
                <TableColumn>Field</TableColumn>
                <TableColumn>Options</TableColumn>
              </TableHeader>
              <TableBody>

                <TableRow key="1">
                  <TableCell><p className="text-base">Units: </p></TableCell>
                  <TableCell>
                    <ButtonGroup size="sm" className="font-bold" radius="sm" color="primary">
                      {Object.keys(Units).map(u => (
                        <Button
                          key={u}
                          variant={selectedUnits === u ? "bordered" : "ghost"}
                          onPress={() => setSelectedUnits(u as Units)}
                          className={selectedUnits === u ? "bg-gray-400" : "bg-white text-gray-300"}
                        >
                          {u.toLocaleLowerCase()}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </TableCell>
                </TableRow>

                <TableRow key="2">
                  <TableCell><p className="text-base pb-[55px] pt-[2.5vh]">Show: </p></TableCell>
                  <TableCell className="pt-[2.5vh]">
                    {/* Place in div instead of checkbox group for expected disabling behavior */}
                    <div className="inline-flex flex-col">
                      <Checkbox 
                        value="Rainfall" 
                        onValueChange={() => setShowGrids(!showGrids)}
                        isSelected={showGrids}
                        isDisabled={uncertainty}
                      >
                        Rainfall
                      </Checkbox>
                      <Checkbox 
                        value="Uncertainty" 
                        onValueChange={() => setUncertainty(!uncertainty)}
                        isSelected={uncertainty}
                        isDisabled={showGrids}
                      >
                        Uncertainty
                      </Checkbox>
                      <Checkbox 
                        value="Isohyets"
                        onValueChange={() => setShowIsohyets(!showIsohyets)}
                        isSelected={showIsohyets}
                      >
                        Isohyets
                      </Checkbox>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow key="3">
                  <TableCell><p className="text-base pb-[30px] pt-[1.5vh]">Stations: </p></TableCell>
                  <TableCell className="pt-[1.5vh]">
                    <div className="inline-flex flex-col">
                      <Checkbox 
                        value="RFAtlas"
                        onValueChange={() => setShowRFStations(!showRFStations)}
                        isSelected={showRFStations}
                      >
                        RF Atlas Stations
                      </Checkbox>
                      <Checkbox 
                        value="Other"
                        onValueChange={() => setShowOtherStations(!showOtherStations)}
                        isSelected={showOtherStations}
                      >
                        Other Stations
                      </Checkbox>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow key="4">
                  <TableCell><p className="text-base pt-[1.5vh]">Period: </p></TableCell>
                  <TableCell className="pt-[2.5vh]">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">
                          <p className="font-bold">{periodNames[selectedPeriod]}</p>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        className="max-h-[200px] overflow-y-auto" 
                        aria-label="Month Selector"
                        onAction={(key) => setSelectedPeriod(key as Period)}
                      >
                        {periodNames.map((period: string) => (
                          <DropdownItem
                            key={Period[period as keyof typeof Period]}
                            className="hover:outline-white hover:bg-gray-100"
                          >
                            {period}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
                
              </TableBody>
            </Table> 

            : <></>
          }
          <Button 
            color="primary" 
            isIconOnly
            onPress = {() => setShowMenu(!showMenu)}
            className="rounded-xl shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Button>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomright}>
        <ZoomControl position="bottomright" />
      </div>
    </div>
  )
}

export default MapOverlay;
