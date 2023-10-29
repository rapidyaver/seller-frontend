import { NextRequest, NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';
import {v4 as uuidv4} from 'uuid';

 
export async function POST(req: NextRequest) {
  let locationId = uuidv4();

  const {locationName,description,lat,lng,imageUrl,address} = await req.json();


  await Prisma.$executeRawUnsafe (`INSERT INTO "Location"
  (id, "name", "description", "imageUrl", "address", "createdAt", "updatedAt", coords)
  VALUES('${locationId}', '${locationName}', '${description}', '${imageUrl}','${address}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SRID=4326;POINT(${lat} ${lng})'::geometry);
  `);
  const findUser = await Prisma.location.findFirst({
    where: {
      id : locationId
    }
  })
  return NextResponse.json(findUser);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const latParam = searchParams.get("lat");
  const longParam = searchParams.get("long");

  const lat = latParam ? parseFloat(latParam) : 0;
  const long = longParam ? parseFloat(longParam) : 0;
  
  const query = await Prisma.$queryRaw<{ id: string }[]> `SELECT id FROM "Location" l  where ST_DWithin(coords::geography, ST_MakePoint(${lat}, ${long}),1609.344);`
  const promotions = await Prisma.promotion.findMany({
   where : {
      locations : {
        some : {
          locationId : {
            in: query.map(({ id }) => id)
          }
        }
      }
   },
    include: {
      locations: {
        include: {
          location : true
        }
      }
    },
  })
  return  NextResponse.json(promotions);
}