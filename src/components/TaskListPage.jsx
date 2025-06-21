<<<<<<< HEAD
import React, { useState } from 'react';
import '../styles/TaskListPage.css';
import TopNavbar from './TopNavbar';

const TaskListPage = () => {
  const [tasks] = useState([
    {
      id: '4764239',
      title: 'Знакомство',
      priority: 'Высокий',
      type: 'Bug',
      tag: 'Метка',
      deadline: '17.04.2025',
      author: 'IvanIvanov',
      performer: 'PeterPetrov',
      authorAvatar: 'https://via.placeholder.com/20',
      performerAvatar: 'https://via.placeholder.com/20',
      parentTitle: 'Название задачи',
    },
  ]);

  return (
    <div className="layout">
      <TopNavbar />
      <div className="task-list-wrapper">
        <div className="task-list-header">ПЕРВЫЙ ПРОЕКТ / В работе</div>

        <div className="task-table">
          <div className="task-table-row header">
            <div className="cell checkbox"></div>
            <div className="cell id"># Ключ</div>
            <div className="cell title">Тема</div>
            <div className="cell priority">Приоритет</div>
            <div className="cell type">Тип</div>
            <div className="cell tag">Метка</div>
            <div className="cell deadline">Срок</div>
            <div className="cell author">Автор</div>
            <div className="cell performer">Исполнитель</div>
            <div className="cell parent">Родитель</div>
          </div>

          {tasks.map((task) => (
            <div key={task.id} className="task-table-row">
              <div className="cell checkbox">
                <input type="checkbox" />
              </div>
              <div className="cell id">{task.id}</div>
              <div className="cell title">{task.title}</div>
              <div className="cell priority">{task.priority}</div>
              <div className="cell type">{task.type}</div>
              <div className="cell tag">
                <span className="tag-label">{task.tag}</span>
              </div>
              <div className="cell deadline">{task.deadline}</div>
              <div className="cell author">
                <img src={task.authorAvatar} alt="автор" className="avatar" />
                {task.author}
              </div>
              <div className="cell performer">
                <img src={task.performerAvatar} alt="исполнитель" className="avatar" />
                {task.performer}
              </div>
              <div className="cell parent">{task.parentTitle || '—'}</div>
            </div>
          ))}
        </div>
      </div>
=======
import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import SidebarContent from "./SidebarContent";
import "../styles/TaskListPage.css";
import { useParams } from "react-router-dom";

const TaskListPage = ({ boardsByProject, setBoardsByProject }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { boardId, projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);

  const priorityLabels = {
    1: "Низкий",
    2: "Средний",
    3: "Высокий",
  };

  useEffect(() => {
    const fetchTasks = async (cardId) => {
      const token = localStorage.getItem("access");
      if (!token || !cardId) return;

      try {
        const res = await fetch(
          `http://localhost:8000/tasks/boards/${cardId}/tasks/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Ошибка при получении задач");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Ошибка при загрузке задач:", err);
      }
    };

    fetchTasks(boardId);
  }, [boardId]);

  useEffect(() => {
    const fetchTaskTypes = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/tasks/task-types/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Ошибка при загрузке типов задач");
        const data = await res.json();
        setTaskTypes(data);
      } catch (err) {
        console.error("Ошибка при получении типов задач:", err);
      }
    };

    fetchTaskTypes();
  }, []);

  const typeMap = Object.fromEntries(taskTypes.map((t) => [t.id, t.name]));

  const currentBoardTitle =
    boardsByProject?.[projectId]?.cards?.find((c) => `${c.id}` === boardId)
      ?.title || `Доска #${boardId}`;

  return (
    <div className="layout">
      <div
        className={`sidebar-left ${sidebarVisible ? "expanded" : "collapsed"}`}
      >
        <SidebarContent
          isSidebarOpen={sidebarVisible}
          toggleSidebar={setSidebarVisible}
          boardsByProject={boardsByProject}
        />
      </div>

      {sidebarVisible && (
        <div
          className="overlay-blur"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      <div className="content-with-topbar">
        <TopNavbar
          toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          isSidebarOpen={sidebarVisible}
          boardsByProject={boardsByProject}
          setBoardsByProject={setBoardsByProject}
        />

        <div className="task-list-wrapper">
          <div className="task-list-header" style={{ marginTop: "24px" }}>
            {currentBoardTitle}
          </div>

          <div className="task-table">
            <div className="task-table-row header">
              <div className="cell checkbox"></div>
              <div className="cell id"># Ключ</div>
              <div className="cell title">Тема</div>
              <div className="cell priority">Приоритет</div>
              <div className="cell type">Тип</div>
              <div className="cell tag">Метка</div>
              <div className="cell deadline">Срок</div>
              <div className="cell author">Автор</div>
              <div className="cell parent">Родитель</div>
            </div>

            {tasks.map((task) => (
              <div key={task.id} className="task-table-row">
                <div className="cell checkbox">
                  <input type="checkbox" />
                </div>
                <div className="cell id">{task.id}</div>
                <div className="cell title">{task.title}</div>
                <div className="cell priority">
                  {priorityLabels[task.priority] || "—"}
                </div>
                <div className="cell type">
                  {typeMap[task.type] || task.type || "—"}
                </div>
                <div className="cell tag">
                  {task.tags?.length
                    ? task.tags.map((tag, i) => (
                        <span key={i} className="tag-label">
                          {typeof tag === "string"
                            ? tag
                            : tag.title || tag.name || `тег #${tag.id}`}
                        </span>
                      ))
                    : "—"}
                </div>
                <div className="cell deadline">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "—"}
                </div>
                <div className="cell author">
                  {task.creator
                    ? `${task.creator.first_name} ${task.creator.last_name}`
                    : "—"}
                </div>
                <div className="cell parent">{task.parent_title || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="right-strip"></div>
>>>>>>> 043711b (финал)
    </div>
  );
};

export default TaskListPage;
