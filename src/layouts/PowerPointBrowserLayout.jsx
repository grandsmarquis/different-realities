import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SLIDE_META = [
  { id: 'title', label: 'Title', thumb: '📌' },
  { id: 'inbox', label: 'Inbox', thumb: '📧' },
  { id: 'weather', label: 'Weather', thumb: '⛅' },
  { id: 'news', label: 'News', thumb: '📰' },
  { id: 'stocks', label: 'Stocks', thumb: '📈' },
  { id: 'end', label: 'Thanks', thumb: '👏' },
]

function MiniSpark({ series, positive }) {
  if (!series?.length) return null
  const slice = series.slice(-12)
  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const r = max - min || 1
  const w = 48
  const h = 20
  const pts = slice
    .map((v, i) => {
      const x = (i / (slice.length - 1 || 1)) * w
      const y = h - ((v - min) / r) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} className="inline-block align-middle" aria-hidden>
      <polyline fill="none" stroke={positive ? '#0f766e' : '#be123c'} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function PowerPointBrowserLayout({ onSwitchPersona }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [transitionDir, setTransitionDir] = useState(1)
  const [buildStep, setBuildStep] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [laserOn, setLaserOn] = useState(false)
  const [laser, setLaser] = useState({ x: 0.5, y: 0.5 })
  const [openedEmail, setOpenedEmail] = useState(null)
  const deckRef = useRef(null)

  const total = SLIDE_META.length
  const current = SLIDE_META[slideIndex]

  const go = useCallback(
    delta => {
      setSlideIndex(i => {
        const n = i + delta
        if (n < 0 || n >= total) return i
        setTransitionDir(delta > 0 ? 1 : -1)
        setBuildStep(0)
        return n
      })
    },
    [total]
  )

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        go(1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      }
      if (e.key === 'Home') {
        e.preventDefault()
        setSlideIndex(0)
        setBuildStep(0)
      }
      if (e.key === 'End') {
        e.preventDefault()
        setSlideIndex(total - 1)
        setBuildStep(0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, total])

  useEffect(() => {
    const id = window.setInterval(() => {
      setBuildStep(s => (s >= 48 ? s : s + 1))
    }, 420)
    return () => window.clearInterval(id)
  }, [slideIndex])

  const notes = useMemo(() => {
    const map = {
      title: 'Smile. Nod. Pretend the deck loaded on the first try.',
      inbox: 'If someone asks “why email in slides?” — pivot to “visual storytelling.”',
      weather: 'Point at the cloud emoji like it owes you money.',
      news: 'Read headlines slowly. It adds gravitas (and stalls for time).',
      stocks: 'If a line goes down, say “market correction” in a calm voice.',
      end: 'Do not actually ask for questions unless you have snacks.',
    }
    return map[current.id] ?? ''
  }, [current.id])

  function onDeckMove(e) {
    if (!laserOn || !deckRef.current) return
    const r = deckRef.current.getBoundingClientRect()
    setLaser({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }

  return (
    <div className="ppt-root relative min-h-dvh overflow-x-hidden bg-[#1c1c1c] pb-24 text-[#1a1a1a]">
      <style>{`
        @keyframes ppt-slide-in-right {
          from { opacity: 0; transform: translateX(28px) scale(0.985); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ppt-slide-in-left {
          from { opacity: 0; transform: translateX(-28px) scale(0.985); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ppt-wordart {
          0%, 100% { filter: hue-rotate(0deg); transform: skewX(-2deg) scale(1); }
          50% { filter: hue-rotate(25deg); transform: skewX(2deg) scale(1.02); }
        }
        @keyframes ppt-float-shape {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(6px, -8px) rotate(4deg); }
          66% { transform: translate(-4px, 6px) rotate(-3deg); }
        }
        @keyframes ppt-bar-grow {
          from { transform: scaleY(0); transform-origin: bottom center; }
          to { transform: scaleY(1); transform-origin: bottom center; }
        }
        @keyframes ppt-laser-pulse {
          0%, 100% { opacity: 0.95; box-shadow: 0 0 8px 4px rgba(255,0,0,0.45); }
          50% { opacity: 1; box-shadow: 0 0 14px 6px rgba(255,0,0,0.55); }
        }
        @keyframes ppt-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .ppt-slide-anim-next {
          animation: ppt-slide-in-right 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ppt-slide-anim-prev {
          animation: ppt-slide-in-left 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ppt-wordart-title {
          animation: ppt-wordart 5s ease-in-out infinite;
        }
        .ppt-float-deco {
          animation: ppt-float-shape 9s ease-in-out infinite;
        }
        .ppt-bar {
          animation: ppt-bar-grow 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .ppt-laser-dot {
          animation: ppt-laser-pulse 1.2s ease-in-out infinite;
        }
        .ppt-ribbon-shimmer {
          background: linear-gradient(105deg, #b91c1c, #ea580c, #ca8a04, #ea580c, #b91c1c);
          background-size: 200% 100%;
          animation: ppt-shimmer 4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ppt-slide-anim-next,
          .ppt-slide-anim-prev,
          .ppt-wordart-title,
          .ppt-float-deco,
          .ppt-bar,
          .ppt-laser-dot,
          .ppt-ribbon-shimmer {
            animation: none !important;
          }
          .ppt-ribbon-shimmer { background: #c2410c; }
        }
      `}</style>

      {/* Stage background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(234,88,12,0.25), transparent),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(185,28,28,0.2), transparent),
            linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)
          `,
        }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex min-h-dvh max-w-5xl flex-col px-2 py-3 sm:px-4 sm:py-4">
        {/* Fake Office chrome */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-white/10 bg-[#2d2d2d] px-2 py-1.5 text-xs text-white/90">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-lg" aria-hidden>
              📊
            </span>
            <span className="truncate font-medium">
              QUARTERLY_LIFE_UPDATE.pptx — PowerPoint (Slide Show)
            </span>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-1">
            <button
              type="button"
              className={`btn btn-xs ${laserOn ? 'btn-error text-white' : 'btn-ghost text-white/80 hover:bg-white/10'}`}
              onClick={() => setLaserOn(v => !v)}
            >
              {laserOn ? '🔴 Laser on' : '⚪ Laser'}
            </button>
            <button
              type="button"
              className="btn btn-xs btn-ghost text-white/80 hover:bg-white/10"
              onClick={() => setNotesOpen(v => !v)}
            >
              {notesOpen ? '📝 Hide notes' : '📝 Notes'}
            </button>
            <button
              type="button"
              className="btn btn-xs btn-ghost text-white/80 hover:bg-red-600/80"
              aria-label="Exit slideshow"
              onClick={() => onSwitchPersona?.()}
            >
              ✕ End show
            </button>
          </div>
        </div>

        <div className="ppt-ribbon-shimmer flex shrink-0 flex-wrap gap-1 rounded-b-md px-2 py-1 text-[10px] font-medium text-white shadow-md">
          {['File', 'Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Review'].map((t, i) => (
            <span
              key={t}
              className={`rounded px-2 py-0.5 ${i === 6 ? 'bg-white/25' : 'hover:bg-white/10'}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Slide canvas */}
        <div
          ref={deckRef}
          className="relative mt-2 flex min-h-[min(62vh,480px)] flex-1 flex-col overflow-hidden rounded-lg border-4 border-[#404040] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          onMouseMove={onDeckMove}
          onMouseLeave={() => laserOn && setLaser({ x: 0.5, y: 0.5 })}
        >
          {laserOn && (
            <div
              className="ppt-laser-dot pointer-events-none absolute z-50 h-3 w-3 rounded-full bg-red-500"
              style={{
                left: `calc(${laser.x * 100}% - 6px)`,
                top: `calc(${laser.y * 100}% - 6px)`,
              }}
              aria-hidden
            />
          )}

          <div
            key={slideIndex}
            className={`relative flex min-h-[min(58vh,440px)] flex-1 flex-col ${transitionDir >= 0 ? 'ppt-slide-anim-next' : 'ppt-slide-anim-prev'}`}
          >
            {/* Title slide */}
            {current.id === 'title' && (
              <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100 p-6 sm:p-10">
                <div
                  className="ppt-float-deco pointer-events-none absolute -right-8 top-6 h-24 w-24 rounded-full bg-gradient-to-br from-orange-400/40 to-red-500/30 blur-sm"
                  aria-hidden
                />
                <div
                  className="ppt-float-deco pointer-events-none absolute bottom-10 left-4 h-16 w-32 rounded-full bg-teal-400/25 blur-md"
                  style={{ animationDelay: '-3s' }}
                  aria-hidden
                />
                <svg
                  className="pointer-events-none absolute right-[12%] top-[18%] h-20 w-20 text-orange-500/35 motion-reduce:opacity-20"
                  viewBox="0 0 100 100"
                  aria-hidden
                >
                  <polygon points="50,5 95,95 5,95" fill="currentColor" />
                </svg>
                <svg
                  className="pointer-events-none absolute bottom-[22%] left-[8%] h-14 w-14 text-rose-400/40 motion-reduce:opacity-20"
                  viewBox="0 0 100 100"
                  aria-hidden
                >
                  <rect x="10" y="10" width="80" height="80" rx="8" fill="currentColor" />
                </svg>
                <h1 className="ppt-wordart-title m-0 text-center text-3xl font-black leading-tight text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 drop-shadow-sm">
                  Your Digital Life
                </h1>
                <p className="mt-4 text-center text-lg font-semibold text-orange-900/80 sm:text-2xl">
                  Executive Summary (Definitely Not a Website)
                </p>
                <p className="mx-auto mt-6 max-w-md text-center text-sm text-orange-950/70">
                  Use <kbd className="kbd kbd-sm">→</kbd> or the buttons below — just like a real meeting that could
                  have been an email.
                </p>
                {buildStep > 2 && (
                  <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.3em] text-red-700/60 motion-safe:animate-pulse">
                    Confidential · For internal vibes only
                  </p>
                )}
              </div>
            )}

            {/* Inbox slide */}
            {current.id === 'inbox' && (
              <div className="flex flex-1 flex-col bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">
                <div className="mb-4 border-b-4 border-orange-500 pb-2">
                  <h2 className="m-0 text-2xl font-bold text-slate-800 sm:text-3xl">Slide 2: Inbox highlights</h2>
                  <p className="m-0 mt-1 text-sm text-slate-500">Bulleted for maximum corporate drama</p>
                </div>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {emails.map((e, i) => {
                    const show = buildStep > i || buildStep > 12
                    if (!show) return null
                    return (
                      <li
                        key={e.id}
                        className="motion-safe:animate-[ppt-slide-in-right_0.4s_ease-out_both] flex items-start gap-3 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 shadow-sm"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <span className="text-xl">{e.from.avatar}</span>
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm h-auto min-h-0 w-full justify-start whitespace-normal border-0 bg-transparent p-0 text-left font-normal normal-case hover:bg-orange-50"
                            onClick={() => setOpenedEmail(e)}
                          >
                            <span className="font-bold text-slate-800">{e.subject}</span>
                            <span className="block text-xs text-slate-500">
                              {e.from.name} · {e.time}
                            </span>
                          </button>
                        </div>
                        <span className="shrink-0 text-lg">{e.read ? '○' : '●'}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Weather slide */}
            {current.id === 'weather' && (
              <div className="flex flex-1 flex-col bg-gradient-to-br from-sky-100 via-white to-indigo-50 p-4 sm:p-8">
                <h2 className="m-0 text-2xl font-bold text-sky-900 sm:text-4xl">
                  {buildStep > 0 && 'Atmospheric KPIs'}
                </h2>
                <div className="mt-6 flex flex-wrap items-end gap-6">
                  <div
                    className={`text-8xl motion-safe:transition-transform motion-safe:duration-500 ${buildStep > 1 ? 'motion-safe:scale-100' : 'scale-90 opacity-70'}`}
                    aria-hidden
                  >
                    {weather.icon}
                  </div>
                  <div>
                    <p className="m-0 text-4xl font-black text-sky-800 sm:text-6xl">
                      {buildStep > 2 && `${weather.temp}°C`}
                    </p>
                    <p className="m-0 text-lg text-sky-700/80">
                      {buildStep > 3 && `${weather.city}, ${weather.country}`}
                    </p>
                    <p className="m-0 text-sm text-sky-600/90">{buildStep > 4 && weather.condition}</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {weather.forecast.map((f, i) =>
                    buildStep > 5 + i ? (
                      <div
                        key={f.day}
                        className="rounded-xl border-2 border-sky-200 bg-white/90 px-4 py-2 text-center shadow-md motion-safe:animate-[ppt-slide-in-right_0.35s_ease-out_both]"
                      >
                        <div className="text-xs font-bold uppercase text-sky-600">{f.day}</div>
                        <div className="text-2xl">{f.icon}</div>
                        <div className="text-sm font-semibold text-slate-700">
                          {f.high}° / {f.low}°
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
                <p className="mt-auto text-xs text-sky-800/50">
                  Humidity {weather.humidity}% · Wind {weather.wind} km/h · Feels like {weather.feels_like}°C
                </p>
              </div>
            )}

            {/* News slide */}
            {current.id === 'news' && (
              <div className="flex flex-1 flex-col bg-gradient-to-b from-amber-50 to-white p-4 sm:p-6">
                <h2 className="m-0 border-l-8 border-amber-500 pl-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Breaking slides
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {news.map((n, i) =>
                    buildStep > i ? (
                      <div
                        key={n.id}
                        className="flex gap-3 rounded-r-xl border border-l-4 border-l-amber-500 border-slate-200 bg-white px-3 py-2 shadow motion-safe:animate-[ppt-slide-in-right_0.4s_ease-out_both]"
                      >
                        <span className="text-2xl">{n.emoji}</span>
                        <div className="min-w-0">
                          <p className="m-0 font-semibold text-slate-800">{n.title}</p>
                          <p className="m-0 text-xs text-slate-500">
                            {n.source} · {n.time}
                          </p>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Stocks slide */}
            {current.id === 'stocks' && (
              <div className="flex flex-1 flex-col bg-gradient-to-br from-emerald-50 via-white to-slate-100 p-4 sm:p-6">
                <h2 className="m-0 text-2xl font-bold text-emerald-900 sm:text-3xl">Stonks &amp; sparklines</h2>
                <p className="m-0 mt-1 text-sm text-emerald-800/70">Animated bars because leadership loves motion</p>
                <div className="mt-6 flex h-40 items-end justify-center gap-3 sm:h-48 sm:gap-5">
                  {stocks.map((s, i) => {
                    const pos = s.changePct >= 0
                    const barPx = 32 + Math.min(112, Math.abs(s.changePct) * 22)
                    const show = buildStep > i
                    return show ? (
                      <div key={s.ticker} className="flex h-36 flex-col items-center justify-end gap-2 sm:h-44">
                        <div
                          className="ppt-bar w-10 rounded-t-md sm:w-12"
                          style={{
                            height: `${barPx}px`,
                            animationDelay: `${i * 0.12}s`,
                            background: pos
                              ? 'linear-gradient(to top, #047857, #2dd4bf)'
                              : 'linear-gradient(to top, #9f1239, #fb7185)',
                          }}
                        />
                        <span className="font-mono text-xs font-bold text-slate-800">{s.ticker}</span>
                        <span className={`font-mono text-[10px] font-semibold ${pos ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {pos ? '+' : ''}
                          {s.changePct}%
                        </span>
                      </div>
                    ) : null
                  })}
                </div>
                <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white/95">
                  <table className="w-full min-w-[280px] border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="p-2 font-semibold">Ticker</th>
                        <th className="p-2 font-semibold">Price</th>
                        <th className="p-2 font-semibold">Chart</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stocks.map(s => {
                        const pos = s.changePct >= 0
                        return (
                          <tr key={s.ticker} className="border-t border-slate-100">
                            <td className="p-2 font-mono font-bold text-emerald-800">{s.ticker}</td>
                            <td className="p-2 font-mono">
                              {s.currency}
                              {s.price.toFixed(2)}
                            </td>
                            <td className="p-2">
                              <MiniSpark series={s.series} positive={pos} />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* End slide */}
            {current.id === 'end' && (
              <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 p-6 text-center text-white">
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.06) 12px, rgba(255,255,255,0.06) 24px)`,
                  }}
                  aria-hidden
                />
                <span className="text-7xl motion-safe:animate-bounce" aria-hidden>
                  🎉
                </span>
                <h2 className="relative z-[1] m-0 mt-4 text-3xl font-black sm:text-5xl">Thank you!</h2>
                <p className="relative z-[1] m-0 mt-3 max-w-sm text-lg text-white/90">
                  Any questions?
                  <span className="block text-sm text-white/70">(The correct answer is “no, this was perfect.”)</span>
                </p>
                {buildStep > 3 && (
                  <p className="relative z-[1] mt-8 font-mono text-xs text-white/60">[End of slide show] Click home in the footer to escape.</p>
                )}
              </div>
            )}
          </div>

          {/* Thumbnail filmstrip */}
          <div className="flex shrink-0 gap-1 overflow-x-auto border-t border-slate-200 bg-slate-100 p-2">
            {SLIDE_META.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setTransitionDir(i > slideIndex ? 1 : -1)
                  setSlideIndex(i)
                  setBuildStep(0)
                }}
                className={`flex min-w-[4.5rem] flex-col items-center rounded border-2 px-2 py-1 text-[10px] font-medium transition-colors ${
                  i === slideIndex
                    ? 'border-orange-500 bg-orange-50 text-orange-900'
                    : 'border-transparent bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="text-lg">{s.thumb}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Presenter notes */}
        {notesOpen && (
          <div className="mt-2 rounded-lg border border-amber-900/30 bg-amber-950/90 p-3 text-sm text-amber-100 shadow-lg">
            <p className="m-0 font-bold text-amber-200">Speaker notes</p>
            <p className="m-0 mt-1 leading-relaxed">{notes}</p>
          </div>
        )}

        {/* Controls */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-sm btn-neutral gap-1 text-white"
              disabled={slideIndex <= 0}
              onClick={() => go(-1)}
            >
              ← Previous
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary gap-1"
              disabled={slideIndex >= total - 1}
              onClick={() => go(1)}
            >
              Next →
            </button>
          </div>
          <p className="m-0 font-mono text-xs text-white/70">
            Slide {slideIndex + 1} of {total} · {current.label}
          </p>
        </div>
      </div>

      {/* Email “lightbox” */}
      {openedEmail && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-2 sm:items-center" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close"
            onClick={() => setOpenedEmail(null)}
          />
          <div className="relative z-[1] w-full max-w-lg overflow-hidden rounded-xl border-4 border-orange-500 bg-white shadow-2xl">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 px-3 py-2 text-white">
              <span>{openedEmail.from.avatar}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{openedEmail.subject}</span>
              <button type="button" className="btn btn-ghost btn-xs text-white hover:bg-white/20" onClick={() => setOpenedEmail(null)}>
                ✕
              </button>
            </div>
            <div className="max-h-[min(50vh,380px)] overflow-auto p-4 text-sm">
              <p className="m-0 text-xs text-slate-500">
                From {openedEmail.from.name} &lt;{openedEmail.from.email}&gt; · {openedEmail.date} {openedEmail.time}
              </p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-slate-800">{openedEmail.body}</pre>
            </div>
            <div className="flex justify-end border-t border-slate-200 bg-slate-50 p-2">
              <button type="button" className="btn btn-sm btn-primary" onClick={() => setOpenedEmail(null)}>
                Back to slides
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
