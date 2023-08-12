import axios from "axios";
import { sanityClient, saveData } from "./client-test";
import { schema } from "./schema";

export interface IBrandResponse {
  name: string;
  id: string;
}
export interface IPullObject {
  createAt?: number;
  updateAt?: number;
  type: string;
}
const getDataBrand = async (startingAfter: number, type?: IPullObject) => {
  try {
    let url;
    let token: string = "";
    if (process.env.NEXT_TOKEN_DESILUX) {
      token = process.env.NEXT_TOKEN_DESILUX.replace(/\$/g, "$");
    }
    if (type) {
      url =
        process.env.NEXT_API_DESILUX +
        `/b2b/brands?startingAfter=${startingAfter}&limit=10&createdAt[gte]=${type.createAt}`;
    } else {
      url =
        process.env.NEXT_API_DESILUX +
        `/b2b/brands?startingAfter=${startingAfter}&limit=10`;
    }

    const options = {
      method: "GET",
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(options);

    return response.data;
  } catch (error) {
    console.error("Something with wrong:", error);
  }
};
let count = 0;
export const syncDataBrand = async (number: number, type?: IPullObject) => {
  try {
    console.log("Sync page:" + number);

    let response;
    if (type) {
      response = await getDataBrand(number, type);
    } else {
      response = await getDataBrand(number);
    }
    const { data, hasMore } = response;
    count += data?.length;
    console.log("has more:", +hasMore);

    const promiseList = data.map((item: IBrandResponse) => {
      return {
        createIfNotExists: {
          _type: schema.brand,
          _id: item.id.toString(),
          name: item.name,
        },
      };
    });
    const result = await saveData(promiseList);
    if (hasMore) {
      if (type) {
        await syncDataBrand(data[data.length - 1].id, type);
      } else {
        await syncDataBrand(data[data.length - 1].id);
      }
    }
    return count;
  } catch (error) {
    console.error("Something with wrong:", error);
  }
};
