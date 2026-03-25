import { useCallback, useEffect, useMemo, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const V = {
  BOOT: 'boot',
  MENU: 'menu',
  MAIL: 'mail',
  MAIL_OPEN: 'mailOpen',
  WEATHER: 'weather',
  NEWS: 'news',
  NEWS_OPEN: 'newsOpen',
  STOCKS: 'stocks',
  EASTER: 'easter',
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

export default function FirstIpodBrowserLayout({ onSwitchPersona }) {
  const [view, setView] = useState(V.BOOT)
  const [bootPct, setBootPct] = useState(0)
  const [menuIdx, setMenuIdx] = useState(0)
  const [mailIdx, setMailIdx] = useState(0)
  const [newsIdx, setNewsIdx] = useState(0)
  const [syncFlash, setSyncFlash] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [now, setNow] = useState(() => new Date())

  const menuItems = useMemo(
    () => [
      { key: 'mail', label: 'Mail', sub: `${emails.filter(e => !e.read).length} new`, go: V.MAIL },
      { key: 'wx', label: 'Weather', sub: weather.city, go: V.WEATHER },
      { key: 'news', label: 'News Wire', sub: `${news.length} stories`, go: V.NEWS },
      { key: 'stocks', label: 'Stocks', sub: 'Live-ish', go: V.STOCKS },
      { key: 'extra', label: 'Extras', sub: 'Secret', go: V.EASTER },
    ],
    [],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (view !== V.BOOT) return
    let frame
    let start = performance.now()
    const duration = reducedMotion ? 400 : 2400
    function tick(ts) {
      const p = Math.min(1, (ts - start) / duration)
      setBootPct(Math.round(p * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
      else setView(V.MENU)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [view, reducedMotion])

  const goBack = useCallback(() => {
    if (view === V.MENU || view === V.BOOT) return
    if (view === V.MAIL_OPEN) {
      setView(V.MAIL)
      return
    }
    if (view === V.NEWS_OPEN) {
      setView(V.NEWS)
      return
    }
    setView(V.MENU)
  }, [view])

  const selectCurrent = useCallback(() => {
    setSyncFlash(true)
    window.setTimeout(() => setSyncFlash(false), 380)
    if (view === V.MENU) {
      const item = menuItems[menuIdx]
      if (item) setView(item.go)
      return
    }
    if (view === V.MAIL) {
      setView(V.MAIL_OPEN)
      return
    }
    if (view === V.NEWS) {
      setView(V.NEWS_OPEN)
    }
  }, [view, menuIdx, menuItems])

  const wheelPrev = useCallback(() => {
    if (view === V.MENU) setMenuIdx(i => Math.max(0, i - 1))
    else if (view === V.MAIL) setMailIdx(i => Math.max(0, i - 1))
    else if (view === V.NEWS) setNewsIdx(i => Math.max(0, i - 1))
  }, [view])

  const wheelNext = useCallback(() => {
    if (view === V.MENU) setMenuIdx(i => Math.min(menuItems.length - 1, i + 1))
    else if (view === V.MAIL) setMailIdx(i => Math.min(emails.length - 1, i + 1))
    else if (view === V.NEWS) setNewsIdx(i => Math.min(news.length - 1, i + 1))
  }, [view, menuItems.length])

  useEffect(() => {
    function onKey(e) {
      if (view === V.BOOT) return
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        wheelPrev()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        wheelNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        e.preventDefault()
        goBack()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        selectCurrent()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [view, wheelPrev, wheelNext, goBack, selectCurrent])

  const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`
  const mail = emails[mailIdx]
  const story = news[newsIdx]

  const lcd = (
    <div
      className={`ipod-lcd relative flex min-h-[200px] flex-col overflow-hidden rounded-sm border border-[#0d280d] bg-gradient-to-b from-[#0a120a] via-[#0f1f0f] to-[#0a100a] px-2 py-1.5 text-[11px] leading-tight text-[#7cfc7c] shadow-[inset_0_0_24px_rgba(0,40,0,0.5)] sm:min-h-[220px] ${reducedMotion ? '' : 'ipod-lcd-glow'}`}
      style={{ fontFamily: 'var(--font-main)' }}
    >
      {!reducedMotion && <div className="ipod-scanlines pointer-events-none absolute inset-0 z-10 opacity-[0.12]" aria-hidden />}
      {syncFlash && <div className="pointer-events-none absolute inset-0 z-20 animate-ping bg-[#7cfc7c]/20" aria-hidden />}

      <div className="relative z-[5] flex items-center justify-between border-b border-[#1a3d1a]/80 pb-1 text-[9px] uppercase tracking-widest text-[#4ade80]/90">
        <span className="flex items-center gap-1">
          <span className={reducedMotion ? '' : 'ipod-battery'} aria-hidden>
            ▮▮▮▯
          </span>
          <span className="opacity-70">USB</span>
        </span>
        <span className="font-bold tracking-[0.2em]">iPod</span>
        <span>{timeStr}</span>
      </div>

      <div className="relative z-[5] mt-1 flex min-h-0 flex-1 flex-col overflow-hidden">
        {view === V.BOOT && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4 text-center">
            <div className={`text-lg font-bold tracking-tight ${reducedMotion ? '' : 'ipod-boot-logo'}`} style={{ fontFamily: 'var(--font-display)' }}>
              webPod
            </div>
            <p className="max-w-[11rem] text-[9px] leading-snug text-[#86efac]/80">Do not eat. Do not drop. Do not expect Wi‑Fi.</p>
            <div className="mt-1 h-1.5 w-[85%] overflow-hidden rounded-full bg-[#052805]">
              <div
                className="h-full rounded-full bg-[#4ade80]"
                style={{ width: `${bootPct}%`, transition: reducedMotion ? undefined : 'width 0.08s linear' }}
              />
            </div>
            <p className="text-[8px] text-[#4ade80]/70">{bootPct}% · Loading hypertext through FireWire…</p>
          </div>
        )}

        {view === V.MENU && (
          <ul className="m-0 list-none space-y-0.5 p-0">
            {menuItems.map((item, i) => {
              const active = i === menuIdx
              return (
                <li key={item.key}>
                  <div
                    className={`flex cursor-default items-center justify-between gap-1 rounded-sm px-1 py-0.5 ${active ? 'bg-[#4ade80] text-[#052805]' : 'text-[#86efac]/90'}`}
                  >
                    <span className="truncate font-bold">{item.label}</span>
                    <span className={`shrink-0 text-[8px] ${active ? 'text-[#14532d]' : 'text-[#4ade80]/50'}`}>{item.sub}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {view === V.MAIL && (
          <div className="flex min-h-0 flex-1 flex-col">
            <p className="mb-1 border-b border-[#1a3d1a] pb-0.5 text-[9px] text-[#4ade80]/80">Mail · {mailIdx + 1}/{emails.length}</p>
            <ul className="m-0 min-h-0 flex-1 list-none space-y-0.5 overflow-y-auto p-0 pr-0.5">
              {emails.map((e, i) => {
                const active = i === mailIdx
                return (
                  <li key={e.id}>
                    <div className={`rounded-sm px-1 py-0.5 ${active ? 'bg-[#4ade80] text-[#052805]' : ''}`}>
                      <div className="flex items-center gap-1">
                        <span>{e.from.avatar}</span>
                        {!e.read && <span className="text-[8px]">●</span>}
                        <span className="truncate font-bold">{e.subject}</span>
                      </div>
                      <div className={`truncate text-[9px] ${active ? 'text-[#14532d]' : 'text-[#86efac]/70'}`}>{e.preview}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {view === V.MAIL_OPEN && mail && (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <p className="mb-1 truncate border-b border-[#1a3d1a] pb-0.5 text-[9px] font-bold">{mail.subject}</p>
            <p className="text-[9px] text-[#86efac]/80">
              {mail.from.name} · {mail.date} {mail.time}
            </p>
            <div className="mt-1 min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap text-[10px] leading-snug text-[#bbf7d0]">{mail.body}</div>
          </div>
        )}

        {view === V.WEATHER && (
          <div className="space-y-1.5 text-[10px]">
            <p className="flex items-center justify-between border-b border-[#1a3d1a] pb-1 font-bold">
              <span>
                {weather.city}, {weather.country}
              </span>
              <span>{weather.icon}</span>
            </p>
            <p className="text-lg font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              {weather.temp}°C
            </p>
            <p className="text-[9px] text-[#86efac]/85">{weather.condition}</p>
            <p className="text-[9px]">
              Wind {weather.wind} km/h · Humidity {weather.humidity}%
            </p>
            <div className="mt-2 flex flex-wrap gap-1 border-t border-[#1a3d1a] pt-1">
              {weather.forecast.slice(0, 4).map(d => (
                <span key={d.day} className="inline-flex flex-col items-center rounded border border-[#1a3d1a] px-1 py-0.5 text-[8px]">
                  <span>{d.day}</span>
                  <span>{d.icon}</span>
                  <span>
                    {d.high}/{d.low}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {view === V.NEWS && (
          <div className="flex min-h-0 flex-1 flex-col">
            <p className="mb-1 border-b border-[#1a3d1a] pb-0.5 text-[9px] text-[#4ade80]/80">Headlines · {newsIdx + 1}/{news.length}</p>
            <ul className="m-0 min-h-0 flex-1 list-none space-y-0.5 overflow-y-auto p-0">
              {news.map((n, i) => {
                const active = i === newsIdx
                return (
                  <li key={n.id}>
                    <div className={`rounded-sm px-1 py-0.5 ${active ? 'bg-[#4ade80] text-[#052805]' : ''}`}>
                      <span className="mr-1">{n.emoji}</span>
                      <span className="font-bold">{n.title}</span>
                      <div className={`text-[8px] ${active ? 'text-[#14532d]' : 'text-[#86efac]/60'}`}>
                        {n.source} · {n.time}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {view === V.NEWS_OPEN && story && (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <p className="mb-1 text-xl leading-none" aria-hidden>
              {story.emoji}
            </p>
            <p className="mb-1 border-b border-[#1a3d1a] pb-1 text-[10px] font-bold leading-snug">{story.title}</p>
            <p className="text-[9px] text-[#86efac]/75">
              {story.source} · {story.category} · {story.time}
            </p>
            <p className="mt-2 text-[9px] leading-snug text-[#bbf7d0]/90">(Full article omitted — you&apos;re on a screen the size of a postage stamp.)</p>
          </div>
        )}

        {view === V.STOCKS && (
          <div className="space-y-1">
            <p className="border-b border-[#1a3d1a] pb-0.5 text-[9px] font-bold">Portfolio · pinch zoom not invented</p>
            <ul className="m-0 list-none space-y-1 p-0">
              {stocks.map(s => {
                const up = s.change >= 0
                return (
                  <li key={s.ticker} className="flex items-center justify-between gap-1 border-b border-[#1a3d1a]/50 pb-1 text-[9px]">
                    <span className="font-bold">{s.ticker}</span>
                    <span>
                      {s.currency}
                      {s.price.toFixed(s.ticker === 'BTC' ? 0 : 2)}
                    </span>
                    <span className={up ? 'text-[#4ade80]' : 'text-red-300'}>
                      {up ? '▲' : '▼'}
                      {Math.abs(s.changePct).toFixed(2)}%
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className={`mt-2 flex h-8 items-end justify-between gap-px opacity-90 ${reducedMotion ? '' : 'ipod-spark-bars'}`}>
              {(() => {
                const series = stocks[0].series.slice(-24)
                const lo = Math.min(...series)
                const hi = Math.max(...series)
                const span = hi - lo || 1
                return series.map((v, i) => {
                  const pct = ((v - lo) / span) * 100
                  return <span key={i} className="ipod-bar-cell flex-1 rounded-t-sm bg-[#4ade80]/70" style={{ height: `${12 + pct * 0.88}%` }} />
                })
              })()}
            </div>
            <p className="text-[8px] text-[#86efac]/60">Graph is vibes only · not financial advice</p>
          </div>
        )}

        {view === V.EASTER && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-2 text-center text-[9px] leading-snug">
            <p className={`text-2xl ${reducedMotion ? '' : 'ipod-spin-slow'}`} aria-hidden>
              🌀
            </p>
            <p className="font-bold text-[#86efac]">The original iPod had no browser.</p>
            <p className="text-[#86efac]/75">You are browsing an impossible timeline. FireWire thanks you for your patience.</p>
            <p className="mt-1 text-[8px] text-[#4ade80]/50">Menu · back to reality</p>
          </div>
        )}
      </div>

      {view !== V.BOOT && (
        <div className="relative z-[5] mt-1 flex justify-between border-t border-[#1a3d1a]/80 pt-0.5 text-[8px] text-[#4ade80]/50">
          <span>◀︎◆▶︎ wheel</span>
          <button type="button" className="link link-hover text-[#86efac]" onClick={onSwitchPersona}>
            eject home
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="ipod-page relative min-h-0 w-full overflow-x-hidden px-3 py-6 sm:px-6"
      style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      {!reducedMotion && (
        <>
          <div className="ipod-float-note pointer-events-none fixed left-[6%] top-[18%] z-0 text-2xl opacity-25" aria-hidden>
            ♪
          </div>
          <div className="ipod-float-note pointer-events-none fixed right-[10%] top-[28%] z-0 text-xl opacity-20 [animation-delay:1.2s]" aria-hidden>
            ♫
          </div>
          <div className="ipod-cable pointer-events-none fixed bottom-0 left-1/2 z-0 h-[22vh] w-1 -translate-x-1/2 rounded-t-full bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-500 opacity-40 shadow-lg" aria-hidden />
        </>
      )}

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            1,000 songs in your pocket
          </h1>
          <p className="mt-1 text-sm opacity-70">…and somehow also your entire morning briefing. Circa 2001 energy.</p>
        </header>

        <div className="ipod-body relative w-full max-w-[340px] rounded-[2.2rem] border border-white/80 bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300 p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),inset_0_2px_0_rgba(255,255,255,0.85)]">
          {!reducedMotion && <div className="ipod-shine pointer-events-none absolute inset-0 rounded-[2.2rem] opacity-30" aria-hidden />}
          <div className="relative rounded-xl bg-zinc-900/95 p-2.5 shadow-inner">
            {lcd}
          </div>

          <div className="relative mx-auto mt-5 flex w-[200px] flex-col items-center sm:w-[220px]">
            <p className="mb-2 text-center text-[10px] uppercase tracking-[0.25em] text-zinc-600">Click Wheel</p>
            <div className="relative aspect-square w-full rounded-full border-4 border-zinc-400/90 bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-[inset_0_4px_12px_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.15)]">
              <button
                type="button"
                className="btn btn-ghost btn-xs absolute left-1/2 top-1 z-10 h-8 min-h-0 -translate-x-1/2 rounded-full border-0 px-3 font-bold text-zinc-600 hover:bg-zinc-400/30"
                onClick={goBack}
              >
                MENU
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-xs absolute left-1 top-1/2 z-10 h-10 min-h-0 w-10 -translate-y-1/2 rounded-full border-0 text-lg text-zinc-600 hover:bg-zinc-400/30"
                onClick={wheelPrev}
                aria-label="Previous"
              >
                ◀
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-xs absolute right-1 top-1/2 z-10 h-10 min-h-0 w-10 -translate-y-1/2 rounded-full border-0 text-lg text-zinc-600 hover:bg-zinc-400/30"
                onClick={wheelNext}
                aria-label="Next"
              >
                ▶
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-xs absolute bottom-1 left-1/2 z-10 h-8 min-h-0 -translate-x-1/2 rounded-full border-0 px-2 text-zinc-500 hover:bg-zinc-400/30"
                onClick={selectCurrent}
                aria-label="Play select"
              >
                ⏯
              </button>
              <div className="absolute inset-0 flex items-center justify-center p-[22%]">
                <button
                  type="button"
                  onClick={selectCurrent}
                  className={`flex size-full max-h-[72px] max-w-[72px] items-center justify-center rounded-full border-2 border-zinc-400/80 bg-gradient-to-b from-zinc-200 to-zinc-400 text-zinc-700 shadow-inner transition-transform hover:scale-[1.02] active:scale-95 sm:max-h-[80px] sm:max-w-[80px] ${reducedMotion ? '' : 'ipod-center-gleam'}`}
                  aria-label="Select"
                >
                  <span className="text-xl opacity-80">⏺</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-zinc-800/20 shadow-inner" aria-hidden />
          <p className="mt-2 text-center text-[9px] text-zinc-500">Hold switch · reality distortion field sold separately</p>
        </div>

        <p className="max-w-md text-center text-xs text-zinc-600">
          Tip: <kbd className="kbd kbd-sm">↑</kbd> <kbd className="kbd kbd-sm">↓</kbd> scroll · <kbd className="kbd kbd-sm">Enter</kbd> select · <kbd className="kbd kbd-sm">←</kbd> back
        </p>
      </div>
    </div>
  )
}
