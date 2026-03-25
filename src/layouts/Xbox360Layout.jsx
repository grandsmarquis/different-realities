import { useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const channel = t =>
  ({ work: 'CO-OP', personal: 'PARTY', finance: 'STORE', promo: 'SPOTLIGHT', newsletter: 'FEED', social: 'LIVE' }[t] || 'OTHER')

export default function Xbox360Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const mainRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const readPct = Math.round((emails.filter(e => e.read).length / emails.length) * 100)

  const onMainMove = useCallback(
    e => {
      if (reducedMotion || !mainRef.current) return
      const r = mainRef.current.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setTilt({ rx: py * -7, ry: px * 9 })
    },
    [reducedMotion],
  )

  const onMainLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), [])

  const tickerText = useMemo(
    () =>
      [
        ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct)}%`),
        ...news.map(n => n.title),
      ].join('   ·   '),
    [],
  )

  return (
    <div
      className="xbox2-root min-h-dvh flex flex-col relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="xbox2-bg-layers pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className={`xbox2-bg-grid ${reducedMotion ? '' : 'xbox2-bg-grid-drift'}`} />
        {!reducedMotion && (
          <>
            <div className="xbox2-bg-aurora" />
            <div className="xbox2-bg-halo" />
          </>
        )}
        <div className={`xbox2-bg-sweep ${reducedMotion ? 'xbox2-bg-sweep-static' : ''}`} />
      </div>

      <header className="relative z-20 shrink-0 border-b-2 px-3 py-2.5 md:px-5 xbox2-topbar">
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`size-2 shrink-0 rounded-full bg-[var(--accent)] ${reducedMotion ? '' : 'xbox2-pulse-dot'}`}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.5em] font-semibold opacity-70" style={{ color: 'var(--accent)' }}>
                XBOX LIVE
              </p>
              <h1 className="text-lg md:text-2xl font-bold truncate leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Inbox
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex items-center gap-2" title="Messages cleared">
              <span className="text-[9px] tracking-widest opacity-50 hidden sm:inline">SYNC</span>
              <div
                className="relative size-9 shrink-0 rounded-full p-[2px]"
                style={{
                  background: `conic-gradient(var(--accent) ${readPct}%, color-mix(in srgb, var(--text) 12%, transparent) 0)`,
                }}
              >
                <div
                  className="size-full rounded-full flex items-center justify-center text-[10px] font-bold tabular-nums"
                  style={{ background: 'var(--bg)' }}
                >
                  {readPct}%
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline border-2 uppercase tracking-wider text-[10px] md:text-xs"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={onSwitchPersona}
            >
              Switch user
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 min-h-0 flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        <nav
          className="lg:w-[min(100%,320px)] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r min-h-0 xbox2-nav-edge"
          aria-label="Message list"
        >
          <div className="px-3 py-2 border-b border-base-content/10 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase opacity-60">
            <span>Messages</span>
            <span style={{ color: 'var(--accent)' }}>{emails.filter(e => !e.read).length} new</span>
          </div>
          <ul className="overflow-y-auto flex-1">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id} className="border-b border-base-content/5">
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`xbox2-row w-full text-left px-3 py-3 flex gap-3 transition-colors duration-150 ${
                      on ? 'xbox2-row-active' : 'hover:bg-base-300/20'
                    }`}
                  >
                    <span className="text-2xl shrink-0 leading-none w-10 flex items-center justify-center rounded border border-base-content/10 bg-base-300/30">
                      {e.from.avatar}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono opacity-45">{channel(e.tag)}</span>
                        {!e.read && (
                          <span className="badge badge-xs border-0 font-bold" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
                            NEW
                          </span>
                        )}
                      </span>
                      <span className="font-semibold text-sm leading-snug line-clamp-2 block mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                        {e.subject}
                      </span>
                      <span className="text-[11px] opacity-40 truncate block mt-1">{e.from.name}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main
          ref={mainRef}
          className="xbox2-main-stage flex-1 flex flex-col min-w-0 min-h-0 p-3 md:p-5"
          style={{ perspective: reducedMotion ? 'none' : '1200px' }}
          onMouseMove={onMainMove}
          onMouseLeave={onMainLeave}
        >
          {selectedEmail ? (
            <div
              className="xbox2-reader-3d flex flex-col flex-1 min-h-0"
              style={{
                transformStyle: 'preserve-3d',
                transform: reducedMotion ? undefined : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
                transition: reducedMotion ? undefined : 'transform 0.1s ease-out',
              }}
            >
              <article
                className="xbox2-reader flex flex-col flex-1 min-h-0 border-2 shadow-lg overflow-hidden xbox2-reader-depth"
                style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}
              >
                <div className={`xbox2-reader-chrome h-1 shrink-0 ${reducedMotion ? '' : 'xbox2-chrome-shimmer'}`} aria-hidden />
                <div className="px-4 py-3 flex flex-wrap gap-3 items-start border-b border-base-content/10 bg-base-300/25">
                  <span className="text-4xl">{selectedEmail.from.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="text-xs opacity-50 mt-1">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                  <span className="badge badge-outline badge-sm font-mono" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    {channel(selectedEmail.tag)}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 text-sm md:text-base leading-relaxed whitespace-pre-wrap opacity-90">
                  {selectedEmail.body}
                </div>
              </article>
            </div>
          ) : (
            <div
              className="xbox2-reader-3d flex flex-col flex-1 min-h-0 items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: reducedMotion ? undefined : `rotateX(${tilt.rx * 0.6}deg) rotateY(${tilt.ry * 0.6}deg)`,
                transition: reducedMotion ? undefined : 'transform 0.1s ease-out',
              }}
            >
              <div className="flex flex-col items-center justify-center text-center px-6 py-10 border-2 border-dashed border-base-content/15 rounded-sm xbox2-empty xbox2-reader-depth w-full max-w-md">
                <p className="text-5xl mb-3 opacity-30" aria-hidden>
                  ⬆
                </p>
                <p className="text-base font-bold opacity-50" style={{ fontFamily: 'var(--font-display)' }}>
                  Select a message
                </p>
                <p className="text-xs opacity-35 mt-2 max-w-xs">{emails.length} items in your queue</p>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l border-base-content/10 p-3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible bg-base-300/15">
          <div className="rounded border border-base-content/15 p-3 min-w-[120px] lg:min-w-0">
            <p className="text-[9px] tracking-widest opacity-45 mb-2" style={{ color: 'var(--accent)' }}>
              WEATHER
            </p>
            <p className="text-2xl">{weather.icon}</p>
            <p className="text-sm font-bold leading-tight mt-1">{weather.condition}</p>
            <p className="text-[11px] opacity-50 mt-1">
              {weather.temp}° · {weather.wind} kph
            </p>
          </div>
          <div className="rounded border border-base-content/15 p-3 min-w-[130px] lg:min-w-0 flex-1">
            <p className="text-[9px] tracking-widest opacity-45 mb-2" style={{ color: 'var(--accent)' }}>
              MARKET
            </p>
            <ul className="space-y-1.5 text-xs font-mono">
              {stocks.map(s => (
                <li key={s.ticker} className="flex justify-between gap-2">
                  <span className="opacity-70">{s.ticker}</span>
                  <span className="font-bold tabular-nums" style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#f87171' }}>
                    {s.changePct >= 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border border-base-content/15 p-3 min-w-[160px] lg:min-w-0 lg:max-h-48 overflow-y-auto">
            <p className="text-[9px] tracking-widest opacity-45 mb-2" style={{ color: 'var(--accent)' }}>
              HEADLINES
            </p>
            <ul className="text-[11px] space-y-2 opacity-80 leading-snug">
              {news.slice(0, 5).map((n, i) => (
                <li key={i} className="border-l-2 pl-2" style={{ borderColor: 'var(--accent2)' }}>
                  {n.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <footer
        className="relative z-20 shrink-0 border-t-2 overflow-hidden xbox2-ticker-bar"
        style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}
        aria-label="Stocks and news ticker"
      >
        <div className="flex items-stretch min-h-[2.25rem]">
          <div className="shrink-0 px-3 flex items-center gap-2 text-[11px] font-mono border-r border-base-content/10 bg-base-300/30">
            <span aria-hidden>{weather.icon}</span>
            <span className="opacity-80 hidden sm:inline">{weather.temp}°</span>
          </div>
          <div className="flex-1 min-w-0 flex items-center overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            {reducedMotion ? (
              <p className="whitespace-nowrap text-[11px] font-mono tracking-tight py-2 px-2 opacity-75 truncate">{tickerText}</p>
            ) : (
              <div className="xbox2-marquee flex whitespace-nowrap text-[11px] font-mono tracking-tight py-2 opacity-75 xbox2-marquee-animate">
                <span className="pr-16 shrink-0">{tickerText}</span>
                <span className="pr-16 shrink-0" aria-hidden>
                  {tickerText}
                </span>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
