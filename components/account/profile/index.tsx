import RequiredLoginComponent from "@/app/error";
import ErrorComponent from "@/components/helper/error-component";
import LoadingLogo from "@/components/loadding/loadding-logo";
import { authOptions } from "@/utils/authOptions";
import { getDataById } from "@/utils/sanity/userService";
import { Iuser } from "@/utils/type";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import AvatarGroup from "./avatar";
import FormProfile from "./form-setting";

export default async function ProfileComponent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <RequiredLoginComponent />;
  }
  const data: Iuser[] = await getDataById(session.user.id);

  if ((data as any)?.error) {
    return <ErrorComponent />;
  }
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingLogo />}>
        <AvatarGroup data={data[0]} />
      </Suspense>
      <Suspense>
        <FormProfile data={data[0]} />
      </Suspense>
    </React.Fragment>
  );
}
