import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ProjectBoard from './components/ProjectBoard'
import Profile from './components/Profile'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project" element={<ProjectBoard />} />
          <Route path="/profile" element={<Profile />} /> {/* ← ОБЯЗАТЕЛЬНО */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
