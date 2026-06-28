"use client";
import Link from "next/link";
import { useState } from "react";

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const ARTICLES = [
  {
    slug: "gulf-architecture-revolution",
    title: "The New Era of Saudi Architecture: A Silent Revolution in Stone",
    category: "Architecture & Design",
    author: "Laila Al-Fayed",
    date: "Oct 24, 2024",
    status: "published",
    readTime: "8 min",
    heroPhoto: "photo-1486325212027-8081e485255e",
    tags: ["Architecture", "Design", "Riyadh"],
  },
  {
    slug: "gulf-sport-gravity",
    title: "How the Gulf Became Global Sport's New Centre of Gravity",
    category: "Sports",
    author: "Khalid Al-Rasheed",
    date: "Mar 12, 2025",
    status: "published",
    readTime: "10 min",
    heroPhoto: "photo-1461896836934-ffe607ba8211",
    tags: ["Sports", "Formula 1", "Golf"],
  },
  {
    slug: "riyadh-season-entertainment",
    title: "Riyadh Season: Inside the World's Largest Entertainment Programme",
    category: "Events",
    author: "Nour Al-Saud",
    date: "Jun 14, 2026",
    status: "published",
    readTime: "7 min",
    heroPhoto: "photo-1501281668745-f7f57925c3b4",
    tags: ["Events", "Riyadh", "Entertainment"],
  },
  {
    slug: "saudi-cuisine-identity",
    title: "The Chefs Redefining Saudi Cuisine One Plate at a Time",
    category: "F&B",
    author: "Reem Al-Jabri",
    date: "Apr 3, 2026",
    status: "published",
    readTime: "9 min",
    heroPhoto: "photo-1547592166-23ac45744acd",
    tags: ["Food", "Culture", "Chefs"],
  },
  {
    slug: "alula-heritage-future",
    title: "AlUla: Where the Desert Remembers Everything",
    category: "Culture",
    author: "Laila Al-Fayed",
    date: "Jan 18, 2026",
    status: "published",
    readTime: "11 min",
    heroPhoto: "photo-1529516548873-9ce57c8f155e",
    tags: ["AlUla", "Heritage", "Tourism"],
  },
  {
    slug: "vision-2030-cities",
    title: "The Cities Saudi Arabia Is Building from Scratch",
    category: "Headlines",
    author: "Tariq Al-Mansouri",
    date: "May 5, 2026",
    status: "published",
    readTime: "12 min",
    heroPhoto: "photo-1477959858617-67f85cf4f1df",
    tags: ["NEOM", "Vision 2030", "Cities"],
  },
  {
    slug: "gulf-fashion-identity",
    title: "Hessa Al-Suwaidi: Designing Modest Fashion for a World Audience",
    category: "Interviews",
    author: "Sara Al-Mutairi",
    date: "Feb 28, 2026",
    status: "published",
    readTime: "6 min",
    heroPhoto: "photo-1558618666-fcd25c85cd64",
    tags: ["Fashion", "Design", "Interviews"],
  },
  {
    slug: "mdl-beast-sound",
    title: "MDL Beast: How a Festival Became a Movement",
    category: "Events",
    author: "Nour Al-Saud",
    date: "Dec 10, 2025",
    status: "published",
    readTime: "8 min",
    heroPhoto: "photo-1470225620780-dba8ba36b745",
    tags: ["Music", "MDL Beast", "Events"],
  },
  {
    slug: "red-sea-film",
    title: "The Red Sea International Film Festival and Arab Cinema's New Confidence",
    category: "Culture",
    author: "Omar Al-Zayed",
    date: "Nov 22, 2025",
    status: "published",
    readTime: "7 min",
    heroPhoto: "photo-1514320291840-2e0a9bf2a9ae",
    tags: ["Film", "Culture", "Cinema"],
  },
];

