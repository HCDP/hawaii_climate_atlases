import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import L, { Rectangle, LatLng, LatLngBounds, Map } from "leaflet";
import { useMap, MapContainer, ZoomControl, TileLayer, useMapEvent } from "react-leaflet";
import { Period, TileLayerProps, Units } from "@/lib";
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
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
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

// Snap rectangle to inside maxBounds
function snapRectangleToMaxBounds(rectangle: Rectangle, maxBounds: L.LatLngBounds) {
  const rectangleBounds = rectangle.getBounds();
  const rectangleNorth = rectangleBounds.getNorth();
  const rectangleSouth = rectangleBounds.getSouth();
  const rectangleWest = rectangleBounds.getWest();
  const rectangleEast = rectangleBounds.getEast();

  const maxNorth = maxBounds.getNorth();
  const maxSouth = maxBounds.getSouth();
  const maxWest = maxBounds.getWest();
  const maxEast = maxBounds.getEast();

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
  rectangle.setBounds(newRectangleBounds);
}

function MinimapBounds({ parentMap, parentMapContext, zoom }: {
  parentMap: Map,
  parentMapContext: LeafletContextInterface,
  zoom: number
}) {
  const minimap = useMap();
  const rectangleRef = useRef<Rectangle | null>(null);
  const moveCausedByDragRef = useRef<boolean>(false);

  // Clicking a point on the minimap sets the parent's map center
  useMapEvent('click', (e) => {
    parentMap.setView(e.latlng, parentMap.getZoom());
  });

  const onParentMapChange = useCallback(() => {
    const newBounds = parentMap.getBounds();
    if (!moveCausedByDragRef.current && !rectangleRef.current?.getBounds().equals(newBounds)) {
      rectangleRef.current?.setBounds(newBounds)
    }
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom]);

  const onRectangleDragEnd = useCallback(() => {
    if (rectangleRef.current) {
      moveCausedByDragRef.current = true;

      // If the rectangle is out of bounds, snap it back into bounds, mimicking the snapping behavior of the actual map
      const rectangleBounds = rectangleRef.current.getBounds();
      const isOutOfBounds = !defaultSettings.maxBounds.contains(rectangleBounds);
      if (isOutOfBounds) {
        snapRectangleToMaxBounds(rectangleRef.current, defaultSettings.maxBounds);
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
    const rectangle = L.rectangle(bounds, { weight: 3, draggable: true })
      .on("dragend", onRectangleDragEnd);
    rectangle.addTo(minimap);
    rectangleRef.current = rectangle;
    return () => {
      rectangle.removeFrom(minimap);
      rectangle.off();
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
  tileLayerProps: TileLayerProps,
  setTileLayerProps: (props: TileLayerProps) => void,
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
    tileLayerProps,
    setTileLayerProps,
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

  // For menu and options/fields behavior
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [uncertainty, setUncertainty] = useState<boolean>(false);
  const [basemapListOpen, setBasemapListOpen] = useState(true);
  const [periodListOpen, setPeriodListOpen] = useState(false);

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

  const baseLayers: Record<string, TileLayerProps> = {
    "Satellite (Google)": {
      name: "Satellite",
      url: "http://www.google.com/maps/vt?lyrs=y@189&gl=en&x={x}&y={y}&z={z}",
    },
    "Street (Google)": {
      name: "Street",
      url: "https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    "World Imagery (ESRI)": {
      name: "World Imagery",
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19,
    },
    "USGS Topo (USGS)": {
      name: "USGS Topo",
      url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 16,
    },
    "Shaded Relief (ESRI)": {
      name: "Shaded Relief",
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
      maxZoom: 13
    }
  };

  const DropdownChevron = ({isOpen} : {isOpen: boolean}) => {
    return (!isOpen ? (
      <svg fill="none" height="15" viewBox="0 0 24 24" width="15"
          xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(1, -1) translate(0, -24)">
          <path
            d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ) : (
      <svg fill="none" height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
          fill="currentColor"
        />
      </svg>
    ))
  };

  const disableClickPropagation = useCallback((el: HTMLElement | null) => {
    if (el) {
      L.DomEvent.disableClickPropagation(el);
    }
  }, []);

  return (
    <>
      <div ref={disableClickPropagation} className={LEAFLET_POSITIONS.topleft}>
        <div className="leaflet-control flex gap-0">
          <form
            ref={disableClickPropagation}
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
      <div ref={disableClickPropagation} className={LEAFLET_POSITIONS.topright}>
        {/*<div className="leaflet-control flex flex-col gap-2.5 items-end pointer-events-none">*/}
        <div className="leaflet-control">
          <div>
            {minimap && minimapControl}
          </div>
        </div>
        <div className="leaflet-control">
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
      <div ref={disableClickPropagation} className={LEAFLET_POSITIONS.bottomleft}>
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

                  <TableRow key="Units">
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

                  <TableRow key="Show">
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

                  <TableRow key="Stations">
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

                  <TableRow key="Basemap">
                    <TableCell><p className="text-base pb-[4px] pt-[1.5vh]">Basemap: </p></TableCell>
                    <TableCell className="pb-[12px] pt-[2.5vh]">
                      <ButtonGroup variant="bordered" size="sm" disableRipple>
                        <Button disableRipple disableAnimation className="w-[120px]">
                          {tileLayerProps.name}
                        </Button>
                        <Dropdown isOpen={basemapListOpen} onOpenChange={(open) => setBasemapListOpen(open)}>
                          <DropdownTrigger>
                            {/* Since menu won't render while grids are loading, disable for now */}
                            <Button isIconOnly isDisabled={gridsAreLoading}>
                              <DropdownChevron isOpen={basemapListOpen}/>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            className="max-h-[200px] overflow-y-auto"
                            aria-label="Month Selector"
                            onAction={(key) => setTileLayerProps(baseLayers[key])}
                          >
                            {Object.keys(baseLayers).map((layerName) => (
                              <DropdownItem
                                key={layerName}
                                className="hover:outline-white hover:bg-gray-100"
                              >
                                {layerName}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow key="Period">
                    <TableCell><p className="text-base pt-[1.95vh]">Period: </p></TableCell>
                    <TableCell className="pt-[2.5vh]">
                      {/* Force dropdown to open by default to prevent it from freezing during API fetching */}
                      <ButtonGroup variant="bordered" size="sm" disableRipple>
                        <Button disableRipple disableAnimation className="w-[120px]">
                          {!gridsAreLoading ? (
                            periodNames[selectedPeriod]
                          ) : "Loading maps..."}
                        </Button>
                        <Dropdown isOpen={periodListOpen} onOpenChange={(open) => setPeriodListOpen(open)}>
                          <DropdownTrigger>
                            <Button 
                              isIconOnly
                              isLoading={gridsAreLoading}
                              spinnerPlacement="start"
                            >
                              {!gridsAreLoading && <DropdownChevron isOpen={periodListOpen}/>}
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
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </div>
          )}
          {!showMenu && (
            <Button
              ref={disableClickPropagation}
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
        <div className="leaflet-control">
          <div ref={disableClickPropagation} className="flex flex-col mb-4">
            <Button
              onPress={() => map.zoomIn()}
              radius="md"
              size="md"
              isIconOnly
              title="Maximize map (hide header and footer)"
              className="bg-white shadow-lg rounded-lg rounded-b-none"
            >
              <Add />
            </Button>
            <Button
              onPress={() => map.zoomOut()}
              radius="md"
              size="md"
              isIconOnly
              title="Maximize map (hide header and footer)"
              className="bg-white shadow-lg rounded-lg rounded-t-none"
            >
              <Remove />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MapOverlay;
