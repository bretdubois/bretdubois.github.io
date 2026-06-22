"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className ?? "btn-primary text-sm py-2 px-4"}
    >
      <Printer size={15} />
      Save as PDF
    </button>
  );
}
