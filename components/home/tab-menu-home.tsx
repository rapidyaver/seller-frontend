"use client";
import Card from "@/components/home/card";
import Map  from "@/components/shared/map";
import { Promotion, PromotionsOnLocations, Location } from "@prisma/client";
import { useState } from "react";
import { LatLng } from "leaflet";
import { MapPin } from "lucide-react";

type Props = {
    promotions: (Promotion & { locations: (PromotionsOnLocations & {
      location: Location;
  })[] })[],
    latLng?: LatLng,
    city?: string
  };
  
export default function TabMenuHome(props:Props) {

    const [tabName, setTabName] = useState("List")
    return (
        <>
        <form className="max-w-md m-auto text-center mb-6">   
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400"></MapPin>
                </div>
                <input type="search" value={props.city} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500"/>
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm px-2 py-2">Locate Me</button>
            </div>
          </form>
         <ul className="max-w-2xl m-auto text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex">
            <li className="w-full">
              <a onClick={() => setTabName("List")}  href="#" className={tabName == "List" ? "inline-block w-full p-4 text-white bg-teal-500 rounded-l-lg active focus:outline-none" : "inline-block w-full p-4 text-gray-500 bg-white rounded-l-lg active focus:outline-none"} aria-current="page">List</a>
            </li>
            <li className="w-full">
              <a onClick={() => setTabName("Map")} href="#" className={tabName == "Map" ? "inline-block w-full p-4 text-white bg-teal-500 rounded-r-lg focus:outline-none" : "inline-block w-full p-4 bg-white text-gray-500 rounded-r-lg focus:outline-none"}>Map</a>
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
            description={locations[0].location.name}
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