import { NextRequest, NextResponse } from 'next/server';
import shp, { FeatureCollectionWithFilename } from "shpjs";
import { FeatureCollection } from "geojson";
import { getCachedFileBuffer } from "@/lib/data_cache";
import { Units } from "@/lib";
import path from "path";
import { isUnits } from "@/utils";
import { invalidUnitsResponse, unableToRetrieveResponse } from "@/lib/responses";

const CACHE_PATH = path.join('rainfall', 'raw');

const IN_ISOHYETS_FILE_NAME = 'StateIsohyetsSHP_inches.zip';
const IN_ISOHYETS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_inches.zip');

const MM_ISOHYETS_FILE_NAME = 'StateIsohyetsSHP_mm.zip';
const MM_ISOHYETS_FILE_URL = new URL('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_mm.zip');

export async function GET(_: NextRequest, { params }: { params: { units: string } }): Promise<NextResponse<{ error: string } | FeatureCollection[]>> {
  const units: string = params.units;
  if (!isUnits(units)) return invalidUnitsResponse;
  let fileName, fetchUrl;
  if (units === Units.IN) {
    fileName = IN_ISOHYETS_FILE_NAME;
    fetchUrl = IN_ISOHYETS_FILE_URL;
  } else if (units === Units.MM) {
    fileName = MM_ISOHYETS_FILE_NAME;
    fetchUrl = MM_ISOHYETS_FILE_URL;
  } else {
    return invalidUnitsResponse;
  }

  const shpFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!shpFileBuffer) {
    return unableToRetrieveResponse;
  }

  let geojson: FeatureCollectionWithFilename | FeatureCollectionWithFilename[] = await shp(shpFileBuffer);
  if (!Array.isArray(geojson)) {
    geojson = [geojson];
  } else {
    const sortGeojsons = (a: FeatureCollectionWithFilename, b: FeatureCollectionWithFilename) => {
      if (!a.fileName || !b.fileName) {
        return 0;
      }
      return a.fileName > b.fileName ? 1 : a.fileName < b.fileName ? -1 : 0;
    }
    geojson.sort(sortGeojsons);
    geojson.forEach(g => delete g.fileName);
  }
  return NextResponse.json(geojson, { status: 200 });
}
