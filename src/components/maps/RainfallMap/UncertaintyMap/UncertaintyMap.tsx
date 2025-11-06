import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@/lib/leaflet-path-drag-patch";
import Map from "../../Map";
import {
  Units,
  Period,
  AsciiGrid,
  TileLayerProps,
} from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, Marker } from "react-leaflet";
import L, { LatLng, LatLngBounds } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import { UncertaintyColorLayer } from "./UncertaintyColorLayer";
import { Feature, FeatureCollection } from "geojson";
import { renderToStaticMarkup } from "react-dom/server";
import { useRainfallUncertaintyAllGrids, useRainfallUncertaintyComposite } from "@/hooks/rainfall";
import { defaultSettings } from "@/constants";
import { GridLoader } from "react-spinners";


const PopupOnClick = (
  {
    isLoading,
    selectedUnits,
    selectedPeriod,
    location,
    setLocation,
    setSelectedGridIndex,
    grid,
  }: {
    isLoading: boolean,
    selectedUnits: Units,
    selectedPeriod: Period,
    setSelectedGridIndex: (index: number) => void,
    location: LatLng | null,
    setLocation: (loc: LatLng) => void,
    grid: AsciiGrid,
  }) => {
  const [gridValue, setGridValue] = useState<number | null>(null);
  useEffect(() => {
    if (!location) {
      setGridValue(null);
      return;
    }

    // Credit: https://github.com/ikewai/precipitation_application/blob/prod/src/app/services/util/data-retreiver.service.ts#L34
    const { ncols, nrows, xllcorner, yllcorner, cellsize } = grid.header;
    const offset = new LatLng(location.lat - yllcorner, location.lng - xllcorner);

    let coords = null;
    const x = Math.floor(offset.lng / cellsize);
    const y = Math.floor(nrows - offset.lat / cellsize);
    //check if in grid range, if not return null (otherwise will provide erroneous results when flattened)
    const xValid: boolean = x >= 0 && x < ncols;
    const yValid = y >= 0 && y < nrows;
    if (!xValid || !yValid) {
      setGridValue(null);
    } else {
      coords = {
        x: x,
        y: y,
      }
    }
    let index: number;
    if (coords !== null) {
      index = ncols * coords.y + coords.x;
      const value: number | undefined = grid.values[index];
      if (value) {
        setGridValue(value);
        setSelectedGridIndex(index);
      } else {
        setGridValue(null);
        setSelectedGridIndex(-1);
      }
    } else {
      setGridValue(null);
    }
  }, [location, selectedUnits, grid, setSelectedGridIndex]);
  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });

  const periodText = Number(selectedPeriod) === Period.Annual ? "annual" : Period[selectedPeriod];
  // Used to remove station data from the sidebar if only a grid is clicked on

  return gridValue && location ? (
    <>
      <Popup position={location}>
        <div className="flex flex-col gap-3">
          Location: Lat: {location.lat.toFixed(4)},
          Lon: {location.lng.toFixed(4)}
          <hr />
          {/*Mean annual rainfall: {selectedStation?.AnnAvgIN}*/}
          {isLoading ? `Loading mean ${periodText} rainfall values (in ${selectedUnits.toLocaleLowerCase()})...` : `Mean ${periodText} rainfall: ${gridValue.toFixed(4)} ${selectedUnits.toLocaleLowerCase()}`}
        </div>
      </Popup>
      {/* X marker that indicates where the user last clicked on the map (only valid grid spaces + stations) 
          Some stations may appear off of the grid spaces, so include marker in those cases */}
      {gridValue ? <Marker
        position={location}
        icon={
          L.divIcon({
            html:
              `<svg width="25" height="25" viewBox="0 0 100 100">
                <path 
                  d="M10 10 L90 90 M90 10 L10 90"
                  stroke="red"
                  stroke-width="25"
                  stroke-opacity="0.9"
                  fill="none" 
                />
              </svg>`,
            className: '',
            iconSize: [25, 25],
            iconAnchor: [12.5, 12.5],
          })}
      /> : <></>}
    </>
  ) : null;
}

const zoomSnap = 0.75,
  zoomDelta = 0.75,
  minZoom = 6;

const pivotZoom = 12, hideBorderZoom = 9;

