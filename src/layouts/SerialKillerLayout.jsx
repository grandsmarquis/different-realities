import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const polaroidTilts = ['-2.5deg', '1.8deg', '-1.2deg', '2.2deg', '-1.6deg', '1.4deg']

export default function SerialKillerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-neutral-100"
      style={{
        fontFamily: 'var(--font-main)',
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(127, 29, 29, 0.35) 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0, 0, 0, 0.85) 0%, transparent 50%),
          linear-gradient(180deg, #0c0a0a 0%, #141010 35%, #0a0808 100%)
        `,
      }}
    >
      <style>{`
        @keyframes sk-flicker {
          0%, 100% { opacity: 0.04; }
          5% { opacity: 0.12; }
          6% { opacity: 0.04; }
          48% { opacity: 0.06; }
          50% { opacity: 0.18; }
          51% { opacity: 0.05; }
          92% { opacity: 0.07; }
          94% { opacity: 0.2; }
          96% { opacity: 0.04; }
        }
        @keyframes sk-swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes sk-gleam {
          0%, 90% { opacity: 0.15; }
          95% { opacity: 0.9; }
          100% { opacity: 0.15; }
        }
        @keyframes sk-tape-wiggle {
          0%, 100% { transform: rotate(var(--tape-tilt, 0deg)) translateY(0); }
          50% { transform: rotate(var(--tape-tilt, 0deg)) translateY(-2px); }
        }
        @keyframes sk-pulse-tag {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.35); }
          50% { box-shadow: 0 0 12px 2px rgba(220, 38, 38, 0.2); }
        }
        .sk-crime-tape {
          background: repeating-linear-gradient(
            90deg,
            #facc15 0px,
            #facc15 18px,
            #171717 18px,
            #171717 36px
          );
        }
      `}</style>

      {/* Flickering "basement bulb" overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 230, 180, 0.25) 0%, transparent 45%)',
          animation: 'sk-flicker 5.5s ease-in-out infinite',
        }}
        aria-hidden
      />

      {/* Concrete noise */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 px-4 pb-16 pt-6 sm:px-6 lg:px-10">
        {/* Crime scene tape strips */}
        <div className="sk-crime-tape mb-2 h-2 w-[110%] -translate-x-[5%] rotate-[-1deg] opacity-90 shadow-lg" aria-hidden />
        <div className="sk-crime-tape mb-8 h-2 w-[108%] -translate-x-[4%] rotate-[0.5deg] opacity-75" aria-hidden />

        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-start gap-6">
            {/* Hanging bulb */}
            <div className="relative hidden shrink-0 sm:block" style={{ width: 56, height: 72 }} aria-hidden>
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <div
                  className="h-8 w-px bg-neutral-600"
                  style={{ transformOrigin: 'top center', animation: 'sk-swing 4.2s ease-in-out infinite' }}
                >
                  <div className="absolute left-1/2 top-full -translate-x-1/2">
                  <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="20" cy="14" rx="14" ry="16" fill="#fef3c7" stroke="#78716c" strokeWidth="1.2" />
                    <rect x="14" y="26" width="12" height="8" rx="1" fill="#57534e" />
                    <path d="M20 34v14" stroke="#44403c" strokeWidth="2" />
                    <ellipse cx="20" cy="48" rx="6" ry="3" fill="#fbbf24" opacity="0.6" />
                  </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-red-500/90">
                Confidential · same data, different mask
              </p>
              <h1
                className="leading-[0.95] text-red-600"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 6vw, 3.25rem)',
                  textShadow: '0 0 40px rgba(220, 38, 38, 0.35), 2px 2px 0 #1c1917',
                }}
              >
                THE WORKSHOP
              </h1>
              <p className="mt-2 max-w-xl text-sm text-neutral-400">
                Every message sorted. Every headline clipped. Markets watched like a pulse.{' '}
                <span className="text-neutral-500 italic">(Slasher-movie parody — not real.)</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge badge-outline border-red-900/60 bg-neutral-950/80 text-xs text-red-200/90">
                  Open leads: {unread}
                </span>
                <span className="badge badge-outline border-neutral-600 bg-neutral-900/80 text-xs text-neutral-400">
                  Location: {weather.city}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Decorative knife gleam */}
            <div className="relative hidden md:flex" aria-hidden>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 38 L28 8 L32 12 L14 40 Z" fill="#d4d4d8" stroke="#525252" strokeWidth="0.8" />
                <path
                  d="M18 18 L26 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ animation: 'sk-gleam 3.5s ease-in-out infinite' }}
                />
                <rect x="6" y="36" width="8" height="6" rx="1" fill="#44403c" />
              </svg>
            </div>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-outline btn-sm border-neutral-600 bg-neutral-950/90 text-neutral-300 hover:border-red-800 hover:bg-red-950/40 hover:text-red-100"
            >
              Switch identity
            </button>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Polaroid wall — emails */}
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-dashed border-neutral-700 pb-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-red-500/80">Subject files</h2>
              <span className="text-[10px] text-neutral-500">Tap a polaroid to open</span>
            </div>
            <div
              className="relative rounded-box border border-dashed border-neutral-700/80 bg-neutral-950/40 p-6"
              style={{
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Chalk-style corner marks */}
              <div className="pointer-events-none absolute inset-3 border border-white/5" aria-hidden />

              <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 p-0">
                {emails.map((email, i) => (
                  <li key={email.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(email)}
                      className="group w-full cursor-pointer text-left transition-transform duration-200 hover:z-10 hover:scale-[1.03]"
                      style={{ transform: `rotate(${polaroidTilts[i % polaroidTilts.length]})` }}
                    >
                      <div className="card card-compact border border-neutral-600 bg-neutral-100 shadow-xl transition-shadow group-hover:shadow-red-900/20">
                        <div className="card-body gap-2 p-3 pt-4 text-neutral-900">
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-red-800">
                              #{String(email.id).padStart(3, '0')}
                            </span>
                            {!email.read && (
                              <span className="badge badge-error badge-xs font-bold">Fresh</span>
                            )}
                          </div>
                          <div
                            className="flex aspect-[4/3] items-center justify-center rounded-sm bg-neutral-300 text-4xl shadow-inner"
                            aria-hidden
                          >
                            {email.from.avatar ?? '📧'}
                          </div>
                          <p className="line-clamp-2 font-mono text-[11px] font-semibold leading-tight">
                            {email.subject}
                          </p>
                          <p className="line-clamp-2 text-[10px] leading-snug text-neutral-600">
                            {email.preview}
                          </p>
                          <p className="border-t border-neutral-300 pt-1 font-mono text-[9px] text-neutral-500">
                            {email.date} · {email.tag}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </main>

          <aside className="space-y-6 lg:col-span-5 xl:col-span-4">
            {/* Weather — "night ops" */}
            <div className="card border border-neutral-700 bg-neutral-900/90 shadow-lg backdrop-blur-sm">
              <div className="card-body gap-3 p-4">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/90">
                  Exterior conditions
                </h3>
                <p className="text-3xl font-light tabular-nums text-neutral-100">
                  {weather.icon}{' '}
                  <span className="text-red-500/90">{weather.temp}°</span>
                  <span className="text-lg text-neutral-500">C</span>
                </p>
                <p className="text-sm text-neutral-400">{weather.condition}</p>
                <div className="divider my-1 border-neutral-700" />
                <p className="text-xs text-neutral-500">
                  Wind {weather.wind} km/h · Humidity {weather.humidity}% · Feels {weather.feels_like}°C —{' '}
                  <span className="italic text-neutral-600">ideal for staying indoors and organizing.</span>
                </p>
              </div>
            </div>

            {/* Stocks — "vital signs" */}
            <div
              className="card border border-red-950/50 bg-neutral-950/95 shadow-lg"
              style={{ animation: 'sk-pulse-tag 4s ease-in-out infinite' }}
            >
              <div className="card-body gap-3 p-4">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-500/90">
                  Market pulse
                </h3>
                <ul className="space-y-3">
                  {stocks.map(s => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-bold text-neutral-200">{s.ticker}</p>
                        <p className="truncate text-[10px] text-neutral-500">{s.name}</p>
                        <p className="font-mono text-xs tabular-nums text-neutral-400">
                          {s.currency}
                          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <MiniSpark
                          series={s.series}
                          stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'}
                          className="opacity-90"
                        />
                        <span
                          className={`font-mono text-xs font-semibold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}
                        >
                          {s.changePct >= 0 ? '+' : ''}
                          {s.changePct.toFixed(2)}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* News — taped clippings */}
            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Press clippings
              </h3>
              <ul className="space-y-5">
                {news.map((n, i) => (
                  <li
                    key={n.id}
                    className="card relative border border-amber-900/40 bg-amber-50/95 text-amber-950 shadow-md"
                    style={{
                      '--tape-tilt': `${(i % 3) - 1}deg`,
                      animation: 'sk-tape-wiggle 5s ease-in-out infinite',
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    {/* Masking tape */}
                    <div
                      className="absolute -top-2 left-1/2 z-10 h-4 w-24 -translate-x-1/2 rounded-sm bg-amber-200/90 opacity-90 shadow-sm"
                      style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
                      aria-hidden
                    />
                    <div className="card-body gap-1 p-4 pt-5">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-amber-800/80">
                        <span className="font-black text-red-700">Extra</span>
                        <span>·</span>
                        <span>{n.source}</span>
                        <span className="ml-auto opacity-70">{n.time}</span>
                      </div>
                      <p className="flex items-start gap-2 font-serif text-sm font-semibold leading-snug">
                        <span className="text-lg leading-none" aria-hidden>
                          {n.emoji}
                        </span>
                        {n.title}
                      </p>
                      <p className="text-[10px] text-amber-900/70">{n.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-widest text-neutral-600">
          Fictional UI parody · Demo inbox / weather / news / stocks only
        </p>
      </div>

      {/* Email modal — evidence envelope */}
      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="card max-h-[85vh] w-full max-w-lg overflow-y-auto border-2 border-red-800 bg-neutral-100 text-neutral-900 shadow-2xl shadow-red-950/50"
            style={{ transform: 'rotate(-0.4deg)' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sk-modal-title"
          >
            <div className="card-body gap-3">
              <div className="flex items-start justify-between gap-2 border-b-2 border-dashed border-neutral-400 pb-3">
                <div>
                  <p id="sk-modal-title" className="font-mono text-xs uppercase tracking-[0.2em] text-red-800">
                    Sealed transcript
                  </p>
                  <p className="mt-1 font-serif text-lg font-bold leading-tight">{selectedEmail.subject}</p>
                  <p className="mt-1 text-xs text-neutral-600">
                    From: {selectedEmail.from.name} · {selectedEmail.date} {selectedEmail.time}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-circle btn-ghost btn-sm text-neutral-600"
                  onClick={() => setSelectedEmail(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-neutral-800">
                {selectedEmail.body}
              </pre>
              <button
                type="button"
                className="btn btn-neutral btn-sm mt-2 w-full sm:w-auto"
                onClick={() => setSelectedEmail(null)}
              >
                File away
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
