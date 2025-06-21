import arrow1 from "../assets/arrow_1.png";
import arrow2 from "../assets/arrow_2.png";
import arrow3 from "../assets/arrow_3.png";
import arrow4 from "../assets/arrow_4.png";

import { forwardRef } from 'react';
import '../styles/ColumnMenu.css';

const ColumnMenu = forwardRef(({ columnId, title, onRename, onMove, onDelete }, ref) => {
  return (
    <div className="card-menu column-menu" ref={ref}>
      <div className="card-menu__title">{title}</div>

      <button className="card-menu__item" onClick={() => onRename(columnId)}>
<<<<<<< HEAD
        Переименовать
=======
        ПЕРЕИМЕНОВАТЬ
>>>>>>> 043711b (финал)
      </button>

      <div
        className="card-menu__item no-hover"
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        ПЕРЕНЕСТИ
        <div className="card-menu__submenu">
          <button onClick={() => onMove(columnId, 'start')}>
            <img src={arrow1} alt="В начало" />
          </button>
          <button onClick={() => onMove(columnId, 'left')}>
            <img src={arrow2} alt="Влево" />
          </button>
          <button onClick={() => onMove(columnId, 'right')}>
            <img src={arrow3} alt="Вправо" />
          </button>
          <button onClick={() => onMove(columnId, 'end')}>
            <img src={arrow4} alt="В конец" />
          </button>
        </div>
      </div>

      <button className="card-menu__item delete" onClick={() => onDelete(columnId)}>
<<<<<<< HEAD
        Удалить колонку
=======
        УДАЛИТЬ КОЛОНКУ
>>>>>>> 043711b (финал)
      </button>
    </div>
  );
});

export default ColumnMenu;
