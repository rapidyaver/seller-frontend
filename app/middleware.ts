import { NextRequest, NextResponse } from "next/server"

export async function Middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers)
    if(req.geo && req.geo.city)
    requestHeaders.set('x-city', req.geo.city)
  
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }