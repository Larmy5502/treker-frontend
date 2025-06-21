<<<<<<< HEAD
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import boardsIcon from '../assets/boards.png';
import '../styles/SidebarContent.css';
=======
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import boardsIcon from "../assets/boards.png";
import "../styles/SidebarContent.css";
>>>>>>> 043711b (финал)

function SidebarContent({ isSidebarOpen, toggleSidebar, boardsByProject }) {
  const { projectId, boardIndex } = useParams();
  const navigate = useNavigate();

  const [expandedProjects, setExpandedProjects] = useState({});
<<<<<<< HEAD

  useEffect(() => {
    if (projectId) {
      setExpandedProjects(prev => ({
        ...prev,
        [projectId]: true
=======
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (projectId) {
      setExpandedProjects((prev) => ({
        ...prev,
        [projectId]: true,
>>>>>>> 043711b (финал)
      }));
    }
  }, [projectId]);

  const renderBoardLinks = (projectId) => {
    const project = boardsByProject[projectId];
    if (!project) return null;

<<<<<<< HEAD
    const isOpen = expandedProjects[projectId] || false;

    const toggleProject = () => {
      setExpandedProjects(prev => ({
        ...prev,
        [projectId]: !prev[projectId]
=======
    const projectMatches = project.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const filteredCards = project.cards.filter((card) =>
      card.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Если поиск активен и ни проект, ни его доски не совпадают — не показывать
    if (searchQuery && !projectMatches && filteredCards.length === 0) {
      return null;
    }

    const isOpen = expandedProjects[projectId] || !!searchQuery;

    const toggleProject = () => {
      setExpandedProjects((prev) => ({
        ...prev,
        [projectId]: !prev[projectId],
>>>>>>> 043711b (финал)
      }));
    };

    return (
      <div className="project-block" key={projectId}>
        <div className="project-title" onClick={toggleProject}>
          <img src={boardsIcon} alt="Проект" className="project-icon" />
          {project.title || `Проект ${projectId}`}
<<<<<<< HEAD
          <span className="arrow">{isOpen ? '⌵' : '>'}</span>
        </div>
        {isOpen && (
          <div className="project-tasks">
            {project.cards.map((card, index) => {
              const isCurrent =
                projectId === String(project.id) && boardIndex === String(index);
              const name = (card.title && card.title.trim()) || `${index + 1} доска`;

=======
          <span className="arrow">{isOpen ? "⌵" : ">"}</span>
        </div>
        {isOpen && (
          <div className="project-tasks">
            {(searchQuery && !projectMatches
              ? filteredCards
              : project.cards
            ).map((card, index) => {
              const name =
                (card.title && card.title.trim()) || `${index + 1} доска`;
>>>>>>> 043711b (финал)
              return (
                <Link
                  key={index}
                  to={`/projects/${project.id}/boards/${index}`}
                  className="task-item"
                  onClick={() => toggleSidebar(false)}
                >
<<<<<<< HEAD
                  {/* 👈 Закрываем сайдбар при клике по доске */}
=======
>>>>>>> 043711b (финал)
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
<<<<<<< HEAD
    <div className={`sidebar-content ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">TREKER</span>
        {isSidebarOpen && (
          <button className="collapse-button" onClick={() => toggleSidebar(false)}>
=======
    <div className={`sidebar-content ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">TREKER</span>
        {isSidebarOpen && (
          <button
            className="collapse-button"
            onClick={() => toggleSidebar(false)}
          >
>>>>>>> 043711b (финал)
            «
          </button>
        )}
      </div>

      {isSidebarOpen && (
        <>
          <div className="sidebar-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Поиск..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sidebar-projects">
            {Object.keys(boardsByProject)
              .sort((a, b) => Number(a) - Number(b))
              .map((id) => renderBoardLinks(id))}
          </div>
        </>
      )}
    </div>
  );
}

export default SidebarContent;
