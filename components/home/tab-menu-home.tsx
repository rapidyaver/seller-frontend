"use client";
import Card from "@/components/home/card";
import Map  from "@/components/shared/map";
import { Promotion, PromotionsOnLocations, Location } from "@prisma/client";
import { useState } from "react";
import { LatLng } from "leaflet";
import { MapPin } from "lucide-react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";
import { RawResult } from "leaflet-geosearch/dist/providers/openStreetMapProvider";

type Props = {
    promotions: (Promotion & { locations: (PromotionsOnLocations & {
      location: Location;
  })[] })[],
    latLng?: LatLng,
    city?: string
  };
  
export default function TabMenuHome(props:Props) {
  const [inputTimer, setInputTimer] = useState<any>(null);
    const [tabName, setTabName] = useState("List")
    const [locationName, setLocationName] = useState(props.city);
    const [searchResults, setSearchResults] = useState<SearchResult<RawResult>[]>([]);
    const [latlng, setLatlng] = useState<LatLng | undefined>(undefined);

    const provider = new OpenStreetMapProvider();

    const newAddresTyped = async (location: string) => {    
      if(inputTimer){
        clearTimeout(inputTimer);    
      }
  
      let timeout = setTimeout(async () => {
        const results = await provider.search({ query: location })
        setSearchResults(results)
      }, 500);
      
      setInputTimer(timeout);
    }

    const success = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLatlng(new LatLng(latitude, longitude) );
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }


    return (
        <>
        <form className="max-w-md m-auto text-center mb-6">   
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400"></MapPin>
                </div>
                <input 
                  type="search" 
                  value={locationName}
                  onChange={event => {
                      setLocationName(event.target.value);
                      newAddresTyped(event.target.value);
                    }}
                 id="default-search" 
                 className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500"/>
                {searchResults.length > 0 && <ul className="flex-row z-20 absolute bg-white rounded-sm text-sm mt-1 border-b-2 border-x-2 border-gray-200 ">
                      {searchResults.map((result, index ) => {
                      if(index == 0)
                          return (<li onClick={() => {
                              setLocationName(result.label);
                              setLatlng(new LatLng(result.y, result.x));
                              setSearchResults([]);
                          }} key={index} className="text-gray-800 p-1 cursor-pointer hover:bg-cyan-100 hover:bg-opacity-50">{result.label}</li>)
                      else 
                          return (<li onClick={() => {
                              setLocationName(result.label);
                              setLatlng(new LatLng(result.y, result.x));
                              setSearchResults([]);
                          }} key={index} className="border-t-2 p-1 cursor-pointer border-gray-200 text-gray-800 hover:bg-cyan-100  hover:bg-opacity-50">{result.label}</li>);
                      })}
                    </ul>}
                <button type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(success);
                    }
                  }}
                 className="text-white absolute right-2.5 bottom-2.5 bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm px-2 py-2">Locate Me</button>
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
        {props.promotions.map(({ id, productName, productDescription, imageUrl, price, locations }) => (
          <Card
            key={id}
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
          <Map latLng={latlng} markers={props.promotions.map(pro => ({ latLng: new LatLng(52.0607, 4.4940)}))}></Map>
        </div>
      }
        </>
    )
}