import { createClient } from "@/utils/supabase/client";
import { fetchShowroomVideoUrls } from "../../app/videography/src/components/Showroom/showroomLogic";

const BUCKET = "videography";
const FOLDER = "section3";

function sanitizeFileName(name: string) {
  // keep letters, numbers, dot, underscore and dash
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
}

/**
 * Replaces the video in one showroom slot: compresses the chosen file on the
 * video service, uploads the result to Supabase Storage, then removes the
 * slot's previous video.
 *
 * @param currentFileName name of the video currently in this slot
 */
export async function uploadVideoToSupabase(
  event: any,
  currentFileName: string,
  setFinished: (val: boolean) => void,
  setUrlFn: any
) {
  event.preventDefault();

  const file: File | undefined = event.target.files?.[0];
  if (!file) return;

  const apiUrl = process.env.NEXT_PUBLIC_VIDEO_API_URL;
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_VIDEO_API_URL is not set");
    alert("Video uploads are not configured on this site.");
    return;
  }

  setFinished(true);

  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("Log in as the site owner to change videos.");
    }

    // 1. Compress on the video service (it checks the Supabase session token)
    const formData = new FormData();
    formData.append("video", file);

    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/resize`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: formData,
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.error ?? `Video compression failed (${response.status})`);
    }
    const compressed = await response.blob();

    // 2. Upload the compressed video
    const { data: existingFiles } = await supabase.storage
      .from(BUCKET)
      .list(FOLDER, { limit: 100, search: currentFileName });

    const newFileName = sanitizeFileName(file.name);
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(`${FOLDER}/${newFileName}`, compressed, {
        contentType: "video/mp4",
        upsert: true,
      });
    if (uploadError) throw uploadError;

    // 3. Remove the old video, unless the upload just overwrote it
    const previousFileName = existingFiles?.[0]?.name;
    if (previousFileName && previousFileName !== newFileName) {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET)
        .remove([`${FOLDER}/${previousFileName}`]);
      if (deleteError) {
        console.error("New video uploaded, but the old one could not be deleted:", deleteError);
      }
    }

    setUrlFn(await fetchShowroomVideoUrls());
  } catch (err) {
    console.error("Video upload failed:", err);
    alert(err instanceof Error ? err.message : "Video upload failed. Please try again.");
  } finally {
    setFinished(false);
  }
}
