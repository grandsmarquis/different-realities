import { useContext, useCallback, useState, useRef } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagGig = (t) =>
  ({
    social: 'Fan mail & follows',
    work: 'Office circus',
    finance: 'Money-bag routine',
    dev: 'Tech trickery',
    personal: 'BFF balloon notes',
    shopping: 'Prop shopping',
    travel: 'Tour-bus tabs',
    newsletter: 'Weekly whoopee',
  }[t] || 'Mystery bit')

const BALLOONS = [
  { emoji: '🎈', left: '4%', top: '12%', delay: '0s', dur: '5.2s' },
  { emoji: '🎈', left: '88%', top: '18%', delay: '-1.2s', dur: '4.8s' },
  { emoji: '🎪', left: '12%', top: '72%', delay: '-2s', dur: '6s' },
  { emoji: '🎈', left: '92%', top: '58%', delay: '-0.5s', dur: '5.5s' },
  { emoji: '✨', left: '78%', top: '8%', delay: '-1.8s', dur: '4.2s' },
  { emoji: '🎭', left: '6%', top: '42%', delay: '-2.5s', dur: '5.8s' },
]

function ClownFaceBadge({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="42" r="28" fill="#fff8f0" stroke="var(--accent)" strokeWidth="3" />
      <ellipse cx="28" cy="36" rx="5" ry="7" fill="#1e1b4b" />
      <ellipse cx="52" cy="36" rx="5" ry="7" fill="#1e1b4b" />
      <circle cx="40" cy="48" r="9" fill="#ef4444" />
      <path d="M28 56 Q40 68 52 56" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 22 Q40 8 62 22" stroke="var(--accent2)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="22" cy="18" r="4" fill="#fde047" />
      <circle cx="58" cy="18" r="4" fill="#fde047" />
    </svg>
  )
}

