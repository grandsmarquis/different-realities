import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const patriotHeadlines = [
  'Robots get rules. Bald eagles remain unregulated.',
  'Soccer abroad. Heart still beats in red, white & blue.',
  'Texas just went full sci-fi. Someone cue the marching band.',
  'Europe turns the heat up. We\'re still grilling either way.',
  'Cannes rolls out the red carpet — Hollywood who?',
  'Silicon for freedom. Chips for the people.',
]

const starField = [
  { l: 6, t: 8, d: '0s', dur: '2.4s' },
  { l: 18, t: 22, d: '0.4s', dur: '3.1s' },
  { l: 88, t: 12, d: '1.1s', dur: '2.7s' },
  { l: 72, t: 28, d: '0.2s', dur: '3.4s' },
  { l: 42, t: 6, d: '0.9s', dur: '2.9s' },
  { l: 55, t: 38, d: '1.5s', dur: '3.2s' },
  { l: 12, t: 55, d: '0.6s', dur: '2.6s' },
  { l: 92, t: 48, d: '1.2s', dur: '3.5s' },
  { l: 28, t: 72, d: '0.3s', dur: '2.8s' },
  { l: 65, t: 62, d: '1.8s', dur: '3s' },
  { l: 38, t: 88, d: '0.7s', dur: '3.3s' },
  { l: 78, t: 78, d: '1.4s', dur: '2.5s' },
]

const mailTilts = ['-1.2deg', '1deg', '-0.8deg', '1.4deg', '-1deg', '0.9deg', '-1.3deg', '0.7deg']

const fireworks = [
  { l: '8%', t: '12%', delay: '0s', color: 'rgba(248, 113, 113, 0.85)' },
  { l: '88%', t: '18%', delay: '0.7s', color: 'rgba(96, 165, 250, 0.9)' },
  { l: '52%', t: '8%', delay: '1.4s', color: 'rgba(253, 224, 71, 0.88)' },
  { l: '22%', t: '22%', delay: '2.1s', color: 'rgba(248, 250, 252, 0.75)' },
  { l: '76%', t: '26%', delay: '2.8s', color: 'rgba(248, 113, 113, 0.7)' },
]

function freedomTempF(celsius) {
  return Math.round((celsius * 9) / 5 + 32)
}

function TickerSpans({ fTemp, city, changePct }) {
  const pct =
    changePct != null ? `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}` : '—'
  return (
    <>
      <span style={{ color: 'var(--accent2)' }}>★ WE THE PEOPLE ★ INBOX SECURE ★</span>
      <span style={{ color: 'var(--text2)' }}>Hot dogs {pct}% spirit (symbolic)</span>
      <span style={{ color: 'var(--accent)' }}>★ LIBERTY NEVER UNSUBSCRIBES ★</span>
      <span style={{ color: 'var(--text2)' }}>
        Weather in {city}: {fTemp}°F freedom units
      </span>
    </>
  )
}

