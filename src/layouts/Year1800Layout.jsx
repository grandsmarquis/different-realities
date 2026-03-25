import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function toFahrenheit(c) {
  return Math.round((c * 9) / 5 + 32)
}

/** Réaumur scale — still encountered in early-19th-century France */
function toReaumur(c) {
  return Math.round(c * 0.8 * 10) / 10
}

function CornerFlourish({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M4 60C4 32 20 8 60 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M8 56c8-20 22-36 48-44"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="58" cy="6" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

function QuillMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" aria-hidden>
      <path
        d="M8 32c18-8 38-22 58-28 12-3 24-2 36 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M100 6l12 8-6 4-8-10z" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

function WaxSeal({ className }) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? ''}`} aria-hidden>
      <div className="regency-seal absolute inset-0 rounded-full bg-gradient-to-br from-[#6b1c23] via-[#8b2635] to-[#4a1018] shadow-lg ring-2 ring-[#3d0d14]/80" />
      <span className="relative z-[1] font-serif text-[0.55rem] font-bold uppercase tracking-[0.15em] text-[#f0d0a0]/90">W</span>
    </div>
  )
}

export default function Year1800Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const f = useMemo(() => toFahrenheit(weather.temp), [])
  const re = useMemo(() => toReaumur(weather.temp), [])

  const tickerText = useMemo(
    () =>
      stocks
        .map(s => {
          const sign = s.changePct >= 0 ? '↑' : '↓'
          return `${s.ticker} ${s.currency}${s.price.toFixed(2)} ${sign} ${Math.abs(s.changePct).toFixed(2)}%`
        })
        .join('   ·   '),
    [],
  )

  const unread = emails.filter(e => !e.read).length

  const stockEpithet = {
    AAPL: 'Orchard & Company',
    NVDA: 'The Green Glass Works',
    BTC: 'Specie of the New World',
    CAC40: 'Paris Forty Fund',
  }

  return (
    <div className="regency-shell relative min-h-screen overflow-x-hidden bg-[#140d08] text-[#e8dcc8]">
      <style>{`
        @keyframes regency-candle {
          0%, 100% { opacity: 0.88; filter: brightness(1); }
          25% { opacity: 0.94; filter: brightness(1.04); }
          50% { opacity: 0.85; filter: brightness(0.97); }
          75% { opacity: 0.92; filter: brightness(1.02); }
        }
        @keyframes regency-mote {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { transform: translateY(-28px) translateX(6px); opacity: 0.45; }
        }
        @keyframes regency-seal-tilt {
          0%, 100% { transform: rotate(-6deg) scale(1); }
          50% { transform: rotate(-4deg) scale(1.03); }
        }
        @keyframes regency-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes regency-card {
          from { opacity: 0; transform: translateY(10px) rotate(-0.4deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes regency-quill {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        .regency-shell .regency-vignette {
          animation: regency-candle 4.2s ease-in-out infinite;
        }
        .regency-shell .regency-mote {
          animation: regency-mote 7s ease-in-out infinite;
        }
        .regency-shell .regency-seal {
          animation: regency-seal-tilt 5s ease-in-out infinite;
        }
        .regency-shell .regency-ticker {
          animation: regency-scroll 32s linear infinite;
        }
        .regency-shell .regency-quill-float {
          animation: regency-quill 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Wood grain + candle vignette */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(92deg, transparent, transparent 2px, rgba(90,60,40,0.12) 2px, rgba(90,60,40,0.12) 3px),
            repeating-linear-gradient(0deg, transparent, transparent 180px, rgba(40,25,15,0.08) 180px, rgba(40,25,15,0.08) 181px)
          `,
        }}
        aria-hidden
      />
      <div
        className="regency-vignette pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 50% -5%, rgba(255, 180, 100, 0.18), transparent 52%), radial-gradient(ellipse 60% 45% at 80% 20%, rgba(255, 200, 120, 0.06), transparent 45%), radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,0,0.75), transparent 55%)',
        }}
        aria-hidden
      />

      {/* Dust motes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="regency-mote absolute h-0.5 w-0.5 rounded-full bg-[#f5e6c8]"
            style={{
              left: `${8 + (i * 7) % 84}%`,
              top: `${12 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <header className="relative mb-10">
          <CornerFlourish className="pointer-events-none absolute -left-1 -top-2 h-14 w-14 text-[#c9a06a]" />
          <CornerFlourish className="pointer-events-none absolute -right-1 -top-2 h-14 w-14 scale-x-[-1] text-[#c9a06a]" />

          <div className="text-center">
            <QuillMark className="regency-quill-float mx-auto mb-2 h-8 w-32 text-[#c9a06a]/60" />
            <p
              className="mb-1 text-[0.7rem] uppercase tracking-[0.5em] text-[#a89078]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Paris · Anno Domini MDCCC
            </p>
            <h1
              className="text-[clamp(1.85rem,5.5vw,3rem)] font-normal leading-tight tracking-[0.08em] text-[#f5ebd8]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Morning Intelligence
            </h1>
            <p className="mt-2 font-serif text-sm italic text-[#9a8470]">
              Being a faithful digest of correspondence, barometer, gazette &amp; funds
            </p>
            <div
              className="mx-auto mt-5 h-px max-w-lg bg-gradient-to-r from-transparent via-[#8b5a3c] to-transparent opacity-80"
              aria-hidden
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span
              className="badge border-[#5c4030] bg-[#2a1810] px-3 text-[#e8d4a8]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {unread} letter{unread === 1 ? '' : 's'} yet unbroken
            </span>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-sm border-[#5c4030] bg-[#1a1008] text-[#d4c4a8] hover:border-[#c9a06a] hover:bg-[#3d2818] hover:text-[#fff8e8]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              Quit the study
            </button>
          </div>
        </header>

        {/* Exchange broadsheet strip */}
        <div className="mb-8 overflow-hidden border-y border-[#4a3020] bg-[#0f0a06] py-2.5">
          <div className="whitespace-nowrap font-mono text-[0.7rem] tracking-wide text-[#c9a06a]/90">
            <div className="regency-ticker inline-block">
              <span className="inline-block pr-20">◆ LLOYD’S SCRIP — {tickerText}</span>
              <span className="inline-block pr-20">◆ LLOYD’S SCRIP — {tickerText}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Correspondence */}
          <section className="lg:col-span-7">
            <h2
              className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-[#c9a06a]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <WaxSeal className="h-9 w-9 shrink-0" />
              Correspondence upon the escritoire
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="group relative w-full text-left"
                  style={{ animation: `regency-card 0.55s ease-out ${i * 0.07}s both` }}
                >
                  <div
                    className="relative overflow-hidden border border-[#8b7355]/50 bg-gradient-to-br from-[#f2e8d5] via-[#ebe0cc] to-[#dfd2bc] p-4 text-[#1a120c] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:z-[1] group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 3% 100%, 0 97%)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                      }}
                      aria-hidden
                    />
                    {!email.read && (
                      <span className="badge badge-sm mb-2 border-0 bg-[#6b1c23] text-[0.6rem] uppercase tracking-wider text-[#f5d0c8]">
                        Unread — haste
                      </span>
                    )}
                    <p
                      className="text-[0.65rem] uppercase tracking-[0.2em] text-[#5c4a3a]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      From {email.from.name}
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-snug" style={{ fontFamily: 'var(--font-main)' }}>
                      {email.subject}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#3d3228]">{email.preview}</p>
                    <div className="mt-3 flex justify-between border-t border-dashed border-[#a89078]/60 pt-2 text-[0.65rem] text-[#5c4a3a]">
                      <span>{email.date}</span>
                      <span className="uppercase tracking-wider">{email.tag}</span>
                    </div>
                    <span
                      className="absolute bottom-3 right-3 text-[0.55rem] uppercase tracking-[0.25em] text-[#8b6914] opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Break seal
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-5">
            {/* Barometer card */}
            <div className="relative overflow-hidden border-2 border-[#6b4a32] bg-gradient-to-b from-[#261810] to-[#1a1008] p-5 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-[#c9a06a]/15"
                aria-hidden
              />
              <h3
                className="text-xs uppercase tracking-[0.35em] text-[#e8d4a8]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Barometer &amp; vulgar observations
              </h3>
              <p className="mt-3 text-4xl leading-none" aria-hidden>
                {weather.icon}
              </p>
              <p className="mt-2 text-xl" style={{ fontFamily: 'var(--font-main)' }}>
                <span className="text-[#f5ebd8]">{re}° Réaumur</span>
                <span className="ml-2 text-base text-[#9a8470]">
                  ({weather.temp}° centigrade · {f}° Fahrenheit)
                </span>
              </p>
              <p className="mt-1 italic text-[#b8a090]">
                {weather.condition} o’er {weather.city}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#7a6858]">
                Humidity of the air {weather.humidity}% · Wind {weather.wind} km/h (a modern reckoning, for precision)
              </p>
              <div className="mt-4 border-t border-[#4a3020] pt-3">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#c9a06a]/80" style={{ fontFamily: 'var(--font-display)' }}>
                  Almanack (five days)
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {weather.forecast.map(d => (
                    <li
                      key={d.day}
                      className="flex items-center gap-1.5 rounded border border-[#5c4030]/60 bg-[#1c120c] px-2 py-1 text-xs text-[#d4c4a8]"
                    >
                      <span aria-hidden>{d.icon}</span>
                      <span>{d.day}</span>
                      <span className="opacity-70">
                        {d.high}°/{d.low}°
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gazette */}
            <div className="relative border border-[#5c4030] bg-[#1e140e] p-5">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#c9a06a]/40 via-transparent to-[#c9a06a]/20" aria-hidden />
              <h3
                className="mb-4 text-center text-xs uppercase tracking-[0.45em] text-[#c9a06a]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Coffee-house intelligence
              </h3>
              <ul className="space-y-4">
                {news.map((n, idx) => (
                  <li
                    key={n.id}
                    className="border-b border-[#3d2818] pb-4 last:border-0 last:pb-0"
                    style={{ animation: `regency-card 0.5s ease-out ${0.12 + idx * 0.07}s both` }}
                  >
                    <p className="text-base leading-snug" style={{ fontFamily: 'var(--font-main)' }}>
                      <span className="mr-1" aria-hidden>
                        {n.emoji}
                      </span>
                      <span className="font-semibold text-[#f0e6d8]">{n.title}</span>
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-[#7a6858]">
                      {n.source} · {n.category} · {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Funds */}
            <div className="border border-[#5c4030] bg-gradient-to-b from-[#241810] to-[#140d08] p-5">
              <h3
                className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c9a06a]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Funds, canals &amp; curious scrip
              </h3>
              <div className="space-y-3">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="flex items-baseline justify-between border-b border-[#3d2818] pb-2 last:border-0"
                  >
                    <div>
                      <span className="font-mono text-lg text-[#e8d4a8]">{s.ticker}</span>
                      <p className="text-[0.7rem] italic text-[#7a6858]">{stockEpithet[s.ticker] ?? s.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[#f5ebd8]">
                        {s.currency}
                        {s.price.toFixed(2)}
                      </span>
                      <span
                        className={`ml-2 font-mono text-sm ${s.changePct >= 0 ? 'text-emerald-400/90' : 'text-rose-400/90'}`}
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="regency-letter-title"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border-[3px] border-double border-[#6b4a32] bg-gradient-to-br from-[#f5ecd8] to-[#e5d8c4] p-8 text-[#1a120c] shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{
              boxShadow: '0 28px 90px rgba(0,0,0,0.55), inset 0 0 100px rgba(139, 90, 60, 0.06)',
            }}
          >
            <div className="pointer-events-none absolute right-6 top-6" aria-hidden>
              <WaxSeal className="h-14 w-14 opacity-90" />
            </div>
            <p
              className="text-center text-[0.65rem] uppercase tracking-[0.4em] text-[#6b5344]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Private &amp; confidential
            </p>
            <h2 id="regency-letter-title" className="mt-4 pr-16 text-xl font-semibold leading-snug" style={{ fontFamily: 'var(--font-main)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-sm text-[#4a3d32]">
              Your humble servant <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
            </p>
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent" />
            <pre
              className="whitespace-pre-wrap text-sm leading-relaxed text-[#2a2218]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {selectedEmail.body}
            </pre>
            <p className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.35em] text-[#8a7868]" style={{ fontFamily: 'var(--font-display)' }}>
              — Finis —
            </p>
            <button
              type="button"
              onClick={() => setSelectedEmail(null)}
              className="btn mt-6 w-full border-[#5c4030] bg-[#2a1810] text-[#e8d4a8] hover:border-[#c9a06a] hover:bg-[#3d2818]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              Fold &amp; return to desk
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
