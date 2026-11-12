"use client";

import Image from "next/image";
import Link from "next/link";
import { Modal } from "./Modal";
import { useState, useEffect, useCallback } from "react";
import { uploadImage, deleteImage, uploadData } from "./utils/uploadLogic";
import { createClient } from "@/utils/supabase/client";
import { UploadModal } from "./uploadModal";

const supabase = createClient();

// Types
interface ProjectContent {
  image: string;
  text: string;
  alt: string;
}

interface ProjectData {
  id: string;
  content: ProjectContent;
}

interface ProjectForm {
  id?: string;
  image: File | null;
  text: string;
  alt: string;
}

export default function Projects({
  projectsData,
  userData,
}: {
  projectsData: ProjectData[];
  userData: any;
}) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<any>(null);
  const [txt, setTxt] = useState("");
  const [alt, setAlt] = useState("");
  const [finished, setFinished] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectData[] | null>(
    projectsData || []
  );
  const [newProject, setNewProject] = useState<ProjectForm>({
    id: "",
    image: null,
    text: "",
    alt: "",
  });

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewProject((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setNewProject((prev) => ({ ...prev, image: e.target.files![0] }));
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !newProject.text) {
      console.error("Missing required fields");
      return;
    }
    setFinished(true);

    try {
      const existingProject = projects?.find((ep: any) => ep.id == id);
      let imageUrl = null;

      if (existingProject?.content?.image) {
        console.log("We got here: " + existingProject?.content?.image)
        await deleteImage(existingProject.content.image);
      }
      if (newProject.image) imageUrl = await uploadImage(newProject.image);

      await uploadData(id, imageUrl, newProject);

      const { data: refreshedData } = await supabase
        .from("photographyProjects")
        .select("*");
 
      setProjects(refreshedData);
      setFinished(false);
    } catch (error) {
      console.error("Error: " + error);
      setFinished(false);
    }

    setModal(false);
    setId(null);
  };

  const handleOpen = (
    imageSrc: string,
    imageAlt: string,
    imageText: string
  ) => {
    setSource(imageSrc);
    setTxt(imageText);
    setAlt(imageAlt);
    setOpen(true);
  };

  const onClose = () => {
    setSource(null);
    setTxt("");
    setAlt("");
    setOpen(false);
  };

  console.log("projects render", projects);

  return (
    <>
      <div className="bg-white w-full" id="Projects">
        <div className="px-16 py-20 text-center lg:text-left">
          <div className="mb-12 w-full lg:w-[70%]">
            <h1 className="text-3xl">Presenting, Our Gallery</h1>
            <h3 className="text-xl">
              Discover a collection of moments captured with creativity and precision. Our gallery reflects the stories we’ve told and the memories we’ve preserved with passion and originality.
            </h3>
          </div>
          <div className="w-full flex flex-row flex-wrap h-fit relative mb-5">
            {projects && projects[0].id ? projects.map((project, index) => (
              <div className="relative w-full sm:w-1/2 lg:w-1/4 group" key={index}>
                <button
                  className="w-full h-full hover:cursor-pointer relative"
                  onClick={() =>
                    handleOpen(
                      project.content.image,
                      project.content.alt,
                      project.content.text
                    )
                  }
                >
                  {project.content.image && (
                    <Image
                      key={index}
                      src={project.content.image}
                      alt={project.content.alt}
                      width={1024}
                      height={768}
                      objectFit="cover"
                      className="w-full h-full transition-opacity duration-500 opacity-0 animate-pulse"
                      placeholder="blur"
                      blurDataURL="/loading.png"
                      onLoadingComplete={(img) => {
                        img.classList.remove("opacity-0", "animate-pulse");
                      }}
                    />
                  )}
                  <div
                    className={`w-full h-full bg-blue-950 opacity-0 transition-all duration-300 group-hover:opacity-50 absolute top-0 left-0`}
                  ></div>
                  <h1 className="text-white absolute top-0 left-0 text-left flex flex-col font-bold justify-end p-5 opacity-0 transition-all duration-300 group-hover:opacity-100 w-full h-full z-10">
                    {project.content.text}
                  </h1>
                </button>

                {userData && (
                  <div className="absolute top-4 right-4 flex flex-row gap-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-120">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 stroke-white hover:stroke-amber-300 hover:cursor-pointer"
                      onClick={() => {
                        setId(project.id);
                        setModal(true);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )) : (
              <div>No projects available.</div>
            )}
          </div>
          <Link href="/#Contact-Us" className="underline underline-offset-2 text-lg py-5">
            Get in touch
          </Link>
        </div>
      </div>
      {open && <Modal onClose={onClose} src={source} text={txt} alt={alt} />}
      {modal && (
        <UploadModal
          onClose={() => {
            setId(null);
            setModal(false);
          }}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          finished={finished}
        />
      )}
      {finished && (
        <div className="fixed top-20 right-0 w-fit px-5 py-3 bg-orange-500 text-white flex justify-center z-[9999] p-20">
          <div className="text-lg animate-pulse">Updating...</div>
        </div>
      )}
    </>
  );
}
