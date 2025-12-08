import React, { useState, useMemo, useEffect } from "react";
import Map from "../Map";
import { Units, Period, TileLayerProps } from "@/lib";
import { defaultSettings } from "@/constants";
import { TileLayer, Popup, Marker, useMap, useMapEvent } from "react-leaflet";
import L, { LatLng } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import { RainfallColorLayer } from "../RainfallMap/RainfallColorLayer";
import { useEvapotranspirationComposite, useEvapotranspirationAllGrids } from "@/hooks/evaporation";
import { GridLoader } from "react-spinners";
import ColorScaleLegend from "../shared/ColorScaleLegend";

const zoomSnap = 0.75;
const zoomDelta = 0.75;
const minZoom = 6;

const ETTypeSelector = ({ 
  selectedType, 
  onTypeChange 
}: { 
  selectedType: string; 
  onTypeChange: (type: string) => void;
}) => {
  const types = [
    { value: 'aet', label: 'Actual ET' },
    { value: 'air-density', label: 'Air Density' },
    { value: 'available-energy', label: 'Available Energy' },
    { value: 'canopy-conductance', label: 'Canopy Conductance' },
  ];

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white rounded-lg shadow-md p-2">
      <select 
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-3 py-1 border rounded"
      >
        {types.map(type => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>
    </div>
  );
};

const PopupOnClick = ({
  isLoading,
  selectedUnits,
  selectedPeriod,
  selectedType,
  location,
  setLocation,
  setSelectedGridIndex,
  grid,
}: {
  isLoading: boolean;
  selectedUnits: Units;
  selectedPeriod: Period;
  selectedType: string;
  setSelectedGridIndex: (index: number) => void;
  location: LatLng | null;
  setLocation: (loc: LatLng) => void;
  grid: any;
}) => {
  const [gridValue, setGridValue] = useState<number | null>(null);

  useEffect(() => {
    if (!location || !grid) {
      setGridValue(null);
      return;
    }

    const { ncols, nrows, xllcorner, yllcorner, cellsize } = grid.header;
    const offset = new LatLng(location.lat - yllcorner, location.lng - xllcorner);

    const x = Math.floor(offset.lng / cellsize);
    const y = Math.floor(nrows - offset.lat / cellsize);

    const xValid = x >= 0 && x < ncols;
    const yValid = y >= 0 && y < nrows;

    if (!xValid || !yValid) {
      setGridValue(null);
    } else {
      const index = ncols * y + x;
      const value = grid.values[index];
      if (value) {
        setGridValue(value);
        setSelectedGridIndex(index);
      } else {
        setGridValue(null);
        setSelectedGridIndex(-1);
      }
    }
  }, [location, grid, setSelectedGridIndex]);

  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });

  const periodText = selectedPeriod === 12 ? "annual" : Period[selectedPeriod];
  const typeLabels: Record<string, string> = {
    'aet': 'Actual Evapotranspiration',
    'air-density': 'Air Density',
    'available-energy': 'Available Energy',
    'canopy-conductance': 'Canopy Conductance',
  };

  return gridValue && location ? (
    <>
      <Popup position={location}>
        <div className="flex flex-col gap-3">
          Location: Lat: {location.lat.toFixed(4)}, Lon: {location.lng.toFixed(4)}
          <hr />
          {isLoading ? (
            `Loading ${periodText} ${typeLabels[selectedType]}...`
          ) : (
            `${typeLabels[selectedType]}: ${gridValue.toFixed(4)} ${selectedType === 'aet' ? selectedUnits.toLowerCase() : 'units'}`
          )}
        </div>
      </Popup>
      <Marker
        position={location}
        icon={L.divIcon({
          html: `<svg width="25" height="25" viewBox="0 0 100 100">
            <path d="M10 10 L90 90 M90 10 L10 90" stroke="red" stroke-width="25" stroke-opacity="0.9" fill="none" />
          </svg>`,
          className: '',
          iconSize: [25, 25],
          iconAnchor: [12.5, 12.5],
        })}
      />
    </>
  ) : null;
};

