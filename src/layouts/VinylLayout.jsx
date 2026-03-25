import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

const tagGenre = t => ({ work:'BUSINESS · Blues', personal:'SOUL · Personal', finance:'JAZZ · Finance', promo:'POP · Promo', newsletter:'FOLK · Editorial' }[t] || 'MISC')
const tagColor = t => ({ work:'#5588cc', personal:'#cc5588', finance:'#ccaa44', promo:'#44cc88', newsletter:'#aa66cc' }[t] || '#aaa')

const Record = ({ size = 80, color = '#222' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    <circle cx="40" cy="40" r="38" fill={color} />
    <circle cx="40" cy="40" r="35" fill="none" stroke="#333" strokeWidth="1" />
    <circle cx="40" cy="40" r="30" fill="none" stroke="#333" strokeWidth="1" />
    <circle cx="40" cy="40" r="25" fill="none" stroke="#2a2010" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="18" fill="#c87941" opacity="0.8" />
    <circle cx="40" cy="40" r="14" fill={color} />
    <circle cx="40" cy="40" r="10" fill="#c87941" opacity="0.4" />
    <circle cx="40" cy="40" r="3" fill="#fff" opacity="0.6" />
  </svg>
)

const VUMeter = ({ level, color }) => (
  <div className="flex flex-col-reverse gap-px" style={{ height: 40 }}>
    {[...Array(10)].map((_,i) => (
      <div key={i} className="w-full" style={{
        height: 3,
        background: i < Math.round(level * 10) ? (i > 7 ? '#ff4444' : i > 5 ? '#ffaa00' : color) : '#2a2010',
      }} />
    ))}
  </div>
)

export default function VinylLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needle, setNeedle] = useState(false)

  const handleSelect = (e) => {
    setSelectedEmail(e)
    setIsPlaying(true)
    setNeedle(true)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>

      {/* Turntable header */}
      <div className="flex items-center gap-6 px-6 py-4 border-b" style={{ borderColor: 'var(--border)', background: '#110e0c' }}>
        {/* Spinning record */}
        <div className="relative shrink-0" style={{
          animation: isPlaying ? 'spin 3s linear infinite' : 'none',
        }}>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <Record size={80} color="#1a1210" />
        </div>

        {/* Tonearm */}
        <div className="relative" style={{ width: 40, height: 80 }}>
          <div className="absolute" style={{
            width: 3, height: 60, background: '#c87941',
            transformOrigin: 'top center',
            transform: needle ? 'rotate(30deg)' : 'rotate(10deg)',
            transition: 'transform 0.5s',
            top: 10, left: 18,
            borderRadius: 2,
          }} />
          <div className="absolute" style={{ width: 8, height: 8, borderRadius: '50%', background: '#e8d5b0', top: 5, left: 15 }} />
        </div>

        <div className="flex-1">
          <div className="text-xs tracking-widest opacity-50 mb-0.5">NOW PLAYING</div>
          {selectedEmail ? (
            <>
              <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                {selectedEmail.subject}
              </div>
              <div className="text-sm opacity-60">{selectedEmail.from.name} · {tagGenre(selectedEmail.tag)}</div>
            </>
          ) : (
            <div className="text-lg opacity-30" style={{ fontFamily: 'var(--font-display)' }}>SELECT A RECORD</div>
          )}
          <button onClick={() => setIsPlaying(p => !p)} className="mt-1 text-xs opacity-60 hover:opacity-100">
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>
        </div>

        {/* VU meters */}
        <div className="flex gap-1 shrink-0">
          {[0.7, 0.9, 0.6, 0.8].map((l,i) => (
            <VUMeter key={i} level={isPlaying ? l : 0} color="var(--accent)" />
          ))}
        </div>

        <button onClick={onSwitchPersona} className="text-xs opacity-50 hover:opacity-100 shrink-0">SWITCH →</button>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 116px)' }}>
        {/* Shelf / crate of records */}
        <div className="w-72 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-2 text-xs tracking-widest opacity-50 border-b" style={{ borderColor: 'var(--border)' }}>
            CRATE · {emails.length} RECORDS
          </div>
          {emails.map(e => (
            <div key={e.id} onClick={() => handleSelect(e)}
              className="flex items-center gap-3 px-3 py-2 border-b cursor-pointer hover:opacity-80"
              style={{ borderColor: 'var(--border)', background: selectedEmail?.id === e.id ? 'rgba(200,121,65,0.15)' : 'transparent' }}>
              {/* Mini album art */}
              <div className="shrink-0 w-10 h-10 rounded flex items-center justify-center text-lg"
                style={{ background: tagColor(e.tag) + '33', border: `2px solid ${tagColor(e.tag)}` }}>
                🎵
              </div>
              <div className="min-w-0">
                <div className="text-xs opacity-40">{tagGenre(e.tag)}</div>
                <div className="font-bold text-sm truncate" style={{ color: e.read ? 'var(--text2)' : 'var(--text)' }}>
                  {e.subject}
                </div>
                <div className="text-xs opacity-50">{e.from.name}</div>
              </div>
              {!e.read && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />}
            </div>
          ))}
        </div>

        {/* Liner notes / main */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedEmail ? (
            <div className="max-w-xl">
              {/* Album cover */}
              <div className="flex gap-4 mb-5">
                <div className="shrink-0 w-28 h-28 rounded flex items-center justify-center"
                  style={{ background: `${tagColor(selectedEmail.tag)}22`, border: `3px solid ${tagColor(selectedEmail.tag)}` }}>
                  <Record size={72} color={tagColor(selectedEmail.tag) + '44'} />
                </div>
                <div>
                  <div className="text-xs opacity-40 mb-1">{tagGenre(selectedEmail.tag)}</div>
                  <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    {selectedEmail.subject}
                  </h2>
                  <div className="text-sm opacity-70">{selectedEmail.from.name}</div>
                  <div className="text-xs opacity-40">{selectedEmail.date}</div>
                </div>
              </div>

              {/* Groove divider */}
              <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

              {/* Liner notes */}
              <div className="text-sm leading-loose italic opacity-80">{selectedEmail.body}</div>

              <button onClick={() => { setSelectedEmail(null); setIsPlaying(false); setNeedle(false) }}
                className="mt-5 text-xs opacity-40 hover:opacity-80">
                ← Return to crate
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-20">
              <div className="text-center">
                <Record size={120} color="#2a2010" />
                <div className="mt-4 text-lg" style={{ fontFamily: 'var(--font-display)' }}>FLIP THROUGH THE CRATE</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: weather + charts */}
        <div className="w-56 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
          {/* Weather — listening conditions */}
          <div className="border rounded p-3 text-center" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs opacity-40 mb-1 tracking-wider">LISTENING CONDITIONS</div>
            <div className="text-3xl mb-1">{weather.icon}</div>
            <div className="text-sm font-bold">{weather.condition}</div>
            <div className="text-xs opacity-50">{weather.temp}° · {weather.humidity}% humidity</div>
            <div className="text-xs italic opacity-40 mt-1">
              {weather.condition === 'Rainy' ? 'Perfect vinyl weather.' : 'Decent listening conditions.'}
            </div>
          </div>

          {/* Stocks as "rare finds market" */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs opacity-40 mb-2 tracking-wider">RARE FINDS MARKET</div>
            {stocks.map(s => (
              <div key={s.ticker} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="opacity-70">{s.ticker}</span>
                  <span style={{ color: s.changePct >= 0 ? '#80c840' : '#c84040' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct}%</span>
                </div>
                <div style={{ height: 20 }}>
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <AreaChart data={s.series.map((v,i) => ({ v, i }))}>
                      <Area dataKey="v" dot={false} stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.15} strokeWidth={1} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>

          {/* News as B-side */}
          <div className="border rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs opacity-40 mb-2 tracking-wider">THE B-SIDE</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs italic opacity-60 leading-snug" style={{ borderColor: 'var(--border)' }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
