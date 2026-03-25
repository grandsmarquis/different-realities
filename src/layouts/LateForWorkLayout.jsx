import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

function RushSvgDecor({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M20 95 Q55 20 95 55 T170 40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 14"
        className="text-warning/40"
        opacity="0.9"
      />
      <circle cx="42" cy="88" r="6" className="fill-warning" />
      <path d="M38 70 L46 70 L44 82 L40 82 Z" className="fill-base-content/80" />
      <path d="M32 98 L52 98 L50 108 L34 108 Z" className="fill-primary" />
      <text x="118" y="38" fill="#f97316" fontSize="22" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
        GO!
      </text>
    </svg>
  )
}

export default function LateForWorkLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [secondsLeft, setSecondsLeft] = useState(268)
  const [bpm, setBpm] = useState(142)

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft(s => Math.max(0, s - 1))
      setBpm(b => 138 + Math.floor(Math.random() * 18))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = useMemo(() => {
    const m = Math.floor(secondsLeft / 60)
    const s = secondsLeft % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }, [secondsLeft])

  const tickerText = useMemo(
    () => news.map(n => `${n.emoji} ${n.title}`).join('   •   '),
    [],
  )

  return (
    <div
      className="late-work-rush-bg relative min-h-dvh overflow-x-hidden pb-14 text-base-content"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-error/10 via-transparent to-warning/5" aria-hidden />

      <div className="relative z-10 border-b-2 border-warning/50 bg-base-300/80 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="late-work-runner-bob flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-warning text-3xl shadow-lg shadow-warning/30">
              🏃
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.4em] text-warning">Sprint mode</p>
              <h1 className="m-0 truncate text-3xl font-bold tracking-tight text-base-content sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                LATE FOR WORK
              </h1>
              <p className="m-0 text-xs text-base-content/60">Shirt tucked? Debatable. Inbox? Glanced.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:flex-nowrap">
            <div className="late-work-countdown-pulse flex items-center gap-2 rounded-xl border-2 border-error/60 bg-error/15 px-3 py-2">
              <span className="text-[10px] font-bold uppercase text-error">Stand-up in</span>
              <span className="font-mono text-2xl font-bold tabular-nums text-error" style={{ fontFamily: 'var(--font-display)' }}>
                {secondsLeft > 0 ? timeStr : 'NOW 😬'}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-base-content/15 bg-base-100/40 px-3 py-2">
              <span className="text-lg" aria-hidden>
                ❤️‍🔥
              </span>
              <div>
                <p className="m-0 text-[9px] uppercase tracking-wider text-base-content/50">Stress HR</p>
                <p className="m-0 font-mono text-lg font-bold leading-none text-warning">{bpm} BPM</p>
              </div>
            </div>
            <button type="button" className="btn btn-warning btn-sm font-bold uppercase" onClick={onSwitchPersona}>
              Call in
            </button>
          </div>
        </div>

        <div className="overflow-hidden border-t border-base-content/10 bg-base-100/30 py-1.5">
          <div className="late-work-ticker-inner whitespace-nowrap text-xs font-semibold text-base-content/80">
            <span className="inline-block px-4">{tickerText}</span>
            <span className="inline-block px-4" aria-hidden>
              {tickerText}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-3 py-5 lg:grid-cols-12">
        <section className="relative lg:col-span-7">
          <RushSvgDecor className="pointer-events-none absolute -right-4 top-0 hidden w-40 opacity-70 md:block" />

          <div className="flex items-end justify-between gap-2">
            <h2 className="m-0 text-sm font-bold uppercase tracking-widest text-warning">Inbox (one-thumb edition)</h2>
            <span className="badge badge-error badge-sm font-bold">{emails.filter(e => !e.read).length} unread</span>
          </div>

          <ul className="mt-3 space-y-2">
            {emails.map((e, i) => (
              <li key={e.id} style={{ animationDelay: `${i * 0.06}s` }} className="late-work-email-pop">
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className={`late-work-card-nudge flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left shadow-md transition-all hover:border-warning hover:shadow-lg hover:shadow-warning/10 ${
                    e.read ? 'border-base-content/10 bg-base-100/50' : 'border-warning/40 bg-base-100/90'
                  }`}
                >
                  <span className="text-2xl">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`m-0 text-sm ${e.read ? 'text-base-content/70' : 'font-bold text-base-content'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-base-content/50">
                      {e.from.name} · {e.date}
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs text-base-content/55">{e.preview}</p>
                  </div>
                  {!e.read && <span className="badge badge-warning badge-xs shrink-0">!</span>}
                </button>
              </li>
            ))}
          </ul>

          {selectedEmail && (
            <div
              className="late-work-modal-rise fixed inset-0 z-50 flex items-center justify-center bg-neutral/80 p-4 backdrop-blur-sm"
              onClick={() => setSelectedEmail(null)}
              role="presentation"
            >
              <div
                className="relative max-h-[min(78vh,520px)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-warning/50 bg-base-200 p-6 shadow-2xl"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="late-work-email-title"
              >
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  aria-label="Close"
                  onClick={() => setSelectedEmail(null)}
                >
                  ✕
                </button>
                <h3 id="late-work-email-title" className="m-0 pr-10 text-xl font-bold text-base-content" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h3>
                <p className="m-0 mt-1 text-sm text-base-content/60">{selectedEmail.from.name}</p>
                <div className="mt-4 whitespace-pre-wrap border-t border-base-content/10 pt-4 text-sm leading-relaxed text-base-content/90">
                  {selectedEmail.body}
                </div>
                <button type="button" className="btn btn-warning btn-block mt-6 font-bold uppercase" onClick={() => setSelectedEmail(null)}>
                  OK running again
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border-2 border-info/40 bg-gradient-to-br from-info/20 to-base-200 p-4 shadow-lg">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-info/20 blur-2xl" aria-hidden />
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-info">Outside (rude)</p>
            <div className="mt-2 flex items-center gap-4">
              <span className="late-work-weather-wobble text-5xl drop-shadow-md">{weather.icon}</span>
              <div>
                <p className="m-0 text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.temp}°C
                </p>
                <p className="m-0 text-sm text-base-content/70">{weather.city}</p>
                <p className="m-0 text-xs text-base-content/50">Feels like {weather.feels_like}° — perfect for power-walking guilt</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-warning/30 bg-base-200/90 p-4 shadow-inner">
            <div className="flex items-center justify-between gap-2">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-warning">Liquid luck</p>
              <span className="late-work-coffee text-3xl" aria-hidden>
                ☕
              </span>
            </div>
            <p className="m-0 mt-2 text-sm leading-snug text-base-content/80">
              47% chance you will wear this coffee. Drink while the elevator door is closing for +10 speed.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-base-content/10 bg-base-100/60 p-4">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-base-content/50">Stocks (glanced between strides)</p>
            <ul className="mt-3 space-y-3">
              {stocks.map(s => (
                <li key={s.ticker} className="flex items-center gap-3 border-b border-base-content/5 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-mono text-sm font-bold">{s.ticker}</p>
                    <p className={`m-0 text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                      {s.changePct > 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </p>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} className="opacity-90" />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-accent">Headlines you pretend to know</p>
            <ul className="mt-2 space-y-2">
              {news.map(n => (
                <li key={n.id} className="flex gap-2 text-sm leading-snug text-base-content/85">
                  <span className="shrink-0">{n.emoji}</span>
                  <span>{n.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
