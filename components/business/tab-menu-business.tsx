"use client";
import { Building2, ShoppingBag, PlusSquare, PackagePlus } from "lucide-react";
import NewLocationForm from '@/components/business/new-location-form';
import NewPromotionForm from "./new-promotion-form";
import BusinessLocations from '@/components/business/locations';
import { Session } from "next-auth";
import { Location, Promotion } from "@prisma/client";
import { useState } from "react";
import Promotions from "./promotions";

type Props = {
    locations: Array<Location>,
    promotions: Array<Promotion>,
    session?: Session,
  };
  
export default function TabMenuBusiness(props:Props) {
    const [tabName, setTabName] = useState("Locations")

    return (
        <>
        {
          props.session && 
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <a href="#" onClick={() => setTabName("Locations")} className={tabName === "Locations" ? "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}>
                        <Building2 className={tabName === "Locations" ? "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" : "w-5 h-5 mr-2"}></Building2>Locations
                    </a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setTabName("Deals")}  className={tabName === "Deals" ? "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"} aria-current="page">
                        <ShoppingBag className={tabName === "Deals" ? "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" : "w-5 h-5 mr-2"}></ShoppingBag> Promotions
                    </a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setTabName("NewLocation")} className={tabName === "NewLocation" ? "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}>
                    <PlusSquare className={tabName === "NewLocation" ? "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" : "w-5 h-5 mr-2"}></PlusSquare> New Location
                    </a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setTabName("NewPromotion")} className={tabName === "NewPromotion" ? "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}>
                    <PackagePlus className={tabName === "NewPromotion" ? "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" : "w-5 h-5 mr-2"}></PackagePlus> New Promotion
                    </a>
                </li>
            </ul>
          </div>
        }
        {
          (props.session && tabName === "Locations") && <BusinessLocations locations={props.locations}></BusinessLocations>
        }
        {
          (props.session && tabName === "Deals") && <Promotions promotions={props.promotions}></Promotions>
        }
        { (props.session && tabName === "NewLocation") && <NewLocationForm></NewLocationForm> }
        { (props.session && tabName === "NewPromotion") && <NewPromotionForm locations={props.locations}></NewPromotionForm> }
        </>
    )
}