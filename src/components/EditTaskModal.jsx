import { useState, useEffect, useRef } from 'react';
import '../styles/EditTaskModal.css';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import descriptionIcon from '../assets/description.png';

function EditTaskModal({ task, onClose, onSave }) {
  const [taskData, setTaskData] = useState({ ...task });
  const [commentText, setCommentText] = useState('');
<<<<<<< HEAD
  const titleRef = useRef(null);

=======
  const [taskTypes, setTaskTypes] = useState([]);
  const titleRef = useRef(null);


  useEffect(() => {
    const cachedTypes = localStorage.getItem('taskTypes');
    if (cachedTypes) {
      setTaskTypes(JSON.parse(cachedTypes));
      return;
    }

    const token = localStorage.getItem('access');
    if (!token) return;

    fetch('http://localhost:8000/tasks/task-types/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTaskTypes(data);
        localStorage.setItem('taskTypes', JSON.stringify(data));
      })
      .catch(err => console.error('Ошибка при загрузке типов задач:', err));
  }, []);


>>>>>>> ace2cd8 (финал 1)
  useEffect(() => {
    onSave(taskData);
  }, [taskData]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      const scrollHeight = titleRef.current.scrollHeight;
      const lineHeight = 24;
      const maxLines = 2;
      const maxHeight = lineHeight * maxLines;
      titleRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [taskData.title]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const updatedComments = [...(taskData.comments || []), commentText.trim()];
      setTaskData(prev => ({ ...prev, comments: updatedComments }));
      setCommentText('');
    }
  };

<<<<<<< HEAD
  const handleChange = (field, value) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
  };

=======
  const handleChange = async (field, value) => {
    const updated = { ...taskData, [field]: value };
    setTaskData(updated);

    // Поля, которые нужно синхронизировать с бэком при изменении
    const fieldsToSync = ['type', 'description', 'priority', 'deadline'];

    if (fieldsToSync.includes(field)) {
      const token = localStorage.getItem('access');
      if (!token) return;

      const payload = {
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        type: updated.type,
        column: updated.columnId,
        performer: updated.performer || null,
        project: updated.project,
        board: updated.board
      };

      try {
        await fetch(`http://localhost:8000/tasks/tasks/${updated.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Ошибка при обновлении задачи:', err);
      }
    }
  };



>>>>>>> ace2cd8 (финал 1)
  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAttachments = [...(taskData.attachments || []), file];
      setTaskData(prev => ({ ...prev, attachments: newAttachments }));
    }
  };

  const priorityOptions = [
    { label: 'Низкий', value: 'low' },
    { label: 'Средний', value: 'medium' },
    { label: 'Высокий', value: 'high' }
  ];

  return (
    <div className="edit-task-modal-overlay" onClick={onClose}>
      <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-task-header">
          <div className="task-title-box">
            <textarea
              ref={titleRef}
              className="edit-task-title-box-input"
              value={taskData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              rows={1}
              maxLength={1024}
              style={{
                resize: 'none',
                overflowY: 'auto',
                maxHeight: '48px',
                width: '100%'
              }}
              title={taskData.title}
            />
            <span className="task-id">#{taskData.id}</span>
          </div>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>

        <div className="edit-task-body">
          <div className="edit-task-left">
            <div className="task-info">
              <div className="task-info-row">
                <div className="task-info-label">Статус:</div>
                <div className="task-info-value">
                  {taskData.columnTitle || taskData.columnId || '—'}
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Тип:</div>
                <div className="task-info-value">
                  <select
                    className="task-select"
                    value={taskData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                  >
<<<<<<< HEAD
                    <option value="">—</option>
                    <option value="Bug">Ошибка</option>
                    <option value="Feature">Функциональность</option>
                    <option value="Task">Задача</option>
=======
                    {taskTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
>>>>>>> ace2cd8 (финал 1)
                  </select>
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Автор:</div>
                <div className="task-info-value badge">
                  <img src={avatarIcon} alt="Автор" className="badge-avatar" />
<<<<<<< HEAD
                  {taskData.author}
=======
                  {taskData.creator
                    ? `${taskData.creator.first_name} ${taskData.creator.last_name}`
                    : '—'}
>>>>>>> ace2cd8 (финал 1)
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Исполнитель:</div>
                <div className="task-info-value badge">
                  <img src={avatarIcon} alt="Исполнитель" className="badge-avatar" />
                  {taskData.performer || '—'}
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Метка:</div>
                <div className="task-info-value badge">
                  {taskData.tags?.length ? taskData.tags.join(', ') : '—'} <span className="plus-btn">+</span>
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Приоритет:</div>
                <div className="task-info-value">
                  <select
                    className="task-select"
                    value={taskData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                  >
                    {priorityOptions.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Срок:</div>
                <div className="task-info-value link">
                  <input
                    type="date"
                    className="task-date"
                    value={taskData.deadline || ''}
                    onChange={(e) => handleChange('deadline', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="task-description">
              <div className="description-label">
                <img src={descriptionIcon} alt="Описание" className="description-icon" />
                Описание
              </div>
              <textarea
                className="description-input"
                placeholder="Введите текст описания задачи"
                value={taskData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />

              <div className="attachment-section">
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={handleAttachment}
                />
                <button
                  type="button"
                  className="attachment-button"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  + Добавить вложение
                </button>

                {taskData.attachments?.length > 0 && (
                  <ul className="attachment-list">
                    {taskData.attachments.map((file, index) => {
                      const url = URL.createObjectURL(file);
                      return (
                        <li key={index}>
                          <a href={url} download={file.name}>
                            {file.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="edit-task-right">
            <div className="comments-container">
              <div className="comments-title">Комментарии</div>
              <div className="comment-input-wrapper">
                <img src={avatarIcon} alt="User Avatar" className="comment-avatar" />
                <input
                  className="comment-input"
                  placeholder="Напишите комментарий"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
              </div>
              {taskData.comments?.length > 0 ? (
                taskData.comments.map((comment, idx) => (
                  <div key={idx} className="comment">
                    {comment}
                  </div>
                ))
              ) : (
                <div className="no-comments">Комментариев пока нет</div>
              )}
            </div>
          </div>
        </div>

        <div className="treker-footer">TREKER</div>
      </div>
    </div>
  );
}

export default EditTaskModal;
