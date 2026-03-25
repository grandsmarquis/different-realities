import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 104
  const h = 32
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

function PinCluster() {
  const rows = [4, 3, 2, 1]
  let n = 0
  return (
    <div className="flex flex-col items-center gap-0.5" aria-hidden>
      {rows.map((count, ri) => (
        <div key={ri} className="flex justify-center gap-1">
          {Array.from({ length: count }, () => {
            const i = n++
            return (
              <svg
                key={i}
                width="14"
                height="28"
                viewBox="0 0 14 28"
                className="bowling-pin-svg drop-shadow-[0_0_5px_rgba(234,88,12,0.35)]"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <defs>
                  <linearGradient id={`pinGrad-${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fffbeb" />
                    <stop offset="45%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#e7e5e4" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#pinGrad-${i})`}
                  stroke="#b45309"
                  strokeWidth="0.5"
                  d="M7 2 C10 2 12 5 11 9 L9 22 C8.5 25 5.5 25 5 22 L3 9 C2 5 4 2 7 2Z"
                />
                <ellipse cx="7" cy="8" rx="3.2" ry="1.4" fill="#b91c1c" opacity="0.95" />
                <ellipse cx="7" cy="24" rx="2.8" ry="1.6" fill="#1c1917" />
              </svg>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function ProBowlingPlayerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="bowling-root relative min-h-dvh overflow-x-hidden pb-10 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(180deg, #1c1917 0%, #422006 22%, #57534e 38%, #3f2e18 52%, #292524 72%, #1c1917 100%)',
      }}
    >
      <style>{`
        @keyframes bowlingLaneMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 120px; }
        }
        @keyframes bowlingNeonPulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.55)) brightness(1); }
          50% { filter: drop-shadow(0 0 14px rgba(234, 88, 12, 0.65)) brightness(1.06); }
        }
        @keyframes bowlingBallRoll {
          0% { transform: translateX(-120%) rotate(0deg); }
          100% { transform: translateX(420%) rotate(720deg); }
        }
        @keyframes bowlingPinWobble {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-1px); }
        }
        @keyframes bowlingTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bowling-lane-bg {
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 14px,
              rgba(251, 191, 36, 0.06) 14px,
              rgba(251, 191, 36, 0.06) 15px
            ),
            linear-gradient(90deg, rgba(28,25,23,0.95) 0%, rgba(120, 53, 15, 0.28) 24%, rgba(87, 83, 78, 0.22) 50%, rgba(120, 53, 15, 0.28) 76%, rgba(28,25,23,0.95) 100%);
          background-size: 100% 100%, 100% 100%;
          animation: bowlingLaneMove 2.8s linear infinite;
        }
        .bowling-title-glow {
          animation: bowlingNeonPulse 3s ease-in-out infinite;
        }
        .bowling-pin-svg {
          animation: bowlingPinWobble 2.2s ease-in-out infinite;
        }
        .bowling-mini-ball {
          animation: bowlingBallRoll 5s ease-in-out infinite;
        }
        .bowling-marquee-inner {
          animation: bowlingTicker 38s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bowling-lane-bg opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[min(72%,520px)] -translate-x-1/2 border-x border-amber-900/35 bg-gradient-to-b from-amber-900/15 via-transparent to-orange-950/20"
        aria-hidden
      />

      <header className="relative z-20 border-b-4 border-amber-900/60 bg-[#3f2e18]/85 px-4 py-4 shadow-[0_10px_36px_rgba(28,25,23,0.55)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="hidden shrink-0 sm:block">
              <PinCluster />
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-200/80">PBA tour · lane desk</p>
              <h1
                className="bowling-title-glow m-0 truncate text-2xl font-black uppercase tracking-tight text-transparent sm:text-4xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(90deg, #fcd34d, #ea580c, #fbbf24, #fde68a, #fcd34d)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Strike lane HQ
              </h1>
              <p className="m-0 mt-1 max-w-xl text-xs text-stone-400">
                Same inbox, weather, tickers &amp; headlines — framed like you just stepped off the approach.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="badge badge-lg border-2 border-amber-800 bg-amber-950/70 font-mono text-amber-100">
              🎳 300 club
            </div>
            <button type="button" className="btn btn-sm border-2 border-amber-950 bg-gradient-to-b from-orange-600 to-amber-800 text-amber-50 shadow-lg shadow-orange-950/40 hover:from-orange-500 hover:to-amber-700" onClick={onSwitchPersona}>
              Gutter exit
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-4 h-10 max-w-md overflow-hidden rounded-full border-2 border-amber-950/50 bg-[#292524]/90">
          <div className="bowling-mini-ball absolute left-0 top-1/2 size-7 -translate-y-1/2 rounded-full bg-gradient-to-br from-stone-900 via-stone-800 to-neutral-950 shadow-[inset_-2px_-2px_4px_rgba(255,237,213,0.12)]" aria-hidden>
            <span className="absolute left-1.5 top-1.5 size-1.5 rounded-full bg-stone-950/90" />
            <span className="absolute left-3 top-2 size-1 rounded-full bg-stone-950/80" />
            <span className="absolute left-2 top-3.5 size-0.5 rounded-full bg-stone-950/70" />
          </div>
          <div className="flex h-full items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-widest text-amber-200/75">
            <span>oil pattern: house</span>
            <span className="text-orange-300/90">rev rate ↑</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stocks.map(s => (
            <div
              key={s.ticker}
              className="card border-2 border-amber-900/40 bg-[#44403c]/60 shadow-[0_4px_20px_rgba(28,25,23,0.45)] backdrop-blur-sm"
            >
              <div className="card-body gap-1 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-amber-200">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-lime-500' : 'text-red-400'}>
                    {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                  </span>
                </div>
                <div className="flex justify-end">
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#84cc16' : '#f87171'} />
                </div>
                <p className="m-0 text-[9px] uppercase tracking-wider text-stone-400">{s.name}</p>
                <p className="m-0 text-[10px] font-mono text-orange-300/85">frame monitor</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="badge badge-sm border border-amber-800 bg-amber-950/50 font-mono text-amber-100">approach</span>
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-orange-300">Message rack</p>
            </div>
            <div className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`card w-full border-l-4 text-left transition-all duration-200 ${
                      on
                        ? 'border-amber-500 bg-amber-950/35 shadow-[0_0_18px_rgba(217,119,6,0.25)]'
                        : 'border-stone-600/50 bg-[#44403c]/50 hover:border-amber-700/70'
                    }`}
                  >
                    <div className="card-body gap-1 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xl">{e.from.avatar}</span>
                        {!e.read && <span className="badge badge-xs border border-orange-800 bg-orange-950/60 font-mono text-orange-100">split risk</span>}
                      </div>
                      <p className={`m-0 line-clamp-2 text-xs ${e.read ? 'text-stone-500' : 'font-bold text-stone-100'}`}>{e.subject}</p>
                      <p className="m-0 text-[10px] font-mono text-stone-500">{e.from.name}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="card border-2 border-dashed border-amber-700/45 bg-[#3f2e18]/70 shadow-inner">
                <div className="card-body relative overflow-hidden p-5 md:p-6">
                  <div className="pointer-events-none absolute -right-4 -top-6 text-[7rem] leading-none opacity-[0.06]" aria-hidden>
                    🎳
                  </div>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-outline border-amber-700/60 font-mono text-[10px] uppercase text-amber-200">delivery: inbox</span>
                      <span className="badge badge-ghost font-mono text-[10px]">{selectedEmail.date}</span>
                    </div>
                    <h2 className="m-0 mt-3 text-xl font-bold leading-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="m-0 mt-2 text-sm font-mono text-orange-300/90">from: {selectedEmail.from.name}</p>
                    <div className="mt-4 max-h-[min(46vh,400px)] overflow-y-auto border-l-4 border-amber-600 pl-4 text-sm leading-relaxed whitespace-pre-wrap text-stone-200/95">
                      {selectedEmail.body}
                    </div>
                    <button type="button" className="btn btn-ghost btn-sm mt-4 font-mono text-amber-300 hover:text-amber-200" onClick={() => setSelectedEmail(null)}>
                      ← spare (clear)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border-2 border-stone-600/40 bg-[#44403c]/40">
                <div className="card-body flex min-h-[240px] flex-col items-center justify-center text-center">
                  <p className="text-5xl">🎳</p>
                  <p className="mt-3 font-bold text-stone-300">Pick a message from the rack — don&apos;t leave a split in your inbox.</p>
                </div>
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-3">
            <div className="card border-2 border-amber-900/50 bg-gradient-to-br from-[#57534e]/90 to-[#422006]/85">
              <div className="card-body items-center p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Road trip forecast</p>
                <p className="text-5xl">{weather.icon}</p>
                <p className="m-0 font-bold">{weather.condition}</p>
                <p className="m-0 text-xs text-stone-300/85">
                  {weather.city} · {weather.temp}° · wind {weather.wind} km/h
                </p>
                <p className="m-0 text-[10px] font-mono text-orange-300/75">pack shoes + towel</p>
              </div>
            </div>

            <div className="card border-2 border-amber-950/40 bg-[#292524]/80">
              <div className="card-body gap-2 p-3">
                <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-amber-200/90">Pro shop TV</p>
                <div className="relative overflow-hidden rounded-md bg-stone-950/40 py-2">
                  <div className="bowling-marquee-inner flex w-max gap-10 whitespace-nowrap pr-10 font-mono text-xs text-stone-300/95">
                    {[...news, ...news].map((n, i) => (
                      <span key={`${n.id}-${i}`}>
                        <span className="text-orange-500">●</span> {n.emoji} {n.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-box border border-amber-900/35 bg-[#3f2e18]/50 p-3 text-center text-[10px] text-stone-400">
              <p className="m-0 font-mono uppercase tracking-widest">tap tempo · release clean · read the breakpoint</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
