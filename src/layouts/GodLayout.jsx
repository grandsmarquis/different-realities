import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const plane = t =>
  ({
    work: 'Earthly office',
    personal: 'Mortals you like',
    finance: 'Coin of the realm',
    promo: 'Seraphim spam',
    newsletter: 'Cloud newsletter',
    social: 'Angel group chat',
    dev: 'Creation logs',
    shopping: 'Manna marketplace',
    travel: 'Beam-me-up',
  }[t] || 'Elsewhere')

export default function GodLayout({ onSwitchPersona }) {
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
    <div className="god-root relative min-h-dvh overflow-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="god-light-rays pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="god-clouds pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col px-4 pb-28 pt-8 md:px-8">
        <header className="text-center">
          <p className={`text-sm font-light tracking-[0.5em] text-[var(--accent2)] ${reducedMotion ? '' : 'god-glow-text'}`}>OMNISCIENT MODE</p>
          <h1 className="mt-4 text-4xl font-light md:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
            The Inbox Above
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm opacity-80">You already knew these were coming. {emails.filter(e => !e.read).length} unread anyway, for dramatic tension.</p>
          <button type="button" className="btn btn-ghost btn-sm mt-6 gap-2 text-[var(--accent2)]" onClick={onSwitchPersona}>
            Descend to mortality
          </button>
        </header>

        <div className="mt-10 grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
          <nav className="lg:col-span-4" aria-label="Prayers">
            <div className="rounded-3xl border border-white/40 bg-white/10 p-4 shadow-[0_0_60px_rgba(255,215,120,0.12)] backdrop-blur-md">
              <h2 className="mb-4 text-center text-xs font-normal uppercase tracking-[0.4em] text-[var(--accent2)]">Incoming petitions</h2>
              <ul className="space-y-2">
                {emails.map(e => {
                  const on = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`god-petition w-full rounded-2xl border px-4 py-3 text-left transition-all ${on ? 'border-[var(--accent)] bg-white/25 shadow-lg' : 'border-white/20 bg-white/5 hover:bg-white/15'}`}
                      >
                        <span className="text-[10px] uppercase tracking-widest opacity-70">{plane(e.tag)}</span>
                        <p className="mt-1 font-medium leading-snug line-clamp-2">{e.subject}</p>
                        <p className="mt-1 text-xs opacity-60">{e.from.name}</p>
                        {!e.read && <span className="mt-2 inline-block rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold text-[var(--bg)]">Unopened paradox</span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <article className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/50 bg-gradient-to-b from-white/20 to-white/5 p-8 shadow-[0_0_80px_rgba(255,200,100,0.15)] backdrop-blur-md">
                <div className={`pointer-events-none absolute -right-4 -top-4 text-7xl opacity-20 ${reducedMotion ? '' : 'god-halo-spin'}`} aria-hidden>
                  ☀️
                </div>
                <header className="relative mb-6 flex flex-wrap items-start gap-4">
                  <span className="text-5xl drop-shadow-md">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-widest text-[var(--accent2)]">{plane(selectedEmail.tag)}</p>
                    <h2 className="mt-2 text-2xl font-light md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-sm opacity-70">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </header>
                <div className="relative whitespace-pre-wrap text-sm leading-relaxed md:text-base opacity-95">{selectedEmail.body}</div>
                <footer className="mt-8 border-t border-white/20 pt-4 text-center text-xs italic opacity-70">“Reply-all” is humanity’s funniest invention.</footer>
              </article>
            ) : (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/30 p-8 text-center opacity-60">
                <span className="text-6xl">🕊️</span>
                <p className="mt-4 text-lg font-light" style={{ fontFamily: 'var(--font-display)' }}>
                  Select a petition
                </p>
              </div>
            )}
          </main>

          <aside className="flex flex-col gap-4 lg:col-span-3">
            <div className="rounded-2xl border border-white/30 bg-white/10 p-4 text-center backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-[var(--accent2)]">Sky report</p>
              <p className="mt-2 text-4xl">{weather.icon}</p>
              <p className="mt-1 font-medium">{weather.condition}</p>
              <p className="text-xs opacity-70">{weather.temp}° · {weather.wind} kph wind</p>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-[var(--accent2)]">Golden tickers</p>
              <ul className="mt-3 space-y-2 text-sm">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex justify-between gap-2 font-medium">
                    <span className="opacity-80">{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : '#fecaca' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm lg:overflow-y-auto">
              <p className="text-xs uppercase tracking-widest text-[var(--accent2)]">Prophecies (news)</p>
              <ul className="mt-3 space-y-2 text-[11px] leading-snug opacity-90">
                {news.slice(0, 5).map((n, i) => (
                  <li key={i}>• {n.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
