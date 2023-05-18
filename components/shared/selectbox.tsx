"use client";

import * as Label from '@radix-ui/react-label';

export default function Select({
    label,
    id,
    options
  }: {
    label?: string,
    id?: string,
    options: Array<String>
  }) {

    return (
      <>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0:"
        >
          <Label.Root className="LabelRoot" htmlFor={id}>
            {label}
          </Label.Root>
          <select>
            {options.map((option, index) => <option key={index}>{option}</option>)}
          </select>
        </div>
      </>
    );
  }
  