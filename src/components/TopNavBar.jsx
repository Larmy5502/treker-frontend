// src/components/TopNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/TopNavbar.css';

import avatarIcon from '../assets/avatar_9341633 2.svg';
import boardsIcon from '../assets/boards.png';
import appendIcon from '../assets/append.png';
import letterIcon from '../assets/letter.png';
import faqIcon from '../assets/faq.png';
import searchIcon from '../assets/search.png';
import letterpIcon from '../assets/letterp.png';
import cardIcon from '../assets/card.png';
import listIcon from '../assets/list.png';
import reportsIcon from '../assets/reports.png';
import columnIcon from '../assets/column.png';

function TopNavbar({
  toggleSidebar,
  isSidebarOpen,
  hideNavButtons,
  boardsByProject,
  setBoardsByProject,
  refreshColumns
}) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [projectTitle, setProjectTitle] = useState('');
  const [userInfo, setUserInfo] = useState({ email: '', fullName: '' });
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  // Скрывать кнопку "ДОБАВИТЬ" на страницах СПИСОК (/list) и ОТЧЕТЫ (/reports)
  const hideAddButton = currentPath.includes('/list') || currentPath.includes('/reports');

  // Загрузка информации о пользователе
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;
    fetch('http://localhost:8000/auth/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setUserInfo({
          email: data.email || '',
          fullName: `${data.first_name || ''} ${data.last_name || ''}`.trim()
        });
      })
      .catch(console.error);
  }, []);

  // Загрузка названия проекта
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token || !projectId) return;
    const titleFromState = boardsByProject?.[projectId]?.title;
    if (titleFromState) {
      setProjectTitle(titleFromState);
    } else {
      fetch(`http://localhost:8000/projects/${projectId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => setProjectTitle(data.title))
        .catch(() => setProjectTitle(`Проект ${projectId}`));
    }
  }, [projectId, boardsByProject]);

  // Вычисляем позицию выпадающего меню добавления
  useEffect(() => {
    if (isAddMenuOpen && addBtnRef.current) {
      const rect = addBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  }, [isAddMenuOpen]);

  // Обработчики добавления
  const handleAddTask = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;
    const match = location.pathname.match(/\/projects\/(\d+)\/boards\/(\d+)/);
    const boardIndex = match ? parseInt(match[2]) : null;
    const currentProjectId = match ? match[1] : null;
    if (!currentProjectId || boardIndex === null) return;
    const card = boardsByProject?.[currentProjectId]?.cards?.[boardIndex];
    if (!card) return;
    try {
      const res = await fetch(`http://localhost:8000/cards/${card.id}/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Новая задача', description: '', priority: 'низкий' })
      });
      if (!res.ok) throw new Error();
      await res.json();
      refreshColumns?.();
      setIsAddMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBoard = async () => {
    const token = localStorage.getItem('access');
    if (!token || !projectId) return;
    try {
      const res = await fetch(`http://localhost:8000/cards/projects/${projectId}/cards/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Новая доска' })
      });
      if (!res.ok) throw new Error();
      const newCard = await res.json();
      setBoardsByProject(prev => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          cards: [...(prev[projectId]?.cards || []), newCard]
        }
      }));
      const newIndex = (boardsByProject[projectId]?.cards?.length || 0);
      navigate(`/projects/${projectId}/boards/${newIndex}`);
      setIsAddMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;
    try {
      const resProject = await fetch(`http://localhost:8000/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Новый проект' })
      });
      if (!resProject.ok) throw new Error();
      const newProject = await resProject.json();
      const newProjectId = newProject.id;
      const resCard = await fetch(`http://localhost:8000/cards/projects/${newProjectId}/cards/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Первая доска' })
      });
      if (!resCard.ok) throw new Error();
      const newCard = await resCard.json();
      setBoardsByProject(prev => ({
        ...prev,
        [newProjectId]: { ...newProject, cards: [newCard] }
      }));
      navigate(`/projects/${newProjectId}/boards/0`);
      setIsAddMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddColumnToDB = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;
    const match = location.pathname.match(/\/boards\/(\d+)/);
    const boardIndex = match ? parseInt(match[1]) : null;
    if (!projectId || boardIndex === null) return;
    const card = boardsByProject?.[projectId]?.cards?.[boardIndex];
    if (!card) return;
    try {
      const res = await fetch(`http://localhost:8000/cards/${card.id}/columns/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Новая колонка' })
      });
      if (!res.ok) throw new Error();
      await res.json();
      refreshColumns?.();
      setIsAddMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Профиль
  const toggleProfileMenu = () => setIsProfileMenuOpen(prev => !prev);
  const handleLogout = () => navigate('/');
  const handleProfileSettings = () => navigate('/profile');
  const openComingSoon = () => setIsComingSoonOpen(true);
  const closeComingSoon = () => setIsComingSoonOpen(false);

  return (
    <header className="top-navbar">
      <div className="project-name">
        {!isSidebarOpen && (
          <>
            <div className="project-logo" onClick={toggleSidebar}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="project-name-text">{projectTitle}</div>
          </>
        )}
      </div>

      {!hideNavButtons && (
        <div className="top-nav-wrapper">
          <div className="nav-group">
            <button
              className={`nav-btn ${/\/boards(\/\d+)?(\/reports)?$/.test(currentPath) ? 'active' : ''}`}
              onClick={() => {
                const boardIndex = localStorage.getItem('activeBoardIndex') || 0;
                navigate(`/projects/${projectId}/boards/${boardIndex}`);
              }}
            >
              <img src={boardsIcon} alt="Доски" className="nav-icon" />
              ДОСКИ
            </button>

            <button
              className={`nav-btn ${currentPath.includes('/list') ? 'active' : ''}`}
              onClick={() => {
                const match = location.pathname.match(/\/boards\/(\d+)/);
                if (match) localStorage.setItem('activeBoardIndex', match[1]);
                navigate(`/projects/${projectId}/list`);
              }}
            >
              <img src={listIcon} alt="Список" className="nav-icon" />
              СПИСОК
            </button>

            <button
              className={`nav-btn ${currentPath.includes('/reports') ? 'active' : ''}`}
              onClick={() => {
                const boardIndex = localStorage.getItem('activeBoardIndex') || 0;
                navigate(`/projects/${projectId}/boards/${boardIndex}/reports`);
              }}
            >
              <img src={reportsIcon} alt="Отчёты" className="nav-icon" />
              ОТЧЕТЫ
            </button>

            {!hideAddButton && (
              <button
                ref={addBtnRef}
                className="nav-btn add-main"
                onClick={() => setIsAddMenuOpen(prev => !prev)}
              >
                <img src={appendIcon} alt="Добавить" className="nav-icon" />
                ДОБАВИТЬ
              </button>
            )}
          </div>
        </div>
      )}

      {isAddMenuOpen && (
        <div
          className="topnav-dropdown"
          style={{ top: dropdownPos.top + 6, left: dropdownPos.left }}
        >
          <button onClick={handleAddBoard}>
            <img src={boardsIcon} alt="Доска" /> ДОСКА
          </button>
          <button onClick={handleAddTask}>
            <img src={cardIcon} alt="Карточка" /> КАРТОЧКА
          </button>
          <button onClick={handleAddProject}>
            <img src={letterpIcon} alt="Проект" /> ПРОЕКТ
          </button>
          <button onClick={handleAddColumnToDB}>
            <img src={columnIcon} alt="Колонка" /> КОЛОНКА
          </button>
        </div>
      )}

      <div className="profile-icon">
        <img
          src={avatarIcon}
          alt="Профиль"
          className="avatar"
          onClick={toggleProfileMenu}
        />

        {isProfileMenuOpen && (
          <div className="profile-menu">
            <img src={avatarIcon} alt="Аватар" className="profile-menu-avatar" />
            <div className="profile-menu-name">{userInfo.fullName || 'Без имени'}</div>
            <div className="profile-menu-username">{userInfo.email || 'Нет email'}</div>
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
          <div className="coming-soon-content" onClick={e => e.stopPropagation()}>
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
