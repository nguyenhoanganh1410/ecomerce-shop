import { DELETE_SUCCESS_MESSAGE, SOMETHING_WITH_WRONG } from "@/constants";
import { deleteProductInWishList } from "@/lib/wishlist";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadingDots from "../loadding/loading-dots";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateWishlist } from "@/redux/features/wishlist-slice";

export default function DeleteItemButton({ id }: { id: number }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlistRedux = useAppSelector((state) => state.wishlist.items);
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(async () => {
      const deleteResult = await deleteProductInWishList(id);
      if ((deleteResult as any)?.error) {
        toast(SOMETHING_WITH_WRONG);
        return;
      }
      const data = wishlistRedux.filter((item) => {
        return item.id !== id;
      });
      dispatch(updateWishlist(data));
      router.refresh();
    });
  };
  return (
    <div
      onClick={handleDelete}
      className="z-10 flex items-center justify-center bg-[#F8F8F8] opacity-40 rounded-full  w-7 h-7 ml-2 mb-[16px] cursor-pointer hover:bg-slate-500"
    >
      <div className="relative w-2 h-2">
        {isPending ? (
          <LoadingDots className="bg-black dark:bg-white" />
        ) : (
          <Image
            src="/delete.png"
            width={8}
            height={8}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}
