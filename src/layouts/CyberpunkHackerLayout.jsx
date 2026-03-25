import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function asciiBar(pct, total = 20) {
  const filled = Math.round(Math.abs(pct) * total / 5)
  return '█'.repeat(Math.min(filled, total)) + '░'.repeat(Math.max(0, total - filled))
}

function TerminalWeather() {
  return (
    <pre style={{ fontFamily: 'var(--font-main)', fontSize: '0.75rem', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
{`$ curl wttr.in/${weather.city.toLowerCase()}
┌──────────────────────────┐
│ ${weather.city.padEnd(24)} │
│ ${weather.icon} ${String(weather.temp).padEnd(3)}°C ${weather.condition.slice(0,14).padEnd(14)} │
│ 💧${weather.humidity}%  💨${weather.wind}km/h          │
├──────────────────────────┤
${weather.forecast.map(d => `│ ${d.day}   ${d.icon}  ↑${d.high}°             │`).join('\n')}
└──────────────────────────┘`}
    </pre>
  )
}

function AsciiStocks() {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent2)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
        MARKET_DATA.SH --live
      </p>
      {stocks.map(s => (
        <div key={s.ticker} style={{ marginBottom: '0.35rem', fontFamily: 'var(--font-main)', fontSize: '0.72rem' }}>
          <span style={{ color: 'var(--accent2)', display: 'inline-block', width: 52 }}>{s.ticker}</span>
          <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#ff0066' }}>
            {asciiBar(s.changePct)}
          </span>
          <span style={{ color: s.changePct >= 0 ? 'var(--accent)' : '#ff0066', marginLeft: 6 }}>
            {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  )
}

function LogNews() {
  return (
    <div style={{ maxHeight: 240, overflowY: 'auto' }}>
      {news.map((n, i) => (
        <div key={n.id} style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-main)', fontSize: '0.72rem', lineHeight: 1.4 }}>
          <span style={{ color: 'var(--text2)' }}>
            {'[2026-03-25T0'}{ String(9 - i).padStart(1, '0') }:{'1'}{ i }:00Z]{'  '}
          </span>
          <span style={{ color: 'var(--accent2)' }}>{n.category.toUpperCase()}</span>
          <span style={{ color: 'var(--text2)' }}> :: </span>
          <span style={{ color: 'var(--text)' }}>{n.title}</span>
        </div>
      ))}
    </div>
  )
}

function EmailModal({ email, onClose }) {
  if (!email) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto border-2 p-6"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)', fontFamily: 'var(--font-main)', fontSize: '0.82rem' }}
        onClick={e => e.stopPropagation()}
      >
        <p style={{ color: 'var(--accent2)', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
          $ cat /var/mail/{email.from.name.toLowerCase().replace(/\s/g, '_')}.txt
        </p>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
          <p><span style={{ color: 'var(--text2)' }}>From:    </span><span style={{ color: 'var(--accent)' }}>{email.from.email}</span></p>
          <p><span style={{ color: 'var(--text2)' }}>Subject: </span><span style={{ color: 'var(--text)' }}>{email.subject}</span></p>
          <p><span style={{ color: 'var(--text2)' }}>Date:    </span><span style={{ color: 'var(--text)' }}>{email.date}</span></p>
        </div>
        <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text)', lineHeight: 1.8 }}>{email.body}</pre>
        <p style={{ marginTop: '1rem', color: 'var(--text2)', fontSize: '0.7rem' }}>Press [Q] to quit</p>
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: '0.5rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.78rem' }}
        >
          {'>'} exit_
        </button>
      </div>
    </div>
  )
}

