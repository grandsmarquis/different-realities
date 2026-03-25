import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

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
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.75" points={pts} />
    </svg>
  )
}

export default function DonaldDuckInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        backgroundColor: '#1e3a5f',
        backgroundImage: `
          radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0),
          linear-gradient(180deg, #2563eb 0%, #1e3a5f 45%, #172554 100%)`,
        backgroundSize: '8px 8px, 100% 100%',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="duck-speech-pop mb-6 flex flex-wrap items-start justify-between gap-4 rounded-3xl border-4 border-black bg-white px-5 py-4 shadow-[6px_6px_0_#000]">
          <div>
            <p className="m-0 text-xs font-black uppercase tracking-widest text-blue-600">QUACK · PARODY INBOX</p>
            <h1 className="m-0 mt-1 text-3xl font-black uppercase italic text-slate-900 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              Donald Duck inbox
            </h1>
            <p className="m-0 mt-2 max-w-xl text-sm font-bold text-slate-700">
              No pants, no problem — weather, stocks & news in comic panels.{' '}
              <span className="text-red-600">{emails.filter(e => !e.read).length}</span> letters making me ANGRY.
            </p>
          </div>
          <button type="button" className="btn rounded-full border-2 border-black bg-amber-400 font-black uppercase text-black hover:bg-amber-300" onClick={onSwitchPersona}>
            Calm down (home)
          </button>
        </header>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="duck-comic-panel rounded-2xl border-4 border-black bg-yellow-300 p-4 shadow-[4px_4px_0_#000]">
            <p className="m-0 text-[10px] font-black uppercase text-red-600">Panel A · Sky report</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-4xl">{weather.icon}</span>
              <div>
                <p className="m-0 font-black">{weather.condition}</p>
                <p className="m-0 text-xs font-bold">{weather.temp}°C</p>
              </div>
            </div>
            <p className="m-0 mt-2 rounded-lg border-2 border-black bg-white p-2 text-xs font-bold leading-tight">
              &ldquo;The weather is OUT TO GET ME!!&rdquo;
            </p>
          </div>
          <div className="duck-comic-panel rounded-2xl border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000] md:col-span-2">
            <p className="m-0 text-[10px] font-black uppercase text-blue-700">Panel B · Money go up/down (stocks)</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {stocks.map(s => (
                <div key={s.ticker} className="flex items-center justify-between gap-2 rounded-xl border-2 border-black bg-blue-50 px-2 py-1.5">
                  <span className="font-mono text-xs font-black">{s.ticker}</span>
                  <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#16a34a' : '#dc2626'} />
                  <span className={`text-xs font-black ${s.changePct >= 0 ? 'text-green-700' : 'text-red-600'}`}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <h2 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-amber-300">Speech bubble mail</h2>
            <div className="space-y-3">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                const wobble = !e.read
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-3xl border-4 border-black text-left shadow-[5px_5px_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_#000] ${wobble ? 'duck-tantrum' : ''} ${on ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-blue-900' : ''}`}
                    style={{ background: on ? '#fef08a' : '#fff' }}
                  >
                    <div className="relative p-4 pr-8">
                      <span className="absolute right-3 top-3 text-2xl opacity-40" aria-hidden>
                        💢
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-2xl">{e.from.avatar}</span>
                        {!e.read && <span className="badge border-2 border-black bg-red-500 font-black text-white">UNREAD RAGE</span>}
                      </div>
                      <p className="m-0 mt-2 font-black leading-snug text-slate-900">{e.subject}</p>
                      <p className="m-0 text-xs font-bold text-slate-600">{e.from.name}</p>
                      {on && (
                        <div className="mt-3 border-t-2 border-dashed border-black pt-3">
                          <p className="whitespace-pre-wrap text-sm font-semibold leading-relaxed text-slate-800">{e.body}</p>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </main>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border-4 border-black bg-red-500 p-4 text-white shadow-[5px_5px_0_#000]">
              <p className="m-0 text-[10px] font-black uppercase tracking-widest">Extra · News strips</p>
              <ul className="mt-3 space-y-2">
                {news.map(n => (
                  <li key={n.id} className="rounded-xl border-2 border-black bg-white p-2 text-xs font-black leading-snug text-slate-900">
                    <span>{n.emoji}</span> {n.title}
                  </li>
                ))}
              </ul>
            </div>
            <p className="duck-speech-pop mt-4 text-center text-5xl" aria-hidden>
              🦆
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
