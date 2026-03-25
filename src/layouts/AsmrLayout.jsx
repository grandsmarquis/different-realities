import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function AsmrLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--bg2) 0%, var(--bg) 55%)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="pointer-events-none fixed inset-0 opacity-[0.08]" aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, var(--accent) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--accent2) 0%, transparent 35%)',
        }}
      />

      <header className="relative z-10 px-6 py-10 text-center">
        <div className="inline-flex flex-col items-center">
          <div className="asmr-breathe w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl mb-4" style={{ borderColor: 'var(--accent)', background: 'var(--card)', boxShadow: '0 0 40px rgba(232,180,248,0.25)' }}>
            🎙️
          </div>
          <p className="text-xs tracking-[0.4em] opacity-60 mb-2">shhh… headphones on…</p>
          <h1 className="text-3xl md:text-5xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            Whisper Inbox
          </h1>
          <p className="text-sm mt-3 opacity-70 max-w-md mx-auto leading-relaxed">
            Soft notifications. No sudden sounds. {emails.filter(e => !e.read).length} gentle pings waiting.
          </p>
          <button type="button" onClick={onSwitchPersona} className="mt-6 text-xs tracking-widest opacity-50 hover:opacity-100 transition-opacity border-b border-transparent hover:border-current pb-0.5">
            leave quietly…
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row max-w-6xl mx-auto px-4 pb-10 gap-4" style={{ minHeight: 'calc(100vh - 280px)' }}>
        <aside className="lg:w-72 shrink-0 rounded-3xl overflow-hidden border backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'rgba(34,28,50,0.6)' }}>
          <div className="px-4 py-3 text-center text-xs tracking-[0.25em] opacity-60 border-b" style={{ borderColor: 'var(--border)' }}>
            ~ triggers ~
          </div>
          {emails.map(e => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEmail(e)}
              className="w-full text-left px-5 py-4 border-b transition-all duration-500 hover:bg-white/5"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'linear-gradient(90deg, rgba(232,180,248,0.12), transparent)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg opacity-80">{e.from.avatar}</span>
                {!e.read && <span className="text-[10px] rounded-full px-2 py-0.5" style={{ background: 'var(--accent2)', color: 'var(--text)' }}>new…</span>}
              </div>
              <div className="text-sm font-medium leading-snug" style={{ color: 'var(--accent)' }}>{e.subject}</div>
              <div className="text-xs opacity-45 mt-1">{e.from.name}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 rounded-3xl border overflow-hidden backdrop-blur-md min-h-[320px]" style={{ borderColor: 'var(--border)', background: 'rgba(26,21,40,0.5)' }}>
          {selectedEmail ? (
            <div className="p-8 md:p-12 h-full overflow-y-auto">
              <div className="max-w-xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="flex gap-1 items-end h-8">
                    {[0.3, 0.6, 1, 0.7, 0.4].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 rounded-full asmr-breathe"
                        style={{
                          height: `${h * 100}%`,
                          background: 'var(--accent)',
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <h2 className="text-center text-2xl md:text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="text-center text-xs opacity-45 mb-10">from {selectedEmail.from.name} · {selectedEmail.date}</p>
                <div className="text-sm md:text-base leading-loose whitespace-pre-wrap opacity-90 font-light tracking-wide">
                  {selectedEmail.body}
                </div>
                <p className="text-center text-xs mt-12 opacity-35 italic">… goodnight to your notifications …</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 opacity-35 text-center">
              <div>
                <p className="text-6xl mb-4 animate-pulse" style={{ animationDuration: '3s' }}>～</p>
                <p className="text-sm tracking-widest">choose a soft message…</p>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 rounded-3xl border p-4 space-y-4 text-xs backdrop-blur-md" style={{ borderColor: 'var(--border)', background: 'rgba(34,28,50,0.55)' }}>
          <div className="text-center p-3 rounded-2xl" style={{ background: 'var(--card)' }}>
            <p className="opacity-45 mb-2 tracking-widest">ambient weather</p>
            <div className="text-4xl mb-1">{weather.icon}</div>
            <p className="font-medium">{weather.temp}°</p>
            <p className="opacity-50">{weather.condition}</p>
          </div>
          <div className="p-3 rounded-2xl space-y-1" style={{ background: 'var(--card)' }}>
            <p className="opacity-45 text-center tracking-widest mb-2">market murmur</p>
            {stocks.map(s => (
              <div key={s.ticker} className="flex justify-between opacity-80">
                <span>{s.ticker}</span>
                <span>{s.changePct}%</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-2xl space-y-2" style={{ background: 'var(--card)' }}>
            <p className="opacity-45 text-center tracking-widest">gentle headlines</p>
            {news.slice(0, 3).map(n => (
              <p key={n.id} className="opacity-70 leading-relaxed">{n.title}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
