import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function SynthGrid() {
  return (
    <div className="y80-grid pointer-events-none fixed inset-0 overflow-hidden opacity-40" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(5,217,232,0.06) 40%, rgba(255,42,109,0.12) 100%), repeating-linear-gradient(90deg, rgba(5,217,232,0.12) 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, rgba(255,42,109,0.08) 0 1px, transparent 1px 40px)',
          transform: 'perspective(400px) rotateX(60deg) scale(2.2)',
          transformOrigin: '50% 100%',
        }}
      />
    </div>
  )
}

function PacDots() {
  return (
    <div className="pointer-events-none absolute bottom-8 left-6 flex items-center gap-2 opacity-80 sm:left-10" aria-hidden>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="y80-dot inline-block h-2 w-2 rounded-full bg-[#fff591]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className="text-2xl drop-shadow-[0_0_10px_rgba(5,217,232,0.8)]" aria-hidden>
        👾
      </span>
    </div>
  )
}

function CassetteSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden>
      <rect x="2" y="6" width="60" height="28" rx="3" fill="#2a1f3d" stroke="#ff2a6d" strokeWidth="1.2" />
      <rect x="10" y="12" width="44" height="16" rx="1" fill="#0f0a18" />
      <circle cx="22" cy="20" r="5" fill="#1a1228" stroke="#05d9e8" strokeWidth="0.8" />
      <circle cx="42" cy="20" r="5" fill="#1a1228" stroke="#05d9e8" strokeWidth="0.8" />
      <rect x="26" y="17" width="12" height="6" rx="1" fill="#ff2a6d" opacity="0.85" />
    </svg>
  )
}

