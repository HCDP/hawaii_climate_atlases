import { NextRequest, NextResponse } from 'next/server';
 
export async function GET() {
    const response = await fetch('https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed_csv.csv');
    const data = await response.text();
    return new NextResponse(data, {status: 200});
}