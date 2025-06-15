import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(API_URL, { task });
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Simple To-Do App</h1>

      <div style={styles.inputSection}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <span>{todo.task}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
  },
  inputSection: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  addButton: {
    padding: "8px 12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    marginBottom: 8,
    border: "1px solid #ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
  },
};

export default App;
