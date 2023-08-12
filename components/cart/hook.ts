import { useSession } from "next-auth/react";
import { useState, useEffect, useTransition } from "react";
import {
  ICartProduct,
  IProductCart,
  IWishListProduct,
} from "@/utils/type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CartItem, updateCart } from "@/redux/features/cart-slice";
import {
  deleteProductInCart,
  updateProductInCart,
} from "@/utils/sanity/cartService";
import { checkCartInValid, handleProducts } from "@/utils/methods";
import { updateTotals } from "@/redux/features/total-order-slice";
import { toast } from "react-toastify";
import {
  errorQuality,
  MESSAGE_ADD_TO_WISHLIST,
  MESSAGE_EXITS_IN_WISHLIST,
  MESSAGE_REQUIED_LOGIN,
  SOMETHING_WITH_WRONG,
} from "@/constants";
import { updateProducts } from "@/redux/features/product-cart-slice";
import { useRouter } from "next/navigation";
import { updateProductsCartInStock } from "@/redux/features/product-cart-instock";
import { updateWishlist } from "@/redux/features/wishlist-slice";
import { createWishList } from "@/lib/wishlist";

const useCartHook = () => {
  const { data, status } = useSession();
  const userEmail = data?.user?.id || data?.user?.name;

  const [listProduct, setListProduct] = useState<IProductCart[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [loadding, setLoadding] = useState<boolean>(false);
  const [loadingGoToCheckout, setLoadingGoToCheckout] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const cartRedux = useAppSelector((state) => state.cart.items);
  const productCart = useAppSelector((state) => state.productsCart.items);
  const totalorder = useAppSelector((state) => state.totalOrder.total);
  const wishlistRedux = useAppSelector((state) => state.wishlist.items);
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const productCartInStock = useAppSelector(
    (state) => state.productsCartInStock.items
  );
  const disableButton =
    listProduct.length === 0 || !checkCartInValid(listProduct) ? true : false;

  const handleRemove = async (product: IProductCart) => {
    if (loadding) return;
    setLoadding(true);
    setTimeout(() => {
      setLoadding(false);
    }, 1000);
    const newCartRedux = cartRedux.filter((item) => {
      return item.id !== product.id;
    });
    const newCart = listProduct.filter((item) => {
      return item.id !== product.id;
    });
    setListProduct(newCart);
    if (typeof window !== "undefined" && !userEmail) {
      localStorage.setItem(userEmail || "guest", JSON.stringify(newCartRedux));
    }
    dispatch(updateCart(newCartRedux));
    dispatch(updateProducts(newCart));
    try {
      if (userEmail) {
        const result = await deleteProductInCart(product.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePluss = async (product: IProductCart) => {
    if (loadding) return;
    if (product.product[0].stock < product.quantity + 1) {
      toast(errorQuality);
      return;
    }
    setLoadding(true);
    setTimeout(() => {
      setLoadding(false);
    }, 2000);
    const newCart = listProduct.map((value) => {
      if (value.id === product.id) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      }
      return value;
    });
    const newCartRedux = cartRedux.map((value) => {
      if (value.id === product.id) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      }
      return value;
    });
    setListProduct(newCart);
    if (typeof window !== "undefined" && !userEmail) {
      localStorage.setItem(userEmail || "guest", JSON.stringify(newCartRedux));
    }

    if (userEmail) {
      const data = cartRedux.filter((value) => value.id === product.id);
      try {
        const result = await updateProductInCart({
          ...data[0],
          quantity: data[0].quantity + 1,
        });
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateCart(newCartRedux));
  };

  const handleDress = async (product: IProductCart) => {
    if (loadding) return;
    setLoadding(true);
    setTimeout(() => {
      setLoadding(false);
    }, 2000);
    if (product.quantity === 1) return;
    const newCart = listProduct.map((value) => {
      if (value.id === product.id) {
        return {
          ...value,
          quantity: value.quantity - 1,
        };
      }
      return value;
    });
    const newCartRedux = cartRedux.map((value) => {
      if (value.id === product.id) {
        return {
          ...value,
          quantity: value.quantity - 1,
        };
      }
      return value;
    });
    setListProduct(newCart);
    if (typeof window !== "undefined") {
      localStorage.setItem(userEmail || "guest", JSON.stringify(newCartRedux));
    }

    if (userEmail) {
      const data = cartRedux.filter((value) => value.id === product.id);
      try {
        const result = await updateProductInCart({
          ...data[0],
          quantity: data[0].quantity - 1,
        });
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateCart(newCartRedux));
  };

  const handleChange = (quality: number) => {};
  const handleGoToCheckout = async () => {
    setLoadingGoToCheckout(true);

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
        const dataInStock = data.filter((value) => {
          return value.product[0].valid;
        });
        dispatch(updateProductsCartInStock(dataInStock));
      };
      handle();
    }
    route.push("/checkout");
  };

  const handleMoveToWishList = async (product: IProductCart) => {
    if (status === "unauthenticated") {
      toast(MESSAGE_REQUIED_LOGIN);
      return;
    }

    const dataCart = cartRedux.filter((item) => {
      return item.id === product.id;
    });

    const productPayload: IWishListProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      idProduct: dataCart[0].idProduct,
      uid: userEmail || "",
      idSubProduct: dataCart[0].idSubProduct,
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
        route.refresh();
      });
    }
  };

  useEffect(() => {
    const total = listProduct
      .filter((value) => {
        return value.product[0].valid;
      })
      .reduce((item: number, value: IProductCart) => {
        let price = 0;
        if (value.product[0].discountPrice) {
          price = value.product[0].discountPrice;
        } else {
          price = value.product[0].price;
        }
        return (item += value.quantity * price);
      }, 0);
    setTotalMoney(total);
    dispatch(updateTotals(total));
  }, [listProduct]);

  useEffect(() => {
    productCart.length > 0 && setListProduct(productCart);
  }, [productCart]);

  return {
    handleChange,
    handleDress,
    handlePluss,
    handleRemove,
    handleGoToCheckout,
    handleMoveToWishList,
    listProduct,
    totalMoney,
    status,
    loadingGoToCheckout,
    disableButton,
    loadding,
  };
};
export default useCartHook;
