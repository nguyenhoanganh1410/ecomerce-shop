import FollowerComponent from "@/components/home/follower-component";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const metadata = {
  title: "Checkout Page",
  description: "Generated by create next app",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F8F8F8] pb-8 md:pb-16 pt:8 md:pt-12">
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
          <h1 className="text-[40px] font-semibold tracking-tight text-[#212529] sm:text-[40px] mb-3 md:mb-11">
            Checkout
          </h1>
          <Link
            href="/cart"
            className="text-xs font-semibold tracking-tight text-[#9F7D83] flex"
          >
            <div className="relative w-6 h-6 mr-[4px]">
              <Image
                src="/arrow-left.png"
                fill
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <span className="pt-[3px]"> Edit Shopping Bag</span>
          </Link>
          {children}
        </main>
      </div>

      <FollowerComponent />
    </>
  );
}