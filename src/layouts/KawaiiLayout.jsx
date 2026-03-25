import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const candyStroke = (pct) => (pct >= 0 ? '#ff6eb4' : '#b388ff')

const SPARKLES = [
  { top: '8%', left: '6%', delay: '0s', dur: '3.2s' },
  { top: '22%', left: '88%', delay: '0.6s', dur: '4.1s' },
  { top: '45%', left: '4%', delay: '1.2s', dur: '3.6s' },
  { top: '12%', left: '42%', delay: '0.3s', dur: '4.4s' },
  { top: '68%', left: '92%', delay: '1.8s', dur: '3.9s' },
  { top: '78%', left: '18%', delay: '0.9s', dur: '4s' },
  { top: '34%', left: '72%', delay: '2.1s', dur: '3.5s' },
]

const HEARTS = [
  { left: '5%', delay: '0s', scale: 0.9 },
  { left: '18%', delay: '4s', scale: 1.1 },
  { left: '33%', delay: '2s', scale: 0.75 },
  { left: '52%', delay: '7s', scale: 1 },
  { left: '71%', delay: '1s', scale: 0.85 },
  { left: '88%', delay: '5.5s', scale: 1.05 },
]

const STARS = [
  { top: '6%', left: '25%', d: '0s' },
  { top: '14%', left: '78%', d: '0.4s' },
  { top: '28%', left: '55%', d: '0.8s' },
  { top: '52%', left: '12%', d: '1.2s' },
  { top: '62%', left: '65%', d: '0.2s' },
  { top: '88%', left: '48%', d: '1.6s' },
]

function FloatingDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {SPARKLES.map((s, i) => (
        <span
          key={`sp-${i}`}
          className="kawaii-sparkle-drift absolute text-lg opacity-80"
          style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: s.dur }}
        >
          ✨
        </span>
      ))}
      {HEARTS.map((h, i) => (
        <span
          key={`h-${i}`}
          className="kawaii-heart-rise absolute bottom-0 text-2xl text-pink-400/70"
          style={{ left: h.left, animationDelay: h.delay }}
        >
          <span className="inline-block" style={{ transform: `scale(${h.scale})` }}>
            ♡
          </span>
        </span>
      ))}
      {STARS.map((st, i) => (
        <span
          key={`st-${i}`}
          className="kawaii-twinkle absolute text-sm text-yellow-300/90"
          style={{ top: st.top, left: st.left, animationDelay: st.d }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function Cloud({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="40" cy="32" rx="28" ry="14" fill="white" fillOpacity="0.85" />
      <ellipse cx="62" cy="28" rx="32" ry="18" fill="white" fillOpacity="0.9" />
      <ellipse cx="88" cy="32" rx="24" ry="12" fill="white" fillOpacity="0.82" />
    </svg>
  )
}

function MascotBlob() {
  return (
    <div
      className="kawaii-mascot-bob pointer-events-none fixed bottom-6 right-4 z-[5] hidden w-24 sm:block md:w-28"
      aria-hidden
    >
      <svg viewBox="0 0 120 130" className="drop-shadow-[0_8px_24px_rgba(255,110,180,0.45)]">
        <defs>
          <linearGradient id="kb-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb8e0" />
            <stop offset="50%" stopColor="#e8b4ff" />
            <stop offset="100%" stopColor="#a8e8ff" />
          </linearGradient>
        </defs>
        <path
          d="M60 8c-28 0-48 22-44 48 2 14 8 26 18 34-4 8-6 18-4 28 2 10 12 16 22 14 10-2 16-12 14-22l-2-8c8 4 18 6 28 4 22-4 38-26 34-50-4-20-22-36-44-38-6-1-12-1-18 0z"
          fill="url(#kb-body)"
          stroke="#fff"
          strokeWidth="3"
        />
        <ellipse cx="42" cy="52" rx="10" ry="12" fill="#fff" />
        <ellipse cx="78" cy="52" rx="10" ry="12" fill="#fff" />
        <ellipse cx="44" cy="54" rx="5" ry="7" fill="#5c3d62" />
        <ellipse cx="80" cy="54" rx="5" ry="7" fill="#5c3d62" />
        <ellipse cx="46" cy="52" rx="2" ry="2.5" fill="#fff" />
        <ellipse cx="82" cy="52" rx="2" ry="2.5" fill="#fff" />
        <path
          d="M48 78q12 14 24 0"
          stroke="#ff6eb4"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="95" cy="28" r="6" fill="#fff59d" opacity="0.95" />
      </svg>
      <p
        className="-mt-1 text-center text-[10px] font-bold tracking-wide"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}
      >
        きゃ〜!
      </p>
    </div>
  )
}

function BrowserChrome({ children }) {
  return (
    <div
      className="relative z-10 mx-auto max-w-6xl px-3 pb-20 pt-4 sm:px-5 sm:pt-6"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(179, 136, 255, 0.18))' }}
    >
      <div
        className="overflow-hidden rounded-[1.75rem] border-4 sm:rounded-[2rem]"
        style={{
          borderColor: '#fff',
          background: 'linear-gradient(180deg, #fff8fd 0%, #f0fbff 50%, #fff5fb 100%)',
          boxShadow:
            '0 0 0 4px color-mix(in srgb, var(--accent) 35%, transparent), 0 24px 60px rgba(255, 110, 180, 0.22)',
        }}
      >
        <div
          className="flex items-center gap-2 border-b-4 px-4 py-3 sm:px-5"
          style={{
            borderColor: '#fff',
            background: 'linear-gradient(90deg, #ffe8f4 0%, #e8f4ff 50%, #fff5e6 100%)',
          }}
        >
          <div className="flex gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff6b8a]" />
            <span className="size-3 rounded-full bg-[#ffd93d]" />
            <span className="size-3 rounded-full bg-[#6bcb77]" />
          </div>
          <div
            className="btn btn-sm pointer-events-none min-h-8 flex-1 gap-2 border-0 text-xs normal-case sm:min-h-9 sm:text-sm"
            style={{
              fontFamily: 'var(--font-main)',
              background: '#fff',
              color: 'var(--text2)',
              boxShadow: 'inset 0 2px 8px rgba(255, 110, 180, 0.08)',
            }}
          >
            <span className="opacity-60">🔒</span>
            <span className="kawaii-rainbow-text truncate font-semibold">kawaii://super.cute/inbox~</span>
          </div>
          <span className="text-lg opacity-80" aria-hidden>
            🎀
          </span>
        </div>
        <div className="relative px-3 py-6 sm:px-6 sm:py-8 md:px-10">{children}</div>
      </div>
    </div>
  )
}

function WeatherPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border-4 p-5 shadow-lg sm:p-6"
      style={{
        borderColor: '#fff',
        background: 'linear-gradient(160deg, #fff 0%, #ffe8f4 45%, #e8f7ff 100%)',
        boxShadow: '0 12px 0 #ffcce0, 0 16px 32px rgba(255,110,180,0.25)',
      }}
    >
      <Cloud
        className="kawaii-cloud-drift pointer-events-none absolute -right-4 top-2 w-28 opacity-70"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute right-3 top-3 text-2xl">✨</div>
      <div className="absolute left-4 top-4 h-3 w-3 rounded-full" style={{ background: 'var(--accent4)' }} />
      <div className="absolute bottom-6 left-6 h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--accent3)' }} />
      <p
        className="relative z-[1]"
        style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em' }}
      >
        おてんき · WEATHER
      </p>
      <div className="relative z-[1] mt-2 flex items-center gap-4">
        <span className="relative text-6xl drop-shadow-sm sm:text-7xl">
          <span className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ background: 'var(--accent4)' }} />
          {weather.icon}
        </span>
        <div>
          <p className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
            {weather.temp}°C
          </p>
          <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', color: 'var(--text2)' }}>
            {weather.city} · {weather.condition}~
          </p>
          <p className="mt-1" style={{ fontFamily: 'var(--font-main)', fontSize: '0.9rem', color: 'var(--accent2)' }}>
            (◕‿◕) so nice today!
          </p>
        </div>
      </div>
      <div className="relative z-[1] mt-4 flex flex-wrap gap-2">
        {weather.forecast.map((d) => (
          <div
            key={d.day}
            className="rounded-2xl border-2 px-3 py-2 text-center transition-transform duration-200 hover:scale-105"
            style={{ borderColor: 'var(--border)', background: '#fff' }}
          >
            <div style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>{d.day}</div>
            <div className="text-lg">{d.icon}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text)' }}>{d.high}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockCandyCard({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const happy = s.changePct >= 0
  return (
    <div
      className="rounded-[1.5rem] border-4 p-3 shadow-md transition-transform duration-200 hover:-translate-y-1"
      style={{
        borderColor: '#fff',
        background: happy ? 'linear-gradient(180deg, #fff 0%, #fff0f8 100%)' : 'linear-gradient(180deg, #fff 0%, #f3ecff 100%)',
        boxShadow: happy ? '0 6px 0 #ffcce0' : '0 6px 0 #e8d5ff',
      }}
    >
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text)' }}>{s.ticker}</span>
        <span className="text-xl">{happy ? '😊' : '😢'}</span>
      </div>
      <p style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>{s.name}</p>
      <p className="mt-1 font-bold" style={{ fontFamily: 'var(--font-main)', color: happy ? 'var(--accent)' : 'var(--accent2)' }}>
        {s.currency}
        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <span className="ml-1 text-sm">
          {happy ? '▲' : '▼'}
          {Math.abs(s.changePct).toFixed(2)}%
        </span>
      </p>
      <div className="mt-2" style={{ height: 52 }}>
        <ResponsiveContainer width="100%" height={52} debounce={50}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={candyStroke(s.changePct)}
              strokeWidth={3}
              dot={false}
              isAnimationActive
              animationDuration={900}
            />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{ borderRadius: 12, border: '2px solid #ffcce0', fontFamily: 'var(--font-main)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function NewsBubble({ item, index }) {
  return (
    <div
      className="mb-3 rounded-[1.75rem] border-4 px-4 py-3 shadow-md transition-transform duration-200 hover:scale-[1.02]"
      style={{
        borderColor: '#fff',
        background: 'linear-gradient(90deg, #fff8fc 0%, #f0fff8 100%)',
        boxShadow: '0 4px 0 var(--border)',
        animation: `fadeIn 0.5s ease ${index * 0.08}s both`,
      }}
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="badge badge-sm border-0 font-bold uppercase" style={{ background: 'var(--accent4)', color: 'var(--text)' }}>
          {item.category}
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>
          {item.source} · {item.time} · kyaa~
        </span>
      </div>
      <p className="flex gap-2" style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.45 }}>
        <span className="text-lg">{item.emoji}</span>
        <span>{item.title}</span>
      </p>
    </div>
  )
}