const UncertaintyMap = () => {
  // useUncertaintyData(defaultSettings.selectedUnits, defaultSettings.selectedPeriod);

  const [selectedUnits, setSelectedUnits] = useState<Units>(defaultSettings.selectedUnits);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultSettings.selectedPeriod);
  const [showGrids, setShowGrids] = useState<boolean>(defaultSettings.showGrids);
  const [showUncertainty, setShowUncertainty] = useState<boolean>(false);
  const [selectedGridIndex, setSelectedGridIndex] = useState<number>(-1); // -1 = default val or non-grid loc
  const [location, setLocation] = useState<LatLng | null>(null);
  const [tileLayerProps, setTileLayerProps] = useState<TileLayerProps>({
    name: "Street",
    url: "https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  const {
    //featureCollections,
    asciiGrid,
    allDataLoaded,
    isLoading,
  } = useRainfallUncertaintyComposite(selectedUnits, selectedPeriod);

  const {
    asciiGrids,
    gridsAreLoading
  } = useRainfallUncertaintyAllGrids(selectedUnits);

  const ranges_IN: [number, number][] = [
    [0.0005019, 3.354232],    // January
    [0.0014641, 2.839714],    // February
    [0.0009792, 4.090142],    // March
    [0.0001895, 11.3037],     // April
    [0.0007213, 2.740073],    // May
    [0.0008297, 3.273416],    // June
    [0.0001819, 3.422752],    // July
    [0.00446305, 3.086848],   // August
    [0.0007306, 2.773549],    // September
    [0.0011364, 2.597468],    // October
    [0.004848769, 3.840706],  // November
    [0.001260578, 3.433185],  // December
    [0.05284176, 11.87222]    // Annual
  ];
  const ranges_MM: [number, number][] = [
    [0.01274, 85.18],     // January
    [0.0371, 72.09],      // February
    [0.0248, 103.89],     // March
    [0.0048, 287.11],     // April
    [0.0183, 69.58],      // May
    [0.0210, 83.14],      // June
    [0.0046, 86.98],      // July
    [0.1134, 78.41],      // August
    [0.0185, 70.47],      // September
    [0.0289, 65.92],      // October
    [0.1232, 97.51],      // November
    [0.0320, 87.18],      // December
    [1.3422, 301.5]       // Annual
  ];

  const colorLayer = useMemo(() => {
    // Only render the color layer if we have valid data for the currently selected units
    // This prevents rendering stale data when switching units
    if (!asciiGrid || isLoading) {
      return null;
    }
    
    return (
      <UncertaintyColorLayer
        key={`color-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: {
            colors: [],
            range: selectedUnits == Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod],
          },
          asciiGrid,
        }}
      />
    );
  }, [asciiGrid, selectedUnits, selectedPeriod, isLoading]);

 
  if (!allDataLoaded) {
    return (
      <div style={{padding: "20px"}} className="text-center">
        <p style={{padding: "10px"}}>Loading Data</p>
        <GridLoader/>
      </div>
      
    );
  }

  return (
    <div className="flex w-full h-full max-h-full">
      <SideBar
        selectedUnits={selectedUnits}
        selectedPeriod={selectedPeriod}
        asciiGrids={asciiGrids}
        canShowGridValues={!gridsAreLoading && selectedGridIndex != -1}
        selectedGridIndex={selectedGridIndex}
        location={location}
        range={selectedUnits == Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod]}
        units={selectedUnits == Units.IN ? 'in²' : 'mm²'}
      />
      <div className="w-full h-full">
        <Map
          startPosition={defaultSettings.startPosition}
          startZoom={defaultSettings.zoom}
          zoomSnap={zoomSnap}
          zoomDelta={zoomDelta}
          minZoom={minZoom}
          maxBounds={defaultSettings.maxBounds}
        >
          {/* Use key prop to allow basemap to change instantly upon selection (any unique value is good) */}
          <TileLayer
            key={tileLayerProps.name}
            url={tileLayerProps.url}
            attribution={tileLayerProps.attribution}
            maxZoom={tileLayerProps.maxZoom ?? 13}
          />

          {showUncertainty && colorLayer}

          {asciiGrid && <PopupOnClick
            isLoading={isLoading}
            grid={asciiGrid}
            selectedUnits={selectedUnits}
            selectedPeriod={selectedPeriod}
            location={location}
            setLocation={setLocation}
            setSelectedGridIndex={setSelectedGridIndex}
          />}

          <MapOverlay
            selectedUnits={selectedUnits}
            setSelectedUnits={setSelectedUnits}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            tileLayerProps={tileLayerProps}
            setTileLayerProps={setTileLayerProps}
            showGrids={showGrids}
            setShowGrids={setShowGrids}
            showUncertainty={showUncertainty}
            setShowUncertainty={setShowUncertainty}
            isLoading={isLoading}
            gridsAreLoading={gridsAreLoading}
            minimap={true}

            showRFStations={false}
            setShowRFStations={() => {}}
            showOtherStations={false}
            setShowOtherStations={() => {}}
            showIsohyets={false}
            setShowIsohyets={() => {}}

          />
        </Map>
      </div>
    </div>
  );
}

export default UncertaintyMap;
