import FollowerComponent from "@/components/home/follower-component";
import React, { Suspense } from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F8F8F8] pb-8 md:pb-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
          <Suspense>{children}</Suspense>
        </div>
      </div>

      <FollowerComponent />
    </>
  );
}
