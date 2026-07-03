import Reveal from "@/components/Reveal";

/*
 * A recreation of the futures stack's Streamlit dashboard, in a browser
 * frame. The real one is VPN-only, so this stands in until (and alongside)
 * real screenshots. Numbers are representative paper-mode fiction; the
 * layout mirrors the live page. The equity curve draws in on scroll via
 * the same .reveal edge animation the diagrams use.
 */

// A plausible session equity curve on a 300×72 grid
const EQUITY_PATH =
  "M 0 52 L 20 50 L 38 54 L 55 44 L 74 46 L 92 38 L 110 41 L 128 30 " +
  "L 146 33 L 165 26 L 184 29 L 202 20 L 220 24 L 238 16 L 258 18 L 278 10 L 300 12";

export default function FuturesDash() {
  return (
    <Reveal>
      <div className="device-wrap">
        <div
          className="dash"
          role="img"
          aria-label="Recreation of the futures trading dashboard: session equity curve trending up, one open MNQ position, daily loss limit usage at 31 percent."
        >
          <div className="dash-chrome" aria-hidden>
            <span className="dash-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="dash-url">futures-dashboard · Tailscale only</span>
            <span className="dash-badge">PAPER</span>
          </div>

          <div className="dash-body">
            <div className="dash-stats">
              <div>
                <p className="dash-k">session P&L</p>
                <p className="dash-v dash-up">+$412.50</p>
              </div>
              <div>
                <p className="dash-k">open positions</p>
                <p className="dash-v">1</p>
              </div>
              <div>
                <p className="dash-k">session</p>
                <p className="dash-v">open · 11:42 ET</p>
              </div>
            </div>

            <div className="dash-chart">
              <p className="dash-k">equity · today</p>
              <svg viewBox="0 0 300 72" className="diagram-svg" aria-hidden>
                <path
                  className="edge-accent"
                  pathLength={1}
                  d={EQUITY_PATH}
                  style={{ strokeWidth: 1.5 }}
                />
              </svg>
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>symbol</th>
                  <th>side</th>
                  <th>size</th>
                  <th>entry</th>
                  <th>stop</th>
                  <th>uP&L</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MNQ</td>
                  <td className="dash-up">long</td>
                  <td>2</td>
                  <td>20,250.00</td>
                  <td>20,180.00</td>
                  <td className="dash-up">+$187.00</td>
                </tr>
              </tbody>
            </table>

            <div className="dash-dll">
              <p className="dash-k">daily loss limit used</p>
              <span className="dash-dll-track">
                <span className="dash-dll-fill" style={{ width: "31%" }} />
              </span>
              <span className="dash-dll-pct">31%</span>
            </div>
          </div>
        </div>
        <p className="meta device-caption">
          UI recreation of the Streamlit dashboard · the live one is VPN-only, numbers are paper-mode fiction
        </p>
      </div>
    </Reveal>
  );
}
