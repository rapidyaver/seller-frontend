"use client";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchControl from "./SearchControl";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import L, { LatLng } from "leaflet";

export default function Map() {
  const prov = new OpenStreetMapProvider();

  let icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const markerOptions = {
    icon: icon,
    draggable: false,
  };

  function LocationMarker() {
    const [latlng, setLatlng] = useState<LatLng>(new LatLng(40.8054, -74.0241));

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setLatlng(e.latlng);
        map.setView(e.latlng, map.getZoom());
      });
    }, [map]);
    return latlng === null ? null : (
      <Marker position={latlng} icon={icon}>
        <Popup>
          You are here
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={[49.1951, 16.6068]}
      zoom={12}
      className="h-full"
      key={new Date().getTime()}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl
        provider={prov}
        showMarker={true}
        showPopup={false}
        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={true}
        searchLabel={"Enter address, please"}
        keepResult={true}
        marker={markerOptions}
      />
      <LocationMarker />
    </MapContainer>
  );
}
