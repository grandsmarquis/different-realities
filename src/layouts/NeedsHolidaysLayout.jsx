import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

function Cloud({ className, delay }) {
  return (
    <div
      className={`holiday-cloud-drift pointer-events-none absolute rounded-full bg-white/80 shadow-sm ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    />
  )
}

function Palm({ side, delay }) {
  return (
    <div
      className={`holiday-palm-sway pointer-events-none absolute bottom-0 text-6xl sm:text-7xl md:text-8xl select-none ${side === 'left' ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      🌴
    </div>
  )
}

export default function NeedsHolidaysLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [brainwavePct, setBrainwavePct] = useState(94)
  const [boardDays, setBoardDays] = useState(3)

  useEffect(() => {
    const id = setInterval(() => {
      setBrainwavePct(() => 88 + Math.floor(Math.random() * 13))
    }, 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setBoardDays(d => (d <= 3 ? 4 : 3)), 5200)
    return () => clearInterval(id)
  }, [])

  const ticker = useMemo(
    () =>
      [
        'OOO AUTO-REPLY: drafting in spirit',
        'MENTAL BAGGAGE: unlimited',
        'BOARDING: imagination only',
        'SEAT 12A = your couch with a towel',
        'NO LIQUIDS OVER 100ML OF STRESS',
        'CONNECTING FLIGHT: weekend (allegedly)',
      ].join('   ✈   '),
    [],
  )

  const unread = emails.filter(e => !e.read).length
  return (
    <div className="holiday-escape-bg relative min-h-dvh overflow-x-hidden pb-14 text-base-content" style={{ fontFamily: 'var(--font-main)' }}>
      <div className="holiday-sun-glow pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-warning/90 blur-2xl sm:h-72 sm:w-72" aria-hidden />
      <div className="holiday-sun-pulse pointer-events-none absolute -right-8 -top-12 text-8xl drop-shadow-lg sm:text-9xl" aria-hidden>
        ☀️
      </div>

      <Cloud className="left-[8%] top-[12%] h-10 w-24 opacity-90" delay={0} />
      <Cloud className="left-[40%] top-[8%] h-8 w-20 opacity-70" delay={-4} />
      <Cloud className="right-[12%] top-[18%] h-12 w-32 opacity-85" delay={-2} />
      <Cloud className="right-[35%] top-[6%] h-7 w-16 opacity-60" delay={-6} />

      <div className="holiday-plane-fly pointer-events-none absolute left-0 top-[22%] text-3xl sm:text-4xl" aria-hidden>
        ✈️
      </div>

      <span className="holiday-float-emoji pointer-events-none absolute left-[12%] top-[38%] text-3xl opacity-80" style={{ animationDelay: '0s' }} aria-hidden>
        🍹
      </span>
      <span className="holiday-float-emoji pointer-events-none absolute right-[14%] top-[42%] text-2xl opacity-75" style={{ animationDelay: '1.2s' }} aria-hidden>
        🦩
      </span>
      <span className="holiday-float-emoji pointer-events-none absolute left-[20%] bottom-[32%] text-2xl opacity-70" style={{ animationDelay: '0.6s' }} aria-hidden>
        🧳
      </span>
      <span className="holiday-float-emoji pointer-events-none absolute right-[22%] bottom-[28%] text-3xl opacity-65" style={{ animationDelay: '1.8s' }} aria-hidden>
        🏝️
      </span>

      <Palm side="left" delay={0} />
      <Palm side="right" delay={0.5} />

      <div className="holiday-wave-strip pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-info/25 to-transparent" aria-hidden />

      <header className="relative z-10 border-b-4 border-dashed border-accent/40 bg-base-100/75 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-3 py-4 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="holiday-flip-board flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-xl border-4 border-base-content/20 bg-neutral text-neutral-content shadow-inner">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-content/70">PTO</span>
              <span className="font-mono text-4xl font-black tabular-nums leading-none tracking-tighter">{boardDays}</span>
              <span className="text-[8px] font-bold uppercase text-warning">days-ish</span>
            </div>
            <div className="min-w-0">
              <p className="holiday-stamp-wiggle m-0 inline-block rotate-[-2deg] rounded-lg border-2 border-dashed border-accent bg-accent/15 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-accent">
                Brain: checked out ✓
              </p>
              <h1 className="m-0 mt-2 text-3xl leading-tight text-info sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
                Terminal Daydream Intl.
              </h1>
              <p className="m-0 mt-1 max-w-xl text-sm text-base-content/70">
                {`Same inbox, weather, news & stocks — routed through the only airport that matters: the one in your head.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end lg:justify-center">
            <div className="rounded-2xl border-2 border-secondary/40 bg-secondary/10 px-4 py-3 text-center lg:text-right">
              <p className="m-0 text-[9px] font-extrabold uppercase tracking-[0.2em] text-secondary">Beach brain bandwidth</p>
              <p className="m-0 text-3xl font-black text-secondary" style={{ fontFamily: 'var(--font-display)' }}>
                {brainwavePct}%
              </p>
              <p className="m-0 text-[10px] text-base-content/55">allocated to &ldquo;I can smell sunscreen&rdquo;</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-accent badge-lg gap-1 font-bold">
                <span aria-hidden>📬</span> {unread} bags still unclaimed
              </span>
              <button type="button" className="btn btn-info btn-sm font-bold shadow-md" onClick={onSwitchPersona}>
                Wrong gate — take me home
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t-2 border-dotted border-info/30 bg-info/10 py-2">
          <div className="holiday-ticker-inner whitespace-nowrap text-xs font-extrabold uppercase tracking-wider text-info">
            <span className="inline-block px-8">{ticker}</span>
            <span className="inline-block px-8" aria-hidden>
              {ticker}
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-5 px-3 py-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="m-0 text-sm font-extrabold uppercase tracking-[0.25em] text-info">Baggage claim (inbox)</h2>
            <span className="badge badge-outline border-warning text-warning">Handle with SPF 50</span>
          </div>

          <ul className="mt-4 space-y-3">
            {emails.map((e, i) => (
              <li key={e.id} className="holiday-email-row-pop" style={{ animationDelay: `${i * 0.06}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className={`group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border-2 p-3 pl-4 text-left shadow-md transition-all hover:z-[1] hover:scale-[1.02] hover:-rotate-1 hover:border-accent hover:shadow-xl ${
                    e.read ? 'border-base-content/10 bg-base-100/80' : 'border-warning/60 bg-base-100 ring-2 ring-warning/25'
                  }`}
                >
                  <span className="holiday-tag-hole pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-base-content/25 bg-base-200 shadow-inner" aria-hidden />
                  <span className="text-3xl transition-transform group-hover:scale-110 group-hover:rotate-6">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1 pl-2">
                    <p className={`m-0 text-sm ${e.read ? 'text-base-content/70' : 'font-extrabold text-base-content'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-base-content/50">
                      {e.from.name} · {e.date}
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs text-base-content/55">{e.preview}</p>
                  </div>
                  {!e.read && (
                    <span className="badge badge-warning badge-sm shrink-0 font-bold uppercase">priority lounge</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {selectedEmail && (
            <div
              className="holiday-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-neutral/60 p-4 backdrop-blur-sm"
              onClick={() => setSelectedEmail(null)}
              role="presentation"
            >
              <div
                className="holiday-boarding-pass relative max-h-[min(85vh,560px)] w-full max-w-md overflow-y-auto rounded-2xl border-4 border-dashed border-accent bg-gradient-to-br from-base-100 via-warning/5 to-info/10 p-6 shadow-2xl"
                onClick={ev => ev.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="holiday-email-title"
              >
                <div
                  className="holiday-barcode pointer-events-none absolute right-4 top-4 h-12 w-16 opacity-40"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 5px)',
                  }}
                  aria-hidden
                />
                <div className="holiday-stamp-pop absolute -left-1 top-6 rotate-[-12deg] rounded border-4 border-error/70 bg-error/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-error">
                  scanned ✓
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-[1]"
                  aria-label="Close"
                  onClick={() => setSelectedEmail(null)}
                >
                  ✕
                </button>
                <p className="m-0 text-center text-[10px] font-extrabold uppercase tracking-[0.35em] text-accent">Boarding pass / email</p>
                <h3 id="holiday-email-title" className="m-0 mt-2 text-center text-2xl text-info" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h3>
                <p className="m-0 mt-1 text-center text-sm font-semibold text-base-content/60">{selectedEmail.from.name}</p>
                <div className="my-4 border-t-2 border-dotted border-base-content/20" />
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-base-content/90">{selectedEmail.body}</div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full bg-info/15 px-4 py-2 text-xs font-bold text-info">Gate: imagination</span>
                  <span className="rounded-full bg-secondary/15 px-4 py-2 text-xs font-bold text-secondary">Seat: hammock</span>
                </div>
                <button type="button" className="btn btn-accent btn-block mt-6 font-extrabold" onClick={() => setSelectedEmail(null)}>
                  Stow under seat (close)
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="holiday-weather-card relative rotate-[0.4deg] overflow-hidden rounded-2xl border-2 border-info/40 bg-gradient-to-br from-info/20 to-base-100 p-4 shadow-lg">
            <div className="holiday-shimmer-sand pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            <p className="relative m-0 text-[10px] font-extrabold uppercase tracking-widest text-info">Deck weather (real life)</p>
            <div className="relative mt-3 flex items-center gap-4">
              <span className="holiday-weather-bob text-7xl drop-shadow-md">{weather.icon}</span>
              <div>
                <p className="m-0 text-4xl font-black leading-none text-base-content">{weather.temp}°C</p>
                <p className="m-0 text-sm font-bold">{weather.city}</p>
                <p className="m-0 text-xs text-base-content/60">{weather.condition} · feels {weather.feels_like}°</p>
              </div>
            </div>
            <div className="relative mt-4 flex flex-wrap gap-2 border-t border-base-content/10 pt-3">
              {weather.forecast.slice(0, 5).map(d => (
                <div key={d.day} className="flex min-w-[3.25rem] flex-col items-center rounded-xl bg-base-100/80 px-2 py-2 text-center shadow-sm">
                  <span className="text-[9px] font-bold uppercase text-base-content/45">{d.day}</span>
                  <span className="text-xl">{d.icon}</span>
                  <span className="text-[10px] font-bold tabular-nums">
                    {d.high}° / {d.low}°
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative -rotate-[0.25deg] rounded-2xl border-2 border-secondary/35 bg-base-100/90 p-4 shadow-md">
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-widest text-secondary">Inflight headlines</p>
            <ul className="mt-3 space-y-3">
              {news.map(n => (
                <li key={n.id} className="holiday-news-nudge flex gap-2 text-sm leading-snug">
                  <span className="shrink-0 text-lg">{n.emoji}</span>
                  <span className="text-base-content/85">{n.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-accent/40 bg-accent/5 p-4">
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-widest text-accent">Trip fund telemetry</p>
            <ul className="mt-3 space-y-3">
              {stocks.map(s => (
                <li key={s.ticker} className="holiday-stock-bob flex items-center gap-3 border-b border-base-content/10 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-mono text-sm font-extrabold">{s.ticker}</p>
                    <p className={`m-0 text-xs font-bold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                      {s.changePct > 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </p>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#14b8a6' : '#f97316'} className="opacity-90" />
                </li>
              ))}
            </ul>
            <p className="m-0 mt-3 text-center text-xs italic text-base-content/50">Past performance does not guarantee mai tais.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
