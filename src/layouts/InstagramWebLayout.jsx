import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TAG_LABEL = {
  work: 'Werk',
  personal: 'Fam',
  finance: 'Money',
  promo: 'Ad',
  newsletter: 'Substack era',
  social: 'Network',
  dev: 'Ship',
  shopping: 'Haul',
  travel: 'Wander',
}

function HeartBurst({ x, y }) {
  return (
    <span
      className="pointer-events-none absolute z-20 text-6xl"
      style={{
        left: x - 28,
        top: y - 28,
        animation: 'ig-heart-pop 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
      aria-hidden
    >
      ❤️
    </span>
  )
}

export default function InstagramWebLayout() {
  const { setSelectedEmail } = usePersona()
  const [tab, setTab] = useState('home')
  const [storyOpen, setStoryOpen] = useState(null)
  const [storyIdx, setStoryIdx] = useState(0)
  const [emailOpen, setEmailOpen] = useState(null)
  const [liked, setLiked] = useState(() => new Set())
  const [heartFx, setHeartFx] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const lastTapRef = useRef({ id: null, t: 0 })
  const storyTimerRef = useRef(null)

  const storySequence = useMemo(() => {
    const w = {
      kind: 'weather',
      key: 'weather',
      avatar: weather.icon,
      label: 'Your day',
      sub: `${weather.city} · ${weather.temp}°`,
    }
    const n = news.map(item => ({
      kind: 'news',
      key: `news-${item.id}`,
      avatar: item.emoji,
      label: item.source,
      sub: item.title,
      item,
    }))
    const s = stocks.map(st => ({
      kind: 'stock',
      key: `stock-${st.ticker}`,
      avatar: st.changePct >= 0 ? '📈' : '📉',
      label: st.ticker,
      sub: `${st.currency}${st.price}`,
      stock: st,
    }))
    return [w, ...n, ...s]
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const openStoryAt = useCallback(
    idx => {
      setStoryIdx(idx)
      setStoryOpen(storySequence[idx] ?? null)
    },
    [storySequence]
  )

  useEffect(() => {
    if (!storyOpen || reducedMotion) return
    storyTimerRef.current = window.setTimeout(() => {
      setStoryIdx(i => {
        const next = i + 1
        if (next >= storySequence.length) {
          setStoryOpen(null)
          return 0
        }
        setStoryOpen(storySequence[next])
        return next
      })
    }, 5200)
    return () => {
      if (storyTimerRef.current) window.clearTimeout(storyTimerRef.current)
    }
  }, [storyOpen, storyIdx, storySequence, reducedMotion])

  const closeStory = () => {
    setStoryOpen(null)
    if (storyTimerRef.current) window.clearTimeout(storyTimerRef.current)
  }

  const storyNext = () => {
    const next = storyIdx + 1
    if (next >= storySequence.length) closeStory()
    else {
      setStoryIdx(next)
      setStoryOpen(storySequence[next])
    }
  }

  const storyPrev = () => {
    if (storyIdx <= 0) return
    const prev = storyIdx - 1
    setStoryIdx(prev)
    setStoryOpen(storySequence[prev])
  }

  const toggleLike = id => {
    setLiked(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const onPostDoubleTap = (e, postId) => {
    const now = Date.now()
    const { id: lastId, t } = lastTapRef.current
    if (lastId === postId && now - t < 320) {
      const rect = e.currentTarget.getBoundingClientRect()
      setHeartFx({ x: e.clientX - rect.left, y: e.clientY - rect.top, key: now, postId })
      window.setTimeout(() => setHeartFx(null), 900)
      setLiked(prev => new Set(prev).add(postId))
      lastTapRef.current = { id: null, t: 0 }
    } else {
      lastTapRef.current = { id: postId, t: now }
    }
  }

  const openEmail = em => {
    setEmailOpen(em)
    setSelectedEmail(em)
  }

  const closeEmail = () => {
    setEmailOpen(null)
    setSelectedEmail(null)
  }

  const unreadDm = emails.filter(e => !e.read).length

  return (
    <div className="ig-theme relative min-h-full bg-[#000] text-[#fafafa]">
      <style>{`
        @keyframes ig-heart-pop {
          0% { transform: scale(0.2); opacity: 0; }
          40% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes ig-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes ig-float-badge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes ig-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(225, 48, 108, 0.45); }
          50% { box-shadow: 0 0 0 10px rgba(225, 48, 108, 0); }
        }
        .ig-story-gradient {
          background: linear-gradient(
            45deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
          );
        }
        .ig-feed-enter {
          animation: ig-feed-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        @keyframes ig-feed-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ig-caption-type {
          font-family: var(--font-display), ui-sans-serif, system-ui, sans-serif;
        }
      `}</style>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/85 px-3 py-2 backdrop-blur-md">
        <span className="ig-caption-type text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976]">
          Grammable
        </span>
        <div className="flex items-center gap-1">
          <button type="button" className="btn btn-ghost btn-square btn-sm text-white" aria-label="Add story">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button type="button" className="btn btn-ghost btn-square btn-sm text-white" aria-label="Activity">
            <span className="relative inline-flex">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {liked.size > 0 && (
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#e1306c]" />
              )}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-square btn-sm text-white"
            aria-label="Direct messages"
            onClick={() => setTab('inbox')}
          >
            <span className="relative">
              <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
              </svg>
              {unreadDm > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e1306c] px-1 text-[10px] font-bold leading-none text-white">
                  {unreadDm > 9 ? '9+' : unreadDm}
                </span>
              )}
            </span>
          </button>
        </div>
      </header>

      <main className="pb-24">
        {tab === 'home' && (
          <>
            <section aria-label="Stories" className="border-b border-white/10 py-3">
              <div className="flex gap-3 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {storySequence.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => openStoryAt(i)}
                    className={`flex shrink-0 flex-col items-center gap-1 ${reducedMotion ? '' : 'ig-feed-enter'}`}
                    style={!reducedMotion ? { animationDelay: `${i * 0.06}s` } : undefined}
                  >
                    <span
                      className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full p-[2.5px] ${
                        i === 0 ? 'ig-story-gradient' : 'ig-story-gradient'
                      } ${!reducedMotion ? 'hover:scale-105' : ''} transition-transform duration-200`}
                    >
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-black text-3xl ring-2 ring-black">
                        {s.avatar}
                      </span>
                      {!reducedMotion && i === 0 && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#0095f6] text-lg font-bold text-white"
                          style={{ animation: 'ig-pulse-ring 2s ease-in-out infinite' }}
                          aria-hidden
                        >
                          +
                        </span>
                      )}
                    </span>
                    <span className="max-w-[4.5rem] truncate text-[11px] text-white/80">{s.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="space-y-6 px-0 pt-2">
              <article
                className={`border-b border-white/10 pb-5 ${!reducedMotion ? 'ig-feed-enter' : ''}`}
                style={!reducedMotion ? { animationDelay: '0.08s' } : undefined}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-lg">
                    {weather.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-sm font-semibold">meteo.aesthetic</p>
                    <p className="m-0 text-xs text-white/50">{weather.city}</p>
                  </div>
                  <button type="button" className="btn btn-ghost btn-xs text-white" aria-label="More">
                    ···
                  </button>
                </div>
                <button
                  type="button"
                  className="relative block w-full overflow-visible border-0 bg-transparent p-0 text-left"
                  onClick={e => onPostDoubleTap(e, 'weather-post')}
                >
                  {heartFx?.postId === 'weather-post' && <HeartBurst x={heartFx.x} y={heartFx.y} key={heartFx.key} />}
                  <div
                    className="mx-3 flex aspect-square max-h-[min(70vh,420px)] items-center justify-center overflow-hidden rounded-sm bg-[#111]"
                    style={{
                      background: reducedMotion
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                        : 'linear-gradient(120deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                      backgroundSize: reducedMotion ? undefined : '200% 200%',
                      animation: reducedMotion ? undefined : 'ig-shimmer 8s ease infinite',
                    }}
                  >
                    <div className="text-center">
                      <p className="m-0 text-7xl drop-shadow-lg">{weather.icon}</p>
                      <p className="mt-2 font-mono text-5xl font-black tabular-nums tracking-tight">{weather.temp}°</p>
                      <p className="mt-1 text-lg font-medium opacity-90">{weather.condition}</p>
                      <p className="mt-2 text-sm text-white/70">
                        Feels {weather.feels_like}° · Humidity {weather.humidity}% · Wind {weather.wind} km/h
                      </p>
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-3 px-3 pt-3">
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-sm min-h-0 px-0 text-white"
                    aria-pressed={liked.has('weather-post')}
                    aria-label="Like"
                    onClick={() => toggleLike('weather-post')}
                  >
                    {liked.has('weather-post') ? <span className="text-2xl">❤️</span> : <span className="text-2xl opacity-90">🤍</span>}
                  </button>
                  <span className="text-2xl opacity-80" aria-hidden>
                    💬
                  </span>
                  <span className="ml-auto text-2xl opacity-80" aria-hidden>
                    🔖
                  </span>
                </div>
                <p className="m-0 px-3 pt-1 text-sm">
                  <span className="font-semibold">meteo.aesthetic</span>{' '}
                  <span className="text-white/85">Soft launch of today&apos;s sky ✨ No filter, just data.</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2 px-3">
                  {weather.forecast.map((d, i) => (
                    <span key={i} className="badge badge-sm border-0 bg-white/10 font-medium text-white">
                      {d.icon} {d.day} {d.high}°
                    </span>
                  ))}
                </div>
              </article>

              {news.map((n, ni) => {
                const pid = `news-${n.id}`
                return (
                  <article
                    key={n.id}
                    className={`border-b border-white/10 pb-5 ${!reducedMotion ? 'ig-feed-enter' : ''}`}
                    style={!reducedMotion ? { animationDelay: `${0.12 + ni * 0.05}s` } : undefined}
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl">{n.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 truncate text-sm font-semibold">{n.source}</p>
                        <p className="m-0 text-xs text-white/50">{n.category} · {n.time}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative block w-full overflow-visible border-0 bg-transparent p-0 text-left"
                      onClick={e => onPostDoubleTap(e, pid)}
                    >
                      {heartFx?.postId === pid && <HeartBurst x={heartFx.x} y={heartFx.y} key={heartFx.key} />}
                      <div className="mx-3 flex aspect-[4/5] max-h-[min(72vh,480px)] flex-col justify-end overflow-hidden rounded-sm bg-[#1a1a1a] p-6">
                        <div
                          className="absolute inset-0 opacity-40"
                          style={{
                            background: `radial-gradient(circle at 30% 20%, rgba(236,72,153,0.5), transparent 50%),
                              radial-gradient(circle at 80% 60%, rgba(59,130,246,0.4), transparent 45%)`,
                          }}
                        />
                        <p className="relative z-10 m-0 text-6xl drop-shadow-md">{n.emoji}</p>
                        <p className="relative z-10 mt-4 text-xl font-bold leading-snug text-white drop-shadow">{n.title}</p>
                      </div>
                    </button>
                    <div className="flex items-center gap-3 px-3 pt-3">
                      <button
                        type="button"
                        className="btn btn-ghost btn-square btn-sm min-h-0 px-0 text-white"
                        aria-pressed={liked.has(pid)}
                        onClick={() => toggleLike(pid)}
                      >
                        {liked.has(pid) ? <span className="text-2xl">❤️</span> : <span className="text-2xl opacity-90">🤍</span>}
                      </button>
                      <span className="text-2xl opacity-80" aria-hidden>
                        💬
                      </span>
                    </div>
                    <p className="m-0 px-3 pt-1 text-sm text-white/90">
                      <span className="font-semibold">{n.source}</span> Breaking the feed algorithm with facts 📰
                    </p>
                  </article>
                )
              })}

              <article
                className={`border-b border-white/10 pb-6 ${!reducedMotion ? 'ig-feed-enter' : ''}`}
                style={!reducedMotion ? { animationDelay: '0.35s' } : undefined}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-black">
                    $
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold">stonks.official</p>
                    <p className="m-0 text-xs text-white/50">Sponsored · Portfolio vibes</p>
                  </div>
                </div>
                <div className="mx-3 grid gap-3 rounded-sm bg-[#0a0a0a] p-3 ring-1 ring-white/10">
                  {stocks.map(st => (
                    <div
                      key={st.ticker}
                      className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2"
                    >
                      <div>
                        <p className="m-0 font-mono text-sm font-bold">{st.ticker}</p>
                        <p className="m-0 max-w-[140px] truncate text-[10px] text-white/50">{st.name}</p>
                      </div>
                      <MiniSpark
                        series={st.series}
                        stroke={st.changePct >= 0 ? '#4ade80' : '#fb7185'}
                        className="opacity-95"
                      />
                      <div className="text-right">
                        <p className="m-0 text-xs font-bold tabular-nums">
                          {st.currency}
                          {st.price}
                        </p>
                        <p className={`m-0 text-[10px] font-semibold tabular-nums ${st.changePct >= 0 ? 'text-green-400' : 'text-rose-400'}`}>
                          {st.changePct > 0 ? '+' : ''}
                          {st.changePct}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-2 px-3 text-xs text-white/50">Not financial advice. Definitely a parody.</p>
              </article>
            </div>
          </>
        )}

        {tab === 'reels' && (
          <section
            className="flex flex-col gap-0"
            aria-label="Stock reels"
            style={{ scrollSnapType: 'y mandatory' }}
          >
            {stocks.map((st, i) => (
              <div
                key={st.ticker}
                className="relative flex min-h-[calc(100dvh-8rem)] flex-col justify-end scroll-snap-start scroll-snap-align-start border-b border-white/10 bg-black px-4 pb-28 pt-12"
                style={{
                  background: reducedMotion
                    ? '#0c0c0c'
                    : `linear-gradient(165deg, ${st.changePct >= 0 ? '#052e16' : '#450a0a'} 0%, #000 55%)`,
                }}
              >
                <div className="absolute right-4 top-24 flex flex-col gap-4 text-2xl">
                  <span className={!reducedMotion ? 'drop-shadow-lg' : ''} style={!reducedMotion ? { animation: 'ig-float-badge 2.2s ease-in-out infinite' } : undefined}>
                    ❤️
                  </span>
                  <span className="drop-shadow-lg">💬</span>
                  <span className="drop-shadow-lg">↗️</span>
                </div>
                <div className="relative z-10 max-w-md">
                  <p className="m-0 font-mono text-4xl font-black tracking-tight">{st.ticker}</p>
                  <p className="m-0 mt-1 text-sm text-white/60">{st.name}</p>
                  <div className="mt-6 flex items-end gap-4">
                    <p className="m-0 text-4xl font-bold tabular-nums">
                      {st.currency}
                      {st.price}
                    </p>
                    <span className={`badge badge-lg border-0 font-bold ${st.changePct >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-rose-500/20 text-rose-300'}`}>
                      {st.changePct > 0 ? '▲' : '▼'} {Math.abs(st.changePct)}%
                    </span>
                  </div>
                  <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                    <MiniSpark series={st.series} stroke={st.changePct >= 0 ? '#4ade80' : '#f87171'} className="h-12 w-full [&_svg]:h-12 [&_svg]:w-full" />
                  </div>
                </div>
                <p className="relative z-10 mt-4 max-w-xs text-sm text-white/70">
                  Swipe vibes only · Reel {i + 1}/{stocks.length}
                </p>
              </div>
            ))}
          </section>
        )}

        {tab === 'inbox' && (
          <section className="px-0 pt-2" aria-label="Direct messages">
            <h2 className="m-0 border-b border-white/10 px-4 py-3 text-lg font-bold">Messages</h2>
            <ul className="m-0 list-none p-0">
              {emails.map((em, i) => (
                <li key={em.id} className="border-b border-white/5">
                  <button
                    type="button"
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 ${!reducedMotion ? 'ig-feed-enter' : ''}`}
                    style={!reducedMotion ? { animationDelay: `${i * 0.04}s` } : undefined}
                    onClick={() => openEmail(em)}
                  >
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-2xl ring-2 ring-white/10">
                      {em.from.avatar}
                      {!em.read && (
                        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#0095f6] ring-2 ring-black" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="m-0 truncate font-semibold">{em.from.name}</p>
                        <span className="shrink-0 text-xs text-white/45">{em.time}</span>
                      </div>
                      <p className={`m-0 mt-0.5 truncate text-sm ${em.read ? 'text-white/50' : 'font-semibold text-white'}`}>
                        {em.subject}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70">
                        {TAG_LABEL[em.tag] || em.tag}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'profile' && (
          <section className="px-4 pt-6" aria-label="Profile">
            <div className="flex flex-col items-center">
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full p-[3px] ig-story-gradient"
                style={!reducedMotion ? { animation: 'ig-float-badge 3s ease-in-out infinite' } : undefined}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black text-4xl">✨</div>
              </div>
              <p className="ig-caption-type mt-3 text-2xl text-white">you</p>
              <p className="m-0 text-sm text-white/50">Digital twin · Paris-ish</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-6 text-center">
              <div>
                <p className="m-0 text-lg font-bold">{emails.length}</p>
                <p className="m-0 text-xs text-white/50">posts (emails)</p>
              </div>
              <div>
                <p className="m-0 text-lg font-bold">{news.length}</p>
                <p className="m-0 text-xs text-white/50">following (news)</p>
              </div>
              <div>
                <p className="m-0 text-lg font-bold">{stocks.length}</p>
                <p className="m-0 text-xs text-white/50">watchlist</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-1">
              {[...news, ...news].slice(0, 9).map((n, idx) => (
                <div
                  key={`${n.id}-${idx}`}
                  className="aspect-square bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl"
                >
                  {n.emoji}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-11 left-0 right-0 z-40 flex justify-around border-t border-white/10 bg-black/95 py-2 backdrop-blur-md">
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'reels', icon: '🎬', label: 'Reels' },
          { id: 'inbox', icon: '✉️', label: 'Inbox', dot: unreadDm > 0 },
          { id: 'profile', icon: '👤', label: 'Profile' },
        ].map(t => (
          <button
            key={t.id}
            type="button"
            className={`btn btn-ghost btn-sm flex min-h-0 flex-col gap-0.5 px-4 text-xl ${tab === t.id ? 'text-white' : 'text-white/40'}`}
            aria-label={t.label}
            aria-current={tab === t.id ? 'page' : undefined}
            onClick={() => setTab(t.id)}
          >
            <span className="relative">
              {t.icon}
              {t.dot && <span className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full bg-[#e1306c]" />}
            </span>
          </button>
        ))}
      </nav>

      {storyOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Story viewer"
        >
          <div className="flex gap-0.5 px-1 pt-2">
            {storySequence.map((s, i) => (
              <div
                key={s.key}
                className={`h-0.5 flex-1 rounded-full ${i < storyIdx ? 'bg-white' : i === storyIdx ? 'bg-white/90' : 'bg-white/25'}`}
              />
            ))}
          </div>
          <button type="button" className="absolute right-2 top-8 btn btn-circle btn-ghost btn-sm text-white" onClick={closeStory} aria-label="Close story">
            ✕
          </button>
          <div className="flex flex-1">
            <button type="button" className="w-1/4 shrink-0 bg-transparent" aria-label="Previous story" onClick={storyPrev} />
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-3xl">{storyOpen.avatar}</span>
                <div className="text-left">
                  <p className="m-0 font-bold">{storyOpen.label}</p>
                  <p className="m-0 text-xs text-white/60">Just now</p>
                </div>
              </div>
              {storyOpen.kind === 'weather' && (
                <div>
                  <p className="m-0 text-8xl">{weather.icon}</p>
                  <p className="mt-4 text-5xl font-black tabular-nums">{weather.temp}°</p>
                  <p className="mt-2 text-xl">{weather.condition}</p>
                  <p className="mt-4 text-white/70">
                    {weather.city} · wind {weather.wind} km/h
                  </p>
                </div>
              )}
              {storyOpen.kind === 'news' && storyOpen.item && (
                <div>
                  <p className="m-0 text-8xl">{storyOpen.item.emoji}</p>
                  <p className="mt-6 text-2xl font-bold leading-snug">{storyOpen.item.title}</p>
                  <p className="mt-4 text-sm text-white/60">{storyOpen.item.source}</p>
                </div>
              )}
              {storyOpen.kind === 'stock' && storyOpen.stock && (
                <div className="w-full max-w-sm">
                  <p className="m-0 font-mono text-5xl font-black">{storyOpen.stock.ticker}</p>
                  <p className="mt-2 text-3xl font-bold tabular-nums">
                    {storyOpen.stock.currency}
                    {storyOpen.stock.price}
                  </p>
                  <p className={`mt-2 text-xl font-semibold ${storyOpen.stock.changePct >= 0 ? 'text-green-400' : 'text-rose-400'}`}>
                    {storyOpen.stock.changePct > 0 ? '+' : ''}
                    {storyOpen.stock.changePct}%
                  </p>
                  <div className="mt-8 rounded-2xl bg-white/5 p-4">
                    <MiniSpark
                      series={storyOpen.stock.series}
                      stroke={storyOpen.stock.changePct >= 0 ? '#4ade80' : '#fb7185'}
                      className="mx-auto scale-150"
                    />
                  </div>
                </div>
              )}
            </div>
            <button type="button" className="w-1/4 shrink-0 bg-transparent" aria-label="Next story" onClick={storyNext} />
          </div>
          <div className="pb-16 text-center text-sm text-white/50">Tap sides · auto-advances</div>
        </div>
      )}

      {emailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ig-dm-title"
        >
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/10 bg-[#121212] p-5 shadow-2xl sm:rounded-3xl">
            <div className="flex items-start gap-3 border-b border-white/10 pb-4">
              <span className="text-4xl">{emailOpen.from.avatar}</span>
              <div className="min-w-0 flex-1">
                <h2 id="ig-dm-title" className="m-0 text-lg font-bold">
                  {emailOpen.from.name}
                </h2>
                <p className="m-0 text-xs text-white/50">{emailOpen.from.email}</p>
              </div>
              <button type="button" className="btn btn-circle btn-ghost btn-sm" onClick={closeEmail} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="mt-4 rounded-2xl bg-white/5 p-4">
              <p className="m-0 text-xs font-bold uppercase tracking-wide text-white/40">Subject</p>
              <p className="m-0 mt-1 font-semibold text-white">{emailOpen.subject}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-[#0095f6]/30 bg-[#0095f6]/10 p-4">
              <p className="m-0 whitespace-pre-wrap text-sm leading-relaxed text-white/90">{emailOpen.body}</p>
            </div>
            <button type="button" className="btn btn-block mt-5 rounded-xl border-0 bg-[#0095f6] font-semibold text-white hover:bg-[#1877f2]" onClick={closeEmail}>
              Back to inbox
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
