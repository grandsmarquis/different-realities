import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tips = [
  'Verify sender domain — hover links',
  'Urgency + gift cards = red flag',
  'Never share 2FA codes',
  'If it sounds too good, screenshot & ask a friend',
]

export default function ScamWatchoutLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="scam-alert-stripe relative min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,#dc2626_0px,#dc2626_16px,#000_16px,#000_32px)]" aria-hidden />

      <header className="relative z-10 border-b border-red-900/50 bg-black/80 px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="scam-shield-pulse text-3xl" aria-hidden>🛡️</span>
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-red-400">Post-incident · safe reading mode</p>
              <h1 className="m-0 text-xl font-bold text-white md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                Inbox — verify everything
              </h1>
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-error btn-outline" onClick={onSwitchPersona}>
            Exit safe room
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-5">
        <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((t, i) => (
            <div key={i} className="rounded-lg border border-red-800/60 bg-red-950/40 px-3 py-2 text-[11px] leading-snug text-red-100/90">
              <span className="font-bold text-red-400">⚠ {i + 1}.</span> {t}
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-500/90">Inbox (inspect before trust)</p>
            <ul className="space-y-2">
              {emails.map(e => {
                const on = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className={`w-full rounded-lg border-2 p-3 text-left transition-colors ${
                        on ? 'border-amber-500 bg-amber-950/30' : 'border-zinc-700 bg-zinc-900/80 hover:border-red-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{e.from.avatar}</span>
                        <span className="badge badge-xs border-red-600 bg-red-950 text-red-300">scan</span>
                      </div>
                      <p className={`mt-1 line-clamp-2 text-xs ${e.read ? 'text-zinc-500' : 'font-semibold text-white'}`}>{e.subject}</p>
                      <p className="m-0 font-mono text-[10px] text-zinc-500">{e.from.name}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <main className="lg:col-span-6">
            {selectedEmail ? (
              <div className="rounded-xl border-2 border-amber-600/50 bg-zinc-900 p-5">
                <div className="flex flex-wrap items-center gap-2 border-b border-zinc-700 pb-3">
                  <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Manual review</span>
                  <span className="text-xs text-zinc-500">{selectedEmail.date}</span>
                </div>
                <h2 className="m-0 mt-3 text-lg font-bold text-white">{selectedEmail.subject}</h2>
                <p className="mt-1 font-mono text-sm text-amber-200/80">Claimed sender: {selectedEmail.from.name}</p>
                <div className="mt-4 max-h-[min(46vh,400px)] overflow-y-auto rounded-lg bg-black/50 p-4 text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
                <p className="mt-3 text-[11px] text-amber-500/90">If this asked for money or codes, report and block — even if it looks like LinkedIn or your bank.</p>
              </div>
            ) : (
              <div className="flex min-h-[260px] items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 text-zinc-500">
                Pick a message to audit
              </div>
            )}
          </main>

          <aside className="space-y-4 lg:col-span-3">
            <div className="rounded-xl border border-sky-800/50 bg-sky-950/40 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-sky-400">Weather (real world still exists)</p>
              <p className="mt-2 text-2xl">
                {weather.icon} {weather.temp}°C — {weather.city}
              </p>
              <p className="text-xs text-sky-200/80">{weather.condition}</p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-zinc-900/90 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-zinc-400">“Guaranteed returns” chart check</p>
              <p className="mt-1 text-[10px] text-zinc-600">Real markets wiggle. Flat lines that only go up = fiction.</p>
              <ul className="mt-3 space-y-2">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2 text-xs">
                    <span className="font-mono text-zinc-300">{s.ticker}</span>
                    <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#4ade80' : '#f87171'} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4">
              <p className="m-0 text-[10px] font-bold uppercase text-red-400">Verified headlines only</p>
              <ul className="mt-2 space-y-2 text-[11px] leading-snug text-zinc-300">
                {news.map(n => (
                  <li key={n.id}>
                    <span className="text-red-400/80">✓</span> {n.emoji} {n.title}
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
