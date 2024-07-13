import ModalItem from "@/components/cartModal/ModalItem";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailsForm from "./OrderDetailsForm";

const CheckoutPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { dataState, product, totalPrice } = useAppSelector(
    (state) => state.productSlice
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (product.length === 0) {
      navigate("/");
    }
  }, [product, navigate]);
  console.log(product.map((item) => item.title));
  console.log(product, totalPrice);
  return (
    <div>
      <div className="flex custiomScroll flex-col gap-2 max-h-80 overflow-auto ">
        {product.map((item, i) => {
          return (
            <ModalItem
              dataState={dataState}
              editable={false}
              key={i}
              item={item}
            ></ModalItem>
          );
        })}
      </div>
      <p className="flex mt-3 justify-center sm:justify-start  sm:ms-5 items-center gap-2">
        <span className="text-xl font-bold">Total Price: </span>
        <span className="text-2xl text-green-600 font-bold">
          {totalPrice}tk
        </span>
      </p>

      <h1 className="text-2xl text-green-600 font-bold text-center">
        Select Option
      </h1>

      <div className="flex flex-wrap mt-3 gap-4 justify-center items-center">
        <div
          onClick={() => setSelectedOption("stripe")}
          className={`bg-green-600 text-xl font-semibold text-white px-4 py-2 rounded-md text-nowrap ${
            selectedOption === "stripe" ? "bg-green-700" : ""
          }`}
        >
          Stipe Payment
        </div>
        <div
          onClick={() => setSelectedOption("cod")}
          className={`bg-green-600 text-nowrap text-xl font-semibold text-white px-4 py-2 rounded-md ${
            selectedOption === "cod" ? "bg-green-700" : ""
          }`}
        >
          Cash On Delivary
        </div>
      </div>
      {selectedOption == "cod" && (
        <OrderDetailsForm
          products={product.map((item) => ({
            id: item.id,
            quantity: item.amount,
          }))}
          totalPrice={totalPrice}
          setSelectedOption={setSelectedOption}
        ></OrderDetailsForm>
      )}
      {selectedOption == "stripe" && (
        <div className="text-center text-2xl mt-4 text-red-500">
          Stripe Not Intrigated Yet
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
