import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
    const lat = req.geo?.latitude
    const long = req.geo?.longitude;

    console.log(JSON.stringify(req.geo))
    console.log("api lat "  + req.headers.get("x-vercel-ip-latitude"));
    console.log("api long "  +  req.headers.get("x-vercel-ip-longitude"));
    console.log("api city "  +  req.headers.get("x-vercel-ip-city"));
  
    return NextResponse.json({lat, long});
  }