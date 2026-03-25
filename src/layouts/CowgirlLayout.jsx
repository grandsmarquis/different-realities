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
      <polyline fill="none" stroke={stroke} strokeWidth="1.6" points={pts} />
    </svg>
  )
}

export default function CowgirlLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(30,58,138,0.06) 2px, rgba(30,58,138,0.06) 4px),
          linear-gradient(175deg, #93c5fd 0%, #bfdbfe 22%, #e9d5ff 50%, #fecdd3 100%)`,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute right-[6%] top-[10%] z-0 opacity-25" aria-hidden>
        <svg className="cowgirl-lasso-spin size-40 md:size-52" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="42" ry="38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" className="text-rose-700" />
          <ellipse cx="50" cy="50" rx="28" ry="26" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-800" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-4 pb-6" style={{ borderColor: 'var(--accent2)' }}>
          <div>
            <p className="cowgirl-boot-tap m-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>
              <span className="text-2xl" aria-hidden>👢</span> Rodeo dispatch
            </p>
            <h1 className="m-0 mt-2 text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)', textShadow: '2px 2px 0 color-mix(in srgb, var(--accent) 35%, transparent)' }}>
              Cowgirl mail corral
            </h1>
            <p className="m-0 mt-2 max-w-xl text-sm opacity-90">{emails.filter(e => !e.read).length} unopened — lasso one and read</p>
          </div>
          <button type="button" className="btn btn-secondary border-2 font-bold uppercase tracking-wide" style={{ borderColor: 'var(--accent2)' }} onClick={onSwitchPersona}>
            Ride elsewhere
          </button>
        </header>

        <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
          <nav className="xl:w-[340px] xl:shrink-0" aria-label="Inbox">
            <h2 className="mb-3 text-center text-xs font-bold uppercase tracking-widest opacity-70">Championship brackets (inbox)</h2>
            <ul className="space-y-3">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`card card-compact w-full border-2 text-left shadow-md transition-all hover:-translate-y-0.5 ${on ? 'ring-2 ring-rose-600 ring-offset-2 ring-offset-base-100' : ''}`}
                      style={{
                        borderColor: 'var(--accent2)',
                        background: on ? 'color-mix(in srgb, var(--accent3) 90%, white)' : 'var(--card)',
                      }}
                    >
                      <div className="card-body gap-1 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl">{e.from.avatar}</span>
                          {!e.read && <span className="badge badge-sm border-0 font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>New</span>}
                        </div>
                        <p className="line-clamp-2 text-sm font-bold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{e.subject}</p>
                        <p className="text-xs opacity-60">{e.from.name} · {e.date}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="min-h-[280px] flex-1">
            {selectedEmail ? (
              <article className="card border-4 shadow-xl" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
                <div className="card-body">
                  <div className="mb-4 flex flex-wrap items-start gap-4 border-b-2 border-dashed pb-4" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-5xl">{selectedEmail.from.avatar}</span>
                    <div>
                      <h2 className="card-title text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>{selectedEmail.subject}</h2>
                      <p className="text-sm opacity-70">{selectedEmail.from.name} · {selectedEmail.date}</p>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed">{selectedEmail.body}</div>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-4 border-dashed p-8 opacity-70" style={{ borderColor: 'var(--accent2)' }}>
                <span className="text-6xl">🤠</span>
                <p className="mt-4 text-center font-bold" style={{ fontFamily: 'var(--font-display)' }}>Pick a ticket from the corral</p>
              </div>
            )}
          </main>

          <aside className="flex shrink-0 flex-col gap-3 xl:w-56">
            <div className="card border-2 bg-base-100/90 shadow" style={{ borderColor: 'var(--accent2)' }}>
              <div className="card-body p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sky over the ranch</p>
                <p className="text-4xl">{weather.icon}</p>
                <p className="font-bold">{weather.condition}</p>
                <p className="text-xs opacity-70">{weather.temp}°C · {weather.city}</p>
              </div>
            </div>
            <div className="card border-2 bg-base-100/90 shadow" style={{ borderColor: 'var(--accent2)' }}>
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Stock rodeo</p>
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-2 text-xs font-semibold">
                    <span>{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#15803d' : '#b91c1c'} />
                    <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card border-2 bg-base-100/90 shadow" style={{ borderColor: 'var(--accent2)' }}>
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Trail news</p>
                <ul className="space-y-2 text-[11px] leading-snug">
                  {news.map(n => (
                    <li key={n.id} className="border-l-4 pl-2" style={{ borderColor: 'var(--accent)' }}>
                      <span className="mr-1">{n.emoji}</span>{n.title}
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
