import { Promotion } from "@prisma/client";
import { Edit } from "lucide-react";
import Image from "next/image";

type Props = {
  promotions: Array<Promotion>,
};

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

function getTimeAgo(date: Date) {
  const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);

  if (secondsAgo < MINUTE) {
    return secondsAgo + ` second${secondsAgo !== 1 ? "s" : ""} ago`;
  }

  let divisor;
  let unit = "";

  if (secondsAgo < HOUR) {
    [divisor, unit] = [MINUTE, "minute"];
  } else if (secondsAgo < DAY) {
    [divisor, unit] = [HOUR, "hour"];
  } else if (secondsAgo < WEEK) {
    [divisor, unit] = [DAY, "day"];
  } else if (secondsAgo < MONTH) {
    [divisor, unit] = [WEEK, "week"];
  } else if (secondsAgo < YEAR) {
    [divisor, unit] = [MONTH, "month"];
  } else {
    [divisor, unit] = [YEAR, "year"];
  }

  const count = Math.floor(secondsAgo / divisor);
  return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
}

export default function Promotions(props: Props){
  const imageStyle = {
    border: '1px solid #fff',
    "object-fit": "scale-down",
  }
   return (
       <div>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
          {props.promotions.map((promotion) => (
            <div key={promotion.id} className="group relative border p-1">
              <Edit className="invisible float-right group-hover:visible relative"></Edit>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-50">
              <Image
                width={256} height={256}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                src={promotion.imageUrl}
                alt=""
                style={imageStyle}
              ></Image>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {promotion.productName}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Modified {getTimeAgo(promotion.updatedAt)} </p>
                </div>
                <p className="text-sm font-medium text-gray-900">{promotion.price} $</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   ) 
}