import { NextResponse } from "next/server";

export const invalidUnitsResponse = NextResponse.json({ error: 'Invalid units.' }, { status: 400 });
export const invalidPeriodResponse = NextResponse.json({ error: 'Invalid period.' }, { status: 400 });
export const invalidMonthResponse = NextResponse.json({ error: 'Invalid month.' }, { status: 400 });
export const invalidHourResponse = NextResponse.json({ error: 'Invalid hour.' }, { status: 400 });
export const unableToRetrieveResponse = NextResponse.json({ error: 'Unable to retrieve the requested information.' }, { status: 503 });