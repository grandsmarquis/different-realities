import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const glamTag = t =>
  ({
    work: 'Girlboss memo',
    personal: 'BFF energy 💋',
    finance: 'Bag secured',
    promo: 'Limited drop',
    newsletter: 'Fan club digest',
    social: 'Main character',
    dev: 'Tech glam lab',
    shopping: 'Checkout runway',
    travel: 'Jet-set ETA',
  }[t] || 'Extra special')

const FLOAT_DECOR = [
  { emoji: '✨', left: '6%', top: '12%', delay: '0s', dur: '4.2s' },
  { emoji: '💖', left: '88%', top: '18%', delay: '0.6s', dur: '5.1s' },
  { emoji: '💅', left: '12%', top: '72%', delay: '1.1s', dur: '4.8s' },
  { emoji: '🌸', left: '82%', top: '65%', delay: '0.3s', dur: '5.4s' },
  { emoji: '⭐', left: '48%', top: '8%', delay: '1.5s', dur: '3.9s' },
  { emoji: '👠', left: '92%', top: '42%', delay: '0.9s', dur: '4.5s' },
]

export default function BarbieGirlLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [reducedMotion, setReducedMotion] = useState(false)
  const unread = emails.filter(e => !e.read).length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return (
    <div
      className="barbie-root relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 100% 60% at 50% -10%, rgba(255, 105, 180, 0.45) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 100% 30%, rgba(218, 112, 214, 0.22) 0%, transparent 45%),
          radial-gradient(ellipse 70% 45% at 0% 70%, rgba(255, 20, 147, 0.18) 0%, transparent 40%),
          linear-gradient(165deg, #fff5fb 0%, #ffe0f0 35%, #ffc8e8 70%, #ffb0de 100%)`,
      }}
    >
      {!reducedMotion && (
        <div
          className="barbie-bg-shimmer pointer-events-none fixed inset-0 z-0 opacity-50"
          aria-hidden
          style={{
            background:
              'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)',
            backgroundSize: '220% 100%',
          }}
        />
      )}

      {!reducedMotion && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          {FLOAT_DECOR.map((d, i) => (
            <span
              key={i}
              className="barbie-float-emoji absolute text-2xl opacity-80 drop-shadow-[0_2px_8px_rgba(255,20,147,0.35)] md:text-3xl"
              style={{ left: d.left, top: d.top, animationDelay: d.delay, animationDuration: d.dur }}
            >
              {d.emoji}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6 md:px-6 md:py-10">
        <header
          className={`relative mb-8 overflow-hidden rounded-[2rem] border-4 border-white/90 shadow-[0_12px_0_rgba(199,24,104,0.25),0_24px_48px_rgba(255,20,147,0.2)] ${reducedMotion ? '' : 'barbie-dream-header'}`}
        >
          <div
            className="relative px-5 py-6 md:px-10 md:py-8"
            style={{
              background: `linear-gradient(135deg, #ff9ec8 0%, #ff69b4 40%, #ff1493 100%)`,
            }}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/25 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-6 left-1/4 h-32 w-64 rounded-full bg-yellow-200/20 blur-2xl" aria-hidden />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-6">
                <div
                  className={`barbie-logo-ring flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/90 bg-gradient-to-br from-yellow-200 via-pink-200 to-fuchsia-300 shadow-lg md:h-28 md:w-28 ${reducedMotion ? '' : 'barbie-logo-spin-slow'}`}
                  aria-hidden
                >
                  <span className="text-4xl md:text-5xl">🏠</span>
                </div>
                <div className="min-w-0">
                  <p
                    className="m-0 text-xs font-extrabold uppercase tracking-[0.4em] text-white/90"
                    style={{ fontFamily: 'var(--font-main)' }}
                  >
                    Dream life HQ · Parody
                  </p>
                  <h1
                    className={`m-0 mt-1 text-3xl leading-tight text-white drop-shadow-md md:text-5xl ${reducedMotion ? '' : 'barbie-title-glow'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Plastic fantastic board
                  </h1>
                  <p className="m-0 mt-2 max-w-xl text-sm font-semibold text-white/95 md:text-base">
                    Same inbox, weather, headlines &amp; stocks — but make it{' '}
                    <span className="whitespace-nowrap">✨ iconic ✨</span>.{' '}
                    <span className="font-bold text-yellow-100">{unread}</span> messages still in the spotlight.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col lg:items-stretch">
                <button
                  type="button"
                  className="btn border-0 bg-white font-bold text-pink-600 shadow-md hover:bg-yellow-100 hover:text-pink-700"
                  onClick={onSwitchPersona}
                >
                  Change the scene
                </button>
              </div>
            </div>

            <svg
              className="barbie-house-line pointer-events-none absolute bottom-0 left-0 right-0 h-12 w-full text-white/35 md:h-16"
              viewBox="0 0 400 48"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M0,40 L80,40 L100,20 L200,8 L300,22 L320,40 L400,40"
              />
            </svg>
          </div>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-12">
          <div className="card card-border border-4 border-pink-200 bg-gradient-to-br from-white via-pink-50 to-fuchsia-100 shadow-xl md:col-span-5">
            <div className="card-body gap-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="card-title m-0 text-sm uppercase tracking-widest text-pink-600" style={{ fontFamily: 'var(--font-display)' }}>
                  Outfit forecast
                </h2>
                <span className="barbie-weather-bob text-3xl" aria-hidden>
                  👗
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="barbie-sun-pulse flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 text-4xl shadow-inner ring-4 ring-pink-200">
                  {weather.icon}
                </div>
                <div>
                  <p className="m-0 text-2xl font-extrabold text-pink-900 md:text-3xl">{weather.temp}°C</p>
                  <p className="m-0 font-semibold text-pink-800/90">{weather.condition}</p>
                  <p className="m-0 text-xs opacity-70">
                    {weather.city} — humidity {weather.humidity}% · wind {weather.wind} km/h
                  </p>
                </div>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {weather.forecast.slice(0, 5).map((d, i) => (
                  <li
                    key={i}
                    className="badge badge-lg gap-1 border-2 border-pink-300 bg-white/90 font-semibold text-pink-800"
                  >
                    <span>{d.icon}</span>
                    {d.day} {d.high}°
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card card-border border-4 border-fuchsia-300 bg-gradient-to-br from-fuchsia-950 via-pink-900 to-rose-950 text-pink-50 shadow-xl md:col-span-7">
            <div className="card-body gap-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="card-title m-0 text-sm uppercase tracking-widest text-pink-200" style={{ fontFamily: 'var(--font-display)' }}>
                  Sparkle portfolio
                </h2>
                <span className="text-xl" aria-hidden>
                  💎
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="barbie-stock-card rounded-2xl border-2 border-pink-400/40 bg-pink-950/50 p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="m-0 font-mono text-xs font-bold tracking-wider text-pink-200">{s.ticker}</p>
                        <p className="m-0 text-[10px] opacity-75 line-clamp-1">{s.name}</p>
                      </div>
                      <span
                        className={`text-sm font-extrabold tabular-nums ${s.changePct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}
                      >
                        {s.changePct > 0 ? '+' : ''}
                        {s.changePct}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <MiniSpark
                        series={s.series}
                        stroke={s.changePct >= 0 ? '#86efac' : '#fda4af'}
                        className="opacity-95"
                      />
                      <p className="m-0 shrink-0 text-xs font-bold tabular-nums">
                        {s.currency}
                        {s.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-7" aria-labelledby="barbie-mail-heading">
            <h2 id="barbie-mail-heading" className="mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-2xl" aria-hidden>
                🎀
              </span>
              <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-600 bg-clip-text text-2xl text-transparent md:text-3xl">
                Closet mail rail
              </span>
            </h2>
            <ul className="space-y-4">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id} className="relative">
                    <div className="pointer-events-none relative flex justify-center" aria-hidden>
                      <div
                        className={`h-3 w-3 rounded-full bg-gradient-to-b from-pink-300 to-pink-600 shadow-md ring-2 ring-white ${reducedMotion ? '' : 'barbie-hanger-sway'}`}
                        style={{ animationDelay: `${(e.id % 5) * 0.15}s` }}
                      />
                      <div className="absolute left-1/2 top-3 h-4 w-px -translate-x-1/2 bg-gradient-to-b from-pink-400 to-transparent" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`barbie-mail-hanger relative mt-1 w-full rounded-2xl border-4 text-left shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] ${
                        on
                          ? 'border-fuchsia-500 bg-gradient-to-br from-white via-pink-50 to-fuchsia-100 ring-4 ring-pink-300/60'
                          : 'border-white/90 bg-white/95 hover:border-pink-300'
                      } ${!e.read && !reducedMotion ? 'barbie-unread-shimmer' : ''}`}
                    >
                      <div className="p-4 md:p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-3xl drop-shadow-sm">{e.from.avatar}</span>
                          <span className="badge border-pink-400 bg-pink-100 font-bold text-pink-800">{glamTag(e.tag)}</span>
                          {!e.read && (
                            <span className="badge badge-secondary border-0 font-bold">NEW</span>
                          )}
                          <span className="ml-auto text-xs font-bold opacity-50">{e.time}</span>
                        </div>
                        <p className="m-0 mt-2 text-lg font-extrabold leading-snug text-pink-950 md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                          {e.subject}
                        </p>
                        <p className="m-0 mt-1 text-sm font-semibold text-pink-800/80">{e.from.name}</p>
                        <p className="m-0 mt-2 text-sm opacity-75 line-clamp-2">{e.preview}</p>
                        {on && (
                          <div className="barbie-body-reveal mt-4 border-t-2 border-dashed border-pink-200 pt-4">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-pink-950 md:text-base">{e.body}</p>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <aside className="lg:col-span-5" aria-labelledby="barbie-news-heading">
            <h2 id="barbie-news-heading" className="mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-2xl" aria-hidden>
                📰
              </span>
              <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-2xl text-transparent md:text-3xl">
                Tea &amp; headlines
              </span>
            </h2>
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-b from-pink-100 via-white to-fuchsia-50 p-1 shadow-xl">
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                aria-hidden
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -12deg,
                    transparent,
                    transparent 12px,
                    rgba(255, 105, 180, 0.08) 12px,
                    rgba(255, 105, 180, 0.08) 14px
                  )`,
                }}
              />
              <ul className="relative space-y-3 p-4">
                {news.map((n, i) => (
                  <li
                    key={n.id}
                    className={`barbie-mag-card rounded-2xl border-2 border-pink-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm ${reducedMotion ? '' : 'barbie-mag-tilt'}`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <div className="flex gap-3">
                      <span className="barbie-emoji-wiggle text-3xl shrink-0" style={{ animationDelay: `${i * 0.2}s` }}>
                        {n.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-pink-500">
                          {n.source} · {n.category}
                        </p>
                        <p className="m-0 mt-1 font-bold leading-snug text-pink-950">{n.title}</p>
                        <p className="m-0 mt-2 text-xs font-semibold opacity-60">{n.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-3xl opacity-90" aria-hidden>
              <span className={reducedMotion ? '' : 'barbie-float-emoji'} style={{ animationDuration: '3.5s' }}>
                🦄
              </span>
              <span className={reducedMotion ? '' : 'barbie-float-emoji'} style={{ animationDuration: '4.2s', animationDelay: '0.5s' }}>
                💄
              </span>
              <span className={reducedMotion ? '' : 'barbie-float-emoji'} style={{ animationDuration: '3.8s', animationDelay: '1s' }}>
                🛍️
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
