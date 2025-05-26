import { useState, useEffect, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import CardMenu from './CardMenu';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import '../styles/TaskCard.css';

function TaskCard({ task, index, onClick }) {
<<<<<<< HEAD
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
=======
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null);
  const menuRef = useRef(null);

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  };

  const effectivePriority = task.priority || 'low';
>>>>>>> ace2cd8 (финал 1)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        (!menuRef.current || !menuRef.current.contains(event.target))
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Draggable
      draggableId={task.id.toString()}
      index={index}
      isDragDisabled={isMenuOpen}
    >
      {(provided) => (
        <div
<<<<<<< HEAD
          className={`task-card ${currentPriority.class}`}
=======
          className="task-card"
>>>>>>> ace2cd8 (финал 1)
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
=======
          style={provided.draggableProps.style}
>>>>>>> ace2cd8 (финал 1)
          onClick={(e) => {
            if (menuRef.current && menuRef.current.contains(e.target)) return;
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
              {task.title.length > 32 ? task.title.slice(0, 32) + '…' : task.title}
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
              {isMenuOpen && <CardMenu ref={menuRef} task={task} />}
            </div>
          </div>

          <div className="task-card-bottom">
<<<<<<< HEAD
=======
            <div className="task-priority-tag">
              {priorityLabels[effectivePriority] || 'Неизвестно'}
            </div>
          </div>

          <div className="task-card-bottom">
>>>>>>> ace2cd8 (финал 1)
            <img src={avatarIcon} alt="Аватар" className="task-user-avatar" />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
