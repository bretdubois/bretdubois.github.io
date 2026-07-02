"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="meta cursor-pointer rounded-md border px-3 py-1.5 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      style={{ borderColor: "var(--border)" }}
    >
      print / save as PDF
    </button>
  );
}
