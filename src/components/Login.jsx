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
      setError('Введите почту и пароль');
      return;
    }

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      setLoading(true)
      setError('')

=======
=======
>>>>>>> 043711b (финал)
      setLoading(true);
      setError('');

      // 🔐 Запрос на логин
<<<<<<< HEAD
>>>>>>> ace2cd8 (финал 1)
=======
>>>>>>> 043711b (финал)
      const response = await fetch('http://localhost:8000/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 043711b (финал)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Ошибка входа');
      }

      // 💾 Сохраняем токены
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      // 📦 Получаем проекты пользователя
      const projectsRes = await fetch('http://localhost:8000/projects/', {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (!projectsRes.ok) {
        throw new Error('Ошибка получения проектов');
      }

      const projects = await projectsRes.json();

      if (!projects.length) {
        throw new Error('Нет доступных проектов');
      }

      const firstProjectId = projects[0].id;

      // 📦 Получаем доски (cards) проекта
      const cardsRes = await fetch(`http://localhost:8000/cards/projects/${firstProjectId}/cards/`, {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (!cardsRes.ok) {
        throw new Error('Ошибка получения досок проекта');
      }

      const cards = await cardsRes.json();

      if (!cards.length) {
        throw new Error('В проекте нет досок');
      }

      // ✅ Переход на первую доску
      navigate(`/projects/${firstProjectId}/boards/0`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
>>>>>>> ace2cd8 (финал 1)
=======
>>>>>>> 043711b (финал)

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
