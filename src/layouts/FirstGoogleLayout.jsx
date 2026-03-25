import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const LOGO = [
  { ch: 'G', c: 'var(--google-blue)' },
  { ch: 'o', c: 'var(--google-red)' },
  { ch: 'o', c: 'var(--google-yellow)' },
  { ch: 'g', c: 'var(--google-blue)' },
  { ch: 'l', c: 'var(--google-green)' },
  { ch: 'e', c: 'var(--google-red)' },
]

function GoogleWordmark({ large }) {
  return (
    <div
      className={`google-wordmark-wrap flex select-none justify-center ${large ? 'py-2' : 'py-0'}`}
      aria-label="Google"
    >
      <span className={`google-wordmark inline-flex font-bold tracking-tight ${large ? 'text-[clamp(2.75rem,14vw,5.5rem)]' : 'text-2xl sm:text-[1.65rem]'}`} style={{ fontFamily: 'var(--font-main)' }}>
        {LOGO.map(({ ch, c }, i) => (
          <span
            key={`${ch}-${i}`}
            className="google-letter inline-block origin-bottom"
            style={{ color: c, animationDelay: `${i * 0.07}s` }}
          >
            {ch}
          </span>
        ))}
      </span>
    </div>
  )
}

function SearchingDots() {
  return (
    <div className="flex items-center justify-center gap-1 py-8" aria-live="polite" aria-busy="true">
      <span className="google-dot size-2.5 rounded-full bg-[var(--google-blue)]" />
      <span className="google-dot size-2.5 rounded-full bg-[var(--google-red)]" style={{ animationDelay: '0.15s' }} />
      <span className="google-dot size-2.5 rounded-full bg-[var(--google-yellow)]" style={{ animationDelay: '0.3s' }} />
      <span className="google-dot size-2.5 rounded-full bg-[var(--google-green)]" style={{ animationDelay: '0.45s' }} />
    </div>
  )
}

