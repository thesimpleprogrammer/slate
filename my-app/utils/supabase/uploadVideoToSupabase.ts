import { createClient } from "@/utils/supabase/client";
import { fetchShowroomVideoUrls } from "../../app/videography/src/components/Showroom/showroomLogic";
// import { ReduceVideo } from "./reduceVideo";
// make sure this is correctly initialized

export async function uploadVideoToSupabase(
  event: any,
  fileName: string,
  setFinished: (val: boolean) => void,
  setUrlFn: any
) {
  event.preventDefault();
  console.log("Working");
  console.log("It's getting here");

  const file = event.target.files[0];
  setFinished(true);

  const supabase = await createClient();

  const { data: existingFiles, error } = await supabase.storage
    .from("videography")
    .list("section3", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
      search: fileName,
    });

  // const reducedVideo = await ReduceVideo(file);
  const formData = new FormData();
  formData.append("video", file);

  console.log("This is the formdata: " + formData);

  const response = await fetch("http://13.48.148.216/resize", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.error("Error resizing video");
    setFinished(false);
    return;
  }

  console.log("This is the response: " + JSON.stringify(response));

  // receive buffer (mp4) from backend
  // const blob = await response.blob();
  // console.log("Blob size:", blob.size); // should now be > 0
  // const resizedFile = new File([blob], fileName, { type: "video/mp4" });
  // console.log("This is the resized file:", resizedFile);
  const arrayBuffer = await response.arrayBuffer();
  console.log("This is the array buffer length: " + arrayBuffer.byteLength)
  const blob = new Blob([arrayBuffer], { type: "video/mp4" });

  // console.log("This is the resized file: " + JSON.stringify(resizedFile));

  function sanitizeFileName(name: string) {
    return name
      .replace(/[^a-zA-Z0-9._-]/g, "_") // keep letters, numbers, dot, underscore, dash
      .toLowerCase();
  }

  const safeFileName = sanitizeFileName(file.name);

  const fileForUpload = new File([blob], safeFileName, { type: "video/mp4" });

  const { data: uploadData } = await supabase.storage
    .from("videography")
    .upload(`section3/${safeFileName}`, fileForUpload, {
      // cacheControl: "3600",
      upsert: true,
    });

  console.log("Uploaded data" + JSON.stringify(uploadData));

  if (!uploadData) {
    setFinished(false);
    return;
  }

  if (existingFiles) {
    const oldFileName = existingFiles[0].name;
    const { error: deleteError } = await supabase.storage
      .from("videography")
      .remove([`section3/${oldFileName}`]);

    if (deleteError) {
      console.error("Couldn't delete old file:", deleteError);
      setFinished(false);
      return;
    }
  }

  const urls = await fetchShowroomVideoUrls();
  setUrlFn(urls);
  setFinished(false);

  //   const { data, error } = await supabase.storage
  //     .from("videography") // replace with your actual bucket
  //     .upload(`section3/${fileName}`, file, {
  //       upsert: true, // This replaces the file if it already exists
  //       cacheControl: "0",
  //     });

  //   if (error) {
  //     console.error("Upload error:", error.message);
  //     alert("Upload failed. Try again.");
  //   } else {
  //     console.log("Uploaded successfully:", data.path);
  //   }
}
