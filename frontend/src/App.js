import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return alert("Title required");

    await axios.post("http://localhost:5000/tasks", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const markDone = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="main-container">
      
      {/* LEFT SIDE - FORM */}
      <div className="left-panel">
        <h2>Add Task</h2>

        <input
          value={title}
          placeholder="Task Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Task Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* RIGHT SIDE - TASK LIST */}
      <div className="right-panel">
        <h2>Recent Tasks</h2>

        {tasks.length === 0 && <p>No tasks available</p>}

        {tasks.map((task) => (
          <div className="card" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <button onClick={() => markDone(task.id)}>Done</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;