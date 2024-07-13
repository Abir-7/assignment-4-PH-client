import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CarouselMain from "./CarouselMain";
import ImageGallery from "./ImageGallery";
import PopulerItem from "./PopulerItem";
import ShopByCategory from "./ShopByCategory";
import { useEffect } from "react";
import { resetSearchFilterOption } from "@/redux/features/ProductSlice/productSlice";
import { Photo } from "react-photo-album";

const Home = () => {
  const { dataState } = useAppSelector((state) => state.productSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetSearchFilterOption());
  }, [dispatch]);

  function getRandomHeight(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
  // Convert items to the desired format with random heights
  const photos: Photo[] = dataState.data
    .map((item) => ({
      src: item.image,
      width: 1080, // Fixed width, adjust as needed
      height: getRandomHeight(600, 1200), // Random height between 600 and 1200
    }))
    .map(({ src, width, height }) => ({
      src,
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => ({
        src,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    }));

  console.log(photos, "gg");
  return (
    <div>
      <CarouselMain></CarouselMain>

      <ShopByCategory
        actionText="home"
        products={dataState.data}
      ></ShopByCategory>
      <PopulerItem products={dataState.data}></PopulerItem>
      <ImageGallery photos={photos}></ImageGallery>
    </div>
  );
};

export default Home;
