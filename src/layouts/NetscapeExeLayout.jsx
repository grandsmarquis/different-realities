import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const F = "'Tahoma', 'MS Sans Serif', 'Segoe UI', sans-serif"
const GRAY = '#c0c0c0'
const DARK = '#808080'
const LIGHT = '#ffffff'
const NS_GREEN = '#0a5c2e'
const NS_GREEN_HI = '#1a8f4a'

const raised = {
  borderStyle: 'solid',
  borderWidth: 2,
  borderTopColor: LIGHT,
  borderLeftColor: LIGHT,
  borderBottomColor: DARK,
  borderRightColor: DARK,
}
const sunken = {
  borderStyle: 'solid',
  borderWidth: 2,
  borderTopColor: DARK,
  borderLeftColor: DARK,
  borderBottomColor: LIGHT,
  borderRightColor: LIGHT,
}

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 72
  const h = 22
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0 opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="1.25" points={pts} />
    </svg>
  )
}

function NetscapeLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" width="22" height="22" aria-hidden>
      <defs>
        <linearGradient id="nsn" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7fff00" />
          <stop offset="100%" stopColor="#006633" />
        </linearGradient>
      </defs>
      <path
        fill="url(#nsn)"
        d="M4 4h6l8 14V4h6v24h-5L11 14v14H4V4z"
      />
      <path fill="#ff6600" opacity="0.9" d="M22 6l6-2v8l-4 2z" className="ns-meteor" />
    </svg>
  )
}

const STATUS_LINES = [
  'Document: Done.',
  'Connected at 28.8Kbps — blazing fast!',
  'Receiving mail from pop3.your-isp.net…',
  'Cache: 2.4 MB free on C:\\',
  'Java™ enabled — trust no applets',
  'SSL: 40-bit (export grade) — good enough for 1996',
  'Tip: hit Stop if a GIF never finishes.',
]

