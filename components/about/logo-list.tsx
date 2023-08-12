"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Image_Url } from "@/utils/imageUrl";
import "../carousel/style.css";
interface IProps {}
export default function LogoListComponent({}: IProps) {
  var settings = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          arrows: true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="relative w-24 h-24 cursor-pointer hover:opacity-55">
        <Image
          src={Image_Url.about_logo_retro}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    </Slider>
  );
}
