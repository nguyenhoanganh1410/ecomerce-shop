import { USDollar } from "@/utils/dollarFomat";
import { IProductRoot } from "@/utils/types/product";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  product: IProductRoot;
  className?: string;
  inStock?: boolean;
  bgColor?: string;
}
const CardProductCarousel = ({
  product,
  className,
  inStock,
  bgColor,
}: IProps) => {
  return (
    <Link
      key={product._id + Math.random()}
      href={`product/${product.slug.current}`}
      className="block text-sm pl-2 pr-2"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 h-[250px] lg:h-[392px]">
        <Image
          src={product.images[0].url}
          alt={product.images[0].url}
          fill
          className="h-full w-full object-contain sm:object-contain"
        />
        <div className="absolute z-1 top-0 flex justify-between w-full align-center p-4"></div>
        <div className="absolute z-1 top-0 flex justify-between w-full align-center p-4">
          <div className="flex flex-col">
            {!inStock ? (
              <div className="w-[60px] h-[20px] bg-[#F24C3D] flex justify-center items-center rounded ml-[-8px] mt-2">
                <span className="text-[11px] font-bold text-[#FFFFFF]">
                  Sold Out
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {!inStock ? (
          <div className="absolute z-1 bottom-0 flex justify-between w-full align-center">
            <div className="w-full absolute h-[40px] bottom-0 bg-textColor flex justify-center items-center rounded opacity-75">
              <span className="text-[11px] font-bold text-[#FFFFFF]">
                Item Unavailable
              </span>
            </div>
          </div>
        ) : null}
      </div>
      <h3 className="mt-4 font-bold text-xs text-[#212529] capitalize">
        {product.brand?.name}
      </h3>
      <h3 className="mt-2 font-normal text-sm text-[#212529] capitalize">
        {product.title.length > 60
          ? product.title.substring(0, 60).toLowerCase() + "..."
          : product.title.toLowerCase()}
      </h3>
      <p className="text-xs font-bold mt-2 text-textColor">
        {USDollar.format(product.variants[0].price || 0)}
      </p>
    </Link>
  );
};

export default CardProductCarousel;
