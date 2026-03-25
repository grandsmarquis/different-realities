import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function Ichthys({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="jcFish" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent2)" />
        </linearGradient>
      </defs>
      <path
        d="M8 24c12-18 32-18 44 0 12 18 32 18 44 0M52 24c-8-10-8 10 0 0"
        stroke="url(#jcFish)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3.5" fill="var(--accent)" />
    </svg>
  )
}

function Rays() {
  return (
    <div className="jc-rays pointer-events-none absolute left-1/2 top-0 h-[min(55vh,420px)] w-[200%] -translate-x-1/2" aria-hidden>
      <div className="jc-rays-spin h-full w-full opacity-[0.14]" />
    </div>
  )
}

function Cloud({ className, delay, duration }) {
  return (
    <div
      className={`jc-cloud pointer-events-none absolute rounded-full bg-gradient-to-r from-base-100/5 to-base-100/10 blur-sm ${className}`}
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    />
  )
}

const JC_STARS = [
  { x: 8, y: 12, w: 2, o: 0.5, d: 0 },
  { x: 22, y: 8, w: 1.5, o: 0.35, d: 0.4 },
  { x: 78, y: 18, w: 2, o: 0.45, d: 0.8 },
  { x: 91, y: 11, w: 1, o: 0.55, d: 0.2 },
  { x: 45, y: 6, w: 1.5, o: 0.3, d: 1.1 },
  { x: 62, y: 22, w: 2, o: 0.4, d: 0.6 },
  { x: 15, y: 28, w: 1, o: 0.5, d: 1.4 },
  { x: 88, y: 35, w: 1.5, o: 0.35, d: 0.9 },
  { x: 33, y: 15, w: 1, o: 0.45, d: 1.7 },
  { x: 72, y: 8, w: 1, o: 0.4, d: 0.3 },
]

