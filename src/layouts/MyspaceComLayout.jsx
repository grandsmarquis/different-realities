import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 108
  const h = 32
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

export default function MyspaceComLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const topFriends = emails.slice(0, 8)

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8 text-black"
      style={{ fontFamily: 'var(--font-main)', background: '#1a0a14' }}
    >
      <div className="myspace-glitter-bg pointer-events-none absolute inset-0 opacity-25 mix-blend-screen" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl px-3 pt-4">
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
          <div className="flex gap-4">
            <div className="size-28 shrink-0 overflow-hidden rounded border-4 border-pink-500 bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-inner">
              <div className="flex h-full items-center justify-center text-5xl">🎸</div>
            </div>
            <div>
              <h1 className="m-0 text-2xl font-bold text-fuchsia-700" style={{ fontFamily: 'var(--font-display)' }}>
                xX_darkInbox_Xx
              </h1>
              <p className="m-0 text-sm text-gray-600">Online now · mood: checking my messages</p>
              <p className="m-0 mt-1 text-xs text-gray-500">Tom is in your extended network (always)</p>
            </div>
          </div>
          <button type="button" className="btn btn-sm border-2 border-black bg-cyan-400 font-bold hover:bg-cyan-300" onClick={onSwitchPersona}>
            Log out
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="mb-2 rounded-t-lg border-2 border-b-0 border-black bg-pink-500 px-3 py-2 text-sm font-bold text-white">
              Comments · Bulletin · Inbox
            </div>
            <div className="space-y-3 rounded-b-lg border-2 border-black bg-white p-3">
              {emails.map(e => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="w-full rounded border-2 border-pink-300 bg-gradient-to-r from-pink-50 to-purple-50 p-3 text-left transition hover:border-fuchsia-500"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{e.from.avatar}</span>
                    <div>
                      <span className="font-bold text-fuchsia-800">{e.from.name}</span>
                      <span className="text-xs text-gray-500"> · {e.date}</span>
                    </div>
                    {!e.read && <span className="badge badge-error badge-sm">NEW</span>}
                  </div>
                  <p className={`m-0 mt-1 text-sm ${e.read ? 'text-gray-700' : 'font-bold text-gray-900'}`}>{e.subject}</p>
                  <p className="m-0 mt-1 line-clamp-2 text-xs text-gray-600">{e.preview}</p>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-lg border-2 border-black bg-black p-2 text-white">
              <p className="m-0 text-center text-[10px] uppercase tracking-widest text-pink-400">Now playing</p>
              <p className="m-0 mt-1 text-center text-sm font-bold">Auto-play sadness.mp3</p>
              <div className="mt-2 flex h-6 items-end justify-center gap-0.5">
                {[0.4, 0.9, 0.5, 1, 0.6, 0.85, 0.45].map((h, i) => (
                  <span key={i} className="w-1.5 rounded-t bg-gradient-to-t from-fuchsia-600 to-pink-400" style={{ height: `${h * 100}%`, animation: `pulse ${0.4 + i * 0.08}s ease-in-out infinite` }} />
                ))}
              </div>
            </div>

            <div className="rounded-lg border-2 border-black bg-white p-3">
              <p className="m-0 text-xs font-bold text-fuchsia-700">Top 8 (messages)</p>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {topFriends.map((e, i) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="aspect-square rounded border-2 border-pink-400 bg-gradient-to-br from-yellow-100 to-pink-200 text-lg hover:ring-2 hover:ring-fuchsia-500"
                    title={e.subject}
                  >
                    {e.from.avatar}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border-2 border-black bg-cyan-100 p-3">
              <p className="m-0 text-xs font-bold">Weather (default)</p>
              <p className="m-0 mt-1 text-lg">
                {weather.icon} {weather.temp}° · {weather.city}
              </p>
            </div>

            <div className="rounded-lg border-2 border-black bg-purple-900 p-3 text-white">
              <p className="m-0 text-xs font-bold text-pink-300">Stonks on my profile</p>
              {stocks.map(s => (
                <div key={s.ticker} className="mt-2 flex items-center justify-between gap-2 border-t border-purple-700 pt-2 first:mt-0 first:border-t-0 first:pt-0">
                  <span className="font-mono text-sm">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-green-400' : 'text-red-400'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#fb7185'} />
                </div>
              ))}
            </div>

            <div className="rounded-lg border-2 border-dashed border-fuchsia-600 bg-yellow-50 p-3 text-xs">
              {news.map(n => (
                <p key={n.id} className="m-0 mb-2 border-b border-pink-200 pb-2 last:mb-0 last:border-0 last:pb-0">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedEmail(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border-4 border-pink-500 bg-white p-5 shadow-[8px_8px_0_#000]" onClick={e => e.stopPropagation()}>
            <p className="m-0 text-xs text-fuchsia-600">Read comment</p>
            <h2 className="m-0 mt-1 text-xl font-bold">{selectedEmail.subject}</h2>
            <p className="text-sm text-gray-600">{selectedEmail.from.name}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm">{selectedEmail.body}</p>
            <button type="button" className="btn btn-primary btn-sm mt-4" onClick={() => setSelectedEmail(null)}>
              kthxbye
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
