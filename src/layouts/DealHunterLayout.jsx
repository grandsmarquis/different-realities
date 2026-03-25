import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const fakeWas = [49.99, 129, 19.99, 0, 8.5, 24, 399, 12]

export default function DealHunterLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(165deg, #0f172a 0%, #1e293b 45%, #0c4a6e 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="deal-ticker-strip border-b-2 border-[var(--accent)] bg-[var(--accent)]/15 py-2 overflow-hidden">
        <div className="deal-ticker-inner flex gap-12 whitespace-nowrap text-sm font-bold tracking-wide text-[var(--accent)]">
          <span>FREE SHIPPING THRESHOLD: $0.01 TODAY ONLY*</span>
          <span>PRICE MATCH + COUPON STACK</span>
          <span>CASHBACK 12% · DOUBLE POINTS</span>
          <span>COMPARE AT {fakeWas[0]} — YOU PAY LESS</span>
          <span>OPEN BOX / LIKE NEW</span>
        </div>
      </div>

      <header className="flex flex-wrap items-start justify-between gap-4 px-5 py-6">
        <div>
          <h1
            className="text-[clamp(1.5rem,4vw,2.4rem)] leading-none tracking-tight text-[var(--accent2)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CLEARANCE INBOX
          </h1>
          <p className="mt-2 text-sm text-[var(--text2)]">
            {emails.filter(e => !e.read).length} unread · you already saved <span className="text-[var(--accent)] font-bold">$847.12*</span>{' '}
            <span className="text-[10px] opacity-70">*estimated vibes</span>
          </p>
        </div>
        <button type="button" className="btn btn-sm border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/30" onClick={onSwitchPersona}>
          swap persona
        </button>
      </header>

      <div className="px-5 pb-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent2)]">aisle: messages</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {emails.map((email, i) => {
                const was = fakeWas[i % fakeWas.length]
                const off = Math.min(95, 35 + (i * 7) % 45)
                return (
                  <button
                    key={email.id}
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="deal-price-flash group relative overflow-hidden rounded-box border-2 border-dashed border-[var(--border)] bg-[var(--card)] p-4 text-left text-[#0f172a] shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute right-2 top-2 rotate-12 rounded bg-[var(--accent)] px-2 py-0.5 text-[10px] font-black text-white">
                      {off}% OFF
                    </span>
                    <span className="absolute -left-8 top-1/2 h-16 w-24 -translate-y-1/2 rotate-90 bg-[var(--accent2)]/20 text-[8px] font-bold leading-none text-[var(--text2)]">
                      RECEIPT
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text2)] line-through decoration-2">
                      was ${typeof was === 'number' ? was.toFixed(2) : was}
                    </p>
                    <p className="mt-1 font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
                      {email.subject}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm opacity-85">{email.preview}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-dotted border-[var(--border)] pt-2 text-xs">
                      <span className="font-semibold text-[var(--accent)]">NOW: FREE*</span>
                      <span className="text-[var(--text2)]">{email.date}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </main>

          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-box border-2 border-[var(--accent)] bg-base-300/30 p-4 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)]">doorbuster forecast</p>
              <p className="mt-2 text-lg font-bold">
                {weather.icon} {weather.temp}°C
              </p>
              <p className="text-sm text-[var(--text2)]">Perfect weather to stay inside and price-compare.</p>
            </div>
            <div className="rounded-box border border-[var(--border)] bg-[var(--bg2)]/80 p-4">
              <p className="text-xs font-bold uppercase text-[var(--accent)]">market “deals”</p>
              {stocks.map(s => (
                <div key={s.ticker} className="mt-2 flex justify-between text-sm">
                  <span>{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-[var(--accent)]' : 'text-error'}>
                    {s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-box border border-[var(--border)] bg-[var(--bg2)]/60 p-3">
              <p className="mb-2 text-xs font-bold text-[var(--accent2)]">headline coupons</p>
              {news.slice(0, 4).map(n => (
                <p key={n.id} className="mb-2 border-l-4 border-[var(--accent)] pl-2 text-sm leading-snug">
                  {n.emoji} {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="deal-modal-pop max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-box border-4 border-[var(--accent)] bg-[var(--card)] p-6 text-[#0f172a] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)]">price match guarantee</p>
            <h2 className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              from {selectedEmail.from.name} · {selectedEmail.date}
            </p>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-primary mt-6 w-full" onClick={() => setSelectedEmail(null)}>
              add to cart (close)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
