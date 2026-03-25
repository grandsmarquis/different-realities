import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function fakeSender(name) {
  const map = {
    LinkedIn: 'LinkedIN_Security_OFFICIAL',
    'Julien Moreau': 'IT_Dept_Urgent.exe',
    'BNP Paribas': 'BANK_ALERT_VERIFY_NOW',
    GitHub: 'GitHub_Premium_Reward',
    'Maman 💕': 'Mom_(not_fake)',
    Amazon: 'AMAZON_PRIZE_TEAM',
    'Air France': 'FREE_MILES_CLAIM',
    Netflix: 'NETFLIX_BILLING_LOCKED',
  }
  return map[name] || name.toUpperCase().replace(/\s/g, '_') + '_TRUST'
}

export default function ScammerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [tick, setTick] = useState(0)
  const [popupNudge, setPopupNudge] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setPopupNudge(x => x + 1), 2400)
    return () => clearInterval(t)
  }, [])

  const matrixCols = useMemo(() => Array.from({ length: 14 }, (_, i) => i), [])

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}
    >
      <div className="scammer-matrix-bg pointer-events-none fixed inset-0 opacity-[0.07]" aria-hidden />

      {/* Fake desktop clutter */}
      <div
        className="pointer-events-none fixed w-[min(92vw,340px)] rounded border-2 p-2 shadow-xl scammer-popup-wiggle"
        style={{
          borderColor: 'var(--accent2)',
          background: 'var(--card)',
          top: '8%',
          left: '4%',
          zIndex: 5,
          transform: `translate(${Math.sin(popupNudge * 0.7) * 4}px, ${Math.cos(popupNudge * 0.5) * 3}px) rotate(-2deg)`,
        }}
      >
        <p className="scammer-blink m-0 text-center text-xs font-bold" style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}>
          ⚠ VIRUS DETECTD
        </p>
        <p className="m-0 mt-1 text-[10px] leading-tight opacity-90">call toll FREE NOW!!!</p>
      </div>

      <div
        className="pointer-events-none fixed w-[min(88vw,300px)] rounded border-2 p-3 shadow-xl"
        style={{
          borderColor: 'var(--accent)',
          background: 'linear-gradient(180deg, var(--bg2), var(--card))',
          bottom: '18%',
          right: '3%',
          zIndex: 6,
          transform: `rotate(1.5deg) translate(${Math.cos(popupNudge * 0.4) * 5}px, 0)`,
        }}
      >
        <p className="m-0 text-sm font-bold scammer-shimmer-text" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
          YOU WON $2,847,291.00
        </p>
        <p className="m-0 mt-1 text-[10px]" style={{ color: 'var(--text2)' }}>click ANYWHERE (trust me)</p>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-3 py-6 md:px-4">
        {/* Taskbar-ish strip */}
        <div
          className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border-2 px-3 py-2"
          style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}
        >
          <span className="text-[10px] md:text-xs" style={{ color: 'var(--text2)' }}>
            🔒 &quot;Microsft&quot; Secure Male — Build {9000 + (tick % 40)}
          </span>
          <button
            type="button"
            className="btn btn-xs border"
            style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}
            onClick={onSwitchPersona}
          >
            Eject CD
          </button>
        </div>

        {/* Marquee */}
        <div
          className="mb-4 overflow-hidden rounded border py-1"
          style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
        >
          <div className="scammer-marquee flex whitespace-nowrap text-[11px] font-bold" style={{ color: 'var(--accent2)' }}>
            <span className="px-4">
              !!! ACT NOW !!! YOUR ACCOUNT WILL BE DELETED IN {String(47 - (tick % 40)).padStart(2, '0')} SECONDS !!! IRS WANTS TO GIVE YOU MONEY
              !!! CONGRATULATION !!! FREE iPHONE 47 !!!
            </span>
            <span className="px-4" aria-hidden>
              !!! ACT NOW !!! YOUR ACCOUNT WILL BE DELETED IN {String(47 - (tick % 40)).padStart(2, '0')} SECONDS !!! IRS WANTS TO GIVE YOU MONEY
              !!! CONGRATULATION !!! FREE iPHONE 47 !!!
            </span>
          </div>
        </div>

        <div
          className="relative rounded-xl border-2 p-4 shadow-2xl md:p-6"
          style={{
            borderColor: 'var(--accent)',
            background: 'var(--card)',
            boxShadow: '0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent), 0 20px 50px rgba(0,0,0,0.45)',
          }}
        >
          <div className="mb-4 flex items-start justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
            <div>
              <h1 className="m-0 text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '0.06em' }}>
                INBOX.EXE
              </h1>
              <p className="m-0 mt-1 text-xs" style={{ color: 'var(--text2)' }}>
                Totally legít correspondence ({emails.filter(e => !e.read).length} &quot;unread&quot; — act fast!!!)
              </p>
            </div>
            <div className="scammer-blink rounded border px-2 py-1 text-center text-[10px] font-bold" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>
              SSL: ????
            </div>
          </div>

          {/* Terminal weather */}
          <pre
            className="mb-4 overflow-x-auto rounded border p-3 text-[11px] leading-relaxed"
            style={{ borderColor: 'var(--border)', background: '#050805', color: 'var(--accent)' }}
          >
            {`> WEATHER_SCAN.bat\n> ${weather.city} ... ${weather.temp}C ... ${weather.condition}\n> TRUST_SCORE: ████░░░░░░ 0.${(tick % 9) + 1}%\n> RUN: send_giftcards_to_stranger.cmd ? [Y]/Y`}
          </pre>

          <p className="mb-3 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
            MESSAGES (do not ignore)
          </p>
          <div className="space-y-3">
            {emails.map((email, i) => (
              <button
                key={email.id}
                type="button"
                className="scammer-card-hover w-full rounded-lg border-2 p-3 text-left transition-shadow"
                style={{
                  borderColor: email.read ? 'var(--border)' : 'var(--accent2)',
                  background: 'var(--bg2)',
                  animationDelay: `${i * 0.08}s`,
                }}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex items-start gap-2">
                  <span className="text-2xl">{email.from.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 break-all text-xs font-bold" style={{ color: 'var(--accent)' }}>
                      {fakeSender(email.from.name)} &lt;no-reply@{['totally', 'real', 'bank', 'support', 'team'][i % 5]}.tk&gt;
                    </p>
                    <p className="m-0 mt-1 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                      {email.subject}
                      {!email.read && <span className="ml-2 text-[10px]" style={{ color: 'var(--accent2)' }}>[URGENT]</span>}
                    </p>
                    <p className="m-0 mt-1 line-clamp-2 text-xs" style={{ color: 'var(--text2)' }}>{email.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 border-t pt-4 md:grid-cols-2" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="m-0 mb-2 text-xs font-bold" style={{ fontFamily: 'var(--font-display)' }}>STONX (not advice)</p>
              <div className="flex flex-wrap gap-2">
                {stocks.slice(0, 4).map(s => (
                  <span key={s.ticker} className="rounded border px-2 py-1 text-[10px]" style={{ borderColor: 'var(--border)' }}>
                    {s.ticker} {s.changePct >= 0 ? '📈' : '📉'}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="m-0 mb-2 text-xs font-bold" style={{ fontFamily: 'var(--font-display)' }}>NEWS (sponsored)</p>
              <ul className="m-0 list-none space-y-1 p-0 text-[11px]" style={{ color: 'var(--text2)' }}>
                {news.slice(0, 3).map(n => (
                  <li key={n.id}>{n.emoji} {n.title.slice(0, 48)}…</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <span
              className="scammer-shimmer-btn cursor-pointer rounded-full px-6 py-2 text-sm font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#0a0f0c' }}
            >
              CLAIM PRIZE (bitcoin only)
            </span>
          </div>
        </div>
      </div>

      {/* Matrix rain columns */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-around overflow-hidden opacity-[0.12]" aria-hidden>
        {matrixCols.map(c => (
          <div key={c} className="scammer-matrix-col w-4 text-[10px] leading-none" style={{ animationDelay: `${c * 0.35}s` }}>
            {Array.from({ length: 28 }, (_, r) => (
              <span key={r}>{['0', '1', '₿', '¥', '7', 'Z'][((c + r + tick) % 7)]}</span>
            ))}
          </div>
        ))}
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="relative max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-xl border-4 p-5 shadow-2xl"
            style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close"
              onClick={() => setSelectedEmail(null)}
            >
              ✕
            </button>
            <p className="m-0 text-center text-xs font-bold scammer-blink" style={{ color: 'var(--accent2)' }}>OFFICIAL MESSAGE</p>
            <p className="mt-2 text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{selectedEmail.subject}</p>
            <p className="text-xs" style={{ color: 'var(--text2)' }}>
              from: {fakeSender(selectedEmail.from.name)}
            </p>
            <div className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{selectedEmail.body}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="btn btn-sm border-0 scammer-shimmer-btn" style={{ color: '#0a0f0c' }}>Send gift cards</button>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => setSelectedEmail(null)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
