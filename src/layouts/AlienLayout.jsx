import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const alienTag = t => ({ work:'LABOR_COMMUNICATION_VECTOR', personal:'KINSHIP_SIGNAL_PACKET', finance:'RESOURCE_EXCHANGE_PROTOCOL', promo:'COMMERCIAL_PROPAGANDA_UNIT', newsletter:'PERIODIC_KNOWLEDGE_BROADCAST' }[t] || 'UNKNOWN_DATA_CLUSTER')
const glitch = (str) => str.replace(/[aeiou]/gi, c => Math.random() > 0.7 ? '▒' : c)

const ScanLine = () => (
  <div className="pointer-events-none fixed inset-0 z-50" style={{
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,180,0.03) 3px, rgba(0,255,180,0.03) 4px)',
  }} />
)

const Blink = ({ children, style = {} }) => (
  <span style={{ animation: 'blink 1.4s step-end infinite', ...style }}>
    {children}
  </span>
)

const CornerHUD = ({ pos }) => {
  const [x,y] = pos.split('-')
  const tx = x === 'top' ? '0' : '180deg'
  const ty = y === 'left' ? '0' : '180deg'
  return (
    <div className={`absolute ${x}-0 ${y}-0 w-8 h-8 pointer-events-none`}
      style={{ transform: `rotate(${x==='bottom'?'180deg':'0'}) ${y==='right'?'scaleX(-1)':''}` }}>
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M2 2 L12 2 L12 4 L4 4 L4 12 L2 12 Z" fill="#00ffcc" opacity="0.6" />
      </svg>
    </div>
  )
}

