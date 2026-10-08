# The Grandview Hotel & Resort

Next.js marketing site + admin dashboard, with Express API, MongoDB, and Cloudinary (Phase 3).

## Stack

- **Web:** Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Query
- **API:** Express (`server/`), MongoDB (Mongoose), Cloudinary uploads, JWT auth
- **Design:** `DESIGN.md` (forest green, gold, ivory)

## Setup

### 1. Environment

```bash
cp .env.example .env.local
```

Edit **one file**: `.env.local` — it has all Next + API + Mongo + Cloudinary vars.
The Express server loads `.env.local` automatically (`server/.env` can override).

### 2. Install

```bash
npm install
npm install --prefix server
```

### 3. Database seed

MongoDB must be running locally (or use Atlas URI).

```bash
npm run seed
```

### 4. Run

```bash
# Terminal 1 — API
npm run dev:api

# Terminal 2 — Next.js
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login (`admin` / `grandview`)  
- API health: http://localhost:4000/api/health  

## Phase roadmap

1. Frontend — marketing site + booking UI  
2. Admin dashboard — rooms, offers, services, reviews  
3. **Backend (current)** — MongoDB + Cloudinary + Express + TanStack Query  

## API overview

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/login` | — |
| GET | `/api/rooms` (offers, services, reviews) | public |
| POST/PATCH/DELETE | `/api/:resource` | Bearer JWT |
| POST | `/api/upload` | Bearer JWT + Cloudinary |
| POST | `/api/seed/reset` | Bearer JWT |
