"use client"

import { Accordion, AccordionItem } from "@heroui/accordion";
import MapImages from "@/app/rainfall/(main)/downloads/MapImages";
import GISLayers from "@/app/rainfall/(main)/downloads/GISLayers";
import GoogleEarthFiles from "@/app/rainfall/(main)/downloads/GoogleEarthFiles";
import Tabular from "@/app/rainfall/(main)/downloads/Tabular";
import Report from "@/app/rainfall/(main)/downloads/Report";
import MonthYearMaps from "@/app/rainfall/(main)/downloads/MonthYearMaps";
import RainfallTrendMaps from "@/app/rainfall/(main)/downloads/RainfallTrendMaps";
import { useContext } from "react";
import { ConditionsOfUseContext } from "@/components/ConditionsOfUse";
import useRequiredConditionsOfUse from "@/hooks/useRequiredConditionsOfUse";

export default function Downloads() {
  const { onOpenConditionsOfUse } = useContext(ConditionsOfUseContext);
  useRequiredConditionsOfUse();

  const itemClasses = {
    title: "font-bold text-lg"
  }
  return (
    <div className="flex flex-col my-14 max-w-[62rem] mx-auto gap-5">
      <h1 className="text-xl font-bold -mt-5">Downloads</h1>
      <p>
        Click on the underlined links below to download the files. All data files with a “.rar” at the end need to be unzipped after downloading (using WinZIP, WinRAR, 7-Zip, or a similar program).  Please regard&nbsp;
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpenConditionsOfUse();
          }}
        >
          Conditions of Use
        </a>
        &nbsp;for all Evapotranspiration Atlas products and refer to our <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/evap/how-to-cite">How To
        Cite</a> page for
        citation information.
      </p>
      <details>
        <summary>Mean Annual Map Images</summary>
        <p>
          Image files of mean annual maps for select variables have been created and are available for download as *.JPG files. Due to the high number of variables, temporal resolutions, and map extents possible, only mean annual map images for select variables at the statewide extent have been generated.  For the full list of variables used in this project, please see the project Report and the table of mapped variables.
        </p>
        <h1 className="text-l font-bold mt-3">Color Maps</h1>
        <div className="flow-root">
          <img 
            className="float-left ml-4 mb-4 mr-4 mt-2 rounded-sm" 
            src="/images/mean_ann_evptrsp.jpg" 
            alt="EvpTrsp Image"
             width="277" 
             height="215"
          />
          <p className="pb-2 pt-3">
            Unlike the interactive map which displays the variables on a continuous color ramp, these images display the values in categories. The categories were set based on the natural breaks in the values. The categories were set independently for different units, so the color breaks will differ slightly for different units.  
          </p>
        </div>
        <p>
          Files for download:
        </p>
        <p>
          *File will open in a new window.  To save to your computer, right click and go to &quot;Save image as...&quot;
        </p>
        <table className="bordered-table">
          <thead>
          <tr>
            <th>Category</th>
            <th>Variable</th>
            <th>Mean Annual Map</th>
          </tr>
          </thead>
        </table>
      </details>
    </div>
  );
}