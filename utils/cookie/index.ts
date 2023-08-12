import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, expires = 1): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expires);

  Cookies.set(name, value, { expires: expirationDate });
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string): void => {
  Cookies.set(name, '', { expires: -1 });
};
