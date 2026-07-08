"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import type { Article } from "@/lib/articles";

const U = (id: string, w: number, h: number) =>
  id ? `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format` : "";

function matches(a: Article, q: string): boolean {
  if (!q) return true;
  const hay = [a.title, a.subtitle, a.author, a.category, ...(a.tags ?? [])]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
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

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = initialQ;
    setQuery(initialQ);
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
        <div className="section-header reveal">
          <div>
            <span className="label eyebrow" data-en="Archive Directory" data-ar="دليل الأرشيف">Archive Directory</span>
            <h2>
              {q
                ? `${visible.length} result${visible.length === 1 ? "" : "s"}`
                : "All Stories"}
            </h2>
          </div>
        </div>

        {loading ? (
          <p className="deck" data-en="Searching…" data-ar="جارٍ البحث…">Searching…</p>
        ) : visible.length === 0 ? (
          <p className="deck" data-en="No matching stories found." data-ar="لم يتم العثور على قصص مطابقة.">No matching stories found.</p>
        ) : (
          <div className="editorial-grid reveal">
            {visible.map((a) => (
              <article key={a.slug} className="article-card span-4">
                <Link className="card-media" href={`/article/${a.slug}`}>
                  <Image fill src={U(a.heroPhoto, 600, 450)} alt={a.title} sizes="(min-width: 1280px) 400px, 33vw" />
                </Link>
                <span className="label eyebrow">{a.category}</span>
                <h3><Link href={`/article/${a.slug}`}>{a.title}</Link></h3>
                <p>{a.subtitle}</p>
                <span className="meta">{a.meta}</span>
              </article>
            ))}
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
