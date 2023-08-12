import { IWishListProduct } from "@/utils/type";
import { apiUrl } from "./path";

export const getWishlistByUser = async (id: string) => {
  const res = await fetch(`${apiUrl.getWishListByIdUrl}?uid=${id}`, { cache: 'no-store' });
  const data = await res.json();
  return data;
};

export const getDataByIdWishList = async (id: string) => {
  const res = await fetch(`${apiUrl.getWishListByIdUrl}?id=${id}`, { cache: 'no-store' });
  const data = await res.json();
  return data;
};

export const updateProductInWishList = async (product: IWishListProduct) => {
  const res = await fetch(`/api/wishlist`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};

export const deleteProductInWishList = async (id: number) => {
  const res = await fetch(`/api/wishlist?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const createWishList = async (product: IWishListProduct) => {
  const res = await fetch(`/api/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};