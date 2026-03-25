import { useEffect, useMemo, useState } from 'react'
import { usePersona } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

function sha256fake(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0 }
  // Fallback hash for environments without WebCrypto.
  // Not cryptographically secure; only used as a stable local checksum.
  return Math.abs(h).toString(16).padStart(8, '0').repeat(8).slice(0, 64)
}

function normalizeHashHex(hex) {
  if (!hex) return ''
  const s = String(hex).toLowerCase().replace(/[^0-9a-f]/g, '')
  if (s.length === 64) return s
  if (s.length > 64) return s.slice(0, 64)
  return s.padEnd(64, '0')
}

async function sha256hex(str) {
  try {
    if (typeof window !== 'undefined' && window.crypto?.subtle) {
      const data = new TextEncoder().encode(str)
      const digest = await window.crypto.subtle.digest('SHA-256', data)
      const bytes = new Uint8Array(digest)
      return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
    }
  } catch {
    // Ignore and use fallback below.
  }
  return sha256fake(str)
}

function WarningBanner({ text }) {
  return (
    <div style={{ background: 'var(--accent)', color: '#000', padding: '4px 12px', fontSize: '0.7rem', fontFamily: 'var(--font-main)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
      ⚠ {text}
    </div>
  )
}

export default function ParanoidPrivacyLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = usePersona()
  const [decrypted, setDecrypted] = useState({})
  const [showStocks, setShowStocks] = useState(false)
  const [showWeather, setShowWeather] = useState(false)

  // Password-gated vault: protects the entire persona UI.
  const VAULT_KEY = 'whoareyou_paranoia_vault_passphrase_hash_v1'
  const [vaultPhase, setVaultPhase] = useState('checking') // checking | set | unlock | unlocked
  const [storedHash, setStoredHash] = useState('')
  const [passphraseInput, setPassphraseInput] = useState('')
  const [passphraseCreate, setPassphraseCreate] = useState('')
  const [passphraseConfirm, setPassphraseConfirm] = useState('')
  const [vaultError, setVaultError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [cooldownUntil, setCooldownUntil] = useState(0)
  const [now, setNow] = useState(() => Date.now())

  const cooldownRemainingMs = Math.max(0, cooldownUntil - now)
  const cooldownSeconds = useMemo(() => Math.ceil(cooldownRemainingMs / 1000), [cooldownRemainingMs])

  function decrypt(id) {
    setDecrypted(d => ({ ...d, [id]: true }))
  }

  useEffect(() => {
    const existing = localStorage.getItem(VAULT_KEY)
    if (existing) {
      setStoredHash(normalizeHashHex(existing))
      setVaultPhase('unlock')
    } else {
      setVaultPhase('set')
    }
  }, [])

  useEffect(() => {
    if (cooldownUntil <= 0) return undefined
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [cooldownUntil])

  async function handleUnlock() {
    setVaultError('')
    if (cooldownRemainingMs > 0) {
      setVaultError(`Locked for ${cooldownSeconds}s. Calm down.`)
      return
    }

    const inputHash = normalizeHashHex(await sha256hex(passphraseInput))
    if (inputHash && inputHash === storedHash) {
      setVaultPhase('unlocked')
      setAttempts(0)
      setDecrypted({})
      setSelectedEmail(null)
      setShowStocks(false)
      setShowWeather(false)
      setPassphraseInput('')
      return
    }

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)
    setVaultError(nextAttempts >= 3
      ? 'Access denied. Too many attempts. Lockdown engaged.'
      : 'Access denied. That passphrase looks fake.')
    setPassphraseInput('')

    if (nextAttempts >= 3) {
      setCooldownUntil(Date.now() + 9000)
    }
  }

  async function handleCreatePassphrase() {
    setVaultError('')
    if (!passphraseCreate || passphraseCreate.length < 4) {
      setVaultError('Passphrase too short. Give it at least 4 characters.')
      return
    }
    if (passphraseCreate !== passphraseConfirm) {
      setVaultError('Confirmation mismatch. Try again.')
      return
    }

    const hash = normalizeHashHex(await sha256hex(passphraseCreate))
    localStorage.setItem(VAULT_KEY, hash)
    setStoredHash(hash)
    setVaultPhase('unlocked')
    setAttempts(0)
    setDecrypted({})
    setSelectedEmail(null)
    setShowStocks(false)
    setShowWeather(false)
    setPassphraseCreate('')
    setPassphraseConfirm('')
  }

  function handleLockVault() {
    setVaultPhase('unlock')
    setVaultError('')
    setAttempts(0)
    setCooldownUntil(0)
    setDecrypted({})
    setSelectedEmail(null)
    setShowStocks(false)
    setShowWeather(false)
  }

  function handleResetVaultPassphrase() {
    localStorage.removeItem(VAULT_KEY)
    setStoredHash('')
    setVaultPhase('set')
    setPassphraseInput('')
    setPassphraseCreate('')
    setPassphraseConfirm('')
    setVaultError('')
    setAttempts(0)
    setCooldownUntil(0)
    setDecrypted({})
    setSelectedEmail(null)
    setShowStocks(false)
    setShowWeather(false)
  }

  return (
    <div className="paranoia-vault relative" style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-main)', color: 'var(--text)' }}>
      <div className="paranoia-scanlines pointer-events-none" />
      <div className="paranoia-noise pointer-events-none" />

      <WarningBanner text="THIS SESSION IS NOT END-TO-END ENCRYPTED · 47 TRACKERS BLOCKED · TOR RECOMMENDED" />
      <WarningBanner text="YOUR ISP MAY BE LOGGING THIS PAGE · METADATA EXPOSED · USE VPN" />

      {vaultPhase !== 'unlocked' ? (
        <div className="paranoia-lock-screen absolute inset-0 z-50 flex items-center justify-center p-5">
          <div className="card w-full max-w-xl bg-base-200/10 border border-error/30 shadow-2xl backdrop-blur-xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="paranoia-shield">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2.5 20 6v7.4c0 5-3.4 8.7-8 9.9-4.6-1.2-8-4.9-8-9.9V6l8-3.5Z" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8.5 12.2 10.6 14.3 15.8 9.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h2 className="paranoia-glitch-title text-2xl font-bold tracking-widest leading-tight" data-text="PARANOIA VAULT">
                    PARANOIA VAULT
                  </h2>
                  <p className="text-sm opacity-80 mt-1">
                    Everything is behind a passphrase. Not your fault. The universe is nosy.
                  </p>
                  {vaultPhase === 'unlock' && (
                    <div className="mt-2">
                      <div className="badge badge-error badge-sm mr-2">LOCKED</div>
                      <div className="badge badge-ghost badge-sm">Local-only security</div>
                    </div>
                  )}
                  {vaultPhase === 'set' && (
                    <div className="mt-2">
                      <div className="badge badge-warning badge-sm mr-2">SET PASS</div>
                      <div className="badge badge-ghost badge-sm">No backup included</div>
                    </div>
                  )}
                </div>
              </div>

              {vaultPhase === 'checking' ? (
                <div className="mt-4 flex flex-col items-center gap-3">
                  <span className="loading loading-spinner text-error loading-lg" aria-label="Checking vault status" />
                  <p className="text-xs opacity-70">Assessing the threat model...</p>
                </div>
              ) : null}

              {vaultPhase === 'unlock' ? (
                <div className="mt-4">
                  <label className="label p-0 mb-2">
                    <span className="label-text text-xs opacity-70">Passphrase</span>
                  </label>
                  <input
                    value={passphraseInput}
                    onChange={e => setPassphraseInput(e.target.value)}
                    type="password"
                    placeholder="Enter the vault passphrase"
                    autoComplete="off"
                    className="input input-bordered w-full bg-base-100/0 text-base-content placeholder:opacity-60"
                    onKeyDown={e => { if (e.key === 'Enter') handleUnlock() }}
                  />

                  {cooldownRemainingMs > 0 ? (
                    <div className="alert alert-error mt-3">
                      <span>Cooldown: {cooldownSeconds}s remaining.</span>
                    </div>
                  ) : null}

                  {vaultError ? (
                    <div className="alert alert-warning mt-3">
                      <span>{vaultError}</span>
                    </div>
                  ) : (
                    <div className="alert alert-info mt-3">
                      <span>Hint: use what you set earlier. Reloads still require a passphrase.</span>
                    </div>
                  )}

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-error flex-1 min-w-[160px]"
                      onClick={handleUnlock}
                    >
                      UNSEAL
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost flex-1 min-w-[160px]"
                      onClick={handleResetVaultPassphrase}
                      title="This removes the local passphrase and re-locks everything."
                    >
                      Reset passphrase
                    </button>
                  </div>

                  <p className="mt-3 text-[0.7rem] opacity-70 leading-relaxed">
                    Security note: the passphrase hash is stored locally in your browser. No server involved.
                  </p>
                </div>
              ) : null}

              {vaultPhase === 'set' ? (
                <div className="mt-4">
                  <label className="label p-0 mb-2">
                    <span className="label-text text-xs opacity-70">Create passphrase</span>
                  </label>
                  <input
                    value={passphraseCreate}
                    onChange={e => setPassphraseCreate(e.target.value)}
                    type="password"
                    placeholder="New passphrase"
                    autoComplete="off"
                    className="input input-bordered w-full bg-base-100/0 text-base-content placeholder:opacity-60"
                  />

                  <label className="label p-0 mt-3 mb-2">
                    <span className="label-text text-xs opacity-70">Confirm</span>
                  </label>
                  <input
                    value={passphraseConfirm}
                    onChange={e => setPassphraseConfirm(e.target.value)}
                    type="password"
                    placeholder="Repeat passphrase"
                    autoComplete="off"
                    className="input input-bordered w-full bg-base-100/0 text-base-content placeholder:opacity-60"
                    onKeyDown={e => { if (e.key === 'Enter') handleCreatePassphrase() }}
                  />

                  {vaultError ? (
                    <div className="alert alert-warning mt-3">
                      <span>{vaultError}</span>
                    </div>
                  ) : (
                    <div className="alert alert-info mt-3">
                      <span>When you set it, you are the backup.</span>
                    </div>
                  )}

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-error flex-1 min-w-[160px]"
                      onClick={handleCreatePassphrase}
                    >
                      CREATE + UNSEAL
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost flex-1 min-w-[160px]"
                      onClick={() => setVaultPhase('unlock')}
                      title="Skip to unlock screen (no passphrase set will work until you create one)."
                    >
                      I already know it
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {vaultPhase === 'unlocked' ? (
        <div className="relative">
          <header style={{ borderBottom: '1px solid var(--border)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--accent3)', letterSpacing: '0.08em' }}>
                [ENCRYPTED INBOX] 🔓
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--text2)' }}>
                {emails.filter(e => !e.read).length} unencrypted message(s) detected · handle with care
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.72rem' }}>
              <span style={{ color: 'var(--accent3)' }}>● VPN: ACTIVE</span>
              <span style={{ color: 'var(--accent2)' }}>● DNS: BLOCKED</span>
              <button
                type="button"
                onClick={handleLockVault}
                style={{ color: 'var(--accent)', background: 'none', border: '1px solid var(--accent)', padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.7rem' }}
              >
                [RE-SEAL]
              </button>
              <button type="button" onClick={onSwitchPersona} style={{ color: 'var(--text2)', background: 'none', border: '1px solid var(--border)', padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.7rem' }}>
                [SWITCH IDENTITY]
              </button>
            </div>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 260px', gap: 0, height: 'calc(100vh - 82px)' }}>
            {/* Left: stats */}
            <div style={{ borderRight: '1px solid var(--border)', padding: '1rem', overflowY: 'auto' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent3)', marginBottom: 8 }}>SYSTEM STATUS</p>
              {[
                ['Trackers blocked', '47', 'var(--accent3)'],
                ['DNS leaks', '0', 'var(--accent3)'],
                ['WebRTC leaks', '0', 'var(--accent3)'],
                ['IP exposed', '0.0.0.0', 'var(--accent3)'],
                ['Canvas fingerprint', 'SPOOFED', 'var(--accent2)'],
                ['User-agent', 'RANDOMIZED', 'var(--accent2)'],
              ].map(([k, v, c]) => (
                <div key={k} style={{ marginBottom: 6, fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ color: 'var(--text2)' }}>{k}</span>
                  <span style={{ color: c, fontWeight: 600 }}>{v}</span>
                </div>
              ))}

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>WEATHER</p>
                {!showWeather ? (
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text2)', marginBottom: 6 }}>⚠ Location data NOT shared with server.</p>
                    <button type="button" onClick={() => setShowWeather(true)} style={{ fontSize: '0.68rem', color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '3px 8px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                      [load local sensor]
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem' }}>
                    <p>{weather.icon} {weather.temp}°C</p>
                    <p style={{ color: 'var(--text2)', fontSize: '0.68rem' }}>{weather.condition}</p>
                    <p style={{ color: 'var(--accent3)', fontSize: '0.65rem', marginTop: 4 }}>✓ Data from local sensor</p>
                  </div>
                )}
              </div>
            </div>

            {/* Center: encrypted email list */}
            <div style={{ overflowY: 'auto' }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text2)', display: 'flex', gap: 16 }}>
                <span>INBOX // {emails.length} objects // SHA-256 verified</span>
                <span style={{ color: 'var(--accent2)' }}>⚠ Metadata visible to adversaries</span>
              </div>
              {emails.map(email => {
                const isDecrypted = !!decrypted[email.id]
                const hash = sha256fake(email.subject)
                return (
                  <div
                    key={email.id}
                    style={{
                      borderBottom: '1px solid var(--border)',
                      padding: '0.85rem 1rem',
                      cursor: 'pointer',
                      background: selectedEmail?.id === email.id ? 'var(--bg2)' : 'transparent',
                    }}
                    onClick={() => { if (isDecrypted) setSelectedEmail(email) }}
                    onMouseEnter={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = '#1a1a1a' }}
                    onMouseLeave={e => { if (selectedEmail?.id !== email.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                      {isDecrypted ? (
                        <span style={{ fontSize: '0.82rem', color: 'var(--accent3)', fontWeight: email.read ? 400 : 700 }}>{email.subject}</span>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text2)', fontFamily: 'var(--font-main)', letterSpacing: '0.04em' }}>
                          [ENCRYPTED] {hash.slice(0, 24)}...
                        </span>
                      )}
                      <span style={{ fontSize: '0.65rem', color: 'var(--text2)', flexShrink: 0 }}>{email.time}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {isDecrypted ? (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{email.from.name} · {email.from.email}</span>
                      ) : (
                        <span style={{ fontSize: '0.68rem', color: '#555' }}>from: {sha256fake(email.from.email).slice(0, 16)}...</span>
                      )}
                      {!isDecrypted && (
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); decrypt(email.id) }}
                          style={{ fontSize: '0.62rem', color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '2px 8px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}
                        >
                          [DECRYPT]
                        </button>
                      )}
                      {!email.read && !isDecrypted && (
                        <span style={{ fontSize: '0.6rem', color: 'var(--accent)', marginLeft: 6 }}>●</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right: detail + widgets */}
            <div style={{ borderLeft: '1px solid var(--border)', overflowY: 'auto' }}>
              {selectedEmail && decrypted[selectedEmail.id] ? (
                <div style={{ padding: '1rem' }}>
                  <p style={{ fontSize: '0.6rem', color: 'var(--accent3)', letterSpacing: '0.2em', marginBottom: 8 }}>✓ DECRYPTED · PGPVERIFIED</p>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', marginBottom: 4 }}>{selectedEmail.subject}</p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text2)', marginBottom: 12 }}>{selectedEmail.from.name}</p>
                  <div style={{ fontSize: '0.78rem', lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-line' }}>{selectedEmail.body}</div>
                  <button type="button" onClick={() => setSelectedEmail(null)} style={{ marginTop: 12, fontSize: '0.68rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                    [wipe from memory]
                  </button>
                </div>
              ) : (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text2)', fontSize: '0.75rem', marginTop: '2rem' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔒</p>
                  <p>Decrypt a message to read it.</p>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--border)', padding: '1rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>MARKET DATA</p>
                {!showStocks ? (
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text2)', marginBottom: 6 }}>
                      ⚠ External API call would expose IP. Blocked.
                    </p>
                    <button type="button" onClick={() => setShowStocks(true)} style={{ fontSize: '0.68rem', color: 'var(--accent2)', background: 'none', border: '1px solid var(--accent2)', padding: '3px 8px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}>
                      [route via TOR]
                    </button>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--accent3)', marginBottom: 8 }}>✓ Routed anonymously</p>
                    {stocks.map(s => (
                      <div key={s.ticker} style={{ fontSize: '0.72rem', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text)' }}>{s.ticker}</span>
                        <span style={{ color: s.changePct >= 0 ? 'var(--accent3)' : 'var(--accent)' }}>
                          {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', padding: '1rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>NEWS SOURCES</p>
                {news.slice(0, 4).map(n => (
                  <div key={n.id} style={{ marginBottom: 8, fontSize: '0.72rem' }}>
                    <span style={{ color: 'var(--accent2)', fontSize: '0.6rem' }}>⚠ UNVERIFIED SOURCE · </span>
                    <span style={{ color: 'var(--text2)' }}>{n.title.slice(0, 55)}...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
