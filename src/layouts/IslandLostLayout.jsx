import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function IslandLostLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="island-wave-bg relative min-h-dvh text-amber-950">
      <div className="island-palm-sway pointer-events-none absolute -left-4 bottom-0 text-[min(28vw,180px)] leading-none opacity-25 select-none" aria-hidden>🌴</div>
      <div className="island-palm-sway-reverse pointer-events-none absolute -right-8 bottom-0 scale-x-[-1] text-[min(24vw,160px)] leading-none opacity-20 select-none" aria-hidden>🌴</div>
      <div className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 text-6xl opacity-30" aria-hidden>🏝️</div>

      <header className="relative z-10 px-4 pt-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="island-sos-glow rounded-lg border-2 border-amber-900/30 bg-amber-50/90 px-4 py-3 shadow-lg backdrop-blur-sm">
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.5em] text-amber-800">SOS · driftwood terminal</p>
            <h1 className="m-0 text-xl font-bold text-amber-950 md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              Messages in bottles (inbox)
            </h1>
          </div>
          <button type="button" className="btn btn-sm btn-neutral" onClick={onSwitchPersona}>
            Helicopter (home)
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6">
        <div className="grid gap-5 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/70">Washed ashore</p>
            <div className="space-y-3">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`island-bottle-tilt block w-full rounded-full border-2 px-4 py-3 text-left shadow-md transition-transform ${
                      on ? 'border-amber-800 bg-amber-100 scale-[1.02]' : 'border-amber-700/50 bg-white/80 hover:scale-[1.01]'
                    }`}
                    style={{ transform: `rotate(${(i % 5) * 0.8 - 1.6}deg)` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden>🍾</span>
                      {!e.read && <span className="badge badge-error badge-xs">unread</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-xs ${e.read ? 'text-amber-800/70' : 'font-bold text-amber-950'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-amber-900/50">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-6">
            {selectedEmail ? (
              <div className="rounded-2xl border-4 border-amber-800/40 bg-[#f5e6c8] p-6 shadow-[inset_0_2px_20px_rgba(120,80,40,0.15)]">
                <p className="m-0 font-mono text-[10px] text-amber-900/60">Coordinates unknown · {selectedEmail.date}</p>
                <h2 className="m-0 mt-2 text-lg font-bold text-amber-950">{selectedEmail.subject}</h2>
                <p className="text-sm text-amber-800">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,400px)] overflow-y-auto border-t-2 border-dashed border-amber-800/30 pt-4 text-sm leading-relaxed text-amber-950 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border-2 border-dashed border-amber-700/50 bg-white/50 text-amber-800/60">
                Uncork a bottle
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-3">
            <div className="rounded-xl border-2 border-sky-700/30 bg-sky-100/90 p-4 shadow">
              <p className="m-0 text-[10px] font-bold uppercase text-sky-900">Survival forecast</p>
              <p className="mt-2 text-3xl font-bold">{weather.icon} {weather.temp}°C</p>
              <p className="text-xs text-sky-900/80">{weather.condition} — build shade accordingly</p>
            </div>

            <div className="rounded-xl border-2 border-stone-600/40 bg-stone-200/90 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-stone-700">Numbers on a rock (stocks)</p>
              <p className="mt-1 text-[10px] text-stone-600">Meaningless here, but pretty lines.</p>
              <ul className="mt-2 space-y-2">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center justify-between gap-1 text-xs">
                    <span className="font-mono font-bold">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke="#57534e" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border-2 border-amber-900/20 bg-amber-50/95 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-amber-900">Coconut radio hearsay</p>
              <ul className="mt-2 space-y-2 text-[11px] text-amber-950/90">
                {news.map(n => (
                  <li key={n.id}>{n.emoji} {n.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
