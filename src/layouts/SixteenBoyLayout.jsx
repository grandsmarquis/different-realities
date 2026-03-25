import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const FLOATERS = [
  { emoji: '🎮', top: '10%', left: '5%', delay: '0s', dur: '4.2s' },
  { emoji: '🛹', top: '14%', right: '6%', delay: '0.3s', dur: '5.1s' },
  { emoji: '⚡', top: '42%', left: '3%', delay: '0.8s', dur: '3.8s' },
  { emoji: '🍕', top: '58%', right: '4%', delay: '0.1s', dur: '4.6s' },
  { emoji: '🚀', top: '78%', left: '8%', delay: '1.2s', dur: '5.4s' },
  { emoji: '💀', top: '22%', left: '46%', delay: '1.5s', dur: '6s' },
]

function FloatingDecals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="boy16-float-deco absolute text-2xl opacity-85 drop-shadow-[0_0_12px_rgba(57,255,20,0.45)] sm:text-3xl"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            animationDelay: f.delay,
            animationDuration: f.dur,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  )
}

function CrosshairCorners({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8 20V8h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="text-[var(--accent3)]" />
      <path d="M80 8h12v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="text-[var(--accent3)]" />
      <path d="M8 80v12h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="text-[var(--accent3)]" />
      <path d="M80 92h12V80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="text-[var(--accent3)]" />
    </svg>
  )
}

