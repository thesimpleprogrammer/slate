"use client";

import Image from "next/image";
import person1 from "../../../public/client-1.jpg";
import person2 from "../../../public/client-2.jpg";
import person3 from "../../../public/client-3.jpg";
import person4 from "../../../public/client-4.jpg";
import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const people = [
    {
      name: "Tom E. Myers",
      picture: person1,
      position: "CEO",
      content:
        "Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus.",
    },
    {
      name: "Marie Roberts",
      picture: person2,
      position: "Financial Manager",
      content:
        "Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus. Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus.",
    },
    {
      name: "Joy Sander",
      picture: person3,
      position: "Operations Manager",
      content:
        "Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus.",
    },
    {
      name: "Dave Jeffery",
      picture: person4,
      position: "Marketing Executive",
      content:
        "Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus. Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus. Nunc fringilla est at elit varius, vitae molestie leo porttitor. Nulla facilisi. Donec augue purus.",
    },
    // {name: "", picture: "", position: "", content: ""},
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-full pt-16 pb-24 px-8 lg:px-32 text-center lg:text-left flex flex-col gap-3 text-[#535353]">
      <div className="font-semibold text-white">TESTIMONIES</div>
      <h1 className="text-3xl mb-16 text-white">Happy Clients & Feedbacks</h1>
      <div className="">
        <Slider {...settings}>
          {people.map((person, index) => (
            <div
              key={index}
              className="relative flex flex-col w-1/3 py-8 px-10 rounded-md bg-white text-left"
            >
              <div className="absolute top-0 -translate-y-[50%] w-10 h-10 rounded-full bg-[#7DBF29] Z-10 flex justify-center items-center">
                <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" fill="#FFFFFF"/>
                </svg>
              </div>
              <p className="w-full mb-5">{person.content}</p>
              <div className="flex justify-between items-center w-full">
                <div className="relative rounded-full w-12 h-12 overflow-clip">
                  <Image
                    className="absolute top-0 left-0 w-full h-full"
                    src={person.picture}
                    // width={1000}
                    // height={1000}
                    layout="fill"
                    objectFit="cover"
                    alt="profile picture"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-black text-2xl">{person.name}</h1>
                  <h3>{person.position}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}