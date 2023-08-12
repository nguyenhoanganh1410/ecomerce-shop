"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import ArrowIcon from "../icons/arrow";
import { usePathname, useRouter } from "next/navigation";
import { optionsSort } from "@/utils/data";

interface IProps {
  searchParams: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function MyCombobox({ searchParams }: IProps) {
  const [selected, setSelected] = useState(optionsSort[+searchParams?.sort || 0]);
  const pathName = usePathname();
  const route = useRouter();

  const handleChange = (value: { id: number; name: string }) => {
    searchParams.sort = value.id.toString();
    searchParams.page = 1;
    const queryString = Object.keys(searchParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`
      )
      .join("&");
    route.push(`${pathName + `?${queryString}`}`);
    setSelected(value);
  };
  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className="flex items-center w-max">
          <Listbox.Label className="text-xs block font-semibold leading-6 text-textColor mr-2">
            Sort by:
          </Listbox.Label>
          <div className="relative w-[160px] md:w-[190px]">
            <Listbox.Button className="relative w-full h-[32px] cursor-default rounded-md bg-[#F8F8F8] py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="block truncate text-xs">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ArrowIcon />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-[11] mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {optionsSort.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-indigo-600 text-white text-xs"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9 text-xs"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4 text-xs"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
