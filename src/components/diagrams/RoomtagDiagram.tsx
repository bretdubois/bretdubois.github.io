export default function RoomtagDiagram() {
  return (
    <figure className="figure">
      <svg
        className="diagram-svg"
        viewBox="0 0 720 310"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="RoomTag architecture: an ESP32-C6 tag posts RSSI fingerprints to a FastAPI server, which runs the inference pipeline and pushes results to an iOS app over WebSocket and to Home Assistant over REST. A CUDA machine trains the neural model and uploads it as ONNX."
      >
        <defs>
          <marker
            id="arr-rt"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#77776d" />
          </marker>
        </defs>

        {/* ESP32 tag */}
        <rect className="node-static" x="24" y="62" width="140" height="56" rx="4" />
        <text x="94" y="86" fontSize="12" textAnchor="middle" fontWeight="600">
          ESP32-C6 tag
        </text>
        <text className="t-muted" x="94" y="104" fontSize="10.5" textAnchor="middle">
          (wearable)
        </text>

        {/* edge tag → server */}
        <line className="edge" x1="164" y1="90" x2="270" y2="90" markerEnd="url(#arr-rt)" />
        <text className="t-muted" x="217" y="72" fontSize="10" textAnchor="middle">
          RSSI fingerprint
        </text>
        <text className="t-muted" x="217" y="112" fontSize="10" textAnchor="middle">
          HTTP POST · ~2 s
        </text>

        {/* server */}
        <rect className="node-static" x="274" y="24" width="200" height="180" rx="4" />
        <text x="374" y="50" fontSize="12" textAnchor="middle" fontWeight="600">
          FastAPI server
        </text>
        <text className="t-muted" x="374" y="66" fontSize="10" textAnchor="middle">
          (Docker, Linux)
        </text>
        <line className="edge" x1="294" y1="78" x2="454" y2="78" />
        <text x="374" y="100" fontSize="10.5" textAnchor="middle">
          RF / neural model
        </text>
        <text x="374" y="122" fontSize="10.5" textAnchor="middle">
          EMA smoothing
        </text>
        <text x="374" y="144" fontSize="10.5" textAnchor="middle">
          time-of-day Bayesian prior
        </text>
        <text x="374" y="166" fontSize="10.5" textAnchor="middle">
          Markov transition prior
        </text>
        <text x="374" y="188" fontSize="10.5" textAnchor="middle">
          hysteresis commit
        </text>

        {/* edges server → clients */}
        <line className="edge" x1="474" y1="70" x2="576" y2="70" markerEnd="url(#arr-rt)" />
        <text className="t-muted" x="525" y="58" fontSize="10" textAnchor="middle">
          WebSocket
        </text>
        <rect className="node-static" x="580" y="48" width="116" height="44" rx="4" />
        <text x="638" y="74" fontSize="11.5" textAnchor="middle">
          iOS app
        </text>

        <line className="edge" x1="474" y1="150" x2="576" y2="150" markerEnd="url(#arr-rt)" />
        <text className="t-muted" x="525" y="138" fontSize="10" textAnchor="middle">
          REST
        </text>
        <rect className="node-static" x="580" y="128" width="116" height="44" rx="4" />
        <text x="638" y="147" fontSize="11" textAnchor="middle">
          Home
        </text>
        <text x="638" y="163" fontSize="11" textAnchor="middle">
          Assistant
        </text>

        {/* trainer */}
        <rect className="node-soft" x="274" y="248" width="200" height="46" rx="4" />
        <text x="374" y="268" fontSize="11" textAnchor="middle">
          gaming PC · CUDA
        </text>
        <text className="t-muted" x="374" y="285" fontSize="10" textAnchor="middle">
          train_neural.py
        </text>
        <line className="edge-accent" x1="374" y1="248" x2="374" y2="208" markerEnd="url(#arr-rt)" />
        <text className="t-accent" x="386" y="232" fontSize="10">
          ONNX upload · zero-downtime hot-swap
        </text>
      </svg>
      <figcaption>
        <span className="fig-index">Fig. 01</span>
        Fingerprint in, room out — inference on CPU, training on GPU
      </figcaption>
    </figure>
  );
}
