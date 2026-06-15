"use client";
import { useEffect, useRef } from "react";

let toastTimer: ReturnType<typeof setTimeout>;

export function showDemoToast(message: string) {
  let toast = document.querySelector<HTMLElement>("[data-demo-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "demo-toast";
    toast.dataset.demoToast = "";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast!.classList.remove("show"), 2600);
}

export default function DemoToast() {
  return null;
}
