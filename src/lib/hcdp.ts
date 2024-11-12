import { promises as fs } from "fs";
import { Station } from "@/components/maps/Map";

export async function getDefaultData () {
  const file = await fs.readFile(process.cwd() + '/public/FinalStationData_Used_json.json', 'utf8');
  const stations: Station[] = JSON.parse(file);
  return stations;
}

// files api base url
const baseUrl = "https:/ikeauth.its.hawaii.edu/files/v2/download/public/system/ikewai-annotated-data/HCDP/production/";
// rainfall/
// <production>/
// <period>/
// <extent>
// [/<fill>]/
// <filetype>/
// <year>
// [/<month>]/
// rainfall_<production>_<period>_<extent>[_<fill>]_<filetype>_<year>_<month>[_<day>]
// .<extension>

export async function fetchRainfallFile(
  {
    production = "new", // "new" or "legacy"
    period = "month", // "month" or "day"
    extent = "statewide", // "statewide", "bi", "ka", "mn", "oa"
    fill = "partial", // "raw" or "partial"
    filetype = "station_data", // "data_map", "se", "anom", "anom_se", "metadata", "station_data"
    year = "2022", // 4-digit year, e.g., "2022
    month = "03", // 2-digit month, e.g., "03"
    day = "", // 2-digit day (optional, only for daily data)
    extension = "csv",
  }) {
  // const production = "new"; // "new" or "legacy"
  // const period = "month"; // "month" or "day"
  // const extent = "statewide"; // "statewide", "bi", "ka", "mn", "oa"
  // const fill = "partial"; // "raw" or "partial"
  // const filetype = "station_data"; // "data_map", "se", "anom", "anom_se", "metadata", "station_data"
  // const year = "2012"; // 4-digit year, e.g., "2022"
  // const month = "03"; // 2-digit month, e.g., "03"
  // const day = ""; // 2-digit day (optional, only for daily data)
  // const extension = "csv";

  // const fileUrl = `${baseUrl}rainfall/${production}/${period}/${extent}/${fill}/${filetype}/${year}/rainfall_${production}_${period}_${extent}_${filetype}_${year}.${extension}`;
  const fileUrl = `${baseUrl}rainfall/${production}/${period}/${extent}/${fill}/${filetype}/${year}/${month}/rainfall_${production}_${period}_${extent}_${fill}_${filetype}_${year}_${month}.${extension}`;
  console.log("The URL: " + fileUrl);
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Server did not respond properly.");
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error fetching rainfall data:", error);
  }
}

export async function fetchStations() {
  let fetchedStations;
  try {
    fetchedStations = await fetch(
      "https://api.hcdp.ikewai.org/mesonet/getStations",
      {
        headers: {
          "Authorization": "Bearer " + process.env.HCDP_API_KEY,
        }
      }
    )
      .then(response => response.json())
      .then(data => data);
  } catch (error) {
    console.error("Error fetching rainfall data:", error);
  }
  return fetchedStations;
}
