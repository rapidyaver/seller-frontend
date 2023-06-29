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
            return (
            <li className="group flex justify-evenly gap-x-4 py-5 my-2 border-2 p-2 rounded-md hover:cursor-pointer" key={location.id}>
              <div className="flex items-center align-middle w-20 group-hover:opacity-75">
                <Image
                  width={256} height={256}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={location.imageUrl}
                  alt=""
                ></Image>
              </div>
              <div className="self-center w-24 align-middle group-hover:opacity-75">
                  <p className="text-clip self-center text-center text-sm text-gray-900">
                    {location.name}
                  </p>
              </div>
              <div className="self-center align-middle group-hover:opacity-75">
                  <p className="text-clip text-center text-sm text-gray-500">
                    {location.address.length > 25 ? location.address.substring(0,24) + "..." : location.address}
                  </p>
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
