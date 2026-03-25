import { useMemo, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TABS = [
  { id: 'home', filename: 'START_HERE.txt' },
  { id: 'inbox', filename: 'INBOX.TXT' },
  { id: 'weather', filename: 'WEATHER.LOG' },
  { id: 'news', filename: 'HEADLINES.TXT' },
  { id: 'stocks', filename: 'STONKS.CSV' },
]

function asciiBar(pct) {
  const w = 14
  const filled = Math.round((pct / 100) * w)
  return `${'█'.repeat(filled)}${'░'.repeat(Math.max(0, w - filled))}`
}

function stockSparkBar(series) {
  if (!series?.length) return '—'
  const min = Math.min(...series)
  const max = Math.max(...series)
  const r = max - min || 1
  const chars = ' ▁▂▃▄▅▆▇█'
  const last = series.slice(-24)
  return last
    .map(v => {
      const t = (v - min) / r
      const i = Math.min(chars.length - 1, Math.max(1, Math.round(t * (chars.length - 1))))
      return chars[i]
    })
    .join('')
}

function NotepadIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" width="16" height="16" aria-hidden>
      <rect x="6" y="4" width="20" height="24" rx="1" fill="#f3f3f3" stroke="#555" strokeWidth="1" />
      <line x1="9" y1="9" x2="23" y2="9" stroke="#888" strokeWidth="1" />
      <line x1="9" y1="12" x2="21" y2="12" stroke="#bbb" strokeWidth="1" />
      <line x1="9" y1="15" x2="23" y2="15" stroke="#bbb" strokeWidth="1" />
      <line x1="9" y1="18" x2="19" y2="18" stroke="#bbb" strokeWidth="1" />
    </svg>
  )
}

