"use client"

import { Accordion, AccordionItem } from "@heroui/accordion";

export default function Downloads() {

  const defaultContent =
    "Lorem ipsum dolor s"
  return (
    <div className="flex flex-col mt-14 max-w-[62rem] mx-auto gap-5">
      <h1 className="text-xl font-bold -mt-5">Downloads</h1>
      <p>
        Click on the underlined links below to download the files. All data files with a “.zip” or “.rar” at the end
        need to be unzipped after downloading (using WinZIP, WinRAR, 7-Zip, or a similar program). Please regard <a
        href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Conditions
        of Use</a> for all Rainfall Atlas products and refer to our <a href="/how-to-cite" className="underline
        text-blue-600 hover:text-blue-800 visited:text-purple-600">How To Cite</a> page for citation information.
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
        selectionMode="multiple"
        variant="bordered"
        defaultExpandedKeys="all"
      >
        <AccordionItem key="map-images" aria-label="Map Images" title="Map Images">
          <div className="flex flex-col gap-10 mb-2">
            <p>
              Image files of the color zone rainfall maps as well as the isohyets have been created and are available
              for download as *.TIF files. The user has a choice of inches or millimeters, and each compressed *.zip
              file contains all 12 months plus the annual map. The color maps are available at a statewide extent as
              well as for each county, while the isohyets maps are only available for each island county (Maui Nui
              includes the islands of Maui, Moloka‘i, Lāna‘i and Kaho‘olawe).
            </p>
            <div className="space-y-2">
              <h2 className="font-bold">Isohyets:</h2>
              <div className="flex">
                <img
                  width="277"
                  height="215"
                  src="/images/download2_s.jpg"
                  alt="Mean October Rainfall Island of Kaua‘i"
                  className="mx-3"
                />
                <p>
                  These images show the mean monthly rainfall as isohyets, or lines of equal rainfall. Both sets of
                  isohyets (inches and mm) were created at appropriate intervals for their units, and therefore are not
                  direct conversions of each other, though they are derived from the same data. The labels are included
                  where they can fit, which means that not all isohyets are labeled, especially in steep gradient areas.
                  Please see the interactive map or download the GIS or Google Earth layers for more information on
                  isohyets labels.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p>Files for download:</p>
              <table className="border-1 border-collapse mx-3">
                <thead>
                <tr>
                  <th className="p-1 border-1 border-gray-300">Coverage</th>
                  <th className="p-1 border-1 border-gray-300">Inches</th>
                  <th className="p-1 border-1 border-gray-300">Millimeters</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className="p-1 border-1 border-gray-300">Hawai‘i</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiIsohyetTIFs_inches.zip">HawaiiIsohyetTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiIsohyetTIFs_mm.zip">HawaiiIsohyetTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">Kaua‘i</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiIsohyetTIFs_inches.zip">KauaiIsohyetTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiIsohyetTIFs_mm.zip">KauaiIsohyetTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">Maui Nui</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiIsohyetTIFs_inches.zip">MauiNuiIsohyetTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiIsohyetTIFs_mm.zip">MauiNuiIsohyetTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">O‘ahu</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuIsohyetTIFs_inches.zip">OahuIsohyetTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuIsohyetTIFs_mm.zip">OahuIsohyetTIFs_mm.zip</a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold">Color Maps:</h2>
              <div className="flex">
                <img
                  width="277"
                  height="215"
                  src="/images/download1_s.jpg"
                  alt="Mean October Rainfall Island of Kaua‘i"
                  className="mx-3"
                />
                <p>
                  Unlike the interactive map which shows the rainfall as a continuous color ramp, these images display
                  the rainfall in categories. The categories were set based on the natural breaks in the rainfall values
                  for each extent, with the minimum and maximum values in the legend corresponding to the minimum and
                  maximum values shown in the map extent. The categories were set independently for inches and
                  millimeters, so the two sets will differ slightly.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p>Files for download:</p>
              <table className="border-1 border-collapse mx-3">
                <thead>
                <tr>
                  <th className="p-1 border-1 border-gray-300">Coverage</th>
                  <th className="p-1 border-1 border-gray-300">Inches</th>
                  <th className="p-1 border-1 border-gray-300">Millimeters</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className="p-1 border-1 border-gray-300">State</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/StateMapTIFs_inches.zip">StateMapTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/StateMapTIFs_mm.zip">StateMapTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">Hawai‘i</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiMapTIFs_inches.zip">HawaiiMapTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiMapTIFs_mm.zip">HawaiiMapTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">Kaua‘i</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiMapTIFs_inches.zip">KauaiMapTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiMapTIFs_mm.zip">KauaiMapTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">Maui Nui</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiMapTIFs_inches.zip">MauiNuiMapTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiMapTIFs_mm.zip">MauiNuiMapTIFs_mm.zip</a></td>
                </tr>
                <tr>
                  <td className="p-1 border-1 border-gray-300">O‘ahu</td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuMapTIFs_inches.zip">OahuMapTIFs_inches.zip</a></td>
                  <td className="p-1 border-1 border-gray-300"><a className="underline" href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuMapTIFs_mm.zip">OahuMapTIFs_mm.zip</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem key="gis-layers" aria-label="GIS Layers" title="GIS Layers">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="google-earth-files" aria-label="Google Earth Files" title="Google Earth Files">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="tabular" aria-label="Google Earth Files" title="Google Earth Files">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="report" aria-label="Google Earth Files" title="Google Earth Files">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="Month-Year Maps 1920-2012" aria-label="Google Earth Files" title="Google Earth Files">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="Rainfall Trend Maps 1920-2012" aria-label="Google Earth Files" title="Google Earth Files">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}