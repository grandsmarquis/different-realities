import { useContext, useEffect, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tilt = id => ((id * 7) % 11) - 5

export default function PunkLayout({ onSwitchPersona }) {
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
      className="min-h-dvh flex flex-col overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className={`absolute inset-0 opacity-[0.07] ${reducedMotion ? '' : 'punk-stripe-drift'}`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 8px, var(--accent) 8px, var(--accent) 9px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <header
        className="relative z-20 shrink-0 border-b-4 px-4 py-4 md:px-8"
        style={{
          borderColor: 'var(--accent)',
          background: 'linear-gradient(105deg, var(--bg2) 0%, var(--bg) 55%, var(--accent3) 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), 98% 100%, 0 100%)',
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-start gap-4 min-w-0">
            <span
              className={`text-4xl md:text-5xl shrink-0 select-none ${reducedMotion ? '' : 'punk-skull-spin'}`}
              aria-hidden
            >
              ☠️
            </span>
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.4em] font-bold opacity-80" style={{ color: 'var(--accent2)' }}>
                NO FUTURE MAIL
              </p>
              <h1
                className="text-3xl md:text-5xl font-black uppercase leading-[0.9] truncate"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent)',
                  textShadow: '4px 4px 0 var(--accent3)',
                }}
              >
                Inbox riot
              </h1>
              <p className="text-xs mt-1 opacity-70">{emails.length} flyers · {emails.filter(e => !e.read).length} still bleeding</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm uppercase font-black tracking-wider border-2"
            style={{
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              background: 'transparent',
            }}
            onClick={onSwitchPersona}
          >
            Exit venue
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 min-h-0 flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        <nav
          className="lg:w-[min(100%,340px)] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r-2 min-h-0 overflow-hidden"
          style={{ borderColor: 'var(--accent3)' }}
          aria-label="Messages"
        >
          <ul className="overflow-y-auto flex-1 p-3 space-y-3">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              const t = tilt(e.id)
              return (
                <li key={e.id} style={{ '--punk-tilt': `${t * 0.4}deg` }}>
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full text-left p-3 border-2 transition-shadow ${reducedMotion ? '' : 'punk-flyer-wobble'}`}
                    style={{
                      transform: `rotate(${t * 0.35}deg)`,
                      transformOrigin: on ? 'center' : `${50 + (e.id % 5)}% top`,
                      borderColor: on ? 'var(--accent)' : 'var(--accent3)',
                      background: on ? 'color-mix(in srgb, var(--accent) 12%, var(--card))' : 'var(--card)',
                      boxShadow: on ? '6px 6px 0 var(--accent3)' : '3px 3px 0 var(--accent3)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xl">{e.from.avatar}</span>
                      {!e.read && (
                        <span className="badge badge-sm border-0 font-black" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
                          NEW
                        </span>
                      )}
                      <span className="text-[9px] font-mono uppercase opacity-50">{e.tag}</span>
                    </div>
                    <p className="font-black text-sm leading-tight line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {e.subject}
                    </p>
                    <p className="text-[10px] opacity-50 mt-1 truncate">{e.from.name}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="flex-1 flex flex-col min-w-0 min-h-0 p-4 md:p-6 overflow-hidden">
          {selectedEmail ? (
            <article
              className="flex flex-col flex-1 min-h-0 border-4 overflow-hidden"
              style={{
                borderColor: 'var(--accent)',
                background: 'var(--card)',
                boxShadow: '12px 12px 0 var(--accent3)',
                transform: `rotate(${tilt(selectedEmail.id) * 0.15}deg)`,
              }}
            >
              <div className="h-2 shrink-0 flex" aria-hidden>
                <div className="flex-1" style={{ background: 'var(--accent2)' }} />
                <div className="w-1/3" style={{ background: 'var(--accent)' }} />
              </div>
              <div className="px-4 py-3 border-b-2 flex flex-wrap gap-3 items-start" style={{ borderColor: 'var(--accent3)' }}>
                <span className="text-4xl">{selectedEmail.from.avatar}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-black uppercase leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <p className="text-xs opacity-60 mt-1">
                    {selectedEmail.from.name} · {selectedEmail.date}
                  </p>
                </div>
                <span className="badge badge-outline badge-sm font-mono uppercase">{selectedEmail.tag}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-5 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEmail.body}
              </div>
            </article>
          ) : (
            <div
              className="flex flex-1 items-center justify-center border-4 border-dashed p-8 text-center"
              style={{ borderColor: 'var(--accent3)', color: 'var(--text2)' }}
            >
              <p className="font-black uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                Pick a flyer from the pit
              </p>
            </div>
          )}
        </main>

        <aside
          className="lg:w-56 shrink-0 border-t lg:border-t-0 lg:border-l-2 p-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto text-xs"
          style={{ borderColor: 'var(--accent3)', background: 'color-mix(in srgb, var(--bg2) 80%, transparent)' }}
        >
          <div className="rounded border-2 p-2 min-w-[100px] lg:min-w-0" style={{ borderColor: 'var(--accent3)' }}>
            <p className="font-black text-[9px] tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
              OUTSIDE
            </p>
            <p className="text-2xl">{weather.icon}</p>
            <p className="font-bold">{weather.condition}</p>
          </div>
          <div className="rounded border-2 p-2 min-w-[120px] lg:min-w-0 flex-1 font-mono" style={{ borderColor: 'var(--accent3)' }}>
            <p className="font-black text-[9px] tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
              TICKER
            </p>
            <ul className="space-y-1">
              {stocks.map(s => (
                <li key={s.ticker} className="flex justify-between gap-2">
                  <span>{s.ticker}</span>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : '#f87171' }}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border-2 p-2 min-w-[140px] lg:min-w-0 max-h-40 overflow-y-auto" style={{ borderColor: 'var(--accent3)' }}>
            <p className="font-black text-[9px] tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
              ZINE
            </p>
            <ul className="space-y-1 opacity-80 leading-snug">
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
