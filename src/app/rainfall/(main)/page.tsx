// import Image from "next/image";

export default function Home() {
  return (
    <div className="m-14">

      {/* Intro Section */}
      <div className="-mb-4 max-w-[62rem] mx-auto">
        <p className="text-xl font-bold -mt-5">What is the Rainfall Atlas of Hawaiʻi?</p>
        <table className="float-right mt-3">
            <caption>
              <img className="" src="/ModisImg.jpg" alt="MODIS Image" width="308" height="217"/>
            </caption>
            <tbody>
              <tr>
                  <td><em>MODIS Image of Hawai‘i, NASA Earth Observatory</em></td>
              </tr>
            </tbody>
        </table>
        <div>
          <p className="pb-2 pt-3 text-blue-500 underline">
            <em><a href="howtocite.html">How to cite the Rainfall Atlas</a>&nbsp;</em>
          </p>
          <p>
            The Hawaiian Islands have one of the most diverse rainfall patterns on earth. The mountainous terrain, persistent trade winds, heating and cooling of the land, and the regular presence of a stable atmospheric layer at an elevation of around 7,000 ft. interact to produce areas of uplift in distinct spatial patterns anchored to the topography. The resulting clouds and rainfall produced by this uplift lead to dramatic differences in mean rainfall over short distances. Knowledge of the mean rainfall patterns is critically important for a variety of resource management issues, including ground water and surface water development and protection, controlling and eradicating invasive species, protecting and restoring native ecosystems, and planning for the effects of global warming.
          </p>
          <p className="pt-3">Be sure to check out the&nbsp;
            <a className="text-blue-500 underline" href="/interactive-map">interactive map</a>!&nbsp;
            It may need a few minutes to load on your first visit.&nbsp;
          </p>
        </div>
      </div>

      {/* Updates Section */}
      <div className="mt-16 px-10 flex justify-center">
        <div className="border border-black px-6 py-4 max-w-3xl text-center">
          <p>
            <em><b>Updates:</b><br /> 
            Seasonal Rainfall Trend Maps from 1920-2012 and 1983-2012 available for&nbsp;
            <a className="text-blue-500 underline" href="/downloads">download</a>&nbsp; (10/2018)<br />
            Month-Year Rainfall Maps from 1920-2012 are available for&nbsp;
            <a className="text-blue-500 underline" href="/downloads">download</a>&nbsp; (08/2015)<br />
            Raingage data&nbsp;<a className="text-blue-500 underline" href="/downloads">(tabular)</a>&nbsp;
            have been updated through 2012 (04/2015)<br />
            All Moloka‘i maps have been updated (07/2014)
            </em>
          </p>
        </div>
      </div>


      <div className="max-w-[62rem] mx-auto mt-16">
        <p className="float-left mr-6">
          <img src="/mean_ann_rf_statemm.jpg" alt="Mean Annual Rainfall Image" width="379" height="293"/>
        </p>
        <p className="pb-4">
          The Rainfall Atlas of Hawaiʻi is a set of maps of the spatial patterns of rainfall for the major Hawaiian Islands. Maps are available for mean monthly and annual rainfall. The maps represent our best estimates of the mean rainfall for the 30-yr base period 1978–2007. However, for many reasons, it is not possible to determine the exact value of mean rainfall for any location. Therefore, for every map of mean rainfall, we provide a corresponding map of uncertainty. Uncertainty tends to be greatest where we have the poorest information about rainfall, for example in remote locations far from the nearest raingage.
        </p>
        <p>
          This web site was developed to make the rainfall maps, data, and related information easily accessible. The maps depict rainfall patterns by color and/or by isohyets (lines of equal rainfall). The <a className="text-blue-500 underline" href="/interactive-map">
          interactive map</a>&nbsp;allows 
          users to see the patterns of mean monthly and annual rainfall and corresponding uncertainty, zoom in on areas of particular interest, navigate to specific locations with the help of a choice of different base maps, and click on any location to get the mean annual rainfall and a graph and table of mean monthly rainfall. The locations of stations can also be shown on the interactive map. Clicking on a station gives both station and mapped estimates of monthly rainfall along with station metadata.
        </p>
      </div>

      <div className="max-w-[62rem] mx-auto mt-10 mb-20">
        <p>&nbsp;</p>
        <p className="float-right ml-6">
          <img src="/rainfall_map.jpg" alt="Pixel Size" width="280" height="235"/>
        </p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p className="">Rainfall maps can also be&nbsp;
          <a className="text-blue-500 underline" href="/downloads">downloaded</a>
          &nbsp;in various forms. Our analysis produced digital maps called rasters or grids. On these maps, the islands are divided into 8.1-arcsecond spatial units, or approximately 234 × 250 m (770 × 820 ft). Rainfall and uncertainty are estimated for each spatial unit. GIS (Geographic Information System) users can obtain mean and uncertainty maps as raster files. Alternatively, image files showing rainfall patterns by color and/or by isohyets can be downloaded.
        </p>
      </div>

      <div className="max-w-[62rem] mx-auto">
        <table className="float-left mt-4 ml-12 mr-4">
            <caption><img src="/raingagejpg.jpg" alt="Raingage Maui" width="309" height="232"></img></caption>
            <tbody>
              <tr>
                  <td><em>Raingage in Haleakalā, Maui. Photo credit: John DeLay<br/></em></td>
              </tr>
            </tbody>
        </table>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p className="mt-4">
          Rainfall measurements taken at over 1,000 stations were used as the principal source of information in the development of the rainfall maps. Files containing estimated mean monthly and annual rainfall and uncertainty for each station used in the analysis are available for&nbsp;
          <a className="text-blue-500 underline" href="/downloads">download</a>. 
          A file with information on each station, including the name, observer, location, elevation, and period of record, is also available.
        </p>      
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>

      {/* Other websites */}
      <div className="max-w-[62rem] mx-auto -mb-5">
        <div className="">
          <p>This website is part of a family of websites providing data on the climate of Hawai&lsquo;i. The Rainfall Atlas of Hawai&lsquo;i covers only rainfall. The other three websites each provide data for many other variables including evapotranspiration, solar radiation, albedo, cloud frequency, temperature, relative humidity, etc.  These other three websites contain the <em>same</em> variables, but each is presented with a particular focus.</p>
          <div className="flex flex-col items-center gap-4 mt-6">  
            <p>
              <a href="https://web.archive.org/web/20221210024735/http://rainfall.geography.hawaii.edu/" target="blank">
                <img src="https://web.archive.org/web/20221210024735im/http://evapotranspiration.geography.hawaii.edu/assets/images/rf_banner.jpg" alt="Rainfall Atlas of Hawaii" width="605" height="95"/>
              </a>
            </p>
            <p>
              <a href="https://web.archive.org/web/20221210024735/http://evapotranspiration.geography.hawaii.edu/" target="blank">
                <img src="https://web.archive.org/web/20221210024735im/http://evapotranspiration.geography.hawaii.edu/assets/images/et_banner.jpg" alt="Evapotranspiration of Hawaii" width="605" height="95"/>
              </a>
            </p>
            <p>
              <a href="https://web.archive.org/web/20221210024735/http://solar.geography.hawaii.edu/" target="blank">
                <img src="https://web.archive.org/web/20221210024735im/http://evapotranspiration.geography.hawaii.edu/assets/images/solar_banner.jpg" alt="Solar Radiation of Hawaii" width="605" height="95"/>
              </a>
            </p>
            <p>
              <a href="https://web.archive.org/web/20221210024735/http://climate.geography.hawaii.edu/" target="blank">
                <img src="https://web.archive.org/web/20221210024735im/http://evapotranspiration.geography.hawaii.edu/assets/images/climate_banner.jpg" alt="Climate of Hawaii" width="605" height="95"/>
              </a>
            </p>
          </div>
        </div>
      </div>

    </div>

    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="https://nextjs.org/icons/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>
    //
    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="https://nextjs.org/icons/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
