import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const channel = t =>
  ({
    work: 'Team build',
    personal: 'Friends',
    finance: 'Economy',
    promo: 'Featured',
    newsletter: 'Updates',
    social: 'Social',
  }[t] || 'Other')

function SparkBlocks({ series, positive }) {
  const pts = series.slice(-14)
  const lo = Math.min(...pts)
  const hi = Math.max(...pts)
  const span = hi - lo || 1
  return (
    <div className="flex h-8 items-end gap-0.5" aria-hidden>
      {pts.map((v, i) => {
        const hPx = 5 + ((v - lo) / span) * 23
        return (
          <span
            key={i}
            className={`rbx-spark-cell w-[5px] shrink-0 rounded-sm ${positive ? 'bg-[var(--accent3)]' : 'bg-error/80'}`}
            style={{ height: hPx, minHeight: 4, animationDelay: `${i * 0.04}s` }}
          />
        )
      })}
    </div>
  )
}

export default function RobloxWebLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const mainRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const unread = emails.filter(e => !e.read).length
  const tickerText = useMemo(
    () =>
      [
        ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct)}%`),
        ...news.map(n => n.title),
      ].join('   ◆   '),
    [],
  )

  const onMainMove = useCallback(
    e => {
      if (reducedMotion || !mainRef.current) return
      const r = mainRef.current.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setTilt({ rx: py * -5, ry: px * 6 })
    },
    [reducedMotion],
  )
  const onMainLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), [])

  return (
    <div
      className="rbx-root relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="rbx-sky pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className={`rbx-stud-layer pointer-events-none fixed inset-0 z-0 ${reducedMotion ? '' : 'rbx-stud-parallax'}`} aria-hidden />
      {!reducedMotion && (
        <>
          <div className="rbx-cloud rbx-cloud-a pointer-events-none fixed z-0" aria-hidden />
          <div className="rbx-cloud rbx-cloud-b pointer-events-none fixed z-0" aria-hidden />
          <div className="rbx-particle-layer pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            {['◆', '■', '●', '▲'].map((sym, i) => (
              <span key={i} className="rbx-bit" style={{ left: `${12 + i * 22}%`, animationDelay: `${i * 1.2}s` }}>
                {sym}
              </span>
            ))}
          </div>
        </>
      )}

      <header className="rbx-topbar relative z-20 shrink-0 border-b-4 px-3 py-3 md:px-5" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="rbx-logo-tilt flex shrink-0 items-center gap-2 rounded-lg border-2 px-2 py-1.5 shadow-[4px_4px_0_0_var(--accent)]" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
              <svg width="36" height="36" viewBox="0 0 48 48" className="shrink-0" aria-hidden>
                <rect x="4" y="28" width="40" height="16" rx="2" fill="var(--accent2)" />
                <rect x="10" y="12" width="28" height="18" rx="2" fill="var(--accent)" />
                <rect x="16" y="4" width="16" height="10" rx="1" fill="var(--accent3)" />
                <circle cx="18" cy="20" r="3" fill="#1a1d21" />
                <circle cx="30" cy="20" r="3" fill="#1a1d21" />
              </svg>
              <div className="min-w-0">
                <p className="font-display text-lg leading-none tracking-tight md:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  STUD WEB
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60" style={{ color: 'var(--accent)' }}>
                  Block browser v2
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex" aria-hidden>
              {[0, 1, 2, 3].map(i => (
                <span
                  key={i}
                  className="rbx-friend-orbit size-9 rounded-lg border-2 border-[var(--border)] bg-[var(--card)] text-center text-lg leading-8 shadow-[3px_3px_0_0_rgba(0,0,0,0.25)]"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {['🎮', '🤖', '🦄', '🐱'][i]}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="rbx-online-pill flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-bold" style={{ borderColor: 'var(--accent3)', background: 'color-mix(in srgb, var(--accent3) 12%, transparent)' }}>
              <span className={`size-2 rounded-full bg-[var(--accent3)] ${reducedMotion ? '' : 'rbx-ping-dot'}`} />
              <span className="tabular-nums">{unread} new mail</span>
            </div>
            <div className="hidden rounded-lg border-2 border-[var(--border)] bg-[var(--card)] px-2 py-1 text-center sm:block">
              <p className="text-[9px] font-bold uppercase tracking-wider opacity-50">Robux… jk</p>
              <p className="text-sm font-black tabular-nums leading-none" style={{ color: 'var(--accent2)' }}>
                {Math.floor(weather.temp * 99)}
              </p>
            </div>
            <button type="button" className="btn btn-sm border-2 font-bold shadow-[3px_3px_0_0_var(--border)]" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={onSwitchPersona}>
              Leave server
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[1700px] min-h-0 flex-1 flex-col gap-3 p-3 md:flex-row md:gap-0 md:p-4">
        <nav
          className="rbx-mail-dock flex shrink-0 flex-col border-2 md:w-[min(100%,300px)] md:border-r-0 md:border-b-0"
          style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card) 92%, transparent)' }}
          aria-label="Message inventory"
        >
          <div className="flex items-center justify-between border-b-2 px-3 py-2" style={{ borderColor: 'var(--border)' }}>
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--accent2)' }}>
              Backpack
            </span>
            <span className="badge badge-sm border-2 font-bold" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              {emails.length} items
            </span>
          </div>
          <ul className="max-h-[220px] overflow-y-auto md:max-h-none md:flex-1">
            {emails.map((e, idx) => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id} className="border-b-2 last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`rbx-mail-slot group flex w-full gap-2 px-2 py-2.5 text-left transition-transform md:px-3 ${on ? 'rbx-mail-active' : 'hover:brightness-110 active:scale-[0.99]'}`}
                    style={reducedMotion ? undefined : { animationDelay: `${idx * 0.05}s` }}
                  >
                    <span className="rbx-avatar-cube flex size-11 shrink-0 items-center justify-center rounded-md border-2 text-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.35)]" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                      {e.from.avatar}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1">
                        <span className="text-[9px] font-bold uppercase opacity-45">{channel(e.tag)}</span>
                        {!e.read && (
                          <span className="rounded px-1 text-[9px] font-black uppercase" style={{ background: 'var(--accent3)', color: 'var(--bg)' }}>
                            NEW
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug">{e.subject}</span>
                      <span className="mt-0.5 truncate text-[11px] opacity-50">{e.from.name}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main
          ref={mainRef}
          className="rbx-stage flex min-h-[280px] min-w-0 flex-1 flex-col p-2 md:min-h-0 md:p-4"
          style={{ perspective: reducedMotion ? 'none' : '1000px' }}
          onMouseMove={onMainMove}
          onMouseLeave={onMainLeave}
        >
          {selectedEmail ? (
            <article
              className="rbx-dialogue flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-4 shadow-[8px_8px_0_0_rgba(0,0,0,0.35)]"
              style={{
                borderColor: 'var(--accent)',
                background: 'var(--card)',
                transformStyle: 'preserve-3d',
                transform: reducedMotion ? undefined : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: reducedMotion ? undefined : 'transform 0.12s ease-out',
              }}
            >
              <div
                className={`rbx-dialogue-notch relative shrink-0 overflow-hidden px-4 py-3 ${reducedMotion ? '' : 'rbx-shine-sweep'}`}
                style={{ background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent3) 55%, var(--accent)))' }}
              >
                <div className="relative z-[1] flex flex-wrap items-start gap-3">
                  <span className="rbx-npc-face flex size-14 shrink-0 items-center justify-center rounded-lg border-4 border-[#1a1d21] bg-[#1a1d21] text-3xl shadow-inner">
                    {selectedEmail.from.avatar}
                  </span>
                  <div className="min-w-0 flex-1 text-[#0a1628]">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">NPC says…</p>
                    <h2 className="font-display text-lg leading-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-1 text-xs font-semibold opacity-80">
                      {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                    </p>
                  </div>
                  <span className="badge border-2 border-[#0a1628] bg-[#0a1628] font-bold text-[#f5f6f7]">{channel(selectedEmail.tag)}</span>
                </div>
              </div>
              <div className="rbx-scroll flex-1 overflow-y-auto p-4 text-sm leading-relaxed whitespace-pre-wrap md:p-6 md:text-base">
                {selectedEmail.body}
              </div>
              <div className="flex shrink-0 justify-end gap-2 border-t-2 border-[var(--border)] bg-[var(--bg2)] px-3 py-2">
                <button type="button" className="btn btn-sm btn-ghost font-bold opacity-70">
                  Trade ignore
                </button>
                <button type="button" className="btn btn-sm font-black shadow-[3px_3px_0_0_var(--accent2)]" style={{ background: 'var(--accent2)', color: '#1a1200', borderColor: 'transparent' }}>
                  OK
                </button>
              </div>
            </article>
          ) : (
            <div
              className="flex flex-1 flex-col items-center justify-center rounded-xl border-4 border-dashed p-8 text-center"
              style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--card) 70%, transparent)' }}
            >
              <span className={`text-6xl ${reducedMotion ? '' : 'rbx-bounce-emoji'}`} aria-hidden>
                📦
              </span>
              <p className="mt-4 font-display text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                Equip a message
              </p>
              <p className="mt-2 max-w-sm text-sm opacity-60">Tap something in your backpack to read it. Same data — different dimension.</p>
            </div>
          )}
        </main>

        <aside
          className="rbx-side flex shrink-0 flex-col gap-3 md:w-56 lg:w-64"
          style={{ color: 'var(--text)' }}
        >
          <section
            className={`rounded-xl border-4 p-3 shadow-[5px_5px_0_0_var(--border)] ${reducedMotion ? '' : 'rbx-card-wobble'}`}
            style={{ borderColor: 'var(--accent3)', background: 'var(--card)' }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--accent3)' }}>
              Skybox
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className={`text-5xl ${reducedMotion ? '' : 'rbx-weather-spin'}`}>{weather.icon}</span>
              <div>
                <p className="font-display text-2xl tabular-nums leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {weather.temp}°
                </p>
                <p className="text-xs font-bold opacity-70">{weather.condition}</p>
                <p className="text-[11px] opacity-50">
                  {weather.city} · wind {weather.wind} km/h
                </p>
              </div>
            </div>
            <ul className="mt-3 flex gap-1 overflow-x-auto pb-1">
              {weather.forecast.map(d => (
                <li key={d.day} className="rbx-forecast-chip shrink-0 rounded-lg border-2 px-2 py-1 text-center text-[10px] font-bold" style={{ borderColor: 'var(--border)' }}>
                  <div>{d.day}</div>
                  <div className="text-base leading-none">{d.icon}</div>
                  <div className="tabular-nums opacity-70">
                    {d.high}°/{d.low}°
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border-4 p-3 shadow-[5px_5px_0_0_var(--border)]" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--accent2)' }}>
              Trade tower
            </p>
            <ul className="mt-2 space-y-3">
              {stocks.map(s => (
                <li key={s.ticker} className="rounded-lg border-2 p-2" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black">{s.ticker}</span>
                    <span className={`font-black tabular-nums ${s.changePct >= 0 ? 'text-[var(--accent3)]' : 'text-error'}`}>
                      {s.changePct >= 0 ? '+' : ''}
                      {s.changePct}%
                    </span>
                  </div>
                  <SparkBlocks series={s.series} positive={s.changePct >= 0} />
                  <p className="mt-1 text-[10px] opacity-50">
                    {s.currency}
                    {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rbx-broadcast flex min-h-0 flex-1 flex-col rounded-xl border-4 p-3 shadow-[5px_5px_0_0_var(--border)] md:max-h-64" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
            <p className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              Server feed
            </p>
            <ul className="rbx-scroll mt-2 flex-1 space-y-2 overflow-y-auto text-xs leading-snug">
              {news.map(n => (
                <li key={n.id} className="rbx-feed-line flex gap-2 rounded-md border-l-4 bg-[var(--bg2)] py-2 pl-2 pr-1" style={{ borderColor: 'var(--accent2)' }}>
                  <span className="text-lg leading-none">{n.emoji}</span>
                  <span>
                    <span className="font-bold">{n.title}</span>
                    <span className="mt-0.5 block text-[10px] opacity-50">
                      {n.source} · {n.time}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer
        className="rbx-ticker relative z-20 shrink-0 overflow-hidden border-t-4"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}
        aria-label="Stocks and headlines ticker"
      >
        <div className="flex min-h-10 items-center">
          <div className="flex shrink-0 items-center gap-2 border-r-4 px-3 py-2 font-black" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <span className="text-lg" aria-hidden>
              📢
            </span>
            <span className="hidden text-[10px] uppercase tracking-wider sm:inline">Live</span>
          </div>
          <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
            {reducedMotion ? (
              <p className="truncate px-2 py-2 text-[11px] font-bold opacity-80">{tickerText}</p>
            ) : (
              <div className="rbx-ticker-track flex whitespace-nowrap py-2 text-[11px] font-bold opacity-85">
                <span className="pr-20">{tickerText}</span>
                <span className="pr-20" aria-hidden>
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
