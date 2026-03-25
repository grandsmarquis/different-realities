import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const W = "'Tahoma', 'Arial', sans-serif"
const GRAY = '#c0c0c0'
const DARK = '#808080'
const LIGHT = '#ffffff'
const NAVY = '#000080'

const raised = {
  borderStyle: 'solid', borderWidth: 2,
  borderTopColor: LIGHT, borderLeftColor: LIGHT,
  borderBottomColor: DARK, borderRightColor: DARK,
}
const sunken = {
  borderStyle: 'solid', borderWidth: 2,
  borderTopColor: DARK, borderLeftColor: DARK,
  borderBottomColor: LIGHT, borderRightColor: LIGHT,
}
const deepSunken = {
  borderStyle: 'solid', borderWidth: 2,
  borderTopColor: '#404040', borderLeftColor: '#404040',
  borderBottomColor: '#dfdfdf', borderRightColor: '#dfdfdf',
}

function WinButton({ onClick, children, style = {}, small = false }) {
  const [active, setActive] = useState(false)
  return (
    <button
      type="button"
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      onClick={onClick}
      style={{
        background: GRAY, fontFamily: W, cursor: 'pointer', padding: small ? '1px 6px' : '3px 10px',
        fontSize: small ? '0.7rem' : '0.78rem', color: '#000',
        ...(active ? sunken : raised),
        ...style,
      }}
    >
      {children}
    </button>
  )
}

