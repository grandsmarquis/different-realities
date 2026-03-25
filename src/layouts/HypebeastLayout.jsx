import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function HypebeastLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const marqueeText = 'LIMITED DROP · SAME INBOX DIFFERENT FLEX · COP OR DROP · '

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="border-b-4 overflow-hidden py-2" style={{ borderColor: 'var(--accent)', background: 'var(--accent)' }}>
        <div className="hype-marquee-inner text-black font-bold text-sm tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
          {marqueeText}{marqueeText}{marqueeText}
        </div>
      </div>

      <header className="px-4 py-6 md:px-8 flex flex-wrap items-center justify-between gap-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <p className="text-[10px] tracking-[0.3em] mb-1" style={{ color: 'var(--accent2)' }}>AUTHENTIC · VERIFIED · NO CAP</p>
          <h1 className="text-4xl md:text-6xl italic" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            INBOX<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs px-3 py-1 font-bold uppercase border-2 rotate-2" style={{ borderColor: 'var(--accent3)', color: 'var(--accent3)' }}>sold out soon</span>
          <button type="button" onClick={onSwitchPersona} className="bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Log off
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <aside className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
          <div className="sticky top-0 z-10 px-4 py-3 flex justify-between items-center text-xs font-black uppercase tracking-widest border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <span>Queue</span>
            <span style={{ color: 'var(--accent)' }}>{emails.length} pairs</span>
          </div>
          <div className="p-2 space-y-2">
            {emails.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="w-full text-left p-4 border-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  borderColor: selectedEmail?.id === e.id ? 'var(--accent)' : 'var(--border)',
                  background: 'var(--card)',
                  boxShadow: selectedEmail?.id === e.id ? '6px 6px 0 var(--accent2)' : '4px 4px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 uppercase" style={{ background: 'var(--accent)', color: '#000' }}>#{String(i + 1).padStart(2, '0')}</span>
                  {!e.read && <span className="text-[10px] font-bold animate-pulse" style={{ color: 'var(--accent2)' }}>HEAT</span>}
                </div>
                <div className="font-black text-sm leading-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>{e.subject}</div>
                <div className="text-xs opacity-50 mt-2 font-mono">{e.from.name}</div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="absolute top-4 left-4 right-4 h-8 opacity-5 pointer-events-none flex gap-2" aria-hidden>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex-1 border-l" style={{ borderColor: 'var(--text)' }} />
            ))}
          </div>
          {selectedEmail ? (
            <div className="max-w-2xl mx-auto relative mt-4">
              <div className="absolute -right-2 -top-2 z-20 text-[10px] font-black px-2 py-1 rotate-12" style={{ background: 'var(--accent2)', color: '#000' }}>
                OG BOX
              </div>
              <article className="border-4 p-8 md:p-10 pt-12" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                <div className="flex flex-wrap gap-4 items-center mb-8 pb-6 border-b-4" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-5xl">{selectedEmail.from.avatar}</span>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black uppercase leading-none" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                    <p className="text-xs font-mono opacity-50 mt-2">{selectedEmail.from.name} · {selectedEmail.date}</p>
                  </div>
                </div>
                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap uppercase tracking-wide opacity-90" style={{ fontFamily: 'var(--font-main)' }}>
                  {selectedEmail.body}
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <span className="text-xs font-black px-4 py-2 border-2" style={{ borderColor: 'var(--accent3)', color: 'var(--accent3)' }}>resell?</span>
                  <span className="text-xs font-black px-4 py-2" style={{ background: 'var(--accent)', color: '#000' }}>keep ds</span>
                </div>
              </article>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex items-center justify-center">
              <div className="text-center opacity-40">
                <p className="text-8xl mb-4">👟</p>
                <p className="text-xl font-black uppercase" style={{ fontFamily: 'var(--font-display)' }}>Pick a release</p>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l p-3 space-y-3 text-xs font-mono" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="border-2 p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="font-black mb-2 uppercase text-[10px] tracking-widest opacity-50">Outside cam</p>
            <div className="text-3xl">{weather.icon}</div>
            <p className="font-bold mt-1">{weather.temp}°</p>
            <p className="opacity-60">{weather.condition}</p>
          </div>
          <div className="border-2 p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="font-black mb-2 uppercase text-[10px] tracking-widest opacity-50">Ticker wall</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between py-1 border-b border-white/5">
                <span className="font-bold">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="border-2 p-3 space-y-2 max-h-48 overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
            <p className="font-black uppercase text-[10px] tracking-widest opacity-50">Feed</p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="leading-tight opacity-80">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
