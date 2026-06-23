import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

import TaskCard from "./TaskCard";

function TaskList({done = false}) {

    const { tasks, getTasks, loading } = useTasks();

    useEffect(() => {
        getTasks(done);
    }, [done]);

    function renderTasks() {
        if (loading) {
            return <p>Loading tasks...</p>;
        } else if (tasks.length === 0) {
            return <p>No tasks found. Create your first task!</p>;
        } else {
            console.log("Estado actual de las tareas:", tasks);
            return (
                <div>
                    {tasks.map((task, index) => (
                        < TaskCard key={task.id || index} task={task} />
                    ))}
                </div>
            );
        }
    }

    return <div>
        {renderTasks()}
    </div>

}

export default TaskList;