import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

import './MisterBeastLayout.css'

function pad2(n) {
  return String(n).padStart(2, '0')
}

function formatCountdown(secondsRemaining) {
  const s = Math.max(0, secondsRemaining)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${pad2(m)}:${pad2(r)}`
}

const CONFETTI_COLORS = [
  'rgba(34, 197, 94, 0.95)',
  'rgba(251, 191, 36, 0.95)',
  'rgba(96, 165, 250, 0.95)',
  'rgba(244, 114, 182, 0.95)',
]

function ConfettiLayer({ seed, enabled }) {
  const pieces = useMemo(() => {
    // Deterministic-ish: seed affects randomness, but we keep it simple & local.
    let x = seed + 1337
    const rand = () => {
      x = (x * 9301 + 49297) % 233280
      return x / 233280
    }

    return Array.from({ length: 34 }).map((_, i) => {
      const left = rand() * 100
      const delay = rand() * 1.2
      const dur = 2.4 + rand() * 2.5
      const dr = (rand() * 2 - 1) * 70
      const rot = rand() * 220 - 110
      const w = 6 + rand() * 9
      const h = w * (1.15 + rand() * 0.6)
      const c = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
      return { left, delay, dur, dr, rot, w, h, c }
    })
  }, [seed])

  if (!enabled) return null

  return (
    <div className="mb-confetti-layer" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="mb-confetti-piece"
          style={{
            '--x': `${p.left}%`,
            '--delay': `${p.delay}s`,
            '--d': `${p.dur}s`,
            '--dr': `${p.dr}px`,
            '--r': `${p.rot}deg`,
            '--w': `${p.w}px`,
            '--h': `${p.h}px`,
            '--c': p.c,
          }}
        />
      ))}
    </div>
  )
}

export default function MisterBeastLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [confettiSeed, setConfettiSeed] = useState(1)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fn = () => setReducedMotion(mq.matches)
    // Defer initial sync to avoid cascading-render lint warnings.
    const t = window.setTimeout(fn, 0)
    mq.addEventListener('change', fn)
    return () => {
      window.clearTimeout(t)
      mq.removeEventListener('change', fn)
    }
  }, [])

  // Static countdown label (CSS bar loops independently).
  const challengeSeconds = 30
  const remainingSeconds = challengeSeconds

  const unread = emails.filter(e => !e.read).length

  return (
    <div className="mb-root pb-28">
      <ConfettiLayer seed={confettiSeed} enabled={!reducedMotion} />

      <div className="mx-auto max-w-7xl px-3 py-6 md:px-6 md:py-10 mb-spot-grid">
        <header className="mb-header px-5 py-6 md:px-10 md:py-8">
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-2 mb-section-title text-sm text-[var(--accent3)]">
                Beast Giveaway Lab
              </p>
              <h1 className="mb-2 text-4xl font-black tracking-wide md:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
                MISTER BEAST MODE
              </h1>
              <p className="m-0 max-w-2xl text-sm text-[var(--text2)] md:text-base">
                Same inbox, weather, headlines &amp; stonks — now dressed as a challenge. Current unread:{' '}
                <span className="font-extrabold text-[var(--accent3)]">{unread}</span>
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className={`mb-countdown ${!reducedMotion ? 'mb-countdown-pulse' : ''}`}>
                <span aria-hidden>⏳</span>
                <span className="mb-count-number">{formatCountdown(remainingSeconds)}</span>
                {!reducedMotion ? <span className="mb-countdown-bar" aria-hidden /> : null}
              </div>

              <div className="flex items-center gap-4">
                <div className="mb-wheel" aria-hidden>
                  <div className="mb-wheel-emoji">🏆</div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <button
                    type="button"
                    className="btn btn-primary border-0 bg-[var(--accent)] text-black font-extrabold shadow-md hover:brightness-110"
                    onClick={() => setConfettiSeed(s => s + 1)}
                  >
                    Start giveaway
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost text-[var(--accent3)] border border-[var(--accent3)]/30"
                    onClick={onSwitchPersona}
                  >
                    Change the challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-7">
            <section className="mb-6">
              <h2 className="mb-4 flex items-center gap-3 text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                <span aria-hidden>📨</span>
                <span className="mb-section-title text-[var(--accent3)]">Challenge Inbox</span>
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {emails.map((email, i) => {
                  const tilt = [-2.2, 1.4, -1.1, 2.2, -0.8, 1.8, -2.0][i % 7]
                  const unreadCard = !email.read
                  return (
                    <button
                      key={email.id}
                      type="button"
                      className={`mb-ticket p-4 hover:no-underline ${unreadCard ? 'mb-ticket-unread' : ''} ${
                        unreadCard && !reducedMotion ? 'mb-ticket-shimmer' : ''
                      }`}
                      style={{ '--rot': `${tilt}deg` }}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-3xl" aria-hidden>
                          {email.from.avatar}
                        </span>
                        <div className="flex items-center gap-2">
                          {email.starred ? (
                            <span className="badge badge-sm border border-[var(--accent3)]/40 bg-[rgba(251,191,36,0.12)] text-[var(--accent3)] font-extrabold">
                              ⭐
                            </span>
                          ) : null}
                          {email.tag ? (
                            <span className="badge badge-sm border border-white/10 bg-white/5 text-white/80 font-extrabold">
                              {email.tag.toUpperCase()}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="m-0 text-xs font-extrabold tracking-widest text-[var(--text2)]">
                          TICKET #{String(email.id).padStart(2, '0')}
                        </p>
                        <p className="mt-2 m-0 text-lg font-black leading-snug" style={{ color: 'var(--text)' }}>
                          {email.subject}
                        </p>
                    <p className="m-0 mt-2 line-clamp-2 text-sm text-[var(--text2)]/90">{email.preview}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white/70">{email.from.name}</span>
                        <span className="text-xs font-extrabold text-[var(--accent3)]">{email.time}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          </main>

          <aside className="lg:col-span-5">
            <div className="grid gap-6">
              <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-xl">
                <h2 className="mb-3 flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <span aria-hidden>🌦️</span>
                  Beast Weather
                </h2>

                <div className="flex items-center gap-4">
                  <div className="flex size-20 items-center justify-center rounded-3xl border border-[var(--accent3)]/25 bg-[rgba(251,191,36,0.12)] shadow-inner">
                    <span className="text-4xl" aria-hidden>
                      {weather.icon}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="m-0 text-4xl font-black" style={{ color: 'var(--accent3)' }}>
                      {weather.temp}°C
                    </p>
                    <p className="m-0 text-base font-extrabold text-white/90">{weather.condition}</p>
                    <p className="m-0 mt-1 text-sm text-[var(--text2)]">
                      {weather.city} · humidity {weather.humidity}% · wind {weather.wind} km/h
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {weather.forecast.slice(0, 5).map((d, idx) => (
                    <div
                      key={`${d.day}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/20 p-2 text-center"
                      style={{
                        boxShadow: unread > 0 ? '0 0 0 1px rgba(34,197,94,0.12)' : undefined,
                      }}
                    >
                      <div className="text-xl" aria-hidden>
                        {d.icon}
                      </div>
                      <div className="text-xs font-extrabold text-white/85">{d.day}</div>
                      <div className="text-[11px] font-bold text-[var(--text2)]">
                        {d.high}°/{d.low}°
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-xl">
                <h2 className="mb-3 flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <span aria-hidden>📰</span>
                  News Roulette
                </h2>

                <div className="space-y-3">
                  {news.slice(0, 5).map((n, i) => {
                    const up = i % 2 === 0
                    return (
                      <div
                        key={n.id}
                        className="rounded-2xl border border-white/10 bg-black/20 p-3"
                        style={{
                          boxShadow: up ? 'inset 0 0 0 1px rgba(251,191,36,0.12)' : 'inset 0 0 0 1px rgba(34,197,94,0.12)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl" aria-hidden>
                              {n.emoji}
                            </span>
                            <div className="min-w-0">
                              <p className="m-0 text-xs font-extrabold uppercase tracking-widest text-white/70">
                                {n.source} · {n.category}
                              </p>
                              <p className="m-0 mt-1 text-sm font-black text-white/95 leading-snug">{n.title}</p>
                            </div>
                          </div>
                          <div className="w-16">
                            <div className="h-1.5 w-full rounded-full bg-white/10" aria-hidden>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${30 + (i * 17) % 70}%`,
                                  background: up ? 'rgba(251,191,36,0.65)' : 'rgba(34,197,94,0.65)',
                                }}
                              />
                            </div>
                            <p className="m-0 mt-2 text-[11px] font-bold text-[var(--text2)]">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-xl">
                <h2 className="mb-3 flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <span aria-hidden>📈</span>
                  Stonk Stunt
                </h2>

                <div className="mb-4 text-sm font-semibold text-white/70">
                  Hover to pause. Click a ticker… just kidding, it’s a read-only stunt.
                </div>

                <div className="mb-stock-marquee">
                  <div className="mb-ticker-track">
                    {[...stocks, ...stocks].map((s, i) => {
                      const up = s.changePct >= 0
                      return (
                        <div
                          key={`${s.ticker}-${i}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2"
                          style={{ minWidth: 210 }}
                        >
                          <div className="shrink-0 text-xl" aria-hidden>
                            {s.ticker === 'AAPL' ? '🍎' : s.ticker === 'NVDA' ? '🎮' : s.ticker === 'BTC' ? '🪙' : '⬛'}
                          </div>
                          <div className="min-w-0">
                            <p className="m-0 font-black text-sm text-white/90">{s.ticker}</p>
                            <p className="m-0 text-[11px] font-bold text-[var(--text2)] line-clamp-1">{s.name}</p>
                          </div>
                          <div className="ml-auto text-right">
                            <div className={`text-xs font-extrabold ${up ? 'text-emerald-300' : 'text-rose-300'}`}>
                              {up ? '+' : ''}
                              {s.changePct.toFixed(2)}%
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                              <MiniSpark series={s.series} stroke={up ? '#86efac' : '#fda4af'} className="opacity-95" />
                              <div className="text-[11px] font-extrabold text-white/80">
                                {s.currency}
                                {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="mb-modal-overlay" onClick={() => setSelectedEmail(null)} role="presentation">
          <div
            className="mb-modal-panel p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mb-email-title"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-3xl border border-[var(--accent3)]/30 bg-[rgba(251,191,36,0.12)]">
                  <span className="text-3xl" aria-hidden>
                    {selectedEmail.from.avatar}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="m-0 text-xs font-extrabold uppercase tracking-widest text-[var(--text2)]">
                    {selectedEmail.from.name} · {selectedEmail.date}
                  </p>
                  <h2 id="mb-email-title" className="mb-1 mt-2 text-2xl font-black text-white/95 mb-modal-h1">
                    {selectedEmail.subject}
                  </h2>
                  {selectedEmail.tag ? (
                    <p className="m-0 text-sm font-bold text-[var(--accent3)]">{selectedEmail.tag.toUpperCase()}</p>
                  ) : null}
                </div>
              </div>

              <button type="button" className="btn btn-ghost text-white/80" onClick={() => setSelectedEmail(null)}>
                Close
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-white/90">{selectedEmail.body}</pre>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                className="btn btn-primary bg-[var(--accent)] border-0 text-black font-extrabold"
                onClick={() => setSelectedEmail(null)}
              >
                Claim the read
              </button>
              <button
                type="button"
                className="btn btn-ghost border border-white/15 text-white/85"
                onClick={() => {
                  setConfettiSeed(s => s + 1)
                  setSelectedEmail(null)
                }}
              >
                BOOM! Send confetti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

