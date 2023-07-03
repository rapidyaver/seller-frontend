import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
    const lat = req.headers.get("x-vercel-ip-latitude");
    const long = req.headers.get("x-vercel-ip-longitude");
    if(lat && long){
      return NextResponse.json({lat,long})
    }
    return NextResponse.json({lat: 52.0607, long: 4.4940});
  }