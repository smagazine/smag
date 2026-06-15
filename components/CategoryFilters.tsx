"use client";
import { useState } from "react";
import { showDemoToast } from "./DemoToast";

type Filter = "latest" | "most-read" | "editors-choice";

export default function CategoryFilters() {
  const [active, setActive] = useState<Filter>("latest");

  const apply = (filter: Filter) => {
    setActive(filter);
    document.querySelectorAll("[data-category-card]").forEach((card) => {
      const el = card as HTMLElement;
      el.hidden =
        filter === "editors-choice" && !card.hasAttribute("data-category-editors-choice");
    });
    if (filter === "most-read") {
      const grid = document.querySelector(".editorial-grid");
      if (grid) {
        [...grid.querySelectorAll("[data-category-card]")]
          .sort(
            (a, b) =>
              Number((a as HTMLElement).dataset.categoryRank) -
              Number((b as HTMLElement).dataset.categoryRank)
          )
          .forEach((card) => grid.append(card));
      }
    }
    showDemoToast(
      filter === "latest"
        ? "Showing the latest stories."
        : filter === "most-read"
        ? "Stories sorted by readership."
        : "Showing editor's selected stories."
    );
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
