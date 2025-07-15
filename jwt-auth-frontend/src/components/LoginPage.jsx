import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const res = await fetch(`${VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
  };

  const login = async () => {
    const res = await fetch(`${VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/protected");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome</h2>
        <p style={styles.subheading}>Login or Register to Continue</p>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button onClick={register} style={{ ...styles.button, background: "#6c63ff" }}>
            Register
          </button>
          <button onClick={login} style={{ ...styles.button, background: "#00b894" }}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #dfe9f3, #ffffff)",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem 3rem",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    marginBottom: "0.2rem",
    fontSize: "1.8rem",
    color: "#2d3436",
  },
  subheading: {
    marginBottom: "1.5rem",
    color: "#636e72",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    margin: "0.5rem 0",
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "0.3s",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  button: {
    flex: 1,
    padding: "0.75rem",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "0 0.5rem",
    transition: "background 0.3s ease",
  },
};

export default LoginPage;
