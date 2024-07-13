import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "../ui/button";
import { IProduct } from "@/interface/product.interface";
import { addItemToCart } from "@/redux/features/ProductSlice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ItemCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const { product: productFromRedux } = useAppSelector(
    (state) => state.productSlice
  );

  const addToCart = (item: IProduct) => {
    const { title, price, availability, _id } = item;
    dispatch(
      addItemToCart({
        id: _id,
        title,
        price,
        quantity: availability.quantity,
        availability: availability.status,
      })
    );
  };

  const addProductTocart = (product: IProduct) => {
    const isItemExist = productFromRedux.find(
      (item) => item.title == product.title
    );

    if (product.availability.quantity <= 0) {
      toast.error("Item Not Available");
    } else if (isItemExist) {
      if (isItemExist.amount >= product.availability.quantity) {
        toast.error("You can not add more.");
      } else {
        toast.success("Item added to cart.");
        addToCart(product);
      }
    } else {
      toast.success("Item added to cart.");
      addToCart(product);
    }
  };

  return (
    <Card className="max-w-72 min-w-60 border-2 border-green-600 hover:bg-green-50">
      <CardHeader>
        <img
          className="rounded-md object-cover h-48"
          src={product.image}
          alt=""
        />
      </CardHeader>
      <CardContent className="space-y-1">
        <CardTitle>
          <Link to={`/product-details/${product._id}`}>{product.title}</Link>
        </CardTitle>
        <div className="space-y-1">
          <p>
            <span className="font-bold">Category: </span>
            <span>{product.category}</span>
          </p>
          <div className="flex items-center justify-between">
            <p>
              <span className="font-semibold">Price: </span>
              <span className="text-green-500 font-medium">
                {product.price}tk
              </span>
            </p>
            <div>
              <Rating
                style={{ maxWidth: 80 }}
                value={parseFloat(product.rating)}
                readOnly
              />
            </div>
          </div>

          <p className=" flex justify-start ">
            <span className="font-semibold me-1">Quantity: </span>
            <span className="text-green-500 w-full font-medium flex justify-between">
              <span> {product.availability.quantity} </span>
              <span>{product.availability.status}</span>
            </span>
          </p>
          <div>
            <Button
              onClick={() => addProductTocart(product)}
              className="bg-green-600 hover:bg-green-700 h-8 w-full flex justify-center items-center px-2"
            >
              <span className="me-2">Add Cart </span>
              <span className="">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
              </span>
              <span className="">+</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
