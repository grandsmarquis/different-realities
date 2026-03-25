import { useMemo, useState, useEffect } from 'react'
import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function formatPrice(s) {
  const abs = Math.abs(s.price)
  const decimals = s.ticker === 'BTC' ? 0 : 2
  return `${s.currency}${abs.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
}

export default function AdministrativeFormLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [stampPhase, setStampPhase] = useState(0)

  const unread = emails.filter(e => !e.read).length
  const bureaucracyPct = useMemo(() => Math.min(100, 20 + unread * 12 + news.length * 5), [unread])

  useEffect(() => {
    const t = setTimeout(() => setStampPhase(1), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="admin-form-root relative min-h-dvh overflow-x-hidden pb-10 text-[#2c2416]">
      <style>{`
        @keyframes admin-paper-in {
          from { opacity: 0; transform: translateY(12px) rotate(-0.4deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes admin-stamp-thud {
          0% { transform: scale(2.2) rotate(-18deg); opacity: 0; }
          55% { transform: scale(0.92) rotate(-12deg); opacity: 1; }
          75% { transform: scale(1.06) rotate(-14deg); }
          100% { transform: scale(1) rotate(-12deg); opacity: 1; }
        }
        @keyframes admin-seal-wobble {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes admin-ribbon-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        @keyframes admin-type-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes admin-hole-punch {
          0%, 100% { box-shadow: inset 0 0 0 0 rgba(44,36,22,0.2); }
          50% { box-shadow: inset 0 0 0 4px rgba(44,36,22,0.08); }
        }
        .admin-paper {
          animation: admin-paper-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .admin-stamp-approved {
          animation: admin-stamp-thud 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .admin-stamp-pending {
          animation: admin-stamp-thud 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
        }
        .admin-seal {
          animation: admin-seal-wobble 3.5s ease-in-out infinite;
        }
        .admin-ribbon {
          animation: admin-ribbon-drift 8s ease-in-out infinite;
        }
        .admin-cursor {
          animation: admin-type-blink 1s step-end infinite;
        }
        .admin-punch {
          animation: admin-hole-punch 4s ease-in-out infinite;
        }
      `}</style>

      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.45]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(180, 83, 9, 0.07) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(22, 101, 52, 0.06) 0%, transparent 40%),
            repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(44, 36, 22, 0.04) 31px, rgba(44, 36, 22, 0.04) 32px)
          `,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-3 py-6 sm:px-4 md:py-10">
        <div
          className="admin-paper admin-punch relative overflow-hidden rounded-sm border-2 border-[#8b7355] bg-[#f7f0e4] shadow-[8px_12px_0_rgba(44,36,22,0.12),inset_0_0_80px_rgba(255,255,255,0.35)]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
          }}
        >
          <div className="admin-ribbon absolute -right-1 top-6 z-20 origin-top-right rotate-45 bg-secondary px-16 py-1 text-center text-xs font-bold uppercase tracking-widest text-secondary-content shadow-md">
            Official copy
          </div>

          <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 flex-col gap-6 opacity-50" aria-hidden>
            {[0, 1, 2].map(i => (
              <div key={i} className="size-4 rounded-full border-2 border-[#c4b59a] bg-[#2c2416]/10" />
            ))}
          </div>

          <header className="relative border-b-2 border-dashed border-[#bfa88a] px-5 pb-6 pt-8 pl-12 sm:px-8 sm:pl-14">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#6b5b45]">
                  Ministry of synchronous data · Bureau 404
                </p>
                <h1
                  className="m-0 mt-2 text-2xl font-bold uppercase tracking-tight text-[#1a1510] sm:text-3xl"
                  style={{ fontFamily: 'var(--font-display), ui-serif, Georgia, serif' }}
                >
                  Unified intake form
                </h1>
                <p className="m-0 mt-2 max-w-xl text-sm leading-snug text-[#5c4f3d]">
                  Exhibit A–D: correspondence, atmosphere, headlines, and securities — filed for your review in triplicate (digitally).
                  <span className="admin-cursor ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 bg-[#991b1b]" aria-hidden />
                </p>
              </div>
              <div className="relative flex shrink-0 flex-col items-end gap-2">
                <div
                  className={`relative rounded border-4 border-double border-[#991b1b] px-3 py-2 text-center text-[#991b1b] ${
                    stampPhase ? 'admin-stamp-approved' : 'opacity-0'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em]">Certified</span>
                  <span className="block text-lg font-black uppercase leading-none">Fun</span>
                </div>
                <div
                  className={`admin-seal flex size-16 items-center justify-center rounded-full border-4 border-[#166534] text-[10px] font-bold uppercase leading-tight text-[#166534] ${
                    stampPhase ? '' : 'opacity-0'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Dept.
                  <br />
                  OK
                </div>
              </div>
            </div>

            <dl className="mt-6 grid gap-3 text-xs sm:grid-cols-3">
              <div className="rounded border border-[#c4b59a] bg-[#fffdf8]/80 px-3 py-2">
                <dt className="m-0 font-bold uppercase tracking-wide text-[#6b5b45]">Docket no.</dt>
                <dd className="m-0 mt-1 font-mono text-sm text-[#2c2416]">FRM-{weather.city.slice(0, 3).toUpperCase()}-2026-03</dd>
              </div>
              <div className="rounded border border-[#c4b59a] bg-[#fffdf8]/80 px-3 py-2">
                <dt className="m-0 font-bold uppercase tracking-wide text-[#6b5b45]">Pages attached</dt>
                <dd className="m-0 mt-1 font-mono text-sm text-[#2c2416]">{emails.length + news.length + stocks.length + 1}</dd>
              </div>
              <div className="rounded border border-[#c4b59a] bg-[#fffdf8]/80 px-3 py-2">
                <dt className="m-0 font-bold uppercase tracking-wide text-[#6b5b45]">Unread items</dt>
                <dd className="m-0 mt-1 font-mono text-sm text-[#991b1b]">{unread} require initials</dd>
              </div>
            </dl>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#6b5b45]">
                <span>Bureaucracy clearance</span>
                <span>{bureaucracyPct}%</span>
              </div>
              <progress className="progress progress-warning mt-1 h-3 w-full border border-[#c4b59a] bg-[#e8dcc8]" value={bureaucracyPct} max={100} />
            </div>

            <button type="button" className="btn btn-sm btn-neutral mt-5 gap-1 shadow-sm" onClick={onSwitchPersona}>
              <span aria-hidden>↩</span> Exit to lobby (non-form reality)
            </button>
          </header>

          <div className="space-y-8 px-5 py-8 pl-12 sm:px-8 sm:pl-14">
            <section className="relative">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-lg badge-neutral font-mono uppercase">Section A</span>
                <h2 className="m-0 text-lg font-bold uppercase tracking-wide text-[#2c2416]">Electronic correspondence log</h2>
              </div>
              <p className="m-0 mb-4 text-sm text-[#5c4f3d]">Check one row to open the full exhibit. Sign where indicated (mentally).</p>
              <div className="overflow-x-auto rounded border-2 border-[#8b7355] bg-[#fffdf8] shadow-inner">
                <table className="table table-sm">
                  <thead className="bg-[#e8dcc8] text-[11px] uppercase tracking-wide text-[#4a3f32]">
                    <tr>
                      <th className="w-10">☐</th>
                      <th>From</th>
                      <th>Subject line (official)</th>
                      <th>Timestamp</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map(email => (
                      <tr
                        key={email.id}
                        className={`cursor-pointer transition-colors hover:bg-amber-50/80 ${selectedEmail?.id === email.id ? 'bg-warning/15' : ''}`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <td>
                          <input type="checkbox" className="checkbox checkbox-xs checkbox-neutral" readOnly checked={selectedEmail?.id === email.id} aria-label={`Select message from ${email.from.name}`} />
                        </td>
                        <td className="font-mono text-xs">
                          <span className="mr-1" aria-hidden>{email.from.avatar}</span>
                          {email.from.name}
                        </td>
                        <td className="max-w-[12rem] truncate text-sm font-medium sm:max-w-none">{email.subject}</td>
                        <td className="font-mono text-xs whitespace-nowrap">{email.time}</td>
                        <td>
                          {email.read ? (
                            <span className="badge badge-ghost badge-sm">Filed</span>
                          ) : (
                            <span className="badge badge-error badge-sm badge-outline">Action</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-lg badge-info font-mono text-info-content uppercase">Section B</span>
                <h2 className="m-0 text-lg font-bold uppercase tracking-wide text-[#2c2416]">Meteorological attestation</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="rounded border-2 border-[#8b7355] bg-[#fffdf8] p-4">
                  <legend className="px-2 text-xs font-bold uppercase tracking-wider text-[#6b5b45]">Field observations</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="form-control w-full">
                      <span className="label-text text-[10px] font-bold uppercase text-[#6b5b45]">Jurisdiction</span>
                      <input type="text" readOnly className="input input-bordered input-sm bg-base-200 font-mono" value={`${weather.city}, ${weather.country}`} />
                    </label>
                    <label className="form-control w-full">
                      <span className="label-text text-[10px] font-bold uppercase text-[#6b5b45]">Declared temperature</span>
                      <input type="text" readOnly className="input input-bordered input-sm bg-base-200 font-mono" value={`${weather.temp}°C (feels ${weather.feels_like}°C)`} />
                    </label>
                    <label className="form-control w-full sm:col-span-2">
                      <span className="label-text text-[10px] font-bold uppercase text-[#6b5b45]">Sky classification</span>
                      <input type="text" readOnly className="input input-bordered input-sm bg-base-200" value={`${weather.icon} ${weather.condition}`} />
                    </label>
                    <label className="form-control w-full">
                      <span className="label-text text-[10px] font-bold uppercase text-[#6b5b45]">Humidity index</span>
                      <input type="text" readOnly className="input input-bordered input-sm bg-base-200 font-mono" value={`${weather.humidity}%`} />
                    </label>
                    <label className="form-control w-full">
                      <span className="label-text text-[10px] font-bold uppercase text-[#6b5b45]">Wind velocity</span>
                      <input type="text" readOnly className="input input-bordered input-sm bg-base-200 font-mono" value={`${weather.wind} km/h`} />
                    </label>
                  </div>
                </fieldset>
                <div className="rounded border-2 border-dashed border-info/40 bg-info/5 p-4">
                  <p className="m-0 text-xs font-bold uppercase tracking-wider text-info">Five-day projection (unofficial)</p>
                  <ul className="mt-3 space-y-2">
                    {weather.forecast.map(day => (
                      <li key={day.day} className="flex items-center justify-between rounded bg-base-100/80 px-3 py-2 text-sm shadow-sm">
                        <span className="font-mono font-bold">{day.day}</span>
                        <span className="text-lg" aria-hidden>{day.icon}</span>
                        <span className="font-mono text-xs">
                          {day.high}° / {day.low}°
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-lg badge-secondary font-mono uppercase">Section C</span>
                <h2 className="m-0 text-lg font-bold uppercase tracking-wide text-[#2c2416]">Public narrative annex</h2>
              </div>
              <ol className="m-0 list-none space-y-3 p-0">
                {news.map((item, i) => (
                  <li
                    key={item.id}
                    className="relative overflow-hidden rounded border-l-4 border-secondary bg-[#fffdf8] p-4 pl-5 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <span className="absolute right-3 top-3 text-4xl opacity-20" aria-hidden>
                      {item.emoji}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-2 pr-14">
                      <span className="font-mono text-xs font-bold text-secondary">C-{String(i + 1).padStart(2, '0')}</span>
                      <span className="badge badge-outline badge-sm">{item.category}</span>
                      <span className="text-[10px] uppercase tracking-wide text-[#8b7355]">{item.source} · {item.time}</span>
                    </div>
                    <p className="m-0 mt-2 text-sm font-medium leading-snug text-[#2c2416]">{item.title}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-lg badge-success font-mono text-success-content uppercase">Section D</span>
                <h2 className="m-0 text-lg font-bold uppercase tracking-wide text-[#2c2416]">Securities declaration worksheet</h2>
              </div>
              <div className="space-y-4">
                {stocks.map(s => {
                  const up = s.change >= 0
                  return (
                    <div
                      key={s.ticker}
                      className="flex flex-col gap-3 rounded border-2 border-[#8b7355] bg-[#fffdf8] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-lg font-black">{s.ticker}</span>
                          <span className="text-xs text-[#6b5b45]">{s.name}</span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-baseline gap-2">
                          <span className="text-xl font-bold font-mono">{formatPrice(s)}</span>
                          <span className={`badge font-mono ${up ? 'badge-success' : 'badge-error'}`}>
                            {up ? '▲' : '▼'} {up ? '+' : ''}
                            {s.change.toFixed(s.ticker === 'BTC' ? 0 : 2)} ({up ? '+' : ''}
                            {s.changePct.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-t border-dashed border-[#c4b59a] pt-3 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0">
                        <MiniSpark series={s.series} stroke={up ? '#166534' : '#991b1b'} className="opacity-90" />
                        <span className="text-[10px] font-bold uppercase text-[#8b7355]">Exhibit sparkline</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <footer className="relative border-t-2 border-dashed border-[#bfa88a] pt-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-[#6b5b45]">Preparer signature</p>
                    <div className="mt-2 h-10 max-w-xs border-b-2 border-[#2c2416]/40 font-mono text-sm italic text-[#6b5b45]">___________________________</div>
                  </div>
                  <div>
                    <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-[#6b5b45]">Witness (you)</p>
                    <div className="mt-2 h-10 max-w-xs border-b-2 border-dashed border-[#991b1b]/50 font-mono text-xs text-[#991b1b]">✓ Observed on screen</div>
                  </div>
                </div>
                <div
                  className={`relative rotate-[-8deg] rounded-lg border-4 border-dashed border-warning bg-warning/20 px-4 py-3 text-center text-warning-content ${
                    stampPhase ? 'admin-stamp-pending' : 'opacity-0'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.25em]">Pending</span>
                  <span className="block text-sm font-black uppercase">Rubber soul</span>
                  <span className="mt-1 block text-[9px] opacity-80">No actual filing occurred</span>
                </div>
              </div>
              <p className="m-0 mt-6 text-center text-[10px] uppercase tracking-[0.4em] text-[#a89880]">
                This form is 100% decorative · Retain for amusement · Rev. π
              </p>
            </footer>
          </div>
        </div>
      </div>

      {selectedEmail && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg border-2 border-[#8b7355] bg-[#f7f0e4] font-mono text-sm text-[#2c2416] shadow-2xl">
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close exhibit" onClick={() => setSelectedEmail(null)}>
              ✕
            </button>
            <p className="m-0 text-[10px] font-bold uppercase tracking-widest text-[#6b5b45]">Exhibit A — full text</p>
            <h3 className="mt-2 text-lg font-bold leading-tight">{selectedEmail.subject}</h3>
            <p className="mt-1 text-xs text-[#6b5b45]">
              From: {selectedEmail.from.name} &lt;{selectedEmail.from.email}&gt; · {selectedEmail.time}
            </p>
            <div className="divider my-2 border-[#c4b59a]" />
            <pre className="max-h-[min(50vh,320px)] overflow-y-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#2c2416]">{selectedEmail.body}</pre>
            <div className="modal-action">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setSelectedEmail(null)}>
                Stamp as reviewed
              </button>
            </div>
          </div>
          <button type="button" className="modal-backdrop bg-neutral/60" aria-label="Close" onClick={() => setSelectedEmail(null)} />
        </dialog>
      )}
    </div>
  )
}
