import { useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function TieFighter({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 64" fill="none" aria-hidden>
      <ellipse cx="60" cy="32" rx="38" ry="10" fill="rgba(255,255,255,0.08)" />
      <rect x="48" y="26" width="24" height="12" rx="2" fill="rgba(30,30,40,0.95)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="4" y="20" width="18" height="24" rx="2" fill="rgba(45,45,55,0.9)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <rect x="98" y="20" width="18" height="24" rx="2" fill="rgba(45,45,55,0.9)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <line x1="22" y1="32" x2="48" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="72" y1="32" x2="98" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    </svg>
  )
}

function DeathStarDecoration({ rid }) {
  const gid = `swintro-ds-${rid}`
  return (
    <svg className="swintro-deathstar pointer-events-none fixed -right-8 top-[12%] z-[3] w-[min(42vw,220px)] opacity-[0.14]" viewBox="0 0 200 200" aria-hidden>
      <defs>
        <radialGradient id={`${gid}-g`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#4a5568" />
          <stop offset="70%" stopColor="#1a202c" />
          <stop offset="100%" stopColor="#0d1117" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="88" fill={`url(#${gid}-g)`} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle cx="118" cy="92" r="22" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
      <path d="M 100 12 Q 140 100 100 188" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    </svg>
  )
}

export default function StarWarsIntroLayout({ onSwitchPersona }) {
  const rid = useId().replace(/:/g, '')
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [phase, setPhase] = useState('ago')
  const [datapadOpen, setDatapadOpen] = useState(false)
  const [crawlKey, setCrawlKey] = useState(0)
  const [datapadTab, setDatapadTab] = useState('inbox')
  const timersRef = useRef([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => {
    if (!datapadOpen) return
    function onKey(e) {
      if (e.key === 'Escape') setDatapadOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [datapadOpen])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      const on = mq.matches
      setReducedMotion(on)
      if (on) {
        clearTimers()
        setPhase('crawl')
      }
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [clearTimers])

  useEffect(() => {
    if (reducedMotion) return
    clearTimers()
    if (phase === 'ago') {
      timersRef.current.push(
        setTimeout(() => setPhase('logo'), 4800),
      )
    } else if (phase === 'logo') {
      timersRef.current.push(
        setTimeout(() => setPhase('crawl'), 5200),
      )
    }
    return clearTimers
  }, [phase, reducedMotion, clearTimers])

  const skipToCrawl = useCallback(() => {
    clearTimers()
    setPhase('crawl')
  }, [clearTimers])

  const replay = useCallback(() => {
    clearTimers()
    setDatapadOpen(false)
    setCrawlKey(k => k + 1)
    setPhase(reducedMotion ? 'crawl' : 'ago')
  }, [clearTimers, reducedMotion])

  const crawlBlocks = useMemo(() => {
    const blocks = []

    blocks.push({
      key: 'open',
      title: null,
      lines: [
        'Turmoil has engulfed the INBOX. Hidden among spam filters and calendar invites, encrypted transmissions await decoding.',
        'While the Empire of unread counts tightens its grip, a small band of senders dares to hope for a reply before close of business…',
      ],
    })

    blocks.push({
      key: 'weather',
      title: 'ATMOSPHERIC INTEL',
      lines: [
        `Scanners fix on ${weather.city}, ${weather.country}: ${weather.icon} ${weather.condition}. Ambient ${weather.temp}° (sensors report “feels like” ${weather.feels_like}°). Surface winds ${weather.wind} km/h; humidity ${weather.humidity}%.`,
        `Forward projections: ${weather.forecast.map(d => `${d.day} ${d.icon} high ${d.high}°`).join(' · ')}.`,
      ],
    })

    blocks.push({
      key: 'market',
      title: 'GALACTIC EXCHANGE',
      lines: stocks.map(
        s =>
          `${s.ticker}: ${s.changePct >= 0 ? 'surging' : 'under pressure'} at ${s.changePct >= 0 ? '+' : ''}${s.changePct}% across the trading hyperspace lanes.`,
      ),
    })

    blocks.push({
      key: 'news',
      title: 'HOLOFEED DISPATCHES',
      lines: news.map(n => `${n.emoji} ${n.title} — relayed via ${n.source} (${n.time}).`),
    })

    blocks.push({
      key: 'mail',
      title: 'PRIORITY TRANSMISSIONS',
      lines: emails.map(e => {
        const snippet = (e.preview || e.body).slice(0, 180).trim()
        const tail = snippet.length >= 180 ? '…' : ''
        return `${e.from.avatar} ${e.from.name} — “${e.subject}”. ${snippet}${tail}`
      }),
    })

    blocks.push({
      key: 'end',
      title: null,
      lines: [
        'The scroll ends, but the story does not. Open your datapad to answer the galaxy—or replay this transmission from the beginning.',
      ],
    })

    return blocks
  }, [])

  const staticSections = useMemo(
    () =>
      crawlBlocks.map(b => (
        <section key={b.key} className="mb-8">
          {b.title && (
            <h2 className="mb-2 text-xl font-bold tracking-[0.2em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
              {b.title}
            </h2>
          )}
          {b.lines.map((line, i) => (
            <p key={i} className="mb-3 text-lg leading-relaxed text-[var(--text2)]">
              {line}
            </p>
          ))}
        </section>
      )),
    [crawlBlocks],
  )

  return (
    <div
      className="swintro-root relative min-h-dvh overflow-hidden bg-black text-[var(--text)]"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="swfan-starfield pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden />
      <div className="swintro-hyperspeed pointer-events-none fixed inset-0 z-[1]" aria-hidden />
      {!reducedMotion && <div className="swfan-hyperspin pointer-events-none fixed z-[1] opacity-25" aria-hidden />}
      <DeathStarDecoration rid={rid} />
      {!reducedMotion && <TieFighter className="swintro-tie-patrol pointer-events-none fixed z-[2] w-28 md:w-36" />}

      <div
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)',
        }}
        aria-hidden
      />

      {/* Opening crawl phases */}
      {!reducedMotion && phase === 'ago' && (
        <div className="swintro-ago-pulse fixed inset-0 z-30 flex items-center justify-center px-6">
          <p
            className="max-w-xl text-center text-xl leading-relaxed tracking-wide text-[var(--accent2)] md:text-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A long time ago in a browser far, far away…
          </p>
        </div>
      )}

      {!reducedMotion && phase === 'logo' && (
        <div className="swintro-logo-stage fixed inset-0 z-30 flex flex-col items-center justify-center px-4">
          <p className="mb-4 text-center text-base font-bold tracking-[0.55em] text-[var(--accent2)] md:text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            EPISODE MMXXVI
          </p>
          <h1
            className="swintro-logo-fly text-center text-[clamp(2rem,9vw,4.75rem)] font-black uppercase leading-none tracking-[0.08em] text-[var(--accent)]"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: '0 0 20px rgba(255,232,31,0.35), 0 0 60px rgba(255,232,31,0.15)',
            }}
          >
            The daily
            <br />
            briefing
          </h1>
        </div>
      )}

      {/* Main crawl */}
      {(phase === 'crawl' || reducedMotion) && (
        <div
          className={`fixed inset-0 z-20 ${reducedMotion ? 'overflow-y-auto py-8' : 'overflow-hidden'}`}
          key={crawlKey}
        >
          {reducedMotion ? (
            <div className="relative z-10 mx-auto max-w-3xl px-4 pb-32 text-[var(--text)]">{staticSections}</div>
          ) : (
            <div className="swintro-crawl-mask relative flex h-full w-full items-end justify-center pb-[12vh] pt-[6vh]">
              <div className="swintro-crawl-viewport w-full max-w-4xl px-6">
                <div
                  className="swintro-crawl-move mx-auto max-w-[40rem] text-center font-normal leading-relaxed text-[var(--accent)] [text-rendering:optimizeLegibility]"
                  style={{
                    textShadow:
                      '0 0 1px rgba(0,0,0,0.9), 0 0 18px rgba(255,232,31,0.45), 0 0 42px rgba(255,232,31,0.2)',
                  }}
                >
                  {crawlBlocks.map(block => (
                    <div key={block.key} className="mb-10">
                      {block.title && (
                        <p
                          className="mb-6 text-3xl font-bold uppercase tracking-[0.28em] md:text-4xl"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {block.title}
                        </p>
                      )}
                      {block.lines.map((line, i) => (
                        <p key={i} className="mb-5 text-[clamp(1.1rem,3.2vw,1.6rem)]">
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HUD */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex flex-wrap items-end justify-center gap-2 p-3 md:justify-between md:px-6 md:pb-4">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          {!reducedMotion && phase !== 'crawl' && (
            <button type="button" className="btn btn-sm btn-warning uppercase tracking-wider" onClick={skipToCrawl}>
              Skip to crawl
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm border border-[var(--accent)] bg-[var(--accent)] text-black hover:brightness-90"
            onClick={() => setDatapadOpen(true)}
          >
            Open datapad
          </button>
          <button type="button" className="btn btn-sm btn-ghost text-[var(--accent2)]" onClick={replay}>
            Replay intro
          </button>
        </div>
        <button
          type="button"
          className="pointer-events-auto btn btn-sm btn-outline border-[var(--border)] text-[var(--accent)]"
          onClick={onSwitchPersona}
        >
          Exit to reality
        </button>
      </div>

      {/* Datapad overlay */}
      {datapadOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Datapad"
          onClick={() => setDatapadOpen(false)}
        >
          <div
            className="card flex max-h-[min(92dvh,720px)] w-full max-w-4xl flex-col overflow-hidden border-2 border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-[var(--accent)]/10"
            onClick={e => e.stopPropagation()}
            role="document"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-4 py-3">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                Rebel datapad
              </p>
              <button type="button" className="btn btn-sm btn-circle btn-ghost text-[var(--accent)]" aria-label="Close" onClick={() => setDatapadOpen(false)}>
                ✕
              </button>
            </div>

            <div role="tablist" className="tabs tabs-boxed m-3 flex-wrap gap-1 bg-base-300/50 p-1">
              {[
                { id: 'inbox', label: 'Inbox' },
                { id: 'weather', label: 'Weather' },
                { id: 'stocks', label: 'Stocks' },
                { id: 'news', label: 'News' },
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={datapadTab === t.id}
                  className={`tab tab-sm uppercase tracking-wide ${datapadTab === t.id ? 'tab-active !bg-[var(--accent)] !text-black' : ''}`}
                  onClick={() => setDatapadTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-hidden md:min-h-[280px] md:grid-cols-[minmax(0,280px)_1fr] md:gap-px md:bg-[var(--border)]">
              {datapadTab === 'inbox' && (
                <>
                  <ul className="max-h-[40vh] min-h-0 overflow-y-auto bg-base-300/30 md:max-h-none">
                    {emails.map(e => {
                      const on = selectedEmail?.id === e.id
                      return (
                        <li key={e.id} className="border-b border-[var(--border)] border-opacity-40">
                          <button
                            type="button"
                            className={`w-full px-3 py-3 text-left text-sm transition-colors ${on ? 'bg-[var(--accent)]/15' : 'hover:bg-white/5'}`}
                            onClick={() => setSelectedEmail(e)}
                          >
                            <span className="line-clamp-2 font-semibold text-[var(--text)]">{e.subject}</span>
                            <span className="mt-1 flex items-center gap-1 text-xs opacity-70">
                              <span>{e.from.avatar}</span> {e.from.name}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="min-h-[200px] overflow-y-auto bg-base-200/20 p-4 md:min-h-0">
                    {selectedEmail ? (
                      <article>
                        <h3 className="text-lg font-bold text-[var(--accent)]">{selectedEmail.subject}</h3>
                        <p className="mt-1 text-xs opacity-60">
                          {selectedEmail.from.name} · {selectedEmail.date} {selectedEmail.time}
                        </p>
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed opacity-90">{selectedEmail.body}</p>
                      </article>
                    ) : (
                      <p className="text-sm opacity-60">Select a transmission from the list.</p>
                    )}
                  </div>
                </>
              )}

              {datapadTab === 'weather' && (
                <div className="col-span-full overflow-y-auto p-6 md:col-span-2">
                  <p className="text-4xl">{weather.icon}</p>
                  <h3 className="mt-2 text-2xl font-bold">{weather.city}</h3>
                  <p className="opacity-70">{weather.country}</p>
                  <p className="mt-4 text-xl">{weather.condition}</p>
                  <p className="mt-2 text-sm">
                    {weather.temp}° · feels {weather.feels_like}° · wind {weather.wind} km/h · humidity {weather.humidity}%
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {weather.forecast.map(d => (
                      <li key={d.day} className="badge badge-lg border border-[var(--border)] bg-base-300">
                        {d.day} {d.icon} {d.high}° / {d.low}°
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {datapadTab === 'stocks' && (
                <ul className="col-span-full divide-y divide-[var(--border)] divide-opacity-30 overflow-y-auto p-4 md:col-span-2">
                  {stocks.map(s => (
                    <li key={s.ticker} className="flex items-center justify-between gap-4 py-3">
                      <span className="font-mono font-bold text-[var(--accent2)]">{s.ticker}</span>
                      <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>
                        {s.changePct >= 0 ? '+' : ''}
                        {s.changePct}%
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {datapadTab === 'news' && (
                <ul className="col-span-full space-y-3 overflow-y-auto p-4 md:col-span-2">
                  {news.map(n => (
                    <li key={n.id} className="rounded-lg border border-[var(--border)] border-opacity-40 bg-base-300/20 p-3">
                      <span className="text-xl">{n.emoji}</span>
                      <p className="mt-1 font-medium leading-snug">{n.title}</p>
                      <p className="mt-1 text-xs opacity-60">
                        {n.source} · {n.category} · {n.time}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