export default function Year1980Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
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
    <div className="y80-shell relative min-h-screen overflow-x-hidden bg-[#12081f] text-[#f0e6ff]">
      <style>{`
        @keyframes y80-grid-drift {
          0% { transform: perspective(400px) rotateX(60deg) scale(2.2) translateY(0); }
          100% { transform: perspective(400px) rotateX(60deg) scale(2.2) translateY(18px); }
        }
        @keyframes y80-chrome {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes y80-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 0.97; }
          93% { opacity: 0.88; }
          94% { opacity: 1; }
        }
        @keyframes y80-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes y80-tape-reel {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes y80-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes y80-card-pop {
          from { opacity: 0; transform: translateY(14px) scale(0.96) rotateX(8deg); }
          to { opacity: 1; transform: translateY(0) scale(1) rotateX(0); }
        }
        @keyframes y80-radar {
          0% { transform: scale(0.2); opacity: 0.9; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes y80-dot-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes y80-memphis {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        .y80-shell .y80-grid > div {
          animation: y80-grid-drift 12s linear infinite;
        }
        .y80-shell .y80-chrome-text {
          background: linear-gradient(
            90deg,
            #05d9e8,
            #fff591,
            #ff2a6d,
            #05d9e8
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: y80-chrome 4s linear infinite;
        }
        .y80-shell .y80-crt-wrap {
          animation: y80-flicker 4s ease-in-out infinite;
        }
        .y80-shell .y80-scanline {
          pointer-events: none;
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(5, 217, 232, 0.12),
            transparent
          );
          animation: y80-scan 7s linear infinite;
        }
        .y80-shell .y80-reel {
          animation: y80-tape-reel 2.2s linear infinite;
        }
        .y80-shell .y80-reel-reverse {
          animation-direction: reverse;
        }
        .y80-shell .y80-ticker-track {
          animation: y80-ticker 32s linear infinite;
        }
        .y80-shell .y80-dot {
          animation: y80-dot-pulse 1.2s ease-in-out infinite;
        }
        .y80-shell .y80-pacmouth {
          animation: y80-pac-chomp 0.35s ease-in-out infinite;
        }
        .y80-shell .y80-memphis-blob {
          animation: y80-memphis 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .y80-shell .y80-grid > div,
          .y80-shell .y80-chrome-text,
          .y80-shell .y80-crt-wrap,
          .y80-shell .y80-scanline,
          .y80-shell .y80-reel,
          .y80-shell .y80-ticker-track,
          .y80-shell .y80-dot,
          .y80-shell .y80-memphis-blob {
            animation: none !important;
          }
          .y80-shell .y80-chrome-text { color: #05d9e8; background: none; -webkit-text-fill-color: currentColor; }
        }
      `}</style>

      <SynthGrid />

      {/* Wood paneling + vignette */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #3d2817 0px, #2a1a0f 8px, #4a3020 16px), repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,0,0,0.08) 60px, rgba(0,0,0,0.08) 62px)',
          backgroundBlendMode: 'multiply',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% -15%, rgba(255,42,109,0.18), transparent 50%), radial-gradient(ellipse 80% 60% at 100% 50%, rgba(5,217,232,0.08), transparent 45%), radial-gradient(ellipse 70% 50% at 0% 80%, rgba(255,245,145,0.06), transparent 40%)',
        }}
        aria-hidden
      />

      {/* Memphis accents */}
      <div className="pointer-events-none fixed right-4 top-20 z-[1] hidden sm:block" aria-hidden>
        <div
          className="y80-memphis-blob h-14 w-14 rounded-sm border-2 border-[#05d9e8] bg-[#ff2a6d]/30"
          style={{ animationDelay: '0.3s' }}
        />
      </div>
      <div className="pointer-events-none fixed left-8 top-1/3 z-[1] hidden md:block" aria-hidden>
        <div className="y80-memphis-blob h-6 w-24 rotate-12 border-2 border-[#fff591] bg-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <header className="relative mb-10 text-center">
          <p
            className="mb-2 text-[0.65rem] uppercase tracking-[0.5em] text-[#05d9e8]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Home entertainment system · channel 3
          </p>
          <h1
            className="y80-chrome-text text-[clamp(1.6rem,5.5vw,3rem)] font-extrabold uppercase leading-tight tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Totally tubular terminal
          </h1>
          <p className="mt-2 text-sm text-[#b8a8d4]" style={{ fontFamily: 'var(--font-main)' }}>
            It is still 1980. The web does not exist yet. Your messages arrive anyway. (Spooky.)
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="badge border-[#ff2a6d] bg-[#1e1235] px-3 text-[#fff591]" style={{ fontFamily: 'var(--font-main)' }}>
              {unread} unread tape{unread === 1 ? '' : 's'}
            </span>
            <span className="badge badge-outline border-[#05d9e8] text-[#05d9e8]" style={{ fontFamily: 'var(--font-main)' }}>
              DEC 1980
            </span>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-sm border-[#ff2a6d] bg-transparent text-[#ff2a6d] hover:bg-[#ff2a6d] hover:text-[#12081f]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Eject · 2026
            </button>
          </div>
        </header>

        {/* LED ticker */}
        <div className="mb-8 overflow-hidden rounded-lg border border-[#05d9e8]/40 bg-[#0a0612] py-2 shadow-[0_0_24px_rgba(5,217,232,0.15)]">
          <div
            className="whitespace-nowrap text-xs tracking-widest text-[#3dff9a]"
            style={{
              fontFamily: 'var(--font-main)',
              textShadow: '0 0 8px rgba(61,255,154,0.6), 0 0 2px #3dff9a',
            }}
          >
            <div className="y80-ticker-track inline-block">
              <span className="inline-block pr-20">★ WALL ST. LED — {tickerText}</span>
              <span className="inline-block pr-20">★ WALL ST. LED — {tickerText}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Inbox — cassette wall */}
          <section className="lg:col-span-7">
            <h2
              className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-[#ff2a6d]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <CassetteSvg className="h-8 w-12 shrink-0" />
              Boombox inbox (side A)
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="group relative w-full text-left transition-transform duration-300 hover:z-[1] hover:-translate-y-1 hover:rotate-[-0.5deg]"
                  style={{
                    animation: `y80-card-pop 0.55s ease-out ${i * 0.07}s both`,
                  }}
                >
                  <div className="y80-crt-wrap relative overflow-hidden rounded-lg border-2 border-[#05d9e8]/60 bg-gradient-to-br from-[#1e1235] to-[#0f0a18] p-4 shadow-[inset_0_0_40px_rgba(5,217,232,0.06),0_12px_40px_rgba(0,0,0,0.45)]">
                    <div className="y80-scanline" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
                      }}
                      aria-hidden
                    />
                    <div className="relative flex items-start gap-3">
                      <div className="relative mt-1 h-10 w-10 shrink-0 rounded-full border border-[#ff2a6d]/50 bg-[#2a1f3d]">
                        <div
                          className="y80-reel absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-[#05d9e8]/60"
                          aria-hidden
                        />
                        <div
                          className="y80-reel y80-reel-reverse absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-[#05d9e8]/60"
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        {!email.read && (
                          <span className="badge badge-sm mb-2 border-0 bg-[#ff2a6d] text-[0.6rem] uppercase tracking-wider text-white">
                            NEW · rewind required
                          </span>
                        )}
                        <p className="text-[0.65rem] uppercase tracking-widest text-[#05d9e8]" style={{ fontFamily: 'var(--font-main)' }}>
                          FROM · {email.from.name}
                        </p>
                        <p
                          className="mt-1 font-bold leading-snug text-[#fff591] group-hover:text-white"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {email.subject}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#c4b4e0]">{email.preview}</p>
                        <div className="mt-3 flex justify-between border-t border-dashed border-[#3d2a55] pt-2 text-[0.65rem] text-[#8a7aa8]" style={{ fontFamily: 'var(--font-main)' }}>
                          <span>{email.date}</span>
                          <span className="uppercase">{email.tag}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="absolute bottom-2 right-3 text-[0.55rem] uppercase tracking-[0.35em] text-[#ff2a6d] opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Play ▶
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-5">
            {/* Weather — radar CRT */}
            <div className="relative overflow-hidden rounded-xl border-2 border-[#ff2a6d]/70 bg-[#140c22] p-5 shadow-[0_0_30px_rgba(255,42,109,0.2)]">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                <div
                  className="h-48 w-48 rounded-full border border-[#05d9e8]/20"
                  style={{
                    boxShadow: '0 0 0 1px rgba(5,217,232,0.1)',
                  }}
                />
                <div
                  className="absolute h-48 w-48 rounded-full border border-[#05d9e8]/30"
                  style={{ animation: 'y80-radar 2.8s ease-out infinite' }}
                />
              </div>
              <h3 className="relative text-xs uppercase tracking-[0.45em] text-[#fff591]" style={{ fontFamily: 'var(--font-display)' }}>
                Weather radar · UHF-7
              </h3>
              <p className="relative mt-3 text-5xl leading-none drop-shadow-[0_0_12px_rgba(5,217,232,0.5)]" aria-hidden>
                {weather.icon}
              </p>
              <p className="relative mt-2 text-3xl font-bold text-[#05d9e8]" style={{ fontFamily: 'var(--font-display)' }}>
                {weather.temp}°C
              </p>
              <p className="relative mt-1 text-sm text-[#d8cce8]">
                {weather.condition} · {weather.city}
              </p>
              <p className="relative mt-3 text-xs text-[#8a7aa8]" style={{ fontFamily: 'var(--font-main)' }}>
                HUMIDITY {weather.humidity}% · WIND {weather.wind} km/h · FEELS LIKE {weather.feels_like}°C_
                <span className="inline-block w-2 animate-pulse bg-[#3dff9a]" />
              </p>
            </div>

            {/* News — cable crawl */}
            <div className="relative overflow-hidden rounded-xl border border-[#3d2a55] bg-gradient-to-b from-[#1a0f2e] to-[#0f0818] p-5">
              <div
                className="pointer-events-none absolute -right-4 top-0 h-24 w-24 rotate-12 rounded-full bg-[#ff2a6d]/15 blur-xl"
                aria-hidden
              />
              <h3 className="mb-4 text-center text-xs uppercase tracking-[0.55em] text-[#ff2a6d]" style={{ fontFamily: 'var(--font-display)' }}>
                Cable news crawl
              </h3>
              <ul className="space-y-4">
                {news.map((n, idx) => (
                  <li
                    key={n.id}
                    className="relative border-b border-[#2a1f3d] pb-4 pl-3 last:border-0 last:pb-0"
                    style={{
                      animation: `y80-card-pop 0.5s ease-out ${0.12 + idx * 0.07}s both`,
                    }}
                  >
                    <span
                      className="absolute left-0 top-1 bottom-4 w-1 rounded-full bg-gradient-to-b from-[#05d9e8] to-[#ff2a6d]"
                      aria-hidden
                    />
                    <p className="text-base leading-snug">
                      <span className="mr-1" aria-hidden>
                        {n.emoji}
                      </span>
                      <span className="font-semibold text-[#f0e6ff]">{n.title}</span>
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-[#8a7aa8]" style={{ fontFamily: 'var(--font-main)' }}>
                      {n.source} · {n.category} · {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stocks — arcade board */}
            <div className="rounded-xl border-2 border-[#fff591]/40 bg-[#0c0714] p-5 shadow-[inset_0_0_24px_rgba(255,245,145,0.06)]">
              <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#fff591]" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#3dff9a]" aria-hidden />
                High score board
              </h3>
              <div className="space-y-3">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="flex items-baseline justify-between border-b border-[#2a1f3d] pb-2 last:border-0"
                  >
                    <div>
                      <span className="text-lg font-bold text-[#05d9e8]" style={{ fontFamily: 'var(--font-display)' }}>
                        {s.ticker}
                      </span>
                      <span className="ml-2 text-xs text-[#7a6a98]">{s.name}</span>
                    </div>
                    <div className="text-right" style={{ fontFamily: 'var(--font-main)' }}>
                      <span className="text-[#f0e6ff]">
                        {s.currency}
                        {s.price.toFixed(2)}
                      </span>
                      <span className={`ml-2 text-sm ${s.changePct >= 0 ? 'text-[#3dff9a]' : 'text-[#ff2a6d]'}`}>
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

      <PacDots />

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="y80-mail-title"
            className="y80-crt-wrap relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border-4 border-[#05d9e8] bg-gradient-to-b from-[#1e1235] to-[#0a0612] p-6 text-[#f0e6ff] shadow-[0_0_60px_rgba(5,217,232,0.35)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="y80-scanline" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)',
              }}
              aria-hidden
            />
            <div className="relative flex items-center justify-between border-b border-[#ff2a6d]/40 pb-3">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#ff2a6d]" style={{ fontFamily: 'var(--font-display)' }}>
                VHS · SP tracking OK
              </p>
              <span className="badge badge-outline border-[#05d9e8] text-[0.6rem] text-[#05d9e8]">REC</span>
            </div>
            <h2 id="y80-mail-title" className="relative mt-4 text-xl font-bold leading-snug text-[#fff591]" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="relative mt-2 text-sm text-[#b8a8d4]" style={{ fontFamily: 'var(--font-main)' }}>
              From <strong className="text-[#05d9e8]">{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
            </p>
            <div className="relative my-5 h-px bg-gradient-to-r from-transparent via-[#ff2a6d]/60 to-transparent" />
            <pre
              className="relative whitespace-pre-wrap text-sm leading-relaxed text-[#e8dcf8]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {selectedEmail.body}
            </pre>
            <p className="relative mt-6 text-center text-[0.65rem] uppercase tracking-[0.35em] text-[#7a6a98]" style={{ fontFamily: 'var(--font-main)' }}>
              — BE KIND · REWIND —
            </p>
            <button
              type="button"
              onClick={() => setSelectedEmail(null)}
              className="btn btn-block mt-5 border-[#ff2a6d] bg-[#ff2a6d] text-[#12081f] hover:bg-[#ff5a8a]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Stop ■
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
