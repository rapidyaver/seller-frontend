"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { icon, LatLng } from "leaflet";

type Props = {
  latLng?: LatLng;
};


export default function Map({
  latLng
}: Props) {
  const [data, setData] = useState<LatLng>()
  const [isLoading, setLoading] = useState(false)
 
  useEffect(() => {
    setLoading(true)
    fetch('/api/map')
      .then((res) => res.json())
      .then((data) => {
        if(data.lat && data.long){
          setData(new LatLng(data.lat, data.long))
        }
        setLoading(false)
      })
  }, [])
  
  const prov = new OpenStreetMapProvider();

  let iconImage = icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  const RecenterAutomatically = ({
    latLng
  }: Props) => {
    const map = useMap();
     useEffect(() => {
      if(latLng){
        map.setView(latLng, 14);
      }
     }, [latLng, map]);
     return null;
   }

   if (isLoading) return <p>Loading...</p>

  return (
    <MapContainer
      center={latLng || [49.8, 24]}
      zoom={14}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterAutomatically latLng={data}></RecenterAutomatically>
      {
      latLng && <Marker position={data ? [data.lat, data.lng]: [0,0]} icon={iconImage}>
        <Popup>
          You are here
        </Popup>
      </Marker>
      }
    </MapContainer>
  );
}
