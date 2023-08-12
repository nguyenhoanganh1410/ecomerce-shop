import {
  CUSTOMER_ID_PARAM,
  GUEST_ID,
  MESSAGE_PAYING,
  MESSAGE_SAVE_DATA,
  MESSAGGE_ORDER_CONFIRMATION,
  TYPE_EMAIL_IS_NOTIFICATION,
  TYPE_EMAIL_IS_ORDER_CONFIRMATION,
} from "@/constants";
import { createOrderHandler } from "@/lib/order";
import { CartItem, updateCart } from "@/redux/features/cart-slice";
import { updateProductsCartInStock } from "@/redux/features/product-cart-instock";
import { deleteCart } from "@/redux/features/product-cart-slice";
import { updateToken } from "@/redux/features/token-card-slice";
import { updateTotals } from "@/redux/features/total-order-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { sendEmailConfirmOrder } from "@/utils/email";
import { handleProductsWillUpdate } from "@/utils/methods";
import { deleteAllCart } from "@/utils/sanity/cartService";
import {
  updateProductQuanityInDefault,
  updateProductVariantQuantity,
} from "@/utils/sanity/productService";
import { paymentWithCustomer, stripeTokenHandler } from "@/utils/stripe";
import {
  ICartProduct,
  IOrderLineDB,
  IOrderProductDB,
  IProductCart,
} from "@/utils/type";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const useReviewOrderHook = () => {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.order.items);
  const productCartInStock = useAppSelector(
    (state) => state.productsCartInStock.items
  );
  const totalOrder = useAppSelector((state) => state.totalOrder.total);
  const tokenCard = useAppSelector((state) => state.tokenCard.token);
  const cartRedux = useAppSelector((state) => state.cart.items);

  const [loading, setLoading] = useState<string>("");

  const { data } = useSession();
  const userEmail = data?.user?.id || data?.user?.name;
  const route = useRouter();

  const searchParamsState = useSearchParams();
  const idCustomer = searchParamsState.get(CUSTOMER_ID_PARAM);

  const handlePlaceTheOrder = async () => {
    setLoading(MESSAGE_PAYING);
    const randomIdOrder = uuidv4();
    if (idCustomer) {
      const result = await paymentWithCustomer(
        idCustomer,
        totalOrder,
        `Order Tracking Number: ${randomIdOrder}`
      );
      if (result?.message_erro) {
        toast(result.message_erro);
        setLoading("");
        return;
      }
    } else {
      const result = await stripeTokenHandler(
        tokenCard,
        totalOrder,
        `Order Tracking Number: ${randomIdOrder}`
      );
      if (result?.message_erro) {
        toast(result.message_erro);
        setLoading("");
        return;
      }
    }
    setLoading(MESSAGE_SAVE_DATA);
    const listUnique: IProductCart[] = productCartInStock.filter(
      (value: IProductCart, idx: number) => {
        return (
          idx ===
          productCartInStock.findIndex(
            (v: IProductCart) => v.giftUserId === value.giftUserId
          )
        );
      }
    );
    let orderLine: IOrderLineDB[] = [];
    for (var value of listUnique) {
      const dataList = productCartInStock.filter((item: IProductCart) => {
        return item.giftUserId === value.giftUserId;
      });
      const orderLineItem = {
        name: value.giftUserName
          ? value.giftUserName
          : orderDetails && orderDetails.address
          ? orderDetails.address.firstName + " " + orderDetails.address.lastName
          : "",
        email: value.giftUserId
          ? value.giftUserEmail
            ? value.giftUserEmail
            : ""
          : data?.user.email
          ? data?.user.email
          : "",
        phone: "",
        status: 0,
        ownerGift: value.giftUserId || "",
        addressShipping: value.giftAddress
          ? value.giftAddress
          : orderDetails?.address?.apartment +
            " " +
            orderDetails?.address?.address +
            " " +
            orderDetails?.address?.city +
            " " +
            orderDetails?.address?.state.split(",,")[0] +
            " " +
            orderDetails?.address?.country.split(",,")[0],
        deleted: false,
        productOrder: dataList.map((item: IProductCart) => {
          return {
            name: item.title,
            brand: item.brand,
            size: item.product[0].size.name,
            color: item.product[0].color || "",
            image: item.product[0].images[0].url,
            quanity: item.quantity,
            price: item.product[0].price,
          };
        }),
      };
      orderLine.push(orderLineItem);
    }
    const initData: IOrderProductDB = {
      order: {
        uid: data?.user.id || GUEST_ID,
        email: orderDetails?.contract.email || "",
        phone: orderDetails?.contract.phone || "",
        total: totalOrder,
        discount: 0,
        shippingEst: 0,
        taxes: 0,
        status: 0,
        zipCode: orderDetails?.billing.zipCode || "",
        deleted: false,
        paymentStatus: true,
        trackingNumber: randomIdOrder,
        cardNumber: orderDetails?.billing.cardNumber || "",
        expiryDate: orderDetails?.billing.expiresOn || "",
        securityCode: orderDetails?.billing.securityCode || "",
        addressBilling:
          orderDetails?.billing.apartment +
            " " +
            orderDetails?.billing.address +
            " " +
            orderDetails?.billing.city +
            " " +
            orderDetails?.billing.state.split(",,")[0] ||
          "" + " " + orderDetails?.billing.country.split(",,")[0] ||
          "",
      },
      orderLine: orderLine,
    };
    const result = await createOrderHandler(initData);

    const object = {
      type: TYPE_EMAIL_IS_ORDER_CONFIRMATION,
      email: orderDetails?.contract.email || "",
      products: productCartInStock,
      subject: MESSAGGE_ORDER_CONFIRMATION,
    };
    const resultData = await Promise.all([sendEmailConfirmOrder(object), ...transformData(productCartInStock) ])
    
    handleDeleteQuality();
    resetData();
    route.push(`/order-success/${result?.trackingNumber}`);
  };

  const handleDeleteQuality = async () => {
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
        const data: any[] = await handleProductsWillUpdate(
          idProductUnique,
          cartRedux
        );
        const promiseSecond = data
          .filter((value) => {
            return value?.status === 1;
          })
          .map((item) => {
            return updateProductVariantQuantity(
              item?.id,
              item?.firstIndex,
              item?.quality
            );
          });
        Promise.all([promiseSecond])
          .then(() => {})
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      };
      handle();
    }
  };

  const resetData = () => {
    dispatch(updateTotals(-1));
    if (typeof window !== "undefined") {
      localStorage.removeItem("guest");
    }
    dispatch(updateCart([]));
    dispatch(deleteCart([]));
    dispatch(updateProductsCartInStock([]));
    dispatch(updateToken(""));
    if (data?.user.id) {
      deleteAllCart(data?.user.id).then(() => {
        console.log("DELETED");
      });
    }
  };

  const transformData = (data: IProductCart[]) => {
    const emailList = data.filter(item => item.giftUserEmail).map(value => value.giftUserEmail);
    const emailListUnique = emailList.filter((item, idx) => {
      return idx === emailList.findIndex(value => value === item)
    })
    const result = emailListUnique.map(item => {
      const listProduct = data.filter(value => value.giftUserEmail === item)
      return {
        type: TYPE_EMAIL_IS_NOTIFICATION,
        email: item || "",
        products: listProduct,
        subject: MESSAGGE_ORDER_CONFIRMATION,
        name: listProduct[0].giftUserName
      }
    })
    return result.map(item => {
      return sendEmailConfirmOrder(item)
    })
  }

  return {
    orderDetails,
    totalOrder,
    loading,
    handlePlaceTheOrder,
  };
};

export default useReviewOrderHook;
