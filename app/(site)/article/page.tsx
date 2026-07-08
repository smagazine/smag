import { redirect } from "next/navigation";

// The bare /article index has no meaning — individual articles live at
// /article/[slug]. Redirect visitors to the headlines listing.
export default function ArticleIndex() {
  redirect("/headlines");
}