export default function NetscapeExeLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [statusIdx, setStatusIdx] = useState(0)
  const [folder, setFolder] = useState('inbox')
  const unread = useMemo(() => emails.filter(e => !e.read).length, [])

  useEffect(() => {
    const t = setInterval(() => setStatusIdx(i => (i + 1) % STATUS_LINES.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="netscape-exe-root relative min-h-dvh overflow-x-hidden pb-4"
      style={{
        fontFamily: F,
        backgroundColor: '#008080',
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)
        `,
      }}
    >
      <style>{`
        @keyframes ns-throbber-spin { to { transform: rotate(360deg); } }
        @keyframes ns-n-pulse {
          0%, 100% { filter: drop-shadow(0 0 1px #7fff00); transform: scale(1); }
          50% { filter: drop-shadow(0 0 6px #00ff88); transform: scale(1.05); }
        }
        @keyframes ns-meteor-slide {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-10px, 8px); opacity: 0.3; }
        }
        @keyframes ns-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.35; } }
        @keyframes ns-float-a {
          0%, 100% { transform: translateY(0) rotate(-1.2deg); }
          50% { transform: translateY(-6px) rotate(-0.8deg); }
        }
        @keyframes ns-float-b {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(1.3deg); }
        }
        @keyframes ns-float-c {
          0%, 100% { transform: translateY(0) rotate(0.6deg); }
          50% { transform: translateY(-7px) rotate(0.2deg); }
        }
        @keyframes ns-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .netscape-exe-root .ns-logo-wrap { animation: ns-n-pulse 2.2s ease-in-out infinite; }
        .netscape-exe-root .ns-meteor { animation: ns-meteor-slide 1.8s ease-in-out infinite alternate; }
        .netscape-exe-root .ns-throbber {
          width: 18px; height: 18px;
          border: 2px solid #333; border-top-color: #7fff00; border-radius: 50%;
          animation: ns-throbber-spin 0.7s linear infinite;
        }
        .netscape-exe-root .ns-new-mail { animation: ns-blink 1.1s step-end infinite; }
        .netscape-exe-root .ns-sat-a { animation: ns-float-a 5s ease-in-out infinite; }
        .netscape-exe-root .ns-sat-b { animation: ns-float-b 5.5s ease-in-out infinite; animation-delay: 0.4s; }
        .netscape-exe-root .ns-sat-c { animation: ns-float-c 6s ease-in-out infinite; animation-delay: 0.8s; }
        .netscape-exe-root .ns-scanlines {
          pointer-events: none;
          position: fixed; inset: 0; z-index: 5; opacity: 0.06;
          background: repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px);
        }
        .netscape-exe-root .ns-marquee-inner {
          display: inline-block; white-space: nowrap;
          animation: ns-marquee 28s linear infinite;
        }
      `}</style>

      <div className="ns-scanlines" aria-hidden />

      {/* Desktop shortcut */}
      <div
        className="pointer-events-none absolute left-3 top-3 z-[1] flex select-none flex-col items-center gap-1 text-center sm:left-5 sm:top-5"
        style={{ textShadow: '1px 1px 0 #000' }}
      >
        <span className="text-3xl" aria-hidden>🦎</span>
        <span className="max-w-[5.5rem] text-[10px] font-bold leading-tight text-white">Netscape Navigator</span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-3 px-2 pt-14 sm:px-4 sm:pt-10">
        {/* Main Communicator window */}
        <div
          className="flex min-h-0 flex-1 flex-col overflow-hidden shadow-[6px_6px_0_rgba(0,0,0,0.35)]"
          style={{ ...raised, background: GRAY, minHeight: 'min(72vh, 640px)' }}
        >
          {/* Title bar — Netscape green */}
          <div
            className="flex shrink-0 items-center justify-between gap-2 px-1 py-0.5"
            style={{
              background: `linear-gradient(90deg, ${NS_GREEN} 0%, ${NS_GREEN_HI} 55%, #2d8f5a 100%)`,
              borderBottom: `1px solid ${DARK}`,
            }}
          >
            <div className="flex min-w-0 items-center gap-1.5 pl-1">
              <span className="ns-logo-wrap inline-flex shrink-0">
                <NetscapeLogo />
              </span>
              <span className="truncate text-xs font-bold text-white" style={{ textShadow: '1px 1px 0 #0006' }}>
                Netscape Mail — Inbox (1) — Mozilla/4.7 [en] (Win95; I)
              </span>
            </div>
            <div className="flex shrink-0 gap-0.5">
              {['_', '□', '✕'].map(sym => (
                <button
                  key={sym}
                  type="button"
                  style={{ ...raised, width: 16, height: 14, fontSize: '0.65rem', lineHeight: 1, padding: 0, background: GRAY }}
                  className="flex items-center justify-center font-bold text-black"
                  onClick={sym === '✕' ? onSwitchPersona : undefined}
                  aria-label={sym === '✕' ? 'Close' : sym === '□' ? 'Maximize' : 'Minimize'}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div
            className="flex flex-wrap gap-0 border-b border-[#808080] bg-[#c0c0c0] px-1 py-0.5 text-[11px] text-black"
            style={{ fontFamily: F }}
          >
            {['File', 'Edit', 'View', 'Go', 'Message', 'Communicator', 'Window', 'Help'].map(m => (
              <span key={m} className="cursor-default px-1.5 py-0.5 hover:bg-[#000080] hover:text-white">
                {m}
              </span>
            ))}
          </div>

          {/* Toolbar */}
          <div
            className="flex flex-wrap items-center gap-1 border-b border-[#808080] bg-[#d4d4d4] px-1 py-1"
            style={{ fontFamily: F }}
          >
            {[
              ['◀', 'Back'],
              ['▶', 'Forward'],
              ['⌂', 'Home'],
              ['✕', 'Stop'],
              ['↻', 'Reload'],
            ].map(([icon, label]) => (
              <button
                key={label}
                type="button"
                style={{ ...raised, background: GRAY, fontSize: '10px', padding: '2px 6px' }}
                className="flex flex-col items-center leading-none text-black"
              >
                <span className="text-sm">{icon}</span>
                <span className="opacity-80">{label}</span>
              </button>
            ))}
            <div className="mx-1 h-6 w-px bg-[#808080]" aria-hidden />
            <div className="ns-throbber" title="Receiving…" aria-hidden />
            <span className="text-[10px] text-[#333]">Working…</span>
            <div className="ml-auto flex items-center gap-2 pr-1">
              <span className="rounded border border-amber-700 bg-amber-100 px-1 text-[9px] font-bold text-amber-950" title="Security">
                🔑 40-bit
              </span>
              <button type="button" className="btn btn-xs btn-neutral border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600" onClick={onSwitchPersona}>
                Exit
              </button>
            </div>
          </div>

          {/* Location / mailbox URL */}
          <div className="flex items-center gap-2 border-b border-[#808080] bg-[#c0c0c0] px-2 py-1 text-[11px]" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
            <span className="shrink-0 text-[#333]" style={{ fontFamily: F }}>Location:</span>
            <div className="min-w-0 flex-1 truncate bg-white px-1 py-0.5 text-[#000080]" style={{ ...sunken }}>
              mailbox://{unread > 0 ? 'YOUVE_GOT_MAIL' : 'all_read'}@dialup-04.netscape.net/Inbox
            </div>
          </div>

          {/* Marquee plug strip */}
          <div className="overflow-hidden border-b border-[#606060] bg-[#1a1a2e] py-0.5 text-[10px] font-bold tracking-wide text-[#7fff00]">
            <div className="ns-marquee-inner">
              NETCENTER · GET NETSCAPE GOLD · FREE PLUGINS · BEST VIEWED IN NETSCAPE · UNDER CONSTRUCTION ·
              NETCENTER · GET NETSCAPE GOLD · FREE PLUGINS · BEST VIEWED IN NETSCAPE · UNDER CONSTRUCTION ·
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden sm:flex-row">
            {/* Folder tree */}
            <div
              className="w-full shrink-0 border-b border-[#808080] sm:w-[148px] sm:border-b-0 sm:border-r"
              style={{ background: '#ece9d8' }}
            >
              <div className="px-2 py-1 text-[9px] font-bold uppercase text-[#555]">Mailboxes</div>
              {[
                { id: 'inbox', icon: '📥', label: 'Inbox', extra: unread > 0 ? `(${unread} new)` : '' },
                { id: 'sent', icon: '📤', label: 'Sent', extra: '' },
                { id: 'trash', icon: '🗑', label: 'Trash', extra: '' },
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => { setFolder(f.id); setSelectedEmail(null) }}
                  className="flex w-full items-center justify-between px-2 py-1 text-left text-[11px]"
                  style={{
                    fontFamily: F,
                    background: folder === f.id ? '#000080' : 'transparent',
                    color: folder === f.id ? '#fff' : '#000',
                  }}
                >
                  <span>
                    {f.icon} {f.label}{' '}
                    {f.id === 'inbox' && unread > 0 && (
                      <span className="ns-new-mail font-bold text-[#ff6600]">{f.extra}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Message list */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
              <div className="shrink-0 border-b border-[#ccc] bg-[#e8e8e8] px-2 py-1 text-[10px] font-bold text-[#333]">
                Messages — {folder === 'inbox' ? 'Inbox' : folder === 'sent' ? 'Sent (empty)' : 'Trash (empty)'}
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                {folder !== 'inbox' ? (
                  <p className="m-0 p-4 text-[12px] text-[#666]">This folder is empty. The 90s were simpler.</p>
                ) : (
                  <table className="w-full border-collapse text-left text-[11px]" style={{ fontFamily: F }}>
                    <thead>
                      <tr className="bg-[#d8d8d8] text-[#222]">
                        <th className="border border-[#aaa] px-1 py-0.5 font-semibold">!</th>
                        <th className="border border-[#aaa] px-1 py-0.5 font-semibold">From</th>
                        <th className="border border-[#aaa] px-1 py-0.5 font-semibold">Subject</th>
                        <th className="border border-[#aaa] px-1 py-0.5 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emails.map(e => (
                        <tr
                          key={e.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedEmail(e)}
                          onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') setSelectedEmail(e) }}
                          className="cursor-pointer hover:bg-[#b5d5ff]"
                          style={{ fontWeight: e.read ? 400 : 700, background: selectedEmail?.id === e.id ? '#316ac5' : undefined, color: selectedEmail?.id === e.id ? '#fff' : '#000' }}
                        >
                          <td className="border border-[#ddd] px-1 py-0.5">{e.read ? '' : '●'}</td>
                          <td className="max-w-[100px] truncate border border-[#ddd] px-1 py-0.5 sm:max-w-[140px]">
                            {e.from.avatar} {e.from.name}
                          </td>
                          <td className="border border-[#ddd] px-1 py-0.5">{e.subject}</td>
                          <td className="whitespace-nowrap border border-[#ddd] px-1 py-0.5">{e.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div
            className="flex shrink-0 items-center gap-2 border-t-2 border-white bg-[#c0c0c0] px-2 py-0.5 text-[10px] text-black"
            style={{ ...sunken, borderTopWidth: 2, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }}
          >
            <span className="min-w-0 flex-1 truncate" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
              {STATUS_LINES[statusIdx]}
            </span>
            <span className="shrink-0 border border-[#888] bg-[#e0e0e0] px-1">POP3</span>
            <span className="shrink-0 border border-[#888] bg-[#e0e0e0] px-1">Ln 1, Col 1</span>
          </div>
        </div>

        {/* Satellite “browser” windows — weather, stocks, news */}
        <div className="relative grid min-h-[200px] grid-cols-1 gap-4 pb-8 sm:grid-cols-3 sm:pb-4">
          <div className="ns-sat-a relative z-[3] mx-auto w-full max-w-sm sm:mx-0">
            <MiniSatelliteWindow title="Weather.net — Netscape" icon="⛅" tilt="-rotate-1">
              <div className="p-2 text-[11px]" style={{ fontFamily: F }}>
                <p className="m-0 text-center text-lg leading-none">
                  {weather.icon} <strong>{weather.temp}°C</strong>
                </p>
                <p className="m-0 mt-1 text-center text-[#333]">{weather.city} — {weather.condition}</p>
                <p className="m-0 mt-2 text-[9px] text-[#666]">Humidity {weather.humidity}% · Wind {weather.wind} km/h</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {weather.forecast.slice(0, 5).map(d => (
                    <div key={d.day} className="border border-[#aaa] bg-[#f5f5f5] px-1.5 py-1 text-center text-[9px]">
                      <div className="font-bold">{d.day}</div>
                      <div>{d.icon}</div>
                      <div>{d.high}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </MiniSatelliteWindow>
          </div>

          <div className="ns-sat-b relative z-[2] mx-auto w-full max-w-sm sm:-mt-2 sm:mx-0">
            <MiniSatelliteWindow title="Quote.com — Stock ticker" icon="📈" tilt="rotate-1">
              <div className="space-y-1.5 p-2 text-[10px]" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
                {stocks.map(s => (
                  <div
                    key={s.ticker}
                    className="flex items-center justify-between gap-1 border border-[#063] bg-[#001a0a] px-1 py-1 text-[#00ff88]"
                  >
                    <span className="font-bold text-[#7fff00]">{s.ticker}</span>
                    <span>{s.currency}{s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    <span className={s.changePct >= 0 ? 'text-[#00ff66]' : 'text-[#ff6666]'}>
                      {s.changePct >= 0 ? '+' : ''}{s.changePct}%
                    </span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#00ff88' : '#ff4466'} />
                  </div>
                ))}
                <p className="m-0 text-[8px] text-[#668866]">Delayed 20 min · Y2K compliant</p>
              </div>
            </MiniSatelliteWindow>
          </div>

          <div className="ns-sat-c relative z-[1] mx-auto w-full max-w-sm sm:mx-0">
            <MiniSatelliteWindow title="Netcenter News" icon="📰" tilt="-rotate-2">
              <ul className="m-0 max-h-[180px] list-none space-y-1 overflow-y-auto p-2 text-[10px]" style={{ fontFamily: F }}>
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-[#006633] bg-[#f8fff8] pl-2 leading-snug">
                    <span className="text-base">{n.emoji}</span>{' '}
                    <strong className="text-[#004422]">[{n.category}]</strong> {n.title}
                    <span className="block text-[9px] text-[#666]">{n.source} · {n.time}</span>
                  </li>
                ))}
              </ul>
            </MiniSatelliteWindow>
          </div>
        </div>
      </div>

      {/* Email modal — classic dialog */}
      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-hidden shadow-[8px_8px_0_#00000088]"
            style={{ ...raised, background: GRAY }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ns-msg-title"
          >
            <div
              className="flex items-center justify-between px-1 py-0.5"
              style={{ background: `linear-gradient(90deg, ${NS_GREEN} 0%, ${NS_GREEN_HI} 100%)` }}
            >
              <span id="ns-msg-title" className="truncate pl-1 text-xs font-bold text-white">
                Message — {selectedEmail.subject}
              </span>
              <button
                type="button"
                style={{ ...raised, width: 16, height: 14, background: GRAY, fontSize: '0.7rem' }}
                className="font-bold"
                onClick={() => setSelectedEmail(null)}
                aria-label="Close message"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[calc(85vh-2.5rem)] overflow-y-auto bg-white p-3 text-[12px] text-black" style={{ fontFamily: F }}>
              <p className="m-0 text-[10px] text-[#666]">
                From: <strong>{selectedEmail.from.name}</strong> &lt;{selectedEmail.from.email}&gt;
              </p>
              <p className="m-0 text-[10px] text-[#666]">Date: {selectedEmail.date} {selectedEmail.time}</p>
              <hr className="my-2 border-[#ccc]" />
              <pre className="m-0 whitespace-pre-wrap font-sans text-[12px] leading-relaxed">{selectedEmail.body}</pre>
              <div className="mt-4 flex gap-2">
                <button type="button" className="btn btn-sm btn-neutral border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600" onClick={() => setSelectedEmail(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-sm btn-ghost text-[11px]" onClick={() => setSelectedEmail(null)}>
                  Reply (not implemented in 1998)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MiniSatelliteWindow({ title, icon, tilt, children }) {
  return (
    <div className={`${tilt} shadow-[4px_4px_0_rgba(0,0,0,0.25)]`} style={{ ...raised, background: GRAY }}>
      <div
        className="flex items-center justify-between gap-1 px-1 py-0.5"
        style={{ background: `linear-gradient(90deg, #1e3a5f 0%, #3b5b8c 100%)` }}
      >
        <span className="truncate text-[10px] font-bold text-white">
          {icon} {title}
        </span>
        <span className="flex gap-0.5">
          {['_', '✕'].map(sym => (
            <span
              key={sym}
              className="flex h-3 w-3 items-center justify-center bg-[#c0c0c0] text-[8px] font-bold text-black"
              style={{ ...raised }}
            >
              {sym}
            </span>
          ))}
        </span>
      </div>
      <div className="max-h-[220px] overflow-hidden bg-white">{children}</div>
    </div>
  )
}