export default function AmericanPatriotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length
  const fTemp = freedomTempF(weather.temp)

  return (
    <div
      className="us-patriot-root relative min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(180deg, #0c1929 0%, #0f2137 38%, #152a45 100%)`,
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="us-patriot-stripes h-3 w-full shrink-0 shadow-lg" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {starField.map((s, i) => (
          <span
            key={i}
            className="us-patriot-star absolute block size-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            style={{
              left: `${s.l}%`,
              top: `${s.t}%`,
              '--patriot-tw-delay': s.d,
              '--patriot-tw-dur': s.dur,
            }}
          />
        ))}
        {fireworks.map((f, i) => (
          <span
            key={i}
            className="us-patriot-firework absolute size-4 rounded-full"
            style={{
              left: f.l,
              top: f.t,
              background: `radial-gradient(circle, ${f.color} 0%, transparent 70%)`,
              animationDelay: f.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap items-start gap-4">
            <span className="us-patriot-eagle text-5xl sm:text-6xl" aria-hidden>
              🦅
            </span>
            <div>
              <p
                className="mb-1 text-xs font-bold uppercase tracking-[0.35em] opacity-80"
                style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}
              >
                EAGLE ALERT NETWORK™
              </p>
              <h1
                className="leading-[0.95] text-[clamp(1.75rem,5vw,3rem)] tracking-wide"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)',
                  textShadow: '0 2px 0 #1e3a8a, 0 4px 12px rgba(0,0,0,0.35)',
                }}
              >
                FREEDOM
                <span style={{ color: 'var(--accent)' }}> COMMAND </span>
                DESK
              </h1>
              <p className="mt-2 max-w-xl text-sm italic leading-relaxed opacity-90">
                Same inbox. Same forecast. Same tickers.{' '}
                <span className="font-bold not-italic" style={{ color: 'var(--accent2)' }}>
                  100% more fireworks.
                </span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-error badge-outline border-2 font-sans text-xs uppercase">
                  {unread} unread salutes
                </span>
                <span className="badge badge-primary badge-outline border-2 font-sans text-xs">
                  🇺🇸 BBQ season: optimal
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning btn-sm gap-2 font-sans uppercase tracking-wider shadow-md"
            onClick={onSwitchPersona}
          >
            <span aria-hidden>🎆</span>
            Switch persona
          </button>
        </header>

        <div
          className="mb-6 overflow-hidden rounded-lg border-2 py-2 shadow-inner"
          style={{
            borderColor: 'var(--border)',
            background: 'rgba(15, 23, 42, 0.65)',
          }}
        >
          <div className="us-patriot-ticker-inner flex w-max gap-10 whitespace-nowrap px-4 text-xs font-bold uppercase tracking-widest sm:text-sm">
            <TickerSpans fTemp={fTemp} city={weather.city} changePct={stocks[0]?.changePct} />
            <TickerSpans fTemp={fTemp} city={weather.city} changePct={stocks[0]?.changePct} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="us-patriot-seal text-3xl"
                aria-hidden
                title="Official-ish"
              >
                ⭐
              </span>
              <h2
                className="text-lg tracking-[0.2em] sm:text-xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}
              >
                OFFICIAL CORRESPONDENCE
              </h2>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {emails.map((email, i) => (
                <li key={email.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="card group relative w-full cursor-pointer text-left shadow-xl transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      transform: `rotate(${mailTilts[i % mailTilts.length]})`,
                      background:
                        'linear-gradient(145deg, #fefce8 0%, #fff7ed 45%, #fef2f2 100%)',
                      border: '3px solid',
                      borderColor: email.read ? '#94a3b8' : 'var(--accent)',
                      color: '#0f172a',
                    }}
                  >
                    <div className="card-body gap-2 p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl" aria-hidden>
                          {email.from.avatar}
                        </span>
                        {!email.read && (
                          <span className="badge badge-error badge-sm font-sans uppercase">
                            Unread
                          </span>
                        )}
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider opacity-70"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        From: {email.from.name}
                      </p>
                      <p className="font-bold leading-snug">{email.subject}</p>
                      <p className="text-xs leading-relaxed opacity-80">
                        {email.preview.slice(0, 96)}
                        {email.preview.length > 96 ? '…' : ''}
                      </p>
                      <div className="mt-1 flex flex-wrap justify-between gap-1 border-t border-dashed border-slate-300 pt-2 text-[10px] uppercase opacity-60">
                        <span>{email.date}</span>
                        <span>{email.tag}</span>
                      </div>
                      <span
                        className="pointer-events-none absolute -right-1 -top-1 rotate-12 text-4xl opacity-[0.12] transition-opacity group-hover:opacity-25"
                        aria-hidden
                      >
                        🇺🇸
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <aside className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
            <section
              className="card border-2 shadow-lg backdrop-blur-sm"
              style={{
                borderColor: '#1e40af',
                background: 'linear-gradient(160deg, rgba(30,58,138,0.35) 0%, rgba(15,23,42,0.92) 100%)',
              }}
            >
              <div className="card-body gap-3 p-5">
                <h3
                  className="card-title text-base uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}
                >
                  🌭 Backyard forecast
                </h3>
                <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.icon} {fTemp}°F
                </p>
                <p className="text-sm opacity-90">
                  ({weather.temp}°C for the diplomats in {weather.city})
                </p>
                <p className="text-sm italic leading-relaxed opacity-85">
                  &ldquo;{weather.condition}&rdquo; — perfect for a grill, a flag, and questionable
                  sparklers.
                </p>
                <div className="divider my-0 before:bg-white/20 after:bg-white/20 text-[10px] uppercase opacity-60">
                  Wind & vibes
                </div>
                <p className="text-xs opacity-80">
                  Wind {weather.wind} km/h · Humidity {weather.humidity}% · Eagle hair factor:{' '}
                  <span className="font-bold text-amber-300">majestic</span>
                </p>
              </div>
            </section>

            <section
              className="card border-2 shadow-lg"
              style={{
                borderColor: 'var(--accent)',
                background: 'rgba(15, 23, 42, 0.88)',
              }}
            >
              <div className="card-body gap-3 p-5">
                <h3
                  className="card-title text-base uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                >
                  📈 Wall Street patriots
                </h3>
                <ul className="space-y-3">
                  {stocks.map((s) => (
                    <li
                      key={s.ticker}
                      className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg bg-base-100/10 px-3 py-2"
                    >
                      <span
                        className="text-lg font-bold tracking-wide"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {s.ticker}
                      </span>
                      <span
                        className={`font-mono text-sm font-bold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}
                      >
                        {s.changePct >= 0 ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                      <span className="w-full text-xs opacity-70">
                        {s.currency}
                        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })} —{' '}
                        {s.changePct >= 0 ? 'Rally for the republic!' : 'Buy the dip for democracy!'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              className="card border-2 shadow-lg"
              style={{
                borderColor: 'var(--border)',
                background: 'linear-gradient(180deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)',
              }}
            >
              <div className="card-body gap-4 p-5">
                <h3
                  className="card-title text-base uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}
                >
                  📰 Headlines of the republic
                </h3>
                <ul className="space-y-4">
                  {news.map((n, i) => (
                    <li
                      key={n.id}
                      className="border-l-4 pl-3"
                      style={{
                        borderColor:
                          i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? '#f8fafc' : '#2563eb',
                      }}
                    >
                      <p className="text-lg leading-tight">
                        <span aria-hidden>{n.emoji} </span>
                        {n.title}
                      </p>
                      <p className="mt-1 text-xs italic opacity-75">{patriotHeadlines[i]}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider opacity-50">
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

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(10, 22, 40, 0.92)' }}
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="patriot-modal-title"
            className="card max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 shadow-2xl"
            style={{
              borderColor: 'var(--accent2)',
              background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 55%)',
              color: '#0f172a',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body gap-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-4xl" aria-hidden>
                  {selectedEmail.from.avatar}
                </span>
                <button
                  type="button"
                  className="btn btn-circle btn-ghost btn-sm font-sans text-xl"
                  onClick={() => setSelectedEmail(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <p
                id="patriot-modal-title"
                className="text-xs font-bold uppercase tracking-[0.25em] text-error"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ★ Declassified message ★
              </p>
              <h2 className="text-xl font-bold leading-snug">{selectedEmail.subject}</h2>
              <p className="text-sm opacity-70">
                <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date} · {selectedEmail.time}
              </p>
              <div className="divider my-0" />
              <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEmail.body}
              </pre>
              <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                This message approved by common sense (not legally binding)
              </p>
              <button
                type="button"
                className="btn btn-primary btn-block uppercase tracking-wider"
                onClick={() => setSelectedEmail(null)}
              >
                Roger that, eagle out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
