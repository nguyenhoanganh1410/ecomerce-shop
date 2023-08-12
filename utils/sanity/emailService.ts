import { groq } from "next-sanity";
import { sanityClientValueNoCaching } from "./connection";

export const getEmailTemplateHandler = async (emailType: string) => {
  try {
    const query = groq`*[_type == "emailTemplate" && emailType == $emailType]`;
    const email = await sanityClientValueNoCaching.fetch(query, { emailType });
    return email;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};