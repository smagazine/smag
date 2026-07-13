"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface BodyBlock {
  id: string;
  type: "p" | "h2" | "blockquote" | "video";
  text: string;
  textAr?: string;
  videoUrl?: string;
}

interface Article {
  slug: string;
  category: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
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

interface ContactEntry {
  name: string;
  email: string;
  type: string;
  message: string;
  receivedAt?: string;
}

interface SubscriberEntry {
  email: string;
  receivedAt?: string;
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
  "Sports": "#16a34a",
  "F&B": "#d97706",
  "Events": "#db2777",
  "Interviews": "#0891b2",
  "Headlines": "#dc2626",
  "Architecture & Design": "#64748b",
};

// Palette for the light "floating frame" admin shell.
const C = {
  page: "#dbdce1",
  frame: "#f3f3f5",
  card: "#ffffff",
  ink: "#141416",
  inkSoft: "#1f1f23",
  text: "#17181a",
  sub: "#8a8f98",
  faint: "#b3b7bf",
  line: "#e8e9ec",
  lime: "#a5ce39",
  limeInk: "#3d4d00",
  red: "#e5484d",
};

const FONT = "var(--font-brand, system-ui, sans-serif)";

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const pid = (raw: string) => (raw.startsWith("photo-") ? raw : `photo-${raw}`);

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

// ── Icons (inline stroke SVGs, matching the soft-line reference style) ─────

function Ic({ d, size = 17 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h5M10 17h5",
  img: "M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M9 9h.01",
  inbox: "M4 4h16v16H4zM4 13h5l1.5 2.5h3L15 13h5",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.35-4.35",
  plus: "M12 5v14M5 12h14",
  arrow: "M7 17 17 7M9 7h8v8",
  logout: "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h9",
  star: "m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8z",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6",
};

// ── Shared style atoms ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#f3f3f5",
  border: "1px solid #ececef",
  borderRadius: 12,
  padding: "10px 14px",
  color: C.text,
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: FONT,
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  lineHeight: 1.6,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  width: "auto",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10.5,
  fontWeight: 700,
  color: C.sub,
  textTransform: "uppercase",
  letterSpacing: "0.09em",
  marginBottom: 7,
};

// Fully-rounded pill button, ghost variant by default.
const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  borderRadius: 999,
  border: `1px solid ${C.line}`,
  background: C.card,
  color: C.text,
  fontSize: 12,
  fontWeight: 600,
  padding: "8px 16px",
  cursor: "pointer",
  fontFamily: FONT,
  lineHeight: 1,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const darkPillStyle: React.CSSProperties = {
  ...pillStyle,
  background: C.ink,
  border: `1px solid ${C.ink}`,
  color: "#fff",
};

const limePillStyle: React.CSSProperties = {
  ...pillStyle,
  background: C.lime,
  border: `1px solid ${C.lime}`,
  color: "#111",
  fontWeight: 700,
};

const iconBtnStyle: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 999,
  border: `1px solid ${C.line}`,
  background: C.card,
  color: C.sub,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const cardStyle: React.CSSProperties = {
  background: C.card,
  borderRadius: 22,
  padding: "20px 22px",
  boxShadow: "0 1px 2px rgba(20,20,22,0.04), 0 8px 28px rgba(20,20,22,0.05)",
};

const darkCardStyle: React.CSSProperties = {
  ...cardStyle,
  background: C.ink,
  color: "#fff",
  boxShadow: "0 14px 36px rgba(20,20,22,0.28)",
};

const sectionLabel: React.CSSProperties = {
  fontSize: 10.5,
  fontWeight: 700,
  color: C.sub,
  textTransform: "uppercase",
  letterSpacing: "0.11em",
  marginBottom: 16,
};

function catChip(cat: string, dark = false): React.CSSProperties {
  const col = CAT_COLOR[cat] ?? "#64748b";
  return {
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: 999,
    background: dark ? "rgba(255,255,255,0.12)" : `${col}16`,
    color: dark ? "#e5e5e5" : col,
    whiteSpace: "nowrap",
  };
}

// ── Small pieces ───────────────────────────────────────────────────────────

/** S. monogram tile from the brand sheet: white S on black, lime dot. */
function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <div style={{ position: "relative", width: size, height: size, background: "#000", borderRadius: Math.round(size * 0.3), display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: size * 0.5, flexShrink: 0, fontFamily: FONT }}>
      S
      <span style={{ position: "absolute", right: size * 0.13, bottom: size * 0.17, width: size * 0.16, height: size * 0.16, borderRadius: 999, background: C.lime }} />
    </div>
  );
}

