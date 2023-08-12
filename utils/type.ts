export interface IOption {
  id: number | string;
  name: string;
  inStock?: boolean;
  price?: { discount?: number; normal?: number };
  stock?: number;
}
export interface ICheckBox {
  value: string;
  label: string;
  checked: boolean;
  parentSlug?: string
}

export interface IFilter {
  id: number;
  name: string;
  subFilter: ISubFilter[];
}

export interface ISubFilter {
  id: string;
  name: string;
  options: ICheckBox[];
}

export interface IPropsLogo {
  color: string;
}

export interface IResultDataProduct {
  total: number;
  data: IProductResponse[];
  dataTotal: IProductResponse[];
}

export interface IBrand {
  name: string;
  _id: string;
}

export interface IProductResponse {
  sku: string;
  _createdAt: Date;
  _id: string;
  _updatedAt: Date;
  images: Image[];
  _type: string;
  title: string;
  category: any;
  brand: IBrand;
  slug: Slug;
  _rev: string;
  defaultProductVariant: IProductVariantNew;
  variants: IProductVariantNew[];
  best?: boolean;
  NewstArrivals?: boolean;
  featured?: boolean;
  description?: string;
}

export interface IProduct {
  sku: string;
  _createdAt: Date;
  _id: string;
  _updatedAt: Date;
  images: Image[];
  _type: string;
  title: string;
  category: any;
  brand: IBrand;
  slug: Slug;
  _rev: string;
  defaultProductVariant: IProductVariant;
  variants: IProductVariant[];
  best?: boolean;
  NewstArrivals?: boolean;
  featured?: boolean;
  description?: string;
}

export interface IProductVariantNew {
  colorProduct: IRootColor;
  images: Image[];
  variants: IVariant[];
  _key?: string;
}

export interface IVariant {
  price: number;
  stock: number;
  _key: string;
  size: ISize;
  discountPrice: number;
}

export interface IProductVariant {
  price: number;
  stock: number;
  colorProduct: IRootColor[];
  images: Image[];
  size: ISize;
  discountPrice: number;
  _key?: string;
}

export interface ISize {
  name: string;
  _id: string;
  _ref?: string;
}
export interface Brand {
  _ref: string;
  _type: string;
  _key?: string;
}

export interface Image {
  url: string;
}

export interface Slug {
  current: string;
  _type: string;
}

export interface IBrand {
  _type: string;
  name: string;
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
}

export interface IOptions {
  id?: string;
  label: string;
  value: string;
  checked: boolean;
}

export interface IPriceMinMax {
  maxPrice: number;
  minPrice: number;
}

export interface IFilterSearch {
  options: IOptions[];
  id: string;
  name: string;
  searchInput: boolean;
}

export interface IRootColor {
  _createdAt?: string;
  _rev?: string;
  _type?: string;
  name: string;
  _id?: string;
  _updatedAt?: string;
  color: Color;
}

export interface Color {
  _type: string;
  hex: string;
  hsv: Hsv;
  rgb: Rgb;
  hsl: Hsl;
  alpha: number;
}

export interface Hsv {
  v: number;
  _type: string;
  h: number;
  a: number;
  s: number;
}

export interface Rgb {
  b: number;
  r: number;
  g: number;
  _type: string;
  a: number;
}

export interface Hsl {
  _type: string;
  h: number;
  l: number;
  a: number;
  s: number;
}

export interface IRootCategory {
  _rev: string;
  title: string;
  image?: Image;
  _createdAt: string;
  _type: string;
  _id: string;
  _updatedAt: string;
  slug: Slug;
}

export interface Parent {
  _ref: string;
  _type: string;
  _key: string;
}

// export interface Image {
//   _type: string;
//   asset: Asset;
// }

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Slug {
  current: string;
  _type: string;
}

export interface IQueryParamsOption {
  brand: string[];
  color: string[];
  price: string[];
  size?: string[];
}
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
  params: { slug: string };
  searchParams: ISearchParams;
}
export interface IQueryParamsStringOption {
  brand: string;
  color: string;
  price: string;
}
export interface IColorPicker {
  name: string;
  bgColor: string;
  selectedColor: string;
  default: boolean;
  images?: any;
}

