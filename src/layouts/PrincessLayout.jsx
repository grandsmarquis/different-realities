import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const decree = t =>
  ({
    work: 'Royal charter',
    personal: 'Handwritten scroll',
    finance: 'Treasury missive',
    promo: 'Court jester promo',
    newsletter: 'Kingdom gazette',
    social: 'Ball invitation',
    dev: 'Wizard API',
    shopping: 'Silk road cart',
    travel: 'Carriage ETA',
  }[t] || 'Mysterious seal')

export default function PrincessLayout({ onSwitchPersona }) {
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
    <div className="princess-root relative min-h-dvh overflow-x-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="princess-aurora pointer-events-none fixed inset-0 z-0" aria-hidden />
      {!reducedMotion && (
        <>
          <div className="princess-sparkle-layer pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="princess-sparkle absolute text-lg opacity-60"
                style={{
                  left: `${(i * 17) % 100}%`,
                  top: `${(i * 23) % 90}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                ✦
              </span>
            ))}
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-3 pb-24 pt-4 md:px-8">
        <header className="princess-arch relative mb-6 text-center">
          <div className={`mx-auto inline-flex items-center justify-center ${reducedMotion ? '' : 'princess-crown-bob'}`}>
            <span className="text-5xl drop-shadow-lg md:text-6xl" aria-hidden>
              👑
            </span>
          </div>
          <h1 className="mt-2 bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-[var(--accent)] bg-clip-text text-3xl font-bold text-transparent md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            Correspondence Chamber
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm opacity-80">Your highness, {emails.filter(e => !e.read).length} scrolls await thy gaze.</p>
          <button
            type="button"
            className="btn btn-sm btn-ghost mt-4 gap-2 border border-[var(--accent)]/30 bg-white/40 backdrop-blur-sm"
            style={{ color: 'var(--accent2)' }}
            onClick={onSwitchPersona}
          >
            <span>🏰</span> Return to common lands
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:items-stretch">
          <nav className="lg:w-80 lg:shrink-0" aria-label="Scrolls">
            <div className="princess-mirror-frame rounded-t-[3rem] border-4 p-1 shadow-2xl" style={{ borderColor: 'var(--accent)', background: 'linear-gradient(160deg, #fff8fc 0%, #ffe4f0 100%)' }}>
              <div className="rounded-b-2xl rounded-t-[2.5rem] bg-white/90 p-3">
                <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.35em] opacity-50">Antechamber</p>
                <ul className="max-h-[50vh] space-y-2 overflow-y-auto lg:max-h-none">
                  {emails.map(e => {
                    const on = selectedEmail?.id === e.id
                    return (
                      <li key={e.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedEmail(e)}
                          className={`princess-scroll-btn w-full rounded-2xl border-2 px-4 py-3 text-left transition-all ${on ? 'princess-scroll-glow scale-[1.02] shadow-lg' : 'border-[var(--border)] hover:border-[var(--accent)]/50'}`}
                          style={{
                            borderColor: on ? 'var(--accent)' : undefined,
                            background: on ? 'linear-gradient(90deg, #fff0f8 0%, #ffffff 100%)' : 'white',
                          }}
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                            {decree(e.tag)}
                          </p>
                          <p className="mt-1 font-semibold leading-snug line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                            {e.subject}
                          </p>
                          <p className="mt-1 text-xs opacity-50">{e.from.name}</p>
                          {!e.read && <span className="badge badge-xs mt-2 border-0" style={{ background: 'var(--accent2)', color: 'white' }}>Unopened</span>}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </nav>

          <main className="relative min-h-[280px] flex-1">
            <div className="princess-ribbon pointer-events-none absolute -left-2 top-8 z-10 hidden h-48 w-6 rounded-sm shadow-md lg:block" style={{ background: 'linear-gradient(180deg, var(--accent2), var(--accent))' }} aria-hidden />
            {selectedEmail ? (
              <article className="relative h-full rounded-[2rem] border-4 p-6 shadow-2xl md:p-10" style={{ borderColor: 'var(--accent2)', background: 'linear-gradient(180deg, #fffefb 0%, #fff5f9 50%, #ffe8f2 100%)' }}>
                <div className="absolute right-6 top-6 flex flex-col items-center gap-1 opacity-40" aria-hidden>
                  <span className="text-3xl">🦢</span>
                </div>
                <header className="mb-6 flex flex-wrap items-start gap-4 border-b-2 border-dashed pb-6" style={{ borderColor: 'var(--accent)' }}>
                  <span className="text-5xl">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                      {decree(selectedEmail.tag)}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-sm opacity-60">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </header>
                <div className="whitespace-pre-wrap text-sm leading-[1.75] md:text-base">{selectedEmail.body}</div>
              </article>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-[2rem] border-4 border-dashed p-8 text-center opacity-60" style={{ borderColor: 'var(--accent)' }}>
                <span className="text-6xl">💌</span>
                <p className="mt-4 font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  Choose a scroll from the mirror
                </p>
              </div>
            )}
          </main>

          <aside className="flex shrink-0 flex-col gap-3 lg:w-52">
            <div className="rounded-2xl border-2 p-4 shadow-md" style={{ borderColor: 'var(--accent)', background: 'white' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Weather omen</p>
              <p className="mt-2 text-3xl">{weather.icon}</p>
              <p className="font-semibold">{weather.condition}</p>
              <p className="text-xs opacity-60">{weather.temp}°</p>
            </div>
            <div className="rounded-2xl border-2 p-4 shadow-md" style={{ borderColor: 'var(--accent)', background: 'white' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Royal treasury</p>
              <ul className="mt-2 space-y-1 text-xs font-semibold">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex justify-between gap-2">
                    <span>{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : '#b91c1c' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border-2 p-4 shadow-md lg:overflow-y-auto" style={{ borderColor: 'var(--accent)', background: 'white' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Town crier</p>
              <ul className="mt-2 space-y-2 text-[11px] leading-snug">
                {news.slice(0, 4).map((n, i) => (
                  <li key={i} className="border-l-2 pl-2" style={{ borderColor: 'var(--accent2)' }}>
                    {n.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
