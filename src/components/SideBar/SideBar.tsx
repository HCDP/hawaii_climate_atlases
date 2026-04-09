import React, { useState, useRef, useEffect } from 'react';
import Plot from '@/components/Plot';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Station, Units, Period, AsciiGrid, Month, Hour } from "@/lib";
import { StationIcon } from "@/components/maps/Map";
import { LatLng } from "leaflet";
import { Button } from '@heroui/button';
import { UncertaintyHistogram, MonthPlot, HourPlot } from '@/components/Plot';
import { data } from 'framer-motion/client';

const fullPeriods = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Annual'];
const periods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Ann'];

const SideBar: React.FC<{
  selectedStation?: Station | null,
  isOtherStation?: boolean,
  selectedUnits: Units,
  selectedPeriod: Period,
  selectedMonth: Month | null,
  selectedHour: Hour | null,
  selectedVariable: string,
  asciiGrids: AsciiGrid[],
  hourlyAsciiGrids?: AsciiGrid[],
  canShowGridValues: boolean,
  selectedGridIndex: number,
  location: LatLng | null,
  range: [number, number],
  uncertaintyRange?: [number, number],
  units: string,
  dataMode: 'rainfall' | 'evap',
  isLoading?: boolean,
  isTableLoading?: boolean,
}> = ({
  selectedStation,
  isOtherStation,
  selectedUnits,
  selectedPeriod,
  selectedMonth,
  selectedHour,
  selectedVariable,
  asciiGrids,
  hourlyAsciiGrids = [],
  canShowGridValues,
  selectedGridIndex,
  range,
  units,
  location,
  dataMode,
  isLoading = false,
  isTableLoading = false,
}) => {
    const isRainfall = dataMode === 'rainfall';
    const hasLocation = location !== null || selectedStation != null;
    const [showErrorBars, setShowErrorBars] = useState(false);

    console.log('[SideBar] isLoading:', isLoading, 'isTableLoading:', isTableLoading, 'isRainfall:', isRainfall);

    // Handles resize bar functionality
    const [width, setWidth] = useState(24);
    const isResizing = useRef(false);
    useEffect(() => {
      // Adjust sidebar width based on how much the user moves mouse left/right
      const handleMouseMove = (e: MouseEvent) => {
        if (isResizing.current) {
          const remX = e.clientX / parseFloat(getComputedStyle(document.documentElement).fontSize);
          const newWidth = Math.min(Math.max(remX, 24), 32); // 24rem = min, 28 = max width
          setWidth(newWidth);
        }
      };

      const handleMouseUp = () => {
        isResizing.current = false;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);

    const stationAverages: number[] = selectedStation ? periods.map(month =>
      Math.max(Number(selectedStation[`${month}Avg${selectedUnits}` as keyof typeof selectedStation]), 0)
    ) : [];

    const stationUncertainty: number[] = selectedStation ? periods.map(month => {
      const value = Number(selectedStation[`${month}SD_${selectedUnits.toLocaleLowerCase()}` as keyof typeof selectedStation]);
      // Filter out -9999 (no data marker) and treat as 0
      return value === -9999 ? 0 : Math.max(value, 0);
    }) : [];

    // Grab data up to december
    const gridData: number[] = canShowGridValues ? asciiGrids.slice(0, -1).map(asciiGrid =>
      asciiGrid.values[selectedGridIndex]
    ) : [];

    const hourlyGridData: number[] = canShowGridValues && hourlyAsciiGrids.length > 0
      ? hourlyAsciiGrids.map(asciiGrid => asciiGrid.values[selectedGridIndex])
      : [];

    const rainfallColumns = [
      { key: "period", label: "Month" },
      { key: "map_data", label: "Map" },
      { key: "map_uncert", label: "Uncert." },
      { key: "station_avg", label: "Station" },
      { key: "station_uncert", label: "Uncert." },
    ];

    const rainfallRows = fullPeriods.map((period, index) => {
      const gridValue = canShowGridValues ? asciiGrids[index]?.values[selectedGridIndex] : undefined;
      return {
        key: index,
        period: period,
        map_data: gridValue != null ? Math.round(gridValue * 100) / 100 : "",
        station_avg: selectedStation ? Math.round(stationAverages[index] * 100) / 100 : "",
        station_uncert: selectedStation ? Math.round(stationUncertainty[index] * 100) / 100 : "",
      };
    })

    const evapRows = fullPeriods.map((period, index) => {
      const gridValue = canShowGridValues ? asciiGrids[index]?.values[selectedGridIndex] : undefined;
      return {
        key: index,
        period: period,
        data: gridValue != null ? Math.round(gridValue * 100) / 100 : "",
      };
    })

    const stationColumns = [
      { key: "field", label: "Field" },
      { key: "value", label: "Value" },
    ];

    const stationRows = selectedStation ? [
      { key: "skn", field: "SKN", value: `${selectedStation["SKN"]}` },
      { key: "name", field: "Name", value: `${selectedStation["Name"]}` },
      { key: "observer", field: "Observer", value: `${selectedStation["Observer"]}` },
      { key: "location", field: "Location", value: `${selectedStation["Lat_DD"]}, ${selectedStation["Lon_DD"]}` },
      {
        key: "elevation",
        field: "Elevation",
        value: `${selectedStation["ElevM"]} meters / ${selectedStation["ElevFT"]} feet`
      },
      { key: "period", field: "Record Period", value: `${selectedStation["MinYear"]} - ${selectedStation["MaxYear"]}` },
      { key: "sources", field: "Data Sources", value: `${selectedStation["DataSources"]}` },
      { key: "status", field: "Station Status", value: `${selectedStation["StationStatus"]}` },
    ] : [];

    const evapColumns = [
      { key: "period", label: "Month" },
      { key: "data", label: `${selectedVariable}` },
    ];

    return (
      <>
        <div
          className="flex flex-col max-h-full relative"
          style={{ minWidth: `${width}rem` }}
        >
          {isLoading && (
            <div className="absolute inset-0 z-20 bg-white/80 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-gray-500 font-semibold">Loading data...</p>
              </div>
            </div>
          )}
          <div className="overflow-y-auto px-4 pt-0 mt-0">
            {!hasLocation && !isLoading && (
              <div className="sticky top-0 z-10 bg-white/90 flex items-center justify-center py-8">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-gray-500 font-semibold text-lg">No location selected</p>
                  <p className="text-gray-400 text-sm mt-1">Click on the map to view data</p>
                </div>
              </div>
            )}
            <div className={!hasLocation ? "opacity-30 pointer-events-none" : ""}>
            <Accordion
              isCompact
              defaultExpandedKeys=
                {isRainfall ? ["uncertainty-chart", "data-chart", "data-table", "station-information", "legend"] 
                  : ["graphs", "data-tables", "legend"]}
              variant="light"
              selectionMode="multiple"
            >

              {/* isRainfall is used to hide charts if not applicable to rainfall map*/}
              {isRainfall ? (
              <AccordionItem
                key="uncertainty-chart"
                aria-label="uncertainty-chart"
                title={'Uncertainty Chart'}
                classNames={{ title: "font-extrabold text-gray-600", trigger: "" }}
              >
                <div className="h-[300px] shrink-0">
                  <UncertaintyHistogram
                    data={stationUncertainty.slice(0, -1)} // First 12 months (excluding annual)
                    units={selectedUnits === Units.IN ? 'in²' : 'mm²'}
                    title="Monthly Station Uncertainty"
                  />
                </div>
              </AccordionItem>
              ) : (
                <AccordionItem key="Hour-hidden" className="hidden">
                </AccordionItem>
              )}

              {isRainfall ? (
              <AccordionItem
                key="rainfall-chart"
                aria-label="rainfall-chart"
                title={'Rainfall Chart'}
                classNames={{ title: "font-extrabold text-gray-600", trigger: "" }}
              >
                <div className="h-[375px] p-4 shrink-0 flex flex-col justify-items-center">
                  <Plot
                    stationName={selectedStation?.Name ?? ""}
                    xdata={periods.slice(0, -1)}
                    stationAverages={stationAverages.slice(0, -1)}
                    stationUncertainty={stationUncertainty.slice(0, -1)}
                    gridData={gridData}
                    units={selectedUnits}
                    location={location}
                    showErrorBars={showErrorBars}
                  />
                  {selectedStation && (
                    <Button
                      className="w-[300px] mx-auto"
                      onPress={() => setShowErrorBars(!showErrorBars)}
                    >
                      {!showErrorBars ? "Show uncert." : "Hide uncert."}
                    </Button>
                  )}
                </div>
              </AccordionItem>
              ) : (
                <AccordionItem key="Hour-hidden" className="hidden">
                </AccordionItem>
              )}

              {isRainfall ? (
              <AccordionItem
                key="rainfall-data"
                aria-label="Rainfall Data"
                title={`Rainfall Data (${selectedUnits.toLocaleLowerCase()})`}
                classNames={{ title: "font-extrabold text-gray-600", trigger: "" }}
              >
                {selectedStation && (
                  <>
                    {!isOtherStation ? (
                      <Table
                        removeWrapper
                        isCompact
                        classNames={{ th: "first:rounded-s-md last:rounded-e-md" }}
                        aria-label="Rainfall data table"
                      >
                        <TableHeader columns={rainfallColumns}>
                          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={rainfallRows}>
                          {item => (
                            <TableRow key={item.key}>
                              {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      "N/A"
                    )}
                  </>
                )}
              </AccordionItem>
              ) : (
                <AccordionItem key="Hour-hidden" className="hidden">
                </AccordionItem>
              )}

              {isRainfall ? (
              <AccordionItem
                key="station-information"
                aria-label="Station Information"
                title="Station Information"
                classNames={{
                  title: "font-extrabold text-gray-600"
                }}
              >
                <Table
                  hideHeader
                  removeWrapper
                  isCompact
                  classNames={{ th: "first:rounded-s-md last:rounded-e-md" }}
                  aria-label="Station information table"
                >
                  <TableHeader columns={stationColumns}>
                    {(column) => <TableColumn key={column.key}
                      align={column.key === 'value' ? 'end' : 'start'}>{column.label}</TableColumn>}
                  </TableHeader>
                  <TableBody items={stationRows}>
                    {item => (
                      <TableRow key={item.key}>
                        {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionItem>
              ) : (
                <AccordionItem key="Hour-hidden" className="hidden">
                </AccordionItem>
              )}

              {isRainfall ? (
              <AccordionItem
                key="legend"
                aria-label="rainfall-Legend"
                title="Legend"
                classNames={{
                  title: "font-extrabold text-gray-600"
                }}
              >
                <div
                  className="inline-flex flex-row w-full"
                  style={{ columnGap: width <= 26.5 ? '8%' : width < 30.5 ? '18%' : '30%' }}
                >
                  {/* For stations icons */}
                  <div>
                    <h1 className="font-bold">RF Atlas Stations</h1>
                    <div className="flex flex-col pl-2">
                      <div className="flex flex-row gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <StationIcon stationStatus="Current" showBorder={true} transform="translate(2, 2)" />
                        </svg>
                        <p>Current</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <StationIcon stationStatus="Discontinued" showBorder={true} transform="translate(2, 2)" />
                        </svg>
                        <p>Discontinued</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <StationIcon stationStatus="Virtual" showBorder={true} transform="translate(2, 2)" />
                        </svg>
                        <p>Virtual</p>
                      </div>
                    </div>
                    <h1 className="font-bold mt-[5px]">
                      Other Stations
                    </h1>
                    <div className="flex flex-col p-2">
                      <div className="flex flex-row gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <StationIcon stationStatus="Current" other showBorder={true} transform="translate(2, 2)" />
                        </svg>
                        <p>Current</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <StationIcon stationStatus="Discontinued" other showBorder={true} transform="translate(2, 2)" />
                        </svg>
                        <p>Discontinued</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold mb-[5px]">Rainfall Grid</h1>
                    <h1>({selectedPeriod > 11 ? 'Annual' : fullPeriods[selectedPeriod]})</h1>
                    <div className="inline-flex flex-row mt-[5px]">
                      <div
                        className="w-[30px] h-[75px]"
                        style={{
                          background: units.includes('²')
                            ? 'linear-gradient(to bottom, #ffeda0, #fed976, #feb24c, #fd8d3c, #fc4e2a, #e31a1c, #bd0026, #800026)'
                            : 'linear-gradient(to bottom, indigo, purple, blue, green, yellow, red)'
                        }}
                      />
                      <div className="ml-[10px]">
                        <h1>High: {range[1] + ' ' + units}</h1>
                        <h1 className="mt-[25px]">Low: {range[0] + ' ' + units}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionItem>
              ) : (
                <AccordionItem key="legend-hidden" className="hidden">
                </AccordionItem>
              )}

              {/* For non-rainfall charts */}
              {!isRainfall ? (
              <AccordionItem
                key="graphs"
                aria-label="graphs"
                title={'Graphs'}
                classNames={{ title: "font-extrabold text-gray-600", trigger: "" }}
              >
                <div className="h-[300px] shrink-0 border-2 border-gray-300 rounded">
                  <MonthPlot
                    data={gridData.slice(0, -1)} // First 12 months (excluding annual)
                    units={selectedUnits.toLocaleLowerCase()}
                    selectedVariable={selectedVariable}
                    title={`${selectedVariable} By Month`}
                  />
                </div>
                <div className="h-[300px] shrink-0 border-2 border-gray-300 rounded mt-4">
                  <HourPlot
                    data={hourlyGridData}
                    units={selectedUnits.toLocaleLowerCase()}
                    selectedVariable={selectedVariable}
                    title={`Annual ${selectedVariable} Per Hour`}
                  />
                </div>
              </AccordionItem>
              ) : (
                <AccordionItem key="Hour-hidden" className="hidden">
                </AccordionItem>
              )}

              {/* for tables */}
              {!isRainfall ? (
              <AccordionItem
                key="data-tables"
                aria-label={`${selectedVariable} Data`}
                title={"Tables"}
                classNames={{ title: "font-extrabold text-gray-600", trigger: "" }}
              >
                {isTableLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <p className="text-gray-500 text-sm font-semibold">Loading table data...</p>
                    </div>
                  </div>
                ) : (
                <>
                <Table
                  removeWrapper
                  isCompact
                  classNames={{ th: "first:rounded-s-md last:rounded-e-md" }}
                  aria-label={`${selectedVariable} data table`}
                >
                  <TableHeader columns={evapColumns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                  </TableHeader>
                <TableBody items={evapRows}>
                  {item => (
                    <TableRow key={item.key}>
                      {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
                </Table>
                <Table
                  removeWrapper
                  isCompact
                  classNames={{ th: "first:rounded-s-md last:rounded-e-md" }}
                  aria-label={`${selectedVariable} data table`}
                >
                  <TableHeader columns={evapColumns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                  </TableHeader>
                <TableBody items={evapRows}>
                  {item => (
                    <TableRow key={item.key}>
                      {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
                </Table>
                </>
                )}
              </AccordionItem>
              ) : (
                <AccordionItem key="Hour-hidden" className="hidden">
                </AccordionItem>
              )}
            </Accordion>
            </div>
          </div>
        </div>
        {/* Resize bar */}
        <div
          onMouseDown={() => isResizing.current = true}
          className="w-3 h-full cursor-ew-resize bg-gray-400 flex items-center justify-center ml-[5px] select-none"
        >
          <div className="w-0.5 h-10 bg-black" />
        </div>
      </>
    );
  }

export default SideBar;
