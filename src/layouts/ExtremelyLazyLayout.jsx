import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function TvGlowBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="lazy-tv-flicker-bg absolute -left-[20%] top-0 h-full w-[70%] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 90% at 30% 45%, rgba(110, 207, 246, 0.35) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 25% 50%, rgba(240, 180, 41, 0.12) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-2/5 opacity-25"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

function DustSpecks() {
  const motes = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const seed = (i * 5821 + 31) % 1000
        return {
          left: `${(seed * 11) % 100}%`,
          top: `${(seed * 17 + i * 5) % 85}%`,
          delay: `${(seed % 14) * 0.4}s`,
          dur: `${8 + (seed % 6)}s`,
          size: 1 + (seed % 2),
        }
      }),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((m, i) => (
        <span
          key={i}
          className="lazy-dust-mote absolute rounded-full bg-[var(--accent2)]"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            opacity: 0.25,
            '--lazy-dust-dur': m.dur,
            '--lazy-dust-delay': m.delay,
          }}
        />
      ))}
    </div>
  )
}

function CouchPotatoSvg() {
  return (
    <svg
      className="lazy-couch-blob w-full max-w-[260px] drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="120" cy="148" rx="100" ry="10" fill="#1a1510" opacity="0.5" />
      <path
        d="M32 88 Q120 52 208 88 L200 132 Q120 118 40 132 Z"
        fill="#4a3f35"
        stroke="var(--border)"
        strokeWidth="1.2"
      />
      <ellipse cx="120" cy="95" rx="72" ry="38" fill="#5c5046" opacity="0.9" />
      <circle cx="120" cy="82" r="36" fill="#d4a574" />
      <ellipse cx="108" cy="78" rx="4" ry="5" fill="#3d3228" />
      <ellipse cx="132" cy="78" rx="4" ry="5" fill="#3d3228" />
      <path d="M108 92 Q120 98 132 92" stroke="#8b6914" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path
        d="M78 70 Q120 40 162 70 L168 100 Q120 88 72 100 Z"
        fill="#6ecff6"
        opacity="0.35"
      />
      <rect x="95" y="102" width="50" height="22" rx="6" fill="#3d3530" stroke="var(--border)" strokeWidth="1" />
      <text x="104" y="118" fill="var(--accent)" fontSize="11" fontFamily="var(--font-main)" fontWeight="600">
        snacks
      </text>
    </svg>
  )
}

function FloatingRemote() {
  return (
    <div className="lazy-remote-float pointer-events-none absolute -right-2 bottom-24 sm:right-8 sm:bottom-32" aria-hidden>
      <svg width="56" height="88" viewBox="0 0 56 88" fill="none" className="drop-shadow-lg">
        <rect x="8" y="4" width="40" height="80" rx="10" fill="#2a2622" stroke="#5c4d3d" strokeWidth="1.5" />
        <circle cx="28" cy="22" r="8" fill="#1e1a16" stroke="var(--accent2)" strokeWidth="1" opacity="0.6" />
        <rect x="18" y="38" width="6" height="6" rx="1" fill="var(--text2)" opacity="0.5" />
        <rect x="26" y="38" width="6" height="6" rx="1" fill="var(--text2)" opacity="0.5" />
        <rect x="34" y="38" width="6" height="6" rx="1" fill="var(--text2)" opacity="0.5" />
        <rect x="18" y="48" width="6" height="6" rx="1" fill="var(--text2)" opacity="0.5" />
        <rect x="26" y="48" width="6" height="6" rx="1" fill="var(--accent)" opacity="0.7" />
        <rect x="34" y="48" width="6" height="6" rx="1" fill="var(--text2)" opacity="0.5" />
      </svg>
    </div>
  )
}

function SnailRacer() {
  return (
    <div className="lazy-snail-slide pointer-events-none absolute left-0 top-[72px] z-20 text-2xl sm:top-20" aria-hidden>
      🐌
    </div>
  )
}

function CrumbConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="lazy-chip-crumb absolute left-[12%] top-[38%] text-lg opacity-60">🍿</span>
      <span className="lazy-chip-crumb lazy-chip-crumb-delay absolute right-[18%] top-[52%] text-sm opacity-50">🥨</span>
    </div>
  )
}

function MotivationMeter() {
  return (
    <div className="card card-border border-[var(--border)]/70 bg-[var(--card)]/90 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text2)]">motivation</span>
        <span className="lazy-energy-glow text-sm font-bold text-[var(--accent)]">2%</span>
      </div>
      <progress className="progress progress-warning mt-2 h-3 w-full opacity-90" value={2} max={100} />
      <p className="mt-2 text-xs italic text-[var(--text2)]/80">Peak performance is tomorrow. Or never. Both fine.</p>
    </div>
  )
}

