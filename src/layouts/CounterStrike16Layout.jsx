import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagRadio = t =>
  ({
    work: { side: 'CT', color: 'var(--ct)' },
    personal: { side: 'SPEC', color: '#7eb8ff' },
    finance: { side: '$', color: 'var(--gold)' },
    promo: { side: 'T', color: 'var(--t)' },
    newsletter: { side: 'TEAM', color: 'var(--hud)' },
    social: { side: 'RADIO', color: '#c9a0dc' },
  }[t] || { side: '???', color: 'var(--text-dim)' })

function MiniSpark({ series, up }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
  const stroke = up ? 'var(--ct)' : 'var(--t)'
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.25" points={pts} />
    </svg>
  )
}

function Crosshair({ reducedMotion }) {
  return (
    <svg
      className={reducedMotion ? '' : 'cs16-crosshair-spin'}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      aria-hidden
      style={{ color: 'var(--hud)' }}
    >
      <circle cx="26" cy="26" r="22" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <line x1="26" y1="2" x2="26" y2="14" stroke="currentColor" strokeWidth="2" />
      <line x1="26" y1="38" x2="26" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="26" x2="14" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="38" y1="26" x2="50" y2="26" stroke="currentColor" strokeWidth="2" />
      <circle cx="26" cy="26" r="3" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

function Radar({ unread, reducedMotion }) {
  const blips = Math.min(unread, 8)
  return (
    <div
      className="relative size-[4.5rem] shrink-0 rounded-full border-2 flex items-center justify-center overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'radial-gradient(circle at 50% 50%, var(--panel2) 0%, var(--bg) 75%)' }}
      aria-hidden
    >
      {!reducedMotion && <div className="cs16-radar-sweep absolute inset-0 rounded-full pointer-events-none" />}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="size-[85%] rounded-full border border-[var(--hud)]" style={{ borderStyle: 'dashed' }} />
      </div>
      <span className="relative z-[1] text-[9px] font-mono tabular-nums" style={{ color: 'var(--hud)', fontFamily: 'var(--font-mono)' }}>
        {unread}
      </span>
      {Array.from({ length: blips }).map((_, i) => (
        <span
          key={i}
          className="absolute size-1 rounded-full bg-[var(--t)]"
          style={{
            left: `${22 + (i % 4) * 18}%`,
            top: `${20 + Math.floor(i / 4) * 28}%`,
            boxShadow: '0 0 4px var(--t)',
          }}
        />
      ))}
    </div>
  )
}

export default function CounterStrike16Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const mainRef = useRef(null)
  const [recoil, setRecoil] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const unread = emails.filter(e => !e.read).length
  const timeStr = useMemo(
    () =>
      now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    [now],
  )

  const tickerText = useMemo(
    () =>
      [
        ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${Math.abs(s.changePct)}%`),
        ...news.map(n => n.title),
      ].join('   ·   '),
    [],
  )

  const onMainMove = useCallback(
    e => {
      if (reducedMotion || !mainRef.current) return
      const r = mainRef.current.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setRecoil({ x: px * 4, y: py * 3 })
    },
    [reducedMotion],
  )

  const onMainLeave = useCallback(() => setRecoil({ x: 0, y: 0 }), [])

  return (
    <div
      className="cs16-root relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-hud)',
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="cs16-dust-float absolute inset-0 opacity-40" />
        <div className={`absolute inset-0 cs16-scan-overlay ${reducedMotion ? '' : 'cs16-scan-drift'}`} />
      </div>

      <header
        className="relative z-20 shrink-0 border-b-2 px-3 py-2 md:px-4"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, var(--panel) 0%, var(--bg2) 100%)',
          boxShadow: `0 4px 0 var(--shadow)`,
        }}
      >
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="text-2xl md:text-3xl" aria-hidden>
              🔫
            </span>
            <div className="min-w-0">
              <p
                className="text-[10px] font-bold tracking-[0.35em] md:tracking-[0.5em]"
                style={{ color: 'var(--hud)', fontFamily: 'var(--font-mono)' }}
              >
                COUNTER-STRIKE
              </p>
              <h1 className="truncate text-lg font-bold leading-tight md:text-xl" style={{ letterSpacing: '0.06em' }}>
                v1.6 — de_internet
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Crosshair reducedMotion={reducedMotion} />
            <Radar unread={unread} reducedMotion={reducedMotion} />
            <div
              className="hidden font-mono text-[10px] leading-tight sm:block md:text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}
            >
              <div className="flex gap-3 tabular-nums">
                <span style={{ color: 'var(--ct)' }}>HP 100</span>
                <span style={{ color: 'var(--gold)' }}>Kev 100</span>
                <span style={{ color: 'var(--hud)' }}>$16000</span>
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider opacity-70">Freeze time: reading mail</div>
            </div>
            <div
              className="rounded border px-2 py-1 font-mono text-sm tabular-nums md:px-3"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--panel)',
                color: 'var(--hud)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {timeStr}
            </div>
            <button
              type="button"
              className="btn btn-sm border-2 uppercase tracking-wider"
              style={{
                borderColor: 'var(--t)',
                color: 'var(--t)',
                background: 'color-mix(in srgb, var(--t) 12%, transparent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
              }}
              onClick={onSwitchPersona}
            >
              ESC — disconnect
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 min-h-0 flex-col lg:flex-row">
        <nav
          className="flex min-h-[200px] shrink-0 flex-col border-b lg:min-h-0 lg:w-[min(100%,340px)] lg:border-b-0 lg:border-r"
          style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--panel) 35%, transparent)' }}
          aria-label="Radio intel"
        >
          <div
            className="flex items-center justify-between border-b px-3 py-2 text-[10px] uppercase tracking-[0.25em]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}
          >
            <span>Team radio</span>
            <span className="badge badge-sm border font-mono" style={{ borderColor: 'var(--hud)', color: 'var(--hud)' }}>
              {unread} new
            </span>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              const r = tagRadio(e.tag)
              return (
                <li key={e.id} className="border-b" style={{ borderColor: 'color-mix(in srgb, var(--border) 60%, transparent)' }}>
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`cs16-mail-row flex w-full gap-2 px-3 py-2.5 text-left transition-colors md:gap-3 md:py-3 ${
                      on ? 'cs16-mail-row-active' : ''
                    }`}
                    style={on ? { ['--cs16-side']: r.color } : undefined}
                  >
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded border text-lg md:size-11 md:text-xl"
                      style={{
                        borderColor: 'var(--border)',
                        background: 'var(--panel2)',
                      }}
                    >
                      {e.from.avatar}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold uppercase" style={{ color: r.color }}>
                          [{r.side}]
                        </span>
                        {!e.read && (
                          <span
                            className={`badge badge-xs border-0 font-mono text-[9px] ${reducedMotion ? '' : 'cs16-blink-hint'}`}
                            style={{ background: 'var(--t)', color: '#fff' }}
                          >
                            !
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-sm font-semibold leading-snug">{e.subject}</span>
                      <span className="mt-0.5 block truncate font-mono text-[10px] opacity-50">{e.from.name}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main
          ref={mainRef}
          className="relative flex min-h-[280px] flex-1 flex-col min-w-0 p-3 md:p-4"
          onMouseMove={onMainMove}
          onMouseLeave={onMainLeave}
        >
          {!reducedMotion && (
            <div
              className="pointer-events-none absolute right-4 top-4 z-[2] opacity-[0.12]"
              style={{ transform: `translate(${recoil.x}px, ${recoil.y}px)` }}
              aria-hidden
            >
              <div className="cs16-muzzle-flash size-16 rounded-full blur-md" />
            </div>
          )}

          {selectedEmail ? (
            <article
              className="cs16-briefing flex min-h-0 flex-1 flex-col overflow-hidden rounded border-2 shadow-xl"
              style={{
                borderColor: 'var(--border)',
                background: 'linear-gradient(145deg, #0d0c0a 0%, #16130f 50%, #0a0908 100%)',
                boxShadow: `0 0 0 1px color-mix(in srgb, var(--hud) 15%, transparent), 8px 8px 0 var(--shadow)`,
              }}
            >
              <div
                className={`h-1 shrink-0 ${reducedMotion ? '' : 'cs16-chrome-pulse'}`}
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--hud), transparent)',
                  opacity: 0.5,
                }}
                aria-hidden
              />
              <div
                className="flex flex-wrap items-start gap-3 border-b px-4 py-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-4xl">{selectedEmail.from.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--hud)' }}>
                    Intel — say_team
                  </p>
                  <h2 className="text-lg font-bold leading-tight md:text-xl">{selectedEmail.subject}</h2>
                  <p className="mt-1 font-mono text-xs opacity-50">
                    {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                  </p>
                </div>
                <span
                  className="badge badge-outline font-mono text-[10px]"
                  style={{ borderColor: tagRadio(selectedEmail.tag).color, color: tagRadio(selectedEmail.tag).color }}
                >
                  {tagRadio(selectedEmail.tag).side}
                </span>
              </div>
              <div
                className="min-h-0 flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap md:p-5 md:text-[15px]"
                style={{
                  color: 'color-mix(in srgb, var(--hud) 92%, #fff)',
                  fontFamily: 'var(--font-mono)',
                  textShadow: '0 0 12px color-mix(in srgb, var(--hud) 25%, transparent)',
                }}
              >
                <span className="mr-2 opacity-50">&gt;</span>
                {selectedEmail.body}
              </div>
            </article>
          ) : (
            <div
              className="flex flex-1 flex-col items-center justify-center rounded border-2 border-dashed p-8 text-center"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="font-mono text-sm" style={{ color: 'var(--hud)' }}>
                ] status
              </p>
              <p className="mt-2 text-lg font-bold opacity-60">Select intel from team radio</p>
              <p className="mt-1 font-mono text-xs opacity-40">{emails.length} messages in queue</p>
            </div>
          )}
        </main>

        <aside
          className="flex shrink-0 flex-row gap-2 overflow-x-auto border-t p-3 lg:w-60 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:border-l lg:border-t-0"
          style={{
            borderColor: 'var(--border)',
            background: 'color-mix(in srgb, var(--bg2) 90%, transparent)',
          }}
        >
          <section
            className={`min-w-[140px] flex-1 rounded border p-3 lg:min-w-0 ${reducedMotion ? '' : 'cs16-panel-glow'}`}
            style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
          >
            <p className="font-mono text-[9px] font-bold tracking-[0.2em]" style={{ color: 'var(--gold)' }}>
              BUY — MAP INTEL
            </p>
            <p className="mt-2 text-xs uppercase opacity-50">de_{weather.city.toLowerCase().replace(/\s+/g, '_')}</p>
            <p className={`mt-1 text-3xl ${reducedMotion ? '' : 'cs16-weather-nudge'}`}>{weather.icon}</p>
            <p className="mt-1 text-sm font-bold">{weather.condition}</p>
            <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--text-dim)' }}>
              {weather.temp}°C · wind {weather.wind} km/h
            </p>
          </section>

          <section
            className="min-w-[150px] flex-1 rounded border p-3 lg:min-w-0"
            style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
          >
            <p className="font-mono text-[9px] font-bold tracking-[0.2em]" style={{ color: 'var(--ct)' }}>
              SERVER — TICKERS
            </p>
            <ul className="mt-2 space-y-2">
              {stocks.map(s => (
                <li key={s.ticker} className="flex items-center gap-2 text-xs">
                  <span className="w-9 shrink-0 font-mono opacity-70">{s.ticker}</span>
                  <MiniSpark series={s.series} up={s.changePct >= 0} />
                  <span
                    className="ml-auto shrink-0 font-mono text-[11px] font-bold tabular-nums"
                    style={{ color: s.changePct >= 0 ? 'var(--ct)' : 'var(--t)' }}
                  >
                    {s.changePct >= 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="min-w-[180px] flex-1 rounded border p-3 lg:min-w-0 lg:max-h-56 lg:overflow-y-auto"
            style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
          >
            <p className="font-mono text-[9px] font-bold tracking-[0.2em]" style={{ color: 'var(--t)' }}>
              RADIO — WORLD
            </p>
            <ul className="mt-2 space-y-2 text-[11px] leading-snug">
              {news.slice(0, 6).map(n => (
                <li
                  key={n.id}
                  className="border-l-2 pl-2"
                  style={{ borderColor: 'color-mix(in srgb, var(--hud) 50%, transparent)' }}
                >
                  <span className="mr-1 opacity-60">{n.emoji}</span>
                  {n.title}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer
        className="relative z-20 shrink-0 overflow-hidden border-t-2"
        style={{
          borderColor: 'var(--border)',
          background: 'var(--bg2)',
          boxShadow: `0 -3px 0 var(--shadow)`,
        }}
        aria-label="Spectator ticker"
      >
        <div className="flex min-h-[2.25rem] items-stretch">
          <div
            className="flex shrink-0 items-center gap-2 border-r px-3 font-mono text-[11px]"
            style={{ borderColor: 'var(--border)', color: 'var(--hud)' }}
          >
            <span aria-hidden>{weather.icon}</span>
            <span className="hidden sm:inline">{weather.temp}°C</span>
          </div>
          <div className="min-w-0 flex flex-1 items-center overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
            {reducedMotion ? (
              <p className="truncate px-2 py-2 font-mono text-[11px] opacity-80">{tickerText}</p>
            ) : (
              <div className="cs16-ticker flex whitespace-nowrap font-mono text-[11px] opacity-85">
                <span className="shrink-0 pr-20">{tickerText}</span>
                <span className="shrink-0 pr-20" aria-hidden>
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
