import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function BusDriverLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-amber-50">
      <div className="bus-road-strip pointer-events-none absolute inset-x-0 bottom-0 top-[52%] opacity-30" aria-hidden />
      <div className="bus-dash-glow pointer-events-none absolute left-1/2 top-8 h-24 w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" aria-hidden />

      <header className="relative z-10 border-b border-amber-500/30 bg-black/60 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.5em] text-amber-400/90">Line 42 · cab</p>
            <h1 className="m-0 text-2xl font-black uppercase tracking-tight text-amber-300" style={{ fontFamily: 'var(--font-display)' }}>
              🚌 Dispatch inbox
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bus-led-blink rounded border border-amber-600/50 bg-amber-950/80 px-3 py-1 font-mono text-xs text-amber-200">
              NEXT: {weather.city} {weather.temp}°C {weather.icon}
            </span>
            <button type="button" className="btn btn-xs border-amber-600 bg-amber-900 text-amber-100 hover:bg-amber-800" onClick={onSwitchPersona}>
              Park bus
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-5">
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stocks.map(s => (
            <div
              key={s.ticker}
              className={`rounded-lg border px-2 py-2 font-mono ${
                s.changePct >= 0 ? 'border-emerald-700/50 bg-emerald-950/40' : 'border-rose-800/50 bg-rose-950/30'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase text-amber-200/70">
                <span>Fuel gauge</span>
                <span>{s.ticker}</span>
              </div>
              <div className="mt-1 flex items-end justify-between gap-1">
                <span className={`text-lg font-bold ${s.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {s.changePct > 0 ? '+' : ''}
                  {s.changePct}%
                </span>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#fb7185'} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-500">Radio queue</div>
            <div className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded border-2 px-3 py-2.5 text-left font-mono text-xs transition-colors ${
                      on ? 'border-amber-400 bg-amber-950/70 text-amber-100' : 'border-slate-600 bg-black/50 text-slate-300 hover:border-amber-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{e.from.avatar}</span>
                      {!e.read && <span className="bus-led-blink text-[9px] font-bold text-red-400">LIVE</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 ${e.read ? 'opacity-70' : 'font-bold'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] opacity-50">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-lg border-2 border-amber-600/40 bg-black/70 p-5 font-mono shadow-[0_0_40px_rgba(251,191,36,0.08)]">
                <p className="m-0 text-[10px] uppercase text-amber-500/80">Transmission log · {selectedEmail.date}</p>
                <h2 className="m-0 mt-2 text-lg font-bold text-amber-100">{selectedEmail.subject}</h2>
                <p className="m-0 mt-1 text-xs text-amber-400">From: {selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,400px)] overflow-y-auto border-l-2 border-amber-600/50 pl-3 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-dashed border-slate-600 font-mono text-sm text-slate-500">
                Pick a transmission
              </div>
            )}
          </main>

          <aside className="lg:col-span-3 space-y-4">
            <div className="rounded-lg border border-cyan-800/40 bg-cyan-950/40 p-4">
              <p className="m-0 font-mono text-[10px] font-bold uppercase text-cyan-300">Arrival board</p>
              <p className="mt-3 font-mono text-3xl font-bold text-cyan-100">
                {weather.temp}°
              </p>
              <p className="text-xs text-cyan-200/90">{weather.condition}</p>
              <ul className="mt-3 space-y-1 font-mono text-[10px] text-cyan-300/80">
                {weather.forecast.slice(0, 3).map(f => (
                  <li key={f.day}>
                    {f.day} {f.icon} {f.high}/{f.low}°
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-amber-800/30 bg-black/60 p-3">
              <p className="m-0 font-mono text-[10px] font-bold uppercase text-amber-400">Station headlines</p>
              <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto font-mono text-[11px] leading-snug text-amber-100/90">
                {news.map(n => (
                  <li key={n.id} className="border-b border-amber-900/40 pb-2">
                    <span className="text-amber-500">{n.time}</span> · {n.emoji} {n.title}
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
