import { useNavigate } from 'react-router-dom'
import illustration from '../assets/illustration.png'
import { useRegisterHandler } from '../useRegisterHandler'
import InputMask from 'react-input-mask'

function Register() {
  const navigate = useNavigate()
  const { form, handleChange, handleRegister, message } = useRegisterHandler()

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="logo">TREKER</div>
        <img src={illustration} alt="Иллюстрация" className="illustration" />
      </div>

      <div className="divider"></div>

      <div className="login-right">
        <div>
          <div className="register-box">
            <h2>РЕГИСТРАЦИЯ</h2>

            {message && <div className="info-message">{message}</div>}

            <div className="name-row">
              <input
                type="text"
                placeholder="имя"
                className="half"
                value={form.firstName}
                onChange={handleChange('firstName')}
              />
              <input
                type="text"
                placeholder="фамилия"
                className="half"
                value={form.lastName}
                onChange={handleChange('lastName')}
              />
            </div>

            <input
              type="email"
              placeholder="электронная почта"
              value={form.email}
              onChange={handleChange('email')}
            />

            <input
              type="tel"
              placeholder="номер телефона"
              value={form.phone}
              onChange={handleChange('phone')}
              className="full"
            />


            <input
              type="password"
              placeholder="пароль"
              value={form.password}
              onChange={handleChange('password')}
            />
            <input
              type="password"
              placeholder="подтвердите пароль"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />

            <label className="consent">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={handleChange('consent')}
              />
              <span>Даю согласие на обработку персональных данных</span>
            </label>

            <button onClick={handleRegister}>ОТПРАВИТЬ</button>
          </div>

          <p className="back-link" onClick={() => navigate('/')}>＜ВОЙТИ</p>
        </div>
      </div>
    </div>
  )
}

export default Register
