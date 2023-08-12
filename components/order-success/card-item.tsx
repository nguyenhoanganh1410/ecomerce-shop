import { USDollar } from "@/utils/dollarFomat";
import { getDataById, getDataByWithCache } from "@/utils/sanity/userService";
import {
  IOrderLineDB,
  IOrderProductResult,
  IProductDB,
  Iuser,
} from "@/utils/type";
import Image from "next/image";

interface IProps {
  products: IProductDB[];
  orderLines: IOrderLineDB[];
}
async function CardItems({ products, orderLines }: IProps) {
  const orderLinesWithGift = orderLines.filter((line) => {
    return line.ownerGift;
  });
  const listPromise =
    orderLinesWithGift.map((item) => getDataByWithCache(item.ownerGift)) || [];
  const listUser = await Promise.all([...listPromise]);
  const listUsesFlat: Iuser[] = listUser.flat();

  return (
    <ul
      role="list"
      className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
    >
      {products &&
        products.map((product) => {
          const findIndex = orderLinesWithGift.findIndex((item) => {
            return item.id === product.orderLineId;
          });
          return (
            <li key={product.id} className="flex space-x-6 py-6">
              <Image
                width={96}
                height={96}
                src={product.image}
                alt={product.image}
                className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
              />
              <div className="flex-auto space-y-1">
                {findIndex !== -1 ? (
                  <div className="flex justify-between">
                    <h3 className="text-sm">
                      <span className="font-bold text-xs text-[#9F7D83]">
                        @{listUsesFlat[findIndex]?.sigmaUserName}
                      </span>
                    </h3>
                  </div>
                ) : null}
                <h3 className="text-gray-900">
                  <a href="#">
                    {product.name} ({product.quanity})
                  </a>
                </h3>
                <p>{product.color}</p>
                <p>{product.size}</p>
              </div>
              <p className="flex-none font-medium text-gray-900">
                {USDollar.format(product.price * product.quanity)}
              </p>
            </li>
          );
        })}
    </ul>
  );
}

export default CardItems;
