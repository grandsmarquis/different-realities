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
  const h = 20
  const p = 1
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1" points={pts} />
    </svg>
  )
}

export default function YouArePoorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="poor-broken-flicker min-h-dvh overflow-x-hidden pb-10"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'repeating-linear-gradient(90deg, #e7e5e4 0px, #e7e5e4 12px, #d6d3d1 12px, #d6d3d1 24px)',
        color: '#44403c',
      }}
    >
      <header className="border-b-2 border-dashed border-stone-500 bg-amber-100/80 px-3 py-3">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="m-0 text-lg font-bold uppercase tracking-tighter">You are poor</h1>
            <p className="m-0 text-[10px] text-stone-600">FREE TIER INBOX · ads coming soon (never)</p>
          </div>
          <button type="button" className="btn btn-xs rounded-none border-2 border-stone-600 bg-white" onClick={onSwitchPersona}>
            Exit (0 MB left)
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-3xl gap-4 px-3 py-4">
        <div className="border-2 border-stone-400 bg-white p-3 shadow-[2px_2px_0_#78716c]">
          <p className="m-0 text-[10px] font-bold text-red-700">⚠ Premium layout $9.99/mo — you are viewing BASIC</p>
          <div className="mt-3 max-h-[min(50vh,360px)] space-y-2 overflow-y-auto">
            {emails.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="flex w-full items-start gap-2 border border-stone-300 bg-stone-50 p-2 text-left hover:bg-amber-50"
              >
                <span>{e.from.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className={`m-0 text-xs ${e.read ? '' : 'font-bold'}`}>{e.subject}</p>
                  <p className="m-0 text-[10px] text-stone-500">{e.preview.slice(0, 60)}…</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="border-2 border-stone-400 bg-white p-2 text-center shadow-[2px_2px_0_#78716c]">
            <p className="m-0 text-[9px] uppercase">Weather (library wifi)</p>
            <p className="m-0 text-xl">{weather.icon}</p>
            <p className="m-0 text-sm font-bold">{weather.temp}°C</p>
          </div>
          <div className="border-2 border-stone-400 bg-white p-2 shadow-[2px_2px_0_#78716c] sm:col-span-2">
            <p className="m-0 text-[9px] uppercase">Stocks I check when I win the lottery</p>
            {stocks.map(s => (
              <div key={s.ticker} className="mt-1 flex items-center justify-between gap-1 text-[11px]">
                <span className="font-mono">{s.ticker}</span>
                <span>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                <MiniSpark series={s.series} stroke="#57534e" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-dotted border-stone-500 bg-amber-50 p-2 text-[11px] leading-snug">
          <p className="m-0 font-bold">News (borrowed paper)</p>
          {news.map(n => (
            <p key={n.id} className="m-0 mt-1">
              — {n.title}
            </p>
          ))}
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 p-3" onClick={() => setSelectedEmail(null)}>
          <div className="max-h-[80vh] w-full max-w-md overflow-y-auto border-4 border-stone-600 bg-white p-4" onClick={e => e.stopPropagation()}>
            <p className="m-0 text-[10px] text-stone-500">AD: ramen coupon below (imagine)</p>
            <h2 className="m-0 mt-2 text-base font-bold">{selectedEmail.subject}</h2>
            <p className="m-0 text-xs">{selectedEmail.from.name}</p>
            <p className="mt-3 whitespace-pre-wrap text-xs leading-relaxed">{selectedEmail.body}</p>
            <button type="button" className="btn btn-xs mt-3 rounded-none" onClick={() => setSelectedEmail(null)}>
              close (save data)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
