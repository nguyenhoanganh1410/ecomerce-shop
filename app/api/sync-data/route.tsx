import { SANITY_EMAIL_TYPE } from "@/constants";
import { sendEmail } from "@/lib/sendgrid";
import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByNameHandler,
  getDataCategories,
  getcategory,
} from "@/utils/sanity/categoryService";
import { getEmailTemplateHandler } from "@/utils/sanity/emailService";
import { getProductHandler } from "@/utils/sanity/productService";
import { syncDataBrand } from "@/utils/sync-data/brand-sync";
import { syncDataCategory } from "@/utils/sync-data/category-sync";
import { syncDataProduct } from "@/utils/sync-data/product-sync";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import EmailNotification from "@/emails/email-notification";
import { IData } from "@/utils/types/email";
const COUNT = 341214;
const MESSAGE = "Notification";
const MESSAGE_DETAILS = "Updated products.";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    if(uid !== "11111111") return NextResponse.json({ mess: "error" });
    // syncDataProduct(COUNT);
    //const data = await getcategory();
    //const data = await getCategoryByIdHandler("category_2631")
    // const data = await getCategoryByNameHandler("BEAUTY_LIFESTYLE")
    // return NextResponse.json({ data, total: data.length });
    const count = await syncDataProduct(COUNT);
    //send nofication email
    const dataEmail: IData[] = [
      {
        title: "products",
        quanity: count || 0,
      },
    ];
    await sendEmail(
      process.env.NEXT_PUBLIC_EMAIL_NOTIFICATION || "",
      MESSAGE,
      render(EmailNotification({ data: dataEmail, message: MESSAGE_DETAILS }))
    );
    // const data = await getEmailTemplateHandler(SANITY_EMAIL_TYPE.order_success);
    return NextResponse.json({ count });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error retrieving user" });
  }
}
