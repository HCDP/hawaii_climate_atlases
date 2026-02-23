export default function EvapPage() {
  return (
    <div className="m-14">
     
      {/* Intro Section */}
      <div className="max-w-[62rem] mx-auto">
        <h1 className="text-xl font-bold mb-4">Evapotranspiration of Hawaiʻi</h1>
        <div className="flow-root">
          <img 
            className="float-right ml-6 mb-4 rounded-sm" 
            src="/images/mean_ann_evptrsp.jpg" 
            alt="EvpTrsp Image"
             width="350" 
             height="270"
          />
          <p className="pb-2 pt-3 text-blue-500 underline">
            <em><a href="/evap/how-to-cite">How to cite the Evapotranspiration Atlas</a>&nbsp;</em>
          </p>
          <p>
            This website provides a set of maps of the spatial patterns of evapotranspiration for the major Hawaiian Islands. To estimate evapotranspiration, numerous other variables, such as solar radiation, air temperature, and relative humidity to name a few, had to be estimated. Those are included here, too. Most variables are mapped for each hour of the average 24-hour cycle of each month and for each hour of the average 24-hour cycle for the whole year. The average value for each month and the annual average are also mapped. In developing the evapotranspiration estimates, more than 12,000 maps were created. 
            Many of those maps are available via this website, in the form of <a className="text-blue-500 underline" href="/downloads"> downloadable files</a> and, for a selection of variables, on the <a className="text-blue-500 underline" href="/interactive-map-tool">interactive mapping tool</a>.
          </p>
          <div className="border border-black px-3 py-2 text-center mt-6 overflow-hidden">
            <p>Be sure to check out the&nbsp;
              <a className="text-blue-500 underline" href="/interactive-map">interactive map</a>!&nbsp;
              It may need a few minutes to load on your first visit.&nbsp;
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[62rem] mx-auto mt-16">
        <h1 className="text-xl font-bold mb-4">The Hydrologic Cycle</h1>
        <table className="float-left mt-4 mr-8">
            <caption>
              <img className="" src="/images/hydro_cycle.jpg" alt="Hydrocycle" width="350" height="250"/>
            </caption>
            <tbody>
              <tr>
                  <td><em>Source: Anishct (Own work) [Public domain], via Wikimedia Commons</em></td>
              </tr>
            </tbody>
        </table>
        <p className="pb-4">
          Water in our environment is cycled by processes that move and transform water. Clouds form when moist air is cooled. Precipitation happens when water drops or ice particles become big enough to fall from clouds. Rainwater can recharge soil water, groundwater, streams, rivers, and lakes. Some is used by plants, which transpire the water back to the air. And some is evaporated directly from wet leaves and soil. All the transpired and evaporated water then becomes available to form clouds and rain. This sequence is called “the hydrologic cycle” and it sustains life on earth. Understanding and quantifying the movement of water in the hydrological cycle is needed to help manage our water resources, protect our natural environment, and anticipate how climate change, land development, and species invasion will affect natural ecosystems, agriculture, and domestic water availability in the future.
        </p>
        <table className="float-right mt-4 ml-8 w-[230px]">
          <caption>
            <img className="" src="/images/trans+evap.jpg" alt="trans/evap" width="308" height="217"/>
          </caption>
          <tbody>
            <tr>
              <td className="pt-2 break-words leading-tight"><em>Source: Mwtoews (Own work) [GFDL
(http://www.gnu.org/copyleft/fdl.html)
or CC-BY-3.0 (http://creativecommons.org/
licenses/by/3.0)], via Wikimedia Commons</em></td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-xl font-bold mb-4 text-right">Evapotranspiration</h1>
        <p className="">
          Understanding the hydrologic cycle starts with measuring and mapping rainfall. In the <a className="text-blue-500 underline" href="/interactive-map">Rainfall Atlas of Hawai‘i</a>, detailed analysis of rainfall data provides a comprehensive picture of the spatial patterns of rainfall in Hawai‘i. Equally important, though much less obvious and much more difficult to assess, is evapotranspiration, the combination of processes that takes water from the surface and transforms it into water vapor in the air. These processes include the movement of water through plant roots and the evaporation of that water through pores in the plant’s leaves, a process called transpiration. Water on the outsides of leaves, such as water deposited by rain or fog interception, can be evaporated, a process called wet canopy evaporation. Water can also evaporate directly from moist soil, soil evaporation. The sum of these three components is called evapotranspiration (ET).
        </p>
      </div>

      <div className="max-w-[62rem] mx-auto mt-10 mb-20">
        <h1 className="text-xl font-bold mb-4">Evapotranspiration</h1>
        <p>
          ET is highly variable through time and from place to place. Many variables influence evapotranspiration, including those related to climate (e.g., solar radiation, air temperature, humidity, and wind), the characteristics of the vegetation (e.g., plant type, height, density, amount of leaves, and root depth), and the properties and status of the soil (e.g., soil texture, porosity, water holding capacity, and soil moisture content). Direct measurements of ET are difficult and expensive, and cannot be done extensively enough to capture the spatial ET patterns. Therefore, it is necessary to estimate ET using models that incorporate information on the climate, vegetation, and soil factors that influence ET.  More information can be found on our Methods page.
        </p>
      </div>

      <div className="max-w-[62rem] mx-auto">
        <table className="float-left mt-4 ml-12 mr-4">
            <caption><img src="/images/raingagejpg.jpg" alt="Raingage Maui" width="309" height="232"></img></caption>
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

    /*
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
    //         alt=" icon"
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
    */
  );
}
