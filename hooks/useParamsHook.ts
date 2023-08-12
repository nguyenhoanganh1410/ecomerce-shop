import { ISearchParams } from "@/utils/type";
interface IProps {
  searchParams: ISearchParams;
  params?: { slug: string };
}

const useParamsHook = ({ searchParams, params }: IProps) => {
  const brandsParams = searchParams.brand?.split(",") || [];
  const colorParams = searchParams.color?.split(",") || [];
  const priceParams = searchParams.price?.split(",") || [];
  const sizeParams = searchParams.size?.split(",") || [];
  const subCategory = searchParams.subCategory?.split(",").filter((item) => item != "") || [];
  const typeParam = searchParams.type;
  const sortParam = searchParams.sort;
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 12;
  const keySearch = searchParams.text
    ? decodeURIComponent(searchParams.text)
    : "";
  
  return {
    brandsParams,
    colorParams,
    priceParams,
    sizeParams,
    sortParam,
    keySearch,
    typeParam,
    page,
    limit,
    subCategory,
  };
};

export default useParamsHook;
