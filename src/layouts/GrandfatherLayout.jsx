import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function WorkshopClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const h = now.getHours() % 12
  const m = now.getMinutes()
  const s = now.getSeconds()
  const hDeg = h * 30 + m * 0.5
  const mDeg = m * 6
  const sDeg = s * 6

  return (
    <div className="relative mx-auto h-28 w-28 shrink-0 rounded-full border-4 shadow-lg grand-clock-face" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10" style={{ background: 'var(--accent)' }} />
      <div
        className="grand-clock-hand absolute bottom-1/2 left-1/2 w-1 origin-bottom rounded-full"
        style={{ height: '32%', marginLeft: -2, background: 'var(--accent2)', transform: `rotate(${hDeg}deg)` }}
      />
      <div
        className="grand-clock-hand absolute bottom-1/2 left-1/2 w-0.5 origin-bottom rounded-full"
        style={{ height: '40%', marginLeft: -1, background: 'var(--text)', transform: `rotate(${mDeg}deg)` }}
      />
      <div
        className="grand-clock-second absolute bottom-1/2 left-1/2 w-px origin-bottom rounded-full"
        style={{ height: '38%', marginLeft: 0, background: '#b91c1c', transform: `rotate(${sDeg}deg)` }}
      />
        {[12, 3, 6, 9].map(num => {
        const ang = (num / 12) * 2 * Math.PI - Math.PI / 2
        const cx = 50 + 38 * Math.cos(ang)
        const cy = 50 + 38 * Math.sin(ang)
        return (
          <span key={num} className="absolute text-[10px] font-bold" style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -50%)', color: 'var(--text2)' }}>
            {num}
          </span>
        )
      })}
    </div>
  )
}

export default function GrandfatherLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="grand-paper-texture min-h-dvh"
      style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div className="mx-auto max-w-5xl px-3 py-6 md:px-6">
        {/* Masthead */}
        <header
          className="grand-masthead mb-6 border-4 border-double p-4 shadow-md md:flex md:items-center md:justify-between"
          style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
        >
          <div className="text-center md:text-left">
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)' }}>
              The Workshop Gazette
            </p>
            <h1 className="m-0 text-3xl font-bold md:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              Daily Telegraph &amp; Tube Post
            </h1>
            <p className="m-0 mt-1 text-sm italic" style={{ color: 'var(--text2)' }}>Est. whenever they invented stamps · All the news that fits the workbench</p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 md:mt-0">
            <WorkshopClock />
            <div className="text-left text-sm" style={{ color: 'var(--text2)' }}>
              <p className="m-0 font-bold" style={{ color: 'var(--text)' }}>Weather vane says</p>
              <p className="m-0">{weather.icon} {weather.temp}°C — {weather.condition}</p>
              <p className="m-0 text-xs">{weather.city}</p>
            </div>
          </div>
        </header>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <button type="button" className="btn btn-sm border-2 font-semibold" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }} onClick={onSwitchPersona}>
            Turn the dial (switch persona)
          </button>
        </div>

        {/* Two-column newspaper body */}
        <div className="rounded-sm border-2 p-4 shadow-lg md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="mb-4 border-b-2 pb-3 text-center" style={{ borderColor: 'var(--border)' }}>
            <h2 className="m-0 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Correspondence Column</h2>
            <p className="m-0 text-xs" style={{ color: 'var(--text2)' }}>{emails.filter(e => !e.read).length} letters still in the envelope tray</p>
          </div>

          <div className="grand-newspaper-columns">
            {emails.map((email, i) => (
              <article
                key={email.id}
                className="grand-article-drift mb-6 break-inside-avoid cursor-pointer rounded border border-dashed p-3 transition-shadow hover:shadow-md"
                style={{ borderColor: 'var(--border)', animationDelay: `${i * 0.05}s` }}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex flex-wrap items-baseline gap-2 border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-2xl">{email.from.avatar}</span>
                  <span className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>{email.from.name}</span>
                  {!email.read && (
                    <span className="rounded px-1 text-[10px] font-bold uppercase" style={{ background: 'var(--accent2)', color: '#fff' }}>New</span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-bold leading-snug">{email.subject}</h3>
                <p className="m-0 mt-1 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{email.preview}</p>
                <p className="mt-2 text-right text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Continued →</p>
              </article>
            ))}
          </div>

          <div className="mt-8 border-t-4 border-double pt-4" style={{ borderColor: 'var(--accent)' }}>
            <h2 className="m-0 text-center text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>Financials &amp; Market Chatter</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {stocks.map(s => (
                <div key={s.ticker} className="rounded border-2 p-3" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>{s.ticker}</span>
                  <span className="ml-2 text-sm" style={{ color: s.changePct >= 0 ? '#166534' : '#991b1b' }}>
                    {s.currency}{s.price.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t-2 pt-4" style={{ borderColor: 'var(--border)' }}>
            <h2 className="m-0 text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>Radio bulletin</h2>
            <ul className="m-0 mt-2 list-disc space-y-2 pl-5 text-sm" style={{ color: 'var(--text2)' }}>
              {news.map(n => (
                <li key={n.id}><span className="mr-1">{n.emoji}</span>{n.title}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wood grain footer strip */}
        <div
          className="grand-wood-shine mt-6 rounded border-2 p-3 text-center text-xs"
          style={{ borderColor: 'var(--accent)', background: 'linear-gradient(90deg, var(--bg2), var(--bg), var(--bg2))', color: 'var(--text2)' }}
        >
          “Measure twice, read your email once.” — shop wisdom
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(44, 36, 24, 0.55)' }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="grand-paper-texture max-h-[82vh] w-full max-w-lg overflow-y-auto border-4 border-double p-6 shadow-2xl"
            style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
            onClick={e => e.stopPropagation()}
          >
            <p className="m-0 text-center text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)' }}>Extra! Extra!</p>
            <h3 className="mt-2 text-center text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{selectedEmail.subject}</h3>
            <p className="text-center text-sm italic" style={{ color: 'var(--text2)' }}>By {selectedEmail.from.name} {selectedEmail.from.avatar}</p>
            <hr className="my-4" style={{ borderColor: 'var(--border)' }} />
            <div className="whitespace-pre-line text-sm leading-relaxed" style={{ fontFamily: 'var(--font-main)' }}>
              {selectedEmail.body}
            </div>
            <button type="button" className="btn btn-block mt-6 border-2 font-bold" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }} onClick={() => setSelectedEmail(null)}>
              Fold paper &amp; set down
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
