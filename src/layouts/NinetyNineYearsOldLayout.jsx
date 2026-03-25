import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const hearts = ['💕', '💗', '✨', '🫖', '🧶']

export default function NinetyNineYearsOldLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const stockLine = stocks
    .map(s => `${s.ticker} ${s.changePct >= 0 ? '↑' : '↓'} ${s.changePct}%`)
    .join('   ·   ')

  return (
    <div
      className="nn99-parlor relative min-h-full overflow-x-hidden pb-8"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: 'linear-gradient(165deg, var(--bg) 0%, #f5ebe3 42%, var(--bg2) 100%)',
      }}
    >
      <div className="nn99-knit-bg pointer-events-none absolute inset-0 opacity-[0.45]" aria-hidden />
      <div className="nn99-knit-shimmer pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply" aria-hidden />

      {hearts.map((h, i) => (
        <span
          key={h + i}
          className="nn99-heart pointer-events-none absolute text-2xl opacity-40 sm:text-3xl"
          style={{
            left: `${12 + i * 19}%`,
            top: `${18 + (i % 3) * 22}%`,
            animationDelay: `${i * 1.4}s`,
          }}
          aria-hidden
        >
          {h}
        </span>
      ))}

      <header className="nn99-lamp-flicker relative z-10 mx-4 mt-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-5 py-6 shadow-lg sm:mx-6 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="relative">
            <div className="absolute -left-1 -top-2 flex gap-1 sm:-top-3" aria-hidden>
              <span className="nn99-yarn-orbit inline-block text-3xl sm:text-4xl">🧶</span>
            </div>
            <p className="text-sm font-bold tracking-wide text-[var(--accent)]">Est. 1927 · still curious</p>
            <h1
              className="mt-1 max-w-[18ch] text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The parlour computer
            </h1>
            <p className="mt-3 max-w-prose text-lg leading-snug text-[var(--text2)]">
              Your letters, the weather out the window, what the radio folks are saying, and those numbers the grandchildren
              swear matter — all in one cosy screen.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="badge badge-lg border-2 border-[var(--border)] bg-[var(--bg2)] text-[var(--text)]">
              {emails.filter(e => !e.read).length} unread letters
            </div>
            <button type="button" className="btn btn-primary btn-lg border-0 shadow-md" onClick={onSwitchPersona}>
              Try another life
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-4 mt-6 grid gap-6 lg:mx-6 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-3xl" aria-hidden>
              ✉️
            </span>
            Letters &amp; telegrams
          </h2>
          <ul className="space-y-4">
            {emails.map((email, i) => (
              <li key={email.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="nn99-stamp-in card card-border w-full border-2 border-[var(--border)] bg-[var(--card)] text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="card-body gap-3 p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span className="text-4xl sm:text-5xl" aria-hidden>
                        {email.from.avatar}
                      </span>
                      {!email.read && (
                        <span className="badge badge-secondary badge-lg font-bold">NEW — read me first</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text2)]">{email.from.name}</p>
                      <p className="mt-1 text-xl font-bold leading-snug sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                        {email.subject}
                      </p>
                      <p className="mt-2 line-clamp-2 text-base text-[var(--text2)]">{email.preview}</p>
                      <p className="mt-2 text-sm font-semibold text-[var(--accent2)]">{email.date}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 lg:col-span-7">
          <div className="card card-border border-2 border-[var(--border)] bg-[var(--card)] shadow-lg">
            <div className="card-body gap-4 p-5 sm:p-7">
              <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                <span aria-hidden>🪟</span>
                Out the window — {weather.city}
              </h2>
              <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--bg)]/80 p-6 sm:flex-row sm:justify-between">
                <div className="nn99-cloud-bob text-center">
                  <span className="text-7xl sm:text-8xl" aria-hidden>
                    {weather.icon}
                  </span>
                  <p className="mt-2 text-2xl font-bold sm:text-3xl">{weather.condition}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--text2)]">Temperature</p>
                  <p className="text-5xl font-extrabold tabular-nums text-[var(--accent)] sm:text-6xl">{weather.temp}°</p>
                  <p className="mt-1 text-lg text-[var(--text2)]">Feels like {weather.feels_like}° · wind {weather.wind} km/h</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {weather.forecast.map(d => (
                  <div
                    key={d.day}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-center text-sm font-semibold"
                  >
                    <span className="mr-1">{d.icon}</span>
                    {d.day} {d.high}°
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-[var(--accent2)] bg-[var(--accent2)] py-3 text-[var(--card)] shadow-md">
            <p className="px-4 pb-2 text-center text-sm font-bold uppercase tracking-widest opacity-90">
              Grandchildren call this “the market”
            </p>
            <div className="nn99-stock-track relative">
              <div className="nn99-stock-marquee-inner flex gap-10 whitespace-nowrap px-4 font-mono text-lg font-bold sm:text-xl">
                <span>{stockLine}</span>
                <span aria-hidden>{stockLine}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              <span aria-hidden>📰</span>
              Clippings from the wireless
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {news.map((n, i) => (
                <article
                  key={n.id}
                  className="card card-border border-2 border-[var(--border)] bg-[#fffef8] p-5 shadow-md"
                  style={{ transform: `rotate(${(i % 3) * 0.8 - 0.8}deg)` }}
                >
                  <div className="nn99-paper-drift" style={{ animationDelay: `${i * 0.15}s` }}>
                    <p className="text-3xl">{n.emoji}</p>
                    <p className="mt-2 text-lg font-bold leading-snug">{n.title}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--text2)]">
                      {n.source} · {n.time}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="card border-2 border-[var(--border)] bg-[var(--bg2)] shadow-inner">
            <div className="card-body flex flex-row flex-wrap items-center gap-4 p-5">
              <div className="nn99-teacup relative text-5xl" aria-hidden>
                🫖
                <span className="absolute -right-1 -top-2 flex flex-col gap-0.5">
                  <span className="nn99-steam h-2 w-2 rounded-full bg-[var(--text2)]/30" />
                  <span className="nn99-steam h-2 w-2 rounded-full bg-[var(--text2)]/25" />
                  <span className="nn99-steam h-2 w-2 rounded-full bg-[var(--text2)]/20" />
                </span>
              </div>
              <p className="min-w-0 flex-1 text-base font-semibold leading-relaxed text-[var(--text)]">
                Take your time. Nothing on this machine is more important than a good sit-down and a biscuit.
              </p>
            </div>
          </div>
        </section>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--text)]/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="nn99-modal-pop max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-4 border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl sm:p-10"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nn99-letter-title"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)]">Opened letter</p>
            <h2 id="nn99-letter-title" className="mt-2 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-lg text-[var(--text2)]">
              From <strong className="text-[var(--text)]">{selectedEmail.from.name}</strong> · {selectedEmail.date}
            </p>
            <pre className="mt-6 whitespace-pre-wrap font-sans text-lg leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary btn-lg mt-8 w-full sm:w-auto" onClick={() => setSelectedEmail(null)}>
              Fold it away
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
