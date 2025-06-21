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
import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import SidebarContent from "./SidebarContent";
import "../styles/ReportsPage.css";
import { useParams } from "react-router-dom";

export default function ReportsPage({ boardsByProject, setBoardsByProject }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [createdResolvedImage, setCreatedResolvedImage] = useState(null);
  const [cfdImage, setCfdImage] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token || !projectId) return;

    const fetchReports = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(
            `http://localhost:8000/api/reports/created-vs-resolved/?project_id=${projectId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(`http://localhost:8000/api/cfd/?project_id=${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setCreatedResolvedImage(data1.image);
        setCfdImage(data2.image);
      } catch (err) {
        console.error("Ошибка при загрузке графиков:", err);
      }
    };

    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8000/projects/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const result = {};
        data.forEach((project) => {
          result[project.id] = project;
        });

        setBoardsByProject(result);
      } catch (err) {
        console.error("Ошибка при загрузке проектов:", err);
      }
    };

    fetchProjects();
    fetchReports();
  }, [projectId, setBoardsByProject]);

  return (
    <div className="layout">
      <div
        className={`sidebar-left ${isSidebarOpen ? "expanded" : "collapsed"}`}
      >
        <SidebarContent
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={setIsSidebarOpen}
          boardsByProject={boardsByProject}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="overlay-blur"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
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
            <div className="report-content">
              {createdResolvedImage ? (
                <img
                  src={`data:image/png;base64,${createdResolvedImage}`}
                  alt="Создано против решено"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p>Загрузка графика...</p>
              )}
            </div>
            <div className="report-footer">
              Количество задач, завершенных
              <br />
              за определенный период
            </div>
          </div>

          <div className="report-block">
            <div className="report-content">
              {cfdImage ? (
                <img
                  src={`data:image/png;base64,${cfdImage}`}
                  alt="Cumulative Flow Diagram"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p className="report-loading">Загрузка графика...</p>
              )}
            </div>
            <div className="report-footer">
              Визуализация потока задач
              <br />
              по колонкам за период
            </div>
          </div>
        </div>
      </div>

      <div className="right-strip"></div>
    </div>
>>>>>>> 043711b (финал)
  );
}
