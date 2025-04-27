import '../styles/CardMenu.css';

function CardMenu({ task }) {
  return (
    <div className="card-menu">
      <div className="card-menu-title">{task.title}</div>
      <div className="card-menu-item">➔ Добавить метку</div>
      <div className="card-menu-item">⤷ Скопировать</div>
      <div className="card-menu-subitem">id карточки</div>
      <div className="card-menu-subitem">id и название карточки</div>
      <div className="card-menu-subitem">ссылку на карточку</div>
      <div className="card-menu-item">📄 Создать копию</div>
      <div className="card-menu-item">🗑 Переместить в архив</div>
    </div>
  );
}

export default CardMenu;
