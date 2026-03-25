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

export default function NflProPlayerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #14532d 28%, #166534 32%, #14532d 36%, #0f172a 55%, #020617 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes nflStripe {
          0% { background-position: 0 0; }
          100% { background-position: 80px 0; }
        }
        @keyframes nflGlow {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .nfl-turf-stripe {
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 0px,
            rgba(255,255,255,0.04) 40px,
            transparent 40px,
            transparent 80px
          );
          animation: nflStripe 3s linear infinite;
        }
        .nfl-scoreboard { animation: nflGlow 2s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none absolute left-0 right-0 top-[120px] h-32 nfl-turf-stripe opacity-40 md:top-[100px]" aria-hidden />

      <div className="relative z-10 border-b-4 border-white/20 bg-slate-900 px-4 py-4 shadow-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="nfl-scoreboard flex items-center gap-4 rounded-lg border-2 border-white/30 bg-black px-4 py-2 font-mono text-white">
            <span className="text-2xl">🏈</span>
            <div>
              <p className="m-0 text-[10px] uppercase tracking-widest text-amber-400">Film session · inbox</p>
              <p className="m-0 text-lg font-black tracking-tight md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                NFL PRO PLAYER
              </p>
            </div>
            <div className="hidden border-l border-white/20 pl-4 text-center sm:block">
              <p className="m-0 text-2xl font-black text-amber-400">Q4</p>
              <p className="m-0 text-[10px] text-slate-400">2:00</p>
            </div>
          </div>
          <button type="button" className="btn btn-sm border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={onSwitchPersona}>
            Trade request (exit)
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-wrap justify-center gap-2 md:gap-4">
          {['20', '30', '40', '50', '40', '30', '20'].map((yd, i) => (
            <span
              key={`${yd}-${i}`}
              className="flex h-12 w-12 items-center justify-center rounded border border-white/25 bg-emerald-950/50 font-mono text-sm font-bold text-white/80 md:h-14 md:w-14 md:text-base"
            >
              {yd}
            </span>
          ))}
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stocks.map(s => (
            <div key={s.ticker} className="rounded border-2 border-white/15 bg-black/50 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-amber-200">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-lime-400' : 'text-rose-400'}>
                  {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                </span>
              </div>
              <div className="mt-1 flex justify-end">
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#fb7185'} />
              </div>
              <p className="m-0 text-[9px] uppercase text-slate-500">{s.name}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-amber-400">Play sheet · messages</p>
            </div>
            <div className="space-y-1.5">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded border-l-4 py-2.5 pl-3 pr-2 text-left transition-colors ${on ? 'border-amber-400 bg-amber-950/40' : 'border-slate-600 bg-slate-900/60 hover:border-slate-400'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-warning badge-xs font-mono">HOT</span>}
                    </div>
                    <p className={`m-0 mt-1 line-clamp-2 font-mono text-xs ${e.read ? 'text-slate-500' : 'font-bold text-white'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-slate-600">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-white/25 bg-slate-950/90 p-5 md:p-6">
                <div className="pointer-events-none absolute right-3 top-3 font-mono text-6xl font-black text-white/[0.04]" aria-hidden>
                  X O
                </div>
                <div className="relative">
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                    <span className="rounded bg-amber-600 px-2 py-0.5 text-black">ROUTE: INBOX</span>
                    <span className="text-slate-500">{selectedEmail.date}</span>
                  </div>
                  <h2 className="m-0 mt-3 text-xl font-bold uppercase tracking-tight text-white md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <p className="m-0 mt-2 font-mono text-xs text-amber-500/90">FROM: {selectedEmail.from.name}</p>
                  <div className="mt-4 max-h-[min(46vh,400px)] overflow-y-auto border-l-4 border-amber-500 pl-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-200">
                    {selectedEmail.body}
                  </div>
                  <button type="button" className="btn btn-ghost btn-sm mt-4 font-mono text-amber-400" onClick={() => setSelectedEmail(null)}>
                    ← AUDIBLE (back)
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-900/50 p-8 text-center">
                <p className="font-mono text-5xl">📋</p>
                <p className="mt-3 font-bold uppercase text-slate-300">Break the huddle — open a play (email).</p>
              </div>
            )}
          </main>

          <aside className="space-y-3 lg:col-span-3">
            <div className="rounded border-2 border-cyan-500/40 bg-slate-900/90 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Stadium conditions</p>
              <p className="text-4xl">{weather.icon}</p>
              <p className="font-bold">{weather.condition}</p>
              <p className="text-xs text-slate-400">
                {weather.city} · {weather.temp}° · wind {weather.wind} (kick factor)
              </p>
            </div>
            <div className="rounded border border-slate-700 bg-black/50 p-3 text-xs">
              <p className="mb-2 font-mono text-[10px] font-bold uppercase text-amber-500">Locker room TV</p>
              {news.slice(0, 4).map(n => (
                <p key={n.id} className="mb-2 border-l-2 border-amber-600 pl-2 leading-snug text-slate-300">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
