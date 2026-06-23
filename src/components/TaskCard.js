import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
    const { deleteTask, updateTask } = useTasks();

    const handleDelete = () => {
        deleteTask(task.id);
    }

    const handleToggleDone = () => {
        updateTask(task.id, { done: !task.done });
    }

    return (
        <div className="card card-bod mb-2">
            <h3>
                {`${task.id}. ${task.name}`}
            </h3>
            <p>{task.done ? "Done" : "Not done"}</p>
            <div className="ms-auto">
                <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete()}>
                    Delete
                </button>
                <button className="btn btn-secondary btn-sm me-1" onClick={() => handleToggleDone()}>
                    Done
                </button>
            </div>
        </div>
    )
}

export default TaskCard