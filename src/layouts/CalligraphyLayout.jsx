import { useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function AnimatedSparkline({ series, stroke, shouldAnimate }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 120
  const h = 36
  const p = 2
  const r = max - min || 1

  const points = series
    .map((v, i) => {
      const x = p + (i / (series.length - 1)) * (w - 2 * p)
      const y = p + (1 - (v - min) / r) * (h - 2 * p)
      return `${x},${y}`
    })
    .join(' ')

  const dash = 220

  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline
        key={shouldAnimate ? 'anim' : 'still'}
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        style={{ animation: shouldAnimate ? 'calligraphy-draw 1.4s ease forwards' : 'none' }}
      />
    </svg>
  )
}

function Flourish() {
  return (
    <svg viewBox="0 0 260 40" aria-hidden className="calligraphy-flourish h-3 w-full opacity-80">
      <path
        d="M10,25 C30,5 55,5 75,22 C95,39 125,39 145,22 C165,5 190,5 210,22 C230,39 245,32 250,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10,20 C28,12 48,8 70,16 C92,24 110,30 135,22 C160,14 185,10 250,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

export default function CalligraphyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [revealStocks, setRevealStocks] = useState(false)

  const inkDots = useMemo(() => {
    // Deterministic-ish layout (no timers) so the page doesn't “jump”.
    return Array.from({ length: 14 }).map((_, i) => {
      const left = 6 + (i * 86) / 14 + ((i % 3) - 1) * 2.5
      const delay = (i * 0.21) % 1.8
      const dur = 4.2 + (i % 5) * 0.55
      const size = 6 + (i % 4) * 3
      return { left: clamp(left, 2, 96), delay, dur, size }
    })
  }, [])

  const unreadCount = emails.filter(e => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 20% 0%, rgba(124,45,18,0.14) 0%, transparent 45%), radial-gradient(ellipse at 80% 35%, rgba(180,83,9,0.10) 0%, transparent 40%), repeating-linear-gradient(180deg, rgba(124,45,18,0.06) 0px, rgba(124,45,18,0.06) 1px, transparent 1px, transparent 18px)',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes calligraphy-ink-fall {
          0% { transform: translateY(-18px) rotate(0deg); opacity: 0; }
          20% { opacity: .65; }
          100% { transform: translateY(110vh) rotate(18deg); opacity: 0; }
        }
        @keyframes calligraphy-blot-bloom {
          0%, 100% { transform: scale(.78); opacity: .2; }
          45% { transform: scale(1.12); opacity: .55; }
        }
        @keyframes calligraphy-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes calligraphy-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .calligraphy-ink-dot {
          position: absolute;
          top: -10vh;
          width: var(--s);
          height: var(--s);
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(124,45,18,.55) 0%, rgba(124,45,18,.18) 45%, transparent 70%);
          filter: blur(0.15px);
          animation: calligraphy-ink-fall var(--d) ease-in infinite;
          left: calc(var(--x) * 1%);
          pointer-events: none;
        }

        .calligraphy-inkblot {
          position: absolute;
          inset: auto 10px 10px auto;
          width: 86px;
          height: 56px;
          border-radius: 999px 30px 999px 30px;
          background: radial-gradient(circle at 35% 45%, rgba(124,45,18,0.42) 0%, rgba(124,45,18,0.18) 40%, transparent 70%);
          transform: rotate(-10deg);
          opacity: 0.25;
          filter: blur(0.2px);
          pointer-events: none;
        }
        .calligraphy-email-scroll:hover .calligraphy-inkblot { opacity: 0.45; }
        .calligraphy-email-scroll--unread .calligraphy-inkblot { animation: calligraphy-blot-bloom 1.9s ease-in-out infinite; }

        .calligraphy-flourish { color: var(--accent); }
        .calligraphy-email-scroll {
          position: relative;
          width: 100%;
          border: 1px solid var(--border);
          border-left: 6px solid var(--accent);
          border-radius: 18px;
          padding: 12px 14px;
          background: color-mix(in srgb, var(--card) 88%, white 12%);
          box-shadow: 0 12px 30px rgba(17, 24, 39, 0.08);
          transition: transform .16s ease, box-shadow .16s ease, background .16s ease;
          text-align: left;
          animation: calligraphy-fade-in .45s ease both;
        }
        .calligraphy-email-scroll:hover {
          transform: translateY(-2px) rotate(-0.15deg);
          box-shadow: 0 18px 45px rgba(17, 24, 39, 0.12);
          background: color-mix(in srgb, var(--card) 78%, white 22%);
        }
        .calligraphy-email-subject {
          font-family: var(--font-display);
          letter-spacing: 0.01em;
          font-size: 1.05rem;
          line-height: 1.15;
        }
        .calligraphy-stamp {
          font-family: var(--font-display);
          letter-spacing: 0.06em;
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(124,45,18,0.08);
          border: 1px dashed rgba(124,45,18,0.45);
          color: var(--accent);
          transform: rotate(-6deg);
          box-shadow: 0 10px 20px rgba(124,45,18,0.08);
        }

        .calligraphy-card {
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--card) 88%, white 12%);
          border-radius: 20px;
          padding: 16px 16px;
          box-shadow: 0 12px 30px rgba(17, 24, 39, 0.07);
        }

        .calligraphy-spark {
          opacity: 0.95;
          transition: opacity .2s ease, filter .2s ease;
        }
        .calligraphy-sealed .calligraphy-spark { opacity: 0.35; filter: blur(0.6px) grayscale(40%); }
        .calligraphy-sealed .calligraphy-reveal-overlay { opacity: 1; pointer-events: auto; }
        .calligraphy-reveal-overlay {
          opacity: 0;
          pointer-events: none;
          transition: opacity .2s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .calligraphy-ink-dot { animation: none !important; opacity: 0.15; }
          .calligraphy-email-scroll { animation: none !important; }
        }
      `}</style>

      {inkDots.map((d, i) => (
        <div
          key={i}
          className="calligraphy-ink-dot"
          style={
            {
              '--x': d.left,
              '--d': `${d.dur}s`,
              '--s': `${d.size}px`,
              animationDelay: `${d.delay}s`,
            }
          }
        />
      ))}

      <header className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="text-3xl sm:text-4xl" aria-hidden>
              🖋️
            </div>
            <div className="min-w-0">
              <h1 className="text-[clamp(2rem,4vw,2.7rem)] leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                INK & INBOX
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--text2)]">
                <span className="inline-flex items-center gap-2">
                  <Flourish />
                </span>
                <span>
                  {unreadCount} unread letters · {weather.city} weather · {news.length} headlines
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn btn-outline btn-sm border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-transparent"
            onClick={onSwitchPersona}
          >
            [change identity]
          </button>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/70 px-3 py-1 text-xs text-[var(--text2)]">
            <span className="font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
              Tip:
            </span>
            <span>Click a scroll to open the letter.</span>
          </div>
        </div>
      </header>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-5 pb-12 pt-6 sm:grid-cols-12 sm:px-8">
        <main className="sm:col-span-7">
          <div className="calligraphy-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--text2)]">INBOX</p>
                <h2 className="mt-2 text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  Scrolls waiting for your quill
                </h2>
              </div>
              <div className="hidden md:block">
                <div className="calligraphy-stamp" style={{ transform: 'rotate(-10deg)' }}>
                  FEATHER EDITION
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {emails.map((email, i) => {
                const unread = !email.read
                return (
                  <button
                    key={email.id}
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className={`calligraphy-email-scroll ${unread ? 'calligraphy-email-scroll--unread' : ''}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="calligraphy-email-subject truncate">{email.subject}</div>
                        <div className="mt-1 text-xs text-[var(--text2)]">
                          FROM {email.from.name} · {email.date} · {email.time}
                        </div>
                        <div className="mt-2 text-sm text-[var(--text)]/85 line-clamp-3">{email.preview}</div>
                      </div>
                      {unread ? <div className="calligraphy-stamp">UNREAD</div> : <div className="text-xs opacity-40">read</div>}
                    </div>
                    <Flourish />
                    <span aria-hidden className="calligraphy-inkblot" />
                  </button>
                )
              })}
            </div>
          </div>
        </main>

        <aside className="sm:col-span-5 space-y-6">
          <section className="calligraphy-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--text2)]">WEATHER</p>
                <h3 className="mt-2 text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.icon} {weather.condition}
                </h3>
                <p className="mt-3 text-[2rem] font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.temp}°C
                </p>
                <p className="mt-2 text-sm text-[var(--text2)]">
                  Feels like {weather.feels_like}°C · Humidity {weather.humidity}% · Wind {weather.wind} km/h
                </p>
              </div>
              <div className="hidden sm:block text-5xl" aria-hidden>
                🌤️
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-3">
              {weather.forecast.map((d, idx) => (
                <div key={d.day} className="rounded-xl border border-[var(--border)] bg-[var(--card)]/70 p-3 text-center">
                  <div className="text-lg" aria-hidden>
                    {d.icon}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[var(--text2)]">{d.day}</div>
                  <div className="mt-1 text-xs">
                    <span className="font-semibold text-[var(--accent)]">H{d.high}</span> · <span className="text-[var(--text2)]">L{d.low}</span>
                  </div>
                  {idx === 0 ? <div className="mt-2 h-1 w-full rounded-full bg-[var(--accent)]/25" /> : <div className="mt-2 h-1 w-full rounded-full bg-[var(--accent)]/10" />}
                </div>
              ))}
            </div>
          </section>

          <section className="calligraphy-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--text2)]">NEWS</p>
                <h3 className="mt-2 text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  Headlines, written small
                </h3>
              </div>
              <div className="text-3xl hidden sm:block" aria-hidden>
                📰
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {news.map((n, i) => (
                <div
                  key={n.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/70 p-3"
                  style={{
                    animation: `calligraphy-fade-in .35s ease both`,
                    animationDelay: `${i * 0.03}s`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg" aria-hidden>
                      {n.emoji}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--text2)]">{n.category}</span>
                  </div>
                  <p className="mt-2 text-[0.95rem] leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                    {n.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--text2)]">
                    <span className="font-semibold">{n.source}</span>
                    <span className="opacity-70">·</span>
                    <span>{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`calligraphy-card ${revealStocks ? '' : 'calligraphy-sealed'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--text2)]">STOCKS</p>
                <h3 className="mt-2 text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  Ticker tape, wax sealed
                </h3>
                <p className="mt-2 text-sm text-[var(--text2)]">
                  {revealStocks ? 'Ink has been allowed to flow.' : 'Seal the numbers. Unseal when ready.'}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-transparent"
                onClick={() => setRevealStocks(v => !v)}
              >
                {revealStocks ? 'Re-seal' : 'Unseal'}
              </button>
            </div>

            <div className="relative mt-5 space-y-4">
              {!revealStocks && (
                <div className="calligraphy-reveal-overlay absolute inset-0 flex items-center justify-center bg-[color:rgba(255,255,255,0.02)]">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/85 px-4 py-3 text-center shadow-xl">
                    <div className="text-3xl" aria-hidden>
                      💌
                    </div>
                    <div className="mt-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      Click to reveal stonks
                    </div>
                    <div className="mt-1 text-xs text-[var(--text2)]">No financial advice. Only vibes.</div>
                  </div>
                </div>
              )}

              {stocks.map((s) => {
                const positive = s.changePct >= 0
                const stroke = positive ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)'
                const changeText = `${positive ? '+' : ''}${s.changePct.toFixed(2)}%`
                const fade = revealStocks ? 1 : 0.25

                return (
                  <div
                    key={s.ticker}
                    className="calligraphy-spark"
                    style={{
                      opacity: fade,
                      transition: 'opacity .2s ease',
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                          <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                            {s.ticker}
                          </div>
                          <div className="text-sm text-[var(--text2)] truncate">{s.name}</div>
                        </div>
                        <div className="mt-1 text-sm text-[var(--text2)]">
                          {s.currency}
                          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          <span
                            style={{
                              marginLeft: 10,
                              color: positive ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
                              fontWeight: 800,
                            }}
                          >
                            {changeText}
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:block">
                        <AnimatedSparkline series={s.series} stroke={stroke} shouldAnimate={revealStocks} />
                      </div>
                    </div>

                    <div className="mt-3 h-1 w-full rounded-full" style={{ background: positive ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.16)' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${clamp(30 + Math.abs(s.changePct) * 6, 20, 100)}%`,
                          borderRadius: 999,
                          background: positive ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.45)',
                          transition: 'width .35s ease',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </aside>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-[var(--accent)] bg-[var(--card)] p-6 shadow-2xl"
            style={{
              transform: 'rotate(-0.25deg)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.35)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 10% 10%, rgba(124,45,18,0.35) 0%, transparent 40%), radial-gradient(circle at 80% 35%, rgba(180,83,9,0.22) 0%, transparent 45%), repeating-linear-gradient(180deg, rgba(124,45,18,0.06) 0px, rgba(124,45,18,0.06) 1px, transparent 1px, transparent 14px)',
              }}
            />

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--text2)]">LETTER</p>
                  <h2 className="mt-2 text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <div className="mt-3 text-sm text-[var(--text2)]">
                    {selectedEmail.from.avatar} {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-neutral border border-[var(--border)] bg-transparent text-[var(--text)]"
                  onClick={() => setSelectedEmail(null)}
                >
                  close
                </button>
              </div>

              <div className="mt-5 calligraphy-rail flex items-center gap-3 text-sm text-[var(--text2)]">
                <div className="h-px flex-1 bg-[var(--border)]" aria-hidden />
                <div style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.tag ? selectedEmail.tag.toUpperCase() : 'MAIL'}</div>
                <div className="h-px flex-1 bg-[var(--border)]" aria-hidden />
              </div>

              <pre
                className="mt-6 whitespace-pre-wrap leading-relaxed"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.75,
                }}
              >
                {selectedEmail.body}
              </pre>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedEmail(null)}
                  style={{
                    background: 'linear-gradient(180deg, rgba(124,45,18,0.95) 0%, rgba(180,83,9,0.92) 100%)',
                    borderColor: 'rgba(124,45,18,0.35)',
                  }}
                >
                  Seal & return to inbox
                </button>
                <div className="text-xs text-[var(--text2)]">
                  Tip: you can switch personas anytime.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

