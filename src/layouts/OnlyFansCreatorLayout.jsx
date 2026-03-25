import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import MiniSpark from '../components/MiniSpark'

const hearts = ['💗', '💖', '✨', '💫', '🌟', '💕']

export default function OnlyFansCreatorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="ofc-root relative min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(145deg, var(--bg) 0%, var(--bg2) 42%, #0a0412 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="ofc-mesh pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 20% -10%, var(--accent), transparent), radial-gradient(ellipse 60% 40% at 100% 30%, var(--accent2), transparent)',
        }}
        aria-hidden
      />

      {hearts.map((h, i) => (
        <span
          key={i}
          className="ofc-heart pointer-events-none absolute text-lg opacity-40 sm:text-2xl"
          style={{
            left: `${8 + (i * 15) % 84}%`,
            top: `${12 + (i * 23) % 70}%`,
            animationDelay: `${i * 0.7}s`,
          }}
          aria-hidden
        >
          {h}
        </span>
      ))}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col">
        <header className="ofc-shimmer border-b border-white/10 px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative hidden h-14 w-14 shrink-0 rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 shadow-lg shadow-fuchsia-500/20 sm:flex sm:items-center sm:justify-center">
                <svg viewBox="0 0 48 48" className="h-9 w-9 text-pink-300" aria-hidden>
                  <defs>
                    <linearGradient id="ofcCam" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <rect x="8" y="14" width="32" height="22" rx="6" fill="url(#ofcCam)" opacity="0.9" />
                  <circle cx="24" cy="25" r="7" fill="#0f0618" stroke="#fda4af" strokeWidth="1.5" />
                  <circle cx="36" cy="18" r="2" fill="#fbbf24" className="ofc-cam-rec" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-secondary/80">Creator command center</p>
                <h1 className="truncate text-2xl sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                    FanMail™ Studio
                  </span>
                </h1>
                <p className="mt-1 text-xs opacity-70">
                  Same inbox · same weather · same markets — maximalist creator brain edition
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="badge badge-lg gap-1 border-0 bg-error/90 text-error-content">
                <span className="ofc-live-dot size-2 rounded-full bg-white" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-wider">Live-ish</span>
              </div>
              <div className="rounded-box border border-white/10 bg-base-300/40 px-3 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-widest opacity-60">Unread love</p>
                <p className="text-lg font-bold tabular-nums text-primary">{unread}</p>
              </div>
              <button
                type="button"
                onClick={onSwitchPersona}
                className="btn btn-primary btn-sm border-0 bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/30 hover:brightness-110"
              >
                Switch character
              </button>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="flex w-full flex-col border-b border-white/10 bg-base-300/20 backdrop-blur-md lg:w-[min(100%,320px)] lg:border-b-0 lg:border-r">
            <div className="border-b border-white/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">Request queue</p>
              <p className="mt-1 text-sm opacity-70">{emails.length} messages · tap to unlock the drama</p>
            </div>
            <ul className="max-h-[40vh] space-y-2 overflow-y-auto p-3 lg:max-h-[calc(100dvh-220px)]">
              {emails.map(e => {
                const active = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`group w-full rounded-box border p-3 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                        active
                          ? 'border-primary bg-primary/15 shadow-primary/20'
                          : 'border-white/10 bg-base-100/30 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                          {e.from.avatar}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="line-clamp-2 text-sm font-semibold leading-snug">{e.subject}</p>
                            {!e.read && (
                              <span className="badge badge-xs shrink-0 border-0 bg-accent text-accent-content">NEW</span>
                            )}
                          </div>
                          <p className="mt-1 text-xs opacity-50">{e.from.name}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {selectedEmail ? (
              <article className="ofc-card-pop relative mx-auto max-w-2xl rounded-3xl border-2 border-primary/30 bg-base-200/40 p-6 shadow-2xl shadow-fuchsia-900/30 backdrop-blur-sm sm:p-10">
                <div
                  className="pointer-events-none absolute -right-4 -top-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-secondary/50 opacity-60"
                  aria-hidden
                >
                  <svg viewBox="0 0 100 100" className="ofc-orbit h-full w-full text-secondary">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 12" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                  </svg>
                </div>

                <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Featured thread</p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                  </div>
                  <div className="text-right text-sm">
                    <p className="opacity-50">From</p>
                    <p className="font-semibold text-primary">{selectedEmail.from.name}</p>
                    <p className="mt-2 opacity-50">{selectedEmail.date}</p>
                  </div>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed opacity-90">{selectedEmail.body}</div>
                <div className="mt-8 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-sm btn-outline btn-primary border-primary/50">
                    Heart react
                  </button>
                  <button type="button" className="btn btn-sm btn-ghost">
                    Pin to highlight
                  </button>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center opacity-40">
                <p className="text-center text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                  Pick a message — the algorithm is watching 👀
                </p>
              </div>
            )}
          </main>

          <aside className="flex w-full shrink-0 flex-col gap-4 border-t border-white/10 bg-base-300/15 p-4 backdrop-blur-md lg:w-72 lg:border-l lg:border-t-0">
            <section className="card border border-white/10 bg-gradient-to-b from-base-200/60 to-base-300/30 shadow-lg">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">Glow check</p>
                <p className="text-xs opacity-60">Ring-light &amp; outdoor energy for {weather.city}</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl leading-none">{weather.icon}</span>
                  <div>
                    <p className="text-lg font-bold">{weather.condition}</p>
                    <p className="text-2xl font-black tabular-nums text-primary">{weather.temp}°</p>
                    <p className="text-xs opacity-50">Feels {weather.feels_like}° · wind {weather.wind} km/h</p>
                  </div>
                </div>
                <ul className="mt-2 flex flex-wrap gap-1">
                  {weather.forecast.slice(0, 4).map(d => (
                    <li
                      key={d.day}
                      className="rounded-lg border border-white/10 bg-base-100/20 px-2 py-1 text-center text-[10px]"
                    >
                      <span className="block opacity-60">{d.day}</span>
                      <span>{d.icon}</span>
                      <span className="tabular-nums opacity-80">
                        {' '}
                        {d.high}°
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card border border-white/10 bg-base-200/40">
              <div className="card-body gap-3 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">Bag watch</p>
                <p className="text-xs opacity-60">Stonks, but make it creator economy</p>
                <ul className="space-y-2">
                  {stocks.map(s => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-base-100/20 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-bold text-primary">{s.ticker}</p>
                        <p className="truncate text-[10px] opacity-50">{s.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MiniSpark
                          series={s.series}
                          stroke={s.changePct >= 0 ? '#f472b6' : '#22d3ee'}
                          className="opacity-80"
                        />
                        <span
                          className={`text-sm font-bold tabular-nums ${s.changePct >= 0 ? 'text-success' : 'text-info'}`}
                        >
                          {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct)}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="card border border-white/10 bg-gradient-to-br from-violet-900/30 to-fuchsia-900/20">
              <div className="card-body gap-2 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">For you feed</p>
                <p className="text-xs opacity-60">Headlines remixed as timeline tea</p>
                <ul className="space-y-3">
                  {news.slice(0, 4).map(n => (
                    <li key={n.id} className="border-l-2 border-primary pl-3 text-sm leading-snug">
                      <span className="mr-1">{n.emoji}</span>
                      {n.title}
                      <p className="mt-1 text-[10px] uppercase tracking-wider opacity-40">
                        {n.source} · {n.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
