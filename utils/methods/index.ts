import {
  ICartProduct,
  ICheckBox,
  IColorPicker,
  IObject,
  IProductCart,
  IProductResponse,
  IProductVariantCart,
  IResultDataProduct,
  IRootCategory,
  Iuser,
  IWishListProduct,
} from "@/utils/type";
import {
  documents,
  PRODUCT_TYPE,
  productCartEmpty,
  TYPE_REQUEST_BRAND,
  TYPE_REQUEST_SIZE,
} from "@/constants";
import {
  fetchDataAndSort,
  fetchDataProducts,
  fetchProductByIds,
  fetchProductByIdsHandler,
  getCategoryWithIdParent,
  getDataSubCategory,
  getListFilterHandler,
  getListSizeFilterHandler,
  getProductsHandler,
  getSubCategoryBySlug,
} from "../sanity/productService";
import { filters } from "../data";
import { getDataById, getDataByWithCache } from "../sanity/userService";
import { IProductRoot, IResponsiveProduct } from "../types/product";
import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByNameHandler,
} from "../sanity/categoryService";

export async function getDataFilter(
  brandsParams: string[],
  colorParams: string[],
  priceParams: string[],
  type: string,
  sizeParams?: string[],
  subCategory?: string[]
) {
  return Promise.all([
    fetchDataAndSort(documents.brand, "name", brandsParams),
    fetchDataAndSort(documents.color, "name", colorParams),
    getDataSubCategory(),
    fetchDataAndSort(documents.size, "name", sizeParams),
  ]).then((values) => {
    const optionsPrice = filters[0].options.map((item: ICheckBox) => {
      const idx = priceParams?.findIndex((name) => item.value === name);
      if (idx !== -1) {
        return { value: item.value, label: item.label, checked: true };
      }
      return { value: item.value, label: item.label, checked: false };
    });

    const parents = values[2].map((item: any) => {
      return item.parents[0];
    });

    const uniqueparent = parents.filter((value: any, idx: number) => {
      return idx === parents.findIndex((v: any) => v._id === value._id);
    });

    const filter = uniqueparent.map((value: any) => {
      const data = values[2].filter((item: any) => {
        return value._id === item.parents[0]._id;
      });

      const dataOption = data.map((item: any) => {
        const idx = subCategory?.findIndex((id: string) => item._id === id);
        if (idx !== -1) {
          return {
            value: item._id,
            label: item.title,
            checked: true,
            parentSlug: item.parents[0].slug?.current,
          };
        }
        return {
          value: item._id,
          label: item.title,
          checked: false,
          parentSlug: item.parents[0].slug?.current,
        };
      });

      return {
        id: value._id,
        name: value.title,
        options: dataOption,
      };
    });

    const filterSubCategory = [
      {
        id: "Product Type",
        name: "Product Type",
        subFilter: filter,
      },
    ];

    const filterData = [
      {
        id: "color",
        name: "color",
        searchInput: false,
        options: values[1],
      },
      {
        id: "brand",
        name: "brand",
        searchInput: true,
        options: values[0],
      },
      {
        id: "size",
        name: "size",
        searchInput: false,
        options: values[3],
      },
      {
        id: "price",
        name: "price",
        searchInput: false,
        options: optionsPrice,
      },
    ];

    return {
      filterSubCategory,
      filterData,
    };
  });
}

export async function getListProfuct(
  page: number,
  pageSize: number,
  brands: string[],
  colors: string[],
  pathType: string,
  priceParams: string[],
  sortParam: string,
  subCategoryParams?: string[],
  sizeParams?: string[],
  slug?: string
) {
  try {
    const dataPrices = priceParams.map((priceString) => {
      return {
        maxPrice: +priceString.split("-")[1],
        minPrice: +priceString.split("-")[0],
      };
    });

    const category: IRootCategory[] = await getSubCategoryBySlug(slug || "");
    const subCategory = await getCategoryWithIdParent(category[0]?._id || "");
    const subCategoryIdList = subCategory.map((item: any) => {
      return item?._id;
    });

    const data: IResultDataProduct = await fetchDataProducts(
      page,
      pageSize,
      category[0]?._id,
      brands,
      colors,
      pathType,
      dataPrices,
      sortParam,
      "",
      subCategoryIdList,
      subCategoryParams,
      sizeParams || []
    );

    return data;
  } catch (error) {
    console.log(error);
    return { total: 0, data: [], dataTotal: [] };
  }
}

export const getColorsWithImagesInProduct = (data: IProductResponse) => {
  const colorsInProductDefault = [
    {
      name: data.defaultProductVariant.colorProduct?.name,
      bgColor: data.defaultProductVariant.colorProduct.color.hex,
      selectedColor: data.defaultProductVariant.colorProduct.color.hex,
      default: true,
      images: data.images.concat(data.defaultProductVariant.images || []),
    },
  ];

  const listColorInProductCariants = data.variants?.map((product) => {
    return {
      name: product.colorProduct.name,
      bgColor: product.colorProduct.color.hex,
      selectedColor: product.colorProduct.color.hex,
      default: false,
      images: product.images,
    };
  });

  const resultColors = data.variants
    ? [...colorsInProductDefault, ...listColorInProductCariants]
    : [...colorsInProductDefault];

  const uniqueColor = resultColors.filter(
    (value: IColorPicker, idx: number) => {
      return (
        idx ===
        resultColors.findIndex((v: IColorPicker) => v.name === value.name)
      );
    }
  );

  return uniqueColor;
};

