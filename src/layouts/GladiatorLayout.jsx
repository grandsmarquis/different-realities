import { useState, useEffect, useRef } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const ROMAN_NUMS = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV']
const LATIN_TAGS = {
  work: { name: 'NEGOTIUM', latin: 'Affairs of Commerce', weapon: '⚔️' },
  personal: { name: 'FAMILIA', latin: 'Bonds of Blood', weapon: '🛡️' },
  finance: { name: 'PECUNIA', latin: 'The Gold of Empire', weapon: '💰' },
  promo: { name: 'CIRCUS', latin: 'Bread and Spectacle', weapon: '🏛️' },
  newsletter: { name: 'SCROLLUS', latin: 'The Daily Chronicle', weapon: '📜' },
  social: { name: 'COLLEGIUM', latin: 'Brotherhood of Rome', weapon: '🦅' },
}

const crowdChants = [
  'AVE! AVE! AVE! THE INBOX HAS BEEN CONQUERED!',
  'STRENGTH AND HONOR! READ YOUR MESSAGES!',
  'ARE YOU NOT ENTERTAINED?! READ THE EMAIL!',
  'FOR THE GLORY OF ROME! CHECK YOUR INBOX!',
  'NON MORIAR SED VIVAM! I SHALL NOT SPAM!',
]

const decrees = [
  'By decree of the Senate: All unread messages must be addressed before the Ides.',
  'The Emperor demands swift replies. Delay is treason.',
  'Legions of notifications await your command, Dominus.',
  'Marcus Aurelius wrote: "Respond to each message as if it were your last."',
  'Seneca warns: An unanswered inbox is a restless mind.',
]

const stoneTexture = `repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0,0,0,0.1) 2px,
  rgba(0,0,0,0.1) 4px
),
repeating-linear-gradient(
  90deg,
  transparent,
  transparent 6px,
  rgba(0,0,0,0.05) 6px,
  rgba(0,0,0,0.05) 8px
)`

