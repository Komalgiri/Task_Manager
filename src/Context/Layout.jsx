const Layout = ({ getTasksByPriority, setSelectedTask, selectedTask, handleEditTask, handleChangePriority, handleDeleteTask, level, bgColor }) => {
  const tasks = getTasksByPriority(level);
  const levelNum = level === "High" ? "01." : level === "Medium" ? "02." : "03.";

  return (
    <div className={`bg-gradient-to-b ${bgColor} text-white rounded-lg p-6 shadow-lg`}>
      <h3 className="text-lg font-semibold mb-2">
        {levelNum} {level} Priority
      </h3>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="p-3 bg-white/20 rounded-lg flex justify-between items-center">
              <span>{task.text}</span>
              <div className="flex space-x-2">
                <button className="text-blue-300 hover:text-blue-400" onClick={() => setSelectedTask(task)}>✏️</button>
                <button className="text-red-300 hover:text-red-400" onClick={() => handleDeleteTask(task)}>🗑️</button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-300 text-sm">No tasks available</p>
        )}
      </ul>
    </div>
  );
};

export default Layout;
