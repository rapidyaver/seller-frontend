"use client";
import Card from "@/components/home/card";
import Map  from "@/components/shared/map";
import { Session } from "next-auth";
import { Location, Promotion, PromotionsOnLocations } from "@prisma/client";
import { useState } from "react";

type Props = {
    promotions: (Promotion & {
        locations: PromotionsOnLocations[];
    })[],
  };
  
export default function TabMenuHome(props:Props) {
    const [tabName, setTabName] = useState("List")
    return (
        <>
         <ul className="z-10 my-4 w-full max-w-2xl text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">

          <li className="w-full">
            <a onClick={() => setTabName("List")}  href="#" className={tabName == "List" ? "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg active focus:outline-none dark:bg-gray-900 dark:text-white" : "inline-block w-full p-4 text-gray-800 bg-gray-100 rounded-l-lg active focus:outline-none dark:bg-gray-700 dark:text-white"} aria-current="page">List</a>
          </li>
          <li className="w-full">
          <a onClick={() => setTabName("Map")} href="#" className="inline-block w-full p-4 bg-white rounded-r-lg focus:outline-none dark:bg-gray-800">Map</a>
      </li>
      </ul>
      {
        tabName == "List" &&
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
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
        <Map></Map>
      }
        </>
    )
}