import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import emails from '../data/emails'
import weather from '../data/weather'
import news from '../data/news'
import stocks from '../data/stocks'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

const Panel = ({ title, children, className = '' }) => (
  <div className={`border rounded flex flex-col overflow-hidden ${className}`}
    style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
    <div className="px-2 py-1 text-xs flex items-center gap-2 border-b"
      style={{ borderColor: 'var(--border)', background: '#020a18', color: 'var(--accent)' }}>
      <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent3)' }} />
      <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }}>{title}</span>
    </div>
    <div className="flex-1 overflow-auto p-2">{children}</div>
  </div>
)

const StatusBar = ({ onSwitch }) => {
  const [tick, setTick] = useState(0)
  useState(() => { const t = setInterval(() => setTick(n => n + 1), 1000); return () => clearInterval(t) })
  const t = new Date()
  const ts = `${String(t.getUTCHours()).padStart(2,'0')}:${String(t.getUTCMinutes()).padStart(2,'0')}:${String(t.getUTCSeconds()).padStart(2,'0')} UTC`
  return (
    <div className="flex items-center justify-between px-4 py-1 text-xs border-b"
      style={{ background: '#010810', borderColor: 'var(--border)', color: 'var(--accent)', fontFamily: 'var(--font-main)' }}>
      <div className="flex items-center gap-4">
        <span className="font-bold tracking-widest" style={{ color: 'var(--accent3)' }}>◉ MISSION CONTROL</span>
        <span className="opacity-60">SYS.OK</span>
        <span className="opacity-60">COMMS.NOMINAL</span>
        <span className="opacity-60">UPLINK.ACTIVE</span>
      </div>
      <div className="flex items-center gap-4">
        <span style={{ color: 'var(--accent2)' }}>{ts}</span>
        <button onClick={onSwitch}
          className="px-2 py-0.5 border text-xs"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          SWITCH_OPERATOR
        </button>
      </div>
    </div>
  )
}

export default function SpaceLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [activePanel, setActivePanel] = useState('emails')

  const gauge = (label, val, color) => (
    <div className="flex items-center gap-2 py-0.5 border-b text-xs" style={{ borderColor: 'var(--border)' }}>
      <span className="w-24 shrink-0 opacity-60" style={{ fontFamily: 'var(--font-main)' }}>{label}</span>
      <div className="flex-1 h-1.5 rounded" style={{ background: '#0a2040' }}>
        <div className="h-full rounded" style={{ width: `${val}%`, background: color }} />
      </div>
      <span style={{ color }}>{val}%</span>
    </div>
  )

  return (
    <div className="flex flex-col h-screen text-xs" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <StatusBar onSwitch={onSwitchPersona} />

      {/* scan-line overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.3) 2px, rgba(0,212,255,0.3) 4px)',
        zIndex: 50,
      }} />

      <div className="flex-1 grid gap-1 p-1 overflow-hidden" style={{
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }}>
        {/* COMMS LOG — span 2 rows on left */}
        <Panel title="INCOMING COMMS LOG" className="row-span-2">
          <div className="space-y-0.5">
            {emails.map(e => (
              <div key={e.id} onClick={() => setSelectedEmail(e)}
                className="cursor-pointer px-2 py-1.5 rounded border-l-2 hover:opacity-80"
                style={{
                  borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'transparent',
                  background: selectedEmail?.id === e.id ? 'rgba(0,212,255,0.08)' : 'transparent',
                }}>
                <div className="flex gap-2 items-baseline">
                  <span className="w-4 text-center opacity-50">{e.read ? '▪' : '▶'}</span>
                  <div className="min-w-0">
                    <div className="font-bold truncate" style={{ color: e.read ? 'var(--text2)' : 'var(--accent2)' }}>
                      {e.from.split(' ')[0].toUpperCase()}
                    </div>
                    <div className="truncate opacity-70">{e.subject}</div>
                    <div className="opacity-40 truncate">{e.preview}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* MAIN DISPLAY */}
        <Panel title={selectedEmail ? `COMMS_DECRYPT :: ${selectedEmail.from.toUpperCase()}` : 'MAIN DISPLAY — SELECT COMMS'} className="row-span-2">
          {selectedEmail ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-1 text-xs">
                {[['ORIGIN', selectedEmail.from], ['DATE', selectedEmail.date], ['TAG', selectedEmail.tag], ['STATUS', selectedEmail.read ? 'READ' : 'UNREAD']].map(([k,v]) => (
                  <div key={k} className="border px-2 py-1" style={{ borderColor: 'var(--border)' }}>
                    <div className="opacity-50 mb-0.5">{k}</div>
                    <div style={{ color: 'var(--accent2)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="border rounded p-3 leading-relaxed" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                <div className="font-bold mb-2" style={{ color: 'var(--accent)' }}>SUBJECT: {selectedEmail.subject}</div>
                <p className="opacity-80">{selectedEmail.body}</p>
              </div>
              <button onClick={() => setSelectedEmail(null)} className="text-xs opacity-50 hover:opacity-100">
                [ESC] CLOSE TRANSMISSION
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-20">
              <div className="text-center">
                <div className="text-4xl mb-2">◎</div>
                <div>AWAITING SIGNAL</div>
              </div>
            </div>
          )}
        </Panel>

        {/* ATMOSPHERIC */}
        <Panel title="ATMOSPHERIC TELEMETRY">
          <div className="grid grid-cols-2 gap-2">
            {[
              ['TEMP', `${weather.temperature}°C`, 'var(--accent2)'],
              ['HUM', `${weather.humidity}%`, 'var(--accent)'],
              ['WIND', `${weather.windSpeed}kph`, 'var(--accent3)'],
              ['VIS', weather.condition, 'var(--text)'],
            ].map(([k,v,c]) => (
              <div key={k} className="border p-2 text-center" style={{ borderColor: 'var(--border)' }}>
                <div className="opacity-50 text-xs mb-1">{k}</div>
                <div className="font-bold" style={{ color: c, fontFamily: 'var(--font-display)' }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {gauge('THERMAL', 62, 'var(--accent2)')}
            {gauge('PRESSURE', 78, 'var(--accent)')}
            {gauge('SIGNAL', 91, 'var(--accent3)')}
          </div>
        </Panel>

        {/* INTEL + FUNDING */}
        <Panel title="INTEL FEED / ASSET VALUATION">
          <div className="space-y-1 mb-2">
            {news.slice(0,3).map((n,i) => (
              <div key={i} className="border-l-2 pl-2 py-0.5" style={{ borderColor: 'var(--accent2)' }}>
                <div className="opacity-40 text-xs">[{n.source}]</div>
                <div className="truncate" style={{ color: 'var(--text)' }}>{n.title}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {stocks.map(s => (
              <div key={s.symbol} className="flex items-center gap-2 py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold w-12" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{s.symbol}</span>
                <div className="flex-1 h-6">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <LineChart data={s.sparkline.map((v,i) => ({ v, i }))}>
                      <Line dataKey="v" dot={false} stroke={s.change >= 0 ? 'var(--accent3)' : '#ff4444'} strokeWidth={1.5} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <span className="w-10 text-right" style={{ color: s.change >= 0 ? 'var(--accent3)' : '#ff4444' }}>
                  {s.change >= 0 ? '+' : ''}{s.change}%
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
