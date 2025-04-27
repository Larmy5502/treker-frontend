import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

function BoardSection({ columnId, title, tasks, setColumns }) {
  const handleEditTask = (taskId, newTitle) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.map(task =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      }
    }));
  };

  return (
    <div className="board-section">
      <div className="section-header">
        <span className="section-title">{title}</span>

        <div className="section-header-right">
          <span className="task-count">{tasks.length}</span>
        </div>
      </div>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div className="board-tasks" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onEdit={handleEditTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default BoardSection;
