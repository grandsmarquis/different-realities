import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

function FloatingPaper({ className, delay, children }) {
  return (
    <div className={`job-seek-paper-float pointer-events-none absolute text-2xl opacity-40 ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden>
      {children}
    </div>
  )
}

function HopeMeterSvg({ level }) {
  const clamped = Math.min(100, Math.max(0, level))
  return (
    <svg viewBox="0 0 120 64" className="job-seek-meter-shake w-full max-w-[140px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="4" y="20" width="112" height="28" rx="6" stroke="currentColor" strokeWidth="2" className="text-base-content/25" />
      <rect x="8" y="24" width={Math.max(4, (104 * clamped) / 100)} height="20" rx="4" className="fill-secondary transition-[width] duration-700 ease-out" />
      <path d="M60 4 L68 18 L52 18 Z" className="fill-warning" />
      <text x="60" y="58" textAnchor="middle" className="fill-base-content/50" style={{ fontSize: '9px', fontFamily: 'var(--font-main)' }}>
        HOPE
      </text>
    </svg>
  )
}

export default function DesperateJobSeekerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [appliedToday, setAppliedToday] = useState(47)
  const [hopePct, setHopePct] = useState(12)

  useEffect(() => {
    const id = setInterval(() => {
      setAppliedToday(n => n + (Math.random() > 0.65 ? 1 : 0))
      setHopePct(() => 4 + Math.floor(Math.random() * 14))
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const ticker = useMemo(
    () =>
      [
        'TAILOR EVERY COVER LETTER',
        'LINKEDIN PREMIUM IS A TRAP',
        'THEY READ THE FIRST LINE',
        'SEND THANK-YOU WITHIN 24H',
        'YOU ARE QUALIFIED (PROBABLY)',
        'COFFEE IS NOT A PERSONALITY',
      ].join('     ★     '),
    [],
  )

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="job-seek-bg relative min-h-dvh overflow-x-hidden pb-14 text-base-content"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <FloatingPaper className="left-[6%] top-[18%] -rotate-12" delay={0}>
        📄
      </FloatingPaper>
      <FloatingPaper className="right-[10%] top-[22%] rotate-6" delay={0.8}>
        📝
      </FloatingPaper>
      <FloatingPaper className="left-[14%] bottom-[28%] rotate-3" delay={1.4}>
        ✉️
      </FloatingPaper>
      <FloatingPaper className="right-[18%] bottom-[22%] -rotate-8" delay={2.1}>
        📋
      </FloatingPaper>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(13,148,136,0.12),transparent_50%)]" aria-hidden />

      <header className="relative z-10 border-b-4 border-dashed border-warning/50 bg-base-200/90 shadow-md backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-3 py-4 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="job-seek-clip-spin flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-4 border-warning bg-warning/20 text-4xl shadow-inner">
              📎
            </div>
            <div className="min-w-0">
              <p className="job-seek-stamp-bob m-0 inline-block rounded border-2 border-error/60 bg-error/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-error">
                Open to literally anything
              </p>
              <h1 className="m-0 mt-1 text-3xl leading-none tracking-tight sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                PLEASE HIRE ME HQ
              </h1>
              <p className="m-0 mt-1 text-sm text-base-content/65">Same data. Different coping mechanism. Refresh inbox for serotonin.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2 sm:flex-col sm:items-end sm:justify-center">
            <div className="rounded-xl border-2 border-accent/40 bg-accent/10 px-3 py-2 text-center sm:text-right">
              <p className="m-0 text-[9px] font-bold uppercase tracking-[0.2em] text-accent">Applications (today)</p>
              <p className="m-0 font-mono text-3xl font-bold tabular-nums leading-none text-base-content" style={{ fontFamily: 'var(--font-display)' }}>
                {appliedToday}
              </p>
              <p className="m-0 text-[10px] text-base-content/50">+ probably 3 you forgot to log</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-secondary/40 bg-base-100/80 px-3 py-2">
              <HopeMeterSvg level={hopePct} />
              <div className="text-left">
                <p className="m-0 text-[9px] font-bold uppercase text-base-content/45">Outlook</p>
                <p className="m-0 text-lg font-bold text-secondary">{hopePct}% delusional optimism</p>
              </div>
            </div>
            <button type="button" className="btn btn-warning btn-sm font-bold shadow-md" onClick={onSwitchPersona}>
              I got the job!!! (jk home)
            </button>
          </div>
        </div>

        <div className="overflow-hidden border-t-2 border-dotted border-base-content/15 bg-warning/10 py-2">
          <div className="job-seek-ticker whitespace-nowrap text-xs font-bold uppercase tracking-wider text-base-content/75">
            <span className="inline-block px-6">{ticker}</span>
            <span className="inline-block px-6" aria-hidden>
              {ticker}
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-5 px-3 py-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="m-0 text-sm font-bold uppercase tracking-[0.25em] text-accent">Inbox (evidence of life)</h2>
            <span className="badge badge-secondary badge-lg font-bold">{unread} unread — could be THE ONE</span>
          </div>

          <ul className="mt-4 space-y-3">
            {emails.map((e, i) => (
              <li key={e.id} style={{ animationDelay: `${i * 0.07}s` }} className="job-seek-row-pop">
                <button
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className={`job-seek-card-tilt group flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left shadow transition-all hover:z-[1] hover:scale-[1.01] hover:border-accent hover:shadow-lg ${
                    e.read ? 'border-base-content/10 bg-base-100/70' : 'border-warning/50 bg-base-100 shadow-md ring-2 ring-warning/20'
                  }`}
                >
                  <span className="text-3xl transition-transform group-hover:scale-110">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`m-0 text-sm ${e.read ? 'text-base-content/70' : 'font-bold text-base-content'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-base-content/50">
                      {e.from.name} · {e.date}
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs text-base-content/55">{e.preview}</p>
                  </div>
                  {!e.read && (
                    <span className="badge badge-accent badge-sm shrink-0 font-bold uppercase">open me</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {selectedEmail && (
            <div
              className="job-seek-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-neutral/70 p-4 backdrop-blur-sm"
              onClick={() => setSelectedEmail(null)}
              role="presentation"
            >
              <div
                className="job-seek-modal-panel relative max-h-[min(80vh,540px)] w-full max-w-lg overflow-y-auto rounded-2xl border-4 border-dashed border-warning bg-base-100 p-6 shadow-2xl"
                onClick={ev => ev.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="job-seek-email-title"
              >
                <div className="absolute -right-1 -top-1 rotate-12 rounded bg-warning px-2 py-0.5 text-[10px] font-bold uppercase text-warning-content shadow">
                  URGENT (emotionally)
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  aria-label="Close"
                  onClick={() => setSelectedEmail(null)}
                >
                  ✕
                </button>
                <h3 id="job-seek-email-title" className="m-0 pr-10 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h3>
                <p className="m-0 mt-1 text-sm text-base-content/60">{selectedEmail.from.name}</p>
                <div className="mt-4 whitespace-pre-wrap border-t-2 border-dotted border-base-content/15 pt-4 text-sm leading-relaxed text-base-content/90">
                  {selectedEmail.body}
                </div>
                <button type="button" className="btn btn-accent btn-block mt-6 font-bold" onClick={() => setSelectedEmail(null)}>
                  Close & manifest callback
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="relative rotate-[0.5deg] rounded-2xl border-2 border-base-content/20 bg-warning/15 p-4 shadow-lg">
            <div className="absolute -left-2 top-3 h-8 w-3 rounded-sm bg-warning/80 shadow-sm" aria-hidden />
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-warning-content">First-impression weather</p>
            <div className="mt-2 flex items-center gap-4">
              <span className="job-seek-weather-bounce text-6xl drop-shadow">{weather.icon}</span>
              <div>
                <p className="m-0 text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.temp}°C
                </p>
                <p className="m-0 text-sm font-medium">{weather.city}</p>
                <p className="m-0 text-xs text-base-content/55">
                  Layer like you might bump into a recruiter at the café. Feels {weather.feels_like}°.
                </p>
              </div>
            </div>
          </div>

          <div className="relative -rotate-[0.3deg] rounded-2xl border-2 border-accent/35 bg-accent/10 p-4 shadow-md">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-accent">Interview small-talk ammo</p>
            <ul className="mt-3 space-y-2">
              {news.map(n => (
                <li key={n.id} className="flex gap-2 text-sm leading-snug text-base-content/85">
                  <span className="shrink-0 text-lg">{n.emoji}</span>
                  <span>{n.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-base-content/15 bg-base-200/80 p-4">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-base-content/45">Stocks I stare at instead of applying</p>
            <ul className="mt-3 space-y-3">
              {stocks.map(s => (
                <li key={s.ticker} className="job-seek-stock-nudge flex items-center gap-3 border-b border-base-content/10 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-mono text-sm font-bold">{s.ticker}</p>
                    <p className={`m-0 text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                      {s.changePct > 0 ? '▲' : '▼'} {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </p>
                  </div>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#14b8a6' : '#f97316'} className="opacity-90" />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-secondary/50 bg-secondary/5 p-4 text-center">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-secondary">Pro tip</p>
            <p className="m-0 mt-2 text-sm leading-snug text-base-content/75">
              Save this tab. When they ask “any questions for us?” say you already studied their weather widget. Works 0% of the time.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