const CATEGORIES = [
  { name: "Culture", count: 2, color: "#8b5cf6", href: "/culture" },
  { name: "Sports", count: 1, color: "#22c55e", href: "/sports" },
  { name: "F&B", count: 1, color: "#f59e0b", href: "/f-and-b" },
  { name: "Events", count: 2, color: "#ec4899", href: "/events" },
  { name: "Interviews", count: 1, color: "#06b6d4", href: "/interviews" },
  { name: "Headlines", count: 1, color: "#ef4444", href: "/headlines" },
  { name: "Architecture & Design", count: 1, color: "#64748b", href: "/culture" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Culture": "#8b5cf6",
  "Sports": "#22c55e",
  "F&B": "#f59e0b",
  "Events": "#ec4899",
  "Interviews": "#06b6d4",
  "Headlines": "#ef4444",
  "Architecture & Design": "#64748b",
};

type Tab = "overview" | "articles" | "media";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = ARTICLES.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || a.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: "100svh", background: "#0d0d0d", color: "#e5e5e5", fontFamily: "var(--font-body, system-ui, sans-serif)" }}>

      {/* Top bar */}
      <header style={{ borderBottom: "1px solid #222", background: "#111", display: "flex", alignItems: "center", gap: 0, height: 56, padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <div style={{ width: 28, height: 28, background: "#c8ff00", borderRadius: 4, display: "grid", placeItems: "center", fontWeight: 900, fontSize: 13, color: "#000" }}>S</div>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.05em", color: "#fff" }}>SAUDI MAG</span>
          <span style={{ color: "#444", margin: "0 6px" }}>/</span>
          <span style={{ fontSize: 13, color: "#888", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Admin</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 15 }}>←</span> View site
          </Link>
          <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden" }}>
            <img src={U("photo-1507003211169-0a1dd7228f2d", 64, 64)} alt="Admin" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100svh - 56px)" }}>

        {/* Sidebar */}
        <aside style={{ width: 200, background: "#111", borderRight: "1px solid #222", padding: "20px 0", flexShrink: 0 }}>
          {(["overview", "articles", "media"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 20px",
                background: tab === t ? "#1a1a1a" : "transparent",
                border: "none", borderLeft: tab === t ? "2px solid #c8ff00" : "2px solid transparent",
                color: tab === t ? "#fff" : "#888", fontSize: 13, fontWeight: tab === t ? 700 : 400,
                textAlign: "left", cursor: "pointer", textTransform: "capitalize", letterSpacing: "0.04em",
              }}
            >
              <span style={{ fontSize: 16 }}>
                {t === "overview" ? "⊞" : t === "articles" ? "☰" : "🖼"}
              </span>
              {t === "overview" ? "Dashboard" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <div style={{ margin: "16px 20px", borderTop: "1px solid #222" }} />
          <div style={{ padding: "0 20px" }}>
            <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontWeight: 700 }}>Quick links</p>
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={c.href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", textDecoration: "none" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#777" }}>{c.name}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#555" }}>{c.count}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: 28, overflowX: "auto" }}>

          {/* ── OVERVIEW TAB ── */}
          {tab === "overview" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Dashboard</h1>
              <p style={{ color: "#666", fontSize: 13, marginBottom: 28 }}>Content overview for Saudi Mag editorial team.</p>

              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
                {[
                  { label: "Total Articles", value: "9", sub: "All published", accent: "#c8ff00" },
                  { label: "Categories", value: "7", sub: "Active sections", accent: "#06b6d4" },
                  { label: "Contributors", value: "5", sub: "Active authors", accent: "#8b5cf6" },
                  { label: "Avg. Read Time", value: "8.7m", sub: "Per article", accent: "#f59e0b" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, padding: "18px 20px" }}>
                    <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 8 }}>{s.label}</p>
                    <p style={{ fontSize: 32, fontWeight: 900, color: s.accent, lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Recent articles + Category breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
                <div style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Recent Articles</p>
                    <button onClick={() => setTab("articles")} style={{ fontSize: 11, color: "#c8ff00", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all →</button>
                  </div>
                  {ARTICLES.slice(0, 5).map((a, i) => (
                    <div key={a.slug} style={{ display: "flex", gap: 14, padding: "14px 20px", borderBottom: i < 4 ? "1px solid #1a1a1a" : "none", alignItems: "center" }}>
                      <div style={{ width: 52, height: 36, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                        <img src={U(a.heroPhoto, 104, 72)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#ddd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</p>
                        <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{a.author} · {a.date}</p>
                      </div>
                      <span style={{ fontSize: 10, background: "#1e2a1e", color: "#4ade80", border: "1px solid #2d4a2d", borderRadius: 4, padding: "2px 7px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>Live</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #222" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>By Category</p>
                  </div>
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                    {CATEGORIES.map((c) => (
                      <div key={c.name}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 12, color: "#aaa" }}>{c.name}</span>
                          <span style={{ fontSize: 12, color: "#666" }}>{c.count}</span>
                        </div>
                        <div style={{ height: 4, background: "#222", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${(c.count / 9) * 100}%`, background: c.color, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Authors */}
              <div style={{ marginTop: 20, background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #222" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Contributors</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1 }}>
                  {[
                    { name: "Laila Al-Fayed", role: "Architecture Editor", photo: "photo-1494790108377-be9c29b29330", articles: 2 },
                    { name: "Khalid Al-Rasheed", role: "Sports Correspondent", photo: "photo-1507003211169-0a1dd7228f2d", articles: 1 },
                    { name: "Nour Al-Saud", role: "Events Editor", photo: "photo-1531746020798-e6953c6e8e04", articles: 2 },
                    { name: "Reem Al-Jabri", role: "Food & Culture", photo: "photo-1517841905240-472988babdf9", articles: 1 },
                    { name: "Tariq Al-Mansouri", role: "Senior Correspondent", photo: "photo-1534528741775-53994a69daeb", articles: 2 },
                  ].map((author) => (
                    <div key={author.name} style={{ padding: "16px 20px", borderRight: "1px solid #1a1a1a", textAlign: "center" }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", margin: "0 auto 10px" }}>
                        <img src={U(author.photo, 96, 96)} alt={author.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", marginBottom: 2 }}>{author.name}</p>
                      <p style={{ fontSize: 11, color: "#555" }}>{author.role}</p>
                      <p style={{ fontSize: 11, color: "#c8ff00", marginTop: 6, fontWeight: 700 }}>{author.articles} article{author.articles !== 1 ? "s" : ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ARTICLES TAB ── */}
          {tab === "articles" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Articles</h1>
                  <p style={{ color: "#666", fontSize: 13 }}>{filtered.length} of {ARTICLES.length} articles</p>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles..."
                    style={{ background: "#161616", border: "1px solid #333", borderRadius: 7, padding: "8px 14px", color: "#ddd", fontSize: 13, outline: "none", width: 220 }}
                  />
                  <select
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    style={{ background: "#161616", border: "1px solid #333", borderRadius: 7, padding: "8px 14px", color: "#ddd", fontSize: 13, outline: "none" }}
                  >
                    <option>All</option>
                    {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 130px 140px 80px 100px", gap: 0, padding: "10px 16px", borderBottom: "1px solid #222" }}>
                  {["", "Title", "Category", "Author", "Read", "Actions"].map((h) => (
                    <span key={h} style={{ fontSize: 10, color: "#555", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</span>
                  ))}
                </div>
                {filtered.map((a, i) => (
                  <div key={a.slug} style={{
                    display: "grid", gridTemplateColumns: "60px 1fr 130px 140px 80px 100px",
                    gap: 0, padding: "12px 16px", alignItems: "center",
                    borderBottom: i < filtered.length - 1 ? "1px solid #1a1a1a" : "none",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ width: 44, height: 30, borderRadius: 5, overflow: "hidden" }}>
                      <img src={U(a.heroPhoto, 88, 60)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ paddingRight: 12 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#ddd", marginBottom: 3, lineHeight: 1.3 }}>{a.title}</p>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {a.tags.slice(0, 2).map((t) => (
                          <span key={t} style={{ fontSize: 10, background: "#222", color: "#777", borderRadius: 3, padding: "1px 6px" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: `${CATEGORY_COLORS[a.category]}18`, color: CATEGORY_COLORS[a.category] }}>
                        {a.category}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: "#aaa" }}>{a.author}</p>
                      <p style={{ fontSize: 11, color: "#555" }}>{a.date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: "#666" }}>{a.readTime}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/article/${a.slug}`} style={{ fontSize: 11, color: "#c8ff00", textDecoration: "none", fontWeight: 700, padding: "4px 10px", border: "1px solid #c8ff0040", borderRadius: 5 }}>View</Link>
                      <button style={{ fontSize: 11, color: "#666", background: "none", border: "1px solid #2a2a2a", borderRadius: 5, padding: "4px 10px", cursor: "pointer" }}>Edit</button>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: "48px 20px", textAlign: "center", color: "#555" }}>No articles match your filters.</div>
                )}
              </div>
            </div>
          )}

          {/* ── MEDIA TAB ── */}
          {tab === "media" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Media Library</h1>
              <p style={{ color: "#666", fontSize: 13, marginBottom: 24 }}>Hero images across all {ARTICLES.length} articles.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {ARTICLES.map((a) => (
                  <div key={a.slug} style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                      <img
                        src={U(a.heroPhoto, 600, 338)}
                        alt={a.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#ddd", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: `${CATEGORY_COLORS[a.category]}18`, color: CATEGORY_COLORS[a.category] }}>{a.category}</span>
                        <Link href={`/article/${a.slug}`} style={{ fontSize: 11, color: "#888", textDecoration: "none" }}>View →</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
