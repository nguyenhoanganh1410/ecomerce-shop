import { IEmailPayload } from "./types/email";

export const sendEmailConfirmOrder = async (data?: IEmailPayload) => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await res.json();
  } catch (err) {
    console.log("Something went wrong: ", err);
  }
};