import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BTC_CRASH = {
  price: 54200.0,
  change: -8420.0,
  changePct: -13.45,
  currency: '$',
  series: [
    98200, 96800, 95100, 93800, 92200, 90500, 89200, 87800, 86200, 84800, 83200, 81800, 80200, 78800, 77200, 75800, 74200, 72500, 70800, 69200, 67800, 66200, 64800, 63200, 61800, 59800, 58200, 56800, 55200, 54200,
  ],
}

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 120
  const h = 40
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

const displayStocks = stocks.map(s => (s.ticker === 'BTC' ? { ...s, ...BTC_CRASH, name: 'Bitcoin (pain)' } : s))

export default function BitcoinCrashingLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        background: 'linear-gradient(165deg, #1a0505 0%, #0a0202 50%, #050101 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes btcCrashShake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, -2px); }
          80% { transform: translate(1px, 2px); }
        }
        @keyframes btcBloodTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .btc-crash-shake-chart { animation: btcCrashShake 0.45s ease-in-out infinite; }
        .btc-ticker-track {
          display: flex;
          width: max-content;
          animation: btcBloodTicker 28s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.4) 2px, rgba(220,38,38,0.4) 3px)' }} />

      <div className="relative z-10 overflow-hidden border-b border-red-900/60 bg-black/80 py-2">
        <div className="btc-ticker-track gap-12 text-xs font-mono text-red-400/90">
          {[...news, ...news].map((n, i) => (
            <span key={`${n.id}-${i}`} className="whitespace-nowrap">
              ◆ LIQUIDATIONS ◆ {n.title} ◆ STAY CALM (NOT FINANCIAL ADVICE) ◆
            </span>
          ))}
        </div>
      </div>

      <header className="relative z-10 px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.5em] text-red-500">Margin call aesthetic</p>
            <h1 className="m-0 mt-2 text-3xl font-black uppercase md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: '#fecaca', textShadow: '0 0 24px rgba(220,38,38,0.6)' }}>
              Bitcoin crashing
            </h1>
            <p className="m-0 mt-2 max-w-xl text-sm opacity-70">Your portfolio is a red candle. Your inbox is the only green thing left (unread badges).</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded border border-red-600 bg-red-950 px-3 py-1 font-mono text-xs text-red-300">STATUS: REKT</span>
            <button type="button" className="btn btn-sm border-red-700 bg-red-900 text-red-100 hover:bg-red-800" onClick={onSwitchPersona}>
              Close positions (exit)
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8">
        <div className="btc-crash-shake-chart mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {displayStocks.map(s => (
            <div key={s.ticker} className={`rounded-lg border-2 px-3 py-3 ${s.ticker === 'BTC' ? 'border-red-500 bg-red-950/50 shadow-[0_0_30px_rgba(220,38,38,0.25)]' : 'border-red-900/40 bg-black/40'}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {s.changePct > 0 ? '+' : ''}
                  {s.changePct}%
                </span>
              </div>
              <div className="mt-2 flex justify-end">
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#ef4444'} />
              </div>
              <p className="m-0 mt-1 text-[10px] uppercase opacity-50">{s.name}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">Panic inbox</p>
            <div className="space-y-1">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded border px-3 py-2.5 text-left font-mono text-xs transition-colors ${on ? 'border-red-500 bg-red-950/70' : 'border-red-900/30 bg-black/50 hover:border-red-700'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-error badge-xs">URGENT</span>}
                    </div>
                    <p className={`m-0 mt-1 line-clamp-2 ${e.read ? 'text-base-content/50' : 'font-bold text-red-100'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-red-500/60">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-lg border-2 border-red-800/60 bg-black/60 p-5">
                <div className="flex flex-wrap gap-2 text-[10px] uppercase">
                  <span className="rounded bg-red-950 px-2 py-0.5 text-red-300">msg / loss porn</span>
                  <span className="text-base-content/40">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-lg font-bold text-red-50 md:text-xl">{selectedEmail.subject}</h2>
                <p className="m-0 mt-2 text-xs text-red-400/80">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,440px)] overflow-y-auto border-l-2 border-red-600 pl-4 text-sm leading-relaxed whitespace-pre-wrap opacity-90">
                  {selectedEmail.body}
                </div>
                <button type="button" className="btn btn-ghost btn-sm mt-4 text-red-400" onClick={() => setSelectedEmail(null)}>
                  ← deny reality
                </button>
              </div>
            ) : (
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-red-900 p-8 text-center opacity-60">
                <p className="text-5xl">📉</p>
                <p className="mt-3 font-mono text-sm text-red-300">Open a message. It can&apos;t hurt more than the chart.</p>
              </div>
            )}
          </main>

          <aside className="space-y-3 lg:col-span-3">
            <div className="rounded-lg border border-red-800/50 bg-red-950/20 p-4 text-center">
              <p className="text-[10px] font-bold uppercase text-red-500">Weather (irrelevant)</p>
              <p className="text-3xl">{weather.icon}</p>
              <p className="text-sm font-bold">{weather.condition}</p>
              <p className="text-xs opacity-50">
                {weather.temp}° · {weather.city}
              </p>
            </div>
            <div className="rounded-lg border border-red-900/40 bg-black/50 p-3 text-xs">
              <p className="mb-2 text-[10px] font-bold uppercase text-red-600">News feed of doom</p>
              {news.slice(0, 4).map(n => (
                <p key={n.id} className="mb-2 border-l-2 border-red-600 pl-2 leading-snug">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
