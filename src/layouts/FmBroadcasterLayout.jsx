import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 70
  const h = 22
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

function VuMeter({ n = 14 }) {
  return (
    <div className="flex h-14 items-end justify-center gap-0.5 rounded-md border border-amber-900/40 bg-black/60 px-2 py-1" role="presentation">
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="fm-vu-segment block w-1.5 rounded-sm bg-gradient-to-t from-amber-900 to-amber-400"
          style={{ animationDelay: `${i * 0.07}s` }}
        />
      ))}
    </div>
  )
}

export default function FmBroadcasterLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'linear-gradient(165deg, #1c1410 0%, #292018 35%, #1a1510 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="fm-wave-overlay pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-6 rounded-2xl border-2 border-amber-800/50 bg-gradient-to-b from-amber-950/80 to-black/60 p-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-500/90">Studio A · analog soul</p>
              <h1 className="m-0 mt-1 text-3xl font-bold text-amber-100 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                FM broadcaster
              </h1>
              <p className="m-0 mt-2 text-sm text-amber-200/70">Inbox as show segments — RDS weather, market sweep, headline breaks.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="fm-on-air-badge rounded-full border-2 border-red-600 bg-red-600 px-4 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                On air
              </span>
              <p className="m-0 font-mono text-2xl font-bold text-amber-300">101.7 FM</p>
              <button type="button" className="btn btn-sm btn-ghost text-amber-200" onClick={onSwitchPersona}>
                Sign off
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-amber-800/40 bg-black/40 p-3">
              <p className="m-0 text-[10px] font-bold uppercase text-amber-500">Program · weather</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl">{weather.icon}</span>
                <div>
                  <p className="m-0 font-bold">{weather.condition}</p>
                  <p className="m-0 text-xs opacity-70">{weather.temp}° · {weather.city}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-amber-800/40 bg-black/40 p-3">
              <p className="m-0 text-[10px] font-bold uppercase text-amber-500">VU · voice of inbox</p>
              <VuMeter />
            </div>
            <div className="rounded-xl border border-amber-800/40 bg-black/40 p-3">
              <p className="m-0 text-[10px] font-bold uppercase text-amber-500">Dial · market band</p>
              <div className="mt-2 space-y-1">
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-bold text-amber-200">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#f97316'} />
                    <span className={s.changePct >= 0 ? 'text-lime-300' : 'text-orange-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-7">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-600">Runsheet · messages</h2>
            <div className="space-y-3">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`fm-segment-card w-full rounded-xl border-2 text-left transition-all ${on ? 'border-amber-400 bg-amber-950/50 shadow-lg shadow-amber-900/30' : 'border-amber-900/40 bg-black/35 hover:border-amber-700'}`}
                  >
                    <div className="p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-amber-900/80 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-200">
                          SEG {String(e.id).padStart(2, '0')}
                        </span>
                        {!e.read && <span className="badge badge-warning badge-sm font-bold">CUE</span>}
                        <span className="text-xl">{e.from.avatar}</span>
                      </div>
                      <p className="m-0 mt-2 font-bold text-amber-50">{e.subject}</p>
                      <p className="m-0 text-xs text-amber-200/60">{e.from.name}</p>
                      {on && (
                        <div className="fm-rds-scroll mt-4 max-h-[min(40vh,360px)] overflow-y-auto rounded-lg border border-amber-800/50 bg-black/50 p-4 text-sm leading-relaxed whitespace-pre-wrap text-amber-100/90">
                          {e.body}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </main>

          <aside className="lg:col-span-5">
            <div className="sticky top-4 rounded-2xl border-2 border-amber-800/50 bg-gradient-to-br from-amber-950/90 to-black/80 p-4">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-amber-500">News · top of hour</p>
              <ul className="mt-4 space-y-3">
                {news.map((n, i) => (
                  <li key={n.id} className="flex gap-3 rounded-lg border border-amber-900/30 bg-black/30 p-3" style={{ animationDelay: `${i * 0.05}s` }}>
                    <span className="text-2xl">{n.emoji}</span>
                    <div>
                      <p className="m-0 text-sm font-semibold leading-snug">{n.title}</p>
                      <p className="m-0 mt-1 text-[10px] uppercase text-amber-600">{n.source} · {n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center gap-3 opacity-60" aria-hidden>
                <span className="text-3xl fm-deck-reel">📻</span>
                <span className="text-3xl fm-deck-reel [animation-delay:0.15s]">🎙️</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
