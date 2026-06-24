import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => setTasks((prev) => [...prev, task]);
  const toggleComplete = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <AddTaskForm addTask={addTask} />
      </div>

      {/* Stats + Progress */}
      {tasks.length > 0 && (
        <div className="bg-white rounded-2xl shadow px-6 py-4 flex items-center gap-6">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">{tasks.length}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Total</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-indigo-500">{completedCount}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Done</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-400">{tasks.length - completedCount}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Pending</p>
          </div>
          <div className="flex-1 flex flex-col gap-1 ml-2">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 text-right">{completedCount} / {tasks.length} done</p>
          </div>
        </div>
      )}

      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
}

export default TaskManager;