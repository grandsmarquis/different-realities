import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 80
  const h = 28
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="2" points={pts} />
    </svg>
  )
}

export default function DinosaursStillAliveLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(251, 191, 36, 0.25), transparent 50%),
          radial-gradient(ellipse 60% 40% at 100% 60%, rgba(34, 197, 94, 0.12), transparent 45%),
          linear-gradient(168deg, #0c1912 0%, #14532d 35%, #1a1209 70%, #0f172a 100%)`,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40" aria-hidden>
        <span className="dino-meteor absolute -right-8 top-[12%] block h-0.5 w-[45vw] rotate-[215deg] bg-gradient-to-l from-transparent via-amber-200/80 to-amber-100" />
        <span className="dino-leaf-sway absolute bottom-[8%] left-[3%] text-7xl opacity-30">🌿</span>
        <span className="dino-leaf-sway absolute bottom-[15%] right-[8%] text-6xl opacity-25 [animation-delay:0.7s]">🦕</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-amber-900/50 pb-6">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.35em] text-emerald-400/90">Cretaceous · still here</p>
            <h1 className="dino-amber-glow m-0 mt-2 text-3xl text-amber-50 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              If dinosaurs were still alive
            </h1>
            <p className="m-0 mt-2 max-w-2xl text-sm text-emerald-100/80">
              Mesozoic mail terminal — meteor watch, herd indices, canopy weather, swamp bulletin.{' '}
              <span className="font-bold text-amber-300">{emails.filter(e => !e.read).length}</span> unhatched messages.
            </p>
          </div>
          <button type="button" className="btn btn-warning btn-outline border-amber-600 text-amber-100" onClick={onSwitchPersona}>
            Escape extinction (home)
          </button>
        </header>

        <div className="mb-6 grid gap-3 lg:grid-cols-12">
          <div className="card dino-stomp-card border-2 border-emerald-800/60 bg-emerald-950/50 text-emerald-50 lg:col-span-4">
            <div className="card-body gap-2 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90">Canopy conditions</p>
              <div className="flex items-center gap-3">
                <span className="text-5xl">{weather.icon}</span>
                <div>
                  <p className="m-0 text-lg font-bold">{weather.condition}</p>
                  <p className="m-0 text-sm opacity-80">{weather.temp}°C · {weather.city}</p>
                  <p className="m-0 mt-1 text-xs italic text-emerald-300/70">Pterosaur traffic: moderate</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card dino-stomp-card border-2 border-amber-900/50 bg-amber-950/30 text-amber-50 lg:col-span-8">
            <div className="card-body p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/90">Herd migration indices (stocks)</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-2 rounded-xl border border-amber-800/40 bg-black/30 px-3 py-2">
                    <span className="font-mono text-sm font-bold text-amber-200">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#fb923c'} />
                    <span className={`text-sm font-bold ${s.changePct >= 0 ? 'text-lime-300' : 'text-orange-300'}`}>
                      {s.changePct > 0 ? '+' : ''}{s.changePct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Amber inclusions (inbox)</h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`dino-stomp-card card w-full border-2 text-left transition-all ${on ? 'scale-[1.02] shadow-lg shadow-amber-900/40' : ''}`}
                      style={{
                        borderColor: on ? 'rgba(251, 191, 36, 0.7)' : 'rgba(6, 78, 59, 0.5)',
                        background: on ? 'rgba(20, 83, 45, 0.55)' : 'rgba(6, 40, 25, 0.45)',
                        color: '#ecfdf5',
                      }}
                    >
                      <div className="card-body gap-1 p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{e.from.avatar}</span>
                          {!e.read && <span className="badge badge-warning badge-xs font-bold">FRESH FOSSIL</span>}
                        </div>
                        <p className="m-0 line-clamp-2 text-sm font-semibold leading-snug">{e.subject}</p>
                        <p className="m-0 text-xs opacity-60">{e.from.name}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="card relative overflow-hidden border-2 border-amber-600/50 bg-gradient-to-br from-amber-950/80 to-emerald-950/80 text-amber-50">
                <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 20%, #fbbf24, transparent 55%)' }} aria-hidden />
                <div className="card-body relative z-[1] p-5 md:p-6">
                  <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-emerald-300">Resin-sealed transcript</p>
                  <h3 className="m-0 mt-2 text-xl font-bold leading-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </h3>
                  <p className="m-0 mt-2 text-xs opacity-70">
                    From <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date}
                  </p>
                  <div className="mt-4 max-h-[min(50vh,420px)] overflow-y-auto rounded-lg border border-amber-800/40 bg-black/25 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-700/50 p-8 text-center opacity-70">
                <span className="text-6xl">🥚</span>
                <p className="mt-4 font-bold text-emerald-200">Pick an inclusion to crack it open</p>
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="card border-2 border-emerald-800/50 bg-emerald-950/60 text-emerald-50">
              <div className="card-body gap-3 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Swamp bulletin (news)</p>
                <ul className="space-y-2 text-sm">
                  {news.map(n => (
                    <li key={n.id} className="rounded-lg border border-emerald-800/40 bg-black/20 px-3 py-2 leading-snug">
                      <span className="mr-1">{n.emoji}</span>
                      {n.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
