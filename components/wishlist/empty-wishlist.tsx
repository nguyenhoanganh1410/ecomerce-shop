import Link from "next/link";

export default function EmptyWishListComponent() {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="flex flex-col mt-4 justify-center items-center max-w-[650px]">
        <p aria-hidden="true" className="mt-2 mb-2 text-2xl font-bold ">
          Your Wishlist is empty
        </p>

        <p aria-hidden="true" className="text-[14px] font-normal text-center">
          Add items to your list by shopping the site.
        </p>
        <p aria-hidden="true" className="text-[14px] font-normal text-center">
          Then, share your list so friends, family, and followers know what you
          love.
        </p>
        <Link
          href="/"
          className="bg-[#242424] text-sm font-semibold w-[196px] h-[48px] flex justify-center items-center mt-10 text-white py-2 px-4 rounded"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
