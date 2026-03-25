import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const seed = (i * 6247 + 31) % 1000
        return {
          left: `${(seed * 11) % 100}%`,
          top: `${(seed * 17 + i * 9) % 85}%`,
          delay: `${(seed % 12) * 0.2}s`,
          dur: `${2 + (seed % 6) * 0.45}s`,
          size: 1 + (seed % 4),
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="insomniac-star-twinkle absolute rounded-full bg-[var(--accent3)]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: 0.5,
            '--insom-star-dur': s.dur,
            '--insom-star-delay': s.delay,
          }}
        />
      ))}
    </div>
  )
}

function FloatingZs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {['Z', 'z', 'Z', 'z'].map((z, i) => (
        <span
          key={i}
          className="insomniac-z-drift absolute font-[family-name:var(--font-display)] font-normal text-[var(--text2)] opacity-60"
          style={{
            left: `${12 + i * 22}%`,
            bottom: '8%',
            fontSize: `${1.1 + (i % 2) * 0.4}rem`,
            animationDelay: `${i * 1.4}s`,
          }}
        >
          {z}
        </span>
      ))}
    </div>
  )
}

function SheepHurdle() {
  return (
    <div className="relative h-24 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)]/40 bg-[var(--card)]/30 px-2 backdrop-blur-sm">
      <p className="absolute left-3 top-2 z-10 text-[10px] uppercase tracking-widest text-[var(--text2)]">sheep inventory (not working)</p>
      <div className="absolute bottom-0 left-1/2 h-10 w-1 -translate-x-1/2 rounded-t bg-[var(--border)]/80" aria-hidden />
      <div className="absolute bottom-0 left-[calc(50%-24px)] h-3 w-12 rounded-t border border-[var(--border)]/60 bg-[var(--bg2)]/90" aria-hidden />
      <div className="absolute bottom-0 right-[calc(50%-24px)] h-3 w-12 rounded-t border border-[var(--border)]/60 bg-[var(--bg2)]/90" aria-hidden />
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="insomniac-sheep-jump absolute bottom-1 text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: `${i * 0.85}s` }}
          aria-hidden
        >
          🐑
        </span>
      ))}
    </div>
  )
}

