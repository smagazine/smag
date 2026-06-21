"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import { showDemoToast } from "@/components/DemoToast";

const ARTICLES: Record<string, {
  category: string;
  title: string;
  subtitle: string;
  author: string;
  meta: string;
  seed: string;
  authorSeed: string;
  body: { id: string; type: "p" | "h2" | "blockquote"; text: string }[];
  tags: string[];
  relatedCategory: string;
}> = {
  "gulf-architecture-revolution": {
    category: "Architecture & Design",
    title: "The New Era of Saudi Architecture: A Silent Revolution in Stone",
    subtitle: "A deep dive into the minimal and elegant landmarks redefining the skyline of Riyadh, where traditional forms meet modern austerity.",
    author: "Laila Al-Fayed",
    meta: "October 24, 2024 · 8 min read",
    seed: "saudimag-arch",
    authorSeed: "saudimag-author",
    tags: ["Architecture", "Design", "Riyadh", "Culture"],
    relatedCategory: "culture",
    body: [
      { id: "shift", type: "p", text: "The desert wind carries more than sand across the sweeping plains of the Najd region; today, it carries the quiet echoes of a profound architectural transformation. For decades, the skyline of Riyadh was characterised by utilitarian structures and ambitious, albeit sometimes disjointed, modern towers. Yet a new aesthetic paradigm is taking root — one that eschews ostentation in favour of restrained, almost meditative elegance." },
      { id: "materiality", type: "p", text: "At the heart of this movement is a deliberate return to the essence of materiality. The new breed of Saudi architects is looking inward, drawing inspiration from the harsh, beautiful landscape that surrounds them. Rather than importing glass-and-steel concepts ill-suited to the climate, they are innovating with local limestone, rammed earth, and specially engineered concrete that reflects heat while absorbing the golden light of the setting sun." },
      { id: "quote", type: "blockquote", text: "“We are no longer building to conquer the desert; we are designing to converse with it. The most generous spaces are the ones that leave room for people.”" },
      { id: "geometry", type: "h2", text: "The Geometry of Silence" },
      { id: "district", type: "p", text: "Walking through the newly inaugurated cultural district feels less like navigating a city and more like exploring a monumental sculpture garden. The buildings here do not scream for attention; they anchor the space with immense, unadorned volumes. Narrow apertures replace expansive windows, creating dramatic plays of light and shadow within interiors that recall the historic courtyards of Al-Turaif." },
      { id: "future", type: "p", text: "The result is a design language that feels both future-facing and rooted. It is minimal without being cold, luxurious without being loud, and unmistakably connected to the Gulf's wider editorial conversation around craft, permanence, and cultural confidence." },
    ],
  },
  "gulf-sport-gravity": {
    category: "Sports",
    title: "How the Gulf Became Global Sport’s New Centre of Gravity",
    subtitle: "From Formula 1 under the Jeddah lights to LIV Golf and the Saudi Pro League’s global signings, a systematic strategy is turning the kingdom into the world’s most ambitious sporting destination.",
    author: "Khalid Al-Rasheed",
    meta: "March 12, 2025 · 10 min read",
    seed: "saudimag-sports-art",
    authorSeed: "saudimag-author2",
    tags: ["Sports", "Formula 1", "Golf", "Riyadh"],
    relatedCategory: "sports",
    body: [
      { id: "intro", type: "p", text: "A decade ago, global sport organisers viewed the Arabian Peninsula as an emerging market — promising but peripheral. Today they view it as the market. The transformation has been swift, deliberate, and extraordinarily well-funded, but it would be a mistake to reduce it to cheque-writing. The Gulf’s rise in sport is also a story of infrastructure, hospitality, and a genuine cultural enthusiasm for competition that predates Vision 2030 by generations." },
      { id: "f1", type: "h2", text: "Formula 1’s Neon Cathedral" },
      { id: "f1body", type: "p", text: "The Jeddah Corniche Circuit, which debuted in 2021, is the fastest street circuit in the world. Its creation required the removal of an entire section of the coastal road, the construction of forty-two corners, and a safety infrastructure that took two years to design. The race itself is a spectacle of controlled chaos—cars threading between barriers at 320 km/h while the Red Sea glitters beyond the circuit walls." },
      { id: "livquote", type: "blockquote", text: "“This isn’t sports washing. This is sports building. There is a difference, and the world will understand it in another five years.”" },
      { id: "conclusion", type: "p", text: "What distinguishes the Gulf’s sporting ambition from prior petrodollar investments in sport is its systemic nature. Individual investments in clubs or events have given way to a holistic strategy encompassing academies, broadcast rights, stadium construction, and soft-power diplomacy. The kingdom is not buying into sport. It is building sport’s next chapter." },
    ],
  },
  "riyadh-season-entertainment": {
    category: "Events",
    title: "Riyadh Season: Inside the World’s Largest Entertainment Programme",
    subtitle: "From live concerts drawing hundreds of thousands to intimate design salons, Riyadh Season has become the world’s most ambitious urban entertainment experiment.",
    author: "Nour Al-Saud",
    meta: "June 14, 2026 · 7 min read",
    seed: "saudimag-ev-art",
    authorSeed: "saudimag-author3",
    tags: ["Events", "Riyadh", "Culture", "Entertainment"],
    relatedCategory: "events",
    body: [
      { id: "intro", type: "p", text: "Each October, Riyadh undergoes a metamorphosis. The city’s already frenetic energy doubles, then doubles again, as the season’s programme unfolds across more than fourteen distinct entertainment zones. Last year’s edition drew eleven million visitors over three months—a number that exceeds the permanent population of many European capitals." },
      { id: "zones", type: "h2", text: "A City Divided Into Worlds" },
      { id: "zonesbody", type: "p", text: "Each zone within Riyadh Season is conceived as a self-contained universe. Boulevard World transforms twelve city blocks into a winding tour through global architecture—a Parisian café beside a Japanese onsen, a Moroccan riad adjacent to a replica Colosseum. The attention to detail is striking. The Eiffel Tower replica, for instance, is rendered at one-third scale but constructed of real steel, not painted fibreglass." },
      { id: "quote", type: "blockquote", text: "“We are not building theme parks. We are building portals. Every zone is designed to transport you completely.”" },
      { id: "future", type: "p", text: "As Riyadh Season continues to grow, questions arise about sustainability—both environmental and cultural. Organisers have announced a suite of carbon offset measures for the current edition, and a new dedicated rail link from the city centre to the main entertainment hub opens this year. The season’s ambition shows no sign of moderating. If anything, each year’s iteration arrives with a more elaborate brief than the last." },
    ],
  },
};

