import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import EmailOrder from "@/emails";
import { sendEmail } from "@/lib/sendgrid";
import {
  SANITY_EMAIL_TYPE,
  TYPE_EMAIL_IS_NOTIFICATION,
  TYPE_EMAIL_IS_ORDER_CONFIRMATION,
} from "@/constants";
import EmailNotification from "@/emails/email-gift-template";
import { IEmailPayload, IEmailRoot } from "@/utils/types/email";
import { getEmailTemplateHandler } from "@/utils/sanity/emailService";

export async function POST(req: Request) {
  const data: IEmailPayload = await req.json();

  try {
    if (data.type === TYPE_EMAIL_IS_ORDER_CONFIRMATION) {
      const result: IEmailRoot[] = await getEmailTemplateHandler(
        SANITY_EMAIL_TYPE.order_success
      );
      if (result.length > 0) {
        await sendEmail(
          data.email,
          result[0].title || data.subject,
          render(EmailOrder(data.products, result[0]))
        );
      } else {
        await sendEmail(
          data.email,
          data.subject,
          render(EmailOrder(data.products))
        );
      }
    } else if (data.type === TYPE_EMAIL_IS_NOTIFICATION) {
      const result = await getEmailTemplateHandler(
        SANITY_EMAIL_TYPE.notification
      );
      if (result.length > 0) {
        await sendEmail(
          data.email,
          result[0].title || data.subject,
          render(
            EmailNotification({
              name: data.name || "",
              data: data.products,
              emailContent: result[0],
            })
          )
        );
      } else {
        await sendEmail(
          data.email,
          data.subject,
          render(
            EmailNotification({ name: data.name || "", data: data.products })
          )
        );
      }
    }
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
