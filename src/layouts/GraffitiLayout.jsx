import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagColor = t => ({ work: '#00d4ff', personal: '#ff2d55', finance: '#ffe033', promo: '#00ff88', newsletter: '#ff6600' }[t] || '#ffffff')

const Drip = ({ color, height = 60, style = {} }) => (
  <div className="absolute bottom-0 w-3 rounded-b-full opacity-80" style={{ background: color, height, ...style }} />
)

const SprayText = ({ children, size = 'text-2xl', color = 'var(--accent)', className = '' }) => (
  <span className={`${size} font-bold ${className}`} style={{
    fontFamily: 'var(--font-display)',
    color,
    textShadow: `2px 2px 0px rgba(0,0,0,0.8), 0 0 20px ${color}44`,
  }}>{children}</span>
)

export default function GraffitiLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [hoverId, setHoverId] = useState(null)

  return (
    <div className="min-h-screen overflow-hidden" style={{
      background: '#111 url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%231a1a1a\'/%3E%3Crect x=\'0\' y=\'0\' width=\'200\' height=\'3\' fill=\'%23222\'/%3E%3Crect x=\'0\' y=\'50\' width=\'200\' height=\'2\' fill=\'%23222\'/%3E%3Crect x=\'0\' y=\'100\' width=\'200\' height=\'3\' fill=\'%23222\'/%3E%3Crect x=\'0\' y=\'150\' width=\'200\' height=\'2\' fill=\'%23222\'/%3E%3Crect x=\'0\' y=\'0\' width=\'3\' height=\'200\' fill=\'%23222\'/%3E%3Crect x=\'50\' y=\'0\' width=\'2\' height=\'200\' fill=\'%23222\'/%3E%3Crect x=\'100\' y=\'0\' width=\'3\' height=\'200\' fill=\'%23222\'/%3E%3Crect x=\'150\' y=\'0\' width=\'2\' height=\'200\' fill=\'%23222\'/%3E%3C/svg%3E")',
      fontFamily: 'var(--font-main)',
    }}>

      {/* HEADER — big spray tag */}
      <div className="relative overflow-hidden px-8 py-6 border-b-4" style={{ borderColor: 'var(--accent)', background: '#0d0d0d' }}>
        <div className="relative z-10">
          <SprayText size="text-5xl" color="var(--accent)">THE INBOX WALL</SprayText>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-main)' }}>
              🎨 {emails.length} PIECES UP · EST. 2026 · ALL CITY
            </span>
            <button onClick={onSwitchPersona} className="text-xs px-3 py-1 rounded border"
              style={{ borderColor: 'var(--accent3)', color: 'var(--accent3)', fontFamily: 'var(--font-main)' }}>
              SWITCH WRITER
            </button>
          </div>
        </div>
        {/* Drip effects */}
        <div className="absolute top-0 left-12"><Drip color="var(--accent)" height={45} /></div>
        <div className="absolute top-0 left-32"><Drip color="var(--accent2)" height={35} /></div>
        <div className="absolute top-0 right-24"><Drip color="var(--accent3)" height={50} /></div>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 92px)' }}>
        {/* Tag list — left wall */}
        <div className="w-72 shrink-0 overflow-y-auto border-r p-3 space-y-2" style={{ borderColor: '#333' }}>
          <div className="text-xs mb-2 opacity-50" style={{ color: '#fff', fontFamily: 'var(--font-main)' }}>
            // PIECES ON THE WALL
          </div>
          {emails.map(e => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              onMouseEnter={() => setHoverId(e.id)} onMouseLeave={() => setHoverId(null)}
              className="relative p-3 rounded cursor-pointer overflow-hidden transition-transform"
              style={{
                background: '#1e1e1e',
                border: `2px solid ${selectedEmail?.id === e.id ? tagColor(e.tag) : '#333'}`,
                transform: `rotate(${(e.id % 3 - 1) * 0.8}deg) ${hoverId === e.id ? 'scale(1.02)' : 'scale(1)'}`,
                boxShadow: selectedEmail?.id === e.id ? `0 0 20px ${tagColor(e.tag)}44` : 'none',
              }}>
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: tagColor(e.tag), color: '#000', fontFamily: 'var(--font-main)' }}>
                  {e.tag.toUpperCase()}
                </span>
                {!e.read && <span className="text-xs" style={{ color: 'var(--accent)' }}>●</span>}
              </div>
              <div className="font-bold text-sm truncate" style={{ color: tagColor(e.tag), fontFamily: 'var(--font-display)' }}>
                {e.subject}
              </div>
              <div className="text-xs opacity-50 truncate mt-0.5" style={{ color: '#aaa' }}>{e.from.name} · {e.date}</div>
            </div>
          ))}
        </div>

        {/* Main wall */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedEmail ? (
            <div className="relative p-6 rounded-lg" style={{
              background: '#1a1a1a',
              border: `3px solid ${tagColor(selectedEmail.tag)}`,
              boxShadow: `0 0 40px ${tagColor(selectedEmail.tag)}22`,
            }}>
              {/* Tag header */}
              <div className="mb-4 pb-4 border-b" style={{ borderColor: '#333' }}>
                <SprayText size="text-3xl" color={tagColor(selectedEmail.tag)}>{selectedEmail.subject}</SprayText>
                <div className="mt-1 text-xs opacity-60" style={{ color: '#aaa', fontFamily: 'var(--font-main)' }}>
                  FROM: {selectedEmail.from.name.toUpperCase()} · {selectedEmail.date} · {selectedEmail.tag.toUpperCase()}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#ddd', fontFamily: 'var(--font-main)' }}>
                {selectedEmail.body}
              </p>
              <button onClick={() => setSelectedEmail(null)} className="mt-4 text-xs opacity-50 hover:opacity-100" style={{ color: '#aaa', fontFamily: 'var(--font-main)' }}>
                ← BACK TO THE WALL
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <SprayText size="text-6xl" color="#333">PICK A PIECE</SprayText>
            </div>
          )}
        </div>

        {/* Right sidebar — stickers */}
        <div className="w-56 shrink-0 overflow-y-auto border-l p-3 space-y-3" style={{ borderColor: '#333' }}>
          {/* Weather sticker */}
          <div className="p-3 rounded-xl" style={{ background: '#ffe033', transform: 'rotate(-2deg)' }}>
            <div className="font-bold text-xs" style={{ color: '#000', fontFamily: 'var(--font-display)' }}>WEATHER</div>
            <div className="text-2xl text-center">{weather.icon}</div>
            <div className="text-xs text-center font-bold" style={{ color: '#000' }}>{weather.temp}° {weather.condition}</div>
            <div className="text-xs text-center opacity-60" style={{ color: '#000' }}>{weather.wind}kph</div>
          </div>

          {/* Stocks sticker */}
          <div className="p-3 rounded-xl" style={{ background: '#ff2d55', transform: 'rotate(1.5deg)' }}>
            <div className="font-bold text-xs mb-1" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>THE HUSTLE</div>
            {stocks.slice(0,3).map(s => (
              <div key={s.ticker} className="flex justify-between text-xs" style={{ color: '#fff' }}>
                <span>{s.ticker}</span>
                <span className="font-bold">{s.changePct > 0 ? '▲' : '▼'}{Math.abs(s.changePct)}%</span>
              </div>
            ))}
          </div>

          {/* News tags */}
          <div className="p-3 rounded-xl" style={{ background: '#00d4ff', transform: 'rotate(-1deg)' }}>
            <div className="font-bold text-xs mb-1" style={{ color: '#000', fontFamily: 'var(--font-display)' }}>WORD ON THE STREET</div>
            {news.slice(0,3).map((n,i) => (
              <div key={i} className="text-xs mb-1 opacity-80 leading-tight" style={{ color: '#000' }}>{n.title}</div>
            ))}
          </div>

          {/* Throw-up style decoration */}
          <div className="p-3 rounded-xl text-center" style={{ background: '#00ff88', transform: 'rotate(2deg)' }}>
            <div className="font-bold text-sm" style={{ color: '#000', fontFamily: 'var(--font-display)' }}>
              {news.length} STORIES
            </div>
            <div className="text-xs opacity-70" style={{ color: '#000' }}>IN THE CIPHER</div>
          </div>
        </div>
      </div>
    </div>
  )
}
