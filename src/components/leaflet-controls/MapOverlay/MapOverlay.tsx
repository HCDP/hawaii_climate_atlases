import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import L, { LatLng, LatLngBounds, Map } from "leaflet";
import { useMap, MapContainer, ZoomControl, TileLayer, useMapEvent } from "react-leaflet";
import { Period, Units } from "@/lib";
import {
  defaultSettings,
  LEAFLET_POSITIONS,
} from "@/constants";
import { Button, ButtonGroup } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Spinner } from "@heroui/spinner";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
// import HomeFilledOutlined from '@mui/icons-material/HomeOutlined';
import X from "@mui/icons-material/Close";
import { LayoutContext } from "@/components/LayoutContext";
import { Input } from "@heroui/input";
import { LeafletContextInterface, useEventHandlers, useLeafletContext } from "@react-leaflet/core";

// For the draggable property to be recognized by typescript
declare module "leaflet" {
  interface PathOptions {
    draggable?: boolean;
  }
}

/*
  20, -150 works
  20 ,-150 works
  20   ,   -150 works
  20,-150 works
  20 -150 works
  20   -150 works
  20 asdf -150 does not work
 */
const parseLocation = (input: string): LatLng | null => {
  /* Regex meaning:
     Match a pattern that is either a comma surrounded by whitespace, or plain whitespace.
  */
  const parsed = input
    .split(/\s*,\s*|\s+/)
    .map(s => parseFloat(s));
  const [lat, lng] = parsed;
  if (parsed.length === 2 && (lat && lng)) {
    return new LatLng(lat, lng);
  } else {
    return null;
  }
}

