import { useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

const glass = (extra = {}) => ({
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.25)',
  ...extra,
})

const glassWhite = (extra = {}) => ({
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.3)',
  ...extra,
})

function VistaWindowChrome({ title, icon, onClose, children, style = {} }) {
  return (
    <div style={{
      borderRadius: 8, overflow: 'hidden',
      boxShadow: '0 12px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15)',
      ...glass(), ...style,
    }}>
      {/* Aero title bar */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 60%, rgba(0,0,0,0.1) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        padding: '6px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        userSelect: 'none',
      }}>
        {/* Colored accent line at very top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #4fb3e8, #2a7dd4, #70c8a8)' }} />
        <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {icon && <span>{icon}</span>} {title}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* Minimize/Max/Close — Aero orb style */}
          {[
            { color: 'rgba(255,255,255,0.3)', hover: 'rgba(255,255,255,0.5)', symbol: '−' },
            { color: 'rgba(255,255,255,0.3)', hover: 'rgba(255,255,255,0.5)', symbol: '□' },
            { color: 'rgba(220,50,50,0.7)', hover: 'rgba(220,50,50,1)', symbol: '✕', onClick: onClose },
          ].map((btn, i) => (
            <button key={i} type="button" onClick={btn.onClick}
              style={{ width: 20, height: 20, borderRadius: '50%', background: btn.color, border: '1px solid rgba(255,255,255,0.3)', cursor: btn.onClick ? 'pointer' : 'default', color: '#fff', fontSize: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              onMouseEnter={e => { e.currentTarget.style.background = btn.hover }}
              onMouseLeave={e => { e.currentTarget.style.background = btn.color }}
            >{btn.symbol}</button>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

function SidebarGadget({ title, children }) {
  return (
    <div style={{
      borderRadius: 10, overflow: 'hidden',
      ...glassWhite(),
      boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
    }}>
      <div style={{
        padding: '6px 10px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.06)',
      }}>
        {title}
      </div>
      <div style={{ padding: '10px' }}>
        {children}
      </div>
    </div>
  )
}

function EmailRow({ email, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(email)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', padding: '8px 12px',
        background: active ? 'rgba(79,179,232,0.3)' : 'transparent',
        border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-main)',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: 2 }}>{email.from.avatar}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: email.read ? 400 : 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {email.subject}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', flexShrink: 0, fontWeight: 300 }}>{email.time}</span>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{email.from.name}</span>
        {!email.read && (
          <div style={{ display: 'inline-block', marginLeft: 8, width: 6, height: 6, borderRadius: '50%', background: '#4fb3e8', verticalAlign: 'middle', boxShadow: '0 0 6px #4fb3e8' }} />
        )}
      </div>
    </button>
  )
}

function VistaModal({ email, onClose }) {
  if (!email) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        style={{ maxWidth: 540, width: '100%', position: 'relative', maxHeight: '80vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <VistaWindowChrome title={email.subject} icon="📧" onClose={onClose} style={{ position: 'relative' }}>
          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '2.5rem' }}>{email.from.avatar}</span>
              <div>
                <p style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{email.from.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>{email.from.email}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem' }}>{email.date}</p>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', whiteSpace: 'pre-line', fontWeight: 300 }}>
              {email.body}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: '1rem', justifyContent: 'flex-end' }}>
              {['Reply', 'Forward', 'Delete'].map(btn => (
                <button key={btn} type="button" onClick={btn === 'Delete' ? onClose : undefined}
                  style={{
                    ...glassWhite(), color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6,
                    padding: '5px 14px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.78rem', fontWeight: 500,
                  }}
                >{btn}</button>
              ))}
            </div>
          </div>
        </VistaWindowChrome>
      </div>
    </div>
  )
}

