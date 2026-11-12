"use client"

import Image from "next/image";
import lightJean from "../../public/denim-light.jpg";
import arrow from "../../public/arrow.png";
import line from "../../public/line.png";
import { useUpdateContent } from "./src/component/updateContent";
import { useState } from "react";
import ReusableEditableText from "../src/components/ReuseableEditableText";

export default function About({ section2Data, userData }: any) {
    const [data, setData] = useState(section2Data || [])
    const { updateContent, finished, setFinished } = useUpdateContent(setData);

    const getContent = (key: string) => {
        return data?.find((el: any) => el.element.includes(key))?.content || "";
    };

  return (
    <div id="About" className="flex flex-col lg:flex-row items-center justify-center gap-20 w-full py-36 text-white px-20">
      <div className="relative w-full lg:w-1/2">
        <Image
          src={line}
          alt="Line"
          className="absolute bottom-0 left-0 w-[400px] h-[40px] z-10"
          width={1024}
          height={768}
        />
        {/* <p className="text-3xl relative z-20">
          We are a digital marketing agency dedicated to helping businesses grow
          their online presence and achieve their marketing goals.
        </p> */}
        <ReusableEditableText
          value={getContent("digitalMarketing_section2_text1")}
          onSave={async (newValue) => {
            await updateContent("digitalMarketing_section2_text1", newValue);
          }}
          user={userData.user}
          as="p"
          className="text-3xl relative z-20 p-3"
          style={{ width: "fit-content" }}
          setFinished={setFinished}
          >
            {getContent("digitalMarketing_section2_text1")}
          </ReusableEditableText>
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full gap-20 lg:gap-0 lg:w-1/2">
        <div className="relative rounded-full w-[14rem] h-[14rem] overflow-hidden">
          <Image
            // width={300}
            // height={300}
            src={lightJean}
            fill
            alt="About Us"
            className=" object-cover absolute top-0 left-0 w-full h-full z-10"
          />
          <Image
            // width={300}
            // height={300}
            src={arrow}
            // fill
            alt="About Us"
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[170px] h-[150px] z-20"
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full lg:w-[58%] lg:pl-5 ">
          {/* <h3 className="text-2xl pl-5 text-slate-300">What we do</h3> */}
            <ReusableEditableText
                value={getContent("digitalMarketing_section2_h3")}
                onSave={async (newValue) => {
                await updateContent("digitalMarketing_section2_h3", newValue);
                }}
                user={userData.user}
                as="h3"
                className="text-2xl p-5 text-slate-300"
                style={{ width: "fit-content" }}
                setFinished={setFinished}>
                {getContent("digitalMarketing_section2_h3")}
                </ReusableEditableText>
          {/* <p className="text-lg pl-5">
            Our team of experts specializes in SEO, content marketing, social
            media management, and more. We work closely with our clients to
            develop tailored strategies that drive results.
          </p> */}
          <ReusableEditableText
          value={getContent("digitalMarketing_section2_text2")}
          onSave={async (newValue) => {
            await updateContent("digitalMarketing_section2_text2", newValue);
          }}
          user={userData.user}
          as="p"
          className="text-lg p-5"
          style={{ width: "fit-content" }}
          setFinished={setFinished}
          >
            {getContent("digitalMarketing_section2_text2")}
          </ReusableEditableText>
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
