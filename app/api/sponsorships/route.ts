import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { ValidationError, StorageError } from "@/lib/articles";
import { deleteSponsorship, normalizeSponsorship, upsertSponsorship } from "@/lib/sponsors";

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  let sponsorship;
  try {
    sponsorship = normalizeSponsorship(await request.json());
  } catch (err) {
    const message = err instanceof ValidationError ? err.message : "invalid request body";
    return Response.json({ error: message }, { status: 400 });
  }
  try {
    await upsertSponsorship(sponsorship);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not save sponsorship";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidatePath(`/${sponsorship.route}`);
  revalidatePath("/");
  return Response.json({ ok: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const route = new URL(request.url).searchParams.get("route") ?? "";
  if (!route) return Response.json({ error: "route is required" }, { status: 400 });
  try {
    await deleteSponsorship(route);
  } catch (err) {
    const message = err instanceof StorageError ? err.message : "could not delete sponsorship";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidatePath(`/${route}`);
  revalidatePath("/");
  return Response.json({ ok: true });
}
