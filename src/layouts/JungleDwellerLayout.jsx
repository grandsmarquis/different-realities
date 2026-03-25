import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function VineBorder({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M4 18C20 6 40 22 60 12s40-4 56 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="text-lime-400/50"
      />
      <ellipse cx="22" cy="10" rx="5" ry="3" fill="currentColor" className="text-emerald-500/40" />
      <ellipse cx="58" cy="14" rx="6" ry="3.5" fill="currentColor" className="text-lime-500/35" />
      <ellipse cx="94" cy="8" rx="5" ry="2.8" fill="currentColor" className="text-emerald-400/40" />
    </svg>
  )
}

function Fireflies() {
  const spots = [
    { t: '12%', l: '8%', d: '0s' },
    { t: '22%', l: '78%', d: '0.4s' },
    { t: '38%', l: '18%', d: '1.1s' },
    { t: '55%', l: '88%', d: '0.2s' },
    { t: '18%', l: '42%', d: '0.8s' },
    { t: '72%', l: '12%', d: '1.4s' },
    { t: '64%', l: '52%', d: '0.6s' },
    { t: '8%', l: '62%', d: '1s' },
    { t: '44%', l: '92%', d: '1.2s' },
    { t: '82%', l: '38%', d: '0.3s' },
    { t: '28%', l: '28%', d: '0.9s' },
    { t: '48%', l: '68%', d: '0.5s' },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {spots.map((s, i) => (
        <span
          key={i}
          className="jungle-firefly absolute size-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_4px_rgba(190,242,100,0.65)]"
          style={{ top: s.t, left: s.l, animationDelay: s.d }}
        />
      ))}
    </div>
  )
}

function FallingLeaves() {
  const leaves = ['🍃', '🌿', '🍂']
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          className="jungle-leaf-fall absolute text-lg opacity-40"
          style={{
            left: `${(i * 7 + 3) % 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${10 + (i % 5)}s`,
          }}
        >
          {leaves[i % 3]}
        </span>
      ))}
    </div>
  )
}

