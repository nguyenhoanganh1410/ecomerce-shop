import { useState } from "react";
import {
  REQUIRED_FIELD_ERROR_MESSAGE,
  PASSWORD_QUALITY,
  maxCharacterEmail,
  MUST_MATCH,
  UPDATE_SUCCESS_MESSAGE,
} from "@/constants";
import { IOauth } from "@/utils/type";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signOut, useSession } from "next-auth/react";
import {
  deleteUserInAuth0,
  getTokenHandler,
  updateUserInAuth0,
} from "@/lib/auth";
import { toast } from "react-toastify";

export const initialValuesSocial = {
  oldPassword: "",
  newPassword: "",
  confirmPass: "",
};

export const initialValuePassword = {
  password: "",
};

const AUTH0 = "auth0"
const useSettingHook = () => {
  const [loaddingDeleteAccount, setLoadingDeleteAccount] =
    useState<boolean>(false);
  const [loaddingChangePassword, setLoadingChangePassword] =
    useState<boolean>(false);

  const { data } = useSession();
  const loginWithEmailPassword = data?.user.id.includes(AUTH0)
  const handleChangePassword = async () => {
    try {
      setLoadingChangePassword(true);
      const object: IOauth = {
        username: data?.user.email || "",
        grant_type: "password",
        password: formikPassword.values.oldPassword,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
        client_secret: process.env.NEXT_PUBLIC_SECRET_ID || "",
        audience: process.env.NEXT_PUBLIC_AUDIENCE || "",
      };
      const result = await getTokenHandler(object);

      const objectClient: IOauth = {
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_CLIENT || "",
        client_secret: process.env.NEXT_PUBLIC_SECRET || "",
        audience: process.env.NEXT_PUBLIC_AUDIENCE || "",
      };

      const resultClient = await getTokenHandler(objectClient);

      if (resultClient?.error) {
        toast(resultClient.error_description);
        setLoadingDeleteAccount(false);
        return;
      }
      const objectPassword = {
        password: formikPassword.values.newPassword,
      };
      const resultUpdate = await updateUserInAuth0(
        data?.user.id || "",
        objectPassword,
        resultClient.access_token
      );

      if (resultUpdate?.error) {
        toast(result?.message);
        setLoadingDeleteAccount(false);
        return;
      } else {
        toast(UPDATE_SUCCESS_MESSAGE);
        formikPassword.resetForm();
      }
      setLoadingChangePassword(false);
    } catch (error) {
      toast((error as any)?.response?.data?.error_description);
      console.log(error);
      setLoadingChangePassword(false);
      return;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoadingDeleteAccount(true);
      const object: IOauth = {
        username: data?.user.email || "",
        grant_type: "password",
        password: formikDeletePassword.values.password,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
        client_secret: process.env.NEXT_PUBLIC_SECRET_ID || "",
        audience: process.env.NEXT_PUBLIC_AUDIENCE || "",
      };
      const result = await getTokenHandler(object);

      const objectClient: IOauth = {
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_CLIENT || "",
        client_secret: process.env.NEXT_PUBLIC_SECRET || "",
        audience: process.env.NEXT_PUBLIC_AUDIENCE || "",
      };

      const resultClient = await getTokenHandler(objectClient);

      if (resultClient?.error) {
        toast(resultClient.error_description);
        setLoadingDeleteAccount(false);
        return;
      }

      const resultDelete = await deleteUserInAuth0(
        data?.user.id || "",
        resultClient.access_token
      );
      // if (resultDelete?.error) {
      //   toast(resultDelete?.message);
      //   setLoadingDeleteAccount(false);
      //   return;
      // } 
      console.log("sign out")
      console.log(resultDelete)
      signOut({
        callbackUrl: `${window.location.origin}`,
      });
    } catch (error) {
      toast((error as any)?.response?.data?.error_description);
      console.log(error);
      setLoadingDeleteAccount(false);
      return;
    }
  };

  const handleShowModel = () => {
    alert("ok")
  }
  const formikDeletePassword = useFormik({
    initialValues: initialValuePassword,
    onSubmit: handleDeleteAccount,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const formikPassword = useFormik({
    validationSchema: Yup.object({
      oldPassword: Yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE),
      newPassword: Yup.string()
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .min(1)
        .max(100, maxCharacterEmail("New Password"))
        .matches(/^(?=(.*[a-z]))?(?=(.*[A-Z]))?(?=(.*\d))?(?=(.*[\W_]))?.{8,}$/, PASSWORD_QUALITY),
      confirmPass: Yup.string()
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .min(1)
        .max(100, maxCharacterEmail("Confirm Password"))
        .oneOf([Yup.ref("newPassword"), ""], MUST_MATCH)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, PASSWORD_QUALITY),
    }),
    initialValues: initialValuesSocial,
    onSubmit: handleChangePassword,
    validateOnChange: true,
    validateOnBlur: false,
  });

  return {
    formikPassword,
    formikDeletePassword,
    loaddingDeleteAccount,
    loaddingChangePassword,
    loginWithEmailPassword,
    handleChangePassword,
    handleDeleteAccount,
    handleShowModel
  };
};

export default useSettingHook;