export interface IProductCart {
  product: IProductVariantCart[];
  id: number;
  title: string;
  brand: string;
  slug: string;
  quantity: number;
  giftSigma?: string;
  giftUserId?: string;
  idWishListOfGift?: string;
  giftAddress?: string;
  giftUserName?: string;
  giftUserEmail?: string;
}
export interface IProductVariantCart {
  price: number;
  stock: number;
  colorProduct?: IRootColor[];
  images: IImage[];
  size: ISize;
  discountPrice: number | undefined;
  valid?: boolean;
  validWithGift?: boolean;
  color?: string;
}

interface IImage {
  url: string;
}
export interface ICartProduct {
  id: number;
  email?: string;
  idProduct: string;
  idSubProduct: string;
  quantity: number;
  giftSigma?: string;
  giftUserId?: string;
  idWishListOfGift?: string;
  giftEmail?: string;
}
export interface Iuser {
  id?: number;
  uid: string;
  avatarUrl?: string;
  backgroundImageUrl?: string;
  firstName?: string;
  lastName?: string;
  sigmaUserName?: string;
  message?: string;
  onlyFansUrl?: string;
  titokUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  deleted: boolean;
  stripe_cus_id?: string;
  shippingAddress?: IShippingAddress[];
  Billing?: IBilling[];
}

export interface IShippingAddress {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  deleted: boolean;
  authorId: number;
}

export interface IBilling {
  id?: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiresOn: string;
  securityCode: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  deleted: boolean;
  authorId: number;
}

export interface ICountry {
  name: string;
  isoCode: string;
  phoneCode?: string;
  currency?: string;
  flag?: string;
  latitude?: string;
  longitude?: string;
  countryCode?: string;
  timezones?: any;
}

export interface IOauth {
  grant_type: string;
  username?: string;
  password?: string;
  client_id: string;
  client_secret: string;
  audience?: string;
}

export interface IUserAuth0 {
  blocked?: boolean;
  email_verified?: boolean;
  email?: string;
  phone_number?: string;
  phone_verified?: false;
  user_metadata?: {};
  app_metadata?: {};
  given_name?: string;
  family_name?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  verify_email?: boolean;
  verify_phone_number?: boolean;
  password?: string;
  connection?: string;
  client_id?: string;
  username?: string;
}

export interface IOrderDB {
  id?: number;
  trackingNumber: string;
  uid: string;
  email: string;
  phone: string;
  total: number;
  discount: number;
  shippingEst: number;
  taxes: number;
  status: number;
  paymentStatus: boolean;
  addressBilling: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  zipCode: string;
  deleted: boolean;
}

export interface IOrderProductDB {
  order: IOrderDB;
  orderLine: IOrderLineDB[];
}

export interface IProductDB {
  id?: number;
  name: string;
  brand: string;
  size: string;
  color: string;
  image: string;
  quanity: number;
  price: number;
  orderLineId?: number;
}

export interface IOrderProductResult {
  id?: number;
  trackingNumber: string;
  uid: string;
  total: number;
  discount: number;
  shippingEst: number;
  taxes: number;
  status: number;
  paymentStatus: boolean;
  addressBilling: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  zipCode: string;
  deleted: boolean;
  orderLine: IOrderLineDB[];
}

export interface IOrderLineDB {
  id?: number;
  status: number;
  name: string;
  email: string;
  phone: string;
  addressShipping: string;
  ownerGift: string;
  deleted: boolean;
  productOrder: IProductDB[]
}

export interface IProductWishList {
  product: IProductVariantCart[];
  id: number;
  title: string;
  brand: string;
  slug: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  idProduct?: string;
  idSubProduct?: string;
}

export interface IWishListProduct {
  id: number;
  uid: string;
  idProduct: string;
  idSubProduct: string;
}

export enum ApiMethod {
  POST = "post",
  PUT = "put",
  GET = "get",
  DELETE = "delete",
}

export interface APIHeaders {
  "Content-Type": string;
  Authorization?: string;
}

export interface APIConfig {
  method: ApiMethod;
  url: string;
  headers: APIHeaders;
}

export enum EnvMode {
  production = "production",
  development = "development",
  staging = "staging",
}

export interface IObject {
  [key: string]: any
}

export interface ITextBlock {
  id: string,
  title?: string,
  content: string
}
export interface IPolicyContent {
  title?: string,
  sub_title?: string,
  text?: string,
  data?: ITextBlock[],
  dataTextBlock?: ITextBlock[]
}

export interface ISelect {
  id: number,
  href: string,
  name: string,
  image?: string
}