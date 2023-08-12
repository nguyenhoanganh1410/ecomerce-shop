import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useMemo } from "react";
let stripePromise: Promise<Stripe | null>;

export async function stripeTokenHandler(id: string, total: number, desc?: string) {
  const paymentData = {token: id, total, desc};
  const response = await fetch('/api/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData),
  });
  return response.json();
}

export async function paymentWithCustomer(id: string, total: number, desc?: string) {
  const paymentData = {token: id, total, desc};
  const response = await fetch('/api/payment/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData),
  });
  return response.json();
}

export async function createCustomer(email: string, name?: string, description?: string) {
  const paymentData = {email, name, description};
  const response = await fetch('/api/payment/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData),
  });
  return response.json();
}

export async function addTokenWithCustomer(idCustomer: string, token: string) {
  const paymentData = {idCustomer, token};
  const response = await fetch('/api/payment/customer-source', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData),
  });
  return response.json();
}

const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export const useOptions = () => {
  const options: any = useMemo(
    () => ({
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#E01A2B",
        },
      },
    }),
    []
  );

  return options;
};

export default getStripePromise;