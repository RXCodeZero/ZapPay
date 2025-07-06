import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
    try {
        const route = isSignup ? "/signup" : "/login";
        const res = await API.post(route, { username, password });

        if (!isSignup) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        } else {
        alert("Signup successful. Please log in.");
        setIsSignup(false);
        }
    } catch (err) {
        alert(err.response?.data?.msg || "Something went wrong");
    }
    };

    return (
    <div className="auth-wrapper">
        <div className="auth-box">
        <h1>Pay<sup>™</sup></h1>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
            {isSignup ? "Sign Up" : "Log In"}
        </button>

        <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Log In" : "Sign Up"}
            </span>
        </p>
        </div>
    </div>
    );
}
