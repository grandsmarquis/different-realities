import { useEffect, useId, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke, className = '' }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 100
  const h = 28
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className={`shrink-0 opacity-90 ${className}`}>
      <polyline fill="none" stroke={stroke} strokeWidth="1.25" points={pts} />
    </svg>
  )
}

function RetinaMascot() {
  return (
    <svg
      className="gs-mascot h-24 w-auto shrink-0 md:h-28"
      viewBox="0 0 140 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="70" cy="48" rx="62" ry="36" className="fill-[#3f3f46]" />
      <ellipse cx="70" cy="48" rx="58" ry="32" className="fill-[#52525b]/50" />
      {/* Rods — little lines cheering for grey */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line
          key={i}
          x1={24 + i * 8}
          y1="72"
          x2={26 + i * 8}
          y2="78"
          className="stroke-zinc-400 gs-rod-wave"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      <g className="gs-eye-left">
        <ellipse cx="46" cy="44" rx="16" ry="20" className="fill-zinc-300" />
        <ellipse cx="48" cy="46" rx="7" ry="9" className="fill-zinc-900" />
        <circle cx="51" cy="43" r="2" className="fill-zinc-100" />
      </g>
      <g className="gs-eye-right">
        <ellipse cx="94" cy="44" rx="16" ry="20" className="fill-zinc-300" />
        <ellipse cx="96" cy="46" rx="7" ry="9" className="fill-zinc-900" />
        <circle cx="99" cy="43" r="2" className="fill-zinc-100" />
      </g>
      <path
        d="M 52 62 Q 70 72 88 62"
        className="stroke-zinc-400"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export default function GreyscaleBrowserLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const dialogTitleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!selectedEmail) return
    const t = window.setTimeout(() => closeRef.current?.focus(), 40)
    function onKey(e) {
      if (e.key === 'Escape') setSelectedEmail(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedEmail, setSelectedEmail])

  return (
    <div
      className="gs-page-root relative min-h-full overflow-hidden grayscale"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="gs-page-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="gs-halftone pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" aria-hidden />
      <div className="gs-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="gs-scanline pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="gs-scanline-bar absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-white/6 to-transparent" />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-3 pb-10 pt-4 sm:px-5">
        {/* Browser chrome */}
        <div className="card border border-base-content/15 bg-base-300/80 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-base-content/10 bg-base-200/90 px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="inline-block size-2.5 rounded-full bg-zinc-500" />
              <span className="inline-block size-2.5 rounded-full bg-zinc-400" />
              <span className="inline-block size-2.5 rounded-full bg-zinc-600" />
            </span>
            <div
              className="min-w-0 flex-1 rounded-lg border border-base-content/10 bg-base-100/50 px-3 py-1.5 text-[11px] text-base-content/70"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="opacity-50">https://</span>
              achroma.net<span className="opacity-50">/you/only-luminance</span>
            </div>
            <span className="badge badge-sm border-0 bg-zinc-600 text-zinc-100 gs-badge-float motion-reduce:animate-none">
              saturation: 0%
            </span>
          </div>

          <div className="card-body gap-6 p-4 sm:p-6">
            <header className="flex flex-col gap-4 border-b border-base-content/10 pb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <RetinaMascot />
                <div className="min-w-0">
                  <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.35em] text-base-content/50">
                    AchromaNet · rod-forward browsing
                  </p>
                  <h1 className="m-0 text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
                    Your cones are on strike
                  </h1>
                  <p className="m-0 mt-1 max-w-xl text-sm leading-relaxed text-base-content/65">
                    Every hue politely declined. Inbox, sky, tickers, and headlines — rerouted through 256 dignified shades of maybe.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                <div className="rounded-box border border-base-content/15 bg-base-200/80 px-3 py-2 text-right">
                  <p className="m-0 text-[9px] uppercase tracking-widest text-base-content/45">Cone budget</p>
                  <div className="mt-1 h-2 w-36 overflow-hidden rounded-full bg-base-300">
                    <div className="gs-cone-bar h-full w-[3%] rounded-full bg-zinc-400" />
                  </div>
                  <p className="m-0 mt-1 text-xs text-base-content/55">3% reserved for dreams of teal</p>
                </div>
                <button type="button" className="btn btn-sm btn-outline border-base-content/25" onClick={onSwitchPersona}>
                  Re-enable the rainbow
                </button>
              </div>
            </header>

            <div className="grid gap-5 lg:grid-cols-12">
              <section className="lg:col-span-7">
                <div className="card border border-base-content/10 bg-base-200/40 gs-card-rise">
                  <div className="card-body gap-3 p-4 sm:p-5">
                    <h2 className="card-title m-0 text-lg text-base-content">
                      Inbox <span className="text-sm font-normal opacity-50">(luminance queue)</span>
                    </h2>
                    <ul className="space-y-2">
                      {emails.map((e, i) => (
                        <li
                          key={e.id}
                          className="gs-stagger rounded-xl border border-base-content/10 bg-base-100/30 transition hover:border-base-content/25 hover:bg-base-100/50"
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          <button
                            type="button"
                            className="w-full rounded-xl px-3 py-3 text-left"
                            onClick={() => setSelectedEmail(e)}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-lg grayscale" aria-hidden>{e.from.avatar}</span>
                              <div className="min-w-0 flex-1">
                                <p className="m-0 text-[10px] uppercase tracking-wider text-base-content/45">
                                  {e.from.name}
                                </p>
                                <p className={`m-0 mt-0.5 text-sm leading-snug ${e.read ? 'font-medium' : 'font-bold'}`}>
                                  {e.subject}
                                </p>
                                <p className="m-0 mt-1 line-clamp-2 text-xs text-base-content/55">{e.preview}</p>
                                <p className="m-0 mt-1.5 text-[10px] opacity-45" style={{ fontFamily: 'var(--font-mono)' }}>
                                  {e.date} · {e.time}
                                </p>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <aside className="space-y-4 lg:col-span-5">
                <div className="card border border-base-content/10 bg-base-200/40 gs-card-rise gs-stagger" style={{ animationDelay: '0.1s' }}>
                  <div className="card-body gap-2 p-4">
                    <h2 className="card-title m-0 text-base">Sky report</h2>
                    <p className="m-0 text-xs uppercase tracking-widest text-base-content/45">{weather.city}</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl grayscale" aria-hidden>{weather.icon}</span>
                      <div>
                        <p className="m-0 text-3xl font-bold tabular-nums">{weather.temp}°C</p>
                        <p className="m-0 text-sm text-base-content/60">feels {weather.feels_like}°C · {weather.condition}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {weather.forecast.slice(0, 4).map(d => (
                        <span
                          key={d.day}
                          className="badge badge-lg gap-1 border border-base-content/15 bg-base-300/80 font-mono text-xs font-normal"
                        >
                          <span className="grayscale">{d.icon}</span> {d.day} {d.high}°
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card border border-base-content/10 bg-base-200/40 gs-card-rise gs-stagger" style={{ animationDelay: '0.18s' }}>
                  <div className="card-body gap-3 p-4">
                    <h2 className="card-title m-0 text-base">Tickers (value, but moody)</h2>
                    {stocks.map(s => (
                      <div
                        key={s.ticker}
                        className="flex items-center justify-between gap-2 border-b border-base-content/10 py-2 last:border-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="m-0 font-mono text-sm font-bold">{s.ticker}</p>
                          <p className="m-0 truncate text-xs text-base-content/50">{s.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="m-0 font-mono text-sm font-semibold tabular-nums">
                            {s.changePct > 0 ? '+' : ''}
                            {s.changePct}%
                          </p>
                          <MiniSpark series={s.series} stroke="currentColor" className="text-base-content/60" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card border border-base-content/10 bg-base-200/40 gs-card-rise gs-stagger" style={{ animationDelay: '0.26s' }}>
                  <div className="card-body gap-2 p-4">
                    <h2 className="card-title m-0 text-base">Wire (emoji → luminance)</h2>
                    <ul className="space-y-2">
                      {news.map(n => (
                        <li
                          key={n.id}
                          className="border-l-2 border-zinc-500 pl-3 text-sm leading-snug text-base-content/85"
                        >
                          <span className="mr-1 grayscale opacity-80" aria-hidden>{n.emoji}</span>
                          {n.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="card max-h-[85vh] w-full max-w-lg overflow-y-auto border border-base-content/20 bg-base-200 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="card-body">
              <p id={dialogTitleId} className="m-0 text-[10px] uppercase tracking-[0.3em] text-base-content/45">
                Message · greyscale certified
              </p>
              <h3 className="card-title mt-1 text-xl">{selectedEmail.subject}</h3>
              <p className="m-0 text-xs opacity-70">
                From {selectedEmail.from.name} · {selectedEmail.date}
              </p>
              <div className="divider my-2" />
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-base-content/90">{selectedEmail.body}</div>
              <div className="card-actions mt-4 justify-end">
                <button ref={closeRef} type="button" className="btn btn-primary" onClick={() => setSelectedEmail(null)}>
                  Close tab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
