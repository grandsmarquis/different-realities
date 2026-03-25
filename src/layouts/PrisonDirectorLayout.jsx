import { useContext, useMemo } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function BarbedWireSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 1200 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <pattern id="prison-barb-pattern" x="0" y="0" width="80" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M0 24 Q20 8 40 24 T80 24"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-warning/80"
          />
          <path
            d="M10 24 L18 10 M30 24 L38 10 M50 24 L58 10 M70 24 L78 10"
            stroke="currentColor"
            strokeWidth="2"
            className="text-warning/60"
          />
          <path
            d="M18 10 L22 4 M38 10 L42 4 M58 10 L62 4 M78 10 L82 4"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-warning/40"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#prison-barb-pattern)" className="prison-barbed-drift opacity-90" />
    </svg>
  )
}

export default function PrisonDirectorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  const rollCall = useMemo(
    () => [...news, ...news].map((n, i) => ({ ...n, key: `${n.id}-${i}` })),
    [],
  )

  const commissaryLine = useMemo(
    () =>
      stocks
        .map((s) => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct)}%`)
        .join('   ·   '),
    [],
  )

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-neutral-content"
      style={{
        background: 'linear-gradient(165deg, var(--bg) 0%, #0c0a09 40%, var(--bg2) 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.04) 2px,
              rgba(255,255,255,0.04) 3px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 3px
            )`,
          }}
        />
      </div>

      <div
        className="prison-search-sweep pointer-events-none absolute -right-24 -top-24 size-[min(55vw,420px)] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(250,204,21,0.35) 28deg, transparent 56deg)',
        }}
        aria-hidden
      />

      <div className="relative z-10 border-b-4 border-warning/40 bg-neutral-900/80 shadow-lg backdrop-blur-sm">
        <BarbedWireSvg className="h-10 w-full text-warning" />
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <div
              className="prison-tower-bob flex size-14 shrink-0 items-center justify-center rounded-lg border-2 border-warning bg-neutral-800 shadow-inner"
              aria-hidden
            >
              <span className="text-3xl">🗼</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="prison-siren-pulse badge badge-error badge-sm font-mono uppercase tracking-widest">
                  Live yard
                </span>
                <span className="badge badge-outline badge-warning badge-sm font-mono uppercase">Fac-7</span>
              </div>
              <h1
                className="mt-1 text-3xl tracking-[0.08em] text-warning md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Warden Command Deck
              </h1>
              <p className="mt-0.5 max-w-xl text-xs text-neutral-400 md:text-sm">
                Same inbox, weather, wire &amp; tickers — now with paperwork, perimeter lights, and suspiciously cheerful
                compliance.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden rounded-box border border-neutral-600 bg-neutral-800/90 px-3 py-2 text-center sm:block">
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">Population (fake)</p>
              <p className="font-mono text-lg tabular-nums" style={{ color: 'var(--accent)' }}>
                1,337
              </p>
            </div>
            <button type="button" onClick={onSwitchPersona} className="btn btn-warning btn-sm font-mono uppercase">
              Parole (exit)
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-4 px-3 py-6 md:grid-cols-12 md:gap-5 md:px-6">
        <section className="md:col-span-7">
          <div className="card border-2 border-neutral-600 bg-neutral-800/60 shadow-xl backdrop-blur-sm">
            <div className="card-body gap-4 p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-600 pb-3">
                <h2 className="card-title m-0 text-lg text-warning md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Secured message viewer
                </h2>
                <div className="join join-horizontal font-mono text-[10px] uppercase">
                  <span className="join-item btn btn-xs btn-disabled border-neutral-600 bg-neutral-900 no-animation">
                    Cam-04
                  </span>
                  <span className="join-item btn btn-xs btn-neutral no-animation">Rec</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-box border border-dashed border-warning/30 bg-neutral-900/80 p-1">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(234,88,12,0.15) 3px, rgba(234,88,12,0.15) 4px)',
                  }}
                  aria-hidden
                />
                <div className="prison-static-flicker relative min-h-[min(52vh,440px)] rounded-box border border-neutral-700 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-4 md:p-6">
                  {selectedEmail ? (
                    <>
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="badge badge-success badge-outline font-mono text-[10px]">Cleared for reading</span>
                        <span className="badge badge-ghost font-mono text-[10px]">Docket #{String(selectedEmail.id).padStart(3, '0')}</span>
                        <span className="ml-auto font-mono text-[10px] text-neutral-500">{selectedEmail.date}</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-neutral-500">Subject line (alleged)</p>
                      <h3
                        className="mt-1 text-xl leading-tight text-warning md:text-2xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {selectedEmail.subject}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-400">
                        <span className="text-neutral-500">From:</span> {selectedEmail.from.name}{' '}
                        <span className="opacity-50">({selectedEmail.from.email})</span>
                      </p>
                      <div className="mt-4 max-h-[min(36vh,300px)] overflow-y-auto whitespace-pre-wrap border-l-2 border-warning/40 pl-4 text-sm leading-relaxed text-neutral-300">
                        {selectedEmail.body}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <button type="button" className="btn btn-sm btn-success font-mono uppercase">
                          Stamp approved
                        </button>
                        <button type="button" className="btn btn-sm btn-outline btn-warning font-mono uppercase">
                          Send to shakedown
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 text-center">
                      <div className="relative">
                        <span className="text-6xl md:text-7xl" aria-hidden>
                          📧
                        </span>
                        <span className="prison-siren-pulse absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-error text-[8px] font-bold text-error-content">
                          !
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-sm uppercase tracking-widest text-warning">No kite selected</p>
                        <p className="mt-2 max-w-sm text-xs text-neutral-500">
                          Pick correspondence from the intake rack. Everything is logged. Especially the LinkedIn ones.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-4 md:col-span-5">
          <div className="card border border-neutral-600 bg-neutral-800/50">
            <div className="card-body gap-2 p-4">
              <h2 className="card-title m-0 justify-start text-base text-warning" style={{ fontFamily: 'var(--font-display)' }}>
                Intake rack
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">Unsorted · allegedly legitimate</p>
              <ul className="menu menu-sm max-h-[min(42vh,380px)] flex-nowrap overflow-y-auto rounded-box bg-neutral-900/60 p-0">
                {emails.map((e) => (
                  <li key={e.id} className="w-full">
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full items-start gap-2 rounded-none border-l-4 py-3 ${
                        selectedEmail?.id === e.id ? 'border-warning bg-warning/10' : 'border-transparent hover:bg-neutral-800'
                      }`}
                    >
                      <span className="text-lg" aria-hidden>
                        {e.from.avatar}
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-xs font-bold text-neutral-200">{e.subject}</span>
                        <span className="block truncate text-[10px] text-neutral-500">{e.from.name}</span>
                      </span>
                      {!e.read && <span className="badge badge-error badge-xs shrink-0">new</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="stats stats-vertical shadow-sm sm:stats-horizontal">
            <div className="stat border border-neutral-600 bg-neutral-800/70 py-3">
              <div className="stat-title font-mono text-[10px] uppercase text-neutral-500">Yard conditions</div>
              <div className="stat-value text-2xl text-warning">
                {weather.icon} {weather.temp}°
              </div>
              <div className="stat-desc text-neutral-400">{weather.condition}</div>
              <div className="stat-desc font-mono text-[10px] text-neutral-500">
                {weather.city} · humidity {weather.humidity}% · wind {weather.wind} km/h
              </div>
            </div>
            <div className="stat border border-neutral-600 border-t-0 bg-neutral-900/60 py-3 sm:border-l-0 sm:border-t sm:border-neutral-600">
              <div className="stat-title font-mono text-[10px] uppercase text-neutral-500">Rec outlook</div>
              <div className="stat-figure text-secondary">🌤️</div>
              <div className="stat-desc text-left text-xs text-neutral-400">
                {weather.forecast.slice(0, 3).map((d) => (
                  <span key={d.day} className="mr-2 inline-block whitespace-nowrap">
                    {d.day} {d.icon} {d.high}°
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="md:col-span-12">
          <div className="overflow-hidden rounded-box border-2 border-neutral-600 bg-neutral-900/90">
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-600 bg-neutral-800 px-3 py-2">
              <span className="badge badge-warning badge-sm font-mono uppercase">Intel wire</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500">Smuggled headlines · do not fold into origami shanks</span>
            </div>
            <div className="relative py-2 font-mono text-sm">
              <div
                className="prison-roll-call-marquee-inner flex w-max gap-16 whitespace-nowrap px-4 text-neutral-300"
                aria-live="polite"
              >
                {rollCall.map((n) => (
                  <span key={n.key} className="inline-flex items-center gap-2">
                    <span>{n.emoji}</span>
                    <span className="text-warning/90">{n.title}</span>
                    <span className="text-neutral-600">· {n.source}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="md:col-span-12">
          <div className="card border-2 border-warning/40 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
            <div className="card-body flex-row flex-wrap items-center gap-4 p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  🍫
                </span>
                <div>
                  <h2 className="m-0 text-lg text-warning" style={{ fontFamily: 'var(--font-display)' }}>
                    Commissary &amp; market surveillance
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500">Ramen-indexed · not financial advice</p>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-wrap gap-3 md:justify-end">
                {stocks.map((s) => (
                  <div
                    key={s.ticker}
                    className="rounded-box border border-neutral-600 bg-neutral-950/80 px-3 py-2 font-mono text-xs shadow-inner"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-warning">{s.ticker}</span>
                      <span className="tabular-nums text-neutral-300">
                        {s.currency}
                        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className={s.changePct >= 0 ? 'text-success' : 'text-error'}>
                      {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-neutral-700 px-4 py-2">
              <p className="m-0 truncate font-mono text-[10px] text-neutral-500" title={commissaryLine}>
                Ticker crawl: {commissaryLine}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
