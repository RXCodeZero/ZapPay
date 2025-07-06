import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [addAmount, setAddAmount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [toUser, setToUser] = useState("");
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    const loadData = async () => {
    try {
        const balRes = await API.get("/balance");
        const txnRes = await API.get("/transactions");
        setBalance(balRes.data.balance);
        setTransactions(txnRes.data);
    } catch {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
    }
    };

    useEffect(() => {
    loadData();
    }, []);

    const addFunds = async () => {
    if (!addAmount || isNaN(addAmount) || Number(addAmount) <= 0) {
        alert("Enter a valid amount to add.");
        return;
    }
    await API.post("/add-funds", { amount: Number(addAmount) });
    setAddAmount("");
    loadData();
    };

    const transfer = async () => {
    if (!toUser || !transferAmount || isNaN(transferAmount) || Number(transferAmount) <= 0) {
        alert("Enter a valid username and amount to transfer.");
        return;
    }

    try {
        await API.post("/transfer", { toUsername: toUser, amount: Number(transferAmount) });
        setTransferAmount("");
        setToUser("");
        loadData();
    } catch (err) {
        alert(err.response?.data?.msg || "Transfer failed.");
    }
    };

    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    };

    return (
    <div style={styles.container}>
        <div style={styles.wrapper}>
        <div style={styles.header}>
            <h2>ZapPay Dashboard</h2>
            <button onClick={logout} style={styles.logoutBtn}>Log Out</button>
        </div>

        <div style={styles.main}>
            <div style={styles.column}>
            <h3>Balance: ₹{balance}</h3>

            <div style={styles.section}>
                <h4>Add Funds</h4>
                <input
                style={styles.input}
                placeholder="Amount"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                />
                <button style={styles.primaryBtn} onClick={addFunds}>Add</button>
            </div>

            <div style={styles.section}>
                <h4>Send Money</h4>
                <input
                style={styles.input}
                placeholder="Recipient Username"
                value={toUser}
                onChange={(e) => setToUser(e.target.value)}
                />
                <input
                style={styles.input}
                placeholder="Amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                />
                <button style={styles.secondaryBtn} onClick={transfer}>Transfer</button>
            </div>
            </div>

            <div style={styles.transactions}>
            <h4>Recent Transactions</h4>
            <ul style={styles.txnList}>
                {transactions.map((t) => (
                <li key={t._id} style={styles.txnItem}>
                    <b>[{t.type}] ₹{t.amount}</b><br />
                    <span style={styles.txnTime}>{new Date(t.time).toLocaleString()}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    </div>
    );
}

const styles = {
    container: {
    height: "100vh",
    background: "linear-gradient(to right, #0f766e, #6ee7b7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    },
    wrapper: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "900px",
    boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
    },
    header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    },
    logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    },
    main: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    },
    column: {
    flex: 1,
    minWidth: "250px",
    },
    transactions: {
    flex: 1.2,
    minWidth: "300px",
    maxHeight: "350px",
    overflowY: "auto",
    background: "#f9fafb",
    padding: "1rem",
    borderRadius: "8px",
    },
    section: {
    marginTop: "1.5rem",
    },
    input: {
    width: "100%",
    padding: "0.5rem",
    margin: "0.4rem 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    },
    primaryBtn: {
    width: "100%",
    padding: "0.6rem",
    backgroundColor: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    },
    secondaryBtn: {
    width: "100%",
    padding: "0.6rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    },
    txnList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    },
    txnItem: {
    background: "#e5e7eb",
    padding: "0.7rem",
    borderRadius: "6px",
    marginBottom: "0.7rem",
    fontSize: "0.9rem",
    },
    txnTime: {
    fontSize: "0.75rem",
    color: "#6b7280",
    },
};
