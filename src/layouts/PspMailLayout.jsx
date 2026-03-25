import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TABS = [
  { id: 'mail', label: 'E-mail', sub: 'メール', icon: '✉️' },
  { id: 'weather', label: 'Sky', sub: '天気', icon: weather.icon },
  { id: 'news', label: 'RSS', sub: '情報', icon: '📰' },
  { id: 'stocks', label: 'Markets', sub: '相場', icon: '📊' },
]

function MiniSpark({ series, up }) {
  const pts = useMemo(() => {
    const slice = series.slice(-20)
    if (slice.length < 2) return ''
    const min = Math.min(...slice)
    const max = Math.max(...slice)
    const w = 48
    const h = 16
    const pad = 2
    const range = max - min || 1
    return slice
      .map((v, i) => {
        const x = pad + (i / (slice.length - 1)) * (w - pad * 2)
        const y = pad + (1 - (v - min) / range) * (h - pad * 2)
        return `${x},${y}`
      })
      .join(' ')
  }, [series])
  return (
    <svg width="48" height="18" viewBox="0 0 48 18" className="shrink-0 opacity-90" aria-hidden>
      <polyline
        fill="none"
        stroke={up ? 'var(--psp-up)' : 'var(--psp-down)'}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  )
}

export default function PspMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [tab, setTab] = useState('mail')
  const [now, setNow] = useState(() => new Date())
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
  const unread = emails.filter((e) => !e.read).length

  const floats = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        sym: ['○', '△', '□', '×'][i % 4],
        left: `${6 + (i * 13) % 78}%`,
        top: `${10 + (i * 17) % 55}%`,
        dur: 14 + (i % 5) * 2,
        delay: i * 0.7,
      })),
    [],
  )

  return (
    <div
      className="psp-root relative min-h-screen overflow-x-hidden pb-8"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--psp-text)',
        background:
          'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(0, 180, 255, 0.15) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(255, 0, 128, 0.08) 0%, transparent 45%), linear-gradient(168deg, #0a0e18 0%, #121a2e 35%, #070910 100%)',
      }}
    >
      <style>{`
        @keyframes psp-xmb-wave {
          0% { transform: translateX(-8%) skewX(-2deg); opacity: 0.45; }
          50% { transform: translateX(4%) skewX(1deg); opacity: 0.65; }
          100% { transform: translateX(-8%) skewX(-2deg); opacity: 0.45; }
        }
        @keyframes psp-lcd-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes psp-battery-breathe {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
        }
        @keyframes psp-float-sym {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.12; }
          33% { transform: translateY(-12px) rotate(8deg); opacity: 0.22; }
          66% { transform: translateY(4px) rotate(-6deg); opacity: 0.16; }
        }
        @keyframes psp-umd-shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        @keyframes psp-tab-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 200, 255, 0); }
          50% { box-shadow: 0 0 12px 2px rgba(0, 200, 255, 0.25); }
        }
        .psp-mail-row-active {
          animation: psp-tab-glow 2s ease-in-out infinite;
        }
        .psp-screen-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            125deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 40%,
            transparent 70%
          );
          animation: psp-xmb-wave ${reducedMotion ? '0s' : '8s'} ease-in-out infinite;
        }
        .psp-lcd-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }
        .psp-lcd-overlay::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.04),
            transparent
          );
          animation: psp-lcd-scan ${reducedMotion ? '0s' : '6s'} linear infinite;
        }
        .psp-umd-slot::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          animation: psp-umd-shine ${reducedMotion ? '0s' : '4.5s'} ease-in-out infinite;
        }
      `}</style>

      {/* Ambient symbols */}
      {!reducedMotion &&
        floats.map((f) => (
          <span
            key={f.id}
            className="pointer-events-none fixed z-0 text-2xl font-bold text-cyan-400/20"
            style={{
              left: f.left,
              top: f.top,
              animation: `psp-float-sym ${f.dur}s ease-in-out infinite`,
              animationDelay: `${f.delay}s`,
            }}
            aria-hidden
          >
            {f.sym}
          </span>
        ))}

      <header className="relative z-10 mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-4 px-4 pt-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400/60">PlayStation Portable · parody</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            Reading mail on a PSP
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
            Same inbox, weather, wire & tickers — squeezed through a glossy 2005 LCD, shoulder buttons optional.
          </p>
        </div>
        <button type="button" className="btn btn-outline btn-sm border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-400" onClick={onSwitchPersona}>
          eject UMD
        </button>
      </header>

      <div className="relative z-10 mx-auto mt-8 flex max-w-5xl flex-col items-center gap-6 px-4 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        {/* Left grip + nub */}
        <div className="hidden shrink-0 flex-col items-center gap-3 lg:flex" aria-hidden>
          <div
            className="h-48 w-10 rounded-full opacity-50"
            style={{
              background: 'linear-gradient(90deg, #1a2332, #2d3a4d 50%, #1a2332)',
              boxShadow: 'inset 0 0 12px rgba(0,0,0,0.6)',
            }}
          />
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-600 bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.08)' }}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-800 to-black ring-1 ring-white/10" />
            {!reducedMotion && (
              <div className="absolute inset-0 animate-pulse rounded-full border border-cyan-500/20" />
            )}
          </div>
        </div>

        {/* Handheld body */}
        <div
          className="relative w-full max-w-[min(920px,100%)] rounded-[2rem] p-3 shadow-2xl md:p-4"
          style={{
            background:
              'linear-gradient(145deg, #c8d0dc 0%, #8a95a8 18%, #5c6575 42%, #3d4450 55%, #2a3038 78%, #1c2128 100%)',
            boxShadow:
              '0 40px 80px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.35)',
          }}
        >
          {/* Shoulder hints */}
          <div className="pointer-events-none absolute -top-2 left-[12%] z-20 rounded-md bg-black/40 px-2 py-0.5 text-[9px] font-bold tracking-widest text-slate-400" aria-hidden>
            L
          </div>
          <div className="pointer-events-none absolute -top-2 right-[12%] z-20 rounded-md bg-black/40 px-2 py-0.5 text-[9px] font-bold tracking-widest text-slate-400" aria-hidden>
            R
          </div>

          {/* UMD door strip */}
          <div
            className="psp-umd-slot relative mx-auto mb-3 h-3 w-[72%] overflow-hidden rounded-full border border-white/15"
            style={{
              background: 'linear-gradient(180deg, #1a1f28 0%, #0d1016 100%)',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
            }}
            aria-hidden
          />

          <div
            className="rounded-xl p-[10px] md:p-[12px]"
            style={{
              background: 'linear-gradient(180deg, #0f1218 0%, #050608 100%)',
              boxShadow: 'inset 0 0 0 2px #1e2530, inset 0 0 20px rgba(0,0,0,0.8)',
            }}
          >
            {/* Screen bezel */}
            <div
              className="relative overflow-hidden rounded-lg ring-2 ring-black/80"
              style={{
                aspectRatio: '480 / 272',
                maxHeight: 'min(52vh, 420px)',
                margin: '0 auto',
                background: '#000',
                boxShadow: 'inset 0 0 0 3px #1a1a1a, 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="psp-screen-inner relative flex h-full w-full flex-col overflow-hidden rounded-md"
                style={{
                  background:
                    'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0, 140, 200, 0.25) 0%, transparent 50%), linear-gradient(180deg, #0c1528 0%, #060a12 100%)',
                }}
              >
                {!reducedMotion && <div className="psp-lcd-overlay" aria-hidden />}

                {/* Status row */}
                <div className="relative z-[1] flex shrink-0 items-center justify-between border-b border-cyan-500/15 bg-black/25 px-3 py-1.5 backdrop-blur-[2px]">
                  <span className="text-[11px] font-semibold tabular-nums tracking-widest text-cyan-200/90" style={{ fontFamily: 'var(--font-display)' }}>
                    {timeStr}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">WLAN</span>
                    <div className="flex h-3 items-end gap-0.5" aria-hidden>
                      {[1, 2, 3].map((b) => (
                        <span
                          key={b}
                          className="w-1 rounded-[1px] bg-cyan-400/80"
                          style={{ height: `${b * 3}px`, opacity: 0.35 + b * 0.2 }}
                        />
                      ))}
                    </div>
                    <span
                      className="flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-emerald-300"
                      style={reducedMotion ? {} : { animation: 'psp-battery-breathe 2.5s ease-in-out infinite' }}
                    >
                      <span aria-hidden>BAT</span> 100%
                    </span>
                  </div>
                </div>

                {/* Main content */}
                <div className="relative z-[1] min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 md:px-3">
                  {tab === 'mail' && (
                    <div className="flex h-full min-h-[180px] flex-col gap-2 md:flex-row">
                      <div className="flex min-h-0 w-full flex-col md:w-[42%] md:max-w-[220px]">
                        <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400/50">Inbox</p>
                        <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-0.5">
                          {emails.map((e) => {
                            const active = selectedEmail?.id === e.id
                            return (
                              <li key={e.id}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedEmail(e)}
                                  className={`flex w-full items-start gap-2 rounded border px-2 py-1.5 text-left text-[10px] leading-tight transition-all md:text-[11px] ${
                                    active
                                      ? 'border-cyan-400/70 bg-cyan-500/15 text-cyan-50 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                                      : 'border-white/10 bg-black/20 text-slate-300 hover:border-cyan-500/30 hover:bg-cyan-500/5'
                                  } ${!reducedMotion && active ? 'psp-mail-row-active' : ''}`}
                                >
                                  <span className="text-sm shrink-0">{e.from.avatar}</span>
                                  <span className="min-w-0 flex-1">
                                    <span className="line-clamp-2 font-semibold">{e.subject}</span>
                                    <span className="mt-0.5 block text-[9px] opacity-60">{e.from.name}</span>
                                  </span>
                                  {!e.read && (
                                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" aria-label="Unread" />
                                  )}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div className="min-h-0 flex-1 overflow-hidden rounded border border-white/10 bg-black/30 p-2 md:p-3">
                        {selectedEmail ? (
                          <>
                            <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-white/10 pb-2">
                              <span className="text-2xl">{selectedEmail.from.avatar}</span>
                              <div className="min-w-0 flex-1">
                                <h2 className="text-sm font-bold leading-snug text-cyan-100 md:text-base">{selectedEmail.subject}</h2>
                                <p className="text-[10px] text-slate-400">
                                  {selectedEmail.from.name} · {selectedEmail.time}
                                </p>
                              </div>
                            </div>
                            <p className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-300 md:text-xs">
                              {selectedEmail.body}
                            </p>
                          </>
                        ) : (
                          <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 text-center text-slate-500">
                            <span className="text-3xl opacity-40" aria-hidden>
                              ×
                            </span>
                            <p className="text-[11px] font-medium">Select a message</p>
                            {!reducedMotion && (
                              <p className="text-[9px] animate-pulse text-cyan-500/60">▼ Press to open</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {tab === 'weather' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-transparent px-3 py-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/70">Location</p>
                          <p className="text-lg font-bold text-white md:text-xl">
                            {weather.city}, {weather.country}
                          </p>
                        </div>
                        <span className="text-5xl drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">{weather.icon}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="rounded border border-white/10 bg-black/25 p-2">
                          <p className="text-[9px] uppercase text-slate-500">Now</p>
                          <p className="text-2xl font-bold tabular-nums text-cyan-200">{weather.temp}°</p>
                          <p className="text-[10px] text-slate-400">{weather.condition}</p>
                        </div>
                        <div className="rounded border border-white/10 bg-black/25 p-2">
                          <p className="text-[9px] uppercase text-slate-500">Feels</p>
                          <p className="text-2xl font-bold tabular-nums text-slate-200">{weather.feels_like}°</p>
                          <p className="text-[10px] text-slate-400">
                            wind {weather.wind} km/h
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {weather.forecast.map((d) => (
                          <div
                            key={d.day}
                            className="min-w-[3.5rem] shrink-0 rounded border border-white/10 bg-black/20 px-2 py-1.5 text-center"
                          >
                            <p className="text-[9px] font-bold text-cyan-400/80">{d.day}</p>
                            <p className="text-lg leading-none">{d.icon}</p>
                            <p className="text-[9px] tabular-nums text-slate-300">
                              {d.high}° / {d.low}°
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 'news' && (
                    <ul className="space-y-2">
                      {news.map((n) => (
                        <li
                          key={n.id}
                          className="rounded border border-white/10 bg-black/25 px-2 py-2 transition-colors hover:border-cyan-500/25 hover:bg-cyan-500/5"
                        >
                          <div className="flex gap-2">
                            <span className="text-xl shrink-0">{n.emoji}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold leading-snug text-slate-100 md:text-xs">{n.title}</p>
                              <p className="mt-1 text-[9px] text-slate-500">
                                {n.source} · {n.category} · {n.time}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {tab === 'stocks' && (
                    <ul className="space-y-2">
                      {stocks.map((s) => {
                        const up = s.change >= 0
                        return (
                          <li
                            key={s.ticker}
                            className="flex items-center gap-2 rounded border border-white/10 bg-black/25 px-2 py-2"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="text-xs font-bold tracking-wide text-cyan-200">{s.ticker}</span>
                                <span className="text-[11px] tabular-nums text-slate-200">
                                  {s.currency}
                                  {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                              </div>
                              <p className="truncate text-[9px] text-slate-500">{s.name}</p>
                              <p className={`text-[10px] font-semibold tabular-nums ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {up ? '▲' : '▼'} {up ? '+' : ''}
                                {s.change.toFixed(2)} ({up ? '+' : ''}
                                {s.changePct.toFixed(2)}%)
                              </p>
                            </div>
                            <MiniSpark series={s.series} up={up} />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>

                {/* XMB-style tab bar */}
                <div className="relative z-[1] flex shrink-0 border-t border-cyan-500/20 bg-black/40 px-1 py-1 backdrop-blur-sm">
                  {TABS.map((t) => {
                    const active = tab === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md py-1 text-[8px] font-bold uppercase tracking-wide transition-all md:text-[9px] ${
                          active
                            ? 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/50'
                            : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                        }`}
                      >
                        <span className="text-sm md:text-base">{t.icon}</span>
                        <span className="truncate px-0.5">{t.label}</span>
                        <span className="hidden text-[7px] font-normal opacity-50 sm:block">{t.sub}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Unread badge strip */}
                {unread > 0 && (
                  <div className="absolute bottom-11 left-2 z-[2] rounded-full border border-amber-400/50 bg-amber-500/20 px-2 py-0.5 text-[8px] font-bold text-amber-200 shadow-lg md:bottom-12">
                    {unread} new
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Face buttons decoration */}
          <div className="pointer-events-none absolute bottom-6 right-4 flex flex-col gap-2 md:bottom-10 md:right-6" aria-hidden>
            <svg width="56" height="56" viewBox="0 0 56 56" className="opacity-70 drop-shadow-lg">
              <circle cx="40" cy="16" r="7" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
              <text x="40" y="19" textAnchor="middle" fill="rgba(148,163,184,0.8)" fontSize="10" fontWeight="bold">
                △
              </text>
              <circle cx="40" cy="40" r="7" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
              <text x="40" y="43" textAnchor="middle" fill="rgba(148,163,184,0.8)" fontSize="9" fontWeight="bold">
                ×
              </text>
              <circle cx="16" cy="40" r="7" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
              <text x="16" y="43" textAnchor="middle" fill="rgba(148,163,184,0.8)" fontSize="9" fontWeight="bold">
                □
              </text>
              <circle cx="28" cy="28" r="7" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
              <text x="28" y="31" textAnchor="middle" fill="rgba(148,163,184,0.8)" fontSize="9" fontWeight="bold">
                ○
              </text>
            </svg>
          </div>

          <p className="pointer-events-none mt-2 text-center text-[8px] font-medium uppercase tracking-[0.35em] text-slate-600">
            handheld fantasy · not affiliated
          </p>
        </div>

        {/* Right grip */}
        <div className="hidden shrink-0 lg:block" aria-hidden>
          <div
            className="h-56 w-10 rounded-full opacity-50"
            style={{
              background: 'linear-gradient(90deg, #1a2332, #2d3a4d 50%, #1a2332)',
              boxShadow: 'inset 0 0 12px rgba(0,0,0,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
