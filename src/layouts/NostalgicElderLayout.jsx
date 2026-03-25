import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function NostalgicElderLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="elder-radio-hum relative min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #4a3f32 0%, #3d3428 35%, #2c241c 100%)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 elder-film-grain opacity-35 mix-blend-overlay" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-amber-900/10 mix-blend-multiply" aria-hidden />

      <header className="relative z-10 border-b border-[var(--border)] bg-[var(--bg2)]/90 px-6 py-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-serif text-sm italic text-[var(--text2)]">The wireless still feels like magic…</p>
            <h1 className="mt-1 font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Letters &amp; Wireless
            </h1>
          </div>
          <button type="button" className="btn btn-outline btn-sm border-[var(--accent)] text-[var(--text)] hover:bg-[var(--accent)]/20" onClick={onSwitchPersona}>
            tune elsewhere
          </button>
        </div>
      </header>

      <div className="relative z-10 px-6 pb-12 pt-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-4">
            <div className="elder-dial-glow rounded-box border-2 border-[var(--border)] bg-[#1f1810] p-4 text-center text-[var(--text2)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Radio dial</p>
              <div className="elder-vinyl-spin relative mx-auto mt-4 h-28 w-28 rounded-full border-4 border-[var(--accent2)] bg-[radial-gradient(circle,#3d3428_30%,#1a1208_31%)] shadow-inner">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">📻</span>
              </div>
              <p className="mt-3 text-sm">Weather, {weather.city}</p>
              <p className="text-lg text-[var(--text)]">
                {weather.icon} {weather.temp}°C — {weather.condition}
              </p>
            </div>
            <div className="rounded-box border border-[var(--border)] bg-[var(--card)]/90 p-4 text-[#2c241c]">
              <p className="font-serif text-sm font-bold text-[var(--accent2)]">Market chit-chat</p>
              {stocks.map(s => (
                <p key={s.ticker} className="mt-2 border-b border-dashed border-[var(--border)] pb-2 text-sm last:border-0">
                  <span className="font-semibold">{s.ticker}</span> settled near {s.currency}
                  {s.price.toFixed(2)}
                </p>
              ))}
            </div>
          </aside>

          <main className="order-1 lg:order-2 lg:col-span-8">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Memory box — correspondence</p>
            <div className="columns-1 gap-6 space-y-6 sm:columns-2">
              {emails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="elder-polaroid-tilt mb-6 break-inside-avoid w-full rounded-sm border-[12px] border-[#f5ebe0] bg-[#f5ebe0] p-3 pb-10 text-left text-[#2c241c] shadow-xl transition hover:z-10 hover:scale-[1.02]"
                  style={{ transform: `rotate(${(i % 5) * 0.8 - 1.6}deg)` }}
                >
                  <div className="flex aspect-[5/4] items-center justify-center bg-gradient-to-b from-[#d4c4a8] to-[#b8a082] text-5xl">{email.from.avatar}</div>
                  <p className="mt-3 font-serif text-sm font-bold leading-snug">{email.subject}</p>
                  <p className="mt-1 font-serif text-xs italic opacity-80">{email.date}</p>
                </button>
              ))}
            </div>
          </main>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="mb-3 text-center font-serif text-sm italic text-[var(--text2)]">From the ticker-tape of tomorrow…</p>
          <div className="elder-news-scroll flex gap-8 overflow-x-auto pb-2 text-sm">
            {news.map(n => (
              <span key={n.id} className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg2)]/80 px-4 py-2">
                {n.emoji} {n.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={() => setSelectedEmail(null)}>
          <div
            className="elder-modal-sepia max-h-[85vh] w-full max-w-lg overflow-y-auto rounded border-[14px] border-[#e8dcc8] bg-[#f5ebe0] p-6 text-[#2c2418] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="font-serif text-xs uppercase tracking-widest text-[var(--accent2)]">Saved clipping</p>
            <h2 className="mt-2 font-serif text-2xl">{selectedEmail.subject}</h2>
            <p className="mt-1 font-serif text-sm italic">{selectedEmail.from.name} · {selectedEmail.date}</p>
            <pre className="mt-6 whitespace-pre-wrap font-serif text-base leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="btn btn-neutral mt-8" onClick={() => setSelectedEmail(null)}>
              Fold away
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
