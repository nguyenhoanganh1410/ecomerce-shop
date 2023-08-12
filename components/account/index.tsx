import { authOptions } from "@/utils/authOptions";
import { getDataById } from "@/utils/sanity/userService";
import { Iuser } from "@/utils/type";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import ErrorComponent from "../helper/error-component";
import RequiredLoginComponent from "../helper/require-login-coponent";
import LoadingLogo from "../loadding/loadding-logo";
import FormBilling from "./billing/form-billing";
import ListCard from "./billing/list-card";
import TableOrder from "./order/table-order";
import ProfileComponent from "./profile";
import FormDeleteUser from "./settings/form-delete-user";
import FormSetting from "./settings/form-setting";
import FormAddress from "./shipping/form-address";
import ListAddress from "./shipping/list-address";
interface IProps {
  params: { slug: string[] };
}
const account_settings_urls = {
  deleteUser: "delete-user",
  settings: "settings",
  editAddress: "edit-address",
  shipping: "shipping",
  addAddress: "add-address",
  addBillings: "add-billing",
  billing: "billing",
  editBillings: "edit-billing",
  profile: "profile",
  orderHistory: "order-history",
};

export default async function AccountIndex({ params }: IProps) {
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingLogo />}>
        <RenderTabs params={params} />
      </Suspense>
    </React.Fragment>
  );
}

const RenderTabs = ({ params }: IProps) => {
  if (
    params.slug[1] === account_settings_urls.deleteUser &&
    params.slug[0] === account_settings_urls.settings
  ) {
    return (
      <Suspense>
        <FormDeleteUser />
      </Suspense>
    );
  } else if (
    params.slug[1] === account_settings_urls.editAddress &&
    params.slug[0] === account_settings_urls.shipping
  ) {
    return (
      <Suspense>
        <FormAddress />
      </Suspense>
    );
  } else if (
    params.slug[1] === account_settings_urls.addAddress &&
    params.slug[0] === account_settings_urls.shipping
  ) {
    return (
      <Suspense>
        <FormAddress isAdd />
      </Suspense>
    );
  } else if (
    params.slug[1] === account_settings_urls.addBillings &&
    params.slug[0] === account_settings_urls.billing
  ) {
    return (
      <Suspense>
        <FormBilling isAdd />
      </Suspense>
    );
  } else if (
    params.slug[1] === account_settings_urls.editBillings &&
    params.slug[0] === account_settings_urls.billing
  ) {
    return (
      <Suspense>
        <FormBilling />
      </Suspense>
    );
  }
  switch (params.slug[0]) {
    case account_settings_urls.profile:
      return (
        <Suspense fallback={<LoadingLogo />}>
          {/* @ts-expect-error Server Component */}
          <ProfileComponent />
        </Suspense>
      );
    case account_settings_urls.shipping:
      return (
        <Suspense>
          <ListAddress />
        </Suspense>
      );

    case account_settings_urls.orderHistory:
      return (
        <Suspense>
          <TableOrder />
        </Suspense>
      );
    case account_settings_urls.billing:
      return (
        <Suspense fallback={<LoadingLogo />}>
          {/* @ts-expect-error Server Component */}
          <BillingList />
        </Suspense>
      );
    case account_settings_urls.settings:
      return (
        <Suspense>
          <FormSetting />
        </Suspense>
      );
    default:
      return <ListAddress />
  }
};

async function BillingList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <RequiredLoginComponent />
  }
  const data: Iuser[] = await getDataById(session.user.id);

  if ((data as any)?.error) {
    return <ErrorComponent />
  }
  return <ListCard dataProps={data[0]} />
}
