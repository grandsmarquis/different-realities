import { useContext } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const dispatch = t =>
  ({
    work: 'From the Office of the Minister',
    personal: 'A Private Word',
    finance: 'The Royal Exchequer',
    promo: 'By Appointment',
    newsletter: 'The Court Circular',
    social: 'Society Notices',
    dev: 'The Royal Repository',
    shopping: 'Purveyor to the Crown',
    travel: 'Carriages & Voyages',
  }[t] || 'General Dispatch')

export default function QueenEnglandLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  return (
    <div className="queen-paper relative min-h-screen" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
      <div className="queen-filigree pointer-events-none fixed inset-0 opacity-[0.35]" aria-hidden />
      <div className="queen-crest-watermark pointer-events-none fixed right-[8%] top-[12%] text-[min(40vw,220px)] opacity-[0.06] select-none" aria-hidden>
        ♔
      </div>

      <header className="relative z-10 border-b px-4 py-8" style={{ borderColor: 'var(--border)', background: 'linear-gradient(180deg, var(--card) 0%, var(--bg) 100%)' }}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.45em] uppercase" style={{ color: 'var(--accent2)' }}>
            By Appointment
          </p>
          <div className="queen-crown-float mt-3 inline-block text-5xl">👑</div>
          <h1 className="mt-2 text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            Her Majesty&apos;s Correspondence
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm italic" style={{ color: 'var(--text2)' }}>
            The same letters, presented with the dignity they pretend to deserve.
          </p>
          <button type="button" className="btn btn-ghost btn-sm mt-4 gap-2 border" style={{ borderColor: 'var(--accent2)', color: 'var(--accent)' }} onClick={onSwitchPersona}>
            Return to the commons
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 p-4 lg:flex-row lg:gap-8" style={{ minHeight: 'calc(100dvh - 220px)' }}>
        <aside className="lg:w-72 shrink-0">
          <div className="queen-ornate-frame rounded-sm border-2 p-1 shadow-lg" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <div className="border px-3 py-2 text-center text-xs uppercase tracking-widest" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
              The morning post
            </div>
            <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {emails.map(e => {
                const active = selectedEmail?.id === e.id
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedEmail(e)}
                      className="queen-seal-hover flex w-full gap-3 p-4 text-left transition-colors"
                      style={{
                        background: active ? 'color-mix(in srgb, var(--accent2) 12%, transparent)' : 'transparent',
                      }}
                    >
                      <span className="text-2xl">{e.from.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {!e.read && (
                            <span className="queen-wax-seal rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white" style={{ background: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                              Unopened
                            </span>
                          )}
                          <span className={`font-semibold leading-snug ${active ? '' : 'opacity-90'}`}>{e.subject}</span>
                        </div>
                        <p className="mt-1 text-sm" style={{ color: 'var(--text2)' }}>
                          {e.from.name}
                        </p>
                        <p className="mt-1 text-xs italic" style={{ color: 'var(--accent2)' }}>
                          {dispatch(e.tag)}
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <main className="min-h-[280px] flex-1">
          {selectedEmail ? (
            <article className="queen-ornate-frame queen-parchment relative overflow-hidden rounded-sm border-2 p-8 shadow-xl" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full border-4 border-double opacity-80" style={{ borderColor: 'var(--accent2)' }} aria-hidden />
              <header className="border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent2)' }}>
                  Most humbly addressed
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)' }}>
                  {selectedEmail.subject}
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text2)' }}>
                  From <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedEmail.from.name}</span> · {selectedEmail.date}
                </p>
                <p className="mt-1 text-xs italic" style={{ color: 'var(--accent)' }}>
                  {dispatch(selectedEmail.tag)}
                </p>
              </header>
              <div className="mt-6 text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text)' }}>
                {selectedEmail.body}
              </div>
              <p className="mt-8 text-center text-sm italic" style={{ color: 'var(--text2)' }}>
                God save the inbox
              </p>
              <button type="button" className="btn btn-ghost btn-sm mt-4" style={{ color: 'var(--accent)' }} onClick={() => setSelectedEmail(null)}>
                ← Fold the letter
              </button>
            </article>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-sm border-2 border-dashed p-8 text-center" style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}>
              <span className="queen-crown-float text-6xl opacity-40">📜</span>
              <p className="mt-4 max-w-sm font-serif text-lg italic">Select a dispatch from the morning post to read it in proper company.</p>
            </div>
          )}
        </main>

        <aside className="lg:w-52 shrink-0 space-y-4">
          <div className="queen-ornate-frame rounded-sm border-2 p-4 text-center shadow-md" style={{ borderColor: 'var(--accent2)', background: 'var(--card)' }}>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Weather over the palace
            </p>
            <p className="text-4xl">{weather.icon}</p>
            <p className="font-semibold">{weather.condition}</p>
            <p className="text-xs" style={{ color: 'var(--text2)' }}>
              {weather.temp}° · a gentle {weather.wind} km/h
            </p>
          </div>
          <div className="queen-ornate-frame rounded-sm border-2 p-4 shadow-md" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <p className="text-center text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent2)' }}>
              The Exchange
            </p>
            {stocks.map(s => (
              <div key={s.ticker} className="mt-2 flex justify-between border-b text-sm" style={{ borderColor: 'var(--border)' }}>
                <span>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>{s.changePct >= 0 ? '↑' : '↓'} {Math.abs(s.changePct)}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-sm border p-3 text-xs italic shadow-sm" style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--text2)' }}>
            {news.slice(0, 2).map((n, i) => (
              <p key={i} className="mb-2">
                {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
