import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function RoadragerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="road-rumble relative min-h-screen overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="relative z-10 flex h-[min(38vh,280px)] flex-col border-b-4 md:h-[min(34vh,320px)]" style={{ borderColor: 'var(--accent)' }}>
        <div className="road-stripe-scroll absolute bottom-0 left-[8%] top-[18%] w-3 opacity-90" aria-hidden />
        <div className="road-stripe-scroll absolute bottom-0 right-[10%] top-[22%] w-3 opacity-90" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0c4a6e 0%, #1e293b 35%, #0f172a 100%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px)' }} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-between p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.35em] text-sky-200/80">WINDSHIELD HUD</p>
              <h1 className="mt-1 text-3xl uppercase md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: '#e2e8f0', textShadow: '0 0 24px rgba(249,115,22,0.5)' }}>
                Inbox Autobahn
              </h1>
            </div>
            <div className="road-hud-pulse rounded-box border-2 border-warning bg-base-100/10 px-4 py-2 text-center backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-widest text-warning">MPH (rage)</p>
              <p className="text-3xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                87
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex gap-3">
              <span className="btn btn-circle btn-warning btn-lg text-2xl" aria-label="Honk">
                📯
              </span>
              <button type="button" onClick={onSwitchPersona} className="btn btn-outline btn-sm border-2 border-white/40 text-white">
                Pull over (home)
              </button>
            </div>
            <p className="max-w-xs text-right text-xs text-sky-100/70">
              Merge or get merged · {emails.length} messages in the rearview
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-3 py-6 lg:flex-row lg:items-start">
        <div className="relative lg:w-[340px] lg:shrink-0">
          <div
            className="relative overflow-hidden rounded-[2.5rem] border-4 p-3 shadow-2xl"
            style={{ borderColor: '#334155', background: 'linear-gradient(145deg, #1e293b, #0f172a)' }}
          >
            <p className="mb-2 text-center text-[10px] uppercase tracking-[0.4em] opacity-50">Rearview mirror</p>
            <div className="max-h-[min(52vh,440px)] space-y-2 overflow-y-auto rounded-[2rem] bg-black/40 p-2">
              {emails.map(e => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="flex w-full items-center gap-2 rounded-xl border-2 px-3 py-3 text-left transition-all"
                  style={{
                    borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : '#475569',
                    background: selectedEmail?.id === e.id ? 'color-mix(in srgb, var(--accent) 12%, #0f172a)' : '#1e293b',
                    boxShadow: selectedEmail?.id === e.id ? '0 0 20px color-mix(in srgb, var(--accent) 40%, transparent)' : undefined,
                  }}
                >
                  <span className="text-2xl">{e.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                      {e.subject}
                    </p>
                    <p className="truncate text-[10px] opacity-50">{e.from.name}</p>
                  </div>
                  {!e.read && <span className="badge badge-warning badge-xs">!</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="min-w-0 flex-1 rounded-box border-2 p-5 md:p-8" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          {selectedEmail ? (
            <>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-warning px-2 py-1 text-xs font-bold text-warning-content">EXIT ONLY</span>
                  <h2 className="text-2xl uppercase md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    {selectedEmail.subject}
                  </h2>
                </div>
                <div className="text-right text-sm opacity-70">
                  <p>{selectedEmail.from.name}</p>
                  <p className="mt-1 font-mono text-xs">{selectedEmail.date}</p>
                </div>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed opacity-90">{selectedEmail.body}</div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="btn btn-sm btn-error">Lane closed</span>
                <span className="btn btn-sm btn-ghost">Flash high beams</span>
              </div>
            </>
          ) : (
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 opacity-40">
              <span className="text-5xl">🛣️</span>
              <p className="text-center uppercase tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
                Glance the mirror — pick a tailgater
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3 border-t pt-4 text-xs opacity-80" style={{ borderColor: 'var(--border)' }}>
            <span>
              {weather.icon} {weather.condition}
            </span>
            {stocks.map(s => (
              <span key={s.ticker} className="badge badge-outline badge-sm">
                {s.ticker} {s.changePct}%
              </span>
            ))}
            <span className="line-clamp-2">{news[0]?.title}</span>
          </div>
        </main>
      </div>
    </div>
  )
}
