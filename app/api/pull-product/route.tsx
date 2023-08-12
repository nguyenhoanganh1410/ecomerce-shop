import { TYPE_PRODUCT_METHOD_PULL } from "@/constants";
import { sendEmail } from "@/lib/sendgrid";
import { syncDataBrand } from "@/utils/sync-data/brand-sync";
import { syncDataCategory } from "@/utils/sync-data/category-sync";
import { syncDataProduct } from "@/utils/sync-data/product-sync";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import EmailNotification from "@/emails/email-notification";
import { IData } from "@/utils/types/email";
const COUNT = 0;
const MESSAGE = "Notification";
export async function GET(req: Request) {
  try {
    var current = new Date();
    var time = new Date(current.getTime() - 24 * 60 * 60 * 1000);
    var timestamp = Math.floor(time.getTime() / 1000);

    console.log("Checking categories");

    const res = await syncDataCategory(COUNT, {
      createAt: timestamp,
      type: TYPE_PRODUCT_METHOD_PULL,
    });
    console.log("Total new categories: ", res);
    console.log("-----------------------------");
    console.log("Checking brands");
    const resBrand = await syncDataBrand(COUNT, {
      createAt: timestamp,
      type: TYPE_PRODUCT_METHOD_PULL,
    });
    console.log("Total new brands: ", resBrand);
    console.log("-----------------------------");
    console.log("Checking products");
    const resProduct = await syncDataProduct(COUNT, {
      createAt: timestamp,
      type: TYPE_PRODUCT_METHOD_PULL,
    });
    console.log("Total new products: ", resProduct);
    console.log("CHECKED!");

    //send nofication email
    const dataEmail: IData[] = [
      {
        title: "categories",
        quanity: res || 0,
      },
      {
        title: "brands",
        quanity: resBrand || 0,
      },
      {
        title: "products",
        quanity: resProduct || 0,
      },
    ];
    await sendEmail(
      process.env.NEXT_PUBLIC_EMAIL_NOTIFICATION || "",
      MESSAGE,
      render(EmailNotification({ data: dataEmail }))
    );

    return NextResponse.json({ mess: time, data: timestamp });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error retrieving user" });
  }
}
