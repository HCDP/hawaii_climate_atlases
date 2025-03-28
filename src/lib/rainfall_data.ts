import { Isohyets, Station } from "@/lib";
import Papa from "papaparse";

export async function getRFStationData(): Promise<Station[]> {
  try {
    const response = await fetch('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used_csv.csv');
    const dataAsText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(dataAsText, {
        header: true, // treats top line of CSV as names for columns
        skipEmptyLines: true,
        complete: (result) => {
        // console.log(result.data);
          resolve(result.data as Station[]);
        },
        error: (error: any) => reject(error),
      });
    })
    
  } catch (error) {
    console.error("Error fetching CSV data");
    return [];
  }
}

export async function getOtherStationData(): Promise<Station[]> {
  try {
    const response = await fetch('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed_csv.csv');
    const dataAsText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(dataAsText, {
        header: true, 
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as Station[]),
        error: (error: any) => reject(error),
      });
    })
    
  } catch (error) {
    console.error("Error fetching CSV data");
    return [];
  }
}
