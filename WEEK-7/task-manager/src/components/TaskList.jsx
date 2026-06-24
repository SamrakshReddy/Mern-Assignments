import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, deleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">🛍️</p>
        <p className="text-sm">No tasks yet. Add your first product task above.</p>
      </div>
    );
  }

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="flex flex-col gap-6">
      {pending.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
            Pending — {pending.length}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pending.map((task) => (
              <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
            Completed — {completed.length}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completed.map((task) => (
              <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;