export default function CyberpunkHackerLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [cmd, setCmd] = useState('')

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      {/* Scan-line overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]" aria-hidden
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff41 2px, #00ff41 3px)', backgroundSize: '100% 3px' }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between border-b-2 px-6 py-2" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--accent2)', letterSpacing: '0.2em' }}>NEXUS-TERMINAL </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>v3.7.2 // user@darkweb</span>
        </div>
        <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--text2)' }}>
          <span>CPU: <span style={{ color: 'var(--accent)' }}>42%</span></span>
          <span>MEM: <span style={{ color: 'var(--accent)' }}>6.2G</span></span>
          <span>NET: <span style={{ color: 'var(--accent3)' }}>↑ 1.2MB/s</span></span>
          <button type="button" onClick={onSwitchPersona} style={{ color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '2px 10px', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
            [LOGOUT]
          </button>
        </div>
      </div>

      <div className="relative z-10 flex" style={{ height: 'calc(100vh - 42px)' }}>
        {/* Left sidebar */}
        <div className="flex flex-col gap-6 overflow-y-auto border-r-2 p-4" style={{ width: 280, borderColor: 'var(--border)', flexShrink: 0 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>SYSTEM_STATUS</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>
              {'['}✓{']'} VPN: active<br />
              {'['}✓{']'} TOR: routing<br />
              {'['}!{']'} Firewall: 3 probes blocked<br />
              {'['}✓{']'} Inbox: {emails.filter(e => !e.read).length} unread
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>WEATHER_DAEMON</p>
            <TerminalWeather />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>MARKET_FEED</p>
            <AsciiStocks />
          </div>
        </div>

        {/* Main terminal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--text2)', marginBottom: '0.75rem' }}>
              user@nexus:~$ ./inbox.sh --list --sort=date
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text2)', marginBottom: '1rem', fontFamily: 'var(--font-main)' }}>
              {'total ' + emails.length + ' messages · ' + emails.filter(e => !e.read).length + ' unread'}
            </p>
            {/* Table header */}
            <div className="flex gap-3 border-b py-1 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text2)', fontFamily: 'var(--font-main)' }}>
              <span style={{ width: 16 }}>⚑</span>
              <span style={{ width: 32 }}>PERM</span>
              <span style={{ width: 140 }}>FROM</span>
              <span className="flex-1">SUBJECT</span>
              <span style={{ width: 70 }}>DATE</span>
            </div>
            {emails.map(email => (
              <button
                key={email.id}
                type="button"
                onClick={() => setSelectedEmail(email)}
                className="flex w-full items-center gap-3 border-b py-2 text-left text-xs transition-colors duration-100"
                style={{
                  borderColor: 'var(--border)',
                  fontFamily: 'var(--font-main)',
                  background: selectedEmail?.id === email.id ? 'var(--bg2)' : 'transparent',
                  color: email.read ? 'var(--text2)' : 'var(--accent)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = selectedEmail?.id === email.id ? 'var(--bg2)' : 'transparent' }}
              >
                <span style={{ width: 16, color: email.starred ? 'var(--accent2)' : 'var(--border)' }}>{email.starred ? '★' : '·'}</span>
                <span style={{ width: 32, color: 'var(--text2)' }}>{email.read ? '-rw-' : '-rw!'}</span>
                <span style={{ width: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.from.email}</span>
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{email.subject}</span>
                <span style={{ width: 70, color: 'var(--text2)' }}>{email.time}</span>
              </button>
            ))}
          </div>

          {/* Command bar */}
          <div className="flex items-center gap-2 border-t-2 p-3" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{'>'}</span>
            <input
              value={cmd}
              onChange={e => setCmd(e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--accent)', fontFamily: 'var(--font-main)', fontSize: '0.8rem', caretColor: 'var(--accent)' }}
              placeholder="enter command..."
            />
            <span className="text-xs" style={{ color: 'var(--text2)' }}>ESC to quit</span>
          </div>

          {/* Log news strip */}
          <div className="border-t p-4" style={{ borderColor: 'var(--border)', maxHeight: 170, overflowY: 'auto' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent2)', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              $ tail -f /var/log/world.log
            </p>
            <LogNews />
          </div>
        </div>
      </div>

      <EmailModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
