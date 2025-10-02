import './App.css';
import React, { useState } from 'react';

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveEdit = (index) => {
    if (editingText.trim() === '') return;
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Focus on what matters
      </h1>
      <p className="text-gray-400 mb-6 text-center">
        A simple, elegant way to organize your tasks and boost productivity. Joine with me .. 
      </p>

      {/* Input */}
      <div className="flex items-center w-full max-w-xl mb-8">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow p-3 rounded-lg bg-neutral-900 border border-neutral-700 outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={addTask}
          className="ml-2 px-5 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
           Add
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-xl bg-neutral-900 rounded-lg p-6 min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400">
            <div className="text-3xl mb-2">✔</div>
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm">Add your first task above to get started</p>
          </div>
        ) : (
          <ul className="w-full space-y-3">
            {tasks.map((t, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-neutral-800 px-4 py-3 rounded-lg text-white"
              >
                {editingIndex === index ? (
                  <div className="flex w-full items-center space-x-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-grow p-2 rounded bg-neutral-700 text-white"
                    />
                    <button
                      onClick={() => saveEdit(index)}
                      className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span>{t}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => startEditing(index)}
                        className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
