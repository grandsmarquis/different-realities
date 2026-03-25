import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const STREAK_DAYS = 14

function RainLayer({ count, className, seedOffset = 0 }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const n = i + seedOffset * 1000
        return {
          id: `${seedOffset}-${i}`,
          left: ((n * 13.17) % 997) / 10,
          delay: ((n * 0.11) % 2.8) + (seedOffset * 0.15),
          duration: 0.65 + (n % 7) * 0.09,
          opacity: 0.15 + (n % 5) * 0.12,
          w: n % 4 === 0 ? 2 : 1,
        }
      }),
    [count, seedOffset],
  )
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`} aria-hidden>
      {drops.map(d => (
        <span
          key={d.id}
          className="rain-drop absolute top-0 rounded-full bg-sky-200"
          style={{
            left: `${d.left}%`,
            width: d.w,
            height: `${12 + (d.id.length % 5) * 4}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function PuddleFloor() {
  return (
    <div className="rain-puddle-shimmer pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-32" aria-hidden>
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.12) 40%, rgba(14, 165, 233, 0.28) 100%)',
        }}
      />
      <div className="rain-ripple-wave absolute bottom-4 left-[8%] h-8 w-[28%] rounded-[100%] border border-sky-400/25 bg-sky-500/5" />
      <div className="rain-ripple-wave absolute bottom-6 right-[12%] h-6 w-[22%] rounded-[100%] border border-cyan-400/20 bg-cyan-500/5 [animation-delay:0.8s]" />
      <div className="rain-ripple-wave absolute bottom-3 left-[42%] h-5 w-[18%] rounded-[100%] border border-sky-300/20 bg-sky-400/5 [animation-delay:1.4s]" />
    </div>
  )
}

