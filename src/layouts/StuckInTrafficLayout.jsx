import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const GPS_QUIPS = [
  'Recalculating… again.',
  'Fastest route. Objectively false.',
  'Traffic ahead. You ARE the traffic.',
  'In 200 m merge — imagination only.',
  'Arrival time is a social construct.',
]

function WindshieldRoad({ className }) {
  return (
    <svg className={className} viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="trafficAsphalt" x1="200" y1="0" x2="200" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e293b" />
          <stop offset="0.45" stopColor="#0f172a" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="trafficSky" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#4338ca" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#f97316" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 0 H400 V220 H0 Z" fill="url(#trafficSky)" />
      <path d="M55 220 L140 78 L260 78 L345 220 Z" fill="url(#trafficAsphalt)" />
      <g className="traffic-road-lines">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <rect key={i} x="196" y={88 + i * 22} width="8" height="12" rx="2" fill="#fbbf24" opacity={0.55 - i * 0.06} />
        ))}
      </g>
      <ellipse cx="200" cy="92" rx="120" ry="8" fill="#f87171" opacity="0.15" className="traffic-brake-blob" />
      <g className="traffic-bumper-bob" opacity="0.85">
        <rect x="118" y="108" width="44" height="28" rx="4" fill="#334155" />
        <rect x="238" y="108" width="44" height="28" rx="4" fill="#334155" />
        <rect x="168" y="118" width="64" height="36" rx="5" fill="#475569" />
        <circle cx="132" cy="118" r="3" fill="#ef4444" className="traffic-tail-blink" />
        <circle cx="268" cy="118" r="3" fill="#ef4444" className="traffic-tail-blink-delay" />
      </g>
    </svg>
  )
}

