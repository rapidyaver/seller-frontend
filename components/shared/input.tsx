"use client";

import * as Label from '@radix-ui/react-label';
import { useEffect, useState } from 'react'

export default function Input({
    label,
    id,
  }: {
    label?: string,
    id?: string,
  }) {

    return (
      <>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0:"
        >
          <Label.Root className="LabelRoot" htmlFor={id}>
            {label}
          </Label.Root>
          <input className="Input" type="text" id={id} />
        </div>
      </>
    );
  }
  