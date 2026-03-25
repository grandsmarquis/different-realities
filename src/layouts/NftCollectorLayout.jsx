import { useContext, useMemo } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

/** OpenSea-inspired marketplace chrome (parody UI, not affiliated). */
function OsLogo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M16 4C10.5 4 6 8.2 6 13.5c0 3.1 1.8 5.8 4.5 7.2L16 28l5.5-7.3c2.7-1.4 4.5-4.1 4.5-7.2C26 8.2 21.5 4 16 4z"
        fill="var(--accent)"
        opacity="0.95"
      />
      <path d="M16 8c-3.5 0-6.2 2.4-6.2 5.5 0 2 1.1 3.8 2.8 4.8L16 22l3.4-3.7c1.7-1 2.8-2.8 2.8-4.8C22.2 10.4 19.5 8 16 8z" fill="#04111d" />
    </svg>
  )
}

export default function NftCollectorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)

  const floorEth = useMemo(() => {
    const n = stocks[0]?.changePct ?? 2.4
    return (0.04 + Math.abs(n) * 0.001).toFixed(3)
  }, [])

  const volEth = useMemo(() => (12.8 + emails.length * 0.42).toFixed(2), [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-main)',
      }}
    >
      {/* Top nav — OpenSea-style bar */}
      <header
        className="sticky top-0 z-30 border-b"
        style={{
          borderColor: 'var(--border)',
          background: 'rgba(4, 17, 29, 0.92)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
          <div className="flex min-w-0 shrink-0 items-center gap-2">
            <OsLogo className="size-8 shrink-0" />
            <div className="min-w-0 leading-tight">
              <span className="text-lg font-bold tracking-tight md:text-xl">OpenEnvelope</span>
              <span className="ml-2 hidden text-xs font-normal sm:inline" style={{ color: 'var(--text2)' }}>
                parody marketplace
              </span>
            </div>
          </div>

          <div className="order-last flex w-full min-w-0 flex-1 md:order-none md:max-w-xl">
            <label className="relative flex w-full items-center">
              <span className="pointer-events-none absolute left-3 text-base opacity-50" aria-hidden>
                ⌕
              </span>
              <input
                type="search"
                readOnly
                placeholder="Search by items, collections, or wallets"
                className="input input-sm h-10 w-full cursor-default rounded-lg border pl-9 text-sm md:input-md md:h-11"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              />
            </label>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="hidden h-9 items-center rounded-lg border px-3 text-sm font-medium sm:flex"
              style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
            >
              Create
            </button>
            <button
              type="button"
              className="btn h-9 min-h-0 rounded-lg border-0 px-4 text-sm font-semibold normal-case text-white"
              style={{ background: 'var(--accent)' }}
            >
              Connect wallet
            </button>
            <button
              type="button"
              onClick={onSwitchPersona}
              className="btn btn-ghost btn-square h-9 min-h-0 rounded-lg text-xs font-medium normal-case"
              style={{ color: 'var(--text2)' }}
              aria-label="Leave marketplace"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Collection-style stats row */}
      <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-stretch gap-px px-4 py-0 md:px-6">
          {[
            { label: 'Items', value: String(emails.length) },
            { label: 'Total volume', value: `${volEth} ETH` },
            { label: 'Floor price', value: `${floorEth} ETH` },
            { label: 'Listed', value: String(emails.filter(e => !e.read).length) },
          ].map(stat => (
            <div
              key={stat.label}
              className="flex min-w-[120px] flex-1 flex-col justify-center border-b py-3 md:border-b-0 md:py-4 md:pr-8"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-xs font-medium" style={{ color: 'var(--text2)' }}>
                {stat.label}
              </span>
              <span className="text-base font-semibold tabular-nums md:text-lg">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs strip (cosmetic) */}
      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto flex max-w-[1400px] gap-6 px-4 md:px-6">
          <span
            className="border-b-2 py-3 text-sm font-semibold"
            style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
          >
            Items
          </span>
          <span className="cursor-default py-3 text-sm font-medium opacity-50" style={{ color: 'var(--text2)' }}>
            Activity
          </span>
          <span className="hidden py-3 text-sm font-medium opacity-50 sm:inline" style={{ color: 'var(--text2)' }}>
            Offers
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[1fr_380px] lg:gap-8 lg:px-6 lg:py-8">
        {/* NFT grid — OS card ratio */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text2)' }}>
              All items
            </h2>
            <div className="flex items-center gap-2">
              <span
                className="rounded-md border px-2 py-1 text-xs font-medium"
                style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
              >
                Recently listed
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {emails.map((e, i) => {
              const price = (0.008 + (i % 7) * 0.015 + (e.id % 5) * 0.007).toFixed(3)
              const active = selectedEmail?.id === e.id
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setSelectedEmail(e)}
                  className="group w-full overflow-hidden rounded-xl border text-left transition-all"
                  style={{
                    borderColor: active ? 'var(--accent)' : 'var(--border)',
                    background: 'var(--card)',
                    boxShadow: active ? '0 0 0 1px var(--accent), 0 8px 24px rgba(0,0,0,0.35)' : undefined,
                  }}
                >
                  <div
                    className="relative flex aspect-square items-center justify-center text-5xl transition-transform group-hover:scale-[1.02] sm:text-6xl"
                    style={{
                      background: `linear-gradient(180deg, color-mix(in srgb, var(--bg2) 100%, transparent) 0%, var(--bg) 100%)`,
                    }}
                  >
                    <span className="drop-shadow-md">{e.from.avatar}</span>
                    {!e.read && (
                      <span
                        className="absolute right-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                        style={{ background: 'var(--accent)', color: '#fff' }}
                      >
                        New
                      </span>
                    )}
                  </div>
                  <div className="border-t p-3" style={{ borderColor: 'var(--border)' }}>
                    <p className="truncate text-xs font-medium" style={{ color: 'var(--text2)' }}>
                      Inbox Mail #{e.id}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold leading-snug">{e.subject}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs tabular-nums" style={{ color: 'var(--text2)' }}>
                        Last sale
                      </span>
                      <span className="text-sm font-semibold tabular-nums">{price} ETH</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Item panel — OS right column: price + CTAs */}
        <aside className="min-w-0 lg:sticky lg:top-[72px] lg:self-start">
          <div
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            {selectedEmail ? (
              <>
                <div
                  className="flex aspect-[4/3] items-center justify-center border-b text-7xl sm:aspect-square sm:text-8xl"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)',
                  }}
                >
                  {selectedEmail.from.avatar}
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-xs font-medium" style={{ color: 'var(--text2)' }}>
                    Inbox Mail
                  </p>
                  <h3 className="mt-1 text-xl font-bold leading-tight md:text-2xl">{selectedEmail.subject}</h3>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text2)' }}>
                    Owned by{' '}
                    <span className="font-medium" style={{ color: 'var(--accent)' }}>
                      {selectedEmail.from.name}
                    </span>
                  </p>

                  <div
                    className="mt-4 flex flex-wrap gap-2 rounded-lg border p-3"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs" style={{ color: 'var(--text2)' }}>
                        Current price
                      </p>
                      <p className="text-lg font-bold tabular-nums">
                        {(0.02 + (selectedEmail.id % 9) * 0.031).toFixed(3)} ETH
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: 'var(--text2)' }}>
                        Best offer
                      </p>
                      <p className="text-sm font-semibold tabular-nums opacity-70">—</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="btn flex-1 rounded-lg border-0 font-semibold normal-case text-white"
                      style={{ background: 'var(--accent)', minHeight: '44px' }}
                    >
                      Buy now
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline flex-1 rounded-lg font-semibold normal-case"
                      style={{ borderColor: 'var(--border)', minHeight: '44px' }}
                    >
                      Make offer
                    </button>
                  </div>

                  <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text2)' }}>
                      Description
                    </p>
                    <div className="mt-2 max-h-[min(40vh,280px)] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed opacity-90">
                      {selectedEmail.body}
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text2)' }}>
                      Properties
                    </p>
                    <ul className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      {[
                        { k: 'From', v: selectedEmail.from.name },
                        { k: 'Date', v: selectedEmail.date },
                        { k: 'Category', v: selectedEmail.tag ?? 'correspondence' },
                        { k: 'Chain', v: 'Ethereum' },
                      ].map(row => (
                        <li
                          key={row.k}
                          className="rounded-md border px-2 py-2"
                          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
                        >
                          <span className="block truncate" style={{ color: 'var(--text2)' }}>
                            {row.k}
                          </span>
                          <span className="block truncate font-medium capitalize">{row.v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <span className="text-5xl opacity-40">◻</span>
                <p className="text-sm font-medium" style={{ color: 'var(--text2)' }}>
                  Select an item to view details
                </p>
              </div>
            )}
          </div>

          <div
            className="mt-4 rounded-xl border p-3 text-xs"
            style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--text2)' }}
          >
            <p className="font-semibold text-[var(--text)]">Off-chain feed</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{weather.icon}</span>
              {stocks.slice(0, 3).map(s => (
                <span key={s.ticker} className="tabular-nums">
                  {s.ticker} {s.changePct}%
                </span>
              ))}
            </p>
            <p className="mt-2 line-clamp-2 opacity-80">{news[0]?.title}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
