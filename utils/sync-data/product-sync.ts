import axios from "axios";
import { sanityClient } from "./client-test";
import { schema } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { stringToSlug } from "./convertToSlug";
import PQueue from "p-queue";
import { IPullObject } from "./brand-sync";
import { TYPE_PRODUCT_UPDATE_STOCK } from "@/constants";

interface Image {
  mediumUrl: string;
}
interface ImageObject {
  value: Image[];
  id: string;
  name: string;
}

interface Size {
  id: number;
  size: string;
  stock: number;
}
export interface ICatalogResponse {
  images: Image[];
  id: string;
  name: string;
  brand: number;
  category: number;
  description: string;
  colors: string[];
  sizes: Size[];
  msrpUS: number;
}

const getDataProduct = async (startingAfter: number, type?: IPullObject) => {
  try {
    let url;
    let token: string = "";
    if (process.env.NEXT_TOKEN_DESILUX) {
      token = process.env.NEXT_TOKEN_DESILUX.replace(/\$/g, "$");
    }
    if (type) {
      if (type.type === TYPE_PRODUCT_UPDATE_STOCK) {
        url =
          process.env.NEXT_API_DESILUX +
          `/b2b/catalog?startingAfter=${startingAfter}&limit=8&updatedAt[gte]=${type.updateAt}`;
      } else {
        url =
          process.env.NEXT_API_DESILUX +
          `/b2b/catalog?startingAfter=${startingAfter}&inStock=true&limit=8&createdAt[gte]=${type.createAt}`;
      }
    } else {
      url =
        process.env.NEXT_API_DESILUX +
        `/b2b/catalog?startingAfter=${startingAfter}&inStock=true&limit=8`;
    }
    console.log(url)
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

const queue = new PQueue({
  concurrency: 1,
  intervalCap: 1,
  interval: 1000,
});

let listError: string[] = [];
let count = 0;
export const syncDataProduct = async (number: number, type?: IPullObject) => {
  try {
    console.log("Product id:" + number);
    let response;
    if (type) {
      response = await getDataProduct(number, type);
    } else {
      response = await getDataProduct(number);
    }
    const { data, hasMore } = response;
    count += data?.length;
    console.log("has more:", hasMore);

    try {
      const listColor =
        data.map((item: ICatalogResponse) => {
          return item.colors;
        }) || [];

      const listSize =
        data.map((item: ICatalogResponse) => {
          return item.sizes;
        }) || [];

      const listImages =
        data.map((item: ICatalogResponse) => {
          return {
            id: item.id.toString(),
            value: item.images,
            name: item.name,
          };
        }) || [];

      const resImages = listImages.map((val: ImageObject) => {
        return transformImages(val);
      });
      const dataColors = transformColors(listColor.flat());
      const dataSizes = transformSizes(listSize.flat());
      const dataImages = await Promise.all(resImages);
      const dataImagesFlat = dataImages?.flat() || [];
      await saveData([...dataColors, ...dataSizes, ...dataImagesFlat]);

      const dataProducts = transformProduct(data);

      queue.add(() => saveData(dataProducts));
      console.log("🦄");
    } catch (error) {
      console.log("all erro: ", error);
      listError.push(...data.map((item: any) => item.id));
      console.log("List Error: ", listError);
      //await delay(1000);
    }

    if (hasMore) {
      if (type) {
        await syncDataProduct(data[data.length - 1].id, type);
      } else {
        await syncDataProduct(data[data.length - 1].id);
      }
    } else {
      console.log("FINISHED!");
    }
    return count;
  } catch (error) {
    console.error("Something with wrong:", error);
  }
};

const convertUrlImage = async (url: string) => {
  try {
    const image = await axios.get(url, { responseType: "arraybuffer" });
    const dataBufer = Buffer.from(image.data, "binary");
    const result = await sanityClient.assets.upload("image", dataBufer);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const saveData = async (mutations: any) => {
  try {
    const data = await fetch(
      `https://qh2wu8cw.api.sanity.io/v2021-06-07/data/mutate/production`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer skX1vGMVYe2d51xzXVwKd9Vh7n3EL0VC8MrfTvUI8e3yMZ48qodXQniEuXSlmRUmCBlDa3XqODXVVQ32wQbi9t4kLJPDC4OgOIq8BwMh1AWokNSbx1S0jjJ6iFK2newuNJ2bJ0DfiMb5WvY9BarUSxEb8zCH4iZYZ9wdb6QNYPYDqqlpUjSc`,
        },
        body: JSON.stringify({
          mutations,
        }),
      }
    );
    // const res = await data.json();
    // console.log(res);
    console.log("done!!!");
  } catch (error) {
    console.log("error sizes: ", error);
  }
};

const transformColors = (item: string[]) => {
  const data = item.map((value) => {
    return {
      createIfNotExists: {
        _type: schema.color,
        name: value,
        _id: "color" + "_" + stringToSlug(value),
      },
    };
  });
  return data;
};

const transformSizes = (item: Size[]) => {
  const listSizePromise = item.map((value: Size) => {
    return {
      createIfNotExists: {
        _type: schema.size,
        name: value.size,
        _id: schema.size + "_" + stringToSlug(value.size),
      },
    };
  });
  return listSizePromise;
};

const transformImages = async (item: ImageObject) => {
  if (item.value.length > 2) {
    const listTemplate = item.value.slice(0, 3);
    const listImagesTest = listTemplate.map((image: Image, idx: number) => {
      return convertUrlImage(image.mediumUrl);
    });
    try {
      const dataTemplate = await Promise.all(listImagesTest);
      const images = dataTemplate.map((value, idx) => {
        return {
          createIfNotExists: {
            _type: schema.image,
            _id: "image" + "_" + item.id.toString() + "_" + idx,
            name: item.name,
            images: {
              _type: "image",
              asset: {
                _type: schema.reference,
                _ref: value?._id,
              },
            },
          },
        };
      });
      return images;
    } catch (error) {
      console.log("save images error", error);
    }
  } else {
    const listImagesTest = item.value.map((image, idx) => {
      return convertUrlImage(image.mediumUrl);
    });
    try {
      const dataTemplate = await Promise.all(listImagesTest);
      const images = dataTemplate.map((value, idx) => {
        return {
          createIfNotExists: {
            _type: schema.image,
            _id: "image" + "_" + item.id.toString() + "_" + idx,
            name: item.name,
            images: {
              _type: "image",
              asset: {
                _type: schema.reference,
                _ref: value?._id,
              },
            },
          },
        };
      });
      return images;
    } catch (error) {
      console.log("save images error", error);
    }
  }
};

const transformProduct = (data: ICatalogResponse[]) => {
  const promiseList = data.map((item) => {
    const listImage = item.images.map((value, idx) => {
      if (idx > 2) return null;
      return {
        _type: schema.reference,
        _ref: "image" + "_" + item.id.toString() + "_" + idx,
        _key: uuidv4(),
      };
    });

    const listVariant = item.sizes.map((value) => {
      return {
        _type: schema.varient,
        _key: uuidv4(),
        price: item.msrpUS / 100,
        stock: value.stock,
        size: {
          _type: schema.reference,
          _ref: schema.size + "_" + stringToSlug(value.size),
        },
      };
    });

    const list = item.colors.map((val) => {
      return {
        _type: schema.reference,
        _key: uuidv4(),
        _ref: "color" + "_" + stringToSlug(val),
      };
    });

    return {
      createOrReplace: {
        _type: schema.product,
        _id: "product" + "_" + item.id.toString(),
        title: item.name,
        images: listImage.filter((item) => item != null),
        slug: {
          _type: schema.slug,
          current: stringToSlug(item.name) + "-" + item.id,
        },
        brand: {
          _type: schema.reference,
          _ref: item.brand.toString(),
        },
        category: item.category
          ? [
              {
                _type: schema.reference,
                _key: uuidv4(),
                _ref: schema.category + "_" + item.category.toString(),
              },
            ]
          : [],
        description: item.description || "",
        color: list,
        variants: listVariant,
      },
    };
  });

  return promiseList;
};
