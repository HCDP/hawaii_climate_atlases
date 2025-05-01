export default function Rainfall() {
  return (
    <div className="mt-14 max-w-[62rem] mx-auto">
      <h1 className="text-xl font-bold -mt-5">Hawaiʻi’s Rainfall Patterns</h1>
      <img src="/images/mean_ann_rf_statemm.jpg" className="w-[680px] mt-3 pb-5 justify-self-center" />
      <a href="/how-to-cite" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 italic">
        How to cite this information
      </a>
      <p className="my-3 mb-4">
        Hawaiʻi’s rainfall pattern is spectacularly diverse (above). Annual means range from 204 mm (8 inches) near the summit 
        of Mauna Kea to 10,271 mm (404 inches) near Big Bog on the windward slope of Haleakalā, Maui. In general, high mean rainfall 
        is found on the windward mountain slopes, and low rainfall prevails in leeward lowlands and on the upper slopes of the highest 
        mountains. What causes these patterns?
      </p>
      <div>
        <div className="border border-black p-[2px] float-left ml-4 mr-5">
          <div className="border border-black w-[450px] px-6 py-4 text-center">
            <h2 className="text-xl font-bold pb-4">Why &#34;Rainfall&#34; instead of &#34;Precipitation&#34;? </h2>
              <p>
                Precipitation in Hawai‘i includes rain, various types of frozen precipitation (such as snow, sleet, hail, and freezing 
                rain), and fog drip. Frozen precipitation is a minor contributor overall. However, fog drip, derived from direct 
                interception of cloud droplets by vegetation, is a major source of water in the middle-elevation fog zones of Hawai‘i&#39;s 
                mountains. We use the term &#34;rainfall&#34; here instead of &#34;precipitation&#34; because, although we include frozen precipitation as 
                a minor component, the other major precipitation component, fog drip, is not included.
              </p>
          </div>
        </div>
      </div>
      <p className="mt-3">
        Cloud formation leading to precipitation is always associated with air being cooled. Lowering the temperature of air reduces its 
        capacity to store water as a gas (water vapor). For any given air temperature, there is a maximum amount of water vapor that can be 
        stored. Air containing any amount of water vapor, if cooled, will eventually reach a point where the water vapor content is exactly 
        equal to the capacity of the air to hold water vapor. That condition is called saturation. Any additional cooling of saturated air 
        will cause condensation to occur, i.e. some water vapor (gas) will change phase to a liquid (water droplets) or solid (ice particles) 
        form. Those water droplets and/or ice particles are what clouds are made of.
      </p>
      <p className="mt-6">
        Cooling of unsaturated air, then, is the key to forming clouds and eventually causing precipitation. By far the most common way air 
        is cooled is by lifting. Air always cools when it is lifted, because it moves from higher pressure to lower pressure by going up. 
        Conversely, air that sinks always gets warmer. Pressure, volume, and temperature of air are related to each other according to a 
        well-known physical law. Depending on the temperature and humidity of the air approaching the islands, air has to be lifted to a 
        certain height in order to form a cloud. That level, where the bottom of the cloud can be found, is called the lifting condensation 
        level (LCL).
      </p>
      <div>
        <img src="/images/rainfall/rainfall2_s.jpg" className="w-[325px] float-right" />
        <p className="mt-4">
          So, the question is, what are the main causes of lifting of air over Hawaiʻi? Air can be lifted in several ways, each resulting in 
          cooling of the lifted air. First and foremost, when wind blows against the slopes of mountains, air is forced to rise (orographic 
          lifting), producing orographic clouds and rain on the windward slopes. Because “trade winds” in Hawaiʻi blow persistently from the 
          ENE direction, the pattern of cloudy, wet conditions on the windward slopes is familiar to everyone in Hawaiʻi. This simple 
          relationship between wind direction and topography explains much of the pattern of rainfall in Hawaiʻi. These windward mountain 
          slopes receive abundant rainfall throughout the year. Note the relatively even distribution of rainfall throughout the year at windward 
          station Mountain View (right).
        </p>
        {/* className="w-[680px] mt-3 pb-5 justify-self-center" */}
      </div>
      <img src="/images/rainfall/rainfall_patterns.jpg" className="w-[680px] pt-5 justify-self-center" />
      <p className="mt-4">
        Orographic lifting is not the whole story. For example, on high mountains, such as Haleakalā, Mauna Kea, and Mauna Loa, the maximum 
        rainfall zones are found at the mid-slopes, above which rainfall declines steeply. As mentioned above, the Mauna Kea summit has the 
        lowest annual total in the islands. This fact is related to another persistent feature of Hawaiʻi’s climate, the “trade wind inversion
        ” (TWI). The TWI is a shallow layer of air, usually found at about 2200 m (7200 ft) above sea level over the islands, in which the air 
        gets warmer as you go up. This is the inverse of the usual situation in which air above is cooler than air below, and has an effect on 
        the ability of air to move up or down. In essence, the TWI puts the brakes on rising air, preventing it from continuing to move up the 
        windward mountain slopes, and directing the flow around the mountain instead. This has the effect of capping the clouds at the level of 
        the bottom of the TWI layer. As a result, the tops of mountains reaching well above the TWI level are quite dry.
      </p>
      <p className="mt-4">
        Lifting is also caused when air over the islands is heated during the day. The lighter warm air rises by a process called “convectio
        n”, sometimes producing clouds and rainfall over island interiors. Daytime heating also leads to on-shore wind (“sea breeze”) along 
        the coasts. On days without strong trade winds, the sea breeze pattern causes wind to converge toward the middle of each island. This 
        convergence of surface winds forces air to rise over the island.
      </p>
      <div>
        <img src="/images/rainfall/rainfall4_s.jpg" className="w-[325px] float-right" />
        <p className="mt-4">
          When weather disturbances, such as cold fronts, Kona storms, upper-level low-pressure systems, or tropical storms, affect the 
          islands, extensive lifting can occur causing widespread clouds and rain. These disturbances often disrupt the TWI, allowing lifting 
          to continue to much higher levels in the atmosphere. This can result in thunderstorms, which are absent whenever the TWI is present.
          Most of the rainfall in the drier leeward and high mountain areas of the islands is associated with these disturbances. In the 
          leeward coastal areas, where most of Hawaiʻi’s visitor industry is based and where most residents live, rainfall has a distinct 
          annual cycle with higher rainfall in the winter months, approximately October-March (see Honolulu Airport mean monthly rainfall, 
          right), because of the higher incidence of weather disturbances in winter.
        </p>
        {/* className="w-[680px] mt-3 pb-5 justify-self-center" */}
      </div>
      <div>
        <p className="float-right ml-5">
          <img src="/images/rainfall/rainfall5_s.jpg" className="w-[325px] mt-8" />
          <img src="/images/rainfall/rainfall6_s.jpg" className="w-[325px] mt-16" />
        </p>
        <p className="mt-4 pr-5">
          The North and South Kona Districts on the Island of Hawaiʻi have a unique rainfall pattern. The west-facing slopes of Hualalai 
          and Mauna Loa are sheltered from the trade winds. But, as air flows around the large mountains, it curves back on the leeward side 
          and flows up these slopes, producing a belt of persistent clouds and rain (right). The map at right shows the Kona rainfall belt as 
          a narrow, yellow strip upslope of the Kona coast. This zone is home to the farms that produce world-famous Kona coffee. Uplift is 
          enhanced in the afternoons when the sun warms these slopes. Strong trade winds and intense heating during the summer also increase 
          lifting, clouds, and rainfall on the Kona slopes. As a result, this is the only area in Hawaiʻi with an afternoon rainfall peak, and 
          with more rain in the summer than other seasons (see mean monthly rainfall at Kona station Honaunau, right).
        </p>
        <h1 className="text-xl font-bold mt-3">Changes in Hawaiʻi Rainfall</h1>
        <p className="mt-4">
          The maps comprising the 2011 Rainfall Atlas of Hawaiʻi depict average rainfall for the 30-year period ending in 2007. This gives 
          an up-to-date picture of normal rainfall amounts and patterns. But, we must be aware that rainfall varies over time. For example, 
          we have strong evidence that rainfall in Hawaiʻi is affected on a year-to-year time scale by the occurrence of El Niños and La 
          Niñas. These events are part of a large-scale interaction between the ocean and atmosphere centered in the equatorial Pacific, 
          known as El Niño-Southern Oscillation (ENSO). In particular, El Niño is consistently associated with lower than normal rainfall 
          during winter months in Hawaiʻi. Because Hawaiʻi is relatively close to the center of action of ENSO, its effects are strong here. 
          El Niños and La Niñas recur on average about every 3 to 7 years. This gives rise to large year-to-year variability in rainfall in Hawaiʻi.
          <br/>
          <br/>
          Another, perhaps less familiar ocean-atmosphere interaction, known as the Pacific Decadal Oscillation (PDO), also exerts a strong influence 
          on Hawaiʻi rainfall. The PDO is somewhat similar to ENSO, but varies much more slowly, with each phase lasting up to 30 years. During most 
          of the base period for the 2011 Hawaiʻi Rainfall Atlas of Hawaiʻi (1978-2007), the PDO was in its positive phase, which is generally associated 
          with lower rainfall in Hawaiʻi.
          <br/>
          <br/>
            In addition to natural variations in rainfall, we are now aware of long-term trends that might be caused by global warming. Over 
            the past 90-100 years, while the effects of ENSO and PDO caused large ups and downs, rainfall in Hawaiʻi has slowly declined overall. 
            This decline has been especially apparent during recent decades, in part, because it coincides with the low rainfall phase of the PDO. 
            However, the rainfall record and other evidence point to a downward trend in mean rainfall that may persist at least through the end of 
            this century. One possible explanation for the decline has to do with the weather disturbances that regularly disrupt the trade wind 
            inversion and produce widespread rainfall over the islands. These disturbances, often associated with incursions of mid-latitude weather
            systems into the Hawaiʻi region during winter, have declined in frequency, as storm tracks have apparently migrated northward. This 
            shift in storm tracks is thought to be a result of global warming and is predicted to continue. If these predictions are borne out, we 
            will continue to see ups and downs in rainfall in the future related to ENSO and PDO, but mean rainfall will decline, and drought will 
            become more frequent.
        </p>
        {/* className="w-[680px] mt-3 pb-5 justify-self-center" */}
      </div>
      <img src="/images/State_RFTrends_1920_2012_Ann2.jpg" className="w-[680px] mt-3 pb-5 justify-self-center" />
      <p>
        In the Kona coffee growing region of the Island of Hawaiʻi, some stations have experienced dramatic rainfall declines since the early 
        1980s. Many believe that this change can be traced to the effects of the eruption of Kilauea Volcano, which has been in its current active 
        phase since 1983. A plume of aerosol-rich volcanic smog (“vog”) streams downwind of Kilauea and makes its way around the southern flanks of 
        Mauna Loa and up through the South Kona District. The vog has been a chronic nuisance to the Kona area since the start of the current 
        eruptive phase. The particulates forming the vog can act as cloud condensation nuclei (CCN), helping to produce more cloud droplets. 
        Hence, the areas within the plume may experience greater cloudiness. However, this does not necessary translate to more rainfall. In fact, 
        it is likely that it is having the opposite effect. With an overabundance of CCN, the water condensed in rising, cooling air is divided 
        into a greater number of droplets. As a result, these droplets are too small to fall as rain and fewer of them are able to grow to a sufficient 
        size to eventually become raindrops.
        <br/>
        <br/>
        Check out the &#34;Rainfall Trend Maps 1920-2012&#34; tab on the&nbsp;
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/downloads">downloads</a> 
        &nbsp;page for historical trend analysis results by island.
        <br/>
        <br/>
      </p>
    </div>
  );
}
