import { NextRequest, NextResponse } from 'next/server';
import { 
  getSolarRadiationGrids,
  getDiffuseRadiationGrids,
  getLongwaveDownGrids,
  getLongwaveUpGrids,
  getNetRadiationGrids
} from '@/lib/solar_radiation_data';
import { Period } from '@/lib/types';

const SOLAR_DATA_FUNCTIONS = {
  radiation: getSolarRadiationGrids,
  diffuse: getDiffuseRadiationGrids,
  'longwave-down': getLongwaveDownGrids,
  'longwave-up': getLongwaveUpGrids,
  'net-radiation': getNetRadiationGrids,
} as const;

type SolarType = keyof typeof SOLAR_DATA_FUNCTIONS;

// error message template
function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// checks if value is a valid Solar type 
function isSolarType(value: string): value is SolarType {
  return value in SOLAR_DATA_FUNCTIONS;
}

// checks if value is a valid Period (0-12 inclusive)
function isValidPeriod(value: number): value is Period {
  return Number.isInteger(value) && value >= 0 && value <= 12;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { type: string; period: string } }
) {
  try {
    const { type, period } = params;

    // Parse and validate period
    const periodNumber = Number(period);
    if (!isValidPeriod(periodNumber)) {
      return jsonError('Invalid period', 400); 
    }

    // Validate type and get the corresponding function
    if (!isSolarType(type)) {
      return jsonError('Invalid solar radiation type', 400); // same message & status
    }

    // Get the period data of the solar data function 
    const gridData = await SOLAR_DATA_FUNCTIONS[type]({ period: periodNumber });

    if (!gridData) {
      return jsonError(`${type} data not found`, 404); // same behavior
    }

    return NextResponse.json(gridData);
  } catch (error) {
    console.error('Solar radiation API error:', error);
    return jsonError('Internal server error', 500);
  }
}
