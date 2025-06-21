<<<<<<< HEAD
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';
import ProjectBoard from './components/ProjectBoard';
import Profile from './components/Profile';
import TaskListPage from './components/TaskListPage';
import ReportsPage from './components/ReportsPage';
=======
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import ProjectBoard from "./components/ProjectBoard";
import Profile from "./components/Profile";
import TaskListPage from "./components/TaskListPage";
import ReportsPage from "./components/ReportsPage";
import InviteAcceptPage from "./components/InviteAcceptPage";
>>>>>>> 043711b (финал)

function App() {
  const [boardsByProject, setBoardsByProject] = useState({});

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Аутентификация */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
          <Route path="/project" element={<ProjectBoard />} />

=======

          {/* Не трогаем ProjectBoard */}
          <Route path="/project" element={<ProjectBoard />} />
>>>>>>> 043711b (финал)
          <Route
            path="/projects/:projectId/boards/:boardIndex"
            element={
              <ProjectBoard
                boardsByProject={boardsByProject}
                setBoardsByProject={setBoardsByProject}
              />
            }
          />

<<<<<<< HEAD
          <Route
            path="/projects/:projectId/list"
=======
          {/* Новый маршрут для списка задач по доске */}
          <Route
            path="/projects/:projectId/boards/:boardId/tasks"
>>>>>>> 043711b (финал)
            element={
              <TaskListPage
                boardsByProject={boardsByProject}
                setBoardsByProject={setBoardsByProject}
              />
            }
          />

<<<<<<< HEAD
          <Route
            path="/projects/:projectId/boards/:boardIndex/reports"
=======
          {/* ✅ Новый маршрут для обработки приглашения */}
          <Route path="/invite/project/:token" element={<InviteAcceptPage />} />

          {/* Отчёты */}
          <Route
            path="/projects/:projectId/boards/:boardId/reports"
>>>>>>> 043711b (финал)
            element={
              <ReportsPage
                boardsByProject={boardsByProject}
                setBoardsByProject={setBoardsByProject}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
