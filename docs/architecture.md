# TB Quest System Architecture & API Design

## Overview
TB Quest is structured as a full-stack monorepo featuring a decoupled frontend (React 19 + Vite) and backend (Express + TypeScript).

## Data Flow & Proxy Configuration
```
[ Browser / Frontend Client ]
        │
        ├── Static UI Rendering (React 19, Tailwind v4, MUI v9)
        │
        └── HTTP Requests to `/api/*`
                │
                ▼ (Vite Proxy: http://localhost:3000)
[ Express Backend Server ]
        │
        ├── Request Logging & Error Handler Middleware
        ├── JWT Token Authentication (HMAC SHA256)
        ├── User Management & In-Memory Pre-seeded DB
        └── Gemini 2.5 Flash AI Service (with NTEP Rule-Based Fallbacks)
```

## API Endpoints Reference

### Health
- `GET /api/health` — API status check.

### Authentication
- `POST /api/auth/login` — Authenticate user and issue JWT payload.
- `GET /api/auth/me` — Retrieve currently authenticated user profile.

### User Management
- `GET /api/users` — Faculty/Admin user listing.
- `GET /api/users/profile` — Fetch student progress & gamification metrics.

### AI Clinical Tutor
- `POST /api/ai/ask` — Query Gemini 2.5 Flash AI mentor or NTEP fallbacks.

## Authentication & Security
- **Passwords**: Hashed via standard Crypto PBKDF2 SHA256 with random salt.
- **Session**: Stateful JWT bearer tokens stored in HTTP headers or browser state.
