
import Balancer from 'react-wrap-balancer';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import SignInButton from '@/components/layout/sign-in-button';
import Prisma from '@/lib/prisma';
import TabMenuBusiness from '@/components/business/tab-menu-business';

async function getLocations() {
  const locations = await Prisma.location.findMany();
  console.log(locations);
  return locations;
}

async function getPromotions(){
  const promotions = await Prisma.promotion.findMany({
    include: { locations: { include: { location: true } } },
  });
  console.log(promotions)
  return promotions;
}

export default async function Business() {
  const session = await getServerSession(authOptions);
  const locations = await getLocations();
  const promotions = await getPromotions();
  return (
    <>
      <div className="z-10 w-full max-w-2xl px-5 xl:px-0">
        {
          !session && 
          <><h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-600 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm sm:text-5xl md:text-6xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Register your business to get discovered!
            </Balancer>
          </h1><p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
              <Balancer>
                Share last munite deals with customers in your area, notify them immediately.
              </Balancer>
            </p>
            <div
              className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <SignInButton></SignInButton> 
              <p className="underline font-semibold">to get started</p>
            </div>
            </>
        }
        {
          session && <TabMenuBusiness promotions={promotions} locations={locations} session={session}></TabMenuBusiness>
        }
      </div>
    </>
  );
}