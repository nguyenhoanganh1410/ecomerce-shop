import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { IShippingAddress } from "@/utils/type";
import { prisma } from "@/utils/prisma";

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const idSippingAddress = searchParams.get("uid");
//   if (!idSippingAddress) {
//     return NextResponse.json({ notFound: "Not Found" });
//   }
//   try {
//     const newEntry = await prisma.shippingAddress.update({
//       where: {
//         id: +idSippingAddress,
//       },
//       data: {
//         deleted: true,
//       },
//     });
//     return NextResponse.json(newEntry);
//   } catch (error) {
//     console.error("Request error", error);
//     return NextResponse.json({ error: "Error" });
//   }
// }


export async function DELETE(req: Request) {
  try {
    const newEntry = await prisma.shippingAddress.deleteMany()
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}

export async function PUT(req: Request) {
  const data: IShippingAddress = await req.json();
  try {
    const newEntry = await prisma.shippingAddress.update({
      where: {
        id: data.id,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        apartment: data.apartment,
        city: data.city,
        country: data.country,
        state: data.state,
        zipCode: data.zipCode,
        deleted: false,
        authorId: data.authorId,
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}

export async function POST(req: Request) {
  const data: IShippingAddress = await req.json();
  try {
    const newEntry = await prisma.shippingAddress.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        apartment: data.apartment,
        city: data.city,
        country: data.country,
        state: data.state,
        zipCode: data.zipCode,
        deleted: false,
        authorId: data.authorId,
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error" });
  }
}
