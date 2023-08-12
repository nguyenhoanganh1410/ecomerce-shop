import { groq } from "next-sanity";
import { sanityClient } from "../sync-data/client-test";

export const getColorByNameHandler = async (name: string) => {
  try {
    const query = groq`*[_type == "colors" && name == $name]`;
    const result = await sanityClient.fetch(query, { name });

    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getColorsHandler = async () => {
  try {
    const query = groq`*[_type == "colors" && !(_id in path("drafts.**"))]{
      name,
      _id
    }`;
    const result = await sanityClient.fetch(query);

    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const createColorHandler = async (name: string, id: string) => {
  try {
    await sanityClient.createIfNotExists({
      _type: "colors",
      name,
      _id: id,
    });
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const deleteAllHandler = async () => {
  const collection = "colors";

  try {
    const allDocuments = await sanityClient.fetch(
      `*[_type == "${collection}"]`
    );

    for (const doc of allDocuments) {
      await sanityClient.delete(doc._id);
    }

    console.log("Done.");
  } catch (error) {
    console.error("Something with wrong:", error);
  }
};
