import { NextResponse } from "next/server";
import Stripe from "stripe";

interface ICustomer {
  email: string;
  name?: string;
  description?: string;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const data: ICustomer = await req.json();
  try {
    const customer = await stripe.customers.create({
      ...data,
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
    throw error;
  }
}