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