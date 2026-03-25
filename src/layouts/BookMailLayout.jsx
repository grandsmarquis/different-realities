import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SECTIONS = [
  { id: 'mail', label: 'Letters', emoji: '✉️', ribbon: 'from-[#6b3a2c]' },
  { id: 'weather', label: 'Almanac', emoji: '☀️', ribbon: 'from-[#2d5a4a]' },
  { id: 'news', label: 'Chronicle', emoji: '📜', ribbon: 'from-[#4a3a6b]' },
  { id: 'stocks', label: 'Ledger', emoji: '📒', ribbon: 'from-[#5c4a2a]' },
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

function sparkPath(series, w, h) {
  if (!series?.length) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const pad = 2
  const span = max - min || 1
  const denom = Math.max(1, series.length - 1)
  return series
    .map((v, i) => {
      const x = pad + (i / denom) * (w - pad * 2)
      const y = h - pad - ((v - min) / span) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

function romanChapter(n) {
  const vals = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let x = n
  let out = ''
  for (const [v, s] of vals) {
    while (x >= v) {
      out += s
      x -= v
    }
  }
  return out || 'I'
}

export default function BookMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const reduced = useReducedMotion()
  const [section, setSection] = useState('mail')
  const [pageTick, setPageTick] = useState(0)

  const letter = selectedEmail ?? emails[0]
  const ix = useMemo(() => emails.findIndex((e) => e.id === letter.id), [letter.id])

  const goPrev = useCallback(() => {
    const n = (ix - 1 + emails.length) % emails.length
    setSelectedEmail(emails[n])
    setPageTick((t) => t + 1)
  }, [ix, setSelectedEmail])

  const goNext = useCallback(() => {
    const n = (ix + 1) % emails.length
    setSelectedEmail(emails[n])
    setPageTick((t) => t + 1)
  }, [ix, setSelectedEmail])

  const pickEmail = useCallback(
    (e) => {
      setSelectedEmail(e)
      setPageTick((t) => t + 1)
    },
    [setSelectedEmail],
  )

  const bodyParagraphs = useMemo(() => letter.body.split(/\n\n+/).filter(Boolean), [letter.body])

  return (
    <div
      className="book-mail-root relative min-h-full overflow-x-hidden pb-8 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-body)',
        background:
          'linear-gradient(165deg, #2a1810 0%, #1a0f0a 22%, #0f0a08 50%, #1c120c 78%, #261810 100%)',
      }}
    >
      <style>{`
        @keyframes book-float {
          0%, 100% { transform: translateY(0) rotate(-0.3deg); }
          50% { transform: translateY(-6px) rotate(0.3deg); }
        }
        @keyframes book-mote {
          0% { transform: translate3d(0,0,0); opacity: 0.15; }
          50% { opacity: 0.45; }
          100% { transform: translate3d(12px,-28px,0); opacity: 0.1; }
        }
        @keyframes book-page-in {
          from { opacity: 0; transform: translateY(10px) scale(0.992); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes book-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .book-mail-motes span {
          animation: book-mote ${reduced ? '0s' : '14s'} ease-in-out infinite;
        }
        .book-mail-spread {
          animation: ${reduced ? 'none' : 'book-float 9s ease-in-out infinite'};
        }
        .book-mail-page-content {
          animation: book-page-in ${reduced ? '0.15s' : '0.65s'} cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .book-mail-gold {
          background: linear-gradient(110deg, #c9a227 0%, #f4e4a8 35%, #c9a227 70%, #8b6914 100%);
          background-size: 200% auto;
          animation: ${reduced ? 'none' : 'book-shimmer 8s linear infinite'};
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Dust & vignette */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(0,0,0,0.65) 100%)',
          }}
        />
        <div
          className="book-mail-motes absolute inset-0 overflow-hidden"
          style={{ mixBlendMode: 'screen' }}
        >
          {Array.from({ length: reduced ? 0 : 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-amber-200/30"
              style={{
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>
      </div>

      <header className="relative z-30 border-b border-[var(--border)] bg-[#1a100c]/90 px-3 py-3 backdrop-blur-md sm:px-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-ghost btn-sm gap-2 border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card)]"
            aria-label="Close book and return home"
          >
            <span className="text-lg" aria-hidden>
              📚
            </span>
            <span className="font-semibold tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
              Shelve this book
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 flex-col items-center sm:flex">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--muted)]">
              A novel approach to the inbox
            </p>
            <p className="book-mail-gold mt-0.5 text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Correspondences, Vol. MMXXVI
            </p>
          </div>

          {section === 'mail' && (
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <span className="badge border border-[var(--border)] bg-[var(--card)] font-mono text-xs text-[var(--text2)]">
                Ch. {ix + 1} / {emails.length}
              </span>
              <button
                type="button"
                className="btn btn-sm border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:bg-[var(--accent-soft)]"
                onClick={goPrev}
              >
                ◀ Turn back
              </button>
              <button
                type="button"
                className="btn btn-sm border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:bg-[var(--accent-soft)]"
                onClick={goNext}
              >
                Turn forth ▶
              </button>
            </div>
          )}
        </div>

        {/* Ribbon bookmarks */}
        <div className="mx-auto mt-3 flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-3">
          {SECTIONS.map((s) => {
            const on = section === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className={`group relative flex min-w-[7.5rem] flex-col items-center rounded-t-lg px-3 pb-2 pt-3 text-sm font-semibold transition-all ${
                  on
                    ? 'z-20 -translate-y-1 scale-[1.02] shadow-lg'
                    : 'z-10 opacity-80 hover:opacity-100 hover:-translate-y-0.5'
                }`}
                aria-pressed={on}
              >
                <span
                  className={`absolute inset-x-2 top-0 h-full rounded-t-lg bg-gradient-to-b ${s.ribbon} to-black/20 ${
                    on ? 'ring-2 ring-amber-400/50' : ''
                  }`}
                  aria-hidden
                />
                <span className="relative z-10 flex items-center gap-1.5 text-amber-100 drop-shadow">
                  <span aria-hidden>{s.emoji}</span>
                  {s.label}
                </span>
                {on && (
                  <span
                    className="absolute -bottom-1 left-1/2 z-0 h-8 w-3 -translate-x-1/2 bg-gradient-to-b from-amber-600/90 to-amber-900/40 shadow-md"
                    aria-hidden
                  />
                )}
              </button>
            )
          })}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-3 py-6 sm:px-5">
        <div className={`book-mail-spread relative mx-auto ${reduced ? '' : 'perspective-[1400px]'}`}>
          {/* Book shadow */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-black/50 blur-2xl"
            aria-hidden
          />

          <div
            className="relative overflow-hidden rounded-[1.25rem] border-4 border-[#3d2817] shadow-2xl"
            style={{
              background:
                'linear-gradient(145deg, #5c3d26 0%, #2a1a10 12%, #1a100a 50%, #2a1a12 88%, #4a3020 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,220,180,0.12), 0 25px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.4)',
            }}
          >
            {/* Inner pages */}
            <div className="grid gap-0 md:grid-cols-2">
              {/* Left page */}
              <div
                className="relative min-h-[min(68dvh,520px)] border-b-4 border-[#3d2817] md:border-b-0 md:border-r-4 md:border-[#c4a574]/40"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 8%), repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,140,90,0.06) 27px, rgba(180,140,90,0.06) 28px), linear-gradient(180deg, #f7eeda 0%, #ebe0c8 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-y-8 left-3 w-px bg-[#c4a574]/35"
                  aria-hidden
                />
                <div className="relative p-5 sm:p-7 md:p-8">
                  {section === 'mail' && (
                    <>
                      <p
                        className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#6b5344]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Table of contents
                      </p>
                      <div className="mx-auto mt-2 flex justify-center" aria-hidden>
                        <svg width="120" height="14" viewBox="0 0 120 14" className="text-[#8b6914]">
                          <path
                            fill="currentColor"
                            d="M0 7h40M80 7h40M45 6c2-4 8-5 15-5s13 1 15 5c-2 4-8 5-15 5S47 10 45 6z"
                          />
                        </svg>
                      </div>
                      <ul className="mt-5 space-y-2.5 overflow-y-auto pr-1 [max-height:min(52dvh,420px)]">
                        {emails.map((e, i) => {
                          const active = e.id === letter.id
                          return (
                            <li key={e.id}>
                              <button
                                type="button"
                                onClick={() => pickEmail(e)}
                                className={`flex w-full gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${
                                  active
                                    ? 'border-[#8b6914] bg-[#fff8e8] shadow-md ring-2 ring-amber-400/40'
                                    : 'border-[#d4c4a8]/80 bg-white/40 hover:bg-white/70'
                                }`}
                              >
                                <span
                                  className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#c4a574]/50 bg-[#faf3e6] text-lg shadow-inner"
                                  aria-hidden
                                >
                                  {e.from.avatar}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex items-baseline justify-between gap-2">
                                    <span className="font-bold text-[#3d2817]" style={{ fontFamily: 'var(--font-display)' }}>
                                      Chapter {romanChapter(i + 1)}
                                    </span>
                                    {!e.read && (
                                      <span className="badge badge-warning badge-xs shrink-0 font-bold">Unread</span>
                                    )}
                                  </span>
                                  <span className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-[#2a1810]">
                                    {e.subject}
                                  </span>
                                  <span className="mt-0.5 block truncate text-xs italic text-[#6b5344]">
                                    by {e.from.name}
                                  </span>
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  )}

                  {section === 'weather' && (
                    <div className="text-[#2a1810]">
                      <p
                        className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#5a7a62]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Farmer&apos;s almanac
                      </p>
                      <h2 className="mt-4 text-balance text-center text-2xl font-bold leading-tight text-[#1a3020]">
                        Observations upon the air &amp; sky
                      </h2>
                      <p className="mt-4 text-justify text-sm leading-relaxed text-[#3d2817]">
                        The wise reader knows that clouds are merely unfinished thoughts of the atmosphere. Today&apos;s
                        parchment records what the heavens whispered to our instruments in{' '}
                        <strong>
                          {weather.city}, {weather.country}
                        </strong>
                        .
                      </p>
                      <div className="mt-6 rounded-lg border-2 border-dashed border-[#5a7a62]/40 bg-[#f0f5f0]/80 p-4 text-center">
                        <p className="text-5xl" aria-hidden>
                          {weather.icon}
                        </p>
                        <p className="mt-2 text-3xl font-bold tabular-nums text-[#1a3020]">{weather.temp}°C</p>
                        <p className="text-sm italic text-[#3d5340]">{weather.condition}</p>
                        <p className="mt-3 text-xs leading-relaxed text-[#4a4035]">
                          Feels like <span className="tabular-nums font-semibold">{weather.feels_like}°C</span> · Wind{' '}
                          <span className="tabular-nums">{weather.wind}</span> km/h · Humidity{' '}
                          <span className="tabular-nums">{weather.humidity}</span>%
                        </p>
                      </div>
                    </div>
                  )}

                  {section === 'news' && (
                    <div className="text-[#1a1810]">
                      <p
                        className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-[#6b5344]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Extraordinary bulletin
                      </p>
                      <h2 className="mt-3 text-center text-2xl font-black leading-none">The Daily Chronicle</h2>
                      <p className="mt-2 text-center text-xs italic text-[#6b5344]">
                        All the news fit to bind between two boards
                      </p>
                      <div className="mt-5 columns-1 gap-4 sm:columns-2">
                        {news.slice(0, 3).map((n) => (
                          <article
                            key={n.id}
                            className="mb-4 break-inside-avoid rounded border border-[#c4a574]/50 bg-white/50 p-3 shadow-sm"
                          >
                            <p className="text-xs font-bold uppercase tracking-wider text-[#8b4513]">
                              {n.category} · {n.time}
                            </p>
                            <p className="mt-1 text-lg leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                              <span aria-hidden>{n.emoji} </span>
                              {n.title}
                            </p>
                            <p className="mt-1 text-xs text-[#6b5344]">— {n.source}</p>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {section === 'stocks' && (
                    <div className="text-[#2a1810]">
                      <p
                        className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#6b4423]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Merchant&apos;s appendix
                      </p>
                      <h2 className="mt-3 text-center text-2xl font-bold">The price of things</h2>
                      <p className="mt-2 text-justify text-sm leading-relaxed">
                        Herein lie the day&apos;s reckonings, scribbled by clerks who have never seen a blockchain but
                        understand the poetry of a number that moves.
                      </p>
                      <ul className="mt-5 space-y-3">
                        {stocks.slice(0, 3).map((s) => {
                          const up = s.changePct >= 0
                          const path = sparkPath(s.series?.slice(-20) ?? [], 100, 36)
                          return (
                            <li
                              key={s.ticker}
                              className="flex items-center gap-3 rounded-lg border border-[#c4a574]/60 bg-white/45 p-3"
                            >
                              <svg width="100" height="36" className="shrink-0 text-[#3d2817]" aria-hidden>
                                <path
                                  d={path}
                                  fill="none"
                                  stroke={up ? '#15803d' : '#b91c1c'}
                                  strokeWidth="2"
                                />
                              </svg>
                              <div className="min-w-0 flex-1">
                                <p className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                                  {s.ticker}
                                </p>
                                <p className="truncate text-xs text-[#6b5344]">{s.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-mono text-sm font-bold tabular-nums">
                                  {s.currency}
                                  {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                                <p className={`text-xs font-bold tabular-nums ${up ? 'text-green-800' : 'text-red-800'}`}>
                                  {up ? '+' : ''}
                                  {s.changePct.toFixed(2)}%
                                </p>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Right page */}
              <div
                className="relative min-h-[min(68dvh,520px)]"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(0,0,0,0.05) 0%, transparent 8%), repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,140,90,0.06) 27px, rgba(180,140,90,0.06) 28px), linear-gradient(180deg, #faf4e6 0%, #ebe0c8 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-y-8 right-3 w-px bg-[#c4a574]/35"
                  aria-hidden
                />
                <div key={`${section}-${section === 'mail' ? `${letter.id}-${pageTick}` : 'static'}`} className="book-mail-page-content relative p-5 sm:p-7 md:p-8">
                  {section === 'mail' && (
                    <>
                      <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-[#8b6914]">
                        Chapter {romanChapter(ix + 1)}
                      </p>
                      <h1
                        className="mt-3 text-balance text-center text-2xl font-bold leading-tight text-[#1a0f08] sm:text-3xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {letter.subject}
                      </h1>
                      <p className="mt-3 text-center text-sm italic text-[#5c4a3a]">
                        A letter from <span className="font-semibold not-italic text-[#3d2817]">{letter.from.name}</span>
                        <span className="tabular-nums">
                          {' '}
                          · {letter.date} · {letter.time}
                        </span>
                      </p>
                      <div className="mx-auto my-5 h-px max-w-xs bg-gradient-to-r from-transparent via-[#c4a574] to-transparent" />
                      <div className="prose-book text-justify text-[0.95rem] leading-[1.75] text-[#2a1810]">
                        {bodyParagraphs.map((para, pi) => (
                          <p
                            key={pi}
                            className={pi === 0 ? 'first-letter:float-left first-letter:-mt-0.5 first-letter:mr-2 first-letter:font-bold first-letter:leading-none first-letter:text-[3.25rem] first-letter:text-[#8b6914]' : 'mt-4'}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                      <p className="mt-8 text-center font-mono text-[10px] text-[#a89880]">
                        — {pageTick > 0 ? pageTick : 1} page turns today · same data, better binding —
                      </p>
                    </>
                  )}

                  {section === 'weather' && (
                    <div className="text-[#2a1810]">
                      <h2 className="text-center text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                        Prophecies for the week ahead
                      </h2>
                      <p className="mt-2 text-center text-sm italic text-[#6b5344]">
                        (Forecasts are printed here for the convenience of travelers and gardeners.)
                      </p>
                      <ul className="mt-6 space-y-3">
                        {weather.forecast.map((d) => (
                          <li
                            key={d.day}
                            className="flex items-center justify-between gap-3 border-b border-dotted border-[#c4a574]/60 pb-2"
                          >
                            <span className="font-bold text-[#3d2817]">{d.day}</span>
                            <span className="text-2xl" aria-hidden>
                              {d.icon}
                            </span>
                            <span className="font-mono text-sm tabular-nums text-[#4a3520]">
                              {d.high}° / {d.low}°
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 rounded-lg border-2 border-[#8b6914]/30 bg-[#fff8e8]/90 p-4 text-center shadow-inner">
                        <p className="text-sm font-semibold text-[#5c4a2a]">Marginal note</p>
                        <p className="mt-2 text-sm italic leading-relaxed text-[#6b5344]">
                          “If the inbox is a novel, then weather is the chapter where nothing happens — yet you still
                          turn the page.”
                        </p>
                      </div>
                    </div>
                  )}

                  {section === 'news' && (
                    <div className="text-[#1a1810]">
                      <div className="columns-1 gap-5 sm:columns-2">
                        {news.slice(3).map((n) => (
                          <article
                            key={n.id}
                            className="mb-5 break-inside-avoid border-b-2 border-double border-[#3d2817]/20 pb-4"
                          >
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b5344]">
                              {n.source} · {n.time}
                            </p>
                            <h3 className="mt-1 text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                              <span aria-hidden>{n.emoji} </span>
                              {n.title}
                            </h3>
                            <p className="mt-2 text-xs font-semibold text-[#8b4513]">{n.category}</p>
                          </article>
                        ))}
                      </div>
                      <p className="mt-4 text-center text-xs italic text-[#6b5344]">
                        Finis chronici · resume thy scrolling elsewhere
                      </p>
                    </div>
                  )}

                  {section === 'stocks' && (
                    <div className="text-[#2a1810]">
                      <h2 className="text-center text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                        Continuation of the ledger
                      </h2>
                      <div className="mt-6 overflow-x-auto rounded-lg border-2 border-[#3d2817]/25 bg-[#fffcf5]/90">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="border-b-2 border-[#3d2817]/30 bg-[#f0e6d4]">
                              <th className="p-2 font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                                Script
                              </th>
                              <th className="p-2 font-bold">House</th>
                              <th className="p-2 text-right font-bold">Quote</th>
                              <th className="p-2 text-right font-bold">Δ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stocks.map((s) => {
                              const up = s.changePct >= 0
                              const path = sparkPath(s.series?.slice(-24) ?? [], 72, 28)
                              return (
                                <tr key={s.ticker} className="border-b border-[#c4a574]/40">
                                  <td className="p-2 font-mono font-bold">{s.ticker}</td>
                                  <td className="max-w-[140px] truncate p-2 text-xs text-[#5c4a3a]">{s.name}</td>
                                  <td className="p-2 text-right font-mono tabular-nums">
                                    {s.currency}
                                    {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </td>
                                  <td className="p-2 text-right">
                                    <span className={`font-bold tabular-nums ${up ? 'text-green-800' : 'text-red-800'}`}>
                                      {up ? '+' : ''}
                                      {s.changePct.toFixed(2)}%
                                    </span>
                                    <svg width="72" height="28" className="ml-auto mt-1" aria-hidden>
                                      <path
                                        d={path}
                                        fill="none"
                                        stroke={up ? '#15803d' : '#b91c1c'}
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-6 text-center text-xs italic text-[#6b5344]">
                        Figures courtesy of the same API that powers your ordinary life — here dressed in calf leather
                        and guilt.
                      </p>
                    </div>
                  )}
                </div>

                {/* Corner ornament */}
                <div className="pointer-events-none absolute bottom-4 right-4 opacity-30" aria-hidden>
                  <svg width="48" height="48" viewBox="0 0 48 48" className="text-[#8b6914]">
                    <path
                      fill="currentColor"
                      d="M24 4c2 8 8 14 16 16-8 2-14 8-16 16-2-8-8-14-16-16 8-2 14-8 16-16z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center crease highlight */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-black/15 to-transparent md:block"
              aria-hidden
            />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-lg text-center text-xs italic text-[#a89078]">
          Tip: each ribbon is a bookmark into the same story — mail, sky, gossip, and gold — bound between two pages of
          pretend parchment.
        </p>
      </main>
    </div>
  )
}
