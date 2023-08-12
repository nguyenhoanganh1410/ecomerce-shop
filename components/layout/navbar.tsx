"use client";
import React, { Fragment } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import LogoIcon from "@/components/icons/logo";
import LogoText from "@/components/icons/log-text";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "../home/user-dropdown";
import useNavbarHook from "../../hooks/useNavbarHook";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "../search-input";
import { IRootCategory } from "@/utils/type";
import { Image_Url } from "@/utils/imageUrl";
import { golobalUrl } from "@/utils/globalUrl";
import { navigation } from "@/utils/data";

export default function Navbar() {
  const {
    setMobileMenuOpen,
    setShowSearch,
    handleShowSearch,
    handleLogin,
    isAboutPage,
    wishlistRedux,
    mobileMenuOpen,
    pathname,
    searchQuery,
    showSearch,
    authenticated,
    productCart,
  } = useNavbarHook();
  const { data } = useSession();

  return (
    <>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {authenticated ? (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-4">
                    <button className="-m-2 block p-2 font-medium text-gray-900">
                      Hi, {data?.user?.name || "username"}
                    </button>
                  </div>
                ) : null}
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <Link
                      href={
                        `category/${page.slug}` +
                        `?type=${page.name.toLowerCase()}${searchQuery}`
                      }
                      className={
                        pathname
                          ? "flex items-center text-sm font-medium text-textColor capitalize"
                          : "flex text-textColor items-center text-sm font-medium capitalize"
                      }
                      key={Math.random()}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    {authenticated ? (
                      <React.Fragment>
                        <Link
                          href="/account/profile"
                          className="-m-2 block p-2 font-medium text-gray-900 mb-2"
                        >
                          Account Setting
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Log out
                        </button>
                      </React.Fragment>
                    ) : (
                      <button
                        onClick={() => handleLogin()}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Log in
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Hero section */}
      <div
        className={
          pathname || isAboutPage
            ? "relative bg-[#242424]"
            : "relative bg-transparent"
        }
      >
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {/* Hero image */}
        </div>
        <div
          aria-hidden="true"
          className={
            pathname || isAboutPage ? "relative bg-[#242424]" : "relative"
          }
        />
        <header
          className={
            pathname
              ? "relative z-10 h-[680px] bg-[url('/logo-header.png')] bg-no-repeat bg-cover bg-center"
              : "relative z-10"
          }
        >
          <nav aria-label="Top" className="relative">
            <div
              className={
                pathname
                  ? "bg-transparent lg:bg-[#121212]"
                  : isAboutPage
                  ? "bg-transparent"
                  : "bg-[#F8F8F8] border-b border-gray-300"
              }
            >
              <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-5">
                <div>
                  <div className="flex h-16 items-center justify-between">
                    <Link
                      href="/"
                      className="absolute left-[10%] md:scale-100 scale-75 md:left-1/2 md:-translate-x-1/3 lg:-translate-x-0 lg:static flex lg:flex lg:flex-1 lg:items-center cursor-pointer"
                    >
                      <div className="mr-3">
                        <span className="sr-only">Your Company</span>
                        <LogoIcon color="#9F7D83" />
                      </div>
                      {pathname || isAboutPage ? (
                        <LogoText color="white" />
                      ) : (
                        <LogoText color="#242424" />
                      )}
                    </Link>

                    <div className="hidden h-full lg:flex">
                      <Popover.Group className="inset-x-0 bottom-0 px-4">
                        <div className="flex h-full justify-center space-x-8">
                          {navigation.pages.map((page) => (
                            <Link
                              href={
                                `category/${page.slug}` +
                                `?type=${page.name.toLowerCase()}${searchQuery}`
                              }
                              className={
                                pathname || isAboutPage
                                  ? "flex items-center text-sm font-medium text-white capitalize"
                                  : "flex text-textColor items-center text-sm font-medium capitalize"
                              }
                              key={Math.random()}
                            >
                              {page.name}
                            </Link>
                          ))}
                        </div>
                      </Popover.Group>
                    </div>
                    {pathname || isAboutPage ? (
                      <>
                        <div className="flex flex-1 items-center lg:hidden cursor-pointer">
                          <button
                            type="button"
                            className="-ml-2 p-2 text-white"
                            onClick={() => setMobileMenuOpen(true)}
                          >
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex flex-1 items-center justify-end cursor-pointer">
                          <div
                            className="w-10 h-10 flex items-center justify-center mr-1"
                            onClick={() => handleShowSearch()}
                          >
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              color="white"
                            />
                          </div>
                          <div
                            className={`${
                              pathname && authenticated ? "bg-white" : ""
                            } hidden lg:flex items-center justify-center mr-1 cursor-pointer rounded-full w-[36px] h-[36px]`}
                          >
                            <UserDropdown isHomePage={pathname} />
                          </div>
                          <Link
                            href={`/wishlist/${data?.user.id}`}
                            className={`${
                              pathname ? "" : "bg-[#F5ECEA]"
                            } relative flex items-center justify-center mr-1 cursor-pointer rounded-full hover:opacity-75 w-[36px] h-[36px]`}
                          >
                            {wishlistRedux.length != 0 ? (
                              <div
                                className={`${
                                  pathname
                                    ? "bg-[#9F7D83] lg:bg-white"
                                    : "bg-[#9F7D83]"
                                } w-5 h-5 absolute right-0 bottom-0 flex justify-center items-center rounded-full`}
                              >
                                <span
                                  className={`${
                                    pathname
                                      ? "text-white lg:text-black"
                                      : "text-white"
                                  } text-[10px] font-medium`}
                                >
                                  {wishlistRedux.length}
                                </span>
                              </div>
                            ) : null}
                            <HeartIcon
                              className="h-6 w-6"
                              color={pathname ? "white" : "black"}
                            />
                          </Link>
                          <Link
                            href={golobalUrl.cart}
                            className={`${
                              pathname
                                ? "bg-[#F5ECEA] lg:bg-transparent"
                                : "bg-[#F5ECEA]"
                            } relative flex items-center justify-center mr-1 cursor-pointer rounded-full hover:opacity-75 w-[36px] h-[36px]`}
                          >
                            {productCart.length != 0 ? (
                              <div
                                className={`${
                                  pathname
                                    ? "bg-[#9F7D83] lg:bg-white"
                                    : "bg-[#9F7D83]"
                                } w-5 h-5 absolute right-0 bottom-0 flex justify-center items-center rounded-full`}
                              >
                                <span
                                  className={`${
                                    pathname
                                      ? "text-white lg:text-black"
                                      : "text-white"
                                  } text-[10px] font-medium`}
                                >
                                  {productCart.length}
                                </span>
                              </div>
                            ) : null}
                            <div className="hidden lg:block">
                              <ShoppingBagIcon
                                className="h-6 w-6"
                                color={pathname ? "white" : "black"}
                              />
                            </div>
                            <div className="black lg:hidden">
                              <ShoppingBagIcon
                                className="h-6 w-6"
                                color={pathname ? "black" : "black"}
                              />
                            </div>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-1 items-center lg:hidden cursor-pointer">
                          <button
                            type="button"
                            className="-ml-2 p-2 text-black"
                            onClick={() => setMobileMenuOpen(true)}
                          >
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex flex-1 items-center justify-end cursor-pointer">
                          <div
                            className="w-10 h-10 flex items-center justify-center mr-1"
                            onClick={() => handleShowSearch()}
                          >
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              color="black"
                            />
                          </div>
                          <div className="hidden lg:flex items-center justify-center mr-1 cursor-pointer bg-white rounded-full w-[36px] h-[36px]">
                            <UserDropdown />
                          </div>
                          <Link
                            href={`/wishlist/${data?.user.id}`}
                            className="relative flex items-center justify-center mr-1 cursor-pointer bg-[#F5ECEA] rounded-full hover:opacity-75 w-[36px] h-[36px]"
                          >
                            {wishlistRedux.length != 0 ? (
                              <div className="w-5 h-5 absolute right-0 bottom-0 flex justify-center items-center bg-[#9F7D83] rounded-full">
                                <span className="text-[10px] font-medium text-white">
                                  {wishlistRedux.length}
                                </span>
                              </div>
                            ) : null}
                            <HeartIcon className="h-6 w-6" color="black" />
                          </Link>
                          <Link
                            href={golobalUrl.cart}
                            className="relative flex items-center justify-center mr-1 cursor-pointer bg-[#F5ECEA] rounded-full hover:opacity-75 w-[36px] h-[36px]"
                          >
                            {productCart.length != 0 ? (
                              <div className="w-5 h-5 absolute right-0 bottom-0 flex justify-center items-center bg-[#9F7D83] rounded-full">
                                <span className="text-[10px] font-medium text-white">
                                  {productCart.length}
                                </span>
                              </div>
                            ) : null}
                            <ShoppingBagIcon
                              className="h-6 w-6"
                              color="black"
                            />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {pathname ? (
            <div className="scale-[0.3] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.8] xl:scale-100 relative w-[978px] h-[220px] position bottom-[-74.4%] left-[50%] translate-x-[-50%]">
              <Image
                src={Image_Url.sigma}
                fill
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
        </header>
        {showSearch ? <SearchInput callback={setShowSearch} /> : null}
      </div>
    </>
  );
}
