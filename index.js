const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const auth = require("./middlewares/auth");

const app = express();
const PORT = 3001;
const JWT_SECRET = "secret123";
const MONGO_URI = "YourMongoDBLink";

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    balance: { type: Number, default: 0 },
});

const txnSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    type: { type: String },
    amount: Number,
    time: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);
const Transaction = mongoose.model("transactions", txnSchema);

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (await User.findOne({ username })) {
            return res.status(400).json({ msg: "User already exists" });
        }
        await User.create({ username, password });
        res.json({ msg: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err); 
        res.status(500).json({ msg: "Server error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
    } catch (err) {
    res.status(500).json({ msg: "Server error" });
    }
});

app.get("/balance", auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
});

app.post("/add-funds", auth, async (req, res) => {
    const { amount } = req.body;

    if (amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

    const user = await User.findById(req.user.id);
    user.balance += amount;
    await user.save();

    await Transaction.create({ userId: user._id, type: "Add", amount });
    res.json({ balance: user.balance });
});

app.post("/transfer", auth, async (req, res) => {
    const { toUsername, amount } = req.body;

    if (amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

    const fromUser = await User.findById(req.user.id);
    const toUser = await User.findOne({ username: toUsername });

    if (!toUser) return res.status(404).json({ msg: "Recipient not found" });
    if (fromUser.balance < amount) return res.status(400).json({ msg: "Insufficient balance" });

    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save();
    await toUser.save();

    await Transaction.create({ userId: fromUser._id, type: "Send", amount });
    await Transaction.create({ userId: toUser._id, type: "Receive", amount });

    res.json({ msg: "Transfer successful" });
});

app.get("/transactions", auth, async (req, res) => {
    const txns = await Transaction.find({ userId: req.user.id }).sort({ time: -1 });
    res.json(txns);
});
