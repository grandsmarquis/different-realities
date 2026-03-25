import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

function sparkStroke(pct) {
  return pct >= 0 ? '#15803d' : '#b91c1c'
}

function Ticker() {
  const bits = news.map((n) => `【${n.category}】${n.title}`).join('　　　')
  return (
    <div
      className="cnpress-ticker-wrap border-y-2 border-stone-800 bg-[#1c1917] py-2 text-amber-100/95"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <div className="cnpress-ticker-track flex gap-16 whitespace-nowrap text-sm font-semibold tracking-wide">
        <span>
          <span className="text-red-400">号外</span>　{bits}　　　
        </span>
        <span aria-hidden>
          <span className="text-red-400">号外</span>　{bits}　　　
        </span>
      </div>
    </div>
  )
}

function VerticalRail() {
  const chars = '环球日报　读者信箱　风雨无阻'
  return (
    <div
      className="pointer-events-none hidden select-none border-r-2 border-double border-stone-600/80 pr-2 text-center text-stone-600/70 md:block"
      style={{
        writingMode: 'vertical-rl',
        fontFamily: 'var(--font-display)',
        fontSize: '1.35rem',
        letterSpacing: '0.35em',
        lineHeight: 1.85,
      }}
      aria-hidden
    >
      {chars}
    </div>
  )
}

function InkBlots() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="cnpress-ink-blot absolute -left-16 top-1/4 h-48 w-48 rounded-full bg-stone-800 blur-3xl"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="cnpress-ink-blot absolute bottom-1/4 right-[-3rem] h-40 w-40 rounded-full bg-red-900/40 blur-3xl"
        style={{ animationDelay: '-9s' }}
      />
    </div>
  )
}

function MastheadDragon() {
  return (
    <svg
      className="cnpress-dragon h-14 w-14 shrink-0 text-red-800 opacity-90 sm:h-16 sm:w-16"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 38c4-8 12-14 22-14 6 0 11 2 14 6-3-1-6-1-9 0 4 3 6 8 5 14-2 8-10 14-19 14-5 0-9-2-12-5 3 1 7 0 10-2-6-4-9-11-8-19 1-5 4-9 7-11-3 2-6 5-8 9z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M44 18c2-4 6-6 10-5-1 4-4 7-8 8 2 2 3 5 2 8-3 0-6-2-8-5-2 3-5 5-9 6 1-4 4-7 8-9-1-3 0-6 2-8 1-2 2-3 3-5z"
        fill="currentColor"
        opacity="0.7"
      />
      <circle cx="28" cy="30" r="2.5" fill="#f4ecd8" />
    </svg>
  )
}

