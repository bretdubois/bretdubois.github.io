import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="shell pt-24 pb-20" style={{ maxWidth: "42rem" }}>
      <p className="label" style={{ marginBottom: "1rem" }}>
        <span className="index" style={{ color: "var(--accent)" }}>
          404
        </span>{" "}
        page not found
      </p>
      <h1
        className="display"
        style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", marginBottom: "1rem" }}
      >
        This one wandered off
        <span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <div className="prose">
        <p>
          The page you were after is not here. Head back to the{" "}
          <Link href="/">home page</Link>, jump to the{" "}
          <Link href="/#projects">projects</Link>, or read the{" "}
          <Link href="/resume/">résumé</Link>.
        </p>
      </div>
    </div>
  );
}
