export interface ISearchParams {
  type: string;
  page: number;
  limit: number;
  color: string;
  brand: string;
  price: string;
  sort: string;
  text: string;
  id?: string;
  subCategory?: string;
  size?: string;
}
export interface IPropsParams {
  params: ISlug;
  searchParams: ISearchParams;
}

export interface ISlug {
  slug: string;
}