function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {JC_STARS.map((s, i) => (
        <span
          key={i}
          className="jc-star absolute rounded-full bg-[var(--accent)]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.w,
            height: s.w,
            opacity: s.o,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function JesusChristInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="jc-layout relative min-h-screen overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, #1e3a5f 0%, var(--bg) 45%, #050810 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes jcRaySpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes jcCloudDrift {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.35; }
          50% { transform: translateX(40px) translateY(-12px); opacity: 0.55; }
        }
        @keyframes jcStarTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
        @keyframes jcHalo {
          0%, 100% { transform: scale(1); opacity: 0.5; filter: blur(0px); }
          50% { transform: scale(1.08); opacity: 0.75; filter: blur(1px); }
        }
        @keyframes jcDove {
          0%, 100% { transform: translate(0, 0) rotate(-6deg); }
          50% { transform: translate(14px, -20px) rotate(6deg); }
        }
        @keyframes jcRipple {
          0% { transform: scale(0.85); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes jcScrollIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .jc-rays-spin {
          background: conic-gradient(from 0deg at 50% 0%, transparent 0deg, rgba(255,213,79,0.25) 8deg, transparent 16deg, transparent 32deg, rgba(125,211,252,0.12) 40deg, transparent 48deg, transparent 60deg, rgba(255,213,79,0.2) 68deg, transparent 76deg);
          animation: jcRaySpin 120s linear infinite;
          mask-image: linear-gradient(to bottom, black 0%, transparent 85%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 85%);
        }
        .jc-cloud { animation: jcCloudDrift ease-in-out infinite; }
        .jc-star { animation: jcStarTwinkle 3s ease-in-out infinite; }
        .jc-halo-pulse { animation: jcHalo 4s ease-in-out infinite; }
        .jc-dove { animation: jcDove 5s ease-in-out infinite; }
        .jc-ripple-ring {
          border: 2px solid var(--accent);
          border-radius: 50%;
          animation: jcRipple 2.8s ease-out infinite;
        }
        .jc-email-open { animation: jcScrollIn 0.5s ease-out forwards; }
      `}</style>

      <StarField />
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <Rays />
        <Cloud className="left-[5%] top-[18%] h-16 w-40" delay={0} duration={28} />
        <Cloud className="right-[8%] top-[24%] h-12 w-36" delay={2} duration={34} />
        <Cloud className="left-[40%] top-[12%] h-10 w-28 opacity-60" delay={5} duration={40} />
        <div
          className="absolute -left-24 bottom-0 h-64 w-[120%] opacity-[0.07]"
          style={{
            background: 'linear-gradient(to top, #1a3d2e 0%, transparent 70%)',
          }}
        />
      </div>

      <header className="relative z-10 border-b border-[var(--border)] px-4 py-8 md:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(255,213,79,0.08) 0%, transparent 60%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-8">
          <div className="flex min-w-0 flex-1 items-start gap-5">
            <div className="relative shrink-0">
              <div className="jc-halo-pulse absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,213,79,0.35)_0%,transparent_65%)]" />
              <div className="jc-ripple-ring absolute -inset-2" />
              <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--glass)] shadow-lg shadow-[var(--accent)]/20">
                <Ichthys className="h-10 w-24 opacity-95" />
              </div>
            </div>
            <div className="min-w-0 pt-1">
              <p className="mb-1 text-[10px] font-semibold tracking-[0.45em] text-[var(--accent)] uppercase opacity-90">
                Kingdom · IMAP · SSL
              </p>
              <h1
                className="text-3xl leading-tight tracking-tight text-[var(--text)] md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                The Galilean Inbox
              </h1>
              <p className="mt-3 max-w-xl text-sm italic leading-relaxed text-[var(--text2)]">
                One feed. Four miracles: messages, weather, fishes of the market, and the good news. Wi‑Fi strength:{' '}
                <span className="not-italic font-semibold text-[var(--accent)]">faith-based</span>.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="jc-dove text-5xl drop-shadow-[0_0_12px_rgba(125,211,252,0.5)]" aria-hidden>
              🕊️
            </div>
            <button type="button" onClick={onSwitchPersona} className="btn btn-sm btn-outline border-[var(--accent)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-[var(--card-ink)] hover:border-[var(--accent)]">
              Ascend to persona picker
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 pb-28 lg:flex-row lg:items-start">
        <aside className="lg:w-72 lg:shrink-0">
          <div
            className="overflow-hidden rounded-2xl border-2 border-[var(--border)] shadow-2xl shadow-black/40"
            style={{
              background: 'linear-gradient(145deg, rgba(255,250,240,0.97) 0%, rgba(245,235,220,0.98) 100%)',
            }}
          >
            <div
              className="flex items-center justify-between border-b border-amber-900/15 px-4 py-3"
              style={{ color: 'var(--card-ink)' }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase opacity-80">Scrolls</span>
              <span className="badge border-0 bg-[var(--wine)] text-[var(--text)]">
                {unread} unleavened unread
              </span>
            </div>
            <ul className="max-h-[min(52vh,440px)] divide-y divide-amber-900/10 overflow-y-auto overscroll-contain">
              {emails.map(e => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="w-full px-4 py-3.5 text-left transition-all duration-200 hover:bg-amber-100/50"
                    style={{
                      background: selectedEmail?.id === e.id ? 'rgba(255, 213, 79, 0.22)' : 'transparent',
                      borderLeft: selectedEmail?.id === e.id ? '4px solid var(--accent3)' : '4px solid transparent',
                      color: 'var(--card-ink)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl drop-shadow-sm">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!e.read && (
                            <span className="badge badge-xs border-0 bg-amber-500/90 text-[var(--card-ink)]">new</span>
                          )}
                          <span className="truncate text-xs opacity-60">{e.from.name}</span>
                        </div>
                        <p className="font-semibold leading-snug" style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                          {e.subject}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs opacity-55">{e.preview}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-center text-[10px] italic text-[var(--text2)] opacity-70">
            “Let the little notifications come unto me.”
          </p>
        </aside>

        <main className="min-h-[320px] flex-1">
          {selectedEmail ? (
            <article
              className="jc-email-open rounded-2xl border-2 border-[var(--border)] p-1 shadow-xl"
              style={{
                background: 'linear-gradient(160deg, rgba(255,252,245,0.98) 0%, rgba(250,240,225,0.99) 100%)',
                color: 'var(--card-ink)',
              }}
            >
              <div className="rounded-xl border border-amber-900/10 bg-[linear-gradient(180deg,rgba(255,250,235,0.9)_0%,transparent_35%)] px-6 py-8 md:px-10 md:py-10">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-amber-900/15 pb-6">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-[0.35em] uppercase opacity-45">Epistle (MIME)</p>
                    <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--card-ink)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-sm opacity-70">
                      From <span className="font-medium text-amber-800/90">{selectedEmail.from.name}</span> · {selectedEmail.date} ·{' '}
                      {selectedEmail.time}
                    </p>
                  </div>
                  <div className="flex gap-2 text-3xl opacity-85" aria-hidden>
                    ✨ 🐟
                  </div>
                </div>
                <div
                  className="whitespace-pre-wrap text-base leading-relaxed opacity-92 first-letter:float-left first-letter:-mt-1 first-letter:mr-3 first-letter:font-bold first-letter:text-5xl first-letter:leading-none first-letter:text-amber-700"
                  style={{ fontFamily: 'var(--font-main)' }}
                >
                  {selectedEmail.body}
                </div>
                <p className="mt-8 text-center text-xs italic opacity-45">Amen. (This message was composed on Earth. Results may require parables.)</p>
              </div>
            </article>
          ) : (
            <div
              className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--glass)] p-10 text-center"
              style={{ color: 'var(--text2)' }}
            >
              <span className="mb-4 text-7xl">📜</span>
              <p className="text-xl text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Choose a scroll from the left
              </p>
              <p className="mt-2 max-w-sm text-sm opacity-80">
                The truth is in there — next to the password resets and the bank alerts. Peace be with your spam filter.
              </p>
            </div>
          )}
        </main>

        <aside className="flex flex-col gap-4 lg:w-64 lg:shrink-0">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-4 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="mb-1 text-center text-[10px] font-bold tracking-[0.35em] text-[var(--accent)] uppercase">Nazareth forecast</h3>
            <p className="mb-3 text-center text-[9px] italic text-[var(--text2)] opacity-80">(your coordinates, translated)</p>
            <div className="text-center">
              <div className="mx-auto mb-2 flex size-[4.5rem] items-center justify-center rounded-full border-2 border-[var(--accent2)] bg-base-100/5 text-4xl shadow-inner shadow-[var(--accent2)]/20">
                {weather.icon}
              </div>
              <p className="text-lg font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                {weather.condition}
              </p>
              <p className="text-2xl text-[var(--accent)]">{weather.temp}°</p>
              <p className="mt-2 text-xs italic text-[var(--text2)] opacity-75">It was evening, and it was morning — still partly cloudy.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-4 shadow-lg backdrop-blur-sm">
            <h3 className="mb-1 text-center text-[10px] font-bold tracking-[0.35em] text-[var(--accent)] uppercase">Loaves & tickers</h3>
            <p className="mb-3 text-center text-[9px] italic text-[var(--text2)] opacity-80">Five portfolios, two fish symbols, fed a crowd</p>
            <ul className="space-y-2 text-sm text-[var(--text)]">
              {stocks.map(s => (
                <li
                  key={s.ticker}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)]/40 bg-base-100/5 px-3 py-2"
                >
                  <span className="font-bold tracking-wide text-[var(--accent)]">{s.ticker}</span>
                  <span className={Number(s.changePct) >= 0 ? 'text-success' : 'text-error'}>
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-4 shadow-lg backdrop-blur-sm">
            <h3 className="mb-3 text-center text-[10px] font-bold tracking-[0.35em] text-[var(--accent)] uppercase">The good news</h3>
            <ul className="space-y-3 text-xs leading-snug text-[var(--text2)]">
              {news.map(n => (
                <li
                  key={n.id}
                  className="border-l-2 border-[var(--accent2)] pl-3 opacity-90 transition-opacity hover:opacity-100"
                  style={{ color: 'var(--text)' }}
                >
                  {n.title}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-[9px] italic text-[var(--text2)] opacity-60">Breaking: still Earth. Updates hourly.</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
