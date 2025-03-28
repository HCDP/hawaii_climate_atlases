import { Isohyets, Station } from "@/lib";
import Papa from "papaparse";

export async function getStationData(url: string): Promise<Station[]> {
  try {
    const response = await fetch(url);
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
