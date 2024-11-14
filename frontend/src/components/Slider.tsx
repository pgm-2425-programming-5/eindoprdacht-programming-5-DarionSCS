import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ sliderList }) {
  return (
    <Carousel>
      <CarouselContent>
        {Array.isArray(sliderList.data) &&
          sliderList.data.map((slider) => {
            const imageUrl =
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              slider?.image[0]?.formats?.large?.url;

            return (
              <CarouselItem key={slider.id}>
                <Image
                  src={imageUrl}
                  alt={slider.name}
                  width={1920}
                  height={1080}
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                />
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-opacity-75 transition" />
      <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-opacity-75 transition" />
    </Carousel>
  );
}

export default Slider;
