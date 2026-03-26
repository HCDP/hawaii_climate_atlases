import { NextRequest, NextResponse } from 'next/server';
import { AsciiGrid, Period, Month, Hour } from "@/lib";
import { isUnits, isPeriod, isHour, isMonth } from "@/utils";
import { invalidUnitsResponse, invalidPeriodResponse, invalidMonthResponse, invalidHourResponse, unableToRetrieveResponse } from "@/lib/responses";
import { getAETGrids } from "@/lib/extract_ET_data";
/* import { Fetcher } from "swr";

const fetcher: Fetcher<AsciiGrid, string> = async (url: string): Promise<AsciiGrid> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch grid: ${res.status}`);
  return res.json();
}; */

export async function GET(_: NextRequest, { params }: {
  params: {
    units: string,
    month: string,
    hour: string,
  },
}): Promise<NextResponse<{ error: string } | AsciiGrid>> {
  const units: string = params.units;
  if (!isUnits(units)) return invalidUnitsResponse;
  const month: string = params.month;
  if (!isMonth(month)) return invalidMonthResponse;
  const hour: string = params.hour;
  if (!isHour(hour)) return invalidHourResponse;

  const asciiGrids = await getAETGrids({ units, month: Month[month], hour: hour as Hour });
  if (!asciiGrids) return unableToRetrieveResponse;

  return NextResponse.json(asciiGrids, { status: 200 });
}
