import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import './DoodleChildLayout.css'

const kidNames = {
  'Julien Moreau': 'Julien (my friend??)',
  'BNP Paribas': 'Money letter',
  'GitHub': 'Octocat place',
  'Maman 💕': 'MOM',
  'Amazon': 'Box store',
  'Air France': 'Planes!!!',
  'Netflix': 'TV',
  'LinkedIn': 'Jobs site',
}

const swatches = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#c9b1ff', '#5c6bc0', '#95e1d3', '#f38181']
const tilts = ['-2.5deg', '1.8deg', '-1.2deg', '2.2deg', '-1.8deg', '1.4deg', '-2deg', '2.5deg']

function ScribbleFrame({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[2rem] border-[3px] border-dashed border-[var(--text)]/15 ${className}`}
      aria-hidden
    />
  )
}

function DoodleStars({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" aria-hidden>
      <path
        d="M60 8l6 18 18 2-14 12 4 18-16-9-16 9 4-18-14-12 18-2z"
        fill="var(--accent3)"
        className="doodle-star-twinkle"
        style={{ transformOrigin: '60px 40px' }}
      />
      <path
        d="M22 78l4 11 11 1-8 7 2 11-9-5-9 5 2-11-8-7 11-1z"
        fill="var(--accent)"
        opacity={0.85}
        className="doodle-star-twinkle"
        style={{ animationDelay: '0.4s', transformOrigin: '28px 88px' }}
      />
      <circle cx="98" cy="88" r="5" fill="var(--accent2)" className="doodle-animate-bounce-soft" style={{ animationDelay: '0.2s' }} />
    </svg>
  )
}

function ThoughtBubble({ children }) {
  return (
    <div className="relative">
      <svg className="pointer-events-none absolute -left-3 bottom-0 h-16 w-12 text-[var(--accent2)]/40" viewBox="0 0 48 64" aria-hidden>
        <circle cx="14" cy="52" r="5" fill="currentColor" />
        <circle cx="6" cy="58" r="3" fill="currentColor" />
      </svg>
      <div className="doodle-paper-shadow relative rounded-[2rem] border-[3px] border-dashed border-[var(--accent2)]/50 bg-base-100 px-6 py-5 doodle-animate-float">
        {children}
      </div>
    </div>
  )
}

function WigglySparkline({ series, color }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 120
  const h = 44
  const pad = 4
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = pad + (i / (series.length - 1)) * (w - 2 * pad)
    const jitter = Math.sin(i * 1.7) * 1.2
    const y = pad + (1 - (v - min) / r) * (h - 2 * pad) + jitter
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.join(' ')}
        className="doodle-draw-line"
        style={{ animationDelay: '0.3s' }}
      />
    </svg>
  )
}

export default function DoodleChildLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="doodle-child-page relative min-h-dvh overflow-x-hidden pb-16 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          linear-gradient(90deg, rgba(239, 68, 68, 0.35) 0, rgba(239, 68, 68, 0.35) 3px, transparent 3px),
          repeating-linear-gradient(
            180deg,
            transparent,
            transparent 27px,
            rgba(92, 107, 192, 0.12) 27px,
            rgba(92, 107, 192, 0.12) 28px
          )
        `,
        backgroundSize: '100% 100%, 100% 28px',
        backgroundPosition: '48px 0, 0 52px',
      }}
    >
      {/* Margin holes */}
      <div
        className="pointer-events-none absolute left-5 top-24 bottom-32 w-3 space-y-6 opacity-40"
        aria-hidden
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full border-2 border-[var(--text)]/30 bg-[var(--bg2)]"
            style={{ marginTop: i === 0 ? 0 : undefined }}
          />
        ))}
      </div>

      {/* Floating doodles — corners */}
      <DoodleStars className="pointer-events-none absolute -right-4 top-8 h-28 w-28 opacity-90 doodle-animate-float" style={{ '--d-rot': '12deg' }} />
      <svg
        className="pointer-events-none absolute left-[2%] top-[40%] h-20 w-20 text-[var(--accent)]/30 doodle-ring-spin"
        viewBox="0 0 80 80"
        aria-hidden
      >
        <path
          d="M40 6c18 0 32 14 32 32s-14 32-32 32S8 56 8 38 22 6 40 6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="6 8"
        />
      </svg>
      <svg
        className="pointer-events-none absolute right-[8%] bottom-[28%] h-24 w-24 text-[var(--accent3)]/40 doodle-animate-wobble"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <path d="M10 50 Q50 10 90 50 Q50 90 10 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="currentColor" opacity="0.35" />
      </svg>

      <div className="relative z-[1] mx-auto max-w-3xl px-4 pl-14 pr-4 pt-10 sm:pl-16 sm:pr-8">
        <header className="relative mb-10 text-center">
          <ScribbleFrame />
          <p className="mb-2 font-[family-name:var(--font-display)] text-sm tracking-wide text-[var(--accent)]/90 doodle-animate-wobble">
            my secret website (shhh)
          </p>
          <h1
            className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--text)] sm:text-5xl doodle-animate-bounce-soft"
            style={{ textShadow: '3px 3px 0 var(--accent3)' }}
          >
            Stuff I checked today ✏️
          </h1>
          <svg className="mx-auto mt-3 h-4 w-48 text-[var(--accent2)]" viewBox="0 0 200 16" aria-hidden>
            <path
              d="M4 10 Q50 2 100 10 T196 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="doodle-draw-line"
            />
          </svg>
          <p className="mt-3 text-lg text-[var(--text2)]">
            {unread} letter{unread !== 1 ? 's' : ''} still have sparkles ✨
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm mt-4 rounded-full border-2 border-[var(--text)]/20 shadow-md"
            style={{ fontFamily: 'var(--font-display)' }}
            onClick={onSwitchPersona}
          >
            pick someone else
          </button>
        </header>

        {/* Weather */}
        <section className="relative mb-12">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--accent)]" style={{ transform: 'rotate(-1deg)' }}>
            Outside window 🪟
          </h2>
          <ThoughtBubble>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8">
              <span className="text-6xl doodle-animate-bounce-soft" role="img" aria-hidden>
                {weather.icon}
              </span>
              <div className="text-center sm:text-left">
                <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--text)]">
                  {weather.temp}° — {weather.condition}
                </p>
                <p className="text-lg text-[var(--text2)]">({weather.city} is where that is)</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {weather.forecast.map((d, i) => (
                <div
                  key={d.day}
                  className="badge badge-lg gap-1 border-2 border-[var(--text)]/15 bg-[var(--bg2)] px-3 py-3 text-[var(--text)] doodle-animate-float"
                  style={{
                    animationDelay: `${i * 0.35}s`,
                    transform: `rotate(${tilts[i % tilts.length]})`,
                  }}
                >
                  <span className="text-xl">{d.icon}</span>
                  <span className="font-[family-name:var(--font-display)]">{d.day}</span>
                  <span className="opacity-80">
                    {d.high}°/{d.low}°
                  </span>
                </div>
              ))}
            </div>
          </ThoughtBubble>
        </section>

        {/* Inbox */}
        <section className="relative mb-12">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--accent2)]" style={{ transform: 'rotate(1deg)' }}>
            Mailbox drawings 📬
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {emails.map((email, i) => {
              const c = swatches[i % swatches.length]
              const tilt = tilts[i % tilts.length]
              return (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="doodle-email-card doodle-paper-shadow relative rounded-2xl border-[3px] bg-base-100 p-4 text-left"
                  style={{
                    borderColor: c,
                    transform: `rotate(${tilt})`,
                    boxShadow: `5px 6px 0 ${c}33`,
                  }}
                >
                  <div className="absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent3)] text-xl shadow-sm doodle-animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                    {email.from.avatar}
                  </div>
                  <p className="pr-10 font-[family-name:var(--font-display)] text-lg text-[var(--text)]" style={{ color: c }}>
                    {kidNames[email.from.name] || email.from.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-base text-[var(--text2)]">{email.subject}</p>
                  {!email.read && (
                    <span className="badge badge-primary badge-sm mt-2 border-0" style={{ fontFamily: 'var(--font-display)' }}>
                      NEW!!!
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Stocks */}
        <section className="relative mb-12">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--accent3)]" style={{ transform: 'rotate(-0.5deg)' }}>
            Money squiggles 📈
          </h2>
          <div className="doodle-paper-shadow grid gap-4 rounded-3xl border-[3px] border-dotted border-[var(--border)]/60 bg-base-100 p-5 sm:grid-cols-2">
            {stocks.map((s, i) => {
              const c = swatches[(i + 2) % swatches.length]
              const up = s.changePct >= 0
              return (
                <div
                  key={s.ticker}
                  className="flex flex-col gap-2 rounded-2xl border-2 border-[var(--text)]/10 bg-[var(--bg)]/80 p-4"
                  style={{ transform: `rotate(${tilts[(i + 3) % tilts.length]})` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-[family-name:var(--font-display)] text-xl" style={{ color: c }}>
                      {s.ticker}
                    </span>
                    <span className={`badge ${up ? 'badge-success' : 'badge-error'} font-mono text-xs`}>
                      {up ? '↑' : '↓'} {Math.abs(s.changePct).toFixed(2)}%
                    </span>
                  </div>
                  <WigglySparkline series={s.series} color={c} />
                  <p className="text-sm text-[var(--text2)]">
                    {s.currency}
                    {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* News */}
        <section className="relative mb-8">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--accent)]" style={{ transform: 'rotate(1.2deg)' }}>
            Things grown-ups talk about 📰
          </h2>
          <ul className="space-y-4">
            {news.slice(0, 5).map((n, i) => (
              <li
                key={n.id}
                className="relative rounded-r-3xl border-l-4 border-[var(--accent2)] bg-base-100 py-4 pl-5 pr-4 shadow-md doodle-animate-float"
                style={{
                  animationDelay: `${i * 0.25}s`,
                  borderLeftColor: swatches[(i + 1) % swatches.length],
                  transform: `rotate(${tilts[(i + 4) % tilts.length]})`,
                }}
              >
                <span className="absolute -left-2 top-6 h-0 w-0 border-y-8 border-r-8 border-y-transparent border-r-[var(--bg2)]" aria-hidden />
                <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-wider text-[var(--text2)]">{n.category}</p>
                <p className="mt-1 text-lg leading-snug">
                  <span className="mr-2 text-2xl">{n.emoji}</span>
                  {n.title}
                </p>
                <p className="mt-1 text-sm opacity-70">{n.source} · {n.time}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="pb-6 text-center font-[family-name:var(--font-display)] text-[var(--text2)] doodle-animate-wobble">
          <p>— the end — i drew this with my brain 🧠🖍️</p>
        </footer>
      </div>

      {/* Email modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/50 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="doodle-email-title"
            className="doodle-paper-shadow relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border-4 bg-base-100 p-6 shadow-2xl"
            style={{
              borderColor: swatches[emails.findIndex((e) => e.id === selectedEmail.id) % swatches.length],
              transform: 'rotate(-1deg)',
              fontFamily: 'var(--font-main)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-center text-5xl">{selectedEmail.from.avatar}</div>
            <h3 id="doodle-email-title" className="font-[family-name:var(--font-display)] text-2xl text-[var(--text)]">
              {selectedEmail.subject}
            </h3>
            <p className="mt-1 text-[var(--text2)]">
              from: {kidNames[selectedEmail.from.name] || selectedEmail.from.name}
            </p>
            <div className="mt-4 whitespace-pre-line border-t-2 border-dashed border-[var(--border)]/40 pt-4 text-base leading-relaxed text-[var(--text)]">
              {selectedEmail.body}
            </div>
            <div className="mt-6 flex justify-center">
              <button type="button" className="btn btn-primary rounded-full px-8" style={{ fontFamily: 'var(--font-display)' }} onClick={() => setSelectedEmail(null)}>
                ok i read it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
