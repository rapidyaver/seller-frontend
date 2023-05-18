"use client";

import React from 'react'
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./dynamic-map'), {
    ssr: false
  });

export default function Map() {
  return (
    <div className="z-10 h-80 w-full  max-w-screen-xl mx-auto px-5 xl:px-0">
        <DynamicMap />
    </div>
  )
}