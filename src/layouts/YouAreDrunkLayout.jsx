import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 88
  const h = 24
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-80">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function YouAreDrunkLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-gradient-to-b from-violet-950 via-purple-900 to-fuchsia-950 pb-12 text-white">
      <div className="drunk-screen-wobble relative z-10 mx-auto max-w-5xl px-3 pt-6">
        <div className="drunk-spin-slow pointer-events-none absolute -right-8 top-4 text-6xl opacity-40" aria-hidden>
          🍺
        </div>
        <header className="relative mb-6 rounded-2xl border-2 border-fuchsia-400/50 bg-black/30 p-4 backdrop-blur-md">
          <h1 className="m-0 text-center text-3xl font-bold md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            You are drunk
          </h1>
          <p className="m-0 mt-2 text-center text-sm text-fuchsia-200/80">shhh the inbox is spinning beautifully</p>
          <div className="mt-4 flex justify-center">
            <button type="button" className="btn btn-sm border-fuchsia-400 bg-fuchsia-600 text-white hover:bg-fuchsia-500" onClick={onSwitchPersona}>
              I need water (exit)
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-7">
            <div className="space-y-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="m-0 text-center text-xs uppercase tracking-[0.3em] text-yellow-200">Messages (probably important??)</p>
              {emails.map(e => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="w-full rounded-xl border border-white/30 bg-black/20 p-3 text-left text-white/90 backdrop-blur hover:bg-black/30"
                >
                  <span className="text-2xl">{e.from.avatar}</span>
                  <p className="m-0 mt-1 text-base font-semibold">{e.subject}</p>
                  <p className="m-0 text-xs opacity-70">{e.preview.slice(0, 80)}…</p>
                </button>
              ))}
            </div>
          </main>

          <aside className="space-y-4 lg:col-span-5">
            <div className="rounded-2xl border border-cyan-400/40 bg-cyan-950/40 p-4 backdrop-blur">
              <p className="m-0 text-xs text-cyan-200">Outside (who cares)</p>
              <p className="m-0 text-3xl">{weather.icon}</p>
              <p className="m-0 text-xl">{weather.temp}°C</p>
            </div>
            <div className="rounded-2xl border border-lime-400/40 bg-lime-950/30 p-4 backdrop-blur">
              <p className="m-0 text-xs text-lime-200">Numbers go brrr</p>
              {stocks.map(s => (
                <div key={s.ticker} className="mt-2 flex justify-between gap-2 text-sm">
                  <span>{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-lime-300' : 'text-rose-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#a3e635' : '#fda4af'} />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-orange-400/40 bg-orange-950/40 p-4 text-sm backdrop-blur">
              {news.map(n => (
                <p key={n.id} className="m-0 mb-2 last:mb-0">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen opacity-20"
        style={{ transform: 'translate(8px, 4px)', filter: 'blur(6px)' }}
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30" />
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" onClick={() => setSelectedEmail(null)}>
          <div className="drunk-screen-wobble max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-yellow-300 bg-purple-950 p-6" onClick={e => e.stopPropagation()}>
            <h2 className="m-0 text-xl">{selectedEmail.subject}</h2>
            <p className="text-sm opacity-70">{selectedEmail.from.name}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm">{selectedEmail.body}</p>
            <button type="button" className="btn btn-warning btn-sm mt-4" onClick={() => setSelectedEmail(null)}>
              ok ok I read it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
