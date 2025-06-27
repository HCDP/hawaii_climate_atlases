// app/interactive-map/page.tsx
import { SWRConfig } from "swr";
import { Station, Units, Period, AsciiGrid } from "@/lib";
import { FeatureCollection } from "geojson";
import { getStations, getIsohyets, getGrids } from "@/lib/rainfall_data";
import dynamic from "next/dynamic";

const ClientInteractiveMap = dynamic(
  () => import("@/app/rainfall/interactive-map/ClientInteractiveMap"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>
  }
);

export default async function InteractiveMap() {
  const allUnits: Units[] = Object.values(Units);
  // const allPeriods: Period[] = Object.values(Period).filter(p => typeof p !== "string");

  const stationsPromises = [
    { url: "/rainfall/api/stations", promise: getStations({ other: false }) },
    { url: "/rainfall/api/stations?filter=other", promise: getStations({ other: true }) },
  ];
  const isohyetsPromises =
    allUnits.map(u => ({
      url: `/rainfall/api/isohyets/${u.toLowerCase()}`,
      promise: getIsohyets({ units: u })
    }));
  // const gridsPromises =
  //   allUnits.flatMap(u => allPeriods
  //     .map(p => ({
  //       url: `/rainfall/api/isohyets/${u}/${p}`,
  //       promise: getGrids({ units: u, period: p })
  //     })));
  const gridsPromises = [
    { url: "/rainfall/api/grids/in/annual", promise: getGrids({ units: Units.IN, period: Period.Annual }) }
  ]

  const dataPromises = [
    ...stationsPromises,
    ...isohyetsPromises,
    ...gridsPromises,
  ];

  const retrievedData = await Promise.all(
    dataPromises.map(dP => dP.promise)
  );

  const fallback: {
    [key: string]: Station[] | FeatureCollection[] | AsciiGrid | null
  } = {}
  retrievedData.forEach((data, index) => {
    const url = dataPromises[index].url
    fallback[url] = data;
  });

  return (
    <SWRConfig value={{ fallback }}>
      <ClientInteractiveMap />
    </SWRConfig>
  );
}