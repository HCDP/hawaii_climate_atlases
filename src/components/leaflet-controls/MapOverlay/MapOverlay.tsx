import React, { useEffect, useState } from "react";
import { LatLng, Map } from "leaflet";
import { useMap, ZoomControl } from "react-leaflet";
import LocationField from "@/components/LocationField";
import { Units } from "@/lib";
import { LEAFLET_POSITIONS } from "@/constants";
import { Button, ButtonGroup } from "@heroui/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
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

const MapOverlay: React.FC<
  {
    selectedUnits: Units,
    setSelectedUnits: (units: Units) => void,
    mapMaximized: boolean,
    onToggleMaximize: () => void,
  }
> = ({ selectedUnits, setSelectedUnits, mapMaximized, onToggleMaximize }) => {
  const map: Map = useMap();

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

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
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
            title="Maximize map(hide header and footer)"
            className="bg-white shadow-md"
          >
            {mapMaximized ? <FullscreenExit /> : <Fullscreen />}
          </Button>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomleft}>
        <div className="leaflet-control">
          {
            showMenu ?

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
                      <Button
                        variant={selectedUnits === "IN" ? "bordered" : "ghost"}
                        onPress={() => setSelectedUnits("IN")}
                        className={selectedUnits === "IN" ? "bg-gray-400" : "bg-white text-gray-300"}
                      >
                        in
                      </Button>
                      <Button
                        variant={selectedUnits === "MM" ? "bordered" : "ghost"}
                        onPress={() => setSelectedUnits("MM")}
                        className={selectedUnits === "MM" ? "bg-gray-400" : "bg-white text-gray-300"}
                      > 
                        mm
                      </Button>
                    </ButtonGroup>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
            </svg>
          </Button>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomright}>
        <ZoomControl position="bottomright" />
      </div>
    </>
  )
}

export default MapOverlay;
