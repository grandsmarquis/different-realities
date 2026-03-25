import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const hole = t =>
  ({
    work: 'Bag End study',
    personal: 'Parlour mail',
    finance: 'Mathom-house coin',
    promo: 'Traveling wizard ads',
    newsletter: 'Shire repeater',
    social: 'Party invites',
    dev: 'Dwarf API',
    shopping: 'Farmer’s market',
    travel: 'Bywater road',
  }[t] || 'Round door')

export default function HobbitLayout({ onSwitchPersona }) {
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
    <div className="hobbit-root relative min-h-dvh overflow-x-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="hobbit-hill pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[1] flex justify-center" aria-hidden>
        <div className={`relative h-32 w-[min(92vw,520px)] rounded-t-[50%] border-8 shadow-inner ${reducedMotion ? '' : 'hobbit-door-glow'}`} style={{ borderColor: 'var(--accent2)', background: 'linear-gradient(180deg, #5d4037 0%, #3e2723 60%)' }}>
          <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd54f] shadow-[0_0_12px_#ffd54f]" />
          {!reducedMotion && <div className="hobbit-smoke pointer-events-none absolute -top-16 left-1/2" />}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-32 pt-8 md:px-8">
        <header className="text-center">
          <div className="mx-auto mb-4 inline-block rounded-full border-4 px-6 py-2 shadow-md" style={{ borderColor: 'var(--accent2)', background: 'color-mix(in srgb, var(--card) 90%, transparent)' }}>
            <span className="text-2xl">🧝</span>
            <span className="ml-2 font-bold" style={{ color: 'var(--accent2)' }}>
              Second breakfast included
            </span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
            Bag End Letter Table
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm opacity-85">No adventures today — only {emails.filter(e => !e.read).length} unread letters on the table.</p>
          <button type="button" className="btn btn-sm mt-4 rounded-full border-2 font-semibold" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }} onClick={onSwitchPersona}>
            Go there and back again (home)
          </button>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <nav aria-label="Letters by the hearth">
            <div className="rounded-[2.5rem] border-4 p-5 shadow-xl" style={{ borderColor: 'var(--accent2)', background: 'linear-gradient(165deg, #fff8e7 0%, #e8f5e0 100%)' }}>
              <h2 className="mb-4 text-center text-sm font-bold" style={{ color: 'var(--accent2)' }}>
                Pile by the round window
              </h2>
              <ul className="space-y-3">
                {emails.map(e => {
                  const on = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`hobbit-envelope w-full rounded-2xl border-2 px-4 py-3 text-left shadow-md transition-all ${on ? 'hobbit-envelope-open border-[var(--accent)] ring-2 ring-[var(--accent)]/30' : 'border-[var(--border)] hover:-translate-y-0.5'}`}
                        style={{ background: on ? '#fffef5' : 'white' }}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wide opacity-60">{hole(e.tag)}</p>
                        <p className="mt-1 font-bold leading-snug line-clamp-2">{e.subject}</p>
                        <p className="mt-1 text-xs opacity-70">{e.from.name}</p>
                        {!e.read && <span className="badge badge-xs mt-2 border-0" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>Unopened</span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          <main className="min-h-[280px]">
            {selectedEmail ? (
              <article className="rounded-[2.5rem] border-4 p-6 shadow-inner md:p-8" style={{ borderColor: 'var(--accent2)', background: 'linear-gradient(180deg, #fffef8 0%, #f1f8e9 100%)' }}>
                <div className="mb-4 flex items-start gap-4">
                  <span className="text-4xl">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-60">{hole(selectedEmail.tag)}</p>
                    <h2 className="mt-1 text-xl font-bold md:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 text-xs opacity-70">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </div>
                <div className="whitespace-pre-wrap rounded-2xl border border-dashed border-[var(--accent2)]/40 bg-white/60 p-4 text-sm leading-relaxed">{selectedEmail.body}</div>
                <p className="mt-4 text-center text-xs italic opacity-60">If anyone asks, we were gardening the whole time.</p>
              </article>
            ) : (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-[2.5rem] border-4 border-dashed p-8 text-center opacity-70" style={{ borderColor: 'var(--accent2)' }}>
                <p className="text-5xl">🫖</p>
                <p className="mt-4 font-bold">Tea’s ready when you pick a letter.</p>
              </div>
            )}
          </main>
        </div>

        <aside className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border-2 p-4 text-center shadow-sm" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="text-2xl">{weather.icon}</p>
            <p className="mt-1 text-sm font-bold">{weather.condition}</p>
            <p className="text-xs opacity-70">Fine Shire weather · {weather.temp}°</p>
          </div>
          <div className="rounded-2xl border-2 p-4 shadow-sm" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="text-[10px] font-bold uppercase opacity-60">Pipe-weed index</p>
            <ul className="mt-2 space-y-1 text-xs font-bold">
              {stocks.map(s => (
                <li key={s.ticker} className="flex justify-between gap-2">
                  <span>{s.ticker}</span>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#b91c1c' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 p-4 shadow-sm" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="text-[10px] font-bold uppercase opacity-60">Green Dragon news</p>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-snug">
              {news.slice(0, 4).map((n, i) => (
                <li key={i}>{n.title}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
