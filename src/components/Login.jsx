import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import illustration from '../assets/illustration.png'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email || !password) {
      setError('Введите почту и пароль')
      return
    }

    // Заглушка — в будущем будет проверка с сервером
    console.log('Вход: ', { email, password })
    localStorage.setItem('token', 'dummy-token')
    navigate('/project')
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

          <button onClick={handleLogin}>ВОЙТИ</button>
          <p className="link" onClick={() => navigate('/register')}>РЕГИСТРАЦИЯ</p>
        </div>
      </div>
    </div>
  )
}

export default Login
