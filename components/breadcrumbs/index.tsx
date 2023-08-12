import Link from "next/link";

interface IProps {
  data: string[];
  subLink?: string[];
}

export default function Breadcrumbs({ data, subLink }: IProps) {
  return (
    <nav className="flex py-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xs font-medium text-[#242424] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </Link>
          </div>
        </li>
        {subLink?.map((item: string) => {
          return (
            <li aria-current="page" key={item}>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
                {item === "shop" ? (
                  <Link
                    href={`/category/shop?type=${item}&page=1&limit=12`}
                    className="ml-1 capitalize text-xs font-medium text-[#242424] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    href={`/category/${item}?type=${item}&page=1&limit=12`}
                    className="ml-1 capitalize text-xs font-medium text-[#242424] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    {item}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
        {data?.map((item: string) => {
          return (
            <li aria-current="page" key={item}>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
                <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2 dark:text-gray-400 capitalize">
                  {item}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
