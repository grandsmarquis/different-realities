import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import { PersonaProvider, usePersona } from './context/PersonaContext'
import PersonaSelector from './components/PersonaSelector'
import { personaMap, personas } from './personas'

function HomeRoute() {
  const { setActivePersona } = usePersona()
  const navigate = useNavigate()

  useEffect(() => {
    setActivePersona(null)
  }, [setActivePersona])

  function handleSelectPersona(persona) {
    navigate(`/p/${persona.id}`)
  }

  return <PersonaSelector onSelectPersona={handleSelectPersona} />
}

function PersonaRoute() {
  const { personaId } = useParams()
  const { setActivePersona, activePersona } = usePersona()
  const navigate = useNavigate()
  const persona = personaMap[personaId]

  useEffect(() => {
    if (persona) setActivePersona(persona)
  }, [persona, setActivePersona])

  if (!persona) {
    return <Navigate to="/" replace />
  }

  if (!activePersona || activePersona.id !== persona.id) {
    return null
  }

  const { Layout } = activePersona

  function handleRandomPersona() {
    const pick = personas[Math.floor(Math.random() * personas.length)]
    navigate(`/p/${pick.id}`)
  }

  return (
    <div className="persona-transition relative flex h-dvh max-h-dvh flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-11 [scrollbar-gutter:stable]">
        <Layout onSwitchPersona={() => navigate('/')} />
      </div>
      <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] flex w-full min-h-0 flex-row flex-wrap items-center gap-x-2 gap-y-1 border-t border-base-content/10 bg-base-300/90 px-3 py-1.5 text-base-content backdrop-blur-sm">
        <div className="flex min-w-0 flex-1 items-center justify-start gap-0.5 pointer-events-auto">
          <button
            type="button"
            className="btn btn-xs btn-square btn-ghost"
            aria-label="Home"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-xs btn-square btn-primary"
            aria-label="Random persona"
            onClick={handleRandomPersona}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>
        <p className="pointer-events-none m-0 min-w-0 max-w-[min(50vw,14rem)] flex-1 truncate text-center text-xs font-medium leading-tight opacity-90 sm:max-w-none">
          {activePersona.label}
        </p>
        <p className="pointer-events-auto m-0 flex min-w-0 flex-1 justify-end text-[10px] leading-tight opacity-80">
          <a
            href="https://infiniwa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover link-primary"
          >
            made by infiniwa
          </a>
        </p>
      </footer>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/p/:personaId" element={<PersonaRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <PersonaProvider>
      <AppRoutes />
    </PersonaProvider>
  )
}
