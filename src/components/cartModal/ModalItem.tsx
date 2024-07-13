import {
  DataState,
  decreassItem,
  increassItem,
  ProductType,
} from "@/redux/features/ProductSlice/productSlice";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";

const ModalItem = ({
  item,
  editable,
  dataState,
}: {
  dataState: DataState;
  item: ProductType;
  editable?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const increaseItemAmmount = (title: string) => {
    const isExist = dataState.data.find((item) => item.title == title);

    if (isExist) {
      if (item.amount == isExist.availability.quantity) {
        toast.error("You can not add more this itam");
      } else {
        dispatch(increassItem({ title }));
      }
    }
  };

  return (
    <div
      className={
        editable == false
          ? `grid items-center grid-cols-5 p-2 border rounded-md border-green-600`
          : `grid items-center grid-cols-6 p-2 border rounded-md border-green-600`
      }
    >
      <div className="w-12 h-12 rounded-lg bg-red-600 flex justify-center items-center"></div>
      <div className=" text-sm col-span-2 flex-col  flex justify-center items-center">
        <div className="font-semibold text-green-600">Product Name</div>
        <div>{item.title}</div>
      </div>
      <div className="text-sm flex flex-col justify-center items-center">
        <div>Quantity:</div>
        <div>{item.amount}</div>
      </div>
      <div className="flex text-sm justify-center flex-col items-center">
        <div>Price:</div>
        <div>{item.price}tk</div>
      </div>
      {editable == false ? (
        <div></div>
      ) : (
        <div className="text-sm flex flex-col justify-center items-center">
          <div>Modify:</div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => increaseItemAmmount(item.title)}
              className="hover:bg-green-700 bg-green-500 p-0 px-2 m-0 h-5 flex justify-center items-center"
            >
              +
            </Button>
            <Button
              onClick={() => dispatch(decreassItem({ title: item.title }))}
              className="p-0 hover:bg-red-700 bg-red-500 px-1 m-0 h-5 flex  justify-center items-center"
            >
              -
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalItem;
