import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function GlobeGraphic() {
  return (
    <svg className="interpol-globe size-full opacity-90" viewBox="0 0 200 200" aria-hidden>
      <defs>
        <linearGradient id="iglobe" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="88" fill="url(#iglobe)" stroke="#dc2626" strokeWidth="2" className="interpol-globe-ring" />
      <ellipse cx="100" cy="100" rx="88" ry="32" fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="88" ry="56" fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="100" cy="100" rx="32" ry="88" fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.45" />
      <ellipse cx="100" cy="100" rx="56" ry="88" fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.3" />
      <line x1="12" y1="100" x2="188" y2="100" stroke="#dc2626" strokeWidth="0.8" opacity="0.4" />
      <circle cx="100" cy="100" r="4" fill="#fbbf24" className="interpol-globe-core" />
    </svg>
  )
}

export default function InterpolWantedLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [utcClock, setUtcClock] = useState(() => new Date().toISOString().slice(11, 19))

  useEffect(() => {
    const tick = () => setUtcClock(new Date().toISOString().slice(11, 19))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const marqueeText = useMemo(
    () =>
      'ALL STATIONS · SUBJECT VIEWING SAME DATA AS EVERYONE ELSE · NOT A REAL WARRANT · PARODY TERMINAL · DO NOT PANIC · FICTIONAL CASEFILE · ',
    [],
  )

  return (
    <div
      className="interpol-root relative min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="interpol-police-bar pointer-events-none absolute inset-x-0 top-0 z-[5] h-1" aria-hidden />
      <div className="interpol-police-bar interpol-police-bar-delay pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div className="interpol-vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="interpol-scanlines pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

      <div className="interpol-marquee-wrap relative z-10 border-b overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="interpol-marquee-track flex py-1.5 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent3)' }}>
          <span className="whitespace-nowrap px-6">{marqueeText}</span>
          <span className="whitespace-nowrap px-6" aria-hidden>
            {marqueeText}
          </span>
        </div>
      </div>

      <header className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b px-4 py-5 md:px-8" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg2) 92%, transparent)' }}>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4">
          <div className="interpol-badge-pulse badge badge-lg border-2 font-mono uppercase" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}>
            Red notice · parody
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] opacity-50">Notional casefile 192-Ω</p>
            <h1 className="text-4xl leading-none tracking-tight md:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              Subject is online
            </h1>
            <p className="mt-1 max-w-xl text-xs opacity-70">
              Same inbox, weather, wires, and tickers — framed like a global manhunt. Pure fiction. Close tab to &ldquo;escape.&rdquo;
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="interpol-clock rounded border-2 px-3 py-2 font-mono text-sm tabular-nums" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
            UTC {utcClock}
          </div>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-sm border uppercase"
            style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
          >
            Enter witness protection
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,320px)_1fr_minmax(0,300px)] lg:px-6">
        <aside className="flex flex-col gap-4">
          <div className="card border-2 shadow-xl" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="card-body gap-3 p-4">
              <h2 className="card-title text-sm uppercase tracking-widest opacity-80" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                Intercept queue
              </h2>
              <p className="text-[10px] uppercase opacity-50">SIGINT · your actual emails · renamed for drama</p>
              <ul className="max-h-[min(52vh,480px)] space-y-2 overflow-y-auto pr-1">
                {emails.map((e) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className="interpol-mail-tap flex w-full items-start gap-2 rounded border px-2 py-2.5 text-left transition-all"
                      style={{
                        borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--border)',
                        background:
                          selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                      }}
                    >
                      <span className="text-lg leading-none">{e.from.avatar}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold uppercase leading-snug">{e.subject}</span>
                        <span className="block truncate text-[10px] opacity-45">{e.from.name}</span>
                      </span>
                      <span className="badge badge-xs badge-ghost shrink-0 font-mono">RAW</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="relative flex min-h-[min(72vh,620px)] flex-col items-center justify-center">
          <div className="interpol-radar absolute left-1/2 top-1/2 size-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-30" style={{ borderColor: 'var(--accent2)' }} aria-hidden />
          <div className="interpol-radar interpol-radar-slow absolute left-1/2 top-1/2 size-[min(70vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-25" style={{ borderColor: 'var(--accent)' }} aria-hidden />

          <div className="interpol-wanted-card relative z-[1] w-full max-w-lg">
            <div className="interpol-scan-sweep absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
              <div className="interpol-scan-beam" />
            </div>

            <div
              className="relative overflow-hidden rounded-2xl border-4 p-6 shadow-2xl md:p-8"
              style={{
                borderColor: '#b91c1c',
                background: 'linear-gradient(165deg, #1e293b 0%, #0f172a 45%, #020617 100%)',
                boxShadow: '0 0 0 1px rgba(220,38,38,0.3), 0 25px 80px rgba(0,0,0,0.65)',
              }}
            >
              <div className="absolute right-4 top-4 rotate-12 opacity-90" aria-hidden>
                <span className="interpol-stamp inline-block border-4 border-dashed px-2 py-1 text-[10px] font-black uppercase tracking-widest" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                  Classified
                </span>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="interpol-mugshot relative mx-auto flex aspect-[4/5] w-36 shrink-0 flex-col items-center justify-center rounded-lg border-2 border-dashed md:mx-0 md:w-40" style={{ borderColor: 'var(--border)', background: '#020617' }}>
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="size-28 md:size-32">
                      <GlobeGraphic />
                    </div>
                  </div>
                  <div className="relative z-[1] mt-auto w-full space-y-1 border-t p-2" style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.5)' }}>
                    <div className="h-1 w-full rounded bg-slate-600/80" />
                    <div className="h-1 w-3/4 rounded bg-slate-600/80" />
                    <p className="text-center text-[8px] uppercase tracking-widest opacity-50">Identity withheld</p>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  {selectedEmail ? (
                    <>
                      <div className="mb-3 flex flex-wrap items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                        <span className="badge badge-error badge-sm uppercase">Hot read</span>
                        <span className="font-mono text-[10px] opacity-50">{selectedEmail.date}</span>
                      </div>
                      <h2 className="text-xl font-bold uppercase leading-snug md:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)', letterSpacing: '0.02em' }}>
                        {selectedEmail.subject}
                      </h2>
                      <p className="mt-1 text-xs opacity-60">From · {selectedEmail.from.name}</p>
                      <div className="interpol-redact relative mt-4 max-h-[min(36vh,280px)] overflow-y-auto whitespace-pre-wrap rounded border p-3 text-sm leading-relaxed opacity-90" style={{ borderColor: 'var(--border)', background: 'rgba(15,23,42,0.6)' }}>
                        {selectedEmail.body}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="btn btn-xs btn-error btn-outline uppercase">Flag for extradition (jk)</span>
                        <span className="btn btn-xs btn-ghost uppercase">Shred pixels</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center md:py-12">
                      <span className="text-5xl motion-safe:animate-bounce">📡</span>
                      <p className="text-sm uppercase tracking-widest opacity-60">Awaiting target selection</p>
                      <p className="max-w-xs text-xs opacity-45">Pick an intercept on the left. The syndicate won&apos;t read itself.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-[1] mt-6 max-w-md text-center text-[10px] uppercase tracking-widest opacity-40">
            Coordinates approximate · humor only · no law enforcement affiliation
          </p>
        </main>

        <aside className="flex flex-col gap-4">
          <div className="card border-2" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="card-body gap-2 p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent2)' }}>
                Extraction window
              </h2>
              <p className="text-2xl font-bold">
                {weather.icon} {weather.temp}°C
              </p>
              <p className="text-sm opacity-80">{weather.condition}</p>
              <p className="text-[10px] uppercase opacity-45">
                {weather.city} · cover: {weather.humidity}% humidity · wind {weather.wind} km/h
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {weather.forecast.slice(0, 4).map((d) => (
                  <span key={d.day} className="badge badge-sm badge-outline font-mono text-[10px]">
                    {d.day} {d.high}°
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-2" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="card-body gap-2 p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent3)' }}>
                Cross-border tickers
              </h2>
              <p className="text-[10px] uppercase opacity-45">Markets you could hypothetically flee toward</p>
              <ul className="space-y-2 font-mono text-xs">
                {stocks.map((s) => (
                  <li key={s.ticker} className="interpol-ticker-row flex items-center justify-between gap-2 border-b pb-2 last:border-0" style={{ borderColor: 'var(--border)' }}>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : 'var(--accent)' }}>{s.ticker}</span>
                    <span>
                      {s.currency}
                      {s.price.toFixed(2)}
                    </span>
                    <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card border-2" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="card-body max-h-[min(40vh,320px)] gap-2 overflow-y-auto p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>
                Wire summaries
              </h2>
              {news.map((n) => (
                <div key={n.id} className="interpol-news-blip border-l-2 py-2 pl-3 text-xs" style={{ borderColor: 'var(--accent2)' }}>
                  <p className="font-bold leading-snug">
                    {n.emoji} {n.title}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase opacity-45">
                    {n.source} · {n.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