function EmailStamp({ email, onClick }) {
  const tilt = ((email.id % 5) - 2) * 1.5
  return (
    <button
      type="button"
      onClick={() => onClick(email)}
      className="kawaii-stamp group relative w-full rounded-[1.75rem] border-[6px] p-4 text-left shadow-lg transition-shadow duration-200 hover:shadow-2xl"
      style={{
        borderColor: '#fff',
        background: email.read ? 'linear-gradient(145deg, #ffffff 0%, #fff5fb 100%)' : 'linear-gradient(145deg, #ffffff 0%, #fff0f8 55%, #f5f0ff 100%)',
        transform: `rotate(${tilt}deg)`,
        boxShadow: email.read ? '0 8px 0 #e8d5ff' : '0 8px 0 var(--accent), 0 0 24px rgba(255,110,180,0.35)',
        '--email-tilt': `${tilt}deg`,
      }}
    >
      <span className="absolute -right-1 -top-1 text-lg transition-transform group-hover:scale-125">✨</span>
      <span className="absolute bottom-2 right-3 text-sm opacity-60">{email.read ? '💌' : '💕'}</span>
      <div className="flex items-start gap-3">
        <span className="text-3xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{email.from.avatar}</span>
        <div className="min-w-0 flex-1">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text)', fontWeight: email.read ? 400 : 700 }}>
            {email.from.name}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>
            {email.date} · {email.time}
          </p>
          <p className="mt-2" style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text)' }}>
            {email.subject}
          </p>
          <p className="mt-1 line-clamp-2" style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5 }}>
            {email.preview}
          </p>
          {!email.read && (
            <span
              className="badge badge-sm mt-2 border-0 font-bold text-white"
              style={{ background: 'var(--accent)' }}
            >
              NEW · きゃあ!
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function KawaiiModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="kawaii-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(255, 182, 220, 0.5)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="kawaii-modal-inner relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border-[6px] p-8 shadow-2xl"
        style={{
          borderColor: '#fff',
          background: 'linear-gradient(180deg, #ffffff 0%, #fff5fb 50%, #f8f0ff 100%)',
          boxShadow: '0 20px 60px rgba(179, 136, 255, 0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kawaii-mail-title"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--accent) 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div
          className="absolute -left-2 top-8 h-0 w-0 border-y-[14px] border-r-[18px] border-y-transparent"
          style={{ borderRightColor: 'var(--accent2)' }}
        />
        <div
          className="absolute -right-2 top-8 h-0 w-0 border-y-[14px] border-l-[18px] border-y-transparent"
          style={{ borderLeftColor: 'var(--accent3)' }}
        />
        <button
          type="button"
          onClick={onClose}
          className="btn btn-circle btn-sm absolute right-3 top-3 border-4 text-lg shadow-md sm:btn-md"
          style={{ borderColor: '#fff', background: 'linear-gradient(135deg, #ff6eb4, #ffb6e0)', color: '#fff' }}
          aria-label="Close"
        >
          💖
        </button>
        <p className="text-center text-sm" style={{ color: 'var(--accent2)' }}>
          メール · love letter~
        </p>
        <h2 id="kawaii-mail-title" className="mt-2 text-center text-xl font-bold sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          {email.subject}
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2 text-2xl">
          <span className="kawaii-sparkle-drift inline-block">🌸</span>
          <span>✨</span>
          <span className="kawaii-sparkle-drift inline-block" style={{ animationDelay: '0.5s' }}>
            🌸
          </span>
        </div>
        <div className="relative z-10 mt-6 flex items-center gap-3 border-b-2 pb-4" style={{ borderColor: 'var(--border)' }}>
          <span className="text-4xl">{email.from.avatar}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{email.from.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{email.from.email}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>{email.date}</p>
          </div>
        </div>
        <div className="relative z-10 mt-6 whitespace-pre-line" style={{ fontFamily: 'var(--font-main)', fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--text)' }}>
          {email.body}
        </div>
        <p className="relative z-10 mt-8 text-center text-2xl">♡ ♡ ♡</p>
      </div>
    </div>
  )
}

export default function KawaiiLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: `
          radial-gradient(ellipse 100% 80% at 50% -20%, rgba(255, 182, 220, 0.45), transparent 50%),
          radial-gradient(ellipse 60% 50% at 100% 50%, rgba(179, 136, 255, 0.2), transparent 45%),
          radial-gradient(ellipse 50% 40% at 0% 80%, rgba(127, 219, 218, 0.25), transparent 40%),
          linear-gradient(180deg, var(--bg2) 0%, var(--bg) 55%, #fff8fc 100%)
        `,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--accent) 1.5px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <FloatingDecor />
      <Cloud className="kawaii-cloud-drift pointer-events-none fixed left-[-20px] top-24 z-[1] w-36 opacity-60 sm:w-44" />
      <Cloud
        className="kawaii-cloud-drift pointer-events-none fixed right-[-30px] top-40 z-[1] w-40 opacity-50 sm:w-48"
        style={{ animationDelay: '3s' }}
      />
      <MascotBlob />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-8 sm:py-7">
        <div>
          <p className="text-xs font-bold tracking-[0.35em] sm:text-sm" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
            ✧ THE WHOLE WEB ✧
          </p>
          <h1 className="kawaii-rainbow-text mt-1 text-3xl font-extrabold sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            is kawaii now~
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
            <span className="badge badge-outline badge-sm gap-1 border-2" style={{ borderColor: 'var(--border)' }}>
              💌 {unread} new
            </span>
            <span>your inbox turned into stickers · かわいいね!</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitchPersona}
          className="btn rounded-full border-4 font-bold shadow-lg transition-transform hover:scale-105"
          style={{
            borderColor: '#fff',
            background: 'linear-gradient(90deg, var(--accent3), var(--accent2))',
            color: '#fff',
            fontFamily: 'var(--font-display)',
          }}
        >
          チェンジ visitor ♪
        </button>
      </header>

      <BrowserChrome>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <WeatherPanel />
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                <span className="text-lg">💰</span> お金チャート · money charts~
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stocks.map((s) => (
                  <StockCandyCard key={s.ticker} s={s} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                <span className="text-lg">📰</span> おしらせ · fluffy news~
              </p>
              {news.map((n, i) => (
                <NewsBubble key={n.id} item={n} index={i} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              <span className="text-lg">💌</span> メールたち · stamp collection~
            </p>
            <div className="columns-1 gap-5 sm:columns-2">
              {emails.map((email) => (
                <div key={email.id} className="mb-5 break-inside-avoid">
                  <EmailStamp email={email} onClick={setSelectedEmail} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserChrome>

      <KawaiiModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
