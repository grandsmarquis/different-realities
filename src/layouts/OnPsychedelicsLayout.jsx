import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FLOATERS = ['✦', '◇', '〜', '✧', '○', '△', '※', '⋆', '🌀', '💫', '🔮', '✨', '🌟', '∞', '⌇', '⎊', 'ꙮ', '🫧', '🦋', '👁️']

function stockBarFill(changePct) {
  const n = Math.min(100, Math.max(12, 45 + changePct * 10))
  return `${n}%`
}

function stockNeon(changePct) {
  if (changePct >= 0) return 'var(--accent3)'
  return 'var(--accent)'
}

function MandalaPattern({ className, style }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden style={style}>
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {[0, 30, 60].map(rot => (
          <g key={rot} transform={`rotate(${rot} 50 50)`}>
            <polygon points="50,8 58,42 50,50 42,42" opacity="0.9" />
            <polygon points="50,92 58,58 50,50 42,58" opacity="0.7" />
            <polygon points="8,50 42,42 50,50 42,58" opacity="0.8" />
            <polygon points="92,50 58,42 50,50 58,58" opacity="0.6" />
          </g>
        ))}
        <circle cx="50" cy="50" r="38" opacity="0.5" />
        <circle cx="50" cy="50" r="24" opacity="0.65" />
      </g>
    </svg>
  )
}

