"use client";
import { Fragment, useRef, useState, useTransition } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Iuser } from "@/utils/type";
import { createUser, updateUserById } from "@/utils/sanity/userService";
import { toast } from "react-toastify";
import {
  DELETE_SUCCESS_MESSAGE,
  UPDATE_FAILED_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  TYPE_FILE_IMAGE,
  SOMETHING_WITH_WRONG,
} from "@/constants";
import aws from "aws-sdk";
import { ManagedUpload, PutObjectRequest } from "aws-sdk/clients/s3";
import { useSession } from "next-auth/react";
import useProfileHook from "@/hooks/useProfileHook";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateUser } from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";
import DotsComponent from "@/components/loadding/dots-component";

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new aws.S3();
interface IProps {
  handleChange: any;
  handleChangeState?: any;
  isBgModel?: boolean;
  dataProps: Iuser;
  setData?: any;
  reload?: boolean;
}

const beforeUpload = (file: any) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJpgOrPng) {
    return false;
  }
  if (file.name.includes(".jfif")) {
    return false;
  }
  return true;
};

export default function ModelAvatar({
  handleChange,
  isBgModel,
  dataProps,
  handleChangeState,
  setData,
  reload,
}: IProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const inputFileAvatar = useRef(null);
  const { data } = useSession();
  const { dataState } = useProfileHook();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isPending, startTransition] = useTransition();
  const handlChoiseFile = () => {
    if (inputFileAvatar?.current) {
      (inputFileAvatar?.current as any).click();
    }
  };

  const handlePreviewAvatar = async (e: any) => {
    const file = e.target.files[0];
    if (!data?.user.id) return;
    if (file.size > 1 * 1024 * 1024) {
      toast("File size exceeds the limit of 1MB.");
      return;
    }
    if (!beforeUpload(file)) {
      toast(TYPE_FILE_IMAGE);
      return;
    }

    const params: PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: e.target.files[0].name,
      Body: e.target.files[0],
    };

    try {
      s3.upload(
        params,
        function (err: Error, response: ManagedUpload.SendData) {
          if (err) {
            console.log(err);
            toast(UPDATE_FAILED_MESSAGE);
          }
          if (response) {
            if (isBgModel) {
              if (user.length > 0) {
                const newData: Iuser = {
                  ...user[0],
                  backgroundImageUrl: response.Location,
                };
                updateUserById(newData).then((status) => {
                  if (setData) setData(newData);
                  if (handleChangeState) {
                    handleChangeState(false);
                  }
                  handleChange(false);
                  toast(UPDATE_SUCCESS_MESSAGE);
                  dispatch(updateUser([status]));
                });
              } else {
                const newData: Iuser = {
                  backgroundImageUrl: response.Location,
                  uid: data?.user.id || "",
                  deleted: false,
                };
                createUser(newData).then((status) => {
                  if (setData) setData(newData);
                  if (handleChangeState) {
                    handleChangeState(false);
                  }
                  handleChange(false);
                  toast(UPDATE_SUCCESS_MESSAGE);
                  dispatch(updateUser([status]));
                });
              }
            } else {
              if (user.length > 0) {
                const newData: Iuser = {
                  ...user[0],
                  avatarUrl: response.Location,
                };
                updateUserById(newData).then((status) => {
                  if (setData) setData(newData);
                  if (handleChangeState) {
                    handleChangeState(false);
                  }
                  handleChange(false);
                  toast(UPDATE_SUCCESS_MESSAGE);
                  dispatch(updateUser([status]));
                });
              } else {
                const newData: Iuser = {
                  avatarUrl: response.Location,
                  uid: data?.user.id || "",
                  deleted: false,
                };
                createUser(newData).then((status) => {
                  if (setData) setData(newData);
                  if (handleChangeState) {
                    handleChangeState(false);
                  }
                  handleChange(false);
                  toast(UPDATE_SUCCESS_MESSAGE);
                  dispatch(updateUser([status]));
                });
              }
            }
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveImage = async () => {
    if (isBgModel) {
      if (!dataProps.backgroundImageUrl) return;
      const newData: Iuser = {
        ...dataProps,
        backgroundImageUrl: "",
      };
      startTransition(async () => {
        try {
          const status = await updateUserById(newData);
          if (handleChangeState) {
            handleChangeState(true);
          }
          if (setData) setData(newData);
          handleChange(false);
          toast(DELETE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
          if (reload) {
            router.refresh();
          }
        } catch (error) {
          console.log("error updating user", error);
          toast(SOMETHING_WITH_WRONG);
        }
      });
    } else {
      if (!dataProps.avatarUrl) return;
      const newData: Iuser = {
        ...dataProps,
        avatarUrl: "",
      };
      startTransition(async () => {
        try {
          const status = await updateUserById(newData);
          if (handleChangeState) {
            handleChangeState(true);
          }
          if (setData) setData(newData);
          handleChange(false);
          toast(DELETE_SUCCESS_MESSAGE);
          dispatch(updateUser([status]));
          if (reload) {
            router.refresh();
          }
        } catch (error) {
          console.log("error updating user");
          toast(SOMETHING_WITH_WRONG);
        }
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => handleChange(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${
                  isBgModel ? "w-[520px]" : "w-[396px]"
                } relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg`}
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-center">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-medium leading-6 text-gray-900"
                        >
                          Update Photo
                        </Dialog.Title>
                        <div
                          className="cursor-pointer"
                          onClick={() => handleChange(false)}
                        >
                          <div className="relative w-5 h-5 cursor-pointer hover:opacity-55 mr-2 mb-1">
                            <Image
                              src="/close.png"
                              alt=""
                              className="object-cover"
                              width={20}
                              height={20}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 mb-8">
                        <div className="flex -space-x-1 overflow-hidden justify-center">
                          {isBgModel ? (
                            <>
                              {dataProps?.backgroundImageUrl ? (
                                <div
                                  className="relative"
                                  onClick={() => handlChoiseFile()}
                                >
                                  <Image
                                    className="inline-block h-[180px] w-[456px rounded-lg ring-2 ring-white object-cover"
                                    src={dataProps.backgroundImageUrl}
                                    width={456}
                                    height={180}
                                    alt=""
                                  />{" "}
                                  <div className="w-[40px] h-[40px] absolute right-2 top-2 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                                    <Image
                                      alt=""
                                      width={40}
                                      height={40}
                                      src="/upload.png"
                                      className="object-contain"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() => handlChoiseFile()}
                                  className="w-[456px] flex justify-center items-center bg-[#EDEDED] relative rounded-lg h-[180px] overflow-hidden group-hover:opacity-75 cursor-pointer"
                                >
                                  <Image
                                    src="/mountant.png"
                                    className="object-contain"
                                    width={123}
                                    alt="mountant"
                                    height={52}
                                  />
                                  <div className="w-[40px] h-[40px] absolute right-2 top-2 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                                    <Image
                                      alt=""
                                      src="/upload.png"
                                      className="object-contain"
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {dataProps?.avatarUrl ? (
                                <div
                                  className="relative border-solid border-2 border-indigo-600 rounded-full"
                                  onClick={() => handlChoiseFile()}
                                >
                                  <div className="w-[40px] h-[40px] absolute right-4 top-0 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                                    <Image
                                      alt=""
                                      src="/upload.png"
                                      className="object-contain"
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <Image
                                    width={191}
                                    height={191}
                                    className="rounded-full ring-2 h-[191px] ring-white object-cover"
                                    src={dataProps.avatarUrl}
                                    alt=""
                                  />
                                </div>
                              ) : (
                                <div
                                  className="relative"
                                  onClick={() => handlChoiseFile()}
                                >
                                  <div className="w-[191px] h-[191px] relative overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                                    <Image
                                      alt=""
                                      src="/avatar-pick-removebg-preview.png"
                                      className="object-contain"
                                      width={180}
                                      height={180}
                                    />
                                  </div>
                                  <div className="w-[40px] h-[40px] absolute right-4 top-0 overflow-hidden rounded-full group-hover:opacity-75 cursor-pointer">
                                    <Image
                                      alt=""
                                      src="/upload.png"
                                      className="object-cover"
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <input
                          type="file"
                          ref={inputFileAvatar}
                          hidden
                          onChange={handlePreviewAvatar}
                        ></input>
                        <button
                          onClick={() => handlChoiseFile()}
                          className={`bg-[#242424] mt-3 h-[54px] flex items-center w-full justify-center rounded-[4px] px-5 py-4 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-95 sm:mt-0 sm:w-auto`}
                        >
                          <div className="relative cursor-pointer hover:opacity-55 mr-2 mb-1">
                            <Image
                              src="/upload-icon.png"
                              alt=""
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                          ADD PHOTO
                        </button>
                        <button
                          onClick={() => handleRemoveImage()}
                          className={`flex items-center h-[54px] bg-transparent mt-3 w-full justify-center rounded-[4px] px-5 py-4 text-sm font-bold text-[#242424] sm:mt-0 sm:w-auto`}
                        >
                          {isPending ? (
                            <DotsComponent />
                          ) : (
                            <>
                              <div className="relative cursor-pointer hover:opacity-55 mr-2 mb-1">
                                <Image
                                  src="/Bin.png"
                                  alt=""
                                  className="object-contain"
                                  width={20}
                                  height={20}
                                />
                              </div>
                              DELETE
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
