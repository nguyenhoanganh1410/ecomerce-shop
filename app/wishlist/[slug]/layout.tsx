import FollowerComponent from "@/components/home/follower-component";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Wishlist Page",
  description: "My Wishlist Page",
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
          <Suspense>{children}</Suspense>
        </main>
      </div>
      <FollowerComponent />
    </>
  );
}