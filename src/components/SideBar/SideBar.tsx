import React, { useState, useRef, useEffect } from 'react';
import Plot from '@/components/Plot';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Station, Units, Period, AsciiGrid } from "@/lib";
import { StationIcon } from "@/components/maps/Map";
import { LatLng } from "leaflet";
import { Button } from '@heroui/button';

const fullPeriods = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Annual'];
const periods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Ann'];

const SideBar: React.FC<{
  selectedStation?: Station | null,
  isOtherStation?: boolean,
  selectedUnits: Units,
  selectedPeriod: Period,
  asciiGrids: AsciiGrid[],
  canShowGridValues: boolean,
  selectedGridIndex: number,
  location: LatLng | null,
  range: [number, number],
  units: string,
}> = ({
  selectedStation,
  isOtherStation,
  selectedUnits,
  selectedPeriod,
  asciiGrids,
  canShowGridValues,
  selectedGridIndex,
  range,
  units,
  location
}) => {
  const [showErrorBars, setShowErrorBars] = useState(false);

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
  
  const stationUncertainty: number[] = selectedStation ? periods.map(month => 
    Math.max(Number(selectedStation[`${month}SD_${selectedUnits.toLocaleLowerCase()}` as keyof typeof selectedStation]), 0)
  ) : [];

  // Grab data up to december
  const gridData: number[] = canShowGridValues ? asciiGrids.slice(0, -1).map(asciiGrid =>
    asciiGrid.values[selectedGridIndex]
  ) : [];

  const rainfallColumns = [
    { key: "period", label: "Month" },
    { key: "map_data", label: "Map" },
    { key: "map_uncert", label: "Uncert." },
    { key: "station_avg", label: "Station" },
    { key: "station_uncert", label: "Uncert." },
  ];

  const rainfallRows = fullPeriods.map((period, index) => {
    return {
      key: index,
      period: period,
      map_data: canShowGridValues ? Math.round(asciiGrids[index].values[selectedGridIndex] * 100) / 100 : "",
      station_avg: selectedStation ? Math.round(stationAverages[index] * 100) / 100 : "",
      station_uncert: selectedStation ? Math.round(stationUncertainty[index] * 100) / 100 : "",
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

  return (
    <>
      <div
        className="flex flex-col max-h-full"
        style={{ minWidth: `${width}rem` }}
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
        <div className="overflow-y-auto px-4 pt-0 mt-0">
          <Accordion
            isCompact
            defaultExpandedKeys={["rainfall-data", "station-information", "legend"]}
            variant="light"
            selectionMode="multiple"
          >
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
            <AccordionItem
              key="legend"
              aria-label="Legend"
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
                        background: 'linear-gradient(to bottom, indigo, purple, blue, green, yellow, red)'
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
          </Accordion>
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
