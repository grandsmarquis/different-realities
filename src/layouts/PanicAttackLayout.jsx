import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BREATHE_MS = 4000
const PHASES = [
  { label: 'Inhale', sub: '4 slow counts', edge: 'border-t-[var(--accent)]' },
  { label: 'Hold', sub: "you're okay", edge: 'border-r-[var(--accent2)]' },
  { label: 'Exhale', sub: 'let shoulders drop', edge: 'border-b-[var(--accent)]' },
  { label: 'Hold', sub: 'still here', edge: 'border-l-[var(--accent2)]' },
]

export default function PanicAttackLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), BREATHE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="panic-soft-vignette panic-bg-shift relative min-h-dvh overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="panic-blob panic-blob-a absolute -left-16 top-24 h-48 w-48 rounded-full bg-[var(--accent)]/15 blur-2xl" />
        <div className="panic-blob panic-blob-b absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-[var(--accent2)]/20 blur-3xl" />
        <div className="panic-blob panic-blob-c absolute bottom-32 left-1/4 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-2xl" />
      </div>

      {/* Heart + ECG strip */}
      <div className="relative z-10 border-b border-[var(--border)]/60 bg-[var(--card)]/40 backdrop-blur-md">
        <div className="panic-ecg-strip mx-auto max-w-3xl overflow-hidden px-3 pt-3" aria-hidden>
          <svg className="panic-ecg-line h-10 w-full" viewBox="0 0 400 36" preserveAspectRatio="none">
            <path
              d="M0 18 H36 L44 10 L52 26 L60 18 H100 L108 6 L116 30 L124 18 H180 L188 12 L196 24 L204 18 H260 L268 8 L276 28 L284 18 H340 L348 14 L356 22 L364 18 H400"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-6 pt-2 text-center">
          <div className="panic-heart-wrap relative flex items-center justify-center">
            <span className="panic-heart-emoji text-5xl" aria-hidden>🫀</span>
            <span className="panic-heart-ring absolute inline-flex h-24 w-24 rounded-full border-2 border-[var(--accent)]/50" />
          </div>
          <h1
            className="panic-title-wiggle mt-3 text-2xl sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Emergency Calm Protocol™
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text2)]">
            Same inbox. Same weather. Same headlines. Your nervous system just turned the volume up — this page turns it back down (with cartoons).
          </p>
          <button
            type="button"
            className="btn btn-sm btn-ghost mt-3 gap-2 text-[var(--text2)] hover:bg-[var(--accent)]/10 hover:text-[var(--text)]"
            onClick={onSwitchPersona}
          >
            I’m steadier — take me home
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl space-y-10 px-4 py-10">
        {/* Box breathing */}
        <section className="flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Breathe the square</p>
          <div
            className={`panic-breathe-square mt-4 flex h-44 w-44 flex-col items-center justify-center rounded-3xl border-4 border-[var(--border)] bg-[var(--card)]/80 shadow-lg backdrop-blur-sm transition-[box-shadow] duration-500 ${PHASES[phase].edge}`}
            style={{ boxShadow: '0 0 40px color-mix(in srgb, var(--accent) 25%, transparent)' }}
          >
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>{PHASES[phase].label}</span>
            <span className="mt-1 text-center text-xs text-[var(--text2)]">{PHASES[phase].sub}</span>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text2)]">Each side = ~4 seconds. No rush. Loop as long as you need.</p>
        </section>

        {/* 5-4-3-2-1 using real data */}
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)]/50 p-5 backdrop-blur-sm">
          <h2 className="text-center text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            5-4-3-2-1 but make it browser tabs
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--text2)]">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/25 text-base font-bold text-[var(--text)]">5</span>
              <span><strong className="text-[var(--text)]">Subjects</strong> you can name out loud — {emails.length} gentle previews below.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent2)]/25 text-base font-bold text-[var(--text)]">4</span>
              <span>
                <strong className="text-[var(--text)]">Weather facts</strong>: {weather.city} · {weather.temp}°C · {weather.condition} · wind {weather.wind} km/h.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/25 text-base font-bold text-[var(--text)]">3</span>
              <span><strong className="text-[var(--text)]">Headlines</strong> (not homework — just texture).</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent2)]/25 text-base font-bold text-[var(--text)]">2</span>
              <span><strong className="text-[var(--text)]">Tickers</strong> doing ticker things. You don’t have to care right now.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/25 text-base font-bold text-[var(--text)]">1</span>
              <span><strong className="text-[var(--text)]">You</strong>, reading this. That counts. Seriously.</span>
            </li>
          </ul>
        </section>

        {/* Inbox */}
        <section>
          <div className="mb-4 text-center">
            <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>Inbox (probably not a lion)</h2>
            <p className="text-sm text-[var(--text2)]">Hover a card — the wobble stops. Tiny win.</p>
          </div>
          <ul className="space-y-3">
            {emails.map((email, i) => (
              <li key={email.id} className="panic-card-pop" style={{ animationDelay: `${i * 0.07}s` }}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="panic-card-wobble group relative w-full rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 px-4 py-4 text-left shadow-md transition-all hover:z-10 hover:border-[var(--accent)]/50 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
                >
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)]/90 text-xs opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>✉️</span>
                  <p className="pr-6 font-semibold text-[var(--text)]">{email.subject}</p>
                  <p className="mt-1 text-sm text-[var(--text2)]">{email.from.name}</p>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Weather + news + stocks */}
        <section className="space-y-4 rounded-3xl border border-dashed border-[var(--accent2)]/40 bg-[var(--bg2)]/40 p-5">
          <div className="panic-weather-nudge flex flex-wrap items-center justify-center gap-2 text-center text-sm">
            <span className="text-2xl" aria-hidden>{weather.icon}</span>
            <span className="text-[var(--text)]">
              Outside is still doing its job: <strong>{weather.temp}°C</strong>, {weather.condition} in {weather.city}.
            </span>
          </div>
          <div className="panic-news-marquee overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/60 py-2">
            <div className="panic-news-track flex gap-8 whitespace-nowrap px-4 text-sm text-[var(--text2)]">
              {[...news, ...news].map((n, idx) => (
                <span key={`${n.id}-${idx}`} className="inline-flex items-center gap-2">
                  <span aria-hidden>{n.emoji}</span>
                  {n.title}
                </span>
              ))}
            </div>
          </div>
          <div className="panic-stock-pulse flex flex-wrap justify-center gap-2">
            {stocks.map(s => (
              <span
                key={s.ticker}
                className="badge badge-lg border-[var(--border)] bg-[var(--card)] font-mono text-[var(--text)]"
              >
                {s.ticker}{' '}
                <span className={s.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(1)}%
                </span>
              </span>
            ))}
          </div>
        </section>

        <p className="pb-8 text-center text-xs text-[var(--text2)]/80">
          If this is a medical emergency, close the laptop and get real help. This is only a silly skin on fake data. You’re allowed to be not-okay and still be safe.
        </p>
      </div>

      {selectedEmail && (
        <div
          className="panic-modal-fog fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
          onClick={() => setSelectedEmail(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="panic-email-title"
        >
          <div
            className="panic-modal-bounce max-h-[min(80vh,540px)] w-full max-w-lg overflow-y-auto rounded-3xl border-2 border-[var(--accent)]/40 bg-[var(--card)] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-center text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Just text</p>
            <h2 id="panic-email-title" className="mt-3 text-center text-xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--text)]/95">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-block mt-8 border-0 bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent)]/90" onClick={() => setSelectedEmail(null)}>
              Close & breathe again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
