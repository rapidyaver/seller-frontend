import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

const imageStyle = {
  border: '1px solid #fff',
  "object-fit": "cover",
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
    <div className="wrapper z-10 text-gray-900 antialiased">
      <div>
        <Image
          width={350}
          height={350}
          className="w-full sm:h-60 md:h-80 rounded-lg object-cover object-center shadow-md"
          src={imageUrl}
          alt={description}
          style={imageStyle}
        ></Image>

        <div className="relative -mt-16 px-4  ">
          <div className="rounded-lg bg-white p-6 shadow-lg">
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
    </div>
  );
}
