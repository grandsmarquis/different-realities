import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const chartColor = (pct) => (pct >= 0 ? 'var(--accent2)' : 'var(--accent)')

function Starfield() {
  const stars = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + (i % 7) * 13) % 100}%`,
    top: `${(i * 23 + (i % 5) * 11) % 100}%`,
    size: 1 + (i % 3),
    delay: `${(i % 10) * 0.4}s`,
    dur: `${3 + (i % 5)}s`,
  }))
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-90" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="otaku-star absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            ['--otaku-dur']: s.dur,
            ['--otaku-delay']: s.delay,
          }}
        />
      ))}
      <div
        className="otaku-nebula absolute -left-1/4 top-1/4 h-[60vh] w-[70vw] rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #ff2a6d 0%, transparent 65%)' }}
      />
      <div
        className="otaku-nebula-delay absolute -right-1/4 bottom-0 h-[50vh] w-[60vw] rounded-full opacity-35 blur-[90px]"
        style={{ background: 'radial-gradient(circle, #05d9e8 0%, transparent 60%)' }}
      />
    </div>
  )
}

function CelPanel({ children, titleEn, titleJp, accent = 'var(--accent2)', icon }) {
  return (
    <section
      className="otaku-cel relative overflow-hidden rounded-sm border-4 p-4 shadow-[6px_6px_0_#000]"
      style={{
        borderColor: accent,
        background: 'linear-gradient(165deg, var(--card) 0%, #12082a 100%)',
        boxShadow: `6px 6px 0 #000, 0 0 24px ${accent}33`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(105deg, transparent 40%, #fff 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />
      <header className="relative z-[1] mb-3 flex flex-wrap items-end justify-between gap-2 border-b-4 border-black pb-2" style={{ borderColor: accent }}>
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em]" style={{ color: accent, fontFamily: 'var(--font-main)' }}>
            {titleEn}
          </p>
          <p className="text-sm leading-tight" style={{ fontFamily: 'var(--font-jp)', color: 'var(--text)' }}>
            {titleJp}
          </p>
        </div>
        {icon && <span className="otaku-icon-bounce text-2xl">{icon}</span>}
      </header>
      <div className="relative z-[1]">{children}</div>
    </section>
  )
}

function WeatherBlock() {
  return (
    <CelPanel titleEn="ATMOSPHERE CHANNEL" titleJp="天気 · 今日の空気感" accent="var(--accent3)" icon="🌤️">
      <div className="flex flex-wrap items-center gap-4">
        <span className="otaku-weather-spin text-6xl drop-shadow-[0_0_12px_rgba(255,230,0,0.6)]">{weather.icon}</span>
        <div>
          <p className="text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)', textShadow: '3px 3px 0 #000' }}>
            {weather.temp}°C
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>
            {weather.city} · {weather.condition}
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: 'var(--accent2)' }}>
            OP quality skies · no spoilers
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {weather.forecast.map((d) => (
          <div
            key={d.day}
            className="flex min-w-[4.5rem] flex-col items-center border-2 border-black px-2 py-2"
            style={{ background: '#0a0518', borderColor: 'var(--accent2)' }}
          >
            <span className="text-[0.6rem]" style={{ color: 'var(--text2)' }}>{d.day}</span>
            <span className="text-xl">{d.icon}</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{d.high}°</span>
          </div>
        ))}
      </div>
    </CelPanel>
  )
}

