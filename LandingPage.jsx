import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
    <div style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #1f4037, #99f2c8)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Segoe UI, sans-serif",
        color: "white",
    }}>
        <header style={{
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid rgba(255,255,255,0.2)",
        }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ZapPay</h1>
        <nav>
            <button
            onClick={() => navigate("/login")}
            style={{
                marginRight: "20px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#1f4037",
                fontWeight: "bold",
                cursor: "pointer"
            }}
            >
            Log In
            </button>
            <button
            onClick={() => navigate("/signup")}
            style={{
                padding: "10px 20px",
                border: "2px solid white",
                borderRadius: "6px",
                backgroundColor: "transparent",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
            }}
            >
            Sign Up
            </button>
        </nav>
        </header>

        <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        textAlign: "center",
        }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "20px" }}>
            Experience Seamless Digital Payments
        </h2>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", marginBottom: "40px" }}>
            Fast. Secure. Reliable. Send and receive money with ease using ZapPay — your personal digital wallet.
        </p>
        <div>
            <button
            onClick={() => navigate("/signup")}
            style={{
                padding: "15px 30px",
                fontSize: "1.1rem",
                backgroundColor: "white",
                color: "#1f4037",
                border: "none",
                borderRadius: "8px",
                marginRight: "20px",
                fontWeight: "bold",
                cursor: "pointer"
            }}
            >
            Get Started
            </button>
            <button
            onClick={() => navigate("/login")}
            style={{
                padding: "15px 30px",
                fontSize: "1.1rem",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
            }}
            >
            I Already Have an Account
            </button>
        </div>
        </main>

        <footer style={{
        textAlign: "center",
        padding: "20px",
        borderTop: "2px solid rgba(255,255,255,0.2)",
        fontSize: "0.9rem",
        opacity: 0.7,
        }}>
        &copy; {new Date().getFullYear()} Pay™. All rights reserved.
        </footer>
    </div>
    );
}
