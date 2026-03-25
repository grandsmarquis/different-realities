import { useEffect, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function MiniSpark({ series, stroke }) {
  if (!series?.length) return null
  const min = Math.min(...series)
  const max = Math.max(...series)
  const w = 96
  const h = 30
  const p = 2
  const r = max - min || 1
  const pts = series.map((v, i) => {
    const x = p + (i / (series.length - 1)) * (w - 2 * p)
    const y = p + (1 - (v - min) / r) * (h - 2 * p)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} aria-hidden className="shrink-0">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  )
}

const specials = ['今日特价 · 宫保鸡丁', '新鲜到货 · 小笼包', '老板推荐 · 炒饭', '外卖高峰 · 请稍等']

export default function ChineseRestaurantOwnerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [specialIdx, setSpecialIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSpecialIdx(i => (i + 1) % specials.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        background: 'linear-gradient(165deg, #450a0a 0%, #1c1917 40%, #0c0a09 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes cnLantern {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes cnSteam {
          0% { opacity: 0.5; transform: translateY(0) scaleX(1); }
          100% { opacity: 0; transform: translateY(-36px) scaleX(1.3); }
        }
        @keyframes cnLazySusan {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .cn-lantern { animation: cnLantern 3s ease-in-out infinite; transform-origin: top center; }
        .cn-steam span {
          position: absolute;
          width: 12px;
          height: 24px;
          left: 50%;
          bottom: 100%;
          margin-left: -6px;
          background: linear-gradient(180deg, rgba(255,255,255,0.2), transparent);
          border-radius: 50%;
          animation: cnSteam 2.2s ease-out infinite;
        }
        .cn-steam span:nth-child(2) { animation-delay: 0.5s; margin-left: 4px; }
        .cn-steam span:nth-child(3) { animation-delay: 1s; margin-left: -14px; }
        .cn-lazy-border {
          position: relative;
        }
        .cn-lazy-border::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 9999px;
          background: conic-gradient(from 0deg, #dc2626, #fbbf24, #dc2626, #fbbf24, #dc2626);
          animation: cnLazySusan 20s linear infinite;
          opacity: 0.35;
          z-index: 0;
        }
      `}</style>

      <div className="pointer-events-none absolute left-[6%] top-16 text-5xl opacity-90 cn-lantern" aria-hidden>
        🏮
      </div>
      <div className="pointer-events-none absolute right-[8%] top-20 text-5xl opacity-90 cn-lantern" style={{ animationDelay: '0.5s' }} aria-hidden>
        🏮
      </div>

      <header className="relative z-10 border-b-4 border-amber-600/50 px-4 py-6" style={{ background: 'linear-gradient(90deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="cn-steam relative text-5xl">🥡</div>
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-200">Family kitchen · since forever</p>
              <h1 className="m-0 text-2xl font-bold text-amber-50 md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                Chinese restaurant owner
              </h1>
              <p key={specialIdx} className="m-0 mt-2 text-sm text-amber-200/90 transition-opacity">
                {specials[specialIdx]}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-sm border-amber-400 bg-amber-500 text-stone-900 hover:bg-amber-400" onClick={onSwitchPersona}>
            打烊 Close shop
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-5 p-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="cn-lazy-border relative mb-3 rounded-full px-4 py-2 text-center">
            <div className="relative z-10 rounded-full border-2 border-amber-500/60 bg-stone-900/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-200">
              Lazy Susan · inbox
            </div>
          </div>
          <div className="space-y-2">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="w-full rounded-xl border-2 p-3 text-left shadow-lg transition-transform hover:scale-[1.02]"
                  style={{
                    borderColor: on ? '#fbbf24' : '#78350f',
                    background: on ? 'linear-gradient(135deg, #422006 0%, #1c1917 100%)' : 'rgba(12,10,9,0.85)',
                    boxShadow: on ? '0 0 24px rgba(251,191,36,0.2)' : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{e.from.avatar}</span>
                    {!e.read && <span className="badge badge-error badge-xs">新 NEW</span>}
                  </div>
                  <p className={`m-0 mt-1 line-clamp-2 text-xs ${on || !e.read ? 'font-bold text-amber-50' : 'text-stone-400'}`}>{e.subject}</p>
                  <p className="m-0 text-[10px] text-amber-700/80">{e.from.name}</p>
                </button>
              )
            })}
          </div>
        </aside>

        <main className="min-h-[260px] lg:col-span-6">
          {selectedEmail ? (
            <div className="rounded-xl border-4 border-double p-5 md:p-7" style={{ borderColor: '#b45309', background: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(180,83,9,0.06) 28px, rgba(180,83,9,0.06) 29px), linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)' }}>
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase">
                <span className="rounded bg-red-800 px-2 py-0.5 text-amber-100">订单 MSG #{selectedEmail.id}</span>
                <span className="text-stone-500">{selectedEmail.date}</span>
              </div>
              <h2 className="m-0 mt-4 text-xl font-bold text-amber-50 md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedEmail.subject}
              </h2>
              <p className="m-0 mt-2 text-sm text-amber-200/80">来自 {selectedEmail.from.name}</p>
              <div className="mt-5 max-h-[min(48vh,400px)] overflow-y-auto border-l-4 border-amber-600 pl-4 text-sm leading-relaxed whitespace-pre-wrap text-stone-200">
                {selectedEmail.body}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-center text-xs text-amber-700/90">
                <span className="rounded border border-amber-800/50 bg-stone-900/80 px-3 py-1">谢谢 Thank you</span>
                <span className="rounded border border-amber-800/50 bg-stone-900/80 px-3 py-1">欢迎再来</span>
              </div>
              <button type="button" className="btn btn-ghost btn-sm mt-3 text-amber-400" onClick={() => setSelectedEmail(null)}>
                ← 返回转盘
              </button>
            </div>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-900 p-8">
              <p className="text-6xl">🥢</p>
              <p className="mt-4 text-center font-semibold text-amber-200">转一下转盘 — 点一封信打开。</p>
              <p className="mt-1 text-center text-xs text-stone-500">Fortune not included. Extra spicy available.</p>
            </div>
          )}
        </main>

        <aside className="space-y-3 lg:col-span-3">
          <div className="rounded-xl border-2 border-red-800 bg-gradient-to-b from-red-950/80 to-stone-950 p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">天气 · Weather</p>
            <p className="text-4xl">{weather.icon}</p>
            <p className="font-bold text-amber-50">{weather.condition}</p>
            <p className="text-xs text-stone-400">
              {weather.city} {weather.temp}° · 风 {weather.wind}
            </p>
          </div>
          <div className="rounded-xl border border-amber-900/60 bg-stone-950/90 p-3">
            <p className="mb-2 text-center text-[10px] font-bold uppercase text-amber-500">行情 · Market board</p>
            {stocks.map(s => (
              <div key={s.ticker} className="mb-2 flex items-center justify-between gap-1 border-b border-stone-800 pb-2 text-xs">
                <span className="font-bold text-amber-100">{s.ticker}</span>
                <span className={s.changePct >= 0 ? 'text-lime-400' : 'text-red-400'}>
                  {s.changePct >= 0 ? '涨' : '跌'} {Math.abs(s.changePct)}%
                </span>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#84cc16' : '#f87171'} />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-red-950 bg-black/40 p-3 text-xs">
            <p className="mb-2 text-[10px] font-bold uppercase text-amber-600">电视新闻 · TV crawl</p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="mb-2 border-l-2 border-amber-700 pl-2 leading-snug text-stone-300">
                {n.emoji} {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
