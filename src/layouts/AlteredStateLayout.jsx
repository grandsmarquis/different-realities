import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function AlteredStateLayout({ onSwitchPersona }) {
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
    <div
      className="min-h-dvh flex flex-col relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className={`absolute inset-[-20%] altered-hue-slow ${reducedMotion ? 'opacity-40' : ''}`}
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--accent) 35%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, color-mix(in srgb, var(--accent2) 25%, transparent) 0%, transparent 50%), var(--bg)',
            opacity: reducedMotion ? 0.35 : 0.55,
          }}
        />
        <div
          className={`absolute left-1/2 top-1/2 w-[140vmax] h-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full altered-tunnel ${reducedMotion ? '' : ''}`}
          style={{
            background: `conic-gradient(from 180deg, transparent, color-mix(in srgb, var(--accent) 15%, transparent), transparent, color-mix(in srgb, var(--accent2) 12%, transparent), transparent)`,
          }}
        />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          boxShadow: 'inset 0 0 120px 40px var(--bg)',
        }}
        aria-hidden
      />

      <header className="relative z-20 shrink-0 px-4 py-3 md:px-6 border-b border-base-content/10 backdrop-blur-md bg-base-300/20">
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1600px] mx-auto">
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase opacity-50">Signal / noise</p>
            <h1 className="text-lg md:text-xl font-medium tracking-tight">Inbox</h1>
          </div>
          <button type="button" className="btn btn-sm btn-ghost opacity-70 hover:opacity-100" onClick={onSwitchPersona}>
            Ground
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 min-h-0 flex-col md:flex-row max-w-[1600px] w-full mx-auto">
        <nav
          className="md:w-[min(100%,300px)] shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-base-content/10 min-h-0 bg-base-300/10 backdrop-blur-sm"
          aria-label="Messages"
        >
          <ul className="overflow-y-auto flex-1 py-2">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id} className="px-2">
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border transition-colors ${reducedMotion ? '' : 'altered-jitter'}`}
                    style={{
                      borderColor: on ? 'color-mix(in srgb, var(--accent) 50%, transparent)' : 'transparent',
                      background: on ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg opacity-80">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium line-clamp-2 leading-snug">{e.subject}</p>
                        <p className="text-[10px] opacity-40 truncate mt-0.5">{e.from.name}</p>
                      </div>
                      {!e.read && <span className="size-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="flex-1 flex flex-col min-w-0 min-h-0 p-4 md:p-6 relative">
          {selectedEmail ? (
            <div className="relative flex flex-col flex-1 min-h-0 max-w-3xl mx-auto w-full">
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.12] blur-[2px] text-sm md:text-base leading-relaxed p-6 whitespace-pre-wrap overflow-hidden"
                aria-hidden
                style={{
                  transform: 'translate(3px, 2px)',
                  color: 'var(--accent2)',
                }}
              >
                {selectedEmail.body.slice(0, 400)}
              </div>
              <article
                className="relative flex flex-col flex-1 min-h-0 rounded-2xl border border-base-content/15 bg-base-300/30 backdrop-blur-md overflow-hidden shadow-xl"
                style={{
                  boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent), 0 25px 50px -12px rgba(0,0,0,0.5)',
                }}
              >
                <div className="px-4 py-4 border-b border-base-content/10 flex flex-wrap gap-3 items-start">
                  <span className="text-3xl">{selectedEmail.from.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg md:text-xl font-medium leading-tight">{selectedEmail.subject}</h2>
                    <p className="text-xs opacity-50 mt-1">
                      {selectedEmail.from.name} · {selectedEmail.date}
                    </p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </article>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-center opacity-40 text-sm">
              Select something to focus
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] opacity-60 max-w-3xl mx-auto w-full">
            <div className="rounded-lg bg-base-300/40 px-2 py-2 border border-base-content/5">
              <span className="block text-lg">{weather.icon}</span>
              {weather.temp}°
            </div>
            {stocks.slice(0, 3).map(s => (
              <div key={s.ticker} className="rounded-lg bg-base-300/40 px-2 py-2 border border-base-content/5 font-mono tabular-nums">
                {s.ticker} {s.changePct >= 0 ? '+' : ''}
                {s.changePct}%
              </div>
            ))}
          </div>
        </main>

        <aside className="md:w-44 shrink-0 border-t md:border-t-0 md:border-l border-base-content/10 p-3 text-[10px] space-y-2 max-h-48 md:max-h-none overflow-y-auto md:overflow-visible bg-base-300/10">
          <p className="uppercase tracking-widest opacity-40">Headlines</p>
          <ul className="space-y-1.5 leading-snug opacity-70">
            {news.slice(0, 6).map((n, i) => (
              <li key={i}>{n.title}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
