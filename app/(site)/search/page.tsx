"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { AoCard } from "@/components/Editorial";
import type { Article } from "@/lib/articles";
import { stripInline } from "@/lib/inline";

function matches(a: Article, q: string): boolean {
  if (!q) return true;
  const hay = [stripInline(a.title), stripInline(a.subtitle), a.author, a.category, ...(a.tags ?? [])]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [prevInitialQ, setPrevInitialQ] = useState(initialQ);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data: Article[]) =>
        setArticles(data.filter((a) => (a.status ?? "published") !== "draft"))
      )
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  // Sync query state when the URL's ?q= changes, adjusted during render
  // per https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (initialQ !== prevInitialQ) {
    setPrevInitialQ(initialQ);
    setQuery(initialQ);
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = initialQ;
  }, [initialQ]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => articles.filter((a) => matches(a, q)), [articles, q]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = query.trim();
    router.push(v ? `/search?q=${encodeURIComponent(v)}` : "/search");
  };

  const applyChip = (value: string) => {
    setQuery(value);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="search-panel reveal">
          <h1 data-en="Search & Archive" data-ar="البحث والأرشيف">Search &amp; Archive</h1>
          <p className="deck" data-en="Explore editorial stories by topic, author, or keyword." data-ar="استكشف القصص التحريرية حسب الموضوع أو الكاتب أو الكلمة المفتاحية.">Explore editorial stories by topic, author, or keyword.</p>
          <form className="search-field" onSubmit={handleSubmit}>
            <span className="material-symbols-outlined">search</span>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search the archives..."
              data-placeholder-en="Search the archives..."
              data-placeholder-ar="ابحث في الأرشيف..."
              aria-label="Search archive"
              data-label-en="Search archive"
              data-label-ar="البحث في الأرشيف"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="chips" aria-label="Popular searches">
            <span className="meta" style={{ alignSelf: "center" }} data-en="Popular" data-ar="شائع">Popular</span>
            {["Vision 2030", "Culture", "Fashion", "Architecture"].map((chip) => (
              <button
                key={chip}
                className={`chip${query === chip ? " active" : ""}`}
                type="button"
                onClick={() => applyChip(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="ao-sec-head reveal">
          <h2>
            {q
              ? `${visible.length} result${visible.length === 1 ? "" : "s"}`
              : <span data-en="All Stories" data-ar="جميع القصص">All Stories</span>}
          </h2>
        </div>

        {loading ? (
          <p className="deck" data-en="Searching…" data-ar="جارٍ البحث…">Searching…</p>
        ) : visible.length === 0 ? (
          <p className="deck" data-en="No matching stories found." data-ar="لم يتم العثور على قصص مطابقة.">No matching stories found.</p>
        ) : (
          <div className="ao-search-grid reveal">
            {visible.map((a) => <AoCard key={a.slug} a={a} />)}
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
