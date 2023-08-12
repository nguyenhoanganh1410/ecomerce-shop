import { NextResponse } from "next/server";
import Stripe from "stripe";

interface IData {
  token: string,
  total: number,
  desc?: string
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const token: IData = await req.json();
  try {
    const charge = await stripe.charges.create({
        amount: token.total * 100,
        currency: 'usd',
        description: token.desc || '',
        source: token.token,
      });
    return NextResponse.json(charge);
  } catch (error) {
    switch ((error as any).type) {
      case 'StripeCardError':
        console.log(`A payment error occurred: ${(error as any).message}`);
        return NextResponse.json({message_erro: `A payment error occurred: ${(error as any).message}`});
      case 'StripeInvalidRequestError':
        console.log('An invalid request occurred.');
        return NextResponse.json({message_erro: `An invalid request occurred.`});
      default:
        console.log('Another problem occurred, maybe unrelated to Stripe.');
        return NextResponse.json({message_erro: `Another problem occurred, maybe unrelated to Stripe.`});
    }
  }
}