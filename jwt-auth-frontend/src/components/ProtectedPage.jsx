import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function ProtectedPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // redirect if no token
      return;
    }

    fetch(`${API}/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Protected Route</h2>
      <p>{message}</p>
      <button onClick={logout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
}

export default ProtectedPage;
