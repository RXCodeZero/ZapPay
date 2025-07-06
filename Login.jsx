import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
    try {
        const res = await API.post("/login", { username, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
    } catch (err) {
        alert("Login failed. Please check your credentials.");
    }
    };

    return (
    <div style={styles.container}>
        <div style={styles.card}>
        <h2>Log In to ZapPay</h2>
        <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>Log In</button>
        <p style={styles.link}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} style={styles.span}>
            Sign Up
            </span>
        </p>
        </div>
    </div>
    );
}

const styles = {
    container: {
    height: "100vh",
    background: "linear-gradient(to right, #0f766e, #6ee7b7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    },
    card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    },
    input: {
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    },
    button: {
    width: "100%",
    padding: "0.6rem",
    marginTop: "0.5rem",
    backgroundColor: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    },
    link: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    },
    span: {
    color: "#0f766e",
    cursor: "pointer",
    textDecoration: "underline",
    },
};
