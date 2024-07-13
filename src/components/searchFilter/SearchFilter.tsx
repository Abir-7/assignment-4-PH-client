import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import FilterButton from "./FilterButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchFilter } from "@/redux/features/ProductSlice/productSlice";
import { useNavigate } from "react-router-dom";

const SearchFilter = ({ actionText }: { actionText?: string }) => {
  const { searchFilter } = useAppSelector((state) => state.productSlice);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    dispatch(setSearchFilter(data.searchTerm));
    navigate("/products");
  };

  return (
    <div className="grid  md:grid-cols-6 gap-4 container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={actionText == "home" ? "md:col-span-6" : "md:col-span-4"}
      >
        <div className="flex items-center">
          <Input
            defaultValue={searchFilter || ""}
            {...register("searchTerm", { required: true })}
            className={`h-7 focus:outline-green-600 border ${
              errors.searchTerm ? "border-red-600" : "border-green-600"
            }`}
          />

          <Button
            type="submit"
            className="h-7 px-3 bg-green-600 ml-2 hover:bg-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </div>
      </form>
      <div className="md:col-span-2 md:ms-auto  ">
        <div className="flex gap-10">
          <div className="">
            {actionText !== "home" && <FilterButton actionText="category" />}
          </div>
          <div className="">
            {actionText !== "home" && <FilterButton actionText="other" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
