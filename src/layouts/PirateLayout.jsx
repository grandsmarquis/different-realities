import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const CompassRose = () => (
  <div className="absolute top-4 right-4 w-20 h-20 opacity-20 select-none pointer-events-none" style={{ color: 'var(--accent)' }}>
    <svg viewBox="0 0 80 80" fill="currentColor">
      <polygon points="40,4 44,36 40,40 36,36" /><polygon points="76,40 44,44 40,40 44,36" opacity=".6"/>
      <polygon points="40,76 36,44 40,40 44,44" opacity=".6"/><polygon points="4,40 36,36 40,40 36,44" />
      <circle cx="40" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
  </div>
)

const tagLabel = t => ({ work: 'MERCHANT PARLEY', personal: 'PERSONAL DISPATCH', finance: 'TREASURY LEDGER', promo: 'BROADSIDE', newsletter: 'GAZETTE' }[t] || t.toUpperCase())

export default function PirateLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen" style={{
      background: `var(--bg) url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='80' y2='80' stroke='%23a08040' stroke-width='0.4' opacity='0.3'/%3E%3Cline x1='80' y1='0' x2='0' y2='80' stroke='%23a08040' stroke-width='0.4' opacity='0.3'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke='%23a08040' stroke-width='0.3' opacity='0.2'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke='%23a08040' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E")`,
      fontFamily: 'var(--font-main)', color: 'var(--text)',
    }}>
      {/* Header — ship's log */}
      <div className="relative border-b-4 px-8 py-5" style={{ borderColor: 'var(--accent)', background: '#b8924a' }}>
        <CompassRose />
        <div className="text-xs tracking-widest opacity-60 mb-1">🏴‍☠️ CAPTAIN'S LOG — THE SALTY INBOX</div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
          S.S. ELECTRONIC CORRESPONDENCE
        </h1>
        <div className="text-sm italic opacity-70 mt-1">
          Lat: {weather.temp}°N · Wind: {weather.wind}kts {'NW'} · Condition: {weather.condition}
        </div>
        <button onClick={onSwitchPersona} className="absolute bottom-4 left-8 text-xs italic opacity-60 hover:opacity-100">
          ⚓ Change Course
        </button>
      </div>

      <div className="flex min-h-0" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Log entries */}
        <div className="w-80 shrink-0 border-r overflow-y-auto" style={{ borderColor: 'var(--accent2)' }}>
          <div className="px-4 py-2 text-xs tracking-widest opacity-60 border-b" style={{ borderColor: 'var(--border)' }}>
            ⚓ SHIP'S LOG ENTRIES — {emails.length} DISPATCHES
          </div>
          {emails.map((e, idx) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="px-4 py-3 border-b cursor-pointer hover:opacity-80"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(139,26,0,0.15)' : 'transparent',
                borderLeftWidth: selectedEmail?.id === e.id ? '4px' : '0',
                borderLeftColor: 'var(--accent)',
              }}>
              <div className="flex justify-between mb-0.5">
                <span className="text-xs opacity-50">Entry #{String(idx+1).padStart(3,'0')}</span>
                <span className="text-xs opacity-50">{e.date}</span>
              </div>
              <div className="text-xs opacity-60 mb-0.5" style={{ color: 'var(--accent)' }}>{tagLabel(e.tag)}</div>
              <div className="font-bold text-sm truncate" style={{ color: e.read ? 'var(--text2)' : 'var(--text)' }}>{e.subject}</div>
              <div className="text-xs italic opacity-60 truncate">From {e.from.name}</div>
            </div>
          ))}
        </div>

        {/* Main log area */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedEmail ? (
            <div className="max-w-2xl">
              {/* Parchment paper effect */}
              <div className="border-2 rounded p-8 relative" style={{
                borderColor: 'var(--accent)',
                background: '#d4b87a',
                boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
              }}>
                <div className="text-center border-b pb-3 mb-4" style={{ borderColor: 'var(--accent2)' }}>
                  <div className="text-xs opacity-50 mb-1">— {tagLabel(selectedEmail.tag)} —</div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                  <div className="text-sm italic opacity-70 mt-1">
                    Received from {selectedEmail.from.name} · {selectedEmail.date}
                  </div>
                </div>
                <p className="leading-relaxed italic">{selectedEmail.body}</p>
                <div className="mt-4 text-right text-xs opacity-50 italic">
                  — End of dispatch. Witness: ye captain —
                </div>
                <button onClick={() => setSelectedEmail(null)}
                  className="mt-3 text-xs opacity-50 hover:opacity-100 italic">
                  ↩ Return to log
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-30">
              <div className="text-center">
                <div className="text-6xl mb-3">🏴‍☠️</div>
                <div className="text-lg italic">Choose an entry from the ship's log, matey.</div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: weather/news/stocks */}
        <div className="w-64 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--accent2)' }}>
          {/* Tide/weather */}
          <div className="border-2 rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="font-bold mb-2 text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              🌊 TIDE & WEATHER
            </div>
            <div className="text-2xl text-center mb-1">{weather.icon}</div>
            <div className="text-center text-sm font-bold">{weather.condition}</div>
            <div className="text-xs opacity-70 text-center">{weather.temp}° · {weather.wind}kts</div>
            <div className="text-xs italic opacity-50 mt-1 text-center">"{weather.condition}"</div>
          </div>

          {/* Plunder ledger */}
          <div className="border-2 rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="font-bold mb-2 text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              💰 PLUNDER LEDGER
            </div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 text-xs border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="italic">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>
                  {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* Port reports */}
          <div className="border-2 rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="font-bold mb-2 text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              ⚓ PORT REPORTS
            </div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs italic opacity-80" style={{ borderColor: 'var(--border)' }}>
                {n.title}
                <div className="opacity-50 not-italic mt-0.5">— {n.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
