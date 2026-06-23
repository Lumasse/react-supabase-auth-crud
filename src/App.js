import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { supabase } from "./supabase/client";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
      console.log("Auth state changed:", event, session);
    });
  }, []);

  return (
    <div className="App">
      <TaskProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TaskProvider>
    </div>
  );
}

export default App;
