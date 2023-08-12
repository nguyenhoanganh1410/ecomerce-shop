import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { Iuser } from "@/utils/type";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  try {
    const user = await prisma.user.findMany({
      where: {
        uid: {
          equals: uid as string,
        },
      },
      include: {
        Billing: true,
        shippingAddress: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error retrieving user" });
  }
}

export async function POST(req: Request) {
  const user: Iuser = await req.json();

  try {
    const userExits = await prisma.user.findFirst({
      where: {
        sigmaUserName: {
          equals: user.sigmaUserName?.toLowerCase() as string,
        },
        deleted: false,
      },
    });

    if (userExits && user?.sigmaUserName) {
      let error_message = {
        status: "error",
        message: "Sigma Username is already exists.",
      };
      return new NextResponse(JSON.stringify(error_message), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
    const newEntry = await prisma.user.create({
      data: {
        uid: user.uid,
        avatarUrl: user.avatarUrl || "",
        backgroundImageUrl: user.backgroundImageUrl || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        sigmaUserName: user.sigmaUserName || "",
        message: user.message || "",
        onlyFansUrl: user.onlyFansUrl || "",
        titokUrl: user.titokUrl || "",
        instagramUrl: user.onlyFansUrl || "",
        twitterUrl: user.twitterUrl || "",
        stripe_cus_id: user.stripe_cus_id || "",
        deleted: false,
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}

export async function PUT(req: Request) {
  const user: Iuser = await req.json();
  try {
    const userExits = await prisma.user.findFirst({
      where: {
        sigmaUserName: {
          equals: user.sigmaUserName?.toLowerCase() as string,
        },
        deleted: false,
      },
    });
    if (userExits && userExits.uid !== user.uid && user.sigmaUserName) {
      let error_message = {
        status: "error",
        message: "Sigma Username is already exists.",
      };
      return new NextResponse(JSON.stringify(error_message), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
    const newEntry = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        uid: user.uid,
        avatarUrl: user.avatarUrl || "",
        backgroundImageUrl: user.backgroundImageUrl || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        sigmaUserName: user.sigmaUserName || "",
        message: user.message || "",
        onlyFansUrl: user.onlyFansUrl || "",
        titokUrl: user.titokUrl || "",
        instagramUrl: user.instagramUrl || "",
        twitterUrl: user.twitterUrl || "",
        deleted: user.deleted || false,
        stripe_cus_id: user.stripe_cus_id || "",
      },
    });
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}

export async function DELETE(req: Request) {
  try {
    const newEntry = await prisma.user.deleteMany();
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Request error", error);
    throw error;
  }
}

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const idCart = searchParams.get("id");
//   if (!idCart) {
//     return NextResponse.json({ notFound: "Not Found" });
//   }
//   try {
//     const newEntry = await prisma.user.delete({
//       where: {
//         id: +idCart,
//       },
//     });
//     return NextResponse.json(newEntry);
//   } catch (error) {
//     console.error("Request error", error);
//     return NextResponse.json({ error: "Error" });
//   }
// }
