import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FLOAT_PROPS = [
  { t: 8, l: 6, e: '🪷', d: '0s', s: 1.6 },
  { t: 18, l: 92, e: '✨', d: '0.4s', s: 1.2 },
  { t: 42, l: 3, e: '🧘', d: '0.8s', s: 1.4 },
  { t: 58, l: 94, e: '🌿', d: '0.2s', s: 1.3 },
  { t: 78, l: 8, e: '☀️', d: '1.1s', s: 1.5 },
  { t: 88, l: 88, e: '🕉️', d: '0.6s', s: 1.25 },
]

function MiniSpark({ series, positive }) {
  if (!series?.length) return null
  const slice = series.slice(-22)
  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const w = 76
  const h = 30
  const p = 2
  const denom = Math.max(1, slice.length - 1)
  const pts = slice
    .map((v, i) => {
      const x = p + (i / denom) * (w - 2 * p)
      const t = max === min ? 0.5 : (v - min) / (max - min)
      const y = h - p - t * (h - 2 * p)
      return `${x},${y}`
    })
    .join(' ')
  const stroke = positive ? 'var(--accent2)' : 'var(--accent)'
  return (
    <svg width={w} height={h} className="shrink-0 opacity-90" aria-hidden>
      <polyline fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  )
}

function LotusMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="60" cy="60" r="52" className="yoga-chakra-ring opacity-30" stroke="var(--accent3)" strokeWidth="0.75" strokeDasharray="4 6" />
      <g className="yoga-lotus-petals">
        <path
          d="M60 28c8 12 12 28 10 44-6-10-10-28-10-44z"
          fill="color-mix(in srgb, var(--accent) 35%, transparent)"
          stroke="var(--accent)"
          strokeWidth="0.8"
          opacity="0.85"
        />
        <path
          d="M60 28c-8 12-12 28-10 44 6-10 10-28 10-44z"
          fill="color-mix(in srgb, var(--accent2) 35%, transparent)"
          stroke="var(--accent2)"
          strokeWidth="0.8"
          opacity="0.85"
        />
        <path
          d="M28 60c14 4 30 4 44 0-12 4-30 4-44 0z"
          fill="color-mix(in srgb, var(--accent3) 28%, transparent)"
          stroke="var(--accent3)"
          strokeWidth="0.8"
          opacity="0.75"
        />
        <path
          d="M92 60c-14-4-30-4-44 0 12-4 30-4 44 0z"
          fill="color-mix(in srgb, var(--accent) 25%, transparent)"
          stroke="var(--accent)"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </g>
      <circle cx="60" cy="60" r="8" fill="var(--accent2)" className="yoga-lotus-core opacity-90" />
    </svg>
  )
}

