import React from 'react';
import Plot from '@/components/Plot';
import { Station, Units } from "@/lib";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/table";

const fullMonths = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SideBar: React.FC<{
  selectedStation?: Station,
  selectedUnits: Units,
}> = ({ selectedStation, selectedUnits }) => {

  const stationData: number[] = selectedStation ? months.map(month =>
    Math.max(selectedStation[`${month}Avg${selectedUnits}` as keyof typeof selectedStation] as number, 0)
  ) : [];

  const rainfallColumns=[
    { key: "month", label: "Month" },
    { key: "data", label: `Rainfall (${selectedUnits.toLocaleLowerCase()})` },
  ];

  const rainfallRows = fullMonths.map((month, index) => {
    return {
      key: index,
      month:  month,
      data: Math.round(stationData[index] * 100) / 100,
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
    { key: "elevation", field: "Elevation", value: `${selectedStation["ElevM"]} meters / ${selectedStation["ElevFT"]} feet` },
    { key: "period", field: "Record Period", value: `${selectedStation["MinYear"]} - ${selectedStation["MaxYear"]}` },
    { key: "sources", field: "Data Sources", value: `${selectedStation["DataSources"]}` },
    { key: "status", field: "Station Status", value: `${selectedStation["StationStatus"]}` },
  ] : [];

  return (
    <div className="flex flex-col max-h-full">
      <div className="h-[300px] p-4 shrink-0">
        <Plot
          stationName={selectedStation && selectedStation.Name}
          xdata={months}
          ydata={selectedStation && stationData}
          units={selectedUnits}
        />
      </div>
      <div className="overflow-y-auto px-4 pt-0 mt-0">
        {selectedStation && (
          <Accordion
            isCompact
            defaultExpandedKeys={["rainfall-data", "station-information", "legend"]}
            variant="light"
            selectionMode="multiple"
          >
            <AccordionItem
              key="rainfall-data"
              aria-label="Rainfall Data"
              title="Rainfall Data"
              classNames={{ title: "font-extrabold text-gray-600", trigger: "" }}
            >
              <Table
                removeWrapper
                isCompact
                classNames={{ th: "first:rounded-s-md last:rounded-e-md" }}
                aria-label="Rainfall data table"
              >
                <TableHeader columns={rainfallColumns}>
                  {(column) => <TableColumn key={column.key} align={column.key === 'data' ? 'end' : 'start'}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rainfallRows}>
                  {item => (
                    <TableRow key={item.key}>
                      {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
                  {(column) => <TableColumn key={column.key} align={column.key === 'value' ? 'end' : 'start'}>{column.label}</TableColumn>}
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
              <h3 className="text-center font-extrabold text-gray-600">Legend</h3>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default SideBar;
