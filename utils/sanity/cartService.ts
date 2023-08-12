import { getDataByIdWishList } from "@/lib/wishlist";
import { CartItem } from "@/redux/features/cart-slice";
import { IWishList } from "@/redux/features/wishlist-slice";
import { ICartProduct } from "../type";

export const getCartByUser = async (id: string) => {
  const res = await fetch(`/api/cart?email=${id}`);
  const data = await res.json();
  return data;
};

export const updateProductInCart = async (product: ICartProduct) => {
  const res = await fetch(`/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};

export const deleteProductInCart = async (id: number) => {
  const res = await fetch(`/api/cart?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const createCart = async (product: ICartProduct) => {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};

export const deleteAllCart = async (id: string) => {
  const res = await fetch(`/api/cart/owner?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const getAndHandleProduct = async (id: string) => {
  const res = await fetch(`/api/cart?email=${id}`);
  const data = await res.json();

  const listIdWishlist = data.filter((item: CartItem) => {
    return item.idWishListOfGift
  })

  const listPromise = listIdWishlist.map( (value: CartItem) => getDataByIdWishList(value.idWishListOfGift || ""))
  const dataWishList = await Promise.all(listPromise)
  const invalidProduct = listIdWishlist.filter( (item: CartItem) => {
    return dataWishList.flat().findIndex( (value: IWishList) => {
      return item.idWishListOfGift && +item.idWishListOfGift === value.id
    }) === -1;
  }) || []

  if(invalidProduct.length === 0) {
    return data;
  }
  const deleteResult = await Promise.all(invalidProduct.map( (value: CartItem) => {
    return deleteProductInCart(value.id)
  }))
  const responsive = await fetch(`/api/cart?email=${id}`);
  const dataResponsive = await responsive.json();
  return dataResponsive;
};