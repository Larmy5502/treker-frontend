<<<<<<< HEAD
import React from 'react';
import TopNavbar from './TopNavbar';
import '../styles/ReportsPage.css';

export default function ReportsPage() {
  return (
    <>
      <TopNavbar hideNavButtons={false} />
      <div className="reports-container">
        <div className="report-block">
          <div className="report-content"></div>
          <div className="report-footer">
            Количество задач, завершенных<br />за определенный период
          </div>
        </div>
        <div className="report-block">
          <div className="report-content"></div>
          <div className="report-footer">
            Визуализация потока задач<br />по колонкам за период
          </div>
        </div>
      </div>
    </>
=======
import React, { useState, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import SidebarContent from './SidebarContent';
import '../styles/ReportsPage.css';
import { useParams } from 'react-router-dom';

export default function ReportsPage({ boardsByProject, setBoardsByProject }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('access');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:8000/projects/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Ошибка получения проектов');
        const data = await res.json();

        const result = {};
        data.forEach(project => {
          result[project.id] = project;
        });

        setBoardsByProject(result);
      } catch (err) {
        console.error('Ошибка при загрузке проектов:', err);
      }
    };

    fetchProjects();
  }, [projectId, setBoardsByProject]);

  return (
    <div className="layout">
      <div className={`sidebar-left ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <SidebarContent
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={setIsSidebarOpen}
          boardsByProject={boardsByProject}
        />
      </div>

      {isSidebarOpen && (
        <div className="overlay-blur" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <div className="content-with-topbar">
        <TopNavbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          hideNavButtons={false}
          boardsByProject={boardsByProject}
          setBoardsByProject={setBoardsByProject}
        />

        <div className="reports-container">
          <div className="report-block">
            <div className="report-content"></div>
            <div className="report-footer">
              Количество задач, завершенных<br />за определенный период
            </div>
          </div>
          <div className="report-block">
            <div className="report-content"></div>
            <div className="report-footer">
              Визуализация потока задач<br />по колонкам за период
            </div>
          </div>
        </div>
      </div>

      <div className="right-strip"></div>
    </div>
>>>>>>> ace2cd8 (финал 1)
  );
}