export const handleProducts = async (
  idProductUnique: string[],
  array: ICartProduct[]
) => {
  const list = await fetchProductByIdsHandler(idProductUnique);
  const listIdSigma = array.filter((item) => item.giftUserId);

  const uniqueIdUserGift = listIdSigma.filter(
    (value: ICartProduct, idx: number) => {
      return (
        idx ===
        listIdSigma.findIndex(
          (v: ICartProduct) => v.giftUserId === value.giftUserId
        )
      );
    }
  );

  const listUserPromise = uniqueIdUserGift.map((item) => {
    return getDataByWithCache(item.giftUserId || "");
  });

  const dataSigmaResult = await Promise.all(listUserPromise);
  const dataSigma = dataSigmaResult?.flat();

  const data: any[] = array
    .map((val) => {
      const product: IProductRoot = list.filter((item: IProductRoot) => {
        return val.idProduct === item._id;
      })[0];
      if (!product) {
        return productCartEmpty;
      }

      const dataVariant = product.variants.filter((value) => {
        return value._key === val.idSubProduct;
      });
      const subProduct: IProductVariantCart = {
        price: dataVariant[0].price,
        stock: dataVariant[0].stock,
        color: product.color
          ? product.color.map((item) => item.name + " ").toString()
          : "",
        images: product.images,
        size: dataVariant[0].size,
        discountPrice: dataVariant[0].discountPrice
          ? dataVariant[0].price
          : undefined,
        valid: dataVariant[0].stock >= val.quantity,
      };

      const dataValid: Iuser[] = dataSigma.filter((item) => {
        return item.uid === val.giftUserId;
      });
      let giftAddressString = "";
      if (dataValid.length > 0) {
        const dataValidWithValidAddress =
          dataValid[0].shippingAddress?.filter((item) => {
            return item.deleted === false;
          }) || [];
        if (dataValidWithValidAddress.length > 0) {
          giftAddressString =
            dataValidWithValidAddress[0].address +
            " " +
            dataValidWithValidAddress[0].apartment +
            " " +
            dataValidWithValidAddress[0].city +
            " " +
            dataValidWithValidAddress[0].state.split(",,")[0] +
            " " +
            dataValidWithValidAddress[0].country.split(",,")[0];
        }
      }

      return {
        id: val.id,
        brand: product.brand.name,
        slug: product.slug.current,
        title: product.title,
        product: [subProduct],
        quantity: val.quantity,
        giftSigma: dataValid.length > 0 ? dataValid[0]?.sigmaUserName : "",
        giftUserId: val?.giftUserId || "",
        idWishListOfGift: val?.idWishListOfGift || "",
        giftAddress: giftAddressString,
        giftUserName:
          dataValid.length > 0
            ? dataValid[0]?.firstName + " " + dataValid[0]?.lastName
            : "",
        giftUserEmail: val?.giftEmail || "",
      };
    })
    .filter((val) => {
      return val.id !== productCartEmpty.id;
    });
  return data;
};

export function isObjectEmpty(obj: any) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function checkEmptyProperties(obj: any) {
  if (typeof obj === "object" || obj === null) {
    return false;
  }

  return Object.values(obj).every(
    (value) => value === "" || value === undefined || value === null
  );
}

export function formatString(e: any) {
  var inputChar = String.fromCharCode(e.keyCode);
  var code = e.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }
  return e.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}

export const handleProductsWillUpdate = async (
  idProductUnique: string[],
  array: ICartProduct[]
) => {
  const list: IProductRoot[] = await fetchProductByIdsHandler(idProductUnique);
  const data: any[] = array
    .map((val) => {
      const product = list.filter((item) => {
        return val.idProduct === item._id;
      })[0];
      if (!product) {
        return null;
      }

      //varients
      const index = product.variants.findIndex((item) => {
        return item._key === val.idSubProduct;
      });

      const variant = product.variants.filter((item) => {
        return item._key === val.idSubProduct;
      });

      return {
        id: val.idProduct,
        firstIndex: index,
        quality: variant[0].stock - val.quantity,
        status: 1,
      };
    })
    .filter((val) => {
      return val !== null;
    });

  return data.flat();
};

export function cc_format(value: string) {
  const v = value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .substr(0, 16);
  const parts = [];

  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substr(i, 4));
  }

  return parts.length > 1 ? parts.join(" ") : value;
}

