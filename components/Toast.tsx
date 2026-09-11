"use client";

let toastTimer: ReturnType<typeof setTimeout>;

/** Transient status message, bottom-anchored. Used for share/copy feedback. */
export function showToast(message: string) {
  let toast = document.querySelector<HTMLElement>("[data-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.toast = "";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast!.classList.remove("show"), 2600);
}

export default function Toast() {
  return null;
}
