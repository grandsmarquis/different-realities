import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import './FourYearOldBoyLayout.css'

const grownUpNames = {
  LinkedIn: 'Jobs computer',
  'Julien Moreau': 'Julien (he has a job)',
  'BNP Paribas': 'Bank people',
  GitHub: 'Octopus code place',
  'Maman 💕': 'MOMMY',
  Amazon: 'Box truck website',
  'Air France': 'BIG PLANE mail',
  Netflix: 'Cartoons TV',
}

const blockPalette = ['#e63946', '#2a9d8f', '#e9c46a', '#264653', '#f4a261', '#8338ec']
const cardTilts = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '2.5deg', '-2.5deg', '1deg']

const toyFloaters = [
  { emoji: '🦖', top: '8%', left: '4%', className: 'fyo-bob' },
  { emoji: '🚂', top: '14%', right: '6%', className: 'fyo-bob-delay' },
  { emoji: '🚀', top: '42%', left: '2%', className: 'fyo-bob' },
  { emoji: '⚽', top: '38%', right: '4%', className: 'fyo-bob-delay' },
  { emoji: '🧱', top: '68%', left: '8%', className: 'fyo-bob-delay' },
  { emoji: '🎨', top: '72%', right: '10%', className: 'fyo-bob' },
]

function LegoTitle({ children, color }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div
        className="fyo-lego-stud flex items-center gap-1 rounded-xl border-b-4 px-4 py-2"
        style={{
          background: color,
          borderColor: 'color-mix(in srgb, black 22%, transparent)',
          color: '#fff',
          textShadow: '0 1px 0 rgba(0,0,0,0.2)',
        }}
      >
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block size-3 rounded-full bg-white/35"
              style={{ boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15)' }}
            />
          ))}
        </span>
      </div>
      <h2
        className="m-0 text-2xl leading-tight sm:text-3xl"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
      >
        {children}
      </h2>
    </div>
  )
}

function SunBadge() {
  return (
    <div className="pointer-events-none absolute -right-6 -top-6 size-28 sm:-right-4 sm:-top-4 sm:size-32" aria-hidden>
      <svg className="fyo-sun-rays size-full text-[var(--accent3)]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.95" />
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="47"
            y="4"
            width="6"
            height="14"
            rx="2"
            fill="currentColor"
            opacity="0.85"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </svg>
    </div>
  )
}

function TrainRow() {
  const car = (fill, windowColor) => (
    <g>
      <rect x="0" y="8" width="56" height="36" rx="6" fill={fill} stroke="#2d3436" strokeWidth="2" />
      <rect x="8" y="14" width="14" height="12" rx="2" fill={windowColor} />
      <rect x="28" y="14" width="14" height="12" rx="2" fill={windowColor} />
      <circle cx="14" cy="48" r="8" fill="#2d3436" />
      <circle cx="42" cy="48" r="8" fill="#2d3436" />
    </g>
  )
  const segment = (
    <svg width="200" height="56" viewBox="0 0 200 56" className="shrink-0" aria-hidden>
      <g transform="translate(4,0)">
        <rect x="0" y="18" width="44" height="28" rx="4" fill="#e63946" stroke="#2d3436" strokeWidth="2" />
        <polygon points="44,22 58,32 44,42" fill="#2d3436" />
        <rect x="8" y="24" width="12" height="10" rx="1" fill="#ffeaa7" />
        <circle cx="12" cy="50" r="7" fill="#2d3436" />
        <circle cx="32" cy="50" r="7" fill="#2d3436" />
      </g>
      <g transform="translate(64,0)">{car('#457b9d', '#a8dadc')}</g>
      <g transform="translate(124,0)">{car('#2a9d8f', '#e9f5db')}</g>
    </svg>
  )
  const chain = (
    <div className="flex shrink-0">
      {segment}
      {segment}
      {segment}
    </div>
  )
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[2] overflow-hidden border-t-4 border-[#2d3436] bg-[#dfe6e9]/95 py-2 backdrop-blur-sm" aria-hidden>
      <div className="flex w-max fyo-train-track">
        {chain}
        {chain}
      </div>
    </div>
  )
}

