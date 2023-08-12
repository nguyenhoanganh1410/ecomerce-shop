import Image from "next/image";
export interface FormInput {
  type?: string;
  label: string;
  fontSize?: string;
  textColor?: string;
  iconUrl?: string;
  marginTop?: string;
  isImportant?: boolean;
  valid?: boolean;
  width?: string;
  padding?: string;
  maxHeight?: string;
  cssOptions?: string;
  handleChange?: (e: any) => void;
  name?: string;
  value?: string;
  isError?: string;
  bottomPositionError?: boolean;
  inputId?: string;
  clasName?: string;
  isTextArea?: boolean;
  successMessage?: string;
  urlImage?: string;
  disabled?: boolean;
  placeholder?: string;
  maxlength?: number
}

const FormInput = ({
  type,
  label,
  isImportant,
  handleChange,
  name,
  isError,
  successMessage,
  clasName,
  isTextArea,
  urlImage,
  value,
  placeholder,
  disabled,
  maxlength
}: FormInput) => {
  return (
    <div className={clasName}>
      <p className="flex justify-between items-center">
        <span className="block text-sm font-semibold leading-6 text-gray-900">
          {label}{" "}
          {isImportant ? <span className="text-[#E01A2B]">*</span> : null}
        </span>
        {isTextArea ? (
          <span className="text-xs text-[#242424]">{`${
            value?.replace(/\n/g, '')?.length || 0
          }/140`}</span>
        ) : (
          <span></span>
        )}
      </p>
      <div className="mt-2.5">
        {isTextArea ? (
          <textarea
            name={name}
            rows={6}
            onChange={handleChange}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={value}
          />
        ) : (
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-3">
              {urlImage ? (
                <div className="relative w-4 h-4 mr-1">
                  <Image
                    src={urlImage}
                    width={16}
                    height={16}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : null}
            </div>
            <input
              type={type || "text"}
              onChange={handleChange}
              name={name}
              disabled={disabled}
              value={value}
              placeholder={placeholder}
              maxLength={maxlength}
              className={`${
                urlImage ? "pl-8" : "pl-4"
              } ${disabled ? "bg-[#e5e7eb]" : ""} block w-full h-[50px] rounded-md border-0 py-1.5 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
          </div>
        )}
        {isError ? (
          <div className="mt-2 flex items-center">
            <div className="relative w-4 h-4 mr-1">
              <Image
                src="/error-icon.png"
                width={16}
                height={16}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <span className="text-sm font-medium text-[#E01A2B] capitalize">
              {isError}
            </span>
          </div>
        ) : (
          <></>
        )}
        {successMessage ? (
          <div className="mt-2 flex items-center">
            <div className="relative w-4 h-4 mr-1">
              <Image
                src="/check-icon.png"
                width={16}
                height={16}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-sm font-medium text-[#4AAD7E]">
              This field is reqied
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export { FormInput };
