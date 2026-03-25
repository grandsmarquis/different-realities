import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 74
  const h = 26
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.7" points={pts} />
    </svg>
  )
}

export default function DogLoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: `radial-gradient(circle at 20% 30%, #fef9c3 0%, transparent 45%),
          radial-gradient(circle at 80% 70%, #bae6fd 0%, transparent 40%),
          linear-gradient(165deg, #f0f9ff 0%, #fff7ed 50%, #ecfeff 100%)`,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%230ea5e9' d='M4 16c2 2 6 2 8 0s6-2 8 0'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="dog-ball-bounce text-5xl" aria-hidden>🎾</span>
            <div>
              <h1 className="m-0 text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                Dog lover inbox
              </h1>
              <p className="m-0 mt-1 text-sm opacity-80">
                Good messages only (mostly) · {emails.filter(e => !e.read).length} new sticks to fetch
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-info font-bold text-info-content" onClick={onSwitchPersona}>
            Other human
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <nav className="lg:col-span-4" aria-label="Mail leash">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70">
              <span className="dog-tail-wag inline-block text-lg" aria-hidden>🐕</span> Sniff list
            </h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`card card-side w-full cursor-pointer border-2 shadow-md transition-all hover:-translate-y-0.5 ${on ? 'ring-2 ring-info ring-offset-2' : ''}`}
                      style={{ borderColor: on ? 'var(--accent)' : 'var(--border)', background: 'var(--card)' }}
                    >
                      <figure className="flex w-16 shrink-0 items-center justify-center bg-base-200 text-3xl">🐾</figure>
                      <div className="card-body gap-1 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{e.from.avatar}</span>
                          {!e.read && <span className="badge badge-sm border-0 bg-info text-info-content">wag</span>}
                        </div>
                        <p className="line-clamp-2 text-left text-sm font-bold">{e.subject}</p>
                        <p className="text-left text-xs opacity-60">{e.from.name}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <article className="card border-4 border-info/40 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="text-5xl">{selectedEmail.from.avatar}</span>
                    <div>
                      <h2 className="card-title text-2xl" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                      <p className="text-sm opacity-70">From {selectedEmail.from.name} · {selectedEmail.date}</p>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap rounded-xl bg-base-200/50 p-4 text-sm leading-relaxed">{selectedEmail.body}</div>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-4 border-dashed border-info/40 bg-base-100/60 p-8">
                <span className="text-7xl">🦴</span>
                <p className="mt-4 text-center font-bold" style={{ fontFamily: 'var(--font-display)' }}>Pick a message — tail wags included</p>
              </div>
            )}
          </main>

          <aside className="flex flex-col gap-3 lg:col-span-3">
            <div className="card bg-primary text-primary-content shadow-lg">
              <div className="card-body p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Park weather</p>
                <p className="text-4xl">{weather.icon}</p>
                <p className="font-bold">{weather.condition}</p>
                <p className="text-sm opacity-90">{weather.temp}°C · {weather.city}</p>
              </div>
            </div>
            <div className="card border-2 bg-base-100 shadow" style={{ borderColor: 'var(--accent2)' }}>
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Treat economy (stocks)</p>
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-2 text-xs font-bold">
                    <span>{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#22c55e' : '#f97316'} />
                    <span>{s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card border-2 bg-base-100 shadow" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Neighborhood news</p>
                <ul className="space-y-2 text-[11px] leading-snug">
                  {news.map(n => (
                    <li key={n.id} className="rounded-lg bg-base-200/60 px-2 py-2">{n.emoji} {n.title}</li>
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
