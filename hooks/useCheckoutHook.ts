"use clients";
import { useSession } from "next-auth/react";
import {
  REQUIRED_FIELD_ERROR_MESSAGE,
  maxCharacter,
  EMAIL_INVALID,
  validEmail,
  validNumber,
  NUMERIC_MESSAGE,
  REQUIRED_ADDRESS_SHIPPING,
  SOMETHING_WITH_WRONG,
} from "@/constants";
import { ICountry, IShippingAddress, Iuser } from "@/utils/type";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { getDataById } from "@/utils/sanity/userService";
import { useRouter, useSearchParams } from "next/navigation";
import { Country, State } from "country-state-city";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IBilling, IOrder, updateOrder } from "@/redux/features/order-slice";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { updateToken } from "@/redux/features/token-card-slice";
import { isObjectEmptyExceptSpecifiedProps } from "@/utils/methods";

export const initialValuesState = {
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
};

export const initialValuesStateBilling = {
  firstNameBilling: "",
  lastNameBilling: "",
  addressBilling: "",
  apartmentBilling: "",
  cityBilling: "",
  countryBilling: "",
  stateBilling: "",
  zipCodeBilling: "",
  cardNumber: "",
  expiresOn: "",
};

export const initialValuesStateContaxt = {
  email: "",
  phone: "",
};

