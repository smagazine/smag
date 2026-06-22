"use client";
import { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function ImgSkeleton({ src, alt, className, style, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`img-wrap${loaded ? " loaded" : ""}`} style={{ display: "block", ...style }}>
      <span className="skeleton-overlay" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        {...rest}
      />
    </span>
  );
}
