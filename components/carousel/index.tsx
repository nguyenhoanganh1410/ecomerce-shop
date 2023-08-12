"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { checkInStockProduct } from "@/utils/product-available";
import CardProductCarousel from "./card-product-carousel";
import { IProductRoot } from "@/utils/types/product";
interface IProps {
  relatedProducts: IProductRoot[];
}
export default function CarouselComponent({ relatedProducts }: IProps) {
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
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  if (relatedProducts.length <= 4) {
    return (
      <>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:gap-y-10 sm:grid-cols-3 xl:grid-cols-4 lg:col-span-3 lg:gap-x-4 transition-all">
          {relatedProducts.map((product) => {
            const inStock = checkInStockProduct(product);
            return <CardProductCarousel key={Math.random()} product={product} inStock={inStock} />;
          })}
        </div>
      </>
    );
  }
  return (
    <Slider {...settings}>
      {relatedProducts.map((product) => {
        const inStock = checkInStockProduct(product);
        return <CardProductCarousel key={Math.random()} product={product} inStock={inStock} />;
      })}
    </Slider>
  );
}
