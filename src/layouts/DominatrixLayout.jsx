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
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function DominatrixLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="dom-chain-shimmer relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%), var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 11px, var(--accent2) 11px, var(--accent2) 12px)`,
      }} aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b pb-6" style={{ borderColor: 'color-mix(in srgb, var(--accent2) 40%, transparent)' }}>
          <div>
            <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.45em]" style={{ color: 'var(--accent2)' }}>
              Velvet protocol desk
            </p>
            <h1 className="m-0 mt-2 text-3xl tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Dominatrix inbox
            </h1>
            <p className="m-0 mt-2 max-w-lg text-sm" style={{ color: 'var(--text2)' }}>
              Correspondence on your terms — {emails.filter(e => !e.read).length} items awaiting review
            </p>
          </div>
          <button type="button" className="btn btn-outline btn-sm border font-semibold uppercase tracking-widest md:btn-md" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }} onClick={onSwitchPersona}>
            Release session
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:order-1">
            <div
              className="card mb-4 border-2 bg-base-300/40 backdrop-blur-md"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent2) 55%, transparent)',
                boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent2) 20%, transparent), inset 0 1px 0 color-mix(in srgb, var(--accent2) 15%, transparent)',
              }}
            >
              <div className="card-body gap-3 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent2)' }}>Atmosphere report</h2>
                <div className="flex items-center gap-3">
                  <span className="text-4xl dom-stud-glint">{weather.icon}</span>
                  <div>
                    <p className="m-0 text-lg font-semibold">{weather.temp}° · {weather.condition}</p>
                    <p className="m-0 text-xs opacity-70">{weather.city}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {weather.forecast.slice(0, 4).map(d => (
                    <span key={d.day} className="badge badge-ghost badge-sm gap-0.5 border border-base-content/20">{d.icon}{d.day}</span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="card border-2 bg-base-300/40 backdrop-blur-md"
              style={{ borderColor: 'color-mix(in srgb, var(--accent2) 55%, transparent)' }}
            >
              <div className="card-body gap-3 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent2)' }}>Market discipline</h2>
                <ul className="space-y-3">
                  {stocks.map(s => (
                    <li key={s.ticker} className="flex items-center justify-between gap-2 rounded-lg border border-base-content/10 bg-base-100/20 px-2 py-2">
                      <div>
                        <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent)' }}>{s.ticker}</span>
                        <span className={`ml-2 text-xs ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                          {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                        </span>
                      </div>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#a3e635' : '#fb7185'} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <main className="lg:col-span-5 lg:order-2">
            {selectedEmail ? (
              <article
                className="card border-2 shadow-2xl"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent2) 70%, transparent)',
                  background: 'color-mix(in srgb, var(--card) 92%, black)',
                }}
              >
                <div className="card-body">
                  <div className="mb-4 flex items-start gap-3 border-b pb-4" style={{ borderColor: 'color-mix(in srgb, var(--accent2) 25%, transparent)' }}>
                    <span className="text-4xl">{selectedEmail.from.avatar}</span>
                    <div>
                      <h2 className="card-title text-xl leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{selectedEmail.subject}</h2>
                      <p className="text-xs uppercase tracking-widest opacity-60">{selectedEmail.from.name} · {selectedEmail.date}</p>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-90">{selectedEmail.body}</p>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-box border-2 border-dashed p-8 opacity-50" style={{ borderColor: 'var(--accent2)' }}>
                Select a briefing from the queue
              </div>
            )}
          </main>

          <nav className="lg:col-span-3 lg:order-3" aria-label="Inbox queue">
            <h2 className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.35em] opacity-60">Command queue</h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`w-full rounded-lg border-2 px-3 py-3 text-left transition-all hover:brightness-110 ${on ? 'brightness-110' : ''}`}
                      style={{
                        borderColor: on ? 'var(--accent2)' : 'color-mix(in srgb, var(--accent2) 35%, transparent)',
                        background: on ? 'color-mix(in srgb, var(--accent) 18%, var(--card))' : 'color-mix(in srgb, var(--card) 70%, transparent)',
                        boxShadow: on ? '0 0 24px color-mix(in srgb, var(--accent2) 15%, transparent)' : undefined,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-lg">{e.from.avatar}</span>
                        {!e.read && <span className="badge badge-xs border-0 font-bold" style={{ background: 'var(--accent2)', color: 'var(--bg)' }}>NEW</span>}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug">{e.subject}</p>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div
              className="card mt-4 border-2 bg-base-300/40 backdrop-blur-md"
              style={{ borderColor: 'color-mix(in srgb, var(--accent2) 55%, transparent)' }}
            >
              <div className="card-body gap-2 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent2)' }}>Press wire</h2>
                <ul className="max-h-48 space-y-2 overflow-y-auto text-[11px] leading-snug">
                  {news.map(n => (
                    <li key={n.id} className="border-l-2 pl-2 opacity-90" style={{ borderColor: 'var(--accent)' }}>
                      {n.emoji} {n.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