function GamepadSilhouette({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="4" y="18" width="112" height="46" rx="14" fill="url(#boy16-pad)" opacity="0.35" />
      <circle cx="32" cy="41" r="8" stroke="var(--accent2)" strokeWidth="2" opacity="0.6" />
      <circle cx="88" cy="41" r="6" fill="var(--accent)" opacity="0.5" />
      <circle cx="102" cy="41" r="6" fill="var(--accent3)" opacity="0.45" />
      <defs>
        <linearGradient id="boy16-pad" x1="4" y1="18" x2="116" y2="64">
          <stop stopColor="#ff2d95" />
          <stop offset="1" stopColor="#00f0ff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function WeatherHUD() {
  const tempPct = Math.min(100, Math.max(0, ((weather.temp + 5) / 45) * 100))
  return (
    <div className="boy16-card-slam card relative overflow-hidden border-2 border-[var(--border)] bg-[var(--card)] shadow-[0_0_40px_rgba(57,255,20,0.12)] backdrop-blur-md">
      <div className="boy16-scanlines pointer-events-none absolute inset-0 z-[2] opacity-[0.06]" aria-hidden />
      <CrosshairCorners className="pointer-events-none absolute left-2 top-2 z-[3] size-14 opacity-70" />
      <div className="boy16-grid-glow pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--accent3)' }} aria-hidden />
      <div className="card-body relative z-[4] gap-4 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.35em] opacity-70"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
            >
              world lobby
            </p>
            <h2 className="boy16-neon-title mt-1 text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              SKY STATUS
            </h2>
          </div>
          <span className="boy16-icon-wiggle text-5xl sm:text-6xl drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">{weather.icon}</span>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-end gap-2">
            <span className="text-5xl font-bold tabular-nums sm:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              {weather.temp}°
            </span>
            <span className="mb-2 text-sm font-semibold opacity-80" style={{ fontFamily: 'var(--font-main)' }}>
              feels {weather.feels_like}° · {weather.city}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full border border-[var(--border)] bg-base-300/40">
            <div
              className="boy16-xp-bar h-full rounded-full"
              style={{
                width: `${tempPct}%`,
                background: 'linear-gradient(90deg, var(--accent2), var(--accent3), var(--accent))',
                boxShadow: '0 0 12px rgba(57,255,20,0.6)',
              }}
            />
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>
            {weather.condition} · IRL graphics looking decent today
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {weather.forecast.map((d) => (
            <div
              key={d.day}
              className="boy16-forecast-pop rounded-lg border border-[var(--border)] bg-base-300/30 px-2.5 py-2 text-center"
            >
              <div className="text-[9px] font-bold uppercase tracking-wider opacity-50" style={{ fontFamily: 'var(--font-display)' }}>
                {d.day}
              </div>
              <div className="text-lg leading-none">{d.icon}</div>
              <div className="text-xs font-bold tabular-nums" style={{ fontFamily: 'var(--font-main)' }}>
                {d.high}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StockRunCard({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div
      className="boy16-card-slam group relative overflow-hidden rounded-xl border-2 p-3 transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(255,45,149,0.25)]"
      style={{
        borderColor: up ? 'rgba(57, 255, 20, 0.5)' : 'rgba(255, 45, 149, 0.45)',
        background: 'linear-gradient(160deg, rgba(12,11,20,0.95) 0%, rgba(20,18,32,0.9) 100%)',
        boxShadow: up ? 'inset 0 0 24px rgba(0,240,255,0.06)' : 'inset 0 0 24px rgba(255,45,149,0.08)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 boy16-stonk-shine"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
            {s.ticker}
          </p>
          <p className="line-clamp-1 text-[10px] font-semibold opacity-55" style={{ fontFamily: 'var(--font-main)' }}>
            {s.name}
          </p>
        </div>
        <span className="text-xl">{up ? '🔥' : '📉'}</span>
      </div>
      <p className="relative mt-1 font-bold tabular-nums" style={{ fontFamily: 'var(--font-main)', fontSize: '0.95rem', color: 'var(--text)' }}>
        <span style={{ color: up ? 'var(--accent)' : 'var(--accent2)' }}>
          {s.currency}
          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
        <span className={`ml-1 text-sm ${up ? 'text-success' : 'text-error'}`}>
          {up ? '▲' : '▼'}
          {Math.abs(s.changePct).toFixed(2)}%
        </span>
      </p>
      <div className="relative mt-2" style={{ height: 44 }}>
        <ResponsiveContainer width="100%" height={44} debounce={50}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={up ? '#39ff14' : '#ff2d95'}
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={700}
            />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                borderRadius: 8,
                border: '2px solid #00f0ff',
                background: '#0c0b12',
                fontFamily: 'var(--font-main)',
                fontSize: 12,
                color: '#e8f4ff',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function QuestNewsCard({ item, index }) {
  const skew = ((item.id % 5) - 2) * 0.8
  return (
    <div
      className="boy16-card-slam relative overflow-hidden rounded-xl border-2 border-[var(--border)] bg-gradient-to-br from-[#12101c]/95 via-[#1a1530]/90 to-[#0a0910]/95 p-4 shadow-lg"
      style={{
        transform: `rotate(${skew}deg)`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div className="pointer-events-none absolute right-0 top-0 size-16 bg-gradient-to-bl from-[var(--accent2)]/20 to-transparent" aria-hidden />
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className="badge badge-sm border-0 font-bold uppercase tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(90deg, var(--accent2), var(--accent3))',
            color: '#07060a',
          }}
        >
          {item.category}
        </span>
        <span className="text-[10px] font-semibold opacity-45" style={{ fontFamily: 'var(--font-main)' }}>
          {item.source} · {item.time}
        </span>
      </div>
      <p className="flex gap-2 text-sm font-bold leading-snug" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
        <span className="text-xl shrink-0">{item.emoji}</span>
        <span>{item.title}</span>
      </p>
    </div>
  )
}

function SaveSlotMail({ email, onOpen }) {
  const slot = (email.id % 4) + 1
  const hue = email.read ? 'opacity-75' : ''
  return (
    <button
      type="button"
      onClick={() => onOpen(email)}
      className={`boy16-cartridge group relative w-full cursor-pointer border-0 bg-transparent p-0 text-left font-inherit transition-all duration-200 hover:z-10 hover:scale-[1.02] ${hue}`}
      style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}
    >
      <div
        className="relative overflow-hidden rounded-xl border-2 border-[var(--border)] shadow-[0_8px_0_rgba(0,240,255,0.15),0_16px_40px_rgba(0,0,0,0.45)] transition-shadow group-hover:border-[var(--accent)] group-hover:shadow-[0_0_24px_rgba(57,255,20,0.25)]"
        style={{ background: 'var(--card)' }}
      >
        <div
          className="flex items-stretch gap-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,45,149,0.12) 0%, transparent 40%)',
          }}
        >
          <div
            className="flex w-12 shrink-0 flex-col items-center justify-center border-r-2 border-[var(--border)] bg-base-300/40 py-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[10px] font-bold text-[var(--accent3)]">SAVE</span>
            <span className="text-xl font-black leading-none text-[var(--accent)]">{slot}</span>
          </div>
          <div className="min-w-0 flex-1 p-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">{email.from.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold uppercase tracking-wider text-[var(--accent3)]">{email.from.name}</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-tight">{email.subject}</p>
              </div>
            </div>
            {!email.read && (
              <span
                className="badge badge-sm mt-2 border-0 font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: 'var(--accent2)',
                  color: '#07060a',
                }}
              >
                NEW DROP
              </span>
            )}
          </div>
        </div>
        <div
          className="h-2 w-full"
          style={{
            background: 'repeating-linear-gradient(90deg, var(--accent3) 0, var(--accent3) 4px, transparent 4px, transparent 8px)',
            opacity: 0.35,
          }}
          aria-hidden
        />
      </div>
    </button>
  )
}

function MailModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4, 2, 12, 0.82)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="boy16-modal-burst relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 p-6 shadow-2xl sm:p-8"
        style={{
          borderColor: 'var(--accent3)',
          background: 'linear-gradient(175deg, #12101c 0%, #0c0b12 50%, #1a1028 100%)',
          boxShadow: '0 0 0 1px rgba(57,255,20,0.2), 0 24px 80px rgba(0,0,0,0.65)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="boy16-mail-title"
      >
        <CrosshairCorners className="pointer-events-none absolute left-3 top-3 size-12 opacity-60" />
        <button
          type="button"
          onClick={onClose}
          className="btn btn-circle btn-sm absolute right-3 top-3 border-2 border-[var(--accent3)] bg-base-300 font-bold text-[var(--accent3)] hover:bg-[var(--accent3)] hover:text-base-100"
          aria-label="Close"
        >
          ✕
        </button>
        <p
          className="pt-4 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          message unlocked
        </p>
        <h2
          id="boy16-mail-title"
          className="boy16-neon-title mt-2 text-center text-lg font-bold sm:text-xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {email.subject}
        </h2>
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-base-300/30 p-4">
          <span className="text-4xl">{email.from.avatar}</span>
          <div>
            <p className="font-bold" style={{ fontFamily: 'var(--font-main)' }}>
              {email.from.name}
            </p>
            <p className="text-xs opacity-60">{email.from.email}</p>
            <p className="text-xs opacity-45">
              {email.date} · {email.time}
            </p>
          </div>
        </div>
        <div className="mt-6 whitespace-pre-line text-sm font-medium leading-relaxed" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
          {email.body}
        </div>
        <p className="mt-8 text-center text-xl" aria-hidden>
          🎮 ⚡ 🎮
        </p>
      </div>
    </div>
  )
}

export default function SixteenBoyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="boy16-page relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 100% 60% at 50% -10%, rgba(255, 45, 149, 0.18), transparent 50%),
          radial-gradient(ellipse 80% 50% at 100% 60%, rgba(0, 240, 255, 0.12), transparent 45%),
          radial-gradient(ellipse 60% 40% at 0% 80%, rgba(57, 255, 20, 0.1), transparent 40%),
          linear-gradient(180deg, #0a0812 0%, #07060a 45%, #0d0a14 100%)
        `,
      }}
    >
      <div className="boy16-bg-grid pointer-events-none fixed inset-0 z-0 opacity-[0.35]" aria-hidden />
      <div className="boy16-vignette pointer-events-none fixed inset-0 z-0" aria-hidden />
      <FloatingDecals />
      <GamepadSilhouette className="boy16-pad-drift pointer-events-none fixed -right-4 bottom-[18%] z-[1] w-40 opacity-40 sm:w-52" />
      <div
        className="pointer-events-none fixed -left-8 top-[32%] z-[1] w-32 opacity-25 sm:w-40"
        style={{ transform: 'scaleX(-1) rotate(-8deg)' }}
        aria-hidden
      >
        <GamepadSilhouette className="boy16-pad-drift-alt w-full" />
      </div>

      <header className="relative z-10 px-4 pb-2 pt-6 sm:px-8 sm:pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.45em] sm:text-sm"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}
            >
              player_16 · online
            </p>
            <h1 className="boy16-neon-title mt-1 text-3xl font-black leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
              BASEMENT DASHBOARD
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold opacity-85" style={{ fontFamily: 'var(--font-main)' }}>
              <span
                className="badge badge-lg gap-1 border-2 font-bold"
                style={{
                  borderColor: 'var(--accent)',
                  background: 'rgba(57,255,20,0.12)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                📬 {unread} unread
              </span>
              <span>same data · different build · mail · sky · quests · stonks</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-lg border-2 font-bold uppercase tracking-wide"
            style={{
              fontFamily: 'var(--font-display)',
              borderColor: 'var(--accent2)',
              background: 'linear-gradient(135deg, rgba(255,45,149,0.25), rgba(0,240,255,0.2))',
              color: 'var(--text)',
              boxShadow: '0 0 24px rgba(255,45,149,0.25)',
            }}
          >
            change character
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-5">
            <WeatherHUD />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold uppercase sm:text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                <span className="boy16-icon-wiggle text-2xl">💎</span>
                <span>stonk speedrun</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {stocks.map((s) => (
                  <StockRunCard key={s.ticker} s={s} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold uppercase sm:text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
                <span className="boy16-icon-wiggle text-2xl">📜</span>
                <span>side quests (news)</span>
              </h3>
              <div className="space-y-4">
                {news.map((n, i) => (
                  <QuestNewsCard key={n.id} item={n} index={i} />
                ))}
              </div>
            </div>
          </section>

          <section className="lg:col-span-7">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold uppercase sm:text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              <span className="boy16-icon-wiggle text-2xl">💾</span>
              <span>inbox save files (tap)</span>
            </h3>
            <div className="columns-1 gap-5 sm:columns-2">
              {emails.map((email) => (
                <div key={email.id} className="mb-5 break-inside-avoid">
                  <SaveSlotMail email={email} onOpen={setSelectedEmail} />
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
