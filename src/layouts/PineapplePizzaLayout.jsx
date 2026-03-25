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
  const p = 1.5
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

export default function PineapplePizzaLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}
    >
      <div className="pineapple-split-pulse absolute inset-0 flex" aria-hidden>
        <div className="w-1/2 bg-gradient-to-br from-amber-300 via-yellow-400 to-lime-500 opacity-90" />
        <div className="w-1/2 bg-gradient-to-bl from-red-700 via-orange-600 to-rose-800 opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'repeating-conic-gradient(from 0deg, #000 0deg 2deg, transparent 2deg 8deg)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-4 border-base-content/20 bg-base-100/85 p-4 shadow-xl backdrop-blur-md">
          <div>
            <h1 className="m-0 text-2xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              Pineapple on pizza enjoyer
            </h1>
            <p className="m-0 mt-1 text-sm opacity-80">Sweet heat inbox · unapologetic charts</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="pineapple-bob text-4xl" aria-hidden>🍍</span>
            <button type="button" className="btn btn-neutral btn-sm font-bold md:btn-md" onClick={onSwitchPersona}>
              Switch topping
            </button>
          </div>
        </header>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border-2 border-warning/40 bg-base-100/90 p-3 text-center shadow-lg backdrop-blur-sm">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-warning">Team sweet</p>
            <p className="m-0 text-2xl font-black">🍯 YES</p>
          </div>
          <div className="rounded-xl border-2 border-error/50 bg-base-100/90 p-3 text-center shadow-lg backdrop-blur-sm">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-error">Team gatekeep</p>
            <p className="m-0 text-2xl font-black">🍅 NO</p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 bg-base-100/90 p-3 text-center shadow-lg backdrop-blur-sm">
            <p className="m-0 text-xs font-bold uppercase tracking-widest">Unread chaos</p>
            <p className="m-0 text-2xl font-black" style={{ color: 'var(--accent)' }}>{emails.filter(e => !e.read).length}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-12">
          <nav className="xl:col-span-4" aria-label="Inbox slices">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest opacity-70">Slices of mail</h2>
            <ul className="space-y-2">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                const sweet = i % 2 === 0
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`w-full rounded-xl border-2 px-3 py-3 text-left shadow-md transition-transform hover:scale-[1.02] ${on ? 'z-10 scale-[1.02]' : ''}`}
                      style={{
                        borderColor: sweet ? '#ca8a04' : '#b91c1c',
                        background: sweet
                          ? 'linear-gradient(135deg, color-mix(in srgb, #facc15 35%, var(--card)), var(--card))'
                          : 'linear-gradient(135deg, color-mix(in srgb, #f87171 28%, var(--card)), var(--card))',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{sweet ? '🍍' : '🍕'}</span>
                        <span className="text-xl">{e.from.avatar}</span>
                        {!e.read && <span className="badge badge-warning badge-sm">fresh</span>}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm font-bold">{e.subject}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="xl:col-span-5">
            {selectedEmail ? (
              <article className="card border-4 bg-base-100/95 shadow-2xl backdrop-blur-sm" style={{ borderColor: 'var(--accent)' }}>
                <div className="card-body">
                  <h2 className="card-title text-2xl" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                  <p className="text-sm opacity-70">{selectedEmail.from.name} {selectedEmail.from.avatar}</p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</p>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border-4 border-dashed border-base-content/30 bg-base-100/50 p-6 text-center font-bold">
                Pick a slice — we won&apos;t judge (we will celebrate)
              </div>
            )}
          </main>

          <aside className="flex flex-col gap-3 xl:col-span-3">
            <div className="card border-2 border-warning/30 bg-base-100/90 shadow-lg">
              <div className="card-body p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">Oven weather</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{weather.icon}</span>
                  <div>
                    <p className="m-0 font-bold">{weather.temp}° {weather.condition}</p>
                    <p className="m-0 text-xs opacity-70">{weather.city}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-2 border-accent/30 bg-base-100/90 shadow-lg">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">Topping tickers</p>
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-1 text-xs font-semibold">
                    <span>{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#65a30d' : '#dc2626'} />
                    <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card border-2 border-secondary/30 bg-base-100/90 shadow-lg">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">Controversy feed</p>
                <ul className="space-y-2 text-[11px] leading-snug">
                  {news.map(n => (
                    <li key={n.id}>🔥 {n.title}</li>
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
