import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function DiscoSparkles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${(i * 23 + 7) % 100}%`,
        top: `${(i * 31 + 11) % 100}%`,
        delay: `${(i * 0.17) % 4}s`,
        scale: 0.4 + (i % 5) * 0.15,
      })),
    []
  )

  return (
    <div className="disco-sparkles pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {dots.map(d => (
        <span
          key={d.id}
          className="disco-sparkle-dot absolute rounded-full bg-white shadow-[0_0_6px_2px_rgba(250,232,255,0.9)]"
          style={{
            left: d.left,
            top: d.top,
            width: 4 * d.scale,
            height: 4 * d.scale,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  )
}

function DiscoMirrorBall() {
  return (
    <div className="disco-ball-stage relative z-10 flex flex-col items-center px-4 pt-2" aria-hidden>
      <div className="disco-ball-string h-8 w-px bg-gradient-to-b from-transparent via-fuchsia-200/60 to-fuchsia-300/80" />
      <div className="disco-ball-shell mt-0">
        <div className="disco-ball-sphere" />
        <div className="disco-ball-highlight absolute inset-0 rounded-full" />
      </div>
      <p
        className="disco-sub-pulse mt-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-100/80"
        style={{ fontFamily: 'var(--font-main)' }}
      >
        Saturday night forever
      </p>
    </div>
  )
}

export default function DiscoLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  const tickerItems = useMemo(() => {
    const parts = stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'} ${s.changePct.toFixed(1)}%`)
    return [...parts, ...parts]
  }, [])

  return (
    <div
      className="disco-root relative min-h-screen overflow-x-hidden pb-8"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 100%, #2e1064 0%, #0f0518 55%, #020008 100%)',
        fontFamily: 'var(--font-main)',
        color: '#fdf4ff',
      }}
    >
      <div className="disco-floor-grid pointer-events-none fixed inset-0 z-0 opacity-40" aria-hidden />
      <div className="disco-spotlight-layer pointer-events-none fixed inset-0 z-[1]" aria-hidden>
        <div className="disco-spot disco-spot-a" />
        <div className="disco-spot disco-spot-b" />
        <div className="disco-spot disco-spot-c" />
      </div>
      <DiscoSparkles />

      <DiscoMirrorBall />

      <header className="relative z-10 px-4 pb-4 pt-2 sm:px-6">
        <div className="disco-neon-title mx-auto max-w-4xl text-center">
          <h1
            className="text-3xl leading-none sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Boogie Inbox
          </h1>
          <p className="mt-2 text-sm text-fuchsia-200/90 sm:text-base">Same mail, weather, headlines &amp; tickers — now with extra hustle.</p>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="btn btn-primary border-0 bg-fuchsia-500 text-base-900 shadow-[0_0_24px_rgba(217,70,239,0.55)] hover:bg-fuchsia-400" onClick={onSwitchPersona}>
            Leave the club
          </button>
          <span className="badge badge-lg border-fuchsia-400/50 bg-purple-950/80 text-fuchsia-100">Open bar: closed · Open tabs: yes</span>
        </div>
      </header>

      <div className="disco-marquee-outer relative z-10 mx-3 mb-6 overflow-hidden rounded-lg border border-fuchsia-500/30 bg-purple-950/50 py-2 backdrop-blur-sm sm:mx-6">
        <div className="disco-marquee-track flex whitespace-nowrap">
          <span className="disco-marquee-chunk px-6 text-sm font-semibold uppercase tracking-widest text-fuchsia-200/95">
            {news.map(n => `${n.emoji} ${n.title}`).join(' · · · ')}
            {' · · · '}
          </span>
          <span className="disco-marquee-chunk px-6 text-sm font-semibold uppercase tracking-widest text-fuchsia-200/95" aria-hidden>
            {news.map(n => `${n.emoji} ${n.title}`).join(' · · · ')}
            {' · · · '}
          </span>
        </div>
      </div>

      <div className="relative z-10 px-3 pb-10 sm:px-6">
        <div className="disco-ticker-shell mb-8 overflow-hidden rounded-xl border border-cyan-400/25 bg-black/40 py-2 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
          <div className="disco-ticker-inner flex gap-10">
            {tickerItems.map((line, i) => (
              <span key={`${line}-${i}`} className="shrink-0 font-mono text-sm font-bold tracking-tight text-cyan-200">
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-yellow-200" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-2xl" aria-hidden>
                ✨
              </span>
              Dance floor (inbox)
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="disco-dance-card card group cursor-pointer border border-fuchsia-500/35 bg-gradient-to-br from-purple-950/90 via-fuchsia-950/70 to-indigo-950/90 text-left shadow-lg backdrop-blur-md transition hover:border-yellow-300/50 hover:shadow-[0_0_28px_rgba(250,204,21,0.25)]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="card-body gap-2 p-4 text-fuchsia-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="disco-avatar-bounce text-3xl">{email.from.avatar}</span>
                      <span className="badge badge-sm border-0 bg-yellow-400/90 text-base-900">VIP</span>
                    </div>
                    <h3 className="card-title text-base leading-snug text-white group-hover:text-yellow-100">{email.subject}</h3>
                    <p className="line-clamp-2 text-sm text-fuchsia-100/75">{email.preview}</p>
                    <p className="text-xs font-semibold text-cyan-300/90">{email.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-4 lg:col-span-4">
            <div className="disco-side-bob card border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-950/80 to-purple-950/90 shadow-[0_0_24px_rgba(34,211,238,0.2)]">
              <div className="card-body p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-200/80">Sky booth</p>
                <p className="mt-2 text-4xl font-black text-white">
                  <span className="disco-weather-wiggle inline-block">{weather.icon}</span>{' '}
                  <span className="text-cyan-200">{weather.temp}°C</span>
                </p>
                <p className="mt-1 text-sm text-cyan-100/80">{weather.condition}</p>
              </div>
            </div>

            <div className="disco-side-bob card border-2 border-yellow-300/35 bg-gradient-to-br from-amber-950/70 to-rose-950/80 shadow-[0_0_20px_rgba(250,204,21,0.15)]" style={{ animationDelay: '0.15s' }}>
              <div className="card-body gap-3 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-200/90">Headline glitter</p>
                {news.slice(0, 4).map((n, idx) => (
                  <p key={n.id} className="text-sm font-medium leading-snug text-amber-50" style={{ animationDelay: `${idx * 0.08}s` }}>
                    <span className="mr-1">{n.emoji}</span>
                    {n.title}
                  </p>
                ))}
              </div>
            </div>

            <div className="disco-side-bob card border-2 border-fuchsia-400/40 bg-purple-950/85" style={{ animationDelay: '0.3s' }}>
              <div className="card-body p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-200/90">Wall of sound (stocks)</p>
                <ul className="mt-2 space-y-2">
                  {stocks.map(s => (
                    <li key={s.ticker} className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-fuchsia-100">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'text-lime-300' : 'text-rose-300'}>
                        {s.changePct >= 0 ? '↑' : '↓'} {s.changePct.toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="disco-modal-glow max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-fuchsia-400/60 bg-gradient-to-b from-purple-950 via-fuchsia-950 to-indigo-950 p-6 text-fuchsia-50 shadow-[0_0_40px_rgba(217,70,239,0.45)]"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="disco-email-title"
          >
            <div className="flex justify-center text-4xl" aria-hidden>
              🪩
            </div>
            <h2 id="disco-email-title" className="mt-3 text-center text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-center text-sm font-semibold text-cyan-200">{selectedEmail.from.name}</p>
            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-fuchsia-100/95">
              {selectedEmail.body}
            </pre>
            <button type="button" className="btn btn-block mt-6 border-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-base-900 hover:brightness-110" onClick={() => setSelectedEmail(null)}>
              Back to the floor
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
