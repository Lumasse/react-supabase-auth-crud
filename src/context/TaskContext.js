import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("userId", user.id)
      .eq("done", done)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error obteniendo tareas:", error);
      return;
    }

    if (data) {
      setTasks(data);
    }

    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("tasks")
        .insert({ name: taskName, userId: user.id })
        .select();

      if (error) throw error;

      setTasks([...tasks, ...data]);

    } catch (error) {
      console.error("Error creando tarea:", error);
    } finally {
      setAdding(false);
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("userId", user.id)
        .eq("id", taskId);

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== taskId));

    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  }

  const updateTask = async (taskId, updateFields) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("tasks")
        .update(updateFields)
        .eq("userId", user.id)
        .eq("id", taskId)
        .select();

      if (error) throw error;

      console.log("Datos enviados al UPDATE:", { taskId, updateFields, userId: user.id });

      if (data && data.length > 0) {
        const tareaActualizada = data[0];

        if (tareaActualizada.done) {
          // Si la tarea se marcó como completada, la eliminamos de la pantalla
          setTasks(tasks.filter(task => task.id !== taskId));
        } else {
          // Si solo se editó otra cosa, la actualizamos normalmente
          setTasks(tasks.map(task => (task.id === taskId ? tareaActualizada : task)));
        }
      } else {
        console.warn("No se pudo actualizar la tarea en la base de datos.");
      }

    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask, deleteTask, updateTask, adding, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
