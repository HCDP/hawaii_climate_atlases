import { NextRequest, NextResponse } from 'next/server';
import { AsciiGrid, Period, Units } from "@/lib";
import { isUnits, isPeriod } from "@/utils";
import { invalidUnitsResponse, invalidPeriodResponse, unableToRetrieveResponse } from "@/lib/responses";
import { getUncertaintyGrids } from "@/lib/extract_data";

export async function GET(_: NextRequest, { params }: {
  params: {
    units: string,
    period: string,
  },
}): Promise<NextResponse<{ error: string } | AsciiGrid>> {
  console.log('Received request with params:', params);
  
  const units: string = params.units;
  console.log('Checking units:', units);
  if (!isUnits(units)) {
    console.log('Invalid units');
    return invalidUnitsResponse;
  }
  
  const period: string = params.period;
  console.log('Checking period:', period);
  if (!isPeriod(period)) {
    console.log('Invalid period');
    return invalidPeriodResponse;
  }

  const asciiGrids = await getUncertaintyGrids({ 
    units: Units[units], 
    period: Period[period] 
  });
  if (!asciiGrids) return unableToRetrieveResponse;

  return NextResponse.json(asciiGrids, { status: 200 });
}
