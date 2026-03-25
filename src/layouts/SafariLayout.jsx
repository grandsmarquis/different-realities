import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagSpecies = t => ({ work: 'ADMINISTRATIVE SPECIES', personal: 'PERSONAL CONTACT', finance: 'FINANCIAL PREDATOR', promo: 'COMMERCIAL INTRUSION', newsletter: 'PERIODICAL MIGRATION' }[t] || t)
const urgency = e => e.read ? 'LOW' : 'HIGH'
const urgencyColor = e => e.read ? 'var(--text2)' : 'var(--accent)'

const StampBadge = ({ children, color }) => (
  <span className="inline-block px-2 py-0.5 text-xs font-bold border-2 rounded tracking-wider uppercase"
    style={{ borderColor: color, color, background: `${color}18` }}>
    {children}
  </span>
)

export default function SafariLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [binoculars, setBinoculars] = useState(false)

  return (
    <div className="min-h-screen" style={{
      background: `var(--bg) url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='40' x2='40' y2='40' stroke='%23c8a060' stroke-width='0.8' opacity='0.4'/%3E%3C/svg%3E")`,
      fontFamily: 'var(--font-main)', color: 'var(--text)',
    }}>

      {/* Field notebook cover */}
      <div className="border-b-4 px-6 py-4" style={{ borderColor: 'var(--accent)', background: 'var(--accent2)', background: '#6b8a3a' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs tracking-widest opacity-80 mb-0.5" style={{ color: '#c8f060' }}>🦁 FIELD OBSERVATION JOURNAL — DIGITAL SAVANNA</div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#fff8e8', letterSpacing: '0.1em' }}>
              INBOX WATCH REPORT
            </h1>
            <div className="text-xs opacity-80 mt-1" style={{ color: '#c8e098' }}>
              {weather.condition} · {weather.temp}°C · Vis: Excellent · Guide: G. Safari
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setBinoculars(b => !b)} className="text-2xl hover:scale-110 transition-transform" title="Toggle binoculars">🔭</button>
            <button onClick={onSwitchPersona} className="text-xs px-3 py-1 border-2 rounded font-bold"
              style={{ borderColor: '#c8e098', color: '#c8e098' }}>
              CHANGE GUIDE
            </button>
          </div>
        </div>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 90px)' }}>
        {/* Field log list */}
        <div className="w-80 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-2 border-b text-xs tracking-widest font-bold" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
            ◎ SIGHTINGS LOG — {emails.length} CONTACTS
          </div>
          {emails.map((e, i) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="px-4 py-3 border-b cursor-pointer hover:opacity-80"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(61,107,42,0.15)' : (i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)'),
              }}>
              <div className="flex items-start justify-between mb-1">
                <StampBadge color={urgencyColor(e)}>{urgency(e)} PRIORITY</StampBadge>
                <span className="text-xs opacity-50">{e.date}</span>
              </div>
              <div className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{e.subject}</div>
              <div className="text-xs opacity-60 mt-0.5">{tagSpecies(e.tag)} · From: {e.from.name}</div>
              <div className="text-xs italic opacity-40 truncate mt-0.5">{e.preview}</div>
            </div>
          ))}
        </div>

        {/* Main field notes */}
        <div className="flex-1 overflow-y-auto p-6">
          {binoculars && (
            <div className="mb-4 p-3 border-l-4 rounded" style={{ borderColor: 'var(--accent2)', background: 'rgba(85,107,47,0.15)' }}>
              <div className="text-xs font-bold mb-1" style={{ color: 'var(--accent2)' }}>🔭 ENHANCED OBSERVATION MODE</div>
              <div className="text-xs opacity-70">All subjects visible. {emails.filter(e => !e.read).length} unread contacts approaching.</div>
            </div>
          )}
          {selectedEmail ? (
            <div className="max-w-2xl">
              {/* Field report card */}
              <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: 'var(--accent)' }}>
                {/* Report header */}
                <div className="px-5 py-3 border-b" style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}>
                  <div className="text-xs tracking-widest mb-0.5" style={{ color: '#fff8e8', opacity: 0.8 }}>
                    FIELD REPORT #{String(emails.indexOf(selectedEmail)+1).padStart(3,'0')}
                  </div>
                  <div className="font-bold text-lg" style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    {selectedEmail.subject}
                  </div>
                </div>
                <div className="p-5">
                  {/* Metadata grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    {[['SUBJECT ID', selectedEmail.from.name], ['DATE/TIME', selectedEmail.date], ['SPECIES', tagSpecies(selectedEmail.tag)], ['STATUS', selectedEmail.read ? 'Previously Sighted' : 'First Contact']].map(([k,v]) => (
                      <div key={k} className="border rounded p-2" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                        <div className="font-bold opacity-50 mb-0.5">{k}</div>
                        <div>{v}</div>
                      </div>
                    ))}
                  </div>
                  {/* Field notes */}
                  <div className="border-l-4 pl-4 py-2 rounded-r" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
                    <div className="text-xs font-bold opacity-50 mb-2">FIELD OBSERVATIONS:</div>
                    <p className="text-sm leading-relaxed">{selectedEmail.body}</p>
                  </div>
                  <button onClick={() => setSelectedEmail(null)} className="mt-4 text-xs opacity-50 hover:opacity-100">
                    ← Back to sightings log
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-30">
              <div className="text-center">
                <div className="text-6xl mb-3">🔭</div>
                <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>SELECT A SIGHTING</div>
                <div className="text-sm italic mt-1">Stay still. The inbox comes to you.</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: conditions + dispatches */}
        <div className="w-56 shrink-0 border-l p-4 overflow-y-auto space-y-4" style={{ borderColor: 'var(--border)' }}>
          {/* Weather — critical */}
          <div className="border-2 rounded p-3" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
            <div className="font-bold text-xs mb-2 tracking-wider" style={{ color: 'var(--accent)' }}>⚠ FIELD CONDITIONS</div>
            <div className="text-3xl text-center mb-1">{weather.icon}</div>
            <div className="text-center font-bold text-sm">{weather.condition}</div>
            <div className="text-xs opacity-60 text-center">{weather.temp}°C · Humidity {weather.humidity}%</div>
            <div className="text-xs opacity-60 text-center">Wind: {weather.wind}kph {'NW'}</div>
            <div className="mt-2 text-xs italic opacity-50 text-center leading-tight">{weather.condition}</div>
          </div>

          {/* News as civilisation dispatches */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="font-bold text-xs mb-2 tracking-wider" style={{ color: 'var(--accent2)' }}>📡 FROM CIVILISATION</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs" style={{ borderColor: 'var(--border)' }}>
                <div className="opacity-70 leading-snug">{n.title}</div>
                <div className="opacity-40 mt-0.5">{n.source}</div>
              </div>
            ))}
          </div>

          {/* Supply costs / stocks */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="font-bold text-xs mb-2 tracking-wider opacity-60">SUPPLY COSTS</div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between text-xs py-0.5">
                <span className="opacity-70">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : '#cc4400' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
