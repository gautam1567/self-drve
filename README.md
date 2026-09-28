# SELF DRVE

A full-stack-ready web project for self-drive car and bike rentals.

## Included in this version
- Responsive modern marketplace UI
- Search by location, vehicle type, dates
- Vehicle cards and detail modal
- Map-style vehicle discovery using Leaflet + OpenStreetMap
- User login/register demo UI
- Dealer dashboard demo
- List-your-vehicle form
- Enquiry and booking demo flows
- LocalStorage persistence for demo data
- No API key required for the included map

## Setup

### Option A — easiest
Open `frontend/index.html` directly in a browser.

### Option B — recommended
From the project root:

```bash
cd frontend
python -m http.server 5500
```

Open:
http://localhost:5500

### Backend
A starter Node/Express backend is included in `backend/`.

```bash
cd backend
npm install
npm run dev
```

The starter API runs on:
http://localhost:5000

The frontend currently works independently with demo/localStorage data, so MongoDB is not required to preview the project.

## Backend environment
Copy `.env.example` to `.env`.

For future MongoDB integration:

MONGODB_URI=mongodb://127.0.0.1:27017/selfdrve
PORT=5000
JWT_SECRET=change_this_secret

## Main folders
frontend/  - complete browser UI
backend/   - Node.js/Express starter API
docs/      - setup and feature guide

## Next production steps
1. Connect MongoDB models.
2. Add JWT authentication.
3. Replace demo booking/enquiry storage with API calls.
4. Add Cloudinary image uploads.
5. Add payment gateway.
6. Add production map/geocoding provider if required.
7. Add owner verification and document verification.
