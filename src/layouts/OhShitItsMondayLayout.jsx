import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 96
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
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function OhShitItsMondayLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="monday-alarm-vibrate min-h-dvh overflow-x-hidden pb-10"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(180deg, #64748b 0%, #475569 40%, #334155 100%)',
        color: '#e2e8f0',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-25deg, transparent, transparent 6px, rgba(255,255,255,0.08) 6px, rgba(255,255,255,0.08) 7px)',
        }}
        aria-hidden
      />

      <header className="relative z-10 border-b-4 border-amber-500 bg-slate-800 px-4 py-4 shadow-lg">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⏰</span>
            <div>
              <h1 className="m-0 text-2xl font-black uppercase tracking-tight text-amber-400" style={{ fontFamily: 'var(--font-display)' }}>
                Oh shit it&apos;s Monday
              </h1>
              <p className="m-0 text-xs text-slate-400">Snooze count: {emails.filter(e => !e.read).length} · You needed 5 more minutes</p>
            </div>
          </div>
          <button type="button" className="btn btn-sm border-amber-600 bg-slate-700 text-amber-200 hover:bg-slate-600" onClick={onSwitchPersona}>
            Call in sick (exit)
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-4 px-3 py-6 lg:grid-cols-12">
        <main className="lg:col-span-8">
          <div className="rounded-lg border-2 border-slate-600 bg-slate-900/90 p-4 shadow-inner">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-red-400">Mandatory inbox</p>
            <div className="mt-3 space-y-2">
              {emails.map(e => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="flex w-full items-start gap-3 rounded border-l-4 border-amber-600 bg-slate-800/80 p-3 text-left hover:bg-slate-800"
                >
                  <span className="text-2xl grayscale">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`m-0 text-sm ${e.read ? 'text-slate-400' : 'font-bold text-white'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-slate-500">{e.from.name} · {e.date}</p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs text-slate-500">{e.preview}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedEmail && (
            <div className="mt-4 rounded-lg border-2 border-slate-600 bg-slate-900 p-5">
              <h2 className="m-0 text-lg font-bold text-amber-200">{selectedEmail.subject}</h2>
              <p className="m-0 text-xs text-slate-500">{selectedEmail.from.name}</p>
              <div className="mt-4 whitespace-pre-wrap border-t border-slate-700 pt-4 text-sm leading-relaxed text-slate-300">{selectedEmail.body}</div>
            </div>
          )}
        </main>

        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded-lg border-2 border-slate-600 bg-slate-900/90 p-4">
            <p className="m-0 text-xs font-bold text-slate-500">Commute weather</p>
            <p className="m-0 mt-2 text-3xl grayscale">{weather.icon}</p>
            <p className="m-0 text-xl font-bold">{weather.temp}°C</p>
            <p className="m-0 text-sm text-slate-400">Of course it&apos;s {weather.condition.toLowerCase()}</p>
          </div>

          <div className="rounded-lg border-2 border-slate-600 bg-slate-900/90 p-4">
            <p className="m-0 text-xs font-bold text-slate-500">Markets (ugh)</p>
            {stocks.map(s => (
              <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2 border-t border-slate-700 pt-2 first:mt-0 first:border-t-0 first:pt-0">
                <span className="font-mono text-sm">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-emerald-500' : 'text-red-400'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#34d399' : '#f87171'} />
              </div>
            ))}
          </div>

          <div className="rounded-lg border-2 border-slate-600 bg-slate-900/90 p-4 text-xs leading-relaxed text-slate-400">
            <p className="m-0 font-bold text-slate-500">News you scroll in the elevator</p>
            {news.map(n => (
              <p key={n.id} className="m-0 mt-2 border-l-2 border-amber-700 pl-2">
                {n.emoji} {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
