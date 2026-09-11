import type { NextConfig } from "next";

// Inline <script>/style attributes (FOUC-avoidance script in app/layout.tsx,
// React's style={{...}} props throughout) require 'unsafe-inline' — this is a
// static/ISR site with no user-controlled script content, so that's an
// acceptable trade-off over per-request nonces (which would defeat static caching).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // blob: is for the admin's local image-crop preview (URL.createObjectURL
  // on the file the user just picked, before it's ever uploaded anywhere).
  // storage.googleapis.com serves uploaded media (Firebase Cloud Storage).
  "img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://placehold.co https://storage.googleapis.com",
  "media-src 'self' https://storage.googleapis.com",
  "font-src 'self'",
  // The admin's video-file upload PUTs bytes directly from the browser to
  // Cloud Storage (signed-URL client-upload pattern), so that host must be
  // allowed here too, not just in media-src (playback).
  "connect-src 'self' https://storage.googleapis.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimizer is capped by a per-plan transformation quota.
    // Once it's exhausted, /_next/image returns 402 (Payment Required) for any
    // image it hasn't already cached — so existing pictures keep serving while
    // every newly uploaded one renders blank. Serving the origin URLs directly
    // sidesteps the quota entirely, and costs little here: admin uploads are
    // already downscaled to 2400px @ q0.85 client-side (shrinkForUpload in
    // app/admin/page.tsx) before they ever reach Cloud Storage, and the legacy
    // Unsplash IDs are requested through U() with explicit w/h params, so both
    // sources arrive pre-sized. remotePatterns is kept below so that flipping
    // this back (e.g. on a plan with a larger quota) needs no other change.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
