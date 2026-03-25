import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function DoctorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const unread = emails.filter(e => !e.read).length

  return (
    <div className="doctor-clinic-bg min-h-dvh text-slate-800">
      <div className="doctor-ecg-strip border-b-2 border-teal-600/40 bg-white/90" aria-hidden>
        <svg className="doctor-ecg-line h-8 w-full" viewBox="0 0 400 32" preserveAspectRatio="none">
          <path
            d="M0 16 H40 L48 8 L56 24 L64 16 H120 L128 4 L136 28 L144 16 H200 L208 10 L216 22 L224 16 H280 L288 6 L296 26 L304 16 H400"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <header className="border-b border-teal-200 bg-white/95 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-[0.35em] text-teal-600">Rounds · digital chart</p>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              ⚕️ Inbox — {unread} pending review
            </h1>
          </div>
          <button type="button" className="btn btn-sm btn-outline border-teal-600 text-teal-800 hover:bg-teal-50" onClick={onSwitchPersona}>
            End shift
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 px-3 py-5 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-teal-700">Patient messages</p>
          <ul className="space-y-2">
            {emails.map(e => {
              const on = selectedEmail?.id === e.id
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(e)}
                    className={`w-full rounded-box border-l-4 p-3 text-left shadow-sm transition-all ${
                      on ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg">{e.from.avatar}</span>
                      {!e.read && <span className="badge badge-error badge-xs">STAT</span>}
                    </div>
                    <p className={`mt-1 line-clamp-2 text-xs ${e.read ? 'text-slate-500' : 'font-semibold text-slate-900'}`}>{e.subject}</p>
                    <p className="m-0 text-[10px] text-slate-400">{e.from.name}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="lg:col-span-6">
          {selectedEmail ? (
            <div className="card card-border border-teal-200 bg-base-100 shadow-md">
              <div className="card-body gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-outline border-teal-500 text-teal-800">SOAP note</span>
                  <span className="text-xs text-slate-500">{selectedEmail.date}</span>
                </div>
                <h2 className="card-title text-lg text-slate-900">{selectedEmail.subject}</h2>
                <p className="text-sm text-teal-700">Referring: {selectedEmail.from.name}</p>
                <div className="max-h-[min(50vh,420px)] overflow-y-auto rounded-lg bg-slate-50/80 p-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
                  {selectedEmail.body}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[280px] items-center justify-center rounded-box border-2 border-dashed border-teal-200 bg-white/60 text-slate-400">
              Select a message to open chart
            </div>
          )}
        </main>

        <aside className="space-y-4 lg:col-span-3">
          <div className="card bg-gradient-to-br from-sky-50 to-white shadow-sm border border-sky-100">
            <div className="card-body p-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-sky-800">Ambient rounds</h3>
              <p className="mt-2 text-2xl font-bold text-sky-900">
                {weather.icon} {weather.temp}°C
              </p>
              <p className="text-xs text-sky-700">{weather.city} — {weather.condition}</p>
              <p className="mt-2 text-[10px] text-sky-600">Hydration advisory: wind {weather.wind} km/h</p>
            </div>
          </div>

          <div className="card border border-slate-200 bg-white shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Market vitals</h3>
              <ul className="mt-2 space-y-3">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 last:border-0">
                    <div>
                      <span className="font-mono text-sm font-bold">{s.ticker}</span>
                      <p className="m-0 text-[10px] text-slate-500">{s.name}</p>
                    </div>
                    <div className="text-right">
                      <MiniSpark series={s.series} stroke={s.changePct >= 0 ? '#0d9488' : '#e11d48'} />
                      <span className={s.changePct >= 0 ? 'text-teal-600' : 'text-rose-600'}>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card border border-indigo-100 bg-indigo-50/50 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900">Journal club</h3>
              <ul className="mt-2 space-y-2 text-xs text-indigo-950">
                {news.map(n => (
                  <li key={n.id} className="border-l-2 border-indigo-400 pl-2">
                    {n.emoji} {n.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
