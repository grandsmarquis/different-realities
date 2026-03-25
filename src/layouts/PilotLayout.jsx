import { useContext, useState, useEffect } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagATC = t => ({ work:'OPS.MSG', personal:'PERS.MSG', finance:'FIN.MSG', promo:'JUNK', newsletter:'NOTAM' }[t] || 'UNK')
const callsigns = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'GOLF', 'HOTEL']
const toCallsign = (from) => callsigns[from.length % callsigns.length] + '-' + String(from.length * 7 % 99 + 1).padStart(2,'0')

const Gauge = ({ label, value, unit, min=0, max=100, color='var(--text)' }) => {
  const angle = ((value - min) / (max - min)) * 240 - 120
  const r = 36
  const cx = 44, cy = 44
  const toXY = (deg, radius) => ({
    x: cx + radius * Math.cos((deg - 90) * Math.PI / 180),
    y: cy + radius * Math.sin((deg - 90) * Math.PI / 180),
  })
  const start = toXY(-120, r)
  const end = toXY(angle, r)
  const large = angle - (-120) > 180 ? 1 : 0
  return (
    <div className="flex flex-col items-center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx={cx} cy={cy} r={r+4} fill="#050505" stroke="var(--border)" strokeWidth="1" />
        <path d={`M ${toXY(-120,r).x} ${toXY(-120,r).y} A ${r} ${r} 0 1 1 ${toXY(120,r).x} ${toXY(120,r).y}`}
          fill="none" stroke="#1a2020" strokeWidth="4" />
        <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
          fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={toXY(angle, r-8).x} y2={toXY(angle, r-8).y}
          stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="3" fill={color} />
        <text x={cx} y={cy+14} textAnchor="middle" fill={color} fontSize="10" fontFamily="'B612 Mono', monospace">
          {value}{unit}
        </text>
      </svg>
      <div className="text-xs opacity-50 tracking-widest -mt-1">{label}</div>
    </div>
  )
}

const Row = ({ label, value, color = 'var(--text)' }) => (
  <div className="flex justify-between items-baseline py-1 border-b text-xs" style={{ borderColor: 'var(--border)' }}>
    <span className="opacity-50 tracking-wider">{label}</span>
    <span className="font-bold" style={{ color }}>{value}</span>
  </div>
)

