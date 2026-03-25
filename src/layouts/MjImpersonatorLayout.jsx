import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function StageSpotlights() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="mj-spot-a absolute -left-1/4 top-0 h-[120%] w-1/2 opacity-40"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 35%, rgba(251, 191, 36, 0.35) 50%, transparent 65%)',
        }}
      />
      <div
        className="mj-spot-b absolute left-1/4 top-0 h-[120%] w-1/2 opacity-40"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 38%, rgba(220, 38, 38, 0.22) 52%, transparent 68%)',
        }}
      />
      <div
        className="mj-spot-c absolute left-1/2 top-0 h-[120%] w-1/2 opacity-40"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(253, 224, 71, 0.2) 55%, transparent 70%)',
        }}
      />
    </div>
  )
}

function SparkleField() {
  const spots = [
    { t: '8%', l: '12%', d: '0s' },
    { t: '18%', l: '78%', d: '-0.4s' },
    { t: '42%', l: '6%', d: '-1.1s' },
    { t: '55%', l: '88%', d: '-0.7s' },
    { t: '72%', l: '22%', d: '-1.8s' },
    { t: '28%', l: '48%', d: '-2.2s' },
    { t: '88%', l: '62%', d: '-0.2s' },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {spots.map((s, i) => (
        <span
          key={i}
          className="mj-sparkle absolute h-1.5 w-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#fde047]"
          style={{ top: s.t, left: s.l, animationDelay: s.d }}
        />
      ))}
    </div>
  )
}

function FedoraIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 64 48" className={`mj-fedora-sway ${className}`} aria-hidden>
      <ellipse cx="32" cy="38" rx="28" ry="6" fill="rgba(15,23,42,0.9)" />
      <path
        d="M12 36 C12 18 52 18 52 36 Z"
        fill="currentColor"
        className="text-slate-900"
      />
      <ellipse cx="32" cy="22" rx="14" ry="10" fill="#1e293b" />
      <path d="M18 24 Q32 14 46 24" stroke="#334155" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function MicIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 48 72" className={className} aria-hidden>
      <defs>
        <linearGradient id="mjMicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      <rect x="16" y="8" width="16" height="36" rx="8" fill="url(#mjMicGrad)" />
      <path d="M12 48 Q12 58 24 58 Q36 58 36 48" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="24" y1="58" x2="24" y2="66" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="66" x2="32" y2="66" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function GloveBadge() {
  return (
    <svg viewBox="0 0 56 64" className="h-14 w-14 shrink-0 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]" aria-hidden>
      <path
        fill="currentColor"
        d="M28 4c-4 0-7 3-7 7v18l-4-2c-2-1-5 0-6 2l-2 4c-1 3 0 6 3 8l8 5v12c0 3 2 5 5 5h10c3 0 5-2 5-5V38l6-4c3-2 4-5 3-8l-2-4c-1-2-4-3-6-2l-4 2V11c0-4-3-7-7-7z"
        opacity="0.95"
      />
    </svg>
  )
}

export default function MjImpersonatorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28 text-amber-50"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(220, 38, 38, 0.18), transparent 55%), linear-gradient(168deg, #0c0a10 0%, #1a0a14 38%, #050508 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="mj-crowd-blob pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" aria-hidden />
      <div className="mj-crowd-blob-delay pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" aria-hidden />

      <div
        className="mj-dance-floor-tiles pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #fbbf24 25%, transparent 25%), linear-gradient(-45deg, #fbbf24 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fbbf24 75%), linear-gradient(-45deg, transparent 75%, #fbbf24 75%)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0',
        }}
        aria-hidden
      />

      <StageSpotlights />
      <SparkleField />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-start gap-5 md:gap-7">
            <div className="relative hidden shrink-0 sm:block">
              <div className="mj-mic-glow absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/25 blur-2xl" aria-hidden />
              <MicIcon className="relative z-[1] h-24 w-16 text-slate-300" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start">
              <FedoraIcon className="h-16 w-20 shrink-0 text-slate-800 sm:hidden" />
              <div className="min-w-0">
                <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.4em] text-red-400/90">Tribute artist · backstage terminal</p>
                <h1
                  className="mj-title-glint m-0 mt-2 text-2xl leading-tight sm:text-3xl md:text-4xl"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
                >
                  POP LEGEND DESK
                </h1>
                <p className="m-0 mt-2 max-w-2xl text-sm text-amber-200/75">
                  Same inbox, same sky, same tickers — styled like you just stepped off an arena run. {unread} messages still need a spin move.
                </p>
                <div className="mt-3 flex h-7 items-end gap-1 opacity-80" aria-hidden>
                  {[5, 9, 4, 11, 6, 10, 5, 8, 6, 12, 4, 7].map((h, i) => (
                    <span
                      key={i}
                      className="mj-eq-bar w-1 rounded-sm bg-gradient-to-t from-red-700 to-yellow-300"
                      style={{ height: `${h * 7}%`, animationDelay: `${i * 0.06}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <GloveBadge />
            <button
              type="button"
              className="btn border-0 bg-gradient-to-r from-red-700 via-red-600 to-amber-500 font-bold uppercase tracking-wide text-white shadow-lg shadow-red-900/40 hover:brightness-110"
              onClick={onSwitchPersona}
            >
              Exit stage
            </button>
          </div>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="mj-card-shimmer rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-950/90 to-red-950/40 p-4 backdrop-blur-sm">
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300/90">Outdoor gig sky</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-5xl drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">{weather.icon}</span>
              <div>
                <p className="m-0 text-lg font-semibold text-amber-50">{weather.condition}</p>
                <p className="m-0 text-sm text-amber-200/70">
                  {weather.temp}°C · {weather.city}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-red-900/40 bg-black/45 p-4 md:col-span-2 backdrop-blur-sm">
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.3em] text-red-300/90">Tour budget tickers</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {stocks.map(s => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between gap-2 rounded-xl border border-amber-900/30 bg-slate-950/60 px-3 py-2"
                >
                  <span className="font-mono text-sm font-bold text-amber-200">{s.ticker}</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#f87171'} className="opacity-90" />
                  <span className={s.changePct >= 0 ? 'font-semibold text-amber-300' : 'font-semibold text-red-300'}>
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-200/85">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" aria-hidden />
              Fan mail &amp; bookings
            </h2>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`w-full rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                        on
                          ? 'border-amber-400 bg-gradient-to-br from-red-950/70 to-slate-950/80 shadow-lg shadow-amber-900/20'
                          : 'border-slate-700/60 bg-black/35 hover:border-amber-600/50 hover:bg-slate-950/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl">{e.from.avatar}</span>
                        <div className="min-w-0 flex-1">
                          {!e.read && (
                            <span className="badge badge-sm mb-1 border-0 bg-gradient-to-r from-red-600 to-amber-500 font-bold text-white">
                              NEW ROUTINE
                            </span>
                          )}
                          <p className="m-0 font-semibold leading-snug text-amber-50">{e.subject}</p>
                          <p className="m-0 text-xs text-amber-200/55">{e.from.name}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-2xl border-2 border-amber-600/35 bg-gradient-to-b from-slate-950/95 via-black/70 to-red-950/30 p-5 md:p-6">
                <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-400/90">Selected set list item</p>
                <h3 className="m-0 mt-2 text-xl font-bold text-amber-50 md:text-2xl">{selectedEmail.subject}</h3>
                <p className="m-0 mt-2 text-sm text-amber-200/65">
                  {selectedEmail.from.name} · {selectedEmail.date}
                </p>
                <div className="mt-4 max-h-[min(48vh,420px)] overflow-y-auto rounded-xl border border-slate-700/50 bg-black/40 p-4 text-sm leading-relaxed whitespace-pre-wrap text-amber-50/95">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-amber-800/40 text-center text-amber-300/55">
                <FedoraIcon className="h-14 w-16 text-slate-700 opacity-60" />
                Pick a message — the show must go on
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="rounded-2xl border-2 border-red-800/35 bg-black/50 p-4 backdrop-blur-sm">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-red-300/90">Encore headlines</p>
              <ul className="mt-3 space-y-3 text-sm leading-snug text-amber-100/90">
                {news.map(n => (
                  <li
                    key={n.id}
                    className="rounded-lg border-l-4 border-amber-500 bg-gradient-to-r from-slate-900/80 to-transparent px-3 py-2"
                  >
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="mt-4 rounded-xl border border-dashed border-amber-700/40 bg-amber-950/20 px-3 py-2 text-center text-[10px] uppercase tracking-widest text-amber-200/50"
              aria-hidden
            >
              Licensed tribute · not affiliated
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
