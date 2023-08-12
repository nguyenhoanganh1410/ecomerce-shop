import {
  TYPE_PRODUCT_METHOD_PULL,
  TYPE_PRODUCT_UPDATE_STOCK,
} from "@/constants";
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
const MESSAGE_DETAILS = "Updated stocks from Desilux, details below:";
export async function GET(req: Request) {
  try {
    var current = new Date();
    var time = new Date(current.getTime() - 5 * 60 * 1000);
    var timestamp = Math.floor(time.getTime() / 1000);

    console.log("Checking products");
    const resProduct = await syncDataProduct(COUNT, {
      updateAt: timestamp,
      type: TYPE_PRODUCT_UPDATE_STOCK,
    });
    console.log("Total new products: ", resProduct);
    console.log("CHECKED!");

    //send nofication email
    const dataEmail: IData[] = [
      {
        title: "products",
        quanity: resProduct || 0,
      },
    ];
    await sendEmail(
      process.env.NEXT_PUBLIC_EMAIL_NOTIFICATION || "",
      MESSAGE,
      render(EmailNotification({ data: dataEmail, message: MESSAGE_DETAILS }))
    );
    
    return NextResponse.json({ mess: time, data: timestamp });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error retrieving user" });
  }
}
