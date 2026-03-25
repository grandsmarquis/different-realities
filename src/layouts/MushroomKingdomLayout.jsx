import { useContext, useMemo } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const worldName = t =>
  ({
    work: 'World 1-1 (Office)',
    personal: 'Peach\'s Castle Mailroom',
    finance: 'Coin Block Bank',
    promo: 'Bonus Room Ads',
    newsletter: 'Toad\'s Gazette',
    social: 'Mushroom Plaza',
    dev: 'Warp Pipe Repo',
    shopping: 'Item Shop Alley',
    travel: 'Airship Terminal',
  }[t] || 'Secret Level')

export default function MushroomKingdomLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const coins = useMemo(() => emails.filter(e => !e.read).length * 100 + 37, [])

  return (
    <div className="mk-sky relative min-h-screen overflow-x-hidden" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="mk-clouds pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div className="mk-hills pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-80" aria-hidden />

      <header className="relative z-10 mk-brick-strip border-b-4 shadow-lg" style={{ borderColor: 'var(--accent3)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="mk-star text-4xl">⭐</span>
            <div>
              <h1 className="text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--card)', textShadow: '3px 3px 0 var(--accent3)' }}>
                MUSHROOM MAIL
              </h1>
              <p className="text-sm font-bold text-white/90">Same inbox. Extra lives not included.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="mk-coin-counter flex items-center gap-2 rounded-full border-4 px-4 py-2 font-bold shadow-md" style={{ borderColor: 'var(--accent3)', background: 'var(--card)', color: 'var(--accent)' }}>
              <span className="mk-coin text-2xl" aria-hidden>
                🪙
              </span>
              <span className="mk-coin-pop tabular-nums text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                ×{coins}
              </span>
            </div>
            <button type="button" className="btn btn-sm font-bold shadow-[4px_4px_0_var(--accent3)]" style={{ background: 'var(--accent2)', color: 'var(--text)', border: 'none' }} onClick={onSwitchPersona}>
              Warp home
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 p-4 lg:flex-row" style={{ minHeight: 'calc(100dvh - 100px)' }}>
        <aside className="lg:w-72 shrink-0">
          <div className="mb-3 flex items-center gap-2 rounded-full border-4 px-3 py-1 text-xs font-bold" style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--card) 92%, transparent)' }}>
            <span className="text-lg">🟩</span> PIPE LINEUP
          </div>
          <ul className="space-y-3">
            {emails.map(e => {
              const active = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`mk-q-block group w-full rounded-lg border-4 p-3 text-left shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-1 active:translate-y-0 ${active ? 'ring-4 ring-yellow-300' : ''}`}
                    style={{
                      borderColor: active ? 'var(--accent2)' : 'var(--accent3)',
                      background: 'linear-gradient(180deg, #ffe566 0%, var(--accent2) 45%, #c9a010 100%)',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="mk-q-bounce text-2xl font-black leading-none text-amber-950 group-hover:animate-bounce">?</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1">
                          {!e.read && <span className="badge badge-error badge-sm font-bold">NEW!</span>}
                          <span className="line-clamp-2 font-extrabold text-amber-950">{e.subject}</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-amber-900/80">{e.from.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-amber-950/60">{worldName(e.tag)}</p>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="min-h-[300px] flex-1">
          {selectedEmail ? (
            <div className="mk-flagpole relative overflow-hidden rounded-2xl border-4 p-6 shadow-xl" style={{ borderColor: 'var(--card)', background: 'linear-gradient(180deg, #fff 0%, #e8f4ff 100%)' }}>
              <div className="absolute right-4 top-4 flex flex-col items-center gap-1">
                <div className="h-24 w-2 rounded-full bg-neutral-400 shadow-inner" />
                <span className="text-2xl animate-bounce">🚩</span>
              </div>
              <h2 className="pr-24 text-2xl font-extrabold sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                LEVEL CLEAR: READ MAIL
              </h2>
              <p className="mt-1 font-bold text-sky-800">{selectedEmail.subject}</p>
              <p className="text-sm opacity-70">
                {selectedEmail.from.name} · {selectedEmail.date}
              </p>
              <div className="mt-4 rounded-xl border-2 border-dashed border-sky-300 bg-white/80 p-4 leading-relaxed whitespace-pre-wrap">{selectedEmail.body}</div>
              <button type="button" className="btn btn-primary mt-6 gap-2 font-bold" onClick={() => setSelectedEmail(null)}>
                <span>⬅</span> Exit stage
              </button>
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border-4 border-dashed p-8 text-center" style={{ borderColor: 'var(--card)', background: 'color-mix(in srgb, var(--card) 35%, transparent)' }}>
              <p className="text-6xl mb-4 animate-pulse">🍄</p>
              <p className="max-w-md text-lg font-bold text-white drop-shadow-md">Hit a ? block on the left to reveal a message!</p>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 space-y-3">
          <div className="rounded-xl border-4 p-3 shadow-md" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
            <p className="text-center text-xs font-black uppercase" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Sky report
            </p>
            <p className="text-center text-4xl">{weather.icon}</p>
            <p className="text-center text-sm font-bold">{weather.condition}</p>
          </div>
          <div className="rounded-xl border-4 p-3 shadow-md" style={{ borderColor: 'var(--accent3)', background: 'var(--card)' }}>
            <p className="mb-2 text-center text-xs font-black" style={{ fontFamily: 'var(--font-display)' }}>
              Coin stocks
            </p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between text-sm font-bold">
                <span>{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-success' : 'text-error'}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border-4 p-2 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            {news.slice(0, 2).map((n, i) => (
              <p key={i} className="mb-2 font-semibold opacity-80">
                📰 {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
