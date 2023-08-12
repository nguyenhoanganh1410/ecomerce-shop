import { IPriceMinMax } from "@/utils/type";

export interface IProductQuery {
  page: number;
  pageSize: number;
  brands?: string[];
  color?: string[];
  pathType: string;
  dataPrices?: IPriceMinMax[] | [];
  sortParam?: string;
  keySearch?: string;
  subCategoryIdList?: { _id: string }[];
  subCategoryParams?: string[];
  sizeParams?: string[];
}

export interface IProductRoot {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  brand: BrandValid;
  category: CategoryValid[];
  color?: Color[];
  description: string;
  images: Image[];
  slug: Slug;
  title: string;
  variants: Variant[];
  featured?: boolean;
  best?: boolean;
  NewestArrivals?: boolean;
}

export interface Brand {
  _ref: string;
  _type: string;
}

export interface BrandValid {
  _id: string;
  name: string;
}

export interface CategoryValid {
  _id: string;
  title: string;
}
export interface Category {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Color {
  _key?: string;
  _ref?: string;
  _type?: string;
  name?: string;
}
export interface Image {
  url: string;
}
export interface Slug {
  _type: string;
  current: string;
}

export interface Variant {
  _key: string;
  _type: string;
  price: number;
  size: SizeValid;
  stock: number;
  discountPrice?: number
}

export interface SizeValid {
  _id: string;
  name: string;
}

export interface Size {
  _ref: string;
  _type: string;
}

export interface IResponsiveProduct {
  total: number;
  data: IProductRoot[];
}
