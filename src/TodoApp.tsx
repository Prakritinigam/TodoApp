import React, { useState } from "react";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>(() => {
    try {
      const savedTasks = localStorage.getItem("task");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  });

  const [newTask, setNewTask] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

  const addTask = (): void => {
    if (newTask.trim() !== "" && !tasks.includes(newTask)) {
      const updated = [...tasks, newTask];
      setTasks(updated);
      localStorage.setItem("task", JSON.stringify(updated));

      setNewTask("");
    } else {
      alert("Task already added or input is empty.");
    }
  };

  const saveUpdatedTask = (index: number): void => {
    if (editedTask.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setEditingIndex(null);
    setEditedTask("");
  };

  const deleteTask = (index: number): void => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("task", JSON.stringify(updated));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do App</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task"
          className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  className="flex-1 mr-2 border border-gray-300 px-2 py-1 rounded"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <span className="flex-1 text-gray-800">{task}</span>
              )}

              <div className="flex gap-2">
                {editingIndex === index ? (
                  <>
                    <button
                      onClick={() => saveUpdatedTask(index)}
                      className="text-sm bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingIndex(null);
                        setEditedTask("");
                      }}
                      className="text-sm bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-white"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setEditedTask(task);
                      }}
                      className="text-sm bg-green-800 hover:bg-green-700 px-3 py-1 rounded text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="text-sm bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks added yet.</p>
      )}
    </div>
  );
};

export default TodoApp;
