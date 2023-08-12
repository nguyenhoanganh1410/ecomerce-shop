import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { IOrderProductDB } from "@/utils/type";
import { getProfileHandler } from "@/lib/auth";
import { GUEST_ID } from "@/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const uid = searchParams.get("trackingNumber");
  try {
    const data = await prisma.order.findMany({
      where: {
        trackingNumber: {
          equals: uid as string,
        },
      },
      include: {
        orderLine: {
          include: {
            productOrder: true,
          },
        },
      },
    });

    if (data[0].uid !== GUEST_ID) {
      const token = req.headers.get("authorization")?.replace("Bearer ", "");
      try {
        const user = await getProfileHandler(token || "");
        if (user?.sub !== data[0].uid) {
          return NextResponse.json({ error: "Access Denied." });
        }
      } catch (error) {
        return NextResponse.json({ error: "Token invalid." });
      }
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error retrieving user" });
  }
}

export async function POST(req: Request) {
  const orderData: IOrderProductDB = await req.json();
  const { order, orderLine } = orderData;
  try {
    const newEntry = await prisma.order.create({
      data: {
        ...order,
        orderLine: {
          create: orderLine.map((line) => ({
            name: line.name,
            email: line.email,
            phone: line.phone,
            deleted: false,
            status: line.status,
            ownerGift: line.ownerGift,
            addressShipping: line.addressShipping,
            productOrder: {
              create: line.productOrder.map((item) => ({
                name: item.name,
                brand: item.brand,
                size: item.size,
                color: item.color,
                image: item.image,
                quanity: item.quanity,
                price: item.price,
              })),
            },
          })),
        },
      },
      include: {
        orderLine: {
          include: {
            productOrder: true,
          },
        },
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error" });
  }
}
