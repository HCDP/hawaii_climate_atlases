import { NextRequest, NextResponse } from 'next/server';
import { Units } from '@/lib';
import { isUnits } from '@/utils';
import { getAETPointValues } from '@/lib/extract_ET_data';

export async function GET(request: NextRequest, { params }: {
  params: { units: string },
}): Promise<NextResponse> {
  const units = params.units;
  if (!isUnits(units)) {
    return NextResponse.json({ error: 'Invalid units.' }, { status: 400 });
  }

  const latitude = Number(request.nextUrl.searchParams.get('lat'));
  const longitude = Number(request.nextUrl.searchParams.get('lng'));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: 'Invalid coordinates.' }, { status: 400 });
  }

  const varName = request.nextUrl.searchParams.get('var') ?? 'Evapotranspiration';
  try {
    const pointValues = await getAETPointValues({
      units: units as Units,
      varName,
      latitude,
      longitude,
    });
    return NextResponse.json(pointValues, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to load Evap point values:', error);
    return NextResponse.json({ error: 'Unable to retrieve point values.' }, { status: 500 });
  }
}