import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import '../styles/ProjectBoard.css';
import TopNavbar from './TopNavbar';
import SidebarContent from './SidebarContent';
import BoardSection from './BoardSection';
import { useParams } from 'react-router-dom';
import EditTaskModal from './EditTaskModal';

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
          loadedColumns[column.id] = { title: column.title, tasks: [] };
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

  const columns = allBoardsData[uniqueBoardKey] || {};

  const setColumnsForBoard = newColumns => {
    setAllBoardsData(prev => ({
      ...prev,
      [uniqueBoardKey]: newColumns,
    }));
  };

  const handleAddTask = () => {
    const newId = taskIdCounter;
    const newTask = {
      id: newId.toString(),
      title: 'Новая задача',
      description: '',
      author: 'IvanIvanov',
      performer: '',
      tags: [],
      priority: 'низкий',
      deadline: '',
      type: '',
      columnId: Object.keys(columns)[0] || 'doing',
      comments: [],
    };

    setTaskIdCounter(prev => prev + 1);

    const firstKey = newTask.columnId;
    setColumnsForBoard({
      ...columns,
      [firstKey]: {
        ...columns[firstKey],
        tasks: [...columns[firstKey].tasks, newTask],
      },
    });
  };

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
          body: JSON.stringify({
            column_id: destination.droppableId,
          }),
        });
      } catch (err) {
        console.error('Ошибка при обновлении колонки задачи:', err);
      }
    }
  };

  const handleMoveColumn = (columnId, direction) => {
    const columnEntries = Object.entries(columns);
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
    newOrder.forEach(([key, value]) => {
      newColumns[key] = value;
    });

    setColumnsForBoard(newColumns);
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
                    <h3 className="board-title">{currentBoardTitle}</h3>
                    <button className="board-add-btn" onClick={handleAddTask}>
                      ＋
                    </button>
                  </div>

                  <DragDropContext onDragEnd={onDragEnd}>
                    <div className="board-columns">
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
                    </div>
                  </DragDropContext>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-strip"></div>
      </div>

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
