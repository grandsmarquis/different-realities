import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function ThailandBackpackerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="thai-sun-shift relative min-h-dvh overflow-x-hidden bg-gradient-to-br from-teal-900 via-emerald-950 to-amber-950 text-amber-50">
      <div className="pointer-events-none absolute -right-20 top-10 text-[12rem] opacity-[0.07] select-none" aria-hidden>🛕</div>
      <div className="thai-lantern-float pointer-events-none absolute left-[8%] top-24 text-4xl opacity-40" aria-hidden>🏮</div>
      <div className="thai-lantern-float-delay pointer-events-none absolute right-[12%] top-40 text-3xl opacity-35" aria-hidden>🏮</div>

      <header className="relative z-10 px-4 py-5">
        <div className="mx-auto flex max-w-6xl rotate-[-0.5deg] flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-amber-400/40 bg-black/35 px-5 py-4 backdrop-blur-md">
          <div>
            <p className="m-0 text-[10px] uppercase tracking-[0.4em] text-teal-300">Khao San · hostel Wi‑Fi</p>
            <h1 className="m-0 text-2xl font-bold text-amber-100" style={{ fontFamily: 'var(--font-display)' }}>
              🎒 Inbox / bookings
            </h1>
          </div>
          <button type="button" className="btn btn-sm border-amber-400/60 bg-amber-500/20 text-amber-100 hover:bg-amber-500/30" onClick={onSwitchPersona}>
            Fly home
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-10">
        <div className="grid skew-y-0 gap-5 lg:grid-cols-12 lg:gap-6" style={{ transform: 'skewY(-0.3deg)' }}>
          <aside className="lg:col-span-3" style={{ transform: 'skewY(0.3deg)' }}>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-teal-400">Hostel desk</p>
            <div className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-xl border-2 px-3 py-2.5 text-left shadow-lg transition-all ${
                      on
                        ? 'border-amber-400 bg-gradient-to-r from-amber-900/60 to-teal-900/60'
                        : 'border-teal-700/50 bg-black/40 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-warning badge-sm">new</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-xs ${e.read ? 'text-teal-200/70' : 'font-bold text-amber-50'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-teal-300/60">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-6" style={{ transform: 'skewY(0.3deg)' }}>
            {selectedEmail ? (
              <div className="rounded-2xl border-2 border-teal-500/30 bg-gradient-to-b from-teal-950/80 to-black/60 p-6 shadow-xl">
                <p className="m-0 text-[10px] uppercase tracking-wider text-amber-400">{selectedEmail.date}</p>
                <h2 className="m-0 mt-2 text-xl font-bold text-white">{selectedEmail.subject}</h2>
                <p className="mt-1 text-sm text-teal-300">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,420px)] overflow-y-auto rounded-lg bg-black/30 p-4 text-sm leading-relaxed text-amber-50/95 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[260px] items-center justify-center rounded-2xl border-2 border-dashed border-teal-700/40 text-teal-300/60">
                Tap a booking slip
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-3" style={{ transform: 'skewY(0.3deg)' }}>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/40 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-cyan-300">Beach or temple?</p>
              <p className="mt-2 text-3xl">{weather.icon} {weather.temp}°</p>
              <p className="text-xs text-cyan-100/80">{weather.city} · {weather.condition}</p>
            </div>

            <div className="rounded-2xl border border-amber-600/30 bg-amber-950/30 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-amber-300">Travel fund tickers</p>
              <ul className="mt-3 space-y-3">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-amber-100">{s.ticker}</span>
                      <p className="m-0 text-[9px] text-amber-200/50">{s.name}</p>
                    </div>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#f87171'} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-700/40 bg-black/50 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-emerald-400">Hostel wall news</p>
              <ul className="mt-2 space-y-2 text-[11px] leading-snug text-emerald-100/90">
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-emerald-500 pl-2">
                    {n.emoji} {n.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
