import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
    const lat = req.headers.get("x-vercel-ip-latitude");
    const long = req.headers.get("x-vercel-ip-longitude");

    console.log("api lat "  + req.headers.get("x-vercel-ip-latitude"));
    console.log("api long "  +  req.headers.get("x-vercel-ip-longitude"));
    console.log("api city "  +  req.headers.get("x-vercel-ip-city"));

    if(lat && long){
      return NextResponse.json({lat,long})
    }
    return NextResponse.json({lat: 52.0607, long: 4.4940});
  }