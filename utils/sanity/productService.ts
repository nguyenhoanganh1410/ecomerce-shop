import { sanityClient, sanityClientNoCaching } from "@/utils/sanity/client";
import { groq } from "next-sanity";
import { IBrand, IPriceMinMax, IRootColor } from "../type";
import { documents, shop } from "@/constants";
import { sanityClientValue, sanityClientValueNoCaching } from "./connection";
import { schema } from "./schema";
import { IProductQuery } from "../types/product";

export const fetchDataProducts = async (
  page: number,
  pageSize: number,
  categoryName: string,
  brands: string[],
  color: string[],
  pathType: string,
  dataPrices: IPriceMinMax[] | [],
  sortParam: string,
  keySearch?: string,
  subCategoryIdList?: string[],
  subCategoryParams?: string[],
  sizeParams?: string[]
) => {
  try {
    let string = "";
    let orderString = " order(lower(title) asc)";

    if (keySearch && keySearch.length > 0) {
      string += ` && title match "*${keySearch}*"`;
    }

    if (brands.length > 0) {
      string += " && brand._ref in $brands";
    }

    if (color.length > 0) {
      string +=
        " && (defaultProductVariant.colorProduct._ref in $color || variants[0].colorProduct._ref in $color || variants[1].colorProduct._ref in $color || variants[2].colorProduct._ref in $color || variants[3].colorProduct._ref in $color || variants[4].colorProduct._ref in $color)";
    }
    if (sizeParams && sizeParams.length > 0) {
      string +=
        " && (defaultProductVariant.variants[0].size._ref in $sizeParams || defaultProductVariant.variants[1].size._ref in $sizeParams || defaultProductVariant.variants[2].size._ref in $sizeParams || defaultProductVariant.variants[3].size._ref in $sizeParams || defaultProductVariant.variants[4].size._ref in $sizeParams)";
    }

    if (pathType !== shop && categoryName) {
      const queryTemplate = " $categoryName in category[]._ref";
      if (
        subCategoryIdList &&
        subCategoryIdList.length > 0 &&
        subCategoryParams &&
        subCategoryParams?.length === 0
      ) {
        const strQuery = subCategoryIdList.map((item: string) => {
          return `"${item}" in subCategory[]._ref ||`;
        });
        string += ` && (${strQuery.join(" ") + queryTemplate})`;
      }

      if (subCategoryParams && subCategoryParams.length > 0) {
        const strQuery = subCategoryParams.map((item: string, idx: number) => {
          if (idx === subCategoryParams.length - 1) {
            return `"${item}" in subCategory[]._ref`;
          }
          return `"${item}" in subCategory[]._ref ||`;
        });
        string += ` && (${strQuery.join(" ")}) ${"&&" + queryTemplate}`;
      }
    }

    if (
      pathType === shop &&
      subCategoryParams &&
      subCategoryParams.length > 0
    ) {
      const strQuery = subCategoryParams.map((item: string, idx: number) => {
        if (idx === subCategoryParams.length - 1) {
          return `"${item}" in subCategory[]._ref`;
        }
        return `"${item}" in subCategory[]._ref ||`;
      });
      string += ` && (${strQuery.join(" ")})`;
    }

    if (dataPrices.length > 0) {
      const data = dataPrices.map((item: IPriceMinMax) => {
        if (item.minPrice === 5000) {
          return `defaultProductVariant.variants[0].price >= ${item.minPrice}`;
        }
        return `defaultProductVariant.variants[0].price >= ${item.minPrice} && defaultProductVariant.variants[0].price <= ${item.maxPrice}`;
      });
      string += ` && (${data.toString().replace(/,/g, " || ")})`;
    }

    if (sortParam === "1") {
      orderString += " | order(defaultProductVariant.variants[0].price asc)";
    } else if (sortParam === "2") {
      orderString += " | order(defaultProductVariant.variants[0].price desc)";
    } else if (sortParam === "4") {
      string += " && best==true";
    } else if (sortParam === "3") {
      string += " && NewestArrivals==true";
    } else if (sortParam === "5") {
      string += " && featured==true";
    }

    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) ${
      string || ""
    }] | ${orderString}[${(page - 1) * pageSize}...${page * pageSize}]{
        ...,
        'images': images[]->{
          'url': images.asset->url
        },
        defaultProductVariant{
          ...,
          images[] -> {
            'url': images.asset->url
          },
          colorProduct->{
            ...
          }
        },
        variants[]{
          ...,
          colorProduct->{
            ...
          }
        },
    }`;

    const params = {
      color,
      brands,
      categoryName: categoryName || "",
      sizeParams,
    };

    const queryCount = groq`*[_type == "product" && !(_id in path("drafts.**")) ${
      string || ""
    }] | ${orderString} {
      ...,
      'images': images[]->{
        'url': images.asset->url
      },
      brand->{
        name,
        _id
      },
      defaultProductVariant{
        ...,
        images[] -> {
          'url': images.asset->url
        },
        colorProduct->{
          ...
        }
      },
      variants[]{
        ...,
        images[] -> {
          'url': images.asset->url
        },
        colorProduct->{
          ...
        }
      },
    }`;

    return Promise.all([
      sanityClient.fetch(query, params),
      sanityClient.fetch(queryCount, params),
    ]).then((values) => {
      return {
        total: values[1]?.length || 0,
        data: values[0],
        dataTotal: values[1],
      };
    });
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const fetchData = async (dataType: string) => {
  try {
    const query = `*[_type == "${dataType}"]`;
    const result = await sanityClient.fetch(query);
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
  }
};

export const fetchDataAndSort = async (
  dataType: string,
  sortByField: string,
  dataParams?: string[]
) => {
  try {
    let orderString = ` order(lower(${sortByField}) asc)`;
    const query = groq`*[_type == "${dataType}" && !(_id in path("drafts.**"))] | ${orderString}`;
    const result = await sanityClient.fetch(query);

    if (dataType === documents.brand) {
      const options = result.map((brand: IBrand) => {
        const idx = dataParams?.findIndex((name) => brand._id === name);
        if (idx !== -1) {
          return { value: brand._id, label: brand.name, checked: true };
        }
        return { value: brand._id, label: brand.name, checked: false };
      });
      return options;
    } else if (dataType === documents.color) {
      const options = result.map((item: IRootColor) => {
        const idx = dataParams?.findIndex((name) => item._id === name);
        if (idx !== -1) {
          return {
            value: item?.color?.hex,
            label: item.name,
            checked: true,
            id: item._id,
          };
        }
        return {
          value: item?.color?.hex,
          label: item.name,
          checked: false,
          id: item._id,
        };
      });
      return options;
    } else if (dataType === documents.size) {
      const options = result.map((brand: IBrand) => {
        const idx = dataParams?.findIndex((name) => brand._id === name);
        if (idx !== -1) {
          return { value: brand._id, label: brand.name, checked: true };
        }
        return { value: brand._id, label: brand.name, checked: false };
      });
      return options;
    }
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
  }
};

export const getCategoryByName = async (categoryName: string) => {
  try {
    const query = groq`*[_type == "category" && !(_id in path("drafts.**")) && title == $categoryName]`;
    const result = await sanityClient.fetch(query, { categoryName });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getCategoryWithParent = async () => {
  try {
    const query = groq`*[_type == "category" && !(_id in path("drafts.**")) && defined(parents) ]{
      ...,
      'parents': parents[]->{
        _id,
        title
      },
    }`;
    const result = await sanityClient.fetch(query);
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getCategoryWithIdParent = async (idParent: string) => {
  try {
    let string = " && $idParent in parents[]._ref";
    if (idParent != "") {
      string += "";
    }
    const query = groq`*[_type == "subCategory" && !(_id in path("drafts.**")) && defined(parents) ${
      string || ""
    }]{
      ...,
      'parents': parents[]->{
        _id,
        title
      },
    }`;
    const result = await sanityClient.fetch(query, { idParent });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getDataSubCategory = async () => {
  try {
    const query = groq`*[_type == "subCategory" && !(_id in path("drafts.**")) && defined(parents) ]{
      ...,
      'parents': parents[]->{
        _id,
        title,
        slug
      },
    }`;
    const result = await sanityClient.fetch(query);
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getSubCategoryByName = async (title: string) => {
  try {
    const query = groq`*[_type == "subCategory" && !(_id in path("drafts.**")) && title == $title]`;
    const result = await sanityClient.fetch(query, { title });

    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getSubCategoryBySlug = async (slug: string) => {
  try {
    const query = groq`*[_type == "category" && !(_id in path("drafts.**")) && slug.current == $slug]`;
    const result = await sanityClient.fetch(query, { slug });

    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const featchProductByTextSearch = async (keySearch?: string) => {
  try {
    let string = "";
    let orderString = " order(lower(title) asc)";

    if (keySearch && keySearch.length > 0) {
      string += ` && title match "*${keySearch}*"`;
    }

    const queryCount = groq`*[_type == "product" && !(_id in path("drafts.**")) ${
      string || ""
    }] | ${orderString} {
      ...,
      'images': images[]->{
        'url': images.asset->url
      },
      brand->{
        name,
        _id
      },
      defaultProductVariant{
        ...,
        size -> {
          name,
          _id
        },
        images[] -> {
          'url': images.asset->url
        },
        colorProduct[]->{
          ...
        }
      },
      variants[]{
        ...,
        size -> {
          name,
          _id
        },
        images[] -> {
          'url': images.asset->url
        },
        colorProduct[]->{
          name,
          color
        }
      },
    }`;
    const result = await sanityClient.fetch(queryCount);
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const fetchProduct = async (slug: string) => {
  try {
    const query = groq`*[_type == "product" && !(_id in path("drafts.**"))  && slug.current == $slug]{
      ...,
      brand->{
        name,
        _id
      },
      'category': category[]->{
        title,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      variants[]{
        ...,
        images[] -> {
          'url': images.asset->url
        },
        colorProduct->{
          name,
          color
        },
        variants[]{
          ...,
          size -> {
            name,
            _id
          },
        }
      },
      defaultProductVariant{
        ...,
        images[] -> {
          'url': images.asset->url
        },
        colorProduct->{
          ...
        },
        variants[]{
          ...,
          size -> {
            name,
            _id
          },
        }
      }
    }`;
    const result = await sanityClientNoCaching.fetch(query, { slug });
    return result[0];
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchProductsWithIdCategory = async (
  idCategory: string,
  idProduct: string
) => {
  try {
    const query = groq`*[_type == "product" && _id != $idProduct && !(_id in path("drafts.**")) && $idCategory in category[]._ref]{
      ...,
      brand->{
        name,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      defaultProductVariant{
        ...,
        size -> {
          name,
          _id
        },
        images[] -> {
          'url': images.asset->url
        },
        colorProduct[]->{
          ...
        }
      }
    }`;
    const result = await sanityClient.fetch(query, { idCategory, idProduct });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchProductByIds = async (IdList: string[]) => {
  try {
    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) && _id in $IdList]{
      ...,
      brand->{
        name,
        _id
      },
      'category': category[]->{
        title,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      variants[]{
        ...,
        images[] -> {
          'url': images.asset->url
        },
        colorProduct->{
          name,
          color
        },
        variants[]{
          ...,
          size -> {
            name,
            _id
          },
        }
      },
      defaultProductVariant{
        ...,
        images[] -> {
          'url': images.asset->url
        },
        colorProduct->{
          ...
        },
        variants[]{
          ...,
          size -> {
            name,
            _id
          },
        }
      }
    }`;
    const result = await sanityClientNoCaching.fetch(query, { IdList });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchProductsByIdCategoryPanigation = async (
  idCategory: string,
  page: number,
  pageSize: number
) => {
  let orderString = " order(lower(title) asc)";
  try {
    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) && $idCategory in category[]._ref] | ${orderString}[${
      (page - 1) * pageSize
    }...${page * pageSize}]{
      ...,
      brand->{
        name,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      defaultProductVariant{
        ...,
        size -> {
          name,
          _id
        },
        images[] -> {
          'url': images.asset->url
        },
        colorProduct[]->{
          ...
        }
      }
    }`;
    const result = await sanityClientNoCaching.fetch(query, { idCategory });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export async function updateProductQuanityInDefault(
  productId: string,
  variantIndex: number,
  newQuantity: number
) {
  try {
    const myObject: any = {};
    myObject[`defaultProductVariant.variants[${variantIndex}].stock`] =
      newQuantity;
    const result = await sanityClient.patch(productId).set(myObject).commit();
    console.log(
      "Đã cập nhật số lượng của biến thể sản phẩm thành công!",
      result
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng của biến thể sản phẩm:", error);
  }
}

export async function updateProductVariantQuantity(
  productId: string,
  indexInList: number,
  newQuantity: number
) {
  try {
    const myObject: any = {};
    myObject[`variants[${indexInList}].stock`] =
      newQuantity;
    const result = await sanityClientValue.patch(productId).set(myObject).commit();
    console.log("Đã cập nhật số lượng của biến thể sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng của biến thể sản phẩm:", error);
  }
}

//new schema
export const getProductHandler = async (
  idCategory: string,
  idProduct: string
) => {
  try {
    const query = groq`*[_type == "product" && _id != $idProduct && !(_id in path("drafts.**")) && $idCategory in category[]._ref]{
      ...,
      brand->{
        name,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      }
    }`;

    const result = await sanityClientValueNoCaching.fetch(query, {
      idCategory,
      idProduct,
    });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const getProductsHandler = async (params: IProductQuery) => {
  const {
    brands,
    page,
    pageSize,
    pathType,
    color,
    dataPrices,
    keySearch,
    sizeParams,
    sortParam,
    subCategoryIdList,
    subCategoryParams,
  } = params;
  try {
    let string = "";
    let orderString = " order(lower(title) asc)";

    //search
    if (keySearch && keySearch.length > 0) {
      string += ` && title match "*${keySearch}*"`;
    }

    //fill by brand
    if (brands && brands.length > 0) {
      string += " && brand._ref in $brands";
    }

    //fill by color
    if (color && color.length > 0) {
      const strQuery = color.map((item: string, idx) => {
        if (idx === color.length - 1) {
          return `"${item}" in color[]._ref`;
        }
        return `"${item}" in color[]._ref ||`;
      });
      string += ` && (${strQuery.join(" ")})`;
    }

    //fill by size
    if (sizeParams && sizeParams.length > 0) {
      const strQuery = sizeParams.map((item: string, idx) => {
        if (idx === sizeParams.length - 1) {
          return `"${item}" in variants[].size._ref`;
        }
        return `"${item}" in variants[].size._ref ||`;
      });
      string += ` && (${strQuery.join(" ")})`;
    }

    if (subCategoryParams && subCategoryParams.length > 0) {
      const strQuery = subCategoryParams.map((item: string, idx) => {
        if (idx === subCategoryParams.length - 1) {
          return `"${item}" in category[]._ref`;
        }
        return `"${item}" in category[]._ref ||`;
      });
      string += ` && (${strQuery.join(" ")})`;
    }

    if (pathType !== shop) {
      if (subCategoryIdList && subCategoryIdList.length > 0) {
        const strQuery = subCategoryIdList.map((item: { _id: string }, idx) => {
          if (idx === subCategoryIdList.length - 1) {
            return `"${item._id}" in category[]._ref`;
          }
          return `"${item._id}" in category[]._ref ||`;
        });
        string += ` && (${strQuery.join(" ")})`;
      }
    }

    //fill by price
    if (dataPrices && dataPrices.length > 0) {
      const data = dataPrices.map((item: IPriceMinMax) => {
        if (item.minPrice === 5000) {
          return `variants[0].price >= ${item.minPrice}`;
        }
        return `variants[0].price >= ${item.minPrice} && variants[0].price <= ${item.maxPrice}`;
      });
      string += ` && (${data.toString().replace(/,/g, " || ")})`;
    }

    //sort
    if (sortParam === "1") {
      orderString += " | order(variants[0].price asc)";
    } else if (sortParam === "2") {
      orderString += " | order(variants[0].price desc)";
    } else if (sortParam === "4") {
      string += " && best==true";
    } else if (sortParam === "3") {
      string += " && NewestArrivals==true";
    } else if (sortParam === "5") {
      string += " && featured==true";
    }

    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) ${
      string || ""
    }] | ${orderString}[${(page - 1) * pageSize}...${page * pageSize}]{
        ...,
        'images': images[]->{
          'url': images.asset->url
        },
        variants[]{
          ...,
          size->{
            ...
          }
        },
    }`;
    const params = {
      color,
      brands,
      sizeParams,
    };

    const queryCount = `count(*[_type == "${
      schema.product
    }" && !(_id in path("drafts.**")) ${string || ""}])`;

    return Promise.all([
      sanityClientValue.fetch(query, params),
      sanityClientValue.fetch(queryCount, params),
    ]).then((values) => {
      return {
        total: values[1] || 0,
        data: values[0],
      };
    });
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getListFilterHandler = async (params: IProductQuery) => {
  const { pathType, subCategoryIdList, keySearch } = params;
  try {
    let string = "";
    //search
    if (keySearch && keySearch.length > 0) {
      string += ` && title match "*${keySearch}*"`;
    }

    if (pathType !== shop) {
      if (subCategoryIdList && subCategoryIdList.length > 0) {
        const strQuery = subCategoryIdList.map((item: { _id: string }, idx) => {
          if (idx === subCategoryIdList.length - 1) {
            return `"${item._id}" in category[]._ref`;
          }
          return `"${item._id}" in category[]._ref ||`;
        });
        string += ` && (${strQuery.join(" ")})`;
      }
    }

    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) ${
      string || ""
    }]{
        brand->{
          _id,
          name
        }
    } | order(brand.name asc)`;

    const data = sanityClientValue.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getListSizeFilterHandler = async (params: IProductQuery) => {
  const { pathType, subCategoryIdList, pageSize, page, keySearch } = params;
  try {
    let string = "";
    //search
    if (keySearch && keySearch.length > 0) {
      string += ` && title match "*${keySearch}*"`;
    }

    if (pathType !== shop) {
      if (subCategoryIdList && subCategoryIdList.length > 0) {
        const strQuery = subCategoryIdList.map((item: { _id: string }, idx) => {
          if (idx === subCategoryIdList.length - 1) {
            return `"${item._id}" in category[]._ref`;
          }
          return `"${item._id}" in category[]._ref ||`;
        });
        string += ` && (${strQuery.join(" ")})`;
      }
    }
    let orderString = " order(lower(title) asc)";

    const offset = (page - 1) * pageSize;
    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) ${
      string || ""
    }] | ${orderString}[${offset}...${offset + pageSize}]{
        variants[]{
          size->{
            _id,
            name
          }
        },
    }`;

    const data = sanityClientValue.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const fetchProductHandler = async (slug: string) => {
  try {
    const query = groq`*[_type == "product" && !(_id in path("drafts.**"))  && slug.current == $slug]{
      ...,
      brand->{
        name,
        _id
      },
      'category': category[]->{
        title,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      color[]->{
        name
      },
      variants[]{
        ...,
        size->{
        ...
        }
      },
    }`;
    const result = await sanityClientValueNoCaching.fetch(query, { slug });
    return result[0];
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchProductsWithIdCategoryHandler = async (
  idCategory: string,
  idProduct: string,
  page: number,
  pageSize: number
) => {
  let orderString = "order(lower(title) asc)";
  try {
    const query = groq`*[_type == "product" && _id != $idProduct && !(_id in path("drafts.**")) && $idCategory in category[]._ref] | ${orderString}[${
      (page - 1) * pageSize
    }...${page * pageSize}]{
      ...,
      brand->{
        name,
        _id
      },
      'category': category[]->{
        title,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      color[]->{
        name
      },
      variants[]{
        ...,
        size->{
        ...
        }
      },
    }`;
    const result = await sanityClientValue.fetch(query, {
      idCategory,
      idProduct,
    });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchProductByIdsHandler = async (IdList: string[]) => {
  try {
    const query = groq`*[_type == "product" && !(_id in path("drafts.**")) && _id in $IdList]{
      ...,
      brand->{
        name,
        _id
      },
      'category': category[]->{
        title,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      color[]->{
        name
      },
      variants[]{
        ...,
        size->{
        ...
        }
      },
    }`;
    const result = await sanityClientValueNoCaching.fetch(query, { IdList });
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const getDataLastedProductHandler = async (
  page: number,
  pageSize: number
) => {
  let orderString = " order(createdAt desc)";
  try {
    const query = groq`*[_type == "product" && !(_id in path("drafts.**"))] | ${orderString}[${
      (page - 1) * pageSize
    }...${page * pageSize}]{
      ...,
      brand->{
        name,
        _id
      },
      'category': category[]->{
        title,
        _id
      },
      'images': images[]->{
        'url': images.asset->url
      },
      color[]->{
        name
      },
      variants[]{
        ...,
        size->{
        ...
        }
      },
    }`;
    const result = await sanityClientValueNoCaching.fetch(query);
    return result;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw new Error("Failed to fetch data");
  }
};
