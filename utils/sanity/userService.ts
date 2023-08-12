import { apiUrl } from "@/lib/path";
import { EnvMode, IBilling, IShippingAddress, Iuser } from "../type";

export const updateUserById = async (user: Iuser) => {
  try {
    const res = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user: Iuser) => {
  try {
    const res = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDataById = async (id: string) => {
  const res = await fetch(`${apiUrl.getUserByIdUrl}?uid=${id}`, {
    cache: 'no-store' 
  });
  const data = await res.json();
  return data;
};

export const getDataByWithCache = async (id: string) => {
  const res = await fetch(`${apiUrl.getUserByIdUrl}?uid=${id}`,  { next: { revalidate: 100 } });
  const data = await res.json();
  return data;
};

export const deleteShippingAddress = async (id: number) => {
  const res = await fetch(`/api/user/shipping?uid=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const createShippingAddress = async (address: IShippingAddress) => {
  try {
    const res = await fetch(`/api/user/shipping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateShippingAddress = async (address: IShippingAddress) => {
  try {
    const res = await fetch(`/api/user/shipping`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteBilling = async (id: number) => {
  const res = await fetch(`/api/user/billing?uid=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const updateBilling = async (billing: IBilling) => {
  try {
    const res = await fetch(`/api/user/billing`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billing),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createBilling = async (billing: IBilling) => {
  try {
    const res = await fetch(`/api/user/billing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billing),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
