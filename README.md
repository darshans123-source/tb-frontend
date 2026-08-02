# TB Quest – Gamified AI Tuberculosis Diagnostic Platform

> **Institutional Project**: Skill Development Center, NIT Raichur  
> **Center**: Skill Development Center  

---

## 🌟 Overview
**TB Quest** is a professional full-stack, AI-powered gamified learning platform engineered to train medical students and healthcare practitioners on national tuberculosis (NTEP / WHO / CDC) diagnostic algorithms. Through interactive patient simulations, rapid molecular test interpretation (CBNAAT / Xpert MTB/RIF), pediatric scoring calculators, and an AI clinical mentor, students master complex clinical pathways.

---

## 🏗️ Architecture Breakdown

```
tb-quest/
├── frontend/             # React 19 + Vite + TailwindCSS v4 + MUI v9 Single-Page App
│   ├── src/
│   │   ├── api/          # Centralized API fetch client with backend proxy
│   │   ├── components/   # UI components (AITutor, CaseEngine, Flowcharts, etc.)
│   │   ├── context/      # React Context providers (ThemeContext)
│   │   ├── data/         # Clinical datasets & CDC algorithm node definitions
│   │   ├── layouts/      # Dashboard and navigation layouts
│   │   ├── pages/        # Login and Profile view pages
│   │   ├── services/     # Frontend services (AI, Audio, Voice, Supabase)
│   │   ├── styles/       # Tailwind & custom CSS variables
│   │   ├── types/        # Domain type definitions
│   │   └── utils/        # Medical term glossary and helpers
│   ├── index.html        # HTML5 entry point
│   ├── vite.config.ts    # Vite configuration with API proxy (/api -> http://localhost:3000)
│   └── package.json
│
├── backend/              # Node.js + Express + TypeScript Modular Backend
│   ├── src/
│   │   ├── config/       # Centralized environment configuration
│   │   ├── controllers/  # Auth, User, AI, and Health controllers
│   │   ├── middleware/   # JWT Authentication, Request Logger, Error Handler
│   │   ├── routes/       # Express REST API routes
│   │   ├── services/     # User service (in-memory DB) and Gemini AI service
│   │   ├── types/        # Backend TypeScript interfaces
│   │   ├── utils/        # PBKDF2 password hashing & HMAC JWT tokens
│   │   ├── app.ts        # Express application setup & middleware stack
│   │   └── server.ts     # HTTP Server entry point (port 3000)
│   ├── tsconfig.json
│   └── package.json
│
├── docs/
│   └── architecture.md   # Architectural documentation
├── package.json          # Monorepo root scripts
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation
```bash
# Install root dependencies and package dependencies
npm run install:all
```

### Development Mode
Launch both frontend (Vite dev server) and backend (Express API server) concurrently:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000/api`

### Production Build
```bash
npm run build
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| **Student** | `student@navodaya.edu.in` | `student123` |
| **Faculty** | `faculty@navodaya.edu.in` | `faculty123` |
| **Admin** | `admin@navodaya.edu.in` | `admin123` |

---

## 📜 License
MIT License. Developed for educational research at Skill Development Center, NIT Raichur.