export default function ProfessionalClownLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [honkOn, setHonkOn] = useState(false)
  const honkKey = useRef(0)
  const honkTimeout = useRef(null)

  const honk = useCallback(() => {
    if (honkTimeout.current) window.clearTimeout(honkTimeout.current)
    honkKey.current += 1
    setHonkOn(true)
    honkTimeout.current = window.setTimeout(() => {
      setHonkOn(false)
      honkTimeout.current = null
    }, 950)
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in srgb, var(--accent3) 35%, transparent), transparent 55%),
          radial-gradient(ellipse 80% 50% at 100% 60%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 50%),
          linear-gradient(165deg, var(--bg) 0%, var(--bg2) 45%, var(--bg) 100%)`,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* Polka stage floor */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at center, var(--accent2) 1.5px, transparent 1.5px),
            radial-gradient(circle at center, var(--accent3) 1px, transparent 1px)`,
          backgroundSize: '36px 36px, 22px 22px',
          backgroundPosition: '0 0, 11px 11px',
        }}
      />

      {BALLOONS.map((b, i) => (
        <span
          key={`${b.left}-${i}`}
          className="clown-balloon pointer-events-none fixed z-0 text-3xl opacity-80 sm:text-4xl"
          style={{
            left: b.left,
            top: b.top,
            '--balloon-dur': b.dur,
            animationDelay: b.delay,
          }}
          aria-hidden
        >
          {b.emoji}
        </span>
      ))}

      {honkOn && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center" aria-live="polite">
          <span
            key={honkKey.current}
            className="clown-honk-pop text-6xl font-black sm:text-8xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--accent2)',
              textShadow: '4px 4px 0 var(--accent), -2px -2px 0 var(--accent3)',
            }}
          >
            HONK!
          </span>
        </div>
      )}

      {/* Top marquee */}
      <div
        className="relative z-10 overflow-hidden border-b-4 py-2"
        style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--card) 92%, transparent)' }}
      >
        <div className="clown-marquee flex whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent2)' }}>
          <span className="inline-block px-8">
            BIG SHOES ENERGY · MEMBER #0042 · ASSOCIATION OF PROFESSIONAL CLOWNS · BIG SHOES ENERGY · MEMBER #0042 · ASSOCIATION OF PROFESSIONAL CLOWNS ·
          </span>
          <span className="inline-block px-8" aria-hidden>
            BIG SHOES ENERGY · MEMBER #0042 · ASSOCIATION OF PROFESSIONAL CLOWNS · BIG SHOES ENERGY · MEMBER #0042 · ASSOCIATION OF PROFESSIONAL CLOWNS ·
          </span>
        </div>
      </div>

      <header className="relative z-10 border-b px-4 py-5 sm:px-8" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="clown-bit-wiggle shrink-0" style={{ '--clown-tilt': '-2deg' }}>
              <ClownFaceBadge className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-lg" />
            </div>
            <div>
              <p className="mb-0.5 text-xs font-bold uppercase tracking-[0.35em] opacity-80" style={{ color: 'var(--accent3)' }}>
                GiggleDesk Pro™
              </p>
              <h1
                className="clown-rainbow-text m-0 text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}
              >
                Backstage briefing
              </h1>
              <p className="mt-1 m-0 text-sm opacity-85" style={{ color: 'var(--text2)' }}>
                Same inbox. Different squeaky shoes. {emails.length} routines on today&apos;s call sheet.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-sm gap-1 rounded-full border-0 font-bold shadow-lg"
              style={{ background: 'var(--accent2)', color: '#1e1b4b' }}
              onClick={honk}
            >
              <span className="text-lg" aria-hidden>
                📯
              </span>
              Honk
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost rounded-full border-2 font-semibold"
              style={{ borderColor: 'var(--accent3)', color: 'var(--text)' }}
              onClick={onSwitchPersona}
            >
              Exit stage left
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-7xl min-h-0 flex-1 flex-col gap-4 p-4 pb-8 lg:flex-row lg:gap-5 lg:p-6">
        {/* Routine list */}
        <aside className="card w-full shrink-0 border-2 shadow-xl lg:max-w-sm" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card) 88%, transparent)' }}>
          <div className="card-body gap-3 p-4">
            <h2 className="card-title m-0 text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              Call sheet
            </h2>
            <p className="text-xs opacity-70" style={{ color: 'var(--text2)' }}>
              Tap a bit. Read the punchline. Try not to trip over the cables.
            </p>
            <ul className="menu menu-sm rounded-box gap-1 bg-transparent p-0">
              {emails.map((e, i) => {
                const active = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`clown-bit-wiggle flex flex-col items-start gap-1 rounded-xl border-2 py-3 text-left transition-all hover:scale-[1.02] ${active ? 'shadow-lg' : 'border-transparent opacity-90'}`}
                      style={{
                        borderColor: active ? 'var(--accent2)' : 'transparent',
                        background: active ? 'color-mix(in srgb, var(--accent) 22%, transparent)' : 'color-mix(in srgb, var(--bg2) 40%, transparent)',
                        animationDelay: `${-i * 0.15}s`,
                        '--clown-tilt': `${((i % 3) - 1) * 0.8}deg`,
                      }}
                    >
                      <div className="flex w-full items-center gap-2">
                        <span className="text-xl" aria-hidden>
                          {e.from.avatar || '📧'}
                        </span>
                        {!e.read && (
                          <span className="badge badge-sm border-0 font-bold" style={{ background: 'var(--accent3)', color: '#0f172a' }}>
                            NEW
                          </span>
                        )}
                        <span className="ml-auto text-[10px] uppercase opacity-60">{e.time}</span>
                      </div>
                      <span className="line-clamp-2 w-full font-bold leading-snug" style={{ color: active ? 'var(--text)' : 'var(--text2)' }}>
                        {e.subject}
                      </span>
                      <span className="text-[11px] italic opacity-75">{tagGig(e.tag)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Main reader — spotlight */}
        <main className="card min-h-[320px] flex-1 border-4 shadow-2xl lg:min-h-[480px]" style={{ borderColor: 'var(--accent2)', background: 'color-mix(in srgb, var(--card) 75%, #0f172a)' }}>
          <div className="card-body relative overflow-hidden p-4 sm:p-6">
            {/* Curtain rods */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-between px-2 opacity-40" aria-hidden>
              <div className="h-3 w-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-900" />
              <div className="h-3 w-16 rounded-full bg-gradient-to-r from-amber-900 to-amber-700" />
            </div>
            <div
              className="clown-spotlight-pulse pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[min(100%,520px)] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--accent2) 0%, transparent 70%)' }}
              aria-hidden
            />

            {selectedEmail ? (
              <div className="relative z-[1]">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="badge badge-lg border-0 font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>
                    {tagGig(selectedEmail.tag)}
                  </span>
                  <span className="text-sm opacity-70">{selectedEmail.date}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="mb-4 text-sm" style={{ color: 'var(--text2)' }}>
                  From <strong style={{ color: 'var(--accent3)' }}>{selectedEmail.from.name}</strong> · {selectedEmail.from.email}
                </p>
                <div
                  className="rounded-2xl border-2 p-4 leading-relaxed whitespace-pre-wrap sm:p-6"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'color-mix(in srgb, var(--bg) 65%, transparent)',
                    boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--accent3) 15%, transparent)',
                  }}
                >
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="relative z-[1] flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
                <span className="clown-bit-wiggle text-7xl" style={{ '--clown-tilt': '3deg' }} aria-hidden>
                  🤡
                </span>
                <p className="max-w-sm text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                  Pick a routine from the call sheet!
                </p>
                <p className="max-w-xs text-sm opacity-75" style={{ color: 'var(--text2)' }}>
                  Your messages are standing by in the wings, honking softly.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Side panels */}
        <aside className="flex w-full shrink-0 flex-col gap-4 lg:max-w-xs">
          <div className="card border-2 shadow-lg" style={{ borderColor: 'var(--accent3)', background: 'color-mix(in srgb, var(--card) 90%, transparent)' }}>
            <div className="card-body gap-2 p-4">
              <h3 className="card-title m-0 text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
                Outdoor gig
              </h3>
              <div className="flex items-center gap-3">
                <span className="clown-bit-wiggle text-5xl" style={{ '--clown-tilt': '-4deg' }} aria-hidden>
                  {weather.icon}
                </span>
                <div>
                  <p className="m-0 text-3xl font-bold">{weather.temp}°</p>
                  <p className="m-0 text-sm opacity-80">
                    {weather.city} — {weather.condition}
                  </p>
                  <p className="m-0 text-xs opacity-60">Wind {weather.wind} kph · feels {weather.feels_like}°</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {weather.forecast.slice(0, 5).map((d) => (
                  <div key={d.day} className="badge badge-outline gap-1 border-opacity-40 p-2 font-normal" style={{ borderColor: 'var(--border)' }}>
                    <span>{d.icon}</span>
                    <span className="text-xs">{d.day}</span>
                    <span className="font-bold">{d.high}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-2 shadow-lg" style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--card) 90%, transparent)' }}>
            <div className="card-body gap-3 p-4">
              <h3 className="card-title m-0 text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                Squeezy-horn tickers
              </h3>
              <p className="text-xs opacity-65" style={{ color: 'var(--text2)' }}>
                Wall Street, but make it balloon animals.
              </p>
              {stocks.map((s) => {
                const up = s.changePct >= 0
                return (
                  <div key={s.ticker} className="rounded-xl border border-opacity-30 p-2" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span>{s.ticker}</span>
                      <span style={{ color: up ? '#4ade80' : '#fb7185' }}>
                        {up ? '▲' : '▼'} {Math.abs(s.changePct)}%
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-black/20">
                      <div
                        className="clown-stock-bar h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, 35 + Math.abs(s.changePct) * 12)}%`,
                          background: up
                            ? 'linear-gradient(90deg, var(--accent3), #4ade80)'
                            : 'linear-gradient(90deg, var(--accent), #fb7185)',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card border-2 shadow-lg" style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card) 92%, transparent)' }}>
            <div className="card-body gap-2 p-4">
              <h3 className="card-title m-0 text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                Town crier scroll
              </h3>
              <ul className="space-y-2">
                {news.slice(0, 5).map((n) => (
                  <li
                    key={n.id}
                    className="clown-bit-wiggle flex gap-2 rounded-lg border border-opacity-20 p-2 text-sm"
                    style={{
                      borderColor: 'var(--border)',
                      background: 'color-mix(in srgb, var(--bg2) 35%, transparent)',
                      '--clown-tilt': '0.6deg',
                    }}
                  >
                    <span className="text-lg shrink-0" aria-hidden>
                      {n.emoji}
                    </span>
                    <span className="leading-snug opacity-90">{n.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
