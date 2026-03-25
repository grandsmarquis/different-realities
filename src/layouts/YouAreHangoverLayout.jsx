import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 90
  const h = 24
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-50">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function YouAreHangoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="hangover-throb relative min-h-dvh overflow-x-hidden bg-[#1c1917] pb-12 text-stone-300">
      <div className="hangover-blinds pointer-events-none fixed inset-0 bg-white" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl px-3 pt-8">
        <header className="mb-8 text-center">
          <span className="text-5xl">🕶️</span>
          <h1 className="m-0 mt-4 text-3xl font-light tracking-wide text-stone-100" style={{ fontFamily: 'var(--font-display)' }}>
            You are hangover
          </h1>
          <p className="m-0 mt-2 text-sm text-stone-500">Brightness lowered. Sound off. Hydrate.</p>
          <button type="button" className="btn btn-ghost btn-sm mt-4 text-stone-500 hover:text-stone-300" onClick={onSwitchPersona}>
            Leave quietly
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <div className="rounded-lg border border-stone-800 bg-stone-900/80 p-4">
              <p className="m-0 text-xs uppercase tracking-widest text-stone-600">Inbox (low contrast on purpose)</p>
              <div className="mt-3 space-y-2">
                {emails.map(e => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="w-full rounded border border-stone-800 bg-stone-950/50 p-3 text-left transition hover:border-stone-700"
                  >
                    <div className="flex gap-3 opacity-90">
                      <span className="text-xl grayscale">{e.from.avatar}</span>
                      <div>
                        <p className={`m-0 text-sm ${e.read ? 'text-stone-500' : 'text-stone-200'}`}>{e.subject}</p>
                        <p className="m-0 text-xs text-stone-600">{e.from.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedEmail && (
              <div className="mt-4 rounded-lg border border-stone-800 bg-stone-900 p-5">
                <h2 className="m-0 text-lg font-normal text-stone-200">{selectedEmail.subject}</h2>
                <p className="m-0 text-xs text-stone-600">{selectedEmail.from.name}</p>
                <div className="mt-4 whitespace-pre-wrap text-sm leading-loose text-stone-400">{selectedEmail.body}</div>
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-lg border border-stone-800 bg-stone-900/60 p-4">
              <p className="m-0 text-xs text-stone-600">Weather (too bright)</p>
              <p className="m-0 mt-2 text-2xl opacity-60">{weather.icon}</p>
              <p className="m-0 text-lg text-stone-400">{weather.temp}°C</p>
              <p className="m-0 text-xs text-stone-600">{weather.condition}</p>
            </div>
            <div className="rounded-lg border border-stone-800 bg-stone-900/60 p-4">
              <p className="m-0 text-xs text-stone-600">Stocks (whisper)</p>
              {stocks.map(s => (
                <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2 text-sm text-stone-500">
                  <span>{s.ticker}</span>
                  <span>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  <MiniSpark series={s.series} stroke="#78716c" />
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-stone-800 bg-stone-900/60 p-3 text-xs leading-relaxed text-stone-600">
              {news.map(n => (
                <p key={n.id} className="m-0 mt-2 first:mt-0">
                  {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
