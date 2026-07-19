import Image from "next/image";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";
import { U, AoCard, AoLead } from "@/components/Editorial";
import { getActiveSponsorship } from "@/lib/sponsors";
import type { Article } from "@/lib/articles";

export interface CategoryConfig {
  /** English page title, also used as the breadcrumb label. */
  title: string;
  titleAr: string;
  deck: string;
  deckAr: string;
  /** Page-header modifier, e.g. "page-header--warm". */
  headerClass?: string;
  /** Italic title (interviews page). */
  italicTitle?: boolean;
}

/** Rows of three cards; a single leftover renders as a mirrored lead so it
    never sits alone in an empty row. */
function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

const SITE_URL = "https://saudimag.com";

export default function CategoryView({
  config,
  articles,
  route,
}: {
  config: CategoryConfig;
  articles: Article[];
  /** Category route (e.g. "f-and-b"); enables the Presented-by sponsorship chip. */
  route?: string;
}) {
  const [lead, ...rest] = articles;
  const presenting = route ? getActiveSponsorship(route) : null;

  const jsonLd = route
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: config.title,
        description: config.deck,
        url: `${SITE_URL}/${route}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/article/${a.slug}`,
            name: a.title,
          })),
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: config.title, item: `${SITE_URL}/${route}` },
          ],
        },
      }
    : null;

  return (
    <main className="page ao-home" id="main-content">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/", labelAr: "الرئيسية" },
          { label: config.title, labelAr: config.titleAr },
        ]}
      />
      <div className={`page-header ${config.headerClass ?? ""}`.trim()}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h1
                data-en={config.title}
                data-ar={config.titleAr}
                style={config.italicTitle ? { fontStyle: "italic" } : undefined}
              >
                {config.title}
              </h1>
              <p className="deck" data-en={config.deck} data-ar={config.deckAr}>
                {config.deck}
              </p>
              {presenting && (
                <a
                  className="ao-presented"
                  href={presenting.sponsor.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  {presenting.sponsor.logo && (
                    <span className="ao-presented-logo">
                      <Image fill src={U(presenting.sponsor.logo, 96, 96)} alt="" sizes="28px" />
                    </span>
                  )}
                  <span data-en={`Presented by ${presenting.sponsor.name}`} data-ar={`برعاية ${presenting.sponsor.nameAr ?? presenting.sponsor.name}`}>
                    Presented by {presenting.sponsor.name}
                  </span>
                </a>
              )}
            </div>
            <CategoryFilters />
          </div>
        </div>
      </div>

      {!lead ? (
        <section className="section container">
          <p className="deck" data-en="No stories published in this section yet." data-ar="لم يتم نشر أي قصص في هذا القسم بعد.">
            No stories published in this section yet.
          </p>
        </section>
      ) : (
        <section className="section container">
          <AoLead a={lead} priority />
          {chunk(rest, 3).map((group, gi) =>
            group.length === 1 ? (
              <AoLead key={group[0].slug} a={group[0]} flip={gi % 2 === 0} />
            ) : (
              <div key={group[0].slug} className="ao-card-row reveal" data-count={group.length}>
                {group.map((a) => <AoCard key={a.slug} a={a} />)}
              </div>
            )
          )}
        </section>
      )}
    </main>
  );
}
