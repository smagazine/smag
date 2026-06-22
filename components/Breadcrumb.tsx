"use client";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
  labelAr?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumb container" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="breadcrumb-item">
            {i > 0 && <span className="breadcrumb-sep" aria-hidden="true">›</span>}
            {isLast || !crumb.href ? (
              <span aria-current={isLast ? "page" : undefined} data-en={crumb.label} data-ar={crumb.labelAr ?? crumb.label}>
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} data-en={crumb.label} data-ar={crumb.labelAr ?? crumb.label}>
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
