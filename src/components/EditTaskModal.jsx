import '../styles/EditTaskModal.css';
import avatarIcon from '../assets/avatar_9341633 2.svg';
import descriptionIcon from '../assets/description.png';

function EditTaskModal({ task, onClose }) {
  return (
    <div className="edit-task-modal-overlay" onClick={onClose}>
      <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>

        {/* Верхняя панель */}
        <div className="edit-task-header">
          <h2 className="edit-task-title">
            {task.title} <span className="task-id">#{task.id}</span>
          </h2>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>

        {/* Основная часть */}
        <div className="edit-task-body">
          {/* Левая часть */}
          <div className="edit-task-left">
            <div className="task-info">
              <div className="task-info-row">
                <div className="task-info-label">Расположение:</div>
                <div className="task-info-value link">В работе / Выполняется</div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Тип:</div>
                <div className="task-info-value">Bug</div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Автор:</div>
                <div className="task-info-value badge">
                  <img src={avatarIcon} alt="Автор" className="badge-avatar" />
                  IvanIvanov
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Исполнитель:</div>
                <div className="task-info-value badge">
                  <img src={avatarIcon} alt="Исполнитель" className="badge-avatar" />
                  PeterPetrov
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Метка:</div>
                <div className="task-info-value badge">
                  Метка <span className="plus-btn">+</span>
                </div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Приоритет:</div>
                <div className="task-info-value">Высокий</div>
              </div>
              <div className="task-info-row">
                <div className="task-info-label">Срок:</div>
                <div className="task-info-value link">17.04.2025</div>
              </div>
            </div>

            {/* Блок описания */}
            <div className="task-description">
              <div className="description-label">
                <img src={descriptionIcon} alt="Описание" className="description-icon" />
                Описание
              </div>
              <textarea
                className="description-input"
                placeholder="Введите текст описания задачи"
              ></textarea>
            </div>
          </div>

          {/* Правая часть */}
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
                  className="comment-input"
                  placeholder="Напишите комментарий"
                />
              </div>

              <div className="no-comments">Комментариев пока нет</div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="treker-footer">TREKER</div>
      </div>
    </div>
  );
}

export default EditTaskModal;
