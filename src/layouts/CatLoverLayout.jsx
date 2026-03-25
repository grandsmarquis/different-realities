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

export default function CatLoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'radial-gradient(ellipse 100% 60% at 50% 0%, #fce7f3 0%, transparent 50%), linear-gradient(180deg, #fdf2f8 0%, #fae8ff 45%, #eef2ff 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute right-6 top-24 opacity-40" aria-hidden>
        <div className="cat-yarn-spin relative size-24 rounded-full border-4 border-dashed border-secondary shadow-lg" style={{
          background: 'conic-gradient(from 0deg, #f472b6, #a78bfa, #38bdf8, #f472b6)',
        }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="cat-paw-knead m-0 inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent2)' }}>
              <span className="text-2xl">🐱</span> Purr-fect mail
            </p>
            <h1 className="m-0 mt-1 text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Cat lover inbox
            </h1>
            <p className="m-0 mt-2 text-sm opacity-75">
              Knocked onto the floor: {emails.filter(e => !e.read).length} unread (still precious)
            </p>
          </div>
          <button type="button" className="btn btn-secondary font-bold" onClick={onSwitchPersona}>
            Ignore hooman
          </button>
        </header>

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="mb-4">
              {selectedEmail ? (
                <article className="card mb-4 border-2 bg-base-100 shadow-xl" style={{ borderColor: 'var(--accent2)' }}>
                  <div className="card-body">
                    <div className="flex flex-wrap items-start gap-3">
                      <span className="text-4xl">{selectedEmail.from.avatar}</span>
                      <div>
                        <h2 className="card-title text-xl" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                        <p className="text-sm opacity-70">{selectedEmail.from.name} · {selectedEmail.date}</p>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</p>
                  </div>
                </article>
              ) : null}
            </div>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div className="card border-2 bg-base-100/90 shadow-lg" style={{ borderColor: 'var(--border)' }}>
                <div className="card-body flex-row items-center gap-3 p-4">
                  <span className="text-4xl">{weather.icon}</span>
                  <div>
                    <p className="m-0 text-xs font-bold uppercase tracking-widest opacity-60">Window weather</p>
                    <p className="m-0 font-bold">{weather.temp}°C · {weather.condition}</p>
                    <p className="m-0 text-xs opacity-70">{weather.city}</p>
                  </div>
                </div>
              </div>
              <div className="card border-2 bg-base-100/90 shadow-lg" style={{ borderColor: 'var(--border)' }}>
                <div className="card-body p-4">
                  <p className="m-0 text-xs font-bold uppercase tracking-widest opacity-60">Red dot portfolio</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {stocks.map(s => (
                      <div key={s.ticker} className="flex items-center justify-between gap-2 text-xs font-semibold">
                        <span className="font-mono">{s.ticker}</span>
                        <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#db2777' : '#7c3aed'} />
                        <span className={s.changePct >= 0 ? 'text-secondary' : 'text-error'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-2 bg-base-100/95 shadow-xl" style={{ borderColor: 'var(--accent2)' }}>
              <div className="card-body p-4">
                <h2 className="card-title text-sm uppercase tracking-widest opacity-70">Hairball-free news</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {news.map(n => (
                    <li key={n.id} className="rounded-xl border border-base-200 bg-base-200/40 px-3 py-2 text-sm leading-snug">
                      <span className="mr-1">{n.emoji}</span>{n.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <nav className="xl:col-span-4" aria-label="Keyboard inbox">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] opacity-60">Sitting on the keyboard</h2>
            <ul className="space-y-2">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                const tilt = ((i % 5) - 2) * 0.8
                return (
                  <li key={e.id} style={{ transform: `rotate(${tilt}deg)` }}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`card w-full border-2 text-left shadow transition-all hover:z-10 hover:shadow-xl ${on ? 'bg-secondary/15' : 'bg-base-100'}`}
                      style={{ borderColor: on ? 'var(--accent)' : 'var(--border)' }}
                    >
                      <div className="card-body gap-1 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xl">{e.from.avatar}</span>
                          {!e.read && <span className="badge badge-accent badge-sm">mrow</span>}
                        </div>
                        <p className="line-clamp-2 text-sm font-bold">{e.subject}</p>
                        <p className="text-xs opacity-60">{e.from.name}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

      </div>
    </div>
  )
}
