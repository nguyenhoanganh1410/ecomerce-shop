import { NextResponse } from "next/server";

// This is your test secret API key.
import Stripe from "stripe";

interface ITotal {
  total: number
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const data: ITotal = await req.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.total * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}