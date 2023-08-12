import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
interface ISearchProps {
  callback: (status: boolean) => void;
}

export default function SearchInput({ callback }: ISearchProps) {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [textSearch, setTextSearch] = useState<string>("");
  const [loadding, setLoadding] = useState<boolean>(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    setLoadding(true);
    router.push(`/search-result?text=${encodeURIComponent(textSearch)}&type=shop&page=1&limit=12`);
    setTimeout(() => {
      callback(false);
      setLoadding(false);
    }, 500);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isMenuOpen &&
        ref.current &&
        !(ref.current as any).contains(e.target)
      ) {
        callback(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (!isMenuOpen) return null;

  return (
    <div
      ref={ref}
      className="shadow-lg text-gray-600 z-50 bg-white h-36 fixed top-0 left-0 right-0 flex justify-center items-center"
    >
      <div className="pt-2 text-gray-600 w-4/5 flex flex-col">
        <p className="mb-4">What are you Looking for ?</p>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            type="text"
            onChange={(e) => setTextSearch(e.target.value)}
            id="default-search"
            className="block w-full pr-24 h-[44px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
          <button
            disabled={false}
            onClick={() => handleSearch()}
            type="button"
            className="text-white absolute right-[5px] bottom-[4px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loadding ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
            ) : null}
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
