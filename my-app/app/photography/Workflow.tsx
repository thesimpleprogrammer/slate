"use client";

import Image from "next/image";
import path1 from "../../public/Vector 2.png";
import path2 from "../../public/Vector 3.png";
import { useState, useEffect } from "react";
import { useUpdateContent } from "./utils/updateContent";
import ReusableEditableText from "../src/components/ReuseableEditableText";
import { fetchSectionUrl, uploadSectionFile } from "@/utils/supabase/helpers";
import UploadImageBlock from "./uploadImageBlock";

export default function Workflow({ photographyWorkflowData, userData }: any) {
  const [data, setData] = useState(photographyWorkflowData || []);
  const { updateContent, finished, setFinished } = useUpdateContent(setData);
  const [urlInfo, setUrlInfo] = useState<any>(null);
  const [urlInfo2, setUrlInfo2] = useState<any>(null);
  const [urlInfo3, setUrlInfo3] = useState<any>(null);

  const getContent = (key: string) => {
    return data?.find((el: any) => el.element.includes(key))?.content || "";
  };

  const storageName = "photography";

  useEffect(() => {
    fetchSectionUrl("WorkflowImage1", setUrlInfo, setFinished, storageName);
  }, []);

  useEffect(() => {
    fetchSectionUrl("WorkflowImage2", setUrlInfo2, setFinished, storageName);
  }, []);

  useEffect(() => {
    fetchSectionUrl("WorkflowImage3", setUrlInfo3, setFinished, storageName);
  }, []);

  return (
    <div className="w-full text-white" id="Workflow">
      <div className="px-16 py-20 text-center lg:text-left">
        <div className="mb-10 w-full lg:w-[70%]">
          <h1 className="text-4xl mb-5">How we Create Lasting Memories</h1>
          <p>At Ifiok&apos;s Gallery, lasting moments are created through vision, creativity, and connection. Every shot is carefully crafted to capture both beauty and emotion, transforming simple scenes into timeless stories to be treasured for years.</p>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row w-full gap-10 items-center">
            <div className="relative w-full lg:w-1/2 aspect-auto">
              {/* <Image
                src={chineseGate}
                alt="A chinese Gate"
                objectFit="cover"
                fill
                className="w-full rounded-md"
              /> */}
              <UploadImageBlock
                id="upload1"
                url={urlInfo}
                finished={finished}
                onUpload={(e) =>
                  uploadSectionFile(
                    e,
                    "WorkflowImage1",
                    setFinished,
                    setUrlInfo,
                    storageName
                  )
                }
                user={userData}
              />
            </div>
            <div className="w-full lg:w-1/2">
              {/* <h3 className="text-3xl mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h3> */}
              <ReusableEditableText
                value={getContent("photography_workflow_h3_1")}
                onSave={async (newValue) => {
                  await updateContent("photography_workflow_h3_1", newValue);
                }}
                user={userData}
                as="h3"
                className="lg:relative -left-3 -top-3 mx-auto lg:mx-0 text-3xl mb-5"
                style={{ width: "fit-content" }}
                setFinished={setFinished}
              >
                {getContent("photography_workflow_h3_1")}
              </ReusableEditableText>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                accusantium reiciendis consequatur, neque ipsum dolor at velit
                saepe quibusdam vero praesentium ipsa debitis dicta deserunt
                maiores. Excepturi ut aperiam quae!
              </p> */}
              <ReusableEditableText
                value={getContent("photography_workflow_text_1")}
                onSave={async (newValue) => {
                  await updateContent("photography_workflow_text_1", newValue);
                }}
                user={userData}
                as="p"
                className="lg:relative -left-3 -top-3"
                style={{ width: "fit-content" }}
                setFinished={setFinished}
              >
                {getContent("photography_workflow_text_1")}
              </ReusableEditableText>
            </div>
          </div>
          <div className="w-full h-40 relative">
            <Image
              src={path2}
              alt="A chinese Gate"
              objectFit="cover"
              // fill
              className="w-[60%] mx-auto h-full hidden lg:block"
            />
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-10 items-center">
            <div className="w-full lg:w-1/2">
              {/* <h3 className="text-3xl mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                accusantium reiciendis consequatur, neque ipsum dolor at velit
                saepe quibusdam vero praesentium ipsa debitis dicta deserunt
                maiores. Excepturi ut aperiam quae!
              </p> */}
              <ReusableEditableText
                value={getContent("photography_workflow_h3_2")}
                onSave={async (newValue) => {
                  await updateContent("photography_workflow_h3_2", newValue);
                }}
                user={userData}
                as="h3"
                className="lg:relative mx-auto lg:mx-0 -left-3 -top-3 text-3xl mb-5"
                style={{ width: "fit-content" }}
                setFinished={setFinished}
              >
                {getContent("photography_workflow_h3_2")}
              </ReusableEditableText>
              <ReusableEditableText
                value={getContent("photography_workflow_text_2")}
                onSave={async (newValue) => {
                  await updateContent("photography_workflow_text_2", newValue);
                }}
                user={userData}
                as="p"
                className="mx-auto lg:mx-0 lg:relative -left-3 -top-3"
                style={{ width: "fit-content" }}
                setFinished={setFinished}
              >
                {getContent("photography_workflow_text_2")}
              </ReusableEditableText>
            </div>
            <div className="relative w-full lg:w-1/2 aspect-auto">
              {/* <Image
                src={wedding}
                alt="A chinese Gate"
                objectFit="cover"
                fill
                className="w-full rounded-md"
              /> */}
              <UploadImageBlock
                id="upload2"
                url={urlInfo2}
                finished={finished}
                onUpload={(e) =>
                  uploadSectionFile(
                    e,
                    "WorkflowImage2",
                    setFinished,
                    setUrlInfo,
                    storageName
                  )
                }
                user={userData}
              />
            </div>
          </div>
          <div className="w-full h-40 mx-auto relative">
            {/* <div className="w-[80%] "> */}
            <Image
              src={path1}
              alt="A chinese Gate"
              objectFit="cover"
              // fill
              className="w-[60%] mx-auto h-full hidden lg:block"
            />
            {/* </div> */}
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-10 items-center">
            <div className="relative w-full lg:w-1/2 aspect-auto">
              {/* <Image
                src={family}
                alt="A chinese Gate"
                objectFit="cover"
                fill
                className="w-full rounded-md"
              /> */}
              <UploadImageBlock
                id="upload3"
                url={urlInfo3}
                finished={finished}
                onUpload={(e) =>
                  uploadSectionFile(
                    e,
                    "WorkflowImage3",
                    setFinished,
                    setUrlInfo,
                    storageName
                  )
                }
                user={userData}
              />
            </div>
            <div className="w-full lg:w-1/2">
              {/* <h3 className="text-3xl mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                accusantium reiciendis consequatur, neque ipsum dolor at velit
                saepe quibusdam vero praesentium ipsa debitis dicta deserunt
                maiores. Excepturi ut aperiam quae!
              </p> */}
              <ReusableEditableText
                value={getContent("photography_workflow_h3_3")}
                onSave={async (newValue) => {
                  await updateContent("photography_workflow_h3_3", newValue);
                }}
                user={userData}
                as="h3"
                className="lg:relative mx-auto lg:mx-0 -left-3 -top-3 text-3xl mb-5"
                style={{ width: "fit-content" }}
                setFinished={setFinished}
              >
                {getContent("photography_workflow_h3_3")}
              </ReusableEditableText>
              <ReusableEditableText
                value={getContent("photography_workflow_text_3")}
                onSave={async (newValue) => {
                  await updateContent("photography_workflow_text_3", newValue);
                }}
                user={userData}
                as="p"
                className="lg:relative mx-auto lg:mx-0 -left-3 -top-3"
                style={{ width: "fit-content" }}
                setFinished={setFinished}
              >
                {getContent("photography_workflow_text_3")}
              </ReusableEditableText>
            </div>
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
