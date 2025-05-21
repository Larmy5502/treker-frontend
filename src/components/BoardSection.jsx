import { useState, useEffect, useRef } from 'react';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import ColumnMenu from './ColumnMenu';

function BoardSection({
  columnId,
  title,
  tasks,
  onTaskClick,
  onRename,
  onMoveColumn,
  onDeleteColumn,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentTitle.trim() && currentTitle !== title) {
      onRename(columnId, currentTitle.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleMove = (id, direction) => {
    console.log('BoardSection.handleMove:', id, direction);
    setIsMenuOpen(false);
    if (onMoveColumn) onMoveColumn(id, direction);
  };

  const handleDelete = (id) => {
    if (onDeleteColumn) onDeleteColumn(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="board-section">
      <div className="section-header column-header">
        {isEditing ? (
          <input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="column-title-input"
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{title}</span>
        )}
        <div style={{ position: 'relative' }}>
          <button
            className="column-menu-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ⋮
          </button>
          {isMenuOpen && (
            <ColumnMenu
              ref={menuRef}
              columnId={columnId}
              title={title}
              onRename={() => setIsEditing(true)}
              onMove={handleMove}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="board-tasks"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onClick={() => onTaskClick(task)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default BoardSection;
