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
  const h = 26
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.8" points={pts} />
    </svg>
  )
}

const papelColors = ['#e11d48', '#16a34a', '#ca8a04', '#2563eb', '#9333ea', '#ea580c']

export default function MexicanSombreroLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const n = emails.length
  const radiusPct = 38

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% -10%, #fde68a 0%, transparent 50%), linear-gradient(165deg, #14532d 0%, #0f172a 45%, #1c1917 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-14 overflow-hidden opacity-90" aria-hidden>
        <div className="sombrero-papel-drift flex w-[200%] gap-1 py-2">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-16 shrink-0 rounded-b-lg shadow-md"
              style={{
                background: `linear-gradient(180deg, ${papelColors[i % papelColors.length]} 0%, color-mix(in srgb, ${papelColors[i % papelColors.length]} 60%, #000) 100%)`,
                clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-16 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--accent2)' }}>
              ¡Viva el correo!
            </p>
            <h1 className="m-0 mt-2 text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Mexican sombrero inbox
            </h1>
            <p className="m-0 mt-2 max-w-xl text-sm opacity-90" style={{ color: 'var(--text2)' }}>
              Same messages, fiesta layout — {emails.filter(e => !e.read).length} cartas sin abrir
              <span className="sombrero-maraca ml-2 inline-block text-xl" aria-hidden>🪇</span>
            </p>
          </div>
          <button type="button" className="btn btn-outline border-2 font-bold" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={onSwitchPersona}>
            Cambiar ritmo
          </button>
        </header>

        <div className="grid gap-8 xl:grid-cols-12">
          <section className="xl:col-span-7">
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest opacity-80" style={{ color: 'var(--accent2)' }}>
              La mesa redonda del correo
            </p>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute left-1/2 top-[6%] z-20 flex -translate-x-1/2 flex-col items-center" aria-hidden>
                <div className="h-2.5 w-20 rounded-full bg-amber-900 shadow-md" />
                <div
                  className="-mt-0.5 h-14 w-36 border-4 border-amber-950 shadow-2xl md:h-16 md:w-44"
                  style={{
                    borderRadius: '50% 50% 42% 42% / 58% 58% 38% 38%',
                    background: 'linear-gradient(185deg, #d97706 0%, #92400e 55%, #78350f 100%)',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.4), inset 0 -8px 16px rgba(0,0,0,0.2)',
                  }}
                />
              </div>
              <div
                className="absolute inset-[18%] rounded-full border-4 shadow-2xl"
                style={{
                  borderColor: 'var(--accent)',
                  background: 'conic-gradient(from 200deg, color-mix(in srgb, var(--card) 90%, transparent), color-mix(in srgb, var(--accent2) 15%, transparent), color-mix(in srgb, var(--card) 90%, transparent))',
                  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25)',
                }}
              />
              {emails.map((e, i) => {
                const angle = (2 * Math.PI * i) / n - Math.PI / 2
                const x = 50 + radiusPct * Math.cos(angle)
                const y = 50 + radiusPct * Math.sin(angle)
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`absolute z-10 flex min-h-[3.25rem] w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border-2 px-1 py-1 text-center shadow-lg transition-transform hover:z-30 hover:scale-110 md:w-[100px] ${on ? 'ring-2 ring-amber-300' : ''}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      borderColor: on ? 'var(--accent2)' : 'var(--border)',
                      background: on ? 'color-mix(in srgb, var(--accent) 25%, var(--card))' : 'var(--card)',
                    }}
                  >
                    <span className="text-lg leading-none">{e.from.avatar}</span>
                    <span className="mt-0.5 line-clamp-2 text-[9px] font-bold leading-tight" style={{ color: 'var(--text)' }}>
                      {e.subject}
                    </span>
                    {!e.read && <span className="badge badge-xs mt-0.5 border-0 bg-rose-500 text-white">¡nuevo!</span>}
                  </button>
                )
              })}
            </div>
          </section>

          <div className="flex flex-col gap-4 xl:col-span-5">
            <article className="card border-2 bg-base-200/80 shadow-xl backdrop-blur-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-3 p-4">
                <h2 className="card-title text-sm uppercase tracking-widest" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                  El clima hoy
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-5xl">{weather.icon}</span>
                  <div>
                    <p className="m-0 text-xl font-bold">{weather.temp}°C · {weather.condition}</p>
                    <p className="m-0 text-xs opacity-70">{weather.city} — perfecto para un patio</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weather.forecast.map(d => (
                    <div key={d.day} className="rounded-lg border border-base-content/20 bg-base-100/50 px-2 py-1 text-center text-[10px]">
                      <div>{d.icon}</div>
                      <div>{d.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="card border-2 bg-base-200/80 backdrop-blur-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-3 p-4">
                <h2 className="card-title text-sm uppercase tracking-widest" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                  Mercados (gráficas picantes)
                </h2>
                <ul className="flex flex-col gap-2">
                  {stocks.map(s => (
                    <li key={s.ticker} className="flex items-center justify-between gap-2 rounded-xl border border-base-content/10 bg-base-100/40 px-3 py-2">
                      <div>
                        <span className="font-mono font-bold" style={{ color: 'var(--accent)' }}>{s.ticker}</span>
                        <span className={`ml-2 text-sm ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                          {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
                        </span>
                      </div>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#22c55e' : '#f87171'} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card border-2 bg-base-200/80 backdrop-blur-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="card-body gap-2 p-4">
                <h2 className="card-title text-sm uppercase tracking-widest" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
                  Noticias del pueblo (mundo)
                </h2>
                <ul className="space-y-2 text-sm">
                  {news.map(item => (
                    <li key={item.id} className="flex gap-2 rounded-lg border border-base-content/10 bg-base-100/30 px-2 py-2">
                      <span>{item.emoji}</span>
                      <span className="leading-snug opacity-90">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 sm:items-center sm:p-6" onClick={() => setSelectedEmail(null)} role="presentation">
          <div
            className="card max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 shadow-2xl"
            style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal
            aria-labelledby="sombrero-subject"
          >
            <div className="card-body">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Carta seleccionada</p>
              <h3 id="sombrero-subject" className="card-title text-xl" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h3>
              <p className="text-sm opacity-70">{selectedEmail.from.name} {selectedEmail.from.avatar} · {selectedEmail.date}</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</p>
              <button type="button" className="btn btn-primary mt-2" onClick={() => setSelectedEmail(null)}>Cerrar con aplauso</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
