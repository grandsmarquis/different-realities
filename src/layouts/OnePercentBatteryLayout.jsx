import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function DyingSparks() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${(i * 17 + 7) % 96}%`,
        delay: `${(i * 0.31) % 4}s`,
        dur: `${2.2 + (i % 5) * 0.35}s`,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="battery1-spark absolute bottom-[12%] h-1 w-1 rounded-full bg-[var(--accent2)]"
          style={{
            left: s.left,
            animationDuration: s.dur,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  )
}

function BatteryHero() {
  return (
    <div className="battery1-jitter relative flex flex-col items-center" aria-hidden>
      <svg className="battery1-battery-glow relative z-10 w-[5.5rem] shrink-0 sm:w-[6.5rem]" viewBox="0 0 100 168" fill="none">
        <defs>
          <linearGradient id="b1-fill" x1="50" y1="160" x2="50" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#991b1b" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
          <filter id="b1-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="38" y="6" width="24" height="14" rx="3" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
        <rect x="14" y="22" width="72" height="132" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        <rect
          className="battery1-sliver-pulse"
          x="22"
          y="142"
          width="56"
          height="6"
          rx="2"
          fill="url(#b1-fill)"
          filter="url(#b1-glow)"
        />
        <path
          className="battery1-bolt"
          d="M52 58 L42 88 H52 L48 118 L62 82 H52 Z"
          fill="var(--accent2)"
          opacity="0.85"
        />
      </svg>
      <p className="font-[family-name:var(--font-display)] battery1-digit-blink mt-2 text-4xl font-black tabular-nums tracking-tighter text-[var(--accent)] sm:text-5xl">
        1%
      </p>
      <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--text2)]">critical</p>
    </div>
  )
}

function UnpluggedCable() {
  return (
    <div className="battery1-cable-sway pointer-events-none absolute -right-4 top-1/4 hidden opacity-40 lg:block" aria-hidden>
      <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="text-[var(--text2)]">
        <path
          d="M108 20 C 70 60, 40 100, 25 180"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="96" y="8" width="20" height="28" rx="3" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />
        <path d="M102 36 L110 44 L102 52" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export default function OnePercentBatteryLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [lieSeconds, setLieSeconds] = useState(38)
  const [thunder, setThunder] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setLieSeconds(6 + Math.floor(Math.random() * 71))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.72) {
        setThunder(true)
        setTimeout(() => setThunder(false), 140)
      }
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const newsMarquee = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('   ·   '), [])

  return (
    <div
      className="battery1-root relative min-h-full overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(127, 29, 29, 0.35) 0%, var(--bg) 45%, #030303 100%)',
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-[1] transition-opacity duration-75 ${thunder ? 'opacity-[0.22]' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(180deg, rgba(250,250,250,0.95) 0%, transparent 35%)' }}
        aria-hidden
      />
      <div className="battery1-vignette pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="battery1-scanlines pointer-events-none absolute inset-0 z-[2] opacity-[0.12] mix-blend-overlay" aria-hidden />
      <div className="battery1-flicker pointer-events-none absolute inset-0 z-[3]" aria-hidden />

      <UnpluggedCable />
      <DyingSparks />

      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-24 pt-5 sm:px-5 sm:pt-7">
        <header className="battery1-card-rise mb-8 flex flex-col gap-6 border-b border-[var(--border)]/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <BatteryHero />
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-display)] text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent2)]">
                low power reality
              </p>
              <h1 className="font-[family-name:var(--font-display)] mt-1 text-2xl font-bold leading-tight sm:text-3xl">
                everything costs <span className="text-[var(--accent)]">volts</span>
              </h1>
              <p className="mt-2 max-w-md text-sm leading-snug text-[var(--text2)]">
                Same inbox, weather, headlines, and tickers — rendered with the gentle stability of a dying flashlight.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--card)]/80 px-4 py-3 text-right shadow-[0_0_24px_var(--glow-red)] backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-widest text-[var(--text2)]">time until fiction</p>
              <p className="font-[family-name:var(--font-display)] battery1-lie-tick text-2xl font-bold tabular-nums text-[var(--accent2)]">
                ~{lieSeconds}s
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline border-[var(--accent2)]/50 text-[var(--accent2)] hover:border-[var(--accent2)] hover:bg-[var(--accent2)]/10"
              onClick={onSwitchPersona}
            >
              find a wall socket (home)
            </button>
          </div>
        </header>

        <div
          role="status"
          className="battery1-banner-wiggle mb-6 flex items-center gap-3 rounded-xl border border-[var(--accent2)]/30 bg-[var(--accent-dim)]/25 px-4 py-3 text-sm text-[var(--text)]"
        >
          <span className="text-2xl" aria-hidden>
            ⚡
          </span>
          <p className="m-0 leading-snug">
            <strong className="text-[var(--accent2)]">Pro tip:</strong> squinting saves approximately zero electrons but feels productive.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--border)]/50 bg-[var(--card)]/40 py-2 backdrop-blur-sm">
          <div className="battery1-news-marquee flex w-max gap-20 whitespace-nowrap text-sm text-[var(--text2)]">
            <span>{newsMarquee}</span>
            <span aria-hidden>{newsMarquee}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-7" aria-labelledby="b1-inbox">
            <h2 id="b1-inbox" className="font-[family-name:var(--font-display)] mb-4 flex items-center gap-2 text-xl">
              <span className="battery1-priority-blink inline-block h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
              inbox <span className="text-[var(--text2)] text-base font-normal">(high priority drain)</span>
            </h2>
            <ul className="space-y-3">
              {emails.map((email, i) => (
                <li key={email.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="battery1-mail-row card group w-full border border-[var(--border)]/50 bg-[var(--card)]/60 text-left shadow-md backdrop-blur-sm transition hover:border-[var(--accent)]/55 hover:shadow-[0_0_20px_var(--glow-red)]"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="card-body flex-row items-center gap-3 p-3 sm:gap-4 sm:p-4">
                      <span className="battery1-emoji-wobble text-2xl sm:text-3xl">{email.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[var(--text)]">{email.subject}</p>
                        <p className="mt-0.5 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                      </div>
                      {!email.read && <span className="badge badge-error badge-outline badge-sm shrink-0">!</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-5 lg:col-span-5">
            <div className="battery1-dim-pulse card border-[var(--border)]/50 bg-[var(--card)]/50 backdrop-blur-md">
              <div className="card-body">
                <h3 className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[var(--accent2)]">
                  outside (luxury module)
                </h3>
                <p className="mt-2 text-3xl sm:text-4xl">
                  {weather.icon}{' '}
                  <span className="font-bold tabular-nums">{weather.temp}°</span>
                </p>
                <p className="text-[var(--text2)]">{weather.condition}</p>
                <p className="mt-1 text-xs text-[var(--text2)]/80">{weather.city}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {weather.forecast.slice(0, 4).map(d => (
                    <span key={d.day} className="badge badge-ghost border-[var(--border)]/60 font-normal">
                      {d.day} {d.icon} {d.high}°
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="battery1-dim-pulse card border-[var(--border)]/50 bg-[var(--card)]/50 backdrop-blur-md [animation-delay:0.3s]">
              <div className="card-body gap-2">
                <h3 className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  tickers (cpu hungry)
                </h3>
                <ul className="space-y-2 font-mono text-sm">
                  {stocks.map(s => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)]/40 bg-[var(--bg)]/50 px-3 py-2"
                    >
                      <span className="font-semibold">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'text-[var(--accent2)]' : 'text-[var(--accent)]'}>
                        {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="battery1-card-rise card border-[var(--border)]/50 bg-[var(--bg2)]/60 backdrop-blur-md">
              <div className="card-body gap-3">
                <h3 className="font-[family-name:var(--font-display)] text-sm text-[var(--text)]">headlines (full brightness)</h3>
                <ul className="space-y-3 text-sm">
                  {news.map(item => (
                    <li key={item.id} className="flex gap-2 border-l-2 border-[var(--accent)]/60 pl-3">
                      <span className="text-lg leading-none">{item.emoji}</span>
                      <div>
                        <p className="font-medium leading-snug">{item.title}</p>
                        <p className="text-xs text-[var(--text2)]">
                          {item.source} · {item.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="b1-email-title"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="battery1-modal-pop relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--accent)]/40 bg-[var(--card)] p-5 shadow-[0_0_48px_var(--glow-red)] sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">email.exe — battery kill</p>
            <h2 id="b1-email-title" className="font-[family-name:var(--font-display)] mt-2 text-lg leading-snug">
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/95">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-error btn-outline mt-6 w-full sm:w-auto" onClick={() => setSelectedEmail(null)}>
              close &amp; preserve ions
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
