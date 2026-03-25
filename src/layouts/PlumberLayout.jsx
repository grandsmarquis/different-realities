import { useState, useEffect, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const tagPipe = t => ({
  work: { label: 'MAIN LINE', color: '#00d4ff' },
  personal: { label: 'HOME SUPPLY', color: '#4caf50' },
  finance: { label: 'PRESSURE LINE', color: '#ff6b00' },
  promo: { label: 'WASTE PIPE', color: '#ff4444' },
  newsletter: { label: 'VENT STACK', color: '#888' },
  social: { label: 'HOT WATER', color: '#ff8c00' },
}[t] || { label: 'UNKNOWN PIPE', color: '#888' })

const plumberTips = [
  'Pro tip: Always shut the valve before opening an email from the bank.',
  'Remember: Hot pipes on the left, cold on the right.',
  'Unread emails create pressure buildup. Flush regularly!',
  'Inbox full? Time to snake the drain, boss.',
  'Never mix work emails with personal — cross-contamination risk!',
]

export default function PlumberLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [pressure, setPressure] = useState(42)
  const [flowing, setFlowing] = useState({})
  const [tipIdx, setTipIdx] = useState(0)
  const [valveOpen, setValveOpen] = useState(true)
  const animRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPressure(p => {
        const drift = (Math.random() - 0.5) * 6
        return Math.max(10, Math.min(99, p + drift))
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIdx(t => (t + 1) % plumberTips.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  function handleEmailClick(email) {
    setFlowing(f => ({ ...f, [email.id]: true }))
    setTimeout(() => setFlowing(f => { const n = { ...f }; delete n[email.id]; return n }), 600)
    setSelectedEmail(email)
  }

  const unread = emails.filter(e => !e.read).length
  const pressureColor = pressure > 80 ? '#ff4444' : pressure > 60 ? '#ff8c00' : '#00d4ff'

  return (
    <div className="min-h-screen" style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-main)',
    }}>
      <style>{`
        @keyframes flowRight {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes drip {
          0% { transform: translateY(0) scaleY(1); opacity: 1; }
          70% { transform: translateY(20px) scaleY(1.5); opacity: 0.8; }
          100% { transform: translateY(30px) scaleY(0.8); opacity: 0; }
        }
        @keyframes pressurePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(0,212,255,0.3); }
          50% { box-shadow: 0 0 20px rgba(0,212,255,0.6); }
        }
        @keyframes pipeBubble {
          0% { transform: translateX(-20px) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100% + 20px)) translateY(0); opacity: 0; }
        }
        @keyframes gaugeNeedle {
          0% { transform-origin: bottom center; }
        }
        @keyframes wrenchSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .flow-bubble {
          animation: pipeBubble 0.6s ease-in-out forwards;
        }
        .pressure-glow { animation: pressurePulse 2s ease-in-out infinite; }
        .wrench-spin { animation: wrenchSpin 2s linear infinite; }
        .blink-anim { animation: blink 1s step-end infinite; }
        .pipe-h {
          height: 20px;
          background: linear-gradient(180deg, #1a3040 0%, #0d2030 40%, #1a3040 100%);
          border-top: 2px solid #2a4a60;
          border-bottom: 2px solid #0a1520;
          position: relative;
          overflow: hidden;
        }
        .pipe-v {
          width: 20px;
          background: linear-gradient(90deg, #1a3040 0%, #0d2030 40%, #1a3040 100%);
          border-left: 2px solid #2a4a60;
          border-right: 2px solid #0a1520;
        }
      `}</style>

      {/* Top pipe header */}
      <div style={{
        background: 'linear-gradient(180deg, #1e2a32 0%, #162028 100%)',
        borderBottom: '3px solid #1e4050',
        padding: '1.25rem 2rem',
        position: 'relative',
      }}>
        {/* Horizontal pipe along top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(180deg, #2a5070, #1a3a52, #2a5070)', borderBottom: '1px solid #0a2030' }} />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* Wrench icon */}
            <div style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 8px rgba(255,107,0,0.5))' }}>🔧</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 2 }}>
                CERTIFIED MASTER PLUMBER · LICENSE #PL-4829
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                color: 'var(--text)',
                lineHeight: 1.2,
              }}>
                INBOX PIPE SYSTEM v2.6
              </h1>
              <p style={{ color: 'var(--text2)', fontSize: '0.8rem', marginTop: 2 }}>
                {unread} messages backed up · {emails.length} total in pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Pressure gauge */}
            <div className="pressure-glow" style={{
              background: '#0d2030',
              border: `2px solid ${pressureColor}`,
              borderRadius: 8,
              padding: '8px 16px',
              textAlign: 'center',
              minWidth: 100,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--text2)', letterSpacing: '0.2em', marginBottom: 2 }}>
                PSI PRESSURE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: pressureColor, lineHeight: 1 }}>
                {pressure.toFixed(0)}
              </div>
              <div style={{ fontSize: '0.55rem', color: pressure > 80 ? '#ff4444' : 'var(--text2)', marginTop: 2 }}>
                {pressure > 80 ? '⚠ HIGH' : pressure > 60 ? 'NORMAL' : 'LOW'}
              </div>
            </div>

            {/* Valve control */}
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => setValveOpen(v => !v)} style={{
                width: 48, height: 48,
                borderRadius: '50%',
                background: valveOpen ? 'rgba(76,175,80,0.2)' : 'rgba(255,68,68,0.2)',
                border: `2px solid ${valveOpen ? '#4caf50' : '#ff4444'}`,
                color: valveOpen ? '#4caf50' : '#ff4444',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                🔩
              </button>
              <div style={{ fontSize: '0.55rem', color: valveOpen ? '#4caf50' : '#ff4444', marginTop: 2, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                {valveOpen ? 'OPEN' : 'CLOSED'}
              </div>
            </div>

            <button type="button" onClick={onSwitchPersona} style={{
              fontFamily: 'var(--font-display)',
              background: 'rgba(255,107,0,0.15)',
              border: '2px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: 4,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              letterSpacing: '0.05em',
            }}>
              🔧 CHANGE JOB
            </button>
          </div>
        </div>

        {/* Plumber tip ticker */}
        <div style={{
          marginTop: 12,
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: 4,
          padding: '6px 12px',
          fontSize: '0.75rem',
          color: 'var(--text2)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', flexShrink: 0 }}>
            PRO TIP:
          </span>
          <span key={tipIdx} style={{ transition: 'opacity 0.3s' }}>{plumberTips[tipIdx]}</span>
        </div>
      </div>

      {/* Pipe diagram nav */}
      <div style={{ background: '#0f1a1f', borderBottom: '1px solid #1e4050', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: 0, height: 40 }}>
        {/* Pipe segments */}
        <div className="pipe-h flex-1" style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', gap: '2rem' }}>
          {['ALL PIPES', 'MAIN LINE', 'HOT WATER', 'PRESSURE LINE', 'WASTE'].map((label, i) => (
            <button key={i} type="button" style={{
              background: 'none',
              border: 'none',
              color: i === 0 ? 'var(--accent)' : 'var(--text2)',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              padding: '0 4px',
            }}>
              {label}
            </button>
          ))}
        </div>
        {/* Pipe end cap */}
        <div style={{ width: 16, height: 20, background: '#1e4050', borderRadius: '0 4px 4px 0', borderTop: '2px solid #2a5070', borderRight: '2px solid #2a5070', borderBottom: '2px solid #0a2030' }} />
      </div>

      <div className="grid lg:grid-cols-12" style={{ minHeight: 'calc(100vh - 200px)' }}>

        {/* Pipeline - email list */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: '#1e4050' }}>
          {/* Pipe inlet */}
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '2px solid #1e4050',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            background: '#0f1a1f',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
            INLET PIPE · {unread} BACKED UP
          </div>

          {emails.map((email, i) => {
            const pipe = tagPipe(email.tag)
            const isFlowing = flowing[email.id]
            return (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email)}
                style={{
                  padding: '0.9rem 1rem',
                  borderBottom: '1px solid #1e4050',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id
                    ? 'rgba(0,212,255,0.08)'
                    : 'transparent',
                  borderLeft: `4px solid ${selectedEmail?.id === email.id ? pipe.color : '#1e4050'}`,
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(0,212,255,0.04)' }}
                onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
              >
                {/* Flow animation */}
                {isFlowing && (
                  <div className="flow-bubble absolute inset-y-0 left-0" style={{
                    width: '100%',
                    background: `linear-gradient(90deg, transparent, ${pipe.color}22, transparent)`,
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div className="flex-1 min-w-0">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      {/* Pipe type indicator */}
                      <div style={{ width: 24, height: 8, borderRadius: 2, background: pipe.color, opacity: 0.7 }} />
                      <span style={{ fontSize: '0.58rem', color: pipe.color, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                        {pipe.label}
                      </span>
                      {!email.read && (
                        <span className="blink-anim" style={{ color: '#ff4444', fontSize: '0.6rem' }}>●</span>
                      )}
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      color: email.read ? 'var(--text2)' : 'var(--text)',
                      fontWeight: email.read ? 400 : 700,
                      lineHeight: 1.3,
                      marginBottom: 2,
                    }} className="truncate">{email.subject}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.6 }} className="truncate">
                      {email.from.name}
                    </p>
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text2)', opacity: 0.5, flexShrink: 0 }}>
                    {email.time}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Pipe outlet */}
          <div style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--text2)', opacity: 0.5, letterSpacing: '0.15em', background: '#0f1a1f', borderTop: '2px solid #1e4050' }}>
            ▼ PIPE OUTLET · DRAIN CLEAR
          </div>
        </div>

        {/* Main work area */}
        <div className="lg:col-span-5 overflow-y-auto p-6">
          {selectedEmail ? (
            <div>
              {/* Diagnostic report header */}
              <div style={{
                background: '#0f1a1f',
                border: '2px solid var(--accent2)',
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 0,
              }}>
                {/* Header bar */}
                <div style={{
                  background: 'linear-gradient(90deg, #0d2030, #162840)',
                  borderBottom: '2px solid var(--accent2)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <div style={{ fontSize: '1.8rem' }}>📋</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 2 }}>
                      WORK ORDER #{selectedEmail.id.toString().padStart(4, '0')} · {tagPipe(selectedEmail.tag).label}
                    </div>
                    <h2 style={{ color: 'var(--text)', fontSize: '1rem', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>
                      {selectedEmail.subject}
                    </h2>
                  </div>
                </div>

                {/* Specs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  borderBottom: '1px solid #1e4050',
                }}>
                  {[
                    ['CLIENT', selectedEmail.from.name],
                    ['DATE', selectedEmail.date],
                    ['STATUS', selectedEmail.read ? 'CLEARED' : 'PENDING'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ padding: '0.75rem', borderRight: '1px solid #1e4050', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--text2)', letterSpacing: '0.15em', marginBottom: 4 }}>{k}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent)' }} className="truncate">{v}</div>
                    </div>
                  ))}
                </div>

                {/* Pipe pressure indicator */}
                <div style={{ padding: '0.5rem 1.25rem', borderBottom: '1px solid #1e4050', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--text2)', letterSpacing: '0.15em' }}>PIPE:</span>
                  <div style={{ flex: 1, height: 8, background: '#0a1520', borderRadius: 999, overflow: 'hidden', border: '1px solid #1e4050' }}>
                    <div style={{
                      height: '100%',
                      width: `${pressure}%`,
                      background: `linear-gradient(90deg, ${tagPipe(selectedEmail.tag).color}, ${pressureColor})`,
                      transition: 'width 1.2s ease',
                      borderRadius: 999,
                    }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: pressureColor }}>{pressure.toFixed(0)} PSI</span>
                </div>

                {/* Body */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--text2)', letterSpacing: '0.2em', marginBottom: 10 }}>
                    ▶ DIAGNOSTIC REPORT:
                  </div>
                  <div style={{
                    background: '#0a1520',
                    border: '1px solid #1e4050',
                    borderRadius: 6,
                    padding: '1.25rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.8,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedEmail.body}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" style={{
                      background: 'linear-gradient(135deg, var(--accent2), #0088aa)',
                      color: '#000',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 18px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                    }}>
                      🔧 MARK FIXED
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid #1e4050',
                      color: 'var(--text2)',
                      borderRadius: 4,
                      padding: '8px 18px',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                    }}>
                      ← BACK TO PIPELINE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 15px rgba(0,212,255,0.4))' }}>🔧</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent)', marginBottom: 8, letterSpacing: '0.15em' }}>
                AWAITING JOB ORDER
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.85rem', opacity: 0.7 }}>
                Select a pipe from the pipeline<br />to view the work order.
              </p>

              {/* Pipe diagram decoration */}
              <div style={{ marginTop: '2rem', position: 'relative', width: 200, height: 80 }}>
                <div className="pipe-h" style={{ position: 'absolute', top: 30, left: 0, right: 60 }} />
                <div className="pipe-v" style={{ position: 'absolute', top: 0, right: 60, height: 50 }} />
                <div className="pipe-h" style={{ position: 'absolute', top: 0, right: 0, width: 60 }} />
                <div style={{ position: 'absolute', bottom: 10, left: '35%', fontSize: '0.65rem', color: 'var(--text2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                  IDLE SYSTEM
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tools sidebar */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: '#1e4050' }}>

          {/* Weather as weather for job */}
          <div style={{ background: '#0f1a1f', border: '1px solid #1e4050', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🌡️ JOB SITE CONDITIONS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.8rem' }}>{weather.icon}</span>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{weather.temp}°C</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>{weather.condition}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: '0.7rem', color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
              {weather.temp < 5 ? '❄️ PIPE FREEZE RISK — INSULATE NOW' :
               weather.temp > 35 ? '🔥 EXPANSION WARNING — CHECK JOINTS' :
               '✅ CONDITIONS NORMAL'}
            </div>
          </div>

          {/* Stocks as material prices */}
          <div style={{ background: '#0f1a1f', border: '1px solid #1e4050', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              💰 MATERIAL COSTS
            </div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)' }}>{s.ticker}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 30, height: 4, background: '#1e4050', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.abs(s.changePct) * 10}%`, height: '100%', background: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)', borderRadius: 999 }} />
                  </div>
                  <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : '#ff4444', fontFamily: 'var(--font-display)', fontSize: '0.7rem' }}>
                    {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tool checklist */}
          <div style={{ background: '#0f1a1f', border: '1px solid #1e4050', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🧰 TOOL CHECKLIST
            </div>
            {['🔧 Pipe wrench', '🪛 Screwdriver', '🔩 Fittings', '📏 Tape measure', '💧 Thread seal', '🪤 Snake auger'].map((tool, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: '0.78rem', color: 'var(--text)' }}>
                <div style={{ width: 14, height: 14, border: `1px solid ${i < 4 ? 'var(--accent3)' : '#1e4050'}`, borderRadius: 2, background: i < 4 ? 'rgba(76,175,80,0.2)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: 'var(--accent3)' }}>
                  {i < 4 ? '✓' : ''}
                </div>
                {tool}
              </div>
            ))}
          </div>

          {/* News as job log */}
          <div style={{ background: '#0f1a1f', border: '1px solid #1e4050', borderRadius: 6, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📻 JOB SITE RADIO
            </div>
            {news.slice(0, 3).map((n, i) => (
              <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 6, paddingBottom: 6, borderBottom: i < 2 ? '1px solid #1e4050' : 'none', lineHeight: 1.4, opacity: 0.8 }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
