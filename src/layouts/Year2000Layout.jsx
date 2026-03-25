import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const TABS = [
  { id: 'mail', label: 'HotMail™', emoji: '💌', sub: 'You\'ve got messages!' },
  { id: 'wx', label: 'Weather.exe', emoji: '☀️', sub: `${weather.city} — local 56K forecast` },
  { id: 'news', label: 'HeadlineZ', emoji: '📰', sub: 'Breaking on the Information Superhighway' },
  { id: 'stox', label: 'NASDAQ-ish', emoji: '📈', sub: 'Paper trade like it\'s a dot-com IPO' },
]

function Sparkline({ series, up }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 56
  const h = 20
  const p = 1
  const r = max - min || 1
  const stroke = up ? '#00ffaa' : '#ff44aa'
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} className="shrink-0 opacity-95" aria-hidden>
      <polyline fill="none" stroke={stroke} strokeWidth="1.2" points={pts} />
    </svg>
  )
}

export default function Year2000Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [tab, setTab] = useState('mail')
  const [hits, setHits] = useState(90210)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setHits((h) => h + Math.floor(Math.random() * 3)), 4000)
    return () => clearInterval(t)
  }, [])

  const ticker = useMemo(
    () =>
      stocks
        .map((s) => {
          const up = s.change >= 0
          const arrow = up ? '▲' : '▼'
          return `${s.ticker} ${s.currency}${s.price.toFixed(2)} ${arrow} ${Math.abs(s.changePct).toFixed(2)}%`
        })
        .join('   ★   '),
    []
  )

  const timeStr = now.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' })
  const current = TABS.find((t) => t.id === tab) ?? TABS[0]

  return (
    <div
      className="y2k-root relative min-h-full overflow-x-hidden px-2 py-3 pb-16 sm:px-4 sm:py-5 sm:pb-20"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'linear-gradient(165deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 78%, #e94560 100%)',
      }}
    >
      <style>{`
        @keyframes y2k-mesh {
          0%, 100% { opacity: 0.45; transform: scale(1) rotate(0deg); }
          33% { opacity: 0.65; transform: scale(1.08) rotate(2deg); }
          66% { opacity: 0.5; transform: scale(1.03) rotate(-1.5deg); }
        }
        @keyframes y2k-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -18px) scale(1.05); }
        }
        @keyframes y2k-float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-16px, 10px); }
        }
        @keyframes y2k-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes y2k-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes y2k-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes y2k-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes y2k-wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .y2k-root .y2k-bubble-a {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(0,255,255,0.12) 45%, transparent 70%);
          filter: blur(0.5px);
          animation: y2k-float 8s ease-in-out infinite;
        }
        .y2k-root .y2k-bubble-b {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle at 70% 40%, rgba(255,0,200,0.2), rgba(100,200,255,0.15) 50%, transparent 65%);
          animation: y2k-float2 11s ease-in-out infinite;
        }
        .y2k-root .y2k-mesh-layer {
          pointer-events: none; position: fixed; inset: -20%;
          background:
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(0,255,255,0.12), transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(255,0,180,0.1), transparent 45%),
            radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255,255,0,0.08), transparent 40%);
          animation: y2k-mesh 14s ease-in-out infinite;
        }
        .y2k-root .y2k-title-shimmer {
          background: linear-gradient(90deg, #fff 0%, #00ffff 25%, #ff00cc 50%, #ffff00 75%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: y2k-shimmer 4s linear infinite;
        }
        .y2k-root .y2k-new { animation: y2k-blink 1s step-end infinite; }
        .y2k-root .y2k-seal { animation: y2k-spin-slow 24s linear infinite; }
        .y2k-root .y2k-ticker-track {
          overflow: hidden; white-space: nowrap;
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
        .y2k-root .y2k-ticker-inner {
          display: inline-block; padding-left: 100%;
          animation: y2k-ticker 32s linear infinite;
        }
        .y2k-root .y2k-ie-btn:active { transform: translate(1px, 1px); }
      `}</style>

      <div className="y2k-mesh-layer" aria-hidden />
      <div className="y2k-bubble-a left-[5%] top-[12%] h-32 w-32 sm:h-40 sm:w-40" aria-hidden />
      <div className="y2k-bubble-b right-[8%] top-[22%] h-24 w-24 sm:h-36 sm:w-36" aria-hidden />
      <div className="y2k-bubble-a bottom-[28%] left-[15%] h-20 w-20 opacity-70" style={{ animationDelay: '-3s' }} aria-hidden />
      <div className="y2k-bubble-b bottom-[20%] right-[12%] h-28 w-28 opacity-60" style={{ animationDelay: '-5s' }} aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* IE-ish window */}
        <div
          className="overflow-hidden rounded-t-lg border-2 border-[#0a2463] shadow-2xl"
          style={{
            boxShadow: '4px 4px 0 rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
            background: 'linear-gradient(180deg, #3168d5 0%, #1941a5 100%)',
          }}
        >
          <div className="flex items-center gap-2 px-2 py-1.5 sm:px-3">
            <span className="text-lg" aria-hidden>🌐</span>
            <span className="truncate text-xs font-bold tracking-wide text-white drop-shadow-sm sm:text-sm">
              Millennium Portal — Microsoft Internet Explorer
            </span>
            <span className="ml-auto flex gap-1">
              <span className="y2k-ie-btn flex h-5 w-5 items-center justify-center border border-[#0a2463] bg-[#c0c0c0] text-[10px] font-bold text-black shadow-sm">_</span>
              <span className="y2k-ie-btn flex h-5 w-5 items-center justify-center border border-[#0a2463] bg-[#c0c0c0] text-[10px] font-bold text-black shadow-sm">□</span>
              <span className="y2k-ie-btn flex h-5 w-5 items-center justify-center border border-[#0a2463] bg-[#c0c0c0] text-[10px] font-bold text-red-700 shadow-sm">×</span>
            </span>
          </div>
          <div
            className="border-t-2 border-white/30 bg-[#c0c0c0] px-2 py-1.5 sm:px-3"
            style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}
          >
            <div className="mb-1 flex flex-wrap items-center gap-1 text-[10px] text-gray-800 sm:text-xs">
              <span className="rounded border border-gray-500 bg-white px-1.5 py-0.5">File</span>
              <span className="rounded border border-gray-500 bg-white px-1.5 py-0.5">Edit</span>
              <span className="rounded border border-gray-500 bg-white px-1.5 py-0.5">View</span>
              <span className="rounded border border-gray-500 bg-white px-1.5 py-0.5">Favorites</span>
              <span className="rounded border border-gray-500 bg-white px-1.5 py-0.5">Help</span>
            </div>
            <div className="flex items-center gap-1 border-2 border-[#808080] bg-white px-1 py-0.5 shadow-inner">
              <span className="text-[10px] text-gray-500">Address</span>
              <span className="min-w-0 flex-1 truncate text-[10px] text-blue-800 sm:text-xs">
                http://www.millennium-portal.net/home.asp?Y2K=1&amp;dpi=96
              </span>
              <span className="btn btn-xs h-6 min-h-0 rounded-none border border-gray-600 bg-[#e0e0e0] px-2 text-[10px] normal-case text-gray-800">
                Go
              </span>
            </div>
          </div>
        </div>

        <div
          className="rounded-b-lg border-2 border-t-0 border-[#0a2463] bg-gradient-to-b from-[#eefaff] via-[#ffe8f8] to-[#e8f4ff] p-3 shadow-xl sm:p-4"
          style={{ boxShadow: '4px 8px 0 rgba(0,0,0,0.2)' }}
        >
          <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="y2k-title-shimmer text-2xl font-black tracking-tight sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                WELCOME 2 THE YEAR 2000
              </h1>
              <p className="mt-1 text-xs text-[#4a0080] sm:text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Best experienced at 800×600 • 256 colors • speakers on for MIDI later
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="y2k-seal relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#00ffcc] bg-gradient-to-br from-[#330066] to-[#6600cc] text-[8px] font-bold leading-tight text-cyan-200 shadow-lg sm:h-16 sm:w-16"
                title="Y2K compliant (probably)"
              >
                <span className="text-center">Y2K<br />OK</span>
              </div>
              <div className="rounded-lg border-2 border-[#ff00aa] bg-black/80 px-3 py-1.5 font-mono text-[10px] text-[#00ffaa] shadow-[0_0_12px_rgba(0,255,170,0.4)] sm:text-xs">
                <div>Server time: {timeStr}</div>
                <div>
                  Visitors: <span className="text-[#ffff00]">{hits.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`btn btn-sm gap-1 rounded-full border-2 normal-case transition-all sm:btn-md ${
                  tab === t.id
                    ? 'border-[#00ffff] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white shadow-[0_0_16px_rgba(0,255,255,0.5)]'
                    : 'border-[#9966cc] bg-white/90 text-[#330066] hover:bg-white'
                }`}
                style={{ animation: tab === t.id ? 'y2k-wiggle 2s ease-in-out infinite' : undefined }}
              >
                <span>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>

          <p className="mb-3 text-xs italic text-[#553388]" style={{ fontFamily: 'Georgia, serif' }}>
            {current.emoji} {current.sub}
          </p>

          <div
            className="min-h-[220px] rounded-xl border-4 border-double border-[#cc00ff] bg-white/95 p-3 shadow-inner sm:min-h-[260px] sm:p-4"
            style={{
              boxShadow: 'inset 0 0 30px rgba(255,0,200,0.08), 0 4px 0 #9933ff',
            }}
          >
            {tab === 'mail' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b-2 border-dashed border-fuchsia-400 pb-2">
                  <span className="font-bold text-fuchsia-700" style={{ fontFamily: 'var(--font-display)' }}>
                    Inbox ({emails.length})
                  </span>
                  <span className="y2k-new text-xs font-bold text-red-600">● NEW MAIL</span>
                </div>
                <ul className="space-y-1.5">
                  {emails.map((e) => (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className="btn btn-ghost h-auto min-h-0 w-full flex-col items-stretch gap-0.5 rounded-lg border border-transparent bg-gradient-to-r from-cyan-50/80 to-fuchsia-50/80 px-2 py-2 text-left normal-case hover:border-secondary hover:from-cyan-100 hover:to-fuchsia-100"
                      >
                        <div className="flex w-full items-center gap-2">
                          <span className="text-lg">{e.from.avatar}</span>
                          <span className="min-w-0 flex-1 truncate font-bold text-gray-800">{e.from.name}</span>
                          {!e.read && <span className="badge badge-secondary badge-xs shrink-0">unread</span>}
                        </div>
                        <div className="truncate pl-8 text-xs text-gray-600">{e.subject}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'wx' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div
                  className="rounded-lg border-2 border-cyan-400 bg-gradient-to-br from-sky-100 to-cyan-200 p-3 text-center shadow-md"
                  style={{ fontFamily: 'Tahoma, sans-serif' }}
                >
                  <div className="text-5xl sm:text-6xl">{weather.icon}</div>
                  <div className="mt-1 text-2xl font-black text-sky-900">{weather.temp}°C</div>
                  <div className="text-sm text-sky-800">Feels like {weather.feels_like}°C</div>
                  <div className="mt-2 font-bold text-purple-900">{weather.condition}</div>
                  <div className="text-xs text-gray-600">
                    {weather.city}, {weather.country}
                  </div>
                </div>
                <div className="space-y-2 text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                  <div className="rounded border-2 border-gray-400 bg-[#ffffcc] p-2 text-gray-800">
                    <strong>Humidity:</strong> {weather.humidity}% • <strong>Wind:</strong> {weather.wind} km/h
                  </div>
                  <p className="text-xs text-purple-800">
                    Forecast powered by your imagination and a 28.8K modem handshake. Results may take up to 45 seconds
                    per pixel.
                  </p>
                  <ul className="grid grid-cols-2 gap-1 sm:grid-cols-1">
                    {weather.forecast.map((d) => (
                      <li
                        key={d.day}
                        className="flex items-center justify-between rounded bg-white/80 px-2 py-1 text-xs ring-1 ring-fuchsia-300"
                      >
                        <span className="font-bold">{d.day}</span>
                        <span>{d.icon}</span>
                        <span>
                          {d.high}° / {d.low}°
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === 'news' && (
              <ul className="space-y-2">
                {news.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-lg border-l-4 border-[#ff6600] bg-gradient-to-r from-orange-50 to-yellow-50 p-2 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-orange-700">
                      <span className="badge badge-warning badge-xs">{n.source}</span>
                      <span>{n.category}</span>
                      <span className="opacity-70">{n.time}</span>
                    </div>
                    <div className="mt-1 flex gap-2">
                      <span className="text-xl">{n.emoji}</span>
                      <p className="text-sm font-bold leading-snug text-gray-900">{n.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {tab === 'stox' && (
              <div className="space-y-2">
                <p className="text-center text-xs text-fuchsia-800" style={{ fontFamily: 'Georgia, serif' }}>
                  Stonks before stonks were invented. Past performance is not indicative of your Tamagotchi surviving.
                </p>
                <ul className="space-y-2">
                  {stocks.map((s) => {
                    const up = s.change >= 0
                    return (
                      <li
                        key={s.ticker}
                        className="flex items-center gap-2 rounded-lg border-2 border-[#00aaaa] bg-black/90 px-2 py-2 text-[#00ffaa]"
                        style={{ fontFamily: 'var(--font-main)' }}
                      >
                        <Sparkline series={s.series} up={up} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#ffff66]">{s.ticker}</span>
                            <span className="truncate text-[10px] text-gray-400">{s.name}</span>
                          </div>
                          <div className="text-sm">
                            {s.currency}
                            {s.price.toFixed(2)}{' '}
                            <span className={up ? 'text-[#00ff88]' : 'text-[#ff4488]'}>
                              ({up ? '+' : ''}
                              {s.changePct.toFixed(2)}%)
                            </span>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t-2 border-dotted border-purple-400 pt-3">
            <button
              type="button"
              className="btn btn-secondary btn-sm gap-1 rounded-full border-2 border-[#330066] normal-case"
              onClick={onSwitchPersona}
            >
              🚪 Exit portal (pick another vibe)
            </button>
            <span className="text-[10px] text-purple-900 sm:text-xs" style={{ fontFamily: 'Courier New, monospace' }}>
              © 2000 Millennium Portal — All your base are belong to us (just kidding)
            </span>
          </div>
        </div>
      </div>

      {/* Stock ticker */}
      <div
        className="fixed bottom-[calc(3rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[90] border-y-2 border-[#00ffff] bg-black/90 py-1.5 text-xs text-[#00ffaa] shadow-[0_-4px_20px_rgba(0,255,255,0.25)] sm:bottom-[calc(2.75rem+env(safe-area-inset-bottom,0px))]"
        style={{ fontFamily: 'var(--font-main)' }}
      >
        <div className="y2k-ticker-track">
          <div className="y2k-ticker-inner">
            {ticker}
            {'   ★   '}
            {ticker}
          </div>
        </div>
      </div>

      {selectedEmail && (
        <dialog className="modal modal-open z-[200]">
          <div
            className="modal-box max-h-[85dvh] max-w-lg overflow-y-auto border-4 border-[#00ffff] bg-gradient-to-b from-white to-cyan-50 shadow-[0_0_40px_rgba(255,0,255,0.35)]"
            style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-500">From</p>
                <p className="font-bold text-gray-900">
                  {selectedEmail.from.avatar} {selectedEmail.from.name}
                </p>
                <p className="text-xs text-blue-700">{selectedEmail.from.email}</p>
              </div>
              <button
                type="button"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Close"
                onClick={() => setSelectedEmail(null)}
              >
                ✕
              </button>
            </div>
            <h3 className="text-lg font-bold text-fuchsia-800">{selectedEmail.subject}</h3>
            <p className="mt-1 text-xs text-gray-500">
              {selectedEmail.date} · {selectedEmail.time}
            </p>
            <div className="divider my-2" />
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-gray-800">
              {selectedEmail.body}
            </pre>
            <div className="modal-action mt-4">
              <button type="button" className="btn btn-primary rounded-full" onClick={() => setSelectedEmail(null)}>
                Kthxbye
              </button>
            </div>
          </div>
          <button type="button" className="modal-backdrop bg-neutral/70" aria-label="Close" onClick={() => setSelectedEmail(null)} />
        </dialog>
      )}
    </div>
  )
}
