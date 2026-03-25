import { useContext, useEffect, useId, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const holoChannel = t =>
  ({
    work: 'Alliance priority channel',
    personal: 'Holocron (personal)',
    finance: 'Banking clan ledger',
    promo: 'HoloNet promos',
    newsletter: 'Jedi Archives digest',
    social: 'Cantina chatter',
    dev: 'Astromech syslog',
    shopping: 'Droid depot orders',
    travel: 'Hyperspace lanes',
  }[t] || 'Unknown sector')

const borderGlow = 'color-mix(in srgb, var(--accent2) 40%, transparent)'
const borderSoft = 'color-mix(in srgb, var(--accent2) 18%, transparent)'

function LightsaberHeader({ reducedMotion }) {
  const rid = useId().replace(/:/g, '')
  const gid = `swfan-blade-${rid}`
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <svg width="140" height="14" viewBox="0 0 140 14" className="shrink-0 opacity-95">
        <defs>
          <linearGradient id={`${gid}-blade`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0" y="5" width="28" height="5" rx="1.5" fill="#64748b" />
        <rect x="6" y="3" width="6" height="9" rx="1" fill="#475569" />
        <rect x="28" y="4" width="112" height="6" rx="2" fill={`url(#${gid}-blade)`} filter={reducedMotion ? undefined : `url(#${gid}-glow)`} className={reducedMotion ? '' : 'swfan-saber-flicker'} />
      </svg>
    </div>
  )
}

export default function StarWarsFanLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const crawlLines = useMemo(() => {
    const lines = news.map(n => `${n.emoji} ${n.title}`)
    return [...lines, ...lines]
  }, [])

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="swfan-root relative min-h-dvh overflow-hidden text-[var(--text)]"
      style={{ fontFamily: 'var(--font-main)', background: 'var(--bg)' }}
    >
      <div className="swfan-starfield pointer-events-none fixed inset-0 z-0" aria-hidden />
      {!reducedMotion && <div className="swfan-hyperspin pointer-events-none fixed z-[1]" aria-hidden />}
      <div
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header
          className="shrink-0 border-b-2 px-4 py-4 md:px-8"
          style={{
            borderColor: borderGlow,
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg2) 92%, transparent) 0%, transparent 100%)',
            boxShadow: reducedMotion ? undefined : '0 0 50px color-mix(in srgb, var(--accent2) 12%, transparent)',
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4">
              <div
                className={`relative flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 md:size-[4.5rem] ${reducedMotion ? '' : 'swfan-droid-bob'}`}
                style={{
                  borderColor: 'var(--accent)',
                  background: 'linear-gradient(145deg, var(--bg2) 0%, var(--bg) 100%)',
                  boxShadow: '0 0 24px color-mix(in srgb, var(--accent2) 25%, transparent)',
                }}
              >
                <span className="text-4xl md:text-5xl" aria-hidden>
                  🤖
                </span>
                {!reducedMotion && <span className="swfan-blink-led pointer-events-none absolute right-2 top-2 size-2 rounded-full bg-cyan-400" aria-hidden />}
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--accent2)]">HOLO NET · INBOX</p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-bold tracking-wide text-[var(--accent)] md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    Galactic fan terminal
                  </h1>
                  <LightsaberHeader reducedMotion={reducedMotion} />
                </div>
                <p className="mt-1 text-sm text-[var(--text2)] opacity-90">
                  {unread === 0
                    ? 'Inbox clear — the Force is strong with this one.'
                    : `${unread} unread holomessage${unread === 1 ? '' : 's'}. May the Force be with your replies.`}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm border-2 font-semibold uppercase tracking-wider"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--bg)',
                background: 'var(--accent)',
              }}
              onClick={onSwitchPersona}
            >
              Exit hyperspace
            </button>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-4 p-4 md:flex-row md:gap-0 md:p-6">
          <nav
            className="card flex min-h-0 w-full shrink-0 flex-col border-2 border-[var(--border)] bg-[var(--card)] shadow-lg backdrop-blur-sm md:w-[300px] md:rounded-r-none md:border-r-0"
            aria-label="Holo message list"
          >
            <div
              className="border-b border-[var(--border)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Transmission queue
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id} className="border-b" style={{ borderColor: borderSoft }}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`swfan-mail-row group w-full px-3 py-3 text-left transition-all duration-200 ${on ? 'swfan-mail-active' : ''} ${!on ? 'hover:bg-white/5' : ''}`}
                      style={{
                        background: on ? 'color-mix(in srgb, var(--accent2) 14%, transparent)' : undefined,
                        boxShadow: on ? 'inset 0 0 0 1px color-mix(in srgb, var(--accent2) 35%, transparent)' : undefined,
                      }}
                    >
                      <span className="block text-[9px] font-semibold uppercase tracking-wider text-[var(--accent2)] opacity-90">
                        {holoChannel(e.tag)}
                      </span>
                      <span className="mt-1 block text-sm font-bold leading-snug text-[var(--text)] line-clamp-2">{e.subject}</span>
                      <span className="mt-1 flex items-center gap-2 text-[11px] opacity-60">
                        <span>{e.from.avatar}</span>
                        <span>{e.from.name}</span>
                      </span>
                      {!e.read && (
                        <span
                          className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                        >
                          New
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="card flex min-h-[240px] min-w-0 flex-1 flex-col border-2 border-[var(--border)] bg-[var(--card)] shadow-lg backdrop-blur-sm md:rounded-none">
            {selectedEmail ? (
              <article className="flex min-h-0 flex-1 flex-col">
                <div
                  className="flex flex-wrap items-start gap-4 border-b p-4 md:p-6"
                  style={{ borderColor: borderSoft }}
                >
                  <span className="text-4xl md:text-5xl">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent2)]">{holoChannel(selectedEmail.tag)}</p>
                    <h2 className="mt-2 text-xl font-bold text-[var(--accent)] md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-xs opacity-55">
                      {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time} local
                    </p>
                  </div>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 text-sm leading-relaxed whitespace-pre-wrap opacity-95 md:p-6">
                  {selectedEmail.body}
                </div>
              </article>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center opacity-70">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                  No signal
                </p>
                <p className="max-w-xs text-sm">Pick a transmission from the queue, young padawan.</p>
              </div>
            )}
          </main>

          <aside className="flex w-full shrink-0 flex-col gap-3 md:w-56">
            <div
              className="card border-2 border-[var(--border)] bg-[var(--card)] p-3 shadow-md backdrop-blur-sm"
              style={{ boxShadow: reducedMotion ? undefined : '0 0 20px color-mix(in srgb, var(--accent2) 8%, transparent)' }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                Planetary scan
              </p>
              <p className="mt-2 font-mono text-[10px] text-[var(--accent2)]">
                {weather.city} system · {weather.country}
              </p>
              <p className="mt-2 text-3xl leading-none">{weather.icon}</p>
              <p className="mt-1 text-sm font-bold">{weather.condition}</p>
              <p className="text-xs opacity-70">
                {weather.temp}° · feels {weather.feels_like}° · wind {weather.wind} km/h
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {weather.forecast.slice(0, 4).map(d => (
                  <li
                    key={d.day}
                    className="badge badge-sm border border-[var(--border)] bg-base-300/40 font-mono text-[10px] text-[var(--text)]"
                  >
                    {d.day} {d.icon} {d.high}°
                  </li>
                ))}
              </ul>
            </div>

            <div className="card border-2 border-[var(--border)] bg-[var(--card)] p-3 shadow-md backdrop-blur-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                Galactic exchange
              </p>
              <ul className="mt-2 space-y-2 text-xs">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center justify-between gap-2 border-b border-[var(--border)] border-opacity-40 pb-2 last:border-0 last:pb-0">
                    <span className="font-mono font-bold text-[var(--accent2)]">{s.ticker}</span>
                    <span
                      className="font-mono font-semibold tabular-nums"
                      style={{ color: s.changePct >= 0 ? '#4ade80' : '#f87171' }}
                    >
                      {s.changePct >= 0 ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                      {s.changePct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card relative min-h-[168px] flex-1 overflow-hidden border-2 border-[var(--border)] bg-black/50 p-0 shadow-md backdrop-blur-sm">
              <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[var(--bg)] to-transparent px-3 pb-6 pt-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                  HoloFeed crawl
                </p>
              </div>
              <div
                className="swfan-crawl-viewport px-3 pt-8"
                style={{ perspective: reducedMotion ? 'none' : '280px' }}
              >
                <div
                  className={reducedMotion ? 'swfan-crawl-static text-center' : 'swfan-crawl-scroll text-center'}
                  style={{
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 0 12px color-mix(in srgb, var(--accent) 35%, transparent)',
                  }}
                >
                  {crawlLines.map((line, i) => (
                    <p key={i} className="mb-4 text-[11px] font-normal leading-relaxed md:text-xs">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
