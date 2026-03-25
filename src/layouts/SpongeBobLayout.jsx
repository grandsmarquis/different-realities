import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BUBBLES = [
  { left: '4%', w: 14, delay: 0, dur: 11 },
  { left: '12%', w: 22, delay: 1.2, dur: 13 },
  { left: '22%', w: 10, delay: 3.5, dur: 9 },
  { left: '35%', w: 26, delay: 0.8, dur: 15 },
  { left: '48%', w: 16, delay: 2.4, dur: 12 },
  { left: '58%', w: 20, delay: 4.1, dur: 14 },
  { left: '72%', w: 12, delay: 1.8, dur: 10 },
  { left: '82%', w: 24, delay: 3.2, dur: 16 },
  { left: '92%', w: 18, delay: 0.3, dur: 12 },
  { left: '18%', w: 8, delay: 5.5, dur: 8 },
  { left: '65%', w: 15, delay: 6.2, dur: 11 },
]

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.75" points={pts} />
    </svg>
  )
}

export default function SpongeBobLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="sponge-ocean relative min-h-dvh overflow-x-hidden pb-28 text-cyan-50"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(56, 189, 248, 0.35) 0%, transparent 55%),
          linear-gradient(180deg, #0e7490 0%, #0c4a6e 35%, #155e75 70%, #134e4a 100%)`,
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 sponge-ocean-shimmer opacity-40"
        aria-hidden
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="sponge-bubble absolute bottom-0 rounded-full border border-white/35 bg-gradient-to-br from-white/50 to-white/5 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.5)]"
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

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[1] h-24 overflow-hidden" aria-hidden>
        <svg
          className="sponge-wave-svg absolute bottom-0 min-w-[200%] w-[200%] max-w-none text-[#c9a227]/90"
          viewBox="0 0 2400 100"
          preserveAspectRatio="none"
          style={{ height: '5.5rem' }}
        >
          <defs>
            <linearGradient id="spongeSandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5e6a8" />
              <stop offset="100%" stopColor="#d4a84b" />
            </linearGradient>
          </defs>
          <path
            fill="url(#spongeSandGrad)"
            d="M0,55 C200,25 400,85 600,55 S1000,25 1200,55 S1600,85 1800,55 S2200,25 2400,55 L2400,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none fixed left-0 top-0 z-[1] h-full w-8 bg-gradient-to-r from-emerald-900/25 to-transparent md:w-14" aria-hidden>
        <div className="sponge-kelp-sway absolute bottom-24 left-1 h-48 w-3 rounded-full bg-gradient-to-t from-emerald-800/80 to-emerald-400/40 md:left-3 md:h-64 md:w-4" />
        <div className="sponge-kelp-sway sponge-kelp-delay absolute bottom-32 left-4 h-40 w-2.5 rounded-full bg-gradient-to-t from-teal-900/70 to-teal-300/35 md:left-8 md:h-52" />
      </div>
      <div className="pointer-events-none fixed right-0 top-0 z-[1] h-full w-8 bg-gradient-to-l from-emerald-900/25 to-transparent md:w-14" aria-hidden>
        <div className="sponge-kelp-sway sponge-kelp-delay-2 absolute bottom-28 right-2 h-52 w-3 rounded-full bg-gradient-to-t from-emerald-800/75 to-lime-300/30 md:right-4 md:h-72 md:w-4" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="sponge-sign-wobble mb-8 rounded-2xl border-4 border-amber-900/80 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 p-1 shadow-[0_8px_0_rgba(69,26,3,0.85),inset_0_2px_0_rgba(255,255,255,0.15)]">
          <div
            className="rounded-xl px-4 py-5 md:px-6"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.06) 8px, rgba(0,0,0,0.06) 9px),
                linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%)`,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p
                  className="m-0 text-xs font-bold uppercase tracking-[0.35em] text-amber-200/90"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Order up · Parody portal
                </p>
                <h1
                  className="m-0 mt-1 text-3xl font-bold leading-tight text-yellow-300 drop-shadow-[0_2px_0_#78350f] md:text-5xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    textShadow: '2px 2px 0 #92400e, -1px -1px 0 #fde68a',
                  }}
                >
                  Undersea shift board
                </h1>
                <p className="m-0 mt-2 max-w-xl text-sm font-semibold text-amber-100/95">
                  Mail, sky juice, hot goss &amp; treasure graphs — all in one bubbly view.{' '}
                  <span className="text-yellow-200">{unread}</span> messages still sizzlin&apos; on the grill.
                </p>
              </div>
              <button
                type="button"
                className="btn border-2 border-amber-950 bg-yellow-300 font-bold text-amber-950 shadow-[3px_3px_0_#451a03] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-200 hover:shadow-[2px_2px_0_#451a03]"
                onClick={onSwitchPersona}
              >
                Surface (home)
              </button>
            </div>
          </div>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-12">
          <div
            className="sponge-jellyfish-bob rounded-3xl border-4 border-pink-400/70 p-4 shadow-[6px_6px_0_rgba(131,24,67,0.35)] md:col-span-4"
            style={{
              background: 'linear-gradient(160deg, #fbcfe8 0%, #f9a8d4 45%, #ec4899 100%)',
            }}
          >
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-pink-950/80">Jellyfish fields · Weather</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-5xl drop-shadow-md" aria-hidden>
                {weather.icon}
              </span>
              <div>
                <p className="m-0 text-lg font-bold text-pink-950">{weather.condition}</p>
                <p className="m-0 text-sm font-semibold text-pink-900/90">{weather.temp}°C — perfect for jellyfishing!</p>
              </div>
            </div>
            <p className="m-0 mt-3 rounded-2xl border-2 border-pink-900/20 bg-white/50 px-3 py-2 text-xs font-semibold text-pink-950">
              Don&apos;t forget your net… and your inbox.
            </p>
          </div>

          <div
            className="rounded-3xl border-4 border-cyan-300/50 bg-gradient-to-br from-cyan-900/90 to-teal-950/95 p-4 shadow-[6px_6px_0_rgba(8,47,73,0.5)] md:col-span-8"
            style={{
              backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(34,211,238,0.12) 0%, transparent 45%),
                linear-gradient(145deg, rgba(8,145,178,0.5) 0%, rgba(15,118,110,0.85) 100%)`,
            }}
          >
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-cyan-200/90">Krusty krab · Stock menu</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {stocks.map(s => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between gap-2 rounded-2xl border-2 border-cyan-400/30 bg-cyan-950/40 px-2 py-2 backdrop-blur-sm"
                >
                  <span className="font-mono text-xs font-bold text-yellow-200">{s.ticker}</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#fb7185'} />
                  <span className={`text-xs font-bold tabular-nums ${s.changePct >= 0 ? 'text-green-300' : 'text-rose-300'}`}>
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </div>
              ))}
            </div>
            <p className="m-0 mt-2 text-center text-lg" aria-hidden>
              🍔💰
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-yellow-200">
              <span className="text-2xl" aria-hidden>
                🧽
              </span>
              Sponge-mail (tap a bubble)
            </h2>
            <div className="space-y-4">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                const wobble = !e.read
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`sponge-mail-card w-full rounded-[1.75rem] border-[3px] border-amber-800/90 text-left shadow-[5px_8px_0_rgba(120,53,15,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99] ${wobble ? 'sponge-unread-wobble' : ''} ${on ? 'ring-4 ring-pink-400 ring-offset-2 ring-offset-cyan-900' : ''}`}
                    style={{
                      backgroundColor: '#f5d547',
                      backgroundImage: `
                        radial-gradient(circle at 18% 22%, rgba(180,83,9,0.22) 0%, rgba(180,83,9,0.22) 4px, transparent 4.5px),
                        radial-gradient(circle at 62% 38%, rgba(146,64,14,0.2) 0%, rgba(146,64,14,0.2) 3px, transparent 3.5px),
                        radial-gradient(circle at 40% 72%, rgba(120,53,15,0.18) 0%, rgba(120,53,15,0.18) 5px, transparent 5.5px),
                        radial-gradient(circle at 82% 65%, rgba(180,83,9,0.2) 0%, rgba(180,83,9,0.2) 3.5px, transparent 4px),
                        radial-gradient(circle at 28% 55%, rgba(146,64,14,0.16) 0%, rgba(146,64,14,0.16) 2.5px, transparent 3px),
                        linear-gradient(145deg, #fde68a 0%, #f5d547 50%, #eab308 100%)`,
                    }}
                  >
                    <div className="px-5 py-4 text-left text-amber-950">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-2xl drop-shadow-sm">{e.from.avatar}</span>
                        {!e.read && (
                          <span className="badge border-2 border-amber-900 bg-rose-500 font-bold text-white">NEW!</span>
                        )}
                        <span className="text-xs font-semibold opacity-80">{e.time}</span>
                      </div>
                      <p className="m-0 mt-2 font-bold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {e.subject}
                      </p>
                      <p className="m-0 text-sm font-semibold text-amber-900/85">{e.from.name}</p>
                      {on && (
                        <div className="mt-4 border-t-2 border-dashed border-amber-800/40 pt-3">
                          <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-amber-950/95">{e.body}</p>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </main>

          <aside className="lg:col-span-4">
            <div
              className="rounded-[2rem] border-4 border-teal-600 bg-gradient-to-b from-teal-800 to-cyan-950 p-1 shadow-[0_10px_0_rgba(6,78,59,0.6)]"
              style={{
                backgroundImage: 'linear-gradient(180deg, #115e59 0%, #0f766e 30%, #134e4a 100%)',
              }}
            >
              <div className="rounded-[1.6rem] border-2 border-teal-400/40 bg-teal-950/50 px-4 py-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-teal-200/90">Shell phone scroll</p>
                  <span className="text-2xl sponge-jellyfish-bob" aria-hidden>
                    🐚
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {news.map(n => (
                    <li
                      key={n.id}
                      className="rounded-2xl border-2 border-teal-500/35 bg-cyan-950/60 px-3 py-2.5 text-sm font-semibold leading-snug text-teal-50 shadow-inner"
                    >
                      <span className="mr-1.5">{n.emoji}</span>
                      {n.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4 text-4xl opacity-90" aria-hidden>
              <span className="sponge-jellyfish-bob">⭐</span>
              <span className="sponge-jellyfish-bob sponge-kelp-delay" style={{ animationDelay: '-0.7s' }}>
                🦑
              </span>
              <span className="sponge-jellyfish-bob sponge-kelp-delay-2" style={{ animationDelay: '-1.2s' }}>
                🍍
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
