import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function DyslexiaFriendlyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [rulerOn, setRulerOn] = useState(true)

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--bg)',
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
      }}
    >
      <header className="border-b-2 border-[var(--border)] bg-[var(--bg2)] px-5 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl" style={{ letterSpacing: '0.04em' }}>
              Reading-friendly inbox
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-[1.85] text-[var(--text2)]" style={{ wordSpacing: '0.08em' }}>
              Extra line spacing, calm contrast, optional focus line while you read.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn btn-md ${rulerOn ? 'btn-primary' : 'btn-outline border-[var(--border)]'}`}
              onClick={() => setRulerOn(v => !v)}
            >
              Focus line: {rulerOn ? 'on' : 'off'}
            </button>
            <button type="button" className="btn btn-outline border-[var(--border)]" onClick={onSwitchPersona}>
              Switch persona
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10">
        <ul className="space-y-8">
          {emails.map(email => (
            <li key={email.id}>
              <button
                type="button"
                onClick={() => setSelectedEmail(email)}
                className={`dyslexia-readable w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-6 text-left shadow-sm transition hover:border-[var(--accent)] ${rulerOn ? 'dyslexia-ruler-bg' : ''}`}
              >
                <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">{email.from.name}</p>
                <p className="mt-3 text-xl font-semibold leading-[1.75]" style={{ letterSpacing: '0.03em' }}>
                  {email.subject}
                </p>
                <p className="mt-4 text-lg leading-[1.9] text-[var(--text2)]" style={{ wordSpacing: '0.06em' }}>
                  {email.preview}
                </p>
                <p className="mt-4 text-base text-[var(--text2)]">{email.date}</p>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-14 space-y-6 border-t-2 border-[var(--border)] pt-10 text-lg leading-[1.85]">
          <p>
            <span className="font-semibold text-[var(--accent)]">Weather:</span> {weather.icon} {weather.temp}°C, {weather.condition}.
          </p>
          <p className="font-semibold text-[var(--accent)]">News:</p>
          <p>{news[0]?.emoji} {news[0]?.title}</p>
          <p className="font-semibold text-[var(--accent)]">Markets:</p>
          <ul className="list-inside list-disc space-y-2">
            {stocks.map(s => (
              <li key={s.ticker}>
                {s.ticker}: {s.currency}
                {s.price.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}
                {s.changePct.toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-[2px]" onClick={() => setSelectedEmail(null)}>
          <div
            className={`max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-8 shadow-xl sm:p-10 ${rulerOn ? 'dyslexia-ruler-bg' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-base font-medium text-[var(--accent)]">{selectedEmail.from.name}</p>
            <h2 className="mt-4 text-2xl font-semibold leading-[1.7]" style={{ letterSpacing: '0.03em' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-2 text-base text-[var(--text2)]">{selectedEmail.date}</p>
            <pre className="dyslexia-readable mt-8 whitespace-pre-wrap font-sans text-lg leading-[1.95]" style={{ wordSpacing: '0.06em' }}>
              {selectedEmail.body}
            </pre>
            <button type="button" className="btn btn-primary btn-lg mt-10 w-full" onClick={() => setSelectedEmail(null)}>
              Done reading
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
