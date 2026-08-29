# Next.js + Express TypeScript Full-Stack Project

This project contains a decoupled full-stack architecture with a **Next.js (TypeScript)** frontend and an **Express (TypeScript)** backend organized into distinct folders.

---

## 📁 Directory Structure

```
.
├── frontend/                 # Next.js 15 (App Router) + TypeScript
│   ├── src/
│   │   ├── app/              # Layouts, pages, styles
│   │   └── lib/              # API client and TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.mjs
│
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/           # Express router endpoints
│   │   └── server.ts         # Express entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── package.json              # Root script runner (concurrently)
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies

Install root, frontend, and backend dependencies:

```bash
npm run install:all
```

Or install individually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Run in Development Mode

Run both the frontend and backend servers together with live reload:

```bash
npm run dev
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **Backend Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Running Separately:

- **Run only frontend:** `npm run dev:frontend`
- **Run only backend:** `npm run dev:backend`

---

## 🛠️ Build for Production

Build both applications:
```bash
npm run build
```

Or individually:
- **Build backend:** `npm run build:backend`
- **Build frontend:** `npm run build:frontend`

---

## ⚙️ Environment Configuration

- **Frontend:** Configured in `frontend/.env.local` (`NEXT_PUBLIC_API_URL=http://localhost:5000/api`)
- **Backend:** Configured in `backend/.env` (`PORT=5000`, `FRONTEND_URL=http://localhost:3000`)
