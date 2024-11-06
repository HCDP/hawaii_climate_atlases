import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PlotProps } from '@/components/Plot';
import { Station } from '@/components/Map';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import {getKeyValue} from "@nextui-org/react";

const fullMonths = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SideBar: React.FC<{
  selectedStation: Station | null,
  selectedUnits: "IN" | "MM",
}> = ({ selectedStation, selectedUnits }) => {
  const Plot = useMemo(
    () => dynamic<Partial<PlotProps>>(
      () => import('../Plot'),
      {
        loading: () => (
          <p>
            Loading Plotly
          </p>
        ),
        ssr: false,
      },
    ), []);

  const stationData: number[] = selectedStation ? months.map(month =>
    Math.max(selectedStation[`${month}Avg${selectedUnits}`], 0)
  ) : [];

  const rainfallColumns=[
    { key: "month", label: "Month" },
    { key: "data", label: "Rainfall" },
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
    { key: "skn", field: "SKN", value: selectedStation["SKN"] },
    { key: "name", field: "Name", value: selectedStation["Name"] },
    { key: "observer", field: "Observer", value: selectedStation["Observer"] },
  ] : [];

  return (
    <div className="flex flex-col max-h-full p-4">
      <div className="h-[300px]">
        <Plot
          stationName={selectedStation && selectedStation.Name}
          xdata={months}
          ydata={selectedStation && stationData}
          units={selectedUnits}
        />
      </div>
      <div className="overflow-y-auto">
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
              classNames={{ title: "font-extrabold text-gray-600" }}
            >
              <Table
                removeWrapper
                isCompact
                classNames={{ th: "first:rounded-s-md last:rounded-e-md" }}
              >
                <TableHeader columns={rainfallColumns}>
                  <TableColumn key="month">Month</TableColumn>
                  <TableColumn key="data" align="end">Rainfall</TableColumn>
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
              >
                <TableHeader columns={stationColumns}>
                  {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
