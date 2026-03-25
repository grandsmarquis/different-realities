import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TOTAL_SECONDS = 10 * 60
const RING_R = 52
const RING_C = 2 * Math.PI * RING_R

const bucketItems = [
  'Tell someone they matter',
  'Delete that draft you fear',
  'Look at the sky (or this emoji: 🌅)',
  'Pretend stocks are meaningful',
]

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function MiniSparkline({ series, positive }) {
  const pts = useMemo(() => {
    const slice = series.slice(-12)
    if (slice.length < 2) return ''
    const min = Math.min(...slice)
    const max = Math.max(...slice)
    const range = max - min || 1
    return slice
      .map((v, i) => {
        const x = (i / (slice.length - 1)) * 100
        const y = 100 - ((v - min) / range) * 100
        return `${x},${y}`
      })
      .join(' ')
  }, [series])
  return (
    <svg viewBox="0 0 100 100" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={positive ? '#86efac' : '#fca5a5'}
        points={pts}
      />
    </svg>
  )
}

export default function TenMinutesToLiveLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)
  const [burst, setBurst] = useState(false)
  const [lives, setLives] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s === 0) {
          setLives((n) => n + 1)
          return TOTAL_SECONDS
        }
        const next = s - 1
        if (next === 0) {
          setBurst(true)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!burst) return
    const t = setTimeout(() => setBurst(false), 2200)
    return () => clearTimeout(t)
  }, [burst])

  const ringOffset = RING_C * (1 - secondsLeft / TOTAL_SECONDS)
  const urgent = secondsLeft <= 60
  const panic = secondsLeft <= 10

  return (
    <div
      className="tm2l-sky relative min-h-screen overflow-x-hidden pb-8"
      style={{
        background: 'linear-gradient(160deg, #2d0a1e 0%, #5c1a3a 28%, #c2410c 55%, #fbbf24 78%, #fef3c7 100%)',
        backgroundSize: '400% 400%',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      {/* Floating “soul” particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {['💌', '✨', '⭐', '🦋', '💭', '🎈'].map((emoji, i) => (
          <span
            key={i}
            className="tm2l-particle absolute text-lg opacity-60"
            style={{
              left: `${12 + i * 14}%`,
              bottom: '-5%',
              animationDelay: `${i * 2.1}s`,
              animationDuration: `${14 + i * 2}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Plot twist overlay */}
      {burst && (
        <div
          className="tm2l-burst-enter fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-neutral-950/90 px-6 text-center text-neutral-100 backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <p className="font-[family-name:var(--font-display)] text-5xl tracking-wide text-[#fda4af] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-6xl">
            PLOT TWIST
          </p>
          <p className="max-w-md text-lg text-neutral-100">You respawned. Time is a flat circle. Your unread count is eternal.</p>
          <p className="text-sm text-neutral-400">Extra lives used: {lives}</p>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              Terminal urgency (demo)
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl leading-none tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] sm:text-6xl">
              10 MINUTES
              <br />
              <span className="text-[#ffe4ec] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">TO LIVE</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Same weather, news, stocks, and inbox — framed like the finale of a very dramatic TV show. The clock loops forever; your only real enemy is
              the algorithm.
            </p>
            <button
              type="button"
              className="btn btn-sm btn-outline mt-4 border-white/50 bg-black/15 text-white hover:border-white hover:bg-black/25"
              onClick={onSwitchPersona}
            >
              Choose a calmer timeline
            </button>
          </div>

          {/* Countdown ring */}
          <div className="tm2l-timer-pulse flex flex-col items-center gap-2 self-center lg:self-start">
            <div className="relative flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r={RING_R} fill="none" className="stroke-white/35" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r={RING_R}
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={
                    panic
                      ? 'stroke-[#f87171] drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                      : urgent
                        ? 'stroke-[#fbbf24]'
                        : 'stroke-[#fda4af]'
                  }
                  style={{
                    strokeDasharray: RING_C,
                    strokeDashoffset: ringOffset,
                    transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease',
                  }}
                />
              </svg>
              <div className="relative text-center">
                <p
                  className={`font-[family-name:var(--font-display)] text-5xl tabular-nums text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-6xl ${panic ? 'tm2l-digit-wobble' : ''}`}
                >
                  {formatTime(secondsLeft)}
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">remaining</p>
              </div>
            </div>
            <p className="max-w-[14rem] text-center text-[11px] leading-snug text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]">
              {panic
                ? 'Okay okay breathe — it resets at zero. We are not actually ominous.'
                : urgent
                  ? 'Final lap energy. Scroll responsibly.'
                  : 'Plenty of time to overthink that email subject line.'}
            </p>
          </div>
        </header>

        {/* Fake EKG */}
        <div className="tm2l-ekg-wrap mb-8 h-8 w-full overflow-hidden rounded-md border border-white/25 bg-black/20">
          <svg className="tm2l-ekg h-full w-[200%]" viewBox="0 0 800 40" preserveAspectRatio="none" aria-hidden>
            <path
              d="M0 20 H80 L90 20 L95 8 L100 32 L105 8 L110 20 H200 L210 20 L215 12 L220 28 L225 12 L230 20 H400 L410 20 L415 10 L420 30 L425 10 L430 20 H600 L610 20 L615 14 L620 26 L625 14 L630 20 H800"
              fill="none"
              stroke="#fda4af"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Bucket list */}
        <div className="tm2l-card-enter mb-8 rounded-2xl border border-white/30 bg-black/25 p-4 backdrop-blur-sm sm:p-5">
          <p className="font-[family-name:var(--font-display)] text-xl tracking-wide text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            BUCKET LIST — SPEEDRUN
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {bucketItems.map((item, i) => (
              <li
                key={item}
                className="tm2l-card-enter flex items-center gap-2 rounded-lg bg-black/25 px-3 py-2 text-sm text-[#fff8f0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <span className="text-lg">✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inbox */}
          <section
            className="tm2l-card-enter card border-white/15 bg-[#2a1420]/95 shadow-xl backdrop-blur-sm"
            style={{ animationDelay: '0.08s', color: 'var(--text)' }}
          >
            <div className="card-body gap-3 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#fda4af]">LAST INBOX RAID</h2>
                <span className="badge border-[#fda4af]/50 bg-[#fda4af]/15 text-[#fda4af]">{emails.filter((e) => !e.read).length} unread</span>
              </div>
              <ul className="space-y-2">
                {emails.map((email, i) => (
                  <li key={email.id} className="tm2l-row-pop" style={{ animationDelay: `${0.04 * i}s` }}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(email)}
                      className="flex w-full items-start gap-3 rounded-xl border border-[#4c1d2e] bg-[#1a0a12]/90 p-3 text-left text-[var(--text)] transition hover:border-[#fda4af]/50 hover:shadow-[0_0_20px_rgba(251,113,133,0.2)]"
                    >
                      <span className="text-2xl">{email.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-sm text-[var(--text)] ${email.read ? 'font-medium opacity-80' : 'font-bold'}`}>{email.subject}</p>
                        <p className="truncate text-xs text-[var(--text2)]">{email.preview}</p>
                      </div>
                      {!email.read && (
                        <span className="badge badge-sm shrink-0 border-[#f87171]/40 bg-[#f87171]/20 text-[#fecaca]">now</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Weather + stocks */}
          <div className="flex flex-col gap-6">
            <section
              className="tm2l-card-enter card border-white/15 bg-[#2a1420]/95 shadow-xl backdrop-blur-sm"
              style={{ animationDelay: '0.12s', color: 'var(--text)' }}
            >
              <div className="card-body p-5 sm:p-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#fb7185]">ONE LAST GLANCE OUTSIDE</h2>
                <div className="mt-4 flex flex-wrap items-end gap-4">
                  <span className="text-7xl drop-shadow-lg">{weather.icon}</span>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--text)]">{weather.temp}°</p>
                    <p className="text-sm text-[var(--text2)]">
                      {weather.city} · {weather.condition}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text2)]">Wind {weather.wind} km/h — statistically irrelevant to your countdown</p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="tm2l-card-enter card border-white/15 bg-[#2a1420]/95 shadow-xl backdrop-blur-sm"
              style={{ animationDelay: '0.16s', color: 'var(--text)' }}
            >
              <div className="card-body p-5 sm:p-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#fbbf24]">NUMBERS YOU CAN’T CASH OUT</h2>
                <ul className="mt-3 space-y-3">
                  {stocks.map((s) => (
                    <li key={s.ticker} className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">{s.ticker}</span>
                        <span className={s.changePct >= 0 ? 'text-[#86efac]' : 'text-[#fca5a5]'}>
                          {s.changePct >= 0 ? '+' : ''}
                          {s.changePct.toFixed(2)}%
                        </span>
                      </div>
                      <MiniSparkline series={s.series} positive={s.changePct >= 0} />
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text2)]">
                        {s.currency}
                        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })} — peak fiction
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* News ticker */}
        <section className="tm2l-card-enter mt-6 rounded-2xl border border-white/20 bg-black/45 py-3 backdrop-blur-md" style={{ animationDelay: '0.2s' }}>
          <p className="mb-2 px-4 font-[family-name:var(--font-display)] text-lg tracking-widest text-[#fda4af] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            HEADLINES BEFORE THE CREDITS ROLL
          </p>
          <div className="overflow-hidden">
            <div className="tm2l-marquee flex w-max gap-10 whitespace-nowrap px-4">
              {[...news, ...news].map((n, i) => (
                <span key={`${n.id}-${i}`} className="inline-flex shrink-0 items-center gap-2 text-sm text-neutral-100">
                  <span>{n.emoji}</span>
                  <span className="font-medium">{n.title}</span>
                  <span className="text-neutral-400">· {n.source}</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setSelectedEmail(null)}>
          <div
            className="tm2l-modal-pop max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-[#fda4af] bg-[#2a1420] p-6 shadow-2xl"
            style={{ color: 'var(--text)' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tm2l-subject"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#fda4af]">Message from beyond the scroll</p>
            <h2 id="tm2l-subject" className="mt-2 text-xl font-bold text-[var(--text)]">
              {selectedEmail.subject}
            </h2>
            <p className="text-sm text-[var(--text2)]">
              {selectedEmail.from.avatar} {selectedEmail.from.name} · {selectedEmail.date}
            </p>
            <pre className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">{selectedEmail.body}</pre>
            <button
              type="button"
              className="btn btn-block mt-6 border-0 bg-[#fda4af] text-[#1a0a12] hover:bg-[#fb7185]"
              onClick={() => setSelectedEmail(null)}
            >
              Close & seize the minute
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
