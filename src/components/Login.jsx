import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import illustration from '../assets/illustration.png'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Введите почту и пароль')
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch('http://localhost:8000/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Ошибка входа')
      }

      // Сохраняем токены
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      navigate('/project')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="logo">TREKER</div>
        <img src={illustration} alt="Иллюстрация" className="illustration" />
      </div>

      <div className="divider"></div>

      <div className="login-right">
        <div className="login-box">
          <h2>АВТОРИЗАЦИЯ</h2>

          {error && <div className="info-message">{error}</div>}

          <input
            type="email"
            placeholder="электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Загрузка...' : 'ВОЙТИ'}
          </button>

          <p className="link" onClick={() => navigate('/register')}>
            РЕГИСТРАЦИЯ
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
