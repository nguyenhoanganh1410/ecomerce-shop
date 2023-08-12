import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface IWishList {
  id: number,
  uid: string;
  idProduct: string;
  idSubProduct: string;
}

export async function POST(req: Request) {
  const cart: IWishList = await req.json();
  try {
    const newEntry = await prisma.wishlist.create({
      data: {
        uid : cart.uid,
        idProduct: cart.idProduct,
        idSubProduct: cart.idSubProduct,
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
  if(!idCart) {
    return NextResponse.json({ error: "Not Found" });
  }
  try {
    const newEntry = await prisma.wishlist.delete({
      where: {
        id: +idCart
      }
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error" });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  const idWishList = searchParams.get("id");

  if(uid) {
    try {
      const cart = await prisma.wishlist.findMany({
        where: {
          uid: {
            equals: uid as string,
          },
        }
      });
      return NextResponse.json(cart);
    } catch (error) {
      return NextResponse.json({ error: "Error retrieving wishlist" });
    }
  } else if(idWishList) {
    try {
      const cart = await prisma.wishlist.findMany({
        where: {
          id: {
            equals: +idWishList
          },
        }
      });
      return NextResponse.json(cart);
    } catch (error) {
      return NextResponse.json({ error: "Error retrieving wishlist" });
    }
  }
}