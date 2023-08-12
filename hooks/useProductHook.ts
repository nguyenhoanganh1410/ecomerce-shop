import {
  MESSAGE_ADD_TO_WISHLIST,
  MESSAGE_EXITS_IN_WISHLIST,
  SOMETHING_WITH_WRONG,
  addedToCart,
  bagIsFull,
  defaultVarientId,
  errorQuality,
  faildAlert,
  inValidNumber,
  limitCart,
  MESSAGE_PICK_SIZE,
  MESSAGE_REQUIED_LOGIN,
} from "@/constants";
import {
  ICartProduct,
  IColorPicker,
  IOption,
  IProductResponse,
  IProductVariantNew,
  IWishListProduct,
} from "@/utils/type";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CartItem, updateCart } from "@/redux/features/cart-slice";
import { createCart, updateProductInCart } from "@/utils/sanity/cartService";
import { createWishList } from "@/lib/wishlist";
import { updateWishlist } from "@/redux/features/wishlist-slice";
import { useRouter } from "next/navigation";
import { IProductRoot } from "@/utils/types/product";

export const useProductHook = (
  dataProduct: IProductRoot,
  slug: string,
  searchParams: { color?: string }
) => {
  const { data, status } = useSession();
  const userEmail = data?.user?.id || data?.user?.name;

  const [labelSize, setLabelSize] = useState<string>("Select a size");
  const [labelQuality, setLabelQuality] = useState<string>("###");
  const [sizes, setSizes] = useState<IOption[]>([]);
  const [productSizePicked, setProductSizePick] = useState<IOption>();
  const [quality, setQuality] = useState<IOption>();
  const [active, setActive] = useState<boolean>(true);
  const [cart, setCart] = useState<ICartProduct[]>([]);
  const [loadding, setLoadding] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const cartRedux = useAppSelector((state) => state.cart.items);
  const productCart = useAppSelector((state) => state.productsCart.items);
  const wishlistRedux = useAppSelector((state) => state.wishlist.items);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!active) return;
    setActive(false);
    setLoadding(true);
    setTimeout(() => {
      setActive(true);
    }, 2200);
    if (
      !productSizePicked ||
      !quality?.name ||
      +quality.name <= 0 ||
      !quality.name.match(/^[0-9]+$/)
    ) {
      toast(inValidNumber);
      setLoadding(false);
      return;
    }
    if (
      productSizePicked?.stock &&
      quality?.name &&
      productSizePicked?.stock < +quality?.name
    ) {
      toast(errorQuality);
      setLoadding(false);
      return;
    }


    const product = dataProduct.variants.filter((variant) => {
      return variant.size._id === productSizePicked.id;
    });

    const productPayload: ICartProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      idProduct: dataProduct._id,
      email: userEmail || "",
      idSubProduct: product[0]._key || defaultVarientId,
      quantity: +quality.name,
      giftUserId: "",
      idWishListOfGift: "",
      giftSigma: "",
    };

    const productQuanity = cartRedux
      .filter(
        (item) =>
          item.idProduct === productPayload.idProduct &&
          item.idSubProduct === productPayload.idSubProduct
      )
      .reduce((sum: number, item: CartItem) => {
        return (sum += item.quantity);
      }, 0);

    if (
      productSizePicked.stock &&
      productSizePicked.stock < productQuanity + productPayload.quantity
    ) {
      toast(errorQuality);
      setLoadding(false);
      return;
    }

    const foundObject = cartRedux.findIndex(
      (obj) =>
        obj.idProduct === productPayload.idProduct &&
        obj.giftUserId === productPayload.giftUserId &&
        obj.giftUserId === productPayload.giftUserId
    );
    if (foundObject === -1) {
      if (productCart.length === limitCart) {
        toast(bagIsFull);
        setLoadding(false);
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
          setLoadding(false);
        }
      } else {
        cart.push(productPayload);
        if (typeof window !== "undefined") {
          localStorage.setItem(userEmail || "guest", JSON.stringify(cart));
        }
        toast(addedToCart);
        dispatch(updateCart(cart));
        setLoadding(false);
      }
    } else {
      const index = cartRedux.findIndex(
        (obj) =>
          obj.idProduct === productPayload.idProduct &&
          obj.idSubProduct === productPayload.idSubProduct &&
          obj.giftUserId === productPayload.giftUserId
      );
      if (index != -1) {
        let overStock = false;
        let resetQuantity = false;
        const newCart = cartRedux.map((val, idx) => {
          if (idx === index && productSizePicked.stock) {
            if (val.quantity > productSizePicked.stock) {
              resetQuantity = true;
              return {
                ...val,
                quantity: productPayload.quantity,
              };
            } else if (
              val.quantity + productPayload.quantity >
              productSizePicked.stock
            ) {
              overStock = true;
            }
            return {
              ...val,
              quantity: val.quantity + productPayload.quantity,
            };
          }
          return val;
        });

        if (overStock) {
          toast(errorQuality);
          setLoadding(false);
          return;
        }
        if (!userEmail) {
          if (typeof window !== "undefined") {
            localStorage.setItem("guest", JSON.stringify(newCart));
          }
          dispatch(updateCart(newCart));
          toast(addedToCart);
          setLoadding(false);
        } else {
          const newProduct: ICartProduct = {
            ...cartRedux[index],
            quantity: resetQuantity
              ? productPayload.quantity
              : cartRedux[index].quantity + productPayload.quantity,
          };
          updateProductInCart(newProduct)
            .then(() => {
              toast(addedToCart);
              dispatch(updateCart(newCart));
            })
            .catch(() => {
              toast(faildAlert);
            })
            .finally(() => {
              setLoadding(false);
            });
        }
      } else {
        if (productCart.length === limitCart) {
          toast(bagIsFull);
          setLoadding(false);
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
            setLoadding(false);
          }
        } else {
          cart.push(productPayload);
          if (typeof window !== "undefined") {
            localStorage.setItem(userEmail || "guest", JSON.stringify(cart));
          }
          dispatch(updateCart(cart));
          toast(addedToCart);
          setLoadding(false);
        }
      }
    }
  };

  const handleAddtoWishlist = async () => {
    if (status === "unauthenticated") {
      toast(MESSAGE_REQUIED_LOGIN);
      return;
    }
    if (!productSizePicked) {
      toast(MESSAGE_PICK_SIZE);
      return;
    }

    const product = dataProduct.variants.filter((variant) => {
      return variant.size._id === productSizePicked.id;
    });

    const productPayload: IWishListProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      idProduct: dataProduct._id,
      uid: userEmail || "",
      idSubProduct: product[0]._key || defaultVarientId,
    };

    const foundObject = wishlistRedux.findIndex(
      (obj) =>
        obj.idProduct === productPayload.idProduct &&
        obj.idSubProduct === productPayload.idSubProduct
    );

    if (foundObject !== -1) {
      toast(MESSAGE_EXITS_IN_WISHLIST);
      return;
    } else {
      startTransition(async () => {
        const res: any = await createWishList(productPayload);
        if (res?.error) {
          toast(SOMETHING_WITH_WRONG);
          return;
        }
        toast(MESSAGE_ADD_TO_WISHLIST);
        dispatch(updateWishlist([...wishlistRedux, res]));
        router.refresh();
      });
    }
  };




  useEffect(() => {
    const cartLocal: ICartProduct[] = JSON.parse(
      localStorage.getItem("guest") || "[]"
    );
    setCart(cartLocal);
  }, []);

  return {
    sizes,
    labelSize,
    labelQuality,
    productSizePicked,
    loadding,
    handleAddtoWishlist,
    setLabelSize,
    setLabelQuality,
    setProductSizePick,
    setQuality,
    handleAddToCart,
  };
};
