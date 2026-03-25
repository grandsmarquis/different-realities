import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const COMMODITY_NICK = {
  AAPL: 'Big Orchard Co.',
  NVDA: 'Neon Valley Seeds',
  BTC: 'Digital Haystack',
  ETH: 'Ether-Field Co-op',
  CAC40: 'County 40 Board',
}

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 24
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.6" points={pts} />
    </svg>
  )
}

export default function FarmerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length
  const tickerText = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')

  return (
    <>
      <style>
        {`
          @keyframes farmer-sun-glow {
            0%, 100% { filter: drop-shadow(0 0 12px #ffeb3b) drop-shadow(0 0 28px #ffc107); transform: scale(1); }
            50% { filter: drop-shadow(0 0 20px #fff176) drop-shadow(0 0 40px #ff9800); transform: scale(1.06); }
          }
          @keyframes farmer-cloud-drift-a {
            from { transform: translateX(-20%); }
            to { transform: translateX(120vw); }
          }
          @keyframes farmer-cloud-drift-b {
            from { transform: translateX(-30%); }
            to { transform: translateX(130vw); }
          }
          @keyframes farmer-tractor {
            0% { transform: translateX(-120%) scaleX(1); }
            49% { transform: translateX(115vw) scaleX(1); }
            50% { transform: translateX(115vw) scaleX(-1); }
            100% { transform: translateX(-120%) scaleX(-1); }
          }
          @keyframes farmer-windmill {
            to { transform: rotate(360deg); }
          }
          @keyframes farmer-wheat {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(3deg); }
          }
          @keyframes farmer-chicken {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
            55% { transform: translateY(2px); }
          }
          @keyframes farmer-bird {
            0% { left: -10%; top: 18%; }
            100% { left: 110%; top: 12%; }
          }
          @keyframes farmer-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes farmer-barn-creak {
            0%, 100% { transform: rotate(-0.4deg); }
            50% { transform: rotate(0.4deg); }
          }
          .farmer-sun { animation: farmer-sun-glow 4s ease-in-out infinite; }
          .farmer-cloud-a { animation: farmer-cloud-drift-a 85s linear infinite; }
          .farmer-cloud-b { animation: farmer-cloud-drift-b 110s linear infinite; }
          .farmer-cloud-c { animation: farmer-cloud-drift-a 65s linear infinite 20s; }
          .farmer-tractor-wrap { animation: farmer-tractor 28s linear infinite; }
          .farmer-windmill-blades { animation: farmer-windmill 8s linear infinite; transform-origin: 50% 45%; display: inline-block; }
          .farmer-wheat-row span { animation: farmer-wheat 2.8s ease-in-out infinite; display: inline-block; }
          .farmer-wheat-row span:nth-child(2) { animation-delay: 0.2s; }
          .farmer-wheat-row span:nth-child(3) { animation-delay: 0.4s; }
          .farmer-wheat-row span:nth-child(4) { animation-delay: 0.15s; }
          .farmer-wheat-row span:nth-child(5) { animation-delay: 0.35s; }
          .farmer-chicken { animation: farmer-chicken 1.1s ease-in-out infinite; }
          .farmer-bird { animation: farmer-bird 22s linear infinite; }
          .farmer-marquee-inner { animation: farmer-marquee 40s linear infinite; }
          .farmer-barn-sign { animation: farmer-barn-creak 6s ease-in-out infinite; transform-origin: top center; }
        `}
      </style>

      <div
        className="relative min-h-dvh overflow-x-hidden pb-28 text-[var(--text)]"
        style={{
          fontFamily: 'var(--font-main)',
          background: 'linear-gradient(180deg, #7ec8e3 0%, #b2dfdb 38%, #c8e6c9 62%, #a5d6a7 100%)',
        }}
      >
        {/* Sky ornaments */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="farmer-bird absolute text-2xl opacity-80"
            style={{ animationDelay: '4s' }}
          >
            🐦
          </div>
          <div className="farmer-bird absolute text-xl opacity-70" style={{ animationDelay: '14s' }}>
            🐦
          </div>
          <div
            className="farmer-cloud-a absolute left-0 top-[8%] whitespace-nowrap text-6xl opacity-55 blur-[0.5px]"
            style={{ textShadow: '2px 4px 0 rgba(255,255,255,0.4)' }}
          >
            ☁️
          </div>
          <div className="farmer-cloud-b absolute left-0 top-[14%] whitespace-nowrap text-5xl opacity-45">
            ☁️
          </div>
          <div className="farmer-cloud-c absolute left-0 top-[22%] whitespace-nowrap text-4xl opacity-50">
            ☁️
          </div>
          <div className="farmer-sun absolute right-[6%] top-[6%] text-7xl md:text-8xl">☀️</div>
        </div>

        {/* Hills */}
        <svg
          className="pointer-events-none fixed bottom-0 left-0 z-[1] w-full opacity-95"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          aria-hidden
          style={{ height: 'min(28vh, 220px)' }}
        >
          <defs>
            <linearGradient id="farmerHill1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#66bb6a" />
              <stop offset="100%" stopColor="#388e3c" />
            </linearGradient>
            <linearGradient id="farmerHill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#81c784" />
              <stop offset="100%" stopColor="#2e7d32" />
            </linearGradient>
          </defs>
          <path d="M0,120 Q360,40 720,100 T1440,80 L1440,200 L0,200 Z" fill="url(#farmerHill2)" />
          <path d="M0,160 Q480,100 960,140 T1440,120 L1440,200 L0,200 Z" fill="url(#farmerHill1)" />
        </svg>

        <div className="farmer-tractor-wrap pointer-events-none fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-0 z-[2] text-4xl md:text-5xl">
          🚜
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-3 py-6 md:px-5">
          {/* Co-op radio ticker */}
          <div
            className="mb-4 overflow-hidden rounded-lg border-2 shadow-md"
            style={{ borderColor: 'var(--accent3)', background: '#3e2723' }}
          >
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-100/90">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden />
              <span style={{ fontFamily: 'var(--font-display)' }}>Co-op radio · live</span>
            </div>
            <div className="relative overflow-hidden border-t border-amber-900/50 bg-[#2d1f18] py-2 text-sm text-amber-50">
              <div className="farmer-marquee-inner flex w-max whitespace-nowrap">
                <span className="px-6">{tickerText}</span>
                <span className="px-6" aria-hidden>
                  {tickerText}
                </span>
              </div>
            </div>
          </div>

          <header className="farmer-barn-sign mb-8 flex flex-wrap items-end justify-between gap-4">
            <div
              className="card relative overflow-hidden border-4 shadow-2xl"
              style={{
                borderColor: '#5d1f1f',
                background:
                  'linear-gradient(145deg, #b71c1c 0%, #8b0000 45%, #6d0000 100%)',
                color: '#fff8e7',
                maxWidth: 'min(100%, 36rem)',
              }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 6px)',
                }}
                aria-hidden
              />
              <div className="card-body relative z-[1] gap-2 p-5 md:p-6">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="text-5xl md:text-6xl" aria-hidden>
                    🏚️
                  </div>
                  <div>
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
                      Homestead dispatch
                    </p>
                    <h1
                      className="m-0 text-3xl leading-tight md:text-4xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      The Back Forty
                    </h1>
                    <p className="m-0 mt-2 text-sm text-amber-100/85">
                      {unread} letter{unread === 1 ? '' : 's'} waitin&apos; on the fence · rest is filed neat as hay bales
                    </p>
                  </div>
                </div>
                <div className="farmer-wheat-row mt-2 text-2xl" aria-hidden>
                  <span>🌾</span>
                  <span>🌾</span>
                  <span>🌾</span>
                  <span>🌾</span>
                  <span>🌾</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3 rounded-xl border-2 bg-[#fff8e7] px-3 py-2 shadow-md" style={{ borderColor: 'var(--border)' }}>
                <span className="text-3xl" aria-hidden>
                  🌾
                </span>
                <div className="text-right">
                  <p className="m-0 text-[10px] font-bold uppercase tracking-wider opacity-60">Windmill row</p>
                  <p className="m-0 text-2xl leading-none" aria-hidden>
                    <span className="farmer-windmill-blades inline-block">✳️</span>
                  </p>
                </div>
              </div>
              <button type="button" className="btn btn-warning font-bold shadow-lg" onClick={onSwitchPersona}>
                Trade overalls
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Fence-post mail */}
            <nav className="lg:col-span-4" aria-label="Fence line mail">
              <h2
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text2)' }}
              >
                <span aria-hidden>🪵</span> Fence posts &amp; envelopes
              </h2>
              <ul className="space-y-3">
                {emails.map((e, i) => {
                  const on = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`card card-side w-full cursor-pointer border-4 text-left shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl ${on ? 'ring-4 ring-amber-400 ring-offset-2' : ''}`}
                        style={{
                          borderColor: on ? 'var(--accent2)' : '#5d4037',
                          background: `linear-gradient(180deg, #efebe9 0%, #d7ccc8 100%)`,
                          color: 'var(--text)',
                        }}
                      >
                        <figure className="flex w-14 shrink-0 flex-col items-center justify-center gap-0.5 bg-[#4e342e] text-lg text-amber-50">
                          <span aria-hidden>📮</span>
                          <span className="text-[10px] font-bold opacity-80">#{i + 1}</span>
                        </figure>
                        <div className="card-body gap-1 p-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-2xl">{e.from.avatar}</span>
                            {!e.read && (
                              <span className="badge border-0 bg-error text-error-content">fresh eggs</span>
                            )}
                          </div>
                          <p className="line-clamp-2 text-sm font-bold">{e.subject}</p>
                          <p className="text-xs opacity-70">{e.from.name}</p>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Letter reader */}
            <main className="lg:col-span-5">
              {selectedEmail ? (
                <article
                  className="card border-4 shadow-2xl"
                  style={{
                    borderColor: '#8d6e63',
                    background:
                      'linear-gradient(180deg, #fffef5 0%, #f5f0e1 55%, #ede7d9 100%)',
                    boxShadow: '8px 12px 0 rgba(62,39,35,0.15), inset 0 0 80px rgba(139,119,101,0.08)',
                  }}
                >
                  <div className="card-body gap-4">
                    <div className="flex flex-wrap items-start gap-3 border-b-2 border-dashed border-[#a1887f] pb-4">
                      <span className="text-5xl">{selectedEmail.from.avatar}</span>
                      <div>
                        <h2 className="card-title text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                          {selectedEmail.subject}
                        </h2>
                        <p className="text-sm opacity-75">
                          From {selectedEmail.from.name} · postmarked {selectedEmail.date}
                        </p>
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap rounded-lg bg-[#faf6ed]/90 p-4 text-sm leading-relaxed shadow-inner">
                      {selectedEmail.body}
                    </div>
                    <p className="text-xs italic opacity-60">Sealed with tractor grease (figuratively).</p>
                  </div>
                </article>
              ) : (
                <div
                  className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-4 border-dashed p-8 text-center shadow-inner"
                  style={{
                    borderColor: '#6d4c41',
                    background: 'rgba(255,248,231,0.75)',
                  }}
                >
                  <span className="farmer-chicken text-7xl">🐔</span>
                  <p className="mt-4 text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    Cluck a post on the left — letters don&apos;t open themselves!
                  </p>
                </div>
              )}
            </main>

            {/* Field intel */}
            <aside className="flex flex-col gap-4 lg:col-span-3">
              <div
                className="card border-4 shadow-lg"
                style={{ borderColor: '#1565c0', background: 'linear-gradient(160deg, #e3f2fd 0%, #bbdefb 100%)' }}
              >
                <div className="card-body gap-2 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-900/70">Sky &amp; field report</p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{weather.icon}</span>
                    <div>
                      <p className="m-0 text-xl font-bold text-blue-950">{weather.temp}°C</p>
                      <p className="m-0 text-sm text-blue-900/85">{weather.condition}</p>
                      <p className="m-0 text-xs text-blue-900/60">
                        {weather.city} · wind {weather.wind} km/h · good for {weather.temp > 15 ? 'turnin’ compost' : 'sippin’ cocoa in the shed'}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-2 grid grid-cols-5 gap-1 text-center text-[10px] font-semibold text-blue-950/80">
                    {weather.forecast.map((d) => (
                      <li key={d.day} className="rounded-md bg-white/50 px-0.5 py-1">
                        <div>{d.day}</div>
                        <div className="text-base leading-none">{d.icon}</div>
                        <div>
                          {d.high}°/{d.low}°
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="card border-4 shadow-lg"
                style={{ borderColor: '#e65100', background: 'linear-gradient(165deg, #fff3e0 0%, #ffe0b2 100%)' }}
              >
                <div className="card-body gap-3 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-900/70">Commodity shed board</p>
                  {stocks.map((s) => (
                    <div
                      key={s.ticker}
                      className="flex items-center justify-between gap-2 rounded-lg border-2 border-orange-200/80 bg-white/70 px-2 py-2 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="m-0 truncate font-bold">{s.ticker}</p>
                        <p className="m-0 truncate text-[10px] opacity-65">{COMMODITY_NICK[s.ticker] ?? s.name}</p>
                      </div>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#2e7d32' : '#c62828'} />
                      <span className={s.changePct >= 0 ? 'font-bold text-green-800' : 'font-bold text-red-800'}>
                        {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="card border-4 shadow-lg"
                style={{ borderColor: '#33691e', background: 'linear-gradient(170deg, #f1f8e9 0%, #dcedc8 100%)' }}
              >
                <div className="card-body gap-2 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-900/70">Extension bulletin</p>
                  <ul className="space-y-2 text-[11px] leading-snug">
                    {news.map((n) => (
                      <li key={n.id} className="rounded-lg border border-green-800/15 bg-white/60 px-2 py-2 shadow-sm">
                        <span className="mr-1">{n.emoji}</span>
                        {n.title}
                        <span className="mt-1 block text-[10px] opacity-55">
                          {n.source} · {n.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
