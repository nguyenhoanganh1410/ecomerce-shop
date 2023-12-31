"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ICountry } from "@/utils/type";

interface IProps {
  data: any;
  onChange: any;
  defaultValue?: any;
  optionChange?: any;
  disabled?: boolean
}

export default function SelectData({
  data,
  onChange,
  defaultValue,
  optionChange,
  disabled
}: IProps) {
  const [dataState, setDataState] = useState(data);
  const [selected, setSelected] = useState<ICountry>();
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? data
      : data.filter((person: any) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  useEffect(() => {
    if (query.length === 0) {
      setDataState(data);
    } else {
      const newData = data.filter((person: any) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
      setDataState(newData);
    }
  }, [query]);

  const handleChange = (value: any) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
    if (optionChange) {
      optionChange(null);
    }
  };

  useEffect(() => {
    setDataState(data);
  }, [data]);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);
  return (
    <Combobox value={selected} disabled={disabled} onChange={handleChange}>
      <div className="relative mt-1 pt-[6px]">
        <div className={`${disabled ? "bg-[#e5e7eb]" : "bg-white "} relative w-full pl-[2px] pr-1 flex items-center ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 cursor-default overflow-hidden rounded-lg text-left h-[53px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}>
          <Combobox.Input
            className={`${disabled ? "bg-[#e5e7eb]" : "bg-white "} w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0`}
            displayValue={() => selected?.name || ""}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              <>
                {dataState.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  dataState &&
                  dataState.map((person: any) => (
                    <Combobox.Option
                      key={person.isoCode}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
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
                  ))
                )}
              </>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
