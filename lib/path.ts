import { EnvMode } from "@/utils/type";

export const baseUrl =
process.env.NEXT_PUBLIC_ENV_PRODUCTION === EnvMode.production
    ? process.env.NEXT_PUBLIC_ENV_PRODUCTION_URL
    : "http://localhost:3000"

export const apiUrl = {
  getOrderByTrackiingNumberUrl: `${baseUrl}/api/order`,
  getOrderListByUserUrl: `${baseUrl}/api/order/product`,
  createOrderUrl: `/api/order`,
  getUserByIdUrl: `${baseUrl}/api/user`,
  getWishListByIdUrl: `${baseUrl}/api/wishlist`,
};

export const wisListLink = (slug: string, email?: string) => {
  if(email) {
    return `${baseUrl}/wishlist/${slug}?email=${email}&mode=sharing`
  }
  return `${baseUrl}/wishlist/${slug}?mode=sharing`
}
