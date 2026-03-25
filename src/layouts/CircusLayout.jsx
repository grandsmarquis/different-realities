import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const actNum = n => ['I','II','III','IV','V','VI','VII','VIII','IX','X'][n] || String(n+1)
const tagAct = t => ({ work:'THE OFFICE ACT', personal:'A PERSONAL AFFAIR', finance:'THE MONEY TRICK', promo:'THE GRAND ADVERTISEMENT', newsletter:'THE WEEKLY CHRONICLE' }[t] || 'THE UNKNOWN ACT')

const Spotlight = ({ children, active }) => (
  <div className="relative" style={{
    background: active ? 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.15) 0%, transparent 70%)' : 'transparent',
  }}>
    {children}
  </div>
)

export default function CircusLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>

      {/* Big Top Header */}
      <div className="relative overflow-hidden">
        {/* Tent stripes */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #cc0000 0px, #cc0000 40px, #1a0808 40px, #1a0808 80px)',
          opacity: 0.6,
        }} />
        <div className="relative z-10 text-center py-8 px-4">
          <div className="text-xs tracking-widest mb-2 opacity-80" style={{ color: '#ffd700' }}>
            ✦ ✦ ✦ PRESENTING ✦ ✦ ✦
          </div>
          <h1 className="text-5xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#ffd700', textShadow: '3px 3px 0 #cc0000, 6px 6px 0 rgba(0,0,0,0.5)' }}>
            THE MAGNIFICENT INBOX
          </h1>
          <div className="text-sm opacity-80 mb-2">UNDER THE GREATEST BIG TOP IN ALL THE DIGITAL LAND</div>
          <div className="flex items-center justify-center gap-6 text-xs">
            <span>🎪 {emails.length} SPECTACULAR ACTS</span>
            <span>🎭 {weather.condition} TONIGHT</span>
            <button onClick={onSwitchPersona} className="px-4 py-1 rounded font-bold text-xs border-2"
              style={{ borderColor: '#ffd700', color: '#ffd700', background: 'transparent' }}>
              CHANGE SHOW
            </button>
          </div>
        </div>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 180px)' }}>
        {/* ACTS PLAYBILL */}
        <div className="w-72 shrink-0 border-r overflow-y-auto" style={{ borderColor: '#5c2020' }}>
          <div className="text-center py-2 border-b text-xs tracking-widest" style={{ borderColor: '#5c2020', color: '#cc0000' }}>
            ⭐ TONIGHT'S PROGRAMME ⭐
          </div>
          {emails.map((e, i) => (
            <Spotlight key={e.id} active={selectedEmail?.id === e.id}>
              <div onClick={() => setSelectedEmail(e)}
                className="px-4 py-3 border-b cursor-pointer hover:opacity-80"
                style={{ borderColor: '#2a0a0a', background: selectedEmail?.id === e.id ? '#2a0808' : 'transparent' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold" style={{ color: '#cc0000', fontFamily: 'var(--font-display)' }}>ACT {actNum(i)}</span>
                  {!e.read && <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: '#ffd700', color: '#000' }}>NEW</span>}
                </div>
                <div className="font-bold text-sm truncate" style={{ color: e.read ? '#7a5020' : '#ffd700' }}>{e.subject}</div>
                <div className="text-xs opacity-50 italic mt-0.5">{tagAct(e.tag)}</div>
                <div className="text-xs opacity-40">{e.from.name} · {e.date}</div>
              </div>
            </Spotlight>
          ))}
        </div>

        {/* MAIN RING */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedEmail ? (
            <div>
              {/* Spotlight announcement */}
              <div className="text-center mb-6" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.1) 0%, transparent 60%)' }}>
                <div className="text-xs tracking-widest mb-1 opacity-60">🎪 NOW PERFORMING IN THE CENTER RING 🎪</div>
                <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#ffd700' }}>
                  {selectedEmail.subject}
                </h2>
                <div className="text-sm italic opacity-70">{tagAct(selectedEmail.tag)} · Featuring: {selectedEmail.from.name}</div>
              </div>
              {/* Performance content */}
              <div className="max-w-2xl mx-auto border-2 rounded-lg p-6" style={{ borderColor: '#5c2020', background: '#120606' }}>
                <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-center">
                  {[['PERFORMER', selectedEmail.from.name], ['DATE', selectedEmail.date], ['CATEGORY', selectedEmail.tag]].map(([k,v]) => (
                    <div key={k} className="border rounded p-2" style={{ borderColor: '#5c2020' }}>
                      <div className="opacity-50 mb-1">{k}</div>
                      <div style={{ color: '#cc0000' }} className="font-bold truncate">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="border rounded p-4 leading-relaxed text-sm" style={{ borderColor: '#2a0a0a', background: '#0a0202' }}>
                  {selectedEmail.body}
                </div>
                <button onClick={() => setSelectedEmail(null)}
                  className="mt-4 text-xs italic opacity-50 hover:opacity-100">
                  ← Return to programme
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center opacity-30">
                <div className="text-8xl mb-4">🎪</div>
                <div className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>SELECT AN ACT TO BEGIN</div>
              </div>
            </div>
          )}
        </div>

        {/* SHOW INFO SIDEBAR */}
        <div className="w-60 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: '#5c2020' }}>
          {/* Weather */}
          <div className="border rounded p-3 text-center" style={{ borderColor: '#5c2020' }}>
            <div className="text-xs tracking-widest mb-2 opacity-60">SHOW CONDITIONS</div>
            <div className="text-3xl mb-1">{weather.icon}</div>
            <div className="font-bold text-sm">{weather.condition}</div>
            <div className="text-xs opacity-60">{weather.temp}° · Wind {weather.wind}kph</div>
          </div>

          {/* Stocks as "box office" */}
          <div className="border rounded p-3" style={{ borderColor: '#5c2020' }}>
            <div className="text-xs tracking-widest mb-2 opacity-60 text-center">🎟 BOX OFFICE</div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 text-xs border-b" style={{ borderColor: '#2a0a0a' }}>
                <span className="italic opacity-80">{s.ticker}</span>
                <span className="font-bold" style={{ color: s.changePct >= 0 ? '#00ff88' : '#ff4444' }}>
                  {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as "the show goes on" */}
          <div className="border rounded p-3" style={{ borderColor: '#5c2020' }}>
            <div className="text-xs tracking-widest mb-2 opacity-60 text-center">🎭 THE SHOW GOES ON</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs italic opacity-70" style={{ borderColor: '#2a0a0a' }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
