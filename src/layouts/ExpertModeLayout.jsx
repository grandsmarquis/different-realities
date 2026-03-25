import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function ExpertModeLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2 text-xs">
        <span className="text-[var(--text2)]">MODE=EXPERT · HINTS=0</span>
        <button type="button" className="px-2 py-1 hover:bg-[var(--border)]" onClick={onSwitchPersona}>
          :q!
        </button>
      </div>

      <div className="grid grid-cols-1 gap-px bg-[var(--border)] md:grid-cols-[1fr_14rem]">
        <main className="bg-[var(--bg)]">
          <div className="sticky top-0 z-10 flex border-b border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-[10px] text-[var(--text2)]">
            <span className="w-8">id</span>
            <span className="w-28 shrink-0">src</span>
            <span className="min-w-0 flex-1">subj</span>
            <span className="hidden w-24 sm:block">ts</span>
          </div>
          {emails.map(email => (
            <button
              key={email.id}
              type="button"
              onClick={() => setSelectedEmail(email)}
              className="flex w-full border-b border-[var(--border)] px-2 py-1.5 text-left text-[11px] hover:bg-[var(--card)]"
            >
              <span className="w-8 tabular-nums text-[var(--text2)]">{email.id}</span>
              <span className="w-28 shrink-0 truncate">{email.from.email}</span>
              <span className="min-w-0 flex-1 truncate">{email.subject}</span>
              <span className="hidden w-24 shrink-0 text-[var(--text2)] sm:block">{email.date}</span>
            </button>
          ))}
        </main>

        <aside className="bg-[var(--bg2)] p-2 text-[10px] leading-tight">
          <pre className="text-[var(--text2)]">
            {`W ${weather.temp}
${weather.humidity}
${weather.wind}`}
          </pre>
          <hr className="my-2 border-[var(--border)]" />
          {stocks.map(s => (
            <pre key={s.ticker} className="mb-1">
              {`${s.ticker}\t${s.price}\t${s.changePct}`}
            </pre>
          ))}
          <hr className="my-2 border-[var(--border)]" />
          {news.map(n => (
            <p key={n.id} className="mb-2 text-[var(--text2)]">
              {n.title}
            </p>
          ))}
        </aside>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4" onClick={() => setSelectedEmail(null)}>
          <pre
            className="mx-auto mt-8 max-h-[calc(100vh-4rem)] max-w-4xl overflow-auto border border-[var(--border)] bg-[var(--bg)] p-4 text-xs text-[var(--text)]"
            onClick={e => e.stopPropagation()}
          >
            {[
              `id:${selectedEmail.id}`,
              `from:${selectedEmail.from.email}`,
              `subj:${selectedEmail.subject}`,
              `date:${selectedEmail.date}`,
              '---',
              selectedEmail.body,
            ].join('\n')}
          </pre>
          <p className="mt-2 text-center text-[10px] text-[var(--text2)]">esc / backdrop</p>
        </div>
      )}
    </div>
  )
}