function StockPowerCard({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div
      className="otaku-stock-tilt relative overflow-hidden border-4 border-black p-3"
      style={{
        background: up
          ? 'linear-gradient(145deg, #0c1a22 0%, #062a1a 100%)'
          : 'linear-gradient(145deg, #1a0c18 0%, #2a0610 100%)',
        boxShadow: `4px 4px 0 ${up ? 'var(--accent2)' : 'var(--accent)'}`,
      }}
    >
      <div className="absolute right-1 top-1 text-lg opacity-80">{up ? '▲' : '▼'}</div>
      <p className="font-bold tracking-wider" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent3)', fontSize: '0.95rem' }}>
        {s.ticker}
      </p>
      <p className="text-[0.6rem]" style={{ color: 'var(--text2)' }}>{s.name}</p>
      <p className="mt-1 text-lg font-bold" style={{ fontFamily: 'var(--font-main)', color: up ? 'var(--accent2)' : 'var(--accent)' }}>
        {s.currency}{s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <span className="ml-1 text-sm">{Math.abs(s.changePct).toFixed(2)}%</span>
      </p>
      <div className="mt-2 h-[48px] w-full">
        <ResponsiveContainer width="100%" height={48} debounce={50}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={chartColor(s.changePct)} strokeWidth={2} dot={false} isAnimationActive={false} />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                background: '#0f0220',
                border: '2px solid var(--accent2)',
                fontFamily: 'var(--font-main)',
                color: 'var(--text)',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: 'var(--text2)' }}>
        power level chart
      </p>
    </div>
  )
}

function NewsFlash({ item }) {
  return (
    <article
      className="otaku-news relative mb-3 border-l-8 pl-3 pr-2 py-2"
      style={{
        borderColor: 'var(--accent3)',
        background: 'linear-gradient(90deg, rgba(255,230,0,0.12) 0%, transparent 100%)',
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="otaku-breaking inline-block skew-x-[-8deg] px-2 py-0.5 text-[0.6rem] font-black uppercase"
          style={{ background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-display)' }}
        >
          NEWS FLASH
        </span>
        <span className="text-[0.6rem]" style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>
          {item.source} · {item.time}
        </span>
      </div>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--accent2)' }}>
        {item.category}
      </p>
      <p className="mt-1 flex gap-2 text-sm leading-snug" style={{ color: 'var(--text)', fontFamily: 'var(--font-main)' }}>
        <span>{item.emoji}</span>
        <span>{item.title}</span>
      </p>
    </article>
  )
}

function EpisodeMail({ email, onOpen }) {
  const ep = String(email.id).padStart(2, '0')
  return (
    <button
      type="button"
      onClick={() => onOpen(email)}
      className="otaku-mail-card group relative w-full border-4 border-black p-4 text-left transition-transform duration-200 hover:z-10 hover:scale-[1.02]"
      style={{
        background: email.read
          ? 'linear-gradient(160deg, #1a0f2e 0%, #0d0820 100%)'
          : 'linear-gradient(160deg, #2a1245 0%, #12082a 100%)',
        boxShadow: email.read ? '5px 5px 0 #333' : '5px 5px 0 var(--accent), 0 0 20px rgba(255,42,109,0.35)',
      }}
    >
      <div
        className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center border-2 border-black text-xs font-black"
        style={{ background: 'var(--accent3)', color: '#000', fontFamily: 'var(--font-display)' }}
      >
        {ep}
      </div>
      {!email.read && (
        <span className="otaku-rec-dot absolute right-3 top-3 flex items-center gap-1 text-[0.55rem] font-bold uppercase" style={{ color: 'var(--accent)' }}>
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          new tape
        </span>
      )}
      <div className="mt-4 flex gap-3">
        <span className="text-4xl drop-shadow-[2px_2px_0_#000]">{email.from.avatar}</span>
        <div className="min-w-0 flex-1">
          <p className="font-bold" style={{ fontFamily: 'var(--font-jp)', color: 'var(--text)' }}>
            {email.from.name}
          </p>
          <p className="text-[0.65rem]" style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>
            {email.date} · {email.time}
          </p>
          <p className="mt-2 text-sm font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent2)' }}>
            {email.subject}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>
            {email.preview}
          </p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: 'repeating-linear-gradient(90deg, var(--accent2), var(--accent2) 4px, transparent 4px, transparent 8px)' }}
      />
    </button>
  )
}

function VhsModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15, 2, 32, 0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto border-4 border-black p-6 shadow-[8px_8px_0_var(--accent2)]"
        style={{ background: 'linear-gradient(180deg, #1e0b3a 0%, #0a0518 100%)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="otaku-mail-title"
      >
        <div className="otaku-tracking-bars mb-4 flex h-3 w-full gap-1 overflow-hidden rounded-sm opacity-70">
          <div className="h-full flex-1 bg-[var(--accent)]" />
          <div className="h-full flex-1 bg-[var(--accent2)]" />
          <div className="h-full flex-1 bg-[var(--accent3)]" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-2 border-[var(--accent)] text-[var(--text)]"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="text-center text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: 'var(--accent3)', fontFamily: 'var(--font-main)' }}>
          ▶ PLAY · EP.{String(email.id).padStart(2, '0')}
        </p>
        <h2 id="otaku-mail-title" className="mt-2 text-center text-xl leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', textShadow: '2px 2px 0 #000' }}>
          {email.subject}
        </h2>
        <div className="mt-4 flex items-center gap-3 border-b-2 border-dashed pb-4" style={{ borderColor: 'var(--accent2)' }}>
          <span className="text-4xl">{email.from.avatar}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-jp)', color: 'var(--text)' }}>{email.from.name}</p>
            <p className="text-xs" style={{ color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>{email.from.email}</p>
            <p className="text-xs" style={{ color: 'var(--text2)' }}>{email.date}</p>
          </div>
        </div>
        <div className="mt-5 whitespace-pre-line text-sm leading-relaxed" style={{ fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
          {email.body}
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
          ⏸ end of tape — be kind, rewind
        </p>
      </div>
    </div>
  )
}

export default function AnimeOtaku90sLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: 'radial-gradient(ellipse at 50% 0%, #2d0a52 0%, var(--bg) 45%, #050010 100%)',
      }}
    >
      <Starfield />
      <div className="otaku-crt-vignette pointer-events-none fixed inset-0 z-[40]" aria-hidden />
      <div className="otaku-crt-lines pointer-events-none fixed inset-0 z-[41]" aria-hidden />

      <header className="relative z-10 px-4 pb-2 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="otaku-rage-title text-3xl leading-none sm:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', textShadow: '4px 4px 0 #000, 0 0 30px rgba(255,42,109,0.5)' }}>
                MAIL TOWER
              </h1>
              <span className="flex items-center gap-1 rounded border-2 border-black px-2 py-0.5 text-[0.6rem] font-bold uppercase" style={{ background: '#000', color: 'var(--accent2)' }}>
                <span className="otaku-blink h-2 w-2 rounded-full bg-[var(--accent)]" />
                REC
              </span>
            </div>
            <p className="mt-1 text-lg" style={{ fontFamily: 'var(--font-jp)', color: 'var(--accent2)' }}>
              伝説のINBOX
            </p>
            <p className="mt-2 max-w-md text-xs uppercase tracking-widest" style={{ color: 'var(--text2)' }}>
              same data · different dimension · {unread} unopened episodes
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchPersona}
            className="btn border-0 font-bold uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              color: '#fff',
              boxShadow: '4px 4px 0 #000',
            }}
          >
            change channel
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <WeatherBlock />
            <CelPanel titleEn="TOKYO EXCHANGE (not really)" titleJp="株 · 戦闘力グラフ" accent="var(--accent2)" icon="📈">
              <div className="grid grid-cols-2 gap-3">
                {stocks.map((s) => (
                  <StockPowerCard key={s.ticker} s={s} />
                ))}
              </div>
            </CelPanel>
            <CelPanel titleEn="FANSUB HEADLINES" titleJp="速報 · このあと激アツ" accent="var(--accent)" icon="📺">
              {news.map((n) => (
                <NewsFlash key={n.id} item={n} />
              ))}
            </CelPanel>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-4 flex items-end justify-between gap-2 border-b-4 border-black pb-2" style={{ borderColor: 'var(--accent3)' }}>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--accent3)', fontFamily: 'var(--font-main)' }}>
                  EPISODE SELECT
                </p>
                <p className="text-sm" style={{ fontFamily: 'var(--font-jp)' }}>メール一覧 · VHSコレクション</p>
              </div>
              <span className="text-3xl" aria-hidden>📼</span>
            </div>
            <div className="columns-1 gap-4 sm:columns-2">
              {emails.map((email) => (
                <div key={email.id} className="mb-4 break-inside-avoid">
                  <EpisodeMail email={email} onOpen={setSelectedEmail} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <VhsModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
