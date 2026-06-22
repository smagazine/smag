"use client";
import { useState } from "react";

interface Props {
  initialCount?: number;
  step?: number;
  total: number;
  children: (visible: number) => React.ReactNode;
}

export default function LoadMore({ initialCount = 4, step = 4, total, children }: Props) {
  const [visible, setVisible] = useState(initialCount);
  const hasMore = visible < total;

  return (
    <>
      {children(visible)}
      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="button secondary"
            type="button"
            onClick={() => setVisible((v) => Math.min(v + step, total))}
            data-en="Load more"
            data-ar="تحميل المزيد"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
