import { USDollar } from "@/utils/dollarFomat";
import { IProductResponse } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  product: IProductResponse;
  className?: string;
  inStock?: boolean;
  bgColor?: string;
}
const CardProduct = ({ product, className, inStock, bgColor }: IProps) => {
  return (
    <Link
      key={product._id}
      href={`product/${product.slug.current}`}
      className={`group text-sm cursor-pointer ${className || ""}`}
    >
      <div
        className={`${
          bgColor || "bg-white"
        } aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg group-hover:opacity-75 xl:h-[380px]`}
      >
        <Image
          fill
          src={product.images && product.images[0]?.url}
          alt={product.title}
          className="h-full w-full object-contain"
        />
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
      <h3 className="mt-4 font-bold capitalize text-xs xl:text-[15px] text-[#212529]">
        {product.title.length > 60
          ? product.title.substring(0, 60).toLowerCase() + "..."
          : product.title.toLowerCase()}
      </h3>
      <p className="text-xs font-normal mt-2">
        {USDollar.format(
          product.defaultProductVariant?.variants[0]?.price || 0
        )}
      </p>
    </Link>
  );
};

export default CardProduct;
