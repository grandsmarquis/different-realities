import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 120
  const h = 36
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="2" points={pts} />
    </svg>
  )
}

export default function YouAreRichLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const tickerParts = [
    ...news.map(n => `${n.emoji} ${n.title}`),
    ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'} ${Math.abs(s.changePct)}%`),
  ]
  const line = `${tickerParts.join('   ·   ')}   ·   `

  return (
    <div
      className="min-h-dvh overflow-x-hidden pb-14"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(165deg, #0c0a09 0%, #1c1917 45%, #292524 100%)',
        color: '#fafaf9',
      }}
    >
      <div className="rich-gold-shimmer overflow-hidden py-1.5 text-black">
        <div className="rich-ticker-gold-inner text-xs font-semibold tracking-wide">
          {line}
          {line}
        </div>
      </div>

      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-amber-900/50 px-4 py-8">
        <div>
          <p className="m-0 text-[10px] uppercase tracking-[0.5em] text-amber-600/90">Concierge desk</p>
          <h1 className="m-0 text-4xl font-light md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            You are rich
          </h1>
          <p className="m-0 mt-2 text-sm text-stone-400">Your holdings, correspondence, and atmosphere — curated.</p>
        </div>
        <button type="button" className="btn btn-outline btn-sm border-amber-500/60 text-amber-200 hover:bg-amber-950" onClick={onSwitchPersona}>
          Discreet exit
        </button>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-12">
        <main className="lg:col-span-5">
          <div className="rounded-sm border border-amber-900/40 bg-gradient-to-b from-stone-900/90 to-stone-950 p-1 shadow-[0_0_40px_rgba(212,175,55,0.08)]">
            <div className="border border-amber-800/30 bg-stone-950/80 p-5">
              <p className="m-0 text-xs uppercase tracking-widest text-amber-600/80">Correspondence</p>
              <div className="mt-4 space-y-3">
                {emails.map(e => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full border-l-2 pl-4 text-left transition hover:border-amber-500 ${selectedEmail?.id === e.id ? 'border-amber-500' : 'border-stone-700'}`}
                  >
                    <p className="m-0 text-xs text-stone-500">{e.from.name}</p>
                    <p className={`m-0 mt-1 ${e.read ? 'text-stone-300' : 'text-white'}`}>{e.subject}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className="space-y-6 lg:col-span-7">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-sm border border-amber-900/40 bg-stone-900/60 p-5">
              <p className="m-0 text-xs uppercase tracking-widest text-amber-600">Estate weather</p>
              <p className="m-0 mt-3 text-4xl">{weather.icon}</p>
              <p className="m-0 mt-2 text-3xl font-light">{weather.temp}°C</p>
              <p className="m-0 text-sm text-stone-400">{weather.city} · {weather.condition}</p>
            </div>
            <div className="rounded-sm border border-amber-900/40 bg-stone-900/60 p-5">
              <p className="m-0 text-xs uppercase tracking-widest text-amber-600">Humidity & wind</p>
              <p className="m-0 mt-4 text-lg text-stone-300">{weather.humidity}% humidity</p>
              <p className="m-0 text-sm text-stone-500">Wind {weather.wind} km/h — acceptable for the terrace</p>
            </div>
          </div>

          <div className="rounded-sm border border-amber-900/40 bg-stone-900/60 p-5">
            <p className="m-0 text-xs uppercase tracking-widest text-amber-600">Portfolio glance</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {stocks.map(s => (
                <div key={s.ticker} className="border border-stone-800 bg-black/30 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="m-0 font-mono text-lg text-white">{s.ticker}</p>
                      <p className="m-0 text-xs text-stone-500">{s.name}</p>
                    </div>
                    <span className={s.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {s.changePct > 0 ? '+' : ''}
                      {s.changePct}%
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#d4af37' : '#f87171'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-amber-900/40 bg-stone-900/60 p-5">
            <p className="m-0 text-xs uppercase tracking-widest text-amber-600">Briefings</p>
            <ul className="m-0 mt-4 list-none space-y-3 p-0">
              {news.map(n => (
                <li key={n.id} className="border-b border-stone-800 pb-3 text-sm leading-relaxed text-stone-300 last:border-0">
                  <span className="text-amber-600/90">{n.emoji}</span> {n.title}
                  <span className="ml-2 text-xs text-stone-600">{n.source}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm" onClick={() => setSelectedEmail(null)}>
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto border border-amber-700/50 bg-stone-950 p-8 shadow-[0_0_60px_rgba(212,175,55,0.15)]"
            onClick={e => e.stopPropagation()}
          >
            <p className="m-0 text-xs uppercase tracking-widest text-amber-600">Private message</p>
            <h2 className="m-0 mt-3 text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="m-0 mt-2 text-sm text-stone-500">{selectedEmail.from.name} · {selectedEmail.date}</p>
            <div className="mt-6 whitespace-pre-wrap border-t border-stone-800 pt-6 text-sm leading-loose text-stone-300">{selectedEmail.body}</div>
            <button type="button" className="btn btn-ghost btn-sm mt-6 text-amber-200" onClick={() => setSelectedEmail(null)}>
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
