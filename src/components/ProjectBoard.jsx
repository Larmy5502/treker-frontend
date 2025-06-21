<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import '../styles/ProjectBoard.css';
import TopNavbar from './TopNavbar';
import SidebarContent from './SidebarContent';
import BoardSection from './BoardSection';
import { useParams } from 'react-router-dom';
import EditTaskModal from './EditTaskModal';
import TaskNameModal from './TaskNameModal';
=======
import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import "../styles/ProjectBoard.css";
import TopNavbar from "./TopNavbar";
import SidebarContent from "./SidebarContent";
import BoardSection from "./BoardSection";
import { useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";
import TaskNameModal from "./TitleEditModal";
>>>>>>> 043711b (финал)

function ProjectBoard() {
  const { projectId, boardIndex } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const uniqueBoardKey = `${projectId}_${boardIndex}`;
<<<<<<< HEAD
=======
  const [filters, setFilters] = useState({});
>>>>>>> 043711b (финал)

  const [allBoardsData, setAllBoardsData] = useState({});
  const [boardsByProject, setBoardsByProject] = useState({});
  const [taskIdCounter, setTaskIdCounter] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
<<<<<<< HEAD
  const [selectedColumnId, setSelectedColumnId] = useState('');
  const [currentBoardTitle, setCurrentBoardTitle] = useState('');
  const [isTaskNameModalOpen, setIsTaskNameModalOpen] = useState(false);

  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);
  const [boardTitleInput, setBoardTitleInput] = useState('');

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
=======
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [currentBoardTitle, setCurrentBoardTitle] = useState("");

  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);
  const [boardTitleInput, setBoardTitleInput] = useState("");

  const handleDeleteTask = (taskId) => {
    const updatedColumns = { ...columns };

    for (const colId in updatedColumns) {
      updatedColumns[colId].tasks = updatedColumns[colId].tasks.filter(
        (task) => task.id !== taskId
      );
    }

    setColumnsForBoard(updatedColumns);
  };

  const fetchProjects = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/projects/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Ошибка получения проектов");
      const data = await res.json();

      const result = {};
      data.forEach((project) => {
>>>>>>> 043711b (финал)
        result[project.id] = project;
      });
      setBoardsByProject(result);

      const project = result[projectId];
      if (project && project.cards[boardIndex]) {
        const card = project.cards[boardIndex];
        const cardId = card.id;

        setCurrentBoardTitle(card.title || `Доска ${Number(boardIndex) + 1}`);

<<<<<<< HEAD
        const taskRes = await fetch(`http://localhost:8000/tasks/boards/${cardId}/tasks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tasks = await taskRes.json();

        const loadedColumns = {};
        card.columns.forEach(column => {
          loadedColumns[column.id] = { title: column.title, order: column.order, tasks: [] };
        });

        tasks.forEach(task => {
          const colId = task.column;
          if (loadedColumns[colId]) {
            loadedColumns[colId].tasks.push({ ...task, columnId: colId.toString() });
          }
        });

        setAllBoardsData(prev => ({
=======
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          queryParams.append(key.toLowerCase(), value);
        });

        const taskRes = await fetch(
          `http://localhost:8000/tasks/boards/${cardId}/tasks/filter/?${queryParams.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const tasks = await taskRes.json();

        const loadedColumns = {};
        card.columns.forEach((column) => {
          loadedColumns[column.id] = {
            title: column.title,
            order: column.order,
            tasks: [],
          };
        });

        tasks.forEach((task) => {
          const colId = task.column;
          if (loadedColumns[colId]) {
            loadedColumns[colId].tasks.push({
              ...task,
              columnId: colId.toString(),
            });
          }
        });

        setAllBoardsData((prev) => ({
>>>>>>> 043711b (финал)
          ...prev,
          [uniqueBoardKey]: loadedColumns,
        }));
      }
    } catch (err) {
<<<<<<< HEAD
      console.error('Ошибка при загрузке проектов или задач:', err);
=======
      console.error("Ошибка при загрузке проектов или задач:", err);
>>>>>>> 043711b (финал)
    }
  };

  useEffect(() => {
    fetchProjects();
<<<<<<< HEAD
  }, [projectId, boardIndex]);
=======
  }, [projectId, boardIndex, filters]);
