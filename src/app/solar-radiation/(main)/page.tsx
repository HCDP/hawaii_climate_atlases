export default function SolarRadiationPage() {
  return (
    <div className="m-14">
      <div className="-mb-4 max-w-[62rem] mx-auto">
        <h1 className="text-xl font-bold -mt-5">Solar Radiation Atlas of Hawaiʻi</h1>
        <table className="float-right mt-3">
          <caption>
            <img src="/banners/solar_banner.jpeg" alt="Solar Radiation Banner" width="308" height="60"/>
          </caption>
        </table>
        <div>
          <p className="pb-2 pt-3 text-blue-500 underline">
            <em><a href="/solar-radiation/interactive-map">Interactive Map</a></em>
          </p>
          <p>
            This atlas provides comprehensive solar radiation data for the Hawaiian Islands,
            including solar radiation, diffuse radiation, longwave radiation, and net radiation
            patterns across different time periods.
          </p>
          <p className="pt-3">
            The data presented here is derived from high-resolution modeling and satellite observations,
            providing detailed insights into solar energy potential and radiative balance across Hawaii's
            diverse landscapes.
          </p>
        </div>
      </div>
    </div>
  );
}
