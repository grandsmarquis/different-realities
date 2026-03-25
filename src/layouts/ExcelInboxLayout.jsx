import { useMemo, useState } from 'react'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const SHEETS = [
  { id: 'welcome', label: 'START_HERE', icon: '🏠' },
  { id: 'inbox', label: 'INBOX', icon: '📧' },
  { id: 'weather', label: 'SKY_DATA', icon: '⛅' },
  { id: 'news', label: 'HEADLINES', icon: '📰' },
  { id: 'stocks', label: 'STONKS', icon: '📈' },
]

function colLabel(n) {
  let s = ''
  let x = n
  while (x >= 0) {
    s = String.fromCharCode((x % 26) + 65) + s
    x = Math.floor(x / 26) - 1
  }
  return s || 'A'
}

function MiniSpark({ series, positive }) {
  if (!series?.length) return <span className="text-[10px] text-[#666]">—</span>
  const slice = series.slice(-16)
  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const r = max - min || 1
  const w = 56
  const h = 18
  const pts = slice
    .map((v, i) => {
      const x = (i / (slice.length - 1 || 1)) * w
      const y = h - ((v - min) / r) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(' ')
  const stroke = positive ? '#217346' : '#c00000'
  return (
    <svg width={w} height={h} className="inline-block align-middle" aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.25"
        points={pts}
        className="excel-spark-line"
      />
    </svg>
  )
}

export default function ExcelInboxLayout({ onSwitchPersona }) {
  const [sheet, setSheet] = useState('welcome')
  const [openedEmail, setOpenedEmail] = useState(null)
  const [ribbonHint, setRibbonHint] = useState('Pick a cell. Trust the grid.')
  const [clippyMood, setClippyMood] = useState(0)

  const formulaBar = useMemo(() => {
    if (openedEmail) {
      return `=CONCATENATE("${openedEmail.from.name}"," sent you feelings")`
    }
    if (sheet === 'welcome') return '=HYPERLINK("life","Why not pivot your priorities?")'
    if (sheet === 'inbox') return '=COUNTIF(Inbox,"*unread*") & " messages need attention"'
    if (sheet === 'weather') return `=WEATHER("${weather.city}","honest")`
    if (sheet === 'news') return '=IMPORTXML("reality","//headline")'
    if (sheet === 'stocks') return '=STOCKHISTORY("HOPE",TODAY(),,2)'
    return '=RAND()*0+1'
  }, [sheet, openedEmail])

  const nameBox = useMemo(() => {
    if (openedEmail) return `MSG_R${openedEmail.id}`
    return `${colLabel(2)}${SHEETS.findIndex(s => s.id === sheet) + 4}`
  }, [sheet, openedEmail])

  return (
    <div className="excel-inbox-root relative min-h-dvh overflow-x-hidden pb-8 text-[#1a1a1a]">
      <style>{`
        @keyframes excel-spark-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes excel-grid-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes excel-cell-pulse {
          0%, 100% { box-shadow: inset 0 0 0 2px #217346; }
          50% { box-shadow: inset 0 0 0 2px #92d050; }
        }
        @keyframes excel-calc-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes excel-clippy-bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes excel-formula-glow {
          0%, 100% { border-color: #b4b4b4; }
          50% { border-color: #217346; }
        }
        @keyframes excel-float-grid {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
          33% { transform: translate(4px, -6px) scale(1.02); opacity: 0.18; }
          66% { transform: translate(-3px, 4px) scale(0.98); opacity: 0.15; }
        }
        .excel-grid-animate {
          animation: excel-grid-fade 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .excel-active-cell {
          animation: excel-cell-pulse 2.2s ease-in-out infinite;
        }
        .excel-calc-bar {
          background: linear-gradient(90deg, #e8f5e9, #fff8e1, #e8f5e9);
          background-size: 200% 100%;
          animation: excel-calc-shimmer 2.5s linear infinite;
        }
        .excel-clippy {
          animation: excel-clippy-bob 3s ease-in-out infinite;
        }
        .excel-formula-focus {
          animation: excel-formula-glow 3s ease-in-out infinite;
        }
        .excel-bg-float {
          animation: excel-float-grid 12s ease-in-out infinite;
        }
        .excel-spark-line {
          animation: excel-spark-in 0.65s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .excel-grid-animate,
          .excel-active-cell,
          .excel-calc-bar,
          .excel-clippy,
          .excel-formula-focus,
          .excel-bg-float,
          .excel-spark-line {
            animation: none !important;
          }
          .excel-calc-bar { background: #e8f5e9; }
        }
      `}</style>

      {/* Wallpaper */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% -15%, rgba(255,255,255,0.2), transparent 55%),
            linear-gradient(168deg, #0d3d26 0%, #1d6f42 38%, #145c32 100%)
          `,
        }}
      />
      <div
        className="excel-bg-float pointer-events-none absolute left-[4%] top-[10%] h-32 w-44 rounded-lg border border-white/20 bg-white/5 motion-reduce:opacity-10"
        aria-hidden
      />
      <div
        className="excel-bg-float pointer-events-none absolute right-[6%] top-[22%] h-24 w-36 rounded-lg border border-white/15 bg-white/5 motion-reduce:opacity-10"
        style={{ animationDelay: '-4s' }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex min-h-dvh max-w-6xl flex-col px-2 py-4 sm:px-4">
        <p className="m-0 mb-2 text-center text-[11px] font-medium text-white/80">
          <span className="opacity-70">C:\Finance_Denial\</span>
          <span className="font-mono text-[#ffeb3b]">EXCELL.EXE</span>
          <span className="opacity-60"> — the spreadsheet is your inbox now</span>
        </p>

        <div
          className="excel-grid-animate flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-lg border border-[#0a0a0a] bg-[#f3f3f3] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          role="application"
          aria-label="Spreadsheet mail client"
        >
          {/* Title bar */}
          <div className="flex shrink-0 items-center gap-2 rounded-t-lg bg-[#217346] px-2 py-1 text-white">
            <span className="text-lg" aria-hidden>
              📗
            </span>
            <span className="min-w-0 flex-1 truncate text-center text-xs font-normal sm:text-sm">
              INBOX_MASTER.xlsx — Excel (Worksheet Humility Mode)
            </span>
            <div className="flex shrink-0 gap-0.5">
              <span className="flex h-6 w-8 items-center justify-center rounded hover:bg-white/10" aria-hidden>
                ─
              </span>
              <span className="flex h-6 w-8 items-center justify-center rounded hover:bg-white/10" aria-hidden>
                □
              </span>
              <button
                type="button"
                className="flex h-6 w-8 items-center justify-center rounded hover:bg-[#e81123]"
                aria-label="Exit to home"
                onClick={() => onSwitchPersona?.()}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Access + Ribbon */}
          <div className="shrink-0 border-b border-[#d0d0d0] bg-white">
            <div className="flex flex-wrap items-center gap-1 border-b border-[#e5e5e5] px-1 py-0.5 text-[10px] text-[#444]">
              <span className="rounded px-1.5 py-0.5 hover:bg-[#e8e8e8]">AutoSave</span>
              <span className="text-[#217346]">● On</span>
              <span className="mx-1 text-[#ccc]">|</span>
              <button
                type="button"
                className="rounded px-1.5 py-0.5 hover:bg-[#e8e8e8]"
                onClick={() => {
                  setRibbonHint('Undo does not apply to yesterday.')
                  setClippyMood(m => m + 1)
                }}
              >
                ↩ Undo
              </button>
              <button
                type="button"
                className="rounded px-1.5 py-0.5 hover:bg-[#e8e8e8]"
                onClick={() => setRibbonHint('Still you. Still Excel. Still coping.')}
              >
                😐 Repeat
              </button>
            </div>
            <div className="flex flex-wrap gap-0.5 bg-[#f9f9f9] px-1 py-1">
              {['File', 'Home', 'Insert', 'Draw', 'Page Layout', 'Formulas', 'Data', 'Mail (???)', 'View'].map(
                (tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    className={`rounded px-2 py-1 text-[11px] font-medium ${
                      i === 1 ? 'bg-[#217346] text-white' : 'text-[#333] hover:bg-[#e5e5e5]'
                    }`}
                    onClick={() => {
                      if (tab === 'Mail (???)') {
                        setSheet('inbox')
                        setRibbonHint('Mail merged into cells. IT said this was fine.')
                      } else if (tab === 'Data') {
                        setSheet('stocks')
                        setRibbonHint('Data » Stonks. Science.')
                      } else if (tab === 'Formulas') {
                        setRibbonHint('=IF(STRESSED,COFFEE(),MEDITATE())')
                      }
                    }}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-[#e0e0e0] bg-[#f3f3f3] px-2 py-1.5">
              <span className="rounded border border-[#ccc] bg-white px-2 py-0.5 text-[10px] text-[#217346]">
                Clipboard
              </span>
              <span className="rounded border border-[#ccc] bg-white px-2 py-0.5 text-[10px]">🅱 Bold lie</span>
              <span className="rounded border border-[#ccc] bg-white px-2 py-0.5 text-[10px]">₿ Italic budget</span>
              <span className="rounded border border-[#ffc000]/60 bg-[#fff8e1] px-2 py-0.5 text-[10px] font-medium">
                Conditional Drama
              </span>
            </div>
          </div>

          {/* Name box + formula bar */}
          <div className="flex shrink-0 items-stretch gap-1 border-b border-[#b4b4b4] bg-[#e7e7e7] px-1 py-0.5">
            <div className="flex w-16 shrink-0 items-center justify-center rounded border border-[#a0a0a0] bg-white font-mono text-[11px] text-[#333]">
              {nameBox}
            </div>
            <div className="excel-formula-focus flex min-w-0 flex-1 items-center rounded border border-[#b4b4b4] bg-white px-2 py-1 font-mono text-[10px] text-[#105c33] sm:text-[11px]">
              <span className="mr-1 shrink-0 text-[#666]">fx</span>
              <span className="min-w-0 truncate">{formulaBar}</span>
            </div>
          </div>

          {/* Sheet tabs row */}
          <div className="flex shrink-0 gap-0.5 overflow-x-auto border-b border-[#b4b4b4] bg-[#d4d4d4] px-1 pt-1">
            {SHEETS.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSheet(s.id)
                  setOpenedEmail(null)
                }}
                className={`whitespace-nowrap rounded-t border border-b-0 px-2 py-1 text-[10px] font-medium sm:text-xs ${
                  sheet === s.id && !openedEmail
                    ? 'border-[#808080] bg-white text-[#217346] -mb-px pb-1.5'
                    : 'border-transparent bg-[#c0c0c0] text-[#333] hover:bg-[#d0d0d0]'
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
            <span className="flex items-center px-1 text-[#666]" aria-hidden>
              +
            </span>
          </div>

          {/* Grid viewport */}
          <div className="relative min-h-[min(58vh,440px)] flex-1 overflow-auto bg-white">
            {sheet === 'welcome' && (
              <div className="excel-grid-animate p-4 pl-10 sm:pl-14">
                <div className="excel-active-cell relative mx-auto max-w-xl rounded-sm border-2 border-[#217346] bg-[#f8fff8] p-4 shadow-inner">
                  <h2 className="mt-0 text-lg font-semibold text-[#217346]">Welcome to the grid</h2>
                  <p className="text-sm leading-relaxed text-[#333]">
                    You are not &quot;checking email&quot;. You are performing a <strong>structured audit</strong> of
                    digital correspondence inside a productivity tool that definitely supports SMTP. Probably.
                  </p>
                  <ul className="list-none space-y-2 p-0 text-sm text-[#444]">
                    <li>
                      📧 <strong>INBOX</strong> — one row per trauma (with preview column)
                    </li>
                    <li>
                      ⛅ <strong>SKY_DATA</strong> — meteorology as a lookup table
                    </li>
                    <li>
                      📰 <strong>HEADLINES</strong> — news without recommended videos
                    </li>
                    <li>
                      📈 <strong>STONKS</strong> — sparklines for emotional regulation
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SHEETS.filter(s => s.id !== 'welcome').map(s => (
                      <button
                        key={s.id}
                        type="button"
                        className="btn btn-sm border-[#217346] bg-[#217346] text-white hover:bg-[#1a5c38]"
                        onClick={() => setSheet(s.id)}
                      >
                        Go to {s.label}
                      </button>
                    ))}
                  </div>
                  <p className="mb-0 mt-3 font-mono text-[10px] text-[#888]">
                    Tip: Press Alt+↵ to break your soul across rows.
                  </p>
                </div>

                {/* Fake chart */}
                <div className="pointer-events-none mx-auto mt-8 max-w-md opacity-90 motion-reduce:opacity-70">
                  <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-wide text-[#666]">
                    Chart: Productivity vs. Denial
                  </p>
                  <svg viewBox="0 0 200 80" className="w-full max-w-md" aria-hidden>
                    <rect x="0" y="0" width="200" height="80" fill="#fafafa" stroke="#d4d4d4" />
                    <path
                      d="M 10 60 Q 50 20, 90 45 T 170 15 L 190 70 L 10 70 Z"
                      fill="url(#excelGrad)"
                      opacity="0.85"
                      className="motion-safe:origin-bottom motion-safe:[animation:excel-grid-fade_1s_ease-out_both]"
                    />
                    <defs>
                      <linearGradient id="excelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#92d050" />
                        <stop offset="100%" stopColor="#217346" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="#217346"
                      strokeWidth="2"
                      points="10,60 40,35 70,50 100,25 130,40 160,18 190,30"
                    />
                  </svg>
                </div>
              </div>
            )}

            {sheet === 'inbox' && !openedEmail && (
              <table className="excel-grid-animate w-full border-collapse text-left text-[11px] sm:text-xs">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 w-8 border border-[#d4d4d4] bg-[#e7e7e7] p-1 text-center font-normal text-[#666]" />
                    <th className="border border-[#d4d4d4] bg-[#e7e7e7] p-1 font-semibold text-[#333]">A</th>
                    <th className="border border-[#d4d4d4] bg-[#e7e7e7] p-1 font-semibold">B</th>
                    <th className="border border-[#d4d4d4] bg-[#e7e7e7] p-1 font-semibold">C</th>
                    <th className="border border-[#d4d4d4] bg-[#e7e7e7] p-1 font-semibold">D</th>
                    <th className="border border-[#d4d4d4] bg-[#e7e7e7] p-1 font-semibold">E</th>
                  </tr>
                  <tr className="bg-[#f9f9f9]">
                    <th className="sticky left-0 z-10 border border-[#d4d4d4] bg-[#e7e7e7] p-1 text-center font-normal">1</th>
                    <th className="border border-[#d4d4d4] bg-[#fff2cc] p-1.5 font-semibold text-[#217346]">#</th>
                    <th className="border border-[#d4d4d4] bg-[#fff2cc] p-1.5 font-semibold">Flag</th>
                    <th className="border border-[#d4d4d4] bg-[#fff2cc] p-1.5 font-semibold">Time</th>
                    <th className="border border-[#d4d4d4] bg-[#fff2cc] p-1.5 font-semibold">From</th>
                    <th className="border border-[#d4d4d4] bg-[#fff2cc] p-1.5 font-semibold">Subject / Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((e, i) => {
                    const row = i + 2
                    const unread = !e.read
                    return (
                      <tr key={e.id} className={unread ? 'bg-[#e8f5e9]' : 'bg-white'}>
                        <td className="sticky left-0 z-10 border border-[#d4d4d4] bg-[#e7e7e7] p-1 text-center text-[#666]">
                          {row}
                        </td>
                        <td className="border border-[#d4d4d4] p-1.5 font-mono text-[#217346]">{row - 1}</td>
                        <td className="border border-[#d4d4d4] p-1.5 text-center text-lg">{unread ? '●' : '○'}</td>
                        <td className="border border-[#d4d4d4] p-1.5 font-mono">{e.time}</td>
                        <td className="border border-[#d4d4d4] p-1.5">
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs h-auto min-h-0 w-full justify-start gap-1 whitespace-normal rounded-none border-0 bg-transparent p-0 text-left font-normal normal-case hover:bg-[#d4edda]"
                            onClick={() => setOpenedEmail(e)}
                          >
                            <span>{e.from.avatar}</span>
                            <span className="text-[#105c33]">{e.from.name}</span>
                          </button>
                        </td>
                        <td className="border border-[#d4d4d4] p-1.5">
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs h-auto min-h-0 w-full justify-start whitespace-normal rounded-none border-0 bg-transparent p-0 text-left font-normal normal-case hover:bg-[#d4edda]"
                            onClick={() => setOpenedEmail(e)}
                          >
                            <span className="font-medium text-[#222]">{e.subject}</span>
                            <span className="block text-[10px] text-[#666]">
                              {e.preview.slice(0, 96)}
                              {e.preview.length > 96 ? '…' : ''}
                            </span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}

            {sheet === 'weather' && (
              <div className="excel-grid-animate p-3 sm:p-4">
                <table className="w-full max-w-lg border-collapse text-sm">
                  <tbody>
                    <tr>
                      <td className="border border-[#d4d4d4] bg-[#e7e7e7] p-2 font-semibold">Metric</td>
                      <td className="border border-[#d4d4d4] bg-[#e7e7e7] p-2 font-semibold">Value</td>
                    </tr>
                    <tr>
                      <td className="border border-[#d4d4d4] bg-[#fff2cc] p-2">City</td>
                      <td className="excel-active-cell border border-[#d4d4d4] bg-white p-2 font-medium">
                        {weather.icon} {weather.city}, {weather.country}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#d4d4d4] p-2">Temp (°C)</td>
                      <td className="border border-[#d4d4d4] bg-[#e8f5e9] p-2 text-lg font-semibold text-[#217346]">
                        {weather.temp}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#d4d4d4] p-2">Feels like</td>
                      <td className="border border-[#d4d4d4] p-2">{weather.feels_like}°C</td>
                    </tr>
                    <tr>
                      <td className="border border-[#d4d4d4] p-2">Vibe</td>
                      <td className="border border-[#d4d4d4] p-2">{weather.condition}</td>
                    </tr>
                    <tr>
                      <td className="border border-[#d4d4d4] p-2">Humidity</td>
                      <td className="border border-[#d4d4d4] p-2">
                        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-[#e0e0e0]">
                          <div
                            className="h-full rounded-full bg-[#217346] motion-safe:transition-all motion-safe:duration-700"
                            style={{ width: `${weather.humidity}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#666]">{weather.humidity}%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-[#d4d4d4] p-2">Wind</td>
                      <td className="border border-[#d4d4d4] p-2">{weather.wind} km/h</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-xs font-semibold text-[#217346]">5-day =FORECAST() spill range</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {weather.forecast.map(f => (
                    <div
                      key={f.day}
                      className="rounded border border-[#d4d4d4] bg-[#f9fff9] px-3 py-2 text-center text-xs shadow-sm motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                    >
                      <div className="font-bold text-[#333]">{f.day}</div>
                      <div className="text-xl">{f.icon}</div>
                      <div className="text-[#217346]">
                        {f.high}° / {f.low}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sheet === 'news' && (
              <table className="excel-grid-animate w-full border-collapse text-left text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-[#fff2cc]">
                    <th className="border border-[#d4d4d4] p-2">#</th>
                    <th className="border border-[#d4d4d4] p-2">Headline</th>
                    <th className="border border-[#d4d4d4] p-2">Source</th>
                    <th className="border border-[#d4d4d4] p-2">When</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((n, i) => (
                    <tr key={n.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                      <td className="border border-[#d4d4d4] p-2 font-mono text-[#217346]">{i + 1}</td>
                      <td className="border border-[#d4d4d4] p-2">
                        <span className="mr-1">{n.emoji}</span>
                        {n.title}
                      </td>
                      <td className="border border-[#d4d4d4] p-2 text-[#555]">{n.source}</td>
                      <td className="border border-[#d4d4d4] p-2 text-[#888]">{n.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {sheet === 'stocks' && (
              <table className="excel-grid-animate w-full border-collapse text-left text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-[#fff2cc]">
                    <th className="border border-[#d4d4d4] p-2">Ticker</th>
                    <th className="border border-[#d4d4d4] p-2">Name</th>
                    <th className="border border-[#d4d4d4] p-2">Price</th>
                    <th className="border border-[#d4d4d4] p-2">Δ%</th>
                    <th className="border border-[#d4d4d4] p-2">Sparkline</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(s => {
                    const pos = s.changePct >= 0
                    return (
                      <tr key={s.ticker} className="bg-white">
                        <td className="border border-[#d4d4d4] p-2 font-mono font-bold text-[#217346]">{s.ticker}</td>
                        <td className="border border-[#d4d4d4] p-2">{s.name}</td>
                        <td className="border border-[#d4d4d4] p-2 font-mono">
                          {s.currency}
                          {s.price.toFixed(2)}
                        </td>
                        <td
                          className={`border border-[#d4d4d4] p-2 font-mono font-semibold ${
                            pos ? 'text-[#217346]' : 'text-[#c00000]'
                          }`}
                        >
                          {pos ? '+' : ''}
                          {s.changePct}%
                        </td>
                        <td className="border border-[#d4d4d4] p-2">
                          <MiniSpark series={s.series} positive={pos} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}

            {/* Clippy buddy */}
            <div
              className="excel-clippy pointer-events-none fixed bottom-24 right-4 z-30 flex max-w-[11rem] flex-col items-end sm:bottom-28 sm:right-8 motion-reduce:opacity-90"
              aria-hidden
            >
              <div className="rounded-lg border-2 border-[#217346] bg-white px-2 py-1.5 text-[10px] leading-snug text-[#333] shadow-lg">
                {clippyMood % 3 === 0 && (
                  <>It looks like you&apos;re reading email. Want me to SUM() your anxiety?</>
                )}
                {clippyMood % 3 === 1 && <>Try =VLOOKUP(peace,life,FALSE) — returns mostly #N/A.</>}
                {clippyMood % 3 === 2 && <>Remember to save. Your emotions autosave every 5 minutes.</>}
              </div>
              <span className="mt-1 text-4xl drop-shadow-md">📎</span>
            </div>
            <button
              type="button"
              className="btn btn-circle btn-sm btn-ghost fixed bottom-24 right-2 z-40 border border-white/30 bg-[#217346] text-white sm:bottom-28 sm:right-6"
              aria-label="Rotate paperclip hint"
              onClick={() => setClippyMood(m => m + 1)}
            >
              📎
            </button>
          </div>

          {/* Status bar */}
          <div className="excel-calc-bar flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#b4b4b4] px-2 py-0.5 text-[10px] text-[#333] motion-reduce:bg-[#e8f5e9]">
            <span className="min-w-0 truncate font-mono">{ribbonHint}</span>
            <div className="flex shrink-0 gap-3 font-mono">
              <span>Average: you</span>
              <span>Count: enough</span>
              <span className="text-[#217346]">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email “review pane” */}
      {openedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="excel-email-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#217346]/35 backdrop-blur-[2px]"
            aria-label="Close message"
            onClick={() => setOpenedEmail(null)}
          />
          <div className="excel-grid-animate relative z-[1] w-full max-w-lg overflow-hidden rounded-md border-2 border-[#217346] bg-white shadow-2xl">
            <div className="flex items-center gap-2 bg-[#217346] px-2 py-1.5 text-white">
              <span className="text-sm">📧</span>
              <span id="excel-email-title" className="min-w-0 flex-1 truncate text-xs font-medium">
                Comment: Row {emails.findIndex(e => e.id === openedEmail.id) + 2} — {openedEmail.subject}
              </span>
              <button
                type="button"
                className="btn btn-ghost btn-xs min-h-0 h-7 text-white hover:bg-[#e81123]"
                onClick={() => setOpenedEmail(null)}
              >
                ✕
              </button>
            </div>
            <div className="max-h-[min(52vh,400px)] overflow-auto p-3 text-sm">
              <table className="mb-3 w-full border-collapse text-xs">
                <tbody>
                  <tr>
                    <td className="border border-[#d4d4d4] bg-[#e7e7e7] p-1.5 font-semibold">From</td>
                    <td className="border border-[#d4d4d4] p-1.5">
                      {openedEmail.from.avatar} {openedEmail.from.name} &lt;{openedEmail.from.email}&gt;
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#d4d4d4] bg-[#e7e7e7] p-1.5 font-semibold">Date</td>
                    <td className="border border-[#d4d4d4] p-1.5">
                      {openedEmail.date} {openedEmail.time}
                    </td>
                  </tr>
                </tbody>
              </table>
              <pre className="m-0 whitespace-pre-wrap rounded border border-[#e0e0e0] bg-[#fafafa] p-2 font-mono text-[11px] leading-relaxed text-[#222]">
                {openedEmail.body}
              </pre>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#d4d4d4] bg-[#f3f3f3] p-2">
              <button type="button" className="btn btn-sm" onClick={() => setOpenedEmail(null)}>
                Close &amp; pretend read
              </button>
              <button type="button" className="btn btn-sm bg-[#217346] text-white hover:bg-[#1a5c38]" onClick={() => setOpenedEmail(null)}>
                Mark as =TRUE()
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