const useCheckoutHook = () => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedCountryBilling, setSelectedCountryBilling] =
    useState<ICountry>();
  const [selectedStateBilling, setSelectedStateBilling] = useState<any>();

  const [dataAddress, setDataAddress] = useState<Iuser>();
  const [validDataAddress, setValidDataAddress] = useState<IShippingAddress>();
  const [loadding, setLoadding] = useState<boolean>(false);

  const [disableShippingAddress, setDisableShippingAddress] =
    useState<boolean>(false);
  const [disableBilling, setDisableBilling] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [asAddress, setAsAddress] = useState<boolean>(false);
  const [billingAsAdressShipping, setBillingAsAdressShipping] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const productCartInStock = useAppSelector(
    (state) => state.productsCartInStock.items
  );
  const totalorder = useAppSelector((state) => state.totalOrder.total);
  const orderDetails = useAppSelector((state) => state.order.items);

  const { data } = useSession();
  const route = useRouter();

  const searchParamsState = useSearchParams();
  const option = searchParamsState.get("option");

  const [errorCardNumber, setErrorCardNumber] = useState<string>("");
  const [errorExp, setErrorExp] = useState<string>("");
  const [errorCvc, setErrorCvc] = useState<string>("Error");

  const stripe = useStripe();
  const elements = useElements();

  const checkoutWithGift =
    productCartInStock.findIndex((item) => item.giftUserId) !== -1;
  const checkoutWithOnlyMyProduct =
    productCartInStock.findIndex((item) => item.giftUserId === "") !== -1;

  const handleSave = () => {};
  const formik = useFormik({
    initialValues: initialValuesState,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("First Name", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      lastName: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("Last Name", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      address: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("Address", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      apartment: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("Apartment", 100)),
      city: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("City", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      zipCode: Yup.string()
        .trim()
        .max(10, maxCharacter("Zipcode", 10))
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .matches(validNumber, NUMERIC_MESSAGE),
    }),

    onSubmit: handleSave,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const formikBilling = useFormik({
    initialValues: initialValuesStateBilling,
    validationSchema: Yup.object({
      firstNameBilling: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("First Name", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      lastNameBilling: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("Last Name", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      addressBilling: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("Address", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      apartmentBilling: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("Apartment", 100)),

      cityBilling: Yup.string()
        .trim()
        .min(1)
        .max(100, maxCharacter("City", 100))
        .required(REQUIRED_FIELD_ERROR_MESSAGE),
      zipCodeBilling: Yup.string()
        .trim()
        .max(10, maxCharacter("Zipcode", 10))
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .matches(validNumber, NUMERIC_MESSAGE),
    }),

    onSubmit: handleSave,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const formikkContact = useFormik({
    initialValues: initialValuesStateContaxt,
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email(EMAIL_INVALID)
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .matches(validEmail, EMAIL_INVALID),
      phone: Yup.string()
        .trim()
        .min(1)
        .max(15, maxCharacter("Phone", 15))
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .matches(validNumber, NUMERIC_MESSAGE),
    }),

    onSubmit: handleSave,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const handleBillingAsShipping = (event: any) => {
    if (event.target.checked) {
      if (!selectedCountry) {
        toast(REQUIRED_ADDRESS_SHIPPING);
        return;
      }
      if (
        !isObjectEmptyExceptSpecifiedProps(formik.values, [
          "apartment",
          "country",
          "state",
        ])
      ) {
        toast(REQUIRED_ADDRESS_SHIPPING);
        return;
      }
      setDisableBilling(false);
      setBillingAsAdressShipping(true);
      if (formik.values) {
        formikBilling.setValues({
          firstNameBilling: formik.values.firstName,
          lastNameBilling: formik.values.lastName,
          addressBilling: formik.values.address,
          apartmentBilling: formik.values.apartment || "",
          cityBilling: formik.values.city,
          countryBilling: formik.values.country.split(",,")[1],
          stateBilling: formik.values.state.split(",,")[1],
          zipCodeBilling: formik.values.zipCode,
          cardNumber: "",
          expiresOn: "",
        });
        setSelectedCountryBilling(
          Country.getCountryByCode(selectedCountry?.isoCode || "")
        );
        setSelectedStateBilling(
          State?.getStateByCodeAndCountry(
            selectedState?.isoCode,
            selectedCountry?.isoCode || ""
          )
        );
      }
    } else {
      formikBilling.resetForm();
      setSelectedCountryBilling(undefined)
      setSelectedStateBilling(undefined)
      setBillingAsAdressShipping(false);
    }
  };

  const handleChangeShipping = (event: any) => {
    if (event.target.checked) {
      setDisableShippingAddress(true);
      setBillingAsAdressShipping(false);
      if (validDataAddress) {
        const iosCountry = validDataAddress.country.split(",,")[1];
        const iosState = validDataAddress.state.split(",,")[1] || "";
        formik.setValues({
          firstName: validDataAddress.firstName,
          lastName: validDataAddress.lastName,
          address: validDataAddress.address,
          apartment: validDataAddress.apartment || "",
          city: validDataAddress.city,
          country: validDataAddress.country.split(",,")[1],
          state: validDataAddress.state.split(",,")[1],
          zipCode: validDataAddress.zipCode,
        });
        setSelectedCountry(Country.getCountryByCode(iosCountry));
        setSelectedState(State?.getStateByCodeAndCountry(iosState, iosCountry));
      }
    } else {
      formik.resetForm();
      if (billingAsAdressShipping) formikBilling.resetForm();
      setDisableShippingAddress(false);
      setBillingAsAdressShipping(false);
      setSelectedCountry(undefined)
      setSelectedCountry(undefined)
    }
  };

  const handleChangeBilling = (event: any) => {
    if (event.target.checked) {
      setDisableBilling(true);
      setBillingAsAdressShipping(false);
      if (dataAddress?.Billing) {
        const iosCountry = dataAddress?.Billing[0].country.split(",,")[1];
        const iosState = dataAddress?.Billing[0].state.split(",,")[1] || "";
        formikBilling.setValues({
          firstNameBilling: dataAddress?.Billing[0].firstName,
          lastNameBilling: dataAddress?.Billing[0].lastName,
          addressBilling: dataAddress?.Billing[0].address,
          apartmentBilling: dataAddress?.Billing[0].apartment || "",
          cityBilling: dataAddress?.Billing[0].city,
          countryBilling: dataAddress?.Billing[0].country.split(",,")[1],
          stateBilling: dataAddress?.Billing[0].state.split(",,")[1],
          zipCodeBilling: dataAddress?.Billing[0].zipCode,
          cardNumber: dataAddress?.Billing[0].cardNumber,
          expiresOn: dataAddress?.Billing[0].expiresOn,
        });
        setSelectedCountryBilling(Country.getCountryByCode(iosCountry));
        setSelectedStateBilling(
          State?.getStateByCodeAndCountry(iosState, iosCountry)
        );
      }
    } else {
      formikBilling.resetForm();
      setDisableBilling(false);
      setSelectedCountryBilling(undefined)
      setSelectedStateBilling(undefined)
    }
  };

  const handlePlaceTheOrder = async () => {
    if (!stripe || !elements) {
      return;
    }
    setLoadding(true);

    let orderDetailsState: IOrder = {
      address: {
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
      },
      contract: {
        email: "",
        phone: "",
      },
      billing: {
        firstName: "",
        lastName: "",
        cardNumber: "",
        expiresOn: "",
        securityCode: "",
        address: "",
        apartment: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
      },
      check: {
        isDefaultAddress: false,
        isDefaultBilling: false,
        shippingAsBilling: false,
      },
    };

    if (!disableShippingAddress) {
      const data = {
        ...formik.values,
        country: selectedCountry
          ? selectedCountry.name + ",," + selectedCountry.isoCode
          : "",
        state: selectedState
          ? selectedState?.name + ",," + selectedState?.isoCode
          : "",
      };
      orderDetailsState = {
        ...orderDetailsState,
        address: { ...data },
      };
    } else {
      if (
        dataAddress &&
        dataAddress?.shippingAddress &&
        dataAddress?.shippingAddress?.length > 0
      )
        orderDetailsState = {
          ...orderDetailsState,
          address: { ...dataAddress?.shippingAddress[0] },
          check: {
            ...orderDetailsState.check,
            isDefaultAddress: true,
          },
        };
    }

    orderDetailsState = {
      ...orderDetailsState,
      contract: {
        email: formikkContact.values.email,
        phone: formikkContact.values.phone,
      },
    };

    if (!disableBilling) {
      const result = await stripe.createToken(
        elements.getElement(CardNumberElement) as any
      );
      if (result.error) {
        console.log(result.error.message);
        toast(SOMETHING_WITH_WRONG);
        setLoadding(false);
        return;
      } else {
        console.log(result);
        dispatch(updateToken(result.token.id));
      }
      const data: IBilling = {
        firstName: formikBilling.values.firstNameBilling,
        lastName: formikBilling.values.lastNameBilling,
        address: formikBilling.values.addressBilling,
        apartment: formikBilling.values.apartmentBilling,
        city: formikBilling.values.cityBilling,
        zipCode: formikBilling.values.zipCodeBilling,
        cardNumber: result.token?.card?.last4,
        expiresOn:
          result.token.card?.exp_month + "/" + result.token.card?.exp_year,
        country: selectedCountryBilling
          ? selectedCountryBilling.name + ",," + selectedCountryBilling.isoCode
          : "",
        state: selectedStateBilling
          ? selectedStateBilling?.name + ",," + selectedStateBilling?.isoCode
          : "",
      };
      if (billingAsAdressShipping) {
        orderDetailsState = {
          ...orderDetailsState,
          billing: { ...data },
          check: {
            ...orderDetailsState.check,
            shippingAsBilling: true,
          },
        };
      } else {
        orderDetailsState = {
          ...orderDetailsState,
          billing: { ...data },
        };
      }
    } else {
      if (
        dataAddress &&
        dataAddress?.Billing &&
        dataAddress?.Billing?.length > 0
      )
        orderDetailsState = {
          ...orderDetailsState,
          billing: { ...dataAddress?.Billing[0] },
          check: {
            ...orderDetailsState.check,
            isDefaultBilling: true,
          },
        };
    }
    dispatch(updateOrder(orderDetailsState));
    if (disableBilling) {
      route.push(`/review-order?customer-id=${dataAddress?.stripe_cus_id}`);
    } else {
      route.push("/review-order");
    }
  };

  useEffect(() => {
    if (data?.user.id) {
      getDataById(data?.user.id).then((result: Iuser[]) => {
        const dataValid =
          result[0]?.shippingAddress?.filter((val) => {
            return !val.deleted;
          }) || [];

        setValidDataAddress(dataValid[0]);

        const dataValidAddress =
          result[0]?.Billing?.filter((val) => {
            return !val.deleted;
          }) || [];

        setDataAddress({
          ...result[0],
          shippingAddress: [...dataValid],
          Billing: [...dataValidAddress],
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (option && orderDetails) {
      const iosCountry = orderDetails?.billing.country.split(",,")[1];
      const iosState = orderDetails.billing.state.split(",,")[1] || "";
      formikBilling.setValues({
        firstNameBilling: orderDetails.billing.firstName,
        lastNameBilling: orderDetails.billing.lastName,
        addressBilling: orderDetails.billing.address,
        apartmentBilling: orderDetails.billing.apartment || "",
        cityBilling: orderDetails.billing.city,
        countryBilling: orderDetails.billing.country.split(",,")[1],
        stateBilling: orderDetails.billing.state.split(",,")[1],
        zipCodeBilling: orderDetails?.billing.zipCode,
        cardNumber: orderDetails?.billing.cardNumber || "",
        expiresOn: orderDetails?.billing.expiresOn || "",
      });
      setSelectedCountryBilling(Country.getCountryByCode(iosCountry));
      setSelectedStateBilling(
        State?.getStateByCodeAndCountry(iosState, iosCountry)
      );

      formikkContact.setValues({
        email: orderDetails.contract.email,
        phone: orderDetails.contract.phone,
      });
      if (orderDetails?.address) {
        const iosCountryAdd = orderDetails.address.country.split(",,")[1];
        const iosStateAdd = orderDetails.address.state.split(",,")[1] || "";
        formik.setValues({
          firstName: orderDetails.address.firstName,
          lastName: orderDetails.address.lastName,
          address: orderDetails.address.address,
          apartment: orderDetails.address.apartment || "",
          city: orderDetails.address.city,
          country: orderDetails.address.country.split(",,")[1],
          state: orderDetails.address.state.split(",,")[1],
          zipCode: orderDetails.address.zipCode,
        });
        setSelectedCountry(Country.getCountryByCode(iosCountryAdd));
        setSelectedState(
          State?.getStateByCodeAndCountry(iosStateAdd, iosCountryAdd)
        );
      }

      if (orderDetails.check.isDefaultAddress) {
        setDisableShippingAddress(true);
      }
      if (orderDetails.check.isDefaultBilling) {
        setDisableBilling(true);
      } else if (orderDetails.check.shippingAsBilling) {
        setBillingAsAdressShipping(true);
      }
    }
  }, [option]);

  return {
    setSelectedCountry,
    setSelectedState,
    setDisableBilling,
    setDisableShippingAddress,
    handleChangeShipping,
    handleChangeBilling,
    handlePlaceTheOrder,
    setSelectedCountryBilling,
    setSelectedStateBilling,
    handleBillingAsShipping,
    setErrorCardNumber,
    setErrorExp,
    setErrorCvc,
    formik,
    formikBilling,
    formikkContact,
    selectedCountry,
    selectedState,
    selectedCountryBilling,
    selectedStateBilling,
    dataAddress,
    loadding,
    disableBilling,
    disableShippingAddress,
    disableButton,
    data,
    asAddress,
    totalorder,
    errorCardNumber,
    errorExp,
    errorCvc,
    checkoutWithGift,
    billingAsAdressShipping,
    checkoutWithOnlyMyProduct
  };
};

export default useCheckoutHook;
