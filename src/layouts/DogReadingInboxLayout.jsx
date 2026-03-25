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
  const h = 24
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

const dogTakes = [
  'Might be about walk?',
  'Smells like IMPORTANT',
  'Could be snack (probably not)',
  'Ball-related???',
  'Who is Good? (investigating)',
  'Tail situation: escalating',
  'Car ride clues',
  'Friend typed this maybe',
]

export default function DogReadingInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-28"
      style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(234, 179, 8, 0.04) 18px, rgba(234, 179, 8, 0.04) 19px), linear-gradient(170deg, #422006 0%, #713f12 40%, #1c1917 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-3 py-8 md:px-6">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-4 border-amber-600/50 pb-6">
          <div>
            <p className="dog-sniff-line m-0 inline-block text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
              POV · nose-first UI
            </p>
            <h1 className="m-0 mt-2 text-3xl text-amber-50 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              If a dog was reading the inbox
            </h1>
            <p className="m-0 mt-2 max-w-2xl text-sm text-amber-100/85">
              <span className="font-black text-amber-300">SQUIRREL</span> — just kidding. Weather + stocks + news, decoded for dogs.
              {' '}{emails.filter(e => !e.read).length} new smells in the pile.
            </p>
          </div>
          <button type="button" className="btn btn-warning font-bold text-warning-content" onClick={onSwitchPersona}>
            Hooman mode
          </button>
        </header>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="card border-2 border-amber-500/40 bg-amber-950/40 text-amber-50">
            <div className="card-body p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/90">Walk window (weather)</p>
              <p className="text-xs italic opacity-80">&ldquo;Sky says: go. Or don&apos;t. We go anyway.&rdquo;</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-4xl">{weather.icon}</span>
                <div>
                  <p className="m-0 font-bold">{weather.condition}</p>
                  <p className="m-0 text-sm">{weather.temp}°C · {weather.city}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-2 border-amber-500/40 bg-amber-950/40 text-amber-50 md:col-span-2">
            <div className="card-body p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/90">Treat economy (stocks)</p>
              <p className="text-xs italic opacity-80">&ldquo;Lines go up = more treats (citation needed).&rdquo;</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {stocks.map(s => (
                  <div key={s.ticker} className="flex items-center justify-between gap-2 rounded-lg bg-black/25 px-3 py-2 text-xs font-bold">
                    <span className="font-mono text-amber-200">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#fb923c'} />
                    <span className={s.changePct >= 0 ? 'text-lime-300' : 'text-orange-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-200">Smell mail (inbox)</h2>
            <div className="space-y-3">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`card w-full border-2 text-left transition-transform hover:scale-[1.01] ${on ? 'scale-[1.01]' : ''}`}
                    style={{
                      borderColor: on ? '#fbbf24' : 'rgba(245, 158, 11, 0.35)',
                      background: on ? 'rgba(120, 53, 15, 0.65)' : 'rgba(41, 37, 36, 0.75)',
                      color: '#fffbeb',
                    }}
                  >
                    <div className="card-body gap-2 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl">{e.from.avatar}</span>
                        {!e.read && <span className="badge badge-warning badge-sm font-bold">NEW SMELL</span>}
                      </div>
                      <p className="m-0 text-xs font-semibold uppercase tracking-wide text-amber-300/90">{dogTakes[i % dogTakes.length]}</p>
                      <p className="m-0 font-bold leading-snug">{e.subject}</p>
                      <p className="m-0 text-xs opacity-70">{e.from.name}</p>
                      {on && (
                        <div className="mt-2 border-t border-amber-600/40 pt-3">
                          <p className="m-0 text-xs font-bold uppercase tracking-widest text-amber-400">Official hooman words</p>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-95">{e.body}</p>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </main>

          <aside className="lg:col-span-4">
            <div className="card border-2 border-amber-500/50 bg-amber-950/50 text-amber-50">
              <div className="card-body gap-3 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Yard gossip (news)</p>
                <p className="text-xs italic opacity-80">&ldquo;Other neighborhoods barking about this.&rdquo;</p>
                <ul className="space-y-3 text-sm leading-snug">
                  {news.map(n => (
                    <li key={n.id} className="rounded-xl border border-amber-700/40 bg-black/20 px-3 py-2">
                      <span className="mr-1">{n.emoji}</span>
                      {n.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="dog-ball-bounce mt-4 text-center text-6xl opacity-80" aria-hidden>
              🐕‍🦺
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
