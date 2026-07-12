import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumb from "@/components/Breadcrumb";
import { AoCard, AoLead } from "@/components/Editorial";
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

export default function CategoryView({
  config,
  articles,
}: {
  config: CategoryConfig;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;

  return (
    <main className="page ao-home" id="main-content">
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
