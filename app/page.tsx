import Balancer from "react-wrap-balancer";
import Prisma from '@/lib/prisma';
import TabMenuHome from "@/components/home/tab-menu-home";
import { headers } from 'next/headers'

async function getPromotions() {
  const query = await Prisma.$queryRaw<{ id: string }[]> `SELECT id FROM "Location" l  where ST_DWithin(coords::geography, ST_MakePoint(52.0562912, 4.4980833),1609.344);`
  const promotions = await Prisma.promotion.findMany({
    include: {
      locations: {
        where: {
          locationId: {
            in: query.map(({ id }) => id)
          }
        }
      },
    },
  })
  return promotions;
}


export default async function Home() {
  const headersList = headers()
  console.log(headersList)
  console.log("lat "  + headersList.get("x-vercel-ip-latitude"));
  console.log("long "  + headersList.get("x-vercel-ip-long"));
  const promotions = await getPromotions();
  return (
    <>
      <div className="z-10 w-full max-w-2xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-600 bg-clip-text text-center font-display sm:text-5xl md:text-6xl text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Find amazing last-minute deals in your hood!</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Discover exclusive discounts and promotions from local shops and retailers 
          </Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
        </div>
      </div>

      <TabMenuHome promotions={promotions}></TabMenuHome>
    </>
  );
}