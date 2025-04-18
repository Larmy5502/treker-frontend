import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="app-container">
      {showLogin ? <Login onSwitch={() => setShowLogin(false)} /> : <Register onSwitch={() => setShowLogin(true)} />}
    </div>
  )
}

export default App
