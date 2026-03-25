import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function LotteryWinnerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="lottery-sparkle-bg relative min-h-dvh overflow-x-hidden text-amber-50">
      <div className="lottery-confetti pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="lottery-bubble-champagne pointer-events-none absolute bottom-20 left-[10%] h-3 w-3 rounded-full bg-amber-200/30" aria-hidden />
      <div className="lottery-bubble-champagne-delay pointer-events-none absolute bottom-32 left-[20%] h-2 w-2 rounded-full bg-yellow-100/25" aria-hidden />
      <div className="lottery-bubble-champagne pointer-events-none absolute bottom-24 right-[15%] h-2.5 w-2.5 rounded-full bg-amber-100/35" aria-hidden />

      <header className="relative z-10 border-b border-amber-400/30 bg-black/40 px-4 py-5 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.45em] text-amber-300">Concierge terminal</p>
            <h1 className="lottery-title-shine m-0 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100" style={{ fontFamily: 'var(--font-display)' }}>
              🎰 Jackpot inbox
            </h1>
          </div>
          <button type="button" className="btn btn-sm bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-0 hover:brightness-110" onClick={onSwitchPersona}>
            Humble mode
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-6">
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stocks.map(s => (
            <div
              key={s.ticker}
              className="rounded-xl border border-amber-400/40 bg-gradient-to-br from-violet-900/60 to-black/50 p-3 shadow-lg shadow-amber-900/20"
            >
              <p className="m-0 text-[9px] uppercase tracking-wider text-amber-200/70">Now I diversify</p>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-mono text-lg font-bold text-white">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
              </div>
              <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#fb7185'} />
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-violet-300">VIP correspondence</p>
            <div className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-xl border-2 px-4 py-3 text-left transition-all ${
                      on
                        ? 'border-yellow-400 bg-gradient-to-r from-yellow-900/50 to-violet-900/50 shadow-[0_0_20px_rgba(250,204,21,0.25)]'
                        : 'border-violet-700/50 bg-black/40 hover:border-amber-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-warning">NEW</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-sm ${e.read ? 'text-violet-200/70' : 'font-bold text-white'}`}>{e.subject}</p>
                    <p className="m-0 text-xs text-amber-200/60">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-2xl border-2 border-amber-300/50 bg-gradient-to-b from-violet-950/90 to-black/80 p-6 shadow-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-500/20 px-3 py-0.5 text-[10px] font-bold uppercase text-amber-200">Sealed envelope</span>
                  <span className="text-xs text-violet-300">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-xl font-bold text-white">{selectedEmail.subject}</h2>
                <p className="text-sm text-amber-200/90">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(48vh,400px)] overflow-y-auto rounded-lg border border-violet-800/50 bg-black/30 p-4 text-sm leading-relaxed text-violet-50 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-violet-600/40 text-violet-300/60">
                Select a letter from your new life
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-3">
            <div className="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-900/50 to-black/60 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-sky-300">Yacht deck weather</p>
              <p className="mt-2 text-4xl">{weather.icon}</p>
              <p className="text-2xl font-bold text-white">{weather.temp}°C</p>
              <p className="text-xs text-sky-200">{weather.city} · {weather.condition}</p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-black/50 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-amber-400">Society pages</p>
              <ul className="mt-3 space-y-3 text-xs leading-snug text-amber-50/90">
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-amber-500 pl-2">
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