export default function TwoWeeksRainLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [moodPct, setMoodPct] = useState(4)
  const [socksWet, setSocksWet] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setMoodPct(() => 2 + Math.floor(Math.random() * 5))
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSocksWet(s => !s), 6000)
    return () => clearInterval(id)
  }, [])

  const ticker = useMemo(
    () =>
      [
        'UMBRELLA INVENTORY: theoretical',
        'SUN: rumored to exist',
        'WORM STATUS: thriving',
        'MOSS: now a roommate',
        'FORECAST: yes',
        'DRY LAUNDRY: urban legend',
      ].join('     💧     '),
    [],
  )

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="rain-two-weeks-bg relative min-h-dvh overflow-x-hidden pb-14 text-base-content"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="rain-lightning-overlay pointer-events-none fixed inset-0 z-[2]" aria-hidden />

      <RainLayer count={38} className="opacity-70 [filter:blur(0.5px)]" seedOffset={1} />
      <RainLayer count={52} className="" seedOffset={2} />

      <PuddleFloor />

      <span
        className="rain-duck-drift pointer-events-none absolute bottom-24 left-[6%] z-[3] text-4xl drop-shadow-lg sm:text-5xl"
        aria-hidden
      >
        🦆
      </span>
      <span
        className="rain-duck-drift-delay pointer-events-none absolute bottom-20 right-[10%] z-[3] text-3xl drop-shadow-md sm:text-4xl"
        aria-hidden
      >
        🐸
      </span>
      <span className="rain-worm-wiggle pointer-events-none absolute bottom-28 left-[48%] z-[3] text-2xl opacity-90" aria-hidden>
        🪱
      </span>

      <div
        className="pointer-events-none absolute right-[4%] top-[18%] z-[3] text-6xl opacity-25 grayscale-[30%] sm:text-7xl"
        aria-hidden
      >
        ☂️
      </div>

      <header className="relative z-10 border-b border-sky-500/30 bg-base-300/55 shadow-lg shadow-sky-950/40 backdrop-blur-md">
        <div className="rain-glass-drip mx-auto flex max-w-6xl flex-col gap-4 px-3 py-4 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="rain-streak-pulse flex h-[5.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-sky-400/50 bg-gradient-to-b from-sky-900/80 to-base-300/90 shadow-inner shadow-sky-500/20">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-sky-300/90">soak</span>
              <span className="font-mono text-4xl font-black tabular-nums leading-none text-sky-100" style={{ fontFamily: 'var(--font-display)' }}>
                {STREAK_DAYS}
              </span>
              <span className="text-[8px] font-bold uppercase text-sky-400/80">days</span>
            </div>
            <div className="min-w-0">
              <p className="rain-mood-droop m-0 inline-block rounded-lg border border-dashed border-warning/50 bg-warning/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-warning">
                Socks: {socksWet ? 'squelch mode' : '…still damp'}
              </p>
              <h1
                className="rain-card-shiver m-0 mt-2 text-2xl leading-tight text-sky-100 sm:text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Bureau of Perpetual Drizzle
              </h1>
              <p className="m-0 mt-1 max-w-xl text-sm text-base-content/70">
                Same inbox, weather, news & stocks — now with 100% more puddles and paperwork that smells like wet dog.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end lg:justify-center">
            <div className="rounded-2xl border border-cyan-500/35 bg-cyan-950/30 px-4 py-3 text-center lg:text-right">
              <p className="m-0 text-[9px] font-extrabold uppercase tracking-[0.2em] text-cyan-300/90">Vitamin D reserve</p>
              <p className="m-0 text-3xl font-black text-cyan-200" style={{ fontFamily: 'var(--font-display)' }}>
                {moodPct}%
              </p>
              <p className="m-0 text-[10px] text-base-content/55">mostly wishful thinking</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-info badge-lg gap-1 border-sky-400/40 font-bold">
                <span aria-hidden>📬</span> {unread} soggy unread
              </span>
              <button type="button" className="btn btn-sm border-sky-500/50 bg-sky-600/20 font-bold text-sky-100 hover:bg-sky-500/30" onClick={onSwitchPersona}>
                Evacuate to sunshine
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t border-sky-500/20 bg-sky-950/40 py-2">
          <div className="rain-ticker-inner whitespace-nowrap text-[11px] font-extrabold uppercase tracking-wider text-sky-200/90">
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
            <h2 className="m-0 text-xs font-extrabold uppercase tracking-[0.28em] text-sky-300">Inbox (waterproof pouch)</h2>
            <span className="badge badge-outline border-sky-400/50 text-sky-200">seal: emotional</span>
          </div>

          <ul className="mt-4 space-y-3">
            {emails.map((e, i) => (
              <li key={e.id} className="rain-email-splash" style={{ animationDelay: `${i * 0.055}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className={`group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-3 pl-4 text-left shadow-lg transition-all hover:z-[1] hover:scale-[1.015] hover:border-sky-400/60 hover:shadow-sky-900/30 ${
                    e.read ? 'border-base-content/15 bg-base-100/55' : 'border-sky-400/45 bg-base-100/75 ring-2 ring-sky-500/20'
                  } backdrop-blur-sm`}
                >
                  <span
                    className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-sky-400/10 blur-xl transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="text-3xl transition-transform group-hover:scale-110">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`m-0 text-sm ${e.read ? 'text-base-content/75' : 'font-extrabold text-base-content'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-base-content/50">
                      {e.from.name} · {e.date}
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs text-base-content/55">{e.preview}</p>
                  </div>
                  {!e.read && (
                    <span className="badge badge-info badge-sm shrink-0 font-bold uppercase">needs drying</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {selectedEmail && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
              onClick={() => setSelectedEmail(null)}
              role="presentation"
            >
              <div
                className="relative max-h-[min(85vh,560px)] w-full max-w-md overflow-y-auto rounded-2xl border-2 border-sky-400/40 bg-gradient-to-br from-base-100/95 via-sky-950/20 to-base-100/95 p-6 shadow-2xl shadow-sky-950/50"
                onClick={ev => ev.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="rain-email-title"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 30%, currentColor 1px, transparent 1px), radial-gradient(circle at 70% 60%, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 28px',
                  }}
                  aria-hidden
                />
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-[1]"
                  aria-label="Close"
                  onClick={() => setSelectedEmail(null)}
                >
                  ✕
                </button>
                <p className="relative m-0 text-center text-[10px] font-extrabold uppercase tracking-[0.35em] text-sky-500">Ziploc-grade message</p>
                <h3 id="rain-email-title" className="relative m-0 mt-2 text-center text-2xl text-sky-100" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h3>
                <p className="relative m-0 mt-1 text-center text-sm font-semibold text-base-content/60">{selectedEmail.from.name}</p>
                <div className="relative my-4 border-t border-dashed border-sky-500/30" />
                <div className="relative whitespace-pre-wrap text-sm leading-relaxed text-base-content/90">{selectedEmail.body}</div>
                <div className="relative mt-6 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full bg-sky-500/15 px-4 py-2 text-xs font-bold text-sky-200">Condensation: normal</span>
                  <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-xs font-bold text-cyan-200">Mood: moist</span>
                </div>
                <button type="button" className="btn btn-info btn-block mt-6 font-extrabold" onClick={() => setSelectedEmail(null)}>
                  Towel off & close
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="relative rotate-[0.35deg] overflow-hidden rounded-2xl border border-sky-500/40 bg-base-100/50 p-4 shadow-xl backdrop-blur-md">
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-widest text-sky-300">Sky report (data says)</p>
            <p className="m-0 mt-1 text-xs italic text-base-content/50">
              Streak in your head: {STREAK_DAYS} days · numbers below are the real feed
            </p>
            <div className="mt-3 flex items-center gap-4">
              <span className="rain-mood-droop text-7xl drop-shadow-lg">{weather.icon}</span>
              <div>
                <p className="m-0 text-4xl font-black leading-none text-base-content">{weather.temp}°C</p>
                <p className="m-0 text-sm font-bold">{weather.city}</p>
                <p className="m-0 text-xs text-base-content/60">
                  {weather.condition} · feels {weather.feels_like}°
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-sky-500/20 pt-3">
              {weather.forecast.slice(0, 5).map(d => (
                <div key={d.day} className="flex min-w-[3.25rem] flex-col items-center rounded-xl bg-base-200/60 px-2 py-2 text-center shadow-inner">
                  <span className="text-[9px] font-bold uppercase text-base-content/45">{d.day}</span>
                  <span className="text-xl">{d.icon}</span>
                  <span className="text-[10px] font-bold tabular-nums">
                    {d.high}° / {d.low}°
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative -rotate-[0.2deg] rounded-2xl border border-cyan-600/30 bg-base-100/45 p-4 shadow-lg backdrop-blur-md">
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-widest text-cyan-300">Headlines through a bus window</p>
            <ul className="mt-3 space-y-3">
              {news.map(n => (
                <li key={n.id} className="rain-news-drip flex gap-2 text-sm leading-snug">
                  <span className="shrink-0 text-lg">{n.emoji}</span>
                  <span className="text-base-content/85">{n.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-sky-500/35 bg-sky-950/25 p-4 backdrop-blur-md">
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-widest text-sky-300">Stocks (also underwater)</p>
            <ul className="mt-3 space-y-3">
              {stocks.map(s => (
                <li key={s.ticker} className="rain-stock-float flex items-center gap-3 border-b border-sky-500/15 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-mono text-sm font-extrabold">{s.ticker}</p>
                    <p className={`m-0 text-xs font-bold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                      {s.changePct > 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </p>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#22d3ee' : '#f472b6'} className="opacity-90" />
                </li>
              ))}
            </ul>
            <p className="m-0 mt-3 text-center text-xs italic text-base-content/45">Past puddles do not guarantee future splashes.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
