import { IOauth, IUserAuth0 } from "@/utils/type";
import axios from "axios";
import qs from "qs";

export const getTokenHandler = async (data: IOauth) => {
  try {
    const options = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_URL_AUTH0}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
    };

    const dataResult = await axios(options);
    return dataResult.data;
  } catch (error) {
    throw error;
  }
};
export const deleteUserInAuth0 = async (id: string, accessToken: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_AUTH0}/api/v2/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const updateUserInAuth0 = async (
  id: string,
  data: IUserAuth0,
  accessToken: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_AUTH0}/api/v2/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const dataResult = await res.json();
    return dataResult;
  } catch (error) {
    throw error;
  }
};

export const getProfileHandler = async (accessToken: string) => {
  try {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL_AUTH0}/userinfo`,
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const data = await axios(options);
    return data.data;
  } catch (error) {
    throw error;
  }
};
