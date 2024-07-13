import ItemCard from "@/components/card/ItemCard";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchFilter from "@/components/searchFilter/SearchFilter";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const ProductPage = () => {
  const { dataState: products } = useAppSelector((state) => state.productSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = products.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" min-h-[80vh]">
      <div className="my-4">
        <SearchFilter></SearchFilter>
      </div>
      {products.isLoading ? (
        <div className="h-[80vh] text-2xl flex items-center justify-center text-green-600">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col justify-between min-h-[80vh] ">
          <div className="flex justify-center">
            <div className=" gap-5 mb-10  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  ">
              {currentData?.map((product, i) => {
                return <ItemCard key={i} product={product}></ItemCard>;
              })}
            </div>
          </div>
          <div className="">
            <PaginationCustom
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></PaginationCustom>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
