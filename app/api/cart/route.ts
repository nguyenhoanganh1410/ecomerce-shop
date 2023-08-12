import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface ICart {
  id: number;
  email: string;
  idProduct: string;
  idSubProduct: string;
  quantity: number;
  giftSigma?: string;
  giftUserId?: string;
  idWishListOfGift?: string;
  giftEmail?: string;
}

export async function PUT(req: Request) {
  const cart: ICart = await req.json();
  try {
    const newEntry = await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        quantity: cart.quantity,
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error" });
  }
}

export async function POST(req: Request) {
  const cart: ICart = await req.json();
  try {
    const newEntry = await prisma.cart.create({
      data: {
        email: processEmail(cart.email),
        idProduct: cart.idProduct,
        idSubProduct: cart.idSubProduct,
        quantity: cart.quantity,
        giftSigma: cart.giftSigma || "",
        giftUserId: cart.giftUserId || "",
        idWishListOfGift: cart.idWishListOfGift || "",
        giftEmail: cart.giftEmail || "",
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error" });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const idCart = searchParams.get("id");
  if (!idCart) {
    return NextResponse.json({ notFound: "Not Found" });
  }
  try {
    const newEntry = await prisma.cart.delete({
      where: {
        id: +idCart,
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error" });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    const cart = await prisma.cart.findMany({
      where: {
        email: {
          equals: processEmail(email || "") as string,
        },
      },
    });
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: "Error retrieving cart" });
  }
}

function processEmail(email: string) {
  const processedEmail = email.replace(/\+/g, "");
  return processedEmail;
}
