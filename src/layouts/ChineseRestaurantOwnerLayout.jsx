import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function sparkStroke(pct) {
  return pct >= 0 ? 'var(--accent3)' : 'var(--accent)'
}

function NewsMarquee() {
  const line = news.map((n) => `${n.emoji} ${n.title}`).join('   ·   ')
  return (
    <div className="cno-marquee-wrap border-y border-red-900/60 bg-black/70 py-2" style={{ fontFamily: 'var(--font-main)' }}>
      <div className="cno-marquee-track flex gap-20 whitespace-nowrap text-sm text-amber-100/95">
        <span>{line}   ·   </span>
        <span aria-hidden>{line}   ·   </span>
      </div>
    </div>
  )
}

function WeatherWindow() {
  return (
    <div
      className="relative overflow-hidden rounded-lg border-4 border-amber-900/80 p-4 shadow-[inset_0_0_0_2px_rgba(251,191,36,0.15)]"
      style={{
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        boxShadow: '0 0 24px rgba(251, 191, 36, 0.12)',
      }}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" aria-hidden />
      <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.35em] text-amber-400/90" style={{ fontFamily: 'var(--font-ui)' }}>
        窗外天气 · Sidewalk board
      </p>
      <div className="mt-3 flex items-center gap-4">
        <span className="cno-weather-bob text-5xl drop-shadow-lg">{weather.icon}</span>
        <div>
          <p className="text-3xl font-bold leading-none text-amber-50">{weather.temp}°</p>
          <p className="text-sm text-slate-300">{weather.condition}</p>
          <p className="mt-1 text-xs text-slate-500">
            {weather.city} · 风 {weather.wind} km/h · 湿度 {weather.humidity}%
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {weather.forecast.map((d) => (
          <div
            key={d.day}
            className="flex flex-1 min-w-[3.25rem] flex-col items-center rounded border border-slate-700 bg-slate-900/80 py-1.5"
          >
            <span className="text-[0.6rem] text-slate-500">{d.day}</span>
            <span className="text-lg leading-none">{d.icon}</span>
            <span className="text-[0.65rem] text-amber-200/90">{d.high}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockTile({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div
      className="rounded border-2 border-slate-800 bg-slate-950/90 p-2 shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
      style={{ borderColor: up ? 'rgba(34,197,94,0.35)' : 'rgba(255,45,45,0.35)' }}
    >
      <div className="flex items-start justify-between gap-1">
        <div>
          <p className="font-bold tracking-wide text-amber-100" style={{ fontFamily: 'var(--font-ui)' }}>
            {s.ticker}
          </p>
          <p className="text-[0.6rem] leading-tight text-slate-500 line-clamp-1">{s.name}</p>
        </div>
        <span className="text-lg">{up ? '📈' : '📉'}</span>
      </div>
      <p className={`mt-1 font-mono text-sm font-bold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
        {s.currency}
        {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <span className="ml-1 text-xs opacity-90">
          {up ? '↑' : '↓'}
          {Math.abs(s.changePct).toFixed(2)}%
        </span>
      </p>
      <div className="mt-1 h-10 w-full opacity-90">
        <ResponsiveContainer width="100%" height={40} debounce={50}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={sparkStroke(s.changePct)} strokeWidth={1.5} dot={false} isAnimationActive={false} />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 6,
                fontSize: 11,
                color: '#fefce8',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function MenuItem({ email, onPick }) {
  const unread = !email.read
  const yuan = (8 + (email.id % 7) * 6).toFixed(0)
  return (
    <button
      type="button"
      onClick={() => onPick(email)}
      className="w-full border-b border-red-950/50 py-3 pl-2 pr-3 text-left transition-colors hover:bg-red-950/25"
    >
      <div className="flex gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded border-2 border-amber-700/50 bg-amber-950/40 text-lg"
          aria-hidden
        >
          {email.from.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
            <span className="text-amber-600/90" style={{ fontFamily: 'var(--font-ui)' }}>
              No.{email.id}
            </span>
            {unread && (
              <span className="badge badge-error badge-xs border-0 bg-red-600 text-[0.6rem] text-white">新单</span>
            )}
            <span className="ml-auto font-mono text-amber-200/80">¥{yuan}</span>
          </div>
          <p
            className={`mt-0.5 line-clamp-2 text-sm leading-snug ${unread ? 'font-semibold text-amber-50' : 'text-slate-300'}`}
            style={{ fontFamily: 'var(--font-main)' }}
          >
            {email.subject}
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{email.preview}</p>
        </div>
      </div>
    </button>
  )
}

function ReceiptModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(7, 9, 15, 0.88)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="cno-receipt relative max-h-[88vh] w-full max-w-md overflow-y-auto border-2 border-dashed border-slate-600 bg-[#faf6ef] p-6 text-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cno-receipt-title"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-8 opacity-40"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 6px, #cbd5e1 6px, #cbd5e1 7px)',
          }}
          aria-hidden
        />
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-slate-400 text-slate-600"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-red-800/80">金龍軒 · 留言条</p>
        <h2 id="cno-receipt-title" className="mt-2 text-center text-2xl font-bold text-red-950" style={{ fontFamily: 'var(--font-display)' }}>
          {email.subject}
        </h2>
        <p className="mt-1 text-center text-sm text-slate-600">
          {email.from.name} · {email.date} {email.time}
        </p>
        <div className="my-4 border-t-2 border-dotted border-slate-400" />
        <div className="space-y-3 whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-800">
          {email.body}
        </div>
        <div className="my-5 border-t-2 border-dotted border-slate-400" />
        <p className="text-center text-xs text-slate-500">谢谢惠顾 · Thank you · 欢迎再来</p>
        <div className="mt-4 flex justify-center gap-2 text-2xl opacity-70" aria-hidden>
          🥢🍚🥢
        </div>
      </div>
    </div>
  )
}

export default function ChineseRestaurantOwnerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unreadCount = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden pb-10"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: 'radial-gradient(ellipse 120% 80% at 50% -20%, #3f1d1d 0%, var(--bg) 45%, #020617 100%)',
      }}
    >
      <div className="pointer-events-none fixed inset-0 opacity-[0.12]" aria-hidden style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="pointer-events-none absolute left-[4%] top-24 text-5xl cno-lantern opacity-90" aria-hidden>
        🏮
      </div>
      <div className="pointer-events-none absolute right-[5%] top-32 text-5xl cno-lantern-delay opacity-90" aria-hidden>
        🏮
      </div>

      <header className="relative z-10 px-4 pb-2 pt-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-red-400/80" style={{ fontFamily: 'var(--font-ui)' }}>
              Open late · 外卖 OK
            </p>
            <h1
              className="cno-neon-title mt-1 text-4xl leading-none text-amber-100 sm:text-6xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              金龍軒
            </h1>
            <p className="mt-1 text-lg text-amber-200/90 tracking-[0.2em]" style={{ fontFamily: 'var(--font-ui)' }}>
              GOLDEN WOK · 老板台面
            </p>
            <p className="mt-2 max-w-md text-xs text-slate-500">
              {unreadCount} 条新留言 · 同一套邮箱，换一副夜市脾气
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="cno-steam relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-700/40 bg-red-950/50 text-3xl">
              🥡
              <span className="cno-steam-wisp absolute bottom-full" style={{ left: '38%' }} aria-hidden />
              <span className="cno-steam-wisp cno-steam-wisp-2 absolute bottom-full" style={{ left: '62%' }} aria-hidden />
            </div>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn border-amber-600/50 bg-amber-500/90 text-stone-900 hover:bg-amber-400"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              打烊收摊
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mt-2">
        <NewsMarquee />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div
              className="overflow-hidden rounded-lg border-4 border-amber-800/70 shadow-[0_0_40px_rgba(220,38,38,0.12)]"
              style={{
                background: 'linear-gradient(180deg, #1c1410 0%, #0c0a09 55%, #090706 100%)',
                boxShadow: 'inset 0 1px 0 rgba(251,191,36,0.08), 0 12px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="border-b-4 border-red-900/80 px-4 py-3 sm:px-6"
                style={{ background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 45%, #7f1d1d 100%)' }}
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-amber-200/90">Wall menu · 墙上的单</p>
                <p className="text-sm text-amber-50/95">点一条「菜名」打开完整留言 — 价格乱写的，别当真</p>
              </div>
              <div className="px-2 sm:px-4">
                {emails.map((email) => (
                  <MenuItem key={email.id} email={email} onPick={setSelectedEmail} />
                ))}
              </div>
              <div className="border-t border-red-950/60 px-4 py-3 text-center text-[0.65rem] text-slate-500">
                本店支持想象辣度 · Extra spicy in your dreams only
              </div>
            </div>
          </section>

          <aside className="space-y-4 lg:col-span-4">
            <WeatherWindow />
            <div>
              <p className="mb-2 text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-amber-500/90" style={{ fontFamily: 'var(--font-ui)' }}>
                隔壁股市 · Side-dish tickers
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                {stocks.map((s) => (
                  <StockTile key={s.ticker} s={s} />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
              <p className="mb-3 text-center text-[0.65rem] font-bold uppercase tracking-widest text-red-400/90">电视摘要 · Headlines</p>
              <ul className="space-y-3">
                {news.map((n) => (
                  <li key={n.id} className="flex gap-2 border-l-2 border-amber-700/50 pl-3 text-sm leading-snug text-slate-300">
                    <span className="shrink-0">{n.emoji}</span>
                    <span>
                      <span className="text-xs uppercase text-red-400/80">{n.category}</span>
                      <br />
                      {n.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <ReceiptModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
