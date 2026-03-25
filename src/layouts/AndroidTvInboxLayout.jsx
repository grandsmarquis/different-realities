import { useContext, useEffect, useMemo, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagLabel = (tag) =>
  ({
    social: 'Social',
    work: 'Work',
    finance: 'Finance',
    dev: 'Dev',
    personal: 'Family',
    shopping: 'Shopping',
    travel: 'Travel',
    newsletter: 'Media',
  }[tag] || 'General')

export default function AndroidTvInboxLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [focused, setFocused] = useState('mail')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const topMail = useMemo(() => emails.slice(0, 5), [])
  const featuredNews = useMemo(() => news.slice(0, 4), [])
  const market = useMemo(() => stocks.slice(0, 4), [])
  const unread = useMemo(() => emails.filter((e) => !e.read).length, [])

  return (
    <div
      className="android-tv-root min-h-dvh p-3 sm:p-5 md:p-6"
      style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="android-tv-bg pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className={`android-tv-orb android-tv-orb-a ${reducedMotion ? '' : 'android-tv-float-slow'}`} />
        <div className={`android-tv-orb android-tv-orb-b ${reducedMotion ? '' : 'android-tv-float-fast'}`} />
        <div className={`android-tv-orb android-tv-orb-c ${reducedMotion ? '' : 'android-tv-pulse'}`} />
      </div>

      <header className="android-tv-glass rounded-3xl border px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.62rem] uppercase tracking-[0.35em] text-cyan-200/75">Android TV Home</p>
            <h1
              className="truncate text-xl font-semibold sm:text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Inbox Theater
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-100">Unread {unread}</div>
            <button type="button" className="btn btn-sm rounded-full border-0 bg-cyan-400 text-slate-950 hover:bg-cyan-300" onClick={onSwitchPersona}>
              Change Persona
            </button>
          </div>
        </div>
      </header>

      <main className="mt-4 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <section
          className={`android-tv-glass android-tv-tile rounded-3xl border p-4 sm:p-5 ${
            focused === 'mail' ? 'android-tv-focus' : ''
          }`}
          onMouseEnter={() => setFocused('mail')}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Mailbox Row</h2>
            <span className="text-xs text-cyan-100/70">{emails.length} cards</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {topMail.map((email) => {
              const isSelected = selectedEmail?.id === email.id
              return (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className={`android-tv-mail-card rounded-2xl border p-3 text-left transition ${
                    isSelected ? 'android-tv-mail-selected' : ''
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xl">{email.from.avatar}</span>
                    {!email.read && (
                      <span className={`size-2 rounded-full bg-cyan-300 ${reducedMotion ? '' : 'android-tv-dot-blink'}`} />
                    )}
                  </div>
                  <p className="line-clamp-2 text-sm font-semibold">{email.subject}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-cyan-100/70">{email.from.name}</p>
                  <div className="mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.16em] text-cyan-100/60">
                    <span>{tagLabel(email.tag)}</span>
                    <span>{email.time}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid gap-4">
          <article
            className={`android-tv-glass android-tv-tile rounded-3xl border p-4 ${
              focused === 'weather' ? 'android-tv-focus' : ''
            }`}
            onMouseEnter={() => setFocused('weather')}
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Weather Widget</h3>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-100/80">{weather.city}</p>
                <p className="text-3xl font-bold">{weather.temp}°</p>
                <p className="text-sm text-cyan-100/70">{weather.condition}</p>
              </div>
              <span className={`text-5xl ${reducedMotion ? '' : 'android-tv-weather-bob'}`}>{weather.icon}</span>
            </div>
          </article>

          <article
            className={`android-tv-glass android-tv-tile rounded-3xl border p-4 ${
              focused === 'stocks' ? 'android-tv-focus' : ''
            }`}
            onMouseEnter={() => setFocused('stocks')}
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Stocks Strip</h3>
            <div className="mt-3 space-y-2">
              {market.map((item) => (
                <div key={item.ticker} className="flex items-center justify-between rounded-xl bg-slate-900/40 px-3 py-2 text-sm">
                  <span>{item.ticker}</span>
                  <span className={item.changePct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>
                    {item.changePct >= 0 ? '+' : ''}
                    {item.changePct}%
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>

      <section
        className={`android-tv-glass android-tv-tile mt-4 rounded-3xl border p-4 ${
          focused === 'news' ? 'android-tv-focus' : ''
        }`}
        onMouseEnter={() => setFocused('news')}
      >
        <h2 className="mb-3 text-sm uppercase tracking-[0.28em] text-cyan-200/70">News Carousel</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {featuredNews.map((item, idx) => (
            <article key={item.id} className={`android-tv-news-card rounded-2xl border p-3 ${reducedMotion ? '' : 'android-tv-news-slide'}`} style={{ animationDelay: `${idx * 0.9}s` }}>
              <p className="mb-1 text-lg">{item.emoji}</p>
              <p className="line-clamp-3 text-sm font-medium">{item.title}</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.18em] text-cyan-100/60">
                {item.source} · {item.time}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="android-tv-glass mt-4 rounded-3xl border p-4">
        <h2 className="mb-3 text-sm uppercase tracking-[0.28em] text-cyan-200/70">Now Playing: Selected Mail</h2>
        {selectedEmail ? (
          <article className="rounded-2xl border border-cyan-100/20 bg-slate-950/50 p-4">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-2xl">{selectedEmail.from.avatar}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{selectedEmail.subject}</p>
                <p className="text-xs text-cyan-100/65">
                  {selectedEmail.from.name} · {selectedEmail.date}
                </p>
              </div>
            </div>
            <p className="line-clamp-4 whitespace-pre-wrap text-sm text-cyan-50/85">{selectedEmail.body}</p>
          </article>
        ) : (
          <p className="rounded-2xl border border-dashed border-cyan-100/25 bg-slate-900/25 px-4 py-5 text-sm text-cyan-100/70">
            Pick a mail tile above to open it in theater mode.
          </p>
        )}
      </section>
    </div>
  )
}