const FALLBACK = ARTICLES["gulf-architecture-revolution"];

export default function ArticleSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES[slug] ?? FALLBACK;

  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showDemoToast("Article link copied.");
    } catch {
      showDemoToast("Copy this page URL from your browser address bar.");
    }
  };

  return (
    <>
      <ReadingProgress />
      <main className="page" id="main-content">
        <article>
          <figure className="article-hero reveal">
            <img
              src={`https://picsum.photos/seed/${article.seed}/1920/1080`}
              alt={article.title}
              data-article-hero=""
            />
          </figure>

          <header className="article-header container reveal">
            <span className="label eyebrow article-kicker">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="article-subtitle">{article.subtitle}</p>
            <div className="byline">
              <div className="author">
                <img
                  src={`https://picsum.photos/seed/${article.authorSeed}/200/200`}
                  alt={article.author}
                  loading="lazy"
                />
                <div>
                  <span className="meta">By {article.author}</span>
                  <p>{article.meta}</p>
                </div>
              </div>
              <div>
                <button className="icon-button" type="button" aria-label="Share by email" onClick={handleShareEmail}>
                  <span className="material-symbols-outlined">mail</span>
                </button>
                <button className="icon-button" type="button" aria-label="Copy article link" onClick={handleCopyLink}>
                  <span className="material-symbols-outlined">link</span>
                </button>
              </div>
            </div>
          </header>

          <div className="container article-layout">
            <aside className="article-sidebar reveal">
              <span className="label eyebrow" data-en="In This Article" data-ar="في هذا المقال">In This Article</span>
              <ul>
                {article.body.filter((b) => b.type === "h2").map((b) => (
                  <li key={b.id}><a href={`#${b.id}`}>{b.text}</a></li>
                ))}
              </ul>
            </aside>

            <div className="article-body reveal">
              {article.body.map((block) => {
                if (block.type === "h2") return <h2 key={block.id} id={block.id}>{block.text}</h2>;
                if (block.type === "blockquote") return <blockquote key={block.id} className="pullquote">{block.text}</blockquote>;
                const isFirst = article.body.findIndex((b) => b.type === "p") === article.body.indexOf(block);
                return <p key={block.id} id={block.id} className={isFirst ? "drop-cap" : undefined}>{block.text}</p>;
              })}

              <div className="article-tags">
                <span className="article-tags-label">Topics</span>
                {article.tags.map((tag) => (
                  <Link key={tag} className="article-tag" href={`/search?q=${encodeURIComponent(tag)}`}>{tag}</Link>
                ))}
              </div>

              <div className="author-bio">
                <div className="author-bio-avatar">
                  <img src={`https://picsum.photos/seed/${article.authorSeed}/200/200`} alt={article.author} loading="lazy" />
                </div>
                <div>
                  <span className="author-bio-role">Contributing Editor</span>
                  <h3 className="author-bio-name">{article.author}</h3>
                  <p>Contributing to SAUDI MAG&apos;s long-form coverage of Gulf culture, cities, and contemporary life.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="section soft">
          <div className="container">
            <div className="section-header reveal">
              <div>
                <span className="label eyebrow" data-en="Read Next" data-ar="اقرأ أيضاً">Read Next</span>
                <h2 data-en="More stories" data-ar="المزيد من القصص">More stories</h2>
              </div>
              <Link className="button secondary" href={`/${article.relatedCategory}`} data-en="View all" data-ar="عرض الكل">View all</Link>
            </div>
            <div className="editorial-grid">
              {["next1", "next2", "next3"].map((seed, i) => (
                <article key={seed} className="article-card span-4 reveal">
                  <Link className="card-media" href="/article">
                    <img src={`https://picsum.photos/seed/saudimag-${seed}/600/400`} alt="Related article" loading="lazy" />
                  </Link>
                  <span className="label eyebrow">{article.category}</span>
                  <h3><Link href="/article">Related story {i + 1}</Link></h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
