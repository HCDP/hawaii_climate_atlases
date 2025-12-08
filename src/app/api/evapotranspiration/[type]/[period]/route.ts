import { NextRequest, NextResponse } from 'next/server';
import {
  getEvapotranspirationGrids,
  getAirDensityGrids,
  getAvailableEnergyGrids,
  getCanopyConductanceGrids,
} from '@/lib/evapotranspiration_data';
import { Period, Units } from '@/lib/types';

const EVAP_DATA_FUNCTIONS = {
  aet: getEvapotranspirationGrids,
  'air-density': getAirDensityGrids,
  'available-energy': getAvailableEnergyGrids,
  'canopy-conductance': getCanopyConductanceGrids,
} as const;

type EvapType = keyof typeof EVAP_DATA_FUNCTIONS;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isEvapType(value: string): value is EvapType {
  return value in EVAP_DATA_FUNCTIONS;
}

function isValidPeriod(value: number): value is Period {
  return Number.isInteger(value) && value >= 0 && value <= 12;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; period: string } }
) {
  try {
    const { type, period } = params;

    const periodNumber = Number(period);
    if (!isValidPeriod(periodNumber)) {
      return jsonError('Invalid period', 400);
    }

    if (!isEvapType(type)) {
      return jsonError('Invalid evapotranspiration type', 400);
    }

    // Get units from query params (default to MM for non-AET types)
    const searchParams = request.nextUrl.searchParams;
    const unitsParam = searchParams.get('units') || 'mm';
    const units = unitsParam.toLowerCase() === 'in' ? Units.IN : Units.MM;

    // Only AET needs units parameter
    const gridData = type === 'aet'
      ? await EVAP_DATA_FUNCTIONS[type]({ period: periodNumber, units })
      : await EVAP_DATA_FUNCTIONS[type]({ period: periodNumber });

    if (!gridData) {
      return jsonError(`${type} data not found`, 404);
    }

    return NextResponse.json(gridData);
  } catch (error) {
    console.error('Evapotranspiration API error:', error);
    return jsonError('Internal server error', 500);
  }
}
