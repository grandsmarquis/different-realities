import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 110
  const h = 30
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

export default function BlackAndWhiteLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="bw-print-shake min-h-dvh grayscale"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'repeating-linear-gradient(0deg, #f5f5f5 0px, #f5f5f5 1px, #eaeaea 1px, #eaeaea 2px)',
        color: '#111',
      }}
    >
      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4 py-6">
          <div>
            <p className="m-0 text-[10px] uppercase tracking-[0.4em]">Daily edition</p>
            <h1 className="m-0 text-4xl font-black uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              The Inbox Chronicle
            </h1>
            <p className="m-0 mt-1 text-sm italic">All the news that fits in your screen · {weather.city}</p>
          </div>
          <button type="button" className="btn btn-outline btn-sm rounded-none border-2 border-black uppercase" onClick={onSwitchPersona}>
            Stop the presses
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-12">
        <main className="lg:col-span-8">
          <div className="columns-1 gap-8 md:columns-2">
            <article className="mb-8 break-inside-avoid border-2 border-black bg-white p-4 shadow-[6px_6px_0_#000]">
              <h2 className="m-0 border-b-2 border-black pb-2 text-xl font-bold uppercase">Correspondence</h2>
              <div className="mt-4 space-y-4">
                {emails.map(e => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="w-full border-l-4 border-black bg-neutral-50 p-3 text-left transition hover:bg-neutral-100"
                  >
                    <p className="m-0 text-[10px] uppercase tracking-wider">From {e.from.name}</p>
                    <p className={`m-0 mt-1 font-serif text-lg leading-tight ${e.read ? 'font-normal' : 'font-bold'}`}>{e.subject}</p>
                    <p className="m-0 mt-2 font-serif text-sm leading-snug text-neutral-700">{e.preview}</p>
                    <p className="m-0 mt-2 text-[10px]">{e.date}</p>
                  </button>
                ))}
              </div>
            </article>
          </div>

          {selectedEmail && (
            <article className="break-inside-avoid border-2 border-black bg-white p-6 shadow-[8px_8px_0_#000]">
              <h2 className="m-0 font-serif text-3xl font-bold leading-tight">{selectedEmail.subject}</h2>
              <p className="m-0 mt-2 text-sm uppercase tracking-wide">By {selectedEmail.from.name} · {selectedEmail.date}</p>
              <div className="prose prose-neutral mt-6 max-w-none font-serif text-base leading-relaxed whitespace-pre-wrap">{selectedEmail.body}</div>
            </article>
          )}
        </main>

        <aside className="space-y-6 lg:col-span-4">
          <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
            <h3 className="m-0 border-b-2 border-black pb-2 text-sm font-bold uppercase">Weather</h3>
            <p className="m-0 mt-3 text-4xl font-bold">{weather.icon}</p>
            <p className="m-0 mt-2 text-2xl font-bold">{weather.temp}°C</p>
            <p className="m-0 text-sm">{weather.condition}</p>
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
            <h3 className="m-0 border-b-2 border-black pb-2 text-sm font-bold uppercase">Markets</h3>
            {stocks.map(s => (
              <div key={s.ticker} className="mt-3 flex items-center justify-between gap-2 border-b border-neutral-300 pb-3 last:border-0">
                <div>
                  <p className="m-0 font-bold">{s.ticker}</p>
                  <p className="m-0 text-xs text-neutral-600">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className="m-0 font-mono text-sm font-bold">{s.changePct > 0 ? '+' : ''}{s.changePct}%</p>
                  <MiniSpark series={s.series} stroke="#111" />
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
            <h3 className="m-0 border-b-2 border-black pb-2 text-sm font-bold uppercase">Wire</h3>
            {news.map(n => (
              <p key={n.id} className="m-0 mt-3 border-l-2 border-black pl-3 text-sm leading-snug first:mt-0">
                <span className="mr-1 grayscale">{n.emoji}</span>
                {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
