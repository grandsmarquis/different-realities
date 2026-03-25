import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function MarqueeStrip() {
  const text = ' ★ LUCKY STRIKE INBOX ★ JACKPOT MAIL ★ THE STRIP NEVER SLEEPS ★ WHAT HAPPENS IN VEGAS ★ '
  return (
    <div className="overflow-hidden border-y-4 py-2" style={{ borderColor: 'var(--accent)', background: '#0a0508' }}>
      <div
        className="flex w-max"
        style={{
          animation: 'casinoMarquee 24s linear infinite',
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="shrink-0 whitespace-nowrap pr-16 font-bold tracking-widest"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              color: 'var(--accent)',
              textShadow: '0 0 12px #ffd700, 0 0 24px #ff2a6d',
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes casinoMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

function WeatherOddsBoard() {
  return (
    <div
      className="rounded-sm border-4 p-4 shadow-lg"
      style={{
        borderColor: 'var(--accent)',
        background: 'linear-gradient(180deg, #1a1218 0%, #0f0a0d 100%)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.15)',
      }}
    >
      <div className="mb-3 border-b-2 pb-2 text-center" style={{ borderColor: 'var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--accent2)', letterSpacing: '0.2em' }}>
          ATMOSPHERE
        </p>
        <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.65rem', color: 'var(--text2)', letterSpacing: '0.25em' }}>
          ODDS & SKY
        </p>
      </div>
      <div className="text-center">
        <span className="text-5xl drop-shadow-lg">{weather.icon}</span>
        <p className="mt-2 text-3xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-main)', color: 'var(--accent3)', textShadow: '0 0 8px var(--accent3)' }}>
          {weather.temp}°
        </p>
        <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.8rem', color: 'var(--text)', letterSpacing: '0.08em' }}>
          {weather.city.toUpperCase()}
        </p>
        <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.7rem', color: 'var(--text2)' }}>{weather.condition}</p>
      </div>
      <div className="mt-4 space-y-1 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', textAlign: 'center' }}>
          WEEKLY LINE
        </p>
        {weather.forecast.map((d) => (
          <div key={d.day} className="flex items-center justify-between text-xs" style={{ fontFamily: 'var(--font-main)', color: 'var(--text2)' }}>
            <span>{d.day}</span>
            <span>{d.icon}</span>
            <span className="tabular-nums" style={{ color: 'var(--text)' }}>{d.high}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockBigBoard() {
  return (
    <div
      className="rounded-sm border-4 p-4"
      style={{
        borderColor: 'var(--accent2)',
        background: 'linear-gradient(180deg, #0d0a0c 0%, #1a0a10 100%)',
        boxShadow: '0 0 24px rgba(255,42,109,0.2)',
      }}
    >
      <p className="mb-3 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
        THE BIG BOARD
      </p>
      <p className="mb-4 text-center text-[0.65rem] tracking-widest" style={{ fontFamily: 'var(--font-main)', color: 'var(--text2)' }}>
        WALL ST. WHEEL · PAST PERFORMANCE
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {stocks.map((s) => {
          const data = s.series.map((v, i) => ({ v, i }))
          const up = s.changePct >= 0
          return (
            <div
              key={s.ticker}
              className="border-2 p-3"
              style={{
                borderColor: up ? 'var(--accent3)' : 'var(--accent2)',
                background: 'rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-baseline justify-between">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent)' }}>{s.ticker}</span>
                <span className="text-lg">{up ? '🎲' : '🃏'}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text2)' }}>{s.name}</p>
              <p className="mt-1 font-bold tabular-nums" style={{ fontFamily: 'var(--font-main)', fontSize: '1.1rem', color: up ? 'var(--accent3)' : 'var(--accent2)' }}>
                {s.currency}{s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                <span className="ml-2 text-sm">{up ? '▲' : '▼'}{Math.abs(s.changePct).toFixed(2)}%</span>
              </p>
              <div className="mt-2" style={{ height: 56 }}>
                <ResponsiveContainer width="100%" height={56} debounce={50}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={up ? 'var(--accent3)' : 'var(--accent2)'}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                    <Tooltip
                      contentStyle={{ background: '#1a1218', border: '1px solid var(--accent)', color: 'var(--text)', fontFamily: 'var(--font-main)', fontSize: 12 }}
                      formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RacingFormNews() {
  return (
    <div
      className="h-full min-h-[200px] rounded-sm border-4 p-3"
      style={{
        borderColor: '#1a5c3a',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px), linear-gradient(145deg, var(--felt) 0%, #0a1f12 100%)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
      }}
    >
      <div className="mb-3 border-b-2 border-dashed pb-2 text-center" style={{ borderColor: 'rgba(212,175,55,0.4)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>
          RACING FORM
        </p>
        <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.6rem', color: 'var(--text2)', letterSpacing: '0.3em' }}>
          LATE SCRATCHES & HEADLINES
        </p>
      </div>
      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {news.map((n) => (
          <div
            key={n.id}
            className="border-l-4 py-2 pl-3"
            style={{ borderColor: 'var(--accent)', background: 'rgba(0,0,0,0.25)' }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span style={{ fontFamily: 'var(--font-main)', fontSize: '0.6rem', color: 'var(--accent3)', letterSpacing: '0.15em' }}>
                {n.category.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.55rem', color: 'var(--text2)' }}>{n.source} · {n.time}</span>
            </div>
            <p className="mt-1 flex gap-2" style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.35 }}>
              <span>{n.emoji}</span>
              <span>{n.title}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TicketStub({ email, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(email)}
      className="relative w-full border-4 py-4 pl-5 pr-4 text-left transition-all duration-150 hover:brightness-110"
      style={{
        borderColor: active ? 'var(--accent3)' : 'var(--accent)',
        background: 'linear-gradient(90deg, #2a1810 0%, #1a1218 40%, #1f1510 100%)',
        boxShadow: active ? '0 0 20px rgba(0,255,200,0.25)' : '0 4px 0 #3d2818',
        fontFamily: 'var(--font-main)',
      }}
    >
      <div
        className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2"
        style={{ background: 'var(--bg)', borderColor: 'var(--accent)', marginLeft: -10 }}
      />
      <div
        className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2"
        style={{ background: 'var(--bg)', borderColor: 'var(--accent)', marginRight: -10 }}
      />
      <div className="flex items-start justify-between gap-2 border-b border-dashed pb-2" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{email.from.avatar}</span>
          <div>
            <p className="font-semibold tracking-wide" style={{ color: 'var(--text)', fontSize: '0.82rem' }}>
              {email.from.name.toUpperCase()}
            </p>
            <p className="text-[0.65rem] tracking-widest" style={{ color: 'var(--text2)' }}>
              {email.date} · {email.time}
            </p>
          </div>
        </div>
        {!email.read && (
          <span className="shrink-0 animate-pulse rounded px-1.5 py-0.5 text-[0.6rem] font-bold" style={{ background: 'var(--accent2)', color: '#fff' }}>
            HOT
          </span>
        )}
      </div>
      <p className="mt-2 font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color: 'var(--accent)' }}>
        {email.subject}
      </p>
      <p className="mt-1 line-clamp-2 text-[0.75rem] leading-relaxed" style={{ color: 'var(--text2)' }}>
        {email.preview}
      </p>
      <div className="mt-3 flex justify-between border-t border-dashed pt-2 text-[0.6rem] tracking-[0.2em]" style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}>
        <span>ADMIT ONE</span>
        <span>#{String(email.id).padStart(4, '0')}</span>
      </div>
    </button>
  )
}

function PokerTableModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,5,8,0.92)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border-8 p-8 shadow-2xl"
        style={{
          borderColor: 'var(--accent)',
          borderRadius: '4px',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px), radial-gradient(ellipse at center, #0d2818 0%, #061208 100%)',
          boxShadow: '0 0 60px rgba(255,215,0,0.2), inset 0 0 80px rgba(0,0,0,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="casino-mail-title"
      >
        <div className="absolute left-4 top-4 text-2xl opacity-40">♠</div>
        <div className="absolute right-4 top-4 text-2xl opacity-40">♥</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-40">♣</div>
        <div className="absolute bottom-4 right-4 text-2xl opacity-40">♦</div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 border-2 px-3 py-1 text-xs font-bold tracking-widest"
          style={{ borderColor: 'var(--accent2)', background: '#1a1218', color: 'var(--accent2)' }}
        >
          CASH OUT
        </button>
        <p className="text-center text-[0.65rem] tracking-[0.35em]" style={{ fontFamily: 'var(--font-main)', color: 'var(--accent)' }}>
          HIGH ROLLER LOUNGE
        </p>
        <h2 id="casino-mail-title" className="mt-2 text-center text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          {email.subject}
        </h2>
        <div className="mx-auto my-4 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
        <div className="flex items-center gap-3 border-b border-dashed pb-4" style={{ borderColor: 'rgba(212,175,55,0.35)' }}>
          <span className="text-4xl">{email.from.avatar}</span>
          <div>
            <p className="font-bold tracking-wide" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>{email.from.name}</p>
            <p className="text-xs" style={{ color: 'var(--text2)' }}>{email.from.email}</p>
            <p className="text-xs" style={{ color: 'var(--text2)' }}>{email.date}</p>
          </div>
        </div>
        <div className="mt-6 whitespace-pre-line text-sm leading-relaxed" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
          {email.body}
        </div>
        <p className="mt-8 text-center text-xs tracking-widest" style={{ color: 'var(--text2)' }}>
          HOUSE ALWAYS WELCOMES YOU BACK
        </p>
      </div>
    </div>
  )
}

export default function CasinoLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #2a1018 0%, var(--bg) 45%, #080406 100%)', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      <MarqueeStrip />

      <header className="flex flex-wrap items-center justify-between gap-4 border-b-4 px-4 py-5 sm:px-8" style={{ borderColor: 'var(--accent)', background: 'linear-gradient(180deg, rgba(255,215,0,0.08) 0%, transparent 100%)' }}>
        <div>
          <h1
            className="text-3xl sm:text-4xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--accent)',
              textShadow: '0 0 20px rgba(255,215,0,0.5), 2px 2px 0 #5c1a28',
              letterSpacing: '0.08em',
            }}
          >
            THE GOLDEN NUGGET
          </h1>
          <p className="mt-1 text-xs tracking-[0.25em]" style={{ color: 'var(--text2)' }}>
            INBOX · SLOTS · SPORTS BOOK
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--accent3)' }}>
            {emails.filter((e) => !e.read).length} HOT TICKETS · LADY LUCK IS CALLING
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitchPersona}
          className="border-4 px-6 py-2.5 text-sm font-bold tracking-widest transition-all hover:brightness-125"
          style={{
            borderColor: 'var(--accent2)',
            background: '#1a1218',
            color: 'var(--accent2)',
            fontFamily: 'var(--font-main)',
            boxShadow: '0 0 16px rgba(255,42,109,0.35)',
          }}
        >
          LEAVE TABLE
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <WeatherOddsBoard />
          </aside>

          <main className="lg:col-span-5">
            <p className="mb-4 text-center text-xs tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
              WINNING TICKETS
            </p>
            <div className="space-y-4">
              {emails.map((email) => (
                <TicketStub
                  key={email.id}
                  email={email}
                  active={selectedEmail?.id === email.id}
                  onClick={setSelectedEmail}
                />
              ))}
            </div>
          </main>

          <aside className="lg:col-span-4">
            <RacingFormNews />
          </aside>
        </div>

        <div className="mt-10">
          <StockBigBoard />
        </div>
      </div>

      <PokerTableModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
