import { useState } from 'react'
import { PersonaProvider, usePersona } from './context/PersonaContext'
import PersonaSelector from './components/PersonaSelector'

function AppInner() {
  const { activePersona, setActivePersona } = usePersona()
  const [showSelector, setShowSelector] = useState(true)

  function handleSelectPersona(persona) {
    setActivePersona(persona)
    setShowSelector(false)
  }

  function handleSwitchPersona() {
    setShowSelector(true)
  }

  if (showSelector) {
    return <PersonaSelector onSelect={handleSelectPersona} />
  }

  if (!activePersona) return null

  const { Layout } = activePersona

  return (
    <div className="persona-transition">
      <Layout onSwitchPersona={handleSwitchPersona} />
    </div>
  )
}

export default function App() {
  return (
    <PersonaProvider>
      <AppInner />
    </PersonaProvider>
  )
}