function TitleBar({ title, icon, onClose }) {
  return (
    <div style={{
      background: `linear-gradient(90deg, ${NAVY} 0%, #1084d0 85%, #6ab4f5 100%)`,
      padding: '3px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none',
    }}>
      <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, fontFamily: W, display: 'flex', alignItems: 'center', gap: 4 }}>
        {icon && <span style={{ fontSize: '0.9rem' }}>{icon}</span>} {title}
      </span>
      <div style={{ display: 'flex', gap: 2 }}>
        <WinButton small style={{ width: 17, height: 15, padding: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', lineHeight: 1, paddingBottom: 3, fontSize: '0.65rem' }}>_</WinButton>
        <WinButton small style={{ width: 17, height: 15, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>□</WinButton>
        {onClose && (
          <WinButton small onClick={onClose} style={{ width: 17, height: 15, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>✕</WinButton>
        )}
      </div>
    </div>
  )
}

function MenuBar() {
  return (
    <div style={{ background: GRAY, padding: '2px 4px', display: 'flex', gap: 0, borderBottom: `1px solid ${DARK}`, fontFamily: W, fontSize: '0.78rem' }}>
      {['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Message', 'Help'].map(m => (
        <span key={m} style={{ padding: '2px 8px', cursor: 'default' }}
          onMouseEnter={e => { e.target.style.background = NAVY; e.target.style.color = '#fff' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#000' }}
        >{m}</span>
      ))}
    </div>
  )
}

function ToolBar() {
  const tools = [
    { icon: '📝', label: 'New Mail' }, { icon: '↩', label: 'Reply' }, { icon: '↪', label: 'Forward' },
    null, { icon: '🖨', label: 'Print' }, { icon: '🗑', label: 'Delete' }, null, { icon: '📤', label: 'Send/Recv' },
  ]
  return (
    <div style={{ background: GRAY, padding: '2px 4px', display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${DARK}` }}>
      {tools.map((t, i) => t === null ? (
        <div key={i} style={{ width: 1, height: 24, background: DARK, margin: '0 4px' }} />
      ) : (
        <WinButton key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, padding: '2px 6px', minWidth: 44 }}>
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>{t.icon}</span>
          <span style={{ fontSize: '0.55rem' }}>{t.label}</span>
        </WinButton>
      ))}
    </div>
  )
}

const folders = [
  { id: 'inbox', icon: '📥', label: 'Inbox', count: emails.filter(e => !e.read).length },
  { id: 'outbox', icon: '📤', label: 'Outbox', count: 0 },
  { id: 'sent', icon: '📨', label: 'Sent Items', count: 0 },
  { id: 'deleted', icon: '🗑', label: 'Deleted Items', count: 0 },
  { id: 'drafts', icon: '📝', label: 'Drafts', count: 1 },
  null,
  { id: 'weather', icon: '🌤', label: 'Weather Update', count: 0 },
  { id: 'stocks', icon: '📈', label: 'Stock Ticker', count: 0 },
  { id: 'news', icon: '📰', label: 'News Feed', count: 0 },
]

function FolderTree({ active, onSelect }) {
  return (
    <div style={{ width: 180, flexShrink: 0, borderRight: `2px solid ${DARK}`, overflowY: 'auto', padding: '4px 0', fontFamily: W, fontSize: '0.78rem' }}>
      <div style={{ padding: '2px 8px 4px', fontWeight: 700, fontSize: '0.72rem', color: DARK }}>LOCAL FOLDERS</div>
      {folders.map((f, i) => f === null ? (
        <div key={i} style={{ height: 1, background: DARK, margin: '4px 0' }} />
      ) : (
        <div
          key={f.id}
          onClick={() => onSelect(f.id)}
          style={{
            padding: '3px 8px 3px 20px', cursor: 'default', display: 'flex', justifyContent: 'space-between',
            background: active === f.id ? NAVY : 'transparent',
            color: active === f.id ? '#fff' : '#000',
          }}
          onMouseEnter={e => { if (active !== f.id) { e.currentTarget.style.background = '#aaccff'; e.currentTarget.style.color = '#000' } }}
          onMouseLeave={e => { if (active !== f.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000' } }}
        >
          <span>{f.icon} {f.label}</span>
          {f.count > 0 && <span style={{ color: active === f.id ? '#ccddff' : NAVY, fontWeight: 700 }}>({f.count})</span>}
        </div>
      ))}
    </div>
  )
}

function EmailListRow({ email, active, onClick }) {
  return (
    <tr
      onClick={() => onClick(email)}
      style={{
        background: active ? NAVY : 'transparent',
        color: active ? '#fff' : '#000',
        cursor: 'default',
        fontWeight: email.read ? 400 : 700,
        fontFamily: W,
        fontSize: '0.78rem',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#aaccff' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <td style={{ padding: '2px 4px', width: 20, borderRight: `1px solid ${DARK}` }}>{!email.read ? '●' : ''}</td>
      <td style={{ padding: '2px 6px', borderRight: `1px solid ${DARK}` }}>{email.from.avatar} {email.from.name}</td>
      <td style={{ padding: '2px 6px', borderRight: `1px solid ${DARK}`, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.subject}</td>
      <td style={{ padding: '2px 6px', whiteSpace: 'nowrap' }}>{email.date}</td>
    </tr>
  )
}

function WeatherPane() {
  return (
    <div style={{ padding: 12, fontFamily: W, fontSize: '0.82rem' }}>
      <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 8, color: NAVY }}>🌤 Weather Update — {weather.city}</div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {[
            ['Condition', `${weather.icon} ${weather.condition}`],
            ['Temperature', `${weather.temp}°C (feels like ${weather.feels_like}°C)`],
            ['Humidity', `${weather.humidity}%`],
            ['Wind', `${weather.wind} km/h`],
          ].map(([k, v]) => (
            <tr key={k}>
              <td style={{ padding: '3px 12px 3px 0', color: DARK, fontWeight: 700, whiteSpace: 'nowrap' }}>{k}:</td>
              <td style={{ padding: '3px 0' }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12, fontWeight: 700, marginBottom: 4 }}>5-Day Forecast</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {weather.forecast.map(d => (
          <div key={d.day} style={{ ...deepSunken, background: '#e8e8e8', padding: '6px 10px', textAlign: 'center', minWidth: 50 }}>
            <div style={{ fontWeight: 700 }}>{d.day}</div>
            <div style={{ fontSize: '1.1rem' }}>{d.icon}</div>
            <div>{d.high}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StocksPane() {
  return (
    <div style={{ padding: 12, fontFamily: W, fontSize: '0.82rem' }}>
      <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 10, color: NAVY }}>📈 Stock Ticker — Live Data</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', ...deepSunken, background: '#000', color: '#00ff00', fontFamily: "'Courier New', monospace", fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #00aa00' }}>
            {['SYMBOL', 'PRICE', 'CHANGE', '%CHG', 'STATUS'].map(h => (
              <th key={h} style={{ padding: '4px 8px', textAlign: 'left', color: '#ffff00' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map(s => (
            <tr key={s.ticker} style={{ borderBottom: '1px solid #003300' }}>
              <td style={{ padding: '4px 8px', fontWeight: 700, color: '#00ffff' }}>{s.ticker}</td>
              <td style={{ padding: '4px 8px' }}>{s.currency}{s.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
              <td style={{ padding: '4px 8px', color: s.changePct >= 0 ? '#00ff00' : '#ff4444' }}>
                {s.changePct >= 0 ? '+' : ''}{s.change.toFixed(2)}
              </td>
              <td style={{ padding: '4px 8px', color: s.changePct >= 0 ? '#00ff00' : '#ff4444' }}>
                {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
              </td>
              <td style={{ padding: '4px 8px', color: s.changePct >= 0 ? '#00ff00' : '#ff4444' }}>
                {s.changePct >= 0 ? '▲ UP' : '▼ DOWN'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 8, color: DARK, fontSize: '0.7rem' }}>Data delayed 15 minutes. Not financial advice.</p>
    </div>
  )
}

function NewsPane() {
  return (
    <div style={{ padding: 12, fontFamily: W, fontSize: '0.82rem' }}>
      <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 8, color: NAVY }}>📰 News Feed — Today's Headlines</div>
      {news.map((n, i) => (
        <div key={n.id} style={{ ...deepSunken, background: i % 2 === 0 ? '#f0f0f0' : '#e8e8e8', padding: '6px 8px', marginBottom: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: '0.78rem', color: NAVY }}>[{n.category.toUpperCase()}]</span>
            <span style={{ fontSize: '0.68rem', color: DARK }}>{n.source} — {n.time}</span>
          </div>
          <p style={{ margin: '3px 0 0', lineHeight: 1.4 }}>{n.emoji} {n.title}</p>
        </div>
      ))}
    </div>
  )
}

function PreviewPane({ email }) {
  if (!email) return (
    <div style={{ flex: 1, padding: 12, fontFamily: W, fontSize: '0.82rem', color: DARK, ...deepSunken, background: '#ffffff' }}>
      Select a message to preview it here.
    </div>
  )
  return (
    <div style={{ flex: 1, ...deepSunken, background: '#ffffff', padding: 12, overflowY: 'auto', fontFamily: W }}>
      <div style={{ borderBottom: `1px solid ${DARK}`, paddingBottom: 8, marginBottom: 8, fontSize: '0.78rem' }}>
        <div><strong>From:</strong> {email.from.name} &lt;{email.from.email}&gt;</div>
        <div><strong>Subject:</strong> {email.subject}</div>
        <div><strong>Date:</strong> {email.date}</div>
      </div>
      <pre style={{ fontFamily: W, fontSize: '0.82rem', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>{email.body}</pre>
    </div>
  )
}

export default function Win98Layout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [showEmail, setShowEmail] = useState(null)
  const [time] = useState(() => new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }))

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#008080', display: 'flex', flexDirection: 'column', fontFamily: W }}>
      {/* Desktop area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: 8 }}>
        {/* My Computer / Desktop icons */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {[{ icon: '💻', label: 'My Computer' }, { icon: '🌐', label: 'Internet Explorer' }, { icon: '🗑', label: 'Recycle Bin' }].map(item => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'default', userSelect: 'none' }}
              onMouseEnter={e => { e.currentTarget.querySelector('span:last-child').style.background = NAVY; e.currentTarget.querySelector('span:last-child').style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.querySelector('span:last-child').style.background = 'transparent'; e.currentTarget.querySelector('span:last-child').style.color = '#fff' }}
            >
              <span style={{ fontSize: '2rem', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: '0.68rem', color: '#fff', textShadow: '1px 1px 1px #000, -1px -1px 1px #000', padding: '0 2px' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Outlook Express window — fills the desktop */}
        <div style={{
          position: 'absolute', inset: 0, margin: 8,
          ...raised, background: GRAY, display: 'flex', flexDirection: 'column',
        }}>
          <TitleBar title="Outlook Express — Main Identity" icon="📧" onClose={onSwitchPersona} />
          <MenuBar />
          <ToolBar />

          {/* Address bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 4px', background: GRAY, borderBottom: `1px solid ${DARK}`, fontSize: '0.75rem', fontFamily: W }}>
            <span style={{ color: DARK }}>Folder:</span>
            <div style={{ flex: 1, ...sunken, background: '#fff', padding: '1px 4px', fontSize: '0.75rem' }}>
              Local Folders/{folders.find(f => f && f.id === activeFolder)?.label || 'Inbox'}
            </div>
          </div>

          {/* 3-pane body */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <FolderTree active={activeFolder} onSelect={id => { setActiveFolder(id); setSelectedEmail(null) }} />

            {/* Right pane */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {activeFolder === 'weather' ? (
                <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}><WeatherPane /></div>
              ) : activeFolder === 'stocks' ? (
                <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}><StocksPane /></div>
              ) : activeFolder === 'news' ? (
                <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}><NewsPane /></div>
              ) : (
                <>
                  {/* Email list */}
                  <div style={{ flex: '0 0 auto', maxHeight: '50%', overflowY: 'auto', ...deepSunken, background: '#fff' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: GRAY, borderBottom: `2px solid ${DARK}`, position: 'sticky', top: 0 }}>
                          {['!', 'From', 'Subject', 'Received'].map(h => (
                            <th key={h} style={{ ...raised, padding: '2px 6px', textAlign: 'left', fontSize: '0.75rem', fontFamily: W, cursor: 'default', background: GRAY, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(activeFolder === 'inbox' ? emails : []).map(email => (
                          <EmailListRow key={email.id} email={email} active={selectedEmail?.id === email.id} onClick={setSelectedEmail} />
                        ))}
                        {activeFolder !== 'inbox' && (
                          <tr><td colSpan={4} style={{ padding: 12, color: DARK, fontFamily: W, fontSize: '0.78rem' }}>No items to display.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 4, background: GRAY, ...raised, cursor: 'row-resize', flexShrink: 0 }} />

                  {/* Preview pane */}
                  <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    <PreviewPane email={selectedEmail} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Status bar */}
          <div style={{ padding: '2px 8px', borderTop: `1px solid ${DARK}`, fontSize: '0.7rem', fontFamily: W, color: DARK, display: 'flex', gap: 16, background: GRAY }}>
            <span>{activeFolder === 'inbox' ? `${emails.length} message(s), ${emails.filter(e => !e.read).length} unread` : 'Ready'}</span>
            <span style={{ marginLeft: 'auto' }}>Connected</span>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div style={{ height: 32, background: GRAY, ...raised, display: 'flex', alignItems: 'center', gap: 4, padding: '0 4px', flexShrink: 0 }}>
        <WinButton onClick={onSwitchPersona} style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, height: 24 }}>
          <span style={{ fontSize: '1rem' }}>⊞</span> Start
        </WinButton>
        <div style={{ width: 1, height: 24, background: DARK, margin: '0 2px' }} />
        <WinButton style={{ height: 24, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', maxWidth: 200 }}>
          <span>📧</span> Outlook Express
        </WinButton>
        <div style={{ flex: 1 }} />
        {/* System tray */}
        <div style={{ ...sunken, padding: '1px 8px', display: 'flex', alignItems: 'center', gap: 8, height: 24, fontSize: '0.72rem', background: GRAY }}>
          <span>🔊</span>
          <span>🌐</span>
          <span style={{ fontWeight: 700 }}>{time}</span>
        </div>
      </div>

      {/* Email dialog popup */}
      {showEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,128,0.3)' }}>
          <div style={{ width: 540, ...raised, background: GRAY }}>
            <TitleBar title={showEmail.subject} icon="📧" onClose={() => setShowEmail(null)} />
            <div style={{ padding: 8 }}>
              <div style={{ ...deepSunken, background: '#fff', padding: 12, maxHeight: 400, overflowY: 'auto' }}>
                <div style={{ borderBottom: `1px solid ${DARK}`, paddingBottom: 8, marginBottom: 8, fontSize: '0.78rem', fontFamily: W }}>
                  <div><strong>From:</strong> {showEmail.from.name} &lt;{showEmail.from.email}&gt;</div>
                  <div><strong>Subject:</strong> {showEmail.subject}</div>
                  <div><strong>Date:</strong> {showEmail.date}</div>
                </div>
                <pre style={{ fontFamily: W, fontSize: '0.82rem', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>{showEmail.body}</pre>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                <WinButton onClick={() => setShowEmail(null)}>Reply</WinButton>
                <WinButton onClick={() => setShowEmail(null)}>Close</WinButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
