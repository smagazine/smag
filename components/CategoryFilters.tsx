"use client";
import { useState } from "react";

type Filter = "latest" | "most-read" | "editors-choice";

export default function CategoryFilters() {
  const [active, setActive] = useState<Filter>("latest");

  const apply = (filter: Filter) => {
    setActive(filter);
    const cards = [...document.querySelectorAll<HTMLElement>("[data-category-card]")];

    cards.forEach((el) => {
      el.hidden = filter === "editors-choice" && !el.hasAttribute("data-category-editors-choice");
    });

    const grid = cards[0]?.parentElement;
    if (grid && filter !== "editors-choice") {
      const key = filter === "most-read" ? "categoryRank" : "categoryOrder";
      [...grid.querySelectorAll<HTMLElement>("[data-category-card]")]
        .sort((a, b) => Number(a.dataset[key]) - Number(b.dataset[key]))
        .forEach((card) => grid.append(card));
    }
  };

  return (
    <div className="chips" aria-label="Category filters">
      <button
        className={`chip${active === "latest" ? " active" : ""}`}
        type="button"
        onClick={() => apply("latest")}
        data-en="Latest"
        data-ar="الأحدث"
      >
        Latest
      </button>
      <button
        className={`chip${active === "most-read" ? " active" : ""}`}
        type="button"
        onClick={() => apply("most-read")}
        data-en="Most Read"
        data-ar="الأكثر قراءة"
      >
        Most Read
      </button>
      <button
        className={`chip${active === "editors-choice" ? " active" : ""}`}
        type="button"
        onClick={() => apply("editors-choice")}
        data-en="Editor's Choice"
        data-ar="اختيار المحرر"
      >
        Editor&apos;s Choice
      </button>
    </div>
  );
}
