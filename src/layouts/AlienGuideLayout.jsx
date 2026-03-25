import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function AlienGuideLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="fixed inset-0 pointer-events-none opacity-30" aria-hidden
        style={{
          background: 'radial-gradient(circle at 20% 80%, var(--accent2) 0%, transparent 25%), radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 20%)',
        }}
      />

      <header className="relative z-10 border-b-4 px-4 py-6 overflow-hidden" style={{ borderColor: 'var(--accent2)', background: 'var(--bg2)' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="alien-guide-float text-6xl">👽</div>
            <div>
              <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--accent3)', fontFamily: 'var(--font-display)' }}>EARTH PACKAGE TOUR · SECTOR 7</p>
              <h1 className="text-3xl md:text-5xl mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                HUMAN &quot;INBOX&quot;
              </h1>
              <p className="text-sm mt-1 opacity-70">(Translation: sacred rectangle of worries)</p>
            </div>
          </div>
          <button type="button" onClick={onSwitchPersona} className="border-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'transparent' }}>
            Beam me out
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <aside className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-2 text-center text-xs font-bold border-b flex items-center justify-center gap-2" style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--accent3)' }}>
            <span>🛸</span> SIGNALS WE DON&apos;T FULLY GET
          </div>
          {emails.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-4 py-3 border-b transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(0,255,204,0.1)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{e.from.avatar}</span>
                <span className="text-[10px] opacity-50">Specimen #{i + 1}</span>
                {!e.read && <span className="ml-auto text-[10px] animate-bounce" style={{ color: 'var(--accent)' }}>NEW!</span>}
              </div>
              <div className="font-bold">{e.subject}</div>
              <div className="text-xs opacity-60">{e.from.name} — probably human</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {selectedEmail ? (
            <div className="max-w-2xl mx-auto border-4 border-dashed rounded-3xl p-8 relative" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
              <div className="absolute -top-3 right-8 px-3 py-1 text-[10px] font-bold rounded-full rotate-3" style={{ background: 'var(--accent)', color: '#fff' }}>
                TOURIST TRANSLATION ON
              </div>
              <h2 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>{selectedEmail.subject}</h2>
              <p className="text-sm opacity-60 mb-6">Original noise from: {selectedEmail.from.name} · Earth calendar: {selectedEmail.date}</p>
              <div className="rounded-2xl p-6 leading-relaxed whitespace-pre-wrap text-sm" style={{ background: 'var(--bg2)', border: '2px solid var(--border)' }}>
                {selectedEmail.body}
              </div>
              <p className="text-xs mt-6 opacity-50 italic border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                Fun fact: Humans call this &quot;email&quot;. We call it &quot;delayed telepathy with ads&quot;.
              </p>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center opacity-50">
              <p className="text-6xl mb-4">🌍</p>
              <p className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>Pick a human mystery to decode</p>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l p-4 space-y-4 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="rounded-2xl p-4 border-2" style={{ borderColor: 'var(--accent2)' }}>
            <p className="font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>LOCAL SKY JUICE</p>
            <div className="text-4xl text-center">{weather.icon}</div>
            <p className="text-center mt-1">{weather.condition}</p>
            <p className="text-center opacity-60">{weather.temp}° (units: tiny degrees)</p>
          </div>
          <div className="rounded-2xl p-4 border" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold mb-2 opacity-70">HUMAN NUMBER FEELINGS</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1">
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent2)' : 'var(--accent)' }}>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-4 border" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold mb-2 opacity-70">PLANET GOSSIP</p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="mb-2 leading-tight opacity-80">{n.emoji} {n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
