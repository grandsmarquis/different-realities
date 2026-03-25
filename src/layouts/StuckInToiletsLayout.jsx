import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function StallDoorGraphic() {
  return (
    <svg
      className="stall-door-creak mx-auto h-28 w-full max-w-xs text-[var(--border)] sm:h-32"
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="8" width="184" height="104" rx="4" fill="var(--card)" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="20" width="160" height="80" rx="2" fill="var(--bg2)" opacity="0.85" />
      <circle cx="168" cy="60" r="5" fill="var(--accent)" opacity="0.9" />
      <path d="M24 100h152" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text x="100" y="48" textAnchor="middle" fill="var(--accent2)" fontSize="11" fontFamily="monospace" opacity="0.7">
        WASH HANDS
      </text>
      <text x="100" y="64" textAnchor="middle" fill="var(--text2)" fontSize="8" fontFamily="monospace">
        (your phone is gross)
      </text>
    </svg>
  )
}

function ToiletPaperRoll() {
  return (
    <svg className="stall-paper-shimmer h-14 w-14 shrink-0 text-[var(--text2)]" viewBox="0 0 48 48" aria-hidden>
      <ellipse cx="24" cy="24" rx="18" ry="20" fill="var(--card)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="24" cy="24" rx="8" ry="9" fill="var(--bg2)" />
      <path
        d="M38 28c2 4 4 10 2 14-4 2-8-2-10-6"
        stroke="var(--text)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />
    </svg>
  )
}

