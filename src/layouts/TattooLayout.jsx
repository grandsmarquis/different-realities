import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function TattooLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23c45c26' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <header className="relative border-b-4 px-4 py-6" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.4em] mb-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>INK &amp; IRON STUDIO</p>
            <h1 className="text-4xl md:text-6xl leading-none" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em', color: 'var(--accent2)' }}>
              FLASH MAIL
            </h1>
            <p className="text-sm mt-2 opacity-60 italic">Walk-ins welcome · {emails.filter(e => !e.read).length} fresh sheets</p>
          </div>
          <button type="button" onClick={onSwitchPersona}
            className="tattoo-buzz border-2 px-6 py-2 uppercase text-sm tracking-widest"
            style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)', background: 'transparent' }}>
            Exit shop
          </button>
        </div>
      </header>

      <div className="relative flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <aside className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto max-h-[40vh] lg:max-h-none" style={{ borderColor: 'var(--border)' }}>
          <div className="sticky top-0 px-3 py-2 text-center text-xs tracking-[0.3em] border-b" style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--accent)' }}>
            CHOOSE YOUR PIECE
          </div>
          <div className="p-2 grid grid-cols-1 gap-2">
            {emails.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="tattoo-buzz text-left border-2 p-3 transition-all hover:scale-[1.02]"
                style={{
                  borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--border)',
                  background: selectedEmail?.id === e.id ? 'var(--accent3)' : 'var(--card)',
                  boxShadow: selectedEmail?.id === e.id ? '0 0 20px rgba(196,92,38,0.25)' : 'none',
                }}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-2xl opacity-80" style={{ fontFamily: 'var(--font-display)' }}>{String(i + 1).padStart(2, '0')}</span>
                  {!e.read && <span className="text-[10px] font-bold px-1" style={{ color: 'var(--accent)' }}>WET</span>}
                </div>
                <div className="font-bold text-sm mt-1 line-clamp-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>{e.subject}</div>
                <div className="text-xs opacity-50 mt-1">{e.from.name}</div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className="absolute top-4 right-8 w-24 h-24 rounded-full border-2 opacity-20 pointer-events-none" style={{ borderColor: 'var(--accent)' }} />
          {selectedEmail ? (
            <div className="max-w-2xl mx-auto border-4 p-8 relative" style={{ borderColor: 'var(--border)', background: 'radial-gradient(ellipse at 30% 0%, rgba(196,92,38,0.15) 0%, var(--bg) 55%)' }}>
              <div className="absolute -top-3 left-8 px-3 text-xs uppercase tracking-widest" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>Stencil approved</div>
              <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)', letterSpacing: '0.06em' }}>{selectedEmail.subject}</h2>
              <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-6 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <span>Artist: <strong style={{ color: 'var(--accent)' }}>{selectedEmail.from.name}</strong></span>
                <span>Session: {selectedEmail.date}</span>
              </div>
              <div className="leading-relaxed whitespace-pre-wrap text-base border-l-4 pl-6" style={{ borderColor: 'var(--accent)' }}>
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[320px] flex items-center justify-center">
              <div className="text-center opacity-30">
                <div className="text-8xl mb-4">🩸</div>
                <p style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }} className="text-xl">PICK A DESIGN FROM THE WALL</p>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l p-4 space-y-4 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border p-3 text-center" style={{ borderColor: 'var(--border)' }}>
            <p className="tracking-widest opacity-50 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Shop window</p>
            <div className="text-3xl">{weather.icon}</div>
            <p className="font-semibold mt-1">{weather.temp}° {weather.condition}</p>
          </div>
          <div className="border p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="tracking-widest opacity-50 mb-2 text-center" style={{ fontFamily: 'var(--font-display)' }}>Tip jar tickers</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 font-mono">
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#7dffb4' : '#ff6b6b' }}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border p-3 space-y-2" style={{ borderColor: 'var(--border)' }}>
            <p className="tracking-widest opacity-50 text-center" style={{ fontFamily: 'var(--font-display)' }}>Shop radio</p>
            {news.slice(0, 3).map(n => (
              <p key={n.id} className="opacity-70 leading-tight">· {n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
