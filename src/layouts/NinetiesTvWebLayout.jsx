import { useCallback, useEffect, useMemo, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const CHANNELS = [
  { key: 'mail', num: '03', title: 'E-MAIL', sub: 'The Information Superhighway' },
  { key: 'wx', num: '04', title: 'WEATHER', sub: `${weather.city} Local Forecast` },
  { key: 'news', num: '05', title: 'NEWS 24', sub: 'Headline Roundup' },
  { key: 'stox', num: '06', title: 'WALL ST', sub: 'Ticker & Quotes' },
]

function pad2(n) {
  return String(n).padStart(2, '0')
}

export default function NinetiesTvWebLayout({ onSwitchPersona }) {
  const [ch, setCh] = useState(0)
  const [switching, setSwitching] = useState(false)
  const [emailIdx, setEmailIdx] = useState(0)
  const [newsIdx, setNewsIdx] = useState(0)
  const [detail, setDetail] = useState(null) // 'email' | 'news' | null
  const [now, setNow] = useState(() => new Date())
  const [colonOn, setColonOn] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setColonOn((c) => !c), 500)
    return () => clearInterval(t)
  }, [])

  const changeChannel = useCallback((next) => {
    setSwitching(true)
    setDetail(null)
    window.setTimeout(() => {
      setCh(next)
      setSwitching(false)
    }, 380)
  }, [])

  const current = CHANNELS[ch] ?? CHANNELS[0]
  const timeStr = `${pad2(now.getHours())}${colonOn ? ':' : ' '}${pad2(now.getMinutes())}`

  const tickerText = useMemo(
    () =>
      stocks
        .map((s) => {
          const sign = s.change >= 0 ? '▲' : '▼'
          return `${s.ticker} ${s.currency}${s.price.toFixed(2)} ${sign}${Math.abs(s.changePct).toFixed(2)}%`
        })
        .join('   •   '),
    []
  )

  const email = emails[emailIdx]
  const newsItem = news[newsIdx]

  return (
    <div
      className="relative min-h-full overflow-x-hidden px-2 py-4 sm:px-4 sm:py-6"
      style={{
        fontFamily: 'var(--font-main)',
        background:
          'radial-gradient(ellipse 120% 80% at 50% 100%, #1a1528 0%, #0d0a12 45%, #050308 100%)',
      }}
    >
      <style>{`
        @keyframes tv-static {
          0% { opacity: 0.12; transform: translate(0, 0); }
          25% { opacity: 0.22; transform: translate(-2%, 1%); }
          50% { opacity: 0.15; transform: translate(1%, -1%); }
          75% { opacity: 0.2; transform: translate(-1%, 2%); }
          100% { opacity: 0.12; transform: translate(0, 0); }
        }
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 0.97; }
          94% { opacity: 1; }
          96% { opacity: 0.99; }
        }
        @keyframes channel-flash {
          0% { opacity: 0.95; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes led-blink {
          0%, 70% { opacity: 1; box-shadow: 0 0 6px #0f6; }
          85%, 100% { opacity: 0.35; box-shadow: 0 0 2px #0a4; }
        }
        @keyframes antenna-wiggle {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 255, 180, 0.35)); }
          50% { filter: drop-shadow(0 0 14px rgba(0, 255, 200, 0.55)); }
        }
        .crt-scanlines {
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.13) 2px,
            rgba(0, 0, 0, 0.13) 4px
          );
        }
        .crt-vignette {
          pointer-events: none;
          box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.75), inset 0 0 40px rgba(0, 20, 40, 0.4);
        }
      `}</style>

      {/* Room ambience */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 50% 35% at 50% -5%, rgba(255, 200, 120, 0.15), transparent)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5">
        {/* Branding + switch persona */}
        <div className="flex w-full flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <span
              className="text-lg font-bold tracking-widest sm:text-xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--accent)',
                textShadow: '2px 0 0 #ff0088, -2px 0 0 #00ffff, 0 0 12px var(--accent)',
              }}
            >
              WebTV<span style={{ color: 'var(--text2)', fontSize: '0.65em', verticalAlign: 'super' }}>™</span>
            </span>
            <span
              className="badge badge-sm border-0"
              style={{ background: 'var(--accent2)', color: 'var(--text)' }}
            >
              56k READY
            </span>
          </div>
          <button
            type="button"
            className="btn btn-xs btn-outline border-opacity-40"
            style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
            onClick={onSwitchPersona}
          >
            other viewer
          </button>
        </div>

        {/* TV set */}
        <div className="relative w-full max-w-[min(100%,42rem)]">
          {/* Antenna */}
          <svg
            className="absolute -top-8 left-1/2 z-10 h-16 w-24 -translate-x-1/2 sm:-top-10 sm:h-20 sm:w-28"
            viewBox="0 0 120 80"
            fill="none"
            aria-hidden
            style={{ animation: 'antenna-wiggle 4s ease-in-out infinite' }}
          >
            <path
              d="M60 78 L60 38 M60 38 L28 8 M60 38 L92 8"
              stroke="#4a4a55"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="28" cy="8" r="5" fill="#c0c0c8" />
            <circle cx="92" cy="8" r="5" fill="#c0c0c8" />
          </svg>

          {/* Bezel */}
          <div
            className="relative rounded-[2rem] p-3 sm:p-5 shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #3a3842 0%, #1e1d24 40%, #121118 100%)',
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.65), inset 0 2px 0 rgba(255,255,255,0.08), inset 0 -3px 8px rgba(0,0,0,0.5)',
            }}
          >
            {/* Power LED */}
            <div
              className="absolute bottom-4 right-5 size-2.5 rounded-full sm:bottom-6 sm:right-8"
              style={{
                background: '#0f6',
                animation: 'led-blink 2.2s ease-in-out infinite',
              }}
              title="ON"
              aria-hidden
            />
            <p
              className="absolute bottom-3 right-10 hidden text-[9px] tracking-widest sm:block sm:bottom-5 sm:right-14"
              style={{ color: 'var(--text2)' }}
            >
              STEREO
            </p>

            {/* Screen glass */}
            <div
              className="relative overflow-hidden rounded-xl sm:rounded-2xl"
              style={{
                background: '#0a1620',
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9), 0 0 1px rgba(0,255,200,0.2)',
                border: '3px solid #0d0d12',
                animation: 'crt-flicker 4s linear infinite',
              }}
            >
              {/* Curvature illusion */}
              <div
                className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] crt-vignette"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 z-[19] crt-scanlines opacity-80" aria-hidden />
              <div
                className="pointer-events-none absolute inset-0 z-[18] mix-blend-overlay"
                style={{
                  background: 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 30%, rgba(0,0,0,0.45) 100%)',
                }}
                aria-hidden
              />

              {/* Static burst on channel change */}
              {switching && (
                <div
                  className="absolute inset-0 z-30"
                  style={{
                    background: 'repeating-radial-gradient(circle at 20% 30%, #fff 0 1px, transparent 1px 3px)',
                    mixBlendMode: 'overlay',
                    animation: 'tv-static 0.15s linear infinite, channel-flash 0.38s ease-out forwards',
                  }}
                  aria-hidden
                />
              )}

              {/* Content */}
              <div
                className="relative z-10 min-h-[280px] px-3 py-3 sm:min-h-[320px] sm:px-5 sm:py-4"
                style={{
                  color: '#c8f0e0',
                  textShadow: '0 0 2px rgba(0, 255, 200, 0.4)',
                }}
              >
                {/* OSD header */}
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2 border-b border-cyan-500/25 pb-2">
                  <div>
                    <p className="text-[10px] tracking-[0.35em] opacity-70 sm:text-xs">CHANNEL</p>
                    <p
                      className="text-2xl font-bold leading-none sm:text-3xl"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--accent)',
                        textShadow: '1px 0 0 #f0f, -1px 0 0 #0ff',
                      }}
                    >
                      {current.num}
                    </p>
                    <p className="mt-1 text-sm font-bold tracking-wide sm:text-base">{current.title}</p>
                    <p className="text-[11px] opacity-60 sm:text-xs">{current.sub}</p>
                  </div>
                  <div className="text-right font-mono text-xs sm:text-sm" style={{ color: 'var(--text2)' }}>
                    <p className="tracking-widest">{timeStr}</p>
                    <p className="mt-1 opacity-80">INPUT: WEB</p>
                  </div>
                </div>

                {/* Main panel */}
                <div className="max-h-[min(52vh,380px)] overflow-y-auto pr-1 [scrollbar-width:thin]">
                  {detail === 'email' && email && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs mb-2 gap-1 px-0 text-cyan-300 hover:bg-cyan-950/40"
                        onClick={() => setDetail(null)}
                      >
                        ◀ CH {current.num}
                      </button>
                      <p className="break-words text-sm opacity-90">
                        <span className="text-yellow-300">FROM:</span> {email.from.name}{' '}
                        <span className="opacity-50">&lt;{email.from.email}&gt;</span>
                      </p>
                      <p className="mt-2 font-bold text-cyan-200">{email.subject}</p>
                      <pre
                        className="mt-3 whitespace-pre-wrap font-mono text-[11px] leading-relaxed opacity-90 sm:text-xs"
                        style={{ fontFamily: 'var(--font-main)' }}
                      >
                        {email.body}
                      </pre>
                    </div>
                  )}

                  {detail === 'news' && newsItem && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs mb-2 gap-1 px-0 text-cyan-300 hover:bg-cyan-950/40"
                        onClick={() => setDetail(null)}
                      >
                        ◀ CH {current.num}
                      </button>
                      <p className="text-3xl">{newsItem.emoji}</p>
                      <p className="mt-2 font-bold text-lg text-yellow-200">{newsItem.title}</p>
                      <p className="mt-2 text-sm opacity-70">
                        {newsItem.source} · {newsItem.category} · {newsItem.time}
                      </p>
                    </div>
                  )}

                  {detail === null && current.key === 'mail' && (
                    <ul className="space-y-2">
                      {emails.map((e, i) => (
                        <li key={e.id}>
                          <button
                            type="button"
                            className={`w-full rounded border px-2 py-2 text-left transition-colors sm:px-3 ${
                              i === emailIdx
                                ? 'border-cyan-400/60 bg-cyan-950/35'
                                : 'border-white/10 bg-black/20 hover:border-cyan-500/30'
                            }`}
                            onClick={() => {
                              setEmailIdx(i)
                              setDetail('email')
                            }}
                          >
                            <span className="text-yellow-300">{e.from.avatar}</span>{' '}
                            <span className="font-bold">{e.from.name}</span>
                            {!e.read && (
                              <span className="badge badge-warning badge-xs ml-1">NEW</span>
                            )}
                            <p className="truncate text-xs opacity-80 sm:text-sm">{e.subject}</p>
                            <p className="font-mono text-[10px] opacity-50">{e.time}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {detail === null && current.key === 'wx' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-end gap-4">
                        <span className="text-6xl sm:text-7xl" style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}>
                          {weather.icon}
                        </span>
                        <div>
                          <p className="text-4xl font-bold sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
                            {weather.temp}°C
                          </p>
                          <p className="text-sm opacity-80">{weather.condition}</p>
                          <p className="text-xs opacity-60">
                            feels {weather.feels_like}° · wind {weather.wind} km/h · humidity {weather.humidity}%
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-center text-[10px] sm:gap-2 sm:text-xs">
                        {weather.forecast.map((d) => (
                          <div
                            key={d.day}
                            className="rounded border border-green-500/30 bg-green-950/20 py-2"
                          >
                            <p className="font-bold text-yellow-200">{d.day}</p>
                            <p className="text-lg sm:text-xl">{d.icon}</p>
                            <p>
                              {d.high}° / {d.low}°
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {detail === null && current.key === 'news' && (
                    <ul className="space-y-2">
                      {news.map((n, i) => (
                        <li key={n.id}>
                          <button
                            type="button"
                            className={`flex w-full items-start gap-2 rounded border px-2 py-2 text-left sm:gap-3 sm:px-3 ${
                              i === newsIdx
                                ? 'border-magenta-400/50 bg-purple-950/30'
                                : 'border-white/10 bg-black/20 hover:border-fuchsia-500/30'
                            }`}
                            onClick={() => {
                              setNewsIdx(i)
                              setDetail('news')
                            }}
                          >
                            <span className="text-2xl">{n.emoji}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold leading-snug sm:text-base">{n.title}</p>
                              <p className="text-[10px] opacity-60 sm:text-xs">
                                {n.source} · {n.time}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {detail === null && current.key === 'stox' && (
                    <div className="space-y-3">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-cyan-500/30 text-[10px] uppercase tracking-wider opacity-70">
                            <th className="py-1 pr-2">Sym</th>
                            <th className="py-1 pr-2">Last</th>
                            <th className="py-1">Chg</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stocks.map((s) => (
                            <tr key={s.ticker} className="border-b border-white/5">
                              <td className="py-2 pr-2 font-bold text-yellow-200">{s.ticker}</td>
                              <td className="py-2 pr-2 font-mono">
                                {s.currency}
                                {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </td>
                              <td
                                className={`py-2 font-mono ${s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                              >
                                {s.change >= 0 ? '+' : ''}
                                {s.change.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}
                                {s.changePct.toFixed(2)}%)
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-[10px] opacity-50">DELAYED 20 MIN · NOT INVESTMENT ADVICE · AS SEEN ON TV</p>
                    </div>
                  )}
                </div>

                {/* Scrolling ticker */}
                <div
                  className="relative mt-3 overflow-hidden rounded border border-amber-600/40 bg-black/50 py-1.5"
                  style={{ borderStyle: 'double' }}
                >
                  <div
                    className="flex whitespace-nowrap font-mono text-[10px] tracking-wide text-amber-200 sm:text-xs"
                    style={{
                      animation: 'ticker-scroll 28s linear infinite',
                    }}
                  >
                    <span className="pr-16">{tickerText}</span>
                    <span className="pr-16" aria-hidden>
                      {tickerText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Woodgrain stand */}
          <div
            className="mx-auto mt-0 h-4 w-[88%] rounded-b-lg sm:h-5"
            style={{
              background:
                'linear-gradient(90deg, #3d2914 0%, #5c3d1e 15%, #4a3018 50%, #5c3d1e 85%, #3d2914 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
            }}
            aria-hidden
          />
        </div>

        {/* Remote control — daisyUI buttons */}
        <div
          className="card card-border w-full max-w-md shadow-xl"
          style={{ background: 'linear-gradient(180deg, #2a2830 0%, #1a1820 100%)', borderColor: '#3d3a48' }}
        >
          <div className="card-body gap-3 p-4 sm:p-5">
            <p className="text-center text-[10px] font-bold tracking-[0.4em] opacity-50">REMOTE</p>
            <div className="grid grid-cols-4 gap-2">
              {CHANNELS.map((c, i) => (
                <button
                  key={c.key}
                  type="button"
                  className={`btn btn-sm h-14 flex-col gap-0 border-0 font-bold sm:h-16 ${
                    ch === i ? 'btn-primary' : 'btn-neutral text-base-content/80'
                  }`}
                  style={ch === i ? { boxShadow: '0 0 14px rgba(34, 211, 238, 0.45)' } : undefined}
                  onClick={() => changeChannel(i)}
                >
                  <span className="font-mono text-[10px] opacity-70">CH</span>
                  <span className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.num}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              <button type="button" className="btn btn-xs btn-ghost opacity-60" onClick={() => changeChannel((ch + 3) % 4)}>
                ◀ prev
              </button>
              <button type="button" className="btn btn-xs btn-ghost opacity-60" onClick={() => changeChannel((ch + 1) % 4)}>
                next ▶
              </button>
            </div>
          </div>
        </div>

        <p className="max-w-md px-4 text-center text-[10px] leading-relaxed opacity-40" style={{ color: 'var(--text2)' }}>
          Picture may appear slightly curved. Do not adjust your set — this is the authentic 1996 couch experience.
        </p>
      </div>
    </div>
  )
}
