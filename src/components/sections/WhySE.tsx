/* Hallmark · section: Why I'm a strong SE
 * Single-column list with bold typographic lead-ins. No icon tiles,
 * no 2-column card grid. The structure is restraint: one item per row,
 * the lead-in carries the emphasis.
 */

const bullets = [
  {
    lead: "Diagnostics under pressure, at Apple's scale.",
    body: "Three years of 15-to-30-minute hardware and software triage windows with non-technical customers. 300+ consecutive perfect satisfaction scores under that constraint. Diagnosing root causes on a clock while keeping the customer confident in the outcome is the same skill an SE discovery call requires, just in a retail frame.",
  },
  {
    lead: "I've deployed real networks end-to-end.",
    body: "Not lab configs. Physical gear, physical buildings, real clients. Site survey through VLAN segmentation through AP placement through client runbook delivery. I know what a switch port profile is, what inter-VLAN firewall rules look like, and why double-NAT is sometimes the right call.",
  },
  {
    lead: "I know what “can this integrate?” actually means.",
    body: "I've built automation pipelines: webhook triggers, API data ingestion, LLM classification, CRM output via HubSpot. When a prospect asks whether a product can connect to their stack, I'm not guessing. I've done the wiring myself.",
  },
  {
    lead: "Discovery before product, every time.",
    body: "At SpotHopper I never opened a product screen in the first call. The first call was requirements: operational pain, what they'd tried, what a win looks like for them specifically. That habit is practiced, not trained. Generic demos fail because they skip this step.",
  },
  {
    lead: "I translate between technical teams and non-technical buyers.",
    body: "At Apple, at Asurion, and in every network deployment, the gap between what the system does and what the customer needs to hear was my job to bridge. I've explained VLANs to a restaurant owner and firmware to a retired teacher. At this point that translation is automatic.",
  },
  {
    lead: "I document clean handoffs.",
    body: "Every network deployment ends with a runbook. Every automation I build is documented for reproducibility. An undocumented solution becomes a permanent dependency on me, and that isn't good for anyone. After a few painful handoff cleanups, documentation just became part of the work.",
  },
];

export default function WhySE() {
  return (
    <section id="why-se" className="page-shell s-wide">
      <header style={{ marginBottom: "var(--space-2xl)", maxWidth: "60ch" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "var(--space-xs)",
          }}
        >
          The Case
        </p>
        <h2
          className="display"
          style={{
            fontSize: "var(--text-display-s)",
            color: "var(--color-ink)",
            marginBottom: "var(--space-sm)",
          }}
        >
          Why I&apos;m a strong Solutions Engineer.
        </h2>
        <p
          className="serif-italic"
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-muted)",
            maxWidth: "52ch",
          }}
        >
          The roles below don&apos;t have &ldquo;Solutions Engineer&rdquo; in
          the title. Here is why that doesn&apos;t matter.
        </p>
      </header>

      <dl style={{ margin: 0 }}>
        {bullets.map((b, i) => (
          <div
            key={i}
            style={{
              paddingTop: "var(--space-lg)",
              paddingBottom: "var(--space-lg)",
              borderTop:
                i === 0
                  ? "var(--rule-fine) solid var(--color-ink)"
                  : "var(--rule-hair) solid var(--color-rule)",
            }}
          >
            <dt
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--text-lg)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--color-ink)",
                marginBottom: "var(--space-2xs)",
              }}
            >
              {b.lead}
            </dt>
            <dd
              style={{
                margin: 0,
                color: "var(--color-ink-2)",
                lineHeight: "var(--lh-normal)",
                maxWidth: "68ch",
              }}
            >
              {b.body}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
