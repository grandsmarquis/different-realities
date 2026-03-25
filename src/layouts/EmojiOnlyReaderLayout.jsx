import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagGlyphs = {
  social: '💼🔍✨🧑‍💼',
  work: '📎⏰✅💬',
  finance: '💶🏦✅📬',
  dev: '🐙🔀💻🎉',
  personal: '👨‍👩‍👧🥔🍎💕',
  shopping: '📦🚪⌨️✨',
  travel: '✈️🗼🎫🌏',
  newsletter: '📺🍿🆕✨',
}

const stockGlyph = {
  AAPL: '🍎',
  NVDA: '🎮',
  BTC: '₿',
  CAC40: '🥖',
}

function tempVibe(c) {
  if (c <= 5) return '🥶❄️🧊'
  if (c <= 12) return '🧥🌬️😌'
  if (c <= 20) return '😊🌤️🧢'
  if (c <= 28) return '😎☀️🥤'
  return '🥵🔥🌡️'
}

function windStrength(kmh) {
  if (kmh < 8) return '💨'
  if (kmh < 20) return '💨💨'
  return '💨💨💨🪁'
}

function humidityDrops(pct) {
  if (pct < 40) return '💧'
  if (pct < 65) return '💧💧'
  return '💧💧💧🌫️'
}

function stockTrend(series, changePct) {
  if (!series?.length) return changePct >= 0 ? '📈' : '📉'
  const first = series[0]
  const last = series[series.length - 1]
  const up = last >= first
  const mag = Math.min(5, Math.ceil(Math.abs(changePct)))
  const arrow = up ? '📈' : '📉'
  return arrow.repeat(Math.max(1, mag))
}

function emailRowGlyphs(e) {
  const tag = tagGlyphs[e.tag] ?? '✉️❓✨'
  const unread = e.read ? '👁️' : '✨🆕✨'
  const star = e.starred ? '⭐' : ''
  return `${e.from.avatar}${unread}${star}${tag}`
}

function emailDetailGlyphs(e) {
  const tag = tagGlyphs[e.tag] ?? '📧✨'
  const mood = e.read ? '😌📖' : '🚨👀'
  const star = e.starred ? '💖⭐💖' : ''
  return `${e.from.avatar}\n${mood}\n${star}\n${tag}\n✉️➡️🌈➡️🙂`
}

function MiniSparkEmoji({ series }) {
  if (!series?.length) return <span className="text-2xl">💹</span>
  const step = Math.max(1, Math.floor(series.length / 8))
  const samples = []
  for (let i = 0; i < series.length; i += step) samples.push(series[i])
  if (samples[samples.length - 1] !== series[series.length - 1]) samples.push(series[series.length - 1])
  return (
    <span className="inline-flex flex-wrap justify-end gap-0.5 text-base md:text-lg" aria-hidden>
      {samples.map((v, i) => {
        if (i === 0) return <span key={i}>📍</span>
        const prev = samples[i - 1]
        if (v > prev) return <span key={i}>⬆️</span>
        if (v < prev) return <span key={i}>⬇️</span>
        return <span key={i}>➡️</span>
      })}
    </span>
  )
}

const floatEmojis = ['✨', '💫', '⭐', '🫧', '💭', '🎈', '🌀', '🌟']

