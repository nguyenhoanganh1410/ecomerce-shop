import { groq } from "next-sanity";
import { sanityClient } from "../sync-data/client-test";
import { schema } from "./schema";
import { IRootCategory } from "../types/category";
import { sanityClientValue } from "./connection";

//Retrieve a list of all categories related to a specific category.
export const getCategoryByNameHandler = async (name: string) => {
  try {
    const query = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && lower(title) == $name]{
      _id
    }`;
    const result = await sanityClientValue.fetch(query, { name });

    if (result.length === 0) {
      return [];
    }
    let list: IRootCategory[] = [...result];
    let resultSub = await getCategoryByParentIdsHandler([result[0]._id]);
    list = [...list, ...resultSub];

    let stop = false;
    while (!stop) {
      const resultSubOne = await getCategoryByParentIdsHandler(
        resultSub.map((item: IRootCategory) => {
          return item._id;
        })
      );
      resultSub = [...resultSubOne];
      if (resultSubOne.length === 0) {
        stop = true;
      }

      list = [...list, ...resultSubOne];
    }
    return list;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getcategory = async () => {
  try {
    const query = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && !defined(parents)]`;
    const result = await sanityClientValue.fetch(query);
    let list: IRootCategory[] = [];
    for (let i = 0; i < result.length; i++) {
      const resultSubOne = await getCategoryByParentIdHandler(result[i]?._id);
      if (resultSubOne.length > 0) {
        list.push(result[i]);
      }
    }
    console.log(list);
    return list;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};
export const getCategoriesHandler = async (
  name: string,
  originTetx: string
) => {
  try {
    const query = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && lower(title) == $name]{
      _id,
      title
    }`;
    const result = await sanityClientValue.fetch(query, { name });

    if (result.length === 0) {
      return [];
    }
    let list: IRootCategory[] = [];
    let resultSub = await getCategoryByParentIdsAndTextHandler(
      [result[0]._id],
      originTetx
    );
    list = [...list, ...resultSub];

    let stop = false;
    while (!stop) {
      const resultSubOne = await getCategoryByParentIdsAndTextHandler(
        resultSub.map((item: IRootCategory) => {
          return item._id;
        }),
        originTetx
      );
      resultSub = [...resultSubOne];
      if (resultSubOne.length === 0) {
        stop = true;
      }

      list = [...list, ...resultSubOne];
    }
    return list;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getCategoryByParentIdsAndTextHandler = async (
  ids: string[],
  originText: string
) => {
  try {
    const querySub = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && parents._ref in $ids && title match "*${originText}*"]{
      _id,
      title
    }`;
    const resultSub = await sanityClientValue.fetch(querySub, {
      ids,
      originText,
    });

    return resultSub;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getCategoryByParentIdHandler = async (id: string) => {
  try {
    const querySub = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && parents._ref == $id]{
      _id
    }`;
    const resultSub = await sanityClientValue.fetch(querySub, { id });

    return resultSub;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getCategoryByParentIdsHandler = async (ids: string[]) => {
  try {
    const querySub = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && parents._ref in $ids]{
      _id
    }`;
    const resultSub = await sanityClientValue.fetch(querySub, { ids });

    return resultSub;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getDataCategories = async (
  name: string,
  page: number,
  pageSize: number
) => {
  try {
    const query = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && lower(title) == $name && !defined(parents)]{
      _id,
      title,
      ...
    }`;
    const result = await sanityClientValue.fetch(query, { name });
    if (result.length === 0) {
      return [];
    }
    let list: IRootCategory[] = [];
    let resultSub = await getCategoryDetailsByParentIdsHandler(
      [result[0]._id],
      page,
      pageSize
    );
    list = [...list, ...resultSub];

    return list;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getCategoryDetailsByParentIdsHandler = async (
  ids: string[],
  page: number,
  pageSize: number
) => {
  try {
    let orderString = " order(lower(title) asc)";
    const querySub = groq`*[_type == "${
      schema.category
    }" && !(_id in path("drafts.**")) && parents._ref in $ids] | ${orderString}[${
      (page - 1) * pageSize
    }...${page * pageSize}]{
      _id,
      title
    }`;
    const resultSub = await sanityClientValue.fetch(querySub, { ids });

    return resultSub;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const querySub = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")){
      _id,
      title
    }`;
    const resultSub = await sanityClientValue.fetch(querySub);

    return resultSub;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};

//Retrieve a list of all categories related to a specific category.
export const getCategoryByIdHandler = async (id: string) => {
  try {
    const query = groq`*[_type == "${schema.category}" && !(_id in path("drafts.**")) && _id == $id]{
      _id
    }`;
    const result = await sanityClientValue.fetch(query, { id });

    if (result.length === 0) {
      return [];
    }
    let list: IRootCategory[] = [...result];
    let resultSub = await getCategoryByParentIdsHandler([result[0]._id]);
    list = [...list, ...resultSub];

    let stop = false;
    while (!stop) {
      const resultSubOne = await getCategoryByParentIdsHandler(
        resultSub.map((item: IRootCategory) => {
          return item._id;
        })
      );
      resultSub = [...resultSubOne];
      if (resultSubOne.length === 0) {
        stop = true;
      }

      list = [...list, ...resultSubOne];
    }
    return list;
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    throw error;
  }
};
