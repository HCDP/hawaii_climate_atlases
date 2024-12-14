import { promises as fs } from "fs";
import { Station } from "@/lib";

export async function getDefaultData (): Promise<Station[]> {
  return await fs.readFile(process.cwd() + '/public/FinalStationData_Used_json.json', 'utf8')
    .then(file => JSON.parse(file));
}

// files api base url
const filesBaseUrl = "https:/ikeauth.its.hawaii.edu/files/v2/download/public/system/ikewai-annotated-data/HCDP/production";
const mesonetBaseUrl = "https://api.hcdp.ikewai.org/mesonet";
const authorization = {
  "Authorization": `Bearer ${process.env.HCDP_API_KEY}`
}
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

interface rainfallFilesProps {
  production?: "new" | "legacy",
  periods?: "month" | "day",
  extents?: "statewide" | "bi" | "ka" | "mn" | "oa",
  fill?: "raw" | "partial",
  filetype?: "data_map" | "se" | "anom" | "anom_se" | "metadata" | "station_data",
  year?: string,
  month?: string,
  day?: string,
  extnesion?: "tif" | "csv" | "txt",
}

export async function test(
  production: string = "legacy", // "new" or "legacy"
  period: string = "month", // "month" or "day"
  extent: string = "statewide", // "statewide", "bi", "ka", "mn", "oa"
  fill: string = "partial", // "raw" or "partial"
  filetype: string = "station_data", // "data_map", "se", "anom", "anom_se", "metadata", "station_data"
  year: string = "1990", // 4-digit year, e.g., "2022
  month?: string, // 2-digit month, e.g., "03"
  day?: string, // 2-digit day (optional, only for daily data)
  extension: string = "csv",
) {

}

export async function fetchRainfallData(
    production: string = "new", // "new" or "legacy"
    period: string = "month", // "month" or "day"
    extent: string = "statewide", // "statewide", "bi", "ka", "mn", "oa"
    fill: string = "partial", // "raw" or "partial"
    filetype: string = "station_data", // "data_map", "se", "anom", "anom_se", "metadata", "station_data"
    year: string = "1990", // 4-digit year, e.g., "2022
    month?: string, // 2-digit month, e.g., "03"
    day?: string, // 2-digit day (optional, only for daily data)
    extension: string = "csv",
  ) {

  if (!process.env.HCDP_API_KEY) {
    return await getDefaultData();
  }

  let fetchedFile;
  const fileUrl: string = `${filesBaseUrl}/rainfall/${production}/${period}/${extent}/${fill}/${filetype}/${year}/${month ? `${month}/` : ''}${day ? `${day}/` : ''}rainfall_${production}_${period}_${extent}_${filetype}_${year}${month ? `_${month}/` : ''}.${extension}`;
  // const testUrl = `${filesBaseUrl}/rainfall/new/month/statewide/partial/station_data/1990/rainfall_new_month_statewide_station_data_1990.csv`
  const testUrl = `${filesBaseUrl}/rainfall/legacy/month/statewide/station_data/1990/rainfall_legacy_month_statewide_station_data_1990.csv`;
  try {
    fetchedFile = await fetch(testUrl).then(res => {
      return res.text();
    }).then(csvString => {
      console.log("The string: ", csvString);
      const lines = csvString.split("\n");
      const columnsString = lines.shift();
      const columns = columnsString ? columnsString.split(",") : [];
      // console.log(columnsString);
      // console.log(columns);
      const rfData = [];
      lines.forEach(line => {
        const parsedLine = line.split(",");
        // console.log(parsedLine);
        const rawEntry = {};
        columns.forEach(column => {
          rawEntry[column] = parsedLine.shift();
        });
        const entry = {};
        rfData.push(entry);
      });
      return rfData;
    });
  } catch (error) {
    console.error("Error fetching rainfall data:", error);
  }
  return fetchedFile;
}

export async function fetchStations() {
  let fetchedStations;
  try {
    fetchedStations = await fetch(
      `${mesonetBaseUrl}/getStations`,
      {
        headers: authorization
      }
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data
      });
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
  return fetchedStations;
}

export async function fetchVariables(station_id: number) {
  let fetchedVariables;
  try {
    fetchedVariables = await fetch(
      `${mesonetBaseUrl}/getVariables?station_id=${station_id}`,
      {
        headers: authorization
      }
    )
      .then(response => response.json())
      .then(data => data);
  } catch (error) {
    console.error("Error fetching variables:", error);
  }
  return fetchedVariables;
}

export async function fetchMeasurements(station_id: number, vars: string[]) {
  let fetchedVariables;
  try {
    fetchedVariables = await fetch(
      `${mesonetBaseUrl}/getMeasurements?station_id=${station_id}&var_ids=${vars.join(",")}&limit=200`,
      {
        headers: authorization
      }
    )
      .then(response => response.json())
      .then(data => data);
  } catch (error) {
    console.error("Error fetching measurements:", error);
  }
  return fetchedVariables;
}
