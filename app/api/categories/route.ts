import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { StorageError } from "@/lib/articles";
import { getCategories, createCategory, reorderCategories, ValidationError } from "@/lib/categories";

// Category labels/order surface in the root chrome (Header) and homepage,
// not just one page.
function revalidateAll() {
  revalidatePath("/", "layout");
}

// Public — category names/order aren't sensitive, and the public nav/homepage
// would otherwise need their own unauthenticated fetch path.
export async function GET() {
  const categories = await getCategories();
  return Response.json({ categories });
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  let category;
  try {
    category = await createCategory(await request.json());
  } catch (err) {
    if (err instanceof ValidationError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    const message = err instanceof StorageError ? err.message : "could not save category";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidateAll();
  return Response.json({ ok: true, category }, { status: 201 });
}

/** Reorders the whole list — body: { orderedIds: string[] }. */
export async function PUT(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const orderedIds = Array.isArray(body?.orderedIds) ? body.orderedIds : null;
  if (!orderedIds || !orderedIds.every((id: unknown) => typeof id === "string")) {
    return Response.json({ error: "orderedIds must be a string array" }, { status: 400 });
  }
  let categories;
  try {
    categories = await reorderCategories(orderedIds);
  } catch (err) {
    if (err instanceof ValidationError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    const message = err instanceof StorageError ? err.message : "could not reorder categories";
    return Response.json({ error: message }, { status: 503 });
  }
  revalidateAll();
  return Response.json({ ok: true, categories });
}
