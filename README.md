# Personal Finance Tracker V2

A simple web-based Personal Finance Tracker with User and Admin roles. 
---

## Features

### User Role
- **Sign Up**: Users can register with a username and password.
- **Sign In**: Users can log in with their credentials.
- **Add Transactions**: Users can add transactions including description, amount, and type (income/expense).
- **View Transactions**: Users can view a list of their own transactions with details (date, description, type, amount).
- **Delete Transactions**: Users can delete their own transactions.
- **Logout**: Users can securely log out.

### Admin Role
- **Admin Login**: Admin can log in with a default username and password (`admin` / `admin`).
- **View Users**: Admin can see a list of all registered users (except the default admin user).
- **View User Transactions**: Admin can view transactions for any user.
- **Delete Users**: Admin can delete any user except the default admin user; deleting a user also deletes all their transactions.
- **Logout**: Admin can securely log out.

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Axios
- **Backend**: Node.js (Express), MySQL (mysql2 package)
- **Communication**: REST API via Axios
- **Tunnel (optional)**: Ngrok for exposing local server publicly