export default function EmojiOnlyReaderLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="emoji-reader-root relative min-h-dvh overflow-x-hidden bg-gradient-to-b from-base-300 via-base-200 to-base-300 pb-28">
      <style>{`
        @keyframes emoji-reader-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.35; }
          50% { transform: translate(12px, -24px) rotate(8deg) scale(1.1); opacity: 0.85; }
        }
        @keyframes emoji-reader-orbit {
          from { transform: rotate(0deg) translateX(48px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(48px) rotate(-360deg); }
        }
        @keyframes emoji-reader-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.06); filter: brightness(1.15); }
        }
        @keyframes emoji-reader-wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes emoji-reader-rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .emoji-reader-float { animation: emoji-reader-float 7s ease-in-out infinite; }
        .emoji-reader-float-d1 { animation: emoji-reader-float 9s ease-in-out infinite; animation-delay: -2s; }
        .emoji-reader-float-d2 { animation: emoji-reader-float 11s ease-in-out infinite; animation-delay: -4s; }
        .emoji-reader-orbit { animation: emoji-reader-orbit 22s linear infinite; }
        .emoji-reader-pulse { animation: emoji-reader-pulse 2.2s ease-in-out infinite; }
        .emoji-reader-wiggle { animation: emoji-reader-wiggle 3s ease-in-out infinite; }
        .emoji-reader-hero { animation: emoji-reader-rainbow 14s linear infinite; }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(251,113,133,0.35),transparent),radial-gradient(ellipse_80%_60%_at_100%_50%,rgba(34,211,238,0.2),transparent),radial-gradient(ellipse_70%_50%_at_0%_80%,rgba(192,132,252,0.25),transparent)]" />
        {floatEmojis.map((ch, i) => (
          <span
            key={i}
            className={`absolute select-none text-2xl md:text-4xl ${i % 3 === 0 ? 'emoji-reader-float' : i % 3 === 1 ? 'emoji-reader-float-d1' : 'emoji-reader-float-d2'}`}
            style={{
              left: `${8 + (i * 11) % 84}%`,
              top: `${6 + (i * 17) % 70}%`,
            }}
          >
            {ch}
          </span>
        ))}
        <div className="absolute left-1/2 top-24 -translate-x-1/2 text-6xl opacity-40 md:text-8xl">
          <span className="emoji-reader-orbit inline-block">🛸</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-6 md:py-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="emoji-reader-hero emoji-reader-pulse select-none text-5xl md:text-7xl" title="Welcome glyph">
              🫥
            </span>
            <div>
              <p className="m-0 text-3xl leading-none md:text-5xl" aria-hidden>
                📬🌍📰💹
              </p>
              <p className="sr-only">
                Persona: you only read emoji. Inbox, weather, news, and stocks are shown as emoji below.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-lg gap-2 rounded-full border-2 border-secondary-content/20 shadow-lg shadow-secondary/20"
            onClick={onSwitchPersona}
            aria-label="Switch to another persona view"
          >
            <span className="text-2xl" aria-hidden>
              🔄
            </span>
            <span className="sr-only">Switch persona</span>
          </button>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="card border-0 bg-base-100/70 shadow-xl backdrop-blur-md">
            <div className="card-body items-center gap-4 p-6 text-center">
              <span className="sr-only">
                Weather in {weather.city}: {weather.condition}, {weather.temp} degrees Celsius, humidity {weather.humidity}
                percent, wind {weather.wind} kilometers per hour.
              </span>
              <p className="m-0 text-xs font-medium uppercase tracking-widest text-base-content/50" aria-hidden>
                🌐➡️🌤️
              </p>
              <div className="emoji-reader-wiggle text-7xl md:text-9xl">{weather.icon}</div>
              <p className="m-0 text-4xl md:text-5xl" aria-hidden>
                {tempVibe(weather.temp)}
              </p>
              <p className="m-0 text-2xl" aria-hidden>
                {windStrength(weather.wind)} {humidityDrops(weather.humidity)}
              </p>
              <div className="flex flex-wrap justify-center gap-2 border-t border-base-content/10 pt-4">
                {weather.forecast.map((d) => (
                  <div
                    key={d.day}
                    className="badge badge-lg gap-1 border-0 bg-primary/15 px-3 py-4 text-lg md:text-xl"
                    title={`${d.day}`}
                  >
                    <span aria-hidden>{d.icon}</span>
                    <span className="sr-only">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-0 bg-base-100/70 shadow-xl backdrop-blur-md">
            <div className="card-body gap-4 p-6">
              <span className="sr-only">
                Stock prices: {stocks.map((s) => `${s.name} ${s.changePct} percent`).join(', ')}
              </span>
              <p className="m-0 text-center text-xs font-medium uppercase tracking-widest text-base-content/50" aria-hidden>
                📊💹🎯
              </p>
              <ul className="space-y-3">
                {stocks.map((s) => {
                  const up = s.changePct >= 0
                  const glyph = stockGlyph[s.ticker] ?? '📎'
                  return (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-base-200/80 px-4 py-3"
                    >
                      <span className="flex items-center gap-2 text-3xl md:text-4xl" aria-hidden>
                        {glyph}
                        <span className={up ? 'text-success' : 'text-error'}>{stockTrend(s.series, s.changePct)}</span>
                      </span>
                      <MiniSparkEmoji series={s.series} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7" aria-label="Inbox as emoji">
            <h2 className="mb-4 flex items-center gap-2 text-4xl md:text-5xl">
              <span className="emoji-reader-pulse" aria-hidden>
                📥
              </span>
              <span className="sr-only">Inbox</span>
            </h2>
            <div className="space-y-3">
              {emails.map((e) => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`card w-full border-2 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      on ? 'border-primary bg-primary/10 shadow-lg scale-[1.01]' : 'border-base-content/10 bg-base-100/80 backdrop-blur-sm'
                    }`}
                    aria-label={`Email from ${e.from.name}: ${e.subject}`}
                  >
                    <div className="card-body gap-3 p-4 md:p-5">
                      <p className="m-0 break-all text-3xl leading-relaxed tracking-wide md:text-4xl" aria-hidden>
                        {emailRowGlyphs(e)}
                      </p>
                      {on && (
                        <div className="border-t border-base-content/15 pt-4">
                          <p className="m-0 whitespace-pre-line break-all text-4xl leading-snug md:text-5xl" aria-hidden>
                            {emailDetailGlyphs(e)}
                          </p>
                          <p className="sr-only">{e.body}</p>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="lg:col-span-5" aria-label="News as emoji">
            <h2 className="mb-4 text-4xl md:text-5xl">
              <span aria-hidden>📰🔔</span>
              <span className="sr-only">News</span>
            </h2>
            <ul className="space-y-4">
              {news.map((n, i) => (
                <li
                  key={n.id}
                  className="card border-0 bg-gradient-to-br from-secondary/20 to-accent/20 shadow-md backdrop-blur-sm"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="card-body flex-row items-center gap-4 p-4 md:p-5">
                    <span
                      className="emoji-reader-pulse select-none text-5xl md:text-6xl"
                      style={{ animationDelay: `${i * 0.3}s` }}
                      aria-hidden
                    >
                      {n.emoji}
                    </span>
                    <div className="min-w-0 flex-1 text-2xl md:text-3xl" aria-hidden>
                      {n.category === 'Sport' && '⚽🏟️🏆'}
                      {n.category === 'Tech' && '💡🤖🧠'}
                      {n.category === 'Climate' && '🌍🌡️🌊'}
                      {n.category === 'Culture' && '🎭🎪🍿'}
                      {n.category === 'Economy' && '🏭📦🚢'}
                      {!['Sport', 'Tech', 'Climate', 'Culture', 'Economy'].includes(n.category) && '✨📰🔊'}
                    </div>
                    <span className="sr-only">
                      {n.title}. Source {n.source}. {n.time}.
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <div className="rounded-full border-4 border-dashed border-accent/40 bg-base-100/50 px-8 py-6 text-center backdrop-blur-md">
                <p className="m-0 animate-bounce text-5xl md:text-6xl" aria-hidden>
                  🧠➡️😀
                </p>
                <p className="sr-only">No words, only feelings.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