export default function StuckInTrafficLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [etaMin, setEtaMin] = useState(11)
  const [kph, setKph] = useState(6)
  const [gpsIdx, setGpsIdx] = useState(0)
  const [honkBurst, setHonkBurst] = useState(0)
  const [honkLabel, setHonkLabel] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setEtaMin(e => Math.min(99, e + (Math.random() > 0.4 ? 1 : 2)))
      setKph(() => 3 + Math.floor(Math.random() * 8))
    }, 4200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setGpsIdx(i => (i + 1) % GPS_QUIPS.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  function handleHonk() {
    setHonkBurst(c => c + 1)
    setHonkLabel(true)
    window.setTimeout(() => setHonkLabel(false), 900)
  }

  const radioCrawl = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('   ·   '), [])

  return (
    <div
      className="traffic-jam-root traffic-hud-vibrate relative min-h-dvh overflow-x-hidden pb-14 text-base-content"
      style={{ fontFamily: 'var(--font-main)', backgroundColor: 'var(--bg)' }}
    >
      <div className="traffic-sky-shift pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div className="traffic-brake-mist pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-error/25 via-transparent to-transparent" aria-hidden />

      {/* Windshield */}
      <div className="traffic-wiper-sweep relative z-10 mx-auto max-w-6xl px-3 pt-4">
        <div
          className="relative overflow-hidden rounded-b-[2.5rem] border-x-4 border-b-4 bg-[var(--card)]/40 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          style={{ borderColor: 'color-mix(in srgb, var(--card) 82%, #000000)' }}
        >
          <WindshieldRoad className="w-full max-h-[min(28vh,220px)] object-cover object-bottom" />
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-warning/40 bg-base-300/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-warning backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
            </span>
            Brake lights: performance art
          </div>
        </div>
      </div>

      {/* GPS bar */}
      <header className="relative z-20 mx-auto mt-4 max-w-6xl px-3">
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="traffic-eta-pulse flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-warning to-error text-2xl shadow-lg shadow-warning/20">
              🚗
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]">GPS · denial mode</p>
              <h1 className="m-0 text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                STUCK IN TRAFFIC
              </h1>
              <p className="m-0 mt-1 text-xs text-[var(--text2)] transition-all duration-500">{GPS_QUIPS[gpsIdx]}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="rounded-xl border-2 border-error/50 bg-error/10 px-4 py-2 text-center">
              <p className="m-0 text-[9px] font-bold uppercase tracking-widest text-error/90">ETA</p>
              <p
                key={etaMin}
                className="traffic-eta-pop m-0 font-mono text-3xl font-bold tabular-nums text-error"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {etaMin}m
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-base-200/80 px-3 py-2 text-center">
              <p className="m-0 text-[9px] uppercase text-[var(--text2)]">Crawl</p>
              <p className="m-0 font-mono text-xl font-bold tabular-nums text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                {kph} <span className="text-sm font-semibold text-[var(--text2)]">km/h</span>
              </p>
            </div>
            <div className="relative">
              <button type="button" className="btn btn-error btn-sm gap-1 font-bold uppercase" onClick={handleHonk}>
                Honk
              </button>
              {honkLabel && (
                <span className="traffic-honk-float pointer-events-none absolute -top-8 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg bg-error px-2 py-0.5 text-xs font-black text-error-content shadow-lg">
                  BEEP BEEP
                </span>
              )}
              <span key={honkBurst} className="traffic-honk-ripple pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
                <span />
                <span />
              </span>
            </div>
            <button type="button" className="btn btn-outline btn-sm border-[var(--border)]" onClick={onSwitchPersona}>
              Abandon car
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-3 py-5 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <h2 className="m-0 text-sm font-bold uppercase tracking-widest text-[var(--accent)]">Phone mount · notifications</h2>
              <p className="m-0 text-xs text-[var(--text2)]">Tap a bubble. Your lane isn&apos;t moving anyway.</p>
            </div>
            <span className="badge badge-warning badge-sm font-bold">{emails.filter(e => !e.read).length} unread</span>
          </div>
          <ul className="space-y-2">
            {emails.map((e, i) => (
              <li key={e.id} className="traffic-email-toast" style={{ animationDelay: `${i * 0.07}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className={`group flex w-full items-start gap-3 rounded-2xl border-2 p-3 text-left shadow-md transition hover:scale-[1.01] hover:border-warning hover:shadow-lg hover:shadow-warning/10 active:scale-[0.99] ${
                    e.read ? 'border-[var(--border)] bg-base-200/50' : 'border-warning/40 bg-base-100/90'
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-base-300 text-2xl shadow-inner">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`m-0 text-sm ${e.read ? 'text-base-content/75' : 'font-bold text-base-content'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-[var(--text2)]">
                      {e.from.name} · {e.date}
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs text-base-content/60">{e.preview}</p>
                  </div>
                  {!e.read && <span className="badge badge-error badge-xs shrink-0 animate-pulse">NEW</span>}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border-2 border-info/40 bg-gradient-to-br from-info/25 via-base-200 to-base-300 p-4 shadow-lg">
            <div className="pointer-events-none absolute -right-8 top-0 text-8xl opacity-20" aria-hidden>
              🌤️
            </div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-info">Through the glass</p>
            <div className="mt-2 flex items-center gap-4">
              <span className="traffic-weather-drift text-5xl drop-shadow-md">{weather.icon}</span>
              <div>
                <p className="m-0 text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.temp}°C
                </p>
                <p className="m-0 text-sm text-[var(--text2)]">{weather.city}</p>
                <p className="m-0 text-xs text-[var(--text2)]">AC vs open window — you have 40 min to decide.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/90 p-4 shadow-inner">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-[var(--text2)]">Dashboard tickers</p>
            <ul className="mt-3 space-y-3">
              {stocks.map(s => (
                <li key={s.ticker} className="flex items-center gap-3 border-b border-base-content/5 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-mono text-sm font-bold">{s.ticker}</p>
                    <p className={`m-0 text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                      {s.changePct >= 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </p>
                  </div>
                  <div className="traffic-stock-needle">
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} className="opacity-90" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-accent/30 bg-base-300/60 py-2">
            <p className="px-3 pb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-accent">AM static · news crawl</p>
            <div className="traffic-radio-crawl overflow-hidden">
              <div className="traffic-radio-track whitespace-nowrap px-3 font-mono text-xs font-semibold text-accent/95">
                <span className="inline-block px-2">{radioCrawl}</span>
                <span className="inline-block px-2" aria-hidden>
                  {radioCrawl}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {selectedEmail && (
        <div
          className="traffic-modal-pop fixed inset-0 z-50 flex items-center justify-center bg-neutral/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="relative max-h-[min(78vh,520px)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-warning/50 bg-base-200 p-6 shadow-2xl"
            onClick={ev => ev.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="traffic-email-title"
          >
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close" onClick={() => setSelectedEmail(null)}>
              ✕
            </button>
            <p className="m-0 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-warning">CarPlay peek</p>
            <h3 id="traffic-email-title" className="m-0 mt-2 text-center text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h3>
            <p className="m-0 mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <div className="mt-4 whitespace-pre-wrap border-t border-base-content/10 pt-4 text-sm leading-relaxed text-base-content/90">{selectedEmail.body}</div>
            <button type="button" className="btn btn-warning btn-block mt-6 font-bold uppercase" onClick={() => setSelectedEmail(null)}>
              OK merge back to reality
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
