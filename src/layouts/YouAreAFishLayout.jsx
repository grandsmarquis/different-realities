import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BUBBLES = [
  { left: '3%', w: 12, delay: 0, dur: 9 },
  { left: '11%', w: 20, delay: 2.1, dur: 11 },
  { left: '24%', w: 9, delay: 4.5, dur: 7 },
  { left: '38%', w: 24, delay: 0.6, dur: 13 },
  { left: '51%', w: 15, delay: 3.2, dur: 10 },
  { left: '64%', w: 11, delay: 5.8, dur: 8 },
  { left: '76%', w: 22, delay: 1.4, dur: 12 },
  { left: '88%', w: 17, delay: 2.9, dur: 10 },
  { left: '17%', w: 7, delay: 6.5, dur: 6 },
  { left: '93%', w: 14, delay: 0.2, dur: 9 },
]

const PLANKTON = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 23) % 100}%`,
  delay: (i * 0.31) % 5,
  dur: 12 + (i % 8),
  size: 2 + (i % 3),
}))

const SCHOOL = [
  { emoji: '🐟', top: '18%', dur: 22, delay: 0, scale: 1 },
  { emoji: '🐠', top: '42%', dur: 28, delay: -4, scale: 0.85 },
  { emoji: '🐡', top: '68%', dur: 35, delay: -9, scale: 0.75 },
  { emoji: '🐟', top: '31%', dur: 26, delay: -12, scale: 0.65 },
]

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
  const pts = series
    .map((v, i) => {
      const x = p + (i / (series.length - 1)) * (w - 2 * p)
      const y = p + (1 - (v - min) / r) * (h - 2 * p)
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.75" points={pts} />
    </svg>
  )
}

function MascotFish() {
  return (
    <svg
      className="fish-mascot-wiggle h-24 w-28 shrink-0 drop-shadow-[0_0_18px_rgba(105,240,174,0.45)] md:h-32 md:w-36"
      viewBox="0 0 120 80"
      aria-hidden
    >
      <defs>
        <linearGradient id="fishBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a65" />
          <stop offset="55%" stopColor="#ff7043" />
          <stop offset="100%" stopColor="#f4511e" />
        </linearGradient>
        <linearGradient id="fishFin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b388ff" />
          <stop offset="100%" stopColor="#7c4dff" />
        </linearGradient>
      </defs>
      <ellipse cx="52" cy="40" rx="38" ry="26" fill="url(#fishBody)" opacity="0.95" />
      <path
        d="M 88 40 L 112 22 L 108 40 L 112 58 Z"
        fill="url(#fishFin)"
        opacity="0.9"
      />
      <path
        d="M 38 22 Q 44 8 52 18"
        fill="none"
        stroke="#ffccbc"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="72" cy="34" r="7" fill="#fffde7" />
      <circle cx="74" cy="32" r="3.5" fill="#263238" />
      <circle cx="75" cy="31" r="1.2" fill="#fff" />
      <path
        d="M 48 52 Q 56 62 64 52"
        fill="none"
        stroke="#bf360c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function YouAreAFishLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="fish-tank-root relative min-h-dvh overflow-x-hidden pb-28 text-cyan-50"
      style={{
        background: `
          radial-gradient(ellipse 100% 60% at 50% -10%, rgba(77, 208, 225, 0.28) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 80% 100%, rgba(124, 77, 255, 0.15) 0%, transparent 45%),
          radial-gradient(ellipse 70% 40% at 10% 90%, rgba(255, 171, 64, 0.08) 0%, transparent 40%),
          linear-gradient(185deg, #0d47a1 0%, #042c4f 25%, #021526 55%, #010b14 100%)`,
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="fish-caustics-shift pointer-events-none fixed inset-0 z-0 opacity-50 mix-blend-screen"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 45% 35% at 30% 20%, rgba(178, 235, 242, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 70% 45%, rgba(128, 222, 234, 0.22) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 55% 75%, rgba(179, 136, 255, 0.18) 0%, transparent 45%)`,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        {PLANKTON.map((p) => (
          <span
            key={p.id}
            className="fish-plankton absolute rounded-full bg-cyan-200/40 shadow-[0_0_6px_rgba(128,222,234,0.6)]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
        {SCHOOL.map((f, i) => (
          <span
            key={i}
            className="fish-school-swim absolute text-2xl opacity-50 md:text-3xl"
            style={{
              top: f.top,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
            }}
          >
            <span className="inline-block" style={{ transform: `scale(${f.scale})` }}>
              {f.emoji}
            </span>
          </span>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[2] h-16 overflow-hidden md:h-20" aria-hidden>
        <svg
          className="fish-surface-wave text-cyan-300/25"
          viewBox="0 0 2400 80"
          preserveAspectRatio="none"
          style={{ width: '200%', minWidth: '200%', height: '100%' }}
        >
          <path
            fill="currentColor"
            d="M0,40 C300,10 500,70 800,40 S1300,10 1600,40 S2100,70 2400,40 L2400,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 z-[1] h-[45%] w-10 md:w-16" aria-hidden>
        <div className="fish-kelp-sway absolute bottom-0 left-2 h-[min(55vh,420px)] w-3 rounded-full bg-gradient-to-t from-emerald-950/90 via-teal-600/50 to-cyan-400/20 blur-[0.5px] md:left-4 md:w-4" />
        <div className="fish-kelp-sway fish-kelp-delay absolute bottom-0 left-6 h-[min(48vh,360px)] w-2.5 rounded-full bg-gradient-to-t from-green-950/80 via-emerald-700/45 to-lime-300/15 md:left-10 md:w-3" />
      </div>
      <div className="pointer-events-none fixed bottom-0 right-0 z-[1] h-[40%] w-10 md:w-16" aria-hidden>
        <div className="fish-kelp-sway fish-kelp-delay-2 absolute bottom-0 right-3 h-[min(50vh,400px)] w-3 rounded-full bg-gradient-to-t from-teal-950/85 via-cyan-700/40 to-teal-200/20 md:right-5 md:w-4" />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-full overflow-hidden" aria-hidden>
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="fish-bubble-rise absolute bottom-0 rounded-full border border-white/25 bg-gradient-to-br from-white/35 to-cyan-400/10 shadow-[inset_-2px_-2px_8px_rgba(255,255,255,0.35)]"
            style={{
              left: b.left,
              width: b.w,
              height: b.w,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="fish-float-drift mb-8 rounded-[2rem] border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-950/80 via-blue-950/70 to-indigo-950/85 p-1 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-md">
          <div className="rounded-[1.85rem] border border-white/10 bg-[var(--glass)] px-4 py-5 md:px-7 md:py-6">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <MascotFish />
                <div className="min-w-0">
                  <p
                    className="m-0 text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-300/90"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Glub-glub command · tank edition
                  </p>
                  <h1
                    className="m-0 mt-1 bg-gradient-to-r from-cyan-200 via-teal-200 to-violet-200 bg-clip-text text-3xl font-extrabold leading-tight text-transparent md:text-5xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    You are a fish
                  </h1>
                  <p className="m-0 mt-2 max-w-xl text-sm font-semibold leading-snug text-cyan-100/90">
                    Same inbox, weather, news &amp; stonks — but you process reality through gills, glitter, and mild
                    confusion.{' '}
                    <span className="text-amber-300">{unread}</span> tasty bits still drifting unread.
                  </p>
                </div>
              </div>
              <button type="button" className="btn btn-outline btn-sm border-cyan-400/50 text-cyan-100 hover:border-amber-300 hover:bg-amber-500/10 hover:text-amber-100" onClick={onSwitchPersona}>
                Swim to surface
              </button>
            </div>
          </div>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-12">
          <div
            className="fish-float-drift rounded-[2rem] border-2 border-sky-400/35 bg-gradient-to-b from-sky-900/50 to-cyan-950/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:col-span-5"
            style={{ animationDelay: '-1.2s' }}
          >
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-300/90" style={{ fontFamily: 'var(--font-display)' }}>
              Lid-light &amp; pressure
            </p>
            <p className="m-0 mt-1 text-xs text-cyan-200/75">What the giants call &ldquo;weather&rdquo; (suspicious)</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-6xl drop-shadow-[0_0_20px_rgba(128,222,234,0.5)]" aria-hidden>
                {weather.icon}
              </span>
              <div>
                <p className="m-0 text-xl font-bold text-cyan-50">{weather.condition}</p>
                <p className="m-0 text-sm font-semibold text-cyan-200/90">{weather.temp}°C at the scary ceiling</p>
              </div>
            </div>
            <p className="m-0 mt-4 rounded-2xl border border-cyan-500/25 bg-black/25 px-3 py-2 text-xs leading-relaxed text-cyan-100/85">
              Bright rectangle above = probably food. Or a bird. Hard to tell. Stay low.
            </p>
          </div>

          <div
            className="fish-float-drift rounded-[2rem] border-2 border-violet-400/35 bg-gradient-to-br from-violet-950/70 via-indigo-950/75 to-slate-950/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] md:col-span-7"
            style={{ animationDelay: '-2.4s' }}
          >
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300/90" style={{ fontFamily: 'var(--font-display)' }}>
              Shiny pebble exchange
            </p>
            <p className="m-0 mt-1 text-xs text-violet-200/70">Numbers humans fight over. Sparkly. Confusing. Fun.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {stocks.map((s) => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-violet-400/20 bg-black/30 px-3 py-2 backdrop-blur-sm"
                >
                  <span className="font-mono text-xs font-bold text-amber-200">{s.ticker}</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#69f0ae' : '#ff8a80'} />
                  <span
                    className={`text-xs font-bold tabular-nums ${s.changePct >= 0 ? 'text-teal-300' : 'text-rose-300'}`}
                  >
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <h2 className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
              <span className="text-2xl" aria-hidden>
                🫧
              </span>
              Plankton-mail (tap a bubble)
            </h2>
            <div className="space-y-4">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                const wobble = !e.read
                return (
                  <div
                    key={e.id}
                    className="fish-float-drift"
                    style={{ animationDelay: `${-i * 0.35}s` }}
                  >
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-[35%_65%_62%_38%_/_42%_45%_55%_58%] border-2 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.015] active:scale-[0.99] ${
                      wobble ? 'fish-tail-wag' : ''
                    } ${on ? 'border-amber-300/70 ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-slate-950' : 'border-cyan-400/25'}`}
                    style={{
                      background: `
                        radial-gradient(ellipse 120% 80% at 20% 30%, rgba(179, 136, 255, 0.18) 0%, transparent 50%),
                        radial-gradient(ellipse 90% 70% at 80% 70%, rgba(77, 208, 225, 0.15) 0%, transparent 45%),
                        linear-gradient(145deg, rgba(13, 71, 161, 0.55) 0%, rgba(2, 27, 58, 0.92) 100%)`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div className="px-5 py-4 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-2xl drop-shadow-md">{e.from.avatar}</span>
                        {!e.read && (
                          <span className="badge border-0 bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-white">
                            NIBBLE ME
                          </span>
                        )}
                        <span className="text-xs font-semibold text-cyan-200/70">{e.time}</span>
                      </div>
                      <p className="m-0 mt-2 text-base font-bold leading-snug text-cyan-50" style={{ fontFamily: 'var(--font-display)' }}>
                        {e.subject}
                      </p>
                      <p className="m-0 text-sm font-semibold text-cyan-200/80">{e.from.name}</p>
                      <p className="m-0 mt-2 line-clamp-2 text-sm text-cyan-100/75">{e.preview}</p>
                      {on && (
                        <div className="fish-news-ripple mt-4 border-t border-cyan-400/20 pt-3">
                          <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-cyan-50/95">{e.body}</p>
                        </div>
                      )}
                    </div>
                  </button>
                  </div>
                )
              })}
            </div>
          </main>

          <aside className="lg:col-span-4">
            <div className="rounded-[2rem] border-2 border-teal-500/40 bg-gradient-to-b from-teal-950/90 to-slate-950/95 p-5 shadow-[0_14px_0_rgba(6,78,59,0.45)]">
              <div className="flex items-center justify-between gap-2">
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-teal-300/90" style={{ fontFamily: 'var(--font-display)' }}>
                  Filter gossip · current events
                </p>
                <span className="text-2xl fish-float-drift" style={{ animationDelay: '-0.5s' }} aria-hidden>
                  📡
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {news.map((n) => (
                  <li
                    key={n.id}
                    className="fish-news-ripple rounded-2xl border border-teal-500/30 bg-cyan-950/50 px-3 py-2.5 text-sm font-semibold leading-snug text-teal-50"
                  >
                    <span className="mr-1.5">{n.emoji}</span>
                    {n.title}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-4 text-center text-xs italic text-teal-300/60">Rumor strength: medium · trust tail: wagging</p>
            </div>

            <div className="mt-8 flex justify-center gap-5 text-4xl opacity-90" aria-hidden>
              <span className="fish-float-drift" style={{ animationDelay: '0s' }}>
                🪸
              </span>
              <span className="fish-float-drift" style={{ animationDelay: '-1s' }}>
                🦑
              </span>
              <span className="fish-float-drift" style={{ animationDelay: '-2s' }}>
                🐚
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
