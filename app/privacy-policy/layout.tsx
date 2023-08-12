import Breadcrumbs from "@/components/breadcrumbs";
import FollowerComponent from "@/components/home/follower-component";
import React from "react";

export const metadata = {
  title: "Privacy Policy Page",
  description: "Privacy Policy Page",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F8F8F8] pb-8 md:pb-16">
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
          <div className="max-w-[960px]">
            <Breadcrumbs data={["Privacy Policy"]} />
            <h1 className="text-3xl font-bold tracking-tight text-[#212529] sm:text-[48px] mb-3 md:mb-4 mt-5">
              Privacy Policy
            </h1>
            <p className="text-base font-normal text-[#868E96]">
              Effective date: November 22, 2019
            </p>
            {children}
          </div>
        </main>
      </div>

      <FollowerComponent />
    </>
  );
}
