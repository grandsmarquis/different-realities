import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, pos }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 104
  const h = 28
  const p = 2
  const r = max - min || 1
  const stroke = pos ? '#ef4444' : '#3b82f6'
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

export default function RedAndBlueLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#0a0a12] pb-10 text-white" style={{ fontFamily: 'var(--font-main)' }}>
      <div className="relative border-b-4 border-blue-600 bg-gradient-to-r from-red-950 via-[#1e1b4b] to-blue-950">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen" style={{ background: 'repeating-linear-gradient(90deg, #f00 0px, #f00 1px, transparent 1px, transparent 3px, #00f 3px, #00f 4px)' }} aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
          <h1 className="anaglyph-drift m-0 text-3xl font-black uppercase md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            3D INBOX MODE
          </h1>
          <button type="button" className="btn btn-sm border-2 border-cyan-400 bg-red-600 text-white hover:bg-red-500" onClick={onSwitchPersona}>
            Eject glasses
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-3 py-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg border-4 border-red-600 bg-red-950/40 p-4 shadow-[6px_0_0_rgba(239,68,68,0.3)]">
          <h2 className="m-0 text-sm font-bold uppercase tracking-[0.3em] text-red-400">Red channel · Mail</h2>
          <div className="space-y-2">
            {emails.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className={`w-full rounded border-2 border-red-500/60 bg-black/50 p-3 text-left transition hover:border-red-400 ${selectedEmail?.id === e.id ? 'ring-2 ring-red-400' : ''}`}
              >
                <span className="text-lg">{e.from.avatar}</span>
                <p className={`m-0 mt-1 text-sm ${e.read ? 'text-red-200/80' : 'font-bold text-red-100'}`}>{e.subject}</p>
                <p className="m-0 text-xs text-red-300/70">{e.preview.slice(0, 70)}…</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border-4 border-blue-600 bg-blue-950/40 p-4 shadow-[-6px_0_0_rgba(59,130,246,0.3)]">
          <h2 className="m-0 text-sm font-bold uppercase tracking-[0.3em] text-blue-400">Blue channel · Data</h2>

          <div className="rounded border-2 border-blue-500/50 bg-black/40 p-3">
            <p className="m-0 text-xs font-bold text-blue-300">Weather</p>
            <p className="m-0 mt-1 text-xl">
              {weather.icon} {weather.temp}°C — {weather.city}
            </p>
            <p className="m-0 text-sm text-blue-200/80">{weather.condition}</p>
          </div>

          <div className="rounded border-2 border-blue-500/50 bg-black/40 p-3">
            <p className="m-0 text-xs font-bold text-blue-300">Stocks</p>
            {stocks.map((s, i) => (
              <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2 border-t border-blue-800/50 pt-2 first:mt-0 first:border-t-0 first:pt-0">
                <span className="font-mono text-sm text-blue-100">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-red-400' : 'text-blue-400'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                <MiniSpark series={s.series} pos={i % 2 === 0} />
              </div>
            ))}
          </div>

          <div className="rounded border-2 border-blue-500/50 bg-black/40 p-3 text-sm leading-snug text-blue-100/90">
            <p className="m-0 text-xs font-bold text-blue-300">News</p>
            {news.map(n => (
              <p key={n.id} className="m-0 mt-2 border-l-2 border-blue-500 pl-2 first:mt-0">
                {n.emoji} {n.title}
              </p>
            ))}
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="anaglyph-drift max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 border-white bg-neutral-900 p-6 text-white"
            style={{ boxShadow: '4px 0 0 #ef4444, -4px 0 0 #3b82f6' }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="m-0 text-xl font-bold">{selectedEmail.subject}</h2>
            <p className="m-0 text-sm text-neutral-400">{selectedEmail.from.name} · {selectedEmail.date}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</p>
            <button type="button" className="btn btn-outline btn-sm mt-4 border-blue-500 text-blue-300" onClick={() => setSelectedEmail(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
