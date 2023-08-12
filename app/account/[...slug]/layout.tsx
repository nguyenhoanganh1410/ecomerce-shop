import React from "react";
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F8F8F8] pb-8 md:pb-16">
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[74px]">
          {children}
        </main>
      </div>
    </>
  );
}