export default function NotepadBrowserLayout({ onSwitchPersona }) {
  const [tab, setTab] = useState('home')
  const [openedEmail, setOpenedEmail] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  const statusLine = useMemo(() => {
    const base = '100% | Windows (CRLF) | UTF-8'
    if (openedEmail) return `${base} | READ-ONLY`
    const col = TABS.findIndex(t => t.id === tab) + 3
    return `${base} | Ln 1, Col ${col}`
  }, [tab, openedEmail])

  const docBody = useMemo(() => {
    if (tab === 'home') {
      return [
        '',
        '  NOTEPAD WEB BROWSER  [experimental build 0x7F]',
        '  =============================================',
        '',
        '  You found the secret trick: the whole internet',
        '  is just text files if you believe hard enough.',
        '',
        '  Open a "site" (tab above) or pick a number:',
        '',
        '    [1] INBOX.TXT      — electronic mail as God intended',
        '    [2] WEATHER.LOG    — sky conditions, no cookies',
        '    [3] HEADLINES.TXT  — news without autoplay',
        '    [4] STONKS.CSV     — numbers go up (sometimes)',
        '',
        '  Tip: File > Exit opens the real world again.',
        '',
        '        .--.',
        '       |o_o |   <-- you',
        '       |:_/ |',
        '      //   \\ \\',
        '     (|     | )',
        '    /\'\\_   _/`\\',
        '    \\___)=(___/',
        '',
        '  Status: CONNECTED (via imaginary TCP over TXT)',
        '',
      ].join('\n')
    }
    if (tab === 'inbox') {
      return [
        '',
        '  INBOX — saved from Outlook Express (not really)',
        '  ' + '─'.repeat(52),
        '',
        '  Click a line in the list below (yes, this is still the web)',
        '',
      ].join('\n')
    }
    if (tab === 'weather') {
      const humBar = asciiBar(weather.humidity)
      const windBar = asciiBar(Math.min(100, weather.wind * 4))
      return [
        '',
        '  WEATHER.LOG   // local cache, totally legit',
        '  ' + '═'.repeat(40),
        '',
        `        .-.`,
        `       (   ).   ${weather.city}, ${weather.country}`,
        `        '-´     ${weather.icon}  ${weather.temp}°C  feels like ${weather.feels_like}°C`,
        '',
        `  Condition : ${weather.condition}`,
        `  Humidity  : ${humBar} ${weather.humidity}%`,
        `  Wind vibe : ${windBar} ${weather.wind} km/h`,
        '',
        '  5-DAY "FORECAST" (from clipboard)',
        '  ' + '-'.repeat(44),
        ...weather.forecast.map(
          f => `    ${f.day.padEnd(5)}  ${f.icon}  high ${String(f.high).padStart(2)}°  low ${String(f.low).padStart(2)}°`
        ),
        '',
        '  [animating clouds outside your window...]',
        '',
      ].join('\n')
    }
    if (tab === 'news') {
      const lines = [
        '',
        '  HEADLINES.TXT — scraped with Ctrl+C / Ctrl+V technology',
        '  ' + '·'.repeat(50),
        '',
      ]
      news.forEach((n, i) => {
        lines.push(`  :: ${String(i + 1).padStart(2)} :: ${n.emoji} ${n.title}`)
        lines.push(`           (${n.source} · ${n.time})`)
        lines.push('')
      })
      return lines.join('\n')
    }
    if (tab === 'stocks') {
      const lines = [
        '',
        '  STONKS.CSV   (comma-free edition)',
        '  ' + '─'.repeat(56),
        '',
        '  TICKER   PRICE        Δ%     MICRO "CHART"',
        '  ' + '-'.repeat(56),
      ]
      stocks.forEach(s => {
        const sign = s.changePct >= 0 ? '+' : ''
        lines.push(
          `  ${s.ticker.padEnd(6)} ${(s.currency + s.price.toFixed(2)).padStart(12)}  ${sign}${s.changePct}%   ${stockSparkBar(s.series)}`
        )
      })
      lines.push('  ' + '-'.repeat(56))
      lines.push('')
      lines.push('  Disclaimer: past performance is a series of Unicode blocks.')
      lines.push('')
      return lines.join('\n')
    }
    return ''
  }, [tab])

  return (
    <div className="notepad-browser-root relative min-h-dvh overflow-x-hidden pb-8 text-[#0d1b2a]">
      <style>{`
        @keyframes notepad-caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes notepad-float-txt {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes notepad-spider {
          0% { left: 4%; top: 18%; }
          25% { left: 78%; top: 22%; }
          50% { left: 62%; top: 8%; }
          75% { left: 20%; top: 12%; }
          100% { left: 4%; top: 18%; }
        }
        @keyframes notepad-cloud-drift {
          0% { transform: translateX(0); opacity: 0.35; }
          50% { transform: translateX(12px); opacity: 0.55; }
          100% { transform: translateX(0); opacity: 0.35; }
        }
        @keyframes notepad-window-in {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .notepad-caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          margin-left: 1px;
          background: #000;
          vertical-align: text-bottom;
          animation: notepad-caret-blink 1.05s step-end infinite;
        }
        .notepad-float-icon {
          animation: notepad-float-txt 4.5s ease-in-out infinite;
        }
        .notepad-cloud-puff {
          animation: notepad-cloud-drift 5s ease-in-out infinite;
        }
        .notepad-cloud-puff-delay {
          animation: notepad-cloud-drift 6.5s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .notepad-main-window {
          animation: notepad-window-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .notepad-spider {
          position: absolute;
          animation: notepad-spider 28s ease-in-out infinite;
        }
        .notepad-email-pop {
          animation: notepad-window-in 0.35s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .notepad-caret,
          .notepad-float-icon,
          .notepad-cloud-puff,
          .notepad-cloud-puff-delay,
          .notepad-main-window,
          .notepad-email-pop,
          .notepad-spider {
            animation: none !important;
          }
          .notepad-main-window,
          .notepad-email-pop {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* “desktop” */}
      <div
        className="pointer-events-none absolute inset-0 motion-safe:opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(255,255,255,0.14), transparent 50%),
            linear-gradient(165deg, #3d5a80 0%, #293241 45%, #1b263b 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] motion-safe:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <span
        className="notepad-spider pointer-events-none select-none text-lg motion-reduce:hidden"
        aria-hidden
      >
        🕷️
      </span>

      <div className="notepad-float-icon pointer-events-none absolute right-[8%] top-[12%] text-4xl opacity-50 motion-reduce:opacity-40">
        📄
      </div>
      <div className="notepad-cloud-puff pointer-events-none absolute left-[6%] top-[24%] text-3xl motion-reduce:opacity-30">
        ☁️
      </div>
      <div className="notepad-cloud-puff-delay pointer-events-none absolute right-[18%] top-[8%] text-2xl motion-reduce:opacity-25">
        ☁️
      </div>

      <div className="relative z-[1] mx-auto flex min-h-dvh max-w-5xl flex-col px-3 py-6 sm:px-5">
        <p className="m-0 mb-3 text-center text-xs font-medium text-white/70">
          C:\Program Files\Internet Explorer\&nbsp;
          <span className="font-mono text-[#ee6c4d]">iexplore.exe</span>
          <span className="text-white/50"> → renamed to </span>
          <span className="font-mono text-[#90e0ef]">notepad.exe</span>
        </p>

        <div
          className="notepad-main-window flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-md border border-[#1a1a1a] bg-[#ececec] shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          role="application"
          aria-label="Notepad web browser"
        >
          {/* Title bar */}
          <div className="flex shrink-0 items-center gap-2 rounded-t-md bg-[#0078d4] px-2 py-1.5 text-white">
            <NotepadIcon className="shrink-0" />
            <span className="min-w-0 flex-1 truncate text-center text-xs font-normal sm:text-sm">
              {openedEmail ? `MSG_${openedEmail.id}.TXT - Notepad` : TABS.find(t => t.id === tab)?.filename} - Notepad
            </span>
            <div className="flex shrink-0 gap-1">
              <span className="flex h-6 w-8 items-center justify-center rounded hover:bg-white/15" aria-hidden>
                ─
              </span>
              <span className="flex h-6 w-8 items-center justify-center rounded hover:bg-white/15" aria-hidden>
                □
              </span>
              <span className="flex h-6 w-8 items-center justify-center rounded hover:bg-[#e81123]" aria-hidden>
                ✕
              </span>
            </div>
          </div>

          {/* Menu */}
          <div
            className="relative flex shrink-0 flex-wrap gap-x-1 border-b border-[#ccc] bg-[#f0f0f0] px-1 py-0.5 text-xs text-[#222]"
            onMouseLeave={() => setMenuOpen(null)}
          >
            {['File', 'Edit', 'Format', 'View', 'Help'].map(m => (
              <div key={m} className="relative">
                <button
                  type="button"
                  className={`rounded px-2 py-0.5 hover:bg-[#d8e6f8] ${menuOpen === m ? 'bg-[#cce4ff]' : ''}`}
                  onMouseEnter={() => setMenuOpen(m)}
                  onFocus={() => setMenuOpen(m)}
                >
                  {m}
                </button>
                {menuOpen === m && (
                  <div className="absolute left-0 top-full z-20 min-w-[11rem] border border-[#888] bg-[#f0f0f0] py-0.5 shadow-md">
                    {m === 'File' && (
                      <>
                        <button
                          type="button"
                          className="block w-full px-3 py-1.5 text-left hover:bg-[#0078d4] hover:text-white"
                          onClick={() => {
                            setOpenedEmail(null)
                            setTab('home')
                            setMenuOpen(null)
                          }}
                        >
                          New window
                        </button>
                        <button
                          type="button"
                          className="block w-full px-3 py-1.5 text-left hover:bg-[#0078d4] hover:text-white"
                          onClick={() => {
                            onSwitchPersona?.()
                            setMenuOpen(null)
                          }}
                        >
                          Exit
                        </button>
                      </>
                    )}
                    {m === 'Help' && (
                      <p className="m-0 max-w-[14rem] px-3 py-2 text-[10px] leading-snug text-[#333]">
                        This is not a bug. Browsing in Notepad is a lifestyle. Press Alt+F4 for emotional damage.
                      </p>
                    )}
                    {m !== 'File' && m !== 'Help' && (
                      <p className="m-0 px-3 py-2 text-[10px] text-[#666]">(not implemented — it never is)</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fake address bar */}
          <div className="flex shrink-0 items-center gap-2 border-b border-[#d0d0d0] bg-white px-2 py-1">
            <span className="text-[10px] text-[#666]">Address</span>
            <div className="min-w-0 flex-1 truncate rounded border border-[#7a7a7a] bg-white px-2 py-0.5 font-mono text-[10px] text-[#111]">
              file:///C:/Users/DefinitelyNotHacking/Downloads/
              {TABS.find(t => t.id === tab)?.filename ?? 'START_HERE.txt'}
            </div>
            <span className="motion-safe:animate-pulse text-[10px] font-mono text-[#0078d4]">● REC</span>
          </div>

          {/* Tabs */}
          <div className="flex shrink-0 gap-0.5 overflow-x-auto border-b border-[#c8c8c8] bg-[#e8e8e8] px-1 pt-1">
            {TABS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id)
                  setOpenedEmail(null)
                }}
                className={`whitespace-nowrap rounded-t border border-b-0 px-2 py-1 font-mono text-[10px] sm:text-xs ${
                  tab === t.id && !openedEmail
                    ? 'border-[#b0b0b0] bg-white text-[#000] -mb-px pb-1.5'
                    : 'border-transparent bg-[#d8d8d8] text-[#444] hover:bg-[#e2e2e2]'
                }`}
              >
                {t.filename}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="relative flex min-h-[min(60vh,420px)] flex-1 flex-col bg-white">
            <div className="notepad-editor-scroll min-h-0 flex-1 overflow-auto">
              <pre className="m-0 whitespace-pre-wrap break-words p-3 pb-0 font-mono text-[11px] leading-relaxed text-black sm:text-xs sm:leading-relaxed">
                {docBody}
                <span className="notepad-caret motion-reduce:bg-transparent motion-reduce:animate-none" aria-hidden />
              </pre>

              {tab === 'inbox' && !openedEmail && (
                <ul className="m-0 list-none space-y-0.5 px-3 pb-4 pt-0">
                  {emails.map((e, i) => {
                    const flag = e.read ? ' ' : '*'
                    return (
                      <li key={e.id}>
                        <button
                          type="button"
                          onClick={() => setOpenedEmail(e)}
                          className="btn btn-ghost btn-sm h-auto min-h-0 w-full justify-start rounded-sm border border-transparent px-2 py-1.5 font-mono text-[11px] normal-case text-black hover:border-[#0078d4]/50 hover:bg-[#e5f1fb] sm:text-xs"
                        >
                          <span className="text-[#0b57d0]">
                            {String(i + 1).padStart(2)}. [{flag}] {e.time.padEnd(7)} {e.from.avatar} {e.from.name}
                          </span>
                          <br />
                          <span className="text-[#333]">SUBJ: {e.subject}</span>
                          <br />
                          <span className="text-[#555]">
                            PREV: {e.preview.slice(0, 72)}
                            {e.preview.length > 72 ? '…' : ''}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}

              {tab === 'home' && (
                <div className="flex flex-wrap gap-2 px-3 pb-6 pt-4">
                  {TABS.filter(t => t.id !== 'home').map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className="btn btn-primary btn-xs font-mono normal-case"
                    >
                      Open {t.filename}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[#f0f0f0] bg-[#0078d4] px-2 py-0.5 text-[10px] text-white">
            <span className="min-w-0 truncate font-mono">{statusLine}</span>
            <span className="shrink-0 font-mono motion-safe:animate-pulse">Downloading</span>
          </div>
        </div>

        {/* Email popup window */}
        {openedEmail && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notepad-email-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
              aria-label="Close message"
              onClick={() => setOpenedEmail(null)}
            />
            <div className="notepad-email-pop relative z-[1] w-full max-w-lg overflow-hidden rounded-t-md border border-[#1a1a1a] bg-[#ececec] shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:rounded-md">
              <div className="flex items-center gap-2 bg-[#0078d4] px-2 py-1 text-white">
                <NotepadIcon className="shrink-0" />
                <span id="notepad-email-title" className="flex-1 truncate text-xs">
                  MSG_{openedEmail.id}.TXT
                </span>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs min-h-0 h-7 rounded px-2 text-white hover:bg-[#e81123]"
                  onClick={() => setOpenedEmail(null)}
                >
                  ✕
                </button>
              </div>
              <div className="max-h-[min(55vh,420px)] overflow-auto bg-white p-3 font-mono text-[11px] leading-relaxed text-black sm:text-xs">
                <p className="mt-0 border-b border-[#ddd] pb-2 text-[10px] text-[#444]">
                  From: {openedEmail.from.name} &lt;{openedEmail.from.email}&gt;
                  <br />
                  Date: {openedEmail.date} {openedEmail.time}
                  <br />
                  Subject: {openedEmail.subject}
                </p>
                <pre className="m-0 mt-2 whitespace-pre-wrap font-mono">{openedEmail.body}</pre>
                <span className="notepad-caret motion-reduce:hidden" aria-hidden />
              </div>
              <div className="flex justify-end gap-2 border-t border-[#ddd] bg-[#f0f0f0] p-2">
                <button type="button" className="btn btn-sm" onClick={() => setOpenedEmail(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setOpenedEmail(null)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
