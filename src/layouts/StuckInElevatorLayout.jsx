import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FLOOR_GLITCH = ['B2', 'B1', 'L', '2', '7', '13', '42', '??', '⌛', '∞', '404']

export default function StuckInElevatorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [floorIdx, setFloorIdx] = useState(3)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setFloorIdx(i => (i + 1) % FLOOR_GLITCH.length)
    }, 900)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="elev-cabin-sway relative min-h-dvh">
      {/* Metal + depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 3px)
          `,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-black/50"
        aria-hidden
      />

      {/* Muzak notes */}
      <div className="pointer-events-none absolute left-[8%] top-16 z-20 flex flex-col gap-6 text-2xl opacity-50" aria-hidden>
        <span className="elev-muzak-note elev-muzak-a">♪</span>
        <span className="elev-muzak-note elev-muzak-b">♫</span>
        <span className="elev-muzak-note elev-muzak-c">♬</span>
      </div>
      <div className="pointer-events-none absolute right-[10%] top-24 z-20 text-xl opacity-40" aria-hidden>
        <span className="elev-muzak-note elev-muzak-b">♩</span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-lg flex-col px-3 pb-16 pt-4 sm:px-4">
        {/* Ceiling light */}
        <div className="elev-ceiling-light mx-auto mb-2 h-3 w-[min(88%,20rem)] rounded-full bg-gradient-to-b from-amber-100/90 to-amber-600/40 shadow-[0_0_24px_rgba(251,191,36,0.45)]" aria-hidden />

        {/* Header / floor display */}
        <header className="elev-panel-frame rounded-2xl border-2 border-[var(--border)] bg-[var(--card)]/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--accent2)]/90">Car 7 · service</p>
              <h1
                className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                YOU ARE HERE
                <span className="text-[var(--accent)]"> (vertically)</span>
              </h1>
              <p className="mt-1 max-w-[14rem] text-xs text-[var(--text2)]">
                Wi-Fi is lying. The bar says full. You are between floors and fully online — somehow.
              </p>
            </div>
            <div className="elev-floor-led flex min-w-[5.5rem] flex-col items-end rounded-lg border border-[var(--accent2)]/40 bg-black/70 px-3 py-2 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <span className="text-[9px] uppercase tracking-widest text-[var(--accent2)]/70">Floor</span>
              <span
                className="elev-led-jitter text-3xl font-bold tabular-nums leading-none text-[var(--accent2)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {FLOOR_GLITCH[floorIdx]}
              </span>
              <span className="mt-1 text-[10px] text-red-400/90">NOT ARRIVING</span>
            </div>
          </div>

          <div className="elev-door-gap mt-4 flex justify-center gap-1" aria-hidden>
            <div className="elev-door-panel h-24 w-[42%] max-w-[11rem] rounded-sm border border-[var(--border)] bg-gradient-to-r from-[#2a241e] to-[#1a1612] shadow-inner" />
            <div className="elev-door-shimmy flex w-2 flex-col justify-center gap-1">
              <div className="h-full w-full rounded-sm bg-gradient-to-b from-cyan-300/80 via-white/90 to-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
            </div>
            <div className="elev-door-panel h-24 w-[42%] max-w-[11rem] rounded-sm border border-[var(--border)] bg-gradient-to-l from-[#2a241e] to-[#1a1612] shadow-inner" />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)]/80 pt-3">
            <div className="flex items-center gap-2 text-xs text-[var(--text2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Emergency link: pretend hold music
            </div>
            <div className="font-mono text-sm tabular-nums text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
              {mm}:{ss} stuck o&apos;clock
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-xs border-[var(--border)] bg-[var(--bg2)] text-[var(--text)] hover:border-[var(--accent)]" disabled>
              Open door (nope)
            </button>
            <button
              type="button"
              className="btn btn-xs btn-primary border-0 bg-[var(--accent)] text-[var(--bg)] hover:bg-amber-400"
              onClick={onSwitchPersona}
            >
              Escape to lobby (home)
            </button>
          </div>
        </header>

        {/* Inbox = intercom */}
        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                INTERCOM_INBOX.sys
              </h2>
              <p className="text-xs text-[var(--text2)]">Tap a line — the building&apos;s only entertainment.</p>
            </div>
            <span className="badge badge-sm border-0 bg-[var(--accent2)]/20 font-mono text-[var(--accent2)]">{emails.length} msgs</span>
          </div>
          <ul className="space-y-2">
            {emails.map((email, i) => (
              <li key={email.id} className="elev-email-row-pop" style={{ animationDelay: `${i * 0.06}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="group relative w-full rounded-xl border border-[var(--border)] bg-[var(--card)]/90 px-3 py-3 text-left shadow-md transition hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] active:scale-[0.99]"
                >
                  <span
                    className="absolute -left-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-[var(--accent2)]/60 opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start gap-2">
                    <span className="text-lg opacity-80" aria-hidden>
                      📟
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[var(--text)]">{email.subject}</p>
                      <p className="mt-0.5 truncate text-xs text-[var(--text2)]">{email.from.name}</p>
                    </div>
                    <span className="badge badge-ghost badge-xs shrink-0 font-mono opacity-70">{email.time}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Weather + stocks */}
        <section className="elev-data-rack mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg2)]/80 p-3 elev-weather-glow">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Shaft-adjacent weather</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl" aria-hidden>
                {weather.icon}
              </span>
              <div>
                <p className="text-2xl font-bold leading-none">{weather.temp}°C</p>
                <p className="text-xs text-[var(--text2)]">
                  {weather.city} · {weather.condition}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--text2)]/90">
                  When those doors finally open, this is what you&apos;ll walk into. Dress mentally.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-black/40 p-3 font-mono elev-stock-scan">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent2)]">LED tickers (coping)</p>
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

        {/* News crawl */}
        <section className="elev-news-shell mt-8 overflow-hidden rounded-xl border border-[var(--accent2)]/30 bg-black/60 py-2 shadow-[inset_0_0_24px_rgba(34,211,238,0.06)]">
          <p className="px-3 pb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent2)]/80">Building news crawl · not helping</p>
          <div className="elev-news-crawl overflow-hidden">
            <div className="elev-news-track flex gap-10 whitespace-nowrap px-3 font-mono text-xs text-[var(--accent2)]/95 sm:text-sm">
              {[...news, ...news].map((n, idx) => (
                <span key={`${n.id}-${idx}`} className="inline-flex items-center gap-2">
                  <span aria-hidden>{n.emoji}</span>
                  {n.title}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Decorative inspection sticker */}
        <div className="elev-sticker-rotate mx-auto mt-10 w-fit rounded border border-dashed border-[var(--text2)]/40 bg-amber-100/10 px-3 py-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text2)]">Passed inspection</p>
          <p className="font-mono text-xs text-[var(--accent)]">Feb 30, 2023</p>
        </div>
      </div>
      </div>

      {selectedEmail && (
        <div
          className="elev-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'color-mix(in srgb, var(--bg) 92%, transparent)' }}
          onClick={() => setSelectedEmail(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="elev-email-title"
        >
          <div
            className="elev-modal-panel max-h-[min(82vh,560px)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--card)] p-5 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[var(--accent2)]">Intercom decode</p>
            <h2 id="elev-email-title" className="mt-2 text-center text-lg font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-5 whitespace-pre-wrap rounded-lg border border-[var(--border)] bg-black/30 p-4 font-sans text-sm leading-relaxed text-[var(--text)]/95">
              {selectedEmail.body}
            </pre>
            <button
              type="button"
              className="btn btn-block mt-6 border-0 bg-[var(--accent2)] text-[var(--bg)] hover:bg-cyan-300"
              onClick={() => setSelectedEmail(null)}
            >
              Roger — close channel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
