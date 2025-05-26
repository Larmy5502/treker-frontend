import React, { useState, useEffect, useRef } from 'react';
import '../styles/TaskNameModal.css';

function TaskNameModal({ onConfirm, onCancel }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        const trimmed = title.trim();
        if (trimmed) onConfirm(trimmed);
      } else if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [title, onConfirm, onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="modal-input"
          type="text"
          placeholder="Сформулируйте задачу"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TaskNameModal;
