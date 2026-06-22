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
  authorRole: string;
  meta: string;
  heroKeyword: string;
  body: { id: string; type: "p" | "h2" | "blockquote" | "video"; text: string; videoUrl?: string }[];
  tags: string[];
  relatedCategory: string;
}> = {
  "gulf-architecture-revolution": {
    category: "Architecture & Design",
    title: "The New Era of Saudi Architecture: A Silent Revolution in Stone",
    subtitle: "A deep dive into the minimal and elegant landmarks redefining the skyline of Riyadh, where traditional forms meet modern austerity.",
    author: "Laila Al-Fayed",
    authorRole: "Architecture Editor",
    meta: "October 24, 2024 · 8 min read",
    heroKeyword: "architecture,city",
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
    title: "How the Gulf Became Global Sport's New Centre of Gravity",
    subtitle: "From Formula 1 under the Jeddah lights to LIV Golf and the Saudi Pro League's global signings, a systematic strategy is turning the kingdom into the world's most ambitious sporting destination.",
    author: "Khalid Al-Rasheed",
    authorRole: "Sports Correspondent",
    meta: "March 12, 2025 · 10 min read",
    heroKeyword: "sports,stadium",
    tags: ["Sports", "Formula 1", "Golf", "Riyadh"],
    relatedCategory: "sports",
    body: [
      { id: "intro", type: "p", text: "A decade ago, global sport organisers viewed the Arabian Peninsula as an emerging market — promising but peripheral. Today they view it as the market. The transformation has been swift, deliberate, and extraordinarily well-funded, but it would be a mistake to reduce it to cheque-writing. The Gulf's rise in sport is also a story of infrastructure, hospitality, and a genuine cultural enthusiasm for competition that predates Vision 2030 by generations." },
      { id: "f1", type: "h2", text: "Formula 1's Neon Cathedral" },
      { id: "f1body", type: "p", text: "The Jeddah Corniche Circuit, which debuted in 2021, is the fastest street circuit in the world. Its creation required the removal of an entire section of the coastal road, the construction of forty-two corners, and a safety infrastructure that took two years to design. The race itself is a spectacle of controlled chaos—cars threading between barriers at 320 km/h while the Red Sea glitters beyond the circuit walls." },
      { id: "livquote", type: "blockquote", text: "“This isn't sports washing. This is sports building. There is a difference, and the world will understand it in another five years.”" },
      { id: "conclusion", type: "p", text: "What distinguishes the Gulf's sporting ambition from prior petrodollar investments in sport is its systemic nature. Individual investments in clubs or events have given way to a holistic strategy encompassing academies, broadcast rights, stadium construction, and soft-power diplomacy. The kingdom is not buying into sport. It is building sport's next chapter." },
    ],
  },
  "riyadh-season-entertainment": {
    category: "Events",
    title: "Riyadh Season: Inside the World's Largest Entertainment Programme",
    subtitle: "From live concerts drawing hundreds of thousands to intimate design salons, Riyadh Season has become the world's most ambitious urban entertainment experiment.",
    author: "Nour Al-Saud",
    authorRole: "Culture & Events Editor",
    meta: "June 14, 2026 · 7 min read",
    heroKeyword: "festival,concert",
    tags: ["Events", "Riyadh", "Culture", "Entertainment"],
    relatedCategory: "events",
    body: [
      { id: "intro", type: "p", text: "Each October, Riyadh undergoes a metamorphosis. The city's already frenetic energy doubles, then doubles again, as the season's programme unfolds across more than fourteen distinct entertainment zones. Last year's edition drew eleven million visitors over three months—a number that exceeds the permanent population of many European capitals." },
      { id: "zones", type: "h2", text: "A City Divided Into Worlds" },
      { id: "zonesbody", type: "p", text: "Each zone within Riyadh Season is conceived as a self-contained universe. Boulevard World transforms twelve city blocks into a winding tour through global architecture—a Parisian café beside a Japanese onsen, a Moroccan riad adjacent to a replica Colosseum. The attention to detail is striking. The Eiffel Tower replica, for instance, is rendered at one-third scale but constructed of real steel, not painted fibreglass." },
      { id: "quote", type: "blockquote", text: "“We are not building theme parks. We are building portals. Every zone is designed to transport you completely.”" },
      { id: "future", type: "p", text: "As Riyadh Season continues to grow, questions arise about sustainability—both environmental and cultural. Organisers have announced a suite of carbon offset measures for the current edition, and a new dedicated rail link from the city centre to the main entertainment hub opens this year. The season's ambition shows no sign of moderating. If anything, each year's iteration arrives with a more elaborate brief than the last." },
    ],
  },
  "saudi-cuisine-identity": {
    category: "F&B",
    title: "The Chefs Redefining Saudi Cuisine One Plate at a Time",
    subtitle: "A generation of Saudi-trained chefs is returning home with international technique and a fierce desire to cook from memory.",
    author: "Reem Al-Jabri",
    authorRole: "Food & Culture Writer",
    meta: "April 3, 2026 · 9 min read",
    heroKeyword: "food,restaurant",
    tags: ["Food", "Culture", "Saudi", "Chefs"],
    relatedCategory: "f-and-b",
    body: [
      { id: "intro", type: "p", text: "There is a moment in many Saudi kitchens when the smell of cardamom and dried lime hits the air and something ancient stirs. The new generation of chefs working across Riyadh and Jeddah knows this moment well — they have trained in Copenhagen and Paris and Tokyo, yet it is always this smell, and the memory attached to it, that pulls them back to their own culinary roots." },
      { id: "memory", type: "h2", text: "Cooking from Memory" },
      { id: "memory-body", type: "p", text: "For chef Bader Al-Rashed, the journey began at his grandmother's kitchen in Al-Ahsa, where she would spend three days preparing kabsa for Eid gatherings. That patience, that devotion to process, became the invisible curriculum he carried through his culinary education in Lyon. 'French technique gave me precision,' he says. 'My grandmother gave me purpose.'" },
      { id: "quote", type: "blockquote", text: "“Saudi cuisine doesn't need to explain itself anymore. It just needs the right hands and the right stage.”" },
      { id: "future", type: "h2", text: "A New Fine Dining Canon" },
      { id: "future-body", type: "p", text: "The results of this synthesis are beginning to appear on dining room tables across the Kingdom. At Bait Al-Kaif in Riyadh, a twelve-course tasting menu reimagines the Saudi table through a contemporary lens — saffron foam over slow-braised lamb, date molasses with aged brie, camel milk panna cotta with bitter orange. The reviews have been extraordinary; the waiting list, longer." },
    ],
  },
  "alula-heritage-future": {
    category: "Culture",
    title: "AlUla: Where the Desert Remembers Everything",
    subtitle: "The ancient sandstone city is becoming one of the world's most extraordinary cultural destinations — without losing what made it sacred.",
    author: "Laila Al-Fayed",
    authorRole: "Architecture Editor",
    meta: "January 18, 2026 · 11 min read",
    heroKeyword: "desert,landscape",
    tags: ["AlUla", "Heritage", "Culture", "Tourism"],
    relatedCategory: "culture",
    body: [
      { id: "intro", type: "p", text: "Drive north from Medina for four hours and the land changes its mind about what a landscape should be. The flat plains give way to sudden mountains of striated sandstone, their faces carved by wind into abstract sculptures that dwarf everything human. This is AlUla — a valley inhabited continuously for more than two hundred thousand years and now, improbably, one of the most discussed cultural destinations on earth." },
      { id: "hegra", type: "h2", text: "Hegra and the Weight of Centuries" },
      { id: "hegra-body", type: "p", text: "At the heart of AlUla's appeal is Hegra, Saudi Arabia's first UNESCO World Heritage Site. The Nabataean tombs here — carved directly into the rose-coloured cliffs — are among the best preserved in the world. Unlike Petra in Jordan, Hegra remained largely unknown to international visitors for most of the modern era, its solitude preserving it perfectly. That solitude is now being carefully managed." },
      { id: "quote", type: "blockquote", text: "“We are not opening AlUla to the world. We are introducing the world to AlUla, slowly, on AlUla's own terms.”" },
      { id: "now", type: "h2", text: "The Living Museum" },
      { id: "now-body", type: "p", text: "The Royal Commission for AlUla has taken an approach that prioritises experience over throughput. Visitor numbers are capped. Guides are drawn from local communities. The Maraya concert hall — a mirrored cube that reflects the surrounding mountains — has hosted performances by Andrea Bocelli and Lionel Richie, yet its exterior is so precisely calibrated that it appears to vanish into the landscape at certain times of day." },
    ],
  },
  "vision-2030-cities": {
    category: "Headlines",
    title: "The Cities Saudi Arabia Is Building from Scratch",
    subtitle: "NEOM, Diriyah, THE LINE — the Kingdom's megaprojects are not just urban plans but a statement about what cities can be.",
    author: "Tariq Al-Mansouri",
    authorRole: "Senior Correspondent",
    meta: "May 5, 2026 · 12 min read",
    heroKeyword: "city,future",
    tags: ["NEOM", "Vision 2030", "Architecture", "Cities"],
    relatedCategory: "headlines",
    body: [
      { id: "intro", type: "p", text: "Somewhere in the northwest of Saudi Arabia, an army of engineers is building a city that does not yet exist — and may not exist in full for decades. NEOM, the flagship megaproject of Vision 2030, has become the most discussed, most debated, and most photographed urban concept of the twenty-first century. Its ambition is almost impossible to process: a linear city one hundred and seventy kilometres long, entirely car-free, powered entirely by renewable energy, housing up to nine million people." },
      { id: "line", type: "h2", text: "THE LINE and the Idea of a City" },
      { id: "line-body", type: "p", text: "THE LINE has attracted equal amounts of admiration and scepticism. Critics note that many of the physical and social challenges of such a structure remain unsolved — how do you move nine million people across one hundred and seventy kilometres? How do you deliver emergency services? How do you preserve any sense of neighbourhood or community within a mirrored corridor visible from space?" },
      { id: "quote", type: "blockquote", text: "“The question isn't whether THE LINE will look like the renderings. The question is whether the idea it embodies — of the city as instrument rather than accident — will spread.”" },
      { id: "diriyah", type: "h2", text: "Diriyah: A Different Kind of Ambition" },
      { id: "diriyah-body", type: "p", text: "While NEOM captures the imagination, Diriyah tells a quieter story about Saudi ambition. The restoration of the mud-brick city on the outskirts of Riyadh — birthplace of the Saudi state — is proceeding at extraordinary speed. The At-Turaif district, already a UNESCO site, is being surrounded by new cultural, hospitality, and commercial development that attempts to frame tradition rather than replace it." },
    ],
  },
  "gulf-fashion-identity": {
    category: "Interviews",
    title: "Hessa Al-Suwaidi: Designing Modest Fashion for a World Audience",
    subtitle: "The Qatari designer talks about why modesty is not a constraint but a creative frame — and why the Gulf is the next frontier in global fashion.",
    author: "Sara Al-Mutairi",
    authorRole: "Style Editor",
    meta: "February 28, 2026 · 6 min read",
    heroKeyword: "fashion,design",
    tags: ["Fashion", "Design", "Interviews", "Gulf"],
    relatedCategory: "interviews",
    body: [
      { id: "intro", type: "p", text: "When Hessa Al-Suwaidi shows her collections, the garments move the way water does — with an unhurried deliberateness that seems to resist the frantic pace of the fashion calendar. There is something deliberate about her fabrics, her silhouettes, her insistence on construction over decoration. It has made her one of the Gulf's most celebrated designers and one of its most misunderstood." },
      { id: "quote1", type: "blockquote", text: "“Modesty is not a constraint. It's a creative frame. Every designer works within constraints — proportion, budget, client. Mine are different, but they're no less generative.”" },
      { id: "global", type: "h2", text: "The Global Market" },
      { id: "global-body", type: "p", text: "Al-Suwaidi's clients now span thirty countries. Her pieces have appeared in international fashion weeks, been profiled in European publications, and been worn by figures who have no particular relationship with the cultural or religious contexts that inspired the design. This has prompted conversations — sometimes uncomfortable — about appropriation, accessibility, and authenticity." },
      { id: "quote2", type: "blockquote", text: "“If someone in Stockholm buys my abaya because they think it's beautiful and elegant, that's a conversation. That's exactly what I want.”" },
      { id: "next", type: "p", text: "Her next collection, she hints, will take a dramatic turn towards colour — deep saffrons, midnight blues — while maintaining the flowing volumes and handcrafted embroidery that have become her signature. It is, she says, her most personal work yet." },
    ],
  },
  "mdl-beast-sound": {
    category: "Events",
    title: "MDL Beast: How a Festival Became a Movement",
    subtitle: "The music festival that began as a one-night experiment in Riyadh has grown into one of the world's most interesting cultural exports.",
    author: "Nour Al-Saud",
    authorRole: "Culture & Events Editor",
    meta: "December 10, 2025 · 8 min read",
    heroKeyword: "festival,music",
    tags: ["Music", "MDL Beast", "Events", "Riyadh"],
    relatedCategory: "events",
    body: [
      { id: "intro", type: "p", text: "In December 2019, roughly four hundred thousand people descended on a tract of land on the outskirts of Riyadh for a three-day music festival that nobody quite knew how to categorise. Was it a concert? A cultural statement? An experiment? MDL Beast — named after the Arabic word for 'beast,' reimagined as a sound-beast — was all three, and the world took notice." },
      { id: "video", type: "video", text: "Festival atmosphere highlights", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "scale", type: "h2", text: "The Scale Problem" },
      { id: "scale-body", type: "p", text: "Producing a festival of this scale in Riyadh presented challenges that organisers in Europe or America rarely face. The heat required the construction of elaborate cooling systems across the outdoor stages. The demographics of the audience — many of whom had never attended a live music event — required careful thought about the festival experience from first principles. And the lineup had to balance international headliners with a commitment to amplifying regional talent." },
      { id: "quote", type: "blockquote", text: "“We didn't want to import a festival. We wanted to create one that could only have come from here.”" },
      { id: "future", type: "p", text: "MDL Beast has since spawned Soundstorm — its flagship multi-day event — as well as Trek, an adventure festival in the mountains near Tabuk, and Base, an urban culture platform. The ambition is not just to host events but to build a creative infrastructure for the region's next generation of artists, producers, and designers." },
    ],
  },
  "red-sea-film": {
    category: "Culture",
    title: "The Red Sea International Film Festival and Arab Cinema's New Confidence",
    subtitle: "Jeddah's film festival is doing more than screening movies — it's rewriting the narrative about what Arab cinema can be.",
    author: "Omar Al-Zayed",
    authorRole: "Film & Arts Correspondent",
    meta: "November 22, 2025 · 7 min read",
    heroKeyword: "cinema,film",
    tags: ["Film", "Culture", "Jeddah", "Cinema"],
    relatedCategory: "culture",
    body: [
      { id: "intro", type: "p", text: "Cinema arrived late to Saudi Arabia — commercially, at least. The first licensed multiplex opened in 2018, ending a thirty-five-year ban on public film screenings. But the creative energy that had accumulated during those decades of absence has erupted with an urgency that surprises even those who anticipated it." },
      { id: "festival", type: "h2", text: "A Festival That Moves Fast" },
      { id: "festival-body", type: "p", text: "The Red Sea International Film Festival, held annually in Jeddah's historic Al-Balad district, has moved with unusual speed from upstart to institution. In its third edition, it attracted over a hundred world premieres, established a competition section dedicated to Arab and African cinema, and brought jury members including some of international cinema's most recognised names to the city." },
      { id: "quote", type: "blockquote", text: "“The Gulf has stories the world hasn't seen yet. And for the first time, we have the platforms and the resources to tell them on our own terms.”" },
      { id: "makers", type: "h2", text: "The New Arab Directors" },
      { id: "makers-body", type: "p", text: "What is most striking is the range of voices emerging. Films about Bedouin communities and satellite cities, about women navigating new freedoms and old expectations, about the experience of Gulf diaspora in European capitals — all are finding their way to Jeddah's screens. The festival has become a compass for what Arab cinema is becoming." },
    ],
  },
};

