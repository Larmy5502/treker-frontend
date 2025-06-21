<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import ColumnMenu from './ColumnMenu';
import '../styles/BoardSection.css';
=======
import { useState, useEffect, useRef } from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import ColumnMenu from "./ColumnMenu";
import "../styles/BoardSection.css";
>>>>>>> 043711b (финал)

function BoardSection({
  columnId,
  title,
  tasks,
  onTaskClick,
  onRename,
  onMoveColumn,
  onDeleteColumn,
<<<<<<< HEAD
=======
  onDeleteTask, // ✅ новый проп
>>>>>>> 043711b (финал)
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
<<<<<<< HEAD
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
=======
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
>>>>>>> 043711b (финал)
  }, []);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentTitle.trim() && currentTitle !== title) {
      onRename(columnId, currentTitle.trim());
    }
  };

  const handleKeyDown = (e) => {
<<<<<<< HEAD
    if (e.key === 'Enter') {
=======
    if (e.key === "Enter") {
>>>>>>> 043711b (финал)
      handleBlur();
    }
  };

  const handleMove = (id, direction) => {
<<<<<<< HEAD
    console.log('BoardSection.handleMove:', id, direction);
=======
>>>>>>> 043711b (финал)
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
<<<<<<< HEAD
=======
            spellCheck={false}
>>>>>>> 043711b (финал)
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={18}
            className="column-title-clean-input"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
<<<<<<< HEAD
            style={{ userSelect: 'none', cursor: 'pointer' }}
=======
            style={{ userSelect: "none", cursor: "pointer" }}
>>>>>>> 043711b (финал)
          >
            {title}
          </span>
        )}
<<<<<<< HEAD
        <div style={{ position: 'relative' }}>
=======
        <div style={{ position: "relative" }}>
>>>>>>> 043711b (финал)
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
<<<<<<< HEAD
=======
                onDelete={onDeleteTask} // ✅ проброс удаления
>>>>>>> 043711b (финал)
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
