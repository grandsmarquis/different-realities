import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function SubmarineLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="pointer-events-none fixed inset-0 opacity-[0.06]" aria-hidden
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, var(--accent) 3px, var(--accent) 4px)',
        }}
      />
      <div className="pointer-events-none fixed inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 120%, rgba(0,255,170,0.08) 0%, transparent 45%)',
      }} aria-hidden />

      <header className="relative z-10 border-b-2 px-4 py-3 flex flex-wrap items-center justify-between gap-3" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
        <div className="flex items-center gap-4">
          <div className="relative submarine-sonar w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: 'var(--accent)' }}>
            <span className="text-lg relative z-10">◎</span>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] opacity-70" style={{ fontFamily: 'var(--font-display)' }}>SSN-INBOX · CLASSIFIED</p>
            <h1 className="text-xl md:text-2xl tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              SONAR_MESSAGE_LOG
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span>DEPTH: <span className="tabular-nums" style={{ color: 'var(--accent)' }}>—{420 + emails.length}m</span></span>
          <span>HULL: <span style={{ color: 'var(--accent)' }}>NOMINAL</span></span>
          <button type="button" onClick={onSwitchPersona} className="border px-3 py-1 uppercase tracking-wider hover:bg-white/5" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Abort
          </button>
        </div>
      </header>

      <div className="relative z-10 flex" style={{ height: 'calc(100vh - 56px)' }}>
        <aside className="w-64 lg:w-72 shrink-0 border-r overflow-y-auto font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="px-3 py-2 border-b tracking-widest" style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}>
            :: CONTACTS_DETECTED
          </div>
          {emails.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-3 py-2.5 border-b transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(0,255,170,0.08)' : 'transparent',
                color: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--text)',
              }}
            >
              <div className="flex justify-between mb-1 opacity-60">
                <span>BLIP_{String(i + 1).padStart(2, '0')}</span>
                {!e.read && <span className="animate-pulse" style={{ color: 'var(--accent)' }}>● PING</span>}
              </div>
              <div className="font-bold truncate">{e.subject}</div>
              <div className="opacity-50 truncate">{e.from.name}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="absolute inset-8 border border-dashed rounded-full opacity-10 pointer-events-none" style={{ borderColor: 'var(--accent)' }} />
          {selectedEmail ? (
            <div className="max-w-2xl mx-auto border-2 rounded-lg p-6 md:p-8 relative" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)', boxShadow: '0 0 40px rgba(0,255,170,0.06)' }}>
              <div className="flex items-center gap-2 mb-4 text-[10px] tracking-widest opacity-60">
                <span className="inline-block w-2 h-2 rounded-full animate-ping" style={{ background: 'var(--accent)' }} />
                DECODED_TRANSMISSION
              </div>
              <h2 className="text-2xl md:text-3xl mb-4 font-bold tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                {selectedEmail.subject}
              </h2>
              <pre className="text-xs opacity-50 mb-4 whitespace-pre-wrap font-mono">{`SOURCE: ${selectedEmail.from.name}\nTIMESTAMP: ${selectedEmail.date}\nSIG: ${(selectedEmail.tag || 'mail').toUpperCase()}`}</pre>
              <div className="border-l-2 pl-4 text-sm leading-relaxed whitespace-pre-wrap font-mono" style={{ borderColor: 'var(--accent2)' }}>
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center opacity-40 font-mono">
                <p className="text-6xl mb-4">⌬</p>
                <p className="tracking-widest">AWAITING_TARGET_SELECTION</p>
              </div>
            </div>
          )}
        </main>

        <aside className="hidden xl:block w-52 shrink-0 border-l overflow-y-auto p-3 font-mono text-[10px] space-y-3" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border p-2 rounded" style={{ borderColor: 'var(--border)' }}>
            <p className="opacity-50 mb-1">EXT_SENSOR</p>
            <div className="text-2xl text-center">{weather.icon}</div>
            <p className="text-center" style={{ color: 'var(--accent)' }}>{weather.temp}°C</p>
            <p className="opacity-60 text-center">{weather.condition}</p>
          </div>
          <div className="border p-2 rounded" style={{ borderColor: 'var(--border)' }}>
            <p className="opacity-50 mb-1">SURFACE_MARKETS</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-0.5">
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#ff6688' }}>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border p-2 rounded max-h-48 overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
            <p className="opacity-50 mb-1">RADIO_SNIFF</p>
            {news.slice(0, 5).map(n => (
              <p key={n.id} className="mb-2 opacity-80 leading-tight">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
