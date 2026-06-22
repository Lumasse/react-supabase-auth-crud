import { useState } from "react";
import { supabase } from "../supabase/client";

function TaskForm() {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskName);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const result = await supabase
        .from("tasks")
        .insert({ name: taskName, userId: user.id })
        .then(({ data, error }) => {
          if (error) {
            console.error("Error adding task:", error);
          } else {
            console.log("Task added:", data);
            setTaskName("");
          }
        });
      console.log(result);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Task title"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
