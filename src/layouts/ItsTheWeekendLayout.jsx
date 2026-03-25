import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 100
  const h = 28
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

const confettiColors = ['#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#fb7185']

export default function ItsTheWeekendLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="weekend-disco-lights relative min-h-dvh overflow-x-hidden pb-12"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(165deg, #fef08a 0%, #fda4af 35%, #a78bfa 70%, #38bdf8 100%)',
        color: '#1e1b4b',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-sm opacity-80"
            style={{
              width: 6 + (i % 4) * 2,
              height: 10 + (i % 3) * 2,
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 85}%`,
              background: confettiColors[i % confettiColors.length],
              transform: `rotate(${i * 17}deg)`,
              animation: `pulse ${2 + (i % 5) * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-4 border-dashed border-fuchsia-600 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          <div>
            <p className="m-0 text-sm font-bold uppercase tracking-widest text-fuchsia-600">Out of office</p>
            <h1 className="m-0 text-4xl font-black md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
              It&apos;s the weekend
            </h1>
            <p className="m-0 mt-2 text-lg">Inbox can wait. The sun cannot.</p>
          </div>
          <button type="button" className="btn btn-primary btn-lg rounded-full border-0 bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white shadow-lg" onClick={onSwitchPersona}>
            Monday who?
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-7">
            <div className="rounded-2xl border-4 border-white bg-white/90 p-4 shadow-xl backdrop-blur">
              <h2 className="m-0 text-lg font-bold text-fuchsia-700">Low-priority fun mail</h2>
              <div className="mt-4 space-y-3">
                {emails.map((e, i) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="w-full rounded-xl border-2 border-orange-200 bg-gradient-to-r from-yellow-50 to-pink-50 p-4 text-left shadow-sm transition hover:scale-[1.01] hover:shadow-md"
                    style={{ transform: `rotate(${(i % 3) * 0.5 - 0.5}deg)` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{e.from.avatar}</span>
                      <div>
                        <p className={`m-0 ${e.read ? 'text-base' : 'text-lg font-bold'}`}>{e.subject}</p>
                        <p className="m-0 text-sm opacity-70">{e.from.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </main>

          <aside className="space-y-4 lg:col-span-5">
            <div className="rounded-2xl border-4 border-cyan-300 bg-cyan-50/90 p-4 shadow-lg">
              <p className="m-0 font-bold text-cyan-800">Patio weather</p>
              <p className="m-0 mt-2 text-4xl">{weather.icon}</p>
              <p className="m-0 text-2xl font-bold">{weather.temp}°C</p>
              <p className="m-0 text-sm">{weather.condition}</p>
            </div>

            <div className="rounded-2xl border-4 border-emerald-300 bg-emerald-50/90 p-4 shadow-lg">
              <p className="m-0 font-bold text-emerald-800">Stocks (optional)</p>
              {stocks.map(s => (
                <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2">
                  <span className="font-mono font-bold">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#059669' : '#e11d48'} />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border-4 border-violet-300 bg-violet-50/90 p-4 text-sm shadow-lg">
              <p className="m-0 font-bold text-violet-800">Weekend headlines</p>
              {news.map(n => (
                <p key={n.id} className="m-0 mt-2 rounded-lg bg-white/60 p-2">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-fuchsia-900/40 p-4 backdrop-blur-sm" onClick={() => setSelectedEmail(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border-4 border-white bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="m-0 text-2xl font-bold text-fuchsia-700">{selectedEmail.subject}</h2>
            <p className="text-sm text-gray-600">{selectedEmail.from.name}</p>
            <p className="mt-4 whitespace-pre-wrap">{selectedEmail.body}</p>
            <button type="button" className="btn btn-secondary mt-4 rounded-full" onClick={() => setSelectedEmail(null)}>
              Cheers ✨
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
