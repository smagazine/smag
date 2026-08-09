# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js version warning

This project runs **Next.js 16.2.9** — newer than most training data, with breaking changes. Before writing any Next-specific code, consult the bundled docs at `node_modules/next/dist/docs/` (App Router docs under `01-app/`). Conventions already in use here that differ from older Next.js:

- `proxy.ts` at the repo root replaces `middleware.ts` (see `01-app/01-getting-started/16-proxy.md`). It sets an `x-pathname` header but nothing consumes it anymore — the admin/public split is now done with route groups (below).
- Route `params` are a `Promise` and must be awaited: `const { slug } = await params;`

## Layout & rendering model (read before adding pages)

The root `app/layout.tsx` renders only `<html>`, fonts, the theme/lang providers, and a blocking inline script that sets `data-theme`/`dir` before paint (avoids FOUC). It must **not** call `headers()`/`cookies()` or any dynamic API — doing so opts the entire route tree out of static generation.

Public pages live under the `app/(site)/` route group, whose `layout.tsx` provides the Header/Footer/skip-link chrome. Admin lives at `app/admin/` with its own chrome-less layout. This split is why the root layout no longer needs to know the pathname.

Public content pages set `export const revalidate = 3600` and the article route adds `generateStaticParams`, so they build as static/ISR (verify in `next build` output: category pages `○`, articles `●`). The write API calls `revalidatePath` after each change to refresh them on demand. Keep new content pages free of request-time dynamic APIs so they stay static.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm start` — serve production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

There is no test suite or Playwright config, despite `@playwright/test` being in devDependencies.

## Architecture

A bilingual (EN/AR) magazine site — "SAUDI MAG" — built on the App Router with a flat-file JSON data store. No database, no CSS framework, no auth.

### Data layer

- Articles/sponsors/sponsorships each have a KV-or-file backend (`lib/kv.ts` + the `kvConfigured` check in `lib/articles.ts`/`lib/sponsors.ts`): when Upstash/Vercel KV env vars are present, the whole entity list is stored as one JSON document in KV (`GET`/`SET`); otherwise falls back to the corresponding `data/*.json` file via `fs` (server-only), read/written by `lib/articles.ts`/`lib/sponsors.ts`. `getArticles()`/`getSponsors()`/`getSponsorships()` are all `async` for this reason — every call site must `await` them (easy to miss since `Response.json()` accepts an unawaited Promise silently). The canonical `Article` and `BodyBlock` types are defined in `lib/articles.ts`. File-mode reads are cached by mtime; file-mode writes are atomic (temp file + rename); all writes (either backend) are serialized per-entity via `lib/file-lock.ts` so concurrent admin saves can't clobber each other.
- `getPublishedArticles()` filters out anything `isLive()` rejects — `status: "draft"`, and `status: "scheduled"` posts whose `publishAt` (UTC ISO) hasn't passed. Use it for public pages, `getArticles()` for admin. `getPublishedByCategory(route)` powers the category pages.
- **Scheduling:** `isLive()` in `lib/articles.ts` is the single authority on whether a post may serve, and it's evaluated at read time — so a scheduled post can never leak early, and it starts serving on its own once the time passes even if nothing else runs. `GET /api/cron/publish` (hourly via `vercel.json`, authorized by `CRON_SECRET` or an admin session) is only about *timeliness*: it flips due posts to `status: "published"` and `revalidatePath()`s their pages. A missed cron run delays a post by at most the ISR window, never loses it. Any new public read path must go through `getPublishedArticles()`/`isLive()` rather than checking `status === "draft"` by hand.
- Only one article may have `featured: true` — `upsertArticle()` enforces this by unfeaturing others, but **skips that for a not-yet-live scheduled post** so it can't steal the homepage hero before it publishes; `publishDueArticles()` applies the handover at go-live instead.
- `normalizeArticle()` validates+sanitizes untrusted write payloads (throws `ValidationError`); the write API routes must run every incoming body through it. Video blocks are passed through `safeEmbedUrl()` (`lib/video.ts`), an allowlist of YouTube/Vimeo hosts — the article page also re-checks with it before rendering the `<iframe>`.
- Article bodies are arrays of typed blocks (`p`, `h2`, `blockquote`, `video`); paragraph text supports a small inline-markdown subset (`**bold**`, `*italic*`, `[link](url)`) parsed by `parseInline()` in `app/(site)/article/[slug]/page.tsx`.
- Form submissions persist to `data/contact-requests.json` and `data/subscribers.json` via `lib/submissions.ts` (both git-ignored, contain user data), same KV-or-file pattern as above. There is no email/CRM integration — this is a self-contained store.

> **Deployment note:** on read-only/ephemeral serverless filesystems (e.g. Vercel), set the KV/Upstash env vars (`KV_REST_API_URL`/`KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`) so writes go to KV instead of the filesystem — without them, article/sponsor writes will fail there (`StorageError`, surfaced as a 503).

### Auth

- The write API (`POST/PUT/DELETE`) and the `/admin` UI are gated by a single shared password. `lib/auth.ts` verifies an httpOnly session cookie (an HMAC of the password + secret, so it's stateless — no session store). Set `ADMIN_PASSWORD` and `ADMIN_SECRET` (see `.env.example`); without them it falls back to insecure dev defaults.
- `CRON_SECRET` gates `/api/cron/publish` separately (Vercel Cron sends it as a bearer token); with no `CRON_SECRET` set the route rejects everything but a logged-in admin.
- Every write route must call `isAuthed()` and 401 on failure. `/api/admin/login` handles `GET` (session check), `POST` (login), `DELETE` (logout). Same-origin admin `fetch` calls send the cookie automatically.

### Routes

- Public pages live under `app/(site)/`: home (`page.tsx`), category pages (`culture`, `sports`, `f-and-b`, `events`, `interviews`, `headlines`), article detail at `article/[slug]/page.tsx`, plus `about`, `contact`, `search`, `subscribe`. The bare `/article` index just redirects to `/headlines`.
- Category pages are thin wrappers: each sets its metadata + header copy and passes `getPublishedByCategory(route)` to the shared `components/CategoryView.tsx`. Do **not** hardcode article cards — they render from the CMS.
- `/search` is a client page that fetches `/api/articles` and filters real published articles (title/subtitle/author/category/tags).
- Admin CMS at `/admin` — a single large client component (`app/admin/page.tsx`) with its own copy of the `Article` interface (keep it in sync with `lib/articles.ts`). It has a password login gate and persists through the API routes below.
- API: `GET/POST /api/articles` and `/api/articles/[slug]` wrap `lib/articles.ts`, require auth for writes, validate via `normalizeArticle`, and `revalidatePath()` the article + its category after writes. `/api/contact` and `/api/subscribe` accept the public forms.

### Bilingual system (unusual — read before touching UI text)

Language switching does **not** use an i18n library or per-locale routes. `contexts/LangContext.tsx` swaps text in the DOM directly: elements carry `data-en` / `data-ar` attributes (plus `data-placeholder-ar`, `data-label-ar` variants), and toggling language rewrites `textContent` on leaf nodes and flips `<html dir>` to RTL. Every user-visible string in a component must therefore be rendered inside an element with both `data-en` and `data-ar` attributes, with the English text as the child content. Client components can also use the `t(en, ar)` helper from `useLang()`.

### Styling & theming

- Plain CSS in `app/globals.css` driven by CSS custom properties (`--color-*`, `--font-*`, spacing clamps). Dark/light mode is handled by `contexts/ThemeContext.tsx`; the brand accent is the lime green `--color-gold: #a6d61f`.
- Fonts via `next/font/google`: Newsreader (serif), Sora (sans), Cairo (Arabic), exposed as CSS variables in `app/layout.tsx`.

### Images

Photo fields (`heroPhoto`, `authorPhoto`, `relatedPhotos`, sponsor `logo`) hold either a bare Unsplash photo ID (legacy content, e.g. `photo-14863...`) or a full URL to an admin-uploaded image. Every `U(id, w, h)` helper (`components/Editorial.tsx`, the article page, `app/admin/page.tsx`) passes full URLs through unchanged and only builds the Unsplash CDN URL for bare IDs — check both branches if you touch image rendering. Allowed remote hosts are whitelisted in `next.config.ts` (`images.unsplash.com`, `picsum.photos`, `placehold.co`, `*.public.blob.vercel-storage.com`).

Uploads go through `POST /api/admin/upload` (auth required, image-type + 8MB validated) → `lib/blob.ts`, which stores the file in Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set, falling back to `public/uploads/` under `npm run dev` only (a production build snapshots `/public` at boot, so this fallback doesn't work under `next start` — not a real deploy path, since production always has Blob configured). `lib/media.ts` indexes uploads (KV-or-file, same pattern as articles/sponsors) so the admin's media library picker can list/reuse/delete them. The admin's `PhotoField` component offers drag-and-drop upload plus a "Library" picker instead of typing IDs.
