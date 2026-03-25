import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const Corner = ({ pos }) => {
  const base = 'absolute w-12 h-12 pointer-events-none'
  const corners = { tl: 'top-0 left-0', tr: 'top-0 right-0 scale-x-[-1]', bl: 'bottom-0 left-0 scale-y-[-1]', br: 'bottom-0 right-0 scale-[-1]' }
  return (
    <div className={`${base} ${corners[pos]}`}>
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M4 4 L20 4 L20 8 L8 8 L8 20 L4 20 Z" fill="#8b1a1a" />
        <path d="M4 4 L4 4 L12 12" stroke="#c87941" strokeWidth="1" />
        <circle cx="20" cy="20" r="4" fill="none" stroke="#8b1a1a" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

const DropCap = ({ char }) => (
  <span className="float-left text-5xl leading-none mr-2 mt-1 font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
    {char}
  </span>
)

export default function MedievalLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  const tagLabel = t => ({ work: 'OFFICIAL MISSIVE', personal: 'PERSONAL CORRESPONDENCE', finance: 'TREASURY MATTERS', promo: 'TOWN CRIER NOTICE', newsletter: 'CHRONICLE' }[t] || t.toUpperCase())

  return (
    <div className="min-h-screen p-6 relative" style={{ background: '#e8d890 url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0 L60 30 L30 60 L0 30 Z\' fill=\'none\' stroke=\'%23c8a060\' stroke-width=\'0.3\' opacity=\'0.4\'/%3E%3C/svg%3E")', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>

      {/* Outer ornate border */}
      <div className="relative border-4 rounded min-h-screen p-6" style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }}>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-4" style={{ borderColor: 'var(--accent)', borderImage: 'none' }}>
          <div className="text-xs tracking-widest opacity-60 mb-1">✦ SCROLLS OF THE DIGITAL AGE ✦</div>
          <h1 className="text-4xl mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            The Inbox Codex
          </h1>
          <div className="text-sm italic opacity-70">Herein lie all messages received by the grace of the network, Anno Domini MMXXVI</div>
          <button onClick={onSwitchPersona} className="mt-2 text-xs italic opacity-60 hover:opacity-100 underline">
            ⟨ Choose a Different Scribe ⟩
          </button>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: '2fr 1fr' }}>
          {/* Main manuscript column */}
          <div>
            {selectedEmail ? (
              <div className="relative border-2 rounded p-6" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
                <div className="text-center border-b pb-3 mb-4" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs tracking-widest opacity-60 mb-1">— {tagLabel(selectedEmail.tag)} —</div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{selectedEmail.subject}</h2>
                  <div className="text-sm italic opacity-70 mt-1">From: {selectedEmail.from.name} · {selectedEmail.date}</div>
                </div>
                <p className="leading-relaxed text-sm">
                  <DropCap char={selectedEmail.body[0]} />
                  {selectedEmail.body.slice(1)}
                </p>
                <div className="mt-4 text-right">
                  <button onClick={() => setSelectedEmail(null)} className="text-xs italic opacity-60 hover:opacity-100" style={{ color: 'var(--accent)' }}>
                    ✦ Roll up this scroll ✦
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {emails.map(e => (
                  <div key={e.id} onClick={() => setSelectedEmail(e)}
                    className="border-2 rounded p-4 cursor-pointer hover:shadow-md transition-shadow"
                    style={{ borderColor: 'var(--border)', background: 'var(--card)', borderLeftColor: 'var(--accent)' }}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-xs tracking-wider opacity-60" style={{ color: 'var(--accent)' }}>
                        {tagLabel(e.tag)}
                      </div>
                      <div className="text-xs opacity-50 italic">{e.date}</div>
                    </div>
                    <div className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: e.read ? 'var(--text2)' : 'var(--text)' }}>
                      {e.subject}
                    </div>
                    <div className="text-sm italic opacity-60">By the hand of {e.from.name} · {e.preview}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Marginalia */}
          <div className="space-y-4">
            {/* Weather marginalia */}
            <div className="border-2 p-4 rounded" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="text-xs tracking-widest opacity-60 text-center mb-2">✦ CELESTIAL OBSERVATIONS ✦</div>
              <div className="text-center text-3xl mb-2">{weather.icon}</div>
              <div className="text-center font-bold" style={{ fontFamily: 'var(--font-display)' }}>{weather.condition}</div>
              <div className="text-center text-sm opacity-70">{weather.temp}° · Wind from the {'NW'}</div>
              <div className="text-xs italic opacity-50 mt-2 text-center leading-relaxed">
                "The heavens speak in {weather.condition.toLowerCase()}, and the wind bringeth {weather.wind} leagues of measure."
              </div>
            </div>

            {/* Stocks as "market of wares" */}
            <div className="border-2 p-4 rounded" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="text-xs tracking-widest opacity-60 text-center mb-2">✦ MARKET OF WARES ✦</div>
              {stocks.map(s => (
                <div key={s.ticker} className="flex justify-between py-1 border-b text-sm" style={{ borderColor: 'var(--border)' }}>
                  <span className="italic">{s.name.split(' ')[0]} Guild</span>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }} className="font-bold">
                    {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct)}%
                  </span>
                </div>
              ))}
            </div>

            {/* News as "town crier" */}
            <div className="border-2 p-4 rounded" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="text-xs tracking-widest opacity-60 text-center mb-2">✦ TOWN CRIER REPORTS ✦</div>
              {news.slice(0,4).map((n,i) => (
                <div key={i} className="mb-2 pb-2 border-b text-sm" style={{ borderColor: 'var(--border)' }}>
                  <div className="italic leading-snug opacity-80">{n.title}</div>
                  <div className="text-xs opacity-50 mt-0.5">— {n.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
