import { NextRequest, NextResponse } from 'next/server';
import { Station } from "@/lib";
import { unableToRetrieveResponse } from "@/lib/responses";
import { getStations } from "@/lib/rainfall_data";

export async function GET(request: NextRequest): Promise<NextResponse<{ error: string } | Station[]>> {
  const searchParams = request.nextUrl.searchParams;
  // valid filters: "all" | "used" | "other"
  const filter = searchParams.get('filter');

  const includeUsedStations: boolean = !filter || filter === 'all' || filter === 'used';
  const includeOtherStations: boolean = filter === 'all' || filter === 'other';

  let stations: Station[] = [];
  if (includeUsedStations) {
    const usedStations: Station[] | null = await getStations({ other: false });
    if (!usedStations) {
      return unableToRetrieveResponse;
    }
    stations = stations.concat(usedStations);
  }
  if (includeOtherStations) {
    const otherStations: Station[] | null = await getStations({ other: true });
    if (!otherStations) {
      return unableToRetrieveResponse;
    }
    stations = stations.concat(otherStations);
  }
  return NextResponse.json(stations, { status: 200 });
}
