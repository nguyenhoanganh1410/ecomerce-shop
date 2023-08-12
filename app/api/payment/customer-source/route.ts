import { NextResponse } from "next/server";
import Stripe from "stripe";

interface ICustomer {
  idCustomer: string;
  token: string;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const data: ICustomer = await req.json();
  try {
    const source = await stripe.customers.createSource(
        data.idCustomer,
        {
          source: data.token,
        }
      );
    return NextResponse.json(source);
  } catch (error) {
    console.log(error);
    throw error;
  }
}