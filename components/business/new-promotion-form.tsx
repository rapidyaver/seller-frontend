"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Balancer from "react-wrap-balancer";
import React, { ChangeEvent, useState } from "react";
import Select, { components } from 'react-select'
import { Location } from "@prisma/client";
import Image from "next/image";

type Props = {
  locations: Array<Location>,
};

export default function NewPromotionForm(props:Props) {
  const options = props.locations.map(location => {
    return {
      value: location.id,
      label: location.name
    }
  })
  const [productName, setproductName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState<Array<string>>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("upload_preset", "location_photo_upload");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dd27zp7dy/image/upload",
          {
            body: formData,
            method: "POST",
          },
        );
        setImageUrl(await response.json().then((data) => data.secure_url));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(price);
    if (file == null) {
      alert("Please select a file");
      return;
    }
    const data = {
      imageUrl,
      productName,
      description,
      price,
      locations,
    };
 
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
 
    // API endpoint where we send form data.
    const endpoint = '/api/promotion';
 
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };
 
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
 
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="/api/location" method="post">
        <div className="space-y-12 rounded-md border-2 mt-2 border-dashed border-gray-900/10 p-6">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Promotion
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              <Balancer ratio={0.3}>
                Add a new promotion for one or more locations.
              </Balancer>
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      value={productName}
                      onChange={event => {
                        setproductName(event.target.value);
                      }}
                      autoComplete="productName"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Name of the product you are promoting..."
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={event => {
                        setDescription(event.target.value);
                    }}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Tell us more about the product.."
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex-col w-full ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="productPrice"
                      id="productPrice"
                      autoComplete="off"
                      value={price}
                      onChange={event => {
                        setPrice(parseFloat(event.target.value));
                      }}
                      className="block flex-row w-full rounded-md shadow-sm ring-1 ring-inset flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Discounted price of the product..."
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo of the product.
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="justify-center">
                    {imageUrl && (
                      <Image
                        width={400}
                        height={500}
                        className="h-48 w-56 mx-auto justify-center rounded-lg bg-gray-50"
                        src={imageUrl}
                        alt=""
                      ></Image>
                    )}
                    {
                      !imageUrl && (
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )
                    }
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={handleFileChange}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-center leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Available Locations
                </label>
                <div className="mt-2">
                  <div className="flex-col w-full ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select closeMenuOnSelect={false}
                            isMulti={true} 
                            noOptionsMessage={() => "No more options"}
                            onChange={(e) => setLocations(e.map( location => location.value))}
                            className="block flex-row w-full rounded-md shadow-sm ring-1 ring-inset flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                            options={options} />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
