import illustration from '../assets/illustration.png'

function Register({ onSwitch }) {
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

            <div className="name-row">
              <input type="text" placeholder="имя" className="half" />
              <input type="text" placeholder="фамилия" className="half" />
            </div>

            <input type="email" placeholder="электронная почта" />
            <input type="tel" placeholder="номер телефона" />
            <input type="password" placeholder="пароль" />
            <input type="password" placeholder="подтвердите пароль" />

            <label className="consent">
              <input type="checkbox" />
              <span>Даю согласие на обработку персональных данных</span>
            </label>

            <button>ОТПРАВИТЬ</button>
          </div>

          {/* Вынесенная ссылка ВОЙТИ */}
          <p className="back-link" onClick={onSwitch}>＜ВОЙТИ</p>
        </div>
      </div>
    </div>
  )
}

export default Register
