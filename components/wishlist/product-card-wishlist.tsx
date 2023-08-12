"use client";
import {
  addedToCart,
  bagIsFull,
  faildAlert,
  limitCart,
  defaultVarientId,
  errorQuality,
} from "@/constants";
import { CartItem, updateCart } from "@/redux/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { USDollar } from "@/utils/dollarFomat";
import { createCart, updateProductInCart } from "@/utils/sanity/cartService";
import { ICartProduct, IProductWishList } from "@/utils/type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import DeleteItemButton from "./delete-card-button";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
interface IProps {
  product: IProductWishList;
  isSharingMode?: boolean;
  slug?: string;
  sigmaName?: string;
  giftEmail?: string;
}
const CardProductWishList = ({
  product,
  isSharingMode,
  slug,
  sigmaName,
  giftEmail,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistRedux = useAppSelector((state) => state.wishlist.items);
  const cartRedux = useAppSelector((state) => state.cart.items);
  const productCart = useAppSelector((state) => state.productsCart.items);

  const { data } = useSession();
  const userEmail = data?.user?.id || data?.user?.name;
  const addedToCartStatus = cartRedux.findIndex(
    (item) =>
      item.idProduct === product.idProduct &&
      item.idSubProduct === product.idSubProduct &&
      (item.giftUserId === decodeURIComponent(slug || "") ||
        (data?.user.id === decodeURIComponent(slug || "") &&
          item.giftUserId == ""))
  );

  const handleAddToCart = async () => {
    if (loading) return;
    setLoading(true);
    const productQuanity = cartRedux
      .filter(
        (item) =>
          item.idProduct === product.idProduct &&
          item.idSubProduct === product.idSubProduct
      )
      .reduce((sum: number, item: CartItem) => {
        return (sum += item.quantity);
      }, 0);

    if (product.product[0].stock < productQuanity + 1) {
      toast(errorQuality);
      setLoading(false);
      return;
    }

    const productPayload: ICartProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      idProduct: product.idProduct || "",
      email: userEmail || "",
      idSubProduct: product.idSubProduct || defaultVarientId,
      quantity: 1,
      giftUserId:
        slug && data?.user.id !== decodeURIComponent(slug) && isSharingMode
          ? decodeURIComponent(slug)
          : "",
      idWishListOfGift:
        data?.user.id !== slug && isSharingMode ? product.id.toString() : "",
      giftSigma:
        slug && data?.user.id !== decodeURIComponent(slug) && isSharingMode
          ? sigmaName
          : "",
      giftEmail: giftEmail ? decodeURIComponent(giftEmail) : "",
    };
    const foundObject = cartRedux.findIndex(
      (obj) =>
        obj.idProduct === productPayload.idProduct &&
        obj.giftUserId === productPayload.giftUserId
    );
    if (foundObject === -1) {
      if (productCart.length === limitCart) {
        toast(bagIsFull);
        return;
      }
      if (userEmail) {
        try {
          const res: any = await createCart(productPayload);
          toast(addedToCart);
          dispatch(updateCart([...cartRedux, res]));
        } catch (error) {
          toast(faildAlert);
        } finally {
          setLoading(false);
        }
      } else {
        if (typeof window !== "undefined") {
          const cartLocal: ICartProduct[] = JSON.parse(
            localStorage.getItem("guest") || "[]"
          );
          cartLocal.push(productPayload);
          localStorage.setItem("guest", JSON.stringify(cartLocal));
          toast(addedToCart);
          dispatch(updateCart(cartLocal));
        }
        setLoading(false);
      }
    } else {
      const index = cartRedux.findIndex(
        (obj) =>
          obj.idProduct === productPayload.idProduct &&
          obj.idSubProduct === productPayload.idSubProduct &&
          obj.giftUserId === productPayload.giftUserId
      );
      if (index != -1) {
        const newCart = cartRedux.map((val, idx) => {
          if (idx === index) {
            return {
              ...val,
              quantity: val.quantity + productPayload.quantity,
            };
          }
          return val;
        });
        if (!userEmail) {
          if (typeof window !== "undefined") {
            localStorage.setItem("guest", JSON.stringify(newCart));
          }
          dispatch(updateCart(newCart));
          toast(addedToCart);
          setLoading(false);
        } else {
          const newProduct: ICartProduct = {
            ...cartRedux[index],
            quantity: cartRedux[index].quantity + productPayload.quantity,
          };
          updateProductInCart(newProduct)
            .then(() => {
              toast(addedToCart);
              dispatch(updateCart(newCart));
              setLoading(false);
            })
            .catch(() => {
              toast(faildAlert);
              setLoading(false);
            });
        }
      } else {
        if (productCart.length === limitCart) {
          toast(bagIsFull);
          return;
        }
        if (userEmail) {
          try {
            const res: any = await createCart(productPayload);
            toast(addedToCart);
            dispatch(updateCart([...cartRedux, res]));
          } catch (error) {
            toast(faildAlert);
          } finally {
            setLoading(false);
          }
        } else {
          if (typeof window !== "undefined") {
            const cartLocal: ICartProduct[] = JSON.parse(
              localStorage.getItem("guest") || "[]"
            );
            cartLocal.push(productPayload);
            localStorage.setItem("guest", JSON.stringify(cartLocal));
            toast(addedToCart);
            dispatch(updateCart(cartLocal));
          }
          setLoading(false);
        }
      }
    }
  };

  return (
    <div key={product.id} className="group text-sm">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white xl:h-[380px]">
        <Link href={`product/${product.slug}`} className="z-[2] cursor-pointer">
          <Image
            src={product.product[0].images[0].url}
            fill
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </Link>
        <div className="absolute top-0 flex justify-between w-full align-center p-4">
          <div className="flex flex-col">
            {/* {product.product[0].discountPrice ? (
              <div className="w-[47px] h-[20px] z-[3] bg-textColor flex justify-center items-center rounded ml-[-8px]">
                <span className="text-[11px] font-bold text-[#FFFFFF]">
                  Deal
                </span>
              </div>
            ) : null} */}
            {product.product[0].stock < 1 ? (
              <div className="w-[60px] h-[20px] z-[3] bg-[#F24C3D] flex justify-center items-center rounded ml-[-8px] mt-2">
                <span className="text-[11px] font-bold text-[#FFFFFF]">
                  Sold Out
                </span>
              </div>
            ) : null}
          </div>
          {!isSharingMode ? <DeleteItemButton id={product.id} /> : null}
        </div>
        {product.product[0].stock < 1 ? (
          <div className="absolute bottom-0 flex justify-between w-full align-center">
            <div className="w-full absolute h-[40px] z-[3] bottom-0 bg-textColor flex justify-center items-center rounded opacity-75">
              <span className="text-[11px] font-bold text-[#FFFFFF]">
                Item Unavailable
              </span>
            </div>
          </div>
        ) : (
          <>
            {addedToCartStatus !== -1 ? (
              <div className="absolute bottom-0 flex justify-between w-full align-center">
                <div
                  onClick={handleAddToCart}
                  className="w-full absolute h-[40px] z-[3] bottom-0 cursor-pointer bg-[#75C2F6] flex justify-center items-center rounded opacity-75"
                >
                  <span className="text-[11px] font-bold text-[#FFFFFF]">
                    {loading ? "Loading..." : "Added To Cart"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-0 flex justify-between w-full align-center">
                <div
                  onClick={handleAddToCart}
                  className="w-full absolute z-[3] h-[40px] bottom-0 cursor-pointer bg-textColor flex justify-center items-center rounded opacity-75 hover:opacity-100"
                >
                  <span className="text-[11px] font-bold text-[#FFFFFF]">
                    {loading ? "Loading..." : "Add To Cart"}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <h3 className="mt-4 font-bold capitalize text-xs text-[#212529]">
        {product.brand.length > 60
          ? product.brand.substring(0, 60).toLowerCase() + "..."
          : product.brand.toLowerCase()}
      </h3>
      <Link
        href={`product/${product.slug}`}
        className="mt-2 font-normal capitalize text-sm text-[#212529] hover:text-blue-400 cursor-pointer"
      >
        {product.title.length > 60
          ? product.title.substring(0, 60).toLowerCase() + "..."
          : product.title.toLowerCase()}
      </Link>
      <></>
      <p className="mt-2">
        {product.product[0].color ? (
          <span className="mt-4 font-bold capitalize text-xs text-[#212529]">
            Color: {product.product[0].color?.toString()} -
          </span>
        ) : null}
        <span className="mt-4 ml-1 font-bold capitalize text-xs text-[#212529]">
          Size: {product.product[0].size.name}
        </span>
      </p>

      <p className="mt-2 font-bold capitalize text-xs text-[#212529]">
        {USDollar.format(
          product.product[0].discountPrice
            ? product.product[0].discountPrice
            : product.product[0].price
        )}
      </p>
    </div>
  );
};

export default CardProductWishList;
