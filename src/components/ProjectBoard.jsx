import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import '../styles/ProjectBoard.css';
import TopNavbar from './TopNavbar';
import SidebarContent from './SidebarContent';
import BoardSection from './BoardSection';
import { useParams } from 'react-router-dom';
import EditTaskModal from './EditTaskModal';
<<<<<<< HEAD
=======
import TaskNameModal from './TaskNameModal';
>>>>>>> ace2cd8 (финал 1)

function ProjectBoard() {
  const { projectId, boardIndex } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const uniqueBoardKey = `${projectId}_${boardIndex}`;

  const [allBoardsData, setAllBoardsData] = useState({});
  const [boardsByProject, setBoardsByProject] = useState({});
  const [taskIdCounter, setTaskIdCounter] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState('');
  const [currentBoardTitle, setCurrentBoardTitle] = useState('');
<<<<<<< HEAD

=======
  const [isTaskNameModalOpen, setIsTaskNameModalOpen] = useState(false);

  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);
  const [boardTitleInput, setBoardTitleInput] = useState('');

>>>>>>> ace2cd8 (финал 1)
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

      const project = result[projectId];
      if (project && project.cards[boardIndex]) {
        const card = project.cards[boardIndex];
        const cardId = card.id;

        setCurrentBoardTitle(card.title || `Доска ${Number(boardIndex) + 1}`);

        const taskRes = await fetch(`http://localhost:8000/tasks/boards/${cardId}/tasks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tasks = await taskRes.json();

        const loadedColumns = {};
        card.columns.forEach(column => {
<<<<<<< HEAD
          loadedColumns[column.id] = { title: column.title, tasks: [] };
=======
          loadedColumns[column.id] = { title: column.title, order: column.order, tasks: [] };
>>>>>>> ace2cd8 (финал 1)
        });

        tasks.forEach(task => {
          const colId = task.column;
          if (loadedColumns[colId]) {
            loadedColumns[colId].tasks.push({ ...task, columnId: colId.toString() });
          }
        });

        setAllBoardsData(prev => ({
          ...prev,
          [uniqueBoardKey]: loadedColumns,
        }));
      }
    } catch (err) {
      console.error('Ошибка при загрузке проектов или задач:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [projectId, boardIndex]);

<<<<<<< HEAD
=======
  const handleBoardTitleDoubleClick = () => {
    setIsEditingBoardTitle(true);
    setBoardTitleInput(currentBoardTitle);
  };

  const handleBoardTitleBlur = async () => {
    const token = localStorage.getItem('access');
    const newTitle = boardTitleInput.trim();
    setIsEditingBoardTitle(false);

    if (!newTitle || newTitle === currentBoardTitle) return;

    const cardId = boardsByProject[projectId]?.cards?.[boardIndex]?.id;
    if (!cardId) return;

    try {
      const res = await fetch(`http://localhost:8000/cards/${cardId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) throw new Error('Ошибка при переименовании доски');
      setCurrentBoardTitle(newTitle);
    } catch (err) {
      console.error(err);
    }
  };

>>>>>>> ace2cd8 (финал 1)
  const columns = allBoardsData[uniqueBoardKey] || {};

  const setColumnsForBoard = newColumns => {
    setAllBoardsData(prev => ({
      ...prev,
      [uniqueBoardKey]: newColumns,
    }));
  };

<<<<<<< HEAD
  const handleAddTask = () => {
    const newId = taskIdCounter;
    const newTask = {
      id: newId.toString(),
      title: 'Новая задача',
=======
  const handleAddTaskClick = () => {
    setIsTaskNameModalOpen(true);
  };

  const handleConfirmNewTask = (taskTitle) => {
    const newId = taskIdCounter;
    const newTask = {
      id: newId.toString(),
      title: taskTitle,
>>>>>>> ace2cd8 (финал 1)
      description: '',
      author: 'IvanIvanov',
      performer: '',
      tags: [],
<<<<<<< HEAD
      priority: 'низкий',
=======
      priority: 'low',
>>>>>>> ace2cd8 (финал 1)
      deadline: '',
      type: '',
      columnId: Object.keys(columns)[0] || 'doing',
      comments: [],
    };

    setTaskIdCounter(prev => prev + 1);
<<<<<<< HEAD
=======
    setIsTaskNameModalOpen(false);
>>>>>>> ace2cd8 (финал 1)

    const firstKey = newTask.columnId;
    setColumnsForBoard({
      ...columns,
      [firstKey]: {
        ...columns[firstKey],
        tasks: [...columns[firstKey].tasks, newTask],
      },
    });
  };

<<<<<<< HEAD
  const handleRenameColumn = (columnId, newTitle) => {
    const updatedColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        title: newTitle,
      },
    };
    setColumnsForBoard(updatedColumns);
  };

