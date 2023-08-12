"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@/utils/types/product";
import "./style.css";
interface IProps {
  data: Image[];
  setMobileImage: any;
}

export default function CarouselImages({ data, setMobileImage }: IProps) {
  var settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          arrows: true,
          slidesToShow: data.length < 3 ? data.length : 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: data.length < 3 ? data.length : 3,
        },
      },
    ],
  };
  const handleClick = (image: any) => {
    setMobileImage(image?.url);
  };

  return (
    <Slider {...settings}>
      {data.map((image: Image, idx: number) => {
        return (
          <div
            className={`relative w-4 h-[100%] bg-white ${
              data.length <= 3 ? "" : "ml-2 mr-2"
            }`}
            key={idx}
            onClick={() => handleClick(image)}
          >
            <img
              src={image?.url}
              alt=""
              className="h-full w-full object-contain pr-2"
            />
          </div>
        );
      })}
    </Slider>
  );
}
