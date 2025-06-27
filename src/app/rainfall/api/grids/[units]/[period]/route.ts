import { NextRequest, NextResponse } from 'next/server';
import { AsciiGrid, Period } from "@/lib";
import { isUnits, isPeriod } from "@/utils";
import { invalidUnitsResponse, invalidPeriodResponse, unableToRetrieveResponse } from "@/lib/responses";
import { getGrids } from "@/lib/rainfall_data";

export async function GET(_: NextRequest, { params }: {
  params: {
    units: string,
    period: string,
  },
}): Promise<NextResponse<{ error: string } | AsciiGrid>> {
  const units: string = params.units;
  if (!isUnits(units)) return invalidUnitsResponse;
  const period: string = params.period;
  if (!isPeriod(period)) return invalidPeriodResponse;

  const asciiGrids = await getGrids({ units, period: Period[period] });
  if (!asciiGrids) return unableToRetrieveResponse;

  return NextResponse.json(asciiGrids, { status: 200 });
}
