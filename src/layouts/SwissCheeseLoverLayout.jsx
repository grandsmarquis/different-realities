import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 76
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

function CheeseCard({ children, className = '' }) {
  return (
    <div
      className={`swiss-cheese-card swiss-emmental-shimmer relative overflow-hidden rounded-[2rem] border-4 border-amber-800/60 bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-400 text-amber-950 shadow-lg ${className}`}
    >
      <span className="swiss-hole pointer-events-none absolute h-8 w-8 rounded-full bg-amber-900/25" style={{ top: '12%', left: '18%' }} aria-hidden />
      <span className="swiss-hole pointer-events-none absolute h-5 w-5 rounded-full bg-amber-900/20" style={{ top: '55%', right: '22%' }} aria-hidden />
      <span className="swiss-hole pointer-events-none absolute h-6 w-6 rounded-full bg-amber-900/22" style={{ bottom: '14%', left: '40%' }} aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

export default function SwissCheeseLoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="swiss-alpine-float relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'linear-gradient(180deg, #0f766e 0%, #115e59 40%, #134e4a 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(255,255,255,0.08) 24px, rgba(255,255,255,0.08) 25px)' }} />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="swiss-flag-mini hidden shrink-0 flex-col overflow-hidden rounded-lg border-2 border-white/40 shadow-md sm:flex" aria-hidden>
              <span className="h-4 w-14 bg-red-600" />
              <span className="h-4 w-14 bg-white" />
            </span>
            <div>
              <p className="m-0 text-xs font-bold uppercase tracking-[0.3em] text-teal-200">Alpine · hole-proud</p>
              <h1 className="m-0 mt-2 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                Swiss cheese lover
              </h1>
              <p className="m-0 mt-2 max-w-2xl text-sm text-teal-100/90">
                Emmental metrics, fondue forecast, hole-y headlines. {emails.filter(e => !e.read).length} slices still uncut.
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-secondary font-bold text-secondary-content" onClick={onSwitchPersona}>
            Back to neutral milk hotel
          </button>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CheeseCard>
            <div className="p-4">
              <p className="m-0 text-[10px] font-black uppercase tracking-widest text-amber-900/80">Fondue window</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-4xl">{weather.icon}</span>
                <div>
                  <p className="m-0 font-bold">{weather.condition}</p>
                  <p className="m-0 text-sm">{weather.temp}°C · {weather.city}</p>
                </div>
              </div>
            </div>
          </CheeseCard>
          <CheeseCard className="md:col-span-2">
            <div className="p-4">
              <p className="m-0 text-[10px] font-black uppercase tracking-widest text-amber-900/80">Market holes (stocks)</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-2 rounded-2xl bg-amber-100/80 px-3 py-2 font-semibold">
                    <span className="font-mono text-sm">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#15803d' : '#b45309'} />
                    <span className={s.changePct >= 0 ? 'text-green-800' : 'text-amber-900'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CheeseCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <nav className="lg:col-span-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-200">Perforated inbox</h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`swiss-cheese-card w-full rounded-3xl border-4 border-amber-900/40 p-3 text-left transition-all ${on ? 'scale-[1.02] border-amber-950 shadow-xl' : 'bg-yellow-200/90'}`}
                      style={{
                        background: on ? 'linear-gradient(135deg, #fde68a, #fcd34d)' : undefined,
                        color: '#422006',
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl">{e.from.avatar}</span>
                        <div className="min-w-0 flex-1">
                          {!e.read && <span className="badge badge-sm mb-1 border-0 bg-red-600 font-bold text-white">NEW HOLE</span>}
                          <p className="m-0 line-clamp-2 text-sm font-bold">{e.subject}</p>
                          <p className="m-0 text-xs opacity-70">{e.from.name}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <CheeseCard className="min-h-[320px]">
                <div className="p-5 md:p-6">
                  <p className="m-0 text-[10px] font-black uppercase text-amber-900/70">Aged message</p>
                  <h3 className="m-0 mt-2 text-xl font-bold md:text-2xl">{selectedEmail.subject}</h3>
                  <p className="m-0 mt-2 text-xs opacity-75">
                    {selectedEmail.from.name} · {selectedEmail.date}
                  </p>
                  <div className="mt-4 max-h-[min(48vh,400px)] overflow-y-auto rounded-2xl bg-amber-50/90 p-4 text-sm leading-relaxed whitespace-pre-wrap text-amber-950">
                    {selectedEmail.body}
                  </div>
                </div>
              </CheeseCard>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border-4 border-dashed border-teal-400/50 text-teal-100">
                Select a slice
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="rounded-3xl border-4 border-white/30 bg-teal-950/60 p-4 text-teal-50 backdrop-blur-sm">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-yellow-200">Chalet radio (news)</p>
              <ul className="mt-3 space-y-2 text-sm leading-snug">
                {news.map(n => (
                  <li key={n.id} className="rounded-xl bg-black/20 px-3 py-2">
                    {n.emoji} {n.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
