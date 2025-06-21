<<<<<<< HEAD
// src/components/TopNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/TopNavbar.css';

import avatarIcon from '../assets/avatar_9341633 2.svg';
import boardsIcon from '../assets/boards.png';
import appendIcon from '../assets/append.png';
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
=======
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/TopNavbar.css";
import FilterDropdown from "../components/FilterDropdown";
import TitleEditModal from "../components/TitleEditModal";
import InviteModal from "../components/InviteModal";

import avatarIcon from "../assets/avatar_9341633 2.svg";
import boardsIcon from "../assets/boards.png";
import appendIcon from "../assets/append.png";
import letterpIcon from "../assets/letterp.png";
import cardIcon from "../assets/card.png";
import listIcon from "../assets/list.png";
import reportsIcon from "../assets/reports.png";
import columnIcon from "../assets/column.png";
import filterIcon from "../assets/filter.png";
import inviteIcon from "../assets/invite-user.png";

function TopNavbar({
  toggleSidebar,
  hideNavButtons,
  boardsByProject,
  setBoardsByProject,
  refreshColumns,
  openTaskModal,
  onApplyFilters,
>>>>>>> 043711b (финал)
}) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
<<<<<<< HEAD

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
  const closeComingSoon = () => setIsComingSoonOpen(false);
