/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalItem from "./ModalItem";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ModalBox = () => {
  const { dataState, product, totalPrice } = useAppSelector(
    (state) => state.productSlice
  );

  console.log(dataState);

  useEffect(() => {
    if (product.length > 0) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.preventDefault(); // Standard for modern browsers
        // Legacy for some browsers
        return message; // Legacy for others
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [product]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-black  absolute right-20 flex justify-center items-center  ">
          <div className=" flex justify-center items-center gap-1 border px-2 py-1 rounded-md border-green-600">
            <span className="font-medium text-green-600">
              {" "}
              {product.reduce((total, product) => total + product.amount, 0)}
            </span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-green-600 hover:scale-105 duration-300"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </div>
        </div>
      </DialogTrigger>{" "}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-600 font-bold">
            Your Cart
          </DialogTitle>
          <DialogDescription className="drop-shadow-sm">
            Check all item before place an order.
          </DialogDescription>
        </DialogHeader>
        {product.length !== 0 ? (
          <div className="flex custiomScroll flex-col gap-2 max-h-80 overflow-auto ">
            {product.map((item, i) => {
              return (
                <ModalItem
                  key={i}
                  dataState={dataState}
                  item={item}
                ></ModalItem>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-center text-xl text-red-500 font-bold">
              No Item Selected
            </p>
          </div>
        )}
        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <div className="bg-green-600 px-2 pt-1 h-8 rounded-md">
              <span className="font-semibold text-white ">Total:</span>
              <span className="font-semibold text-white"> {totalPrice}tk</span>
            </div>

            <Button
              disabled={product.length == 0}
              className="bg-green-600 h-8 hover:bg-green-700"
              type="submit"
            >
              <DialogClose asChild>
                <Link to="/checkout">Checkout</Link>
              </DialogClose>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBox;
