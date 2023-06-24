import { NextRequest, NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';
import {v4 as uuidv4} from 'uuid';

 
export async function POST(req: NextRequest) {
  
  const {productName,description,imageUrl,price,locations} = await req.json();

  const promotion = await Prisma.promotion.create({
    data: {
      productName,
      productDescription: description,
      imageUrl,
      price
    },
  })

  const promotionLocations = await Prisma.location.findMany({
    where : {
      id : {
        in : locations
      }
    }
  })

  await Prisma.promotionsOnLocations.createMany({
    data: promotionLocations.map ( promotionLocation => ({
      locationId: promotionLocation.id,
      promotionId: promotion.id
    }))
  })
  return NextResponse.json(promotion);
}