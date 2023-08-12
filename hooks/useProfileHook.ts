import { getDataById } from "./../utils/sanity/userService";
import { useEffect, useTransition } from "react";
import { useState } from "react";
import {
  REQUIRED_FIELD_ERROR_MESSAGE,
  maxCharacter,
  UPDATE_SUCCESS_MESSAGE,
  UPDATE_FAILED_MESSAGE,
  MESSAGE_INVALID_SIGMANAME,
  REGEX_SIGMANAME
} from "@/constants";
import { isObjectEmpty } from "@/utils/methods";
import { createUser, updateUserById } from "@/utils/sanity/userService";
import { Iuser } from "@/utils/type";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateUser } from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";

export const initialValuesState = {
  firstName: "",
  lastName: "",
  sigmaUserName: "",
  message: "",
};

export const initialValuesSocial = {
  onlyFansUrl: "",
  titokUrl: "",
  instagramUrl: "",
  twitterUrl: "",
};

const useProfileHook = (dataProps?: Iuser) => {
  const handleSubmit = () => {};
  const handleSaveSocial = () => {};
  const [dataState, setDataState] = useState<Iuser[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [loadding, setLoadding] = useState<boolean>(false);
  const [loaddingProfile, setLoaddingProfile] = useState<boolean>(false);
  const { data } = useSession();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const formik = useFormik({
    initialValues:
      dataProps &&
      dataProps.firstName &&
      dataProps.lastName &&
      dataProps.sigmaUserName
        ? {
            firstName: dataProps.firstName,
            lastName: dataProps.lastName,
            sigmaUserName: dataProps.sigmaUserName,
            message: dataProps.message,
          }
        : initialValuesState,

    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .max(50, maxCharacter("First Name", 50)),
      lastName: Yup.string()
        .trim()
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .max(50, maxCharacter("Last Name", 50)),
      sigmaUserName: Yup.string()
        .trim()
        .max(50, maxCharacter("Username", 50))
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .matches(REGEX_SIGMANAME, MESSAGE_INVALID_SIGMANAME),
      message: Yup.string()
        .test("test", maxCharacter("Message", 140), (value) => {
          const string = value?.replace(/\n/g, "") || "";
          return string?.length <= 140;
        })
        .test(
          "spaces",
          "Field should not contain consecutive whitespaces.",
          (value) => {
            return !/\s{2}/.test(value || "");
          }
        ),
    }),

    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const formikSocial = useFormik({
    initialValues:
      dataProps &&
      (dataProps.titokUrl ||
        dataProps.twitterUrl ||
        dataProps.instagramUrl ||
        dataProps.onlyFansUrl)
        ? {
            onlyFansUrl: dataProps.onlyFansUrl || "",
            titokUrl: dataProps.titokUrl || "",
            instagramUrl: dataProps.instagramUrl || "",
            twitterUrl: dataProps.twitterUrl || "",
          }
        : initialValuesSocial,
    onSubmit: handleSaveSocial,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const handleSaveAccountInfo = async () => {
    const active =
      formik.values.firstName.length > 0 &&
      formik.values.sigmaUserName.length > 0 &&
      formik.values.lastName.length > 0 &&
      isObjectEmpty(formik.errors);
    if (!active || loaddingProfile) return;
    if (!data?.user.id) return;

    setLoaddingProfile(true);
    if (user.length > 0) {
      const newData = {
        ...user[0],
        ...formik.values,
        sigmaUserName: formik.values.sigmaUserName.toLowerCase(),
      };
      startTransition(async () => {
        try {
          const status = await updateUserById(newData);
          if (status?.status == "error") {
            toast(status?.message);
            return;
          }
          toast(UPDATE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
        } catch (error) {
          console.log("error updating user");
          toast(UPDATE_FAILED_MESSAGE);
        } finally {
          setLoaddingProfile(false);
        }
        router.refresh();
      });
    } else {
      const newData = {
        ...formik.values,
        uid: data?.user.id || "",
        deleted: false,
        onlyFansUrl: "",
        titokUrl: "",
        instagramUrl: "",
        twitterUrl: "",
      };
      startTransition(async () => {
        try {
          const status = await createUser(newData);
          if (status?.status == "error") {
            toast(status?.message);
            return;
          }
          toast(UPDATE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
          toast(UPDATE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
        } catch (error) {
          console.log("error updating user");
          toast(UPDATE_FAILED_MESSAGE);
        } finally {
          setLoaddingProfile(false);
        }
        router.refresh();
      });
    }
  };

  const handleSaveSocialData = async () => {
    if (loadding) return;
    if (!data?.user.id) return;

    setLoadding(true);
    if (user.length > 0) {
      const newData = {
        ...user[0],
        ...formikSocial.values,
      };
      startTransition(async () => {
        try {
          const status = await updateUserById(newData);
          toast(UPDATE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
        } catch (error) {
          console.log("error updating user");
          toast(UPDATE_FAILED_MESSAGE);
          return;
        } finally {
          setLoadding(false);
        }
        router.refresh();
      });
    } else {
      const newData = {
        ...formikSocial.values,
        uid: data?.user.id || "",
        deleted: false,
        firstName: "",
        lastName: "",
        sigmaUserName: "",
        message: "",
      };
      startTransition(async () => {
        try {
          const status = await createUser(newData);
          toast(UPDATE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
        } catch (error) {
          console.log("error updating user");
          toast(UPDATE_FAILED_MESSAGE);
          return;
        } finally {
          setLoadding(false);
        }
        router.refresh();
      });
    }
  };

  useEffect(() => {
    if (data?.user.id) {
      getDataById(data?.user.id).then((data) => {
        setDataState(data);
        dispatch(updateUser(data));
      });
    }
  }, [data]);

  return {
    handleSaveAccountInfo,
    handleSaveSocialData,
    formik,
    formikSocial,
    dataState,
    loadding,
    loaddingProfile,
  };
};

export default useProfileHook;