export default function PilotLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const utc = `${String(time.getUTCHours()).padStart(2,'0')}${String(time.getUTCMinutes()).padStart(2,'0')}Z`
  const metar = `METAR AUTO ${weather.condition.toUpperCase()} ${weather.temp}/${(weather.temp-10)}°C Q${1013+Math.round(weather.humidity/5)} ${'NW'.slice(0,3).toUpperCase()}${String(weather.wind).padStart(3,'0')}KT`

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <style>{`
        @keyframes sweep { from{transform:rotate(-120deg)}to{transform:rotate(120deg)} }
      `}</style>

      {/* Instrument panel top bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-b" style={{ borderColor: 'var(--border)', background: '#020202' }}>
        <span className="font-bold tracking-widest text-sm" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
          ✈ COCKPIT COMMS
        </span>
        <span className="text-xs opacity-50">{utc}</span>
        <span className="text-xs opacity-30">|</span>
        <span className="text-xs opacity-50 truncate max-w-xs">{metar}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs" style={{ color: 'var(--accent3)' }}>◉ ALL SYSTEMS GO</span>
          <button onClick={onSwitchPersona} className="text-xs opacity-40 hover:opacity-80 border px-2 py-0.5" style={{ borderColor: 'var(--accent)' }}>
            HANDOVER
          </button>
        </div>
      </div>

      {/* Instrument cluster */}
      <div className="flex items-center justify-around px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: '#030303' }}>
        <Gauge label="TEMP" value={weather.temp} unit="°" min={-30} max={50} color="var(--accent2)" />
        <Gauge label="HUMIDITY" value={weather.humidity} unit="%" color="var(--accent)" />
        <Gauge label="WIND" value={weather.wind} unit="kt" min={0} max={100} color="var(--accent3)" />
        {stocks.slice(0,2).map((s,i) => (
          <Gauge key={s.ticker} label={s.ticker} value={Math.round(s.price||100)} unit="" min={50} max={200} color={s.changePct>=0?'var(--accent3)':'#ff3300'} />
        ))}
        <div className="text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{utc}</div>
          <div className="text-xs opacity-40">ZULU TIME</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ATC comms log */}
        <div className="w-80 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="px-3 py-1.5 border-b text-xs tracking-widest opacity-50" style={{ borderColor: 'var(--border)' }}>
            ATC COMMS LOG · {emails.length} TRANSMISSIONS
          </div>
          {emails.map((e, i) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="px-3 py-2.5 border-b cursor-pointer hover:opacity-80"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(0,208,170,0.08)' : 'transparent',
              }}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-main)' }}>
                  {toCallsign(e.from.name)}
                </span>
                <span className="text-xs opacity-30">{tagATC(e.tag)}</span>
                {!e.read && <span style={{ color: 'var(--accent3)' }} className="text-xs">●</span>}
                <span className="ml-auto text-xs opacity-30">{e.date}</span>
              </div>
              <div className="text-sm truncate" style={{ color: e.read ? 'var(--text2)' : 'var(--text)' }}>{e.subject}</div>
              <div className="text-xs opacity-30 truncate">FROM: {e.from.name.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Main comms display */}
        <div className="flex-1 overflow-y-auto p-5">
          {selectedEmail ? (
            <div>
              {/* ATC format header */}
              <div className="border rounded p-4 mb-4 font-mono text-xs" style={{ borderColor: 'var(--border)', background: '#020202' }}>
                <div style={{ color: 'var(--accent2)' }}>
                  FROM: {toCallsign(selectedEmail.from.name)} [{selectedEmail.from.name.toUpperCase()}]
                </div>
                <div style={{ color: 'var(--text2)' }}>MSG_TYPE: {tagATC(selectedEmail.tag)}</div>
                <div style={{ color: 'var(--text2)' }}>TIMESTAMP: {selectedEmail.date}</div>
                <div style={{ color: 'var(--text2)' }}>STATUS: {selectedEmail.read ? 'PROCESSED' : 'UNPROCESSED'}</div>
              </div>

              {/* Subject as callout */}
              <div className="text-xl font-bold mb-4" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                {selectedEmail.subject.toUpperCase()}
              </div>

              {/* Body */}
              <div className="border rounded p-4 text-sm leading-loose opacity-80" style={{ borderColor: 'var(--border)', background: '#030303' }}>
                {selectedEmail.body}
              </div>

              <div className="mt-4 flex gap-4">
                <button onClick={() => setSelectedEmail(null)} className="text-xs opacity-40 hover:opacity-80 tracking-widest border px-3 py-1" style={{ borderColor: 'var(--border)' }}>
                  ← CLOSE COMMS
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-20">
              <div className="text-center">
                <div className="text-6xl mb-3">✈</div>
                <div className="tracking-widest">SELECT TRANSMISSION</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: flight data */}
        <div className="w-56 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
          {/* METAR breakdown */}
          <div>
            <div className="text-xs tracking-widest opacity-40 mb-2">WEATHER · METAR</div>
            <Row label="COND" value={weather.condition} />
            <Row label="TEMP" value={`${weather.temp}°C`} color="var(--accent2)" />
            <Row label="HUM" value={`${weather.humidity}%`} />
            <Row label="WIND" value={`${'NW'} ${weather.wind}kt`} color="var(--accent)" />
            <Row label="VIS" value="10km+" color="var(--accent3)" />
          </div>

          {/* Stocks as fuel costs */}
          <div>
            <div className="text-xs tracking-widest opacity-40 mb-2">MARKET · FUEL INDEX</div>
            {stocks.map(s => (
              <Row key={s.ticker} label={s.ticker} value={`${s.changePct>=0?'+':''}${s.changePct}%`}
                color={s.changePct >= 0 ? 'var(--accent3)' : '#ff3300'} />
            ))}
          </div>

          {/* News as NOTAMs */}
          <div>
            <div className="text-xs tracking-widest opacity-40 mb-2">NOTAMs</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs opacity-50 leading-snug" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--accent2)' }}>NOTAM {i+1}: </span>{n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
