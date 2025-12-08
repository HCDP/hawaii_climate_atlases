export default function EvapotranspirationHome() {
  return (
    <div className="m-14">
     
      {/* Intro Section */}
      <div className="-mb-4 max-w-[62rem] mx-auto">
        <h1 className="text-xl font-bold -mt-5">Evapotranspiration Atlas of Hawaiʻi</h1>
        <table className="float-right mt-3">
            <caption>
              <img className="" src="/banners/evapotranspiration_banner.jpg" alt="Evapotranspiration Banner" width="308" height="60"/>
            </caption>
        </table>
        <div>
          <p className="pb-2 pt-3 text-blue-500 underline">
            <em><a href="/evapotranspiration/interactive-map">Interactive Map</a></em>
          </p>
          <p>
            This atlas provides comprehensive evapotranspiration data for the Hawaiian Islands,
            including actual evapotranspiration, available energy, air density, and canopy conductance
            patterns across different time periods.
          </p>
          <p className="pt-3">
            The data presented here is derived from high-resolution modeling and climate observations,
            providing detailed insights into water and energy balance across Hawaii's diverse landscapes.
          </p>
        </div>
      </div>

    </div>
  );
}