export default function ExtremelyLazyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const newsTape = useMemo(() => [...news, ...news].map((n, i) => ({ ...n, key: `${n.id}-${i}` })), [])

  return (
    <div
      className="lazy-scene-sway relative min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 15% 30%, rgba(110, 207, 246, 0.08) 0%, transparent 50%), linear-gradient(168deg, var(--bg2) 0%, var(--bg) 45%, #252018 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <TvGlowBackdrop />
      <DustSpecks />
      <CrumbConfetti />
      <SnailRacer />
      <FloatingRemote />

      <header className="relative z-10 border-b border-[var(--border)]/60 bg-[var(--card)]/35 px-4 py-5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div
              className="lazy-tv-frame relative flex h-24 w-36 shrink-0 items-center justify-center rounded-lg border-4 border-[#3d3530] bg-[#0d0c0b] shadow-[inset_0_0_24px_rgba(110,207,246,0.15),0_8px_32px_rgba(0,0,0,0.5)] sm:h-28 sm:w-44"
              aria-hidden
            >
              <div className="lazy-tv-snow absolute inset-1 rounded-sm bg-gradient-to-b from-[#1a2530] via-[#0f1820] to-[#0a0e12] opacity-90" />
              <span className="relative z-[1] text-center text-[10px] font-semibold leading-tight text-[var(--accent2)]/90 sm:text-xs">
                static
                <br />
                is
                <br />
                content
              </span>
            </div>
            <div className="min-w-0 pt-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent2)]/90">couch potato net</p>
              <h1 className="mt-1 text-2xl font-bold leading-tight text-[var(--text)] sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Maximum chill. Minimum pixels moved.
              </h1>
              <p className="mt-2 max-w-lg text-sm text-[var(--text2)]">
                Your inbox, weather, news, and stocks — delivered at the speed of &quot;I&apos;ll do it after this episode.&quot;
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-lg border-[var(--border)] bg-[var(--bg2)]/90 text-[var(--accent)]">OOO: officially on ottoman</span>
            <button type="button" className="btn btn-ghost btn-sm text-[var(--text2)] hover:bg-[var(--accent2)]/10" onClick={onSwitchPersona}>
              stand up (hard mode)
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative space-y-6 lg:col-span-5">
            <div className="flex flex-col items-center lg:items-start">
              <CouchPotatoSvg />
              <p className="mt-3 text-center text-sm text-[var(--text2)] lg:text-left">
                Posture: defeated. Ambition: loading… <span className="opacity-50">(stuck at 0%)</span>
              </p>
            </div>
            <MotivationMeter />
          </div>

          <section className="lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Inbox (effort optional)
                </h2>
                <p className="text-xs text-[var(--text2)]">Tap if your thumb already went that far. No judgment.</p>
              </div>
              <span className="badge badge-outline border-[var(--text2)]/50 text-[var(--text2)]">meh {emails.length}</span>
            </div>
            <ul className="space-y-3">
              {emails.map((email, i) => (
                <li key={email.id} className="lazy-mail-snail" style={{ animationDelay: `${i * 1.1}s` }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="card card-border group w-full border-[var(--border)]/70 bg-[var(--card)]/75 p-4 text-left backdrop-blur-sm transition hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/90"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl grayscale transition group-hover:grayscale-0" aria-hidden>
                        {email.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[var(--text)]">{email.subject}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                      </div>
                      <span className="badge badge-ghost badge-sm shrink-0 opacity-70">…k</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="lazy-info-row mt-12 grid gap-4 sm:grid-cols-3">
          <div className="card card-border border-[var(--border)]/60 bg-[var(--card)]/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent2)]">outside (?)</p>
            <p className="mt-2 text-2xl font-semibold">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="text-sm text-[var(--text2)]">{weather.condition}</p>
            <p className="mt-2 text-xs italic text-[var(--text2)]/70">Window&apos;s like… over there. You got this (you won&apos;t).</p>
          </div>

          <div className="card card-border border-[var(--border)]/60 bg-[var(--card)]/80 p-4 backdrop-blur-sm sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">news (snail edition)</p>
            <div className="lazy-news-mask relative mt-3 h-14 overflow-hidden rounded-lg border border-[var(--border)]/50 bg-[var(--bg2)]/80">
              <div className="lazy-news-snail-track flex gap-10 whitespace-nowrap py-3 text-sm text-[var(--text)]/95">
                {newsTape.map((n) => (
                  <span key={n.key} className="inline-flex shrink-0 items-center gap-2">
                    <span aria-hidden>{n.emoji}</span>
                    <span>{n.title}</span>
                    <span className="text-[var(--text2)]/60">·</span>
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-[var(--text2)]/75">World keeps spinning. You keep reclining. Balance.</p>
          </div>
        </div>

        <div className="lazy-stonks-drift card card-border mt-4 border-[var(--border)]/60 bg-[var(--card)]/75 p-4 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text2)]">stonks (yawn)</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {stocks.map((s) => (
              <div
                key={s.ticker}
                className="rounded-box border border-[var(--border)]/50 bg-[var(--bg2)]/60 px-3 py-2 font-mono text-xs"
              >
                <span className="font-semibold text-[var(--text)]">{s.ticker}</span>{' '}
                <span className={s.changePct >= 0 ? 'text-success/90' : 'text-error/90'}>
                  {s.changePct >= 0 ? '+' : ''}
                  {s.changePct.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs italic text-[var(--text2)]/65">Numbers happened. You did not have to be involved. Hero.</p>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="lazy-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#0f0c0a]/85 p-5 backdrop-blur-md"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="lazy-modal-settle max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text)] shadow-[0_0_60px_rgba(110,207,246,0.12)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lazy-email-title"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text2)]">fine, you opened it</p>
            <h2 id="lazy-email-title" className="mt-3 text-center text-xl font-bold">
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/90">{selectedEmail.body}</pre>
            <button
              type="button"
              className="btn btn-primary btn-block mt-6 border-0 bg-[var(--accent)] text-[#2c2218] hover:bg-[var(--accent)]/90"
              onClick={() => setSelectedEmail(null)}
            >
              close · resume doing nothing
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
