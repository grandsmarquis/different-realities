import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function KeysOfPeter() {
  return (
    <svg className="pope-keys size-14 shrink-0 opacity-90" viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M18 38c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7zm0-10c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
        fill="var(--accent)"
      />
      <path d="M22 34h8v4h-8v-4zm6-8l6-14h6l-6 14h-6z" fill="var(--accent2)" />
      <path
        d="M46 38c4 0 7-3 7-7s-3-7-7-7-7 3-7 7 3 7 7 7zm0-10c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"
        fill="var(--accent)"
      />
      <path d="M42 34h-8v4h8v-4zm-6-8L30 12h-6l6 14h6z" fill="var(--accent2)" />
    </svg>
  )
}

function StainedGlassPanel({ className = '' }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 size-full opacity-[0.12] ${className}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="popeSg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="40%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
      </defs>
      <path d="M0 0h40v100H0z" fill="url(#popeSg1)" />
      <path d="M40 0h40v50H40z" fill="#2a4a7a" opacity="0.6" />
      <path d="M40 50h40v50H40z" fill="#5c1a2e" opacity="0.5" />
      <path d="M20 0v100M40 0v100M0 50h80" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

export default function PopeLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = emails.filter(e => !e.read).length

  return (
    <div className="pope-layout relative min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <style>{`
        @keyframes popeGoldPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.02); }
        }
        @keyframes popeIncense {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-28px) translateX(6px) scale(1.4); opacity: 0.15; }
          100% { transform: translateY(-56px) translateX(-4px) scale(1.8); opacity: 0; }
        }
        @keyframes popeDove {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(8px, -6px) rotate(2deg); }
        }
        @keyframes popeHalo {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes popeBell {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(8deg); }
          40% { transform: rotate(-6deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-3deg); }
        }
        .pope-layout .pope-shimmer {
          background: linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.15) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: popeShimmer 6s ease-in-out infinite;
        }
        @keyframes popeShimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .pope-keys { animation: popeBell 5s ease-in-out infinite; transform-origin: center bottom; }
        .pope-dove-wrap { animation: popeDove 4s ease-in-out infinite; }
        .pope-halo-ring {
          animation: popeHalo 48s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <StainedGlassPanel />
        <div
          className="absolute -left-20 top-1/4 size-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.25) 0%, transparent 70%)', animation: 'popeGoldPulse 8s ease-in-out infinite' }}
        />
        <div
          className="absolute -right-16 bottom-1/4 size-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)', animation: 'popeGoldPulse 10s ease-in-out infinite 1s' }}
        />
        {[0, 1, 2, 3, 4].map(i => (
          <span
            key={i}
            className="absolute bottom-[12%] rounded-full bg-base-content/20"
            style={{
              left: `${18 + i * 16}%`,
              width: 12 + (i % 3) * 4,
              height: 12 + (i % 3) * 4,
              animation: `popeIncense ${3.5 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 border-b px-4 py-6 md:px-8" style={{ borderColor: 'var(--border)', background: 'linear-gradient(180deg, var(--glass) 0%, transparent 100%)' }}>
        <div className="pope-shimmer pointer-events-none absolute inset-0 rounded-none opacity-80" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="pope-halo-ring absolute -inset-3 text-[var(--accent)] opacity-40" viewBox="0 0 80 80" aria-hidden>
                <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
              </svg>
              <KeysOfPeter />
            </div>
            <div>
              <p className="mb-1 text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
                Sancta Sedes · digitalis
              </p>
              <h1 className="text-3xl leading-tight md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                The Apostolic Inbox
              </h1>
              <p className="mt-2 max-w-xl text-sm italic opacity-80">
                Same messages, weather, news, and markets — delivered with imprimatur, incense (virtual), and one extremely forgiving &ldquo;Mark all as read&rdquo; fantasy.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="pope-dove-wrap text-4xl" aria-hidden>
              🕊️
            </div>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-sm border-2 bg-transparent font-normal normal-case tracking-wide"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent2)' }}
            >
              Ecumenical portal (home)
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 pb-24 lg:flex-row lg:items-start">
        <aside className="lg:w-72 lg:shrink-0">
          <div
            className="rounded-box border-2 p-1 shadow-lg"
            style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
          >
            <div
              className="flex items-center justify-between border-b px-3 py-2 text-xs tracking-widest uppercase"
              style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
            >
              <span>Litteræ</span>
              <span className="badge badge-sm border-0" style={{ background: 'var(--papal)', color: '#fff' }}>
                {unread} unread homilies
              </span>
            </div>
            <ul className="max-h-[min(52vh,420px)] divide-y overflow-y-auto overscroll-contain" style={{ borderColor: 'var(--border)' }}>
              {emails.map(e => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="w-full px-3 py-3 text-left transition-colors hover:bg-base-content/5"
                    style={{
                      background: selectedEmail?.id === e.id ? 'var(--glass)' : 'transparent',
                      borderLeft: selectedEmail?.id === e.id ? '3px solid var(--accent)' : '3px solid transparent',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {!e.read && (
                            <span className="badge badge-xs border-0 px-1" style={{ background: 'var(--papal)', color: '#fff' }}>
                              new
                            </span>
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
        </aside>

        <main className="min-h-[320px] flex-1">
          {selectedEmail ? (
            <article
              className="animate-[fadeIn_0.45s_ease] rounded-box border-2 p-1 shadow-xl"
              style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
            >
              <div className="rounded-box border p-6 md:p-10" style={{ borderColor: 'var(--border)', background: 'linear-gradient(165deg, var(--glass) 0%, transparent 45%)' }}>
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="mb-1 text-[10px] tracking-[0.35em] uppercase opacity-50">Bulla digitalis</p>
                    <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-sm opacity-70">
                      From <span style={{ color: 'var(--accent)' }}>{selectedEmail.from.name}</span> · {selectedEmail.date} · {selectedEmail.time}
                    </p>
                  </div>
                  <div className="flex gap-2 text-2xl opacity-80" aria-hidden>
                    ✝️ 📜
                  </div>
                </div>
                <div
                  className="whitespace-pre-wrap text-base leading-relaxed opacity-90 first-letter:float-left first-letter:-mt-1 first-letter:mr-3 first-letter:font-semibold first-letter:text-5xl first-letter:leading-none first-letter:text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-main)' }}
                >
                  {selectedEmail.body}
                </div>
                <p className="mt-8 text-center text-xs italic opacity-45">
                  Hoc est verbum secularum — machine-readable, spiritu hilaris.
                </p>
              </div>
            </article>
          ) : (
            <div
              className="flex min-h-[280px] flex-col items-center justify-center rounded-box border-2 border-dashed p-8 text-center opacity-60"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="mb-4 text-6xl">📿</span>
              <p className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                Select a missive from the scroll
              </p>
              <p className="mt-2 max-w-sm text-sm">The first letter is illuminated. The rest is mostly LinkedIn. Pax Tecum.</p>
            </div>
          )}
        </main>

        <aside className="flex flex-col gap-4 lg:w-64 lg:shrink-0">
          <section
            className="rounded-box border p-4 shadow-md transition-transform hover:scale-[1.02]"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h3 className="mb-3 text-center text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
              Cælum · firmanentum
            </h3>
            <div className="text-center">
              <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full border-2 text-4xl" style={{ borderColor: 'var(--accent)' }}>
                {weather.icon}
              </div>
              <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                {weather.condition}
              </p>
              <p className="text-2xl opacity-90">{weather.temp}°</p>
              <p className="mt-2 text-xs italic opacity-50">The Lord maketh it partly cloudy, and it was good enough.</p>
            </div>
          </section>

          <section
            className="rounded-box border p-4 shadow-md"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h3 className="mb-3 text-center text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
              Thesauri sæculi
            </h3>
            <p className="mb-3 text-center text-[10px] italic opacity-45">Stocks — render unto Caesar what is Caesar&apos;s spreadsheet</p>
            <ul className="space-y-2 text-sm">
              {stocks.map(s => (
                <li
                  key={s.ticker}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5"
                  style={{ background: 'var(--glass)' }}
                >
                  <span className="font-semibold tracking-wide" style={{ color: 'var(--accent)' }}>
                    {s.ticker}
                  </span>
                  <span className={Number(s.changePct) >= 0 ? 'text-success' : 'text-error'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="rounded-box border p-4 shadow-md"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h3 className="mb-3 text-center text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
              Nuntia · orbis
            </h3>
            <ul className="space-y-3 text-xs leading-snug">
              {news.map(n => (
                <li key={n.id} className="border-l-2 pl-3 opacity-85 transition-opacity hover:opacity-100" style={{ borderColor: 'var(--papal)' }}>
                  {n.title}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-[10px] italic opacity-40">Keeping you infallibly informed (results may vary).</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
