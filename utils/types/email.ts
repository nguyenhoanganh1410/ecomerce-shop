import { IProductCart } from "../type";

export interface IEmailPayload {
  //1: Email will be sent for Order Confirmation
  //0: User will receive email if they gets gifted by other buyer
  type: number;
  subject: string;
  email: string;
  products: IProductCart[];
  name?: string;
}

export interface IEmailType {
  order_success: string;
  delivery_success: string;
  notification: string;
}

export interface IEmailRoot {
  _createdAt: string;
  _rev: string;
  _type: string;
  _id: string;
  title: string;
  _updatedAt: string;
  content: string;
  emailType: string;
}

export interface IData {
  title: string;
  quanity: number;
}
