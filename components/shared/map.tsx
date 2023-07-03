"use client";

import React from 'react'
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';

const DynamicMap = dynamic(() => import('./dynamic-map'), {
    ssr: false
  });

type Props = {
  latLng?: LatLng;
};

export default function Map({
  latLng
}: Props) {
  return (
    <div className="z-10 h-80 w-full  max-w-screen-xl mx-auto px-5 xl:px-0">
        <DynamicMap latLng={latLng}/>
    </div>
  )
}