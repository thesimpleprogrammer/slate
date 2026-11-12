"use client"

import Image from "next/image";
import contentImage from "../../public/photographer-portrait.jpg";
import { useUpdateContent } from "./utils/updateContent";
import { useState } from "react";
import ReusableEditableText from "../src/components/ReuseableEditableText";

export default function About({ photographyAboutData, userData }: any) {
  const [data, setData] = useState(photographyAboutData || []);
  const { updateContent, finished, setFinished } = useUpdateContent(setData);

  const getContent = (key: string) => {
    return data?.find((el: any) => el.element.includes(key))?.content || "";
  };

  return (
    <div className="w-full bg-white" id="About">
      <div className="px-16 py-20 text-center lg:text-left">
        <h1 className="text-3xl">Ifiok&apos;s Gallery is Happy to Meet You</h1>
        <div className="w-full flex flex-col lg:flex-row mt-5 gap-10 items-center">
          <div className="flex flex-col w-full items-center lg:items-start lg:w-2/3 gap-20">
            <div className="w-full flex flex-col lg:flex-row gap-16">
              <div className="w-full lg:w-1/2">
                {/* <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis est aliquid commodi, vitae incidunt ipsam harum!
                  Modi, non voluptate facilis, ullam libero molestiae eius
                  temporibus sequi, maxime dolorum eos mollitia.
                </p> */}
                <ReusableEditableText
                  value={getContent("photography_about_text1")}
                  onSave={async (newValue) => {
                    await updateContent(
                      "photography_about_text1",
                      newValue
                    );
                  }}
                  user={userData}
                  as="p"
                  className={`${userData && `whiteBg`} lg:relative -left-3 -top-3`}
                  style={{ width: "fit-content" }}
                  setFinished={setFinished}
                >
                  {getContent("photography_about_text1")}
                </ReusableEditableText>
              </div>
              <div className="w-full lg:w-1/2">
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Debitis, ratione reiciendis corporis, nemo molestias adipisci,
                  ad dolorem ut minus deleniti sit ipsa quasi explicabo.
                  Architecto accusantium hic dolores deserunt alias?
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
                  className={`${userData && `whiteBg`} lg:relative -left-3 -top-3`}
                  style={{ width: "fit-content" }}
                  setFinished={setFinished}
                >
                  {getContent("photography_about_text2")}
                </ReusableEditableText>
              </div>
            </div>
            <a
              href=""
              className=" w-fit px-5 py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              A little More About Me
            </a>
          </div>
          <div className="w-full lg:w-1/3 h-[500px] relative">
            <Image
              src={contentImage}
              alt="Man smiling"
              objectFit="cover"
              fill
              className="w-full"
            />
          </div>
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
