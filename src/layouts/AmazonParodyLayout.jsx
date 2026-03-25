import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function AmazonParodyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [carousel, setCarousel] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const also = useMemo(() => emails.filter(e => e.id !== selectedEmail?.id).slice(0, 6), [selectedEmail])

  useEffect(() => {
    setCarousel(0)
  }, [selectedEmail?.id])

  useEffect(() => {
    if (reducedMotion || also.length === 0) return undefined
    const id = setInterval(() => setCarousel(c => (c + 1) % also.length), 3200)
    return () => clearInterval(id)
  }, [also.length, reducedMotion])

  return (
    <div
      className="min-h-dvh flex flex-col relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className={`pointer-events-none fixed inset-0 z-0 opacity-[0.08] ${reducedMotion ? '' : 'amazon-tape-move'}`}
        style={{
          backgroundImage: `repeating-linear-gradient(
            -18deg,
            transparent,
            transparent 18px,
            color-mix(in srgb, var(--accent) 40%, transparent) 18px,
            color-mix(in srgb, var(--accent) 40%, transparent) 22px
          )`,
          backgroundSize: '120px 120px',
        }}
        aria-hidden
      />

      <header className="relative z-20 shrink-0 border-b shadow-sm" style={{ background: 'var(--card)' }}>
        <div className="max-w-[1600px] mx-auto px-3 py-2 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg font-black tracking-tight shrink-0" style={{ color: 'var(--text)' }}>
              rainforest<span style={{ color: 'var(--accent)' }}>.mail</span>
            </span>
            <div
              className="hidden sm:flex flex-1 min-w-[120px] max-w-md items-center rounded overflow-hidden border"
              style={{ borderColor: 'var(--border)' }}
            >
              <input
                readOnly
                className="flex-1 min-w-0 px-2 py-1.5 text-xs outline-none bg-base-200"
                placeholder="Search every message you never asked for"
                aria-label="Search (decorative)"
              />
              <button type="button" className="px-3 py-1.5 text-xs font-medium text-white shrink-0" style={{ background: 'var(--accent2)' }}>
                Go
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span
              className={`text-[10px] font-bold px-2 py-1 rounded-sm hidden md:inline ${reducedMotion ? '' : 'amazon-prime-glow'}`}
              style={{ background: 'var(--accent2)', color: 'var(--bg)' }}
            >
              PRIME POST
            </span>
            <button type="button" className="btn btn-xs btn-ghost" onClick={onSwitchPersona}>
              Sign out
            </button>
          </div>
        </div>
        <div className="h-0.5 w-full relative overflow-hidden" aria-hidden>
          <svg className="w-full h-6 -mt-2 text-[var(--accent)]" viewBox="0 0 400 24" preserveAspectRatio="none">
            <path
              d="M 20 18 Q 200 2 380 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className={reducedMotion ? '' : 'amazon-smile-bounce'}
            />
          </svg>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 min-h-0 max-w-[1600px] w-full mx-auto">
        <nav
          className="hidden md:flex w-44 shrink-0 flex-col border-r p-2 gap-1 text-[11px] overflow-y-auto"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          aria-label="Departments"
        >
          <p className="font-bold text-xs mb-1 px-1">Departments</p>
          {['Work spam', 'Finance alerts', 'Newsletters', 'Social ghosts', 'Promo maze', 'Inbox anxiety'].map(label => (
            <button key={label} type="button" className="text-left px-2 py-1 rounded hover:bg-base-200 truncate">
              {label}
            </button>
          ))}
        </nav>

        <div className="flex flex-1 min-w-0 flex-col lg:flex-row min-h-0">
          <aside
            className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto max-h-[36vh] lg:max-h-none p-2 space-y-1"
            style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg2) 70%, var(--bg))' }}
            aria-label="Your orders"
          >
            <p className="text-[10px] font-bold uppercase px-2 py-1 opacity-60">Buy again</p>
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              return (
                <button
                  key={e.id}
                  type="button"
                  aria-current={on ? 'true' : undefined}
                  onClick={() => setSelectedEmail(e)}
                  className="w-full text-left flex gap-2 p-2 rounded-lg border transition-colors"
                  style={{
                    borderColor: on ? 'var(--accent)' : 'var(--border)',
                    background: on ? 'var(--card)' : 'transparent',
                  }}
                >
                  <span className="text-xl shrink-0">{e.from.avatar}</span>
                  <span className="min-w-0">
                    <span className="text-[11px] font-medium line-clamp-2 block">{e.subject}</span>
                    <span className="text-[9px] opacity-50">{e.from.name}</span>
                  </span>
                </button>
              )
            })}
          </aside>

          <main className="flex-1 flex flex-col min-w-0 min-h-0 p-3 md:p-5 overflow-y-auto">
            {selectedEmail ? (
              <>
                <div className="mb-2 text-[10px] opacity-60">
                  Home › Messages › <span className="text-[var(--accent)]">{selectedEmail.tag}</span> ›{' '}
                  <span className="font-medium text-[var(--text)]">{selectedEmail.subject.slice(0, 40)}…</span>
                </div>

                <article className="rounded-lg border p-4 md:p-6 mb-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div
                      className="mx-auto md:mx-0 size-32 md:size-40 shrink-0 rounded-lg border flex items-center justify-center text-5xl"
                      style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}
                    >
                      {selectedEmail.from.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl md:text-2xl font-semibold leading-tight">{selectedEmail.subject}</h1>
                      <p className="text-xs mt-1 opacity-60">
                        by <span className="text-info">{selectedEmail.from.name}</span>
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="btn btn-sm font-semibold border-0 text-white" style={{ background: 'var(--accent2)' }}>
                          Add to cart… I mean, archive
                        </button>
                        <button type="button" className="btn btn-sm btn-outline btn-warning">
                          1-Click dread
                        </button>
                      </div>
                      <ul className="mt-4 text-sm space-y-1 list-disc pl-5 opacity-90">
                        <li>Arrives in your brain by end of day</li>
                        <li>Eligible for anxiety-free returns*</li>
                        <li>*Not eligible</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t text-sm leading-relaxed whitespace-pre-wrap" style={{ borderColor: 'var(--border)' }}>
                    {selectedEmail.body}
                  </div>
                </article>

                <div
                  className="rounded border px-3 py-2 mb-3 text-[10px] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 8%, var(--card))', color: 'var(--accent2)' }}
                >
                  Sponsored — Customers who opened this also opened…
                </div>
                {also.length > 0 ? (
                  <div className="relative overflow-hidden rounded-lg border p-3" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                    <div
                      className="flex transition-transform duration-500 ease-out"
                      style={{
                        width: `${also.length * 100}%`,
                        transform: `translateX(-${(carousel * 100) / also.length}%)`,
                      }}
                    >
                      {also.map(e => (
                        <div key={e.id} className="shrink-0 px-2" style={{ width: `${100 / also.length}%` }}>
                          <button
                            type="button"
                            onClick={() => setSelectedEmail(e)}
                            className="w-full flex gap-3 items-center text-left p-2 rounded-lg hover:bg-base-200/80"
                          >
                            <span className="text-3xl">{e.from.avatar}</span>
                            <div>
                              <p className="text-sm font-medium line-clamp-2">{e.subject}</p>
                              <p className="text-xs opacity-50">{e.from.name}</p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-1 mt-2">
                      {also.map((e, i) => (
                        <button
                          key={e.id}
                          type="button"
                          className={`size-1.5 rounded-full ${i === carousel ? 'opacity-100' : 'opacity-30'}`}
                          style={{ background: 'var(--accent)' }}
                          aria-label={`Slide ${i + 1}`}
                          onClick={() => setCarousel(i)}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm opacity-50 m-auto text-center">Select a message from the left rail</p>
            )}

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="rounded border p-2" style={{ borderColor: 'var(--border)' }}>
                <span className="font-semibold">Weather</span>
                <p className="mt-1">
                  {weather.icon} {weather.temp}°
                </p>
              </div>
              {stocks.slice(0, 3).map(s => (
                <div key={s.ticker} className="rounded border p-2 font-mono tabular-nums" style={{ borderColor: 'var(--border)' }}>
                  {s.ticker}{' '}
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : '#b91c1c' }}>
                    {s.changePct >= 0 ? '+' : ''}
                    {s.changePct}%
                  </span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
