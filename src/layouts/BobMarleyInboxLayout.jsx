import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 78
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

export default function BobMarleyInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'linear-gradient(165deg, #14532d 0%, #1c1917 45%, #0f172a 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="marley-rasta-bar sticky top-0 z-20 flex h-2 w-full" aria-hidden>
        <span className="h-full flex-1 bg-[#facc15]" />
        <span className="h-full flex-1 bg-[#15803d]" />
        <span className="h-full flex-1 bg-[#1c1917]" />
        <span className="h-full flex-1 bg-[#dc2626]" />
      </div>

      <div className="marley-sun-glow pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-start gap-6">
            <div className="marley-vinyl relative hidden h-28 w-28 shrink-0 rounded-full border-4 border-[#292524] bg-gradient-to-br from-zinc-800 to-black shadow-2xl sm:block" aria-hidden>
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-600/50 bg-zinc-900" />
            </div>
            <div>
              <p className="m-0 text-xs font-bold uppercase tracking-[0.35em] text-lime-300/90">Trenchtown · digital (parody)</p>
              <h1 className="m-0 mt-2 text-3xl font-bold text-amber-50 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                Bob Marley inbox
              </h1>
              <p className="m-0 mt-2 max-w-2xl text-sm text-lime-100/80">
                One inbox, one love — weather vibes, market rhythm, world news inna irie layout. {emails.filter(e => !e.read).length} fresh vibrations.
              </p>
            </div>
          </div>
          <button type="button" className="btn border-0 bg-gradient-to-r from-green-700 to-green-900 font-bold text-white hover:opacity-95" onClick={onSwitchPersona}>
            Easy skankin&apos; home
          </button>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="marley-card-rise rounded-2xl border-2 border-lime-700/40 bg-green-950/50 p-4 text-lime-50 backdrop-blur-sm">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-yellow-300/90">Sky over Kingston</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-4xl marley-bob-soft">{weather.icon}</span>
              <div>
                <p className="m-0 text-lg font-semibold">{weather.condition}</p>
                <p className="m-0 text-sm opacity-80">{weather.temp}°C · {weather.city}</p>
              </div>
            </div>
          </div>
          <div className="marley-card-rise rounded-2xl border-2 border-yellow-600/30 bg-amber-950/30 p-4 text-amber-50 md:col-span-2">
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-yellow-300/90">Market riddim (stocks)</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {stocks.map(s => (
                <div key={s.ticker} className="flex items-center justify-between gap-2 rounded-xl border border-lime-900/40 bg-black/25 px-3 py-2">
                  <span className="font-mono text-sm font-bold text-lime-200">{s.ticker}</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#facc15' : '#f97316'} />
                  <span className={s.changePct >= 0 ? 'text-lime-300' : 'text-orange-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-yellow-200/80">Letters · inbox</h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`w-full rounded-xl border-2 p-3 text-left transition-all ${on ? 'border-yellow-400 bg-green-900/40 shadow-lg shadow-green-900/40' : 'border-green-800/50 bg-black/30 hover:border-lime-600'}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl">{e.from.avatar}</span>
                        <div className="min-w-0 flex-1">
                          {!e.read && <span className="badge badge-sm mb-1 border-0 bg-red-700 font-bold text-white">NEW CHAPTER</span>}
                          <p className="m-0 font-semibold leading-snug text-lime-50">{e.subject}</p>
                          <p className="m-0 text-xs text-lime-200/60">{e.from.name}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-2xl border-2 border-red-800/40 bg-gradient-to-b from-green-950/80 to-black/60 p-5 md:p-6">
                <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-yellow-400">Selected letter</p>
                <h3 className="m-0 mt-2 text-xl font-bold text-amber-50 md:text-2xl">{selectedEmail.subject}</h3>
                <p className="m-0 mt-2 text-sm text-lime-200/70">
                  {selectedEmail.from.name} · {selectedEmail.date}
                </p>
                <div className="marley-eq-bars mt-4 flex h-6 items-end gap-1 opacity-60" aria-hidden>
                  {[4, 7, 5, 9, 6, 8, 5, 7, 4, 6].map((h, i) => (
                    <span key={i} className="marley-eq-bar w-1 rounded-sm bg-lime-400" style={{ height: `${h * 10}%`, animationDelay: `${i * 0.08}s` }} />
                  ))}
                </div>
                <div className="mt-4 max-h-[min(48vh,420px)] overflow-y-auto rounded-xl border border-green-800/40 bg-black/35 p-4 text-sm leading-relaxed whitespace-pre-wrap text-lime-50/95">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-lime-800/50 text-lime-300/60">
                Choose a letter from the list
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="rounded-2xl border-2 border-yellow-700/30 bg-black/40 p-4">
              <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-yellow-300">World a reggae (news)</p>
              <ul className="mt-3 space-y-3 text-sm leading-snug text-lime-100/90">
                {news.map(n => (
                  <li key={n.id} className="rounded-lg border-l-4 border-red-600 bg-green-950/40 px-3 py-2">
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
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