export default function OnPsychedelicsLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const motion = !reducedMotion

  const marqueeItems = useMemo(() => [...news, ...news, ...news], [])

  return (
    <div
      className="min-h-dvh flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, var(--bg) 0%, var(--bg2) 45%, #1a0638 55%, #3b0764 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {motion && <div className="psyche-vortex" aria-hidden />}

      <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${motion ? 'psyche-hue-freak' : ''}`} aria-hidden>
        <div
          className={`absolute -left-[20%] -top-[10%] h-[70vmin] w-[70vmin] opacity-60 mix-blend-screen psyche-blob-a ${motion ? '' : 'opacity-30'}`}
          style={{
            background: 'radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--accent) 65%, transparent), transparent 58%)',
          }}
        />
        <div
          className={`absolute -right-[15%] top-[20%] h-[65vmin] w-[65vmin] opacity-55 mix-blend-screen psyche-blob-b ${motion ? '' : 'opacity-25'}`}
          style={{
            background: 'radial-gradient(circle at 60% 50%, color-mix(in srgb, var(--accent2) 60%, transparent), transparent 55%)',
          }}
        />
        <div
          className={`absolute left-[10%] -bottom-[25%] h-[80vmin] w-[80vmin] opacity-50 mix-blend-screen psyche-blob-c ${motion ? '' : 'opacity-20'}`}
          style={{
            background: 'radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent4) 55%, transparent), transparent 52%)',
          }}
        />
        <div
          className={`absolute left-1/2 top-1/2 h-[min(140vmax,900px)] w-[min(140vmax,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.2] mix-blend-plus-lighter psyche-spin-slow ${motion ? '' : 'opacity-10'}`}
          style={{
            background: `conic-gradient(from 0deg, var(--accent), var(--accent2), var(--accent3), var(--accent4), var(--accent), var(--accent2))`,
          }}
        />
      </div>

      <MandalaPattern
        className={`pointer-events-none fixed right-[2%] top-[10%] z-[1] h-36 w-36 opacity-[0.28] md:h-52 md:w-52 ${motion ? 'psyche-mandala-spin' : ''}`}
        style={{ color: 'var(--accent2)' }}
      />
      <MandalaPattern
        className={`pointer-events-none fixed bottom-[8%] left-[1%] z-[1] h-28 w-28 opacity-[0.22] md:h-40 md:w-40 ${motion ? 'psyche-mandala-rev' : ''}`}
        style={{ color: 'var(--accent)' }}
      />

      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
        {FLOATERS.map((ch, i) => (
          <span
            key={i}
            className={`absolute text-lg opacity-40 md:text-2xl ${motion ? 'psyche-float-wild' : ''}`}
            style={{
              left: `${5 + (i * 7) % 88}%`,
              top: `${8 + (i * 13) % 78}%`,
              animationDelay: `${i * 0.35}s`,
              color: i % 4 === 0 ? 'var(--accent)' : i % 4 === 1 ? 'var(--accent2)' : i % 4 === 2 ? 'var(--accent3)' : 'var(--accent4)',
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {motion && (
        <div className="psyche-scan-wrap" aria-hidden>
          <div className="psyche-scanlines" />
        </div>
      )}
      {motion && <div className="psyche-glitch-layer" aria-hidden />}

      <header className="relative z-20 shrink-0 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-3">
          <div className={motion ? 'psyche-title-jitter' : ''}>
            <p
              className="text-[10px] uppercase tracking-[0.5em] opacity-60"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Synesthesia OS v∞.∞
            </p>
            <h1
              className={`text-2xl md:text-4xl ${motion ? 'psyche-title-shimmer' : 'psyche-title-static'}`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              THE INBOX IS INSIDE YOU
            </h1>
            <p className="mt-1 max-w-xl text-xs opacity-80 md:text-sm">
              Warning: subject lines may taste like purple. Stocks are just spicy numbers. The news is a river — do not drown in the river.
            </p>
          </div>
          <button
            type="button"
            className={`btn btn-sm border-2 border-[var(--accent2)] bg-base-300/40 text-[var(--text)] shadow-lg shadow-fuchsia-500/20 hover:border-[var(--accent3)] hover:bg-base-300/60 ${motion ? 'psyche-btn-wiggle' : ''}`}
            onClick={onSwitchPersona}
          >
            Emergency reality
          </button>
        </div>
        {motion && (
          <div className="border-t border-[var(--border)]/50 bg-base-300/10 py-1.5 psyche-marquee-clip">
            <div className="psyche-marquee-inner font-semibold uppercase tracking-wider text-[var(--accent3)]">
              {marqueeItems.map((n, i) => (
                <span key={`${n.id}-${i}`} className="whitespace-nowrap text-[10px] opacity-90">
                  {n.emoji} {n.title} ···
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 min-h-0 flex-col gap-3 p-3 md:flex-row md:gap-4 md:p-4 ${motion ? 'psyche-page-wobble' : ''}`}
      >
        <nav
          className={`flex shrink-0 flex-col rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-2 backdrop-blur-md md:w-[min(100%,290px)] md:min-h-0 ${motion ? 'psyche-panel-glow' : ''}`}
          aria-label="Inbox frequencies"
        >
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text2)]">Incoming waves (do not fight)</p>
          <ul className="flex max-h-[40vh] flex-col gap-1.5 overflow-y-auto md:max-h-none md:flex-1">
            {emails.map((e, idx) => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    aria-current={on ? 'true' : undefined}
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all ${motion ? 'psyche-mail-pop' : ''} ${on ? 'border-[var(--accent2)] shadow-lg shadow-cyan-500/25 ring-2 ring-[var(--accent)]/30' : 'border-transparent hover:border-[var(--border)]'}`}
                    style={{
                      background: on
                        ? 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 28%, transparent), color-mix(in srgb, var(--accent2) 18%, transparent))'
                        : 'color-mix(in srgb, var(--card) 80%, transparent)',
                      animationDelay: motion ? `${idx * 0.32}s` : undefined,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl leading-none md:text-2xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug">{e.subject}</p>
                        <p className="mt-0.5 truncate text-[10px] opacity-50">{e.from.name}</p>
                      </div>
                      {!e.read && (
                        <span
                          className={`mt-1 size-2.5 shrink-0 rounded-full ${motion ? 'psyche-unread-pulse' : ''}`}
                          style={{ background: 'var(--accent4)', boxShadow: '0 0 14px var(--accent4)' }}
                        />
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          {selectedEmail ? (
            <div
              className="relative flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl"
              style={{
                boxShadow: motion ? '0 0 80px -8px color-mix(in srgb, var(--accent2) 35%, transparent), 0 0 120px -20px color-mix(in srgb, var(--accent) 25%, transparent)' : undefined,
              }}
            >
              {motion && (
                <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl psyche-chrome-rotate" aria-hidden />
              )}
              <article
                className={`relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--card)] backdrop-blur-md ${
                  motion ? 'm-[2px] rounded-[14px]' : 'rounded-2xl border-2 border-[var(--border)]'
                }`}
              >
                <div className="relative border-b border-[var(--border)] px-4 py-4 md:px-6">
                  {!reducedMotion && (
                    <>
                      <h2
                        className="pointer-events-none absolute inset-x-4 top-4 text-lg font-bold leading-tight opacity-40 blur-[0.5px] md:text-xl"
                        style={{ fontFamily: 'var(--font-display)', transform: 'translate(4px, 2px)', color: 'var(--accent2)' }}
                        aria-hidden
                      >
                        {selectedEmail.subject}
                      </h2>
                      <h2
                        className="pointer-events-none absolute inset-x-4 top-4 text-lg font-bold leading-tight opacity-40 blur-[0.5px] md:text-xl"
                        style={{ fontFamily: 'var(--font-display)', transform: 'translate(-4px, -2px)', color: 'var(--accent)' }}
                        aria-hidden
                      >
                        {selectedEmail.subject}
                      </h2>
                      <h2
                        className="pointer-events-none absolute inset-x-4 top-4 text-lg font-bold leading-tight opacity-30 blur-[1px] md:text-xl"
                        style={{ fontFamily: 'var(--font-display)', transform: 'translate(0, 3px)', color: 'var(--accent3)' }}
                        aria-hidden
                      >
                        {selectedEmail.subject}
                      </h2>
                    </>
                  )}
                  <div className="relative flex flex-wrap items-start gap-3">
                    <span className="text-4xl md:text-5xl">{selectedEmail.from.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold leading-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                        {selectedEmail.subject}
                      </h2>
                      <p className="mt-1 text-xs opacity-60">
                        {selectedEmail.from.name} · {selectedEmail.date} · {selectedEmail.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap md:px-6 md:py-5 md:text-base ${motion ? 'psyche-text-breathe' : ''}`}
                >
                  {selectedEmail.body}
                </div>
              </article>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-[var(--accent2)]/50 bg-[var(--card)]/50 p-8 text-center text-sm font-semibold opacity-70">
              Pick a ripple on the left before the walls melt…
            </div>
          )}

          <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">
            <div
              className={`relative overflow-hidden rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-3 backdrop-blur-sm ${motion ? 'psyche-weather-breathe' : ''}`}
            >
              <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text2)]">Sky texture (edible)</p>
              <div className="mt-1 flex items-center gap-2">
                <span className={`text-3xl md:text-4xl ${motion ? 'psyche-emoji-spin' : ''}`}>{weather.icon}</span>
                <div>
                  <p className="text-xl font-bold tabular-nums leading-none">{weather.temp}°</p>
                  <p className="text-[10px] opacity-60">{weather.city}</p>
                </div>
              </div>
              <div
                className={`pointer-events-none absolute inset-0 rounded-xl border-2 border-[var(--accent2)] opacity-50 ${motion ? 'psyche-aura-ring' : ''}`}
                aria-hidden
              />
            </div>
            {stocks.map(s => (
              <div
                key={s.ticker}
                className={`relative flex flex-col justify-end overflow-hidden rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-2 backdrop-blur-sm ${motion ? 'psyche-stock-zap' : ''}`}
              >
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end justify-center pb-2 opacity-35" aria-hidden>
                  <div
                    className={`w-[40%] max-w-[3rem] rounded-t-md ${motion ? 'psyche-stock-pulse' : ''}`}
                    style={{
                      height: stockBarFill(s.changePct),
                      background: `linear-gradient(180deg, ${stockNeon(s.changePct)}, transparent)`,
                      animationDelay: `${(s.ticker.length % 5) * 0.12}s`,
                    }}
                  />
                </div>
                <p className="relative text-[10px] font-bold opacity-90">{s.ticker}</p>
                <p className="relative font-mono text-sm font-bold tabular-nums">
                  {s.changePct >= 0 ? '+' : ''}
                  {s.changePct}%
                </p>
              </div>
            ))}
          </div>
        </main>

        <aside
          className={`flex shrink-0 flex-col gap-2 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3 backdrop-blur-md md:w-56 md:min-h-0 ${motion ? 'psyche-panel-glow' : ''}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent3)]">Collective whispers (loud)</p>
          <div className="relative max-h-48 overflow-hidden md:max-h-none md:flex-1">
            <ul className={`space-y-2 text-xs leading-snug md:max-h-[min(50vh,28rem)] md:overflow-y-auto ${motion ? 'psyche-news-drift' : ''}`}>
              {news.map((n, i) => (
                <li
                  key={n.id}
                  className={`rounded-lg border border-[var(--border)]/60 bg-base-300/25 px-2 py-1.5 ${motion ? 'psyche-news-li' : ''}`}
                  style={motion ? { animationDelay: `${i * 0.22}s` } : undefined}
                >
                  <span className="mr-1">{n.emoji}</span>
                  {n.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
