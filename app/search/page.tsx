"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";

const RESULTS = [
  {
    id: "coll1",
    href: "/article",
    seed: "saudimag-s1",
    size: "1000/600",
    alt: "Vision 2030 architecture",
    eyebrow: "Vision 2030 Architecture",
    h3: "Transforming Landscapes",
    type: "collection",
  },
  {
    id: "coll2",
    href: "/culture",
    seed: "saudimag-s2",
    size: "600/500",
    alt: "Contemporary Gulf portrait",
    eyebrow: "Creative Lives",
    h3: "Regional Makers",
    type: "collection",
  },
  {
    id: "coll3",
    href: "/culture",
    seed: "saudimag-s3",
    size: "600/500",
    alt: "Culinary art",
    eyebrow: "Culinary Arts",
    h3: "Gulf Taste",
    type: "collection",
  },
  {
    id: "iss1",
    href: "/article",
    seed: "saudimag-iss1",
    eyebrow: "Issue No. 12 · Jun 2026",
    h3: "Cities & Culture",
    deck: "How the Gulf's cultural districts are shaping how people gather, learn, and belong.",
    type: "issue",
    issueNum: 12,
    year: 2026,
  },
  {
    id: "iss2",
    href: "/article",
    seed: "saudimag-iss2",
    eyebrow: "Issue No. 11 · Mar 2026",
    h3: "The Art of Desert Hospitality",
    deck: "Desert resorts and community retreats redefining hospitality through tradition, climate, and contemporary design.",
    type: "issue",
    issueNum: 11,
    year: 2026,
  },
  {
    id: "iss3",
    href: "/article",
    seed: "saudimag-iss3",
    eyebrow: "Issue No. 10 · Dec 2025",
    h3: "Urban Metamorphosis",
    deck: "Documenting Riyadh's skyline and the architects shaping the future form of the city.",
    type: "issue",
    issueNum: 10,
    year: 2025,
  },
  {
    id: "iss4",
    href: "/culture",
    seed: "saudimag-iss4",
    eyebrow: "Issue No. 9 · Sep 2025",
    h3: "Threads of Heritage",
    deck: "The revival of traditional craftsmanship in contemporary Saudi homes, objects, and cultural spaces.",
    type: "issue",
    issueNum: 9,
    year: 2025,
  },
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [sort, setSort] = useState<"issue" | "year">("issue");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = initialQ;
    setQuery(initialQ);
  }, [initialQ]);

  const visible = RESULTS.filter(
    (r) => !query.trim() || r.h3.toLowerCase().includes(query.toLowerCase()) || r.eyebrow.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  const applyChip = (value: string) => {
    setQuery(value);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const collections = visible.filter((r) => r.type === "collection");
  const issues = visible
    .filter((r) => r.type === "issue")
    .sort((a, b) =>
      sort === "year"
        ? (b.year ?? 0) - (a.year ?? 0) || (b.issueNum ?? 0) - (a.issueNum ?? 0)
        : (b.issueNum ?? 0) - (a.issueNum ?? 0)
    );

  return (
    <main className="page" id="main-content">
      <section className="section container">
        <div className="search-panel reveal">
          <h1 data-en="Search & Archive" data-ar="البحث والأرشيف">Search &amp; Archive</h1>
          <p className="deck" data-en="Explore editorial collections by topic, issue, or keyword." data-ar="استكشف المجموعات التحريرية حسب الموضوع أو العدد أو الكلمة المفتاحية.">Explore editorial collections by topic, issue, or keyword.</p>
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
            {["Vision 2030", "Riyadh Art", "Fashion", "Architecture"].map((chip) => (
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

      {collections.length > 0 && (
        <section className="section soft">
          <div className="container">
            <div className="section-header reveal">
              <div>
                <span className="label eyebrow" data-en="Curated Collections" data-ar="مجموعات منتقاة">Curated Collections</span>
                <h2 data-en="Editorial Sets" data-ar="مجموعات تحريرية">Editorial Sets</h2>
              </div>
            </div>
            <div className="collection-grid">
              <Link className="collection-card large reveal" href={collections[0].href}>
                <img src={`https://picsum.photos/seed/${collections[0].seed}/${collections[0].size}`} alt={collections[0].alt} loading="lazy" />
                <div className="collection-copy">
                  <span className="label eyebrow">{collections[0].eyebrow}</span>
                  <h3>{collections[0].h3}</h3>
                </div>
              </Link>
              {collections.length > 1 && (
                <div className="collection-stack">
                  {collections.slice(1).map((c) => (
                    <Link key={c.id} className="collection-card reveal" href={c.href}>
                      <img src={`https://picsum.photos/seed/${c.seed}/${c.size}`} alt={c.alt} loading="lazy" />
                      <div className="collection-copy">
                        <span className="label eyebrow">{c.eyebrow}</span>
                        <h3>{c.h3}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section container">
        <div className="section-header reveal">
          <div>
            <span className="label eyebrow" data-en="Archive Directory" data-ar="دليل الأرشيف">Archive Directory</span>
            <h2 data-en="Recent Issues" data-ar="أعداد حديثة">Recent Issues</h2>
          </div>
          <select
            aria-label="Sort archive"
            value={sort}
            onChange={(e) => setSort(e.target.value as "issue" | "year")}
            style={{ font: "inherit", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid var(--color-line)", background: "transparent", color: "var(--color-ink)", padding: "8px 12px", cursor: "pointer" }}
          >
            <option value="issue">Sort by Issue</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>
        <div className="issue-list">
          {issues.map((item) => (
            <article key={item.id} className="issue reveal">
              <Link className="image-frame" href={item.href}>
                <img src={`https://picsum.photos/seed/${item.seed}/480/640`} alt="Magazine issue cover" loading="lazy" />
              </Link>
              <div className="issue-copy">
                <span className="label eyebrow">{item.eyebrow}</span>
                <h3>{item.h3}</h3>
                <p className="deck">{item.deck}</p>
                <p className="mt-lg">
                  <Link className="button secondary" href={item.href} data-en="Read issue" data-ar="اقرأ العدد">Read issue</Link>
                </p>
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="deck" data-en="No matching archive entries found." data-ar="لم يتم العثور على نتائج مطابقة في الأرشيف.">No matching archive entries found.</p>
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
