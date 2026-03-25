import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

export default function ElderA11yLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()

  return (
    <div
      className="min-h-screen bg-base-100 text-base-content"
      style={{ fontFamily: 'var(--font-main)' }}
    >
      <header className="border-b-4 border-base-content bg-base-200 px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Your mail</h1>
            <p className="mt-2 text-lg text-base-content/80">Large text. Strong borders. Plain words.</p>
          </div>
          <button type="button" className="btn btn-lg btn-primary min-h-[3.5rem] px-8 text-lg" onClick={onSwitchPersona}>
            Choose another style
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold border-b-4 border-base-content pb-2">Messages</h2>
          <ul className="space-y-4">
            {emails.map(email => (
              <li key={email.id}>
                <button
                  type="button"
                  onClick={() => setSelectedEmail(email)}
                  className="card card-bordered w-full border-4 border-base-content bg-base-100 text-left shadow-none transition hover:bg-base-200"
                >
                  <div className="card-body gap-3 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-4xl" aria-hidden>
                        {email.from.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xl font-bold leading-snug sm:text-2xl">{email.subject}</p>
                        <p className="mt-2 text-lg leading-relaxed text-base-content/85">{email.preview}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-base-content/20 pt-4 text-lg">
                      <span className="font-semibold">From: {email.from.name}</span>
                      <span>{email.date}</span>
                      {!email.read && <span className="badge badge-lg badge-error gap-2 text-lg">New</span>}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="card card-bordered border-4 border-base-content bg-base-200">
            <div className="card-body p-6">
              <h3 className="card-title text-2xl">Weather today</h3>
              <p className="text-4xl font-bold">
                {weather.icon} {weather.temp}°
              </p>
              <p className="text-xl">{weather.condition}</p>
              <p className="text-lg text-base-content/80">{weather.city}</p>
            </div>
          </div>
          <div className="card card-bordered border-4 border-base-content bg-base-200">
            <div className="card-body p-6">
              <h3 className="card-title text-2xl">Headline</h3>
              <p className="text-xl leading-relaxed">{news[0]?.emoji} {news[0]?.title}</p>
            </div>
          </div>
        </section>

        <section className="card card-bordered border-4 border-base-content">
          <div className="card-body p-6">
            <h3 className="card-title text-2xl">Stock prices</h3>
            <ul className="mt-4 space-y-3 text-xl">
              {stocks.map(s => (
                <li key={s.ticker} className="flex justify-between border-b-2 border-base-content/15 pb-2">
                  <span className="font-bold">{s.ticker}</span>
                  <span>
                    {s.currency}
                    {s.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedEmail(null)}>
          <div
            className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto border-4 border-base-content bg-base-100 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="card-body gap-4 p-6 sm:p-10">
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{selectedEmail.subject}</h2>
              <p className="text-xl font-semibold">From {selectedEmail.from.name}</p>
              <p className="text-lg text-base-content/80">{selectedEmail.date}</p>
              <div className="divider border-base-content text-lg">Message</div>
              <pre className="whitespace-pre-wrap font-sans text-xl leading-relaxed">{selectedEmail.body}</pre>
              <button type="button" className="btn btn-primary btn-lg mt-4 min-h-[3.5rem] w-full text-xl" onClick={() => setSelectedEmail(null)}>
                Close message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
