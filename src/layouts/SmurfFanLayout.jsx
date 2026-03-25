import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const village = t =>
  ({
    work: "Papa Smurf's workshop",
    personal: 'Smurfette’s nook',
    finance: 'Bank of Blue',
    promo: 'Gargamel traps (ads)',
    newsletter: 'Village gazette',
    social: 'Harmony square',
    dev: 'Brainy’s lab',
    shopping: 'General store',
    travel: 'Forest path',
  }[t] || 'Hidden glen')

export default function SmurfFanLayout({ onSwitchPersona }) {
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
    <div className="smurf-root relative min-h-dvh overflow-x-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="smurf-sky pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className={`pointer-events-none fixed inset-0 z-0 ${reducedMotion ? '' : 'smurf-spores'}`} aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-3 pb-28 pt-6 md:px-6">
        <header className="smurf-mushroom-cap relative mb-6 rounded-[2rem] border-4 px-5 py-5 shadow-xl" style={{ borderColor: 'var(--accent2)', background: 'linear-gradient(180deg, #ffffff 0%, #e3f2fd 100%)' }}>
          <div className="absolute -top-3 left-1/2 size-8 -translate-x-1/2 rounded-full border-4" style={{ borderColor: 'var(--accent2)', background: 'white' }} aria-hidden />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-wide" style={{ color: 'var(--accent)' }}>
                La-la-la-la-la-la ♪
              </p>
              <h1 className="text-2xl font-extrabold md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                Mushroom Post Office
              </h1>
              <p className="mt-1 max-w-md text-sm opacity-80">Tiny blue letters. Giant mushroom stamps. Same inbox, smurfier font.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 rounded-full border-2 px-4 py-2 font-bold shadow-md" style={{ borderColor: 'var(--accent)', background: 'white', color: 'var(--accent2)' }}>
                <span className="text-2xl">🍄</span>
                <span>{emails.filter(e => !e.read).length} smurfy new</span>
              </div>
              <button type="button" className="btn btn-sm rounded-full border-2 font-bold" style={{ borderColor: 'var(--accent2)', background: 'var(--accent)', color: 'white' }} onClick={onSwitchPersona}>
                Leave village
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <nav className="lg:w-[340px] lg:shrink-0" aria-label="Letters">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest" style={{ color: 'white' }}>
              <span>📬</span> Pouch
            </h2>
            <ul className="space-y-3">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`smurf-letter w-full rounded-2xl border-4 p-4 text-left shadow-lg transition-transform ${on ? 'smurf-letter-picked scale-[1.02]' : 'hover:-translate-y-0.5 active:translate-y-0'}`}
                      style={{
                        borderColor: on ? 'var(--accent)' : 'white',
                        background: 'linear-gradient(145deg, #ffffff 0%, #bbdefb 100%)',
                        boxShadow: on ? '0 0 0 3px color-mix(in srgb, var(--accent) 40%, transparent)' : undefined,
                      }}
                    >
                      <div className="flex gap-3">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 text-2xl" style={{ borderColor: 'var(--accent2)', background: 'white' }}>
                          {e.from.avatar}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                            {village(e.tag)}
                          </p>
                          <p className="font-extrabold leading-snug" style={{ color: 'var(--accent2)' }}>
                            {e.subject}
                          </p>
                          <p className="mt-1 text-xs opacity-70">{e.from.name}</p>
                          {!e.read && (
                            <span className="badge badge-sm mt-2 border-0 font-bold" style={{ background: 'var(--accent)', color: 'white' }}>
                              Fresh dew!
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="min-h-[320px] flex-1">
            {selectedEmail ? (
              <article className="relative overflow-hidden rounded-[2rem] border-4 p-6 shadow-2xl md:p-8" style={{ borderColor: 'white', background: 'linear-gradient(180deg, #fff 0%, #e1f5fe 55%, #b3e5fc 100%)' }}>
                <div className={`pointer-events-none absolute -right-8 -top-8 text-8xl opacity-20 ${reducedMotion ? '' : 'smurf-float-emoji'}`} aria-hidden>
                  🍄
                </div>
                <header className="relative mb-4 flex flex-wrap items-start gap-4 border-b-2 border-dashed pb-4" style={{ borderColor: 'var(--accent2)' }}>
                  <span className="text-5xl drop-shadow-md">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-extrabold md:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-sm opacity-70">
                      From {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </header>
                <div className="relative whitespace-pre-wrap text-sm leading-relaxed md:text-base">{selectedEmail.body}</div>
                <footer className="mt-8 flex flex-wrap gap-3 border-t-2 border-dashed pt-4 text-xs" style={{ borderColor: 'var(--accent2)' }}>
                  <span className="rounded-full bg-white/80 px-3 py-1 font-bold" style={{ color: 'var(--accent)' }}>
                    Sealed with smurf saliva (digital)
                  </span>
                </footer>
              </article>
            ) : (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-[2rem] border-4 border-dashed p-8 text-center opacity-70" style={{ borderColor: 'white', color: 'white' }}>
                <p className="text-5xl">🍄</p>
                <p className="mt-4 font-bold">Pick a mushroom envelope!</p>
              </div>
            )}
          </main>
        </div>

        <aside className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border-4 p-4 text-center shadow-lg" style={{ borderColor: 'white', background: 'color-mix(in srgb, white 85%, transparent)' }}>
            <p className="text-3xl">{weather.icon}</p>
            <p className="mt-1 font-bold" style={{ color: 'var(--accent2)' }}>
              {weather.condition}
            </p>
            <p className="text-xs opacity-70">
              {weather.temp}° — perfect for smurfing
            </p>
          </div>
          <div className="rounded-2xl border-4 p-4 shadow-lg" style={{ borderColor: 'white', background: 'color-mix(in srgb, white 85%, transparent)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Berry stocks</p>
            <ul className="mt-2 space-y-1 text-sm font-bold">
              {stocks.map(s => (
                <li key={s.ticker} className="flex justify-between gap-2" style={{ color: 'var(--accent2)' }}>
                  <span>{s.ticker}</span>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#c62828' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-4 p-4 shadow-lg" style={{ borderColor: 'white', background: 'color-mix(in srgb, white 85%, transparent)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Village news</p>
            <ul className="mt-2 space-y-1.5 text-xs leading-snug">
              {news.slice(0, 4).map((n, i) => (
                <li key={i}>• {n.title}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