function LuckySparkles() {
  const seeds = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${10 + ((i * 23) % 70)}%`,
        delay: `${(i % 5) * 0.2}s`,
        rot: (i * 47) % 360,
      })),
    [],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {seeds.map(s => (
        <span
          key={s.id}
          className="lucky-spark absolute text-lg opacity-0"
          style={{ left: s.left, top: s.top, animationDelay: s.delay, transform: `rotate(${s.rot}deg)` }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

export default function FirstGoogleLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState('home')
  const [luckyFlash, setLuckyFlash] = useState(false)
  const [docCount] = useState(() => 1_802_394 + Math.floor(Math.random() * 88_000))

  const runSearch = useCallback(() => {
    setPhase('searching')
    window.setTimeout(() => setPhase('results'), 650)
  }, [])

  useEffect(() => {
    if (phase !== 'results') return undefined
    const t = window.setTimeout(() => {
      const el = document.getElementById('google-results-shine')
      el?.classList.add('google-shine-on')
    }, 80)
    return () => window.clearTimeout(t)
  }, [phase])

  const resultMeta = useMemo(() => {
    const ms = (8 + Math.random() * 42).toFixed(2)
    const total = emails.length + news.length + stocks.length + 3
    return { ms, total }
  }, [])

  function handleLucky() {
    setLuckyFlash(true)
    window.setTimeout(() => setLuckyFlash(false), 1200)
    const picks = ['results-emails', 'results-weather', 'results-news', 'results-stocks']
    runSearch()
    window.setTimeout(() => {
      const id = picks[Math.floor(Math.random() * picks.length)]
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 720)
  }

  const isHome = phase === 'home'
  const isSearching = phase === 'searching'

  return (
    <div
      className="first-google-root relative min-h-full overflow-x-hidden text-[var(--text)]"
      style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)' }}
    >
      {luckyFlash && <LuckySparkles />}

      {/* Beta ribbon */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-20 origin-top-right rotate-45 translate-x-6 translate-y-4 bg-[var(--google-yellow)] px-10 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-[#5f4b00] shadow-sm"
        aria-hidden
      >
        Beta
      </div>

      <header className={`relative z-10 border-b transition-[padding] duration-500 ease-out ${isHome ? 'border-transparent' : 'border-[var(--border)] bg-[var(--bg-muted)]'}`}>
        <div className={`mx-auto flex max-w-5xl flex-col gap-4 px-4 ${isHome ? 'pb-10 pt-16 sm:pt-24' : 'py-3 sm:flex-row sm:items-center sm:gap-6'}`}>
          <div className={`shrink-0 transition-all duration-500 ${isHome ? 'scale-100' : 'sm:w-28'}`}>
            <GoogleWordmark large={isHome} />
          </div>

          <div className={`flex min-w-0 flex-1 flex-col gap-3 ${isHome ? 'mx-auto w-full max-w-xl' : ''}`}>
            <div className="flex w-full flex-wrap items-center gap-2 sm:flex-nowrap">
              <label className="input input-bordered flex min-h-10 min-w-0 flex-1 items-center gap-2 border-[var(--border)] bg-[var(--bg)] shadow-sm transition-shadow focus-within:border-[var(--google-blue)] focus-within:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search the web…"
                  className="grow bg-transparent text-sm outline-none placeholder:opacity-50"
                  onKeyDown={e => {
                    if (e.key === 'Enter') runSearch()
                  }}
                />
              </label>
              <div className="flex w-full shrink-0 gap-2 sm:w-auto">
                <button type="button" className="btn btn-sm border-[var(--border)] bg-[var(--bg-muted)] font-medium normal-case text-[var(--text)] hover:bg-base-200" onClick={runSearch}>
                  Google Search
                </button>
                <button type="button" className="btn btn-sm border-[var(--border)] bg-[var(--bg-muted)] font-medium normal-case text-[var(--text)] hover:bg-base-200" onClick={handleLucky}>
                  I&apos;m Feeling Lucky
                </button>
              </div>
            </div>
            {isHome && (
              <p className="text-center text-sm text-[var(--snippet)]" style={{ fontFamily: 'var(--font-serif)' }}>
                Indexing approximately <span className="tabular-nums font-semibold text-[var(--text)]">{docCount.toLocaleString()}</span> documents
                <span className="google-blink ml-1 inline-block size-2 rounded-full bg-[var(--google-green)] align-middle" title="Systems operational" />
              </p>
            )}
          </div>

          <div className={`flex justify-center sm:justify-end ${isHome ? 'sm:pt-0' : ''}`}>
            <button type="button" className="btn btn-ghost btn-xs font-normal text-[var(--snippet)]" onClick={onSwitchPersona}>
              Switch persona
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-[1] mx-auto max-w-3xl px-4 pb-20 pt-2">
        {isSearching && <SearchingDots />}

        {phase === 'results' && (
          <div className="google-results-sheen relative space-y-8 pt-2">
            <div id="google-results-shine" className="pointer-events-none absolute -inset-2 -z-10 rounded-box opacity-0" />

            <p className="text-sm text-[var(--snippet)]" style={{ fontFamily: 'var(--font-serif)' }}>
              About {resultMeta.total} results ({resultMeta.ms} seconds)
            </p>

            {/* Weather onebox */}
            <section id="results-weather" className="rounded-box border border-[var(--border)] bg-[var(--bg-muted)] p-4 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--snippet)]">Weather</h2>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="google-sun-wrap relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-200">
                  <span className="google-sun text-4xl" aria-hidden>
                    {weather.icon}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-semibold tabular-nums">
                    {weather.temp}°C <span className="text-base font-normal text-[var(--snippet)]">in {weather.city}</span>
                  </p>
                  <p className="text-sm text-[var(--snippet)]">{weather.condition}</p>
                  <p className="text-xs text-[var(--snippet)]">Wind {weather.wind} km/h · Humidity {weather.humidity}%</p>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-3">
                {weather.forecast.slice(0, 5).map(d => (
                  <li key={d.day} className="badge badge-lg badge-ghost gap-1 border border-[var(--border)] font-normal">
                    <span>{d.icon}</span> {d.day} {d.high}° / {d.low}°
                  </li>
                ))}
              </ul>
            </section>

            {/* Emails as organic results */}
            <section id="results-emails" className="space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--snippet)]">Web · Messages</h2>
              {emails.map((email, i) => (
                <article key={email.id} className="google-result-block" style={{ animationDelay: `${0.04 * i}s` }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="text-left text-lg leading-snug text-[var(--link)] hover:underline"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {email.subject}
                  </button>
                  <p className="mt-0.5 text-sm text-[var(--url-line)]">
                    <span className="google-url-caret mr-1">▾</span>
                    inbox › from {email.from.name} · {email.time}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--snippet)]" style={{ fontFamily: 'var(--font-serif)' }}>
                    {email.preview}
                  </p>
                </article>
              ))}
            </section>

            {/* News */}
            <section id="results-news" className="space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--snippet)]">News</h2>
              {news.map((n, i) => (
                <article key={n.id} className="google-result-block" style={{ animationDelay: `${0.04 * i}s` }}>
                  <p className="text-lg leading-snug text-[var(--link)]" style={{ fontFamily: 'var(--font-serif)' }}>
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--url-line)]">
                    <span className="google-url-caret mr-1">▾</span>
                    {n.source} · {n.category} · {n.time}
                  </p>
                </article>
              ))}
            </section>

            {/* Finance */}
            <section id="results-stocks" className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--snippet)]">Finance</h2>
              <div className="overflow-x-auto rounded-box border border-[var(--border)] bg-[var(--bg)]">
                <table className="table table-sm">
                  <thead>
                    <tr className="border-[var(--border)] text-[var(--snippet)]">
                      <th className="bg-[var(--bg-muted)]">Symbol</th>
                      <th className="bg-[var(--bg-muted)]">Price</th>
                      <th className="bg-[var(--bg-muted)]">Change</th>
                      <th className="hidden bg-[var(--bg-muted)] sm:table-cell">Spark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map(s => (
                      <tr key={s.ticker} className="border-[var(--border)] hover:bg-[var(--bg-muted)]">
                        <td className="font-semibold">{s.ticker}</td>
                        <td className="tabular-nums">
                          {s.currency}
                          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className={s.changePct >= 0 ? 'text-success' : 'text-error'}>
                          {s.changePct >= 0 ? '+' : ''}
                          {s.changePct.toFixed(2)}%
                        </td>
                        <td className="hidden sm:table-cell">
                          <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#34A853' : '#EA4335'} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <footer className="border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--snippet)]">
              <p className="google-footer-links flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span>©1998 Google Inc. (parody timeline)</span>
                <span>Advertising Programs</span>
                <span>Business Solutions</span>
                <span>About Google</span>
              </p>
              <p className="mt-2 italic" style={{ fontFamily: 'var(--font-serif)' }}>
                Don&apos;t be evil — unless the CSS is really fun.
              </p>
            </footer>
          </div>
        )}
      </main>

      {selectedEmail && (
        <div
          className="modal modal-open !items-start !justify-center pt-8 sm:pt-16"
          role="dialog"
          aria-modal="true"
          aria-labelledby="first-google-mail-title"
        >
          <button type="button" className="modal-backdrop bg-neutral/40" aria-label="Close" onClick={() => setSelectedEmail(null)} />
          <div className="modal-box relative max-h-[min(85vh,640px)] w-full max-w-lg overflow-y-auto border border-[var(--border)] p-0 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2">
              <span id="first-google-mail-title" className="truncate pr-2 text-sm font-medium">
                {selectedEmail.subject}
              </span>
              <button type="button" className="btn btn-ghost btn-xs btn-square shrink-0" onClick={() => setSelectedEmail(null)} aria-label="Close message">
                ✕
              </button>
            </div>
            <div className="space-y-2 p-4 text-sm">
              <p className="text-[var(--snippet)]">
                <span className="font-medium text-[var(--text)]">From:</span> {selectedEmail.from.name} &lt;{selectedEmail.from.email}&gt;
              </p>
              <p className="text-[var(--snippet)]">
                <span className="font-medium text-[var(--text)]">Date:</span> {selectedEmail.date} · {selectedEmail.time}
              </p>
              <hr className="border-[var(--border)]" />
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--text)]">{selectedEmail.body}</pre>
            </div>
            <div className="border-t border-[var(--border)] bg-[var(--bg-muted)] p-3">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setSelectedEmail(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .first-google-root {
          --link-visited: #681da8;
        }
        @keyframes googleLetterPop {
          0% { transform: translateY(12px) scale(0.85); opacity: 0; }
          55% { transform: translateY(-4px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .google-letter {
          animation: googleLetterPop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes googleDotPulse {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.35; }
          40% { transform: scale(1.15); opacity: 1; }
        }
        .google-dot {
          animation: googleDotPulse 0.9s ease-in-out infinite;
        }
        @keyframes googleBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .google-blink {
          animation: googleBlink 1.4s ease-in-out infinite;
        }
        @keyframes googleSun {
          0%, 100% { transform: rotate(-6deg) scale(1); filter: brightness(1); }
          50% { transform: rotate(6deg) scale(1.08); filter: brightness(1.15); }
        }
        .google-sun {
          display: inline-block;
          animation: googleSun 3.5s ease-in-out infinite;
        }
        .google-sun-wrap {
          box-shadow: 0 0 0 3px rgba(251, 188, 5, 0.35);
          animation: googleSunGlow 4s ease-in-out infinite;
        }
        @keyframes googleSunGlow {
          0%, 100% { box-shadow: 0 0 0 3px rgba(251, 188, 5, 0.25); }
          50% { box-shadow: 0 0 0 8px rgba(66, 133, 244, 0.2); }
        }
        @keyframes googleShine {
          0% { transform: translateX(-100%); opacity: 0; }
          15% { opacity: 0.12; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .google-results-sheen #google-results-shine {
          background: linear-gradient(105deg, transparent 0%, rgba(66, 133, 244, 0.15) 45%, transparent 70%);
        }
        .google-results-sheen #google-results-shine.google-shine-on {
          animation: googleShine 1.1s ease-out forwards;
        }
        @keyframes luckySpark {
          0% { opacity: 0; transform: translateY(8px) scale(0.5) rotate(0deg); }
          30% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(-24px) scale(1.2) rotate(180deg); }
        }
        .lucky-spark {
          animation: luckySpark 1s ease-out forwards;
        }
        .google-url-caret {
          color: var(--url-line);
          font-size: 0.7em;
        }
        .google-result-block {
          animation: googleFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes googleFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
