import { usePersona } from '../context/PersonaContext'
import MiniSpark from '../components/MiniSpark'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function NoInternetLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div className="offline-crt-flicker relative min-h-dvh bg-[#c0c0c0] text-gray-900">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 3px)',
      }} aria-hidden />

      <header className="border-b-4 border-t-4 border-[#000080] bg-[#000080] px-3 py-2 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>📵</span>
            <div>
              <p className="m-0 font-mono text-[10px]">Offline Mail — cached mode</p>
              <h1 className="m-0 font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                No connection.exe
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="offline-blink-banner rounded border-2 border-white bg-red-600 px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
              DNS_PROBE_FINISHED
            </span>
            <button type="button" className="btn btn-xs border-white bg-gray-300 text-black hover:bg-white" onClick={onSwitchPersona}>
              Reconnect
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl p-3">
        <div className="mb-3 flex gap-2 border-2 border-gray-600 bg-gray-200 p-2 font-mono text-xs shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#808080]">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span className="offline-blink-banner text-red-700">Help (unavailable)</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="border-2 border-gray-600 bg-white p-2 shadow-[3px_3px_0_#555]">
              <p className="m-0 border-b border-gray-400 bg-[#000080] px-1 py-0.5 font-mono text-[10px] font-bold text-white">
                Inbox (offline copy)
              </p>
              <ul className="mt-1 max-h-[55vh] space-y-1 overflow-y-auto">
                {emails.map(e => {
                  const on = selectedEmail?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedEmail(e)}
                        className={`w-full px-1 py-1 text-left font-mono text-[11px] ${on ? 'bg-[#000080] text-white' : 'hover:bg-blue-100'}`}
                      >
                        {!e.read && <span className="text-red-600">● </span>}
                        {e.subject.slice(0, 36)}
                        {e.subject.length > 36 ? '…' : ''}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-6">
            <div className="border-2 border-gray-600 bg-white p-3 shadow-[3px_3px_0_#555]">
              {selectedEmail ? (
                <>
                  <p className="m-0 font-mono text-[10px] text-gray-500">From: {selectedEmail.from.name} · {selectedEmail.date}</p>
                  <h2 className="m-0 mt-1 font-mono text-sm font-bold">{selectedEmail.subject}</h2>
                  <div className="mt-3 max-h-[min(48vh,380px)] overflow-y-auto border-t border-dotted border-gray-400 pt-2 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                    {selectedEmail.body}
                  </div>
                  <p className="mt-2 font-mono text-[10px] text-gray-500">Images blocked · you have no internet</p>
                </>
              ) : (
                <p className="m-0 py-16 text-center font-mono text-sm text-gray-500">Select a message from the list</p>
              )}
            </div>
          </main>

          <aside className="space-y-3 lg:col-span-3">
            <div className="border-2 border-gray-600 bg-white p-2 shadow-[3px_3px_0_#555]">
              <p className="m-0 border-b border-gray-400 bg-teal-800 px-1 py-0.5 font-mono text-[10px] font-bold text-white">
                Window (real life)
              </p>
              <p className="mt-2 font-mono text-2xl">{weather.icon} {weather.temp}°C</p>
              <p className="font-mono text-[11px]">{weather.city} — stick your head out</p>
            </div>

            <div className="border-2 border-gray-600 bg-[#ffffcc] p-2 shadow-[3px_3px_0_#555]">
              <p className="m-0 font-mono text-[10px] font-bold">Newspaper clipping (stocks)</p>
              <ul className="mt-2 space-y-2">
                {stocks.map(s => (
                  <li key={s.ticker} className="flex items-center justify-between gap-1 font-mono text-[10px]">
                    <span>{s.ticker}</span>
                    <MiniSpark series={s.series} stroke="#1e3a5f" />
                    <span>{s.changePct > 0 ? '+' : ''}{s.changePct}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-gray-600 bg-white p-2 shadow-[3px_3px_0_#555]">
              <p className="m-0 border-b border-gray-400 bg-gray-700 px-1 py-0.5 font-mono text-[10px] font-bold text-white">
                Magazine pile (news)
              </p>
              <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto font-mono text-[10px]">
                {news.map(n => (
                  <li key={n.id}>{n.emoji} {n.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
