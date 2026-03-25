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
  const h = 34
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

const flockTag = tag =>
  ({
    work: 'Circle duty',
    personal: 'Inner circle',
    finance: 'Tithe-adjacent',
    promo: 'Outsider noise',
    newsletter: 'Scroll fragment',
    social: 'Gathering echo',
    dev: 'Machine spirit',
    shopping: 'Earthly want',
    travel: 'Pilgrimage',
  }[tag] || 'Unclassified omen')

export default function SectGuruInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(88,28,135,0.35), transparent 60%), linear-gradient(175deg, #1a0f24 0%, #0c0612 45%, #07040b 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes guruIncense {
          0% { transform: translateX(-50%) translateY(0) scaleX(1); opacity: 0.5; }
          100% { transform: translateX(-50%) translateY(-120px) scaleX(1.4); opacity: 0; }
        }
        @keyframes guruGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.25); }
          50% { box-shadow: 0 0 40px rgba(250,204,21,0.2), 0 0 60px rgba(168,85,247,0.15); }
        }
        @keyframes guruOrb {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
        }
        .guru-incense {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8px;
          height: 40px;
          background: linear-gradient(180deg, rgba(255,255,255,0.15), transparent);
          border-radius: 50%;
          filter: blur(4px);
          animation: guruIncense 4s ease-out infinite;
        }
        .guru-incense:nth-child(2) { animation-delay: 1.3s; left: 48%; }
        .guru-incense:nth-child(3) { animation-delay: 2.6s; left: 52%; }
        .guru-pillar { animation: guruGlow 4s ease-in-out infinite; }
        .guru-orb { animation: guruOrb 24s linear infinite; }
      `}</style>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-0 flex h-40 justify-center opacity-40" aria-hidden>
        <div className="relative w-32">
          <div className="guru-incense" />
          <div className="guru-incense" />
          <div className="guru-incense" />
        </div>
      </div>

      <div className="pointer-events-none fixed right-[8%] top-[12%] z-0 h-48 w-48 rounded-full opacity-20 blur-2xl guru-orb" style={{ background: 'conic-gradient(from 0deg, #a855f7, #fbbf24, #c084fc, #a855f7)' }} aria-hidden />

      <header className="relative z-10 border-b px-4 py-7" style={{ borderColor: 'rgba(168,85,247,0.35)', background: 'linear-gradient(180deg, rgba(30,20,45,0.95) 0%, transparent)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="guru-pillar relative flex h-16 w-16 items-center justify-center rounded-full border-2 text-3xl" style={{ borderColor: '#c4b5fd', background: 'rgba(88,28,135,0.4)' }}>
              🕯️
            </div>
            <div>
              <p className="m-0 text-[10px] uppercase tracking-[0.4em]" style={{ color: '#e9d5ff' }}>
                Inner sanctum · digital ashram
              </p>
              <h1 className="m-0 mt-1 text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: '#faf5ff' }}>
                Sect guru inbox
              </h1>
              <p className="m-0 mt-2 max-w-xl text-sm opacity-75">Dispatches from seekers, spreadsheets from the treasurer, and the weather interpreted as prophecy.</p>
            </div>
          </div>
          <button type="button" className="btn btn-sm border-violet-400/40 bg-violet-950 text-violet-100 hover:bg-violet-900" onClick={onSwitchPersona}>
            Renounce (exit)
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-5 p-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="mb-3 rounded-lg border px-3 py-2 text-center text-[10px] uppercase tracking-widest" style={{ borderColor: 'rgba(250,204,21,0.35)', color: '#fde68a' }}>
            Voices of the flock
          </div>
          <ul className="space-y-2">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className="w-full rounded-lg border p-3 text-left transition-all"
                    style={{
                      borderColor: on ? '#fbbf24' : 'rgba(139,92,246,0.35)',
                      background: on ? 'rgba(88,28,135,0.45)' : 'rgba(15,10,25,0.6)',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!e.read && (
                            <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase" style={{ background: '#7c3aed', color: '#ede9fe' }}>
                              Unread vision
                            </span>
                          )}
                          <span className="line-clamp-2 text-sm font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            {e.subject}
                          </span>
                        </div>
                        <p className="mt-1 text-xs opacity-60">{e.from.name}</p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-wide" style={{ color: '#c4b5fd' }}>
                          {flockTag(e.tag)}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="min-h-[280px] lg:col-span-6">
          {selectedEmail ? (
            <div className="relative overflow-hidden rounded-xl border-2 p-6 md:p-8" style={{ borderColor: 'rgba(167,139,250,0.5)', background: 'linear-gradient(160deg, rgba(30,20,50,0.95) 0%, rgba(10,6,18,0.98) 100%)' }}>
              <div className="absolute right-4 top-4 h-24 w-24 rounded-full opacity-10 blur-xl" style={{ background: '#fbbf24' }} aria-hidden />
              <div className="relative">
                <div className="flex flex-wrap gap-2 text-[10px] uppercase">
                  <span className="rounded-full border px-3 py-0.5" style={{ borderColor: '#a78bfa', color: '#ddd6fe' }}>
                    Revelation #{selectedEmail.id}
                  </span>
                  <span className="opacity-50">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-4 text-2xl leading-tight md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: '#faf5ff' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="m-0 mt-3 text-sm" style={{ color: '#c4b5fd' }}>
                  Channelled via <strong>{selectedEmail.from.name}</strong>
                </p>
                <div className="mt-6 border-l-4 pl-5 leading-relaxed whitespace-pre-wrap opacity-90" style={{ borderColor: '#fbbf40' }}>
                  {selectedEmail.body}
                </div>
                <button type="button" className="btn btn-ghost btn-sm mt-6 text-violet-300" onClick={() => setSelectedEmail(null)}>
                  ← Return to silence
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center opacity-70" style={{ borderColor: 'rgba(139,92,246,0.4)' }}>
              <p className="text-5xl">🜂</p>
              <p className="mt-4 max-w-sm" style={{ fontFamily: 'var(--font-display)', color: '#e9d5ff' }}>
                Choose a thread. The chart of earthly indices is on the right — the weather is an omen above it.
              </p>
            </div>
          )}
        </main>

        <aside className="space-y-4 lg:col-span-3">
          <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: 'rgba(250,204,21,0.4)', background: 'rgba(20,12,35,0.85)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#fde68a' }}>
              Sky omen (weather)
            </p>
            <p className="text-4xl">{weather.icon}</p>
            <p className="font-semibold">{weather.condition}</p>
            <p className="text-xs opacity-60">
              {weather.city} · {weather.temp}° · humidity {weather.humidity}%
            </p>
            <p className="mt-2 text-[10px] italic opacity-50">The veil is {weather.wind > 12 ? 'restless' : 'calm'} today.</p>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: 'rgba(139,92,246,0.4)', background: 'rgba(12,8,22,0.9)' }}>
            <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-widest" style={{ color: '#c4b5fd' }}>
              Temple treasury (stocks)
            </p>
            {stocks.map(s => (
              <div key={s.ticker} className="mb-3 flex items-center justify-between gap-2 border-b border-white/5 pb-2 last:mb-0 last:border-0 last:pb-0">
                <div>
                  <span className="font-bold text-violet-100">{s.ticker}</span>
                  <span className={`ml-2 text-xs ${s.changePct >= 0 ? 'text-amber-300' : 'text-rose-400'}`}>
                    {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct)}%
                  </span>
                </div>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#fb7185'} />
              </div>
            ))}
          </div>

          <div className="rounded-lg border p-3 text-xs leading-snug" style={{ borderColor: 'rgba(88,28,135,0.5)', background: 'rgba(8,5,14,0.95)' }}>
            <p className="mb-2 text-[10px] font-bold uppercase" style={{ color: '#a78bfa' }}>
              Whispers of the world (news)
            </p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="mb-2 border-l-2 pl-2" style={{ borderColor: '#7c3aed' }}>
                <span className="mr-1">{n.emoji}</span>
                {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
