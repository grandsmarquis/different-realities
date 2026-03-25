import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TABS = [
  { key: 'inbox', label: 'INBOX', blurb: 'Postal Channel', icon: '📬' },
  { key: 'weather', label: 'WEATHER', blurb: 'Sky Box', icon: '🌤️' },
  { key: 'news', label: 'NEWS', blurb: 'Globe 64', icon: '📰' },
  { key: 'stocks', label: 'STONKS', blurb: 'Wall St. RAM', icon: '📈' },
]

export default function NintendoN64Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [tab, setTab] = useState(0)
  const [warping, setWarping] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const goTab = useCallback(
    next => {
      if (next === tab) return
      if (reducedMotion) {
        setTab(next)
        return
      }
      setWarping(true)
      window.setTimeout(() => {
        setTab(next)
        setWarping(false)
      }, 220)
    },
    [reducedMotion, tab],
  )

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTab((tab + TABS.length - 1) % TABS.length)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goTab((tab + 1) % TABS.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTab, tab])

  const ticker = useMemo(
    () =>
      [
        ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct).toFixed(2)}%`),
        ...news.slice(0, 4).map(n => n.title),
      ].join('   ·   '),
    [],
  )

  const current = TABS[tab]

  return (
    <div
      className="n64-root relative min-h-full overflow-x-hidden px-2 py-4 sm:px-4 sm:py-6"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'radial-gradient(ellipse 100% 80% at 50% 0%, #3d2a5c 0%, #1a0f2e 42%, #08040e 100%)',
        color: 'var(--text)',
      }}
    >
      <style>{`
        @keyframes n64-stars {
          from { transform: translateY(0); }
          to { transform: translateY(-120px); }
        }
        @keyframes n64-float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-6px) rotateY(6deg); }
        }
        @keyframes n64-pulse-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(244, 196, 48, 0.45), inset 0 1px 0 rgba(255,255,255,0.12); }
          50% { box-shadow: 0 0 22px rgba(244, 196, 48, 0.75), inset 0 1px 0 rgba(255,255,255,0.18); }
        }
        @keyframes n64-warp {
          0% { transform: scale(1); filter: blur(0); opacity: 1; }
          45% { transform: scale(1.04); filter: blur(6px); opacity: 0.35; }
          100% { transform: scale(1); filter: blur(0); opacity: 1; }
        }
        @keyframes n64-rumble {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(0.5px, -0.5px); }
          50% { transform: translate(-0.5px, 0.5px); }
          75% { transform: translate(0.5px, 0.5px); }
        }
        .group\\/card:hover .n64-controller-shake {
          animation: n64-rumble 0.12s linear infinite;
        }
        @keyframes n64-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes n64-scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(8px); }
        }
        .n64-stars-layer {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 35% 70%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 90% 85%, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 50% 10%, rgba(244,196,48,0.4), transparent);
          background-size: 100% 240px;
          animation: n64-stars ${reducedMotion ? '0s' : '18s'} linear infinite;
        }
        .n64-warp-panel {
          animation: ${reducedMotion || !warping ? 'none' : 'n64-warp 0.22s ease-in-out'};
        }
        .n64-crt-scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
        }
        .n64-fog {
          background: linear-gradient(180deg, transparent 0%, rgba(20,12,40,0.85) 100%);
        }
      `}</style>

      {/* Starfield */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 n64-stars-layer" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5">
        {/* Header */}
        <div className="flex w-full flex-wrap items-start justify-between gap-3 px-1">
          <div>
            <h1
              className="text-2xl font-normal tracking-tight sm:text-3xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--accent)',
                textShadow: '3px 3px 0 #8b2942, -1px -1px 0 #4a90d9, 0 0 20px rgba(244,196,48,0.35)',
              }}
            >
              NET NAVIGATOR 64
            </h1>
            <p className="mt-1 text-[10px] tracking-[0.35em] opacity-60">HIGH RESOLUTION PACK INSTALLED · MAYBE</p>
          </div>
          <button
            type="button"
            className="btn btn-xs border-2 uppercase tracking-widest"
            style={{
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              background: 'rgba(0,0,0,0.35)',
            }}
            onClick={onSwitchPersona}
          >
            Power off
          </button>
        </div>

        {/* Console + screen */}
        <div className="relative w-full max-w-[min(100%,36rem)]">
          {/* Low-poly “cartridge” accent */}
          <svg
            className="absolute -right-2 -top-6 z-20 hidden h-14 w-20 opacity-90 sm:block"
            viewBox="0 0 80 56"
            fill="none"
            aria-hidden
            style={{ animation: reducedMotion ? 'none' : 'n64-float 5s ease-in-out infinite' }}
          >
            <path d="M8 48 L8 16 L24 8 L56 12 L72 24 L72 48 Z" fill="#2a2a35" stroke="#f4c430" strokeWidth="2" />
            <path d="M24 8 L24 28 L56 32 L56 12 Z" fill="#c0392b" opacity="0.85" />
            <path d="M8 16 L24 8 L24 28 L8 32 Z" fill="#4a90d9" opacity="0.5" />
          </svg>

          <div
            className="relative rounded-2xl p-3 shadow-2xl sm:p-4"
            style={{
              background: 'linear-gradient(165deg, #5c5a68 0%, #3a3845 35%, #25242e 100%)',
              boxShadow:
                '0 20px 50px rgba(0,0,0,0.65), inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[9px] font-bold tracking-widest opacity-50">NINTENDO</span>
              <span className="text-[9px] opacity-40">DRAW DISTANCE: 3 TEXTURES</span>
            </div>

            {/* CRT inner */}
            <div
              className="relative overflow-hidden rounded-xl border-4 n64-crt-scanlines"
              style={{
                borderColor: '#1a1a22',
                background: 'linear-gradient(180deg, #1e1038 0%, #0d0618 55%, #12081f 100%)',
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.75)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] n64-fog"
                aria-hidden
              />
              {reducedMotion ? null : (
                <div
                  className="pointer-events-none absolute inset-0 z-[19] opacity-[0.03]"
                  style={{
                    background: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)',
                    animation: 'n64-scan 6s linear infinite',
                  }}
                  aria-hidden
                />
              )}

              <div className="relative z-10 px-3 py-3 sm:px-4 sm:py-4">
                {/* Tab strip — Mario 64-ish wedges */}
                <nav className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3" aria-label="Main sections">
                  {TABS.map((t, i) => {
                    const on = i === tab
                    return (
                      <button
                        key={t.key}
                        type="button"
                        aria-current={on ? 'true' : undefined}
                        onClick={() => goTab(i)}
                        className={`relative flex min-w-[4.5rem] flex-col items-center rounded-lg border-2 px-2 py-2 text-center transition-transform sm:min-w-[5.25rem] sm:px-3 ${
                          on ? 'scale-105 z-10' : 'opacity-75 hover:opacity-100 scale-100'
                        }`}
                        style={{
                          borderColor: on ? 'var(--accent)' : 'rgba(244,196,48,0.25)',
                          background: on
                            ? 'linear-gradient(180deg, rgba(244,196,48,0.25) 0%, rgba(30,16,56,0.9) 100%)'
                            : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.35) 100%)',
                          animation:
                            on && !reducedMotion ? 'n64-pulse-glow 2.2s ease-in-out infinite' : undefined,
                        }}
                      >
                        <span className="text-2xl leading-none sm:text-3xl" aria-hidden>
                          {t.icon}
                        </span>
                        <span
                          className="mt-1 text-[9px] font-bold tracking-wider sm:text-[10px]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {t.label}
                        </span>
                        <span className="hidden text-[8px] opacity-45 sm:block">{t.blurb}</span>
                      </button>
                    )
                  })}
                </nav>

                <p className="mb-2 text-center text-[10px] opacity-50">
                  ◀ ▶ change channel · low-poly web · tri-linear filtering: <span className="text-yellow-300/80">ON</span>
                </p>

                {/* Content */}
                <div
                  className="n64-warp-panel relative min-h-[min(52vh,340px)] overflow-y-auto rounded-lg border border-yellow-500/20 bg-black/35 p-3 sm:min-h-[min(50vh,380px)] sm:p-4 [scrollbar-width:thin]"
                  key={current.key}
                >
                  {current.key === 'inbox' && (
                    <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
                      <ul className="flex flex-col gap-1.5 lg:w-[42%] lg:shrink-0" aria-label="Messages">
                        {emails.map(e => {
                          const sel = selectedEmail?.id === e.id
                          return (
                            <li key={e.id}>
                              <button
                                type="button"
                                onClick={() => setSelectedEmail(e)}
                                className={`w-full rounded border-2 px-2 py-2 text-left text-xs transition-colors sm:text-sm ${
                                  sel
                                    ? 'border-yellow-400 bg-yellow-500/15'
                                    : 'border-white/10 bg-white/5 hover:border-yellow-500/40'
                                }`}
                              >
                                <span className="text-lg leading-none">{e.from.avatar}</span>{' '}
                                <span className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                                  {e.from.name}
                                </span>
                                {!e.read && (
                                  <span className="badge badge-warning badge-xs ml-1 border-0">NEW</span>
                                )}
                                <p className="mt-0.5 line-clamp-2 opacity-80">{e.subject}</p>
                                <p className="font-mono text-[10px] opacity-45">{e.time}</p>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="min-h-[12rem] flex-1 rounded border-2 border-dashed border-white/15 bg-black/25 p-3 lg:min-h-0">
                        {selectedEmail ? (
                          <article>
                            <header className="border-b border-yellow-500/25 pb-2">
                              <p className="text-[10px] uppercase tracking-widest opacity-50">Message</p>
                              <h2
                                className="text-lg font-normal leading-tight sm:text-xl"
                                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                              >
                                {selectedEmail.subject}
                              </h2>
                              <p className="mt-1 text-xs opacity-60">
                                {selectedEmail.from.name} · {selectedEmail.date}
                              </p>
                            </header>
                            <p className="mt-3 whitespace-pre-wrap text-xs leading-relaxed opacity-90 sm:text-sm">
                              {selectedEmail.body}
                            </p>
                          </article>
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center py-8 text-center opacity-45">
                            <p className="text-4xl">📭</p>
                            <p className="mt-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                              No message selected
                            </p>
                            <p className="mt-1 max-w-xs text-[11px]">Press A on a letter. Or click. We are not picky.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {current.key === 'weather' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-end gap-4">
                        <span
                          className="text-6xl sm:text-7xl"
                          style={{
                            animation: reducedMotion ? 'none' : 'n64-float 4s ease-in-out infinite',
                            filter: 'drop-shadow(0 0 12px rgba(244,196,48,0.4))',
                          }}
                        >
                          {weather.icon}
                        </span>
                        <div>
                          <p
                            className="text-5xl leading-none sm:text-6xl"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                          >
                            {weather.temp}°
                          </p>
                          <p className="text-sm opacity-80">{weather.condition}</p>
                          <p className="text-xs opacity-50">
                            {weather.city} · wind {weather.wind} · humidity {weather.humidity}%
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-center text-[9px] sm:gap-2 sm:text-[10px]">
                        {weather.forecast.map(d => (
                          <div
                            key={d.day}
                            className="rounded border border-cyan-500/30 bg-cyan-950/20 py-2"
                          >
                            <p className="font-bold text-yellow-200">{d.day}</p>
                            <p className="text-lg sm:text-xl">{d.icon}</p>
                            <p>
                              {d.high}°/{d.low}°
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] opacity-40">FOG NEAR CAMERA · ACCURACY NOT GUARANTEED</p>
                    </div>
                  )}

                  {current.key === 'news' && (
                    <ul className="space-y-2">
                      {news.map(n => (
                        <li
                          key={n.id}
                          className="flex gap-3 rounded border border-white/10 bg-white/5 p-2 sm:p-3"
                        >
                          <span className="text-3xl shrink-0">{n.emoji}</span>
                          <div className="min-w-0">
                            <p className="font-bold leading-snug sm:text-base">{n.title}</p>
                            <p className="mt-1 text-[10px] opacity-50 sm:text-xs">
                              {n.source} · {n.category} · {n.time}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {current.key === 'stocks' && (
                    <div>
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b-2 border-yellow-500/30 text-[10px] uppercase tracking-wider opacity-70">
                            <th className="py-2 pr-2">Sym</th>
                            <th className="py-2 pr-2">Last</th>
                            <th className="py-2">Δ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stocks.map(s => (
                            <tr key={s.ticker} className="border-b border-white/10">
                              <td className="py-2 pr-2 font-bold text-yellow-200">{s.ticker}</td>
                              <td className="py-2 pr-2 font-mono tabular-nums">
                                {s.currency}
                                {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </td>
                              <td
                                className={`py-2 font-mono tabular-nums ${
                                  s.changePct >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}
                              >
                                {s.changePct >= 0 ? '+' : ''}
                                {s.changePct.toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-3 text-[10px] opacity-45">
                        RENDERED WITH 1 Z-BUFFER · NOT FINANCIAL ADVICE · ASK YOUR MOM BEFORE BUYING BITCOIN
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom ticker */}
                <div
                  className="relative mt-3 overflow-hidden rounded border-2 border-yellow-600/50 bg-black/60 py-1.5"
                  style={{ borderStyle: 'ridge' }}
                >
                  {reducedMotion ? (
                    <p className="truncate px-2 text-[10px] font-mono text-yellow-200/90">{ticker}</p>
                  ) : (
                    <div
                      className="flex whitespace-nowrap font-mono text-[10px] text-yellow-200/90 sm:text-xs"
                      style={{ animation: 'n64-ticker 32s linear infinite' }}
                    >
                      <span className="pr-20">{ticker}</span>
                      <span className="pr-20" aria-hidden>
                        {ticker}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-2 text-center text-[9px] opacity-35">VIDEO OUTPUT: COMPOSITE · IF BLURRY, THAT IS AUTHENTIC</p>
          </div>

          {/* Controller */}
          <div
            className="group/card card mx-auto mt-5 max-w-md border-2 shadow-xl"
            style={{
              borderColor: '#4a4855',
              background: 'linear-gradient(180deg, #3d3b48 0%, #25242e 100%)',
            }}
          >
            <div className="card-body flex-row flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <svg
                  className={reducedMotion ? '' : 'n64-controller-shake'}
                  width="120"
                  height="72"
                  viewBox="0 0 120 72"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 36 C12 12 108 12 108 36 C108 60 12 60 12 36 Z"
                    fill="#2a2832"
                    stroke="#6a6878"
                    strokeWidth="2"
                  />
                  <circle cx="32" cy="38" r="10" fill="#1a1a22" stroke="#555" strokeWidth="2" />
                  <text x="28" y="42" fill="#888" fontSize="10" fontFamily="monospace">
                    ①
                  </text>
                  <rect x="52" y="28" width="16" height="16" rx="2" fill="#c0392b" />
                  <rect x="72" y="28" width="16" height="16" rx="2" fill="#2980b9" />
                  <text x="56" y="40" fill="#fff" fontSize="9" fontFamily="Arial">
                    A
                  </text>
                  <text x="76" y="40" fill="#fff" fontSize="9" fontFamily="Arial">
                    B
                  </text>
                  <path d="M88 20 L96 12 L104 20" stroke="#f4c430" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <text x="90" y="8" fill="#f4c430" fontSize="8">
                    Z
                  </text>
                </svg>
                <div className="text-[10px] leading-relaxed opacity-70">
                  <p className="font-bold tracking-widest" style={{ color: 'var(--accent)' }}>
                    RUMBLE PAK
                  </p>
                  <p>OK = A · Back = B</p>
                  <p className="text-[9px] opacity-55">Hover controller for authentic rumble</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="btn btn-sm border-0 text-white"
                  style={{ background: '#c0392b' }}
                  onClick={() => goTab((tab + 1) % TABS.length)}
                >
                  A — Next tab
                </button>
                <button
                  type="button"
                  className="btn btn-sm border-0 text-white"
                  style={{ background: '#2980b9' }}
                  onClick={() => goTab((tab + TABS.length - 1) % TABS.length)}
                >
                  B — Prev tab
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="max-w-lg px-2 text-center text-[10px] leading-relaxed opacity-40">
          The World Wide Web is not actually supported on real Nintendo 64 hardware. This page is a loving parody. Please
          do not blow on the cartridge.
        </p>
      </div>
    </div>
  )
}
