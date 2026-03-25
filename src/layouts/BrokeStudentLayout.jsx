import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function BrokeStudentLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="student-desk-wobble relative min-h-dvh bg-gradient-to-br from-amber-950 via-orange-950 to-stone-900 text-amber-50">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251,191,36,0.4) 2px, rgba(251,191,36,0.4) 3px)',
      }} aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6">
        <div className="student-cracked-frame rounded-xl border-4 border-amber-800/60 bg-stone-900/90 p-1 shadow-2xl">
          <div className="rounded-lg border border-dashed border-amber-700/40 bg-gradient-to-b from-stone-900 to-stone-950 p-4">
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/50 pb-3">
              <div>
                <p className="m-0 text-[10px] uppercase tracking-widest text-orange-400">Library seat · stolen wifi</p>
                <h1 className="m-0 text-xl font-bold text-amber-100" style={{ fontFamily: 'var(--font-display)' }}>
                  🍜 Inbox (ramen budget)
                </h1>
              </div>
              <button type="button" className="btn btn-xs btn-warning btn-outline" onClick={onSwitchPersona}>
                Drop out (home)
              </button>
            </header>

            <div className="grid gap-4 lg:grid-cols-12">
              <aside className="lg:col-span-3">
                <p className="mb-2 text-[10px] font-bold uppercase text-stone-500">Due soon</p>
                <ul className="space-y-2">
                  {emails.map(e => {
                    const on = selectedEmail?.id === e.id
                    return (
                      <li key={e.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedEmail(e)}
                          className={`w-full rounded-lg border p-2.5 text-left text-xs transition-colors ${
                            on ? 'border-orange-500 bg-orange-950/50' : 'border-stone-700 bg-stone-800/50 hover:border-amber-700'
                          }`}
                        >
                          <div className="flex justify-between gap-1">
                            <span>{e.from.avatar}</span>
                            {!e.read && <span className="badge badge-warning badge-xs">!</span>}
                          </div>
                          <p className={`mt-1 line-clamp-2 ${e.read ? 'text-stone-400' : 'font-semibold text-amber-100'}`}>{e.subject}</p>
                          <p className="m-0 text-[10px] text-stone-500">{e.from.name}</p>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </aside>

              <main className="lg:col-span-5">
                {selectedEmail ? (
                  <div className="rounded-lg border border-stone-600 bg-stone-800/80 p-4 shadow-inner">
                    <div className="flex items-center gap-2 text-[10px] uppercase text-stone-500">
                      <span>📝 Essay draft</span>
                      <span>{selectedEmail.date}</span>
                    </div>
                    <h2 className="mt-2 text-base font-bold text-amber-50">{selectedEmail.subject}</h2>
                    <p className="text-xs text-orange-300/90">{selectedEmail.from.name}</p>
                    <div className="mt-3 max-h-[min(45vh,380px)] overflow-y-auto text-sm leading-relaxed text-stone-200 whitespace-pre-wrap">
                      {selectedEmail.body}
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-stone-600 text-sm text-stone-500">
                    Open an “assignment”
                  </div>
                )}
              </main>

              <aside className="space-y-3 lg:col-span-4">
                <div className="rounded-lg border border-sky-800/50 bg-sky-950/30 p-3">
                  <p className="m-0 text-[10px] font-bold uppercase text-sky-300">Can I study outside?</p>
                  <p className="mt-2 text-2xl">
                    {weather.icon} {weather.temp}°C
                  </p>
                  <p className="text-xs text-sky-200/80">{weather.city} — {weather.condition}</p>
                </div>

                <div className="rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-3">
                  <p className="m-0 text-[10px] font-bold uppercase text-emerald-400/90">If I had bought… (pain)</p>
                  <ul className="mt-2 space-y-2">
                    {stocks.map(s => (
                      <li key={s.ticker} className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-mono text-emerald-200">{s.ticker}</span>
                        <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#6ee7b7' : '#fca5a5'} />
                        <span className={s.changePct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-amber-900/40 bg-black/40 p-3">
                  <p className="m-0 text-[10px] font-bold uppercase text-amber-600">Campus bulletin</p>
                  <ul className="mt-2 space-y-2 text-[11px] leading-snug text-stone-300">
                    {news.map(n => (
                      <li key={n.id}>{n.emoji} {n.title}</li>
                    ))}
                  </ul>
                </div>

                <div className="student-coin-jar flex items-center justify-center gap-2 rounded-full border border-amber-800/50 bg-stone-900 py-2 text-xs text-amber-200/80">
                  <span className="text-lg" aria-hidden>🪙</span>
                  <span>€2.40 in the jar · coffee is a myth</span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
