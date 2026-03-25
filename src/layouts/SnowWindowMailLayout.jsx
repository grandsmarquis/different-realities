import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { weather } from '../data/weather'
import MiniSpark from '../components/MiniSpark'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return reduced
}

function SnowLayer({ count, seedOffset = 0 }) {
  const flakes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const n = i + seedOffset * 1000
      const left = ((n * 53.13) % 1000) / 10 // 0..100
      const size = 1.2 + ((n % 7) / 7) * 2.2 // 1.2..3.4
      const opacity = 0.18 + ((n % 11) / 11) * 0.55
      const duration = 7.5 + (n % 9) * 0.55 // 7.5..12
      const delay = -((n % 2000) / 200) // negative = start mid-flight
      const sway = -28 + (n % 57) * 1.15 // -28..+38
      const blur = (n % 3) * 0.8
      return {
        id: `${seedOffset}-${i}`,
        left,
        size,
        opacity,
        duration,
        delay,
        sway,
        blur,
      }
    })
  }, [count, seedOffset])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            '--sway': `${f.sway}px`,
            filter: f.blur ? `blur(${f.blur}px)` : undefined,
          }}
        />
      ))}
    </div>
  )
}

export default function SnowWindowMailLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const reducedMotion = useReducedMotion()

  const [breathPulse, setBreathPulse] = useState(0)

  useEffect(() => {
    if (reducedMotion) return undefined
    const id = setInterval(() => setBreathPulse((v) => v + 1), 5200)
    return () => clearInterval(id)
  }, [reducedMotion])

  const unread = emails.filter((e) => !e.read).length

  const ticker = useMemo(() => {
    const tickerStocks = stocks
      .map((s) => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'}${s.changePct >= 0 ? '+' : ''}${s.changePct.toFixed(1)}%`)
      .join('   ·   ')
    const tickerNews = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')
    return `${tickerStocks}   ·   ${weather.city} ${weather.temp}° ${weather.condition}   ·   ${tickerNews}`
  }, [])

  const condensationEnabled = !reducedMotion
  const shownForecast = weather.forecast.slice(0, 4)

  return (
    <div className="snow-window-root relative min-h-dvh overflow-hidden text-base-content" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <SnowLayer count={reducedMotion ? 35 : 85} seedOffset={1} />
      <div className="snow-window-fog pointer-events-none fixed inset-0 z-[2]" aria-hidden />
      <div className={`snow-window-glare pointer-events-none fixed inset-0 z-[3] ${condensationEnabled ? '' : 'opacity-0'}`} aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col px-3 pb-5 pt-3">
        <header className="snow-window-header relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-300/25 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-md">
          <div className="absolute inset-0 pointer-events-none snow-window-header-shimmer" aria-hidden />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid place-items-center size-11 rounded-2xl border border-blue-200/25 bg-base-100/25 shadow-inner shadow-blue-400/10">
                <span className="text-2xl" aria-hidden>
                  ❄️
                </span>
              </div>
              <div className="min-w-0">
                <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.35em] text-blue-200/80">
                  WINDOW WATCH
                </p>
                <h1 className="m-0 truncate text-lg font-black tracking-tight sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Mails on the frosted glass
                </h1>
                <p className="m-0 mt-1 text-xs opacity-70">
                  {unread} unread · {weather.city} is “snowing vibes”
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="badge badge-lg border-blue-200/30 bg-blue-500/10 text-blue-50">
                <span aria-hidden>📬</span> {unread} new
              </div>
              <button
                type="button"
                className="btn btn-sm border-2 font-bold"
                style={{ borderColor: 'color-mix(in srgb, var(--accent2) 65%, transparent)', color: 'var(--accent2)', background: 'color-mix(in srgb, var(--card) 85%, transparent)' }}
                onClick={onSwitchPersona}
              >
                Switch identity
              </button>
            </div>
          </div>

          {condensationEnabled ? (
            <div key={breathPulse} className="snow-window-condensation pointer-events-none" aria-hidden>
              <span className="snow-condense-line snow-condense-line-a" />
              <span className="snow-condense-line snow-condense-line-b" />
              <span className="snow-condense-line snow-condense-line-c" />
            </div>
          ) : null}
        </header>

        <main className="relative z-10 mt-4 grid flex-1 gap-4 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="snow-panel rounded-3xl border border-base-content/10 bg-base-300/20 p-3 shadow-xl shadow-black/20 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-content/10 pb-2">
                <div className="min-w-0">
                  <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.35em] text-blue-200/80">
                    Inbox (stuck to the window)
                  </p>
                  <p className="m-0 mt-1 text-xs opacity-70">Click a letter. Watch the frost remember it.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-outline border-blue-200/30 bg-transparent text-blue-100/80">snow-glass</span>
                </div>
              </div>

              <ul className="mt-3 max-h-[min(52vh,520px)] space-y-2 overflow-y-auto pr-1">
                {emails.map((email, i) => {
                  const isActive = selectedEmail?.id === email.id
                  const isUnread = !email.read
                  return (
                    <li key={email.id} className={isUnread ? 'snow-mail-sticker-pop' : ''} style={{ animationDelay: `${i * 0.03}s` }}>
                      <button
                        type="button"
                        className={[
                          'snow-mail-card card w-full text-left',
                          isActive ? 'snow-mail-card-active' : '',
                          isUnread ? 'snow-mail-card-unread' : 'snow-mail-card-read',
                        ].join(' ')}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="card-body p-3">
                          <div className="flex items-start gap-3">
                            <div className="grid size-10 shrink-0 place-items-center rounded-2xl border border-base-content/10 bg-base-100/40">
                              <span className="text-xl" aria-hidden>
                                {email.from.avatar}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate font-mono text-[12px] font-bold opacity-95">{email.subject}</p>
                                {isUnread ? (
                                  <span className="badge badge-primary badge-sm border-0 bg-blue-400/90 text-blue-950 font-black">
                                    NEW
                                  </span>
                                ) : (
                                  <span className="badge badge-ghost badge-sm border border-base-content/10 bg-base-100/20 text-base-content/70">
                                    read
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs opacity-70">
                                {email.from.name} · {email.date} · {email.time ?? ''}
                              </p>
                              <p className="mt-1 line-clamp-2 text-xs opacity-75">{email.preview}</p>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="badge badge-outline border-blue-200/25 bg-transparent text-blue-100/70 text-[10px]">
                              {email.tag ? email.tag.toUpperCase() : 'MAIL'}
                            </span>
                            <span className="text-[10px] font-mono opacity-60">
                              frost-check {isUnread ? '▲' : '•'}
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          <aside className="lg:col-span-5 space-y-4">
            <div className="snow-panel rounded-3xl border border-base-content/10 bg-base-300/20 p-4 shadow-xl shadow-black/20 backdrop-blur-md">
              <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.35em] text-blue-200/80">Weather (inside your window)</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl border border-blue-200/25 bg-blue-500/10 shadow-inner shadow-blue-400/10">
                    <span className="text-3xl" aria-hidden>
                      {weather.temp <= 0 ? '⛄' : '❄️'}
                    </span>
                  </div>
                  <div>
                    <p className="m-0 text-4xl font-black tabular-nums leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                      {weather.temp}°
                    </p>
                    <p className="m-0 mt-1 text-sm font-bold">{weather.city}</p>
                    <p className="m-0 text-xs opacity-70">
                      data says: {weather.condition} · feels {weather.feels_like}°
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-info badge-sm border-0 bg-blue-400/20 text-blue-100/80">
                    humidity {weather.humidity}%
                  </span>
                  <span className="badge badge-info badge-sm border-0 bg-blue-400/20 text-blue-100/80">
                    wind {weather.wind} km/h
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {shownForecast.map((d, idx) => (
                  <div key={d.day} className="rounded-2xl border border-base-content/10 bg-base-100/20 p-2 text-center">
                    <p className="m-0 text-[10px] font-extrabold uppercase tracking-widest opacity-70">{d.day}</p>
                    <p className="m-0 text-lg">{d.icon}</p>
                    <p className="m-0 text-[10px] font-black tabular-nums opacity-80">
                      {d.high}°/{d.low}°
                    </p>
                    {idx === 0 ? (
                      <div className="mt-1 h-1.5 rounded-full bg-blue-400/60" />
                    ) : (
                      <div className="mt-1 h-1.5 rounded-full bg-blue-400/15" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="snow-panel rounded-3xl border border-base-content/10 bg-base-300/20 p-4 shadow-xl shadow-black/20 backdrop-blur-md">
              <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.35em] text-blue-200/80">News on the sill</p>
              <ul className="mt-3 space-y-3">
                {news.slice(0, 5).map((n, i) => (
                  <li key={n.id} className={i % 2 === 0 ? 'snow-news-jiggle' : ''} style={!reducedMotion ? { animationDelay: `${i * 0.08}s` } : undefined}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0" aria-hidden>
                        {n.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold">{n.title}</p>
                        <p className="text-xs opacity-70">
                          {n.source} · {n.time}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="snow-panel rounded-3xl border border-base-content/10 bg-base-300/20 p-4 shadow-xl shadow-black/20 backdrop-blur-md">
              <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.35em] text-blue-200/80">Stocks (under the ice)</p>
              <ul className="mt-3 space-y-3">
                {stocks.map((s) => (
                  <li key={s.ticker} className="flex items-center gap-3 border-b border-base-content/10 pb-3 last:border-b-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="m-0 font-mono text-xs font-extrabold">{s.ticker}</p>
                        <p className={`m-0 text-xs font-bold ${s.changePct >= 0 ? 'text-success' : 'text-error'}`}>
                          {s.changePct >= 0 ? '▲' : '▼'} {s.changePct >= 0 ? '+' : ''}
                          {s.changePct.toFixed(2)}%
                        </p>
                      </div>
                      <p className="m-0 mt-1 text-[10px] opacity-70">
                        {s.name} · {s.currency}
                        {s.price.toFixed(2)}
                      </p>
                    </div>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#7dd3fc' : '#fb7185'} className="opacity-90" />
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-3 text-center text-xs opacity-60">No guarantees. Just frosty numbers.</p>
            </div>
          </aside>
        </main>

        <footer className="snow-window-footer mt-4 rounded-3xl border border-base-content/10 bg-base-300/20 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-md">
          <div className="snow-window-ticker flex whitespace-nowrap gap-4">
            <span className="snow-window-ticker-inner">{ticker}</span>
            <span className="snow-window-ticker-inner" aria-hidden>
              {ticker}
            </span>
          </div>
        </footer>
      </div>

      {selectedEmail && (
        <div className="modal modal-open z-[85]" role="dialog" aria-modal="true" aria-labelledby="snow-email-title">
          <div
            className="modal-box relative max-h-[min(85dvh,560px)] w-[calc(100%-1rem)] max-w-lg border-2 shadow-2xl"
            style={{ borderColor: 'var(--accent2)', background: 'var(--card)', color: 'var(--text)' }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close message"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>

            <div className="flex flex-wrap items-start gap-3 border-b border-base-content/10 pb-3">
              <span className="text-4xl" aria-hidden>
                {selectedEmail.from.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="snow-email-title" className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="mt-1 text-xs opacity-70">
                  {selectedEmail.from.name} · {selectedEmail.date} {selectedEmail.time}
                </p>
              </div>
            </div>

            <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline border-blue-200/25 bg-transparent text-blue-100/70">{selectedEmail.tag ? selectedEmail.tag.toUpperCase() : 'MAIL'}</span>
                <span className="badge badge-outline border-blue-200/25 bg-transparent text-blue-100/70">{selectedEmail.read ? 'frozen (read)' : 'fresh (unread)'}</span>
              </div>

              <button type="button" className="btn btn-info btn-sm" onClick={() => setSelectedEmail(null)}>
                Melt & close
              </button>
            </div>
          </div>
          <button type="button" className="modal-backdrop bg-black/80" aria-label="Close message" onClick={() => setSelectedEmail(null)} />
        </div>
      )}
    </div>
  )
}

