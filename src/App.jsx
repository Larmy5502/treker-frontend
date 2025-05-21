import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';
import ProjectBoard from './components/ProjectBoard';
import Profile from './components/Profile';
import TaskListPage from './components/TaskListPage';
import ReportsPage from './components/ReportsPage';

function App() {
  const [boardsByProject, setBoardsByProject] = useState({});

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project" element={<ProjectBoard />} />

          <Route
            path="/projects/:projectId/boards/:boardIndex"
            element={
              <ProjectBoard
                boardsByProject={boardsByProject}
                setBoardsByProject={setBoardsByProject}
              />
            }
          />

          <Route
            path="/projects/:projectId/list"
            element={
              <TaskListPage
                boardsByProject={boardsByProject}
                setBoardsByProject={setBoardsByProject}
              />
            }
          />

          <Route
            path="/projects/:projectId/boards/:boardIndex/reports"
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
