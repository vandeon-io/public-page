// HeroViz.jsx — PortRun hero illustration (React island, animated).
// Tells the story: a person uses the web app (browser) → the app provisions
// VPS servers → it auto-configures them until the fleet is healthy.
// Directions: 'console' (dark), 'blueprint' (light line-art), 'flow' (bold icons).
import { useState, useEffect } from 'react';

function useRaf() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setT(5.4); return; } // settled "all healthy" frame
    const loop = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

const LOOP = 6.4; // seconds

function serverPhase(t, offset) {
  const local = (t % LOOP) - offset;
  if (local < 0)             return { state: 'idle',      prog: 0 };
  if (local < 1.3)           return { state: 'provision', prog: Math.min(1, local / 1.3) };
  if (local < 2.1)           return { state: 'configure', prog: 1 };
  if (local < LOOP - offset) return { state: 'ready',     prog: 1 };
  return { state: 'ready', prog: 1 };
}

const SERVERS = [
  { id: 'api',    label: 'api · 2× 4gb', region: 'us-east',    offset: 0.5 },
  { id: 'worker', label: 'worker · 2gb', region: 'eu-central', offset: 1.4 },
  { id: 'db',     label: 'postgres-16',  region: 'ap-south',   offset: 2.3 },
];

function ledColor(state, pal) {
  if (state === 'ready') return pal.accent;
  if (state === 'idle')  return pal.idle;
  return pal.warn;
}

