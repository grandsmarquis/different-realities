import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function toFahrenheit(c) {
  return Math.round((c * 9) / 5 + 32)
}

function ArtDecoFan() {
  return (
    <svg className="twenties-fan pointer-events-none absolute -top-8 left-1/2 h-32 w-[min(100%,28rem)] -translate-x-1/2 opacity-[0.12]" viewBox="0 0 400 80" aria-hidden>
      <defs>
        <linearGradient id="twG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0" />
          <stop offset="50%" stopColor="#f0d78c" stopOpacity="1" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 13 }, (_, i) => {
        const x = 40 + i * 26
        return (
          <path
            key={i}
            d={`M ${x} 78 Q 200 -20 ${400 - x} 78`}
            fill="none"
            stroke="url(#twG)"
            strokeWidth="1.2"
            className="twenties-fan-ray"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        )
      })}
    </svg>
  )
}

export default function Year1920Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const f = useMemo(() => toFahrenheit(weather.temp), [])
  const tickerText = useMemo(
    () =>
      stocks
        .map(s => {
          const sign = s.changePct >= 0 ? '▲' : '▼'
          return `${s.ticker} ${s.currency}${s.price.toFixed(2)} ${sign} ${Math.abs(s.changePct).toFixed(2)}%`
        })
        .join('   ·   '),
    [],
  )

  const unread = emails.filter(e => !e.read).length

  return (
    <div className="twenties-shell relative min-h-screen overflow-x-hidden bg-[#0e0c0a] text-[#f5e6c8]">
      <style>{`
        @keyframes twenties-shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes twenties-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.35; }
          50% { transform: translateY(-14px) rotate(4deg); opacity: 0.7; }
        }
        @keyframes twenties-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes twenties-fan-pulse {
          0%, 100% { stroke-opacity: 0.15; }
          50% { stroke-opacity: 0.55; }
        }
        @keyframes twenties-line-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .twenties-shell .twenties-fan-ray {
          animation: twenties-fan-pulse 3.5s ease-in-out infinite;
        }
        .twenties-shell .twenties-masthead-shine {
          background: linear-gradient(
            90deg,
            #8b7355 0%,
            #f0d78c 25%,
            #fff8e7 50%,
            #f0d78c 75%,
            #8b7355 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: twenties-shine 6s linear infinite;
        }
        .twenties-shell .twenties-bubble {
          position: absolute;
          border-radius: 9999px;
          border: 1px solid rgba(201, 162, 39, 0.35);
          background: radial-gradient(circle at 30% 30%, rgba(255, 248, 231, 0.15), transparent 60%);
          animation: twenties-float 5s ease-in-out infinite;
        }
        .twenties-shell .twenties-ticker-track {
          animation: twenties-ticker 28s linear infinite;
        }
        .twenties-shell .twenties-deco-line {
          animation: twenties-line-glow 2.8s ease-in-out infinite;
        }
        .twenties-shell .twenties-card-enter {
          animation: twenties-card-in 0.55s ease-out both;
        }
        @keyframes twenties-card-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Ambient bubbles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="twenties-bubble left-[8%] top-[20%] h-3 w-3" style={{ animationDelay: '0s' }} />
        <div className="twenties-bubble left-[22%] top-[55%] h-2 w-2" style={{ animationDelay: '1.2s' }} />
        <div className="twenties-bubble right-[15%] top-[30%] h-4 w-4" style={{ animationDelay: '2.1s' }} />
        <div className="twenties-bubble right-[28%] top-[70%] h-2.5 w-2.5" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* Art deco grid + vignette */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #c9a227 1px, transparent 1px),
            linear-gradient(#c9a227 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,162,39,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 50% 120%, rgba(30,20,10,0.9), transparent 50%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <header className="relative mb-10 text-center">
          <ArtDecoFan />
          <div className="twenties-deco-line mx-auto mb-3 h-px max-w-md bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />
          <p
            className="mb-1 text-[0.65rem] uppercase tracking-[0.55em] text-[#b8a074]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Paris · Wireless Edition
          </p>
          <h1
            className="twenties-masthead-shine text-[clamp(1.75rem,6vw,3.25rem)] font-normal uppercase leading-tight tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Modern Chronicle
          </h1>
          <p className="mt-2 font-serif text-sm italic text-[#9a8a6e]">Anno Domini MCMXX · Society, Wire &amp; Exchange</p>
          <div className="twenties-deco-line mx-auto mt-4 h-px max-w-md bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span
              className="badge badge-outline border-[#c9a227] bg-[#1a1510] px-3 text-[#e8d5a3]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {unread} urgent dispatch{unread === 1 ? '' : 'es'}
            </span>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-sm border-[#6b5c3e] bg-transparent text-[#d4c4a8] hover:border-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              Leave the club
            </button>
          </div>
        </header>

        {/* Stock ticker */}
        <div className="mb-8 overflow-hidden border-y border-[#3d3428] bg-[#120f0c] py-2">
          <div className="whitespace-nowrap font-mono text-xs tracking-wide text-[#c9a227]">
            <div className="twenties-ticker-track inline-block">
              <span className="inline-block pr-16">
                ★ EXCHANGE TAPE — {tickerText}
              </span>
              <span className="inline-block pr-16">
                ★ EXCHANGE TAPE — {tickerText}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Telegram desk */}
          <section className="lg:col-span-7">
            <h2
              className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-[#c9a227]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="inline-block h-2 w-2 rotate-45 border border-[#c9a227] bg-[#c9a227]/30" aria-hidden />
              Western Union Desk
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="twenties-card-enter group relative w-full text-left transition-transform duration-300 hover:z-[1] hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div
                    className="relative overflow-hidden border-2 border-[#4a3f2e] bg-gradient-to-br from-[#f8ecd4] to-[#e8d4b0] p-4 text-[#1f1810] shadow-lg"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#c9a227]/25"
                      aria-hidden
                    />
                    {!email.read && (
                      <span className="badge badge-sm mb-2 border-0 bg-[#8b1538] text-[0.6rem] uppercase tracking-wider text-[#fde8ef]">
                        Unread — rush
                      </span>
                    )}
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#6b5344]">
                      From · {email.from.name}
                    </p>
                    <p
                      className="mt-2 font-semibold leading-snug"
                      style={{ fontFamily: 'var(--font-main)' }}
                    >
                      {email.subject}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4a3d32]">{email.preview}</p>
                    <div className="mt-3 flex justify-between border-t border-dashed border-[#b9a080] pt-2 font-mono text-[0.65rem] text-[#6b5344]">
                      <span>{email.date}</span>
                      <span className="uppercase">{email.tag}</span>
                    </div>
                    <span
                      className="absolute bottom-2 right-3 text-[0.55rem] uppercase tracking-[0.2em] text-[#c9a227]/80 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Open
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-5">
            {/* Weather — wireless bureau */}
            <div
              className="relative overflow-hidden border-2 border-[#c9a227] bg-[#161210] p-5"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(201,162,39,0.2), 0 0 0 1px #0a0806',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 6px, #c9a227 6px, #c9a227 7px)',
                }}
                aria-hidden
              />
              <h3
                className="relative text-xs uppercase tracking-[0.4em] text-[#f0d78c]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Météorologie par T.S.F.
              </h3>
              <p className="relative mt-3 text-4xl leading-none" aria-hidden>
                {weather.icon}
              </p>
              <p className="relative mt-2 text-2xl text-[#fdf6e3]" style={{ fontFamily: 'var(--font-main)' }}>
                {f}° Fahrenheit
                <span className="ml-2 text-base font-normal text-[#9a8a6e]">({weather.temp}° centigrade)</span>
              </p>
              <p className="relative mt-1 italic text-[#c4b89a]">{weather.condition} over {weather.city}</p>
              <p className="relative mt-3 text-xs text-[#7a6b52]">
                Humidity {weather.humidity}% · Zephyr {weather.wind} km/h — quite modern numbers, old sport.
              </p>
            </div>

            {/* Headlines */}
            <div className="border border-[#4a3f2e] bg-[#1a1510] p-5">
              <h3
                className="mb-4 text-center text-xs uppercase tracking-[0.5em] text-[#c9a227]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Stop the Presses
              </h3>
              <ul className="space-y-4">
                {news.map((n, idx) => (
                  <li
                    key={n.id}
                    className="border-b border-[#2a241c] pb-4 last:border-0 last:pb-0"
                    style={{ animation: `twenties-card-in 0.5s ease-out ${0.15 + idx * 0.08}s both` }}
                  >
                    <p className="text-lg leading-snug" style={{ fontFamily: 'var(--font-main)' }}>
                      <span className="mr-1" aria-hidden>
                        {n.emoji}
                      </span>
                      <span className="font-semibold text-[#fdf6e3]">{n.title}</span>
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#7a6b52]">
                      {n.source} · {n.category} · {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stocks — exchange board */}
            <div className="border border-[#4a3f2e] bg-gradient-to-b from-[#1c1814] to-[#12100e] p-5">
              <h3
                className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c9a227]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Bourse closing bell
              </h3>
              <div className="space-y-3">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="flex items-baseline justify-between border-b border-[#2c2620] pb-2 last:border-0"
                  >
                    <div>
                      <span className="font-mono text-lg text-[#f0d78c]">{s.ticker}</span>
                      <span className="ml-2 text-xs text-[#6b5c4a]">{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[#fdf6e3]">
                        {s.currency}
                        {s.price.toFixed(2)}
                      </span>
                      <span
                        className={`ml-2 font-mono text-sm ${s.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                      >
                        {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="twenties-letter-title"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 border-double border-[#c9a227] bg-gradient-to-br from-[#faf3e0] to-[#e8d9bc] p-8 text-[#1f1810] shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 0 60px rgba(201,162,39,0.08)',
            }}
          >
            <div
              className="pointer-events-none absolute left-8 top-6 h-16 w-16 rounded-full border-2 border-[#8b1538]/40 opacity-50"
              style={{ transform: 'rotate(-12deg)' }}
              aria-hidden
            />
            <p
              className="text-center text-[0.65rem] uppercase tracking-[0.45em] text-[#8b7355]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Confidential correspondence
            </p>
            <h2 id="twenties-letter-title" className="mt-4 text-xl font-semibold leading-snug" style={{ fontFamily: 'var(--font-main)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-sm text-[#5c4d3d]">
              From <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
            </p>
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
            <pre
              className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-[#2a2218]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {selectedEmail.body}
            </pre>
            <p className="mt-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#9a8a6e]">
              — STOP — END OF MESSAGE —
            </p>
            <button
              type="button"
              onClick={() => setSelectedEmail(null)}
              className="btn btn-sm mt-6 w-full border-[#4a3f2e] bg-[#1a1510] text-[#e8d5a3] hover:border-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208]"
            >
              Fold letter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
