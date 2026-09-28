# SELF DRVE — Setup Guide

## Requirements
- Windows 10/11
- VS Code
- Modern browser
- Node.js 18+ recommended
- npm

## 1. Open the project
Extract the ZIP and open `SELF-DRVE` in VS Code.

## 2. Run frontend
Recommended:

```bash
cd frontend
python -m http.server 5500
```

Visit `http://localhost:5500`.

If Python is unavailable, install the VS Code Live Server extension and open `frontend/index.html` with Live Server.

## 3. Run backend
Open another terminal:

```bash
cd backend
npm install
npm run dev
```

The API health endpoint is:

`http://localhost:5000/api/health`

## 4. Map
The project uses Leaflet with OpenStreetMap tiles in the browser. Internet access is required for map tiles.

## 5. Demo accounts
The UI does not require a real account. Login/Register is a frontend demo and stores basic state in browser localStorage.

## 6. Important
This is a functional portfolio/demo foundation, not a production rental marketplace. Before accepting real bookings or payments, implement server-side authentication, database validation, owner verification, booking locking, payment processing, cancellation/refund rules, privacy/security controls, and legal terms.
