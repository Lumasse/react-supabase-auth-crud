import React from "react";
import { useState } from "react";
import { supabase } from "../supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result =await supabase.auth.signInWithOtp({ email });
      console.log(result);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  useEffect(() => {
    // Creamos una función asíncrona dentro del useEffect
    const checkUser = async () => {
      // Obtenemos el usuario de forma asíncrona
      const { data: { user } } = await supabase.auth.getUser();
      
      // Si no hay usuario, lo mandamos al login
      if (!user) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Login;
