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
  );
});

export default CardMenu;
