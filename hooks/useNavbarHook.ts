"use client";
import { AuthenticatedString, unAuthenticated } from "@/constants";
import { limitCart } from "./../constants/index";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CartItem, updateCart } from "@/redux/features/cart-slice";
import {
  ICartProduct,
  IProductCart,
} from "@/utils/type";
import {
  createCart,
  getAndHandleProduct,
  getCartByUser,
  updateProductInCart,
} from "@/utils/sanity/cartService";
import { handleProducts } from "@/utils/methods";
import { updateProducts } from "@/redux/features/product-cart-slice";
import { getWishlistByUser } from "@/lib/wishlist";
import { updateWishlist } from "@/redux/features/wishlist-slice";
import { golobalUrl } from "@/utils/globalUrl";

const useNavbarHook = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status, data } = useSession();
  const authenticated = status === "authenticated";
  const pathname = usePathname() === "/";
  const isAboutPage = usePathname().includes(golobalUrl.about);
  const [searchQuery, setSearchQuery] = useState("&page=1&limit=12");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const userEmail = data?.user?.id || data?.user?.name;
  const dispatch = useAppDispatch();
  const cartRedux = useAppSelector((state) => state.cart.items);
  const wishlistRedux = useAppSelector((state) => state.wishlist.items);
  const productCart = useAppSelector((state) => state.productsCart.items);
  const handleShowSearch = () => {
    setShowSearch(true);
  };

  useEffect(() => {
    if (userEmail && status === AuthenticatedString) {
      Promise.all([
        getAndHandleProduct(userEmail),
        getWishlistByUser(userEmail),
      ]).then((values) => {
        dispatch(updateCart(values[0]));
        dispatch(updateWishlist(values[1]));
      });
    } else if (!userEmail && status === unAuthenticated) {
      const cart: CartItem[] = JSON.parse(
        localStorage.getItem(userEmail || "guest") || "[]"
      );

      dispatch(updateCart(cart));
    }
  }, [userEmail, status]);

  //Synchronize products without logging in.
  useEffect(() => {
    if (productCart.length > 0 && userEmail) {
      const cartGuest: CartItem[] = JSON.parse(
        localStorage.getItem("guest") || "[]"
      );
      if (cartGuest.length > 0) {
        let count = -1;
        const listPromise = cartGuest.map((item) => {
          const foundObject = cartRedux.findIndex(
            (obj: CartItem) => obj.idProduct === item.idProduct
          );
          if (
            count === limitCart - productCart.length - 1 &&
            count != -1 &&
            foundObject === -1
          ) {
            return null;
          }

          if (foundObject === -1) {
            count++;
            return createCart({
              ...item,
              email: userEmail,
            });
          } else {
            const indexProductWillAdd = cartRedux.findIndex(
              (value: CartItem) => {
                return (
                  value.idProduct === item.idProduct &&
                  value.idSubProduct === item.idSubProduct
                );
              }
            );
            if (
              count === limitCart - productCart.length - 1 &&
              count != -1 &&
              indexProductWillAdd === -1
            ) {
              return null;
            }
            if (indexProductWillAdd === -1) {
              count++;
              return createCart({
                ...item,
                email: userEmail,
              });
            } else {
              return updateProductInCart({
                ...item,
                email: userEmail,
                quantity:
                  item.quantity + cartRedux[indexProductWillAdd]?.quantity,
                id: cartRedux[indexProductWillAdd]?.id,
              });
            }
          }
        });

        localStorage.removeItem("guest");
        Promise.all([...listPromise.filter((item) => item !== null)]).then(
          (values) => {
            getCartByUser(userEmail).then((cart) => {
              dispatch(updateCart(cart));
            });
          }
        );
      }
    }
  }, [productCart]);

  useEffect(() => {
    let cart: CartItem[] = [];
    if (userEmail) {
      cart = [...cartRedux];
    } else {
      cart = JSON.parse(localStorage.getItem(userEmail || "guest") || "[]");
    }

    const idProductUnique = cart
      .filter((value: ICartProduct, idx: number) => {
        return (
          idx ===
          cart.findIndex((v: ICartProduct) => v.idProduct === value.idProduct)
        );
      })
      .map((val) => {
        return val.idProduct;
      });
    if (idProductUnique.length > 0) {
      const handle = async () => {
        const data: IProductCart[] = await handleProducts(
          idProductUnique,
          cartRedux
        );
        dispatch(updateProducts(data));
      };
      handle();
    }
  }, [cartRedux]);

  const handleLogin = () => {
    signIn("auth0");
  };
  return {
    setMobileMenuOpen,
    setShowSearch,
    handleShowSearch,
    handleLogin,
    wishlistRedux,
    mobileMenuOpen,
    authenticated,
    pathname,
    searchQuery,
    showSearch,
    productCart,
    isAboutPage,
    cartRedux,
  };
};

export default useNavbarHook;