export const handleProductsInWishList = async (
  idProductUnique: string[],
  array: IWishListProduct[]
) => {
  const list: IProductRoot[] = await fetchProductByIdsHandler(idProductUnique);
  const data: any[] = array
    .map((val) => {
      const product = list.filter((item) => {
        return val.idProduct === item._id;
      })[0];
      if (!product) {
        return productCartEmpty;
      }

      const dataVariant = product.variants.filter((value) => {
        return value._key === val.idSubProduct;
      });

      const subProduct: IProductVariantCart = {
        price: dataVariant[0].price,
        stock: dataVariant[0].stock,
        images: product.images,
        size: dataVariant[0].size,
        color: product.color
          ? product.color.map((item) => item.name).toString()
          : "",
        discountPrice: dataVariant[0].discountPrice
          ? dataVariant[0].discountPrice
          : undefined,
      };

      return {
        id: val.id,
        brand: product.brand.name,
        slug: product.slug.current,
        title: product.title,
        product: [subProduct],
        featured: product?.featured || false,
        newArrival: product?.NewestArrivals || false,
        bestSeller: product?.best || false,
        idProduct: val.idProduct,
        idSubProduct: val.idSubProduct,
      };
    })
    .filter((val) => {
      return val.id !== productCartEmpty.id;
    });
  return data;
};

export const checkCartInValid = (products: IProductCart[]) => {
  for (var val of products) {
    if (
      (!val.product[0].valid && val.product[0].stock !== 0) ||
      (val.giftUserId && !val.giftAddress)
    ) {
      return false;
    }
  }
  return true;
};

export function isObjectEmptyExceptSpecifiedProps(
  obj: IObject,
  specifiedProps: string[]
): boolean {
  for (const key in obj) {
    if (!specifiedProps.includes(key) && obj[key] === "") {
      return false;
    }
  }
  return true;
}

//new
export async function getDataHandler(
  page: number,
  pageSize: number,
  brands: string[],
  colors: string[],
  pathType: string,
  priceParams: string[],
  sortParam: string,
  subCategoryParams?: string[],
  sizeParams?: string[],
  slug?: string,
  keySearch?: string
) {
  try {
    const dataPrices = priceParams.map((priceString) => {
      return {
        maxPrice: +priceString.split("-")[1],
        minPrice: +priceString.split("-")[0],
      };
    });
    if (
      pathType == PRODUCT_TYPE.bags ||
      pathType == PRODUCT_TYPE.shoes ||
      pathType == PRODUCT_TYPE.accessories
    ) {
      const [result01, result02] = await Promise.all([
        getCategoriesHandler(PRODUCT_TYPE.men, pathType),
        getCategoriesHandler(PRODUCT_TYPE.women, pathType),
      ]);
      const subCategoryIdList = [...result01, ...result02];
      const data: IResponsiveProduct = await getProductsHandler({
        page,
        pageSize,
        brands,
        color: colors,
        pathType,
        dataPrices,
        sortParam,
        subCategoryIdList,
        subCategoryParams,
        sizeParams,
        keySearch,
      });

      return data;
    }

    const subCategoryIdList = await getCategoryByNameHandler(pathType);
    let subList: string[] = [];
    if (subCategoryParams && subCategoryParams.length > 0) {
      const promiseList = subCategoryParams.map((item) => {
        return getCategoryByIdHandler(item);
      });

      const data = await Promise.all(promiseList);
      if (data.length > 0) {
        subList = data?.flat().map((item) => {
          return item._id;
        });
      }
    }
    const data: IResponsiveProduct = await getProductsHandler({
      page,
      pageSize,
      brands,
      color: colors,
      pathType,
      dataPrices,
      sortParam,
      subCategoryIdList,
      subCategoryParams: subList,
      sizeParams,
      keySearch,
    });

    return data;
  } catch (error) {
    console.log(error);
    return { total: 0, data: [], dataTotal: [] };
  }
}

export async function getDataFilterHandler(
  typeRequest: string,
  page: number,
  pageSize: number,
  brands: string[],
  colors: string[],
  pathType: string,
  priceParams: string[],
  sortParam: string,
  subCategoryParams?: string[],
  sizeParams?: string[],
  slug?: string,
  keySearch?: string
) {
  try {
    const dataPrices = priceParams.map((priceString) => {
      return {
        maxPrice: +priceString.split("-")[1],
        minPrice: +priceString.split("-")[0],
      };
    });

    const subCategoryIdList = await getCategoryByNameHandler(pathType);

    if (typeRequest == TYPE_REQUEST_BRAND) {
      const data = await getListFilterHandler({
        page,
        pageSize,
        brands,
        color: colors,
        pathType,
        dataPrices,
        sortParam,
        subCategoryIdList,
        subCategoryParams,
        sizeParams,
        keySearch,
      });
      return data;
    } else if (typeRequest == TYPE_REQUEST_SIZE) {
      const data = await getListSizeFilterHandler({
        page,
        pageSize,
        brands,
        color: colors,
        pathType,
        dataPrices,
        sortParam,
        subCategoryIdList,
        subCategoryParams,
        sizeParams,
        keySearch,
      });
      return data;
    }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}