=======
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [createType, setCreateType] = useState(null);

  const [projectTitle, setProjectTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const [userInfo, setUserInfo] = useState({ email: "", fullName: "" });
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const addBtnRef = useRef(null);
  const filterBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [filterDropdownPos, setFilterDropdownPos] = useState({
    top: 0,
    left: 0,
  });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleAddCardClick = () => {
    setIsAddMenuOpen(false);
    openTaskModal();
  };

  const handleTaskConfirm = async (taskTitle) => {
    setIsTaskModalOpen(false);

    const token = localStorage.getItem("access");
    if (!token) return;

    const match = location.pathname.match(/\/projects\/(\d+)\/boards\/(\d+)/);
    const boardIndex = match ? parseInt(match[2]) : null;
    const currentProjectId = match ? match[1] : null;
    if (!currentProjectId || boardIndex === null) return;

    const card = boardsByProject?.[currentProjectId]?.cards?.[boardIndex];
    if (!card) return;

    try {
      const res = await fetch(
        `http://localhost:8000/tasks/boards/${card.id}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: taskTitle,
            description: "",
            priority: 1,
            type: 0,
            column: null,
            performer: null,
            project: parseInt(currentProjectId),
            board: card.id,
            tag_ids: [],
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Ошибка ${res.status}: ${errorText}`);
      }

      await res.json();
      refreshColumns?.();
    } catch (err) {
      console.error("Ошибка при добавлении задачи:", err);
    }
  };

  const hideAddButton =
    currentPath.includes("/list") || currentPath.includes("/reports");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;
    fetch("http://localhost:8000/auth/users/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setUserInfo({
          email: data.email || "",
          fullName: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token || !projectId) return;
    const titleFromState = boardsByProject?.[projectId]?.title;
    if (titleFromState) {
      setProjectTitle(titleFromState);
    } else {
      fetch(`http://localhost:8000/projects/${projectId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => setProjectTitle(data.title))
        .catch(() => setProjectTitle(`Проект ${projectId}`));
    }
  }, [projectId, boardsByProject]);

  useEffect(() => {
    if (isAddMenuOpen && addBtnRef.current) {
      const rect = addBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isAddMenuOpen]);

  useEffect(() => {
    if (isFilterOpen && filterBtnRef.current) {
      const rect = filterBtnRef.current.getBoundingClientRect();
      setFilterDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isFilterOpen]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !addBtnRef.current?.contains(event.target)
      ) {
        setIsAddMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
    setInputValue(projectTitle);
  };

  const handleTitleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTitleBlur = async () => {
    const newTitle = inputValue.trim();
    setIsEditing(false);
    if (!newTitle || newTitle === projectTitle) return;

    const token = localStorage.getItem("access");
    if (!token || !projectId) return;

    try {
      const res = await fetch(`http://localhost:8000/projects/${projectId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error();
      setProjectTitle(newTitle);
      setBoardsByProject((prev) => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          title: newTitle,
        },
      }));
    } catch (err) {
      console.error("Ошибка при обновлении названия проекта:", err);
    }
  };

  const handleLogout = () => navigate("/");
  const handleProfileSettings = () => navigate("/profile");
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const closeComingSoon = () => setIsComingSoonOpen(false);

  const handleInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const match = location.pathname.match(/\/projects\/(\d+)\/boards\/(\d+)/);
    const boardIndex = match ? parseInt(match[2]) : null;
    const currentProjectId = match ? match[1] : null;
    if (!currentProjectId || boardIndex === null) return;

    const card = boardsByProject?.[currentProjectId]?.cards?.[boardIndex];
    if (!card) return;

    try {
      const res = await fetch(
        `http://localhost:8000/tasks/boards/${card.id}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: "Новая задача",
            description: "",
            priority: 1, // поставь корректное значение
            type: 0, // если у тебя есть типы
            column: null, // если есть колонка — укажи её id
            performer: null, // если есть исполнитель
            project: parseInt(currentProjectId),
            board: card.id,
            tag_ids: [],
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Ошибка: ${res.status} - ${errorText}`);
      }

      await res.json();
      refreshColumns?.();
      setIsAddMenuOpen(false);
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    }
  };

  const handleAddProject = () => {
    setCreateType("project");
    setIsTitleModalOpen(true);
  };

  const handleAddBoard = () => {
    setCreateType("board");
    setIsTitleModalOpen(true);
  };

  const handleAddColumnToDB = () => {
    setCreateType("column");
    setIsTitleModalOpen(true);
  };

  const handleConfirmCreate = async (title) => {
    const token = localStorage.getItem("access");
    if (!token || !projectId) return;

    try {
      if (createType === "project") {
        const res = await fetch(`http://localhost:8000/projects/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        });
        const newProject = await res.json();
        const resCards = await fetch(
          `http://localhost:8000/cards/projects/${newProject.id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const cards = (await resCards.ok) ? await resCards.json() : [];
        setBoardsByProject((prev) => ({
          ...prev,
          [newProject.id]: {
            ...newProject,
            cards: cards,
          },
        }));
        navigate(`/projects/${newProject.id}/boards/0`);
      }

      if (createType === "board") {
        const res = await fetch(
          `http://localhost:8000/cards/projects/${projectId}/cards/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title }),
          }
        );
        const newCard = await res.json();
        setBoardsByProject((prev) => ({
          ...prev,
          [projectId]: {
            ...prev[projectId],
            cards: [...(prev[projectId]?.cards || []), newCard],
          },
        }));
        const newIndex = boardsByProject[projectId]?.cards?.length || 0;
        navigate(`/projects/${projectId}/boards/${newIndex}`);
      }

      if (createType === "column") {
        const match = location.pathname.match(/\/boards\/(\d+)/);
        const boardIndex = match ? parseInt(match[1]) : null;
        const card = boardsByProject?.[projectId]?.cards?.[boardIndex];
        if (!card) return;

        await fetch(`http://localhost:8000/cards/${card.id}/columns/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        });
        refreshColumns?.();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTitleModalOpen(false);
      setCreateType(null);
      setIsAddMenuOpen(false);
    }
  };
>>>>>>> 043711b (финал)

  return (
    <header className="top-navbar">
      <div className="project-name">
<<<<<<< HEAD
        {!isSidebarOpen && (
          <>
            <div className="project-logo" onClick={toggleSidebar}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="project-name-text">{projectTitle}</div>
          </>
=======
        <div className="project-logo" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {isEditing ? (
          <input
            ref={inputRef}
            className="project-name-input"
            value={inputValue}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current.blur()}
          />
        ) : (
          <div
            className="project-name-text"
            onDoubleClick={handleTitleDoubleClick}
            title="Двойной клик для переименования"
          >
            {projectTitle}
          </div>
>>>>>>> 043711b (финал)
        )}
      </div>

      {!hideNavButtons && (
        <div className="top-nav-wrapper">
          <div className="nav-group">
            <button
<<<<<<< HEAD
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
=======
              className={`nav-btn ${
                /\/projects\/\d+\/boards\/\d+\/?$/.test(currentPath)
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                const boardIndex =
                  localStorage.getItem("activeBoardIndex") || 0;
                navigate(`/projects/${projectId}/boards/${boardIndex}`);
              }}
            >
              <img
                src={boardsIcon}
                alt="Доски"
                className="nav-icon_icon-boards"
              />{" "}
              ДОСКИ
            </button>
            <button
              className={`nav-btn ${
                currentPath.includes("/tasks") ? "active" : ""
              }`}
              onClick={() => {
                const match = location.pathname.match(/\/boards\/(\d+)/);
                const boardIndex = match ? parseInt(match[1]) : 0;
                const boardId =
                  boardsByProject?.[projectId]?.cards?.[boardIndex]?.id;

                if (boardId) {
                  localStorage.setItem("activeBoardIndex", boardIndex);
                  navigate(`/projects/${projectId}/boards/${boardId}/tasks`);
                } else {
                  console.warn(
                    "Не удалось определить boardId для списка задач"
                  );
                }
              }}
            >
              <img src={listIcon} alt="Список" className="nav-icon_icon-list" />{" "}
>>>>>>> 043711b (финал)
              СПИСОК
            </button>

            <button
<<<<<<< HEAD
              className={`nav-btn ${currentPath.includes('/reports') ? 'active' : ''}`}
              onClick={() => {
                const boardIndex = localStorage.getItem('activeBoardIndex') || 0;
                navigate(`/projects/${projectId}/boards/${boardIndex}/reports`);
              }}
            >
              <img src={reportsIcon} alt="Отчёты" className="nav-icon" />
              ОТЧЕТЫ
            </button>

=======
              className={`nav-btn ${
                currentPath.includes("/reports") ? "active" : ""
              }`}
              onClick={() => {
                const boardIndex =
                  localStorage.getItem("activeBoardIndex") || 0;
                navigate(`/projects/${projectId}/boards/${boardIndex}/reports`);
              }}
            >
              <img
                src={reportsIcon}
                alt="Отчёты"
                className="nav-icon_icon-reports"
              />{" "}
              ОТЧЕТЫ
            </button>
>>>>>>> 043711b (финал)
            {!hideAddButton && (
              <button
                ref={addBtnRef}
                className="nav-btn add-main"
<<<<<<< HEAD
                onClick={() => setIsAddMenuOpen(prev => !prev)}
              >
                <img src={appendIcon} alt="Добавить" className="nav-icon" />
=======
                onClick={() => setIsAddMenuOpen((prev) => !prev)}
              >
                <img
                  src={appendIcon}
                  alt="Добавить"
                  className="nav-icon_icon-add"
                />{" "}
>>>>>>> 043711b (финал)
                ДОБАВИТЬ
              </button>
            )}
          </div>
          <button
            ref={filterBtnRef}
            className={`filter-btn ${isFilterOpen ? "active" : ""}`}
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <img src={filterIcon} alt="Фильтры" className="filter-icon" />{" "}
            ФИЛЬТРЫ
          </button>
        </div>
      )}

      {isAddMenuOpen && (
<<<<<<< HEAD
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
=======
        <div ref={dropdownRef} className="topnav-dropdown">
          <button onClick={handleAddBoard}>
            <img src={boardsIcon} alt="Доска" /> ДОСКА
          </button>
          <button onClick={handleAddCardClick}>
            <img src={cardIcon} alt="Карточка" /> КАРТОЧКА
          </button>

>>>>>>> 043711b (финал)
          <button onClick={handleAddProject}>
            <img src={letterpIcon} alt="Проект" /> ПРОЕКТ
          </button>
          <button onClick={handleAddColumnToDB}>
            <img src={columnIcon} alt="Колонка" /> КОЛОНКА
          </button>
        </div>
      )}

<<<<<<< HEAD
      <div className="profile-icon">
=======
      <FilterDropdown
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filterBtnRef={filterBtnRef}
        filterDropdownPos={filterDropdownPos}
        setFilterDropdownPos={setFilterDropdownPos}
        onApplyFilters={onApplyFilters}
      />

      <div className="profile-icon">
        <img
          src={inviteIcon}
          alt="Пригласить пользователя"
          className="invite-icon"
          title="Пригласить пользователя"
          onClick={handleInviteClick}
        />
>>>>>>> 043711b (финал)
        <img
          src={avatarIcon}
          alt="Профиль"
          className="avatar"
          onClick={toggleProfileMenu}
        />
        {isProfileMenuOpen && (
          <div className="profile-menu">
<<<<<<< HEAD
            <img src={avatarIcon} alt="Аватар" className="profile-menu-avatar" />
            <div className="profile-menu-name">{userInfo.fullName || 'Без имени'}</div>
            <div className="profile-menu-username">{userInfo.email || 'Нет email'}</div>
            <button className="profile-menu-btn" onClick={handleProfileSettings}>
=======
            <img
              src={avatarIcon}
              alt="Аватар"
              className="profile-menu-avatar"
            />
            <div className="profile-menu-name">
              {userInfo.fullName || "Без имени"}
            </div>
            <div className="profile-menu-username">
              {userInfo.email || "Нет email"}
            </div>
            <button
              className="profile-menu-btn"
              onClick={handleProfileSettings}
            >
>>>>>>> 043711b (финал)
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
<<<<<<< HEAD
          <div className="coming-soon-content" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔧</div>
=======
          <div
            className="coming-soon-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>🔧</div>
>>>>>>> 043711b (финал)
            <h1>Раздел в разработке</h1>
            <p>
              Мы уже работаем над этим! Скоро здесь появится новый функционал.
            </p>
          </div>
        </div>
      )}
      {isInviteModalOpen && (
        <InviteModal
          onClose={() => setIsInviteModalOpen(false)}
          projectId={projectId}
        />
      )}
      {isTitleModalOpen && (
        <TitleEditModal
          onConfirm={handleConfirmCreate}
          onCancel={() => {
            setIsTitleModalOpen(false);
            setCreateType(null);
          }}
        />
      )}
    </header>
  );
}

export default TopNavbar;
