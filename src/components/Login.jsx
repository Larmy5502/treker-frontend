import illustration from '../assets/illustration.png'

function Login({ onSwitch }) {
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
          <input type="email" placeholder="электронная почта" />
          <input type="password" placeholder="пароль" />
          <button>ВОЙТИ</button>
          <p className="link" onClick={onSwitch}>РЕГИСТРАЦИЯ</p>
        </div>
      </div>
    </div>
  )
}

export default Login
