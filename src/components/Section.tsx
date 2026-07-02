export default function Section({
  index,
  title,
  id,
  children,
}: {
  index: string;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="section-grid">
        <h2 className="section-label" style={{ paddingTop: "0.25rem" }}>
          <span className="index" aria-hidden>
            {index}
          </span>
          {title}
        </h2>
        <div className="prose">{children}</div>
      </div>
    </section>
  );
}
