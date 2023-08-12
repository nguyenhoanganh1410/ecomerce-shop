"use client";
import Image from "next/image";
import React, { useState } from "react";
import ModelAvatar from "../account/profile/model-avatar";
import { Iuser } from "@/utils/type";
import { useAppSelector } from "@/redux/store";

interface IProps {
  user: Iuser;
  classString?: string;
  isBgModel?: boolean;
  isSharingMode?: boolean;
}

export default function AvatarButtonComponent({
  classString,
  isBgModel,
  user,
  isSharingMode,
}: IProps) {
  const [show, setShow] = useState(false);
  const [stateDeleteBg, setStateDeleteBg] = useState<boolean>(false);
  const data = useAppSelector((state) => state.user.user);

  const handleShowModel = () => {
    if (isSharingMode) return;
    setShow(true);
  };
  return (
    <React.Fragment>
      <div className={classString} onClick={handleShowModel}>
        <React.Fragment>
          {data.length > 0 && data[0].avatarUrl && !isBgModel ? (
            <Image
              src={data[0].avatarUrl}
              fill
              alt=""
              className="object-cover cursor-pointer rounded-full"
            />
          ) : (
            <>
              {user?.avatarUrl && !isBgModel ? (
                <>
                  <Image
                    src={user.avatarUrl}
                    fill
                    alt=""
                    className="object-cover cursor-pointer rounded-full"
                  />
                  {isSharingMode ? null : (
                    <div className="absolute w-full h-full top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 cursor-pointer z-[9] opacity-0 hover:opacity-100">
                      <div className="absolute w-10 h-10 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 cursor-pointer z-[9]">
                        <Image
                          src="/pen_icon.png"
                          width={40}
                          height={40}
                          alt=""
                          className="object-cover rounded-full cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isSharingMode ? null : (
                    <Image
                      src="/pen_icon.png"
                      width={128}
                      height={128}
                      alt=""
                      className="object-cover rounded-full cursor-pointer pencil_bg"
                    />
                  )}
                </>
              )}
            </>
          )}
        </React.Fragment>
      </div>
      {show ? (
        <ModelAvatar
          handleChange={setShow}
          dataProps={data[0]}
          isBgModel={isBgModel}
          handleChangeState={setStateDeleteBg}
          reload={true}
        />
      ) : null}
    </React.Fragment>
  );
}
