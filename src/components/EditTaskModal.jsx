<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import '../styles/EditTaskModal.css';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import descriptionIcon from '../assets/description.png';

function EditTaskModal({ task, onClose, onSave }) {
  const [taskData, setTaskData] = useState({ ...task });
  const [commentText, setCommentText] = useState('');
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

  const handleChange = (field, value) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
  };

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
                    <option value="">—</option>
                    <option value="Bug">Ошибка</option>
                    <option value="Feature">Функциональность</option>
                    <option value="Task">Задача</option>
                  </select>
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Автор:</div>
                <div className="task-info-value badge">
                  <img src={avatarIcon} alt="Автор" className="badge-avatar" />
                  {taskData.author}
                  {taskData.creator
                    ? `${taskData.creator.first_name} ${taskData.creator.last_name}`
                    : '—'}
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
=======
import { useState, useEffect, useRef } from "react";
import "../styles/EditTaskModal.css";
import avatarIcon from "../assets/avatar_9341633 2.svg";
import descriptionIcon from "../assets/description.png";
import TagNameModal from "./TagNameModal";

function EditTaskModal({ task, onClose, onSave }) {
  const [taskData, setTaskData] = useState({ ...task });
  const [commentText, setCommentText] = useState("");
  const [taskTypes, setTaskTypes] = useState([]);
  const titleRef = useRef(null);
  const [tags, setTags] = useState(taskData.tags || []);
  const [allTags, setAllTags] = useState([]);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [newTagText, setNewTagText] = useState("");
  const tagInputRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const handleRemoveSuggestedTag = (tagToRemove) => {
    const updatedAll = allTags.filter((tag) => tag !== tagToRemove);
    setAllTags(updatedAll);
    localStorage.setItem("allTags", JSON.stringify(updatedAll));
  };
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (e, targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const updated = [...tags];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setTags(updated);
    setTaskData((prev) => ({ ...prev, tags: updated }));
    setDraggedIndex(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    fetch(`http://localhost:8000/tasks/tasks/${task.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.attachments) {
          setTaskData((prev) => ({
            ...prev,
            attachments: data.attachments,
            attachment_ids: data.attachments.map((a) => a.id),
          }));
        }
      })
      .catch((err) => {
        console.error("Ошибка при загрузке вложений задачи:", err);
      });
  }, [task.id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("allTags") || "[]");
    setAllTags(stored);
  }, []);

  useEffect(() => {
    const cachedTypes = localStorage.getItem("taskTypes");
    if (cachedTypes) {
      setTaskTypes(JSON.parse(cachedTypes));
      return;
    }

    const token = localStorage.getItem("access");
    if (!token) return;

    fetch("http://localhost:8000/tasks/task-types/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskTypes(data);
        localStorage.setItem("taskTypes", JSON.stringify(data));
      })
      .catch((err) => console.error("Ошибка при загрузке типов задач:", err));
  }, []);

  useEffect(() => {
    onSave(taskData);
  }, [taskData]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      const scrollHeight = titleRef.current.scrollHeight;
      const lineHeight = 24;
      const maxLines = 2;
      const maxHeight = lineHeight * maxLines;
      titleRef.current.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }
  }, [taskData.title]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    fetch(`http://localhost:8000/tasks/tasks/${task.id}/comments/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskData((prev) => ({
          ...prev,
          comments: data, // если бэкенд возвращает массив комментариев
        }));
      })
      .catch((err) => {
        console.error("Ошибка при загрузке комментариев:", err);
      });
  }, [task.id]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("access");
    if (!token || !commentText.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:8000/tasks/tasks/${task.id}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentText.trim() }),
        }
      );

      if (!res.ok) {
        console.error("Ошибка при добавлении комментария:", res.status);
        return;
      }

      const newComment = await res.json();
      setTaskData((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));
      setCommentText("");
    } catch (err) {
      console.error("Ошибка при отправке комментария:", err);
    }
  };

  const updateTimeout = useRef(null);
  const handleChange = (field, value) => {
    const updated = { ...taskData, [field]: value };
    setTaskData(updated);

    const fieldsToSync = [
      "title",
      "type",
      "description",
      "priority",
      "due_date",
      "attachment_ids",
    ];

    if (!fieldsToSync.includes(field)) return;

    // отмена предыдущего таймера
    if (updateTimeout.current) clearTimeout(updateTimeout.current);

    // отложенный PUT
    updateTimeout.current = setTimeout(async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      const payload = {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        type: updated.type,
        column: updated.columnId,
        project: updated.project,
        board: updated.board,
        tags: updated.tags || [],
        due_date: updated.due_date,
      };

      try {
        await fetch(`http://localhost:8000/tasks/tasks/${updated.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Ошибка при обновлении задачи:", err);
      }
    }, 500);
  };

  const handleAttachment = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("access");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    try {
      const res = await fetch("http://localhost:8000/tasks/attachments/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        console.error("Ошибка при загрузке файла:", res.status);
        return;
      }

      const uploaded = await res.json();

      const newAttachmentIds = [
        ...(taskData.attachment_ids || []),
        uploaded.id,
      ];

      const updated = {
        ...taskData,
        attachments: [...(taskData.attachments || []), uploaded],
        attachment_ids: newAttachmentIds,
      };

      setTaskData(updated);

      await fetch(`http://localhost:8000/tasks/tasks/${taskData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updated,
          column: updated.column,
          type: updated.type,
          tags: updated.tags || [],
        }),
      });
    } catch (err) {
      console.error("Ошибка при загрузке и привязке вложения:", err);
    }
  };

  const handleRemoveTag = async (indexToRemove) => {
    const tagToRemove = tags[indexToRemove];
    const tagId = typeof tagToRemove === "object" ? tagToRemove.id : null;
    const token = localStorage.getItem("access");

    if (!token || !tagId) {
      console.warn("Невозможно удалить тег: отсутствует токен или ID");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/tasks/tags/${tagId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        const updatedTags = tags.filter((_, i) => i !== indexToRemove);
        setTags(updatedTags);
        setTaskData((prev) => ({ ...prev, tags: updatedTags }));
      } else {
        console.error("Ошибка при удалении тега:", res.status);
      }
    } catch (err) {
      console.error("Ошибка при удалении тега:", err);
    }
  };

  const priorityOptions = [
    { label: "Низкий", value: 1 },
    { label: "Средний", value: 2 },
    { label: "Высокий", value: 3 },
  ];

  const handleRemoveAttachment = async (indexToRemove) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const fileToRemove = taskData.attachments[indexToRemove];
    const attachmentId = fileToRemove.id;

    try {
      const res = await fetch(
        `http://localhost:8000/tasks/attachments/${attachmentId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 204) {
        const updatedAttachments = taskData.attachments.filter(
          (_, i) => i !== indexToRemove
        );
        const updatedAttachmentIds = taskData.attachment_ids.filter(
          (id) => id !== attachmentId
        );

        setTaskData((prev) => ({
          ...prev,
          attachments: updatedAttachments,
          attachment_ids: updatedAttachmentIds,
        }));

        // Обновим задачу, чтобы удалить привязку
        await fetch(`http://localhost:8000/tasks/tasks/${taskData.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...taskData,
            attachment_ids: updatedAttachmentIds,
            column: taskData.column, // если нужен columnId — поправь
            type: taskData.type,
            tags: taskData.tags || [],
          }),
        });
      } else {
        console.error("Ошибка при удалении вложения:", res.status);
      }
    } catch (err) {
      console.error("Ошибка при удалении вложения:", err);
    }
  };

  return (
    <>
      {isEditingLabel && (
        <TagNameModal
          value={newTagText}
          onChange={setNewTagText}
          onCancel={() => setIsEditingLabel(false)}
          tags={tags}
          setTags={setTags}
          taskData={taskData}
          setTaskData={setTaskData}
          allTags={allTags}
          setAllTags={setAllTags}
        />
      )}

      <div className="edit-task-modal-overlay" onClick={onClose}>
        <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>
          <div className="edit-task-header">
            <div className="task-title-box">
              <div className="edit-task-title-wrapper">
                <input
                  ref={titleRef}
                  className="edit-task-title-box-input"
                  value={taskData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  rows={1}
                  maxLength={20}
                  spellCheck={false}
                  title={taskData.title}
                />
              </div>
              <span className="task-id">#{taskData.id}</span>
>>>>>>> 043711b (финал)
            </div>
          </div>

<<<<<<< HEAD
        <div className="treker-footer">TREKER</div>
=======
          <div className="edit-task-body">
            <div className="edit-task-left">
              <div className="task-info">
                <div className="task-info-row">
                  <div className="task-info-label">Статус:</div>
                  <div className="task-info-value-status">
                    {taskData.columnTitle || taskData.columnId || "—"}
                  </div>
                </div>
                <div className="task-info-row">
                  <div className="task-info-label">Тип:</div>
                  <div className="task-info-value">
                    <select
                      className="task-select"
                      value={taskData.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                    >
                      {taskTypes.length > 0 ? (
                        taskTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="">—</option>
                          <option value="Bug">Ошибка</option>
                          <option value="Feature">Функциональность</option>
                          <option value="Task">Задача</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
                <div className="task-info-row">
                  <div className="task-info-label">Автор:</div>
                  <div className="task-info-value badge">
                    <img
                      src={avatarIcon}
                      alt="Автор"
                      className="badge-avatar"
                    />
                    {taskData.creator
                      ? `${taskData.creator.first_name} ${taskData.creator.last_name}`
                      : taskData.author || "—"}
                  </div>
                </div>
                <div className="task-info-row">
                  <div className="task-info-label">Метки:</div>
                  <div className="task-info-value tag-list">
                    {tags.length
                      ? tags.map((tag, index) => (
                          <span
                            key={index}
                            className="tag-badge"
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, index)}
                          >
                            {typeof tag === "string"
                              ? tag
                              : tag.title || tag.name || `тег #${tag.id}`}{" "}
                            {/* ✅ */}
                            <span
                              className="remove-tag"
                              onClick={() => handleRemoveTag(index)}
                            >
                              ×
                            </span>
                          </span>
                        ))
                      : "—"}
                    <span
                      className="plus-btn"
                      onClick={() => {
                        setNewTagText("");
                        setIsEditingLabel(true);
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="task-info-row">
                  <div className="task-info-label">Приоритет:</div>
                  <div className="task-info-value">
                    <select
                      className="task-select"
                      value={taskData.priority}
                      onChange={(e) =>
                        handleChange("priority", Number(e.target.value))
                      }
                    >
                      {priorityOptions.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
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
                      value={taskData.due_date || ""}
                      onChange={(e) => handleChange("due_date", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="task-description">
                <div className="description-label">
                  <img
                    src={descriptionIcon}
                    alt="Описание"
                    className="description-icon"
                  />
                  Описание
                </div>
                <textarea
                  className="description-input"
                  placeholder="Введите текст описания задачи"
                  value={taskData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />

                <div className="attachment-section">
                  <input
                    spellCheck={false}
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }}
                    onChange={handleAttachment}
                  />
                  <div className="attachment-header">
                    <button
                      type="button"
                      className="attachment-button"
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                    >
                      + Добавить вложение
                    </button>
                    <span className="attachment-count">
                      Всего файлов: {taskData.attachments?.length || 0}
                    </span>
                  </div>

                  {taskData.attachments?.length > 0 && (
                    <ul className="attachment-list attachment-grid">
                      {taskData.attachments.map((file, index) => {
                        const isUploaded = file.file !== undefined;
                        const name =
                          file.name || file.title || `файл #${index}`;
                        const url = isUploaded
                          ? file.file.startsWith("http")
                            ? file.file
                            : `http://localhost:8000${file.file}`
                          : URL.createObjectURL(file);

                        return (
                          <li key={index} className="attachment-item">
                            <a
                              href={url}
                              download={name}
                              className="attachment-link"
                              title={name}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {name.length > 15
                                ? name.slice(0, 15) + "…"
                                : name}
                              <button
                                className="remove-attachment-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemoveAttachment(index);
                                }}
                                title="Удалить вложение"
                              >
                                ×
                              </button>
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
                  <img
                    src={avatarIcon}
                    alt="User Avatar"
                    className="comment-avatar"
                  />
                  <input
                    spellCheck={false}
                    className="comment-input"
                    placeholder="Напишите комментарий"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  />
                </div>
                {(taskData.comments || []).map((comment, idx) => (
                  <div key={idx} className="comment">
                    {typeof comment === "string" ? comment : comment.content}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="treker-footer">TREKER</div>
        </div>
>>>>>>> 043711b (финал)
      </div>
    </>
  );
}

export default EditTaskModal;
