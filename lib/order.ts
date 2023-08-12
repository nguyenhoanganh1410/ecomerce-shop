import { IOrderProductDB } from "@/utils/type";
import { apiUrl } from "./path";

export const createOrderHandler = async (dataOrder: IOrderProductDB) => {
  try {
    const res = await fetch(`${apiUrl.createOrderUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOrder),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrderByTrackingNumberHandler = async (
  trackingNumber: string,
  token?: string
) => {
  if (token) {
    const res = await fetch(
      `${apiUrl.getOrderByTrackiingNumberUrl}?trackingNumber=${trackingNumber}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(
      `${apiUrl.getOrderByTrackiingNumberUrl}?trackingNumber=${trackingNumber}`
    );
    const data = await res.json();
    return data;
  }
};

export const getOrderListByUser = async (uid: string, token: string) => {
  const res = await fetch(`${apiUrl.getOrderListByUserUrl}?uid=${uid}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