function WeatherBlock() {
  return (
    <div className="cnpress-paper-breathe relative overflow-hidden border-4 border-double border-stone-700 bg-[#faf6eb] p-4 shadow-[6px_6px_0_rgba(28,25,23,0.12)]">
      <div
        className="pointer-events-none absolute right-2 top-2 flex h-14 w-14 items-center justify-center rounded-full border-4 border-red-800/90 bg-red-700/10 text-[0.55rem] font-bold leading-tight text-red-900 cnpress-seal"
        style={{ fontFamily: 'var(--font-main)' }}
      >
        气象
        <br />
        已核
      </div>
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.4em] text-stone-600"
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        本埠气象
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="cnpress-weather-icon text-5xl">{weather.icon}</span>
        <div>
          <p className="text-3xl font-bold text-stone-900">{weather.temp}°</p>
          <p className="text-sm text-stone-600">{weather.condition}</p>
          <p className="mt-1 text-xs text-stone-500">
            {weather.city}　风 {weather.wind}　湿度 {weather.humidity}%
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1 border-t border-stone-300 pt-3">
        {weather.forecast.map((d) => (
          <div key={d.day} className="flex flex-col items-center text-center">
            <span className="text-[0.6rem] text-stone-500">{d.day}</span>
            <span className="text-base leading-none">{d.icon}</span>
            <span className="text-[0.65rem] font-semibold text-stone-800">{d.high}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockRow({ s }) {
  const data = s.series.map((v, i) => ({ v, i }))
  const up = s.changePct >= 0
  return (
    <div className="cnpress-fold-corner flex gap-2 border-b border-stone-300 py-2 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-headline)' }}>
          {s.ticker}
        </p>
        <p className="line-clamp-1 text-[0.65rem] text-stone-500">{s.name}</p>
        <p className={`font-mono text-sm font-bold ${up ? 'text-green-800' : 'text-red-800'}`}>
          {s.currency}
          {s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          <span className="ml-1 text-xs">
            {up ? '▲' : '▼'}
            {Math.abs(s.changePct).toFixed(2)}%
          </span>
        </p>
      </div>
      <div className="h-12 w-20 shrink-0 opacity-90">
        <ResponsiveContainer width="100%" height={48} debounce={50}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={sparkStroke(s.changePct)} strokeWidth={1.25} dot={false} isAnimationActive={false} />
            <Tooltip
              formatter={(v) => [`${s.currency}${Number(v).toFixed(2)}`, '']}
              contentStyle={{
                background: '#faf6eb',
                border: '2px solid #57534e',
                borderRadius: 2,
                fontSize: 11,
                color: '#1c1917',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function EmailArticle({ email, onOpen }) {
  const hot = !email.read
  return (
    <button
      type="button"
      onClick={() => onOpen(email)}
      className="group w-full border-b-2 border-stone-400 py-4 text-left transition-colors hover:bg-amber-100/40"
    >
      <div className="flex gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-stone-600 bg-stone-100 text-xl shadow-[3px_3px_0_rgba(28,25,23,0.15)] transition-transform group-hover:-translate-y-0.5"
          aria-hidden
        >
          {email.from.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500">来函第 {email.id} 号</span>
            {hot && (
              <span className="rounded-sm bg-red-800 px-1.5 py-0.5 text-[0.6rem] font-bold text-amber-100">未读</span>
            )}
            <span className="ml-auto text-xs text-stone-400">
              {email.date} {email.time}
            </span>
          </div>
          <p
            className={`mt-1 font-semibold leading-snug text-stone-900 ${hot ? 'text-lg' : 'text-base'}`}
            style={{ fontFamily: 'var(--font-main)' }}
          >
            {email.subject}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-stone-600">{email.preview}</p>
          <p className="mt-2 text-xs text-red-900/80 opacity-0 transition-opacity group-hover:opacity-100" style={{ fontFamily: 'var(--font-headline)' }}>
            展开全文 →
          </p>
        </div>
      </div>
    </button>
  )
}

function ArticleModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(28, 25, 23, 0.82)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="cnpress-modal-sheet relative max-h-[88vh] w-full max-w-lg overflow-y-auto border-4 border-double border-stone-700 bg-[#faf6eb] p-6 text-stone-900 shadow-[12px_12px_0_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cnpress-modal-title"
      >
        <div
          className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[48px] border-t-[48px] border-l-transparent border-t-stone-300/90"
          aria-hidden
        />
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 border border-stone-400 text-stone-600"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="text-center text-xs font-bold tracking-[0.5em] text-red-900">副刊精读</p>
        <h2 id="cnpress-modal-title" className="cnpress-headline-sheen mt-2 text-center text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          {email.subject}
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600">
          撰稿　{email.from.name}　　{email.date} {email.time}
        </p>
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent" />
        <div className="columns-1 space-y-3 text-sm leading-relaxed text-stone-800 sm:columns-2 sm:gap-6" style={{ fontFamily: 'var(--font-main)' }}>
          {email.body.split('\n\n').map((para, i) => (
            <p key={i} className="mb-0 break-inside-avoid">
              {para}
            </p>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <div
            className="cnpress-seal flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-800 bg-red-50 text-center text-[0.65rem] font-bold leading-tight text-red-900"
            style={{ fontFamily: 'var(--font-main)' }}
          >
            阅毕
            <br />
            存档
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChineseNewspaperLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [lead, ...restNews] = news
  const unread = emails.filter((e) => !e.read).length

  return (
    <div
      className="relative min-h-screen overflow-x-hidden pb-12"
      style={{
        fontFamily: 'var(--font-main)',
        color: 'var(--text)',
        background: 'linear-gradient(180deg, #e8dcc4 0%, #f4ecd8 22%, #ebe4d2 100%)',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <InkBlots />

      <header className="relative z-10 border-b-4 border-red-900 bg-gradient-to-b from-red-900 to-red-950 px-4 pb-5 pt-6 text-amber-50 shadow-lg sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <MastheadDragon />
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.55em] text-amber-200/80">公元二〇二六年三月廿五日　晨刊</p>
              <h1 className="mt-1 text-5xl leading-none text-amber-50 sm:text-7xl" style={{ fontFamily: 'var(--font-display)' }}>
                环球日报
              </h1>
              <p className="mt-2 text-sm tracking-[0.25em] text-amber-100/90" style={{ fontFamily: 'var(--font-headline)' }}>
                THE UNIVERSAL DAILY · 同一世界　多种版面
              </p>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-amber-200/75">
                本版为戏仿报刊排版；邮箱 {unread} 件未读来函待拆，天气与行情与头条同版刊出。
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <div className="rounded border-2 border-amber-200/40 bg-black/20 px-3 py-2 text-center text-xs text-amber-100">
              <div className="font-mono text-lg font-bold leading-none">甲辰年</div>
              <div className="mt-1 opacity-80">电子版</div>
            </div>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-sm border-2 border-amber-200/60 bg-amber-100 text-red-950 hover:bg-amber-50"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              换报摊
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <Ticker />
      </div>

      <main className="relative z-10 mx-auto flex max-w-6xl gap-4 px-3 py-8 sm:px-6">
        <VerticalRail />

        <div className="min-w-0 flex-1 space-y-8">
          {/* Lead story + news grid */}
          <section className="cnpress-paper-breathe border-4 border-stone-800 bg-[#faf6eb] shadow-[8px_8px_0_rgba(28,25,23,0.15)]">
            <div className="border-b-4 border-red-900 bg-stone-200/80 px-4 py-2 sm:px-6">
              <p className="text-xs font-bold tracking-widest text-red-900" style={{ fontFamily: 'var(--font-headline)' }}>
                头版头条 · 国际要闻
              </p>
            </div>
            <div className="p-4 sm:p-6">
              {lead && (
                <article className="border-b-2 border-dashed border-stone-300 pb-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="rounded bg-red-800 px-2 py-0.5 font-bold text-amber-100">要闻</span>
                    <span>{lead.source}</span>
                    <span>{lead.time}</span>
                  </div>
                  <h2 className="cnpress-headline-sheen mt-3 text-2xl font-bold leading-tight sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {lead.emoji} {lead.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700 first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold first-letter:text-red-900 first-letter:leading-none">
                    据外电综合报道，上述标题与您的真实收件箱并无因果关系——但版式如此严肃，读来仿佛天下大事。以下摘要均来自同一套新闻数据源，仅作版面演示。
                  </p>
                </article>
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {restNews.map((n) => (
                  <article
                    key={n.id}
                    className="border-2 border-stone-300 bg-stone-50/80 p-3 transition-shadow hover:shadow-md"
                  >
                    <p className="text-[0.65rem] font-bold uppercase text-red-900/80">{n.category}</p>
                    <p className="mt-1 font-semibold leading-snug text-stone-900">
                      <span className="mr-1">{n.emoji}</span>
                      {n.title}
                    </p>
                    <p className="mt-2 text-xs text-stone-500">
                      {n.source} · {n.time}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Emails as letters column */}
          <section className="relative border-4 border-double border-stone-700 bg-[#f7f0e4] p-1 shadow-[6px_6px_0_rgba(28,25,23,0.1)]">
            <div
              className="absolute -left-1 top-8 hidden h-32 w-3 rounded-sm bg-red-800/90 sm:block"
              style={{ writingMode: 'vertical-rl' }}
              aria-hidden
            />
            <div className="border border-stone-400 bg-[#faf6eb] px-4 py-2 sm:px-6">
              <p className="text-center text-xs font-bold tracking-[0.5em] text-stone-600">读者来信</p>
              <h3 className="text-center text-2xl font-bold text-red-900" style={{ fontFamily: 'var(--font-display)' }}>
                邮箱专栏
              </h3>
              <p className="mx-auto mt-1 max-w-md text-center text-xs text-stone-500">点击来函标题，展开「副刊」全文</p>
            </div>
            <div className="bg-[#faf6eb] px-3 sm:px-5">
              {emails.map((email) => (
                <EmailArticle key={email.id} email={email} onOpen={setSelectedEmail} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden w-[min(100%,280px)] shrink-0 space-y-5 lg:block">
          <WeatherBlock />
          <div className="border-4 border-stone-800 bg-[#faf6eb] p-4 shadow-[6px_6px_0_rgba(28,25,23,0.12)]">
            <p className="border-b-2 border-stone-800 pb-2 text-center text-sm font-bold text-stone-900" style={{ fontFamily: 'var(--font-headline)' }}>
              财经速览
            </p>
            <div className="mt-1">
              {stocks.map((s) => (
                <StockRow key={s.ticker} s={s} />
              ))}
            </div>
          </div>
          <div className="rounded-sm border-2 border-dashed border-stone-500 bg-amber-50/90 p-3 text-center text-xs text-stone-600">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-lg text-red-900">
              下期预告
            </p>
            <p className="mt-2 leading-relaxed">天气与股价随时可刷新，本报态度永远一本正经。</p>
          </div>
        </aside>
      </main>

      {/* Mobile: stack weather + stocks below */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-4 px-3 pb-8 lg:hidden sm:px-6">
        <WeatherBlock />
        <div className="border-4 border-stone-800 bg-[#faf6eb] p-4 shadow-[6px_6px_0_rgba(28,25,23,0.12)]">
          <p className="border-b-2 border-stone-800 pb-2 text-center text-sm font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
            财经速览
          </p>
          {stocks.map((s) => (
            <StockRow key={s.ticker} s={s} />
          ))}
        </div>
      </div>

      <ArticleModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
