import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const BEAD_MARKET_NICK = {
  AAPL: 'Baobab Circuit Co.',
  NVDA: 'Lightning Weaver',
  BTC: 'Sun-disk Vault',
  ETH: 'River-mist Ledger',
  CAC40: 'Great Plains Index',
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

export default function AfricanTribeVillageLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length
  const tickerText = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')

  return (
    <>
      <style>
        {`
          @keyframes atv-sky-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes atv-sun-bob {
            0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 24px #ff9e00); }
            50% { transform: translateY(-8px) scale(1.05); filter: drop-shadow(0 0 40px #ffc14d); }
          }
          @keyframes atv-star-twinkle {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes atv-firefly {
            0% { transform: translate(0, 0); opacity: 0.2; }
            25% { transform: translate(12px, -20px); opacity: 0.9; }
            50% { transform: translate(-8px, -35px); opacity: 0.5; }
            75% { transform: translate(20px, -15px); opacity: 1; }
            100% { transform: translate(0, 0); opacity: 0.2; }
          }
          @keyframes atv-drum {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes atv-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes atv-giraffe {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(6px) rotate(2deg); }
          }
          @keyframes atv-grass {
            0%, 100% { transform: skewX(0deg); }
            50% { transform: skewX(3deg); }
          }
          @keyframes atv-pattern-shift {
            from { background-position: 0 0; }
            to { background-position: 48px 48px; }
          }
          .atv-sky-layer {
            background: linear-gradient(
              165deg,
              #1a0a2e 0%,
              #2d1b69 22%,
              #7c3aed 38%,
              #ea580c 58%,
              #fbbf24 72%,
              #fef3c7 88%,
              #fde68a 100%
            );
            background-size: 200% 200%;
            animation: atv-sky-shift 28s ease-in-out infinite;
          }
          .atv-sun-orb { animation: atv-sun-bob 5s ease-in-out infinite; }
          .atv-star { animation: atv-star-twinkle 3.2s ease-in-out infinite; }
          .atv-firefly-a { animation: atv-firefly 7s ease-in-out infinite; }
          .atv-firefly-b { animation: atv-firefly 9s ease-in-out infinite 1.5s; }
          .atv-firefly-c { animation: atv-firefly 6.5s ease-in-out infinite 3s; }
          .atv-drum-pulse { animation: atv-drum 0.85s ease-in-out infinite; }
          .atv-marquee-inner { animation: atv-marquee 42s linear infinite; }
          .atv-giraffe { animation: atv-giraffe 4s ease-in-out infinite; }
          .atv-grass-tuft { animation: atv-grass 2.4s ease-in-out infinite; }
          .atv-mudcloth {
            background-color: #3d2914;
            background-image:
              repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(232, 93, 4, 0.12) 6px, rgba(232, 93, 4, 0.12) 8px),
              repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(157, 78, 221, 0.08) 10px, rgba(157, 78, 221, 0.08) 12px);
            background-size: 48px 48px;
            animation: atv-pattern-shift 20s linear infinite;
          }
        `}
      </style>

      <div
        className="atv-sky-layer relative min-h-dvh overflow-x-hidden pb-28 text-[var(--text)]"
        style={{ fontFamily: 'var(--font-main)' }}
      >
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="atv-star absolute text-[6px] text-amber-100"
              style={{
                left: `${(i * 17 + 7) % 96}%`,
                top: `${(i * 13) % 42}%`,
                animationDelay: `${i * 0.35}s`,
              }}
            >
              ✦
            </span>
          ))}
          <div className="atv-sun-orb absolute right-[8%] top-[10%] text-6xl md:text-7xl">🌅</div>
          <div
            className="atv-firefly-a absolute left-[12%] top-[28%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_#bef264]"
            aria-hidden
          />
          <div
            className="atv-firefly-b absolute left-[55%] top-[40%] h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_#fde68a]"
            aria-hidden
          />
          <div
            className="atv-firefly-c absolute right-[20%] top-[32%] h-2 w-2 rounded-full bg-yellow-200 shadow-[0_0_14px_#fef08a]"
            aria-hidden
          />
          <div className="atv-giraffe absolute bottom-[min(22vh,180px)] left-[4%] text-4xl opacity-90 md:text-5xl">
            🦒
          </div>
        </div>

        <svg
          className="pointer-events-none fixed bottom-0 left-0 z-[1] w-full text-[#1c1208]"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden
          style={{ height: 'min(32vh, 260px)' }}
        >
          <defs>
            <linearGradient id="atvGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d2914" />
              <stop offset="100%" stopColor="#1a1008" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q200,40 400,90 T800,70 T1200,95 T1440,85 L1440,220 L0,220 Z" fill="url(#atvGround)" opacity="0.95" />
          <path
            d="M120,220 L120,95 Q125,70 135,95 L135,220 Z M118,95 Q110,60 95,85 Q105,55 120,70 Q135,55 145,85 Q130,60 122,95"
            fill="#2a1810"
          />
          <path
            d="M980,220 L980,110 Q990,75 1005,105 L1005,220 Z M978,105 Q965,65 945,95 Q960,55 985,75 Q1010,55 1025,95 Q1005,65 992,105"
            fill="#2a1810"
          />
          <path
            d="M520,220 L520,130 Q530,100 545,125 L545,220 Z M518,125 Q500,85 475,115 Q495,75 525,95 Q555,75 575,115 Q550,85 532,125"
            fill="#24160c"
          />
        </svg>

        <div
          className="pointer-events-none fixed bottom-0 left-0 z-[2] flex w-full justify-center gap-6 text-2xl opacity-80 md:text-3xl"
          style={{ bottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
          aria-hidden
        >
          <span className="atv-grass-tuft">🌾</span>
          <span className="atv-grass-tuft" style={{ animationDelay: '0.4s' }}>
            🌾
          </span>
          <span className="atv-grass-tuft" style={{ animationDelay: '0.8s' }}>
            🌾
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-3 py-6 md:px-5">
          <div className="atv-mudcloth mb-4 overflow-hidden rounded-xl border-2 border-[#c2410c] shadow-xl">
            <div className="flex flex-wrap items-center gap-3 px-3 py-2 md:px-4">
              <span className="atv-drum-pulse text-2xl" aria-hidden>
                🥁
              </span>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200/95">
                Drum line · village wire
              </p>
              <span className="badge badge-warning badge-sm font-bold">live</span>
            </div>
            <div className="relative overflow-hidden border-t border-amber-900/40 bg-[#1a0f08]/90 py-2">
              <div className="atv-marquee-inner flex w-max whitespace-nowrap text-sm text-amber-50">
                <span className="px-6">{tickerText}</span>
                <span className="px-6" aria-hidden>
                  {tickerText}
                </span>
              </div>
            </div>
          </div>

          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="card max-w-xl border-2 border-[#92400e] bg-[#292018]/95 shadow-2xl backdrop-blur-sm">
              <div className="card-body gap-3 p-5 md:p-6">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="relative text-5xl md:text-6xl" aria-hidden>
                    <span className="absolute -right-1 -top-1 text-lg">✨</span>
                    🛖
                  </div>
                  <div>
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent2)]">
                      Council circle HQ
                    </p>
                    <h1
                      className="m-0 text-3xl leading-tight text-[var(--text)] md:text-4xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Under the evening baobab
                    </h1>
                    <p className="m-0 mt-2 text-sm text-[var(--text2)]/90">
                      {unread === 1
                        ? `${unread} messenger still circling the fire`
                        : `${unread} messengers still circling the fire`}{' '}
                      · the rest are filed by the elders
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" aria-hidden>
                  {['🪘', '🌙', '🔥', '🐘'].map((c) => (
                    <span key={c} className="text-2xl opacity-90">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="rounded-xl border-2 border-[#a855f7]/50 bg-[#1e1033]/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-violet-200/80">Tonight&apos;s rhythm</p>
                <p className="m-0 mt-1 flex items-center gap-2 text-lg font-bold text-amber-100">
                  <span className="atv-drum-pulse inline-block">●</span> steady pulse
                </p>
              </div>
              <button type="button" className="btn btn-warning font-bold shadow-lg" onClick={onSwitchPersona}>
                Visit another world
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-12">
            <nav className="lg:col-span-4" aria-label="Messengers and calabashes">
              <h2
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-200/90"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span aria-hidden>🍯</span> Calabash line · who called the meeting
              </h2>
              <ul className="space-y-3">
                {emails.map((e, i) => {
                  const on = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`card card-side w-full cursor-pointer border-2 text-left shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl ${
                          on ? 'ring-2 ring-[var(--accent2)] ring-offset-2 ring-offset-[#1a0f2e]' : ''
                        }`}
                        style={{
                          borderColor: on ? 'var(--accent)' : '#78350f',
                          background: 'linear-gradient(145deg, #3d2914 0%, #2a1a0e 100%)',
                          color: 'var(--text)',
                        }}
                      >
                        <figure className="flex w-16 shrink-0 flex-col items-center justify-center gap-1 bg-[#1a1008] text-xl text-amber-100">
                          <span aria-hidden>🫴</span>
                          <span className="text-[10px] font-bold opacity-70">#{i + 1}</span>
                        </figure>
                        <div className="card-body gap-1 p-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-2xl">{e.from.avatar}</span>
                            {!e.read && (
                              <span className="badge border-0 bg-[var(--accent)] text-[#1a0a2e]">new ember</span>
                            )}
                          </div>
                          <p className="line-clamp-2 text-sm font-bold">{e.subject}</p>
                          <p className="text-xs text-[var(--text2)]/75">{e.from.name}</p>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <main className="lg:col-span-5">
              {selectedEmail ? (
                <article
                  className="card border-2 border-amber-700/60 bg-gradient-to-b from-[#fff8e7] to-[#fde6c4] text-[#1c1208] shadow-2xl"
                  style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.35), inset 0 0 60px rgba(234, 88, 12, 0.06)' }}
                >
                  <div className="card-body gap-4">
                    <div className="flex flex-wrap items-start gap-3 border-b-2 border-dashed border-amber-900/25 pb-4">
                      <span className="text-5xl">{selectedEmail.from.avatar}</span>
                      <div>
                        <h2 className="card-title text-2xl text-[#1c1208]" style={{ fontFamily: 'var(--font-display)' }}>
                          {selectedEmail.subject}
                        </h2>
                        <p className="text-sm text-[#422006]/80">
                          Told by {selectedEmail.from.name} · marked {selectedEmail.date}
                        </p>
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap rounded-lg bg-[#fffdf7]/95 p-4 text-sm leading-relaxed text-[#292018] shadow-inner">
                      {selectedEmail.body}
                    </div>
                    <p className="text-xs italic text-amber-900/55">Sealed with good intentions and a little dust from the path.</p>
                  </div>
                </article>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-600/40 bg-[#292018]/80 p-8 text-center shadow-inner backdrop-blur-sm">
                  <span className="text-7xl">🦓</span>
                  <p className="mt-4 text-lg font-bold text-amber-100" style={{ fontFamily: 'var(--font-display)' }}>
                    Pick a calabash on the left — stories open beside the firelight.
                  </p>
                </div>
              )}
            </main>

            <aside className="flex flex-col gap-4 lg:col-span-3">
              <div className="card border-2 border-sky-500/40 bg-gradient-to-br from-[#0c4a6e]/95 to-[#082f49]/95 text-sky-50 shadow-xl backdrop-blur-sm">
                <div className="card-body gap-2 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-200/80">Sky watcher&apos;s report</p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl drop-shadow-lg">{weather.icon}</span>
                    <div>
                      <p className="m-0 text-2xl font-bold">{weather.temp}°C</p>
                      <p className="m-0 text-sm text-sky-100/90">{weather.condition}</p>
                      <p className="m-0 text-xs text-sky-200/70">
                        {weather.city} · wind {weather.wind} km/h ·{' '}
                        {weather.temp > 22 ? 'good night for songs outside' : 'wrap up — the breeze has teeth'}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-2 grid grid-cols-5 gap-1 text-center text-[10px] font-semibold">
                    {weather.forecast.map((d) => (
                      <li key={d.day} className="rounded-md bg-sky-950/40 px-0.5 py-1 text-sky-100">
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

              <div className="card border-2 border-[#ca8a04] bg-gradient-to-br from-[#422006]/95 to-[#291504]/95 shadow-xl backdrop-blur-sm">
                <div className="card-body gap-3 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80">Bead market board</p>
                  {stocks.map((s) => (
                    <div
                      key={s.ticker}
                      className="flex items-center justify-between gap-2 rounded-lg border border-amber-800/40 bg-[#1a0f08]/60 px-2 py-2 text-xs text-amber-50"
                    >
                      <div className="min-w-0">
                        <p className="m-0 truncate font-bold">{s.ticker}</p>
                        <p className="m-0 truncate text-[10px] opacity-70">{BEAD_MARKET_NICK[s.ticker] ?? s.name}</p>
                      </div>
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} />
                      <span className={s.changePct >= 0 ? 'font-bold text-green-300' : 'font-bold text-red-300'}>
                        {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card border-2 border-violet-500/35 bg-gradient-to-br from-[#3b0764]/90 to-[#1e0533]/95 shadow-xl backdrop-blur-sm">
                <div className="card-body gap-2 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/85">Stories by the council fire</p>
                  <ul className="space-y-2 text-[11px] leading-snug text-violet-50">
                    {news.map((n) => (
                      <li
                        key={n.id}
                        className="rounded-lg border border-violet-400/15 bg-violet-950/35 px-2 py-2 shadow-sm"
                      >
                        <span className="mr-1">{n.emoji}</span>
                        {n.title}
                        <span className="mt-1 block text-[10px] text-violet-200/55">
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
