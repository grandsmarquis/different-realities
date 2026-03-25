import { useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SPAM_WINDOWS = [
  { id: 'spam-prize', title: 'YOU ARE #1!!!', line: 'Claim your FREE iPod Shuffle*', foot: '*shipping €499' },
  { id: 'spam-hot', title: 'HOT SINGLES', line: 'They want to meet you in YOUR AREA', foot: '(it is your desk)' },
  { id: 'spam-virus', title: '⚠️ SCAN NOW', line: 'Your PC has 7,482 viruses (estimate)', foot: 'Download FixPro™' },
  { id: 'spam-pills', title: 'MEGA VITAMIN', line: 'Doctors HATE this one trick!!!', foot: 'Not FDA anything' },
]

function slotForIndex(i) {
  const grid = [
    { top: '6%', left: '3%', rotate: -2.5, z: 12 },
    { top: '10%', right: '2%', left: 'auto', rotate: 3, z: 14 },
    { top: '22%', left: '8%', rotate: 1.2, z: 11 },
    { top: '18%', right: '12%', left: 'auto', rotate: -1.8, z: 13 },
    { top: '34%', left: '2%', rotate: -0.8, z: 10 },
    { top: '40%', right: '6%', left: 'auto', rotate: 2.2, z: 15 },
    { top: '52%', left: '10%', rotate: 1.5, z: 9 },
    { top: '48%', right: '4%', left: 'auto', rotate: -2, z: 16 },
    { top: '62%', left: '4%', rotate: 2.8, z: 8 },
    { top: '58%', right: '14%', left: 'auto', rotate: -1.2, z: 17 },
    { top: '72%', left: '14%', rotate: -2.2, z: 7 },
    { top: '68%', right: '8%', left: 'auto', rotate: 1, z: 18 },
  ]
  return grid[i % grid.length]
}

function MiniTitleBar({ title, blink }) {
  return (
    <div
      className={`popchaos-titlebar flex items-center justify-between gap-2 border-b-2 border-[#808080] bg-gradient-to-b from-[#0000a0] to-[#1084d0] px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-xs ${blink ? 'popchaos-titlebar-blink' : ''}`}
    >
      <span className="min-w-0 truncate">{title}</span>
      <span className="flex shrink-0 gap-0.5" aria-hidden>
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center border border-white/40 bg-[#c0c0c0] text-[8px] leading-none text-black">_</span>
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center border border-white/40 bg-[#c0c0c0] text-[8px] leading-none text-black">□</span>
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center border border-white/40 bg-[#c0c0c0] text-[8px] leading-none text-red-600">×</span>
      </span>
    </div>
  )
}

export default function PopupChaosLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [dismissed, setDismissed] = useState(() => new Set())

  const dataPopups = useMemo(() => {
    const list = []
    emails.slice(0, 4).forEach(e => {
      list.push({
        id: `mail-${e.id}`,
        title: 'New mail (!!!)',
        line: e.subject,
        foot: `From: ${e.from.name}`,
        kind: 'mail',
        emailId: e.id,
      })
    })
    news.slice(0, 3).forEach(n => {
      list.push({
        id: `news-${n.id}`,
        title: 'BREAKING (maybe)',
        line: `${n.emoji} ${n.title}`,
        foot: n.source,
        kind: 'news',
      })
    })
    stocks.forEach(s => {
      list.push({
        id: `stk-${s.ticker}`,
        title: 'STONK ALERT',
        line: `${s.ticker} ${s.changePct >= 0 ? '📈' : '📉'} ${s.changePct >= 0 ? '+' : ''}${s.changePct.toFixed(2)}%`,
        foot: `${s.currency}${s.price.toFixed(2)}`,
        kind: 'stock',
      })
    })
    list.push({
      id: 'wx-main',
      title: 'Weather.exe',
      line: `${weather.icon} ${weather.city}: ${weather.temp}°C · ${weather.condition}`,
      foot: `Wind ${weather.wind} km/h — stay hydrated`,
      kind: 'wx',
    })
    return list
  }, [])

  const allPopups = useMemo(() => {
    const spam = SPAM_WINDOWS.map((w, i) => ({ ...w, kind: 'spam', slot: slotForIndex(i) }))
    const data = dataPopups.map((w, i) => ({
      ...w,
      slot: slotForIndex(i + SPAM_WINDOWS.length),
    }))
    return [...spam, ...data]
  }, [dataPopups])

  function dismiss(id) {
    setDismissed(prev => new Set(prev).add(id))
  }

  function dismissNoise() {
    setDismissed(new Set(allPopups.map(p => p.id)))
  }

  return (
    <div
      className="popchaos-root relative min-h-dvh overflow-x-hidden pb-24 text-[var(--pop-text)]"
      style={{
        backgroundColor: 'var(--pop-bg)',
        fontFamily: 'var(--pop-font-body)',
      }}
    >
      {/* Retro sky + scanlines */}
      <div className="popchaos-sky pointer-events-none fixed inset-0 -z-10" aria-hidden />
      <div className="popchaos-scanlines pointer-events-none fixed inset-0 z-[5] opacity-30 mix-blend-overlay" aria-hidden />

      {/* Marquee ribbons */}
      <div className="popchaos-ribbon relative z-[6] overflow-hidden border-y-2 border-yellow-400 bg-gradient-to-r from-fuchsia-600 via-yellow-400 to-cyan-500 py-1 text-[10px] font-black uppercase tracking-wider text-black sm:text-xs">
        <div className="popchaos-marquee-a flex gap-10 whitespace-nowrap px-4">
          {[...news, ...news].map((n, idx) => (
            <span key={`a-${n.id}-${idx}`}>{n.emoji} {n.title} ···</span>
          ))}
        </div>
      </div>
      <div className="popchaos-ribbon relative z-[6] -mt-px overflow-hidden border-b-2 border-cyan-400 bg-[#2d0a4e] py-1 text-[9px] font-bold text-cyan-200 sm:text-[10px]">
        <div className="popchaos-marquee-b flex gap-12 whitespace-nowrap px-4">
          {[...stocks, ...stocks, ...stocks].map((s, idx) => (
            <span key={`b-${s.ticker}-${idx}`}>
              {s.ticker} {s.changePct >= 0 ? '▲' : '▼'}
              {Math.abs(s.changePct).toFixed(1)}% ···
            </span>
          ))}
        </div>
      </div>

      {/* Blinking “toolbar” */}
      <header className="popchaos-toolbar relative z-[8] flex flex-wrap items-center justify-between gap-2 border-b-4 border-dashed border-yellow-300 bg-base-300/95 px-3 py-2 backdrop-blur-sm">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="popchaos-blink-badge badge badge-error badge-sm gap-1 font-mono uppercase">
            <span className="popchaos-live-dot inline-block size-2 rounded-full bg-white" aria-hidden />
            live
          </span>
          <span className="popchaos-wiggle-text text-sm font-black text-warning" style={{ fontFamily: 'var(--pop-font-display)' }}>
            SuperWeb 3000
          </span>
          <span className="hidden text-xs opacity-80 sm:inline">Your inbox, but louder</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-xs btn-warning popchaos-btn-shake font-bold" onClick={dismissNoise}>
            Close all popups
          </button>
          <button type="button" className="btn btn-xs btn-ghost" onClick={onSwitchPersona}>
            Escape
          </button>
        </div>
      </header>

      {/* Floating spam + data windows */}
      <div className="pointer-events-none fixed inset-0 z-[9] overflow-hidden">
        {allPopups.map((p, idx) => {
          if (dismissed.has(p.id)) return null
          const s = p.slot
          const jitterClass = idx % 3 === 0 ? 'popchaos-jitter-a' : idx % 3 === 1 ? 'popchaos-jitter-b' : 'popchaos-jitter-c'
          return (
            <div
              key={p.id}
              className="pointer-events-auto absolute w-[min(92vw,220px)] sm:w-56"
              style={{
                top: s.top,
                left: s.left ?? undefined,
                right: s.right ?? undefined,
                transform: `rotate(${s.rotate}deg)`,
                zIndex: s.z,
              }}
            >
              <div className={`${jitterClass} popchaos-border-blink rounded-sm shadow-[4px_4px_0_#000]`}>
              <div className="border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] bg-[#c0c0c0]">
                <div className="flex items-stretch justify-between gap-1">
                  <div className="min-w-0 flex-1">
                    <MiniTitleBar title={p.title} blink={p.kind === 'spam'} />
                  </div>
                  <button
                    type="button"
                    className="mt-0.5 mr-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-black bg-red-600 text-xs font-bold text-white hover:bg-red-500"
                    aria-label={`Close ${p.title}`}
                    onClick={() => dismiss(p.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-1 p-2 text-[11px] leading-snug text-black">
                  <p className="popchaos-blink-slow font-bold">{p.line}</p>
                  <p className="text-[10px] text-gray-700">{p.foot}</p>
                  {p.kind === 'mail' && p.emailId != null && (
                    <button
                      type="button"
                      className="btn btn-xs btn-primary mt-1 h-7 min-h-0 rounded-none border-0 bg-[#0000a0] text-[10px] text-white"
                      onClick={() => {
                        const em = emails.find(e => e.id === p.emailId)
                        if (em) setSelectedEmail(em)
                      }}
                    >
                      Open (risky)
                    </button>
                  )}
                </div>
              </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Decorative clip-art vibes */}
      <div className="pointer-events-none absolute left-[4%] top-[28%] z-[4] hidden opacity-90 lg:block" aria-hidden>
        <svg width="72" height="72" viewBox="0 0 64 64" className="popchaos-spin-slow drop-shadow-lg">
          <circle cx="32" cy="32" r="28" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
          <text x="32" y="40" textAnchor="middle" fontSize="28">$</text>
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[6%] top-[32%] z-[4] hidden opacity-80 lg:block" aria-hidden>
        <svg width="64" height="80" viewBox="0 0 48 72" className="popchaos-wobble-star drop-shadow-md">
          <path d="M24 4 L30 26 L46 26 L34 36 L38 54 L24 44 L10 54 L14 36 L2 26 L18 26 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
        </svg>
      </div>

      {/* Main “browser” with real content */}
      <main className="relative z-20 mx-auto max-w-2xl px-3 py-6 sm:py-10">
        <div className="popchaos-main-glow rounded border-4 border-double border-yellow-400 bg-base-200 shadow-[0_0_0_4px_#000,8px_8px_0_#000]">
          <MiniTitleBar title="InboxNavigator™ — Totally Legit" blink />
          <div className="border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] p-1">
            <div className="flex flex-wrap gap-1 border border-[#808080] bg-white p-2">
              <span className="badge badge-sm border-0 bg-secondary text-secondary-content">File</span>
              <span className="badge badge-sm border-0 bg-accent text-accent-content">Edit</span>
              <span className="badge badge-sm border-0 bg-info text-info-content">View</span>
              <span className="badge badge-sm border-0 bg-warning text-warning-content animate-pulse">Help!!!</span>
            </div>

            <div className="popchaos-weather-strip mt-2 flex flex-wrap items-center gap-2 border-2 border-dotted border-primary bg-info/20 px-3 py-2 text-sm text-neutral-900">
              <span className="text-2xl">{weather.icon}</span>
              <div>
                <p className="font-bold text-neutral-950">
                  <span className="popchaos-blink-fast text-error">NOW:</span>{' '}
                  {weather.city} · {weather.temp}°C · {weather.condition}
                </p>
                <p className="text-xs text-neutral-700">Feels {weather.feels_like}° · humidity {weather.humidity}% · wind {weather.wind} km/h</p>
              </div>
            </div>

            <div className="mt-3 max-h-[min(48vh,420px)] overflow-y-auto border-2 border-[#808080] bg-white text-neutral-900">
              <ul className="divide-y divide-neutral-200">
                {emails.map(email => (
                  <li key={email.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(email)}
                      className="popchaos-row-blink flex w-full gap-2 px-2 py-2.5 text-left transition-colors hover:bg-primary/10"
                    >
                      <span className="text-lg">{email.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-neutral-950">{email.subject}</p>
                        <p className="truncate text-xs text-neutral-600">{email.from.name}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono text-neutral-500">{email.time}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="popchaos-news-box mt-3 overflow-hidden rounded border-2 border-secondary bg-neutral-100 py-2 text-neutral-900">
              <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">News ticker (local)</p>
              <div className="popchaos-marquee-c mt-1 flex gap-8 whitespace-nowrap px-3 text-xs text-neutral-800">
                {[...news, ...news].map((n, idx) => (
                  <span key={`c-${n.id}-${idx}`}>
                    {n.emoji} {n.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {stocks.map(s => (
                <div
                  key={s.ticker}
                  className="popchaos-stock-tag badge badge-lg gap-1 border-2 border-base-content/20 bg-base-300 font-mono text-sm"
                >
                  {s.ticker}
                  <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>
                    {s.changePct >= 0 ? '▲' : '▼'}
                    {Math.abs(s.changePct).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="popchaos-footnote mt-6 text-center text-[10px] text-base-content/50">
          Parody UI. No trackers (except your eyes). Same fake data as every other persona.
        </p>
      </main>

      {selectedEmail && (
        <div
          className="popchaos-modal-bg fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEmail(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popchaos-email-title"
        >
          <div
            className="popchaos-modal-pop w-full max-w-lg border-4 border-yellow-400 bg-[#c0c0c0] shadow-[6px_6px_0_#000]"
            onClick={e => e.stopPropagation()}
          >
            <MiniTitleBar title={`Message — ${selectedEmail.from.name}`} />
            <div className="border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] p-4">
              <h2 id="popchaos-email-title" className="text-lg font-bold text-black">
                {selectedEmail.subject}
              </h2>
              <p className="mt-1 text-sm text-gray-700">{selectedEmail.from.email}</p>
              <pre className="mt-4 max-h-[50vh] overflow-y-auto whitespace-pre-wrap font-sans text-sm text-black">{selectedEmail.body}</pre>
              <button
                type="button"
                className="btn btn-block mt-4 rounded-none border-2 border-black bg-[#0000a0] text-white hover:bg-[#000080]"
                onClick={() => setSelectedEmail(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
