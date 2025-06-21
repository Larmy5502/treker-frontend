<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import CardMenu from './CardMenu';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import '../styles/TaskCard.css';

function TaskCard({ task, index, onClick }) {
  const priorityMap = {
    'низкий': { class: 'low', color: '#e0f2e4', border: '#1b5e20' },
    'средний': { class: 'medium', color: '#fffbe6', border: '#d4a900' },
    'высокий': { class: 'high', color: '#fde2e1', border: '#c1121f' },
    'low': { class: 'low', color: '#e0f2e4', border: '#1b5e20' },
    'medium': { class: 'medium', color: '#fffbe6', border: '#d4a900' },
    'high': { class: 'high', color: '#fde2e1', border: '#c1121f' }
  };
  const currentPriority = priorityMap[task.priority] || {
    class: '',
    color: '#dce6f2',
    border: 'transparent'
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null);
  const menuRef = useRef(null);

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  };

  const effectivePriority = task.priority || 'low';
=======
import { useState, useEffect, useRef } from "react";
import { Draggable } from "@hello-pangea/dnd";
import CardMenu from "./CardMenu";
import TagPopup from "./TagPopup";
import avatarIcon from "../assets/avatar_9341633 2.svg";
import "../styles/TaskCard.css";

function TaskCard({ task, index, onClick, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTagPopup, setShowTagPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const cardRef = useRef(null);
  const menuRef = useRef(null);
  const popupRef = useRef(null);

  // Передаём id задачи в родитель при удалении
  const handleDelete = (taskId) => {
    if (typeof onDelete === "function") {
      onDelete(taskId);
    }
  };

  const handleOpenTagPopup = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width + 4,
    });
    setShowTagPopup(true);
  };

  const effectivePriority = Number(task.priority) || 1;

  const priorityLabels = {
    1: "Низкий",
    2: "Средний",
    3: "Высокий",
  };
>>>>>>> 043711b (финал)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        (!menuRef.current || !menuRef.current.contains(event.target))
      ) {
        setIsMenuOpen(false);
        setShowTagPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Draggable
<<<<<<< HEAD
      draggableId={task.id.toString()}
=======
      draggableId={task?.id?.toString() || "default-id"}
>>>>>>> 043711b (финал)
      index={index}
      isDragDisabled={isMenuOpen}
    >
      {(provided) => (
        <div
<<<<<<< HEAD
          className={`task-card ${currentPriority.class}`}
=======
          className="task-card"
>>>>>>> 043711b (финал)
          ref={(node) => {
            provided.innerRef(node);
            cardRef.current = node;
          }}
          {...provided.draggableProps}
          {...(!isMenuOpen && provided.dragHandleProps)}
<<<<<<< HEAD
          style={{
            ...provided.draggableProps.style,
            backgroundColor: currentPriority.color,
            borderLeft: `6px solid ${currentPriority.border}`
          }}
          onClick={(e) => {
            if (menuRef.current && menuRef.current.contains(e.target)) return;
=======
          style={provided.draggableProps.style}
          onClick={(e) => {
            if (
              menuRef.current?.contains(e.target) ||
              popupRef.current?.contains(e.target)
            )
              return;
>>>>>>> 043711b (финал)
            if (isMenuOpen) {
              setIsMenuOpen(false);
              setTimeout(() => onClick(), 0);
            } else {
              onClick();
            }
          }}
        >
          <div className="task-card-header">
            <p className="task-title" title={task.title}>
<<<<<<< HEAD
              {task.title.length > 32 ? task.title.slice(0, 32) + '…' : task.title}
=======
              {task.title?.length > 16
                ? task.title.slice(0, 16) + "…"
                : task.title}
>>>>>>> 043711b (финал)
            </p>
            <div className="menu-wrapper">
              <button
                className="task-menu-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen((prev) => !prev);
                }}
              >
                ⋮
              </button>
<<<<<<< HEAD
              {isMenuOpen && <CardMenu ref={menuRef} task={task} />}
            </div>
          </div>

          <div className="task-card-bottom">
            <div className="task-priority-tag">
              {priorityLabels[effectivePriority] || 'Неизвестно'}
            </div>
=======
              {isMenuOpen && (
                <CardMenu
                  ref={menuRef}
                  task={task}
                  onDelete={handleDelete}
                  onOpenTagPopup={handleOpenTagPopup}
                />
              )}
            </div>
          </div>

          <div className="task-priority">
            <span className="badge">{priorityLabels[effectivePriority]}</span>
            {Array.isArray(task.tags) &&
              task.tags.slice(0, 2).map((tag) => (
                <span key={tag?.id || tag?.name || tag} className="badge">
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
>>>>>>> 043711b (финал)
          </div>

          <div className="task-card-bottom">
            <img src={avatarIcon} alt="Аватар" className="task-user-avatar" />
          </div>
<<<<<<< HEAD
=======

          {showTagPopup && (
            <TagPopup
              popupRef={popupRef}
              style={popupPosition}
              onClose={() => setShowTagPopup(false)}
            />
          )}
>>>>>>> 043711b (финал)
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
