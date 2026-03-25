import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const corridor = t =>
  ({
    work: 'Bridge — duty roster',
    personal: 'Meditation chamber',
    finance: 'Death Star budget',
    promo: 'Holonet ads',
    newsletter: 'Imperial digest',
    social: 'Troop karaoke',
    dev: 'Droid syslog',
    shopping: 'Armory surplus',
    travel: 'Hyperlane ETA',
  }[t] || 'Unknown sector')

const vadorBorder = 'color-mix(in srgb, var(--accent) 25%, transparent)'
const vadorBorderSoft = 'color-mix(in srgb, var(--accent) 12%, transparent)'

export default function DarthVadorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return (
    <div className="vador-root relative min-h-dvh overflow-hidden bg-black" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="vador-stars pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className={`vador-breathe pointer-events-none fixed inset-0 z-0 ${reducedMotion ? 'opacity-20' : ''}`} aria-hidden />
      {!reducedMotion && (
        <div className="vador-scanlines pointer-events-none fixed inset-0 z-[1] opacity-[0.07]" aria-hidden />
      )}

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="shrink-0 border-b-2 px-4 py-4 md:px-8" style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)', boxShadow: reducedMotion ? undefined : '0 0 40px color-mix(in srgb, var(--accent) 15%, transparent)' }}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`relative flex size-14 items-center justify-center rounded-full border-2 md:size-16 ${reducedMotion ? '' : 'vador-helmet-ring'}`} style={{ borderColor: 'var(--accent)', background: '#0a0a0a' }}>
                <span className="text-3xl opacity-90" aria-hidden>
                  🖤
                </span>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] text-[var(--accent)]">HELMET TERMINAL</p>
                <h1 className="text-xl font-bold tracking-wide md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Breathing Room Inbox
                </h1>
                <p className="mt-1 font-mono text-xs opacity-60">{emails.filter(e => !e.read).length} transmissions unanswered. Good.</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm border font-mono text-xs uppercase tracking-widest"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'transparent' }}
              onClick={onSwitchPersona}
            >
              Leave the dark side
            </button>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-4 p-4 md:flex-row md:gap-0 md:p-6">
          <nav className="flex min-h-0 w-full shrink-0 flex-col border md:w-[300px] md:border-r md:border-b-0" style={{ borderColor: vadorBorder }} aria-label="Transmission list">
            <div className="border-b px-3 py-2 font-mono text-[10px] tracking-widest text-[var(--accent)]" style={{ borderColor: vadorBorder }}>
              PRIORITY CHANNELS
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id} className="border-b" style={{ borderColor: vadorBorderSoft }}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`vador-row w-full px-3 py-3 text-left font-mono transition-colors hover:bg-white/5 ${on ? 'vador-row-active' : ''}`}
                      style={{ background: on ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : undefined }}
                    >
                      <span className="block text-[9px] tracking-widest text-[var(--accent)] opacity-80">{corridor(e.tag)}</span>
                      <span className="mt-1 block text-sm font-bold leading-snug line-clamp-2">{e.subject}</span>
                      <span className="mt-1 block text-[11px] opacity-45">{e.from.name}</span>
                      {!e.read && (
                        <span className="mt-2 inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: 'var(--accent)', color: '#000' }}>
                          Unread
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="flex min-h-[240px] min-w-0 flex-1 flex-col md:border md:border-l-0" style={{ borderColor: vadorBorder }}>
            {selectedEmail ? (
              <article className="flex min-h-0 flex-1 flex-col">
                <div className="flex flex-wrap items-start gap-4 border-b p-4 md:p-6" style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}>
                  <span className="text-4xl md:text-5xl">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-widest text-[var(--accent)]">{corridor(selectedEmail.tag)}</p>
                    <h2 className="mt-2 text-xl font-bold md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 font-mono text-xs opacity-50">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap opacity-90 md:p-6">{selectedEmail.body}</div>
              </article>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center opacity-50">
                <p className="font-mono text-xs tracking-[0.3em] text-[var(--accent)]">NO SIGNAL SELECTED</p>
                <p className="max-w-xs text-sm">Your lack of clicks is disturbing.</p>
              </div>
            )}
          </main>

          <aside className="flex w-full shrink-0 flex-col gap-3 md:w-52 md:border-l md:pl-4" style={{ borderColor: vadorBorder }}>
            <div className="border p-3 font-mono" style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}>
              <p className="text-[9px] tracking-widest text-[var(--accent)]">ATMOSPHERE</p>
              <p className="mt-2 text-2xl">{weather.icon}</p>
              <p className="text-xs font-bold">{weather.condition}</p>
              <p className="text-[10px] opacity-50">{weather.temp}°</p>
            </div>
            <div className="border p-3 font-mono" style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}>
              <p className="text-[9px] tracking-widest text-[var(--accent)]">CREDITS</p>
              <ul className="mt-2 space-y-1.5 text-xs">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex justify-between gap-2">
                    <span className="opacity-70">{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#f87171' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto border p-3 font-mono" style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}>
              <p className="text-[9px] tracking-widest text-[var(--accent)]">IMPERIAL BRIEF</p>
              <ul className="mt-2 space-y-2 text-[10px] leading-snug opacity-85">
                {news.slice(0, 5).map((n, i) => (
                  <li key={i}>▸ {n.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
