<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import '../styles/CardMenu.css';

import tagIcon from '../assets/icon-tag-folder.png';
import copyIcon from '../assets/icon-copy.png';
import duplicateIcon from '../assets/icon-duplicate.png';
import archiveIcon from '../assets/icon-archive.png';

const CardMenu = React.forwardRef(({ task, onDelete }, ref) => {
  const menuRef = ref || useRef();
  const [copyOpen, setCopyOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCopyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="card-menu" ref={menuRef}>
      <div className="card-menu__title">{task.title.toUpperCase()}</div>

      <button className="card-menu__item">
        <img src={tagIcon} alt="Метка" />
        <span>ДОБАВИТЬ МЕТКУ</span>
        <span className="arrow">›</span>
      </button>

      <div className="card-menu__item" onClick={() => setCopyOpen(!copyOpen)}>
        <img src={copyIcon} alt="Копировать" />
        <span>СКОПИРОВАТЬ</span>
        <span className="arrow" style={{ transform: copyOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
      </div>

      {copyOpen && (
        <div className="card-menu__submenu">
          <button onClick={() => copyToClipboard(task.id)}>id карточки</button>
          <button onClick={() => copyToClipboard(`${task.id}: ${task.title}`)}>id и название карточки</button>
          <button onClick={() => copyToClipboard(window.location.href)}>ссылку на карточку</button>
        </div>
      )}

      <div className="card-menu__divider" />

      <button className="card-menu__item">
        <img src={duplicateIcon} alt="Копия" />
        <span>СОЗДАТЬ КОПИЮ</span>
      </button>

      <button className="card-menu__item">
        <img src={archiveIcon} alt="Архив" />
        <span>ПЕРЕМЕСТИТЬ В АРХИВ</span>
      </button>

      <div className="card-menu__divider" />

      <button className="card-menu__item delete" onClick={() => onDelete(task.id)}>
        <span>УДАЛИТЬ</span>
      </button>
    </div>
=======
import React, { useState, useRef, useEffect } from "react";
import tagIcon from "../assets/icon-tag-folder.png";
import copyIcon from "../assets/icon-copy.png";
import duplicateIcon from "../assets/icon-duplicate.png";
import archiveIcon from "../assets/icon-archive.png";
import TagPopup from "./TagPopup";
import "../styles/CardMenu.css";

const CardMenu = React.forwardRef(({ task, onDelete, setTasks }, ref) => {
  const menuRef = ref || useRef();
  const [copyOpen, setCopyOpen] = useState(false);
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [popupCoords, setPopupCoords] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCopyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDuplicateTask = () => {
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const duplicate = {
      ...task,
      id: Date.now(),
      title: task.title + " (копия)",
    };
    const originalIndex = allTasks.findIndex((t) => t.id === task.id);
    const updatedTasks = [
      ...allTasks.slice(0, originalIndex + 1),
      duplicate,
      ...allTasks.slice(originalIndex + 1),
    ];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    if (typeof setTasks === "function") {
      setTasks(updatedTasks);
    }
  };

  const handleOpenTagPopup = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupCoords({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width + 4,
    });
    setIsTagPopupOpen(true);
  };

  const handleDeleteTask = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.warn("Нет токена авторизации");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/tasks/tasks/${task.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        console.log("Задача успешно удалена");
        if (typeof onDelete === "function") {
          onDelete(task.id);
        }
      } else {
        console.error("Ошибка при удалении задачи:", res.status);
      }
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  return (
    <>
      <div className="card-menu" ref={menuRef}>
        <div className="card-menu__title">{task.title.toUpperCase()}</div>

        <div className="card-menu__item" onClick={() => setCopyOpen(!copyOpen)}>
          <img src={copyIcon} alt="Копировать" />
          <span>СКОПИРОВАТЬ</span>
          <span
            className="arrow"
            style={{ transform: copyOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ›
          </span>
        </div>

        {copyOpen && (
          <div className="card-menu__submenu">
            <button onClick={() => copyToClipboard(task.id)}>
              ID карточки
            </button>
            <button
              onClick={() => copyToClipboard(`${task.id}: ${task.title}`)}
            >
              ID и название карточки
            </button>
            <button onClick={() => copyToClipboard(window.location.href)}>
              Ссылку на карточку
            </button>
          </div>
        )}

        <div className="card-menu__divider" />

        <button className="card-menu__item" onClick={handleDuplicateTask}>
          <img src={duplicateIcon} alt="Копия" />
          <span>СОЗДАТЬ КОПИЮ</span>
        </button>

        <div className="card-menu__divider" />

        <button className="card-menu__item delete" onClick={handleDeleteTask}>
          <span>УДАЛИТЬ</span>
        </button>
      </div>

      {isTagPopupOpen && popupCoords && (
        <TagPopup
          style={{
            position: "absolute",
            top: popupCoords.top,
            left: popupCoords.left,
            zIndex: 9999,
          }}
          onClose={() => setIsTagPopupOpen(false)}
        />
      )}
    </>
>>>>>>> 043711b (финал)
  );
});

export default CardMenu;
