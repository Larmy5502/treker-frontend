import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopNavbar.css';
import avatarIcon from '../assets/avatar_9341633 2.svg';

// Импорт картинок для кнопок
import boardsIcon from '../assets/boards.png';
import listIcon from '../assets/list.png';
import reportsIcon from '../assets/reports.png';
import appendIcon from '../assets/append.png';
import letterIcon from '../assets/letter.png';
import faqIcon from '../assets/faq.png';
import searchIcon from '../assets/search.png';

function TopNavbar({ toggleSidebar, isSidebarOpen, hideNavButtons }) { // добавили проп hideNavButtons
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleProfileSettings = () => {
    navigate('/profile');
  };

  const openComingSoon = () => {
    setIsComingSoonOpen(true);
  };

  const closeComingSoon = () => {
    setIsComingSoonOpen(false);
  };

  return (
    <header className="top-navbar">
      <div className="project-name">
        {!isSidebarOpen && (
          <>
            <div className="project-logo" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="project-name-text">ПЕРВЫЙ ПРОЕКТ</div>
          </>
        )}
      </div>

      {/* Только если не hideNavButtons показываем 4 кнопки */}
      {!hideNavButtons && (
        <div className="top-nav-wrapper">
          <div className="nav-group">
            <button className="nav-btn active" onClick={openComingSoon}>
              <img src={boardsIcon} alt="Доски" className="nav-icon" />
              ДОСКИ
            </button>
            <button className="nav-btn" onClick={openComingSoon}>
              <img src={listIcon} alt="Список" className="nav-icon" />
              СПИСОК
            </button>
            <button className="nav-btn" onClick={openComingSoon}>
              <img src={reportsIcon} alt="Отчеты" className="nav-icon" />
              ОТЧЕТЫ
            </button>
            <button className="nav-btn" onClick={openComingSoon}>
              <img src={appendIcon} alt="Добавить" className="nav-icon" />
              ДОБАВИТЬ
            </button>
          </div>
        </div>
      )}

      <div className="profile-icon">
        <img src={letterIcon} alt="Письмо" className="icon-small" onClick={openComingSoon} />
        <img src={faqIcon} alt="Вопрос" className="icon-small" onClick={openComingSoon} />
        <img src={searchIcon} alt="Поиск" className="icon-small" onClick={openComingSoon} />
        <img
          src={avatarIcon}
          alt="Профиль"
          className="avatar"
          onClick={toggleProfileMenu}
          style={{ cursor: 'pointer' }}
        />

        {isProfileMenuOpen && (
          <div className="profile-menu">
            <img src={avatarIcon} alt="Аватар" className="profile-menu-avatar" />
            <div className="profile-menu-name">Иван Иванов</div>
            <div className="profile-menu-username">@IvanIvanov</div>
            <button className="profile-menu-btn" onClick={handleProfileSettings}>
              НАСТРОЙКИ ПРОФИЛЯ
            </button>
            <button className="profile-menu-exit" onClick={handleLogout}>
              ВЫХОД
            </button>
            <div className="profile-menu-treker">TREKER</div>
          </div>
        )}
      </div>

      {isComingSoonOpen && (
        <div className="coming-soon-modal" onClick={closeComingSoon}>
          <div className="coming-soon-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔧</div>
            <h1>Раздел в разработке</h1>
            <p>Мы уже работаем над этим! Скоро здесь появится новый функционал.</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default TopNavbar;
