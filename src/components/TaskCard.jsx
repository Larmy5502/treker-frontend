import { useState, useEffect, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import CardMenu from './CardMenu';
import EditTaskModal from './EditTaskModal';
import avatarIcon from '../assets/avatar_9341633 2.svg';

function TaskCard({ task, index }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenEdit = (e) => {
    e.stopPropagation(); // предотвращаем конфликт с перетаскиванием
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="task-card"
            ref={(node) => {
              provided.innerRef(node);
              cardRef.current = node;
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
          >
            <div className="task-card-header">
              <p
                className="task-title"
                onClick={handleOpenEdit}
              >
                {task.title}
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
                {isMenuOpen && (
                  <CardMenu task={task} onClose={() => setIsMenuOpen(false)} />
                )}
              </div>
            </div>

            <div className="task-card-bottom">
              <img src={avatarIcon} alt="Аватар" className="task-user-avatar" />
            </div>
          </div>
        )}
      </Draggable>

      {isEditModalOpen && (
        <EditTaskModal task={task} onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  );
}

export default TaskCard;
