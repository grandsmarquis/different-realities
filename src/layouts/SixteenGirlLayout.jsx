import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const holoStroke = (pct) =>
  pct >= 0 ? 'linear-gradient(90deg, #34d399, #2dd4bf)' : 'linear-gradient(90deg, #f472b6, #c084fc)'

const STICKERS = [
  { emoji: '💅', top: '12%', left: '4%', delay: '0s', dur: '5.5s' },
  { emoji: '✨', top: '8%', right: '8%', delay: '0.4s', dur: '4.2s' },
  { emoji: '🎀', top: '38%', left: '2%', delay: '1.1s', dur: '6s' },
  { emoji: '💖', top: '52%', right: '3%', delay: '0.2s', dur: '5s' },
  { emoji: '⭐', top: '72%', left: '6%', delay: '1.6s', dur: '4.8s' },
  { emoji: '🦄', top: '18%', left: '48%', delay: '2s', dur: '7s' },
]

function FloatingStickers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {STICKERS.map((s, i) => (
        <span
          key={i}
          className="girl16-float-sticker absolute text-2xl opacity-90 drop-shadow-[0_2px_8px_rgba(236,72,153,0.35)] sm:text-3xl"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  )
}

function Butterfly({ className, style, gradId }) {
  const gid = gradId ?? 'girl16-bf-a'
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 32c-8-12-22-18-32-10-6 5-8 14-4 22 4 9 14 14 24 12 4-1 8-4 12-8 4 4 8 7 12 8 10 2 20-3 24-12 4-8 2-17-4-22-10-8-24-2-32 10z"
        fill={`url(#${gid})`}
        opacity="0.55"
      />
      <path d="M40 18v28" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="80" y2="64">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="50%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function WashiTape({ rotate = -2, color }) {
  return (
    <div
      className="pointer-events-none absolute -top-3 left-1/2 z-[2] h-7 w-24 -translate-x-1/2 rounded-sm opacity-90 shadow-sm"
      style={{
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        background: color ?? 'linear-gradient(90deg, #fce7f3, #fef3c7, #e0e7ff)',
        backgroundSize: '200% 100%',
      }}
      aria-hidden
    />
  )
}

function WeatherVibe() {
  return (
    <div className="girl16-card-bounce card relative overflow-hidden border-0 bg-base-100/80 shadow-xl backdrop-blur-md">
      <div
        className="girl16-sun-glow pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-40 blur-2xl"
        style={{ background: 'conic-gradient(from 180deg, #fde047, #fb923c, #f472b6, #a78bfa, #fde047)' }}
        aria-hidden
      />
      <WashiTape rotate={-3} />
      <div className="card-body relative z-[1] gap-4 pt-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60" style={{ fontFamily: 'var(--font-main)' }}>
              sky check
            </p>
            <h2 className="girl16-holo-text mt-1 text-2xl font-extrabold sm:text-3xl" style={{ fontFamily: 'var(--font-main)' }}>
              main character weather
            </h2>
          </div>
          <span className="girl16-icon-bounce text-5xl sm:text-6xl drop-shadow-lg">{weather.icon}</span>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <span className="text-5xl font-black tabular-nums sm:text-6xl" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
            {weather.temp}°
          </span>
          <span className="mb-2 text-sm font-medium opacity-80" style={{ fontFamily: 'var(--font-main)' }}>
            feels like {weather.feels_like}° · {weather.city}
          </span>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>
          {weather.condition} · no cap it&apos;s kinda giving today
        </p>
        <div className="flex flex-wrap gap-2">
          {weather.forecast.map((d) => (
            <div
              key={d.day}
              className="girl16-mini-pop rounded-2xl border border-base-content/10 bg-base-100/90 px-3 py-2 text-center shadow-md"
            >
              <div className="text-[10px] font-bold uppercase opacity-50">{d.day}</div>
              <div className="text-xl leading-none">{d.icon}</div>
              <div className="text-xs font-bold tabular-nums">{d.high}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StockGlitterCard({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div
      className="girl16-card-bounce group relative overflow-hidden rounded-3xl border-2 border-white/80 p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: up
          ? 'linear-gradient(155deg, rgba(255,255,255,0.95) 0%, rgba(209,250,229,0.5) 100%)'
          : 'linear-gradient(155deg, rgba(255,255,255,0.95) 0%, rgba(250,232,255,0.55) 100%)',
        boxShadow: up ? '0 0 0 1px rgba(52,211,153,0.35), 0 12px 32px rgba(167,139,250,0.2)' : '0 0 0 1px rgba(244,114,182,0.35), 0 12px 32px rgba(244,114,182,0.15)',
      }}
    >
      <div
        className="girl16-shimmer-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="text-lg font-black tracking-tight" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
            {s.ticker}
          </p>
          <p className="text-[10px] font-medium opacity-60 line-clamp-1">{s.name}</p>
        </div>
        <span className="text-xl">{up ? '💚' : '💔'}</span>
      </div>
      <p className="relative mt-1 font-bold tabular-nums" style={{ fontFamily: 'var(--font-main)', fontSize: '0.95rem' }}>
        <span
          style={{
            backgroundImage: holoStroke(s.changePct),
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {s.currency}
          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
        <span className={`ml-1 text-sm ${up ? 'text-success' : 'text-secondary'}`}>
          {up ? '▲' : '▼'}
          {Math.abs(s.changePct).toFixed(2)}%
        </span>
      </p>
      <div className="relative mt-2" style={{ height: 48 }}>
        <ResponsiveContainer width="100%" height={48} debounce={50}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={up ? '#34d399' : '#e879f9'}
              strokeWidth={2.5}
              dot={false}
              isAnimationActive
              animationDuration={800}
            />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                borderRadius: 16,
                border: '2px solid #f9a8d4',
                fontFamily: 'var(--font-main)',
                fontSize: 12,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function TeaNote({ item, index }) {
  const tilt = ((item.id % 5) - 2) * 1.2
  return (
    <div
      className="girl16-card-bounce relative rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/95 via-rose-50/90 to-violet-50/95 p-4 shadow-md"
      style={{
        transform: `rotate(${tilt}deg)`,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <WashiTape rotate={2} color="linear-gradient(90deg, #fbcfe8, #ddd6fe)" />
      <div className="pt-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="badge badge-sm border-0 font-bold text-base-100" style={{ background: 'linear-gradient(90deg, #e879f9, #8b5cf6)' }}>
            {item.category}
          </span>
          <span className="text-[10px] font-semibold opacity-50">{item.source} · {item.time}</span>
        </div>
        <p className="flex gap-2 text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
          <span className="text-xl shrink-0">{item.emoji}</span>
          <span>{item.title}</span>
        </p>
      </div>
    </div>
  )
}

function PolaroidMail({ email, onOpen }) {
  const tilt = ((email.id % 7) - 3) * 1.8
  return (
    <button
      type="button"
      onClick={() => onOpen(email)}
      className="girl16-polaroid group relative w-full cursor-pointer border-0 bg-transparent p-0 text-left font-inherit transition-transform duration-300 hover:z-10 hover:scale-[1.03]"
      style={{
        transform: `rotate(${tilt}deg)`,
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="overflow-hidden rounded-lg pb-10 pt-3 shadow-xl ring-4 ring-white transition-shadow group-hover:shadow-2xl"
        style={{
          background: 'var(--card)',
          boxShadow: '0 12px 0 rgba(167, 139, 250, 0.25), 0 20px 40px rgba(236, 72, 153, 0.15)',
          color: 'var(--text)',
        }}
      >
        <div className="mx-3 flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-fuchsia-100 via-violet-100 to-cyan-100 text-6xl shadow-inner transition-transform duration-500 group-hover:scale-105">
          {email.from.avatar}
        </div>
        <div className="px-4 pt-3" style={{ color: 'var(--text)' }}>
          <p
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: 'var(--text2)' }}
          >
            {email.from.name}
          </p>
          <p
            className="mt-1 line-clamp-2 text-sm font-bold leading-tight"
            style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}
          >
            {email.subject}
          </p>
          {!email.read && (
            <span className="badge badge-primary badge-sm mt-2 border-0 font-bold text-primary-content">NEW ✨</span>
          )}
        </div>
      </div>
      <span
        className="pointer-events-none absolute -right-1 -top-2 rotate-12 text-2xl opacity-90 transition-transform group-hover:scale-110"
        aria-hidden
      >
        💋
      </span>
    </button>
  )
}

function MailModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(88, 28, 135, 0.35)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="girl16-modal-pop relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border-4 border-white p-8 shadow-2xl"
        style={{
          background: 'linear-gradient(165deg, #fff 0%, #fdf4ff 40%, #ecfeff 100%)',
          boxShadow: '0 0 0 6px rgba(232, 121, 249, 0.25), 0 32px 64px rgba(139, 92, 246, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="girl16-mail-title"
      >
        <WashiTape rotate={-4} />
        <button
          type="button"
          onClick={onClose}
          className="btn btn-circle btn-sm absolute right-4 top-4 border-0 bg-gradient-to-br from-fuchsia-400 to-violet-500 text-white shadow-lg"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="pt-6 text-center text-sm font-bold tracking-widest opacity-50" style={{ fontFamily: 'var(--font-main)' }}>
          inbox moment
        </p>
        <h2 id="girl16-mail-title" className="mt-2 text-center text-xl font-extrabold sm:text-2xl" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
          {email.subject}
        </h2>
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-base-200/50 p-4">
          <span className="text-4xl">{email.from.avatar}</span>
          <div>
            <p className="font-bold" style={{ fontFamily: 'var(--font-main)' }}>{email.from.name}</p>
            <p className="text-xs opacity-60">{email.from.email}</p>
            <p className="text-xs opacity-50">{email.date} · {email.time}</p>
          </div>
        </div>
        <div className="mt-6 whitespace-pre-line text-sm leading-relaxed" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
          {email.body}
        </div>
        <p className="mt-8 text-center text-2xl" aria-hidden>
          🦋 ✨ 🦋
        </p>
      </div>
    </div>
  )
}

export default function SixteenGirlLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="girl16-page relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 120% 80% at 10% 0%, rgba(249, 168, 212, 0.35), transparent 50%),
          radial-gradient(ellipse 90% 60% at 100% 20%, rgba(167, 139, 250, 0.28), transparent 45%),
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(125, 211, 252, 0.22), transparent 40%),
          linear-gradient(180deg, #fff5fb 0%, #f5f3ff 35%, #ecfeff 100%)
        `,
      }}
    >
      <div
        className="girl16-mesh pointer-events-none fixed inset-0 z-0 opacity-[0.45]"
        aria-hidden
      />
      <FloatingStickers />
      <Butterfly gradId="girl16-bf-1" className="girl16-butterfly pointer-events-none fixed left-[8%] top-[28%] z-[1] w-16 opacity-70 sm:w-24" />
      <Butterfly
        gradId="girl16-bf-2"
        className="girl16-butterfly-alt pointer-events-none fixed right-[10%] top-[55%] z-[1] w-14 opacity-50 sm:w-20"
        style={{ transform: 'scaleX(-1)' }}
      />

      <header className="relative z-10 px-4 pb-2 pt-6 sm:px-8 sm:pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-sm font-bold tracking-[0.25em] sm:text-base"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}
            >
              hiiii bestie ~
            </p>
            <h1 className="girl16-holo-text mt-1 text-4xl font-black leading-tight sm:text-6xl" style={{ fontFamily: 'var(--font-main)' }}>
              ur locker screen
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium opacity-80" style={{ fontFamily: 'var(--font-main)' }}>
              <span className="badge badge-secondary badge-lg gap-1 border-0 font-bold text-secondary-content">
                💌 {unread} unread
              </span>
              <span>same data, different slay · emails · weather · tea · stonks</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-lg rounded-full border-0 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:brightness-110"
            style={{ fontFamily: 'var(--font-main)' }}
          >
            switch the vibe
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-5">
            <WeatherVibe />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-black" style={{ fontFamily: 'var(--font-main)' }}>
                <span className="girl16-icon-bounce text-2xl">📈</span>
                <span className="girl16-holo-text">money mood board</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {stocks.map((s) => (
                  <StockGlitterCard key={s.ticker} s={s} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-black" style={{ fontFamily: 'var(--font-main)' }}>
                <span className="girl16-icon-bounce text-2xl">🫖</span>
                <span>the tea (news)</span>
              </h3>
              <div className="space-y-4">
                {news.map((n, i) => (
                  <TeaNote key={n.id} item={n} index={i} />
                ))}
              </div>
            </div>
          </section>

          <section className="lg:col-span-7">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-black" style={{ fontFamily: 'var(--font-main)' }}>
              <span className="girl16-icon-bounce text-2xl">📸</span>
              <span>polaroid inbox (tap to open)</span>
            </h3>
            <div className="columns-1 gap-6 sm:columns-2">
              {emails.map((email) => (
                <div key={email.id} className="mb-6 break-inside-avoid">
                  <PolaroidMail email={email} onOpen={setSelectedEmail} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <MailModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
