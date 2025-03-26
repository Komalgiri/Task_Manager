import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTextInputChange = (event) => setTextInput(event.target.value);
  const handlePriorityChange = (event) => setSelectedPriority(event.target.value);
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleTaskSubmit = () => {
    if (textInput.trim() === "" || startDate === "" || endDate === "") {
      alert("Task name, start date, and end date are required!");
      return;
    }

    const newTask = {
      text: textInput,
      priority: selectedPriority,
      startDate,
      endDate,
      description,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("High");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">✨ Add New Task</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full border rounded-lg p-3 bg-gray-700 text-white shadow-sm"
            placeholder="Enter task name..."
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full md:w-1/2 border rounded-lg p-3 bg-gray-700 text-white shadow-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-full md:w-1/2 border rounded-lg p-3 bg-gray-700 text-white shadow-sm"
            />
          </div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full border rounded-lg p-3 bg-gray-700 text-white shadow-sm"
            placeholder="Optional: Enter a short description..."
          />
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedPriority}
              onChange={handlePriorityChange}
              className="w-full md:w-auto border rounded-lg p-3 bg-gray-700 text-white shadow-sm"
            >
              <option value="High">🔥 High Priority</option>
              <option value="Medium">⚡ Medium Priority</option>
              <option value="Low">📝 Low Priority</option>
            </select>
            <button
              onClick={handleTaskSubmit}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    <Layout
      getTasksByPriority={(priority) => tasks.filter((task) => task.priority === priority)}
      setSelectedTask={setSelectedTask}
      selectedTask={selectedTask}
      handleEditTask={handleEditTask}
      handleChangePriority={handleChangePriority}
      handleDeleteTask={handleDeleteTask}
      level="High"
      bgColor="bg-transparent"
    />
    <Layout
      getTasksByPriority={(priority) => tasks.filter((task) => task.priority === priority)}
      setSelectedTask={setSelectedTask}
      selectedTask={selectedTask}
      handleEditTask={handleEditTask}
      handleChangePriority={handleChangePriority}
      handleDeleteTask={handleDeleteTask}
      level="Medium"
      bgColor="bg-transparent"
    />
    <Layout
      getTasksByPriority={(priority) => tasks.filter((task) => task.priority === priority)}
      setSelectedTask={setSelectedTask}
      selectedTask={selectedTask}
      handleEditTask={handleEditTask}
      handleChangePriority={handleChangePriority}
      handleDeleteTask={handleDeleteTask}
      level="Low"
      bgColor="bg-transparent"
    />
  </div>
    </div>
  );
};

export default TaskDashboard;