>>>>>>> 043711b (финал)

  const handleBoardTitleDoubleClick = () => {
    setIsEditingBoardTitle(true);
    setBoardTitleInput(currentBoardTitle);
  };

  const handleBoardTitleBlur = async () => {
<<<<<<< HEAD
    const token = localStorage.getItem('access');
=======
    const token = localStorage.getItem("access");
>>>>>>> 043711b (финал)
    const newTitle = boardTitleInput.trim();
    setIsEditingBoardTitle(false);

    if (!newTitle || newTitle === currentBoardTitle) return;

<<<<<<< HEAD
    const cardId = boardsByProject[projectId]?.cards?.[boardIndex]?.id;
    if (!cardId) return;

    try {
      const res = await fetch(`http://localhost:8000/cards/${cardId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
=======
    const boardId = boardsByProject[projectId]?.cards?.[boardIndex]?.id;
    if (!boardId) return;

    try {
      const res = await fetch(`http://localhost:8000/cards/${boardId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
>>>>>>> 043711b (финал)
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

<<<<<<< HEAD
      if (!res.ok) throw new Error('Ошибка при переименовании доски');
      setCurrentBoardTitle(newTitle);
    } catch (err) {
      console.error(err);
=======
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Ошибка при переименовании доски");
      }

      setCurrentBoardTitle(newTitle);

      // 🔧 ОБНОВЛЯЕМ boardsByProject
      setBoardsByProject((prev) => {
        const updated = { ...prev };
        if (updated[projectId]?.cards?.[boardIndex]) {
          updated[projectId].cards[boardIndex].title = newTitle;
        }
        return updated;
      });
    } catch (err) {
      console.error("Ошибка:", err.message);
>>>>>>> 043711b (финал)
    }
  };

  const columns = allBoardsData[uniqueBoardKey] || {};

