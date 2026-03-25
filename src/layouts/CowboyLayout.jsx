import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const telegram = t =>
  ({
    work: 'Pony Express — work',
    personal: 'Saloon gossip',
    finance: 'Bank robbery (legal)',
    promo: 'Snake oil',
    newsletter: 'Gazette extra',
    social: 'Hoedown invites',
    dev: 'Telegraph API',
    shopping: 'General store',
    travel: 'Stagecoach',
  }[t] || 'Stranger')

export default function CowboyLayout({ onSwitchPersona }) {
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
    <div className="cowboy-root relative min-h-dvh overflow-x-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="cowboy-sky pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className={`cowboy-sun pointer-events-none fixed right-[8%] top-[6%] z-0 size-24 rounded-full md:size-32 ${reducedMotion ? '' : 'cowboy-sun-pulse'}`} aria-hidden />
      <div className={`pointer-events-none fixed inset-0 z-0 ${reducedMotion ? '' : 'cowboy-dust'}`} aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-28 pt-6 md:px-6">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-4 pb-4" style={{ borderColor: 'var(--accent2)' }}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] opacity-70">Howdy, partner</p>
            <h1 className="text-3xl font-bold uppercase tracking-wide md:text-5xl" style={{ fontFamily: 'var(--font-display)', textShadow: '2px 2px 0 color-mix(in srgb, var(--accent2) 40%, transparent)' }}>
              Deadwood Mail Office
            </h1>
            <p className="mt-2 max-w-xl text-sm opacity-85">{emails.filter(e => !e.read).length} unopened — rustlers or real mail?</p>
          </div>
          <button type="button" className="btn btn-outline border-2 font-bold uppercase tracking-wider" style={{ borderColor: 'var(--accent)', color: 'var(--accent2)' }} onClick={onSwitchPersona}>
            Ride out
          </button>
        </header>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <nav className="xl:w-[380px] xl:shrink-0" aria-label="Wanted telegrams">
            <h2 className="mb-3 text-center font-mono text-xs font-bold uppercase tracking-widest opacity-70">Postings on the board</h2>
            <ul className="space-y-4">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`cowboy-wanted group relative w-full overflow-hidden border-4 border-[var(--accent2)] bg-[#f4e4c8] p-4 text-left shadow-lg transition-transform ${on ? 'cowboy-wanted-active -rotate-1 scale-[1.02]' : 'hover:-rotate-1'}`}
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,90,43,0.06) 2px, rgba(139,90,43,0.06) 4px)',
                      }}
                    >
                      <div className="absolute right-2 top-2 font-mono text-[10px] font-bold opacity-40">★ REWARD ★</div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">{telegram(e.tag)}</p>
                      <p className="mt-2 font-bold uppercase leading-snug line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
                        {e.subject}
                      </p>
                      <p className="mt-2 border-t-2 border-dashed border-[var(--accent2)]/40 pt-2 font-mono text-xs">Alias: {e.from.name}</p>
                      {!e.read && (
                        <span className="badge badge-sm mt-2 border-0 bg-[var(--accent)] font-bold text-[var(--bg)]">Hot lead</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <main className="min-h-[300px] flex-1">
            {selectedEmail ? (
              <article className="relative border-4 border-[var(--accent2)] bg-[#faf3e8] p-6 shadow-2xl md:p-8" style={{ boxShadow: '8px 8px 0 color-mix(in srgb, var(--accent2) 35%, transparent)' }}>
                <div className="absolute left-4 top-4 font-mono text-[10px] opacity-30">OFFICIAL TRANSCRIPT</div>
                <header className="mb-6 mt-6 flex flex-wrap items-start gap-4 border-b-2 border-dashed border-[var(--accent2)]/50 pb-6">
                  <span className="text-5xl grayscale-[0.2]">{selectedEmail.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{telegram(selectedEmail.tag)}</p>
                    <h2 className="mt-2 text-2xl font-bold uppercase md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedEmail.subject}
                    </h2>
                    <p className="mt-2 font-mono text-sm opacity-70">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </header>
                <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed md:text-base">{selectedEmail.body}</div>
                <footer className="mt-8 flex justify-center">
                  <span className="rounded border-2 border-[var(--accent2)] bg-[#f4e4c8] px-4 py-2 font-mono text-xs font-bold">NOTARIZED BY Yours Truly</span>
                </footer>
              </article>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center border-4 border-dashed border-[var(--accent2)]/50 bg-[#f4e4c8]/50 p-8 text-center">
                <span className="text-6xl">🤠</span>
                <p className="mt-4 font-bold uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  Pick a poster, read the tale
                </p>
              </div>
            )}
          </main>

          <aside className="flex shrink-0 flex-col gap-3 xl:w-52">
            <div className="border-4 border-[var(--accent2)] bg-[#f4e4c8] p-3 text-center shadow-md">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest">Territory weather</p>
              <p className="text-3xl">{weather.icon}</p>
              <p className="font-bold">{weather.condition}</p>
              <p className="font-mono text-xs opacity-70">{weather.temp}° · dry as a bone</p>
            </div>
            <div className="border-4 border-[var(--accent2)] bg-[#f4e4c8] p-3 shadow-md">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest">Cattle futures</p>
              <ul className="mt-2 space-y-1 font-mono text-xs font-bold">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex justify-between gap-2">
                    <span>{s.ticker}</span>
                    <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#991b1b' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-4 border-[var(--accent2)] bg-[#f4e4c8] p-3 shadow-md">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest">Tumbleweed news</p>
              <ul className="mt-2 space-y-2 text-[11px] leading-snug">
                {news.slice(0, 4).map((n, i) => (
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