const FALLBACK = ARTICLES["gulf-architecture-revolution"];

function ShareButtons({ title }: { title: string }) {
  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleEmail = () => {
    if (typeof window === "undefined") return;
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showDemoToast("Link copied.");
    } catch {
      showDemoToast("Copy the URL from your browser.");
    }
  };

  return (
    <div className="share-bar">
      <span className="share-label" data-en="Share" data-ar="شارك">Share</span>
      <button className="share-btn share-btn--x" type="button" aria-label="Share on X" onClick={() => handleShare("twitter")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </button>
      <button className="share-btn share-btn--linkedin" type="button" aria-label="Share on LinkedIn" onClick={() => handleShare("linkedin")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </button>
      <button className="share-btn share-btn--whatsapp" type="button" aria-label="Share on WhatsApp" onClick={() => handleShare("whatsapp")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </button>
      <button className="share-btn" type="button" aria-label="Share by email" onClick={handleEmail}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mail</span>
      </button>
      <button className="share-btn" type="button" aria-label="Copy link" onClick={handleCopy}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>link</span>
      </button>
    </div>
  );
}

export default function ArticleSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES[slug] ?? FALLBACK;

  return (
    <>
      <ReadingProgress />
      <main className="page" id="main-content">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href={`/${article.relatedCategory}`}>{article.category}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <article>
          <figure className="article-hero reveal">
            <img
              src={`https://loremflickr.com/1920/1080/${article.heroKeyword}?lock=99`}
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
                  src="https://loremflickr.com/200/200/portrait,professional?lock=100"
                  alt={article.author}
                  loading="lazy"
                />
                <div>
                  <span className="meta">By {article.author}</span>
                  <p>{article.meta}</p>
                </div>
              </div>
              <ShareButtons title={article.title} />
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
              {article.body.map((block, idx) => {
                if (block.type === "h2") return <h2 key={block.id} id={block.id}>{block.text}</h2>;
                if (block.type === "blockquote") return <blockquote key={block.id} className="pullquote">{block.text}</blockquote>;
                if (block.type === "video") return (
                  <div key={block.id} className="article-video">
                    <iframe
                      src={block.videoUrl}
                      title={block.text}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
                const isFirst = article.body.findIndex((b) => b.type === "p") === idx;
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
                  <img src="https://loremflickr.com/200/200/portrait,professional?lock=101" alt={article.author} loading="lazy" />
                </div>
                <div>
                  <span className="author-bio-role">{article.authorRole}</span>
                  <h3 className="author-bio-name">{article.author}</h3>
                  <p>Contributing to SAUDI MAG&apos;s long-form coverage of Gulf culture, cities, and contemporary life.</p>
                </div>
              </div>

              <ShareButtons title={article.title} />
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
                    <img src={`https://loremflickr.com/600/400/${article.heroKeyword}?lock=${i + 20}`} alt="Related article" loading="lazy" />
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
