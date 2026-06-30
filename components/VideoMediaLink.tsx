"use client";
import { showDemoToast } from "@/components/DemoToast";

export default function VideoMediaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      className="video-media"
      href={href}
      onClick={(e) => {
        e.preventDefault();
        showDemoToast("Video playback is available in the full production edition.");
      }}
    >
      {children}
    </a>
  );
}
