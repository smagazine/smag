"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface BodyBlock {
  id: string;
  type: "p" | "h2" | "blockquote" | "video";
  text: string;
  videoUrl?: string;
}

interface Article {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  meta: string;
  heroPhoto: string;
  authorPhoto: string;
  relatedPhotos: [string, string, string];
  body: BodyBlock[];
  tags: string[];
  relatedCategory: string;
  status?: "draft" | "published";
  featured?: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Architecture & Design",
  "Sports",
  "F&B",
  "Events",
  "Interviews",
  "Headlines",
  "Culture",
];

const RELATED_CATEGORIES = [
  { label: "Culture", value: "culture" },
  { label: "Sports", value: "sports" },
  { label: "F&B", value: "f-and-b" },
  { label: "Events", value: "events" },
  { label: "Interviews", value: "interviews" },
  { label: "Headlines", value: "headlines" },
];

const CAT_COLOR: Record<string, string> = {
  "Culture": "#8b5cf6",
  "Sports": "#22c55e",
  "F&B": "#f59e0b",
  "Events": "#ec4899",
  "Interviews": "#06b6d4",
  "Headlines": "#ef4444",
  "Architecture & Design": "#64748b",
};

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const uid = () => Math.random().toString(36).slice(2, 9);

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const BLANK_ARTICLE: Article = {
  slug: "",
  category: "Culture",
  title: "",
  subtitle: "",
  author: "",
  authorRole: "",
  meta: "",
  heroPhoto: "",
  authorPhoto: "",
  relatedPhotos: ["", "", ""],
  body: [{ id: uid(), type: "p", text: "" }],
  tags: [],
  relatedCategory: "culture",
  status: "published",
  featured: false,
};

// ── Sub-components ─────────────────────────────────────────────────────────

function extractPhotoId(raw: string): string {
  const urlMatch = raw.match(/unsplash\.com\/(photo-[\w-]+)/);
  if (urlMatch) return urlMatch[1];
  if (raw.startsWith("photo-")) return raw;
  if (/^[\da-z]+-[\da-z-]+$/.test(raw)) return `photo-${raw}`;
  return raw;
}

function PhotoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const photoId = value.startsWith("photo-") ? value : value ? `photo-${value}` : "";
  const previewSrc = photoId ? U(photoId, 240, 160) : null;

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={value}
          onChange={(e) => onChange(extractPhotoId(e.target.value))}
          placeholder="photo-xxx… or paste full Unsplash URL"
        />
        {previewSrc && (
          <div style={{ width: 80, height: 54, borderRadius: 6, overflow: "hidden", flexShrink: 0, border: "1px solid #333" }}>
            <img
              src={previewSrc}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.currentTarget.parentElement!.style.display = "none"); }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function BlockEditor({
  block,
  idx,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  block: BodyBlock;
  idx: number;
  total: number;
  onChange: (b: BodyBlock) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const typeColors: Record<string, string> = {
    p: "#64748b",
    h2: "#c8ff00",
    blockquote: "#8b5cf6",
    video: "#f59e0b",
  };

  return (
    <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, padding: 14, marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <select
          value={block.type}
          onChange={(e) => onChange({ ...block, type: e.target.value as BodyBlock["type"] })}
          style={{ ...selectStyle, fontSize: 11, padding: "4px 8px", color: typeColors[block.type], fontWeight: 700, minWidth: 110 }}
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading H2</option>
          <option value="blockquote">Blockquote</option>
          <option value="video">Video</option>
        </select>
        <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={idx === 0}
            style={{ ...iconBtnStyle, opacity: idx === 0 ? 0.3 : 1 }}
            title="Move up"
          >↑</button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={idx === total - 1}
            style={{ ...iconBtnStyle, opacity: idx === total - 1 ? 0.3 : 1 }}
            title="Move down"
          >↓</button>
          <button
            type="button"
            onClick={onDelete}
            style={{ ...iconBtnStyle, color: "#ef4444", borderColor: "#3a1a1a" }}
            title="Delete block"
          >✕</button>
        </div>
      </div>

      <textarea
        value={block.text}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        rows={block.type === "p" ? 4 : 2}
        placeholder={
          block.type === "p" ? "Paragraph text…" :
          block.type === "h2" ? "Section heading…" :
          block.type === "blockquote" ? "“Quote text…”" :
          "Embed title or description…"
        }
        style={{ ...textareaStyle, fontStyle: block.type === "blockquote" ? "italic" : "normal", fontWeight: block.type === "h2" ? 700 : 400, fontSize: block.type === "h2" ? 15 : 13 }}
      />

      {block.type === "p" && (
        <p style={{ fontSize: 10, color: "#444", marginTop: 6, lineHeight: 1.5 }}>
          Markdown: <code style={{ color: "#666" }}>**bold**</code> · <code style={{ color: "#666" }}>*italic*</code> · <code style={{ color: "#666" }}>[link](url)</code>
        </p>
      )}
      {block.type === "video" && (
        <input
          value={block.videoUrl ?? ""}
          onChange={(e) => onChange({ ...block, videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/embed/…"
          style={{ ...inputStyle, marginTop: 8 }}
        />
      )}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 6,
  padding: "9px 12px",
  color: "#ddd",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.6,
};

const selectStyle: React.CSSProperties = {
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 6,
  padding: "9px 12px",
  color: "#ddd",
  fontSize: 13,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 6,
};

const iconBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid #2a2a2a",
  borderRadius: 5,
  color: "#888",
  cursor: "pointer",
  fontSize: 13,
  padding: "3px 8px",
  lineHeight: 1,
};

const sectionCard: React.CSSProperties = {
  background: "#161616",
  border: "1px solid #222",
  borderRadius: 10,
  padding: "20px 22px",
  marginBottom: 16,
};

// ── Main Component ─────────────────────────────────────────────────────────

type Tab = "articles" | "editor" | "media";

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tab, setTab] = useState<Tab>("articles");
  const [draft, setDraft] = useState<Article>(BLANK_ARTICLE);
  const [isNew, setIsNew] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [slugLocked, setSlugLocked] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      setArticles(await res.json());
    } catch {
      showToast("Failed to load articles", "err");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  // Auto-slug from title when creating new article
  useEffect(() => {
    if (isNew && !slugLocked && draft.title) {
      setDraft((d) => ({ ...d, slug: slugify(d.title) }));
    }
  }, [draft.title, isNew, slugLocked]);

  function openNew() {
    setDraft({ ...BLANK_ARTICLE, body: [{ id: uid(), type: "p", text: "" }] });
    setIsNew(true);
    setSlugLocked(false);
    setTab("editor");
    setTimeout(() => editorRef.current?.scrollTo({ top: 0 }), 50);
  }

  function openEdit(article: Article) {
    setDraft({ ...article, relatedPhotos: [...article.relatedPhotos] as [string, string, string] });
    setIsNew(false);
    setSlugLocked(true);
    setTab("editor");
    setTimeout(() => editorRef.current?.scrollTo({ top: 0 }), 50);
  }

  async function save() {
    if (!draft.title.trim()) return showToast("Title is required", "err");
    if (!draft.slug.trim()) return showToast("Slug is required", "err");
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/articles" : `/api/articles/${draft.slug}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error();
      await fetchArticles();
      showToast(isNew ? "Article created!" : "Article saved!");
      setTab("articles");
    } catch {
      showToast("Save failed", "err");
    } finally {
      setSaving(false);
    }
  }

  async function toggleFeatured(article: Article) {
    const updated = { ...article, featured: !article.featured };
    try {
      await fetch(`/api/articles/${article.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      await fetchArticles();
      showToast(updated.featured ? "Set as featured story" : "Removed from featured");
    } catch {
      showToast("Failed to update", "err");
    }
  }

  async function confirmDelete(slug: string) {
    try {
      await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      await fetchArticles();
      showToast("Article deleted");
      if (tab === "editor") setTab("articles");
    } catch {
      showToast("Delete failed", "err");
    } finally {
      setDeleteConfirm(null);
    }
  }

  function updateBlock(idx: number, b: BodyBlock) {
    setDraft((d) => {
      const body = [...d.body];
      body[idx] = b;
      return { ...d, body };
    });
  }

  function deleteBlock(idx: number) {
    setDraft((d) => ({ ...d, body: d.body.filter((_, i) => i !== idx) }));
  }

  function moveBlock(idx: number, dir: -1 | 1) {
    setDraft((d) => {
      const body = [...d.body];
      const target = idx + dir;
      if (target < 0 || target >= body.length) return d;
      [body[idx], body[target]] = [body[target], body[idx]];
      return { ...d, body };
    });
  }

  function addBlock(type: BodyBlock["type"]) {
    setDraft((d) => ({
      ...d,
      body: [...d.body, { id: uid(), type, text: "", videoUrl: type === "video" ? "" : undefined }],
    }));
  }

  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    return (
      (filterCat === "All" || a.category === filterCat) &&
      (!q || a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q))
    );
  });

  const S = (key: keyof Article) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  const wordCount = draft.body.filter(b => b.type === "p" || b.type === "blockquote").reduce((acc, b) => acc + b.text.split(/\s+/).filter(Boolean).length, 0);

  return (
    <div style={{ minHeight: "100svh", background: "#0d0d0d", color: "#e5e5e5", fontFamily: "var(--font-body,system-ui,sans-serif)", display: "flex", flexDirection: "column" }}>

      {/* Top bar */}
      <header style={{ borderBottom: "1px solid #1e1e1e", background: "#111", display: "flex", alignItems: "center", height: 52, padding: "0 20px", flexShrink: 0, gap: 12 }}>
        <div style={{ width: 26, height: 26, background: "#c8ff00", borderRadius: 4, display: "grid", placeItems: "center", fontWeight: 900, fontSize: 12, color: "#000" }}>S</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: "0.06em" }}>SAUDI MAG</span>
        <span style={{ color: "#333" }}>/</span>
        <span style={{ fontSize: 12, color: "#666", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {tab === "editor" ? (isNew ? "New Article" : "Edit Article") : "Admin"}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          {tab === "editor" && (
            <button
              type="button"
              onClick={() => setTab("articles")}
              style={{ fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
            >
              ← Back
            </button>
          )}
          <Link href="/" style={{ fontSize: 12, color: "#888", textDecoration: "none" }}>← View site</Link>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Sidebar */}
        <aside style={{ width: 190, background: "#111", borderRight: "1px solid #1e1e1e", padding: "16px 0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          {(["articles", "media"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 18px",
                background: tab === t || (tab === "editor" && t === "articles") ? "#1a1a1a" : "transparent",
                border: "none",
                borderLeft: tab === t || (tab === "editor" && t === "articles") ? "2px solid #c8ff00" : "2px solid transparent",
                color: tab === t || (tab === "editor" && t === "articles") ? "#fff" : "#777",
                fontSize: 13, fontWeight: 600, textAlign: "left", cursor: "pointer", letterSpacing: "0.03em",
              }}
            >
              <span>{t === "articles" ? "☰" : "🖼"}</span>
              {t === "articles" ? "Articles" : "Media"}
            </button>
          ))}

          <div style={{ margin: "12px 18px", borderTop: "1px solid #1e1e1e" }} />

          <button
            type="button"
            onClick={openNew}
            style={{ margin: "0 12px", padding: "9px 12px", background: "#c8ff00", color: "#000", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 800, cursor: "pointer", letterSpacing: "0.04em" }}
          >
            + New Article
          </button>

          <div style={{ marginTop: "auto", padding: "16px 18px", borderTop: "1px solid #1e1e1e" }}>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>{articles.length} articles total</p>
            {CATEGORIES.map((c) => {
              const count = articles.filter(a => a.category === c).length;
              if (!count) return null;
              return (
                <div key={c} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                  <span style={{ fontSize: 11, color: "#666", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: CAT_COLOR[c] ?? "#888", display: "inline-block" }} />
                    {c}
                  </span>
                  <span style={{ fontSize: 11, color: "#444" }}>{count}</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main area */}
        <main ref={editorRef} style={{ flex: 1, overflowY: "auto", padding: 24, position: "relative" }}>

          {/* ── ARTICLES LIST ── */}
          {tab === "articles" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
                <div>
                  <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Articles</h1>
                  <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{filtered.length} of {articles.length}</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search…"
                    style={{ ...inputStyle, width: 200 }}
                  />
                  <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={selectStyle}>
                    <option>All</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {loading ? (
                <p style={{ color: "#555", textAlign: "center", padding: 48 }}>Loading…</p>
              ) : (
                <div style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                  {filtered.length === 0 && (
                    <p style={{ padding: 40, textAlign: "center", color: "#555" }}>No articles found.</p>
                  )}
                  {filtered.map((article, i) => (
                    <div
                      key={article.slug}
                      style={{
                        display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 14,
                        padding: "13px 16px", alignItems: "center",
                        borderBottom: i < filtered.length - 1 ? "1px solid #1a1a1a" : "none",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1c1c")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    >
                      <div style={{ width: 48, height: 34, borderRadius: 5, overflow: "hidden", flexShrink: 0 }}>
                        {article.heroPhoto ? (
                          <img
                            src={U(article.heroPhoto.startsWith("photo-") ? article.heroPhoto : `photo-${article.heroPhoto}`, 96, 68)}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "#222" }} />
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#ddd", marginBottom: 3 }}>{article.title}</p>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: `${CAT_COLOR[article.category] ?? "#888"}18`, color: CAT_COLOR[article.category] ?? "#888" }}>
                            {article.category}
                          </span>
                          {(article.status ?? "published") === "draft" && (
                            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: "#f59e0b20", color: "#f59e0b", letterSpacing: "0.08em" }}>DRAFT</span>
                          )}
                          <span style={{ fontSize: 11, color: "#555" }}>{article.author}</span>
                          <span style={{ fontSize: 11, color: "#444" }}>·</span>
                          <span style={{ fontSize: 11, color: "#555" }}>{article.meta.split("·")[0]?.trim()}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => toggleFeatured(article)}
                          title={article.featured ? "Featured homepage hero" : "Set as featured"}
                          style={{ fontSize: 16, color: article.featured ? "#c8ff00" : "#444", background: "none", border: "1px solid #2a2a2a", borderRadius: 5, padding: "4px 9px", cursor: "pointer", lineHeight: 1 }}
                        >
                          {article.featured ? "★" : "☆"}
                        </button>
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          style={{ fontSize: 11, color: "#888", textDecoration: "none", padding: "5px 10px", border: "1px solid #2a2a2a", borderRadius: 5 }}
                        >
                          View ↗
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEdit(article)}
                          style={{ fontSize: 11, color: "#c8ff00", background: "none", border: "1px solid #c8ff0040", borderRadius: 5, padding: "5px 10px", cursor: "pointer", fontWeight: 700 }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(article.slug)}
                          style={{ fontSize: 11, color: "#ef4444", background: "none", border: "1px solid #3a1a1a", borderRadius: 5, padding: "5px 10px", cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── ARTICLE EDITOR ── */}
          {tab === "editor" && (
            <div style={{ maxWidth: 780 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <div>
                  <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>
                    {isNew ? "New Article" : "Edit Article"}
                  </h1>
                  {!isNew && (
                    <p style={{ fontSize: 12, color: "#555", marginTop: 3 }}>
                      /article/{draft.slug}
                      {" · "}
                      <Link href={`/article/${draft.slug}`} target="_blank" style={{ color: "#c8ff00", textDecoration: "none" }}>View live ↗</Link>
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {!isNew && (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(draft.slug)}
                      style={{ fontSize: 12, color: "#ef4444", background: "none", border: "1px solid #3a1a1a", borderRadius: 7, padding: "8px 14px", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setTab("articles")}
                    style={{ fontSize: 12, color: "#888", background: "none", border: "1px solid #2a2a2a", borderRadius: 7, padding: "8px 14px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    disabled={saving}
                    style={{ fontSize: 12, fontWeight: 800, color: "#000", background: saving ? "#888" : "#c8ff00", border: "none", borderRadius: 7, padding: "8px 18px", cursor: saving ? "not-allowed" : "pointer" }}
                  >
                    {saving ? "Saving…" : (draft.status ?? "published") === "draft" ? (isNew ? "Save draft" : "Save draft") : (isNew ? "Publish" : "Save changes")}
                  </button>
                </div>
              </div>

              {/* Identity */}
              <div style={sectionCard}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Identity</p>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Title</label>
                  <input style={inputStyle} value={draft.title} onChange={S("title")} placeholder="Article headline…" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Subtitle / Deck</label>
                  <textarea style={{ ...textareaStyle, height: 72 }} value={draft.subtitle} onChange={S("subtitle")} placeholder="One-paragraph summary shown below the title…" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>
                      Slug
                      {!isNew && <span style={{ color: "#444", fontWeight: 400, marginLeft: 6 }}>(read-only)</span>}
                    </label>
                    <input
                      style={{ ...inputStyle, color: isNew ? "#ddd" : "#555" }}
                      value={draft.slug}
                      readOnly={!isNew}
                      onChange={(e) => { setSlugLocked(true); setDraft(d => ({ ...d, slug: e.target.value })); }}
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <select style={{ ...selectStyle, width: "100%" }} value={draft.category} onChange={S("category")}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select
                      style={{ ...selectStyle, width: "100%", color: (draft.status ?? "published") === "draft" ? "#f59e0b" : "#c8ff00" }}
                      value={draft.status ?? "published"}
                      onChange={(e) => setDraft(d => ({ ...d, status: e.target.value as "draft" | "published" }))}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 2 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", fontSize: 13, color: draft.featured ? "#c8ff00" : "#888", userSelect: "none" }}>
                      <input
                        type="checkbox"
                        checked={draft.featured ?? false}
                        onChange={(e) => setDraft(d => ({ ...d, featured: e.target.checked }))}
                        style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#c8ff00" }}
                      />
                      Featured (homepage hero)
                    </label>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div style={sectionCard}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Author</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>Author name</label>
                    <input style={inputStyle} value={draft.author} onChange={S("author")} placeholder="Full name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Author role</label>
                    <input style={inputStyle} value={draft.authorRole} onChange={S("authorRole")} placeholder="e.g. Sports Correspondent" />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Meta (date · read time)</label>
                  <input style={inputStyle} value={draft.meta} onChange={S("meta")} placeholder="June 28, 2026 · 8 min read" />
                </div>
                <PhotoField label="Author photo ID" value={draft.authorPhoto} onChange={(v) => setDraft(d => ({ ...d, authorPhoto: v }))} />
              </div>

              {/* Media */}
              <div style={sectionCard}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Media</p>
                <PhotoField label="Hero photo ID" value={draft.heroPhoto} onChange={(v) => setDraft(d => ({ ...d, heroPhoto: v }))} />
                {([0, 1, 2] as const).map((i) => (
                  <PhotoField
                    key={i}
                    label={`Related photo ${i + 1}`}
                    value={draft.relatedPhotos[i] ?? ""}
                    onChange={(v) => {
                      const rp = [...draft.relatedPhotos] as [string, string, string];
                      rp[i] = v;
                      setDraft(d => ({ ...d, relatedPhotos: rp }));
                    }}
                  />
                ))}
              </div>

              {/* Body */}
              <div style={sectionCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Body — {draft.body.length} block{draft.body.length !== 1 ? "s" : ""} · ~{wordCount} words
                  </p>
                  <div style={{ display: "flex", gap: 6 }}>
                    {(["p", "h2", "blockquote", "video"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => addBlock(t)}
                        style={{
                          fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 4, cursor: "pointer", border: "1px solid",
                          background: "transparent",
                          color: t === "p" ? "#64748b" : t === "h2" ? "#c8ff00" : t === "blockquote" ? "#8b5cf6" : "#f59e0b",
                          borderColor: t === "p" ? "#64748b40" : t === "h2" ? "#c8ff0040" : t === "blockquote" ? "#8b5cf640" : "#f59e0b40",
                        }}
                      >
                        + {t === "p" ? "Para" : t === "h2" ? "H2" : t === "blockquote" ? "Quote" : "Video"}
                      </button>
                    ))}
                  </div>
                </div>

                {draft.body.length === 0 && (
                  <p style={{ color: "#555", fontSize: 13, padding: "24px 0", textAlign: "center" }}>
                    No blocks yet. Add a paragraph to get started.
                  </p>
                )}

                {draft.body.map((block, idx) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    idx={idx}
                    total={draft.body.length}
                    onChange={(b) => updateBlock(idx, b)}
                    onDelete={() => deleteBlock(idx)}
                    onMove={(dir) => moveBlock(idx, dir)}
                  />
                ))}
              </div>

              {/* Metadata */}
              <div style={sectionCard}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Metadata</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Tags (comma-separated)</label>
                    <input
                      style={inputStyle}
                      value={draft.tags.join(", ")}
                      onChange={(e) => setDraft(d => ({ ...d, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))}
                      placeholder="Culture, Design, Riyadh"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Related category (for "Read Next")</label>
                    <select style={{ ...selectStyle, width: "100%" }} value={draft.relatedCategory} onChange={S("relatedCategory")}>
                      {RELATED_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bottom save bar */}
              <div style={{ position: "sticky", bottom: 0, background: "#0d0d0d", borderTop: "1px solid #1e1e1e", padding: "14px 0", display: "flex", justifyContent: "flex-end", gap: 8 }}>
                {!isNew && (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(draft.slug)}
                    style={{ fontSize: 13, color: "#ef4444", background: "none", border: "1px solid #3a1a1a", borderRadius: 7, padding: "10px 18px", cursor: "pointer" }}
                  >
                    Delete article
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setTab("articles")}
                  style={{ fontSize: 13, color: "#888", background: "none", border: "1px solid #2a2a2a", borderRadius: 7, padding: "10px 18px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={saving}
                  style={{ fontSize: 13, fontWeight: 800, color: "#000", background: saving ? "#888" : "#c8ff00", border: "none", borderRadius: 7, padding: "10px 24px", cursor: saving ? "not-allowed" : "pointer" }}
                >
                  {saving ? "Saving…" : (draft.status ?? "published") === "draft" ? (isNew ? "Save draft" : "Save draft") : (isNew ? "Publish article" : "Save changes")}
                </button>
              </div>
            </div>
          )}

          {/* ── MEDIA GRID ── */}
          {tab === "media" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Media</h1>
              <p style={{ fontSize: 12, color: "#555", marginBottom: 20 }}>Hero images across all {articles.length} articles</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                {articles.map((a) => {
                  const pid = a.heroPhoto.startsWith("photo-") ? a.heroPhoto : `photo-${a.heroPhoto}`;
                  return (
                    <div key={a.slug} style={{ background: "#161616", border: "1px solid #222", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ aspectRatio: "16/9", overflow: "hidden", cursor: "pointer" }} onClick={() => openEdit(a)}>
                        {a.heroPhoto ? (
                          <img src={U(pid, 480, 270)} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", display: "block" }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "#222", display: "grid", placeItems: "center", color: "#444", fontSize: 12 }}>No image</div>
                        )}
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 6 }}>{a.title}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: `${CAT_COLOR[a.category] ?? "#888"}18`, color: CAT_COLOR[a.category] ?? "#888" }}>{a.category}</span>
                          <button type="button" onClick={() => openEdit(a)} style={{ fontSize: 11, color: "#c8ff00", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Edit →</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "grid", placeItems: "center", zIndex: 100 }}>
          <div style={{ background: "#161616", border: "1px solid #333", borderRadius: 12, padding: 28, maxWidth: 380, width: "90%" }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Delete article?</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 22, lineHeight: 1.5 }}>
              This will permanently delete <strong style={{ color: "#ddd" }}>{articles.find(a => a.slug === deleteConfirm)?.title}</strong>. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setDeleteConfirm(null)} style={{ fontSize: 13, color: "#888", background: "none", border: "1px solid #2a2a2a", borderRadius: 7, padding: "9px 16px", cursor: "pointer" }}>Cancel</button>
              <button type="button" onClick={() => confirmDelete(deleteConfirm)} style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: "#ef4444", border: "none", borderRadius: 7, padding: "9px 16px", cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 200,
          background: toast.type === "ok" ? "#c8ff00" : "#ef4444",
          color: toast.type === "ok" ? "#000" : "#fff",
          padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.2s ease",
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
}
