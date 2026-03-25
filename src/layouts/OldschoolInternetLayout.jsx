import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 100
  const h = 28
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

export default function OldschoolInternetLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const marqueeDup = ' ★ GEOCITIES 2001 ★ UNDER CONSTRUCTION FOREVER ★ BEST VIEWED IN NETSCAPE 4 ★ FREE COUNTERS ★ '
  return (
    <div
      className="min-h-dvh overflow-x-hidden pb-6"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'repeating-linear-gradient(0deg, #0a0a12 0px, #0a0a12 2px, #12121c 2px, #12121c 4px), radial-gradient(ellipse at 20% 0%, #1a1a3e 0%, transparent 50%), #050508',
        color: 'var(--text)',
      }}
    >
      <div className="overflow-hidden border-b-4 border-[#ff00aa] bg-black py-1 text-[#00ffcc]">
        <div className="oldschool-geocities-marquee text-xs font-bold tracking-wider">
          {marqueeDup}{marqueeDup}
        </div>
      </div>

      <header className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-dashed border-[#ffff00] bg-[#330066] px-4 py-3">
        <h1 className="m-0 text-lg font-bold text-[#ffff00]" style={{ fontFamily: 'var(--font-display)', textShadow: '2px 2px 0 #ff00ff' }}>
          ~*~ WELCOME 2 MY INBOX ~*~
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="rounded border-2 border-[#00ffff] bg-black px-2 py-1 text-[10px] text-[#00ff00]">
            HITS: {124902 + emails.length * 99}
          </span>
          <button type="button" className="btn btn-xs border-2 border-[#ffff00] bg-[#ff00aa] text-white hover:brightness-110" onClick={onSwitchPersona}>
            [EXIT WEBRING]
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 p-4 lg:grid-cols-12">
        <main className="space-y-4 lg:col-span-7">
          <div className="rotate-[0.5deg] border-4 border-[#00ffff] bg-[#000033] p-1 shadow-[6px_6px_0_#ff00ff]">
            <div className="border-2 border-[#ffff00] bg-[#111144] p-3">
              <p className="m-0 text-center text-[10px] text-[#ff99ff]">::: E-MAIL ZONE (NOT SPAM I PROMISE) :::</p>
              <div className="mt-3 space-y-2">
                {emails.map((e, i) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="group w-full border-2 border-[#00ff00] bg-black/60 p-2 text-left transition-transform hover:z-10 hover:scale-[1.02]"
                    style={{ transform: `rotate(${(i % 5) * 0.4 - 0.8}deg)` }}
                  >
                    <span className="text-xl">{e.from.avatar}</span>
                    <span className={`ml-2 text-sm ${e.read ? 'text-[#88ff88]' : 'font-bold text-[#ffff00]'}`}>{e.subject}</span>
                    <p className="m-0 mt-1 line-clamp-2 text-[10px] text-[#aaaaff]">{e.preview}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className="space-y-4 lg:col-span-5">
          <div className="-rotate-1 border-4 border-[#ff6600] bg-[#ffffcc] p-3 text-black shadow-[4px_4px_0_#000]">
            <p className="m-0 text-center font-bold text-[#cc0000]" style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem' }}>
              WEATHER.GIF
            </p>
            <p className="m-0 mt-2 text-center text-2xl">
              {weather.icon} {weather.temp}°C
            </p>
            <p className="m-0 text-center text-xs">{weather.condition}</p>
          </div>

          <div className="rotate-1 border-4 border-[#00ff00] bg-black p-3 font-mono text-[10px] text-[#00ff00]">
            <p className="m-0 mb-2 text-[#ffff00]">STOCKS.EXE (DO NOT DELETE)</p>
            {stocks.map(s => (
              <div key={s.ticker} className="mb-2 flex items-end justify-between gap-2 border-b border-[#004400] pb-2">
                <div>
                  <span className="text-[#00ffff]">{s.ticker}</span>{' '}
                  <span className={s.changePct >= 0 ? 'text-[#00ff00]' : 'text-[#ff4444]'}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                </div>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#00ff88' : '#ff4466'} />
              </div>
            ))}
          </div>

          <div className="border-4 border-double border-[#ffffff] bg-[#330033] p-3">
            <p className="m-0 text-[10px] font-bold text-[#ffcc00]">HOT LINKS (NEWS)</p>
            <ul className="m-0 mt-2 list-none space-y-2 p-0">
              {news.map(n => (
                <li key={n.id} className="text-xs leading-tight text-[#aaffff]">
                  <span className="text-base">{n.emoji}</span> {n.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center text-4xl">🔥💿✨🦎</div>
        </aside>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="max-h-[88vh] w-full max-w-lg overflow-y-auto border-8 border-[#00ffff] bg-[#ffffee] p-4 text-[#000080]"
            onClick={ev => ev.stopPropagation()}
          >
            <p className="m-0 text-[10px] font-bold text-[#ff00aa]">::: MESSAGE OPENED :::</p>
            <h2 className="mt-2 text-lg font-bold">{selectedEmail.subject}</h2>
            <p className="text-xs text-[#666]">
              FROM: {selectedEmail.from.name} · {selectedEmail.date}
            </p>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-sm mt-4 border-2 border-black bg-[#ff00ff] text-white" onClick={() => setSelectedEmail(null)}>
              [CLOSE WINDOW]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
