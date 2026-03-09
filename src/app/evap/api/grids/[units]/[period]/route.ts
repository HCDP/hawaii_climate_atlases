import { NextRequest, NextResponse } from 'next/server';
import { AsciiGrid, Period, Month, Hour } from "@/lib";
import { isUnits, isPeriod, isHour, isMonth } from "@/utils";
import { invalidUnitsResponse, invalidPeriodResponse, invalidMonthResponse, invalidHourResponse, unableToRetrieveResponse } from "@/lib/responses";
import { getAETGrids } from "@/lib/extract_ET_data";

export async function GET(_: NextRequest, { params }: {
  params: {
    units: string,
    period: string,
  },
}): Promise<NextResponse<{ error: string } | AsciiGrid>> {
  const units: string = params.units;
  if (!isUnits(units)) return invalidUnitsResponse;
  /* const month: string = params.month;
  if (!isMonth(month)) return invalidMonthResponse;
  const hour: string = params.hour;
  if (!isHour(hour)) return invalidHourResponse;
  */ 
  const period: string = params.period;
  if (!isPeriod(period)) return invalidPeriodResponse;

  const asciiGrids = await getAETGrids({ units, period: Period[period] });
  if (!asciiGrids) return unableToRetrieveResponse;

  return NextResponse.json(asciiGrids, { status: 200 });
}
