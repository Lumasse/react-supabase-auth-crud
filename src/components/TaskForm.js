import { useState } from "react";
import { useTasks, adding } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskName);
    createTask(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit} classsName="card card-body">
      <input
        type="text"
        name="taskName"
        placeholder="Task title"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="form-control mb-2"
      />
      <div className="ms-auto">
        <button disabled={adding} className="btn btn-primary btn-sm">
          {adding ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