export default function VistaLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [time] = useState(() => new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }))
  const [date] = useState(() => new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }))

  return (
    <div style={{
      position: 'fixed', inset: 0, fontFamily: 'var(--font-main)',
      background: `
        radial-gradient(ellipse at 50% 90%, rgba(20,100,60,0.35) 0%, transparent 55%),
        radial-gradient(ellipse at 80% 20%, rgba(42,125,212,0.25) 0%, transparent 50%),
        linear-gradient(180deg, #12203d 0%, #162b55 30%, #0e1e3a 65%, #0a1628 100%)
      `,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Topmost: accent shimmer line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #4fb3e8, #2a7dd4, #70c8a8, #2a7dd4, #4fb3e8)', flexShrink: 0 }} />

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden', padding: '12px' }}>
        {/* Inbox window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: 12, minWidth: 0, position: 'relative' }}>
          <VistaWindowChrome
            title="Windows Mail — Inbox"
            icon="📧"
            onClose={onSwitchPersona}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%' }}
          >
            {/* Search bar */}
            <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.12)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ flex: 1, ...glass({ borderRadius: 20, padding: '4px 12px' }), fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                🔍 Search mail...
              </div>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem' }}>
                {emails.filter(e => !e.read).length} unread
              </span>
            </div>

            {/* Email list */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {emails.map(email => (
                <EmailRow key={email.id} email={email} active={selectedEmail?.id === email.id} onClick={setSelectedEmail} />
              ))}
            </div>
          </VistaWindowChrome>
        </div>

        {/* Windows Sidebar */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
          {/* Clock gadget */}
          <SidebarGadget title="🕐 Clock">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 300, color: '#fff', lineHeight: 1, textShadow: '0 0 20px rgba(79,179,232,0.5)' }}>{time}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 300 }}>{date}</div>
            </div>
          </SidebarGadget>

          {/* Weather gadget */}
          <SidebarGadget title={`🌤 Weather — ${weather.city}`}>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{weather.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 300, color: '#fff', marginTop: 4 }}>{weather.temp}°C</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{weather.condition}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                💧 {weather.humidity}% · 💨 {weather.wind}km/h
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {weather.forecast.map(d => (
                <div key={d.day} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>{d.day}</div>
                  <div style={{ fontSize: '0.9rem' }}>{d.icon}</div>
                  <div style={{ fontSize: '0.62rem', color: '#fff' }}>{d.high}°</div>
                </div>
              ))}
            </div>
          </SidebarGadget>

          {/* Stocks gadget */}
          <SidebarGadget title="📈 Stocks">
            {stocks.map(s => (
              <div key={s.ticker} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#fff' }}>{s.ticker}</span>
                  <span style={{ fontSize: '0.68rem', color: s.changePct >= 0 ? '#70c8a8' : '#ff7070', fontWeight: 500 }}>
                    {s.changePct >= 0 ? '▲' : '▼'}{Math.abs(s.changePct).toFixed(2)}%
                  </span>
                </div>
                <div style={{ height: 28 }}>
                  <ResponsiveContainer width="100%" height={28} debounce={50}>
                    <LineChart data={s.series.map((v, i) => ({ v, i }))}>
                      <Line type="monotone" dataKey="v" stroke={s.changePct >= 0 ? '#70c8a8' : '#ff7070'} dot={false} strokeWidth={1.5} isAnimationActive={false} />
                      <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 10, borderRadius: 4 }} formatter={v => [`${s.currency}${Number(v).toFixed(2)}`, '']} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </SidebarGadget>

          {/* News gadget */}
          <SidebarGadget title="📰 Headlines">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {news.slice(0, 4).map(n => (
                <div key={n.id} style={{ borderLeft: '2px solid rgba(79,179,232,0.5)', paddingLeft: 6 }}>
                  <p style={{ fontSize: '0.7rem', color: '#fff', lineHeight: 1.35, fontWeight: 400, margin: 0 }}>{n.title.slice(0, 55)}{n.title.length > 55 ? '…' : ''}</p>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginTop: 2, fontWeight: 300 }}>{n.source} · {n.time}</p>
                </div>
              ))}
            </div>
          </SidebarGadget>
        </div>
      </div>

      {/* Aero taskbar */}
      <div style={{
        height: 44, flexShrink: 0,
        ...glass({ borderRadius: 0, background: 'rgba(0,20,60,0.65)', borderTop: '1px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }),
        display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px',
      }}>
        {/* Start orb */}
        <button type="button" onClick={onSwitchPersona}
          style={{
            width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.3)',
            background: 'radial-gradient(circle at 40% 35%, #70d4f0 0%, #2a7dd4 40%, #1a4d8c 70%, #0a2855 100%)',
            boxShadow: '0 0 16px rgba(79,179,232,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
          }}>
          ⊞
        </button>

        <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)', margin: '0 2px' }} />

        {/* Open window */}
        <button type="button" style={{
          ...glassWhite({ borderRadius: 6, padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)' }),
          color: '#fff', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'var(--font-main)', fontWeight: 400,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>📧</span> Windows Mail
        </button>

        <div style={{ flex: 1 }} />

        {/* System tray */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px', ...glass({ borderRadius: 20, padding: '4px 12px' }) }}>
          <span style={{ fontSize: '0.8rem' }}>🔊</span>
          <span style={{ fontSize: '0.8rem' }}>📶</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 500, lineHeight: 1.2 }}>{time}</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.2 }}>{date.split(',')[0]}</div>
          </div>
        </div>
      </div>

      <VistaModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
    </div>
  )
}
