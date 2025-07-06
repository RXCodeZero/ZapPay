import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
    try {
        await API.post("/signup", { username, password });
        navigate("/login");
    } catch (err) {
        alert("Signup failed.");
    }
    };

    return (
    <div style={styles.container}>
        <div style={styles.card}>
        <h2>Create a ZapPay Account</h2>
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
        <button style={styles.button} onClick={handleSignup}>Sign Up</button>
        <p style={styles.link}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={styles.span}>
            Log In
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
