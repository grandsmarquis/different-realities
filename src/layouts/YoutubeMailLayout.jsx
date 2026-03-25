import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagHue = {
  social: 280,
  work: 210,
  finance: 145,
  dev: 265,
  personal: 340,
  shopping: 35,
  travel: 195,
  newsletter: 25,
}

function fakeViews(id) {
  return ((id * 7919) % 900_000) + 12_000
}

function sparkPath(series, w, h) {
  if (!series?.length) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const pad = 2
  const span = max - min || 1
  const denom = Math.max(1, series.length - 1)
  return series
    .map((v, i) => {
      const x = pad + (i / denom) * (w - pad * 2)
      const y = h - pad - ((v - min) / span) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

const CHAT_LINES = [
  'first!!!',
  'who else is procrastinating rn',
  'POV: you subscribed to drama',
  'this algorithm knows me too well',
  'NOTIFICATION GANG 🔔',
  'unread hits different at 3am',
  'like if you also refresh for no reason',
]

export default function YoutubeMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const playing = selectedEmail ?? emails[0]
  const [motionOk, setMotionOk] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [subscribed, setSubscribed] = useState(false)
  const [likes, setLikes] = useState(12847)
  const [ccOn, setCcOn] = useState(true)
  const [chatTick, setChatTick] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionOk(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!isPlaying || !motionOk) return undefined
    const t = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.35))
    }, 50)
    return () => window.clearInterval(t)
  }, [isPlaying, motionOk])

  useEffect(() => {
    setProgress(0)
  }, [playing?.id])

  useEffect(() => {
    if (!motionOk) return undefined
    const t = window.setInterval(() => setChatTick((n) => n + 1), 4200)
    return () => window.clearInterval(t)
  }, [motionOk])

  const ix = useMemo(() => emails.findIndex((e) => e.id === playing.id), [playing.id])

  const goPrev = useCallback(() => {
    const n = (ix - 1 + emails.length) % emails.length
    setSelectedEmail(emails[n])
  }, [ix, setSelectedEmail])

  const goNext = useCallback(() => {
    const n = (ix + 1) % emails.length
    setSelectedEmail(emails[n])
  }, [ix, setSelectedEmail])

  const hue = tagHue[playing.tag] ?? 200
  const thumbStyle = {
    background: `linear-gradient(135deg, hsl(${hue}, 70%, 22%) 0%, hsl(${(hue + 40) % 360}, 55%, 12%) 50%, hsl(${(hue + 120) % 360}, 45%, 18%) 100%)`,
  }

  const chatLine = CHAT_LINES[chatTick % CHAT_LINES.length]

  return (
    <div
      className="min-h-full pb-6 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background:
          'linear-gradient(180deg, #0f0f0f 0%, #181818 18%, #0f0f0f 55%, #121212 100%)',
      }}
    >
      <style>{`
        @keyframes ytm-pulse-live {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes ytm-shimmer-bar {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes ytm-bars {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @keyframes ytm-float-emoji {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes ytm-chat-in {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .ytm-live-dot {
          animation: ytm-pulse-live 1.2s ease-in-out infinite;
        }
        .ytm-shimmer-played {
          background: linear-gradient(
            90deg,
            #ff0000 0%,
            #ff4444 40%,
            #ff8888 50%,
            #ff4444 60%,
            #ff0000 100%
          );
          background-size: 200% 100%;
          animation: ytm-shimmer-bar 2.5s linear infinite;
        }
        .ytm-eq-bar {
          transform-origin: bottom center;
          animation: ytm-bars 0.45s ease-in-out infinite;
        }
        .ytm-eq-bar:nth-child(2) { animation-delay: 0.08s; }
        .ytm-eq-bar:nth-child(3) { animation-delay: 0.16s; }
        .ytm-eq-bar:nth-child(4) { animation-delay: 0.05s; }
        .ytm-eq-bar:nth-child(5) { animation-delay: 0.12s; }
        .ytm-float-av {
          animation: ytm-float-emoji 3.2s ease-in-out infinite;
        }
        .ytm-chat-line {
          animation: ytm-chat-in 0.5s ease-out;
        }
      `}</style>

      {/* Top bar — parody stream UI */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f0f]/95 px-3 py-2 backdrop-blur-md sm:px-4">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-ghost btn-sm gap-1 border border-white/10 text-white hover:bg-white/10"
            aria-label="Back to persona picker"
          >
            <span className="text-lg" aria-hidden>
              ☰
            </span>
            <span className="hidden font-bold sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
              InboxTube
            </span>
          </button>
          <div
            className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 sm:flex md:max-w-xl"
            role="search"
            aria-label="Search (decorative)"
          >
            <span className="text-white/40" aria-hidden>
              🔍
            </span>
            <span className="truncate text-sm text-white/35">Search your entire life commitments…</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="badge badge-sm border-0 bg-red-600 text-white gap-1">
              <span className={`inline-block size-1.5 rounded-full bg-white ${motionOk ? 'ytm-live-dot' : ''}`} />
              LIVE INBOX
            </span>
            <span className="badge badge-ghost badge-sm border-white/15 text-white/70">
              {emails.filter((e) => !e.read).length} burning
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-3 py-5 lg:grid-cols-[1fr_400px] lg:px-6">
        {/* Main column */}
        <div className="min-w-0 space-y-4">
          {/* Player */}
          <div className="overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
            <div className="relative aspect-video w-full" style={thumbStyle}>
              {/* Film grain */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
                aria-hidden
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div
                  className={`text-[clamp(4rem,18vw,8rem)] leading-none drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${motionOk ? 'ytm-float-av' : ''}`}
                  aria-hidden
                >
                  {playing.from.avatar}
                </div>
                {!playing.read && (
                  <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Unread premiere
                  </span>
                )}
                {isPlaying && motionOk && (
                  <div className="flex h-8 items-end gap-1" aria-hidden>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="ytm-eq-bar w-1 rounded-full bg-white/80"
                        style={{ height: `${28 + (i % 3) * 16}%` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {ccOn && (
                <div className="absolute bottom-16 left-3 right-3 sm:bottom-20 sm:left-6 sm:right-6">
                  <p
                    className="rounded bg-black/75 px-3 py-2 text-center text-sm font-medium leading-snug text-white backdrop-blur-sm sm:text-base"
                    style={{ textShadow: '0 1px 2px #000' }}
                  >
                    {playing.preview}
                  </p>
                </div>
              )}

              {/* Progress */}
              <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 pt-8">
                <div className="h-1 w-full cursor-pointer rounded-full bg-white/20">
                  <div
                    className={`h-full rounded-full ${motionOk ? 'ytm-shimmer-played' : ''}`}
                    style={{
                      width: `${progress}%`,
                      background: motionOk ? undefined : '#ff0000',
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-2 left-0 right-0 flex flex-wrap items-center justify-between gap-2 px-2 sm:px-3">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="btn btn-ghost btn-xs border-0 text-white hover:bg-white/10"
                    aria-label="Previous message"
                  >
                    ⏮
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="btn btn-circle btn-sm border-0 bg-white/15 text-white hover:bg-white/25"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="btn btn-ghost btn-xs border-0 text-white hover:bg-white/10"
                    aria-label="Next message"
                  >
                    ⏭
                  </button>
                  <span className="ml-1 hidden font-mono text-xs text-white/80 sm:inline" aria-live="polite">
                    {(() => {
                      const t = Math.floor((progress / 100) * 480)
                      const m = Math.floor(t / 60)
                      const s = t % 60
                      return `${m}:${String(s).padStart(2, '0')} / 8:00`
                    })()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCcOn((c) => !c)}
                    className={`btn btn-ghost btn-xs text-white hover:bg-white/10 ${ccOn ? 'bg-white/15' : ''}`}
                    aria-pressed={ccOn}
                    aria-label="Toggle captions"
                  >
                    CC
                  </button>
                  <span className="btn btn-ghost btn-xs pointer-events-none text-white/60">🔊</span>
                  <span className="btn btn-ghost btn-xs pointer-events-none text-white/60">⛶</span>
                </div>
              </div>
            </div>
          </div>

          {/* Meta row */}
          <div>
            <h1 className="text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">{playing.subject}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xl shadow-lg"
                  aria-hidden
                >
                  {playing.from.avatar}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{playing.from.name}</p>
                  <p className="text-xs text-white/50">
                    {fakeViews(playing.id).toLocaleString()} synthetic views · {playing.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSubscribed((s) => !s)}
                  className={`btn btn-sm gap-1 border-0 font-bold ${
                    subscribed ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {subscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost border border-white/15 text-white hover:bg-white/10"
                  onClick={() => setLikes((l) => l + 1)}
                  aria-label="Like"
                >
                  👍 {(likes / 1000).toFixed(1)}K
                </button>
                <button type="button" className="btn btn-sm btn-ghost text-white hover:bg-white/10" aria-label="Share">
                  Share
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-white/85 ring-1 ring-white/10">
              <p className="m-0 font-semibold text-white/90">
                {playing.read ? 'Watched · still in your subs' : '🔔 Ring the bell for every unread dopamine hit'}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-white/75">{playing.body}</p>
            </div>
          </div>
        </div>

        {/* Sidebar: playlist + extras */}
        <aside className="flex min-w-0 flex-col gap-4 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pr-1">
          {/* Fake live chat */}
          <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">Live chat · replay</p>
            <div key={chatTick} className={`rounded-lg bg-black/40 px-3 py-2 text-sm text-white/90 ${motionOk ? 'ytm-chat-line' : ''}`}>
              <span className="font-bold text-fuchsia-400">@inbox_archaeologist</span> {chatLine}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-bold text-white">Up next — same data, different thumbnail</h2>
            <ul className="space-y-2">
              {emails.map((e) => {
                const on = e.id === playing.id
                const h = tagHue[e.tag] ?? 200
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full gap-2 rounded-lg p-2 text-left transition-colors hover:bg-white/10 ${
                        on ? 'bg-white/10 ring-1 ring-red-500/60' : ''
                      }`}
                    >
                      <div
                        className="relative flex size-24 shrink-0 items-center justify-center rounded-lg text-3xl shadow-inner"
                        style={{
                          background: `linear-gradient(145deg, hsl(${h}, 60%, 28%), hsl(${(h + 50) % 360}, 50%, 14%))`,
                        }}
                      >
                        {e.from.avatar}
                        {!e.read && (
                          <span className="absolute right-1 top-1 rounded bg-red-600 px-1 text-[9px] font-bold text-white">NEW</span>
                        )}
                        <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white/90">8:00</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{e.subject}</p>
                        <p className="mt-1 truncate text-xs text-white/50">{e.from.name}</p>
                        <p className="text-xs text-white/40">{fakeViews(e.id).toLocaleString()} views</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Weather “short” */}
          <div className="rounded-xl bg-gradient-to-br from-sky-600/40 to-indigo-900/50 p-4 ring-1 ring-sky-400/30">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-200/80">Shorts · Weather.exe</p>
            <p className="mt-2 text-3xl" aria-hidden>
              {weather.icon}
            </p>
            <p className="mt-1 text-lg font-bold text-white">
              {weather.city} · {weather.temp}°C
            </p>
            <p className="text-sm text-white/70">{weather.condition}</p>
            <p className="mt-2 text-xs text-white/50">Feels {weather.feels_like}° · wind {weather.wind} km/h</p>
          </div>

          {/* News as suggested */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/45">Breaking rows (news)</p>
            <ul className="space-y-2">
              {news.slice(0, 4).map((n) => (
                <li
                  key={n.id}
                  className="flex gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/5"
                >
                  <span className="text-2xl" aria-hidden>
                    {n.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-white/90">{n.title}</p>
                    <p className="text-xs text-white/45">
                      {n.source} · {n.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Stocks ticker cards */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/45">Market sidebar (stocks)</p>
            <div className="space-y-2">
              {stocks.slice(0, 4).map((s) => {
                const up = s.change >= 0
                const path = sparkPath(s.series?.slice(-24) ?? [], 88, 28)
                return (
                  <div
                    key={s.ticker}
                    className="flex items-center gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/10"
                  >
                    <svg width="88" height="28" className="shrink-0" aria-hidden>
                      <path
                        d={path}
                        fill="none"
                        stroke={up ? '#4ade80' : '#f87171'}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-bold text-white">{s.ticker}</p>
                      <p className={`text-xs font-semibold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {s.currency}
                        {s.price.toFixed(2)} ({up ? '+' : ''}
                        {s.changePct.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>
      </div>

      <p className="mx-auto max-w-[1600px] px-6 pb-4 text-center text-[10px] text-white/35">
        Parody UI — not affiliated with any video platform. Same inbox, weather, news &amp; stocks as everywhere else.
      </p>
    </div>
  )
}
