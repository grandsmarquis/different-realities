import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BTC_MOON = {
  price: 148_200.0,
  change: 18_420.0,
  changePct: 14.2,
  currency: '$',
  series: [
    48200, 49800, 51500, 53200, 55100, 57200, 59500, 62200, 64800, 67800, 71200, 74800, 78500, 82800, 87200, 91800, 96500, 101200, 106500, 112800, 118200, 123500, 128800, 132400, 136200, 139500, 141800, 143200, 146000, 148200,
  ],
}

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 120
  const h = 44
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

const displayStocks = stocks.map(s => (s.ticker === 'BTC' ? { ...s, ...BTC_MOON, name: 'Bitcoin (number go up)' } : s))

export default function BitcoinMooningLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% -20%, rgba(250,204,21,0.25), transparent 55%), radial-gradient(ellipse 80% 50% at 100% 50%, rgba(34,197,94,0.12), transparent), #030b06',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes btcMoonBeam {
          0%, 100% { opacity: 0.4; transform: scaleY(1) translateY(0); }
          50% { opacity: 0.85; transform: scaleY(1.08) translateY(-4px); }
        }
        @keyframes btcRocket {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-14px) rotate(-4deg); }
        }
        @keyframes btcStarTwinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .btc-moon-beam { animation: btcMoonBeam 3s ease-in-out infinite; }
        .btc-rocket { animation: btcRocket 2.2s ease-in-out infinite; }
        .btc-star { animation: btcStarTwinkle 2s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {[12, 28, 44, 61, 73, 88].map((left, i) => (
          <span
            key={left}
            className="btc-star absolute top-[8%] text-lg"
            style={{ left: `${left}%`, animationDelay: `${i * 0.4}s` }}
          >
            ✦
          </span>
        ))}
        <div
          className="btc-moon-beam absolute -top-20 left-1/2 h-[50vh] w-[min(90vw,420px)] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.35), transparent)' }}
        />
      </div>

      <header className="relative z-10 px-4 pb-6 pt-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="btc-rocket text-5xl" aria-hidden>
              🚀
            </span>
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: '#fbbf24' }}>
                Generational wealth loading
              </p>
              <h1 className="m-0 mt-1 text-3xl font-black uppercase md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: '#ecfccb', textShadow: '0 0 32px rgba(74,222,128,0.5)' }}>
                Bitcoin mooning
              </h1>
              <p className="m-0 mt-2 max-w-lg text-sm opacity-80">Log scale looks flat. Linear scale looks like a rocket. Your inbox is still mostly spam — but you feel rich.</p>
            </div>
          </div>
          <button type="button" className="btn btn-sm border-amber-400/50 bg-gradient-to-r from-amber-600 to-lime-600 text-white hover:brightness-110" onClick={onSwitchPersona}>
            Take profits (exit)
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {displayStocks.map(s => (
            <div
              key={s.ticker}
              className={`rounded-xl border-2 px-3 py-3 backdrop-blur-sm ${s.ticker === 'BTC' ? 'border-amber-400/70 bg-gradient-to-br from-amber-950/80 to-lime-950/50 shadow-[0_0_40px_rgba(250,204,21,0.2)]' : 'border-emerald-900/50 bg-emerald-950/30'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-lime-100">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'font-bold text-lime-400' : 'text-red-400'}>
                  {s.changePct > 0 ? '🌙 +' : ''}
                  {s.changePct}%
                </span>
              </div>
              <div className="mt-2 flex justify-end">
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#a3e635' : '#f87171'} />
              </div>
              <p className="m-0 mt-1 text-[10px] uppercase text-lime-200/50">{s.name}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-400">Signal inbox (mostly noise)</p>
            <div className="space-y-1.5">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${on ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(250,204,21,0.15)]' : 'border-emerald-900/40 bg-black/30 hover:border-lime-600/50'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-success badge-xs font-bold">ALPHA</span>}
                    </div>
                    <p className={`m-0 mt-1 line-clamp-2 text-xs ${e.read ? 'text-base-content/50' : 'font-semibold text-lime-50'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-amber-200/40">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-xl border-2 border-amber-500/40 bg-gradient-to-b from-emerald-950/60 to-black/60 p-5">
                <div className="flex flex-wrap gap-2 text-[10px] uppercase">
                  <span className="rounded-full bg-lime-500/20 px-3 py-0.5 text-lime-300">confirmed by vibes</span>
                  <span className="text-base-content/40">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-lg font-bold text-amber-50 md:text-xl">{selectedEmail.subject}</h2>
                <p className="m-0 mt-2 text-xs text-lime-400/90">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,440px)] overflow-y-auto border-l-2 border-amber-400/60 pl-4 text-sm leading-relaxed whitespace-pre-wrap opacity-95">
                  {selectedEmail.body}
                </div>
                <button type="button" className="btn btn-ghost btn-sm mt-4 text-amber-300" onClick={() => setSelectedEmail(null)}>
                  ← back to euphoria
                </button>
              </div>
            ) : (
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-amber-600/30 p-8 text-center">
                <p className="text-6xl">🌕</p>
                <p className="mt-3 font-semibold text-amber-200/90">Pick an email. The chart already picked you.</p>
              </div>
            )}
          </main>

          <aside className="space-y-3 lg:col-span-3">
            <div className="rounded-xl border border-lime-600/40 bg-lime-950/20 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-lime-400">Weather (sunny anyway)</p>
              <p className="text-4xl">{weather.icon}</p>
              <p className="font-bold">{weather.condition}</p>
              <p className="text-xs opacity-60">
                {weather.city} · {weather.temp}°
              </p>
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-black/40 p-3 text-xs">
              <p className="mb-2 text-[10px] font-bold uppercase text-amber-400">Headlines in green</p>
              {news.slice(0, 4).map(n => (
                <p key={n.id} className="mb-2 border-l-2 border-lime-500 pl-2 leading-snug text-lime-100/90">
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
