import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function PentagramSlow({ className, animate }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${animate ? 'dm-pentagram-drift' : ''}`}
      aria-hidden
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
        d="M50 6 L62 40 L98 40 L70 60 L82 96 L50 74 L18 96 L30 60 L2 40 L38 40 Z"
      />
    </svg>
  )
}

function AmpStack({ className }) {
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden>
      <rect x="8" y="8" width="64" height="104" rx="4" fill="currentColor" opacity="0.2" />
      <circle cx="40" cy="38" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="40" cy="78" r="18" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <rect x="14" y="102" width="52" height="6" rx="1" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

function EqBars({ active }) {
  const heights = [40, 72, 55, 88, 48, 95, 62]
  return (
    <div className="flex h-10 items-end gap-0.5" aria-hidden>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 rounded-t-sm bg-current opacity-90 ${active ? 'dm-eq-bar' : ''}`}
          style={{
            height: active ? undefined : `${h}%`,
            animationDelay: active ? `${i * 0.09}s` : undefined,
          }}
        />
      ))}
    </div>
  )
}

export default function DeathMetalLoverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const animate = !reducedMotion
  const unread = useMemo(() => emails.filter((e) => !e.read).length, [])

  return (
    <div
      className="dm-root relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* Stage fog + noise */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className={`absolute inset-0 opacity-80 ${animate ? 'dm-fog-shift' : ''}`}
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 50% 100%, color-mix(in srgb, var(--blood) 45%, transparent), transparent 55%), radial-gradient(ellipse 90% 50% at 80% 20%, color-mix(in srgb, var(--frost) 12%, transparent), transparent), linear-gradient(180deg, var(--bg2) 0%, var(--bg) 45%, var(--pit) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className={`absolute -left-1/4 top-0 h-[120%] w-1/2 rounded-full blur-3xl ${animate ? 'dm-ember-pulse' : ''}`}
          style={{ background: 'color-mix(in srgb, var(--blood) 25%, transparent)' }}
        />
      </div>

      {/* Lightning wash */}
      <div
        className={`pointer-events-none fixed inset-0 z-[1] mix-blend-screen ${animate ? 'dm-lightning-flash' : ''}`}
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 25% 0%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(ellipse 40% 30% at 85% 5%, rgba(200,230,255,0.25), transparent 55%)',
        }}
        aria-hidden
      />

      <PentagramSlow
        className="pointer-events-none fixed -right-16 -top-8 h-64 w-64 text-[var(--blood)] md:h-96 md:w-96"
        animate={animate}
      />
      <PentagramSlow
        className="pointer-events-none fixed -bottom-20 -left-12 h-56 w-56 rotate-180 text-[var(--sulfur)] md:h-72 md:w-72"
        animate={animate}
      />

      <header
        className="relative z-20 shrink-0 border-b-2 px-3 py-4 md:px-8"
        style={{
          borderColor: 'var(--blood2)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--bg2) 92%, var(--blood)) 0%, var(--pit) 100%)',
          boxShadow: 'inset 0 -1px 0 color-mix(in srgb, var(--sulfur) 25%, transparent)',
        }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3 md:gap-5">
            <div className="relative shrink-0">
              <AmpStack className="h-20 w-14 text-[var(--sulfur)] md:h-28 md:w-[4.5rem]" />
              <span
                className={`absolute -right-1 -top-1 text-3xl md:text-4xl ${animate ? 'dm-skull-headbang' : ''}`}
                aria-hidden
              >
                💀
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--sulfur)] opacity-90"
                  style={{ fontFamily: 'var(--font-main)' }}
                >
                  Tour dates cancelled · inbox eternal
                </p>
                <div className="hidden text-[var(--blood)] sm:block sm:text-[var(--text2)]">
                  <EqBars active={animate} />
                </div>
              </div>
              <h1
                className={`dm-chrome-title text-3xl leading-none uppercase md:text-5xl ${animate ? 'dm-title-shake' : ''}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)',
                  textShadow:
                    '0 0 1px var(--blood), 3px 0 0 color-mix(in srgb, var(--blood) 70%, transparent), -3px 0 0 color-mix(in srgb, var(--frost) 50%, transparent)',
                }}
              >
                Brvtal inbox
              </h1>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text2)]">
                Setlist: {emails.length} tracks · {unread} unholy unread · Paris pit weather · merch tickers · heretic headlines
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <span
              className="rotate-[-2deg] border-2 border-[var(--text)] bg-[var(--pit)] px-2 py-1 text-[9px] font-black uppercase leading-tight text-[var(--text)]"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              Parody advisory
              <br />
              <span className="text-[var(--sulfur)]">Same data · louder UX</span>
            </span>
            <button type="button" className="btn btn-sm btn-outline border-[var(--blood)] text-[var(--blood)] hover:bg-[var(--blood)] hover:text-[var(--bg)] hover:border-[var(--blood)]" onClick={onSwitchPersona}>
              Flee the venue
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 min-h-0 flex-col lg:flex-row">
        {/* Setlist */}
        <nav
          className="flex min-h-[220px] shrink-0 flex-col overflow-hidden border-b lg:min-h-0 lg:w-[min(100%,360px)] lg:border-b-0 lg:border-r-2"
          style={{ borderColor: 'var(--blood2)' }}
          aria-label="Setlist mail"
        >
          <div
            className="shrink-0 border-b-2 px-3 py-2"
            style={{ borderColor: 'var(--blood2)', background: 'color-mix(in srgb, var(--pit) 85%, transparent)' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--sulfur)]">Tonight&apos;s setlist</p>
          </div>
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
            {emails.map((e, i) => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`group w-full border-2 p-3 text-left transition-all ${animate ? 'dm-setlist-glow' : ''} ${on ? 'dm-setlist-active' : ''}`}
                    style={{
                      borderColor: on ? 'var(--sulfur)' : 'var(--blood2)',
                      background: on
                        ? 'linear-gradient(135deg, color-mix(in srgb, var(--blood) 22%, var(--pit)), var(--pit))'
                        : 'color-mix(in srgb, var(--pit) 90%, transparent)',
                      boxShadow: on ? '0 0 24px color-mix(in srgb, var(--blood) 35%, transparent), inset 0 0 0 1px color-mix(in srgb, var(--sulfur) 40%, transparent)' : undefined,
                    }}
                  >
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[var(--frost)] opacity-80">
                        {(i + 1).toString().padStart(2, '0')}.
                      </span>
                      <span className="text-lg leading-none">{e.from.avatar}</span>
                      {!e.read && (
                        <span className="badge badge-xs border-0 bg-[var(--blood)] font-bold uppercase text-[var(--text)]">
                          blast beat
                        </span>
                      )}
                    </div>
                    <p
                      className="line-clamp-2 text-sm font-bold uppercase leading-tight tracking-wide"
                      style={{ fontFamily: 'var(--font-main)' }}
                    >
                      {e.subject}
                    </p>
                    <p className="mt-1 truncate text-[10px] uppercase tracking-wider text-[var(--text2)]">
                      feat. {e.from.name}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Main scroll */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4 md:p-6">
          {selectedEmail ? (
            <article
              className="dm-scroll-lyrics flex min-h-0 flex-1 flex-col overflow-hidden border-2"
              style={{
                borderColor: 'var(--sulfur)',
                background:
                  'linear-gradient(180deg, color-mix(in srgb, var(--pit) 95%, var(--sulfur)) 0%, var(--pit) 12%, var(--bg) 100%)',
                boxShadow: 'inset 0 0 80px color-mix(in srgb, var(--blood) 12%, transparent)',
              }}
            >
              <div className="flex shrink-0 flex-wrap items-start gap-3 border-b-2 border-[var(--blood2)] px-4 py-3 md:px-5">
                <span className="text-4xl">{selectedEmail.from.avatar}</span>
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-xl font-bold uppercase leading-tight tracking-wide md:text-2xl"
                    style={{ fontFamily: 'var(--font-main)' }}
                  >
                    {selectedEmail.subject}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[var(--text2)]">
                    Guest vocals: {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                  </p>
                </div>
                <span className="badge badge-outline border-[var(--frost)] text-[var(--frost)]">{selectedEmail.tag}</span>
              </div>
              <div className="dm-lyrics-rail min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap md:px-6 md:py-5">
                {selectedEmail.body}
              </div>
            </article>
          ) : (
            <div
              className="flex flex-1 flex-col items-center justify-center gap-4 border-2 border-dashed p-8 text-center"
              style={{ borderColor: 'var(--blood2)', color: 'var(--text2)' }}
            >
              <span className={`text-5xl ${animate ? 'dm-pick-spin' : ''}`} aria-hidden>
                🎸
              </span>
              <p className="max-w-sm text-sm font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-main)' }}>
                Choose a track from the pit wall — lyrics sheet loads here
              </p>
            </div>
          )}
        </main>

        {/* Side rail */}
        <aside
          className="flex shrink-0 flex-row gap-2 overflow-x-auto border-t p-3 lg:w-60 lg:flex-col lg:overflow-y-auto lg:border-l lg:border-t-0"
          style={{
            borderColor: 'var(--blood2)',
            background: 'color-mix(in srgb, var(--pit) 88%, transparent)',
          }}
        >
          <section
            className="min-w-[130px] flex-1 rounded border-2 p-2 lg:min-w-0"
            style={{ borderColor: 'var(--blood2)' }}
          >
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--frost)]">Outside pit</p>
            <p className="text-2xl leading-none">{weather.icon}</p>
            <p className="text-xs font-bold uppercase">{weather.city}</p>
            <p className="text-lg font-bold text-[var(--sulfur)]">{weather.temp}°C</p>
            <p className="text-[10px] uppercase leading-snug text-[var(--text2)]">{weather.condition}</p>
          </section>

          <section
            className="min-w-[140px] flex-1 rounded border-2 p-2 font-mono text-[11px] lg:min-w-0"
            style={{ borderColor: 'var(--blood2)' }}
          >
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--sulfur)]">Merch tickers</p>
            <ul className="space-y-1.5">
              {stocks.map((s) => (
                <li key={s.ticker} className="flex items-baseline justify-between gap-2 border-b border-[var(--blood2)] border-opacity-40 pb-1 last:border-0">
                  <span className="font-bold text-[var(--text)]">{s.ticker}</span>
                  <span
                    className="shrink-0 tabular-nums"
                    style={{ color: s.changePct >= 0 ? 'var(--sulfur)' : '#f87171' }}
                  >
                    {s.changePct > 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="min-w-[180px] max-h-48 flex-1 overflow-y-auto rounded border-2 p-2 lg:max-h-none lg:min-w-0"
            style={{ borderColor: 'var(--blood2)' }}
          >
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--blood)]">Blasphemy news</p>
            <ul className="space-y-2 text-[11px] leading-snug">
              {news.slice(0, 5).map((n) => (
                <li key={n.id} className="flex gap-2 border-l-2 border-[var(--sulfur)] border-opacity-50 pl-2">
                  <span className="shrink-0 text-base leading-none" aria-hidden>
                    {n.emoji}
                  </span>
                  <span>
                    <span className="font-semibold uppercase tracking-wide text-[var(--text)]">{n.title}</span>
                    <span className="mt-0.5 block text-[9px] uppercase text-[var(--text2)]">
                      {n.source} · {n.time}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}
