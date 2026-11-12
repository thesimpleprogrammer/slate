"use client"

import Image from "next/image";
import photoBg from "../../public/photography-hero.jpg";
import { useUpdateContent } from "./utils/updateContent";
import { useState } from "react";
import ReusableEditableText from "../src/components/ReuseableEditableText";


export default function Hero({ photographyHeroData, userData }: any) {
   const [data, setData] = useState(photographyHeroData || []);
  const { updateContent, finished, setFinished } = useUpdateContent(setData);

  const getContent = (key: string) => {
    return data?.find((el: any) => el.element.includes(key))?.content || "";
  };

  return (
    <div className="w-full bg-white" id="Home">
      <div className="relative w-full flex flex-row px-20 py-50 text-center md:text-left">
        <Image
          src={photoBg}
          alt="Man taking a Photograph"
          className="w-full z-10"
          objectFit="cover"
          fill
        />

        <div className="w-fit mx-auto md:w-[50%] md:mx-0 text-white z-20">
          {/* <div className="flex flex-col">
            <h1 className="text-7xl">Ifiok&apos;s Gallery</h1>
            <h3 className="text-2xl">Photography</h3>
          </div> */}
          <div className="py-3 text-2xl text-slate-300 font-bold">
            {/* <h2 className="">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda odit amet dolor quos.
            </h2> */}
            <ReusableEditableText
                  value={getContent("photography_hero_text1")}
                  onSave={async (newValue) => {
                    await updateContent(
                      "photography_hero_text1",
                      newValue
                    );
                  }}
                  user={userData}
                  as="h2"
                  className="md:relative -left-3 -top-3"
                  style={{ width: "fit-content" }}
                  setFinished={setFinished}
                >
                  {getContent("photography_hero_text1")}
                </ReusableEditableText>
          </div>
          <div className="mb-8">
            {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius, corrupti illo vitae aut necessitatibus consectetur, nemo minima quod facilis ducimus error. Pariatur, facere explicabo iure ducimus aliquid tempore totam!
            </p> */}
            <ReusableEditableText
                  value={getContent("photography_about_text2")}
                  onSave={async (newValue) => {
                    await updateContent(
                      "photography_about_text2",
                      newValue
                    );
                  }}
                  user={userData}
                  as="p"
                  className="md:relative -left-3 -top-3"
                  style={{ width: "fit-content" }}
                  setFinished={setFinished}
                >
                  {getContent("photography_about_text2")}
                </ReusableEditableText>
          </div>
            <a href="" className="w-fit mx-auto lg:mx-0 px-5 py-3 border border-white hover:bg-white hover:text-black transition-colors">
              Let&apos;s Get In Touch  
            </a>
        </div>
      </div>
      {finished && (
        <div className="fixed top-20 right-0 w-fit px-5 py-3 bg-orange-500 text-white flex justify-center z-[9999] p-20">
          <div className="text-lg animate-pulse">Updating...</div>
        </div>
      )}
    </div>
  );
}