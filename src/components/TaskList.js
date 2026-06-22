import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TaskList() {
    
    const { tasks, getTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    console.log("Estado actual de las tareas:", tasks);

    return (
        <div>
            {
                tasks.map(task => (
                    <div key={task.id}>
                        <h3>{task.name}</h3>
                        <p>{JSON.stringify(task.done)}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default TaskList;