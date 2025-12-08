import React from "react";
import ClimateMap from "../ClimateMap";

const SOLAR_RADIATION_CONFIG = {
  enableStations: false,
  enableIsohyets: false,
  enableUncertaintyToggle: false,
  enableDualLoading: false,
};

const SolarRadiationMap: React.FC = () => {
  return <ClimateMap config={SOLAR_RADIATION_CONFIG} />;
};

export default SolarRadiationMap;