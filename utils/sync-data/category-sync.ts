import axios from "axios";
import { saveData } from "./client-test";
import { stringToSlug } from "./convertToSlug";
import { schema } from "./schema";
import { IPullObject } from "./brand-sync";
import { TYPE_PRODUCT_METHOD_PULL } from "@/constants";

export interface ICategoryResponse {
  name: string;
  id: string;
  parentId: number;
}

const getDataCategory = async (startingAfter: number, type?: IPullObject) => {
  try {
    let url;
    let token: string = "";
    if (process.env.NEXT_TOKEN_DESILUX) {
      token = process.env.NEXT_TOKEN_DESILUX.replace(/\$/g, "$");
    }
    if (type) {
      url =
        process.env.NEXT_API_DESILUX +
        `/b2b/categories?startingAfter=${startingAfter}&limit=10&createdAt[gte]=${type.createAt}`;
    } else {
      url =
        process.env.NEXT_API_DESILUX +
        `/b2b/categories?startingAfter=${startingAfter}&limit=10`;
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
export const syncDataCategory = async (number: number, type?: IPullObject) => {
  try {
    let response;
    if (type) {
      response = await getDataCategory(number, type);
    } else {
      response = await getDataCategory(number);
    }
    const { data, hasMore } = response;
    count += data?.length;
    const promiseList = data.map((item: ICategoryResponse) => {
      return {
        createIfNotExists: {
          _type: schema.category,
          _id: schema.category + "_" + item.id.toString(),
          title: item.name,
          slug: {
            _type: schema.slug,
            current: stringToSlug(item.name + "-" + Math.random()),
          },
        },
      };
    });

    const result = await saveData(promiseList);
    if (hasMore) {
      if (type) {
        await syncDataCategory(data[data.length - 1].id, type);
      } else {
        await syncDataCategory(data[data.length - 1].id);
      }
    } else {
      var current = new Date();
      var time = new Date(current.getTime() - 24 * 60 * 60 * 1000);
      var timestamp = Math.floor(time.getTime() / 1000);
      await syncDataCategoryHasParentId(0, {
        createAt: timestamp,
        type: TYPE_PRODUCT_METHOD_PULL,
      });
    }

    return count;
  } catch (error) {
    console.error("Something with wrong:", error);
  }
};

export const syncDataCategoryHasParentId = async (
  number: number,
  type?: IPullObject
) => {
  try {
    console.log("Synchronizing the list of category has parent id");
    let response;
    if (type) {
      response = await getDataCategory(number, type);
    } else {
      response = await getDataCategory(number);
    }
    const { data, hasMore } = response;

    const promiseList = data.map((item: ICategoryResponse) => {
      if (item.parentId) {
        return {
          createOrReplace: {
            _type: schema.category,
            _id: schema.category + "_" + item.id.toString(),
            title: item.name,
            slug: {
              _type: schema.slug,
              current: stringToSlug(item.name + "-" + Math.random()),
            },
            parents: {
              _ref: schema.category + "_" + item.parentId.toString(),
              _type: schema.reference,
            },
          },
        };
      }
      return null;
    });
    const result = await saveData(
      promiseList.filter((item: any) => item != null)
    );
    if (hasMore) {
      if (type) {
        await syncDataCategoryHasParentId(data[data.length - 1].id, type);
      } else {
        await syncDataCategoryHasParentId(data[data.length - 1].id);
      }
    } else {
      console.log("Categories done!");
    }
  } catch (error) {
    console.error("Something with wrong:", error);
  }
};
