"use client";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchControl from "./SearchControl";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import L, { LatLng } from "leaflet";

type Props = {
  latLng?: LatLng;
};


export default function Map({
  latLng
}: Props) {
  const prov = new OpenStreetMapProvider();

  let icon = L.icon({
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
        map.setView(latLng, 18);
      }
     }, [latLng, map]);
     return null;
   }

  return (
    <MapContainer
      center={latLng || [49.8, 24]}
      zoom={12}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterAutomatically latLng={latLng}></RecenterAutomatically>
      {
      latLng && <Marker position={[latLng.lat, latLng.lng]} icon={icon}>
        <Popup>
          You are here
        </Popup>
      </Marker>
      }
    </MapContainer>
  );
}
