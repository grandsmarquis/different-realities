import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => {
        const seed = (i * 7919 + 17) % 997
        return {
          left: `${(seed * 13) % 100}%`,
          top: `${(seed * 7 + i * 11) % 78}%`,
          delay: `${(seed % 10) * 0.35}s`,
          dur: `${2.5 + (seed % 5) * 0.6}s`,
          size: 1 + (seed % 3),
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="sleep-star absolute rounded-full bg-[var(--accent2)]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: 0.35,
            '--twinkle-dur': s.dur,
            '--twinkle-delay': s.delay,
          }}
        />
      ))}
    </div>
  )
}

function FloatingZzz() {
  return (
    <div className="pointer-events-none absolute -right-2 top-8 flex flex-col items-end gap-0 sm:right-4 sm:top-12" aria-hidden>
      {['Z', 'z', 'z'].map((z, i) => (
        <span
          key={i}
          className="sleep-zzz font-bold text-[var(--accent2)] opacity-90 drop-shadow-[0_0_12px_rgba(253,230,138,0.5)]"
          style={{
            fontSize: `${1.75 - i * 0.35}rem`,
            animationDelay: `${i * 0.45}s`,
          }}
        >
          {z}
        </span>
      ))}
    </div>
  )
}

function SleepyFigure() {
  return (
    <svg
      className="sleep-breathe w-full max-w-[220px] drop-shadow-[0_8px_32px_rgba(167,139,250,0.25)]"
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="100" cy="102" rx="88" ry="14" fill="var(--border)" opacity="0.35" />
      <rect x="28" y="68" width="144" height="28" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <path
        d="M40 72 Q100 52 160 72 L160 92 Q100 78 40 92 Z"
        fill="var(--accent)"
        opacity="0.45"
      />
      <circle cx="78" cy="62" r="18" fill="var(--accent2)" opacity="0.25" />
      <circle cx="78" cy="60" r="14" fill="#fcd9a6" />
      <path d="M72 58 Q76 54 80 58" stroke="#7c5c3a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M74 64 Q78 66 82 64" stroke="#a67c52" strokeWidth="1" strokeLinecap="round" fill="none" />
      <ellipse cx="70" cy="57" rx="2" ry="1" fill="#5c4033" opacity="0.4" />
      <ellipse cx="84" cy="57" rx="2" ry="1" fill="#5c4033" opacity="0.4" />
      <path
        className="sleep-snore-arc"
        d="M96 48 Q108 38 120 48"
        stroke="var(--accent2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}

function Moon() {
  return (
    <div className="sleep-moon-glow relative flex h-28 w-28 shrink-0 items-center justify-center sm:h-36 sm:w-36" aria-hidden>
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fff9e6] via-[#fde68a] to-[#fbbf24] opacity-90"
        style={{ boxShadow: '0 0 60px rgba(253, 230, 138, 0.35), inset -8px -8px 0 rgba(251, 191, 36, 0.35)' }}
      />
      <div className="absolute right-3 top-4 h-10 w-10 rounded-full bg-[var(--bg)] opacity-[0.22]" />
      <div className="absolute right-6 top-8 h-6 w-6 rounded-full bg-[var(--bg)] opacity-[0.18]" />
    </div>
  )
}

export default function SoundAsleepLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="sleep-scene-drift relative min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(167, 139, 250, 0.18) 0%, transparent 55%), radial-gradient(ellipse 70% 40% at 85% 100%, rgba(56, 189, 248, 0.08) 0%, transparent 50%), linear-gradient(175deg, #0c0820 0%, #120a28 35%, #0a0618 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <Starfield />
      <div
        className="sleep-aurora pointer-events-none absolute -left-1/4 bottom-0 h-1/2 w-[150%] opacity-30 blur-3xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.25), transparent)',
        }}
        aria-hidden
      />

      <header className="relative z-10 border-b border-[var(--border)]/50 bg-[var(--bg)]/40 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Moon />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--text2)]">zzz mode</p>
              <h1 className="mt-1 font-extrabold leading-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Shhh… they’re sleeping
              </h1>
              <p className="mt-1 max-w-md text-sm text-[var(--text2)]/90">
                Inbox on snooze. No pings. No guilt. Everything you didn’t read is patiently queued for morning-you.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-lg border-[var(--border)] bg-[var(--card)]/80 text-[var(--accent2)]">do not disturb</span>
            <button type="button" className="btn btn-ghost btn-sm text-[var(--text2)] hover:bg-[var(--accent)]/15" onClick={onSwitchPersona}>
              wake up &amp; leave
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-5">
            <FloatingZzz />
            <div className="flex flex-col items-center lg:items-start">
              <SleepyFigure />
              <p className="mt-4 text-center text-sm italic text-[var(--text2)] lg:text-left">
                Even LinkedIn can wait. The sheep are off duty.
              </p>
            </div>
          </div>

          <section className="lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Inbox — tomorrow’s problem
                </h2>
                <p className="text-xs text-[var(--text2)]">Tap only if you’re sleep-scrolling (we won’t tell).</p>
              </div>
              <span className="badge badge-outline border-[var(--text2)]/40 text-[var(--text2)]">all snoozed</span>
            </div>

            <ul className="space-y-3">
              {emails.map((email, i) => (
                <li key={email.id} className="sleep-mail-row" style={{ animationDelay: `${i * 0.7}s` }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="card card-border w-full border-[var(--border)]/60 bg-[var(--card)]/50 p-4 text-left backdrop-blur-sm transition hover:border-[var(--accent)]/50 hover:bg-[var(--card)]/70"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl opacity-50 grayscale" aria-hidden>
                        {email.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[var(--text)]/85">{email.subject}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]/75">{email.preview}</p>
                      </div>
                      <span className="badge badge-ghost badge-sm shrink-0 text-[var(--accent2)]/90">💤 later</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="sleep-dream-cards mt-12 grid gap-4 sm:grid-cols-3">
          <div className="sleep-cloud-bob card border-[var(--border)]/50 bg-gradient-to-b from-[var(--card)]/60 to-[var(--bg2)]/40 p-4 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent2)]">outside (vaguely)</p>
            <p className="mt-2 text-2xl">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="text-sm text-[var(--text2)]">{weather.condition}</p>
            <p className="mt-2 text-xs italic text-[var(--text2)]/70">heard through the pillow</p>
          </div>

          <div className="sleep-cloud-bob card border-[var(--border)]/50 bg-gradient-to-b from-[var(--card)]/60 to-[var(--bg2)]/40 p-4 backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">headline mist</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/90">
              {news[0]?.emoji} {news[0]?.title}
            </p>
            <p className="mt-3 text-xs text-[var(--text2)]/65">the planet did its thing. you were offline. good.</p>
          </div>

          <div className="sleep-cloud-bob card border-[var(--border)]/50 bg-gradient-to-b from-[var(--card)]/60 to-[var(--bg2)]/40 p-4 backdrop-blur-sm" style={{ animationDelay: '0.8s' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text2)]">numbers in a dream</p>
            <div className="sleep-ticker-drift mt-2 space-y-1 font-mono text-xs text-[var(--text)]/80">
              {stocks.map(s => (
                <p key={s.ticker}>
                  {s.ticker}{' '}
                  <span className={s.changePct >= 0 ? 'text-emerald-400/80' : 'text-rose-400/80'}>
                    {s.changePct >= 0 ? '+' : ''}
                    {s.changePct.toFixed(1)}%
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#05030f]/80 p-5 backdrop-blur-md"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="sleep-modal-dream max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--accent)]/25 bg-[var(--card)]/92 p-6 text-[var(--text)] shadow-[0_0_80px_rgba(167,139,250,0.15)]"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sleep-email-title"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text2)]">half-awake peek</p>
            <h2 id="sleep-email-title" className="mt-3 text-center text-xl font-bold">
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="sleep-modal-body mt-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/88">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-block mt-6 border-0 bg-[var(--accent)] text-[#1e1030] hover:bg-[var(--accent)]/90" onClick={() => setSelectedEmail(null)}>
              tuck in · close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
