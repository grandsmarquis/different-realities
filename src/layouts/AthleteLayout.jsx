import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function AthleteLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="athlete-track-bg relative min-h-dvh overflow-x-hidden bg-gradient-to-br from-orange-600 via-red-700 to-rose-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.15) 48px, rgba(255,255,255,0.15) 50px)',
      }} aria-hidden />
      <div className="athlete-hr-pulse pointer-events-none absolute right-[6%] top-24 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/30 bg-black/20 text-2xl" aria-hidden>
        💓
      </div>

      <header className="relative z-10 border-b-4 border-white/20 bg-black/25 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.4em] text-orange-200">Training camp · inbox</p>
            <h1 className="m-0 text-2xl font-black italic tracking-tight md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
              🏃‍♂️ COACH&apos;S MAIL
            </h1>
          </div>
          <button type="button" className="btn btn-sm border-white/40 bg-white/10 text-white hover:bg-white/20" onClick={onSwitchPersona}>
            Cool down
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-5">
        <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stocks.map(s => (
            <div
              key={s.ticker}
              className="rounded-lg border-2 border-white/25 bg-black/30 px-3 py-2 backdrop-blur-sm"
            >
              <p className="m-0 text-[9px] font-bold uppercase tracking-wider text-orange-200/80">Sponsor ticker</p>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-mono text-lg font-bold">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-lime-300' : 'text-rose-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
              </div>
              <MiniSpark series={s.series} stroke="#fff" className="opacity-90" />
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-orange-200">Playbook queue</p>
            <div className="space-y-2">
              {emails.map((e, i) => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`athlete-lane-slide w-full rounded-r-full border-l-4 py-2.5 pl-4 pr-3 text-left transition-all ${
                      on ? 'border-lime-400 bg-white/20' : 'border-white/20 bg-black/25 hover:border-orange-300'
                    }`}
                    style={{ marginLeft: `${(i % 3) * 4}px` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-warning badge-xs font-bold">GO</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-xs ${e.read ? 'text-white/60' : 'font-bold text-white'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-orange-200/70">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-6">
            {selectedEmail ? (
              <div className="rounded-2xl border-4 border-white/30 bg-gradient-to-b from-black/50 to-black/70 p-6 shadow-xl">
                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase">
                  <span className="rounded bg-lime-500 px-2 py-0.5 text-black">Film session</span>
                  <span className="text-white/50">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-xl font-bold">{selectedEmail.subject}</h2>
                <p className="text-sm text-orange-200">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,400px)] overflow-y-auto border-t border-white/10 pt-4 text-sm leading-relaxed text-white/95 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[260px] items-center justify-center rounded-2xl border-4 border-dashed border-white/20 text-white/50">
                Select a play
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-3">
            <div className="rounded-xl border-2 border-cyan-300/40 bg-cyan-950/50 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-cyan-200">Outdoor session</p>
              <p className="mt-2 text-3xl font-black">{weather.icon} {weather.temp}°C</p>
              <p className="text-xs text-cyan-100/90">{weather.city} · {weather.condition}</p>
              <p className="mt-2 text-[10px] text-cyan-200/70">Hydration: humidity {weather.humidity}%</p>
            </div>

            <div className="rounded-xl border-2 border-white/25 bg-black/40 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-white/70">Wire · news</p>
              <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto text-xs leading-snug">
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-orange-400 pl-2">
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