export default function AlienLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [translated, setTranslated] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)',
    }}>
      <ScanLine />
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.8} 94%{opacity:1} 96%{opacity:0.9} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 10px rgba(0,255,204,0.3)} 50%{box-shadow:0 0 25px rgba(0,255,204,0.6)} }
      `}</style>

      {/* HUD Border corners */}
      <div className="fixed inset-4 pointer-events-none z-40" style={{ border: '1px solid rgba(0,255,204,0.15)' }}>
        <CornerHUD pos="top-left" /><CornerHUD pos="top-right" /><CornerHUD pos="bottom-left" /><CornerHUD pos="bottom-right" />
      </div>

      {/* Transmission header */}
      <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(0,255,204,0.2)', background: 'rgba(0,255,204,0.03)', animation: 'flicker 8s infinite' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs opacity-50 mb-0.5 tracking-widest">◈ INTERGALACTIC RECEPTION UNIT — SECTOR 7G</div>
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '0.2em' }}>
              HUMAN COMMUNICATION ARCHIVE
            </div>
            <div className="text-xs opacity-50 mt-0.5">
              TRANSLATION_MODULE: v4.7.2 · SPECIES: HOMO_SAPIENS · CONFIDENCE: 73.4%
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs mb-1" style={{ color: 'var(--accent2)' }}>
              <Blink>▶ RECEIVING...</Blink>
            </div>
            <div className="text-xs opacity-40">{emails.length} PACKETS INTERCEPTED</div>
            <button onClick={onSwitchPersona} className="mt-1 text-xs opacity-40 hover:opacity-80 border px-2 py-0.5" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
              SWITCH_OBSERVER
            </button>
          </div>
        </div>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 96px)' }}>
        {/* Signal list */}
        <div className="w-80 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'rgba(0,255,204,0.15)' }}>
          <div className="px-3 py-2 text-xs opacity-40 border-b tracking-widest" style={{ borderColor: 'rgba(0,255,204,0.15)' }}>
            INTERCEPTED_SIGNALS [{emails.length}]
          </div>
          {emails.map((e, i) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="px-3 py-3 border-b cursor-pointer hover:opacity-80"
              style={{
                borderColor: 'rgba(0,255,204,0.1)',
                background: selectedEmail?.id === e.id ? 'rgba(0,255,204,0.07)' : 'transparent',
                animation: selectedEmail?.id === e.id ? 'pulse-glow 2s infinite' : 'none',
              }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs opacity-40">PKT_{String(i+1).padStart(3,'0')}</span>
                {!e.read && <span style={{ color: 'var(--accent)' }} className="text-xs font-bold">◈ NEW</span>}
                <span className="text-xs opacity-30 ml-auto">{e.date}</span>
              </div>
              <div className="text-xs opacity-40 mb-0.5">{alienTag(e.tag)}</div>
              <div className="font-bold text-sm truncate" style={{ color: e.read ? 'var(--text2)' : 'var(--accent)' }}>
                {translated ? e.subject : glitch(e.subject)}
              </div>
              <div className="text-xs opacity-40 truncate">
                ORIGIN: {translated ? e.from.name : glitch(e.from.name)}
              </div>
            </div>
          ))}
        </div>

        {/* Decryption panel */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Translation toggle */}
          <div className="flex items-center gap-3 mb-4 px-1">
            <button onClick={() => setTranslated(t => !t)}
              className="text-xs px-3 py-1 border rounded"
              style={{ borderColor: 'var(--accent2)', color: translated ? '#000' : 'var(--accent2)', background: translated ? 'var(--accent2)' : 'transparent' }}>
              {translated ? '◉ TRANSLATION: ON' : '◎ TRANSLATION: OFF'}
            </button>
            <span className="text-xs opacity-30">Toggle to decode human language</span>
          </div>

          {selectedEmail ? (
            <div>
              {/* Signal metadata */}
              <div className="border rounded p-4 mb-4" style={{ borderColor: 'rgba(0,255,204,0.2)', background: 'rgba(0,255,204,0.03)' }}>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    ['CLASSIFICATION', alienTag(selectedEmail.tag)],
                    ['ORIGIN_ENTITY', translated ? selectedEmail.from.name : glitch(selectedEmail.from.name)],
                    ['TEMPORAL_STAMP', selectedEmail.date],
                    ['DECRYPTION_STATUS', selectedEmail.read ? 'PREVIOUSLY_PROCESSED' : 'FIRST_CONTACT'],
                  ].map(([k,v]) => (
                    <div key={k} className="border-l-2 pl-2" style={{ borderColor: 'var(--accent2)' }}>
                      <div className="opacity-40 mb-0.5">{k}</div>
                      <div style={{ color: 'var(--accent)' }} className="truncate">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alien commentary */}
              <div className="border rounded p-3 mb-4 text-xs italic" style={{ borderColor: 'rgba(255,0,170,0.3)', background: 'rgba(255,0,170,0.05)', color: 'var(--accent2)' }}>
                ◈ BEHAVIORAL_ANALYSIS: Humans use this "{selectedEmail.tag}" category for social-hierarchical communication. Fascinating. Their written symbols encode emotional subtext at 40% compression ratio.
              </div>

              {/* Subject */}
              <div className="text-xl font-bold mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
                DECODED: {translated ? selectedEmail.subject : glitch(selectedEmail.subject)}
              </div>

              {/* Body */}
              <div className="border rounded p-4" style={{ borderColor: 'rgba(0,255,204,0.15)', background: 'rgba(0,0,0,0.3)' }}>
                <p className="text-sm leading-loose opacity-80">
                  {translated ? selectedEmail.body : glitch(selectedEmail.body)}
                </p>
              </div>

              <button onClick={() => setSelectedEmail(null)} className="mt-4 text-xs opacity-40 hover:opacity-80 tracking-widest">
                ← CLOSE_TRANSMISSION
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-20">
              <div className="text-center">
                <div className="text-6xl mb-3" style={{ animation: 'blink 2s step-end infinite' }}>👽</div>
                <div className="tracking-widest text-sm">SELECT_PACKET_TO_ANALYZE</div>
              </div>
            </div>
          )}
        </div>

        {/* Sensor readings */}
        <div className="w-56 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'rgba(0,255,204,0.15)' }}>
          {/* Weather as "atmospheric readings" */}
          <div className="border rounded p-3" style={{ borderColor: 'rgba(0,255,204,0.2)', background: 'rgba(0,255,204,0.03)' }}>
            <div className="text-xs tracking-widest opacity-40 mb-2">ATMOSPHERIC_DATA</div>
            <div className="text-center text-3xl mb-1">{weather.icon}</div>
            <div className="text-xs space-y-1">
              {[['THERMAL', `${weather.temp}°C`], ['MOISTURE', `${weather.humidity}%`], ['WIND_VEL', `${weather.wind}kph`], ['CONDITION', weather.condition]].map(([k,v]) => (
                <div key={k} className="flex justify-between">
                  <span className="opacity-40">{k}</span>
                  <span style={{ color: 'var(--accent)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stocks as "resource metrics" */}
          <div className="border rounded p-3" style={{ borderColor: 'rgba(0,255,204,0.2)' }}>
            <div className="text-xs tracking-widest opacity-40 mb-2">RESOURCE_METRICS</div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 text-xs border-b" style={{ borderColor: 'rgba(0,255,204,0.1)' }}>
                <span className="opacity-60">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : '#ff3366' }}>
                  {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct)}
                </span>
              </div>
            ))}
          </div>

          {/* News as "cultural transmissions" */}
          <div className="border rounded p-3" style={{ borderColor: 'rgba(0,255,204,0.2)' }}>
            <div className="text-xs tracking-widest opacity-40 mb-2">CULTURAL_TRANSMISSIONS</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs opacity-50 leading-snug" style={{ borderColor: 'rgba(0,255,204,0.1)' }}>
                {translated ? n.title : glitch(n.title)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
