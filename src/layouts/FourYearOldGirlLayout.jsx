import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import './FourYearOldGirlLayout.css'

const letterFromNames = {
  'Julien Moreau': 'Julien (my friend)',
  'BNP Paribas': 'Bank with money',
  'GitHub': 'Octopus computer',
  'Maman 💕': 'Mommy',
  Amazon: 'Box truck shop',
  'Air France': 'Airplane people',
  Netflix: 'Cartoon TV',
  LinkedIn: 'Job people',
}

const stickerTilts = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg', '-2.2deg', '1.8deg']
const pastelBorders = ['#ff8dc7', '#c4a7ff', '#7dd3fc', '#7ee8c5', '#ffe066', '#fda4af', '#a5b4fc']

function CloudDecor({ className, delay = '0s' }) {
  return (
    <svg
      className={`fyo-cloud-drift pointer-events-none text-white/90 ${className}`}
      style={{ animationDelay: delay }}
      viewBox="0 0 120 48"
      fill="currentColor"
      aria-hidden
    >
      <path d="M28 36c-8 0-14-6-14-14 0-7 5-13 12-14 2-9 10-16 20-16 7 0 13 3 17 9 2-1 4-1 6-1 9 0 16 7 16 16s-7 16-16 16H28z" />
    </svg>
  )
}

function HeartSticker({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 56" fill="none" aria-hidden>
      <path
        d="M32 48S8 32 8 18c0-8 6-14 14-14 5 0 10 3 12 8 2-5 7-8 12-8 8 0 14 6 14 14 0 14-24 30-24 30z"
        fill="#ff8dc7"
        className="fyo-animate-sparkle"
        opacity={0.85}
      />
    </svg>
  )
}

function UnicornBadge({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 88 88" fill="none" aria-hidden>
      <circle cx="44" cy="44" r="40" fill="#fff" stroke="#c4a7ff" strokeWidth="3" />
      <path d="M44 22l4 14h14l-11 9 4 14-11-8-11 8 4-14-11-9h14z" fill="#ffe066" className="fyo-animate-wiggle" style={{ transformOrigin: '44px 44px' }} />
      <ellipse cx="44" cy="58" rx="18" ry="12" fill="#ff8dc7" opacity={0.35} />
      <path d="M44 18L38 8l8 6 8-6-6 10z" fill="#c4a7ff" />
    </svg>
  )
}

function RainbowSparkline({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 128
  const h = 48
  const pad = 6
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = pad + (i / (series.length - 1)) * (w - 2 * pad)
    const y = pad + (1 - (v - min) / r) * (h - 2 * pad)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.join(' ')}
        className="drop-shadow-sm"
      />
    </svg>
  )
}

