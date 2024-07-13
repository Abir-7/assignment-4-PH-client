import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import tree1 from ".././../assets/tree/tree1.png";
import tree2 from ".././../assets/tree/tree2.jpg";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const img = [tree2, tree1];
const text = [
  <h1 className="font-semibold text-4xl sm:text-6xl lg:text-7xl text-center text-white">
    Summer sale is here
  </h1>,
  <h1 className="font-semibold text-4xl sm:text-6xl lg:text-7xl text-center text-white">
    Happiness Is Enjoying <span className="text-nowrap">Floral Bliss</span>{" "}
  </h1>,
];
const CarouselMain = () => {
  return (
    <Carousel className="w-full  ">
      <CarouselContent className=" ">
        {Array.from({ length: img.length }).map((_, index) => (
          <CarouselItem key={index} className="">
            <div className=" ">
              <Card className="p-4 bg-green-500 ">
                <CardContent
                  style={{
                    backgroundImage: `url(${img[index]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "  center",
                  }}
                  className="flex items-center overflow-hidden  h-[500px] "
                >
                  <div className=" space-y-2 lg:space-y-4 w-full mx-2 md:mx-20">
                    {text[index]}

                    <h1 className=" font-bold text-center text-xl sm:text-2xl  text-yellow-400">
                      Create Your Favorite Collection Now!
                    </h1>
                    <div className="flex justify-center ">
                      <Button className="mt-2 hover:bg-green-700 bg-green-600">
                        <Link to="/products">Shop Now</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselMain;
