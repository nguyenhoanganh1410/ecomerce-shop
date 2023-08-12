import { products } from "@/utils/data"
import Image from "next/image"

export default function LogoComponent() {

  return (
    <div className="mx-auto mb-24 px-6 max-w-[1440px] overflow-hidden sm:px-6 lg:px-20">
        <h2 className="sr-only">Products</h2>
        <div className="-mx-px grid grid-cols-2 gap-6 sm:pl-2 sm:mr-2 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}