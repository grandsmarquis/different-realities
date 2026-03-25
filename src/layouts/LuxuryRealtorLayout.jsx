import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function LuxuryRealtorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <header className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="realtor-shimmer absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative px-6 py-10 max-w-6xl mx-auto flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] mb-2" style={{ color: 'var(--accent)' }}>OFF-MARKET · WHITE GLOVE</p>
            <h1 className="text-4xl md:text-6xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              The Grand Inbox
            </h1>
            <p className="text-sm mt-2 opacity-60">Exclusive listings of correspondence · {emails.length} opportunities</p>
          </div>
          <button type="button" onClick={onSwitchPersona} className="border-2 px-8 py-3 text-xs tracking-[0.2em] uppercase transition hover:bg-white/5"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Other brokerage
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <aside className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="px-4 py-3 text-xs tracking-widest border-b flex justify-between items-center" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
            <span>PORTFOLIO</span>
            <span className="opacity-50">{emails.filter(e => !e.read).length} new</span>
          </div>
          {emails.map(e => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-4 py-4 border-b group transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'var(--accent3)' : 'transparent',
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-2xl">{e.from.avatar}</span>
                {!e.read && <span className="text-[10px] px-2 py-0.5" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>JUST LISTED</span>}
              </div>
              <div className="font-semibold text-sm leading-snug group-hover:underline decoration-1 underline-offset-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                {e.subject}
              </div>
              <div className="text-xs opacity-50 mt-1">{e.from.name}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-12" style={{ background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
          {selectedEmail ? (
            <div className="max-w-2xl mx-auto">
              <div className="border-2 p-1 mb-6" style={{ borderColor: 'var(--accent)' }}>
                <div className="border p-8 md:p-12" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <div className="flex flex-wrap gap-4 justify-between items-start mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <p className="text-xs tracking-widest opacity-50 mb-1">PROPERTY DETAIL</p>
                      <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>{selectedEmail.subject}</h2>
                    </div>
                    <div className="text-right text-sm">
                      <p className="opacity-50">Seller rep</p>
                      <p className="font-semibold">{selectedEmail.from.name}</p>
                      <p className="opacity-50 mt-2">Date</p>
                      <p>{selectedEmail.date}</p>
                    </div>
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap text-base opacity-90">
                    {selectedEmail.body}
                  </div>
                  <div className="mt-10 pt-6 border-t flex flex-wrap gap-4 justify-center" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-xs tracking-widest px-4 py-2 border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>Schedule viewing</span>
                    <span className="text-xs tracking-widest px-4 py-2 opacity-40">Disclosures available</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[320px] flex items-center justify-center opacity-30">
              <div className="text-center">
                <p className="text-7xl mb-4">🔑</p>
                <p className="text-xl tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>Select a listing</p>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:w-56 shrink-0 border-t lg:border-t-0 lg:border-l p-4 space-y-4 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border p-4 text-center" style={{ borderColor: 'var(--border)' }}>
            <p className="tracking-widest opacity-50 mb-2">CLIMATE CONTROL</p>
            <div className="text-4xl">{weather.icon}</div>
            <p className="font-semibold mt-1">{weather.condition}</p>
            <p className="opacity-60">{weather.temp}°</p>
          </div>
          <div className="border p-4" style={{ borderColor: 'var(--border)' }}>
            <p className="tracking-widest opacity-50 mb-2 text-center">MARKET COMP</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 border-b border-white/5">
                <span style={{ color: 'var(--accent)' }}>{s.ticker}</span>
                <span>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border p-4 space-y-2" style={{ borderColor: 'var(--border)' }}>
            <p className="tracking-widest opacity-50 text-center">PRESS</p>
            {news.slice(0, 3).map(n => (
              <p key={n.id} className="opacity-75 leading-snug">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
