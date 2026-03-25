import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 24
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

const catTakes = [
  'Possible food announcement',
  'Another human typing event',
  'Numbers that are not treats',
  'Rectangle with secrets',
  'Small angry bird in pocket?',
  'Schedule of naps interrupted',
  'Box not included',
  'Suspicious politeness',
]

export default function CatReadingInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'linear-gradient(165deg, #1e1b4b 0%, #312e81 35%, #4c1d95 70%, #1e1b4b 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="pet-reading-bob absolute text-lg"
            style={{
              left: `${(i * 17) % 92}%`,
              top: `${10 + (i * 23) % 75}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ✨
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 rounded-2xl border-2 border-violet-400/30 bg-base-100/10 p-5 backdrop-blur-md">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.35em] text-violet-200">POV · night shift</p>
            <h1 className="pet-reading-bob m-0 mt-2 text-3xl text-violet-50 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              If a cat was reading the inbox
            </h1>
            <p className="m-0 mt-2 max-w-2xl text-sm text-violet-200/90">
              Hooman labels below — cat verdicts in italics. {emails.filter(e => !e.read).length} unread smell interesting.
            </p>
          </div>
          <button type="button" className="btn btn-sm border-violet-300 bg-violet-950/50 text-violet-100 md:btn-md" onClick={onSwitchPersona}>
            Back to hooman
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            <div className="card border-2 border-violet-400/40 bg-base-100/15 text-violet-50 backdrop-blur-sm">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">Sky rectangle (weather)</p>
                <p className="text-xs italic text-violet-200/80">&ldquo;Bright patch moved. Birds lied again.&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{weather.icon}</span>
                  <div>
                    <p className="m-0 font-bold">{weather.temp}°C — {weather.condition}</p>
                    <p className="m-0 text-xs opacity-80">{weather.city}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {weather.forecast.map(d => (
                    <span key={d.day} className="rounded-md bg-violet-950/40 px-2 py-1 text-[10px]">{d.icon} {d.day}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card border-2 border-violet-400/40 bg-base-100/15 text-violet-50 backdrop-blur-sm">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">Red dot lines (stocks)</p>
                <p className="text-xs italic text-violet-200/80">&ldquo;Tiny wars. Good for staring.&rdquo;</p>
                <ul className="space-y-2">
                  {stocks.map(s => (
                    <li key={s.ticker} className="flex items-center justify-between gap-2 rounded-lg bg-violet-950/30 px-2 py-2 text-xs">
                      <span className="font-mono font-bold">{s.ticker}</span>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#c4b5fd' : '#fda4af'} />
                      <span>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card border-2 border-violet-400/40 bg-base-100/15 text-violet-50 backdrop-blur-sm">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">Tall stories (news)</p>
                <p className="text-xs italic text-violet-200/80">&ldquo;They shout in small boxes.&rdquo;</p>
                <ul className="max-h-48 space-y-2 overflow-y-auto text-[11px] leading-snug">
                  {news.map(n => (
                    <li key={n.id} className="border-l-2 border-violet-400/50 pl-2">{n.emoji} {n.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Vibrating pocket stones (inbox)</h2>
            <div className="space-y-3">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`card w-full border-2 text-left transition-all hover:brightness-110 ${on ? 'brightness-110' : ''}`}
                    style={{
                      borderColor: on ? '#a78bfa' : 'rgba(167, 139, 250, 0.35)',
                      background: on ? 'rgba(76, 29, 149, 0.45)' : 'rgba(30, 27, 75, 0.55)',
                      color: '#ede9fe',
                    }}
                  >
                    <div className="card-body gap-2 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-2xl">{e.from.avatar}</span>
                        {!e.read && <span className="badge badge-sm border-0 bg-violet-400 text-violet-950">sniff-worthy</span>}
                      </div>
                      <p className="m-0 text-xs italic text-violet-300/90">{catTakes[i % catTakes.length]}</p>
                      <p className="m-0 text-sm font-semibold text-violet-50">{e.subject}</p>
                      <p className="m-0 text-xs opacity-70">{e.from.name} · {e.date}</p>
                      {on && (
                        <div className="mt-2 border-t border-violet-500/30 pt-3">
                          <p className="m-0 text-xs uppercase tracking-widest text-violet-400">Hooman translation</p>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">{e.body}</p>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
