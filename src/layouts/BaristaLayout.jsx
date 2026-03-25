import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function BaristaLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <header className="relative overflow-hidden border-b-8" style={{ borderColor: 'var(--accent2)', background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
        <div className="absolute right-10 top-4 flex gap-1 barista-steam h-16" aria-hidden>
          <span className="w-1 rounded-full bg-white/30" style={{ height: '100%' }} />
          <span className="w-1 rounded-full bg-white/25" style={{ height: '100%' }} />
          <span className="w-1 rounded-full bg-white/20" style={{ height: '100%' }} />
        </div>
        <div className="px-6 py-8 max-w-6xl mx-auto flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm mb-1 opacity-70">Third-wave · zero compromise</p>
            <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              The Daily Grind Inbox
            </h1>
            <p className="text-xs mt-2 tracking-widest opacity-50">ORIGIN: YOUR SERVER · PROCESS: NATURAL</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs opacity-60">
              <span className="inline-block w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
              Dialling in…
            </div>
            <button type="button" onClick={onSwitchPersona} className="rounded-full px-5 py-2 text-sm font-semibold transition hover:scale-105"
              style={{ background: 'var(--accent2)', color: 'var(--text)' }}>
              Close tab
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 160px)' }}>
        <aside className="md:w-72 shrink-0 border-b md:border-b-0 md:border-r overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-3 text-xs font-bold tracking-widest border-b flex items-center gap-2" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <span>☕</span> ORDERS (QUEUE)
          </div>
          {emails.map(e => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-4 py-3 border-b transition-colors relative overflow-hidden group"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(196,165,116,0.15)' : 'transparent',
              }}
            >
              <span className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'var(--accent)' }} />
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-lg">{e.from.avatar}</span>
                {!e.read && <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--accent2)' }}>Extra shot</span>}
              </div>
              <div className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)' }}>{e.subject}</div>
              <div className="text-xs opacity-50 mt-0.5">{e.from.name}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(107,68,35,0.2) 0%, transparent 50%)' }}>
          {selectedEmail ? (
            <article className="max-w-xl mx-auto relative">
              <div className="absolute -inset-4 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'var(--accent)' }} />
              <div className="relative border-2 rounded-3xl p-8 md:p-10" style={{ borderColor: 'var(--border)', background: 'var(--card)', boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl animate-pulse" style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)' }}>
                    {selectedEmail.from.avatar}
                  </div>
                </div>
                <h2 className="text-center text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{selectedEmail.subject}</h2>
                <p className="text-center text-sm opacity-60 mb-6">Tasting notes: {selectedEmail.tag} · {selectedEmail.date}</p>
                <div className="rounded-2xl p-6 text-sm leading-relaxed whitespace-pre-wrap" style={{ background: 'var(--bg2)', border: '1px dashed var(--border)' }}>
                  {selectedEmail.body}
                </div>
                <p className="text-center text-xs mt-6 opacity-40 italic">Cupping score: subjective / 10</p>
              </div>
            </article>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
              <div className="text-7xl mb-4 rotate-12">☕</div>
              <p className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>Select an order from the queue</p>
            </div>
          )}
        </main>

        <aside className="md:w-56 shrink-0 border-t md:border-t-0 md:border-l p-4 space-y-3 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <p className="opacity-50 mb-1 tracking-widest">PATIO</p>
            <div className="text-3xl">{weather.icon}</div>
            <p className="font-bold mt-1">{weather.temp}°</p>
            <p className="opacity-60">{weather.condition}</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <p className="opacity-50 mb-2 tracking-widest text-center">COMMODITY BEANS</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1">
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#86efac' : '#fca5a5' }}>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-4 space-y-2" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <p className="opacity-50 tracking-widest text-center">BARISTA FM</p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="opacity-80 leading-snug">{n.emoji} {n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
