import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function PostApocalypseLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="apoc-crt-flicker relative min-h-screen overflow-hidden"
      style={{
        background: 'var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="apoc-scanlines pointer-events-none absolute inset-0 z-[5] opacity-40 mix-blend-screen" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" aria-hidden />

      <div className="relative z-10 px-4 py-4 font-mono text-xs sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border border-[var(--accent2)] bg-[var(--card)]/80 px-3 py-2 text-[var(--text)]">
          <span>ARCHIVE_NODE_7</span>
          <span className="apoc-blink text-[var(--accent)]">OFFLINE</span>
          <span>LAST_SYNC: ~~~~</span>
          <button type="button" className="border border-[var(--text)] px-2 py-0.5 hover:bg-[var(--text)] hover:text-[var(--bg)]" onClick={onSwitchPersona}>
            EXIT
          </button>
        </div>

        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-[var(--text2)]">
          &gt; cached_packet_bundle_recovered // human_correspondence_fragment // do not trust uplink
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <main className="lg:col-span-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[var(--accent2)]">[ MESSAGES ]</p>
            <div className="space-y-2">
              {emails.map(email => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="block w-full border-l-4 border-[var(--accent)] bg-[var(--card)]/40 px-3 py-3 text-left transition hover:bg-[var(--card)]/70"
                >
                  <p className="text-[10px] text-[var(--text2)]">
                    :: {email.id.toString().padStart(3, '0')} :: {email.date}
                  </p>
                  <p className="mt-1 text-sm font-bold tracking-wide">{email.subject.toUpperCase()}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-[var(--text2)]">{email.preview}</p>
                </button>
              ))}
            </div>
          </main>

          <aside className="space-y-3 text-[11px] lg:col-span-4">
            <div className="border border-[var(--accent2)] bg-black/40 p-3">
              <p className="text-[var(--accent)]">ENV_SENSOR (LOCAL)</p>
              <p className="mt-2">
                TMP={weather.temp}C · HUM={weather.humidity}% · WIND={weather.wind}
              </p>
              <p className="mt-1 text-[var(--text2)]">{weather.condition.toUpperCase()}</p>
            </div>
            <div className="border border-[var(--accent2)] bg-black/40 p-3">
              <p className="text-[var(--accent)]">EXCHANGE_GHOST</p>
              {stocks.map(s => (
                <p key={s.ticker} className="mt-1">
                  {s.ticker} {s.price} ({s.changePct >= 0 ? '+' : ''}
                  {s.changePct.toFixed(2)}%)
                </p>
              ))}
            </div>
            <div className="border border-[var(--accent2)] bg-black/40 p-3 text-[var(--text2)]">
              <p className="text-[var(--accent)]">PROPAGANDA_CACHE</p>
              {news.slice(0, 4).map(n => (
                <p key={n.id} className="mt-2">
                  - {n.title}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="apoc-glitch-border max-h-[85vh] w-full max-w-2xl overflow-y-auto border-2 border-[var(--accent)] bg-[var(--bg)] p-5 text-[var(--text)] shadow-[0_0_40px_rgba(74,222,128,0.15)]"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-[10px] text-[var(--text2)]">FILE_ID_{selectedEmail.id}</p>
            <h2 className="mt-2 text-lg font-bold tracking-widest">{selectedEmail.subject}</h2>
            <p className="mt-1 text-xs text-[var(--text2)]">SRC={selectedEmail.from.email}</p>
            <hr className="my-4 border-[var(--accent2)]" />
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.body}</pre>
            <button type="button" className="mt-6 w-full border border-[var(--accent)] py-2 text-xs uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)]" onClick={() => setSelectedEmail(null)}>
              purge_view
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
