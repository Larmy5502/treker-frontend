import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import TopNavbar from './TopNavbar';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import profileIcon from '../assets/profile-icon.png';
import lockIcon from '../assets/lock-icon.png';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    re_new_password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    fetch('http://localhost:8000/auth/users/me/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          position: data.position || '',
          department: data.department || ''
        });
      })
      .catch(err => console.error('Ошибка загрузки профиля:', err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    fetch('http://localhost:8000/auth/users/me/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) alert('Данные обновлены');
        else throw new Error('Ошибка обновления');
      })
      .catch(err => alert(err.message));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    fetch('http://localhost:8000/auth/users/set_password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
        re_new_password: passwordData.re_new_password
      })
    })
      .then(res => {
        if (res.ok) {
          alert('Пароль успешно изменён');
          setPasswordData({ current_password: '', new_password: '', re_new_password: '' });
        } else {
          return res.json().then(data => { throw new Error(JSON.stringify(data)); });
        }
      })
      .catch(err => alert('Ошибка смены пароля: ' + err.message));
  };

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
          <button className="profile-back-btn" onClick={() => navigate(-1)}>← Назад</button>

          {activeTab === 'profile' && userData && (
            <>
              <div className="profile-header">
                <img src={avatarIcon} alt="Аватар" className="profile-avatar" />
                <div className="profile-name">{formData.first_name} {formData.last_name}</div>
                <div className="profile-username">@{formData.email.split('@')[0]}</div>

              </div>

              <form className="profile-form" onSubmit={handleSaveProfile}>
                <div className="profile-form-row">
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Имя" />
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Фамилия" />
                </div>
                <div className="profile-form-row">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Почта" />
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон" />
                </div>
                <div className="profile-form-row">
                  <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Должность" />
                  <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Отдел" />
                </div>

                <button type="submit" className="profile-save-btn">СОХРАНИТЬ</button>
              </form>
            </>
          )}

          {activeTab === 'password' && (
            <>
              <div className="profile-header">
                <div className="profile-name">Сменить пароль</div>
              </div>

              <form className="profile-form" onSubmit={handleChangePassword}>
                <div className="profile-form-row">
                  <input type="password" name="current_password" value={passwordData.current_password} onChange={handlePasswordChange} placeholder="Текущий пароль" />
                </div>
                <div className="profile-form-row">
                  <input type="password" name="new_password" value={passwordData.new_password} onChange={handlePasswordChange} placeholder="Новый пароль" />
                </div>
                <div className="profile-form-row">
                  <input type="password" name="re_new_password" value={passwordData.re_new_password} onChange={handlePasswordChange} placeholder="Повторите новый пароль" />
                </div>

                <button type="submit" className="profile-save-btn">СОХРАНИТЬ</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
