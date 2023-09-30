import React, { useState } from 'react';
import '../ToDo/TODo.css'
const App1 = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={handleInputChange}
        data-testid="task-input"
      />
      <button onClick={handleAddTask}>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {task.text}
            <button onClick={() => handleCompleteTask(index)} data-testid="complete-button">
              Complete
            </button>
            <button onClick={() => handleDeleteTask(index)} data-testid="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App1;
