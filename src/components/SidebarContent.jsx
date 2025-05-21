// SidebarContent.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import boardsIcon from '../assets/boards.png';
import '../styles/SidebarContent.css';

function SidebarContent({ isSidebarOpen, toggleSidebar, boardsByProject }) {
  const { projectId, boardIndex } = useParams();
  const navigate = useNavigate();

  const [expandedProjects, setExpandedProjects] = useState({});

  useEffect(() => {
    if (projectId) {
      setExpandedProjects(prev => ({
        ...prev,
        [projectId]: true
      }));
    }
  }, [projectId]);

  const renderBoardLinks = (projectId) => {
    const project = boardsByProject[projectId];
    if (!project) return null;

    const isOpen = expandedProjects[projectId] || false;

    const toggleProject = () => {
      setExpandedProjects(prev => ({
        ...prev,
        [projectId]: !prev[projectId]
      }));
    };

    return (
      <div className="project-block" key={projectId}>
        <div className="project-title" onClick={toggleProject}>
          <img src={boardsIcon} alt="Проект" className="project-icon" />
          {project.title || `Проект ${projectId}`}
          <span className="arrow">{isOpen ? '⌵' : '>'}</span>
        </div>
        {isOpen && (
          <div className="project-tasks">
            {project.cards.map((card, index) => {
              const isCurrent =
                projectId === String(project.id) && boardIndex === String(index);
              const name = (card.title && card.title.trim()) || `${index + 1} доска`;

              return (
                <Link
                  key={index}
                  to={`/projects/${project.id}/boards/${index}`}
                  className="task-item"
                  onClick={() => toggleSidebar(false)}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <span className="sidebar-title">TREKER</span>
        {isSidebarOpen && (
          <button className="collapse-button" onClick={toggleSidebar}>«</button>
        )}
      </div>

      {isSidebarOpen && (
        <>
          <div className="sidebar-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Поиск..." className="search-input" />
          </div>

          <div className="sidebar-projects">
            {Object.keys(boardsByProject).sort((a, b) => Number(a) - Number(b)).map((id) =>
              renderBoardLinks(id)
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SidebarContent;
