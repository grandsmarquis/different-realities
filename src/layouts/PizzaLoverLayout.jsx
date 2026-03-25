import { useMemo } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const toppingEmoji = ['🍄', '🫒', '🌶️', '🥓', '🧀', '🍅', '🌿', '🧅']

export default function PizzaLoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  const slices = useMemo(() => {
    const n = emails.length
    return emails.map((email, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2
      const radius = 42
      const x = 50 + radius * Math.cos(angle)
      const y = 50 + radius * Math.sin(angle)
      return { email, i, angle, x, y }
    })
  }, [])

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-24"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #5c2410 0%, var(--bg) 45%, #1a0c08 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pizza-steam-layer pointer-events-none fixed inset-x-0 bottom-0 h-48" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-6">
        <header className="mb-6 flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h1 className="m-0 text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)', textShadow: '2px 2px 0 #8b2500' }}>
              Inbox al Forno
            </h1>
            <p className="m-0 mt-1 text-sm opacity-90" style={{ color: 'var(--text2)' }}>
              Wood-fired messages · extra cheese on everything
            </p>
          </div>
          <button type="button" className="btn btn-sm md:btn-md border-2 font-bold" style={{ borderColor: 'var(--accent2)', background: 'var(--accent)', color: '#fff' }} onClick={onSwitchPersona}>
            Order a different life
          </button>
        </header>

        {/* Oven weather strip */}
        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border-2 px-4 py-3 pizza-oven-glow"
          style={{ borderColor: 'var(--border)', background: 'linear-gradient(180deg, var(--card), var(--bg2))' }}
        >
          <span className="text-3xl">{weather.icon}</span>
          <div>
            <p className="m-0 font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--accent2)' }}>
              {weather.city} is {weather.temp}° — {weather.condition}
            </p>
            <p className="m-0 text-xs" style={{ color: 'var(--text2)' }}>Perfect dough-rising weather</p>
          </div>
          <div className="flex gap-1">
            {weather.forecast.map(d => (
              <div key={d.day} className="rounded-lg border px-2 py-1 text-center text-[10px]" style={{ borderColor: 'var(--border)' }}>
                <div>{d.icon}</div>
                <div style={{ color: 'var(--text2)' }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Polar pizza hub */}
        <div className="mx-auto mb-10 w-full max-w-[min(100vw,520px)]">
          <p className="mb-2 text-center text-sm font-bold" style={{ color: 'var(--text2)' }}>Spin the pie — tap a slice</p>
          <div className="relative aspect-square w-full">
            {/* Rotating crust */}
            <div
              className="pizza-spin absolute inset-[4%] rounded-full border-[14px] shadow-2xl md:border-[18px]"
              style={{
                borderColor: '#c17a3a',
                background: `conic-gradient(
                  from -90deg,
                  #f4a742 0deg 36deg,
                  #e85d04 36deg 72deg,
                  #f4a742 72deg 108deg,
                  #e85d04 108deg 144deg,
                  #f4a742 144deg 180deg,
                  #e85d04 180deg 216deg,
                  #f4a742 216deg 252deg,
                  #e85d04 252deg 288deg,
                  #f4a742 288deg 324deg,
                  #e85d04 324deg 360deg
                )`,
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25), 0 12px 40px rgba(0,0,0,0.5)',
              }}
            />
            <div
              className="pizza-spin-reverse absolute inset-[14%] rounded-full opacity-90 md:inset-[16%]"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #fff8e8 0%, #ffcc80 28%, #e87830 62%, #b8321a 100%)',
              }}
            />
            {/* Cheese shimmer */}
            <div className="pizza-cheese-shimmer pointer-events-none absolute inset-[14%] rounded-full md:inset-[16%]" aria-hidden />

            {/* Toppings around the rim */}
            {toppingEmoji.map((em, ti) => {
              const ang = (2 * Math.PI * ti) / toppingEmoji.length - Math.PI / 2
              const rPct = 38
              return (
                <span
                  key={ti}
                  className="pointer-events-none absolute text-xl md:text-2xl"
                  style={{
                    left: `${50 + rPct * Math.cos(ang)}%`,
                    top: `${50 + rPct * Math.sin(ang)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span className="pizza-topping-bob inline-block" style={{ animationDelay: `${ti * 0.18}s` }}>{em}</span>
                </span>
              )
            })}

            {/* Center hub */}
            <button
              type="button"
              className="absolute left-1/2 top-1/2 z-20 flex h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 text-center shadow-lg transition-transform hover:scale-105"
              style={{
                borderColor: 'var(--accent2)',
                background: 'linear-gradient(160deg, #fff8f0, var(--accent))',
                color: '#2c1810',
              }}
              onClick={() => setSelectedEmail(emails[0])}
            >
              <span className="text-2xl md:text-3xl">📬</span>
              <span className="px-1 text-[10px] font-extrabold leading-tight md:text-xs">OPEN<br />HOT</span>
            </button>

            {/* Email slices as polar buttons */}
            {slices.map(({ email, x, y }) => (
              <button
                key={email.id}
                type="button"
                className="absolute z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-lg shadow-md transition-transform hover:z-30 hover:scale-110 md:h-14 md:w-14 md:text-xl"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  borderColor: 'var(--accent2)',
                  background: email.read ? 'color-mix(in srgb, var(--card) 85%, transparent)' : 'var(--card)',
                  boxShadow: email.read ? undefined : '0 0 0 2px var(--accent)',
                }}
                title={email.subject}
                onClick={() => setSelectedEmail(email)}
              >
                {email.from.avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Stock “pepperoni chart” */}
        <div className="mb-10 rounded-2xl border-2 p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <h2 className="m-0 mb-3 text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
            Pepperoni ticker wheel
          </h2>
          <div className="flex flex-wrap items-end justify-center gap-3 md:gap-5">
            {stocks.map((s, i) => {
              const h = 24 + Math.abs(s.changePct) * 10
              return (
                <div key={s.ticker} className="flex flex-col items-center gap-1">
                  <div
                    className="pizza-bar-rise w-10 rounded-t-full border-2 md:w-12"
                    style={{
                      height: h,
                      borderColor: '#8b4513',
                      background: `linear-gradient(180deg, ${i % 2 ? '#ff6b35' : '#f7c948'}, #b8321a)`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                  <span className="text-[10px] font-bold">{s.ticker}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* News as menu board */}
        <div className="rounded-2xl border-4 border-dashed p-4" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
          <h2 className="m-0 mb-3 rotate-[-0.5deg] text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
            Today&apos;s specials (news)
          </h2>
          <ul className="m-0 grid list-none gap-2 p-0 md:grid-cols-2">
            {news.map(n => (
              <li
                key={n.id}
                className="rounded-xl border-2 px-3 py-2 text-sm leading-snug"
                style={{ borderColor: 'var(--border)', background: 'var(--card)', transform: `rotate(${(n.id % 5) - 2}deg)` }}
              >
                <span className="mr-1">{n.emoji}</span>
                {n.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-3 sm:p-6"
          style={{ background: 'rgba(20, 8, 4, 0.82)' }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="pizza-oven-door relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border-4 p-5 sm:rounded-3xl"
            style={{ borderColor: '#3d2418', background: 'linear-gradient(180deg, #fff5eb, #ffd4a8)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 h-2 w-full rounded-full bg-neutral-800 shadow-inner">
              <div className="pizza-heat-bar h-full w-2/3 rounded-full" />
            </div>
            <p className="m-0 text-center text-xs font-bold tracking-widest" style={{ color: '#8b4513' }}>FRESH FROM THE OVEN</p>
            <h3 className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#5c1a0a' }}>{selectedEmail.subject}</h3>
            <p className="text-sm" style={{ color: '#6b4423' }}>Topped by {selectedEmail.from.name} {selectedEmail.from.avatar}</p>
            <div className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: '#2c1810' }}>{selectedEmail.body}</div>
            <button type="button" className="btn btn-block mt-4 border-0 font-bold" style={{ background: 'var(--accent)', color: '#fff' }} onClick={() => setSelectedEmail(null)}>
              Burp & close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
