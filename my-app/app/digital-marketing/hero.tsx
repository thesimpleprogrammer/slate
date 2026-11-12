"use client";

import Image from "next/image";
import jeanImage from "../../public/denim-dark.jpg";
import ImageLoop from "./src/component/ImageLoop";
import { useState } from "react";
import ReusableEditableText from "../src/components/ReuseableEditableText";
import {useUpdateContent} from "./src/component/updateContent";

export default function Hero({ heroData, userData }: any) {
  const [data, setData] = useState(heroData || []);
  // const [finished, setFinished] = useState(false);
  const { updateContent, finished, setFinished } = useUpdateContent(setData);

  const getContent = (key: string) => {
    return data?.find((el: any) => el.element.includes(key))?.content || "";
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center w-full min-h-[80vh] bg-gray-100 relative">
      <div className="relative h-full w-full md:w-1/2 flex flex-col items-center justify-center bg-rose-600">
        <Image
          src={jeanImage}
          alt="Jean texture"
          className="object-cover"
          // width={1024}
          // height={768}
          fill
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />
        <div className="flex flex-col items-center md:items-start w-[70%] z-20 pt-30 pb-20 text-center md:text-left">
          <div className="bg-opacity-50 text-white z-20 mb-7">
            <ReusableEditableText
              value={getContent("digitalMarketing_hero_h1_1")}
              onSave={async (newValue) => {
                // Save to Supabase or your backend
                await updateContent("digitalMarketing_hero_h1_1", newValue);
              }}
              user={userData.user}
              as="h1"
              className="leading-15 md:leading-20 lg:leading-24 text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] lg:tracking-wide font-bold p-3 pb-8 mb-3 mx-auto"
              style={{ width: "fit-content" }}
              setFinished={setFinished}
            >
              {getContent("digitalMarketing_hero_h1_1")}
            </ReusableEditableText>
            <ReusableEditableText
              value={getContent("digitalMarketing_hero_paragraph")}
              onSave={async (newValue) => {
                // Save to Supabase or your backend
                await updateContent("digitalMarketing_hero_paragraph", newValue);
              }}
              user={userData.user}
              as="p"
              className="text-2xl p-3"
              style={{ width: "fit-content" }}
              setFinished={setFinished}
              >
              {getContent("digitalMarketing_hero_paragraph")}
              </ReusableEditableText>
          </div>
          <div className="flex flex-row justify-center items-center w-fit gap-5 z-20 group hover:cursor-pointer">
            <div className="rounded-full bg-white p-4 w-16 h-16 flex items-center justify-center transition-colors group-hover:border group-hover:border-white group-hover:bg-transparent">
              <svg
                className="w-10 fill-slate-900 group-hover:fill-white transition-colors duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
              </svg>
            </div>
            <span className="inline-block text-2xl text-white">
              Discover Us
            </span>
          </div>
        </div>
      </div>
      {/* <div className="w-1/2 h-full bg-amber-600"> */}
        <ImageLoop />
      {/* </div> */}
      {finished && (
        <div className="fixed top-20 right-0 w-fit px-5 py-3 bg-orange-500 text-white flex justify-center z-[9999] p-20">
          <div className="text-lg animate-pulse">Updating...</div>
        </div>
      )}
    </div>
  );
}
