import {
  createBilling,
  createUser,
  updateBilling,
  updateUserById,
} from "./../utils/sanity/userService";
import { useSession } from "next-auth/react";
import {
  REQUIRED_FIELD_ERROR_MESSAGE,
  maxCharacter,
  validNumber,
  NUMERIC_MESSAGE,
  SOMTHING_WRONG,
  UPDATE_FAILED_MESSAGE,
} from "@/constants";
import { ICountry, IShippingAddress, Iuser } from "@/utils/type";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getDataById } from "@/utils/sanity/userService";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { addTokenWithCustomer, createCustomer } from "@/utils/stripe";
import { updateStatus } from "@/redux/features/notification-slice";
export const initialValuesState = {
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
};

const useBillingHook = (idAdd?: boolean, dataProps?: Iuser) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [selectedState, setSelectedState] = useState<any>();

  const [dataAddress, setDataAddress] = useState<Iuser>();
  const [validDataAddress, setValidDataAddress] = useState<IShippingAddress>();

  const [loadding, setLoadding] = useState<boolean>(false);
  const route = useRouter();
  const { data } = useSession();

  const dispatch = useAppDispatch();
  const statusChange = useAppSelector((state) => state.notification.status);

  const [errorCardNumber, setErrorCardNumber] = useState<string>("");
  const [errorExp, setErrorExp] = useState<string>("");
  const [errorCvc, setErrorCvc] = useState<string>("Error");

  const stripe = useStripe();
  const elements = useElements();

  const handleSave = async () => {
    if (!selectedCountry || loadding || !data?.user.email || !data?.user.id) {
      return;
    }
    setLoadding(true);
    if (idAdd) {
      if (!stripe || !elements) {
        toast(SOMTHING_WRONG);
        return;
      };
      const promiseCreateCustomer = createCustomer(
        data?.user.email,
        formik.values.firstName + " " + formik.values.lastName,
        data?.user.id
      );

      const promiseCreateToken = stripe.createToken(
        elements.getElement(CardNumberElement) as any
      );

      const [result, resultToken] = await Promise.all([
        promiseCreateCustomer,
        promiseCreateToken,
      ]);

      if (!result?.id || resultToken.error) {
        toast(SOMTHING_WRONG);
        return;
      }

      const dataResult = await addTokenWithCustomer(
        result?.id,
        resultToken?.token?.id || ""
      );
      if (!dataResult?.id) {
        toast("System Error.");
        return;
      }
      if (dataAddress?.id) {
        console.log("update");
        const newData = {
          ...dataAddress,
          stripe_cus_id: result?.id,
        };
        try {
          const status = await updateUserById(newData);
        } catch (error) {
          console.log("error updating user");
          toast(UPDATE_FAILED_MESSAGE);
          return;
        }
      } else {
        console.log("cetae");
        const newData = {
          uid: data?.user.id || "",
          deleted: false,
          stripe_cus_id: result?.id,
          sigmaUserName: "",
        };
        try {
          const status = await createUser(newData);
        } catch (error) {
          console.log("error updating user");
          toast(UPDATE_FAILED_MESSAGE);
        }
      }

      if (dataAddress?.id) {
        const data = {
          ...formik.values,
          authorId: dataAddress?.id,
          deleted: false,
          country: selectedCountry.name + ",," + selectedCountry.isoCode,
          state: selectedState
            ? selectedState?.name + ",," + selectedState?.isoCode
            : "",
          cardNumber: resultToken.token?.card?.last4 || "",
          expiresOn:
            resultToken.token?.card?.exp_month +
              "/" +
              resultToken.token?.card?.exp_year || "",
        };
        try {
          const result = await createBilling(data);
          dispatch(updateStatus(!statusChange));
          route.push("/account/billing");
        } catch (error) {
          toast(SOMTHING_WRONG);
        } finally {
          setLoadding(false);
        }
      }
    }

    if (!idAdd && dataAddress?.id && validDataAddress?.id) {
      const data = {
        id: validDataAddress?.id,
        ...formik.values,
        authorId: dataAddress?.id,
        deleted: false,
        country: selectedCountry.name + ",," + selectedCountry.isoCode,
        state: selectedState
          ? selectedState?.name + ",," + selectedState?.isoCode
          : "",
      };
      try {
        const result = await updateBilling(data);
        route.push("/account/billing");
        dispatch(updateStatus(!statusChange));
      } catch (error) {
        toast(SOMTHING_WRONG);
      } finally {
        setLoadding(false);
      }
    }
  };

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
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .matches(validNumber, NUMERIC_MESSAGE),
    }),

    onSubmit: handleSave,
    validateOnChange: true,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (data?.user.id) {
      getDataById(data?.user.id).then((result: Iuser[]) => {
        const dataValid =
          result[0]?.Billing?.filter((val) => {
            return val.deleted === false;
          }) || [];
        setValidDataAddress(dataValid[0]);
        if (dataValid.length > 0) {
          const iosCountry = dataValid[0].country.split(",,")[1];
          const iosState = dataValid[0].state.split(",,")[1] || "";
          formik.setValues({
            firstName: dataValid[0].firstName,
            lastName: dataValid[0].lastName,
            address: dataValid[0].address,
            apartment: dataValid[0].apartment || "",
            city: dataValid[0].city,
            country: dataValid[0].country.split(",,")[1],
            state: dataValid[0].state.split(",,")[1],
            zipCode: dataValid[0].zipCode,
            cardNumber: dataValid[0].cardNumber || "",
            expiresOn: dataValid[0].expiresOn || "",
            securityCode: dataValid[0].securityCode || "",
          });
          setSelectedCountry(Country.getCountryByCode(iosCountry));
          setSelectedState(
            State?.getStateByCodeAndCountry(iosState, iosCountry)
          );
        }
        setDataAddress({
          ...result[0],
          Billing: [...dataValid],
        });
      });
    }
  }, [data]);

  return {
    formik,
    selectedCountry,
    selectedState,
    dataAddress,
    loadding,
    errorCardNumber,
    errorExp,
    errorCvc,
    setSelectedCountry,
    setSelectedState,
    handleSave,
    setErrorCardNumber,
    setErrorExp,
    setErrorCvc,
  };
};

export default useBillingHook;
