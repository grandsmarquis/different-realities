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
  const w = 100
  const h = 32
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

export default function GasPricesRisingLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [price, setPrice] = useState(4.279)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => Math.round((p + 0.003 + Math.random() * 0.004) * 1000) / 1000)
      setTick(t => t + 1)
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden pb-8"
      style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 0%, #1a0a05 0%, #0d0604 45%, #050302 100%)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      <style>{`
        @keyframes gasLedFlicker {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.92; filter: brightness(1.15); }
        }
        @keyframes gasDrip {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(24px); opacity: 0; }
        }
        @keyframes gasRoad {
          0% { background-position: 0 0; }
          100% { background-position: 0 120px; }
        }
        .gas-led-price { animation: gasLedFlicker 2.2s ease-in-out infinite; }
        .gas-drip::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 100%;
          width: 4px;
          height: 10px;
          margin-left: -2px;
          background: #ffcc00;
          border-radius: 50%;
          animation: gasDrip 1.8s ease-in infinite;
        }
        .gas-road {
          background: repeating-linear-gradient(
            180deg,
            transparent,
            transparent 58px,
            rgba(255,255,255,0.06) 58px,
            rgba(255,255,255,0.06) 62px
          );
          animation: gasRoad 4s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 gas-road opacity-25" aria-hidden />

      <header className="relative z-10 border-b-4 px-4 py-5" style={{ borderColor: '#ff3d00', background: 'linear-gradient(180deg, #2a1510 0%, #1a0c08 100%)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="relative text-5xl gas-drip" aria-hidden>
              ⛽
            </span>
            <div>
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#ff9800' }}>
                Highway 9 · self-serve
              </p>
              <h1 className="m-0 text-2xl font-bold tracking-tight md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: '#fff3e0' }}>
                GAS PRICES RISING
              </h1>
              <p className="m-0 mt-1 text-xs opacity-70">The sign never goes down. Neither does your blood pressure.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div
              className="gas-led-price rounded-lg border-4 px-6 py-3 text-center shadow-[0_0_40px_rgba(255,204,0,0.35)]"
              style={{
                borderColor: '#333',
                background: '#0a0a0a',
                boxShadow: 'inset 0 0 20px rgba(255,60,0,0.15), 0 0 40px rgba(255,204,0,0.25)',
              }}
            >
              <p className="m-0 text-[10px] uppercase tracking-widest" style={{ color: '#ff6d00' }}>
                Regular unleaded
              </p>
              <p key={tick} className="m-0 text-4xl font-black tabular-nums md:text-5xl" style={{ color: '#ffea00', textShadow: '0 0 12px #ff9800, 0 0 28px rgba(255,200,0,0.5)' }}>
                ${price.toFixed(3)}
              </p>
              <p className="m-0 text-[10px]" style={{ color: '#ff5722' }}>
                ↑ since you blinked
              </p>
            </div>
            <button type="button" className="btn btn-sm border-0 uppercase" style={{ background: '#ff3d00', color: '#fff' }} onClick={onSwitchPersona}>
              Walk home
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-4 p-4 lg:grid-cols-12">
        <aside className="space-y-2 lg:col-span-3">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#ff9800' }}>
            Pump-side receipts (inbox)
          </p>
          {emails.map(e => {
            const on = selectedEmail?.id === e.id
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedEmail(e)}
                className="w-full rounded border-l-4 p-3 text-left transition-all"
                style={{
                  borderColor: on ? '#ffea00' : '#5d4037',
                  background: on ? 'rgba(255,152,0,0.12)' : 'rgba(0,0,0,0.35)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{e.from.avatar}</span>
                  {!e.read && <span className="badge badge-warning badge-xs">NEW</span>}
                </div>
                <p className={`m-0 mt-1 line-clamp-2 text-xs ${e.read ? 'opacity-60' : 'font-bold'}`}>{e.subject}</p>
                <p className="m-0 text-[10px] opacity-50">{e.from.name}</p>
              </button>
            )
          })}
        </aside>

        <main className="min-h-[280px] lg:col-span-6">
          {selectedEmail ? (
            <div className="rounded-lg border-2 p-5 md:p-6" style={{ borderColor: '#ff6d00', background: 'linear-gradient(145deg, #1e120c 0%, #120a08 100%)' }}>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase">
                <span className="rounded px-2 py-0.5" style={{ background: '#ff3d00', color: '#fff' }}>
                  Printed @ pump #{selectedEmail.id}
                </span>
                <span className="opacity-50">{selectedEmail.date}</span>
              </div>
              <h2 className="m-0 mt-3 text-xl font-bold md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedEmail.subject}
              </h2>
              <p className="m-0 mt-2 text-sm" style={{ color: '#ffab40' }}>
                {selectedEmail.from.name}
              </p>
              <div className="mt-4 max-h-[min(50vh,420px)] overflow-y-auto border-l-4 pl-4 text-sm leading-relaxed whitespace-pre-wrap opacity-90" style={{ borderColor: '#ff6d00' }}>
                {selectedEmail.body}
              </div>
              <button type="button" className="btn btn-ghost btn-sm mt-4 text-orange-300" onClick={() => setSelectedEmail(null)}>
                ← crumple receipt
              </button>
            </div>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 opacity-70" style={{ borderColor: '#5d4037' }}>
              <p className="text-5xl">🧾</p>
              <p className="mt-3 text-center font-bold" style={{ color: '#ff9800' }}>
                Select a receipt. Mind the thermal paper.
              </p>
            </div>
          )}
        </main>

        <aside className="space-y-3 lg:col-span-3">
          <div className="rounded-lg border-2 p-4 text-center" style={{ borderColor: '#ff6d00', background: '#1a100c' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#ff9800' }}>
              Road weather
            </p>
            <p className="text-4xl">{weather.icon}</p>
            <p className="font-bold">{weather.condition}</p>
            <p className="text-xs opacity-60">
              {weather.city} · {weather.temp}° · wind {weather.wind} km/h
            </p>
          </div>
          <div className="rounded-lg border-2 p-3" style={{ borderColor: '#5d4037', background: '#140c0a' }}>
            <p className="mb-2 text-center text-[10px] font-bold uppercase" style={{ color: '#ffab40' }}>
              Commodity strip (stocks)
            </p>
            {stocks.map(s => (
              <div key={s.ticker} className="mb-2 flex items-center justify-between gap-2 border-b border-white/5 pb-2 text-xs">
                <div>
                  <span className="font-bold">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'text-warning' : 'text-error'}>
                    {' '}
                    {s.changePct >= 0 ? '↑' : '↓'}
                    {Math.abs(s.changePct)}%
                  </span>
                </div>
                <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#fbbf24' : '#f87171'} />
              </div>
            ))}
          </div>
          <div className="rounded border p-3 text-xs" style={{ borderColor: '#3e2723', background: '#0d0806' }}>
            <p className="mb-2 text-[10px] font-bold uppercase" style={{ color: '#ff9800' }}>
              AM radio headlines
            </p>
            {news.slice(0, 4).map(n => (
              <p key={n.id} className="mb-2 border-l-2 pl-2 font-medium leading-snug" style={{ borderColor: '#ff6d00' }}>
                {n.emoji} {n.title}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
