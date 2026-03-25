import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const candyStroke = (pct) => (pct >= 0 ? '#ff6eb4' : '#b388ff')

function BlobBg() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="kawaii-float absolute -top-20 -left-20 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: 'var(--accent2)' }} />
      <div className="kawaii-float-delay absolute top-1/3 -right-16 h-64 w-64 rounded-full opacity-35 blur-3xl" style={{ background: 'var(--accent3)', animationDelay: '1s' }} />
      <div className="kawaii-float absolute bottom-10 left-1/4 h-56 w-56 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--accent)', animationDelay: '2s' }} />
      <div className="absolute inset-0 opacity-[0.12]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)',
        backgroundSize: '28px 28px',
      }} />
    </div>
  )
}

function WeatherPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border-4 p-6 shadow-lg"
      style={{
        borderColor: '#fff',
        background: 'linear-gradient(160deg, #fff 0%, #ffe8f4 45%, #e8f7ff 100%)',
        boxShadow: '0 12px 0 #ffcce0, 0 16px 32px rgba(255,110,180,0.25)',
      }}
    >
      <div className="absolute right-3 top-3 text-2xl opacity-80">✨</div>
      <div className="absolute left-4 top-4 h-3 w-3 rounded-full" style={{ background: 'var(--accent4)' }} />
      <div className="absolute bottom-6 left-6 h-2 w-2 rounded-full" style={{ background: 'var(--accent3)' }} />
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>おてんき · WEATHER</p>
      <div className="mt-2 flex items-center gap-4">
        <span className="text-5xl drop-shadow-sm">{weather.icon}</span>
        <div>
          <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
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
      <div className="mt-4 flex flex-wrap gap-2">
        {weather.forecast.map((d) => (
          <div
            key={d.day}
            className="rounded-2xl border-2 px-3 py-2 text-center"
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
      className="rounded-[1.5rem] border-4 p-3 shadow-md"
      style={{
        borderColor: '#fff',
        background: happy ? 'linear-gradient(180deg, #fff 0%, #fff0f8 100%)' : 'linear-gradient(180deg, #fff 0%, #f3ecff 100%)',
        boxShadow: '0 6px 0 #e8d5ff',
      }}
    >
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text)' }}>{s.ticker}</span>
        <span className="text-xl">{happy ? '😊' : '😢'}</span>
      </div>
      <p style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>{s.name}</p>
      <p className="mt-1 font-bold" style={{ fontFamily: 'var(--font-main)', color: happy ? 'var(--accent)' : 'var(--accent2)' }}>
        {s.currency}{s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
              isAnimationActive={false}
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

function NewsBubble({ item }) {
  return (
    <div
      className="mb-3 rounded-[1.75rem] border-4 px-4 py-3 shadow-md transition-transform duration-200 hover:scale-[1.02]"
      style={{
        borderColor: '#fff',
        background: 'linear-gradient(90deg, #fff8fc 0%, #f0fff8 100%)',
        boxShadow: '0 4px 0 var(--border)',
      }}
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase" style={{ background: 'var(--accent4)', color: 'var(--text)' }}>
          {item.category}
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>{item.source} · {item.time} · kyaa~</span>
      </div>
      <p className="flex gap-2" style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.45 }}>
        <span>{item.emoji}</span>
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
      className="kawaii-stamp relative w-full rounded-[1.75rem] border-[6px] p-4 text-left shadow-lg transition-shadow duration-200 hover:shadow-2xl"
      style={{
        borderColor: '#fff',
        background: email.read ? 'linear-gradient(145deg, #ffffff 0%, #fff5fb 100%)' : 'linear-gradient(145deg, #ffffff 0%, #fff0f8 55%, #f5f0ff 100%)',
        transform: `rotate(${tilt}deg)`,
        boxShadow: email.read ? '0 8px 0 #e8d5ff' : '0 8px 0 var(--accent), 0 0 24px rgba(255,110,180,0.35)',
        ['--email-tilt']: `${tilt}deg`,
      }}
    >
      <span className="absolute -right-1 -top-1 text-lg">✨</span>
      <span className="absolute bottom-2 right-3 text-sm opacity-60">{email.read ? '💌' : '💕'}</span>
      <div className="flex items-start gap-3">
        <span className="text-3xl drop-shadow-sm">{email.from.avatar}</span>
        <div className="min-w-0 flex-1">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text)', fontWeight: email.read ? 400 : 700 }}>
            {email.from.name}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{email.date} · {email.time}</p>
          <p className="mt-2" style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text)' }}>
            {email.subject}
          </p>
          <p className="mt-1 line-clamp-2" style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5 }}>
            {email.preview}
          </p>
          {!email.read && (
            <span
              className="mt-2 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-bold"
              style={{ background: 'var(--accent)', color: '#fff' }}
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
      style={{ background: 'rgba(255, 182, 220, 0.45)', backdropFilter: 'blur(8px)' }}
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
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border-4 text-xl shadow-md transition-transform hover:scale-110"
          style={{ borderColor: '#fff', background: 'linear-gradient(135deg, #ff6eb4, #ffb6e0)', color: '#fff' }}
          aria-label="Close"
        >
          💖
        </button>
        <p className="text-center text-sm" style={{ color: 'var(--accent2)' }}>
          メール · love letter~
        </p>
        <h2 id="kawaii-mail-title" className="mt-2 text-center text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          {email.subject}
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2 text-2xl">🌸 ✨ 🌸</div>
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

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      <BlobBg />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8">
        <div>
          <p className="text-sm tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
            ✨ メールボックス ✨
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
            Kawaii Inbox~
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>
            {emails.filter((e) => !e.read).length} new messages · かわいいね!
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitchPersona}
          className="rounded-full border-4 px-5 py-2.5 text-sm font-bold shadow-md transition-all hover:scale-105"
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <WeatherPanel />
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
                <span>💰</span> お金チャート · money charts~
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stocks.map((s) => (
                  <StockCandyCard key={s.ticker} s={s} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                <span>📰</span> おしらせ · fluffy news~
              </p>
              {news.map((n) => (
                <NewsBubble key={n.id} item={n} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              <span>💌</span> メールたち · stamp collection~
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
      </div>

      <KawaiiModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
