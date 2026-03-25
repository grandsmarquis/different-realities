import { useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const FAKE_SKYSCRAPERS = [
  { hue: 'from-fuchsia-600 via-purple-600 to-indigo-700', line1: '1 WEIRD', line2: 'TRICK', cta: 'CLICK' },
  { hue: 'from-amber-500 via-orange-500 to-red-600', line1: 'HOT', line2: 'DEALS', cta: 'NOW' },
  { hue: 'from-emerald-500 to-teal-700', line1: 'DOCTORS', line2: 'RESIGNED', cta: 'WOW' },
  { hue: 'from-sky-500 to-blue-800', line1: 'SINGLE', line2: 'COOKIES', cta: 'IN AREA' },
  { hue: 'from-rose-500 to-pink-700', line1: 'YOU', line2: 'WON!!!', cta: 'MAYBE' },
]

const MARQUEE_A = [
  '🔥 LIMITED TIME: READ YOUR OWN EMAIL 🔥',
  'SPONSORED: OXYGEN — NOW WITH MORE AIR',
  'LOCAL USER DISCOVERS WEATHER',
  'STOCKS HATE THIS ONE SIMPLE TRICK',
]

const MARQUEE_B = [
  'ACCEPT ALL · REJECT ALL · QUESTION REALITY',
  'YOUR AD HERE (no really, everywhere)',
  'BREAKING: NEWS STILL EXISTS UNDER 4 BANNERS',
]

const MARQUEE_C = [
  '⚡ FLASH SALE: INFINITE SCROLL ⚡',
  'NATIVE ADS ARE JUST ADS IN A TRENCH COAT',
  'YOU ARE BANNER #4,792 TODAY — THANK YOU',
  'OUR ALGORITHM MISSES YOU (SHOW IT ADS)',
  'PREMIUM AD-FREE AD EXPERIENCE $9.99/MO',
]

const MINI_TOP_ADS = [
  { k: 'vpn', hue: 'from-indigo-600 to-violet-900', line1: 'HIDE FROM', line2: 'YOUR MAIL', cta: 'VPN VPN' },
  { k: 'pill', hue: 'from-lime-500 to-green-800', line1: 'MEGA', line2: 'BRAIN PILL', cta: 'BUY' },
  { k: 'meet', hue: 'from-rose-600 to-red-900', line1: 'SINGLES', line2: 'IN 127.0.0.1', cta: 'CHAT' },
  { k: 'coin', hue: 'from-amber-400 to-orange-700', line1: 'CRYPTO', line2: 'TO THE MOON', cta: 'YOLO' },
  { k: 'clean', hue: 'from-cyan-500 to-blue-900', line1: 'CLEAN', line2: 'YOUR CACHE', cta: 'SCAN' },
  { k: 'muscle', hue: 'from-fuchsia-600 to-pink-900', line1: 'ONE TAP', line2: 'ABS (FAKE)', cta: 'TRY' },
]

const TOP_JUNK_TABS = ['Hot takes', 'Crypto tips', 'Dating ???', 'FREE PDF', 'Weird pixel', 'Toolbar.exe', 'News but loud']

function MarqueeRow({ items, reverse, fast, className = '' }) {
  const text = useMemo(() => [...items, ...items].join('   •   '), [items])
  let motion = 'adclutter-marquee-fwd'
  if (reverse && fast) motion = 'adclutter-marquee-rev-fast'
  else if (reverse) motion = 'adclutter-marquee-rev'
  else if (fast) motion = 'adclutter-marquee-fwd-fast'

  return (
    <div className={`adclutter-marquee-mask overflow-hidden border-y border-neutral-300/80 bg-neutral-200 py-1 ${className}`}>
      <div
        className={`adclutter-marquee-track flex whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-neutral-800 ${motion}`}
        aria-hidden
      >
        <span className="px-4">{text}</span>
        <span className="px-4">{text}</span>
      </div>
    </div>
  )
}

function FakeSkyscraper({ ad, i }) {
  return (
    <div
      className={`adclutter-wiggle relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-box bg-gradient-to-br p-3 text-center text-white shadow-lg ${ad.hue}`}
      style={{ animationDelay: `${i * 0.35}s` }}
    >
      <span className="adclutter-shimmer absolute inset-0 opacity-30" aria-hidden />
      <p className="relative z-[1] font-black leading-none" style={{ fontFamily: 'var(--font-display)' }}>
        {ad.line1}
        <br />
        {ad.line2}
      </p>
      <button
        type="button"
        className="adclutter-cta-pulse relative z-[1] btn btn-xs w-full border-0 bg-white/95 font-black text-neutral-900 hover:bg-white"
        tabIndex={-1}
      >
        {ad.cta}
      </button>
      <span className="absolute right-1 top-1 rounded bg-black/30 px-1 text-[7px] font-bold uppercase">Ad</span>
    </div>
  )
}

export default function AdClutterWebLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [cookiesOk, setCookiesOk] = useState(false)

  const unread = emails.filter(e => !e.read).length

  return (
    <div
      className="adclutter-root relative min-h-dvh overflow-x-hidden pb-28 text-neutral-900"
      data-theme="light"
      style={{
        fontFamily: 'var(--font-body)',
        backgroundColor: 'var(--ad-paper)',
        color: '#1a0f2e',
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(255, 0, 110, 0.06) 0%, transparent 45%), radial-gradient(circle at 80% 0%, rgba(0, 245, 255, 0.07) 0%, transparent 40%), radial-gradient(circle at 50% 100%, rgba(255, 190, 11, 0.08) 0%, transparent 50%)',
      }}
    >
      <div className="adclutter-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.035]" aria-hidden />

      {/* Floating promo badges */}
      <div
        className="adclutter-float-badge pointer-events-none fixed left-[4%] top-[28%] z-[2] hidden rounded-full border-4 border-amber-600 bg-amber-400 px-3 py-2 text-xs font-black uppercase text-neutral-900 shadow-xl md:block"
        style={{ fontFamily: 'var(--font-display)', '--ad-badge-rot': '-8deg' }}
        aria-hidden
      >
        200% OFF*
      </div>
      <div
        className="adclutter-float-badge pointer-events-none fixed right-[6%] top-[38%] z-[2] hidden rounded-lg border-4 border-cyan-700 bg-cyan-400 px-2 py-1.5 text-[10px] font-black uppercase text-neutral-900 shadow-lg md:block"
        style={{ animationDelay: '0.7s', '--ad-badge-rot': '6deg' }}
        aria-hidden
      >
        DOWNLOAD RAM
      </div>

      {/* Top ad stack — above browser chrome */}
      <div className="relative z-[4] border-b-2 border-neutral-400 bg-white text-neutral-900" aria-label="Top advertisements">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 border-b border-neutral-700 bg-neutral-900 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-amber-200">
          <span className="adclutter-top-blink text-amber-300">● Sponsored strip</span>
          <span className="hidden text-neutral-400 sm:inline">|</span>
          <span>Advertiser happy place</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400">Not a doctor</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 border-b border-dashed border-neutral-300 bg-amber-50/90 px-2 py-2">
          {TOP_JUNK_TABS.map(t => (
            <span
              key={t}
              className="cursor-default rounded-full border border-orange-200 bg-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-orange-900 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="adclutter-top-leaderboard relative mx-2 my-2 overflow-hidden rounded-xl border-4 border-dashed border-pink-500 bg-gradient-to-r from-pink-500 via-yellow-300 to-cyan-400 p-1 shadow-md sm:mx-4">
          <div className="relative flex min-h-[76px] items-center justify-between gap-3 overflow-hidden rounded-lg bg-neutral-950 px-3 py-3 text-white sm:min-h-[88px] sm:px-5">
            <span className="adclutter-shimmer pointer-events-none absolute inset-0 opacity-20" aria-hidden />
            <div className="relative z-[1] min-w-0 flex-1">
              <p className="m-0 text-[9px] font-bold uppercase tracking-[0.35em] text-yellow-300">Mega leaderboard · sponsored</p>
              <p className="m-0 mt-1 line-clamp-2 text-lg font-black leading-tight sm:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                YOUR LIFE. NOW WITH 40% MORE BANNERS.
              </p>
              <p className="m-0 mt-1 text-[10px] text-neutral-400">
                Includes: fake close buttons · guilt · {weather.city} {weather.temp}°C teased · stonks energy
              </p>
            </div>
            <div className="relative z-[1] shrink-0 text-center">
              <span className="text-4xl sm:text-5xl" aria-hidden>
                🤑
              </span>
              <p className="-mt-0.5 m-0 text-[7px] font-bold uppercase text-yellow-300">Tap money*</p>
            </div>
          </div>
          <span className="absolute right-3 top-3 z-[2] rounded-md bg-white px-1.5 py-0.5 text-[7px] font-black uppercase text-neutral-900 shadow">
            Ad
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 px-2 sm:grid-cols-3 lg:grid-cols-6 lg:px-4">
          {MINI_TOP_ADS.map((ad, i) => (
            <div
              key={ad.k}
              className={`adclutter-wiggle relative min-h-[78px] overflow-hidden rounded-lg bg-gradient-to-br p-2 text-center text-white shadow-md ${ad.hue}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className="adclutter-shimmer absolute inset-0 opacity-25" aria-hidden />
              <p className="relative z-[1] text-[10px] font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {ad.line1}
                <br />
                {ad.line2}
              </p>
              <button
                type="button"
                tabIndex={-1}
                className="adclutter-cta-pulse relative z-[1] mt-1.5 w-full rounded border-0 bg-white/95 py-1 text-[8px] font-black text-neutral-900"
              >
                {ad.cta}
              </button>
              <span className="absolute left-1 top-1 rounded bg-black/35 px-1 text-[6px] font-bold uppercase">Ad</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-1 border-t border-neutral-300 bg-neutral-100 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 border-b border-neutral-200 py-2 sm:border-b-0 sm:border-r">
            <span className="text-xl" aria-hidden>
              📧
            </span>
            <p className="m-0 max-w-[12rem] text-center text-[10px] font-bold uppercase leading-tight text-neutral-700">
              Doctors: &quot;Inbox zero is impossible&quot; — this one app disagrees (it&apos;s ads)
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 border-b border-neutral-200 py-2 sm:border-b-0 sm:border-r">
            <span className="text-xl" aria-hidden>
              📰
            </span>
            <p className="m-0 max-w-[12rem] text-center text-[10px] font-bold uppercase leading-tight text-neutral-700">
              News reduced to thumbnails — you&apos;ll hate #3 (it&apos;s fine, it&apos;s all #3)
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-xl" aria-hidden>
              📈
            </span>
            <p className="m-0 max-w-[12rem] text-center text-[10px] font-bold uppercase leading-tight text-neutral-700">
              Stonks look spicy in this ONE rectangle (numbers sold separately)
            </p>
          </div>
        </div>

        <MarqueeRow items={MARQUEE_C} fast className="border-t-2 border-fuchsia-300 bg-fuchsia-50" />
        <MarqueeRow items={MARQUEE_A} fast reverse className="border-t-0 bg-rose-50/90" />
      </div>

      <header className="relative z-[3] border-b-2 border-dashed border-primary/40 bg-white/95 text-neutral-900 shadow-sm backdrop-blur-sm">
        <MarqueeRow items={MARQUEE_A} />
        <MarqueeRow items={MARQUEE_B} reverse className="bg-primary/10" />
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="badge badge-success badge-sm shrink-0 font-bold">Secure*</span>
            <p className="min-w-0 truncate text-xs text-neutral-700">
              <span className="font-semibold text-success">https://</span>
              <span className="font-mono font-bold text-neutral-900">totally-legit-content.biz</span>
              <span className="text-[10px] text-neutral-500"> /inbox?ref=ads&amp;ads=ads</span>
            </p>
          </div>
          <button type="button" className="btn btn-primary btn-xs shrink-0 gap-0 font-bold uppercase" onClick={onSwitchPersona}>
            exit adverse
          </button>
        </div>
      </header>

      {!cookiesOk && (
        <div
          className="adclutter-cookie-pop relative z-[40] mx-3 mt-3 flex flex-col gap-3 rounded-box border-2 border-warning bg-amber-100/95 p-4 text-neutral-900 shadow-xl backdrop-blur-sm sm:mx-4 sm:flex-row sm:items-center sm:justify-between"
          role="dialog"
          aria-label="Cookie consent parody"
        >
          <p className="m-0 text-sm font-semibold leading-snug">
            We use <span className="font-bold text-primary">847 cookies</span>, 3 pixels, your hopes, and a pigeon named Steve to show you{' '}
            <em>slightly more ads</em>. By clicking anything, ever, you agree. Obviously.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-warning btn-sm font-bold" onClick={() => setCookiesOk(true)}>
              I LOVE ADS
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCookiesOk(true)}>
              fine whatever
            </button>
          </div>
        </div>
      )}

      <div className="relative z-[3] mx-auto grid max-w-[1400px] gap-3 px-2 py-4 sm:px-4 xl:grid-cols-12 xl:gap-4">
        {/* Left skyscrapers */}
        <aside className="hidden flex-col gap-3 xl:col-span-2 xl:flex" aria-label="Decorative fake advertisements">
          {FAKE_SKYSCRAPERS.map((ad, i) => (
            <FakeSkyscraper key={ad.line1 + ad.line2} ad={ad} i={i} />
          ))}
        </aside>

        <main className="min-w-0 xl:col-span-7">
          <div className="adclutter-hero-glow relative overflow-hidden rounded-box border-2 border-primary bg-white p-4 text-neutral-900 shadow-md sm:p-6">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/20 blur-2xl" aria-hidden />
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Sponsored hero unit</p>
            <h1 className="mt-2 text-2xl font-black leading-none sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              Your inbox
              <span className="text-primary"> (real)</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-neutral-700">
              {unread} unread messages hiding between promotions, chumboxes, and one honest paragraph.{' '}
              <span className="whitespace-nowrap text-xs font-bold text-secondary">Not a financial ad.</span>
            </p>
          </div>

          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            Promoted stories — your actual mail
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {emails.map((email, i) => (
              <li key={email.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="adclutter-mail-card relative w-full overflow-hidden rounded-box border-2 border-neutral-200 bg-white p-4 text-left text-neutral-900 shadow-md transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
                >
                  <span className="badge badge-accent badge-sm absolute right-2 top-2 font-bold uppercase">Sponsored</span>
                  <span className="absolute -left-1 bottom-2 rotate-90 text-[8px] font-bold uppercase tracking-tighter text-neutral-400">
                    Ad choices
                  </span>
                  <div className="flex items-start gap-2 pr-16">
                    <span className="text-2xl" aria-hidden>
                      {email.from.avatar}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-primary">{email.from.name}</p>
                      <p className="mt-0.5 line-clamp-2 font-bold leading-snug" style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                        {email.subject}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{email.preview}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-dashed border-neutral-200 pt-2 text-[10px] font-semibold uppercase text-neutral-500">
                    <span>{email.date}</span>
                    <span className={email.read ? '' : 'font-bold text-secondary'}>{email.read ? 'Seen' : 'NEW'}</span>
                  </div>
                  {i % 3 === 0 && (
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-60"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile-only fake ad stack */}
          <div className="mt-6 flex flex-col gap-3 xl:hidden" aria-hidden>
            {FAKE_SKYSCRAPERS.slice(0, 2).map((ad, i) => (
              <FakeSkyscraper key={`m-${ad.line1}`} ad={ad} i={i} />
            ))}
          </div>
        </main>

        <aside className="flex min-w-0 flex-col gap-3 xl:col-span-3" aria-label="Widgets dressed as advertisements">
          <section className="adclutter-pulse-border relative overflow-hidden rounded-box border-4 border-secondary bg-gradient-to-br from-cyan-100 via-white to-fuchsia-100 p-4 text-neutral-900 shadow-lg">
            <span className="badge badge-secondary badge-lg mb-2 font-black">Travel ad</span>
            <p className="m-0 text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>
              {weather.icon} {weather.temp}°C
            </p>
            <p className="mt-1 text-sm font-bold">{weather.city}</p>
            <p className="mt-1 text-xs text-neutral-700">{weather.condition} · wind {weather.wind} km/h</p>
            <p className="mt-3 text-[10px] font-bold uppercase text-secondary">Book guilt — prices may fluctuate with vibes</p>
          </section>

          <section className="rounded-box border-2 border-warning bg-white p-3 text-neutral-900 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black uppercase text-warning">Stonk.exe installer</span>
              <span className="badge badge-warning badge-xs animate-pulse">LIVE</span>
            </div>
            <ul className="mt-2 space-y-2">
              {stocks.map(s => (
                <li key={s.ticker} className="flex items-center justify-between rounded-lg bg-neutral-100 px-2 py-1.5 text-sm text-neutral-900">
                  <span className="font-mono font-bold">{s.ticker}</span>
                  <span className={s.changePct >= 0 ? 'font-bold text-success' : 'font-bold text-error'}>
                    {s.currency}
                    {s.price.toFixed(2)} ({s.changePct >= 0 ? '+' : ''}
                    {s.changePct.toFixed(2)}%)
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] uppercase text-neutral-500">Past performance predicts nothing. This is still an ad.</p>
          </section>

          <section className="rounded-box border-2 border-accent bg-white p-3 text-neutral-900 shadow-md">
            <p className="text-xs font-black uppercase tracking-wider text-accent">Around the web</p>
            <p className="mt-1 text-[10px] text-neutral-600">You won&apos;t believe #4 (it&apos;s the news)</p>
            <ul className="mt-2 space-y-2">
              {news.map(n => (
                <li
                  key={n.id}
                  className="flex gap-2 rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-2 text-sm leading-tight text-neutral-900"
                >
                  <span className="text-lg" aria-hidden>
                    {n.emoji}
                  </span>
                  <span>
                    <span className="line-clamp-2 font-semibold">{n.title}</span>
                    <span className="mt-0.5 block text-[10px] font-bold uppercase text-neutral-500">{n.source}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Sticky bottom ad bar */}
      <div className="adclutter-bottom-wiggle pointer-events-none fixed bottom-12 left-0 right-0 z-[35] flex justify-center px-2">
        <div
          className="pointer-events-auto flex max-w-lg flex-wrap items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary px-4 py-2 text-center text-xs font-black uppercase text-white shadow-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="animate-pulse">🔊</span>
          CONGRATS! YOU ARE THE 1,000,000th VISITOR (today)
          <button type="button" className="btn btn-secondary btn-xs border-0" tabIndex={-1}>
            CLAIM NOTHING
          </button>
        </div>
      </div>

      {selectedEmail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEmail(null)}
          role="presentation"
        >
          <div
            className="adclutter-modal-pop relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-box border-4 border-accent bg-white p-5 text-neutral-900 shadow-2xl sm:p-7"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="adclutter-modal-title"
          >
            <div className="absolute right-3 top-3 flex gap-1">
              <span className="badge badge-accent badge-sm">Ad</span>
              <span className="badge badge-ghost badge-sm line-through text-neutral-400">
                Close
              </span>
            </div>
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Exclusive offer: read text</p>
            <h2 id="adclutter-modal-title" className="mt-2 text-xl font-black sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {selectedEmail.subject}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              from {selectedEmail.from.name} · {selectedEmail.date}
            </p>
            <div className="adclutter-confetti-bar my-4 h-2 w-full rounded-full" aria-hidden />
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-800">{selectedEmail.body}</pre>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" className="btn btn-accent flex-1 font-bold" onClick={() => setSelectedEmail(null)}>
                OK thanks (close)
              </button>
              <button type="button" className="btn btn-outline btn-secondary flex-1" onClick={() => setSelectedEmail(null)}>
                See more ads
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
