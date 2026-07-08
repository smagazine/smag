"use client";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";

export type MembershipDialogHandle = { open: (tier: string) => void };

const MembershipDialog = forwardRef<MembershipDialogHandle>((_, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [tier, setTier] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useImperativeHandle(ref, () => ({
    open(selectedTier: string) {
      setTier(selectedTier);
      setSubmitted(false);
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    },
  }));

  const close = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      type: `Membership: ${tier}`,
      message: `Membership signup for the ${tier} tier.`,
    };
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  return (
    <dialog
      className="membership-dialog"
      aria-labelledby="membership-dialog-title"
      ref={dialogRef}
      onClick={(e) => {
        const rect = dialogRef.current!.getBoundingClientRect();
        if (
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom
        ) {
          close();
        }
      }}
    >
      <button
        className="icon-button membership-dialog-close"
        type="button"
        aria-label="Close membership signup"
        onClick={close}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      <span className="label eyebrow" data-en="Reader's Majlis" data-ar="مجلس القراء">Reader&apos;s Majlis</span>
      <h2 id="membership-dialog-title" data-en="Start your membership" data-ar="ابدأ عضويتك">Start your membership</h2>
      <p className="deck" data-en="Join SAUDI MAG for independent Gulf culture, cities, and ideas." data-ar="انضم إلى المجلة السعودية لثقافة الخليج المستقلة.">
        Join SAUDI MAG for independent Gulf culture, cities, and ideas.
      </p>
      {!submitted ? (
        <form className="membership-form" onSubmit={handleSubmit}>
          <label>
            <span className="form-label">Selected tier</span>
            <input readOnly value={tier} />
          </label>
          <label>
            <span className="form-label">Full name</span>
            <input required name="name" autoComplete="name" />
          </label>
          <label>
            <span className="form-label">Email</span>
            <input required type="email" name="email" autoComplete="email" />
          </label>
          <button className="button" type="submit" data-en="Join membership" data-ar="انضم الآن">
            Join membership
          </button>
          {error && (
            <p className="form-label" style={{ color: "#c0392b" }} data-en="Something went wrong. Please try again." data-ar="حدث خطأ ما. يرجى المحاولة مرة أخرى.">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      ) : (
        <p className="membership-success">Thank you. Your membership request has been received.</p>
      )}
    </dialog>
  );
});

MembershipDialog.displayName = "MembershipDialog";
export default MembershipDialog;