// ── Direction A & B: fleet console geometry ───────────────────────────────
function FleetSvg({ pal, t }) {
  const APP = { x: 150, y: 152, w: 188, h: 156 };
  const PERSON = { x: 74, y: 230 };
  const appRight = APP.x + APP.w;
  const appMidY = APP.y + APP.h / 2;
  const srvX = 432, srvW = 166, srvH = 52;
  const srvCY = [118, 230, 342];

  const allReady = SERVERS.every((s) => serverPhase(t, s.offset).state === 'ready');

  return (
    <svg viewBox="0 0 620 460" className="viz-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={pal.gridId} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke={pal.grid} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="620" height="460" fill={`url(#${pal.gridId})`} />

      <text x="20" y="28" fontSize="9" fontFamily="var(--mono)" fill={pal.textFaint} letterSpacing="0.18em">PORTRUN › CONTROL PLANE</text>
      <text x="600" y="28" fontSize="9" fontFamily="var(--mono)" fill={pal.textFaint} letterSpacing="0.12em" textAnchor="end">{allReady ? 'fleet · healthy' : 'fleet · converging'}</text>

      <rect x="418" y="74" width="192" height="312" rx="5" fill={pal.groupFill} stroke={pal.groupStroke} strokeWidth="0.5" strokeDasharray="3 3" />
      <text x="426" y="64" fontSize="9.5" fontFamily="var(--mono)" fill={pal.textDim} letterSpacing="0.1em">VPS FLEET · 3 NODES</text>

      <line x1={PERSON.x + 22} y1={PERSON.y} x2={APP.x} y2={appMidY} stroke={pal.edge} strokeWidth="1" />
      {srvCY.map((cy, i) => (
        <path key={'e' + i} d={`M ${appRight} ${appMidY} C ${appRight + 46} ${appMidY}, ${srvX - 46} ${cy}, ${srvX} ${cy}`}
              fill="none" stroke={pal.edge} strokeWidth="1" />
      ))}

      {srvCY.map((cy, i) => {
        const ph = serverPhase(t, SERVERS[i].offset);
        if (ph.state === 'idle' || ph.state === 'ready') return null;
        const prog = (t * 1.4 + i * 0.4) % 1;
        const x = appRight + (srvX - appRight) * prog;
        const y = appMidY + (cy - appMidY) * (prog * prog * (3 - 2 * prog));
        return (
          <g key={'p' + i}>
            <circle cx={x} cy={y} r="3.2" fill={pal.accent} />
            <circle cx={x} cy={y} r="6.5" fill={pal.accent} opacity="0.22" />
          </g>
        );
      })}

      <g>
        <circle cx={PERSON.x} cy={PERSON.y} r="23" fill={pal.nodeFill} stroke={pal.nodeStroke} strokeWidth={pal.strokeW} />
        <circle cx={PERSON.x} cy={PERSON.y - 5} r="6.5" fill="none" stroke={pal.text} strokeWidth="1.4" />
        <path d={`M ${PERSON.x - 9} ${PERSON.y + 11} a 9 9 0 0 1 18 0`} fill="none" stroke={pal.text} strokeWidth="1.4" strokeLinecap="round" />
        <text x={PERSON.x} y={PERSON.y + 42} fontSize="9.5" textAnchor="middle" fontFamily="var(--mono)" fill={pal.textDim}>you</text>
      </g>

      <g>
        <rect x={APP.x} y={APP.y} width={APP.w} height={APP.h} rx="7" fill={pal.appFill} stroke={pal.accent} strokeWidth="1" />
        <line x1={APP.x} y1={APP.y + 28} x2={appRight} y2={APP.y + 28} stroke={pal.appLine} strokeWidth="0.75" />
        <circle cx={APP.x + 16} cy={APP.y + 14} r="3" fill={pal.dots} />
        <circle cx={APP.x + 27} cy={APP.y + 14} r="3" fill={pal.dots} />
        <circle cx={APP.x + 38} cy={APP.y + 14} r="3" fill={pal.dots} />
        <rect x={APP.x + 52} y={APP.y + 7} width={APP.w - 64} height="14" rx="7" fill={pal.urlFill} />
        <text x={APP.x + 60} y={APP.y + 17} fontSize="8.5" fontFamily="var(--mono)" fill={pal.textDim}>app.portrun.io</text>
        <text x={APP.x + 14} y={APP.y + 52} fontSize="9.5" fontFamily="var(--mono)" fill={pal.text}>$ portrun up</text>
        <text x={APP.x + 14} y={APP.y + 70} fontSize="9" fontFamily="var(--mono)" fill={pal.textDim}>→ reading manifest.yaml</text>
        <text x={APP.x + 14} y={APP.y + 88} fontSize="9" fontFamily="var(--mono)" fill={pal.textDim}>→ provisioning fleet</text>
        <rect x={APP.x + 14} y={APP.y + 104} width={APP.w - 28} height="6" rx="3" fill={pal.barTrack} />
        <rect x={APP.x + 14} y={APP.y + 104} width={(APP.w - 28) * (SERVERS.filter(s => serverPhase(t, s.offset).state === 'ready').length / 3)} height="6" rx="3" fill={pal.accent} />
        <circle cx={APP.x + 14} cy={APP.y + 128} r="3" fill={pal.accent}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <text x={APP.x + 24} y={APP.y + 131} fontSize="8.5" fontFamily="var(--mono)" fill={pal.textDim}>orchestrator · live</text>
        <text x={APP.x + APP.w / 2} y={APP.y + APP.h + 20} fontSize="9.5" textAnchor="middle" fontFamily="var(--mono)" fill={pal.textDim}>portrun web app</text>
      </g>

      {srvCY.map((cy, i) => {
        const s = SERVERS[i];
        const ph = serverPhase(t, s.offset);
        const led = ledColor(ph.state, pal);
        const ready = ph.state === 'ready';
        const labelTxt = ph.state === 'idle' ? 'queued'
          : ph.state === 'provision' ? 'provisioning'
          : ph.state === 'configure' ? 'configuring' : 'healthy';
        return (
          <g key={s.id}>
            <rect x={srvX} y={cy - srvH / 2} width={srvW} height={srvH} rx="5" fill={pal.nodeFill} stroke={ready ? pal.accent : pal.nodeStroke} strokeWidth={ready ? 1 : pal.strokeW} />
            <circle cx={srvX + 14} cy={cy - 13} r="3.5" fill={led}>
              {ph.state !== 'ready' && ph.state !== 'idle' && (
                <animate attributeName="opacity" values="1;0.25;1" dur="0.9s" repeatCount="indefinite" />
              )}
            </circle>
            <g stroke={pal.textDim} strokeWidth="1" opacity="0.7">
              <rect x={srvX + srvW - 26} y={cy - 15} width="14" height="5" rx="1" fill="none" />
              <rect x={srvX + srvW - 26} y={cy - 7} width="14" height="5" rx="1" fill="none" />
            </g>
            <text x={srvX + 26} y={cy - 9.5} fontSize="9.5" fontFamily="var(--mono)" fill={pal.text}>{s.id}</text>
            <text x={srvX + 14} y={cy + 8} fontSize="8" fontFamily="var(--mono)" fill={pal.textDim}>{s.label}</text>
            <rect x={srvX + 14} y={cy + 14} width={srvW - 28} height="4" rx="2" fill={pal.barTrack} />
            <rect x={srvX + 14} y={cy + 14} width={(srvW - 28) * ph.prog} height="4" rx="2" fill={led} />
            {ready && (
              <path d={`M ${srvX + srvW - 20} ${cy + 14} l 3 3 l 6 -7`} fill="none" stroke={pal.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <text x={srvX + srvW - 10} y={cy - 9.5} fontSize="7.5" textAnchor="end" fontFamily="var(--mono)" fill={ready ? pal.accent : pal.textDim}>{labelTxt}</text>
          </g>
        );
      })}

      <line x1="20" y1="430" x2="600" y2="430" stroke={pal.edge} strokeWidth="0.5" />
      <text x="20" y="446" fontSize="9" fontFamily="var(--mono)" fill={pal.textDim}>
        <tspan fill={pal.accent}>●</tspan> {SERVERS.filter(s => serverPhase(t, s.offset).state === 'ready').length} healthy
        <tspan dx="12">auto-setup · zero manual ssh</tspan>
      </text>
      <text x="600" y="446" fontSize="9" textAnchor="end" fontFamily="var(--mono)" fill={pal.textFaint}>p95 118ms</text>
    </svg>
  );
}

// ── Direction C: bold three-icon flow ─────────────────────────────────────
function FlowSvg({ pal, t }) {
  const cy = 196;
  const PERSON = { x: 96, y: cy };
  const APP = { x: 310, y: cy };
  const STACK = { x: 524, y: cy };

  const readyCount = SERVERS.filter(s => serverPhase(t, s.offset).state === 'ready').length;

  const Conn = ({ x1, x2, active }) => {
    const len = x2 - x1;
    const dash = 9;
    const off = -(t * 34) % (dash * 2);
    return (
      <g>
        <line x1={x1} y1={cy} x2={x2} y2={cy} stroke={pal.edge} strokeWidth="1.5" strokeDasharray={`${dash} ${dash}`} strokeDashoffset={off} />
        {active && (() => {
          const prog = (t * 0.7) % 1;
          return <circle cx={x1 + len * prog} cy={cy} r="4.5" fill={pal.accent} />;
        })()}
      </g>
    );
  };

  const bigTile = (cx, cty, children, label) => (
    <g>
      <rect x={cx - 56} y={cty - 56} width="112" height="112" rx="14" fill={pal.appFill} stroke={pal.nodeStroke} strokeWidth="1.5" />
      <rect x={cx - 56} y={cty - 56} width="112" height="22" rx="14" fill={pal.headFill} />
      <rect x={cx - 56} y={cty - 45} width="112" height="11" fill={pal.headFill} />
      {children}
      <text x={cx} y={cty + 78} fontSize="11" textAnchor="middle" fontFamily="var(--mono)" fill={pal.textDim}>{label}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 620 392" className="viz-svg" style={{ aspectRatio: '620 / 392' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={pal.gridId} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke={pal.grid} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="620" height="392" fill={`url(#${pal.gridId})`} />

      <text x="20" y="28" fontSize="9" fontFamily="var(--mono)" fill={pal.textFaint} letterSpacing="0.18em">PORTRUN › HOW IT FLOWS</text>

      <Conn x1={PERSON.x + 56} x2={APP.x - 56} active={true} />
      <Conn x1={APP.x + 56} x2={STACK.x - 56} active={readyCount < 3} />

      {bigTile(PERSON.x, cy, (
        <g>
          <circle cx={PERSON.x} cy={cy - 8} r="11" fill="none" stroke={pal.text} strokeWidth="2" />
          <path d={`M ${PERSON.x - 16} ${cy + 22} a 16 16 0 0 1 32 0`} fill="none" stroke={pal.text} strokeWidth="2" strokeLinecap="round" />
        </g>
      ), 'you')}

      {bigTile(APP.x, cy, (
        <g>
          <circle cx={APP.x - 38} cy={cy - 45} r="2.5" fill={pal.dots} />
          <circle cx={APP.x - 30} cy={cy - 45} r="2.5" fill={pal.dots} />
          <circle cx={APP.x - 22} cy={cy - 45} r="2.5" fill={pal.dots} />
          <text x={APP.x} y={cy + 2} fontSize="13" textAnchor="middle" fontFamily="var(--mono)" fontWeight="600" fill={pal.text}>portrun</text>
          <rect x={APP.x - 30} y={cy + 12} width="60" height="5" rx="2.5" fill={pal.barTrack} />
          <rect x={APP.x - 30} y={cy + 12} width={60 * (readyCount / 3)} height="5" rx="2.5" fill={pal.accent} />
        </g>
      ), 'web app')}

      {bigTile(STACK.x, cy, (
        <g>
          {[-18, 0, 18].map((dy, i) => {
            const ph = serverPhase(t, SERVERS[i].offset);
            const led = ledColor(ph.state, pal);
            return (
              <g key={i}>
                <rect x={STACK.x - 32} y={cy - 8 + dy - 6} width="64" height="13" rx="2.5" fill="none" stroke={pal.nodeStroke} strokeWidth="1.2" />
                <circle cx={STACK.x - 24} cy={cy - 8 + dy} r="3" fill={led}>
                  {ph.state !== 'ready' && ph.state !== 'idle' && (
                    <animate attributeName="opacity" values="1;0.25;1" dur="0.9s" repeatCount="indefinite" />
                  )}
                </circle>
                <line x1={STACK.x - 14} y1={cy - 8 + dy} x2={STACK.x + 24} y2={cy - 8 + dy} stroke={pal.textDim} strokeWidth="1" opacity="0.5" />
              </g>
            );
          })}
        </g>
      ), 'vps servers')}

      <text x={(PERSON.x + APP.x) / 2} y={cy - 24} fontSize="9" textAnchor="middle" fontFamily="var(--mono)" fill={pal.textFaint}>opens</text>
      <text x={(APP.x + STACK.x) / 2} y={cy - 24} fontSize="9" textAnchor="middle" fontFamily="var(--mono)" fill={pal.textFaint}>provisions + configures</text>

      <line x1="20" y1="356" x2="600" y2="356" stroke={pal.edge} strokeWidth="0.5" />
      <text x="20" y="374" fontSize="9.5" fontFamily="var(--mono)" fill={pal.textDim}>
        <tspan fill={pal.accent}>●</tspan> {readyCount}/3 nodes configured automatically
      </text>
      <text x="600" y="374" fontSize="9.5" textAnchor="end" fontFamily="var(--mono)" fill={pal.textFaint}>no manual ssh</text>
    </svg>
  );
}

function colorMix(accent, amt) {
  return `color-mix(in oklch, ${accent} ${Math.round(amt * 100)}%, transparent)`;
}

function palette(variant, accent) {
  const warm = '#e0a04a';
  if (variant === 'blueprint') {
    return {
      gridId: 'g-bp', grid: 'rgba(10,10,10,0.05)',
      text: 'rgba(10,10,10,0.82)', textDim: 'rgba(10,10,10,0.55)', textFaint: 'rgba(10,10,10,0.34)',
      edge: 'rgba(10,10,10,0.22)', nodeFill: 'rgba(255,255,255,0.7)', nodeStroke: 'rgba(10,10,10,0.35)',
      appFill: 'rgba(255,255,255,0.85)', appLine: 'rgba(10,10,10,0.14)', dots: 'rgba(10,10,10,0.25)',
      urlFill: 'rgba(10,10,10,0.05)', groupFill: 'rgba(10,10,10,0.015)', groupStroke: 'rgba(10,10,10,0.2)',
      barTrack: 'rgba(10,10,10,0.1)', idle: 'rgba(10,10,10,0.25)', warn: warm, accent, strokeW: 1,
    };
  }
  if (variant === 'flow') {
    return {
      gridId: 'g-fl', grid: 'rgba(10,10,10,0.05)',
      text: 'rgba(10,10,10,0.85)', textDim: 'rgba(10,10,10,0.55)', textFaint: 'rgba(10,10,10,0.34)',
      edge: 'rgba(10,10,10,0.28)', nodeFill: '#ffffff', nodeStroke: 'rgba(10,10,10,0.7)',
      appFill: '#ffffff', headFill: colorMix(accent, 0.16), dots: 'rgba(10,10,10,0.3)',
      barTrack: 'rgba(10,10,10,0.1)', idle: 'rgba(10,10,10,0.22)', warn: warm, accent, strokeW: 1.5,
    };
  }
  return {
    gridId: 'g-cs', grid: 'rgba(255,255,255,0.05)',
    text: 'rgba(255,255,255,0.9)', textDim: 'rgba(255,255,255,0.5)', textFaint: 'rgba(255,255,255,0.32)',
    edge: 'rgba(255,255,255,0.16)', nodeFill: 'rgba(255,255,255,0.03)', nodeStroke: 'rgba(255,255,255,0.2)',
    appFill: 'rgba(255,255,255,0.02)', appLine: 'rgba(255,255,255,0.1)', dots: 'rgba(255,255,255,0.2)',
    urlFill: 'rgba(255,255,255,0.06)', groupFill: 'rgba(255,255,255,0.015)', groupStroke: 'rgba(255,255,255,0.12)',
    barTrack: 'rgba(255,255,255,0.08)', idle: 'rgba(255,255,255,0.25)', warn: warm, accent, strokeW: 0.75,
  };
}

export default function HeroViz({ variant = 'console', accent = '#43c07d' }) {
  const t = useRaf();
  const pal = palette(variant, accent);
  const dark = variant === 'console';
  const readyCount = SERVERS.filter(s => serverPhase(t, s.offset).state === 'ready').length;
  const tabs = variant === 'flow' ? ['flow'] : ['infrastructure', 'deployments', 'logs'];

  return (
    <div className={'viz ' + (dark ? 'viz--dark' : 'viz--light')}>
      <div className="viz-chrome">
        <div className="viz-tabs">
          {tabs.map((tb, i) => (
            <span key={tb} className={'viz-tab' + (i === 0 ? ' on' : '')}>
              {i === 0 && <span className="viz-tab-dot" style={{ background: accent }} />}
              {tb}
            </span>
          ))}
        </div>
        <div className="viz-meta">
          <span>{readyCount}/3 nodes</span>
          <span style={{ color: accent }}>● live</span>
        </div>
      </div>
      {variant === 'flow' ? <FlowSvg pal={pal} t={t} /> : <FleetSvg pal={pal} t={t} />}
    </div>
  );
}
