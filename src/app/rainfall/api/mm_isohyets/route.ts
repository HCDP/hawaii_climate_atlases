import { NextRequest, NextResponse } from 'next/server';
 
export async function GET() {
    const response = await fetch('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateIsohyetsSHP_mm.zip');
    const data = await response.arrayBuffer();
    return new NextResponse(data, {status: 200});
}