export default function FourYearOldGirlLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="fyo-page relative min-h-dvh overflow-x-hidden pb-20 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: `
          radial-gradient(ellipse 120% 80% at 10% 20%, rgba(255, 141, 199, 0.35) 0%, transparent 50%),
          radial-gradient(ellipse 100% 70% at 90% 10%, rgba(196, 167, 255, 0.4) 0%, transparent 45%),
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(126, 232, 197, 0.3) 0%, transparent 50%),
          linear-gradient(165deg, #fff5fb 0%, #fae8ff 35%, #e0f2fe 70%, #fffbeb 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <CloudDecor className="absolute left-[3%] top-[8%] h-14 w-32 opacity-80" delay="0s" />
        <CloudDecor className="absolute right-[6%] top-[14%] h-12 w-28 opacity-70" delay="-3s" />
        <CloudDecor className="absolute left-[12%] bottom-[18%] h-10 w-24 opacity-60" delay="-5s" />
        <HeartSticker className="absolute right-[10%] top-[32%] h-14 w-14 opacity-90" style={{ animationDelay: '0.3s' }} />
        <HeartSticker className="absolute left-[4%] top-[45%] h-10 w-10 opacity-75" style={{ animationDelay: '0.8s' }} />
        <div className="absolute right-[4%] bottom-[24%] text-5xl fyo-animate-float" style={{ '--fyo-rot': '8deg' }}>
          ⭐
        </div>
        <div className="absolute left-[18%] top-[22%] text-3xl fyo-animate-bounce">✨</div>
      </div>

      <div className="relative z-[1] mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <header className="relative mb-10 text-center">
          <div className="fyo-rainbow-bar absolute -inset-x-4 -top-2 mx-auto h-3 max-w-md rounded-full opacity-90 shadow-md sm:-inset-x-8" />
          <div className="relative mt-6 flex flex-col items-center gap-3">
            <UnicornBadge className="h-20 w-20 fyo-animate-float drop-shadow-lg" style={{ '--fyo-rot': '-4deg' }} />
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-wide text-[var(--accent)] fyo-animate-wiggle">
              Hi hi! I am 4! ✨
            </p>
            <h1
              className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-[var(--text)] sm:text-5xl"
              style={{ textShadow: '3px 3px 0 #ffe066, 6px 6px 0 rgba(196, 167, 255, 0.45)' }}
            >
              My sparkly tablet
            </h1>
            <p className="max-w-md text-lg text-[var(--text2)]">
              {unread} pretty letter{unread !== 1 ? 's' : ''} still have a surprise sticker on them 💌
            </p>
            <button type="button" className="btn btn-secondary btn-sm rounded-full border-2 border-[var(--accent2)]/40 shadow-md" onClick={onSwitchPersona}>
              <span className="font-[family-name:var(--font-display)] font-semibold">Pick a different person</span>
            </button>
          </div>
        </header>

        {/* Weather — sky today */}
        <section className="relative mb-10">
          <h2 className="mb-4 flex items-center justify-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent)] sm:justify-start">
            <span className="fyo-animate-bounce text-3xl" aria-hidden>
              ☁️
            </span>
            Sky today
          </h2>
          <div
            className="fyo-sticker relative rounded-[2rem] border-4 bg-base-100 p-6 shadow-lg"
            style={{ borderColor: pastelBorders[2], transform: `rotate(${stickerTilts[0]})` }}
          >
            <div className="absolute -right-2 -top-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-content shadow">
              outside!
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
              <span className="text-7xl fyo-animate-float" style={{ '--fyo-rot': '0deg' }} role="img" aria-hidden>
                {weather.icon}
              </span>
              <div className="text-center sm:text-left">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--text)]">
                  {weather.temp}° — {weather.condition}
                </p>
                <p className="mt-1 text-lg text-[var(--text2)]">That is in {weather.city} 🌍</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {weather.forecast.map((d, i) => (
                <div
                  key={d.day}
                  className="badge badge-lg h-auto gap-1 border-2 border-base-300 bg-base-200 px-3 py-3 text-[var(--text)] fyo-animate-float"
                  style={{
                    animationDelay: `${i * 0.25}s`,
                    borderColor: pastelBorders[i % pastelBorders.length],
                  }}
                >
                  <span className="text-2xl">{d.icon}</span>
                  <span className="font-[family-name:var(--font-display)] font-semibold">{d.day}</span>
                  <span className="opacity-80">
                    {d.high}° / {d.low}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inbox — pretty letters */}
        <section className="relative mb-10">
          <h2 className="mb-4 flex items-center justify-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent2)] sm:justify-start">
            <span className="text-3xl fyo-animate-wiggle" aria-hidden>
              💌
            </span>
            Pretty letters
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {emails.map((email, i) => {
              const border = pastelBorders[i % pastelBorders.length]
              const tilt = stickerTilts[i % stickerTilts.length]
              return (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="fyo-mail-btn relative rounded-[1.75rem] border-4 bg-base-100 p-4 text-left shadow-md"
                  style={{
                    borderColor: border,
                    transform: `rotate(${tilt})`,
                    boxShadow: `6px 8px 0 ${border}44`,
                  }}
                >
                  <div
                    className="absolute -right-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-secondary/30 to-accent/30 text-2xl shadow fyo-animate-float"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    {email.from.avatar}
                  </div>
                  <p className="pr-12 font-[family-name:var(--font-display)] text-xl font-bold" style={{ color: border }}>
                    {letterFromNames[email.from.name] || email.from.name}
                  </p>
                  <p className="mt-2 line-clamp-2 text-base text-[var(--text2)]">{email.subject}</p>
                  {!email.read && (
                    <span className="badge badge-accent mt-2 border-0 font-[family-name:var(--font-display)] font-bold">NEW sticker!</span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Stocks — zigzag friends */}
        <section className="relative mb-10">
          <h2 className="mb-4 flex items-center justify-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent3)] sm:justify-start">
            <span className="text-3xl fyo-animate-bounce" aria-hidden>
              📈
            </span>
            Zigzag number friends
          </h2>
          <p className="mb-4 text-center text-[var(--text2)] sm:text-left">They go uppy and downy. I do not know why. It is silly!</p>
          <div
            className="grid gap-4 rounded-[2rem] border-4 border-dashed border-[var(--accent2)]/50 bg-base-100/90 p-5 backdrop-blur-sm sm:grid-cols-2"
            style={{ transform: `rotate(${stickerTilts[3]})` }}
          >
            {stocks.map((s, i) => {
              const up = s.changePct >= 0
              const stroke = pastelBorders[(i + 1) % pastelBorders.length]
              return (
                <div
                  key={s.ticker}
                  className="fyo-sticker rounded-2xl border-4 bg-gradient-to-br from-base-100 to-base-200 p-4"
                  style={{ borderColor: stroke, transform: `rotate(${stickerTilts[(i + 2) % stickerTilts.length]})` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold" style={{ color: stroke }}>
                      {s.ticker}
                    </span>
                    <span className={`badge gap-1 font-mono text-sm ${up ? 'badge-success' : 'badge-error'}`}>
                      {up ? '🎈' : '😮'} {up ? 'up' : 'down'} {Math.abs(s.changePct).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <RainbowSparkline series={s.series} stroke={stroke} />
                  </div>
                  <p className="mt-2 text-center font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)]">
                    {s.currency}
                    {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* News — big people stories */}
        <section className="relative mb-8">
          <h2 className="mb-4 flex items-center justify-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent)] sm:justify-start">
            <span className="text-3xl fyo-animate-float" style={{ '--fyo-rot': '0deg' }} aria-hidden>
              📰
            </span>
            Big-people stories
          </h2>
          <ul className="space-y-4">
            {news.slice(0, 5).map((n, i) => (
              <li
                key={n.id}
                className="fyo-sticker relative rounded-r-[1.75rem] border-l-[6px] bg-base-100 py-4 pl-5 pr-4 shadow-md"
                style={{
                  borderLeftColor: pastelBorders[i % pastelBorders.length],
                  transform: `rotate(${stickerTilts[(i + 4) % stickerTilts.length]})`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div className="absolute -left-1 top-5 h-3 w-3 rotate-45 rounded-sm bg-base-200" aria-hidden />
                <p className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--text2)]">{n.category}</p>
                <p className="mt-2 text-lg leading-snug text-[var(--text)]">
                  <span className="mr-2 text-2xl fyo-animate-sparkle" style={{ display: 'inline-block', animationDelay: `${i * 0.15}s` }}>
                    {n.emoji}
                  </span>
                  {n.title}
                </p>
                <p className="mt-1 text-sm text-[var(--text2)]">
                  {n.source} · {n.time}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="pb-8 text-center font-[family-name:var(--font-display)] text-[var(--text2)] fyo-animate-wiggle">
          <p className="text-lg">The end! 🦄💖🌈</p>
        </footer>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/40 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fyo-email-title"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border-4 bg-base-100 p-6 shadow-2xl"
            style={{
              borderColor: pastelBorders[emails.findIndex((e) => e.id === selectedEmail.id) % pastelBorders.length],
              transform: 'rotate(-1deg)',
              fontFamily: 'var(--font-main)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-center text-6xl fyo-animate-bounce">{selectedEmail.from.avatar}</div>
            <h3 id="fyo-email-title" className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text)]">
              {selectedEmail.subject}
            </h3>
            <p className="mt-2 text-[var(--text2)]">
              From: {letterFromNames[selectedEmail.from.name] || selectedEmail.from.name}
            </p>
            <div className="fyo-rainbow-bar mt-4 h-1.5 rounded-full opacity-80" />
            <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-[var(--text)]">{selectedEmail.body}</div>
            <div className="mt-8 flex justify-center">
              <button type="button" className="btn btn-primary rounded-full px-10 font-[family-name:var(--font-display)] text-lg font-bold" onClick={() => setSelectedEmail(null)}>
                OK I read it! 💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
