export const documents = {
  product: "product",
  size: "size",
  brand: "brand",
  category: "category",
  productImage: "productImage",
  images: "images",
  color: "colors",
};

export const searchQuery = {
  type: "type",
  limit: "limit",
  page: "page",
  brand: "brand",
  color: "color",
  price: "price",
  text: "text",
  subCategory: "subCategory",
  sort: "sort",
  size: "size",
};

export const brand = "brand";
export const price = "price";
export const color = "color";
export const shop = "shop";
export const errorQuality = "The requested quantity is not available.";
export const addedToCart = "Item name have been added to your cart.";
export const faildAlert = "System error.";
export const inValidNumber = "Must be a valid number or a valid size.";
export const bagIsFull = "Your bag is full";
export const defaultVarientId = "123456789";
export const unAuthenticated = "unauthenticated";
export const productCartEmpty = {
  id: -1,
  brand: "",
  slug: "",
  title: "",
  product: [],
  quantity: 0,
};
export const loading = "loading";
export const limitCart = 20;
export const AuthenticatedString = "authenticated";
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

export const minCharacter = (fieldName?: string) => {
  return `${fieldName || ""} must be at least ${MIN_LIMIT} character.`;
};

export const maxCharacter = (fieldName: string, limit: number) => {
  return `${fieldName || ""} must be at most ${limit} character.`;
};

export const EMAIL_INPUT_MAX_LENGTH = 320;

export const maxCharacterEmail = (fieldName?: string) => {
  return `${
    fieldName || ""
  } must be at most ${EMAIL_INPUT_MAX_LENGTH} character`;
};

export const LIMIT_FILE_500 = "File size must be at least 500KB";
export const REQUIRED_FIELD_ERROR_MESSAGE = "This field is required.";
export const EMAIL_INVALID = "Email must be a valid email.";
export const REQUIRED_OPTION_ERROR_MESSAGE =
  "Please select an item in the list.";
export const EMAIL_FIELD_ERROR_MESSAGE = "Please enter a valid email address.";
export const REQUIRE_NUMBER_ERROR_MESSAGE = "Please enter a number.";
export const PASSWORD_MATCHING_MESSAGE = "Passwords must match.";
export const PASSWORD_VALIDATION =
  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.";
export const WHITE_SPACE = "Whitespace only is not allowed";
export const EMAIL_ALREADY_EXISTED = "Email is already exists.";
export const MUST_MATCH = "Confirm password must match new password field";
export const PASSWORD_QUALITY =
  "Password should contain a minimum of 8 characters, At least 3 of the following: Lower case, Upper case letters, numbers, special characters.";
export const CORRECT_PASSWORD_MESSAGE =
  "Your current password is correct, please change your password";
export const INCORRECT_PASSWORD_MESSAGE = "Password incorrect";
export const CURRENT_PASSWORD = "Current Password";
export const NEW_PASSWORD = "New Password";
export const CONFIRM_NEW_PASSWORD = "Confirm New Password";
export const LIMIT_FILE = "File size must be at least 2MB";
export const invalidImage = (width: number, height: number) =>
  `No less than 300×100 px, no larger than 2000×2000 px. ( image current: ${height} x ${width}px)`;
export const MESSAGE_EMAIL_NOT_FOUND = "Email does not exists.";
export const UPDATE_SUCCESS_MESSAGE = "Update successful.";
export const UPDATE_FAILED_MESSAGE = "Update failed.";
export const DELETE_SUCCESS_MESSAGE = "Delete successful.";
export const DELETE_SUCCESS_FAILED = "Delete failed.";
export const TYPE_FILE_IMAGE = "Only accept : JPG, PNG";
export const DUPLICATED_MESSAGE = "Your SIGMA Username already exists.";
export const validEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validNumber = /^\d+$/;
export const NUMERIC_MESSAGE = "Must be a numeric value.";
export const SOMTHING_WRONG = "Opps, add failed.";
export const FILL_UP =
  "Please fill in the complete delivery address information.";
export const GUEST_ID = "guest_d8b66906-2014-11ee-be56-0242ac120002";
export const MESSAGE_ADD_TO_WISHLIST =
  "Item name have been added to your wishlist.";
export const SOMETHING_WITH_WRONG = "Something with wrong, please try again.";
export const MESSAGE_EXITS_IN_WISHLIST = "The product already exists.";

export const INDEX_FEATURED = 5;
export const INDEX_BEST_SELLER = 4;
export const INDEX_NEW_ARRIVAL = 3;
export const INDEX_PRICE_LOW_TO_HIGHT = 2;
export const INDEX_PRICE_HIGHT_TO_LOW = 1;
export const MESSAGE_REQUIED_SHIPPING_ADDRESS =
  "You need to setup your Shipping Address before sharing your Wishlist";
export const MESSAGE_PICK_SIZE = "Please choose a size";
export const MESSAGE_REQUIED_LOGIN = "Please login to add to wishlist.";
export const REGEX_SIGMANAME = /^[a-zA-Z0-9_.]+$/;
export const MESSAGE_INVALID_SIGMANAME =
  "Usernames can only use letters, numbers, underscores and periods.";
export const MESSAGE_INVALID_VALUE = "Invalid value";
export const REQUIRED_ADDRESS_SHIPPING =
  "Please fill in the complete delivery address information.";
export const MESSAGE_REQUIED_ADDRESS_CART =
  "The recipient does not have any address information.";
export const MESSAGE_REQUIED_QUANITY_AVAILABLE =
  "The requested quantity is not available.";
export const MESSAGE_REQUIRED_LOGIN = "You must log in to make a payment.";
export const MESSAGE_REQUIED_SHIPPING_ADDRESS_CART =
  "You need to setup your Shipping Address before making a payment.";
export const MESSAGE_SAVE_DATA = "Saving your data";
export const MESSAGE_PAYING = "Making a payment";
export const TYPE_EMAIL_IS_NOTIFICATION = 0;
export const TYPE_EMAIL_IS_ORDER_CONFIRMATION = 1;
export const CUSTOMER_ID_PARAM = "customer-id";
export const MESSAGGE_ORDER_CONFIRMATION = "Order Confirmation";
export const TYPE_REQUEST_BRAND = "brand";
export const TYPE_REQUEST_SIZE = "size";
export const PRODUCT_TYPE = {
  men: "men",
  women: "women",
  shop: "shop",
  bags: "bags",
  shoes: "shoes",
  accessories: "accessories",
};
export const SANITY_EMAIL_TYPE = {
  order_success: "order_success",
  delivery_success: "delivery_success",
  notification: "notification",
};

export const TYPE_PRODUCT_METHOD = {
  pull: "pull",
  updateStock: "updateStock",
};
export const TYPE_PRODUCT_METHOD_PULL = "pull";
export const TYPE_PRODUCT_UPDATE_STOCK = "updateStock";