<<<<<<< HEAD
  const setColumnsForBoard = newColumns => {
    setAllBoardsData(prev => ({
=======
  const setColumnsForBoard = (newColumns) => {
    setAllBoardsData((prev) => ({
>>>>>>> 043711b (финал)
      ...prev,
      [uniqueBoardKey]: newColumns,
    }));
  };

  const handleAddTaskClick = () => {
<<<<<<< HEAD
    setIsTaskNameModalOpen(true);
  };

  const handleConfirmNewTask = (taskTitle) => {
    const newId = taskIdCounter;
    const newTask = {
      id: newId.toString(),
      title: taskTitle,
      description: '',
      author: 'IvanIvanov',
      performer: '',
      tags: [],
      priority: 'low',
      deadline: '',
      type: '',
      columnId: Object.keys(columns)[0] || 'doing',
      comments: [],
    };

    setTaskIdCounter(prev => prev + 1);
    setIsTaskNameModalOpen(false);

    const firstKey = newTask.columnId;
    setColumnsForBoard({
      ...columns,
      [firstKey]: {
        ...columns[firstKey],
        tasks: [...columns[firstKey].tasks, newTask],
      },
    });
=======
    setIsTaskModalOpen(true);
  };

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleAddTask = async (title) => {
    const columnIds = Object.keys(columns);
    const firstColumnId = columnIds[0];
    if (!firstColumnId) return;

    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const cardId = boardsByProject?.[projectId]?.cards?.[boardIndex]?.id;
      if (!cardId) return;

      const res = await fetch(
        `http://localhost:8000/tasks/boards/${cardId}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description: "",
            priority: 1,
            column: parseInt(firstColumnId),
            project: parseInt(projectId),
            board: cardId,
            performer: null,
            type: 1,
            tag_ids: [],
            attachment_ids: [],
          }),
        }
      );

      const newTask = await res.json();
      const updated = [...(columns[firstColumnId]?.tasks || []), newTask];
      setColumnsForBoard({
        ...columns,
        [firstColumnId]: {
          ...columns[firstColumnId],
          tasks: updated,
        },
      });

      setIsTaskModalOpen(false); // <--- сюда перенеси закрытие
    } catch (err) {
      console.error("Ошибка при добавлении задачи", err);
    }
>>>>>>> 043711b (финал)
  };

  const handleOpenModal = (task, columnId) => {
    setSelectedTask({ ...task, columnTitle: columns[columnId].title });
    setSelectedColumnId(columnId);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
<<<<<<< HEAD
    setSelectedColumnId('');
  };

  const handleSaveTask = updatedTask => {
    const updatedColumns = { ...columns };
    const tasks = updatedColumns[selectedColumnId].tasks.map(task =>
=======
    setSelectedColumnId("");
  };

  const handleSaveTask = (updatedTask) => {
    const updatedColumns = { ...columns };
    const tasks = updatedColumns[selectedColumnId].tasks.map((task) =>
>>>>>>> 043711b (финал)
      task.id === updatedTask.id ? updatedTask : task
    );
    updatedColumns[selectedColumnId].tasks = tasks;
    setColumnsForBoard(updatedColumns);
  };

  const handleRenameColumn = async (columnId, newTitle = null) => {
<<<<<<< HEAD
    const token = localStorage.getItem('access');
    if (!token) return;

    if (!newTitle) {
      newTitle = window.prompt('Новое название колонки:', columns[columnId].title);
      if (!newTitle || newTitle.trim() === '') return;
    }

    try {
      const res = await fetch(`http://localhost:8000/cards/columns/${columnId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) throw new Error('Ошибка при переименовании');
=======
    const token = localStorage.getItem("access");
    if (!token) return;

    if (!newTitle) {
      newTitle = window.prompt(
        "Новое название колонки:",
        columns[columnId].title
      );
      if (!newTitle || newTitle.trim() === "") return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/cards/columns/${columnId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (!res.ok) throw new Error("Ошибка при переименовании");
>>>>>>> 043711b (финал)

      const updatedColumns = {
        ...columns,
        [columnId]: {
          ...columns[columnId],
          title: newTitle,
        },
      };
      setColumnsForBoard(updatedColumns);
    } catch (err) {
<<<<<<< HEAD
      console.error('Ошибка при переименовании колонки:', err);
=======
      console.error("Ошибка при переименовании колонки:", err);
>>>>>>> 043711b (финал)
    }
  };

  const handleDeleteColumn = async (columnId) => {
<<<<<<< HEAD
    const token = localStorage.getItem('access');
    if (!token) return;

    if (!window.confirm('Удалить эту колонку?')) return;

    try {
      const res = await fetch(`http://localhost:8000/cards/columns/${columnId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Ошибка при удалении');
=======
    const token = localStorage.getItem("access");
    if (!token) return;

    if (!window.confirm("Удалить эту колонку?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/cards/columns/${columnId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Ошибка при удалении");
>>>>>>> 043711b (финал)

      const updated = { ...columns };
      delete updated[columnId];
      setColumnsForBoard(updated);
    } catch (err) {
<<<<<<< HEAD
      console.error('Ошибка при удалении колонки:', err);
    }
  };

  const onDragEnd = async result => {
=======
      console.error("Ошибка при удалении колонки:", err);
    }
  };

  const onDragEnd = async (result) => {
>>>>>>> 043711b (финал)
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.columnId = destination.droppableId;

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumnsForBoard({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          tasks: sourceTasks,
        },
      });
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setColumnsForBoard({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destCol,
          tasks: destTasks,
        },
      });

<<<<<<< HEAD
      const token = localStorage.getItem('access');
      try {
        await fetch(`http://localhost:8000/tasks/tasks/${movedTask.id}/move/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
=======
      const token = localStorage.getItem("access");
      try {
        await fetch(`http://localhost:8000/tasks/tasks/${movedTask.id}/move/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
>>>>>>> 043711b (финал)
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ column_id: destination.droppableId }),
        });
      } catch (err) {
<<<<<<< HEAD
        console.error('Ошибка при обновлении колонки задачи:', err);
=======
        console.error("Ошибка при обновлении колонки задачи:", err);
>>>>>>> 043711b (финал)
      }
    }
  };

  const handleMoveColumn = async (columnId, direction) => {
    const columnEntries = Object.entries(columns).sort(
      ([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0)
    );
    const index = columnEntries.findIndex(([key]) => key === columnId);
    if (index === -1) return;

    let newIndex = index;

    switch (direction) {
<<<<<<< HEAD
      case 'start':
        newIndex = 0;
        break;
      case 'left':
        newIndex = Math.max(index - 1, 0);
        break;
      case 'right':
        newIndex = Math.min(index + 1, columnEntries.length - 1);
        break;
      case 'end':
=======
      case "start":
        newIndex = 0;
        break;
      case "left":
        newIndex = Math.max(index - 1, 0);
        break;
      case "right":
        newIndex = Math.min(index + 1, columnEntries.length - 1);
        break;
      case "end":
>>>>>>> 043711b (финал)
        newIndex = columnEntries.length - 1;
        break;
      default:
        return;
    }

    if (newIndex === index) return;

    const newOrder = [...columnEntries];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(newIndex, 0, moved);

    const newColumns = {};
    newOrder.forEach(([key, value], i) => {
      newColumns[key] = {
        ...value,
        order: i + 1,
      };
    });

    setColumnsForBoard(newColumns);

<<<<<<< HEAD
    const token = localStorage.getItem('access');
=======
    const token = localStorage.getItem("access");
>>>>>>> 043711b (финал)
    if (!token) return;

    const updatedOrder = Object.entries(newColumns).map(([id, value]) => ({
      id: parseInt(id),
      order: value.order,
    }));

    try {
<<<<<<< HEAD
      const res = await fetch('http://localhost:8000/cards/columns/reorder/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
=======
      const res = await fetch("http://localhost:8000/cards/columns/reorder/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
>>>>>>> 043711b (финал)
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedOrder),
      });

<<<<<<< HEAD
      if (!res.ok) throw new Error('Ошибка при сохранении порядка колонок');

      await fetchProjects();
    } catch (err) {
      console.error('Ошибка при обновлении порядка колонок:', err);
=======
      if (!res.ok) throw new Error("Ошибка при сохранении порядка колонок");

      await fetchProjects();
    } catch (err) {
      console.error("Ошибка при обновлении порядка колонок:", err);
>>>>>>> 043711b (финал)
    }
  };


  return (
    <div className="layout">
      <div className="page-content">
        <div
          className={`sidebar-left ${isSidebarOpen ? "expanded" : "collapsed"}`}
        >
          <SidebarContent
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(false)}
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
            boardsByProject={boardsByProject}
            setBoardsByProject={setBoardsByProject}
            refreshColumns={fetchProjects}
<<<<<<< HEAD
=======
            openTaskModal={() => setIsTaskModalOpen(true)}
            onApplyFilters={setFilters}
>>>>>>> 043711b (финал)
          />

          <div className="main-content">
            <div className="board-wrapper">
              <div className="board-box-container">
                <div
                  className="board-box"
                  style={{
<<<<<<< HEAD
                    width: Math.max(1384, Object.keys(columns).length * 300) + 'px',
=======
                    width:
                      Math.max(1384, Object.keys(columns).length * 300) + "px",
>>>>>>> 043711b (финал)
                  }}
                >
                  <div className="board-top">
                    {isEditingBoardTitle ? (
                      <input
<<<<<<< HEAD
                        className="board-title-input"
                        value={boardTitleInput}
                        onChange={e => setBoardTitleInput(e.target.value)}
                        onBlur={handleBoardTitleBlur}
                        onKeyDown={e => e.key === 'Enter' && handleBoardTitleBlur()}
=======
                        spellCheck={false}
                        className="board-title-input"
                        value={boardTitleInput}
                        onChange={(e) => setBoardTitleInput(e.target.value)}
                        onBlur={handleBoardTitleBlur}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleBoardTitleBlur()
                        }
>>>>>>> 043711b (финал)
                        autoFocus
                      />
                    ) : (
                      <h3
                        className="board-title board-title-text"
                        onDoubleClick={handleBoardTitleDoubleClick}
                      >
                        {currentBoardTitle}
                      </h3>
                    )}
<<<<<<< HEAD
                    <button className="board-add-btn" onClick={handleAddTaskClick}>
                      ＋
                    </button>
=======
>>>>>>> 043711b (финал)
                  </div>

                  <DragDropContext onDragEnd={onDragEnd}>
                    <div className="board-columns">
<<<<<<< HEAD
                      {Object.entries(columns).map(([key, column]) => (
                        <BoardSection
                          key={key}
                          columnId={key}
                          title={column.title}
                          tasks={column.tasks}
                          onTaskClick={task => handleOpenModal(task, key)}
                          onRename={handleRenameColumn}
                          onMoveColumn={handleMoveColumn}
                          onDeleteColumn={() => {}}
                        />
                      ))}
=======
>>>>>>> 043711b (финал)
                      {Object.entries(columns)
                        .sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0))
                        .map(([key, column]) => (
                          <BoardSection
                            key={key}
                            columnId={key}
                            title={column.title}
                            tasks={column.tasks}
<<<<<<< HEAD
                            onTaskClick={task => handleOpenModal(task, key)}
                            onRename={handleRenameColumn}
                            onMoveColumn={handleMoveColumn}
                            onDeleteColumn={() => handleDeleteColumn(key)}
=======
                            onTaskClick={(task) => handleOpenModal(task, key)}
                            onRename={handleRenameColumn}
                            onMoveColumn={handleMoveColumn}
                            onDeleteColumn={() => handleDeleteColumn(key)}
                            onDeleteTask={handleDeleteTask} // ✅ добавлено!
                            isTaskModalOpen={isTaskModalOpen}
                            setIsTaskModalOpen={setIsTaskModalOpen}
>>>>>>> 043711b (финал)
                          />
                        ))}
                    </div>
                  </DragDropContext>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-strip"></div>
      </div>
<<<<<<< HEAD

      {isTaskNameModalOpen && (
        <TaskNameModal
          onConfirm={handleConfirmNewTask}
          onCancel={() => setIsTaskNameModalOpen(false)}
=======
      {isTaskModalOpen && (
        <TaskNameModal
          onConfirm={(title) => {
            handleAddTask(title);
            setIsTaskModalOpen(false);
          }}
          onCancel={() => setIsTaskModalOpen(false)}
>>>>>>> 043711b (финал)
        />
      )}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}

export default ProjectBoard;
