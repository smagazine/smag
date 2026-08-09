import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthed } from "@/lib/auth";
import { addMedia } from "@/lib/media";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Video files are far larger than Vercel's serverless request body limit, so
// unlike /api/admin/upload (images, server-side), this route only issues a
// short-lived client upload token — the browser PUTs the bytes straight to
// Blob storage. See @vercel/blob/client's handleUpload().
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200MB

export async function POST(request: Request) {
  if (!rateLimit(`upload-video:${clientIp(request)}`, 10, 60_000)) {
    return Response.json({ error: "too many uploads, try again later" }, { status: 429 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Only the token-issuance step is a real user action from the admin's
        // browser; the completed-upload callback below is called by Vercel's
        // own infrastructure and can't carry our session cookie.
        if (!(await isAuthed())) {
          throw new Error("unauthorized");
        }
        return {
          allowedContentTypes: ALLOWED_VIDEO_TYPES,
          maximumSizeInBytes: MAX_VIDEO_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Not reachable from localhost in dev (Vercel platform limitation) —
        // dev-uploaded videos just won't show up in the media library until
        // this deploys; the upload itself still works.
        await addMedia({ url: blob.url, filename: blob.pathname });
      },
    });
    return Response.json(jsonResponse);
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "upload failed" }, { status: 400 });
  }
}
