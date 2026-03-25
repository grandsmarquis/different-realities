import { useContext, useState } from 'react'
import { PersonaContext } from '../context/PersonaContext'
import { emails } from '../data/emails'
import { weather } from '../data/weather'
import { news } from '../data/news'
import { stocks } from '../data/stocks'

const east = ['東', '南', '西', '北']
const weight = (name) => {
  const weights = ['横綱', '大関', '関脇', '小結', '前頭']
  return weights[name.length % weights.length]
}

const tagJP = t => ({ work:'公務', personal:'私信', finance:'財務', promo:'広告', newsletter:'時報' }[t] || '通信')

const Dohyo = ({ children }) => (
  <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
    <div className="absolute inset-0 rounded-full border-8" style={{ borderColor: 'var(--accent)', background: 'var(--bg2)' }} />
    <div className="absolute rounded-full border-4" style={{ width: 100, height: 100, borderColor: 'var(--accent2)', top: 22, left: 22 }} />
    <div className="relative z-10 text-center">{children}</div>
  </div>
)

export default function SumoLayout({ onSwitchPersona }) {
  const { selectedEmail, setSelectedEmail } = useContext(PersonaContext)
  const [bowing, setBowing] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-main)' }}>

      {/* Grand announcement header */}
      <div className="text-center py-6 px-4 border-b-4" style={{
        borderColor: 'var(--accent)',
        background: 'var(--bg2)',
        background: 'linear-gradient(180deg, #fff8e8, #f0e8cc)',
      }}>
        <div className="text-xs tracking-widest mb-1 opacity-60">令和八年 · 春場所</div>
        <h1 className="text-4xl font-black mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '0.2em' }}>
          大相撲電子便覧
        </h1>
        <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text2)' }}>
          GRAND DIGITAL SUMO TOURNAMENT
        </h2>
        <div className="flex items-center justify-center gap-6 text-sm">
          <span>本日の取組 {emails.length}番</span>
          <span className="opacity-50">|</span>
          <span style={{ color: 'var(--accent)' }}>{emails.filter(e=>!e.read).length}番 未読</span>
          <span className="opacity-50">|</span>
          <button onClick={onSwitchPersona} className="text-xs opacity-60 hover:opacity-100 border px-3 py-1 rounded"
            style={{ borderColor: 'var(--accent)' }}>
            行司を変える
          </button>
        </div>
      </div>

      <div className="flex" style={{ minHeight: 'calc(100vh - 130px)' }}>
        {/* Bout list */}
        <div className="w-72 shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="text-center py-2 border-b text-xs tracking-widest opacity-60" style={{ borderColor: 'var(--border)' }}>
            本日の取組表
          </div>
          {emails.map((e, i) => (
            <div key={e.id} onClick={() => setSelectedEmail(e)}
              className="px-4 py-3 border-b cursor-pointer hover:opacity-80"
              style={{
                borderColor: 'var(--border)',
                background: selectedEmail?.id === e.id ? 'rgba(204,0,0,0.08)' : (i%2===0 ? 'var(--bg)' : 'var(--bg2)'),
              }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>
                  {east[i%4]}
                </span>
                <span className="text-xs opacity-50">{tagJP(e.tag)}</span>
                {!e.read && <span className="text-xs font-black" style={{ color: 'var(--accent)' }}>新</span>}
              </div>
              <div className="font-black text-sm truncate" style={{ color: 'var(--text)' }}>{e.subject}</div>
              <div className="flex items-center gap-2 mt-0.5 text-xs opacity-60">
                <span>{weight(e.from.name)}</span>
                <span>·</span>
                <span>{e.from.name.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dohyo / main ring */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          {selectedEmail ? (
            <div>
              {/* Announcement */}
              <div className="text-center mb-6">
                <div className="text-xs tracking-widest opacity-50 mb-2">行司の呼び上げ</div>
                <div className="flex items-center justify-center mb-4">
                  <Dohyo>
                    <div className="text-3xl">📩</div>
                  </Dohyo>
                </div>
                <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                  {selectedEmail.subject}
                </h2>
                <div className="text-sm opacity-70">
                  {east[emails.indexOf(selectedEmail)%4]}方 · {weight(selectedEmail.from.name)} {selectedEmail.from.name.split(' ')[0]}
                </div>
                <div className="text-xs opacity-50 mt-0.5">{selectedEmail.date}</div>
              </div>

              {/* Content */}
              <div className="max-w-lg mx-auto border-2 rounded-lg p-6" style={{ borderColor: 'var(--accent)', background: 'var(--card)' }}>
                <div className="text-xs text-center tracking-widest mb-4 opacity-50">{tagJP(selectedEmail.tag)} · {selectedEmail.tag}</div>
                <p className="text-sm leading-loose">{selectedEmail.body}</p>
              </div>
              <div className="text-center mt-4">
                <button onClick={() => setSelectedEmail(null)} className="text-xs opacity-40 hover:opacity-80 tracking-widest">
                  ← 取組表に戻る
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-30">
              <Dohyo>
                <div className="text-4xl">🏆</div>
              </Dohyo>
              <div className="text-lg font-black mt-4" style={{ fontFamily: 'var(--font-display)' }}>
                取組を選んでください
              </div>
            </div>
          )}
        </div>

        {/* Scoreboard sidebar */}
        <div className="w-56 shrink-0 border-l overflow-y-auto p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
          {/* Weather */}
          <div className="border-2 rounded p-3 text-center" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs tracking-widest opacity-50 mb-1">天候</div>
            <div className="text-3xl mb-1">{weather.icon}</div>
            <div className="font-black text-sm">{weather.condition}</div>
            <div className="text-xs opacity-50">{weather.temp}° · {weather.humidity}%</div>
          </div>

          {/* Stocks as ranking board */}
          <div className="border-2 rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs tracking-widest opacity-50 mb-2 text-center">番付表</div>
            {stocks.map((s, i) => (
              <div key={s.ticker} className="flex items-center gap-2 py-1.5 border-b text-xs" style={{ borderColor: 'var(--border)' }}>
                <span className="font-black w-4" style={{ color: 'var(--accent)' }}>{i+1}</span>
                <span className="flex-1 font-bold">{s.ticker}</span>
                <span style={{ color: s.changePct >= 0 ? '#006600' : 'var(--accent)' }} className="font-black">
                  {s.changePct >= 0 ? '勝' : '負'}
                </span>
              </div>
            ))}
          </div>

          {/* News as reports */}
          <div className="border-2 rounded p-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs tracking-widest opacity-50 mb-2 text-center">場所レポート</div>
            {news.slice(0,4).map((n,i) => (
              <div key={i} className="mb-2 pb-2 border-b text-xs opacity-70 leading-snug" style={{ borderColor: 'var(--border)' }}>
                {n.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
