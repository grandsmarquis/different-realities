import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function TraderLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const tickerText = [...news.map(n => `${n.emoji} ${n.title}`), ...stocks.map(s => `${s.ticker} ${s.changePct >= 0 ? '▲' : '▼'} ${Math.abs(s.changePct)}%`)].join('   ·   ')

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-32 font-mono text-sm"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,94,0.12), transparent), #030712',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="trader-grid-bg pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <header className="relative z-10 border-b border-emerald-900/50 bg-black/80 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Trader · terminal</p>
            <h1 className="m-0 text-2xl font-bold tracking-tight text-emerald-400 md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
              TRADER_DESK
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="trader-flash-pulse rounded border border-emerald-600/50 bg-emerald-950 px-3 py-1 text-emerald-300">
              {weather.city} {weather.temp}°C {weather.icon}
            </span>
            <button type="button" className="btn btn-xs border-emerald-700 bg-emerald-900 text-emerald-100 hover:bg-emerald-800" onClick={onSwitchPersona}>
              FLAT (exit)
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-5 md:px-4">
        <div className="mb-4 grid gap-3 lg:grid-cols-4">
          {stocks.map(s => (
            <div
              key={s.ticker}
              className={`rounded-lg border px-3 py-3 ${s.changePct >= 0 ? 'border-emerald-800/60 bg-emerald-950/40' : 'border-red-900/50 bg-red-950/30'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-white">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {s.changePct > 0 ? '+' : ''}
                  {s.changePct}%
                </span>
              </div>
              <div className="mt-2 flex justify-end">
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} />
              </div>
              <p className="m-0 mt-1 text-[10px] uppercase text-base-content/50">{s.name}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600">Order book · inbox</div>
            <div className="space-y-1">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded border px-3 py-2.5 text-left transition-colors ${on ? 'border-emerald-500 bg-emerald-950/60' : 'border-base-content/10 bg-black/40 hover:border-emerald-800'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-error badge-xs font-mono">LIVE</span>}
                    </div>
                    <p className={`m-0 mt-1 line-clamp-2 text-xs ${e.read ? 'text-base-content/60' : 'font-bold text-white'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-base-content/40">{e.from.name}</p>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="lg:col-span-5">
            {selectedEmail ? (
              <div className="rounded-lg border border-emerald-800/40 bg-black/50 p-5">
                <div className="flex flex-wrap gap-2 text-[10px] uppercase">
                  <span className="rounded bg-emerald-900/80 px-2 py-0.5 text-emerald-300">fill: email</span>
                  <span className="text-base-content/50">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-lg font-bold text-white md:text-xl">{selectedEmail.subject}</h2>
                <p className="m-0 mt-2 text-xs text-emerald-500/90">{selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(52vh,480px)] overflow-y-auto border-l-2 border-emerald-700 pl-4 text-sm leading-relaxed text-base-content/90 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-base-content/20 text-base-content/40">
                SELECT_TICKER_MESSAGE
              </div>
            )}
          </main>

          <aside className="lg:col-span-3">
            <div className="rounded-lg border border-sky-800/50 bg-sky-950/30 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-sky-400">Macro · wire</p>
              <ul className="mt-3 space-y-3 text-xs leading-snug">
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-sky-600 pl-2">
                    <span className="text-sky-300">{n.time}</span> · {n.emoji} {n.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <div className="trader-ticker-wrap fixed bottom-11 left-0 right-0 z-[90] overflow-hidden border-t border-emerald-900/60 bg-black py-2">
        <div className="trader-ticker-inner whitespace-nowrap text-xs font-bold text-emerald-400">
          <span className="inline-block pr-16">{tickerText}</span>
          <span className="inline-block pr-16" aria-hidden>
            {tickerText}
          </span>
        </div>
      </div>
    </div>
  )
}
