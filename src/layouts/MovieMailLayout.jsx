import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n))
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

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

function fakeRuntimeMinutes(id) {
  return 74 + ((id * 7919) % 37)
}

function tomatometerFromChangePct(pct) {
  const x = clamp(50 + pct * 6.5, 6, 99)
  return Math.round(x)
}

function starRatingFromChangePct(pct) {
  const stars = clamp(Math.round(3 + pct / 3), 1, 5)
  return '★'.repeat(stars) + '☆'.repeat(5 - stars)
}

const SCENE_QUIPS = [
  'Cue the dramatic zoom on “unread”.',
  'This scene is rated PG: Pretty Gmail.',
  'Someone in the audience just checked their phone. Shame.',
  'The composer swells. It is just a shipping notification.',
  'Cut to: you pretending this is “research”.',
]

export default function MovieMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const reducedMotion = useReducedMotion()

  const playing = selectedEmail ?? emails[0]
  const ix = useMemo(() => emails.findIndex((e) => e.id === playing.id), [playing.id])

  const [isPlaying, setIsPlaying] = useState(true)
  const [sceneTick, setSceneTick] = useState(0)
  const [quip, setQuip] = useState(SCENE_QUIPS[0])

  const goPrev = useCallback(() => {
    const n = (ix - 1 + emails.length) % emails.length
    setSelectedEmail(emails[n])
  }, [ix, setSelectedEmail])

  const goNext = useCallback(() => {
    const n = (ix + 1) % emails.length
    setSelectedEmail(emails[n])
  }, [ix, setSelectedEmail])

  useEffect(() => {
    if (!isPlaying || reducedMotion) return undefined
    const t = window.setInterval(() => {
      goNext()
      setSceneTick((x) => x + 1)
    }, 9000)
    return () => window.clearInterval(t)
  }, [goNext, isPlaying, reducedMotion])

  useEffect(() => {
    setQuip(SCENE_QUIPS[sceneTick % SCENE_QUIPS.length])
  }, [sceneTick])

  const tickerNews = useMemo(() => news.map((n) => `${n.emoji} ${n.title}`).join('   ·   '), [])
  const tickerStocks = useMemo(
    () => stocks.map((s) => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct).toFixed(1)}%`).join('   '),
    [],
  )

  // Popcorn canvas (lightweight; disabled when reduced motion)
  const popRef = useRef(null)
  useEffect(() => {
    const canvas = popRef.current
    if (!canvas || reducedMotion) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf = 0
    let w = 1
    let h = 1
    const kernels = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.85 + 0.1,
      r: 1.2 + Math.random() * 2.2,
      vy: 0.00035 + Math.random() * 0.00075,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.floor(rect.width * dpr))
      h = Math.max(1, Math.floor(rect.height * dpr))
      canvas.width = w
      canvas.height = h
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = 0.85
      const dpr = window.devicePixelRatio || 1
      for (const k of kernels) {
        k.y += k.vy
        k.rot += k.vr
        if (k.y > 1.08) k.y = -0.05
        const x = k.x * w
        const y = k.y * h
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(k.rot)
        ctx.fillStyle = '#fff6d6'
        ctx.strokeStyle = 'rgba(255, 215, 120, 0.55)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(0, 0, k.r * dpr, k.r * 0.85 * dpr, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reducedMotion])

  const runtime = fakeRuntimeMinutes(playing.id)

  return (
    <div
      className="relative min-h-full overflow-x-hidden pb-6 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'radial-gradient(1200px 700px at 50% 10%, rgba(255, 60, 172, 0.22), transparent 60%), radial-gradient(900px 600px at 20% 30%, rgba(43, 210, 255, 0.18), transparent 55%), linear-gradient(180deg, #07060a 0%, #0b0712 45%, #07060a 100%)',
      }}
    >
      <style>{`
        @keyframes mm-beam {
          0% { transform: rotate(-10deg) translateY(0); opacity: 0.55; }
          50% { transform: rotate(-6deg) translateY(-10px); opacity: 0.75; }
          100% { transform: rotate(-10deg) translateY(0); opacity: 0.55; }
        }
        @keyframes mm-flicker {
          0%, 100% { opacity: 0.92; }
          48% { opacity: 0.86; }
          50% { opacity: 0.98; }
          52% { opacity: 0.88; }
        }
        @keyframes mm-reel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes mm-credits {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes mm-pop-glow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,0,0,0.55), 0 0 40px rgba(255, 60, 172, 0.18); }
          50% { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 22px 70px rgba(0,0,0,0.62), 0 0 55px rgba(43, 210, 255, 0.16); }
        }
        .mm-reel {
          animation: mm-reel 6.5s linear infinite;
        }
        .mm-marquee-track {
          animation: mm-marquee 28s linear infinite;
        }
        .mm-credits-col {
          animation: mm-credits 46s linear infinite;
        }
        .mm-screen-flicker {
          animation: mm-flicker 3.8s ease-in-out infinite;
        }
        .mm-beam {
          animation: mm-beam 6.2s ease-in-out infinite;
        }
        .mm-popcorn-glow {
          animation: mm-pop-glow 4.2s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative beams */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className={`absolute -left-40 top-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-b from-fuchsia-500/25 to-transparent blur-2xl ${reducedMotion ? '' : 'mm-beam'}`}
        />
        <div
          className={`absolute -right-48 top-[-140px] h-[560px] w-[560px] rounded-full bg-gradient-to-b from-cyan-400/20 to-transparent blur-2xl ${reducedMotion ? '' : 'mm-beam'}`}
          style={{ animationDelay: '-2.2s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_55%)] opacity-40" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07060a]/80 px-3 py-3 backdrop-blur-md sm:px-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn btn-ghost btn-sm gap-2 border border-white/10 text-white hover:bg-white/10"
            aria-label="Exit theater"
          >
            <span className="text-lg" aria-hidden>
              🎟️
            </span>
            <span className="font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
              EXIT THEATER
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[0.35em] text-white/60">
              NOW SHOWING · INBOX CINEMA 01
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <span className="badge badge-lg border border-white/10 bg-white/5 font-bold text-white">
              Scene {ix + 1}/{emails.length}
            </span>
            <span className="badge badge-lg border-0 bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white">
              {emails.filter((e) => !e.read).length} unread cliffhangers
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl gap-4 px-3 py-4 lg:grid-cols-[320px_1fr] lg:gap-5 lg:px-5">
        {/* Left: program + box office */}
        <aside className="flex min-w-0 flex-col gap-4">
          <section className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.35em] text-white/45">PROGRAM</p>
                <h2 className="mt-1 text-2xl leading-none text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  TONIGHT&apos;S FEATURES
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold tracking-widest text-white/45">ATMOSPHERE</p>
                <p className="text-3xl leading-none" aria-hidden>
                  {weather.icon}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-3">
              <p className="text-xs font-semibold text-white/70">
                {weather.city} · <span className="tabular-nums">{weather.temp}°C</span>
              </p>
              <p className="mt-1 text-sm text-white/80">{weather.condition}</p>
              <p className="mt-2 text-xs text-white/45">
                Feels <span className="tabular-nums">{weather.feels_like}°</span> · wind{' '}
                <span className="tabular-nums">{weather.wind} km/h</span> · humidity{' '}
                <span className="tabular-nums">{weather.humidity}%</span>
              </p>
              <p className="mt-2 text-[11px] italic text-white/40">
                (Lighting department says this weather is “motivated”.)
              </p>
            </div>

            <ul className="mt-4 max-h-[min(52dvh,560px)] space-y-2 overflow-y-auto pr-1">
              {emails.map((e, i) => {
                const on = e.id === playing.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-colors ${
                        on ? 'border-fuchsia-400/60 bg-fuchsia-500/10' : 'border-white/10 bg-black/15 hover:bg-white/5'
                      }`}
                    >
                      <div className="relative flex size-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-600/35 to-cyan-500/25 text-2xl shadow-inner">
                        {e.from.avatar}
                        {!e.read && (
                          <span className="badge badge-xs absolute -right-2 -top-2 border-0 bg-amber-400 text-black">NEW</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold tracking-widest text-white/45">SCENE {i + 1}</p>
                        <p className="line-clamp-2 text-sm font-bold leading-snug text-white">{e.subject}</p>
                        <p className="mt-1 truncate text-xs text-white/55">{e.from.name}</p>
                        <p className="mt-1 text-[11px] text-white/40">
                          Runtime ~{fakeRuntimeMinutes(e.id)}m · {e.date}
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.35em] text-white/45">BOX OFFICE</p>
                <h3 className="text-2xl leading-none text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  OPENING WEEKEND
                </h3>
              </div>
              <span className="badge badge-ghost border border-white/15 text-white/70">stonk posters</span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {stocks.map((s) => {
                const fresh = tomatometerFromChangePct(s.changePct)
                const stars = starRatingFromChangePct(s.changePct)
                const up = s.changePct >= 0
                const path = sparkPath(s.series?.slice(-28) ?? [], 120, 44)
                return (
                  <div key={s.ticker} className="rounded-xl border border-white/10 bg-black/25 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold tracking-widest text-white/45">{s.ticker}</p>
                        <p className="text-sm font-semibold text-white/85">{s.name}</p>
                      </div>
                      <span className={`badge ${up ? 'badge-success' : 'badge-error'} badge-sm`}>
                        {up ? 'HIT' : 'FLOP'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <svg width="120" height="44" className="shrink-0" aria-hidden>
                        <path
                          d={path}
                          fill="none"
                          stroke={up ? 'rgba(74, 222, 128, 0.95)' : 'rgba(248, 113, 113, 0.95)'}
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-black tabular-nums text-white">
                          {s.currency}
                          {s.price.toFixed(2)}
                        </p>
                        <p className={`text-xs font-bold tabular-nums ${up ? 'text-success' : 'text-error'}`}>
                          {up ? '+' : ''}
                          {s.changePct.toFixed(2)}% session
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                      <span>
                        Tomatometer: <span className="font-bold text-white">{fresh}%</span>
                      </span>
                      <span className="tracking-widest text-amber-300">{stars}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </aside>

        {/* Right: screen */}
        <section className="min-w-0">
          <div
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md ${reducedMotion ? '' : 'mm-popcorn-glow'}`}
          >
            {/* Film perforations */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-2 py-2" aria-hidden>
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={`t-${i}`} className="h-3 w-4 rounded-sm bg-black/80 ring-1 ring-white/15" />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-between px-2 py-2" aria-hidden>
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={`b-${i}`} className="h-3 w-4 rounded-sm bg-black/80 ring-1 ring-white/15" />
              ))}
            </div>

            <div className="relative px-3 pb-4 pt-10 sm:px-5 sm:pb-5 sm:pt-12">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.35em] text-white/45">FEATURE PRESENTATION</p>
                  <h1 className="mt-1 text-balance text-3xl leading-[0.95] text-white sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {playing.subject}
                  </h1>
                  <p className="mt-2 text-sm text-white/65">
                    Starring <span className="font-semibold text-white">{playing.from.name}</span> · {playing.date}{' '}
                    <span className="tabular-nums">{playing.time}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className={`btn btn-sm ${isPlaying ? 'btn-success' : 'btn-warning'} gap-2 font-bold`}
                    onClick={() => setIsPlaying((p) => !p)}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? '⏸ Pause' : '▶ Resume'}
                  </button>
                  <button type="button" className="btn btn-sm btn-ghost border border-white/15 text-white hover:bg-white/10" onClick={goPrev}>
                    ⏮ Prev
                  </button>
                  <button type="button" className="btn btn-sm btn-ghost border border-white/15 text-white hover:bg-white/10" onClick={goNext}>
                    Next ⏭
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
                {/* Canvas */}
                <div className="relative">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(900px 500px at 30% 20%, rgba(255, 60, 172, 0.35), transparent 55%), radial-gradient(800px 520px at 70% 30%, rgba(43, 210, 255, 0.28), transparent 55%), linear-gradient(145deg, #120a1a 0%, #07060a 55%, #0b1220 100%)',
                      }}
                    />

                    {/* Subtle grain */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                      aria-hidden
                    />

                    {/* Vignette + flicker */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_40%,rgba(0,0,0,0.72)_100%)] ${reducedMotion ? '' : 'mm-screen-flicker'}`}
                      aria-hidden
                    />

                    {/* Giant emoji “lead actor” */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="flex items-center gap-4">
                        <div
                          className={`hidden size-16 items-center justify-center rounded-full border border-white/10 bg-black/25 sm:grid ${reducedMotion ? '' : 'mm-reel'}`}
                          aria-hidden
                        >
                          <span className="text-2xl">🎞️</span>
                        </div>
                        <div className={`text-[clamp(4rem,16vw,7.5rem)] leading-none drop-shadow-[0_18px_60px_rgba(0,0,0,0.55)] ${reducedMotion ? '' : 'mm-screen-flicker'}`} aria-hidden>
                          {playing.from.avatar}
                        </div>
                        <div
                          className={`hidden size-16 items-center justify-center rounded-full border border-white/10 bg-black/25 sm:grid ${reducedMotion ? '' : 'mm-reel'}`}
                          style={{ animationDirection: 'reverse' }}
                          aria-hidden
                        >
                          <span className="text-2xl">🎞️</span>
                        </div>
                      </div>

                      {!playing.read && (
                        <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black tracking-widest text-black shadow-lg">
                          WORLD PREMIERE (UNREAD)
                        </span>
                      )}

                      <p className="max-w-prose text-balance text-base font-semibold text-white/85 sm:text-lg">
                        {playing.preview}
                      </p>

                      <p className="text-xs text-white/45" aria-live="polite">
                        Director’s note: {quip}
                      </p>
                    </div>

                    {/* Popcorn layer */}
                    <canvas ref={popRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-55 mix-blend-screen" />

                    {/* Lower third */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                      <div className="rounded-xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
                        <p className="text-[10px] font-bold tracking-[0.35em] text-white/45">LOWER THIRD</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {playing.from.name} · <span className="text-white/70">{playing.from.email}</span>
                        </p>
                        <p className="mt-1 text-xs text-white/60">
                          Tag: <span className="font-bold text-white">{playing.tag}</span> · Runtime ~{runtime}m (don’t ask how we measured an email)
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[11px] text-white/40">
                    Tip: this auto-advances scenes every 9s (like a chaotic film festival). Pause if you need popcorn refills.
                  </p>
                </div>

                {/* Credits column */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                  <div className="border-b border-white/10 bg-gradient-to-r from-fuchsia-600/25 to-cyan-500/20 px-4 py-3">
                    <p className="text-[10px] font-bold tracking-[0.35em] text-white/55">END CREDITS (NEWS)</p>
                    <p className="mt-1 text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      SCROLLING BECAUSE DRAMA
                    </p>
                  </div>

                  <div className="relative h-[min(52dvh,520px)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-black/70 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className={`h-full overflow-hidden px-4 ${reducedMotion ? 'py-4' : ''}`}>
                      <div className={reducedMotion ? 'space-y-3 py-2' : 'mm-credits-col space-y-10 py-6'}>
                        {[0, 1].map((dup) => (
                          <div key={dup} className="space-y-8">
                            {news.map((n) => (
                              <div key={`${dup}-${n.id}`} className="text-center">
                                <p className="text-4xl" aria-hidden>
                                  {n.emoji}
                                </p>
                                <p className="mt-2 text-sm font-bold text-white">{n.title}</p>
                                <p className="mt-1 text-xs text-white/45">
                                  {n.source} · {n.time} · {n.category}
                                </p>
                              </div>
                            ))}
                            <div className="text-center">
                              <p className="text-xs font-black tracking-[0.45em] text-white/35">A FILM BY YOUR NOTIFICATIONS</p>
                              <p className="mt-2 text-sm text-white/55">No emails were harmed in the making of this scroll.</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-[10px] font-bold tracking-[0.35em] text-white/45">SCREENPLAY</p>
                <div className="mt-2 max-h-[min(40dvh,360px)] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                  {playing.body}
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-3 max-w-3xl text-center text-[10px] text-white/35">
            Parody cinema UI — not affiliated with any studio. Same inbox, weather, news &amp; stocks as the rest of the app.
          </p>
        </section>
      </main>

      {/* Marquee tickers */}
      <div className="pointer-events-none fixed bottom-[calc(3.25rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[90] overflow-hidden border-y border-white/10 bg-black/55 backdrop-blur-md">
        {reducedMotion ? (
          <div className="px-4 py-2 font-mono text-[10px] text-white/80">
            <span className="line-clamp-2">
              MARKETS: {tickerStocks} · WEATHER: {weather.city} {weather.temp}° {weather.condition} · HEADLINES: {tickerNews}
            </span>
          </div>
        ) : (
          <div className="flex w-[200%] mm-marquee-track py-2 font-mono text-[10px] text-white/80">
            <span className="w-1/2 px-6">
              MARKETS: {tickerStocks} · WEATHER: {weather.city} {weather.temp}° {weather.condition} · HEADLINES: {tickerNews}
            </span>
            <span className="w-1/2 px-6" aria-hidden>
              MARKETS: {tickerStocks} · HEADLINES: {tickerNews}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
