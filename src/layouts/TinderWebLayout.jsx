import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const VIBE_TAG = t =>
  ({
    work: 'Grindset',
    personal: 'Soft launch',
    finance: 'Money moves',
    promo: 'Main promo',
    newsletter: 'Newsletter bae',
    social: 'Networker',
    dev: 'Ships code',
    shopping: 'Retail therapy',
    travel: 'Passport ready',
  }[t] || 'Mystery')

function pseudoDistance(id) {
  const n = ((id * 17) % 47) + 3
  return `${n} km away`
}

export default function TinderWebLayout({ onSwitchPersona }) {
  const { setSelectedEmail } = usePersona()
  const [tab, setTab] = useState('deck')
  const [deckIndex, setDeckIndex] = useState(0)
  const [swipeDir, setSwipeDir] = useState(null)
  const [matchEmail, setMatchEmail] = useState(null)
  const [heartsBurst, setHeartsBurst] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const dragRef = useRef({ active: false, startX: 0, x: 0 })
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const queue = useMemo(() => [...emails], [])
  const current = queue[deckIndex] ?? null
  const next1 = queue[deckIndex + 1] ?? null
  const next2 = queue[deckIndex + 2] ?? null
  const doneDeck = deckIndex >= queue.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const finishSwipe = useCallback(
    dir => {
      if (!current || swipeDir) return
      setSwipeDir(dir)
      const t = reducedMotion ? 0 : 320
      window.setTimeout(() => {
        if (dir === 'right') {
          setMatchEmail(current)
          setSelectedEmail(current)
          if (!reducedMotion) {
            setHeartsBurst(true)
            window.setTimeout(() => setHeartsBurst(false), 1400)
          }
        }
        setDeckIndex(i => i + 1)
        setSwipeDir(null)
        setDragX(0)
      }, t)
    },
    [current, swipeDir, reducedMotion, setSelectedEmail]
  )

  const onPointerDown = e => {
    if (!current || swipeDir || tab !== 'deck') return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    dragRef.current = { active: true, startX: e.clientX, x: 0 }
    setIsDragging(true)
    setDragX(0)
  }

  const onPointerMove = e => {
    if (!dragRef.current.active || swipeDir) return
    const dx = e.clientX - dragRef.current.startX
    dragRef.current.x = dx
    setDragX(dx)
  }

  const endDrag = () => {
    if (!dragRef.current.active) return
    const dx = dragRef.current.x
    dragRef.current = { active: false, startX: 0, x: 0 }
    setIsDragging(false)
    if (dx > 72) finishSwipe('right')
    else if (dx < -72) finishSwipe('left')
    else setDragX(0)
  }

  const closeMatch = () => {
    setMatchEmail(null)
    setSelectedEmail(null)
  }

  const resetDeck = () => {
    setDeckIndex(0)
    setSwipeDir(null)
    setDragX(0)
    setIsDragging(false)
  }

  const rot = reducedMotion ? 0 : Math.max(-14, Math.min(14, dragX * 0.06))
  const opacityNope = reducedMotion ? 0 : Math.min(1, Math.max(0, (-dragX - 20) / 120))
  const opacityLike = reducedMotion ? 0 : Math.min(1, Math.max(0, (dragX - 20) / 120))

  const cardTransform =
    swipeDir === 'left'
      ? 'translateX(-120%) rotate(-18deg)'
      : swipeDir === 'right'
        ? 'translateX(120%) rotate(18deg)'
        : `translateX(${dragX}px) rotate(${rot}deg)`

  const cardTransition =
    isDragging && !swipeDir
      ? 'none'
      : reducedMotion
        ? 'none'
        : 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.32s ease'

  return (
    <div
      className="tinder-web-root relative min-h-dvh overflow-x-hidden pb-28 text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main)',
        background: `
          radial-gradient(ellipse 120% 80% at 50% -30%, rgba(254, 60, 114, 0.35) 0%, transparent 55%),
          radial-gradient(ellipse 80% 50% at 100% 20%, rgba(255, 107, 74, 0.12) 0%, transparent 45%),
          linear-gradient(180deg, #120c0c 0%, #0a0808 50%, #0d0a09 100%)`,
      }}
    >
      <style>{`
        @keyframes tinder-flame-flicker {
          0%, 100% { transform: scale(1) rotate(-2deg); filter: brightness(1); }
          50% { transform: scale(1.06) rotate(2deg); filter: brightness(1.15); }
        }
        @keyframes tinder-heart-rise {
          0% { transform: translateY(0) scale(0.4); opacity: 0.9; }
          100% { transform: translateY(-120px) scale(1.2); opacity: 0; }
        }
        @keyframes tinder-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(254, 60, 114, 0.35), 0 0 40px rgba(255, 107, 74, 0.15); }
          50% { box-shadow: 0 0 28px rgba(254, 60, 114, 0.5), 0 0 56px rgba(255, 107, 74, 0.25); }
        }
        @keyframes tinder-tab-pop {
          0% { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        .tinder-flame-icon { animation: tinder-flame-flicker 2.2s ease-in-out infinite; }
        .tinder-tab-active { animation: tinder-tab-pop 0.25s ease-out; }
        .tinder-heart-particle {
          position: absolute;
          left: 50%;
          bottom: 40%;
          font-size: 1.5rem;
          animation: tinder-heart-rise 1.2s ease-out forwards;
          pointer-events: none;
        }
      `}</style>

      {!reducedMotion && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.07]" aria-hidden>
          <div
            className="absolute h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, #fe3c72 0, transparent 2px),
                radial-gradient(circle at 80% 70%, #ff6b4a 0, transparent 2px),
                radial-gradient(circle at 40% 80%, #00d4aa 0, transparent 1.5px)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>
      )}

      {heartsBurst && !reducedMotion && (
        <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="tinder-heart-particle"
              style={{
                animationDelay: `${i * 0.06}s`,
                marginLeft: `${(i % 6) * 14 - 35}px`,
                transform: `rotate(${(i - 6) * 12}deg)`,
              }}
            >
              {i % 3 === 0 ? '💘' : i % 3 === 1 ? '💖' : '✨'}
            </span>
          ))}
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-[#1a1210]/95 via-[#221818]/95 to-[#1a1210]/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fe3c72] to-[#ff6b4a] text-2xl shadow-lg ring-2 ring-[#fe3c72]/40 ${reducedMotion ? '' : 'tinder-flame-icon'}`}
              aria-hidden
            >
              🔥
            </span>
            <div className="min-w-0">
              <p
                className="m-0 truncate text-lg font-bold leading-tight tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Spark
              </p>
              <p className="m-0 truncate text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text2)]">
                Parody · same data, new chemistry
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm rounded-full border-0 bg-white/10 font-semibold text-[var(--text)] hover:bg-white/20"
            onClick={onSwitchPersona}
          >
            Exit app
          </button>
        </div>
      </header>

      <nav
        className="sticky top-[57px] z-30 mx-auto flex max-w-lg justify-around gap-1 border-b border-white/5 bg-[#0f0c0c]/90 px-2 py-2 backdrop-blur-sm"
        aria-label="Main sections"
      >
        {[
          { id: 'deck', label: 'Discover', icon: '🔥' },
          { id: 'chats', label: 'Chats', icon: '💬' },
          { id: 'profile', label: 'Vibe', icon: '👤' },
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-bold transition-colors ${
              tab === t.id
                ? 'bg-gradient-to-br from-[#fe3c72]/25 to-[#ff6b4a]/10 text-white tinder-tab-active'
                : 'text-[var(--text2)] hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-lg leading-none" aria-hidden>
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </nav>

      <main className="relative z-10 mx-auto max-w-lg px-4 py-6">
        {tab === 'deck' && (
          <section aria-labelledby="tinder-deck-heading" className="flex flex-col items-center">
            <h1 id="tinder-deck-heading" className="sr-only">
              Swipe inbox cards
            </h1>
            {!doneDeck ? (
              <>
                <div className="relative mt-2 h-[min(72dvh,520px)] w-full max-w-[340px]">
                  {next2 && (
                    <div
                      className="absolute inset-x-4 top-3 h-[calc(100%-12px)] rounded-[1.75rem] border border-white/10 bg-[#2a2220] shadow-md"
                      style={{ transform: 'scale(0.88) translateY(16px)', zIndex: 0 }}
                      aria-hidden
                    />
                  )}
                  {next1 && (
                    <div
                      className="absolute inset-x-2 top-2 h-[calc(100%-8px)] rounded-[1.75rem] border border-white/15 bg-[#252019] shadow-lg"
                      style={{ transform: 'scale(0.94) translateY(8px)', zIndex: 1 }}
                      aria-hidden
                    >
                      <div className="flex h-full flex-col justify-end p-5 opacity-40">
                        <p className="m-0 text-2xl font-bold">{next1.from.avatar}</p>
                      </div>
                    </div>
                  )}
                  {current && (
                    <article
                      className="absolute inset-0 z-[2] flex cursor-grab touch-none flex-col rounded-[1.75rem] border-2 border-white/20 bg-gradient-to-b from-[#2e2624] to-[#1a1514] shadow-2xl active:cursor-grabbing"
                      style={{
                        transform: cardTransform,
                        transition: cardTransition,
                      }}
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                    >
                      <div
                        className="relative h-[52%] overflow-hidden rounded-t-[1.6rem] bg-gradient-to-br from-[#fe3c72]/30 via-[#ff6b4a]/20 to-[#00d4aa]/15"
                        aria-hidden
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-[7rem] drop-shadow-2xl">
                          {current.from.avatar}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1514] via-transparent to-transparent" />
                        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          {pseudoDistance(current.id)}
                        </span>
                        <div
                          className="pointer-events-none absolute left-4 right-4 top-1/4 flex justify-between text-4xl font-black uppercase italic tracking-wider"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          <span
                            className="rounded-lg border-4 border-[#00d4aa] px-2 py-1 text-[#00d4aa]"
                            style={{ opacity: opacityLike }}
                          >
                            LIKE
                          </span>
                          <span
                            className="rounded-lg border-4 border-[#fe3c72] px-2 py-1 text-[#fe3c72]"
                            style={{ opacity: opacityNope }}
                          >
                            NOPE
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h2
                            className="m-0 text-2xl font-extrabold leading-tight"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {current.from.name.split(' ')[0]},{' '}
                            <span className="text-[var(--text2)]">{20 + (current.id % 9)}</span>
                          </h2>
                          {current.starred && (
                            <span className="badge border-0 bg-gradient-to-r from-amber-400 to-orange-500 font-bold text-black">
                              Super-like
                            </span>
                          )}
                        </div>
                        <span className="badge w-fit border-0 bg-white/10 font-semibold text-[var(--text)]">
                          {VIBE_TAG(current.tag)}
                        </span>
                        <p className="m-0 text-base font-bold leading-snug text-white">{current.subject}</p>
                        <p className="m-0 line-clamp-4 text-sm leading-relaxed text-[var(--text2)]">{current.preview}</p>
                        <p className="mt-auto text-xs font-medium text-white/40">{current.time}</p>
                      </div>
                    </article>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    aria-label="Nope"
                    className="btn btn-circle h-16 w-16 border-0 bg-[#2a2220] text-3xl text-[#fe3c72] shadow-xl hover:scale-105 hover:bg-[#352a28]"
                    onClick={() => finishSwipe('left')}
                    disabled={!!swipeDir}
                  >
                    ✕
                  </button>
                  <button
                    type="button"
                    aria-label="Super like"
                    className="btn btn-circle h-14 w-14 border-0 bg-gradient-to-br from-sky-400 to-blue-600 text-2xl text-white shadow-lg hover:scale-105"
                    onClick={() => finishSwipe('right')}
                    disabled={!!swipeDir}
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    aria-label="Like"
                    className="btn btn-circle h-16 w-16 border-0 bg-gradient-to-br from-[#00d4aa] to-emerald-600 text-3xl text-white shadow-xl hover:scale-105"
                    onClick={() => finishSwipe('right')}
                    disabled={!!swipeDir}
                  >
                    ♥
                  </button>
                </div>
                <p className="mt-4 max-w-xs text-center text-xs text-[var(--text2)]">
                  Swipe or drag the card — right opens the full message. Left skips. (Parody UI, not a real dating app.)
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6 py-16 text-center">
                <span className="text-7xl" aria-hidden>
                  🎉
                </span>
                <div>
                  <h2 className="m-0 text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    You cleared the deck!
                  </h2>
                  <p className="m-0 mt-2 text-[var(--text2)]">Every sender got a verdict. Ready for round two?</p>
                </div>
                <button type="button" className="btn rounded-full border-0 bg-gradient-to-r from-[#fe3c72] to-[#ff6b4a] px-8 font-bold text-white" onClick={resetDeck}>
                  Shuffle feelings (reset)
                </button>
              </div>
            )}
          </section>
        )}

        {tab === 'chats' && (
          <section aria-labelledby="tinder-chats-heading">
            <h2 id="tinder-chats-heading" className="m-0 mb-4 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Chats <span className="text-sm font-normal text-[var(--text2)]">(it&apos;s the news)</span>
            </h2>
            <ul className="space-y-2">
              {news.map((n, i) => (
                <li key={n.id}>
                  <div
                    className={`flex gap-3 rounded-2xl border border-white/10 bg-[#1c1816] p-4 shadow-lg transition-transform hover:border-[#fe3c72]/30 ${
                      reducedMotion ? '' : 'hover:scale-[1.01]'
                    }`}
                    style={!reducedMotion ? { animationDelay: `${i * 0.05}s` } : undefined}
                  >
                    <div className="relative shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#fe3c72]/40 to-[#ff6b4a]/20 text-2xl">
                        {n.emoji}
                      </div>
                      {!reducedMotion && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fe3c72] px-1 text-[10px] font-bold text-white">
                          {n.time.includes('h') ? '!' : '·'}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="m-0 font-bold text-white">{n.source}</p>
                        <span className="shrink-0 text-[10px] text-[var(--text2)]">{n.time}</span>
                      </div>
                      <p className="m-0 mt-1 line-clamp-2 text-sm text-[var(--text2)]">{n.title}</p>
                      <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00d4aa]">
                        {n.category}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'profile' && (
          <section aria-labelledby="tinder-profile-heading" className="space-y-6">
            <h2 id="tinder-profile-heading" className="m-0 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Your vibe check
            </h2>

            <div
              className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-[#fe3c72]/20 via-[#1e1816] to-[#00d4aa]/10 p-6 shadow-xl"
              style={
                reducedMotion
                  ? undefined
                  : { animation: 'tinder-glow-pulse 3s ease-in-out infinite' }
              }
            >
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#fe3c72]">
                <span aria-hidden>📍</span> Tonight&apos;s forecast
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black/30 text-5xl ring-4 ring-[#fe3c72]/40">
                  {weather.icon}
                </div>
                <div>
                  <p className="m-0 text-4xl font-extrabold tabular-nums">{weather.temp}°</p>
                  <p className="m-0 font-semibold text-white">{weather.condition}</p>
                  <p className="m-0 text-sm text-[var(--text2)]">
                    {weather.city} · feels {weather.feels_like}° · wind {weather.wind} km/h
                  </p>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {weather.forecast.map((d, i) => (
                  <li key={i} className="badge badge-lg border-0 bg-white/10 font-semibold">
                    {d.icon} {d.day} {d.high}°
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="m-0 mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text2)]">
                <span aria-hidden>✨</span> Gold portfolio
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/40 to-[#1a1514] p-4 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="m-0 font-mono text-sm font-bold text-amber-200">{s.ticker}</p>
                        <p className="m-0 line-clamp-1 text-[10px] text-[var(--text2)]">{s.name}</p>
                      </div>
                      <span
                        className={`text-sm font-extrabold tabular-nums ${s.changePct >= 0 ? 'text-[#00d4aa]' : 'text-[#fe3c72]'}`}
                      >
                        {s.changePct > 0 ? '+' : ''}
                        {s.changePct}%
                      </span>
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-2">
                      <MiniSpark
                        series={s.series}
                        stroke={s.changePct >= 0 ? '#2dd4bf' : '#fb7185'}
                        className="opacity-90"
                      />
                      <p className="m-0 text-xs font-bold tabular-nums">
                        {s.currency}
                        {s.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {matchEmail && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tinder-match-title"
        >
          <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-white/20 bg-gradient-to-b from-[#2a2220] to-[#141010] p-6 shadow-2xl sm:rounded-3xl">
            <div className="text-center">
              <p className="m-0 text-sm font-bold uppercase tracking-[0.3em] text-[#00d4aa]">It&apos;s a match!</p>
              <h2 id="tinder-match-title" className="m-0 mt-2 text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {matchEmail.from.name}
              </h2>
              <p className="m-0 mt-1 text-5xl" aria-hidden>
                {matchEmail.from.avatar}
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="m-0 text-xs font-bold uppercase text-[var(--text2)]">Subject</p>
              <p className="m-0 mt-1 font-bold text-white">{matchEmail.subject}</p>
              <p className="m-0 mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text2)]">{matchEmail.body}</p>
            </div>
            <button
              type="button"
              className="btn btn-block mt-6 rounded-2xl border-0 bg-gradient-to-r from-[#fe3c72] to-[#ff6b4a] font-bold text-white"
              onClick={closeMatch}
            >
              Keep swiping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