function MinimapBounds({ parentMap, parentMapContext, zoom }: {
  parentMap: Map,
  parentMapContext: LeafletContextInterface,
  zoom: number
}) {
  const minimap = useMap();
  const rectangleRef = useRef<L.Polygon | null>(null);
  const moveCausedByDragRef = useRef<boolean>(false);

  // Clicking a point on the minimap sets the parent's map center
  useMapEvent('click', (e) => {
    parentMap.setView(e.latlng, parentMap.getZoom());
  })

  const onParentMapChange = useCallback(() => {
    const newBounds = parentMap.getBounds();
    if (!moveCausedByDragRef.current && !rectangleRef.current?.getBounds().equals(newBounds)) {
      rectangleRef.current?.setLatLngs([
        newBounds.getNorthWest(),
        newBounds.getNorthEast(),
        newBounds.getSouthEast(),
        newBounds.getSouthWest(),
        newBounds.getNorthWest(),
      ])
    }
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom]);

  const onRectangleDragEnd = useCallback(() => {
    if (rectangleRef.current) {
      moveCausedByDragRef.current = true;

      const rectangleBounds = rectangleRef.current.getBounds();
      const isOutOfBounds = !defaultSettings.maxBounds.contains(rectangleBounds);
      if (isOutOfBounds) {
        const rectangleNorth = rectangleBounds.getNorth();
        const rectangleSouth = rectangleBounds.getSouth();
        const rectangleWest = rectangleBounds.getWest();
        const rectangleEast = rectangleBounds.getEast();

        const maxNorth = defaultSettings.maxBounds.getNorth();
        const maxSouth = defaultSettings.maxBounds.getSouth();
        const maxWest = defaultSettings.maxBounds.getWest();
        const maxEast = defaultSettings.maxBounds.getEast();

        const rectangleHeight = rectangleNorth - rectangleSouth;
        const rectangleWidth = rectangleEast - rectangleWest;
        let newSouth = rectangleSouth;
        let newWest = rectangleWest;

        if (rectangleSouth < maxSouth) {
          newSouth = maxSouth;
        } else if (rectangleNorth > maxNorth) {
          newSouth = maxNorth - rectangleHeight;
        }

        if (rectangleWest < maxWest) {
          newWest = maxWest;
        } else if (rectangleEast > maxEast) {
          newWest = maxEast - rectangleWidth;
        }

        const newSouthWest = new LatLng(newSouth, newWest);
        const newNorthEast = new LatLng(newSouth + rectangleHeight, newWest + rectangleWidth);

        const newRectangleBounds = new LatLngBounds(newSouthWest, newNorthEast);
        rectangleRef.current.setLatLngs([
          newRectangleBounds.getNorthWest(),
          newRectangleBounds.getNorthEast(),
          newRectangleBounds.getSouthEast(),
          newRectangleBounds.getSouthWest(),
          newRectangleBounds.getNorthWest(),
        ]);
      }

      parentMap.setView(rectangleRef.current.getCenter());
      minimap.setView(rectangleRef.current.getCenter());
    }
  }, [minimap, parentMap]);

  // Listen to events on the parent map
  useEventHandlers({
    instance: parentMap,
    context: parentMapContext
  }, {
    move: onParentMapChange,
    zoom: onParentMapChange,
    moveend: () => {
      moveCausedByDragRef.current = false;
    },
  });

  useEffect(() => {
    const bounds = parentMap.getBounds();
    const rectangle = new (L.Polygon)([
      bounds.getNorthWest(),
      bounds.getNorthEast(),
      bounds.getSouthEast(),
      bounds.getSouthWest(),
      bounds.getNorthWest(),
    ], { weight: 3, draggable: true })
      .on("dragend", onRectangleDragEnd);
    rectangle.addTo(minimap);
    rectangleRef.current = rectangle;
    return () => {
      rectangle.removeFrom(minimap);
      rectangleRef.current = null;
    }
  }, [minimap, onParentMapChange, onRectangleDragEnd, parentMap, zoom]);

  return null;
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
  isLoading: boolean,
  gridsAreLoading: boolean,
  minimap: boolean,
}

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
    isLoading,
    gridsAreLoading,
    minimap
  }
) => {
  const { maximized, setMaximized } = useContext(LayoutContext);
  const toggleMapMaximized = () => setMaximized(oldMax => !oldMax);
  const map: Map = useMap();
  const mapContext = useLeafletContext();

  const [locationInput, setLocationInput] = useState<string>("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const handleLocationChange = () => {
    if (locationInput.length === 0) {
      setLocationError(null);
      return;
    }
    const parsedLatLng = parseLocation(locationInput);
    if (parsedLatLng !== null) {
      map.setView(parsedLatLng);
      setLocationError(null);
    } else {
      setLocationError("Invalid coordinates entered");
    }
  };

  // I put this here instead of in the onPress function because if I do that the resize might not happen properly.
  useEffect(() => {
    map.invalidateSize()
  }, [map, maximized]);

  // For menu and options/fields behavior (temp)
  const [showMenu, setShowMenu] = useState<boolean>(true);
  //const [rainfall, setRainfall] = useState<boolean>(false);
  const [uncertainty, setUncertainty] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);

  // Array of the string keys of the Period enum ("January", "February", etc.)
  const periodNames: string[] = Object.keys(Period).filter(period => isNaN(parseInt(period)));
  const minimapControl = useMemo(
    () => {
      const zoom = map.getZoom();
      return (
        <MapContainer
          style={{ width: 320, height: 180 }}
          center={map.getCenter()}
          zoom={zoom - (0.75 * 3)}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
          bounds={map.getBounds()}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={map} parentMapContext={mapContext} zoom={zoom - (0.75 * 3)} />
        </MapContainer>
      );
    },
    [map, mapContext],
  );

  return (
    <div ref={overlay => {
      if (overlay) {
        L.DomEvent.disableClickPropagation(overlay);
      }
    }}>
      <div className={LEAFLET_POSITIONS.topleft}>
        <div className="leaflet-control flex gap-0">
          <form
            className="flex flex-col gap-2.5"
            onSubmit={e => {
              e.preventDefault();
              handleLocationChange();
            }}>
            <Input
              name="locationInput"
              value={locationInput}
              onValueChange={setLocationInput}
              color="default"
              radius="sm"
              placeholder="Location: Latitude, Longitude (e.g. 21.299, -157.817)"
              className="shadow-md rounded-lg w-[24rem] p-0 bg-white"
            />
            {locationError && <p className="text-red-700 pl-3">{locationError}</p>}
          </form>
          {/*<Button*/}
          {/*  onPress={() => {*/}
          {/*    setLocationError(null);*/}
          {/*    map.setView(defaultSettings.startPosition);*/}
          {/*  }}*/}
          {/*  radius="sm"*/}
          {/*  size="md"*/}
          {/*  isIconOnly*/}
          {/*  title={`Return to starting location (${defaultSettings.startPosition.lat.toFixed(4)}, ${defaultSettings.startPosition.lng.toFixed(4)})`}*/}
          {/*  className="bg-white shadow-md"*/}
          {/*>*/}
          {/*  <HomeFilledOutlined />*/}
          {/*</Button>*/}
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.topright}>
        <div className="leaflet-control flex flex-col gap-2.5 items-end">
          {minimap && minimapControl}
          <Button
            onPress={toggleMapMaximized}
            radius="full"
            size="lg"
            isIconOnly
            title="Maximize map (hide header and footer)"
            className="bg-white shadow-md"
          >
            {maximized ? <FullscreenExit /> : <Fullscreen />}
          </Button>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomleft}>
        <div className="leaflet-control">
          {showMenu && (
            <div className="relative">
              <Button
                onPress={() => setShowMenu(false)}
                className="absolute top-2 right-2 z-20 border-none bg-transparent"
                isIconOnly
                size="sm"
                variant="flat"
              >
                <X fontSize="small" />
              </Button>
              <Table
                hideHeader
                aria-label="Map controls"
                classNames={{
                  base: "rounded-lg shadow-md mb-0 z-10",
                  wrapper: "rounded-lg",
                }}
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
                        {/* Disabled unit switching until inch grids are fully loaded. Otherwise, loading speeds 
                          are slower because mm grids also start fetching, forcing the user to wait longer 
                          before accessing other layers. */}
                        {Object.keys(Units).map(u => (
                          <Button
                            isDisabled={gridsAreLoading && selectedUnits == Units.IN}
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
                          onValueChange={() => {
                            setShowGrids(!showGrids);
                            if (uncertainty) {
                              setUncertainty(!uncertainty);
                            }
                          }}
                          isSelected={showGrids}
                        >
                          Rainfall
                        </Checkbox>
                        <Checkbox
                          value="Uncertainty"
                          onValueChange={() => {
                            setUncertainty(!uncertainty);
                            if (showGrids) {
                              setShowGrids(!showGrids);
                            }
                          }}
                          isSelected={uncertainty}
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
                      {/* Force dropdown to open by default to prevent it from freezing during API fetching */}
                      <Dropdown isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                        <DropdownTrigger>
                          {!gridsAreLoading ? (
                            <Button
                              variant="bordered"
                              endContent={
                                <svg fill="none" height="18" viewBox="0 0 15 24" width="18"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <g transform="scale(1, -1) translate(0, -24)">
                                    <path
                                      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                                      fill="currentColor"
                                    />
                                  </g>
                                </svg>
                              }>
                              <p className="font-bold">{periodNames[selectedPeriod]}</p>
                            </Button>
                          ) : (
                            <Button isLoading variant="bordered" spinnerPlacement="end">
                              <p className="font-bold">Loading maps</p>
                            </Button>
                          )}
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
            </div>
          )}
          {!showMenu && (
            <Button
              color="primary"
              isIconOnly
              onPress={() => setShowMenu(!showMenu)}
              className="rounded-xl shadow-md"
            >
              {isLoading ? (
                <Spinner color="secondary" size="sm" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </Button>
          )}
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomright}>
        <ZoomControl position="bottomright" />
      </div>
    </div>
  )
}

export default MapOverlay;
