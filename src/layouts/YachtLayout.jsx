import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function YachtLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div
      className="min-h-screen yacht-horizon relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #061018 0%, #0c2840 35%, #0a2034 70%, #061018 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, var(--accent) 2px, var(--accent) 3px)',
        }}
      />
      <header className="relative z-10 border-b px-6 py-5 yacht-deck-rock" style={{ borderColor: 'var(--border)', background: 'linear-gradient(180deg, rgba(201,169,98,0.12) 0%, transparent)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] mb-1" style={{ color: 'var(--accent)' }}>MARINA DIGITAL · CHARTER CLASS</p>
            <h1 className="text-4xl md:text-5xl font-normal" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              The Correspondence Bay
            </h1>
            <p className="text-sm mt-1 opacity-70">Curated messages · {emails.length} berths occupied</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="opacity-80">⛵ {weather.city}</span>
            <button type="button" className="border px-4 py-2 rounded-none tracking-widest text-xs uppercase transition hover:bg-white/5"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={onSwitchPersona}>
              Disembark
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <aside className="w-72 shrink-0 border-r overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="px-4 py-3 text-xs tracking-widest border-b" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
            MANIFEST
          </div>
          {emails.map(e => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-4 py-3 border-b transition-colors hover:bg-white/5"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(201,169,98,0.12)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{e.from.avatar}</span>
                {!e.read && <span className="text-[10px] px-1.5 py-0.5 uppercase tracking-wide" style={{ background: 'var(--accent)', color: '#061018' }}>NEW</span>}
              </div>
              <div className="font-semibold text-sm truncate" style={{ fontFamily: 'var(--font-display)', color: selectedEmail?.id === e.id ? 'var(--accent2)' : 'var(--text)' }}>{e.subject}</div>
              <div className="text-xs opacity-50 mt-0.5">{e.from.name} · {e.date}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {selectedEmail ? (
            <article className="max-w-2xl mx-auto border p-8 yacht-deck-rock" style={{ borderColor: 'var(--accent)', background: 'linear-gradient(180deg, var(--card) 0%, var(--bg2) 100%)', boxShadow: '0 0 0 1px rgba(201,169,98,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between items-start gap-4 mb-6 flex-wrap">
                <div>
                  <p className="text-xs tracking-[0.2em] mb-2" style={{ color: 'var(--accent)' }}>OFFICIAL DISPATCH</p>
                  <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>{selectedEmail.subject}</h2>
                </div>
                <div className="text-right text-sm opacity-70">
                  <div>{selectedEmail.from.name}</div>
                  <div>{selectedEmail.date}</div>
                </div>
              </div>
              <div className="max-w-none text-base leading-relaxed whitespace-pre-wrap border-t pt-6 opacity-95" style={{ borderColor: 'var(--border)' }}>
                {selectedEmail.body}
              </div>
            </article>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40 text-center">
              <div className="text-7xl mb-4 animate-pulse">⚓</div>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-xl tracking-widest">Select a message from the manifest</p>
            </div>
          )}
        </main>

        <aside className="w-56 shrink-0 border-l overflow-y-auto p-4 space-y-4 hidden lg:block" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border p-3 text-center" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] tracking-widest mb-2 opacity-60">DECK WEATHER</p>
            <div className="text-4xl mb-1">{weather.icon}</div>
            <p className="text-sm font-semibold">{weather.condition}</p>
            <p className="text-xs opacity-60">{weather.temp}° · wind {weather.wind}</p>
          </div>
          <div className="border p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] tracking-widest mb-2 text-center opacity-60">HARBOR TICKERS</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between text-xs py-1 border-b border-white/5">
                <span style={{ color: 'var(--accent2)' }}>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#6dffb4' : '#ff8a8a' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border p-3 text-xs space-y-2" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] tracking-widest text-center opacity-60">MARITIME BRIEF</p>
            {news.slice(0, 3).map(n => (
              <p key={n.id} className="opacity-80 leading-snug border-l-2 pl-2" style={{ borderColor: 'var(--accent)' }}>{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