/** Inline SAUDI. MAG wordmark. */
function BrandWord() {
  return (
    <div style={{ fontWeight: 800, fontSize: 12.5, color: C.text, letterSpacing: "0.09em" }}>
      SAUDI<span style={{ color: C.lime }}>.</span>{" "}
      <span style={{ color: "#7ba314", letterSpacing: "0.2em" }}>MAG</span>
    </div>
  );
}

/** Deterministic mini sparkline (no randomness → stable across renders). */
function Spark({ seed, color = C.ink, w = 84, h = 26 }: { seed: number; color?: string; w?: number; h?: number }) {
  const pts: string[] = [];
  const n = 12;
  for (let i = 0; i < n; i++) {
    const y = h / 2 + Math.sin(i * 1.1 + seed) * (h / 3.2) + Math.cos(i * 0.6 + seed * 2) * (h / 6);
    pts.push(`${(i / (n - 1)) * w},${Math.max(2, Math.min(h - 2, y)).toFixed(1)}`);
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Thumb({ photo, size = 30, radius = 999, ring = C.card }: { photo: string; size?: number; radius?: number; ring?: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", flexShrink: 0, border: `2px solid ${ring}`, background: "#d9dade" }}>
      {photo && (
        <img src={U(pid(photo), size * 2, size * 2)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      )}
    </div>
  );
}

function extractPhotoId(raw: string): string {
  const urlMatch = raw.match(/unsplash\.com\/(photo-[\w-]+)/);
  if (urlMatch) return urlMatch[1];
  if (raw.startsWith("photo-")) return raw;
  if (/^[\da-z]+-[\da-z-]+$/.test(raw)) return `photo-${raw}`;
  return raw;
}

function PhotoField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const previewSrc = value ? U(pid(value), 240, 160) : null;
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          value={value}
          onChange={(e) => onChange(extractPhotoId(e.target.value))}
          placeholder="photo-xxx… or paste full Unsplash URL"
        />
        {previewSrc && (
          <div style={{ width: 82, height: 54, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: `1px solid ${C.line}` }}>
            <img
              src={previewSrc}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.parentElement!.style.display = "none"; }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const BLOCK_COLORS: Record<string, string> = {
  p: "#64748b",
  h2: "#7ba314",
  blockquote: "#8b5cf6",
  video: "#d97706",
};

function BlockEditor({
  block, idx, total, onChange, onDelete, onMove,
}: {
  block: BodyBlock;
  idx: number;
  total: number;
  onChange: (b: BodyBlock) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <div style={{ background: "#f7f7f8", border: `1px solid ${C.line}`, borderRadius: 16, padding: 14, marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <select
          value={block.type}
          onChange={(e) => onChange({ ...block, type: e.target.value as BodyBlock["type"] })}
          style={{ ...selectStyle, background: C.card, fontSize: 11, padding: "5px 10px", borderRadius: 999, color: BLOCK_COLORS[block.type], fontWeight: 700, minWidth: 112 }}
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading H2</option>
          <option value="blockquote">Blockquote</option>
          <option value="video">Video</option>
        </select>
        <div style={{ display: "flex", gap: 5, marginLeft: "auto" }}>
          <button type="button" onClick={() => onMove(-1)} disabled={idx === 0} title="Move up"
            style={{ ...iconBtnStyle, width: 28, height: 28, opacity: idx === 0 ? 0.35 : 1, fontSize: 12 }}>↑</button>
          <button type="button" onClick={() => onMove(1)} disabled={idx === total - 1} title="Move down"
            style={{ ...iconBtnStyle, width: 28, height: 28, opacity: idx === total - 1 ? 0.35 : 1, fontSize: 12 }}>↓</button>
          <button type="button" onClick={onDelete} title="Delete block"
            style={{ ...iconBtnStyle, width: 28, height: 28, color: C.red, fontSize: 11 }}>✕</button>
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
        style={{ ...textareaStyle, background: C.card, fontStyle: block.type === "blockquote" ? "italic" : "normal", fontWeight: block.type === "h2" ? 700 : 400, fontSize: block.type === "h2" ? 15 : 13 }}
      />

      {block.type !== "video" && (
        <textarea
          value={block.textAr ?? ""}
          onChange={(e) => onChange({ ...block, textAr: e.target.value || undefined })}
          rows={block.type === "p" ? 4 : 2}
          dir="rtl"
          placeholder={
            block.type === "p" ? "النص العربي للفقرة…" :
            block.type === "h2" ? "العنوان الفرعي بالعربية…" :
            "«نص الاقتباس بالعربية…»"
          }
          style={{ ...textareaStyle, background: C.card, marginTop: 8, fontStyle: block.type === "blockquote" ? "italic" : "normal", fontWeight: block.type === "h2" ? 700 : 400, fontSize: block.type === "h2" ? 15 : 13 }}
        />
      )}

      {block.type === "p" && (
        <p style={{ fontSize: 10, color: C.faint, marginTop: 6, lineHeight: 1.5 }}>
          Markdown: <code style={{ color: C.sub }}>**bold**</code> · <code style={{ color: C.sub }}>*italic*</code> · <code style={{ color: C.sub }}>[link](url)</code> — Arabic field optional; English shows when empty.
        </p>
      )}
      {block.type === "video" && (
        <input
          value={block.videoUrl ?? ""}
          onChange={(e) => onChange({ ...block, videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/embed/…"
          style={{ ...inputStyle, background: C.card, marginTop: 8 }}
        />
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

type Tab = "dashboard" | "articles" | "editor" | "media" | "inbox";

const NAV: { key: Exclude<Tab, "editor">; label: string; icon: keyof typeof ICONS }[] = [
  { key: "dashboard", label: "Dashboard", icon: "home" },
  { key: "articles", label: "Articles", icon: "doc" },
  { key: "media", label: "Media", icon: "img" },
  { key: "inbox", label: "Inbox", icon: "inbox" },
];

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tab, setTab] = useState<Tab>("dashboard");
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
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pwd, setPwd] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberEntry[]>([]);

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

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      if (!res.ok) return;
      const d = await res.json();
      setContacts(Array.isArray(d.contacts) ? d.contacts : []);
      setSubscribers(Array.isArray(d.subscribers) ? d.subscribers : []);
    } catch {
      /* dashboard extras — non-fatal */
    }
  }, []);

  // Check existing session on mount; only load data once authenticated.
  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) {
      fetchArticles();
      fetchSubmissions();
    }
  }, [authed, fetchArticles, fetchSubmissions]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (!res.ok) {
        setLoginErr("Incorrect password");
        return;
      }
      setPwd("");
      setAuthed(true);
    } catch {
      setLoginErr("Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" }).catch(() => {});
    setAuthed(false);
    setArticles([]);
    setContacts([]);
    setSubscribers([]);
    setTab("dashboard");
  }

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

  const published = articles.filter(a => (a.status ?? "published") === "published");
  const drafts = articles.filter(a => (a.status ?? "published") === "draft");
  const featured = articles.find(a => a.featured);
  const pubPct = articles.length ? Math.round((published.length / articles.length) * 1000) / 10 : 0;

  const TITLES: Record<Tab, [string, string]> = {
    dashboard: ["Dashboard", "Everything happening across SAUDI MAG"],
    articles: ["Articles", `${filtered.length} of ${articles.length} stories`],
    editor: [isNew ? "New Article" : "Edit Article", isNew ? "Draft a new story" : `/article/${draft.slug}`],
    media: ["Media", `Hero images across all ${articles.length} articles`],
    inbox: ["Inbox", `${contacts.length} contact requests · ${subscribers.length} subscribers`],
  };

  // Session check in progress
  if (authed === null) {
    return (
      <div style={{ minHeight: "100svh", background: C.page, color: C.sub, display: "grid", placeItems: "center", fontSize: 13, fontFamily: FONT }}>
        Loading…
      </div>
    );
  }

  // Login gate
  if (!authed) {
    return (
      <div style={{ minHeight: "100svh", background: `radial-gradient(120% 120% at 20% 0%, #e9eaee 0%, ${C.page} 60%, #cfd1d7 100%)`, display: "grid", placeItems: "center", fontFamily: FONT }}>
        <form onSubmit={login} style={{ width: 340, background: C.card, borderRadius: 26, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 70px rgba(20,20,22,0.18)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
            <BrandMark />
            <div>
              <BrandWord />
              <div style={{ fontSize: 10.5, color: C.sub }}>Newsroom console</div>
            </div>
          </div>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Admin password</label>
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} autoFocus style={inputStyle} />
          {loginErr && <p style={{ fontSize: 12, color: C.red, margin: 0 }}>{loginErr}</p>}
          <button type="submit" disabled={loggingIn}
            style={{ ...darkPillStyle, justifyContent: "center", padding: "12px 16px", fontSize: 13, opacity: loggingIn ? 0.6 : 1 }}>
            {loggingIn ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  const activeNav = tab === "editor" ? "articles" : tab;
  const [title, subtitle] = TITLES[tab];

  return (
    <div style={{ minHeight: "100svh", background: `radial-gradient(130% 110% at 15% -10%, #eceef1 0%, ${C.page} 55%, #cccdd3 100%)`, padding: "clamp(10px, 2vw, 24px)", fontFamily: FONT, color: C.text, boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", height: "calc(100svh - clamp(20px, 4vw, 48px))", minHeight: 620, background: C.frame, borderRadius: 30, boxShadow: "0 30px 90px rgba(20,20,22,0.22), inset 0 1px 0 rgba(255,255,255,0.8)", display: "flex", overflow: "hidden" }}>

        {/* ── Sidebar rail ── */}
        <aside style={{ width: 218, flexShrink: 0, display: "flex", flexDirection: "column", padding: "26px 18px 20px", borderRight: `1px solid ${C.line}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 34 }}>
            <BrandMark />
            <div>
              <BrandWord />
              <div style={{ fontSize: 10, color: C.sub }}>Newsroom</div>
            </div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {NAV.map(({ key, label, icon }) => {
              const active = activeNav === key;
              return (
                <button key={key} onClick={() => setTab(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 11, padding: "11px 16px",
                    borderRadius: 999, border: "none", cursor: "pointer", textAlign: "left",
                    fontSize: 12.5, fontWeight: 600, fontFamily: FONT,
                    background: active ? C.ink : "transparent",
                    color: active ? "#fff" : C.sub,
                    boxShadow: active ? "0 10px 22px rgba(20,20,22,0.25)" : "none",
                    transition: "background 0.15s, color 0.15s",
                  }}>
                  <Ic d={ICONS[icon]} />
                  {label}
                  {key === "inbox" && contacts.length > 0 && (
                    <span style={{ marginLeft: "auto", background: active ? C.lime : "#e4e5e9", color: active ? "#111" : C.sub, borderRadius: 999, fontSize: 10, fontWeight: 700, padding: "2px 7px" }}>
                      {contacts.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <button type="button" onClick={openNew} style={{ ...limePillStyle, justifyContent: "center", marginTop: 18, padding: "11px 16px", boxShadow: "0 10px 24px rgba(166,214,31,0.4)" }}>
            <Ic d={ICONS.plus} size={14} /> New Article
          </button>

          <div style={{ marginTop: "auto" }}>
            <div style={{ borderTop: `1px solid ${C.line}`, margin: "0 6px 14px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: `linear-gradient(135deg, ${C.lime}, #5f8c00)`, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, color: "#111", flexShrink: 0 }}>A</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Admin</div>
                <Link href="/" style={{ fontSize: 10.5, color: C.sub, textDecoration: "none" }}>View site ↗</Link>
              </div>
              <button type="button" onClick={logout} title="Log out" style={{ ...iconBtnStyle, width: 30, height: 30 }}>
                <Ic d={ICONS.logout} size={13} />
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main area ── */}
        <main ref={editorRef} style={{ flex: 1, overflowY: "auto", padding: "26px 30px 34px", position: "relative" }}>

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ marginRight: "auto" }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: 0, fontFamily: FONT }}>{title}</h1>
              <p style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>{subtitle}</p>
            </div>

            {(tab === "articles" || tab === "media") && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, borderRadius: 999, padding: "9px 16px", border: `1px solid ${C.line}`, minWidth: 220 }}>
                <span style={{ color: C.faint, display: "inline-flex" }}><Ic d={ICONS.search} size={14} /></span>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type searching…"
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: 12.5, fontFamily: FONT, color: C.text, width: "100%" }} />
              </div>
            )}

            {tab === "editor" ? (
              <>
                <button type="button" onClick={() => setTab("articles")} style={pillStyle}>Cancel</button>
                {!isNew && (
                  <button type="button" onClick={() => setDeleteConfirm(draft.slug)} style={{ ...pillStyle, color: C.red }}>Delete</button>
                )}
                <button type="button" onClick={save} disabled={saving}
                  style={{ ...darkPillStyle, opacity: saving ? 0.6 : 1, padding: "10px 20px" }}>
                  {saving ? "Saving…" : (draft.status ?? "published") === "draft" ? "Save draft" : isNew ? "Publish" : "Save changes"}
                </button>
              </>
            ) : (
              <>
                <span style={{ ...pillStyle, cursor: "default", color: C.sub }}>
                  {published.length} live · {drafts.length} draft{drafts.length === 1 ? "" : "s"}
                </span>
                <Link href="/" target="_blank" style={{ ...darkPillStyle, padding: "10px 18px" }}>
                  View site <Ic d={ICONS.arrow} size={13} />
                </Link>
              </>
            )}
          </div>

          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            loading ? (
              <p style={{ color: C.sub, textAlign: "center", padding: 60, fontSize: 13 }}>Loading…</p>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 330px", gap: 18, alignItems: "start" }}>
                  {/* Categories "schedule" card */}
                  <div style={{ ...cardStyle, padding: "22px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                      <p style={{ ...sectionLabel, marginBottom: 0 }}>Desks</p>
                      <span style={{ marginLeft: "auto", fontSize: 11.5, color: C.sub }}>{articles.length} stories across {CATEGORIES.filter(c => articles.some(a => a.category === c)).length} desks</span>
                    </div>
                    {(() => {
                      const rows = CATEGORIES
                        .map(c => ({ cat: c, items: articles.filter(a => a.category === c) }))
                        .filter(r => r.items.length > 0)
                        .sort((a, b) => b.items.length - a.items.length);
                      const max = rows.length ? rows[0].items.length : 1;
                      return rows.map(({ cat, items }) => (
                        <div key={cat} style={{ display: "grid", gridTemplateColumns: "150px 1fr", alignItems: "center", gap: 14, marginBottom: 12 }}>
                          <span style={{ fontSize: 11.5, color: C.sub, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                            <span style={{ width: 7, height: 7, borderRadius: 999, background: CAT_COLOR[cat] ?? "#888", flexShrink: 0 }} />
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat}</span>
                          </span>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <button type="button" onClick={() => { setFilterCat(cat); setSearch(""); setTab("articles"); }}
                              title={`View ${cat} articles`}
                              style={{
                                display: "flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer",
                                background: C.ink, color: "#fff", borderRadius: 999, padding: "6px 8px 6px 14px",
                                width: `${Math.max(22, (items.length / max) * 100)}%`, minWidth: 150,
                                fontFamily: FONT, boxShadow: "0 8px 18px rgba(20,20,22,0.18)",
                              }}>
                              <span style={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                                {items.length} article{items.length === 1 ? "" : "s"}
                              </span>
                              <span style={{ marginLeft: "auto", display: "flex" }}>
                                {items.slice(0, 3).map((a, i) => (
                                  <span key={a.slug} style={{ marginLeft: i === 0 ? 0 : -9, display: "inline-flex" }}>
                                    <Thumb photo={a.heroPhoto} size={24} ring={C.ink} />
                                  </span>
                                ))}
                              </span>
                            </button>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* Featured story — dark preview card */}
                  <div style={{ ...darkCardStyle, padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <span style={{ color: C.lime, display: "inline-flex" }}><Ic d={ICONS.star} size={14} /></span>
                      <p style={{ ...sectionLabel, marginBottom: 0, color: "rgba(255,255,255,0.55)" }}>Featured story</p>
                    </div>
                    {featured ? (
                      <>
                        <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/10", marginBottom: 14, background: "#26262a" }}>
                          {featured.heroPhoto && (
                            <img src={U(pid(featured.heroPhoto), 600, 380)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          )}
                        </div>
                        <span style={catChip(featured.category, true)}>{featured.category}</span>
                        <p style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.35, margin: "10px 0 4px" }}>{featured.title}</p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>{featured.author} · {featured.meta.split("·")[0]?.trim()}</p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button type="button" onClick={() => openEdit(featured)}
                            style={{ ...pillStyle, background: "#fff", border: "1px solid #fff", color: "#111", fontWeight: 700 }}>Edit</button>
                          <Link href={`/article/${featured.slug}`} target="_blank"
                            style={{ ...pillStyle, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff" }}>
                            View <Ic d={ICONS.arrow} size={12} />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, padding: "18px 0" }}>
                        No featured story set. Star an article in the Articles list to place it on the homepage hero.
                      </p>
                    )}
                  </div>
                </div>

                {/* Stat strip */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 18, margin: "18px 0" }}>
                  {[
                    { label: "Total stories", value: articles.length, seed: 1 },
                    { label: "Published", value: `${pubPct}%`, sub: `${published.length} of ${articles.length}`, seed: 2, lime: true },
                    { label: "Drafts in progress", value: drafts.length, seed: 3 },
                    { label: "Subscribers", value: subscribers.length, sub: `${contacts.length} contact requests`, seed: 4 },
                  ].map((s) => (
                    <div key={s.label} style={{ ...cardStyle, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</p>
                        <p style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</p>
                        {s.sub && <p style={{ fontSize: 10.5, color: C.faint, marginTop: 5 }}>{s.sub}</p>}
                      </div>
                      <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                        <Spark seed={s.seed} color={s.lime ? "#7ba314" : C.faint} w={64} h={30} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom row: recent inbox + dark latest-stories panel */}
                <div style={{ display: "grid", gridTemplateColumns: "330px minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
                  <div style={{ ...cardStyle, padding: "20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                      <p style={{ ...sectionLabel, marginBottom: 0 }}>Latest inbox</p>
                      <button type="button" onClick={() => setTab("inbox")} style={{ ...pillStyle, marginLeft: "auto", padding: "5px 12px", fontSize: 11 }}>All</button>
                    </div>
                    {contacts.length === 0 && subscribers.length === 0 ? (
                      <p style={{ fontSize: 12, color: C.faint, padding: "10px 0" }}>No submissions yet.</p>
                    ) : (
                      [...contacts.slice(-3).reverse().map(c => ({ kind: "contact" as const, ...c })),
                       ...subscribers.slice(-2).reverse().map(sb => ({ kind: "sub" as const, name: sb.email, email: sb.email, type: "Subscriber", message: "", receivedAt: sb.receivedAt }))]
                        .slice(0, 5)
                        .map((m, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 0", borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
                            <div style={{ width: 32, height: 32, borderRadius: 999, background: m.kind === "sub" ? "#eef4d8" : "#ececef", color: m.kind === "sub" ? "#5f8c00" : C.sub, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                              {(m.name || m.email || "?").charAt(0).toUpperCase()}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name || m.email}</p>
                              <p style={{ fontSize: 10.5, color: C.sub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {m.kind === "sub" ? "New subscriber" : `${m.type} — ${m.message}`}
                              </p>
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  {/* Dark latest-stories panel */}
                  <div style={{ ...darkCardStyle, padding: "22px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                      <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Latest stories</p>
                      <button type="button" onClick={() => { setFilterCat("All"); setTab("articles"); }}
                        style={{ ...pillStyle, marginLeft: "auto", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", padding: "6px 14px", fontSize: 11 }}>
                        All articles
                      </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 }}>
                      {articles.slice(0, 3).map((a) => (
                        <div key={a.slug} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <Thumb photo={a.heroPhoto} size={30} ring="rgba(255,255,255,0.15)" />
                            <span style={catChip(a.category, true)}>{a.category}</span>
                            {(a.status ?? "published") === "draft" && (
                              <span style={{ fontSize: 9, fontWeight: 800, color: "#f5c451", letterSpacing: "0.08em" }}>DRAFT</span>
                            )}
                          </div>
                          <p style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.4, marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</p>
                          <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>{a.author}</p>
                          <button type="button" onClick={() => openEdit(a)}
                            style={{ ...pillStyle, marginTop: "auto", alignSelf: "flex-start", background: "transparent", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", padding: "6px 14px", fontSize: 11 }}>
                            Edit →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )
          )}

          {/* ── ARTICLES LIST ── */}
          {tab === "articles" && (
            <div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {["All", ...CATEGORIES].map((c) => {
                  const active = filterCat === c;
                  return (
                    <button key={c} type="button" onClick={() => setFilterCat(c)}
                      style={{
                        ...pillStyle, padding: "7px 14px", fontSize: 11.5,
                        background: active ? C.ink : C.card,
                        border: `1px solid ${active ? C.ink : C.line}`,
                        color: active ? "#fff" : C.sub,
                      }}>
                      {c}
                    </button>
                  );
                })}
              </div>

              {loading ? (
                <p style={{ color: C.sub, textAlign: "center", padding: 48, fontSize: 13 }}>Loading…</p>
              ) : (
                <div style={{ ...cardStyle, padding: "6px 10px" }}>
                  {filtered.length === 0 && (
                    <p style={{ padding: 40, textAlign: "center", color: C.faint, fontSize: 13 }}>No articles found.</p>
                  )}
                  {filtered.map((article, i) => (
                    <div
                      key={article.slug}
                      style={{
                        display: "grid", gridTemplateColumns: "62px minmax(0,1fr) auto", gap: 14,
                        padding: "12px 12px", alignItems: "center", borderRadius: 16,
                        borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f8")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    >
                      <div style={{ width: 56, height: 42, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "#e4e5e9" }}>
                        {article.heroPhoto && (
                          <img src={U(pid(article.heroPhoto), 112, 84)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{article.title}</p>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <span style={catChip(article.category)}>{article.category}</span>
                          {(article.status ?? "published") === "draft" && (
                            <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 999, background: "#fdf0d5", color: "#b45309", letterSpacing: "0.08em" }}>DRAFT</span>
                          )}
                          <span style={{ fontSize: 11, color: C.sub }}>{article.author}</span>
                          <span style={{ fontSize: 11, color: C.faint }}>·</span>
                          <span style={{ fontSize: 11, color: C.sub }}>{article.meta.split("·")[0]?.trim()}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <button type="button" onClick={() => toggleFeatured(article)}
                          title={article.featured ? "Featured homepage hero" : "Set as featured"}
                          style={{ ...iconBtnStyle, color: article.featured ? "#8fbc12" : C.faint, background: article.featured ? "#f2f8dd" : C.card, borderColor: article.featured ? "#dcebae" : C.line }}>
                          <Ic d={ICONS.star} size={14} />
                        </button>
                        <Link href={`/article/${article.slug}`} target="_blank" style={{ ...pillStyle, padding: "8px 13px", fontSize: 11, color: C.sub }}>
                          View <Ic d={ICONS.arrow} size={11} />
                        </Link>
                        <button type="button" onClick={() => openEdit(article)} style={{ ...darkPillStyle, padding: "8px 15px", fontSize: 11 }}>
                          Edit
                        </button>
                        <button type="button" onClick={() => setDeleteConfirm(article.slug)} title="Delete"
                          style={{ ...iconBtnStyle, color: C.red }}>
                          <Ic d={ICONS.trash} size={13} />
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
            <div style={{ maxWidth: 820 }}>
              {!isNew && (
                <p style={{ fontSize: 12, color: C.sub, margin: "-12px 0 18px" }}>
                  <Link href={`/article/${draft.slug}`} target="_blank" style={{ color: "#7ba314", textDecoration: "none", fontWeight: 600 }}>View live ↗</Link>
                </p>
              )}

              {/* Identity */}
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <p style={sectionLabel}>Identity</p>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Title</label>
                  <input style={inputStyle} value={draft.title} onChange={S("title")} placeholder="Article headline…" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Title (Arabic)</label>
                  <input style={inputStyle} dir="rtl" value={draft.titleAr ?? ""} onChange={(e) => setDraft(d => ({ ...d, titleAr: e.target.value || undefined }))} placeholder="العنوان بالعربية…" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Subtitle / Deck</label>
                  <textarea style={{ ...textareaStyle, height: 72 }} value={draft.subtitle} onChange={S("subtitle")} placeholder="One-paragraph summary shown below the title…" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Subtitle (Arabic)</label>
                  <textarea style={{ ...textareaStyle, height: 72 }} dir="rtl" value={draft.subtitleAr ?? ""} onChange={(e) => setDraft(d => ({ ...d, subtitleAr: e.target.value || undefined }))} placeholder="الوصف بالعربية…" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>
                      Slug
                      {!isNew && <span style={{ color: C.faint, fontWeight: 400, marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>(read-only)</span>}
                    </label>
                    <input
                      style={{ ...inputStyle, color: isNew ? C.text : C.faint }}
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
                      style={{ ...selectStyle, width: "100%", fontWeight: 700, color: (draft.status ?? "published") === "draft" ? "#b45309" : "#5f8c00" }}
                      value={draft.status ?? "published"}
                      onChange={(e) => setDraft(d => ({ ...d, status: e.target.value as "draft" | "published" }))}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 2 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, color: draft.featured ? "#5f8c00" : C.sub, userSelect: "none" }}>
                      <input
                        type="checkbox"
                        checked={draft.featured ?? false}
                        onChange={(e) => setDraft(d => ({ ...d, featured: e.target.checked }))}
                        style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#5f8c00" }}
                      />
                      Featured (homepage hero)
                    </label>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <p style={sectionLabel}>Author</p>
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
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <p style={sectionLabel}>Media</p>
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
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
                  <p style={{ ...sectionLabel, marginBottom: 0 }}>
                    Body — {draft.body.length} block{draft.body.length !== 1 ? "s" : ""} · ~{wordCount} words
                  </p>
                  <div style={{ display: "flex", gap: 6 }}>
                    {(["p", "h2", "blockquote", "video"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => addBlock(t)}
                        style={{
                          ...pillStyle, padding: "5px 12px", fontSize: 10.5, fontWeight: 700,
                          color: BLOCK_COLORS[t], borderColor: `${BLOCK_COLORS[t]}44`,
                        }}>
                        + {t === "p" ? "Para" : t === "h2" ? "H2" : t === "blockquote" ? "Quote" : "Video"}
                      </button>
                    ))}
                  </div>
                </div>

                {draft.body.length === 0 && (
                  <p style={{ color: C.faint, fontSize: 13, padding: "24px 0", textAlign: "center" }}>
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
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <p style={sectionLabel}>Metadata</p>
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
                    <label style={labelStyle}>Related category (for &quot;Read Next&quot;)</label>
                    <select style={{ ...selectStyle, width: "100%" }} value={draft.relatedCategory} onChange={S("relatedCategory")}>
                      {RELATED_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bottom save bar */}
              <div style={{ position: "sticky", bottom: -34, background: C.frame, padding: "14px 0 20px", display: "flex", justifyContent: "flex-end", gap: 8, borderTop: `1px solid ${C.line}` }}>
                {!isNew && (
                  <button type="button" onClick={() => setDeleteConfirm(draft.slug)} style={{ ...pillStyle, color: C.red, padding: "11px 20px" }}>
                    Delete article
                  </button>
                )}
                <button type="button" onClick={() => setTab("articles")} style={{ ...pillStyle, padding: "11px 20px" }}>
                  Cancel
                </button>
                <button type="button" onClick={save} disabled={saving}
                  style={{ ...darkPillStyle, padding: "11px 26px", fontSize: 13, opacity: saving ? 0.6 : 1 }}>
                  {saving ? "Saving…" : (draft.status ?? "published") === "draft" ? "Save draft" : isNew ? "Publish article" : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {/* ── MEDIA GRID ── */}
          {tab === "media" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {articles
                .filter((a) => {
                  const q = search.toLowerCase();
                  return !q || a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
                })
                .map((a) => (
                  <div key={a.slug} style={{ ...cardStyle, padding: 10, overflow: "hidden" }}>
                    <div style={{ aspectRatio: "16/9", overflow: "hidden", cursor: "pointer", borderRadius: 14, background: "#e4e5e9" }} onClick={() => openEdit(a)}>
                      {a.heroPhoto ? (
                        <img src={U(pid(a.heroPhoto), 480, 270)} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", display: "block" }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: C.faint, fontSize: 12 }}>No image</div>
                      )}
                    </div>
                    <div style={{ padding: "12px 8px 6px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 8 }}>{a.title}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={catChip(a.category)}>{a.category}</span>
                        <button type="button" onClick={() => openEdit(a)} style={{ fontSize: 11, color: "#5f8c00", background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontFamily: FONT }}>Edit →</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ── INBOX ── */}
          {tab === "inbox" && (
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
              <div style={cardStyle}>
                <p style={sectionLabel}>Contact requests</p>
                {contacts.length === 0 ? (
                  <p style={{ fontSize: 12.5, color: C.faint, padding: "16px 0" }}>No contact requests yet.</p>
                ) : (
                  [...contacts].reverse().map((c, i) => (
                    <div key={i} style={{ padding: "14px 0", borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 999, background: "#ececef", color: C.sub, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                          {(c.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</p>
                          <p style={{ fontSize: 11, color: C.sub }}>{c.email}</p>
                        </div>
                        <span style={{ ...catChip("Interviews"), marginLeft: "auto", background: "#ececef", color: C.sub }}>{c.type}</span>
                        {c.receivedAt && (
                          <span style={{ fontSize: 10.5, color: C.faint, whiteSpace: "nowrap" }}>{new Date(c.receivedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <p style={{ fontSize: 12.5, color: "#4b4e55", lineHeight: 1.6, paddingLeft: 44 }}>{c.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div style={{ ...darkCardStyle }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                  <p style={{ ...sectionLabel, marginBottom: 0, color: "rgba(255,255,255,0.55)" }}>Subscribers</p>
                  <span style={{ marginLeft: "auto", background: C.lime, color: "#111", borderRadius: 999, fontSize: 11, fontWeight: 800, padding: "3px 10px" }}>{subscribers.length}</span>
                </div>
                {subscribers.length === 0 ? (
                  <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", padding: "10px 0" }}>No subscribers yet.</p>
                ) : (
                  [...subscribers].reverse().map((sb, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.09)" }}>
                      <div style={{ width: 30, height: 30, borderRadius: 999, background: "rgba(166,214,31,0.18)", color: C.lime, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                        {sb.email.charAt(0).toUpperCase()}
                      </div>
                      <p style={{ fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sb.email}</p>
                      {sb.receivedAt && (
                        <span style={{ marginLeft: "auto", fontSize: 10.5, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{new Date(sb.receivedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,22,0.45)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", zIndex: 100 }}>
          <div style={{ background: C.card, borderRadius: 24, padding: 28, maxWidth: 400, width: "90%", boxShadow: "0 30px 80px rgba(20,20,22,0.3)" }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, fontFamily: FONT }}>Delete article?</h2>
            <p style={{ fontSize: 13, color: C.sub, marginBottom: 22, lineHeight: 1.6 }}>
              This will permanently delete <strong style={{ color: C.text }}>{articles.find(a => a.slug === deleteConfirm)?.title}</strong>. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setDeleteConfirm(null)} style={{ ...pillStyle, padding: "10px 18px" }}>Cancel</button>
              <button type="button" onClick={() => confirmDelete(deleteConfirm)}
                style={{ ...pillStyle, background: C.red, border: `1px solid ${C.red}`, color: "#fff", fontWeight: 700, padding: "10px 18px" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          background: toast.type === "ok" ? C.ink : C.red,
          color: "#fff",
          padding: "13px 22px", borderRadius: 999, fontSize: 13, fontWeight: 700,
          boxShadow: "0 14px 40px rgba(20,20,22,0.35)",
          display: "flex", alignItems: "center", gap: 9,
          animation: "adminFadeIn 0.2s ease",
        }}>
          {toast.type === "ok" && <span style={{ color: C.lime, fontSize: 15 }}>✓</span>}
          {toast.msg}
        </div>
      )}

      <style>{`@keyframes adminFadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
}
