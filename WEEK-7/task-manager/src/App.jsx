import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Task Manager</h1>
        </div>
        <TaskManager />
      </div>
    </div>
  );
}

export default App;