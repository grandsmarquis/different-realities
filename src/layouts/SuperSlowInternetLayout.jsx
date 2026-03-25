import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const LOADING_LINES = [
  'Negotiating with a single TCP packet…',
  'Your router is doing yoga. Hold on.',
  'Convincing pixels to visit one at a time…',
  'DNS is on a coffee break.',
  'Still faster than explaining NFTs.',
  'Buffering the concept of buffering…',
  'The cloud is walking here.',
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

function SnailCableHero() {
  return (
    <svg className="slow-net-hero-svg w-full max-h-[min(200px,22vh)]" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="slowNetSea" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0f172a" />
          <stop offset="0.5" stopColor="#1e3a5f" />
          <stop offset="1" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="slowNetCable" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#334155" />
          <stop offset="0.5" stopColor="#64748b" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
      </defs>
      <rect width="480" height="200" fill="url(#slowNetSea)" rx="12" />
      <path
        className="slow-net-cable-flow"
        d="M -20 120 Q 120 40 240 120 T 500 110"
        stroke="url(#slowNetCable)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M -20 120 Q 120 40 240 120 T 500 110"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="8 24"
        className="slow-net-cable-flow"
        opacity="0.5"
      />
      <g className="slow-net-packet">
        <rect width="28" height="18" rx="4" fill="#fbbf24" opacity="0.95" />
        <text x="14" y="13" textAnchor="middle" dominantBaseline="middle" fill="#422006" fontSize="10" fontWeight="bold" fontFamily="monospace">
          1b
        </text>
      </g>
      <g className="slow-net-packet slow-net-packet-delay">
        <rect width="24" height="15" rx="3" fill="#a78bfa" opacity="0.9" />
      </g>
      <g transform="translate(168, 78)">
        <g className="slow-net-snail-bob">
        <ellipse cx="28" cy="52" rx="36" ry="22" fill="#78716c" opacity="0.35" />
        <path
          d="M8 48c-4-18 28-28 44-14 8 10 6 26-10 32-20 8-38-4-34-18z"
          fill="#a8a29e"
          stroke="#57534e"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="38" r="10" fill="#d6d3d1" stroke="#57534e" strokeWidth="1.5" />
        <circle cx="15" cy="36" r="2.5" fill="#1c1917" />
        <path d="M22 32c6-4 14-2 18 4" stroke="#57534e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <text x="40" y="30" fill="#fef3c7" fontSize="11" fontWeight="bold" fontFamily="monospace">
          @
        </text>
        </g>
      </g>
      <text x="400" y="36" fill="#67e8f9" fontSize="11" fontFamily="monospace" opacity="0.7">
        ~ Atlantic fiber ~
      </text>
    </svg>
  )
}

function PanelLoader({ label, lineIndex }) {
  return (
    <div className="slow-net-panel-loader flex min-h-[140px] flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="loading loading-spinner loading-lg text-secondary" aria-hidden />
      <p className="m-0 max-w-[14rem] text-xs font-semibold leading-snug text-[var(--text2)]">{LOADING_LINES[lineIndex % LOADING_LINES.length]}</p>
      <p className="m-0 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/80">{label}</p>
      <progress className="progress progress-secondary w-full max-w-xs" value={null} />
    </div>
  )
}

export default function SuperSlowInternetLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const reducedMotion = useReducedMotion()
  const [lineIdx, setLineIdx] = useState(0)
  const [mbps, setMbps] = useState(0.04)
  const [ping, setPing] = useState(8421)
  const [inboxReady, setInboxReady] = useState(false)
  const [weatherReady, setWeatherReady] = useState(false)
  const [stocksReady, setStocksReady] = useState(false)
  const [newsReady, setNewsReady] = useState(false)

  const t = (ms) => (reducedMotion ? 80 : ms)

  useEffect(() => {
    const id = setInterval(() => setLineIdx(i => (i + 1) % LOADING_LINES.length), 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setMbps(() => 0.015 + Math.random() * 0.09)
      setPing(p => p + Math.floor(Math.random() * 400 + 80))
    }, 2800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const a = window.setTimeout(() => setInboxReady(true), t(1800))
    const b = window.setTimeout(() => setWeatherReady(true), t(3400))
    const c = window.setTimeout(() => setStocksReady(true), t(5200))
    const d = window.setTimeout(() => setNewsReady(true), t(6800))
    return () => {
      clearTimeout(a)
      clearTimeout(b)
      clearTimeout(c)
      clearTimeout(d)
    }
  }, [reducedMotion])

  const newsMarquee = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('  ·  '), [])

  const allReady = inboxReady && weatherReady && stocksReady && newsReady

  return (
    <div
      className="slow-net-root slow-net-bg-pulse relative min-h-dvh overflow-x-hidden pb-16 text-[var(--text)]"
      style={{ fontFamily: 'var(--font-main)', backgroundColor: 'var(--bg)' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(34,211,238,0.12) 2px, rgba(34,211,238,0.12) 3px)',
      }}
      />

      <header className="relative z-10 mx-auto max-w-6xl px-3 pt-4">
        <div className="overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 shadow-xl backdrop-blur-md">
          <SnailCableHero />
          <div className="flex flex-col gap-4 border-t border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-secondary">ThrottleNet™ live</p>
              <h1 className="m-0 text-2xl leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                INTERNET IS SUPER SLOW
              </h1>
              <p className="m-0 mt-1 text-sm text-[var(--text2)]">Same inbox, weather, stonks &amp; news — arriving fashionably late.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="stats stats-vertical border border-[var(--border)] bg-base-300/40 shadow sm:stats-horizontal">
                <div className="stat place-items-center px-4 py-2">
                  <div className="stat-title text-[10px] uppercase text-[var(--text2)]">Down</div>
                  <div className="stat-value font-mono text-lg text-secondary">
                    {mbps.toFixed(2)}
                    <span className="text-xs font-normal text-[var(--text2)]"> Mbps</span>
                  </div>
                </div>
                <div className="stat place-items-center px-4 py-2">
                  <div className="stat-title text-[10px] uppercase text-[var(--text2)]">Ping</div>
                  <div className="stat-value font-mono text-lg text-warning">{ping.toLocaleString()} ms</div>
                </div>
              </div>
              <button type="button" className="btn btn-outline btn-sm border-warning text-warning hover:bg-warning hover:text-warning-content" onClick={onSwitchPersona}>
                Upgrade reality
              </button>
            </div>
          </div>
          <div className="border-t border-[var(--border)] bg-base-300/30 px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--text2)]">Throughput</span>
              <div className="slow-net-meter relative h-2 flex-1 overflow-hidden rounded-full bg-base-content/10">
                <div
                  className="slow-net-progress-fill absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-secondary via-accent to-secondary"
                  style={{ width: `${Math.min(100, mbps * 400)}%` }}
                />
              </div>
              {!allReady && (
                <span className="slow-net-bit-drip badge badge-ghost badge-sm font-mono text-[10px] uppercase">
                  dripping…
                </span>
              )}
              {allReady && <span className="badge badge-success badge-sm font-bold">mostly here</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-3 py-6 lg:grid-cols-2">
        <section className="card border-2 border-[var(--border)] bg-[var(--card)]/90 shadow-lg backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="card-title m-0 text-base text-accent">Inbox</h2>
              <span className="badge badge-accent badge-outline font-mono text-xs">{emails.filter(e => !e.read).length} unread</span>
            </div>
            {!inboxReady && <PanelLoader label="Downloading subject lines" lineIndex={lineIdx} />}
            {inboxReady && (
              <ul className="space-y-2">
                {emails.map((e, i) => (
                  <li key={e.id} className="slow-net-email-row" style={{ animationDelay: `${reducedMotion ? 0 : i * 0.12}s` }}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition hover:border-accent hover:bg-base-200/50 ${
                        e.read ? 'border-[var(--border)] bg-base-300/20' : 'border-accent/40 bg-accent/5'
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base-300 text-xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`m-0 text-sm ${e.read ? 'text-[var(--text2)]' : 'font-bold text-[var(--text)]'}`}>{e.subject}</p>
                        <p className="m-0 text-xs text-[var(--text2)]">
                          {e.from.name} · {e.date}
                        </p>
                        <p className="m-0 mt-1 line-clamp-2 text-xs opacity-70">{e.preview}</p>
                      </div>
                      {!e.read && <span className="badge badge-sm badge-warning shrink-0">new</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <section className="card border-2 border-[var(--border)] bg-[var(--card)]/90 shadow-lg backdrop-blur-sm">
            <div className={`card-body flex flex-wrap items-center gap-4 p-4 ${weatherReady ? 'flex-row' : 'flex-col'}`}>
              {!weatherReady && <PanelLoader label="Fetching one cloud pixel" lineIndex={lineIdx + 1} />}
              {weatherReady && (
                <>
                  <span className="slow-net-weather-pop text-6xl">{weather.icon}</span>
                  <div className="flex-1">
                    <h2 className="m-0 text-xs font-bold uppercase tracking-widest text-secondary">Weather</h2>
                    <p className="m-0 text-4xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                      {weather.temp}°C
                    </p>
                    <p className="m-0 text-sm text-[var(--text2)]">{weather.city}</p>
                    <p className="m-0 mt-1 text-xs italic text-[var(--text2)]">Radar image ETA: next Tuesday</p>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="card border-2 border-[var(--border)] bg-[var(--card)]/90 shadow-lg backdrop-blur-sm">
            <div className="card-body p-4">
              <h2 className="card-title m-0 mb-3 text-base text-warning">Stonks</h2>
              {!stocksReady && <PanelLoader label="Loading tickers (lossy compression)" lineIndex={lineIdx + 2} />}
              {stocksReady && (
                <ul className="space-y-3">
                  {stocks.map(s => (
                    <li key={s.ticker} className="slow-net-stock-row flex items-center gap-3 border-b border-base-content/5 pb-3 last:border-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <p className="m-0 font-mono text-sm font-bold">{s.ticker}</p>
                        <p className={`m-0 text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                          {s.changePct >= 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                          {s.changePct}%
                        </p>
                      </div>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} className="opacity-90" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="card border-2 border-[var(--border)] bg-[var(--card)]/90 shadow-lg backdrop-blur-sm">
            <div className="card-body p-4">
              <h2 className="card-title m-0 mb-2 text-base text-accent">News crawl</h2>
              {!newsReady && <PanelLoader label="Rendering headlines in crayon" lineIndex={lineIdx + 3} />}
              {newsReady && (
                <>
                  <div className="slow-net-news-ticker mb-3 overflow-hidden rounded-lg border border-accent/20 bg-base-300/40 py-2">
                    <div className="slow-net-news-track whitespace-nowrap font-mono text-xs font-semibold text-accent/95">
                      <span className="inline-block px-3">{newsMarquee}</span>
                      <span className="inline-block px-3" aria-hidden>
                        {newsMarquee}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {news.map((n, i) => (
                      <li
                        key={n.id}
                        className="slow-net-news-line flex gap-2 rounded-lg border border-transparent px-2 py-1 text-sm hover:border-[var(--border)] hover:bg-base-200/30"
                        style={{ animationDelay: `${reducedMotion ? 0 : 0.05 + i * 0.07}s` }}
                      >
                        <span className="shrink-0">{n.emoji}</span>
                        <span className="text-[var(--text2)]">{n.title}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="slow-net-modal-pop fixed inset-0 z-50 flex items-center justify-center bg-neutral/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="card relative max-h-[min(78vh,520px)] w-full max-w-lg overflow-y-auto border-2 border-accent bg-[var(--card)] shadow-2xl"
            onClick={ev => ev.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="slow-net-email-title"
          >
            <div className="card-body">
              <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close" onClick={() => setSelectedEmail(null)}>
                ✕
              </button>
              <p className="m-0 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Finally loaded</p>
              <h3 id="slow-net-email-title" className="m-0 mt-2 text-center text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedEmail.subject}
              </h3>
              <p className="m-0 mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
              <div className="mt-4 whitespace-pre-wrap border-t border-base-content/10 pt-4 text-sm leading-relaxed opacity-90">{selectedEmail.body}</div>
              <button type="button" className="btn btn-accent btn-block mt-6" onClick={() => setSelectedEmail(null)}>
                Close before it buffers again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
