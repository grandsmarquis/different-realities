import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function HomelessLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none" aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <header className="relative border-b-4 px-4 py-6 homeless-paper-glow" style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)', boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.15)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] mb-1 opacity-70">COMMUNITY BULLETIN · FREE TO READ</p>
          <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            The Street Chronicle
          </h1>
          <p className="text-sm mt-2 max-w-xl mx-auto opacity-80 leading-relaxed">
            Weather, word on the street, and messages — same info as everyone else, different coat.
          </p>
          <button type="button" onClick={onSwitchPersona} className="mt-4 text-xs underline decoration-2 underline-offset-4 opacity-70 hover:opacity-100">
            Switch perspective
          </button>
        </div>
      </header>

      <div className="relative flex flex-col xl:flex-row max-w-7xl mx-auto" style={{ minHeight: 'calc(100vh - 180px)' }}>
        <aside className="xl:w-72 shrink-0 border-b xl:border-b-0 xl:border-r p-3 overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="text-center text-xs font-bold mb-3 pb-2 border-b-2 border-dashed" style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}>
            📌 NOTES LEFT FOR YOU
          </div>
          <div className="space-y-3">
            {emails.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="w-full text-left p-3 border-2 border-dashed transition-transform hover:-rotate-1 relative"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg2)',
                  transform: selectedEmail?.id === e.id ? 'rotate(-0.5deg)' : 'rotate(0.3deg)',
                  boxShadow: selectedEmail?.id === e.id ? '4px 4px 0 var(--accent2)' : '2px 2px 0 rgba(0,0,0,0.2)',
                }}
              >
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg" aria-hidden>📎</span>
                <div className="mt-2 flex items-center gap-2">
                  <span>{e.from.avatar}</span>
                  {!e.read && <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--accent)' }}>Unread</span>}
                </div>
                <div className="font-bold text-sm mt-1 leading-snug">{e.subject}</div>
                <div className="text-xs opacity-60 mt-1">{e.from.name} · {e.date}</div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {selectedEmail ? (
            <article className="max-w-2xl mx-auto border-4 p-6 md:p-8 relative homeless-paper-glow" style={{ borderColor: 'var(--border)', background: 'linear-gradient(180deg, #faf6ef08 0%, var(--card) 100%)' }}>
              <div className="absolute top-2 right-4 text-2xl opacity-40" aria-hidden>✶</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                {selectedEmail.subject}
              </h2>
              <p className="text-sm opacity-70 mb-6 border-b border-dashed pb-4" style={{ borderColor: 'var(--border)' }}>
                From <strong>{selectedEmail.from.name}</strong> · {selectedEmail.date}
              </p>
              <div className="leading-relaxed whitespace-pre-wrap text-base columns-1 md:columns-2 gap-8" style={{ columnRule: '1px solid var(--border)' }}>
                {selectedEmail.body}
              </div>
              <p className="text-xs mt-8 opacity-50 italic border-t border-dashed pt-4" style={{ borderColor: 'var(--border)' }}>
                Stay warm. Ask for help if you need it. You matter.
              </p>
            </article>
          ) : (
            <div className="h-full min-h-[280px] flex items-center justify-center opacity-40 text-center px-4">
              <div>
                <p className="text-5xl mb-4">📰</p>
                <p className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>Tap a note on the board</p>
              </div>
            </div>
          )}
        </main>

        <aside className="xl:w-64 shrink-0 border-t xl:border-t-0 xl:border-l p-4 space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border-2 border-dashed p-4" style={{ borderColor: 'var(--accent2)' }}>
            <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--accent)' }}>TONIGHT&apos;S SKY</p>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{weather.icon}</span>
              <div>
                <p className="font-bold">{weather.temp}° · {weather.condition}</p>
                <p className="text-xs opacity-70">Wind {weather.wind} — dress in layers</p>
              </div>
            </div>
          </div>
          <div className="border p-3 text-xs" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold mb-2 opacity-70">SHELTER &amp; FOOD (INFO ONLY)</p>
            <p className="opacity-80 leading-relaxed mb-2">Local tickers move money downtown — not your fault if they dip.</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 font-mono text-[11px] border-b border-white/5">
                <span>{s.ticker}</span>
                <span>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border p-3 text-xs space-y-2" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold opacity-70">WHAT FOLKS ARE SAYING</p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="leading-snug opacity-85">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