export default function JungleDwellerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="jungle-canopy-bg relative min-h-dvh overflow-x-hidden text-lime-50">
      <div className="jungle-sunbeam pointer-events-none absolute inset-0 opacity-30 mix-blend-screen" aria-hidden />
      <Fireflies />
      <FallingLeaves />

      {/* Side vines */}
      <div className="jungle-vine-sway pointer-events-none absolute -left-1 bottom-0 top-[12%] w-16 text-emerald-400/35 select-none md:w-24" aria-hidden>
        <svg viewBox="0 0 40 400" className="h-full w-full" fill="none">
          <path d="M28 0 Q8 80 32 160 T20 320 T28 400" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="14" cy="90" rx="8" ry="5" fill="currentColor" className="text-lime-600/30" />
          <ellipse cx="30" cy="200" rx="7" ry="4" fill="currentColor" className="text-emerald-600/25" />
        </svg>
      </div>
      <div className="jungle-vine-sway-reverse pointer-events-none absolute -right-1 bottom-0 top-[18%] w-16 scale-x-[-1] text-emerald-400/30 select-none md:w-24" aria-hidden>
        <svg viewBox="0 0 40 400" className="h-full w-full" fill="none">
          <path d="M12 0 Q32 100 10 200 T24 400" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="jungle-mist pointer-events-none absolute inset-x-0 bottom-0 h-32" aria-hidden />

      <header className="relative z-10 px-4 pt-6 md:pt-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
          <div className="jungle-header-pulse max-w-xl rounded-2xl border-2 border-lime-400/35 bg-[var(--card)] px-5 py-4 shadow-[0_0_40px_rgba(34,197,94,0.15)] backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="jungle-parrot-bob text-4xl md:text-5xl" aria-hidden>
                🦜
              </span>
              <div>
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-lime-300/80">Canopy relay · no Wi‑Fi, only vibes</p>
                <h1 className="m-0 text-2xl font-bold text-lime-100 md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Leaf-mail vine
                </h1>
              </div>
            </div>
            <VineBorder className="mt-3 h-6 w-32 text-lime-400/60" />
          </div>
          <div className="flex items-center gap-2">
            <span className="jungle-monkey-peek text-3xl opacity-90" aria-hidden>
              🐒
            </span>
            <button type="button" className="btn btn-sm border-lime-500/40 bg-lime-900/40 text-lime-100 hover:bg-lime-800/50" onClick={onSwitchPersona}>
              Helicopter out
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-lime-300/70">Unfurled for you</p>
            <div className="space-y-3">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                const tilt = (i % 7) * 0.6 - 1.8
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`jungle-leaf-mail group block w-full rounded-br-[2rem] rounded-tl-[2rem] border-2 px-4 py-3 text-left shadow-lg transition-all duration-300 ${
                      on
                        ? 'border-lime-300/70 bg-gradient-to-br from-lime-600/50 to-emerald-900/80 ring-2 ring-amber-400/40 scale-[1.02]'
                        : 'border-emerald-700/50 bg-gradient-to-br from-emerald-950/80 to-green-950/70 hover:border-lime-400/45 hover:scale-[1.01]'
                    }`}
                    style={{ transform: `rotate(${tilt}deg)` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl transition-transform group-hover:scale-110" aria-hidden>
                        🌿
                      </span>
                      {!e.read && <span className="badge badge-warning badge-xs border-0 bg-amber-400 text-amber-950">new rustle</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-xs ${e.read ? 'text-lime-200/65' : 'font-semibold text-lime-50'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-lime-300/55">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-6">
            {selectedEmail ? (
              <div className="jungle-bark-glow relative overflow-hidden rounded-3xl border-4 border-amber-900/50 bg-gradient-to-b from-amber-950/90 via-stone-900/95 to-stone-950 p-6 shadow-[inset_0_0_60px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute -right-8 -top-8 text-7xl opacity-[0.07] select-none" aria-hidden>
                  🪵
                </div>
                <p className="m-0 font-mono text-[10px] text-amber-600/80">Carved receipt · {selectedEmail.date}</p>
                <h2 className="m-0 mt-2 text-xl font-bold text-amber-100 md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="text-sm text-lime-200/80">{selectedEmail.from.name}</p>
                <div className="jungle-ants-march mt-4 max-h-[min(48vh,420px)] overflow-y-auto border-t-2 border-dashed border-amber-800/40 pt-4 text-sm leading-relaxed text-amber-50/95 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
                <p className="mt-4 mb-0 flex items-center gap-2 text-[10px] text-lime-400/50">
                  <span className="jungle-frog-hop inline-block text-lg" aria-hidden>
                    🐸
                  </span>
                  Witnessed by one suspicious frog
                </p>
              </div>
            ) : (
              <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-lime-600/35 bg-emerald-950/40 text-lime-300/50">
                <span className="jungle-parrot-bob text-5xl" aria-hidden>
                  🦥
                </span>
                Pick a leaf — the sloth is patient
              </div>
            )}
          </main>

          <aside className="space-y-5 lg:col-span-3">
            <div className="jungle-weather-drum rounded-2xl border-2 border-sky-400/30 bg-gradient-to-b from-sky-900/85 to-emerald-950/90 p-4 shadow-lg">
              <p className="m-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sky-200/90">
                <span className="inline-block animate-pulse">🥁</span> Sky hole report
              </p>
              <p className="mt-3 text-4xl font-bold">
                {weather.icon} {weather.temp}°C
              </p>
              <p className="text-xs text-sky-100/85">{weather.condition} — the canopy agrees</p>
            </div>

            <div className="rounded-2xl border-2 border-teal-500/25 bg-gradient-to-br from-teal-950/90 to-emerald-950/95 p-4">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-teal-200/80">River stones (markets)</p>
              <p className="mt-1 text-[10px] text-teal-300/55">Smooth numbers. Croaking optional.</p>
              <ul className="mt-3 space-y-2.5">
                {stocks.map((s) => (
                  <li
                    key={s.ticker}
                    className="jungle-stone-tumble flex items-center justify-between gap-2 rounded-full border border-teal-700/40 bg-black/25 px-3 py-2 text-xs"
                  >
                    <span className="font-mono font-bold text-teal-100">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke="#5eead4" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="jungle-campfire-flicker rounded-2xl border-2 border-orange-600/35 bg-gradient-to-b from-stone-900/95 to-orange-950/80 p-4">
              <p className="m-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-200/90">
                <span aria-hidden>🔥</span> Campfire gossip
              </p>
              <ul className="mt-3 space-y-2.5 text-[11px] leading-snug text-orange-50/95">
                {news.map((n) => (
                  <li key={n.id} className="jungle-howler-line flex gap-2 border-l-2 border-orange-500/40 pl-2">
                    <span className="shrink-0">{n.emoji}</span>
                    <span>{n.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
