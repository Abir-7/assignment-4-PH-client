import AddEditProduct from "@/components/addProductModal/AddEditProduct";
import ProductTable from "@/components/table/ProductTable";
import { resetSearchFilterOption } from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

const ItemManagemantPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetSearchFilterOption());
  }, [dispatch]);

  return (
    <div className="w-full min-h-[90vh]">
      <div>
        <AddEditProduct actionText="post" />
      </div>
      <div>
        <p className="text-2xl text-green-600 font-bold text-center">
          Product List
        </p>
        <ProductTable></ProductTable>
      </div>
    </div>
  );
};

export default ItemManagemantPage;