function StockTower({ stock, color, tilt }) {
  const series = stock.series || []
  const min = Math.min(...series)
  const max = Math.max(...series)
  const span = max - min || 1
  const h = 28 + ((series[series.length - 1] - min) / span) * 72
  const up = stock.changePct >= 0
  return (
    <div className="flex flex-col items-center gap-2" style={{ transform: `rotate(${tilt})` }}>
      <span className="text-2xl" aria-hidden>
        {stock.ticker === 'AAPL' ? '🍎' : stock.ticker === 'NVDA' ? '🎮' : stock.ticker === 'BTC' ? '🪙' : '🗼'}
      </span>
      <div className="relative flex flex-col-reverse items-center">
        <div
          className="fyo-lego-stud w-14 rounded-lg border-b-4 transition-[height] duration-500"
          style={{
            height: `${h}px`,
            background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 75%, white))`,
            borderColor: 'color-mix(in srgb, black 25%, transparent)',
          }}
        >
          <div className="flex justify-center gap-1 pt-1">
            <span className="size-2.5 rounded-full bg-white/40" />
            <span className="size-2.5 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
      <p className="m-0 text-center text-xs font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
        {stock.ticker}
      </p>
      <span className={`badge badge-sm font-bold ${up ? 'badge-success' : 'badge-error'}`}>
        {up ? '↑' : '↓'} {Math.abs(stock.changePct).toFixed(1)}%
      </span>
    </div>
  )
}

export default function FourYearOldBoyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        backgroundColor: 'var(--bg)',
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5) 0%, transparent 45%),
          radial-gradient(circle at 80% 20%, rgba(253,203,110,0.35) 0%, transparent 40%),
          linear-gradient(180deg, var(--bg) 0%, var(--bg2) 55%, #c8e6c9 100%)
        `,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.14] fyo-rug"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #2d3436 0, #2d3436 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(0deg, #2d3436 0, #2d3436 1px, transparent 1px, transparent 24px)
          `,
          backgroundSize: '48px 48px, 48px 48px',
        }}
        aria-hidden
      />

      {toyFloaters.map((t, i) => (
        <span
          key={i}
          className={`pointer-events-none fixed z-[1] select-none text-3xl sm:text-4xl ${t.className}`}
          style={{
            top: t.top,
            left: t.left,
            right: t.right,
          }}
          aria-hidden
        >
          {t.emoji}
        </span>
      ))}

      <TrainRow />

      <div className="relative z-[3] mx-auto max-w-3xl px-4 pt-6 sm:px-6 sm:pt-10">
        <header className="relative mb-10 text-center">
          <p className="fyo-wiggle-soft m-0 inline-block rounded-full bg-[var(--accent2)] px-4 py-1 text-sm font-bold text-white shadow-md">
            I am FOUR!!! 🎂
          </p>
          <h1
            className="mt-3 mb-2 text-4xl leading-none sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--accent)',
              textShadow: '4px 4px 0 var(--accent3), 8px 8px 0 rgba(9,132,227,0.25)',
            }}
          >
            MY SUPER SCREEN
          </h1>
          <p className="m-0 text-base font-semibold" style={{ color: 'var(--text2)' }}>
            {unread === 0 ? 'No new secret letters right now!' : `${unread} NEW letter${unread > 1 ? 's' : ''}!!! WOW!!!`}
          </p>
          <button type="button" className="btn btn-primary btn-sm mt-4 rounded-full border-0 shadow-lg" onClick={onSwitchPersona}>
            Switch to a different person
          </button>
        </header>

        {/* Weather — playground */}
        <section className="relative mb-12">
          <LegoTitle color="var(--accent2)">Outside today</LegoTitle>
          <div
            className="relative overflow-hidden rounded-[2rem] border-4 border-[var(--border)] bg-[var(--card)] p-6 shadow-xl"
            style={{ boxShadow: '8px 8px 0 rgba(9,132,227,0.35)' }}
          >
            <SunBadge />
            <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
              <div className="fyo-bob text-7xl sm:text-8xl">{weather.icon}</div>
              <div className="text-center sm:text-left">
                <p className="m-0 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.temp}° in {weather.city}
                </p>
                <p className="mt-1 text-lg font-semibold" style={{ color: 'var(--text2)' }}>
                  {weather.condition} · wind goes whoosh ({weather.wind} km/h)
                </p>
                <p className="mt-2 text-sm font-bold text-[var(--accent)]">
                  {weather.temp >= 16 ? 'Good for the playground!!!' : 'Wear a coat like a superhero cape!'}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {weather.forecast.map((d, i) => (
                <div
                  key={d.day}
                  className="fyo-star-twinkle rounded-2xl border-2 border-dashed border-[var(--accent3)] bg-base-200 px-3 py-2 text-center"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <span className="text-2xl leading-none">{d.icon}</span>
                  <p className="m-0 text-xs font-bold">{d.day}</p>
                  <p className="m-0 text-[10px] opacity-80">
                    {d.high}° / {d.low}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emails */}
        <section className="mb-12">
          <LegoTitle color="var(--accent)">Letters in my mailbox</LegoTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {emails.map((email, i) => {
              const c = blockPalette[i % blockPalette.length]
              const tilt = cardTilts[i % cardTilts.length]
              const who = grownUpNames[email.from.name] || email.from.name
              return (
                <button
                  key={email.id}
                  type="button"
                  className="fyo-card-lift relative w-full cursor-pointer rounded-3xl border-4 border-[var(--text)] bg-[var(--card)] p-4 text-left shadow-lg"
                  style={{
                    transform: `rotate(${tilt})`,
                    boxShadow: `6px 6px 0 ${c}`,
                  }}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="absolute -right-1 -top-1 rotate-12 rounded border-2 border-dashed border-[var(--text2)] bg-[var(--accent3)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--text)]">
                    STAMP
                  </div>
                  <div className="text-center text-4xl">{email.from.avatar}</div>
                  <p className="m-0 mt-2 text-center text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: c }}>
                    {who}
                  </p>
                  <p className="m-0 mt-1 line-clamp-2 text-sm font-semibold">{email.subject}</p>
                  {!email.read && (
                    <span className="badge badge-warning badge-sm mt-2 font-bold">NEW!!!</span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Stocks */}
        <section className="mb-12">
          <LegoTitle color="#6c5ce7">Money LEGO towers</LegoTitle>
          <p className="-mt-2 mb-4 text-sm font-semibold" style={{ color: 'var(--text2)' }}>
            (I stacked blocks taller = number went more)
          </p>
          <div className="flex flex-wrap items-end justify-center gap-8 rounded-[2rem] border-4 border-dashed border-[#6c5ce7]/50 bg-white/80 p-8 backdrop-blur-sm">
            {stocks.map((s, i) => (
              <StockTower key={s.ticker} stock={s} color={blockPalette[i % blockPalette.length]} tilt={cardTilts[(i + 3) % cardTilts.length]} />
            ))}
          </div>
        </section>

        {/* News */}
        <section className="mb-8">
          <LegoTitle color="#e63946">Stuff grown-ups talk about</LegoTitle>
          <div className="flex flex-col gap-4">
            {news.slice(0, 5).map((n, i) => (
              <div
                key={n.id}
                className="relative overflow-hidden rounded-2xl border-4 border-[var(--text)] bg-[var(--card)] p-4 shadow-md"
                style={{
                  transform: `rotate(${cardTilts[(i + 5) % cardTilts.length]})`,
                  boxShadow: `4px 4px 0 ${blockPalette[(i + 2) % blockPalette.length]}`,
                }}
              >
                <div
                  className="absolute -right-8 -top-8 size-24 rounded-full opacity-20"
                  style={{ background: blockPalette[i % blockPalette.length] }}
                  aria-hidden
                />
                <div className="relative flex gap-3">
                  <span className="text-4xl fyo-bob" style={{ animationDelay: `${i * 0.2}s` }}>
                    {n.emoji}
                  </span>
                  <div>
                    <p className="m-0 text-xs font-bold uppercase tracking-wider opacity-60">{n.source}</p>
                    <p className="m-0 mt-1 text-base font-bold leading-snug sm:text-lg">{n.title}</p>
                    <p className="m-0 mt-2 text-xs font-semibold text-[var(--accent)]">({n.time} — sounds important)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="pb-4 text-center text-sm font-bold" style={{ color: 'var(--text2)' }}>
          The end. Can I have a snack now?
        </p>
      </div>

      {selectedEmail && (
        <dialog className="modal modal-open z-[200]" aria-modal="true">
          <div
            className="modal-box max-h-[min(85dvh,560px)] w-full max-w-lg overflow-y-auto rounded-[2rem] border-4 border-[var(--accent)] bg-[var(--card)] p-6 shadow-2xl"
            style={{ boxShadow: '12px 12px 0 var(--accent3)' }}
          >
            <div className="text-center text-6xl">{selectedEmail.from.avatar}</div>
            <h3 className="mt-2 text-center text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              {selectedEmail.subject}
            </h3>
            <p className="text-center text-sm font-semibold" style={{ color: 'var(--text2)' }}>
              From: {grownUpNames[selectedEmail.from.name] || selectedEmail.from.name}
            </p>
            <div className="mt-4 whitespace-pre-line text-base leading-relaxed">{selectedEmail.body}</div>
            <div className="modal-action mt-6 justify-center">
              <button type="button" className="btn btn-accent btn-wide rounded-full font-bold" onClick={() => setSelectedEmail(null)}>
                OK I READ IT!!!
              </button>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop bg-neutral/50"
            aria-label="Close letter"
            onClick={() => setSelectedEmail(null)}
          />
        </dialog>
      )}
    </div>
  )
}
