import { promises as fs } from "fs";
import { Station } from "@/lib";

export async function getDefaultData (): Promise<Station[]> {
  return await fs.readFile(process.cwd() + '/public/FinalStationData_Used_json.json', 'utf8')
    .then(file => JSON.parse(file));
}