function CoffeeSteam() {
  return (
    <svg className="insomniac-steam h-14 w-10 text-[var(--accent2)] opacity-80" viewBox="0 0 40 56" fill="none" aria-hidden>
      <path
        className="insomniac-steam-path"
        d="M12 52 Q8 38 14 28 Q20 18 10 8 M22 52 Q26 36 18 26 Q12 16 22 6 M30 50 Q34 38 28 30 Q24 22 32 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function formatTime(d) {
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
}

export default function InsomniacLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const tickerText = useMemo(() => news.map(n => `${n.emoji} ${n.title}`).join('   ·   '), [])

  return (
    <div
      className="relative min-h-full overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background:
          'linear-gradient(165deg, #0f0518 0%, #1a0a2e 35%, #12081f 70%, #0a0412 100%)',
      }}
    >
      <div
        className="insomniac-brain-orbs pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[var(--accent2)]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="insomniac-brain-orbs pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl [animation-delay:-2s]"
        aria-hidden
      />
      <div className="insomniac-noise pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" aria-hidden />
      <Starfield />
      <FloatingZs />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-6 border-b border-[var(--border)]/50 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-end gap-5">
            <div>
              <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] text-[var(--accent3)]">wide awake inc.</p>
              <h1 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--text)] sm:text-4xl">
                insomniac<span className="text-[var(--accent2)]">.</span>exe
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)]/40 bg-[var(--card)]/40 px-4 py-3 backdrop-blur-md">
              <CoffeeSteam />
              <div>
                <p className="text-xs text-[var(--text2)]">your brain insists it is</p>
                <p className="insomniac-clock-glow tabular-nums text-2xl font-bold tracking-tight text-[var(--accent)] sm:text-3xl">{formatTime(now)}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline border-[var(--accent)]/50 bg-transparent text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
            onClick={onSwitchPersona}
          >
            pretend to sleep
          </button>
        </header>

        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--text2)]">
          The world is offline. Your inbox is not. Weather, markets, and headlines are all part of tonight’s guilt‑free variety show — same data, zero melatonin.
        </p>

        <div className="mb-10 grid gap-6 lg:grid-cols-12">
          <div className="insomniac-card-pop flex flex-col justify-end lg:col-span-5">
            <SheepHurdle />
          </div>
          <div className="card insomniac-card-pop border-[var(--border)]/50 bg-[var(--card)]/50 shadow-lg backdrop-blur-md lg:col-span-7">
            <div className="card-body gap-1 py-5">
              <h2 className="card-title font-[family-name:var(--font-display)] text-lg text-[var(--accent3)]">brain food (news)</h2>
              <p className="text-xs text-[var(--text2)]">looping forever — like your thoughts</p>
              <div className="relative mt-2 overflow-hidden rounded-xl border border-[var(--border)]/30 bg-[var(--bg)]/60 py-2">
                <div className="insomniac-news-marquee-inner flex w-max gap-16 whitespace-nowrap text-sm text-[var(--text)]">
                  <span>{tickerText}</span>
                  <span aria-hidden>{tickerText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-7" aria-labelledby="insom-inbox-heading">
            <h2 id="insom-inbox-heading" className="font-[family-name:var(--font-display)] mb-4 text-xl text-[var(--text)]">
              inbox <span className="text-[var(--accent2)]">(why tho)</span>
            </h2>
            <ul className="space-y-3">
              {emails.map((email, i) => (
                <li key={email.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="insomniac-mail-wobble card group w-full border border-[var(--border)]/40 bg-[var(--card)]/45 text-left shadow-md backdrop-blur-sm transition hover:border-[var(--accent)]/50 hover:shadow-[0_0_24px_rgba(52,211,153,0.12)]"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="card-body flex-row items-center gap-4 p-4">
                      <span className="text-3xl transition group-hover:scale-110 group-hover:rotate-6">{email.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[var(--text)]">{email.subject}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[var(--text2)]">{email.preview}</p>
                      </div>
                      {!email.read && (
                        <span className="badge badge-accent badge-outline shrink-0">unread</span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-5 lg:col-span-5">
            <div className="card insomniac-card-pop border-[var(--border)]/50 bg-[var(--card)]/55 backdrop-blur-md">
              <div className="card-body">
                <h3 className="font-[family-name:var(--font-display)] text-sm text-[var(--accent3)]">outside (theory)</h3>
                <p className="mt-2 text-4xl">
                  {weather.icon}{' '}
                  <span className="font-bold tabular-nums text-[var(--text)]">{weather.temp}°</span>
                </p>
                <p className="text-[var(--text2)]">{weather.condition}</p>
                <p className="mt-2 text-xs text-[var(--text2)]/80">
                  {weather.city} · you are not there · you are here
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {weather.forecast.slice(0, 4).map(d => (
                    <span
                      key={d.day}
                      className="badge badge-lg border-[var(--border)]/50 bg-[var(--bg2)]/50 font-normal text-[var(--text)]"
                    >
                      {d.day} {d.icon} {d.high}°
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card insomniac-card-pop border-[var(--border)]/50 bg-[var(--card)]/55 backdrop-blur-md">
              <div className="card-body gap-3">
                <h3 className="font-[family-name:var(--font-display)] text-sm text-[var(--accent)]">stonks @ night</h3>
                <ul className="space-y-2 font-mono text-sm">
                  {stocks.map(s => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)]/30 bg-[var(--bg)]/40 px-3 py-2"
                    >
                      <span className="font-semibold text-[var(--text)]">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'text-[var(--accent)]' : 'text-[var(--accent2)]'}>
                        {s.changePct >= 0 ? '+' : ''}
                        {s.changePct.toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card border-[var(--border)]/50 bg-[var(--bg2)]/40 backdrop-blur-md">
              <div className="card-body">
                <h3 className="font-[family-name:var(--font-display)] mb-3 text-sm text-[var(--text)]">headlines you’ll forget by morning</h3>
                <ul className="space-y-3 text-sm">
                  {news.map(item => (
                    <li key={item.id} className="flex gap-2 border-l-2 border-[var(--accent2)]/50 pl-3">
                      <span className="text-lg leading-none">{item.emoji}</span>
                      <div>
                        <p className="font-medium leading-snug text-[var(--text)]">{item.title}</p>
                        <p className="text-xs text-[var(--text2)]">
                          {item.source} · {item.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050208]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="insom-email-title"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="insomniac-modal-pop relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--accent)]/30 bg-[var(--card)] p-6 text-[var(--text)] shadow-[0_0_60px_rgba(244,114,182,0.15)] backdrop-blur-md"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <p className="text-xs text-[var(--accent3)]">peak bad-decision hours</p>
            <h2 id="insom-email-title" className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug">
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-sm text-[var(--text2)]">{selectedEmail.from.name}</p>
            <pre className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]/90">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary mt-6 w-full sm:w-auto" onClick={() => setSelectedEmail(null)}>
              close &amp; scroll more
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