const EvapotranspirationMap: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('aet');
  const [selectedUnits, setSelectedUnits] = useState<Units>(Units.IN);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.Annual);
  const [showGrids, setShowGrids] = useState<boolean>(true);
  const [selectedGridIndex, setSelectedGridIndex] = useState<number>(-1);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [tileLayerProps, setTileLayerProps] = useState<TileLayerProps>({
    name: "Street",
    url: "https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Load data for current selection
  const { 
    asciiGrid, 
    isLoading, 
    allDataLoaded,
    error 
  } = useEvapotranspirationComposite(selectedType, selectedUnits, selectedPeriod);

  // Preload all grids for the selected type
  const { asciiGrids, gridsAreLoading } = useEvapotranspirationAllGrids(
    selectedType, 
    selectedUnits
  );

  // Show loading screen only on initial load
  const showLoadingScreen = isLoading && !asciiGrid;
  
  // Show error message if data fails to load
  if (error && !asciiGrid) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md p-8 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600">Failed to load evapotranspiration data. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Calculate data range for legend
  const dataRange = useMemo(() => {
    if (!asciiGrid || !asciiGrid.values) return { min: 0, max: 100 };
    const values = Object.values(asciiGrid.values).filter(v => Number.isFinite(v)) as number[];
    if (values.length === 0) return { min: 0, max: 100 };
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }, [asciiGrid]);

  const colorLayer = useMemo(() => {
    if (!asciiGrid || !showGrids || !asciiGrid.header || !asciiGrid.values) return null;
    return (
      <RainfallColorLayer
        key={`${selectedType}-${selectedPeriod}-${selectedUnits}`}
        options={{
          cacheEmpty: true,
          colorScale: {
            colors: [],
            range: [dataRange.min, dataRange.max],
          },
          asciiGrid,
        }}
      />
    );
  }, [asciiGrid, showGrids, selectedType, selectedPeriod, selectedUnits, dataRange]);

  // Get label and unit based on type
  const legendConfig = useMemo(() => {
    const configs: Record<string, { label: string; unit: string }> = {
      'aet': { label: 'Actual Evapotranspiration', unit: selectedUnits.toLowerCase() },
      'air-density': { label: 'Air Density', unit: 'kg/m³' },
      'available-energy': { label: 'Available Energy', unit: 'W/m²' },
      'canopy-conductance': { label: 'Canopy Conductance', unit: 'm/s' },
    };
    return configs[selectedType] || configs['aet'];
  }, [selectedType, selectedUnits]);

  if (showLoadingScreen) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <GridLoader />
          <p className="mt-4">Loading evapotranspiration data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Map
        startPosition={defaultSettings.startPosition}
        startZoom={defaultSettings.zoom}
        zoomSnap={zoomSnap}
        zoomDelta={zoomDelta}
        minZoom={minZoom}
        maxBounds={defaultSettings.maxBounds}
      >
        <TileLayer
          key={tileLayerProps.name}
          url={tileLayerProps.url}
          attribution={tileLayerProps.attribution}
          maxZoom={tileLayerProps.maxZoom ?? 13}
        />

        {colorLayer}

        {asciiGrid && (
          <PopupOnClick
            isLoading={isLoading}
            selectedUnits={selectedUnits}
            selectedPeriod={selectedPeriod}
            selectedType={selectedType}
            location={location}
            setLocation={setLocation}
            setSelectedGridIndex={setSelectedGridIndex}
            grid={asciiGrid}
          />
        )}

        <MapOverlay
          selectedUnits={selectedUnits}
          setSelectedUnits={setSelectedUnits}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          showRFStations={false}
          setShowRFStations={() => {}}
          showOtherStations={false}
          setShowOtherStations={() => {}}
          showIsohyets={false}
          setShowIsohyets={() => {}}
          tileLayerProps={tileLayerProps}
          setTileLayerProps={setTileLayerProps}
          showGrids={showGrids}
          setShowGrids={setShowGrids}
          showUncertainty={false}
          setShowUncertainty={() => {}}
          isLoading={isLoading}
          gridsAreLoading={gridsAreLoading}
          minimap={true}
          setLocation={setLocation}
        />

        <ETTypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
        
        {/* Color scale legend */}
        {asciiGrid && showGrids && (
          <ColorScaleLegend
            min={dataRange.min}
            max={dataRange.max}
            unit={legendConfig.unit}
            label={legendConfig.label}
            position="bottom-left"
          />
        )}
        
        {/* Loading indicator for type/period switches */}
        {isLoading && asciiGrid && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1000] bg-white rounded-lg shadow-md px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span className="text-sm">Loading...</span>
            </div>
          </div>
        )}
      </Map>
    </div>
  );
};

export default EvapotranspirationMap;