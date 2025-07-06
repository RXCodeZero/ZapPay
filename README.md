# ZapPay 💸

A minimal Paytm-style money transfer web application built with **MERN** stack + **JWT Authentication**.

---

## 📁 Project Structure

```
ZapPay
├── backend
│   └── index.js
│   └── middlewares
│       └── auth.js
├── frontend
│   └── public
│   └── src
│       ├── components
│       │   ├── LandingPage.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── Dashboard.jsx
│       ├── api.js
│       └── App.js
├── package.json
└── README.md
```

---

## 🔧 Tech Stack

* **Frontend**: React.js, Axios, React Router DOM
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Authentication**: JSON Web Tokens (JWT)

---

## 🚀 Features

* User Signup/Login with JWT Auth
* View Account Balance
* Add Funds to Account
* Transfer Funds to Other Users
* View Transaction History

---

## 🖼️ Screenshots

**Landing Page**

> A clean introduction with login/signup navigation

![image](https://github.com/user-attachments/assets/55b6fa1f-97b9-451d-b161-4df2f65e793f)


**Login/Signup Page**

> Styled input forms with transitions and redirects

![image](https://github.com/user-attachments/assets/96937d5b-b039-44a5-b2e6-3dac13dcc013)

![image](https://github.com/user-attachments/assets/57d1ccbf-545b-49a9-8f7f-c25182c9b7b9)


**Dashboard**

> View balance, add funds, transfer money and view past transactions

![image](https://github.com/user-attachments/assets/374a7b63-7ae5-4ea2-90ef-df35ddee8054)

---

## ⚙️ Getting Started

### Backend Setup

```bash
cd backend
npm install
node index.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Make sure to add your MongoDB URI and JWT secret in the backend `index.js`.

---

## 📄 API Endpoints

### Auth Routes

* `POST /signup` – Register a new user
* `POST /login` – Login and receive a token

### Protected Routes *(requires Bearer Token)*

* `GET /balance` – Fetch user balance
* `POST /add-funds` – Add money to your wallet
* `POST /transfer` – Transfer money to another user
* `GET /transactions` – View transaction history

---

## 📚 License

This project is open source and free to use.

---

## ✍️ Author

Built with ❤️ by [Abhay VB](https://github.com/abhayvb)
