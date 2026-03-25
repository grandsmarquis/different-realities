import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function BlockySpark({ series, up }) {
  if (!series?.length) return null
  const last = 12
  const slice = series.slice(-last)
  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const r = max - min || 1
  const barW = 6
  const gap = 2
  const h = 32
  return (
    <svg width={slice.length * (barW + gap)} height={h} aria-hidden className="shrink-0 [image-rendering:pixelated]">
      {slice.map((v, i) => {
        const bh = Math.max(2, ((v - min) / r) * (h - 4))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - bh}
            width={barW}
            height={bh}
            fill={up ? '#6ee7a8' : '#f87171'}
          />
        )
      })}
    </svg>
  )
}

export default function PixelArtLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="pixel-crt-flicker relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        fontFamily: 'var(--font-main)',
        background: 'repeating-linear-gradient(0deg, #0f380f 0px, #0f380f 2px, #0a2f0a 2px, #0a2f0a 4px)',
        color: '#9bbc0f',
        imageRendering: 'pixelated',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-2 pt-4">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-2 border-4 border-[#306230] bg-[#8bac0f] p-2 text-[#0f380f] shadow-[4px_4px_0_#0f380f]">
          <h1 className="m-0 text-sm md:text-base" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
            ▶ INBOX QUEST
          </h1>
          <div className="flex gap-2">
            <span className="border-2 border-[#0f380f] bg-[#0f380f] px-2 py-1 text-[10px] text-[#9bbc0f]">HP {100 - emails.filter(e => !e.read).length * 3}</span>
            <button type="button" className="border-2 border-[#0f380f] bg-[#9bbc0f] px-2 py-1 text-[10px] font-bold hover:bg-[#ffd700]" onClick={onSwitchPersona}>
              SAVE+QUIT
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-12">
          <main className="lg:col-span-7">
            <div className="border-4 border-[#306230] bg-[#0f380f] p-2 shadow-[4px_4px_0_#306230]">
              <p className="m-0 mb-2 text-[10px] text-[#8bac0f]">ITEMS FOUND: {emails.length}</p>
              <div className="space-y-2">
                {emails.map((e, i) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="flex w-full items-start gap-2 border-4 border-[#306230] bg-[#1a4d1a] p-2 text-left transition hover:border-[#8bac0f] hover:bg-[#245024]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center border-2 border-[#9bbc0f] bg-[#0f380f] text-lg">{e.from.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-[10px] text-[#8bac0f]">LV.{i + 1} {e.from.name}</p>
                      <p className={`m-0 text-xs ${e.read ? 'text-[#9bbc0f]' : 'text-[#ffd700]'}`}>{e.subject}</p>
                    </div>
                    {!e.read && <span className="badge badge-warning badge-xs font-mono">NEW</span>}
                  </button>
                ))}
              </div>
            </div>
          </main>

          <aside className="space-y-3 lg:col-span-5">
            <div className="border-4 border-[#306230] bg-[#0f380f] p-3 shadow-[4px_4px_0_#306230]">
              <p className="m-0 text-[10px] text-[#8bac0f]">WORLD · WEATHER</p>
              <p className="m-0 mt-2 text-lg">
                {weather.icon} {weather.temp}C
              </p>
              <p className="m-0 text-[10px]">{weather.condition}</p>
            </div>

            <div className="border-4 border-[#306230] bg-[#0f380f] p-3 shadow-[4px_4px_0_#306230]">
              <p className="m-0 text-[10px] text-[#8bac0f]">GOLD / STOCKS</p>
              {stocks.map(s => (
                <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2 border-t-2 border-[#306230] pt-2 first:mt-0 first:border-t-0 first:pt-0">
                  <span className="font-mono text-xs">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-[#6ee7a8]' : 'text-[#f87171]'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  <BlockySpark series={s.series} up={s.changePct >= 0} />
                </div>
              ))}
            </div>

            <div className="border-4 border-[#306230] bg-[#0f380f] p-3 text-[10px] leading-relaxed shadow-[4px_4px_0_#306230]">
              <p className="m-0 text-[#8bac0f]">SCROLL · NEWS</p>
              {news.map(n => (
                <p key={n.id} className="m-0 mt-2 border-l-4 border-[#8bac0f] pl-2">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f380f]/95 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 border-[#9bbc0f] bg-[#1a4d1a] p-4 text-[#9bbc0f] shadow-[6px_6px_0_#306230]"
            onClick={e => e.stopPropagation()}
          >
            <p className="m-0 text-[10px]">MESSAGE LOG</p>
            <h2 className="m-0 mt-2 text-sm" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="m-0 text-[10px] opacity-80">{selectedEmail.from.name}</p>
            <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-sm mt-4 border-2 border-[#9bbc0f] bg-[#0f380f] text-[#9bbc0f]" onClick={() => setSelectedEmail(null)}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
