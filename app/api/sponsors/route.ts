import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { ValidationError } from "@/lib/articles";
import { getSponsors, getSponsorships, normalizeSponsor, upsertSponsor } from "@/lib/sponsors";

function revalidateAll() {
  // Sponsor names/logos surface on the homepage, category pages, and
  // sponsored article pages; refresh the lot.
  revalidatePath("/", "layout");
}

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json({ sponsors: getSponsors(), sponsorships: getSponsorships() });
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  let sponsor;
  try {
    sponsor = normalizeSponsor(await request.json());
  } catch (err) {
    const message = err instanceof ValidationError ? err.message : "invalid request body";
    return Response.json({ error: message }, { status: 400 });
  }
  upsertSponsor(sponsor);
  revalidateAll();
  return Response.json({ ok: true }, { status: 201 });
}
