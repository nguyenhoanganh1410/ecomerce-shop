import { prisma } from "@/utils/prisma";
import { IBilling } from "@/utils/type";
import { NextResponse } from "next/server";

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const idBilling = searchParams.get("uid");
//   if (!idBilling) {
//     return NextResponse.json({ notFound: "Not Found" });
//   }
//   try {
//     const newEntry = await prisma.billing.update({
//       where: {
//         id: +idBilling,
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
    const newEntry = await prisma.billing.deleteMany()
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}

export async function PUT(req: Request) {
  const data: IBilling = await req.json();
  try {
    const newEntry = await prisma.billing.update({
      where: {
        id: data.id,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        cardNumber: data.cardNumber,
        expiresOn: data.expiresOn,
        securityCode: data.securityCode,
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

export async function POST(req: Request) {
  const data: IBilling = await req.json();
  try {
    const newEntry = await prisma.billing.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        cardNumber: data.cardNumber,
        expiresOn: data.expiresOn,
        securityCode: data.securityCode,
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
