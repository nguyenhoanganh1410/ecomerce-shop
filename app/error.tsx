"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RequiredLoginComponent() {
  return (
    <div className="pt-16 pb-8 mx-auto max-w-5xl px-4 sm:pt-24 h-[60vh]">
      <div className="text-center">
        <h1 className="text-2xl tracking-tight font-extrabold sm:text-4xl pb-3 md:pb-0 md:text-4xl">
          Not Found
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          <span>Could not find requested resource.</span>
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href="/"
              className="w-full text-white flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md  bg-[#242424] hover:opacity-70"
            >
              Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
