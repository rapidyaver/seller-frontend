"use client";
import Card from "@/components/home/card";
import Map  from "@/components/shared/map";
import { Session } from "next-auth";
import { Location, Promotion, PromotionsOnLocations } from "@prisma/client";
import { useState } from "react";
import { LatLng } from "leaflet";

type Props = {
    promotions: (Promotion & {
        locations: PromotionsOnLocations[];
    })[],
    latLng?: LatLng,
  };
  
export default function TabMenuHome(props:Props) {
    const [tabName, setTabName] = useState("List")
    return (
        <>
         <ul className="w-full max-w-2xl m-auto text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex">
            <li className="w-full">
              <a onClick={() => setTabName("List")}  href="#" className={tabName == "List" ? "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg active focus:outline-none" : "inline-block w-full p-4 text-gray-500 bg-white rounded-l-lg active focus:outline-none"} aria-current="page">List</a>
            </li>
            <li className="w-full">
              <a onClick={() => setTabName("Map")} href="#" className={tabName == "Map" ? "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-r-lg focus:outline-none" : "inline-block w-full p-4 bg-white text-gray-500 rounded-r-lg focus:outline-none"}>Map</a>
            </li>
         </ul>
      {
        tabName == "List" &&
        <div className="my-10 grid m-auto w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {props.promotions.map(({ productName, productDescription, imageUrl, price, locations }) => (
          <Card
            key={productName}
            price={price.toString()}
            title={productName}
            description={productDescription}
            imageUrl={imageUrl}
          />
        ))}
      </div>
      }
      {
        tabName == "Map" && 
        <div className="px-5 my-10">
          <Map></Map>
        </div>
      }
        </>
    )
}