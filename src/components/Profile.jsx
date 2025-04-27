import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import TopNavbar from './TopNavbar';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import profileIcon from '../assets/profile-icon.png';
import lockIcon from '../assets/lock-icon.png';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  return (
    <div className="layout">
      <TopNavbar hideNavButtons={true} />

      <div className="profile-page">
        <div className="profile-sidebar">
          <div
            className={`profile-sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <img src={profileIcon} alt="Профиль" className="profile-sidebar-icon" />
            ПРОФИЛЬ
          </div>
          <div
            className={`profile-sidebar-item ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <img src={lockIcon} alt="Сменить пароль" className="profile-sidebar-icon" />
            СМЕНИТЬ ПАРОЛЬ
          </div>
        </div>

        <div className="profile-content">
          {/* Кнопка Назад */}
          <button className="profile-back-btn" onClick={() => navigate(-1)}>
            ← Назад
          </button>

          {activeTab === 'profile' && (
            <>
              <div className="profile-header">
                <img src={avatarIcon} alt="Аватар" className="profile-avatar" />
                <div className="profile-name">Иван Иванов</div>
                <div className="profile-username">@IvanIvanov</div>
              </div>

              <form className="profile-form">
                <div className="profile-form-row">
                  <input type="text" placeholder="Иван" />
                  <input type="text" placeholder="Иванов" />
                </div>
                <div className="profile-form-row">
                  <input type="email" placeholder="IvanIvanov@mail.ru" />
                  <input type="text" placeholder="+78005553535" />
                </div>
                <div className="profile-form-row">
                  <input type="text" placeholder="Стажер" />
                  <input type="text" placeholder="IT" />
                </div>

                <button type="submit" className="profile-save-btn">
                  СОХРАНИТЬ
                </button>
              </form>
            </>
          )}

          {activeTab === 'password' && (
            <>
              <div className="profile-header">
                <div className="profile-name">Сменить пароль</div>
              </div>

              <form className="profile-form">
                <div className="profile-form-row">
                  <input type="password" placeholder="Текущий пароль" />
                </div>
                <div className="profile-form-row">
                  <input type="password" placeholder="Новый пароль" />
                </div>
                <div className="profile-form-row">
                  <input type="password" placeholder="Повторите новый пароль" />
                </div>

                <button type="submit" className="profile-save-btn">
                  СОХРАНИТЬ
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