export default function YogaTeacherLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-screen overflow-x-hidden pb-24"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%),
          radial-gradient(ellipse 60% 50% at 0% 50%, color-mix(in srgb, var(--accent2) 14%, transparent), transparent 50%),
          radial-gradient(ellipse 50% 45% at 100% 30%, color-mix(in srgb, var(--accent3) 12%, transparent), transparent 45%),
          linear-gradient(165deg, var(--bg2) 0%, var(--bg) 42%, color-mix(in srgb, var(--bg2) 70%, #e8ddd4) 100%)
        `,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="yoga-sunrise-orb pointer-events-none absolute -top-24 left-1/2 h-[min(55vw,22rem)] w-[min(55vw,22rem)] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, #ffb366) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {FLOAT_PROPS.map((p, i) => (
        <span
          key={`float-${i}`}
          className="yoga-float-soft pointer-events-none fixed z-[1] select-none opacity-[0.45] md:opacity-55"
          style={{
            top: `${p.t}%`,
            left: `${p.l}%`,
            fontSize: `clamp(${p.s * 0.9}rem, ${p.s * 1.05}vw, ${p.s * 1.2}rem)`,
            animationDelay: p.d,
          }}
          aria-hidden
        >
          {p.e}
        </span>
      ))}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--text2) 12%, transparent) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <header className="relative z-10 px-4 pb-8 pt-10 text-center md:px-8 md:pt-14">
        <div className="yoga-lotus-wrap relative mx-auto mb-4 flex w-28 justify-center md:w-36">
          <LotusMark className="h-28 w-28 md:h-36 md:w-36" />
        </div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.55em] text-[var(--text2)]">Sunrise studio · digital shala</p>
        <h1
          className="mt-3 text-4xl font-semibold leading-tight text-[var(--text)] md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Namaste, inbox
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--text2)]">
          Same messages, weather, headlines &amp; markets — reframed as today&apos;s practice. Breathe, tap an intention, roll up your mat when you&apos;re done.
        </p>
        <button type="button" className="btn btn-ghost btn-sm mt-5 gap-2 text-[var(--text2)] hover:bg-[var(--card)]" onClick={onSwitchPersona}>
          <span aria-hidden>🚪</span> Leave the studio
        </button>
      </header>

      {/* Yoga mat strip */}
      <div className="relative z-10 mx-auto mb-10 max-w-3xl px-4 md:px-6" aria-hidden>
        <div
          className="yoga-mat-shimmer relative h-3 overflow-hidden rounded-full shadow-md"
          style={{
            background: `linear-gradient(90deg,
              color-mix(in srgb, var(--accent2) 55%, #2d4a38) 0%,
              color-mix(in srgb, var(--accent2) 70%, #3d5c48) 25%,
              color-mix(in srgb, var(--accent) 40%, var(--accent2)) 50%,
              color-mix(in srgb, var(--accent2) 65%, #2d4a38) 100%)`,
          }}
        >
          <div
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/25"
            style={{ boxShadow: '0 0 12px color-mix(in srgb, white 40%, transparent)' }}
          />
        </div>
        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.35em] text-[var(--text2)] opacity-70">alignment · center · flow</p>
      </div>

      <main className="relative z-10 mx-auto max-w-3xl space-y-12 px-4 pb-16 md:px-6">
        {/* Inbox */}
        <section className="yoga-stagger-card rounded-3xl border border-[var(--border)] bg-[var(--card)]/95 p-6 shadow-lg backdrop-blur-sm md:p-8" style={{ animationDelay: '0.05s' }}>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)]/80 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Practice 01</p>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Intentions in your inbox
              </h2>
              <p className="mt-1 text-sm text-[var(--text2)]">{emails.length} scrolls waiting on the cushion</p>
            </div>
            <span className="text-4xl" aria-hidden>
              📜
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {emails.map((email, i) => (
              <li key={email.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="group card card-border w-full border-[var(--border)] bg-[var(--card)]/90 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent2)]/50 hover:shadow-md"
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
                  <div className="card-body gap-2 p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent3)_18%,transparent)] text-lg transition group-hover:scale-110">
                        {email.from.avatar ?? '✉️'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[var(--text)]">{email.subject}</p>
                        <p className="text-sm text-[var(--text2)]">{email.from.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--text2)]/85">{email.preview}</p>
                      </div>
                      <span className="badge badge-ghost badge-sm shrink-0 opacity-70">{email.time}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Weather */}
        <section className="yoga-stagger-card rounded-3xl border border-[var(--border)] bg-[var(--card)]/95 p-6 shadow-lg backdrop-blur-sm md:p-8" style={{ animationDelay: '0.15s' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent2)]">Practice 02</p>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Outdoor shala · sky report
              </h2>
            </div>
            <div className="yoga-weather-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent2)_15%,transparent)] text-4xl md:h-20 md:w-20 md:text-5xl">
              {weather.icon}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)]/60 bg-[var(--card)]/80 p-5">
              <p className="text-sm text-[var(--text2)]">Prana check</p>
              <p className="mt-2 text-4xl font-bold tabular-nums text-[var(--text)]">
                {weather.temp}°C
                <span className="ml-2 text-lg font-normal text-[var(--text2)]">feels {weather.feels_like}°</span>
              </p>
              <p className="mt-2 text-[var(--text)]">{weather.condition}</p>
              <p className="mt-1 text-sm text-[var(--text2)]">
                {weather.city}, {weather.country} · wind {weather.wind} km/h · humidity {weather.humidity}%
              </p>
            </div>
            <ul className="flex flex-col justify-center gap-2 rounded-2xl border border-dashed border-[var(--accent2)]/35 bg-[color-mix(in_srgb,var(--accent2)_7%,transparent)] p-4">
              {weather.forecast.slice(0, 5).map((d) => (
                <li key={d.day} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text)]">{d.day}</span>
                  <span className="text-xl">{d.icon}</span>
                  <span className="tabular-nums text-[var(--text2)]">
                    {d.high}° / {d.low}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* News */}
        <section className="yoga-stagger-card rounded-3xl border border-[var(--border)] bg-[var(--card)]/95 p-6 shadow-lg backdrop-blur-sm md:p-8" style={{ animationDelay: '0.22s' }}>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)]/80 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent3)]">Practice 03</p>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Sangha cork board
              </h2>
              <p className="mt-1 text-sm text-[var(--text2)]">What the world is chatting about after savasana</p>
            </div>
            <span className="text-3xl" aria-hidden>
              📌
            </span>
          </div>
          <ul className="mt-6 space-y-4">
            {news.map((item, i) => (
              <li
                key={item.id}
                className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)]/85 p-4 pl-5 shadow-sm before:absolute before:left-2 before:top-3 before:h-3 before:w-3 before:rounded-full before:bg-[var(--accent)] before:content-['']"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <h3 className="flex-1 font-semibold text-[var(--text)]">{item.title}</h3>
                </div>
                <p className="mt-2 text-xs text-[var(--text2)]">
                  {item.source} · {item.category} · {item.time}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Stocks */}
        <section className="yoga-stagger-card rounded-3xl border border-[var(--border)] bg-[var(--card)]/95 p-6 shadow-lg backdrop-blur-sm md:p-8" style={{ animationDelay: '0.28s' }}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Practice 04</p>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                Abundance flow meters
              </h2>
              <p className="mt-1 text-sm text-[var(--text2)]">Markets breathe in cycles — observe without gripping the mat</p>
            </div>
            <span className="text-3xl" aria-hidden>
              〰️
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {stocks.map((s) => {
              const up = s.changePct >= 0
              return (
                <li
                  key={s.ticker}
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)]/85 p-4 shadow-sm"
                >
                  <MiniSpark series={s.series} positive={up} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[var(--text)]">
                      {s.ticker}{' '}
                      <span className="text-sm font-normal text-[var(--text2)]">{s.name}</span>
                    </p>
                    <p className="text-sm tabular-nums text-[var(--text2)]">
                      {s.currency}
                      {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
                      <span className={up ? 'font-semibold text-[var(--accent2)]' : 'font-semibold text-[var(--accent)]'}>
                        {up ? '↑' : '↓'} {up ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      {selectedEmail && (
        <div
          className="modal modal-open z-[80] pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="yoga-email-title"
        >
          <button
            type="button"
            className="modal-backdrop bg-[var(--text)]/40 backdrop-blur-sm"
            aria-label="Close message"
            onClick={() => setSelectedEmail(null)}
          />
          <div className="modal-box relative max-h-[85vh] w-full max-w-lg overflow-y-auto border-2 border-[var(--accent2)]/40 bg-[var(--card)] shadow-2xl">
            <div className="yoga-scroll-top absolute left-0 right-0 top-0 h-2 rounded-t-2xl bg-gradient-to-r from-[var(--accent)]/30 via-[var(--accent2)]/40 to-[var(--accent3)]/30" aria-hidden />
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close message"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <p className="text-center text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[var(--text2)]">Unroll your scroll</p>
            <h2 id="yoga-email-title" className="mt-3 text-center text-2xl font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-[1.85] text-[var(--text)]/92">{selectedEmail.body}</pre>
            <div className="modal-action">
              <button type="button" className="btn btn-primary w-full border-0 bg-[var(--accent2)] text-[var(--card)] hover:bg-[color-mix(in_srgb,var(--accent2)_85%,#000)]" onClick={() => setSelectedEmail(null)}>
                Fold gently · close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
