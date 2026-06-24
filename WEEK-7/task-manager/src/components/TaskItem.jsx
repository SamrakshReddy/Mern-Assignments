const PRIORITY_BADGE = {
  High:   "bg-red-100 text-red-500",
  Medium: "bg-orange-100 text-orange-500",
  Low:    "bg-green-100 text-green-600",
};

const PRIORITY_DOT = {
  High:   "bg-red-500",
  Medium: "bg-orange-400",
  Low:    "bg-green-500",
};

function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <div className={`bg-white rounded-2xl shadow overflow-hidden flex flex-col transition-opacity duration-300 ${task.completed ? "opacity-60" : ""}`}>

      {/* Product Image */}
      <div className="w-full h-44 bg-gray-100 relative overflow-hidden">
        {task.image ? (
          <img
            src={task.image}
            alt={task.title}
            className={`w-full h-full object-cover ${task.completed ? "grayscale" : ""}`}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
            🛍️
          </div>
        )}

        {/* Priority badge on image */}
        <span className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${PRIORITY_BADGE[task.priority]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[task.priority]}`} />
          {task.priority}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        {/* Brand */}
        <p className="text-xs text-gray-400 uppercase tracking-widest">{task.brand}</p>

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-gray-800 text-sm leading-snug ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h3>
          <p className="text-indigo-600 font-bold text-sm whitespace-nowrap">${task.price}</p>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{task.description}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
          <button
            onClick={() => toggleComplete(task.id)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              task.completed
                ? "border-gray-200 text-gray-400 hover:bg-gray-50"
                : "border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            }`}
          >
            {task.completed ? "↩ Undo" : "✓ Complete"}
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;