import Image from "next/image";
import { Location } from "@prisma/client";
import { Edit } from "lucide-react";

type Props = {
  locations: Array<Location>;
};

export default function BusinessLocations({
  locations
}: Props) {
  return (
    <>
      <ul role="list" className="mt-1">
        {
          locations.map((location, key ) => {
            return (<li className="group flex justify-between gap-x-6 py-5 my-2 border-2 p-2 rounded-md hover:cursor-pointer" key={location.id}>
            <div className="flex gap-x-4 items-center group-hover:opacity-75">
              <Image
                width={256} height={256}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={location.imageUrl}
                alt=""
              ></Image>
              <div className="min-w-0 flex-auto max-w-md">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {location.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {location.address}
                </p>
              </div>
            </div>
            <div className="sm:flex sm:flex-col sm:items-end">
              <Edit className="invisible group-hover:visible" width={18} height={18}></Edit>
              <p className="text-sm leading-6 text-gray-900"> Active Deals</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
               Added 3h ago
              </p>
            </div>
          </li>)
          })
        }
      </ul>
    </>
  );
}
