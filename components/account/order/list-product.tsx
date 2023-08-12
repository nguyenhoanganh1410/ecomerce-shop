import { USDollar } from "@/utils/dollarFomat";

interface IProductOrder {
  id: number;
  name: string;
  brand: string;
  size: string;
  color: string;
  image: string;
  quanity: number;
  price: number;
  orderId: number;
}
const ListProduct = ({ products }: { products: IProductOrder[] }) => {
  return (
    <>
      <li className="flex flex-col pb-9 justify-start">
        <div className="flex items-center">
          <div className="flex-shrink-0 mt-[9px]">
            <span className="text-xs text-[#767676] hover:text-gray-800 uppercase">
              PRODUCT
            </span>
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div className="w-[180px]">
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <span className="font-bold text-xs text-[#212529] hover:text-gray-800 uppercase"></span>
                  </h3>
                </div>
                <div className="flex text-sm">
                  <p className="font-normal text-xs text-[#767676] capitalize"></p>
                </div>
                <div className="flex text-sm">
                  <p className="font-normal text-xs text-[#767676] capitalize"></p>
                </div>
              </div>
              <div>
                <div className="mt-2 sm:mt-2 flex justify-between items-center">
                  <div className="hidden sm:flex">
                    <span className="text-xs text-[#767676] hover:text-gray-800 uppercase">
                      QUANITY
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-col justify-center items-center">
                    <span className="text-xs text-[#767676] hover:text-gray-800 uppercase">
                      TOTAL
                    </span>
                  </div>

                  <div className="hidden sm:flex">
                    <span className="text-xs text-[#767676] hover:text-gray-800 uppercase">
                      DATE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {products.map((item) => {
        return (
          <li
            className="flex flex-col pb-6 sm:pb-10 justify-start"
            key={item.id}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  className="h-[126px] w-[94px] rounded-[4px] object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div className="w-[180px]">
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <span className="font-bold text-xs text-[#212529] hover:text-gray-800 uppercase">
                          {item.brand}
                        </span>
                      </h3>
                    </div>
                    <div className="mt-1 flex text-sm">
                      <p className="font-normal text-xs text-[#767676] capitalize hidden sm:block">
                        {item.name}
                      </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                      <p className="font-normal text-xs text-[#767676] capitalize">
                        Gift from:{" "}
                        <span className="capitalize text-[#9F7D83] font-bold">
                          username 1
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mt-2 sm:mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="">
                        <span className="-m-2 inline-flex p-2 text-[#000000] text-sm font-semibold hover:text-gray-500">
                          {item.quanity}
                        </span>
                      </div>
                      <div className="md:ml-[50px]">
                        <span className="-m-2 inline-flex p-2 text-[#000000] font-semibold text-sm hover:text-gray-500">
                          {USDollar.format(item.price * item.quanity)}
                        </span>
                      </div>

                      <div className="">
                        <span className="-m-2 inline-flex p-2 text-[#000000] font-semibold text-sm hover:text-gray-500">
                          01.11.2023
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ListProduct;
