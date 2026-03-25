import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function FutureAiLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="min-h-screen relative future-scanline overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, var(--accent2), transparent, var(--accent), transparent, var(--accent3), transparent)',
        }}
      />
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="border-b px-6 py-4 flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--border)', background: 'linear-gradient(90deg, var(--bg2), transparent)' }}>
          <div>
            <p className="text-[10px] tracking-[0.5em] mb-1" style={{ color: 'var(--accent)' }}>CHRONOS-MAIL · YR 2187</p>
            <h1 className="text-3xl md:text-4xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))' }}>
                Retroactive Inbox
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-1 rounded border animate-pulse" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>Ω-SYNC OK</span>
            <button type="button" onClick={onSwitchPersona} className="px-4 py-2 rounded-lg text-xs uppercase tracking-widest transition hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent3))', color: '#fff' }}>
              Phase shift
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r overflow-y-auto max-h-[36vh] lg:max-h-none" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-[10px] tracking-[0.3em] border-b" style={{ borderColor: 'var(--border)', color: 'var(--accent2)' }}>
              TEMPORAL THREADS
            </div>
            {emails.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="w-full text-left px-4 py-3 border-b transition-all duration-300"
                style={{
                  borderColor: 'var(--border)',
                  background: selectedEmail?.id === e.id
                    ? 'linear-gradient(90deg, rgba(0,240,255,0.12), transparent)'
                    : 'transparent',
                  boxShadow: selectedEmail?.id === e.id ? 'inset 0 0 20px rgba(191,95,255,0.15)' : 'none',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono opacity-50">T-{String(i + 1).padStart(2, '0')}</span>
                  {!e.read && <span className="text-[9px] px-1.5 rounded" style={{ background: 'var(--accent3)', color: '#fff' }}>UNMERGED</span>}
                </div>
                <div className="font-semibold text-sm">{e.subject}</div>
                <div className="text-xs opacity-50 mt-0.5">{e.from.name}</div>
              </button>
            ))}
          </aside>

          <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
            {selectedEmail ? (
              <div className="max-w-2xl mx-auto relative">
                <div className="absolute -inset-1 rounded-2xl blur-xl opacity-40" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }} />
                <article className="relative rounded-2xl border p-8 md:p-10 backdrop-blur-sm" style={{ borderColor: 'var(--border)', background: 'rgba(8,0,32,0.85)' }}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['NEURAL_PARSE', 'TRUST_0.97', 'PARADOX_SAFE'].map(tag => (
                      <span key={tag} className="text-[9px] tracking-widest px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h2>
                  <p className="text-xs opacity-50 mb-6 font-mono">Sender entity: {selectedEmail.from.name} · Local date anchor: {selectedEmail.date}</p>
                  <div className="leading-relaxed whitespace-pre-wrap text-sm border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                    {selectedEmail.body}
                  </div>
                  <p className="text-[10px] mt-8 opacity-40 italic">This message was already read in your future. Paradox buffers engaged.</p>
                </article>
              </div>
            ) : (
              <div className="h-full min-h-[280px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4 inline-block animate-spin" style={{ animationDuration: '12s' }}>✨</div>
                  <p className="text-sm tracking-widest opacity-50">Select a temporal thread</p>
                </div>
              </div>
            )}
          </main>

          <aside className="lg:w-56 shrink-0 border-t lg:border-t-0 lg:border-l p-4 space-y-4 text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[10px] tracking-widest opacity-50 mb-2">ATMOSPHERE (2026)</p>
              <div className="text-3xl">{weather.icon}</div>
              <p className="font-semibold mt-1">{weather.temp}°</p>
              <p className="opacity-60">{weather.condition}</p>
            </div>
            <div className="rounded-xl p-4 border font-mono" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[10px] tracking-widest opacity-50 mb-2">WEALTH_LEGACY</p>
              {stocks.map(s => (
                <div key={s.ticker} className="flex justify-between py-1">
                  <span style={{ color: 'var(--accent2)' }}>{s.ticker}</span>
                  <span>{s.changePct}%</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 border space-y-2" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[10px] tracking-widest opacity-50">HISTORY_FEED</p>
              {news.slice(0, 3).map(n => (
                <p key={n.id} className="opacity-80 leading-snug text-[11px]">{n.title}</p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
