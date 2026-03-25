import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const U = (s) => String(s ?? '').toUpperCase()

function CapsKeyGraphic({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      aria-hidden
      style={{ filter: 'drop-shadow(0 0 12px rgba(255, 0, 170, 0.6))' }}
    >
      <defs>
        <linearGradient id="ac-key-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a1840" />
          <stop offset="100%" stopColor="#12081c" />
        </linearGradient>
        <linearGradient id="ac-key-led" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7fff7f" />
          <stop offset="100%" stopColor="#00cc44" />
        </linearGradient>
      </defs>
      <rect x="8" y="20" width="184" height="88" rx="14" fill="url(#ac-key-top)" stroke="#ff00aa" strokeWidth="3" className="ac-key-cap" />
      <rect x="20" y="32" width="160" height="52" rx="8" fill="#0a0514" stroke="#00f5ff" strokeWidth="2" strokeOpacity="0.7" />
      <text x="100" y="68" textAnchor="middle" fill="#fff" fontSize="28" fontFamily="var(--font-display), system-ui" fontWeight="bold" style={{ letterSpacing: 4 }}>
        CAPS
      </text>
      <circle cx="100" cy="102" r="9" fill="url(#ac-key-led)" className="ac-led" />
    </svg>
  )
}

export default function AllCapsLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter((e) => !e.read).length
  const marqueeText = news.map((n) => `${n.emoji} ${U(n.title)} · `).join('')

  return (
    <div
      className="ac-root min-h-full text-[var(--text)]"
      style={{
        fontFamily: 'var(--font-main), system-ui, sans-serif',
        background: 'linear-gradient(135deg, #0f0120 0%, #1a0538 35%, #0a1628 70%, #12051a 100%)',
        backgroundSize: '400% 400%',
      }}
    >
      <style>{`
        @keyframes ac-bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ac-shout-bar {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.85; transform: scaleY(1.08); }
        }
        @keyframes ac-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ac-bounce-key {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes ac-led-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px #00ff66); opacity: 1; }
          50% { filter: drop-shadow(0 0 16px #00ffaa); opacity: 0.92; }
        }
        @keyframes ac-wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes ac-blink-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .ac-root {
          animation: ac-bg-shift 18s ease infinite;
        }
        .ac-key-cap {
          animation: ac-bounce-key 2.8s ease-in-out infinite;
        }
        .ac-led {
          animation: ac-led-pulse 1.2s ease-in-out infinite;
        }
        .ac-marquee-inner {
          display: inline-block;
          white-space: nowrap;
          animation: ac-marquee 55s linear infinite;
        }
        .ac-card-email:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 0 24px rgba(255, 0, 170, 0.45), 0 0 48px rgba(0, 245, 255, 0.15);
        }
        .ac-megaphone {
          animation: ac-wiggle 2s ease-in-out infinite;
          display: inline-block;
        }
        .ac-live-dot {
          animation: ac-blink-soft 1s step-end infinite;
        }
      `}</style>

      {/* hazard stripes */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #ff00aa 0px, #ff00aa 12px, transparent 12px, transparent 24px, #00f5ff 24px, #00f5ff 36px, transparent 36px, transparent 48px)',
        }}
        aria-hidden
      />

      <div className="relative z-10 px-4 pb-10 pt-6 sm:px-6">
        <header className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-start gap-6">
            <CapsKeyGraphic className="h-24 w-40 shrink-0 sm:h-28 sm:w-44" />
            <div>
              <p className="mb-1 text-xs tracking-[0.35em] text-[var(--accent2)] opacity-90">
                {U('welcome to')}
              </p>
              <h1
                className="text-3xl leading-tight sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: 'var(--font-display), cursive',
                  color: 'var(--accent)',
                  textShadow: '0 0 40px rgba(255, 0, 170, 0.5), 3px 3px 0 #00f5ff33',
                  letterSpacing: '0.06em',
                }}
              >
                {U('THE LOUD INBOX')}
              </h1>
              <p className="mt-2 max-w-xl text-sm tracking-wide text-[var(--text)]/85">
                <span className="ac-megaphone mr-2" aria-hidden>
                  📢
                </span>
                {U(`${unread} unread messages demand your attention right now`)}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline border-[var(--accent2)] text-[var(--accent2)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0f0120]"
            onClick={onSwitchPersona}
          >
            {U('change persona')}
          </button>
        </header>

        {/* shout bar */}
        <div
          className="mb-6 overflow-hidden rounded-box border-2 border-[var(--accent)] bg-neutral-900/80 py-2 text-center text-sm font-bold tracking-widest text-[var(--accent2)] shadow-lg backdrop-blur-sm"
          style={{ animation: 'ac-shout-bar 2s ease-in-out infinite' }}
        >
          {U('caps lock is not a crime · it is a lifestyle · every letter matters')}
        </div>

        {/* marquee */}
        <div className="mb-8 overflow-hidden rounded-box border border-[var(--accent2)]/40 bg-black/50 py-2">
          <div className="ac-marquee-inner text-xs font-bold tracking-wide text-[var(--text)]/90 sm:text-sm">
            <span className="pr-16">{marqueeText}</span>
            <span className="pr-16">{marqueeText}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <main className="lg:col-span-7 xl:col-span-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="badge badge-lg border-0 bg-[var(--accent)] text-[#0f0120]">{U('inbox')}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--accent2)] to-transparent" />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {emails.map((email) => (
                <li key={email.id}>
                  <button
                    type="button"
                    className="ac-card-email card card-border border-[var(--accent2)]/30 bg-base-300/40 text-left backdrop-blur-md transition-all duration-200"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="card-body gap-2 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl" aria-hidden>
                          {email.from.avatar}
                        </span>
                        {!email.read && (
                          <span className="badge badge-sm animate-pulse border-0 bg-[var(--accent)] text-[10px] text-[#0f0120]">
                            {U('new!!!')}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] tracking-[0.2em] text-[var(--accent2)] opacity-80">
                        {U('from')} {U(email.from.name)}
                      </p>
                      <p className="line-clamp-2 text-sm font-bold leading-snug tracking-wide">
                        {U(email.subject)}
                      </p>
                      <p className="line-clamp-2 text-xs opacity-70">{U(email.preview)}</p>
                      <div className="card-actions mt-1 justify-between text-[10px] opacity-60">
                        <span>{U(email.date)}</span>
                        <span className="rounded bg-[var(--accent2)]/20 px-2 py-0.5">{U(email.tag)}</span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </main>

          <aside className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
            {/* Weather */}
            <section className="card border-2 border-[var(--accent)] bg-gradient-to-br from-[#1a0a28] to-[#0a1220] shadow-xl shadow-[var(--accent)]/20">
              <div className="card-body p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg tracking-[0.15em]" style={{ fontFamily: 'var(--font-display), cursive' }}>
                    {U('sky report')}
                  </h2>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--accent2)]">
                    <span className="ac-live-dot inline-block size-2 rounded-full bg-[var(--accent2)]" />
                    {U('live')}
                  </span>
                </div>
                <p className="text-5xl font-black leading-none sm:text-6xl">
                  {weather.icon}{' '}
                  <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">
                    {weather.temp}°C
                  </span>
                </p>
                <p className="mt-2 text-sm font-bold tracking-wide">{U(weather.condition)}</p>
                <p className="text-xs opacity-70">{U(`${weather.city}, ${weather.country}`)}</p>
                <p className="mt-3 text-[10px] tracking-wider text-[var(--accent2)]">
                  {U(`wind ${weather.wind} km/h · humidity ${weather.humidity}%`)}
                </p>
              </div>
            </section>

            {/* Stocks */}
            <section className="card card-border border-[var(--accent2)]/50 bg-base-300/30 backdrop-blur-sm">
              <div className="card-body gap-3 p-5">
                <h2 className="text-lg tracking-[0.12em]" style={{ fontFamily: 'var(--font-display), cursive' }}>
                  {U('money go brrr')}
                </h2>
                <ul className="space-y-3">
                  {stocks.map((s) => (
                    <li
                      key={s.ticker}
                      className="flex items-center justify-between rounded-lg border border-[var(--accent2)]/20 bg-black/30 px-3 py-2"
                    >
                      <div>
                        <p className="font-black tracking-widest text-[var(--accent2)]">{U(s.ticker)}</p>
                        <p className="text-[10px] opacity-60">{U(s.name)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-bold">
                          {s.currency}
                          {s.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className={s.changePct >= 0 ? 'text-success text-xs font-bold' : 'text-error text-xs font-bold'}>
                          {s.changePct >= 0 ? '▲ ' : '▼ '}
                          {U(`${s.changePct >= 0 ? '+' : ''}${s.changePct.toFixed(2)}%`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* News */}
            <section className="card border-2 border-dashed border-[var(--accent2)]/60 bg-base-200/20">
              <div className="card-body gap-3 p-5">
                <h2 className="flex items-center gap-2 text-lg tracking-[0.12em]" style={{ fontFamily: 'var(--font-display), cursive' }}>
                  <span aria-hidden>📰</span> {U('headlines')}
                </h2>
                <ul className="space-y-3">
                  {news.map((n) => (
                    <li key={n.id} className="border-l-4 border-[var(--accent)] pl-3">
                      <p className="text-xs font-bold leading-snug tracking-wide">
                        {n.emoji} {U(n.title)}
                      </p>
                      <p className="mt-1 text-[10px] tracking-wider opacity-60">
                        {U(n.source)} · {U(n.time)} · {U(n.category)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ac-modal-title"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="card max-h-[85vh] w-full max-w-lg overflow-y-auto border-4 border-[var(--accent)] bg-base-300 shadow-2xl shadow-[var(--accent)]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body">
              <p id="ac-modal-title" className="text-[10px] tracking-[0.3em] text-[var(--accent2)]">
                {U('full volume message')}
              </p>
              <h3 className="card-title text-xl tracking-wide text-[var(--accent)]">{U(selectedEmail.subject)}</h3>
              <p className="text-xs opacity-70">
                {U('from')} {U(selectedEmail.from.name)} · {U(selectedEmail.date)}
              </p>
              <div className="divider my-2 border-[var(--accent2)]/30" />
              <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                {U(selectedEmail.body)}
              </pre>
              <div className="card-actions mt-4 justify-end">
                <button type="button" className="btn btn-primary border-0 bg-[var(--accent)] text-[#0f0120]" onClick={() => setSelectedEmail(null)}>
                  {U('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