export default function GladiatorLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [thumbs, setThumbs] = useState(null)
  const [crowdIdx, setCrowdIdx] = useState(0)
  const [decreeFull, setDecreeFull] = useState(false)
  const [battlePhase, setBattlePhase] = useState(0)
  const [victoryCounter, setVictoryCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCrowdIdx(c => (c + 1) % crowdChants.length), 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setBattlePhase(p => (p + 1) % 4), 2000)
    return () => clearInterval(interval)
  }, [])

  function openEmail(email) {
    setSelectedEmail(email)
    setThumbsWithTimeout(null)
    setVictoryCounter(v => v + 1)
  }

  function setThumbsWithTimeout(val) {
    setThumbs(val)
  }

  const unread = emails.filter(e => !e.read).length
  const readCount = emails.filter(e => e.read).length

  return (
    <div className="min-h-screen" style={{
      background: `${stoneTexture}, radial-gradient(ellipse at 50% 0%, #3a2000 0%, #1a1008 40%, #0f0804 100%)`,
      color: 'var(--text)',
      fontFamily: 'var(--font-main)',
    }}>
      <style>{`
        @keyframes torchFlicker {
          0%, 100% { opacity: 1; transform: scaleY(1) translateX(0); }
          20% { opacity: 0.8; transform: scaleY(1.1) translateX(1px); }
          40% { opacity: 0.9; transform: scaleY(0.95) translateX(-1px); }
          60% { opacity: 1; transform: scaleY(1.05) translateX(0.5px); }
          80% { opacity: 0.85; transform: scaleY(1.08) translateX(-0.5px); }
        }
        @keyframes sandDrift {
          0%, 100% { transform: translateX(0) skewX(0); }
          50% { transform: translateX(3px) skewX(1deg); }
        }
        @keyframes gladiatorStrike {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-15deg) scale(1.1); }
          50% { transform: rotate(0deg) scale(1); }
          75% { transform: rotate(10deg) scale(0.95); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes marbleShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes crowdRoar {
          0%, 100% { letter-spacing: 0.1em; opacity: 0.7; }
          50% { letter-spacing: 0.25em; opacity: 1; }
        }
        @keyframes unfurl {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
        @keyframes goldGlow {
          0%, 100% { text-shadow: 0 0 5px rgba(232,200,112,0.4); }
          50% { text-shadow: 0 0 15px rgba(232,200,112,0.8), 0 0 30px rgba(232,200,112,0.3); }
        }
        @keyframes bloodMoon {
          0%, 100% { box-shadow: 0 0 10px rgba(204,34,0,0.3); }
          50% { box-shadow: 0 0 25px rgba(204,34,0,0.6), 0 0 50px rgba(204,34,0,0.2); }
        }
        .torch-flicker { animation: torchFlicker 0.8s ease-in-out infinite; }
        .sand-drift { animation: sandDrift 3s ease-in-out infinite; }
        .gladiator-strike { animation: gladiatorStrike 2s ease-in-out infinite; }
        .crowd-roar { animation: crowdRoar 3s ease-in-out infinite; }
        .unfurl-scroll { animation: unfurl 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .gold-glow { animation: goldGlow 2s ease-in-out infinite; }
        .blood-moon { animation: bloodMoon 3s ease-in-out infinite; }
        .marble-text {
          background: linear-gradient(90deg, #e8c870, #fff8dc, #e8c870, #c8a040, #e8c870);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: marbleShimmer 4s linear infinite;
        }
      `}</style>

      {/* Colosseum arch top decoration */}
      <div style={{
        background: 'linear-gradient(180deg, #2d1800 0%, #1a1008 100%)',
        borderBottom: '4px solid var(--accent2)',
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Arch pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 6,
          background: 'repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 2px, var(--accent2) 2px, var(--accent2) 6px, var(--accent) 6px, var(--accent) 8px, transparent 8px, transparent 20px)',
        }} />

        {/* Torches */}
        <div style={{ position: 'absolute', top: 10, left: 20, fontSize: '1.5rem' }} className="torch-flicker">🔥</div>
        <div style={{ position: 'absolute', top: 10, right: 20, fontSize: '1.5rem' }} className="torch-flicker" style2={{ animationDelay: '0.4s' }}>🔥</div>

        <div style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.5em', color: 'var(--accent)', marginBottom: 6, opacity: 0.8 }}>
            ⚔ SENATUS POPULUSQUE ROMANUS ⚔
          </div>

          <h1 className="marble-text" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            ARENA INBOX
          </h1>

          <p style={{ color: 'var(--text2)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: 12 }}>
            {unread} hostes await in the arena · {readCount} fallen in battle
          </p>

          {/* Crowd chant */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(204,34,0,0.12)',
            border: '2px solid var(--accent)',
            borderRadius: 4,
            padding: '8px 24px',
            marginBottom: 16,
          }}>
            <p className="crowd-roar" key={crowdIdx} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
            }}>
              {crowdChants[crowdIdx]}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Thumbs up/down controls */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => setThumbsWithTimeout('up')} style={{
                fontSize: '1.5rem',
                background: thumbs === 'up' ? 'rgba(76,175,80,0.2)' : 'rgba(0,0,0,0.4)',
                border: `2px solid ${thumbs === 'up' ? '#4caf50' : 'var(--border)'}`,
                borderRadius: 8,
                padding: '4px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>👍</button>
              <button type="button" onClick={() => setThumbsWithTimeout('down')} style={{
                fontSize: '1.5rem',
                background: thumbs === 'down' ? 'rgba(204,34,0,0.2)' : 'rgba(0,0,0,0.4)',
                border: `2px solid ${thumbs === 'down' ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 8,
                padding: '4px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>👎</button>
            </div>

            {thumbs && (
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: thumbs === 'up' ? '#4caf50' : 'var(--accent)', letterSpacing: '0.1em' }}>
                {thumbs === 'up' ? 'MISSIO GRANTED! THE GLADIATOR LIVES.' : 'IUGULA! NO MERCY!'}
              </div>
            )}

            <button type="button" onClick={onSwitchPersona} style={{
              fontFamily: 'var(--font-display)',
              background: 'none',
              border: '2px solid var(--border)',
              color: 'var(--text2)',
              borderRadius: 4,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
            }}>
              ⚔️ CHANGE ARENA
            </button>
          </div>
        </div>

        {/* Score pillars */}
        <div style={{
          borderTop: '2px solid var(--border)',
          display: 'flex',
          justifyContent: 'center',
          gap: 0,
        }}>
          {[
            ['⚔️ TOTAL', emails.length],
            ['📜 UNREAD', unread],
            ['✅ CLEARED', readCount],
            ['🏆 VICTORIES', victoryCounter],
          ].map(([label, val]) => (
            <div key={label} style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.75rem 0.5rem',
              borderRight: '1px solid var(--border)',
              background: 'rgba(0,0,0,0.2)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--text2)', letterSpacing: '0.15em' }}>{label}</div>
              <div className="gold-glow" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--accent2)', lineHeight: 1.2 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12" style={{ minHeight: 'calc(100vh - 280px)' }}>

        {/* Gladiator list - roster board */}
        <div className="lg:col-span-4 border-r overflow-y-auto" style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.3)' }}>
          {/* Section header */}
          <div style={{
            padding: '0.75rem 1rem',
            borderBottom: '2px solid var(--border)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'var(--accent)',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span>⚔️</span>
            GLADIATORIS ROSTER · {emails.length} COMBATANTS
          </div>

          {emails.map((email, i) => {
            const latin = LATIN_TAGS[email.tag] || LATIN_TAGS.work
            return (
              <div
                key={email.id}
                onClick={() => openEmail(email)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid rgba(92,58,16,0.4)',
                  cursor: 'pointer',
                  background: selectedEmail?.id === email.id
                    ? 'rgba(204,34,0,0.1)'
                    : 'transparent',
                  borderLeft: `4px solid ${selectedEmail?.id === email.id ? 'var(--accent)' : 'transparent'}`,
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'rgba(232,200,112,0.04)' }}
                onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
              >
                {/* Roman numeral */}
                <div style={{ position: 'absolute', top: 8, right: 8, fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--border)', letterSpacing: '0.1em' }}>
                  {ROMAN_NUMS[i] || String(i + 1)}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {/* Shield emblem */}
                  <div style={{
                    width: 36, height: 44,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: selectedEmail?.id === email.id
                      ? 'linear-gradient(180deg, var(--accent), #660a00)'
                      : 'linear-gradient(180deg, var(--border), #2a1400)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    transition: 'all 0.3s',
                  }}>
                    {latin.weapon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: '0.58rem', color: 'var(--accent2)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                        {latin.name}
                      </span>
                      {!email.read && (
                        <span className="blood-moon" style={{
                          width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block',
                        }} />
                      )}
                    </div>
                    <p style={{
                      fontSize: '0.85rem',
                      color: email.read ? 'var(--text2)' : 'var(--text)',
                      fontWeight: email.read ? 400 : 700,
                      lineHeight: 1.3,
                      marginBottom: 2,
                    }} className="truncate">{email.subject}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.7, fontStyle: 'italic' }} className="truncate">
                      — {email.from.name}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Arena stage */}
        <div className="lg:col-span-5 overflow-y-auto p-6">
          {selectedEmail ? (
            <div className="unfurl-scroll">
              {/* Scroll header */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent2)', letterSpacing: '0.4em', marginBottom: 4 }}>
                  ⚔ IN ARENA ⚔
                </div>
                <div className="gladiator-strike" style={{ fontSize: '3rem', display: 'inline-block', filter: 'drop-shadow(0 0 12px rgba(204,34,0,0.5))' }}>
                  {(LATIN_TAGS[selectedEmail.tag] || LATIN_TAGS.work).weapon}
                </div>
              </div>

              <div className="blood-moon" style={{
                background: 'rgba(10,8,4,0.95)',
                border: '2px solid var(--accent)',
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                {/* Stone carved header */}
                <div style={{
                  background: `${stoneTexture}, linear-gradient(135deg, #2d1800, #1a1008)`,
                  borderBottom: '3px solid var(--accent)',
                  padding: '1.5rem',
                  position: 'relative',
                }}>
                  {/* Corner ornaments */}
                  <div style={{ position: 'absolute', top: 8, left: 8, color: 'var(--accent2)', fontSize: '0.8rem', opacity: 0.5 }}>◆</div>
                  <div style={{ position: 'absolute', top: 8, right: 8, color: 'var(--accent2)', fontSize: '0.8rem', opacity: 0.5 }}>◆</div>
                  <div style={{ position: 'absolute', bottom: 8, left: 8, color: 'var(--accent2)', fontSize: '0.8rem', opacity: 0.5 }}>◆</div>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, color: 'var(--accent2)', fontSize: '0.8rem', opacity: 0.5 }}>◆</div>

                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 8, textAlign: 'center' }}>
                    {(LATIN_TAGS[selectedEmail.tag] || LATIN_TAGS.work).name} · {(LATIN_TAGS[selectedEmail.tag] || LATIN_TAGS.work).latin}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 3vw, 1.6rem)',
                    color: 'var(--text)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  }}>
                    {selectedEmail.subject}
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: 10, fontSize: '0.72rem', color: 'var(--text2)' }}>
                    <span>⚔️ {selectedEmail.from.name}</span>
                    <span>📅 {selectedEmail.date}</span>
                    <span>🔱 {ROMAN_NUMS[emails.findIndex(e => e.id === selectedEmail.id)] || 'I'}</span>
                  </div>
                </div>

                {/* Decree stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderBottom: '1px solid var(--border)' }}>
                  {[
                    ['LEGATUS', selectedEmail.from.name],
                    ['HORA', `${selectedEmail.date} · ${selectedEmail.time}`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ padding: '0.75rem 1rem', borderRight: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>{k}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text)', marginTop: 2 }} className="truncate">{v}</div>
                    </div>
                  ))}
                </div>

                {/* Body - carved stone scroll */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: `${stoneTexture}, rgba(5,3,0,0.6)`,
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '1.25rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.9,
                    color: 'var(--text)',
                    whiteSpace: 'pre-wrap',
                    fontStyle: 'italic',
                  }}>
                    {selectedEmail.body}
                  </div>

                  {/* Daily decree */}
                  <div style={{
                    marginTop: '1rem',
                    background: 'rgba(204,34,0,0.08)',
                    border: '1px dashed var(--border)',
                    borderRadius: 4,
                    padding: '0.75rem',
                    fontSize: '0.72rem',
                    color: 'var(--text2)',
                    fontStyle: 'italic',
                    cursor: 'pointer',
                  }} onClick={() => setDecreeFull(!decreeFull)}>
                    <span style={{ color: 'var(--accent2)', fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
                      📜 SENATUS DECREE:{' '}
                    </span>
                    {decreeFull ? decrees[selectedEmail.id % decrees.length] : `${decrees[selectedEmail.id % decrees.length].slice(0, 60)}... [click to reveal]`}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" style={{
                      background: 'linear-gradient(135deg, var(--accent), #880000)',
                      color: 'var(--accent2)',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.15em',
                      boxShadow: '0 4px 15px rgba(204,34,0,0.3)',
                    }}>
                      ⚔️ REPLY IN BATTLE
                    </button>
                    <button type="button" onClick={() => setSelectedEmail(null)} style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--border)',
                      color: 'var(--text2)',
                      borderRadius: 4,
                      padding: '8px 20px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                    }}>
                      ← RETREAT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              {/* Colosseum center */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div className="sand-drift" style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 20px rgba(204,34,0,0.4))' }}>⚔️</div>
                {/* Sand particles */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="sand-drift" style={{
                    position: 'absolute',
                    top: `${20 + i * 15}%`,
                    left: `${-20 + i * 40}%`,
                    width: 4, height: 4,
                    borderRadius: '50%',
                    background: '#c8a040',
                    opacity: 0.3,
                    animationDelay: `${i * 0.5}s`,
                  }} />
                ))}
              </div>
              <div className="marble-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: 8, letterSpacing: '0.1em' }}>
                THE ARENA AWAITS
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', opacity: 0.7, fontStyle: 'italic' }}>
                Select a gladiator from the roster<br />to enter combat, Dominus.
              </p>
              <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em', opacity: 0.6 }}>
                ARE YOU NOT ENTERTAINED?
              </div>
            </div>
          )}
        </div>

        {/* Command sidebar */}
        <div className="lg:col-span-3 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.3)' }}>

          {/* Weather as omen */}
          <div style={{ background: `${stoneTexture}, rgba(0,0,0,0.6)`, border: '1px solid var(--border)', borderRadius: 4, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              🦅 THE OMENS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '2rem' }}>{weather.icon}</span>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{weather.temp}°C</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>{weather.condition}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent2)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
              {weather.temp > 30 ? '"Jupiter\'s wrath! The sun burns bright — victory is near!"' :
               weather.temp < 10 ? '"Mars sends cold winds. The augurs warn of difficult correspondence."' :
               '"The omens are favorable. The gods smile upon your inbox today."'}
            </div>
          </div>

          {/* Battle statistics */}
          <div style={{ background: `${stoneTexture}, rgba(0,0,0,0.6)`, border: '1px solid var(--border)', borderRadius: 4, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 10 }}>
              ⚔️ BATTLE RECORD
            </div>
            {/* Battle progress bars */}
            {[
              ['VICTORIES', readCount, emails.length, '#4caf50'],
              ['PENDING', unread, emails.length, '#ff4444'],
              ['VALOR', victoryCounter, 10, 'var(--accent2)'],
            ].map(([label, val, max, color]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.65rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text2)', letterSpacing: '0.1em' }}>{label}</span>
                  <span style={{ color, fontFamily: 'var(--font-display)' }}>{val}/{max}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(0,0,0,0.5)', borderRadius: 999, border: '1px solid var(--border)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, (val / max) * 100)}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    borderRadius: 999,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Stocks as treasury */}
          <div style={{ background: `${stoneTexture}, rgba(0,0,0,0.6)`, border: '1px solid var(--border)', borderRadius: 4, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              💰 IMPERIAL TREASURY
            </div>
            {stocks.map(s => (
              <div key={s.ticker} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-display)', fontSize: '0.68rem' }}>{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#4caf50' : 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '0.7rem' }}>
                  {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct)}%
                </span>
              </div>
            ))}
          </div>

          {/* News as herald reports */}
          <div style={{ background: `${stoneTexture}, rgba(0,0,0,0.6)`, border: '1px solid var(--border)', borderRadius: 4, padding: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 8 }}>
              📯 HERALD'S REPORT
            </div>
            {news.slice(0, 3).map((n, i) => (
              <div key={i} style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 8, paddingBottom: 8, borderBottom: i < 2 ? '1px dashed var(--border)' : 'none', lineHeight: 1.4, fontStyle: 'italic', opacity: 0.85 }}>
                ⚔️ {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom arena floor */}
      <div style={{
        height: 10,
        background: `repeating-linear-gradient(90deg, var(--accent2) 0px, var(--accent2) 2px, var(--accent) 2px, var(--accent) 6px, var(--accent2) 6px, var(--accent2) 8px, transparent 8px, transparent 20px)`,
        opacity: 0.6,
      }} />
    </div>
  )
}
