"use client"

import { Accordion, AccordionItem } from "@heroui/accordion";

export default function Downloads() {
  const itemClasses = {
    title: "font-bold text-lg"
  }
  const defaultContent =
    "Lorem ipsum dolor s"
  return (
    <div className="flex flex-col mt-14 max-w-[62rem] mx-auto gap-5">
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
              <p><strong>Isohyets:</strong></p>
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
              <div className="px-3">
                <table className="bordered-table">
                  <thead>
                  <tr>
                    <th>Coverage</th>
                    <th>Inches</th>
                    <th>Millimeters</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Hawai‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiIsohyetTIFs_inches.zip"
                      >
                        HawaiiIsohyetTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiIsohyetTIFs_mm.zip"
                      >
                        HawaiiIsohyetTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Kaua‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiIsohyetTIFs_inches.zip"
                      >
                        KauaiIsohyetTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiIsohyetTIFs_mm.zip"
                      >
                        KauaiIsohyetTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui Nui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiIsohyetTIFs_inches.zip"
                      >
                        MauiNuiIsohyetTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiIsohyetTIFs_mm.zip"
                      >
                        MauiNuiIsohyetTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>O‘ahu</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuIsohyetTIFs_inches.zip"
                      >
                        OahuIsohyetTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuIsohyetTIFs_mm.zip"
                      >
                        OahuIsohyetTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Color Maps:</strong></p>
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
              <div className="px-3">
                <table className="bordered-table">
                  <thead>
                  <tr>
                    <th>Coverage</th>
                    <th>Inches</th>
                    <th>Millimeters</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>State</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/StateMapTIFs_inches.zip"
                      >
                        StateMapTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/StateMapTIFs_mm.zip"
                      >
                        StateMapTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Hawai‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiMapTIFs_inches.zip"
                      >
                        HawaiiMapTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiMapTIFs_mm.zip"
                      >
                        HawaiiMapTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Kaua‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiMapTIFs_inches.zip"
                      >
                        KauaiMapTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiMapTIFs_mm.zip"
                      >
                        KauaiMapTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui Nui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiMapTIFs_inches.zip"
                      >
                        MauiNuiMapTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiMapTIFs_mm.zip"
                      >
                        MauiNuiMapTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>O‘ahu</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuMapTIFs_inches.zip"
                      >
                        OahuMapTIFs_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuMapTIFs_mm.zip"
                      >
                        OahuMapTIFs_mm.zip
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem key="gis-layers" aria-label="GIS Layers" title="GIS Layers">
          <div className="flex flex-col gap-10 mb-2">
            <p>
              GIS layers of the rainfall isohyets, rainfall grids, raingage stations, and uncertainty have been made
              available for download. Users can download the isohyets and stations as shapefiles, and the rainfall and
              uncertainty grids have been made available in ESRI and ASCII grid formats. These are available in either
              inches or millimeters, and each compressed *.zip file contains all 12 months plus the annual map. Rainfall
              isohyets and grids are available for the entire state or users can choose to download individual
              islands (Maui Nui includes the islands of Maui, Moloka‘i, Lāna‘i and Kaho‘olawe). Two station shapefiles
              are
              available (the same station information used in the interactive map), and the uncertainty grids are only
              available at the statewide extent. All files use geographic coordinates, WGS84 datum.
              <br />
              <br />
              For more information about GIS, how to use GIS layers, or to obtain more Hawai‘i layers, please refer to
              the
              Hawai‘i State GIS page,&nbsp;
              <a
                className="link"
                href="http://www.state.hi.us/dbedt/gis/download.htm"
              >
                http://www.state.hi.us/dbedt/gis/download.htm
              </a>.
              After
              downloading, users can upload layers to ArcGIS Online to make their own maps as an alternative to using a
              desktop GIS program,&nbsp;
              <a
                className="link"
                href="http://www.arcgis.com/home/"
              >
                http://www.arcgis.com/home/
              </a>.
            </p>
            <div className="space-y-2">
              <p><strong>Rainfall Grids:</strong></p>
              <p>
                Raster files are available at 250m resolution (0.00225 x 0.00225 cell size) for each island and for the
                state. These are available in inches or millimeters, and can be downloaded in ESRI grid format or ASCII
                grid format. These are the main output of this project, with the isohyets and other products being
                produced from these grids.
              </p>
              <ul className="ml-16 list-disc list-inside">
                <li>
                  <a
                    className="link"
                    href="https://atlas.uhtapis.org/rainfall/assets/files/PDF/Metadata_RFGrids.pdf"
                  >
                    Rainfall Grid Metadata
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <p>ESRI Grid Format:</p>
              <div className="px-3">
                <table className="bordered-table">
                  <thead>
                  <tr>
                    <th>Coverage</th>
                    <th>Inches</th>
                    <th>Millimeters</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>State</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateRFGrids_inches.zip"
                      >
                        StateRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateRFGrids_mm.zip"
                      >
                        StateRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Hawai‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/HawaiiRFGrids_inches.zip"
                      >
                        HawaiiRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/HawaiiRFGrids_mm.zip"
                      >
                        HawaiiRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Kaua‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/KauaiRFGrids_inches.zip"
                      >
                        KauaiRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/KauaiRFGrids_mm.zip"
                      >
                        KauaiRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui Nui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiNuiRFGrids_inches.zip"
                      >
                        MauiNuiRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiNuiRFGrids_mm.zip"
                      >
                        MauiNuiRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>O‘ahu</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/OahuRFGrids_inches.zip"
                      >
                        OahuRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/OahuRFGrids_mm.zip"
                      >
                        OahuRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiRFGrids_inches.zip"
                      >
                        MauiRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiRFGrids_mm.zip"
                      >
                        MauiRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Lāna‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/LanaiRFGrids_inches.zip"
                      >
                        LanaiRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/LanaiRFGrids_mm.zip"
                      >
                        LanaiRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Moloka‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MolokaiRFGrids_inches.zip"
                      >
                        MolokaiRFGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MolokaiRFGrids_mm.zip"
                      >
                        MolokaiRFGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-2">
              <p>ASCII Grid Format:</p>
              <div className="px-3">
                <table className="bordered-table">
                  <thead>
                  <tr>
                    <th>Coverage</th>
                    <th>Inches</th>
                    <th>Millimeters</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>State</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_inches.zip"
                      >
                        StateASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_mm.zip"
                      >
                        StateASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Hawai‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/HawaiiASCIIGrids_inches.zip"
                      >
                        HawaiiASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/HawaiiASCIIGrids_mm.zip"
                      >
                        HawaiiASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Kaua‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/KauaiASCIIGrids_inches.zip"
                      >
                        KauaiASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/KauaiASCIIGrids_mm.zip"
                      >
                        KauaiASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui Nui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiNuiASCIIGrids_inches.zip"
                      >
                        MauiNuiASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiNuiASCIIGrids_mm.zip"
                      >
                        MauiNuiASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>O‘ahu</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/OahuASCIIGrids_inches.zip"
                      >
                        OahuASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td><a
                      className="link"
                      href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/OahuASCIIGrids_mm.zip"
                    >
                      OahuASCIIGrids_mm.zip
                    </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiASCIIGrids_inches.zip"
                      >
                        MauiASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiASCIIGrids_mm.zip"
                      >
                        MauiASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Lāna‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/LanaiASCIIGrids_inches.zip"
                      >
                        LanaiASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/LanaiASCIIGrids_mm.zip"
                      >
                        LanaiASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Moloka‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MolokaiASCIIGrids_inches.zip"
                      >
                        MolokaiASCIIGrids_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MolokaiASCIIGrids_mm.zip"
                      >
                        MolokaiASCIIGrids_mm.zip
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Rainfall Isohyets:</strong></p>
              <p>
                Rainfall isohyet files are available as polyline shapefiles for each island and for the state. These are
                available in inches or millimeters, and the &#34;Contour&#34; column in the attribute table contains the
                isohyet
                labels. Both sets of isohyets (inches and mm) were created at appropriate intervals for their units, and
                therefore are not direct conversions of each other, though they are derived from the same data.
              </p>
              <ul className="ml-16 list-disc list-inside">
                <li>
                  <a className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/PDF/Metadata_RFIsohyets.pdf">
                    Isohyet Metadata
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="px-3">
                <table className="bordered-table">
                  <thead>
                  <tr>
                    <th>Coverage</th>
                    <th>Inches</th>
                    <th>Millimeters</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>State</td>
                    <td><a className="link"
                           href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_inches.zip"
                    >
                      StateIsohyetsSHP_inches.zip
                    </a>
                    </td>
                    <td><a
                      className="link"
                      href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_mm.zip"
                    >
                      StateIsohyetsSHP_mm.zip
                    </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Hawai‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/HawaiiIsohyetsSHP_inches.zip"
                      >
                        HawaiiIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/HawaiiIsohyetsSHP_mm.zip"
                      >
                        HawaiiIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Kaua‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/KauaiIsohyetsSHP_inches.zip"
                      >
                        KauaiIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/KauaiIsohyetsSHP_mm.zip"
                      >
                        KauaiIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui Nui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiNuiIsohyetsSHP_inches.zip"
                      >
                        MauiNuiIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiNuiIsohyetsSHP_mm.zip"
                      >
                        MauiNuiIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>O‘ahu</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/OahuIsohyetsSHP_inches.zip"
                      >
                        OahuIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/OahuIsohyetsSHP_mm.zip"
                      >
                        OahuIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Maui</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiIsohyetsSHP_inches.zip"
                      >
                        MauiIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MauiIsohyetsSHP_mm.zip"
                      >
                        MauiIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Lāna‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/LanaiIsohyetsSHP_inches.zip"
                      >
                        LanaiIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/LanaiIsohyetsSHP_mm.zip"
                      >
                        LanaiIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Moloka‘i</td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MolokaiIsohyetsSHP_inches.zip"
                      >
                        MolokaiIsohyetsSHP_inches.zip
                      </a>
                    </td>
                    <td>
                      <a
                        className="link"
                        href="https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/MolokaiIsohyetsSHP_mm.zip"
                      >
                        MolokaiIsohyetsSHP_mm.zip
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Raingage Stations:</strong></p>
              <p>

              </p>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem key="google-earth-files" aria-label="Google Earth Files" title="Google Earth Files">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="tabular" aria-label="Tabular" title="Tabular">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="report" aria-label="Report" title="Report">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="month-year-maps" aria-label="Month-Year Maps 1920-2012" title="Month-Year Maps 1920-2012">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="rainfall-trend-maps" aria-label="Rainfall Trend Maps 1920-2012"
                       title="Rainfall Trend Maps 1920-2012">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}