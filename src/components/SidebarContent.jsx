import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import boardsIcon from '../assets/boards.png';
import '../styles/SidebarContent.css';

function SidebarContent({ isSidebarOpen, toggleSidebar }) {
     const [isFirstProjectOpen, setIsFirstProjectOpen] = useState(false);
     const [isSecondProjectOpen, setIsSecondProjectOpen] = useState(false);

  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <span className="sidebar-title">TREKER</span>
        {isSidebarOpen && (
          <button className="collapse-button" onClick={toggleSidebar}>
            «
          </button>
        )}
      </div>

      {isSidebarOpen && (
        <>
          <div className="sidebar-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Поиск..." className="search-input" />
          </div>

          <div className="sidebar-projects">

            {/* Первый проект */}
            <div className="project-block">
              <div className="project-title" onClick={() => setIsFirstProjectOpen(!isFirstProjectOpen)}>
                <img src={boardsIcon} alt="Проект" className="project-icon" />
                ПЕРВЫЙ ПРОЕКТ
                <span className="arrow">{isFirstProjectOpen ? '⌵' : '>'}</span>
              </div>
              {isFirstProjectOpen && (
                <div className="project-tasks">
                  <div className="task-item">В работе</div>
                  <div className="task-item">Вторая доска</div>
                </div>
              )}
            </div>

            {/* Второй проект */}
            <div className="project-block">
              <div className="project-title" onClick={() => setIsSecondProjectOpen(!isSecondProjectOpen)}>
                <img src={boardsIcon} alt="Проект" className="project-icon" />
                ВТОРОЙ ПРОЕКТ
                <span className="arrow">{isSecondProjectOpen ? '⌵' : '>'}</span>
              </div>
              {isSecondProjectOpen && (
                <div className="project-tasks">
                  <div className="task-item">В работе</div>
                  <div className="task-item">Другая доска</div>
                </div>
              )}
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default SidebarContent;
