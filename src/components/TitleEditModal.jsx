import { useEffect, useRef, useState } from 'react';
import '../styles/TitleEditModal.css';

function TitleEditModal({ onConfirm, onCancel, initialTitle = '', placeholder = 'Введите название' }) {
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = title.trim();
      if (trimmed) onConfirm(trimmed);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="text"
          value={title}
          placeholder={placeholder}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={128}
        />
      </div>
    </div>
  );
}

export default TitleEditModal;