=======
>>>>>>> ace2cd8 (финал 1)
  const handleOpenModal = (task, columnId) => {
    setSelectedTask({ ...task, columnTitle: columns[columnId].title });
    setSelectedColumnId(columnId);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setSelectedColumnId('');
  };

  const handleSaveTask = updatedTask => {
    const updatedColumns = { ...columns };
    const tasks = updatedColumns[selectedColumnId].tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    updatedColumns[selectedColumnId].tasks = tasks;
    setColumnsForBoard(updatedColumns);
  };

<<<<<<< HEAD
=======
  const handleRenameColumn = async (columnId, newTitle = null) => {
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

      const updatedColumns = {
        ...columns,
        [columnId]: {
          ...columns[columnId],
          title: newTitle,
        },
      };
      setColumnsForBoard(updatedColumns);
    } catch (err) {
      console.error('Ошибка при переименовании колонки:', err);
    }
  };

  const handleDeleteColumn = async (columnId) => {
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

      const updated = { ...columns };
      delete updated[columnId];
      setColumnsForBoard(updated);
    } catch (err) {
      console.error('Ошибка при удалении колонки:', err);
    }
  };

>>>>>>> ace2cd8 (финал 1)
  const onDragEnd = async result => {
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

      const token = localStorage.getItem('access');
      try {
        await fetch(`http://localhost:8000/tasks/tasks/${movedTask.id}/move/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
<<<<<<< HEAD
          body: JSON.stringify({
            column_id: destination.droppableId,
          }),
=======
          body: JSON.stringify({ column_id: destination.droppableId }),
>>>>>>> ace2cd8 (финал 1)
        });
      } catch (err) {
        console.error('Ошибка при обновлении колонки задачи:', err);
      }
    }
  };

<<<<<<< HEAD
  const handleMoveColumn = (columnId, direction) => {
    const columnEntries = Object.entries(columns);
=======
  const handleMoveColumn = async (columnId, direction) => {
    const columnEntries = Object.entries(columns).sort(
      ([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0)
    );
>>>>>>> ace2cd8 (финал 1)
    const index = columnEntries.findIndex(([key]) => key === columnId);
    if (index === -1) return;

    let newIndex = index;

    switch (direction) {
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
<<<<<<< HEAD
    newOrder.forEach(([key, value]) => {
      newColumns[key] = value;
    });

    setColumnsForBoard(newColumns);
=======
    newOrder.forEach(([key, value], i) => {
      newColumns[key] = {
        ...value,
        order: i + 1,
      };
    });

    setColumnsForBoard(newColumns);

    const token = localStorage.getItem('access');
    if (!token) return;

    const updatedOrder = Object.entries(newColumns).map(([id, value]) => ({
      id: parseInt(id),
      order: value.order,
    }));

    try {
      const res = await fetch('http://localhost:8000/cards/columns/reorder/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении порядка колонок');

      await fetchProjects();
    } catch (err) {
      console.error('Ошибка при обновлении порядка колонок:', err);
    }
>>>>>>> ace2cd8 (финал 1)
  };


  return (
    <div className="layout">
      <div className="page-content">
        <div className={`sidebar-left ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
          <SidebarContent
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(false)}
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
            boardsByProject={boardsByProject}
            setBoardsByProject={setBoardsByProject}
            refreshColumns={fetchProjects}
          />

          <div className="main-content">
            <div className="board-wrapper">
              <div className="board-box-container">
                <div
                  className="board-box"
                  style={{
                    width: Math.max(1384, Object.keys(columns).length * 300) + 'px',
                  }}
                >
                  <div className="board-top">
<<<<<<< HEAD
                    <h3 className="board-title">{currentBoardTitle}</h3>
                    <button className="board-add-btn" onClick={handleAddTask}>
=======
                    {isEditingBoardTitle ? (
                      <input
                        className="board-title-input"
                        value={boardTitleInput}
                        onChange={e => setBoardTitleInput(e.target.value)}
                        onBlur={handleBoardTitleBlur}
                        onKeyDown={e => e.key === 'Enter' && handleBoardTitleBlur()}
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
                    <button className="board-add-btn" onClick={handleAddTaskClick}>
>>>>>>> ace2cd8 (финал 1)
                      ＋
                    </button>
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
                      {Object.entries(columns)
                        .sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0))
                        .map(([key, column]) => (
                          <BoardSection
                            key={key}
                            columnId={key}
                            title={column.title}
                            tasks={column.tasks}
                            onTaskClick={task => handleOpenModal(task, key)}
                            onRename={handleRenameColumn}
                            onMoveColumn={handleMoveColumn}
                            onDeleteColumn={() => handleDeleteColumn(key)}
                          />
                        ))}
>>>>>>> ace2cd8 (финал 1)
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
=======
      {isTaskNameModalOpen && (
        <TaskNameModal
          onConfirm={handleConfirmNewTask}
          onCancel={() => setIsTaskNameModalOpen(false)}
        />
      )}

>>>>>>> ace2cd8 (финал 1)
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
