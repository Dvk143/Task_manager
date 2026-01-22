import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask
} from "../services/api";

function Dashboard() {
  // =========================
  // STATE
  // =========================
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | completed

  // =========================
  // FETCH TASKS (ON LOAD)
  // =========================
  useEffect(() => {
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // =========================
  // ADD TASK
  // =========================
  const addTask = async (title) => {
    const res = await createTask({ title });
    setTasks([...tasks, res.data]);
  };

  // =========================
  // TOGGLE TASK STATUS
  // =========================
  const toggleTask = async (task) => {
    const newStatus =
      task.status === "completed" ? "pending" : "completed";

    const res = await updateTask(task.id, {
      title: task.title,
      status: newStatus
    });

    setTasks(
      tasks.map((t) => (t.id === task.id ? res.data : t))
    );
  };

  // =========================
  // EDIT TASK
  // =========================
  const editTask = async (id, title, status) => {
    const res = await updateTask(id, { title, status });
    setTasks(
      tasks.map((t) => (t.id === id ? res.data : t))
    );
  };

  // =========================
  // DELETE TASK
  // =========================
  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // =========================
  // SEARCH + FILTER LOGIC
  // =========================
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : task.status === filter;

    return matchesSearch && matchesFilter;
  });

  // =========================
  // UI
  // =========================
  return (
    <>
      {/* ADD TASK */}
      <TaskForm onAddTask={addTask} />

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          marginTop: "16px",
          marginBottom: "10px"
        }}
      />

      {/* FILTER BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      {/* COUNTER */}
      <p style={{ marginTop: "10px", color: "#9ca3af" }}>
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      {/* TASK LIST */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={removeTask}
        onEdit={editTask}
      />
    </>
  );
}

export default Dashboard;
