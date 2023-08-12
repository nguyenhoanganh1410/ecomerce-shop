import TabsComponent from "@/components/account/tabs";
import TabsMobile from "@/components/account/tabs-mobile";
import React, { Suspense } from "react";
import AccountIndex from "@/components/account";
import { accountSetting } from "@/utils/data";

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { color?: string };
}) {
  return (
    <React.Fragment>
      {params.slug[1] ? null : (
        <>
          <div className="relative flex justify-between items-baseline flex-col sm:flex-row">
            <h1 className="text-[32px] md:text-5xl font-bold tracking-tight text-[#242424] sm:text-[40px] md:mb-11 pt-[48px] md:pt-[100px]">
              Account
            </h1>
            <div className="md:hidden flex mt-8 w-full sm:w-fit sm:mt-0">
              <Suspense>
                <TabsMobile slug={params.slug[0]} url="account" data={accountSetting}/>
              </Suspense>
            </div>
          </div>
          <Suspense>
            <TabsComponent slug={params.slug[0]} />
          </Suspense>
        </>
      )}
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <AccountIndex params={params} />
      </Suspense>
    </React.Fragment>
  );
}
