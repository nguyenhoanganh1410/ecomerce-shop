"use client";
import { Fragment, useEffect, useState } from "react";
import { Transition, Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import ArrowIcon from "../icons/arrow";
import { IOption } from "@/utils/type";

interface IPropsSelect {
  label?: string;
  options: IOption[];
  hasInput?: boolean;
  limitStock?: number;
  onChangeLabel?: (value?: string) => void;
  onChange: (value: any) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectComponent({
  onChangeLabel,
  onChange,
  label,
  options,
  hasInput,
  limitStock
}: IPropsSelect) {
  const [selected, setSelected] = useState<IOption>();
  const handleChange = (value: IOption) => {
    if (!value.inStock) return;
    setSelected(value);
    if (onChangeLabel) {
      onChangeLabel();
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Combobox value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className="flex items-center">
          <div className="relative h-12 w-full mt-2">
            {hasInput ? (
              <div className="relative w-full cursor-default overflow-hidden rounded-md bg-[#F8F8F8] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-[1px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <Combobox.Input
                  className="w-full border-none h-[46px] py-2 pl-3 xl:pr-10 text-sm leading-5 text-gray-900 focus:ring-0 bg-[#F8F8F8]"
                  displayValue={(value: IOption) => value.name}
                  onChange={(event) =>
                    handleChange({
                      id: 111,
                      name: event.target.value,
                      inStock: true,
                    })
                  }
                  placeholder={label}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ArrowIcon />
                </Combobox.Button>
              </div>
            ) : (
              <Combobox.Button className="relative w-full h-full cursor-default rounded-md bg-[#F8F8F8] py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span
                    className={`block truncate text-xs font-normal text-black-slate ${
                      label ? "" : "capitalize"
                    }`}
                  >
                    {label || selected?.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ArrowIcon />
                </span>
              </Combobox.Button>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-40 md:max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options &&  options.slice(0, limitStock !== -1 ? limitStock : options.length).map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-indigo-600 text-white text-xs"
                            : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9 text-xs",
                          !person.inStock ? "cursor-not-allowed opacity-80" : ""
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-between">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate capitalize"
                              )}
                            >
                              {person.name}
                            </span>
                            {!person.inStock ? (
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                out-stock
                              </span>
                            ) : null}
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4 text-xs"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Combobox>
  );
}
