import { NextRequest, NextResponse } from 'next/server';
import shp, { FeatureCollectionWithFilename } from "shpjs";
import { getCachedFileBuffer } from "@/lib/data_cache";
import path from "path";

const CACHE_PATH = path.join('rainfall', 'raw');

const IN_ISOHYETS_FILE_NAME = 'StateIsohyetsSHP_inches.zip';
const IN_ISOHYETS_FILE_URL = 'https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_inches.zip';

const MM_ISOHYETS_FILE_NAME = 'StateIsohyetsSHP_mm.zip';
const MM_ISOHYETS_FILE_URL = 'https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_mm.zip';

export async function GET(_: NextRequest, { params }: { params: { units: string } }) {
  const units: string = params.units.toLocaleUpperCase();
  let fileName, fetchUrl;
  if (units === 'IN') {
    fileName = IN_ISOHYETS_FILE_NAME;
    fetchUrl = IN_ISOHYETS_FILE_URL;
  } else if (units === 'MM') {
    fileName = MM_ISOHYETS_FILE_NAME;
    fetchUrl = MM_ISOHYETS_FILE_URL;
  } else {
    return NextResponse.json({ error: 'Invalid units.' }, { status: 400 });
  }

  const shpFileBuffer: Buffer | null = await getCachedFileBuffer(fetchUrl, CACHE_PATH, fileName);
  if (!shpFileBuffer) {
    return NextResponse.json({ error: 'Unable to retrieve the requested information.' }, { status: 503 });
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
  }
  return NextResponse.json(geojson, { status: 200 });
}
