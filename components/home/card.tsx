import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

const imageStyle = {
  "object-fit": "contain",
  width: "100% !important",
}

export default function Card({
  title,
  description,
  price,
  large,
  imageUrl,
}: {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  large?: boolean;
}) {
  return (
    <div className="wrapper z-10 text-gray-900 antialiased shadow-md">
        <Image
          src={imageUrl}
          width={150}
          className="h-40 sm:h-60"
          height={200}
          alt={description}
         style={imageStyle}
        ></Image>

        <div className="relative">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-baseline">
              <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                New
              </span>
              <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                {description}
              </div>
            </div>

            <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
              {title}
            </h4>

            <div className="mt-1">
              ${price}
              <span className="text-sm text-gray-600"> /piece</span>
            </div>
            <div className="mt-4">
              <span className="text-md font-semibold text-teal-600">
                4/5 ratings{" "}
              </span>
              <span className="text-sm text-gray-600">
                (based on 234 ratings)
              </span>
            </div>
          </div>
        </div>
    </div>
  );
}
