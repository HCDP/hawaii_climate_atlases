"use client"

import { Accordion, AccordionItem } from "@heroui/accordion";
import MapImages from "@/app/rainfall/(main)/downloads/MapImages";
import GISLayers from "@/app/rainfall/(main)/downloads/GISLayers";
import GoogleEarthFiles from "@/app/rainfall/(main)/downloads/GoogleEarthFiles";
import Tabular from "@/app/rainfall/(main)/downloads/Tabular";
import Report from "@/app/rainfall/(main)/downloads/Report";
import MonthYearMaps from "@/app/rainfall/(main)/downloads/MonthYearMaps";
import RainfallTrendMaps from "@/app/rainfall/(main)/downloads/RainfallTrendMaps";

export default function Downloads() {
  const itemClasses = {
    title: "font-bold text-lg"
  }
  const defaultContent =
    "Lorem ipsum dolor s"
  return (
    <div className="flex flex-col my-14 max-w-[62rem] mx-auto gap-5">
      <h1 className="text-xl font-bold -mt-5">Downloads</h1>
      <p>
        Click on the underlined links below to download the files. All data files with a “.zip” or “.rar” at the end
        need to be unzipped after downloading (using WinZIP, WinRAR, 7-Zip, or a similar program). Please regard <a
        className="link" href="#">Conditions
        of Use</a> for all Rainfall Atlas products and refer to our <a className="link" href="/how-to-cite">How To
        Cite</a> page for
        citation information.
      </p>
      <p>All mean map products use the 30 year base period 1978-2007.</p>
      <p><span className="underline">*Added October, 2018:</span> Rainfall Trend Maps from 1920-2012 &
        1983-2012. See the Rainfall Trend Maps section
        below.</p>
      <p><span className="underline">*Added December, 2015:</span> Interactive map links for Month-Year
        Rainfall Maps from 1920-2012. See the Month-Year
        Maps section below.</p>
      <p><span className="underline">*Added August, 2015:</span> Month-Year Rainfall Maps from
        1920-2012. See the Month-Year Maps section below.</p>
      <p><span className="underline">*Added April, 2015:</span> Raingage station data (through 2012).
        See the Tabular section below.</p>
      <p>**The Moloka‘i maps have been updated! (07/2014) Using new information from stream gauges and
        additional
        vegetation data, we have a produced improved maps of mean rainfall for the island of Moloka‘i. All files below
        have been updated with these new maps.**</p>
      <Accordion
        itemClasses={itemClasses}
        selectionMode="multiple"
        variant="splitted"
        defaultExpandedKeys="all"
      >
        <AccordionItem key="map-images" aria-label="Map Images" title="Map Images">
          <MapImages />
        </AccordionItem>
        <AccordionItem key="gis-layers" aria-label="GIS Layers" title="GIS Layers">
          <GISLayers />
        </AccordionItem>
        <AccordionItem key="google-earth-files" aria-label="Google Earth Files" title="Google Earth Files">
          <GoogleEarthFiles />
        </AccordionItem>
        <AccordionItem key="tabular" aria-label="Tabular" title="Tabular">
          <Tabular />
        </AccordionItem>
        <AccordionItem key="report" aria-label="Report" title="Report">
          <Report />
        </AccordionItem>
        <AccordionItem key="month-year-maps" aria-label="Month-Year Maps 1920-2012" title="Month-Year Maps 1920-2012">
          <MonthYearMaps />
        </AccordionItem>
        <AccordionItem
          key="rainfall-trend-maps"
          aria-label="Rainfall Trend Maps 1920-2012"
          title="Rainfall Trend Maps 1920-2012"
        >
          <RainfallTrendMaps />
        </AccordionItem>
      </Accordion>
    </div>
  );
}