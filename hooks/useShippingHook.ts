import { updateShippingAddress } from "./../utils/sanity/userService";
import { useSession } from "next-auth/react";
import {
  REQUIRED_FIELD_ERROR_MESSAGE,
  maxCharacter,
  validNumber,
  NUMERIC_MESSAGE,
  SOMTHING_WRONG,
} from "@/constants";
import { ICountry, IShippingAddress, Iuser } from "@/utils/type";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createShippingAddress, getDataById } from "@/utils/sanity/userService";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";

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

const useShippingHook = (idAdd?: boolean, dataProps?: Iuser) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [selectedState, setSelectedState] = useState<any>();
  const [dataAddress, setDataAddress] = useState<Iuser>();
  const [validDataAddress, setValidDataAddress] = useState<IShippingAddress>();
  const [loadding, setLoadding] = useState<boolean>(false);
  const { data } = useSession();
  const route = useRouter();
  const handleSave = async () => {
    if (!selectedCountry || loadding) {
      return;
    }
    setLoadding(true)
    if (idAdd && dataAddress?.id) {
      const data = {
        ...formik.values,
        authorId: dataAddress?.id,
        deleted: false,
        country: selectedCountry.name + ",," + selectedCountry.isoCode,
        state: selectedState
          ? selectedState?.name + ",," + selectedState?.isoCode
          : "",
      };
      try {
        const result = await createShippingAddress(data);
        route.push("/account/shipping");
      } catch (error) {
        toast(SOMTHING_WRONG);
      } finally {
        setLoadding(false);
      }
    } else if (!idAdd && dataAddress?.id && validDataAddress?.id) {
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
        const result = await updateShippingAddress(data);
        route.push("/account/shipping");
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
          result[0]?.shippingAddress?.filter((val) => {
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
          });
          setSelectedCountry(Country.getCountryByCode(iosCountry));
          setSelectedState(
            State?.getStateByCodeAndCountry(iosState, iosCountry)
          );
        }
        setDataAddress({
          ...result[0],
          shippingAddress: [...dataValid],
        });
      });
    }
  }, [data]);

  return {
    formik,
    selectedCountry,
    selectedState,
    setSelectedCountry,
    setSelectedState,
    handleSave,
    dataAddress,
    loadding,
  };
};

export default useShippingHook;
