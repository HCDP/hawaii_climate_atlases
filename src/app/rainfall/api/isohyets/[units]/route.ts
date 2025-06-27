import { NextRequest, NextResponse } from 'next/server';
import { FeatureCollection } from "geojson";
import { isUnits } from "@/utils";
import { invalidUnitsResponse, unableToRetrieveResponse } from "@/lib/responses";
import { getIsohyets } from "@/lib/rainfall_data";

export async function GET(_: NextRequest, { params }: { params: { units: string } }): Promise<NextResponse<{ error: string } | FeatureCollection[]>> {
  const units: string = params.units;
  if (!isUnits(units)) return invalidUnitsResponse;

  const geojson = await getIsohyets({ units });
  if (!geojson) return unableToRetrieveResponse;
  return NextResponse.json(geojson, { status: 200 });
}
