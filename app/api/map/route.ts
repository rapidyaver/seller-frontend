import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
    const lat = req.geo?.latitude
    const long = req.geo?.longitude;
  
    return NextResponse.json({lat, long});
  }