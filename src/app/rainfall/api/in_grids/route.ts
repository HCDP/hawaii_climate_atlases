import { NextResponse } from 'next/server';
 
export async function GET() {
    const response = await fetch('https://atlas.uhtapis.org/rainfall/assets/files/GISLayers/StateASCIIGrids_inches.zip');
    //const data = await response.arrayBuffer();
    return new NextResponse(await response.arrayBuffer(), {status: 200});
}