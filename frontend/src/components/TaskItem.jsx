import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, title, task.status);
    setIsEditing(false);
  };

  return (
    <li className={`task ${task.status === "completed" ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => onToggle(task)}
        />

        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <span>{task.title}</span>
        )}
      </label>

      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleSave}>💾</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>✏️</button>
        )}

        <button className="delete" onClick={() => onDelete(task.id)}>
          ✖
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
