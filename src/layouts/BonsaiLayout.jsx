import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const Branch = ({ style = {} }) => (
  <svg viewBox="0 0 200 60" className="w-full" style={{ opacity: 0.3, ...style }}>
    <path d="M10,50 Q60,20 120,30 Q160,38 190,15" stroke="#3d6b2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M80,28 Q95,10 110,5" stroke="#3d6b2a" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M130,28 Q145,12 155,8" stroke="#3d6b2a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <circle cx="110" cy="5" r="2" fill="#5d8a3a" opacity=".6" />
    <circle cx="155" cy="8" r="1.5" fill="#5d8a3a" opacity=".6" />
    <circle cx="190" cy="15" r="2.5" fill="#5d8a3a" opacity=".5" />
    <circle cx="76" cy="26" r="1.5" fill="#5d8a3a" opacity=".5" />
  </svg>
)

export default function BonsaiLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>

      {/* Minimal header */}
      <div className="px-12 pt-8 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs tracking-widest opacity-40 mb-1 uppercase">盆栽 · Patient Correspondence</div>
            <h1 className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '0.08em' }}>
              The Bonsai Inbox
            </h1>
          </div>
          <button onClick={onSwitchPersona} className="text-xs opacity-30 hover:opacity-70 tracking-wider">
            change · 変わる
          </button>
        </div>
        <div className="mt-3"><Branch /></div>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Ultra minimal email list */}
        <div className="w-72 shrink-0 overflow-y-auto border-r px-8 pt-6" style={{ borderColor: 'var(--border)' }}>
          <div className="text-xs tracking-widest opacity-30 mb-4 uppercase">
            {emails.length} messages · {emails.filter(e=>!e.read).length} new
          </div>
          {emails.map((e, i) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="py-3 border-b cursor-pointer group"
              style={{
                borderColor: 'var(--border)',
                borderLeftWidth: selectedEmail?.id === e.id ? '2px' : '0px',
                borderLeftColor: 'var(--accent)',
                paddingLeft: selectedEmail?.id === e.id ? '8px' : '0px',
              }}>
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-xs font-semibold truncate max-w-48" style={{ color: e.read ? 'var(--text2)' : 'var(--text)' }}>
                  {e.subject}
                </span>
                {!e.read && <span className="w-1.5 h-1.5 rounded-full shrink-0 ml-2" style={{ background: 'var(--accent)' }} />}
              </div>
              <div className="text-xs opacity-40 truncate">{e.from.name}</div>
            </div>
          ))}

          {/* Tiny branch separator */}
          <div className="mt-6 opacity-20"><Branch style={{ transform: 'scaleX(-1)' }} /></div>

          {/* Minimal weather */}
          <div className="mt-4 pb-4">
            <div className="text-xs opacity-30 mb-1 tracking-wider">WEATHER</div>
            <div className="flex items-center gap-2">
              <span>{weather.icon}</span>
              <span className="text-xs opacity-60">{weather.temp}° · {weather.condition}</span>
            </div>
          </div>
        </div>

        {/* Email reading area */}
        <div className="flex-1 overflow-y-auto px-12 py-8">
          {selectedEmail ? (
            <div className="max-w-xl">
              <div className="mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs tracking-widest opacity-30 mb-2 uppercase">{selectedEmail.tag}</div>
                <h2 className="text-xl font-light mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  {selectedEmail.subject}
                </h2>
                <div className="flex gap-6 text-xs opacity-40">
                  <span>{selectedEmail.from.name}</span>
                  <span>{selectedEmail.date}</span>
                </div>
              </div>

              <p className="text-sm leading-loose opacity-80 font-light">{selectedEmail.body}</p>

              <div className="mt-8"><Branch /></div>

              <button onClick={() => setSelectedEmail(null)} className="mt-2 text-xs opacity-30 hover:opacity-60 tracking-wider">
                ← return
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center opacity-20">
                <div className="text-5xl mb-4">🌿</div>
                <div className="text-sm tracking-widest font-light uppercase">Shape · Wait · Read</div>
              </div>
            </div>
          )}
        </div>

        {/* Minimal right column */}
        <div className="w-48 shrink-0 border-l px-6 pt-8 overflow-y-auto space-y-6" style={{ borderColor: 'var(--border)' }}>
          {/* Stocks */}
          <div>
            <div className="text-xs tracking-widest opacity-30 mb-3 uppercase">Market</div>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1.5 border-b text-xs" style={{ borderColor: 'var(--border)' }}>
                <span className="opacity-60">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : 'var(--accent3)' }}>
                  {s.changePct >= 0 ? '+' : ''}{s.changePct}%
                </span>
              </div>
            ))}
          </div>

          {/* News */}
          <div>
            <div className="text-xs tracking-widest opacity-30 mb-3 uppercase">News</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-3 pb-3 border-b text-xs opacity-50 leading-snug" style={{ borderColor: 'var(--border)' }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
