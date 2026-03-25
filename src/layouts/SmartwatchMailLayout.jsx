import { useEffect, useMemo, useRef, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FACES = [
  { id: 'mail', label: 'Mail', icon: '✉️', hue: '210' },
  { id: 'weather', label: 'Sky', icon: weather.icon, hue: '190' },
  { id: 'news', label: 'Wire', icon: '📡', hue: '280' },
  { id: 'markets', label: 'Tick', icon: '📈', hue: '145' },
]

function formatClock(d) {
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
}

function MiniSpark({ series, positive }) {
  const pts = useMemo(() => {
    const slice = series.slice(-16)
    if (slice.length < 2) return ''
    const min = Math.min(...slice)
    const max = Math.max(...slice)
    const pad = 2
    const w = 56
    const h = 20
    const range = max - min || 1
    return slice
      .map((v, i) => {
        const x = pad + (i / (slice.length - 1)) * (w - pad * 2)
        const y = pad + (1 - (v - min) / range) * (h - pad * 2)
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  }, [series])
  const stroke = positive ? 'var(--sw-up)' : 'var(--sw-down)'
  return (
    <svg className="sw-spark shrink-0" width="56" height="22" viewBox="0 0 56 22" aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
        className="sw-spark-line"
      />
    </svg>
  )
}

export default function SmartwatchMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [face, setFace] = useState('mail')
  const [now, setNow] = useState(() => new Date())
  const scrollRef = useRef(null)
  const [crownSpin, setCrownSpin] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const unread = emails.filter((e) => !e.read).length
  const seconds = now.getSeconds()
  const secondDeg = (seconds / 60) * 360

  function onScrollCrown() {
    const el = scrollRef.current
    if (!el) return
    setCrownSpin((el.scrollTop / 40) % 360)
  }

  return (
    <div
      className="sw-watch-root relative min-h-screen overflow-x-hidden overflow-y-auto pb-28"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background:
          'radial-gradient(ellipse 120% 80% at 50% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 80% 90%, rgba(167, 139, 250, 0.1) 0%, transparent 45%), linear-gradient(165deg, #070b14 0%, #0f172a 38%, #020617 100%)',
      }}
    >
      <style>{`
        @keyframes sw-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes sw-glint { 0% { transform: translateX(-120%) skewX(-12deg); } 100% { transform: translateX(220%) skewX(-12deg); } }
        @keyframes sw-pulse-ring { 0% { transform: scale(0.92); opacity: 0.5; } 70% { transform: scale(1.35); opacity: 0; } 100% { opacity: 0; } }
        @keyframes sw-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes sw-spark-draw { from { stroke-dashoffset: 80; } to { stroke-dashoffset: 0; } }
        .sw-spark-line { stroke-dasharray: 80; stroke-dashoffset: 0; animation: sw-spark-draw 1.2s ease-out forwards; }
        .sw-watch-case { animation: sw-float 5s ease-in-out infinite; }
        .sw-glint::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%);
          animation: sw-glint 4.5s ease-in-out infinite;
        }
        .sw-pulse-dot { position: relative; }
        .sw-pulse-dot::before {
          content: ''; position: absolute; inset: -4px; border-radius: 9999px; border: 2px solid var(--accent);
          animation: sw-pulse-ring 2s ease-out infinite;
        }
      `}</style>

      {/* Ambient particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-sky-400/20"
            style={{
              width: 3 + (i % 4),
              height: 3 + (i % 4),
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animation: `sw-float ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 mx-auto flex max-w-lg items-start justify-between gap-3 px-4 pt-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-sky-300/70">wrist.link</p>
          <h1 className="mt-1 text-lg font-bold tracking-tight text-slate-100" style={{ fontFamily: 'var(--font-display)' }}>
            Mail on your watch
          </h1>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-400">
            Same inbox, weather, headlines & tickers — squint mode activated.
          </p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm shrink-0 text-slate-400 hover:text-slate-200" onClick={onSwitchPersona}>
          take it off
        </button>
      </header>

      <div className="relative z-10 mx-auto mt-10 flex max-w-4xl flex-col items-center gap-10 px-4 pb-16 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        {/* Silicone band illusion */}
        <div
          className="pointer-events-none hidden h-[min(420px,55vh)] w-24 shrink-0 rounded-full opacity-40 lg:block"
          style={{
            background: 'linear-gradient(90deg, #1e293b, #334155 45%, #1e293b)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
          aria-hidden
        />

        <div className="sw-watch-case relative shrink-0">
          {/* Side button + digital crown */}
          <div
            className="absolute -left-3 top-[28%] z-20 h-10 w-2 rounded-l-md bg-gradient-to-b from-slate-600 to-slate-800 shadow-md"
            aria-hidden
          />
          <div
            className="absolute -right-4 top-[22%] z-20 flex h-14 w-5 flex-col items-center justify-center rounded-full border border-slate-500/80 bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 shadow-lg"
            style={{ transform: `rotate(${crownSpin * 0.8}deg)` }}
            aria-hidden
          >
            <div className="h-8 w-0.5 rounded-full bg-slate-900/40" />
          </div>

          {/* Bezel ring with tick marks */}
          <div
            className="relative aspect-square w-[min(320px,82vw)] rounded-full p-[10px] shadow-2xl"
            style={{
              background:
                'conic-gradient(from 0deg, #475569, #1e293b, #64748b, #334155, #475569)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <div
              className="sw-glint relative h-full w-full overflow-hidden rounded-full border border-slate-700/80"
              style={{ background: 'radial-gradient(circle at 35% 25%, #1e293b 0%, #020617 55%)' }}
            >
              {/* Analog second hand (decorative) */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[42%] w-0.5 origin-bottom rounded-full bg-rose-400/70"
                style={{
                  transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
                  transition: seconds === 0 ? 'none' : 'transform 0.15s linear',
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-600"
                aria-hidden
              />

              {/* Screen */}
              <div className="absolute inset-[14px] flex flex-col overflow-hidden rounded-[2.35rem] bg-[var(--watch-screen,#020617)] ring-1 ring-white/5">
                {/* Status */}
                <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-3">
                  <span
                    className="text-[11px] font-semibold tabular-nums tracking-widest text-slate-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {formatClock(now)}
                  </span>
                  <div className="flex items-center gap-2">
                    {unread > 0 && (
                      <span className="sw-pulse-dot flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-500 px-1 text-[9px] font-bold text-white">
                        {unread}
                      </span>
                    )}
                    <span className="flex items-center gap-0.5 text-[10px] text-emerald-400/90" title="Battery (demo)">
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M16 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v12H4V6h12zm4-1v14h-2V5h2z" opacity="0.35" />
                        <path d="M6 8h8v8H6z" className="animate-pulse" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Complications row */}
                <div className="flex shrink-0 justify-between gap-1 px-3 pb-2">
                  <div className="flex flex-1 flex-col items-center rounded-2xl bg-slate-800/60 py-1.5 text-center ring-1 ring-white/5">
                    <span className="text-lg leading-none">{weather.icon}</span>
                    <span className="mt-0.5 text-[10px] font-semibold text-slate-200">{weather.temp}°</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center rounded-2xl bg-slate-800/60 py-1.5 text-center ring-1 ring-white/5">
                    <span className="text-[10px] text-slate-500">HR</span>
                    <span className="animate-pulse text-sm font-bold text-rose-400 tabular-nums">{72 + (unread % 9)}</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center rounded-2xl bg-slate-800/60 py-1.5 text-center ring-1 ring-white/5">
                    <span className="text-[10px] text-slate-500">MOVE</span>
                    <span className="text-sm font-bold text-amber-300 tabular-nums">{420 + emails.length * 17}</span>
                  </div>
                </div>

                {/* Dock */}
                <div className="flex shrink-0 justify-center gap-2 px-2 pb-2">
                  {FACES.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFace(f.id)}
                      className={`btn btn-xs h-9 min-h-0 gap-1 rounded-2xl border-0 px-2.5 font-medium transition-all ${
                        face === f.id
                          ? 'bg-sky-500/25 text-sky-200 ring-1 ring-sky-400/50'
                          : 'bg-slate-800/40 text-slate-500 hover:bg-slate-700/50 hover:text-slate-300'
                      }`}
                      style={face === f.id ? { boxShadow: `0 0 20px hsla(${f.hue}, 90%, 60%, 0.15)` } : undefined}
                    >
                      <span className="text-sm">{f.icon}</span>
                      <span className="hidden text-[9px] uppercase tracking-wide sm:inline">{f.label}</span>
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div
                  ref={scrollRef}
                  onScroll={onScrollCrown}
                  className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3 [scrollbar-width:thin]"
                >
                  {face === 'mail' && (
                    <ul className="space-y-2">
                      {emails.map((email, i) => (
                        <li key={email.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedEmail(email)}
                            className="flex w-full items-start gap-2 rounded-2xl border border-white/5 bg-slate-800/35 px-2.5 py-2 text-left transition hover:border-sky-500/30 hover:bg-slate-800/55"
                            style={{ animationDelay: `${i * 0.06}s` }}
                          >
                            <span className="text-xl leading-none">{email.from.avatar}</span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-1">
                                <span className={`truncate text-[11px] font-semibold ${email.read ? 'text-slate-400' : 'text-slate-100'}`}>
                                  {email.from.name}
                                </span>
                                {!email.read && <span className="badge badge-primary badge-xs shrink-0">new</span>}
                              </span>
                              <span className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-slate-500">{email.subject}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {face === 'weather' && (
                    <div className="px-1">
                      <div className="rounded-2xl bg-gradient-to-br from-sky-600/30 to-indigo-900/40 p-3 ring-1 ring-sky-400/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-wider text-sky-200/80">{weather.city}</p>
                            <p className="text-3xl font-bold tabular-nums text-white" style={{ fontFamily: 'var(--font-display)' }}>
                              {weather.temp}°
                            </p>
                            <p className="text-[10px] text-sky-100/70">{weather.condition}</p>
                          </div>
                          <span className="text-5xl drop-shadow-lg" style={{ animation: 'sw-float 3s ease-in-out infinite' }}>
                            {weather.icon}
                          </span>
                        </div>
                        <div className="mt-3 flex justify-between gap-1 border-t border-white/10 pt-2">
                          {weather.forecast.slice(0, 4).map((d) => (
                            <div key={d.day} className="flex flex-1 flex-col items-center text-[9px] text-slate-300">
                              <span className="text-slate-500">{d.day}</span>
                              <span className="my-0.5 text-sm">{d.icon}</span>
                              <span className="tabular-nums">
                                {d.high}°/{d.low}°
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-center text-[9px] text-slate-600">wind {weather.wind} km/h · {weather.humidity}% humidity</p>
                    </div>
                  )}

                  {face === 'news' && (
                    <div className="space-y-2">
                      <div className="overflow-hidden rounded-xl bg-slate-900/80 py-1 ring-1 ring-violet-500/20">
                        <div
                          className="flex whitespace-nowrap text-[10px] font-medium text-violet-200/90"
                          style={{ animation: 'sw-ticker 28s linear infinite' }}
                        >
                          {[...news, ...news].map((n, i) => (
                            <span key={`${n.id}-${i}`} className="mx-4 inline-flex items-center gap-1">
                              <span>{n.emoji}</span>
                              <span>{n.title}</span>
                              <span className="text-violet-500/80">·</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {news.map((n) => (
                          <li
                            key={n.id}
                            className="rounded-xl border border-white/5 bg-slate-800/30 px-2 py-1.5"
                          >
                            <div className="flex items-center gap-1 text-[9px] text-slate-500">
                              <span>{n.emoji}</span>
                              <span>{n.source}</span>
                              <span>·</span>
                              <span>{n.time}</span>
                            </div>
                            <p className="mt-0.5 text-[10px] font-medium leading-snug text-slate-200">{n.title}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {face === 'markets' && (
                    <ul className="space-y-2">
                      {stocks.map((s) => (
                        <li
                          key={s.ticker}
                          className="flex items-center gap-2 rounded-2xl border border-white/5 bg-slate-800/35 px-2 py-2"
                        >
                          <MiniSpark series={s.series} positive={s.change >= 0} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-1">
                              <span className="text-[11px] font-bold text-slate-200" style={{ fontFamily: 'var(--font-display)' }}>
                                {s.ticker}
                              </span>
                              <span className="text-[10px] tabular-nums text-slate-400">
                                {s.currency}
                                {s.price >= 1000 ? s.price.toLocaleString(undefined, { maximumFractionDigits: 0 }) : s.price}
                              </span>
                            </div>
                            <p className={`text-[9px] font-semibold tabular-nums ${s.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {s.change >= 0 ? '+' : ''}
                              {s.changePct.toFixed(2)}%
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <p className="shrink-0 pb-2 text-center text-[8px] text-slate-600">scroll = twist crown · tap face to switch</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-xs text-sm text-slate-500 lg:max-w-[14rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: 'var(--font-display)' }}>
            Pro tip
          </p>
          <p className="mt-2 leading-relaxed">
            Your wrist already knew about that LinkedIn email. The universe is just catching up.
          </p>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="sw-watch-case relative w-full max-w-[340px]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sw-mail-subject"
          >
            <div
              className="mx-auto aspect-square w-[min(300px,85vw)] rounded-full p-2 shadow-2xl"
              style={{
                background: 'conic-gradient(from 40deg, #334155, #0f172a, #475569)',
              }}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-[#020617] p-4 ring-1 ring-white/10">
                <button
                  type="button"
                  className="btn btn-ghost btn-xs mb-2 -ml-1 self-start text-slate-500"
                  onClick={() => setSelectedEmail(null)}
                >
                  ← back
                </button>
                <h2
                  id="sw-mail-subject"
                  className="text-sm font-bold leading-tight text-sky-100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {selectedEmail.subject}
                </h2>
                <p className="mt-1 text-[11px] text-slate-500">
                  {selectedEmail.from.avatar} {selectedEmail.from.name} · {selectedEmail.time}
                </p>
                <div className="mt-3 min-h-0 flex-1 overflow-y-auto rounded-xl bg-slate-900/50 p-2 ring-1 ring-white/5">
                  <pre className="whitespace-pre-wrap font-sans text-[11px] leading-relaxed text-slate-300">{selectedEmail.body}</pre>
                </div>
                <button type="button" className="btn btn-primary btn-sm mt-3 w-full rounded-2xl border-0" onClick={() => setSelectedEmail(null)}>
                  dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