export default function StuckInToiletsLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div
      className="stall-tile-shimmer relative min-h-dvh overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 47px,
            rgba(255,255,255,0.04) 47px,
            rgba(255,255,255,0.04) 48px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 47px,
            rgba(255,255,255,0.04) 47px,
            rgba(255,255,255,0.04) 48px
          ),
          linear-gradient(165deg, var(--bg) 0%, #15282f 55%, #0f1e24 100%)
        `,
      }}
    >
      {/* Warm “single bulb” vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(255,183,77,0.12),transparent_55%)]"
        aria-hidden
      />

      {/* Soap bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="stall-bubble-a absolute left-[6%] bottom-[12%] text-2xl opacity-40">○</span>
        <span className="stall-bubble-b absolute left-[18%] top-[22%] text-xl opacity-35">○</span>
        <span className="stall-bubble-c absolute right-[12%] top-[30%] text-3xl opacity-30">○</span>
        <span className="stall-bubble-b absolute right-[24%] bottom-[20%] text-lg opacity-45">○</span>
        <span className="stall-bubble-a absolute left-[42%] top-[8%] text-sm opacity-50">○</span>
      </div>

      {/* Dripping tap suggestion */}
      <div className="stall-drip-wrap pointer-events-none absolute right-[8%] top-0 z-10 flex flex-col items-center" aria-hidden>
        <div className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-80" />
        <div className="stall-drip-bar mt-1 h-8 w-0.5 rounded-full bg-gradient-to-b from-[var(--accent)]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-lg flex-col px-3 pb-20 pt-4 sm:px-4">
        <header className="relative overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="stall-neon-occupied absolute right-3 top-3 rounded-full border border-[var(--accent2)]/50 bg-black/50 px-2 py-0.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--accent2)]">Occupied</span>
          </div>

          <StallDoorGraphic />

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]">Stall ∞ · no escape plan</p>
              <h1 className="mt-1 text-2xl leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Stuck in the toilets
              </h1>
              <p className="mt-2 max-w-[18rem] text-sm leading-snug text-[var(--text2)]">
                Wi-Fi holds. Dignity doesn&apos;t. Scroll like nobody&apos;s washing their hands next door.
              </p>
            </div>
            <div className="stall-lock-swing flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg2)]/90 px-3 py-2">
              <span className="text-xl" aria-hidden>
                🔒
              </span>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[var(--text2)]">Throne time</p>
                <p className="font-mono text-lg font-bold tabular-nums text-[var(--accent)]">
                  {mm}:{ss}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)]/80 pt-4">
            <span className="stall-plunger-bob text-2xl" aria-hidden>
              🪠
            </span>
            <p className="min-w-0 flex-1 text-xs italic text-[var(--text2)]">
              Pro tip: if someone knocks, cough once and type faster. It&apos;s called stall presence.
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-xs border-[var(--border)] bg-[var(--bg2)] text-[var(--text)]" disabled>
              Flush anxiety (broken)
            </button>
            <button
              type="button"
              className="btn btn-xs border-0 bg-[var(--accent2)] text-[var(--bg)] hover:brightness-110"
              onClick={onSwitchPersona}
            >
              Exit through gift shop (home)
            </button>
          </div>
        </header>

        {/* Inbox = notes under the door */}
        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div className="flex items-start gap-2">
              <ToiletPaperRoll />
              <div>
                <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Slid under the door
                </h2>
                <p className="text-xs text-[var(--text2)]">Tap a scrap — premium bathroom literature.</p>
              </div>
            </div>
            <span className="badge badge-sm border-0 bg-[var(--accent)]/20 font-mono text-[var(--accent)]">
              {emails.length} scraps
            </span>
          </div>
          <ul className="space-y-2">
            {emails.map((email, i) => (
              <li key={email.id} className="stall-email-under-door" style={{ animationDelay: `${i * 0.07}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="group relative w-full rounded-xl border border-slate-300/80 bg-gradient-to-br from-[#f8fafb] to-[#dceef3] px-3 py-3 text-left shadow-md transition hover:shadow-[0_8px_28px_rgba(92,225,230,0.15)] active:scale-[0.99]"
                >
                  <span
                    className="absolute -bottom-1 left-4 h-2 w-8 skew-x-12 rounded-sm bg-black/10 opacity-60"
                    aria-hidden
                  />
                  <div className="flex items-start gap-2">
                    <span className="text-lg" aria-hidden>
                      📨
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-800 group-hover:text-cyan-700">
                        {email.subject}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-600">{email.from.name}</p>
                    </div>
                    <span className="badge badge-ghost badge-xs shrink-0 border-slate-300/60 font-mono text-slate-700">
                      {email.time}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="stall-weather-condense rounded-xl border border-[var(--border)] bg-[var(--bg2)]/85 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Crack under the door</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl" aria-hidden>
                {weather.icon}
              </span>
              <div>
                <p className="text-2xl font-extrabold leading-none">{weather.temp}°C</p>
                <p className="text-xs text-[var(--text2)]">
                  {weather.city} · {weather.condition}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--text2)]">
                  That&apos;s the outside world judging you. It&apos;s partly cloudy with a chance of leaving eventually.
                </p>
              </div>
            </div>
          </div>
          <div className="stall-stock-drip rounded-xl border border-[var(--border)] bg-black/35 p-3 font-mono">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent2)]">Porcelain portfolio</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {stocks.map(s => (
                <li key={s.ticker} className="flex justify-between gap-2 border-b border-white/5 pb-1 last:border-0">
                  <span className="text-[var(--text2)]">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {s.changePct >= 0 ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                    {s.changePct.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* News on unrolling paper */}
        <section className="mt-8 overflow-hidden rounded-2xl border-2 border-dashed border-[var(--accent2)]/40 bg-[#faf8f5] py-3 shadow-inner">
          <div className="flex items-center gap-2 px-3 pb-2">
            <span className="text-lg" aria-hidden>
              📰
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-700">Doodle news · bathroom scroll</p>
          </div>
          <div className="stall-news-unroll overflow-hidden px-1">
            <div className="stall-news-track flex gap-12 whitespace-nowrap px-4 font-mono text-xs text-[#2a4a55] sm:text-sm">
              {[...news, ...news].map((n, idx) => (
                <span key={`${n.id}-${idx}`} className="inline-flex items-center gap-2">
                  <span aria-hidden>{n.emoji}</span>
                  {n.title}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="stall-graffiti-wobble mx-auto mt-10 max-w-sm rounded-lg border-2 border-[var(--accent2)]/60 bg-[var(--card)]/80 px-4 py-3 text-center shadow-lg">
          <p className="text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
            Alex wuz here ⭐
          </p>
          <p className="mt-1 text-[10px] text-[var(--text2)]">(Your portfolio is not financial advice. Neither is this stall.)</p>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="stall-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
          onClick={() => setSelectedEmail(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="stall-email-title"
        >
          <div
            className="stall-modal-panel max-h-[min(82vh,560px)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-b from-[#fefefe] to-[#e8f2f5] p-5 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-center text-[10px] uppercase tracking-[0.35em] text-cyan-700">Unfolded note</p>
            <h2
              id="stall-email-title"
              className="mt-2 text-center text-lg font-bold text-slate-800"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-center text-sm text-slate-600">{selectedEmail.from.name}</p>
            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white/90 p-4 font-sans text-sm leading-relaxed text-slate-800">
              {selectedEmail.body}
            </pre>
            <button
              type="button"
              className="btn btn-block mt-6 border-0 bg-[var(--accent)] text-[var(--bg)] hover:brightness-110"
              onClick={() => setSelectedEmail(null)}
            >
              Okay — shred &amp; flush (close)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
