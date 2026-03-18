const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

module.exports = app; 

// Create Task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO task (title, description) VALUES (?, ?)",
    [title, description],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Task Created");
    }
  );
});

// Get latest 5 tasks
app.get("/tasks", (req, res) => {
  db.query(
    "SELECT * FROM task WHERE status='PENDING' ORDER BY created_at DESC LIMIT 5",
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Mark as Done
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE task SET status='DONE' WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Task Completed");
    }
  );
});

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}