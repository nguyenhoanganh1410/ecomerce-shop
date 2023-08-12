import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface ICart {
  id: number,
  email: string;
  idProduct: string;
  idSubProduct: string;
  quantity: number;
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const idCart = searchParams.get("id");
  if(!idCart) {
    return NextResponse.json({ notFound: "Not Found" });
  }
  try {
    const newEntry = await prisma.cart.deleteMany({
      where: {
        email: idCart as string
      }
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error
  }
}