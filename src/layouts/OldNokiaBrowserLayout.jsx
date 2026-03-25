import { useCallback, useEffect, useMemo, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const VIEWS = {
  BOOT: 'boot',
  MENU: 'menu',
  MESSAGES: 'messages',
  MESSAGE: 'message',
  WEATHER: 'weather',
  NEWS: 'news',
  NEWS_ITEM: 'newsItem',
  STOCKS: 'stocks',
  SNAKE: 'snake',
  OPTIONS: 'options',
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

export default function OldNokiaBrowserLayout({ onSwitchPersona }) {
  const [view, setView] = useState(VIEWS.BOOT)
  const [bootLine, setBootLine] = useState(0)
  const [wapLoading, setWapLoading] = useState(false)
  const [menuIndex, setMenuIndex] = useState(0)
  const [emailIndex, setEmailIndex] = useState(0)
  const [newsIndex, setNewsIndex] = useState(0)
  const [now, setNow] = useState(() => new Date())

  const menuItems = useMemo(
    () => [
      { key: 'messages', label: 'Messages', sub: `${emails.filter(e => !e.read).length} new` },
      { key: 'weather', label: 'Weather', sub: weather.city },
      { key: 'news', label: 'Headlines', sub: `${news.length} items` },
      { key: 'stocks', label: 'Shares', sub: 'WAP Finance' },
      { key: 'snake', label: 'Snake II', sub: 'High 0492' },
    ],
    []
  )

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (view !== VIEWS.BOOT) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setBootLine(i)
      if (i >= 4) {
        clearInterval(id)
        setView(VIEWS.MENU)
      }
    }, 520)
    return () => clearInterval(id)
  }, [view])

  const goWithWapDelay = useCallback((next) => {
    setWapLoading(true)
    window.setTimeout(() => {
      setView(next)
      setWapLoading(false)
    }, 700)
  }, [])

  const goBack = useCallback(() => {
    if (view === VIEWS.MENU || view === VIEWS.BOOT) return
    if (view === VIEWS.MESSAGE) {
      setView(VIEWS.MESSAGES)
      return
    }
    if (view === VIEWS.NEWS_ITEM) {
      setView(VIEWS.NEWS)
      return
    }
    if (view === VIEWS.OPTIONS) {
      setView(VIEWS.MENU)
      return
    }
    setView(VIEWS.MENU)
  }, [view])

  const selectMenu = useCallback(() => {
    const item = menuItems[menuIndex]
    if (!item) return
    if (item.key === 'messages') goWithWapDelay(VIEWS.MESSAGES)
    else if (item.key === 'weather') goWithWapDelay(VIEWS.WEATHER)
    else if (item.key === 'news') goWithWapDelay(VIEWS.NEWS)
    else if (item.key === 'stocks') goWithWapDelay(VIEWS.STOCKS)
    else if (item.key === 'snake') goWithWapDelay(VIEWS.SNAKE)
  }, [menuIndex, menuItems, goWithWapDelay])

  useEffect(() => {
    if (view !== VIEWS.MENU || wapLoading) return
    function onKey(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setMenuIndex((j) => Math.min(j + 1, menuItems.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setMenuIndex((j) => Math.max(j - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        selectMenu()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [view, wapLoading, menuItems.length, selectMenu])

  const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`

  const lcd = (
    <div
      className="relative flex min-h-[280px] flex-col overflow-hidden rounded-sm border border-[#1a3020] bg-[#0a120d] shadow-[inset_0_0_40px_rgba(0,0,0,0.65)]"
      style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}
    >
      {/* LCD glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-sm opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(180,255,140,0.25), transparent 65%)',
        }}
        aria-hidden
      />
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay nokia-scanlines"
        aria-hidden
      />

      {/* Status row */}
      <div className="relative z-[1] flex items-center justify-between border-b border-[var(--accent2)] px-2 py-1 text-[13px] leading-none text-[var(--text)]">
        <span className="tabular-nums tracking-tight">{timeStr}</span>
        <span className="flex items-end gap-0.5 pr-1" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="nokia-signal-bar block w-[3px] rounded-[1px] bg-[var(--text)]"
              style={{
                height: `${6 + i * 3}px`,
                opacity: i < 4 ? 1 : 0.35,
                animation: `nokia-bar-pulse 1.2s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-[10px] text-[var(--text2)]">GPRS</span>
          <span className="nokia-battery relative h-3 w-5 border border-[var(--text2)] p-px" aria-hidden>
            <span className="nokia-battery-fill block h-full w-[72%] bg-[var(--text)]" />
          </span>
        </span>
      </div>

      {/* Content */}
      <div className="relative z-[1] min-h-0 flex-1 overflow-y-auto px-2 py-2 text-[15px] leading-snug">
        {wapLoading && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 py-6 text-center">
            <p className="text-[var(--text2)]">Opening channel…</p>
            <div className="flex gap-1" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block h-2 w-2 rounded-full bg-[var(--text)] nokia-wap-dot"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <div className="nokia-snake-trail mt-2 flex gap-0.5 opacity-80" aria-hidden>
              {['█', '█', '█', '▓', '▒', '░'].map((c, i) => (
                <span key={i} className="text-[12px] text-[var(--text)]" style={{ animationDelay: `${i * 0.08}s` }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {!wapLoading && view === VIEWS.BOOT && (
          <div className="flex min-h-[220px] flex-col justify-center gap-2 py-4">
            <p className="text-center text-lg tracking-[0.35em] text-[var(--accent)]">NOKIA</p>
            {bootLine >= 1 && <p className="text-center text-[var(--text2)]">Connecting…</p>}
            {bootLine >= 2 && <p className="text-center text-[var(--text)]">WAP Browser v4.1</p>}
            {bootLine >= 3 && (
              <div className="mx-auto mt-2 h-2 w-4/5 overflow-hidden rounded-sm border border-[var(--accent2)]">
                <div className="nokia-boot-bar h-full bg-[var(--text)]" />
              </div>
            )}
          </div>
        )}

        {!wapLoading && view === VIEWS.MENU && (
          <div>
            <p className="mb-2 border-b border-[var(--accent2)] pb-1 text-[12px] text-[var(--text2)]">Select</p>
            <ul className="space-y-0">
              {menuItems.map((item, i) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuIndex(i)
                      if (item.key === 'messages') goWithWapDelay(VIEWS.MESSAGES)
                      else if (item.key === 'weather') goWithWapDelay(VIEWS.WEATHER)
                      else if (item.key === 'news') goWithWapDelay(VIEWS.NEWS)
                      else if (item.key === 'stocks') goWithWapDelay(VIEWS.STOCKS)
                      else if (item.key === 'snake') goWithWapDelay(VIEWS.SNAKE)
                    }}
                    className={`btn btn-ghost btn-sm mb-0.5 h-auto min-h-0 w-full justify-start rounded-none border-0 px-2 py-1.5 text-left font-normal normal-case ${
                      i === menuIndex
                        ? 'bg-[var(--text)] text-[#0a120d] hover:bg-[var(--accent)] hover:text-[#0a120d]'
                        : 'text-[var(--text)] hover:bg-[var(--accent2)]'
                    }`}
                  >
                    <span className="flex w-full items-baseline justify-between gap-2">
                      <span>{item.label}</span>
                      <span className="text-[12px] opacity-80">{item.sub}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 animate-pulse text-center text-[11px] text-[var(--text2)]">▼ scroll · pick · Select</p>
          </div>
        )}

        {!wapLoading && view === VIEWS.MESSAGES && (
          <div>
            <p className="mb-2 text-[12px] text-[var(--text2)]">Inbox</p>
            <ul className="space-y-1">
              {emails.map((e, i) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailIndex(i)
                      setView(VIEWS.MESSAGE)
                    }}
                    className="btn btn-ghost btn-sm h-auto min-h-0 w-full flex-col items-start rounded-none border-0 border-b border-[var(--accent2)]/50 px-1 py-2 text-left font-normal normal-case text-[var(--text)] hover:bg-[var(--accent2)]"
                  >
                    <span className="flex w-full items-center gap-1">
                      <span>{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-xs border-0 bg-[var(--text)] text-[#0a120d]">1</span>}
                      <span className="min-w-0 flex-1 truncate text-[13px]">{e.from.name}</span>
                    </span>
                    <span className="mt-0.5 line-clamp-2 w-full text-[13px] opacity-90">{e.subject}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!wapLoading && view === VIEWS.MESSAGE && emails[emailIndex] && (
          <div className="pb-4">
            <p className="mb-2 text-[12px] text-[var(--text2)]">Message</p>
            <p className="border-b border-[var(--accent2)] pb-1 text-[14px] font-bold text-[var(--accent)]">
              {emails[emailIndex].subject}
            </p>
            <p className="mt-1 text-[12px] text-[var(--text2)]">
              From: {emails[emailIndex].from.name}
              <br />
              {emails[emailIndex].date} {emails[emailIndex].time}
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-[family-name:var(--font-main)] text-[14px] leading-relaxed text-[var(--text)]">
              {emails[emailIndex].body}
            </pre>
          </div>
        )}

        {!wapLoading && view === VIEWS.WEATHER && (
          <div>
            <p className="mb-2 text-[12px] text-[var(--text2)]">Weather</p>
            <p className="text-[28px] leading-none">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="mt-2 text-[var(--accent)]">{weather.condition}</p>
            <p className="mt-1 text-[13px] text-[var(--text2)]">
              {weather.city} · Feels {weather.feels_like}° · Wind {weather.wind} km/h
            </p>
            <p className="mt-3 text-[12px] text-[var(--text2)]">Forecast</p>
            <ul className="mt-1 space-y-1">
              {weather.forecast.slice(0, 4).map((d) => (
                <li key={d.day} className="flex justify-between border-b border-dotted border-[var(--accent2)]/40 py-0.5 text-[13px]">
                  <span>
                    {d.day} {d.icon}
                  </span>
                  <span>
                    {d.high}° / {d.low}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!wapLoading && view === VIEWS.NEWS && (
          <div>
            <p className="mb-2 text-[12px] text-[var(--text2)]">News</p>
            <ul className="space-y-1">
              {news.map((n, i) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsIndex(i)
                      setView(VIEWS.NEWS_ITEM)
                    }}
                    className="btn btn-ghost btn-sm h-auto min-h-0 w-full flex-col items-start rounded-none border-0 border-b border-[var(--accent2)]/50 px-1 py-2 text-left font-normal normal-case"
                  >
                    <span className="text-[13px] text-[var(--text)]">
                      {n.emoji} {n.title.length > 72 ? `${n.title.slice(0, 70)}…` : n.title}
                    </span>
                    <span className="text-[11px] text-[var(--text2)]">
                      {n.source} · {n.time}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!wapLoading && view === VIEWS.NEWS_ITEM && news[newsIndex] && (
          <div>
            <p className="mb-2 text-[12px] text-[var(--text2)]">Article</p>
            <p className="text-[15px] text-[var(--accent)]">
              {news[newsIndex].emoji} {news[newsIndex].title}
            </p>
            <p className="mt-2 text-[12px] text-[var(--text2)]">
              {news[newsIndex].source} · {news[newsIndex].category} · {news[newsIndex].time}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--text)]">
              (WAP preview — full story not loaded. Try again from a PC in 2007.)
            </p>
          </div>
        )}

        {!wapLoading && view === VIEWS.STOCKS && (
          <div>
            <p className="mb-2 text-[12px] text-[var(--text2)]">Finance</p>
            <ul className="space-y-2">
              {stocks.map((s) => (
                <li
                  key={s.ticker}
                  className="flex items-center justify-between border-b border-[var(--accent2)]/50 py-1 text-[14px]"
                >
                  <span className="text-[var(--accent)]">{s.ticker}</span>
                  <span className="tabular-nums">
                    {s.currency}
                    {s.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={s.changePct >= 0 ? 'text-[var(--text)]' : 'opacity-60'}>
                    {s.changePct >= 0 ? '▲' : '▼'}
                    {Math.abs(s.changePct).toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-[var(--text2)]">Delayed 15 min. (Probably longer.)</p>
          </div>
        )}

        {!wapLoading && view === VIEWS.SNAKE && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 text-center">
            <p className="text-[var(--text2)]">Snake II</p>
            <div className="nokia-snake-field relative h-24 w-full max-w-[200px] overflow-hidden border border-[var(--accent2)] bg-[#050a08]">
              <span className="nokia-snake-apple absolute left-[70%] top-[20%] text-[14px]" aria-hidden>
                ●
              </span>
              <span className="nokia-snake-body absolute left-[15%] top-[45%] whitespace-pre text-[12px] text-[var(--text)]" aria-hidden>
                ███▓▒
              </span>
            </div>
            <p className="text-[13px] text-[var(--text)]">HIGH SCORE 0492</p>
            <p className="text-[11px] text-[var(--text2)]">No keys on this site — imagine pressing 4 and 6 really fast.</p>
          </div>
        )}

        {!wapLoading && view === VIEWS.OPTIONS && (
          <div>
            <p className="mb-3 text-[12px] text-[var(--text2)]">Options</p>
            <button
              type="button"
              className="btn btn-ghost btn-sm mb-2 w-full justify-start rounded-none border border-[var(--accent2)] font-normal normal-case text-[var(--text)]"
              onClick={() => onSwitchPersona?.()}
            >
              Exit browser
            </button>
            <p className="text-[11px] text-[var(--text2)]">Thanks for the memories.</p>
          </div>
        )}
      </div>

      {/* Soft keys row (on LCD) */}
      {!wapLoading && view !== VIEWS.BOOT && (
        <div className="relative z-[1] flex border-t border-[var(--accent2)] text-[11px] text-[var(--text2)]">
          <button
            type="button"
            className="btn btn-ghost flex-1 rounded-none border-0 font-normal normal-case text-[var(--text2)] hover:bg-[var(--accent2)] hover:text-[var(--text)]"
            onClick={() => setView(VIEWS.OPTIONS)}
          >
            Opt.
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1 rounded-none border-0 font-normal normal-case text-[var(--accent)] hover:bg-[var(--accent2)]"
            onClick={() => {
              if (view === VIEWS.MENU) selectMenu()
            }}
          >
            Select
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1 rounded-none border-0 font-normal normal-case text-[var(--text2)] hover:bg-[var(--accent2)] hover:text-[var(--text)]"
            onClick={goBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="old-nokia-root min-h-screen overflow-x-hidden px-3 py-8"
      style={{
        fontFamily: 'var(--font-main)',
        background:
          'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(80,120,90,0.2), transparent), linear-gradient(165deg, #2d3330 0%, #1a1e1c 40%, #121615 100%)',
      }}
    >
      <style>{`
        @keyframes nokia-bar-pulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.85); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes nokia-wap-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .nokia-wap-dot { animation: nokia-wap-bounce 0.9s ease-in-out infinite; }
        @keyframes nokia-boot-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .nokia-boot-bar { animation: nokia-boot-fill 0.45s ease-out forwards; }
        @keyframes nokia-scan-move {
          from { background-position: 0 0; }
          to { background-position: 0 4px; }
        }
        .nokia-scanlines {
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 3px);
          animation: nokia-scan-move 6s linear infinite;
        }
        @keyframes nokia-battery-breathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .nokia-battery-fill { animation: nokia-battery-breathe 2.5s ease-in-out infinite; }
        @keyframes nokia-snake-dance {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -4px); }
          50% { transform: translate(24px, 2px); }
          75% { transform: translate(12px, 6px); }
        }
        .nokia-snake-body { animation: nokia-snake-dance 2.8s ease-in-out infinite; }
        @keyframes nokia-apple-pulse {
          0%, 100% { color: var(--text2); }
          50% { color: var(--text); }
        }
        .nokia-snake-apple { animation: nokia-apple-pulse 1.2s ease-in-out infinite; }
        .nokia-snake-trail span { animation: nokia-wap-bounce 0.7s ease-in-out infinite; }
      `}</style>

      <div className="mx-auto max-w-[340px]">
        <div className="mb-4 flex items-start justify-between gap-2 px-1">
          <div>
            <h1 className="m-0 text-lg tracking-wide text-[#9aab9e]" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.06)' }}>
              WAP survivor
            </h1>
            <p className="mt-1 text-[12px] text-[#6b756f]">Same inbox, weather, news &amp; stocks — 96 chars wide.</p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-xs shrink-0 border-[#4a5550] bg-[#3d4542] text-[#c5d4c8]"
            onClick={() => onSwitchPersona?.()}
          >
            hang up
          </button>
        </div>

        {/* Phone chassis */}
        <div
          className="relative mx-auto rounded-[2.2rem] border-2 border-[#4a524e] bg-gradient-to-b from-[#5c6562] via-[#4a524e] to-[#3a403e] p-3 shadow-[0_24px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.08)' }}
        >
          {/* Brand */}
          <div className="mb-2 text-center">
            <span className="text-[10px] font-semibold tracking-[0.4em] text-[#2a2e2c]">NOKIA</span>
          </div>

          {lcd}

          {/* Decorative keypad */}
          <div className="mt-4 grid grid-cols-3 gap-2 px-2 pb-1" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#3a403e] to-[#2a2e2c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-black/30"
              >
                <span className="h-2 w-2 rounded-full bg-[#1a1c1b] opacity-80" />
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[280px] text-center text-[11px] leading-relaxed text-[#6b756f]">
          Tip: use <kbd className="rounded bg-[#3a403e] px-1 text-[#bfffa8]">menu</kbd> items like it&apos;s 2003 — delays are
          authentic.
        </p>
      </div>
    </div>
  )
}
