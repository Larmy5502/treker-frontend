import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd'; // правильный импорт
import '../styles/ProjectBoard.css';
import TopNavbar from './TopNavbar';
import SidebarContent from './SidebarContent';
import BoardSection from './BoardSection';

function ProjectBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Колонки и задачи
  const [columns, setColumns] = useState({
    doing: { title: 'Выполняется', tasks: [] },
    review: { title: 'На проверке', tasks: [] },
    done: { title: 'Готово', tasks: [] }
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          tasks: sourceTasks
        }
      });
    } else {
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          tasks: sourceTasks
        },
        [destination.droppableId]: {
          ...destCol,
          tasks: destTasks
        }
      });
    }
  };

  // Новый обработчик добавления задачи в первую колонку ("Выполняется")
  const handleAddTask = () => {
    setColumns(prev => ({
      ...prev,
      doing: {
        ...prev.doing,
        tasks: [...prev.doing.tasks, { id: Date.now().toString(), title: 'Новая задача' }]
      }
    }));
  };

  return (
    <div className="layout">
      <div className="page-content">
        <div className={`sidebar-left ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
          <SidebarContent
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(false)}
          />
        </div>

        {isSidebarOpen && (
          <div className="overlay-blur" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        <div className="content-with-topbar">
          <TopNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

          <div className="main-content">
            <div className="board-wrapper">
              <div className="board-box">
                <div className="board-top">
                  <h3 className="board-title">В работе</h3>
                  <button className="board-add-btn" onClick={handleAddTask}>＋</button> {/* <-- сюда повесили добавление */}
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="board-columns">
                    {Object.entries(columns).map(([key, column]) => (
                      <BoardSection
                        key={key}
                        columnId={key}
                        title={column.title}
                        tasks={column.tasks}
                      />
                    ))}
                  </div>
                </DragDropContext>

              </div>
            </div>
          </div>
        </div>

        <div className="right-strip"></div>
      </div>
    </div>
  );
}

export default ProjectBoard;
