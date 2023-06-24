import Image from "next/image";
export default async function LocationDetails(){
    const products = [
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://res.cloudinary.com/dd27zp7dy/image/upload/v1685992996/zc2dhvpq5cdsagrkfyw3.png',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://res.cloudinary.com/dd27zp7dy/image/upload/v1685992996/zc2dhvpq5cdsagrkfyw3.png',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        // More products...
      ]
      
        return (
          <div className="z-10 w-full max-w-5xl px-5 xl:px-0">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Promotions at the location</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <Image
                        width={500}
                        height={500}
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
}