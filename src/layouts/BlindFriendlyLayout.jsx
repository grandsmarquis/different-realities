import { useState, useId, useEffect, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function SoundWaveBars({ className = '' }) {
  const heights = [40, 72, 100, 68, 52, 88, 45, 95, 58, 76]
  return (
    <div className={`flex items-end gap-0.5 ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <span
          key={i}
          className="blind-eq-bar w-1 rounded-full bg-cyan-400/90 motion-reduce:animate-none"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  )
}

function BrailleSparkle({ className = '' }) {
  const dots = Array.from({ length: 48 }, (_, i) => ({
    x: (i * 17) % 100,
    y: (i * 23 + (i % 3) * 11) % 100,
    o: 0.08 + (i % 5) * 0.04,
  }))
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden>
      <defs>
        <radialGradient id="blind-dot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={`${d.x}%`}
          cy={`${d.y}%`}
          r={1.2 + (i % 3) * 0.4}
          fill="url(#blind-dot-glow)"
          className="text-cyan-400 motion-safe:animate-pulse"
          style={{ animationDelay: `${i * 0.12}s`, opacity: d.o }}
        />
      ))}
    </svg>
  )
}

export default function BlindFriendlyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [highContrast, setHighContrast] = useState(false)
  const [srAnnouncement, setSrAnnouncement] = useState('')
  const dialogTitleId = useId()
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!selectedEmail) return
    const msg = `Message opened: ${selectedEmail.subject}, from ${selectedEmail.from.name}.`
    setSrAnnouncement(msg)
    const t = window.setTimeout(() => setSrAnnouncement(''), 3500)
    const focusT = window.setTimeout(() => closeBtnRef.current?.focus(), 50)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(focusT)
    }
  }, [selectedEmail])

  useEffect(() => {
    if (!selectedEmail) return
    function onKey(e) {
      if (e.key === 'Escape') setSelectedEmail(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedEmail, setSelectedEmail])

  const hc = highContrast
    ? {
        outer: 'bg-black text-yellow-300',
        card: 'border-4 border-yellow-300 bg-black text-yellow-200',
        muted: 'text-yellow-400/90',
        accent: 'text-yellow-200',
        btn: 'btn-warning border-2 border-yellow-300 font-bold',
        linkNav: 'link-warning font-semibold',
      }
    : {
        outer: 'bg-[#0c0a14] text-[#f0ebff]',
        card: 'border-2 border-violet-500/40 bg-[#16122a]/95 text-[#f0ebff] shadow-lg shadow-cyan-500/5',
        muted: 'text-violet-300/80',
        accent: 'text-cyan-300',
        btn: 'btn-primary border-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-base-100 hover:opacity-95',
        linkNav: 'link link-hover text-cyan-300',
      }

  return (
    <div
      className={`blind-briefing-root relative min-h-screen overflow-x-hidden ${hc.outer}`}
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <style>{`
        @keyframes blind-eq {
          0%, 100% { transform: scaleY(0.35); opacity: 0.65; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .blind-eq-bar {
          transform-origin: bottom center;
          animation: blind-eq 0.85s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .blind-eq-bar { animation: none; opacity: 0.85; transform: scaleY(0.75); }
        }
        .blind-briefing-root a:focus-visible,
        .blind-briefing-root button:focus-visible {
          outline: 3px solid currentColor;
          outline-offset: 3px;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40" aria-hidden>
        <div className="motion-safe:animate-pulse absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="motion-safe:animate-pulse absolute -right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl [animation-delay:0.5s]" />
        <BrailleSparkle className="opacity-70" />
      </div>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </p>

      <a
        href="#briefing-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-btn focus:bg-warning focus:px-4 focus:py-3 focus:text-warning-content focus:shadow-lg"
      >
        Skip to main briefing
      </a>

      <header className="relative z-10 border-b border-violet-500/30 px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-start gap-4">
            <div
              className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-400/50 bg-base-100/10 shadow-inner shadow-cyan-500/20 motion-safe:animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
              aria-hidden
            >
              <span className="absolute inset-2 rounded-xl border border-dashed border-fuchsia-400/40 motion-safe:animate-[spin_18s_linear_infinite_reverse] motion-reduce:animate-none" />
              <span className="text-4xl drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">📻</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                Echo Briefing — your day, out loud
              </h1>
              <p className={`mt-2 max-w-xl text-base leading-relaxed sm:text-lg ${hc.muted}`}>
                Built for screen readers first: every section has a heading, links jump straight there, and the
                decorative squiggles are silent eye-candy for sighted friends.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <SoundWaveBars className="h-10 shrink-0 sm:order-last" />
            <button
              type="button"
              className={`btn btn-sm sm:btn-md ${hc.btn}`}
              aria-pressed={highContrast}
              onClick={() => setHighContrast(v => !v)}
            >
              {highContrast ? 'Standard colors' : 'High contrast'}
            </button>
            <button type="button" className="btn btn-outline btn-sm border-violet-400/50 sm:btn-md" onClick={onSwitchPersona}>
              Another persona
            </button>
          </div>
        </div>
      </header>

      <nav
        className="relative z-10 border-b border-violet-500/20 bg-base-100/5 px-4 py-4 sm:px-8"
        aria-label="Jump to briefing sections"
      >
        <p className={`mb-3 text-sm font-semibold uppercase tracking-wide ${hc.muted}`}>Quick jumps</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base font-medium">
          <li>
            <a href="#briefing-inbox" className={hc.linkNav}>
              Inbox
            </a>
          </li>
          <li>
            <a href="#briefing-weather" className={hc.linkNav}>
              Weather
            </a>
          </li>
          <li>
            <a href="#briefing-news" className={hc.linkNav}>
              News
            </a>
          </li>
          <li>
            <a href="#briefing-stocks" className={hc.linkNav}>
              Stocks
            </a>
          </li>
        </ul>
      </nav>

      <main id="briefing-main" className="relative z-10 mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-8">
        <section id="briefing-inbox" aria-labelledby="heading-inbox" className="scroll-mt-24">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <h2 id="heading-inbox" className="text-2xl font-bold sm:text-3xl">
              Inbox
            </h2>
            <span className={`text-sm ${hc.muted}`}>{emails.length} messages</span>
          </div>
          <p className={`mb-6 text-base ${hc.muted}`}>
            Each row opens the full message in a dialog. Use Tab to move between messages.
          </p>
          <ul className="space-y-3">
            {emails.map(email => (
              <li key={email.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className={`card w-full text-left transition hover:brightness-110 ${hc.card}`}
                  aria-label={`Open email from ${email.from.name}, subject: ${email.subject}.${email.read ? ' Read.' : ' Unread.'}`}
                >
                  <div className="card-body gap-2 p-4 sm:p-5">
                    <div className="flex flex-wrap items-start gap-3">
                      <span className="text-2xl sm:text-3xl" aria-hidden>
                        {email.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-semibold leading-snug sm:text-xl">{email.subject}</p>
                        <p className={`mt-1 text-base leading-relaxed ${hc.muted}`}>{email.preview}</p>
                      </div>
                    </div>
                    <div className={`flex flex-wrap items-center gap-2 border-t border-current/15 pt-3 text-sm ${hc.muted}`}>
                      <span className="font-medium text-current">{email.from.name}</span>
                      <span aria-hidden>·</span>
                      <span>{email.date}</span>
                      {!email.read && (
                        <span className="badge badge-sm badge-accent border-0">Unread</span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section id="briefing-weather" aria-labelledby="heading-weather" className="scroll-mt-24">
          <h2 id="heading-weather" className="mb-4 text-2xl font-bold sm:text-3xl">
            Weather
          </h2>
          <div className={`card ${hc.card}`}>
            <div className="card-body p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-5xl motion-safe:animate-bounce motion-reduce:animate-none" aria-hidden>
                  {weather.icon}
                </span>
                <div>
                  <p className={`text-sm font-medium uppercase tracking-wider ${hc.muted}`}>Right now in {weather.city}</p>
                  <p className="text-3xl font-bold sm:text-4xl">
                    {weather.temp} degrees, {weather.condition}
                  </p>
                  <p className={`mt-2 text-base ${hc.muted}`}>
                    Feels like {weather.feels_like} degrees. Humidity {weather.humidity} percent. Wind {weather.wind}{' '}
                    kilometers per hour.
                  </p>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold">Five-day outlook</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {weather.forecast.map(day => (
                  <li
                    key={day.day}
                    className={`rounded-lg border border-current/10 px-3 py-2 text-base ${hc.muted}`}
                  >
                    <span className="font-semibold text-current">{day.day}</span>
                    <span className="mx-2" aria-hidden>
                      {day.icon}
                    </span>
                    High {day.high}, low {day.low}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="briefing-news" aria-labelledby="heading-news" className="scroll-mt-24">
          <h2 id="heading-news" className="mb-4 text-2xl font-bold sm:text-3xl">
            News
          </h2>
          <ol className="space-y-3" aria-label="Headlines in order">
            {news.map((item, index) => (
              <li key={item.id}>
                <div className={`card ${hc.card}`}>
                  <div className="card-body gap-2 p-4 sm:p-5">
                    <span className={`text-xs font-bold uppercase tracking-wider ${hc.muted}`}>
                      Story {index + 1} of {news.length}
                    </span>
                    <p className="text-lg font-semibold leading-snug sm:text-xl">
                      <span aria-hidden>{item.emoji} </span>
                      {item.title}
                    </p>
                    <p className={`text-sm ${hc.muted}`}>
                      {item.source}, {item.category}, {item.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="briefing-stocks" aria-labelledby="heading-stocks" className="scroll-mt-24">
          <h2 id="heading-stocks" className="mb-4 text-2xl font-bold sm:text-3xl">
            Stock prices
          </h2>
          <p className={`mb-4 text-base ${hc.muted}`}>Spoken-friendly: direction is called out for each ticker.</p>
          <div className={`card ${hc.card}`}>
            <ul className="card-body list-none divide-y divide-current/10 p-0 sm:p-2">
              {stocks.map(s => {
                const up = s.change >= 0
                return (
                  <li key={s.ticker} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div>
                      <span className="text-lg font-bold">{s.ticker}</span>
                      <span className={`ml-2 text-sm ${hc.muted}`}>{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-semibold tabular-nums">
                        {s.currency}
                        {s.price.toFixed(2)}
                      </span>
                      <p className={`text-sm ${hc.muted}`}>
                        {up ? 'Up' : 'Down'} {Math.abs(s.change).toFixed(2)} ({up ? '+' : '−'}
                        {Math.abs(s.changePct).toFixed(2)}%)
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </main>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className={`max-h-[min(90vh,40rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border-4 p-5 shadow-2xl sm:p-8 ${hc.card}`}
            onClick={e => e.stopPropagation()}
          >
            <h2 id={dialogTitleId} className="text-xl font-bold sm:text-2xl" tabIndex={-1}>
              {selectedEmail.subject}
            </h2>
            <p className={`mt-2 text-base font-medium ${hc.accent}`}>From {selectedEmail.from.name}</p>
            <p className={`text-sm ${hc.muted}`}>{selectedEmail.date}</p>
            <div className="divider my-4 border-current/20 text-sm">Message body</div>
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">{selectedEmail.body}</pre>
            <button
              ref={closeBtnRef}
              type="button"
              className={`btn mt-6 w-full sm:btn-lg ${hc.btn}`}
              onClick={() => setSelectedEmail(null)}
            >
              Close message
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
