# Smart API Gateway + Event Log Dashboard

A full-stack portfolio project demonstrating middleware and application engineering skills — built with Java Spring Boot, MongoDB, and React.

 **Live Demo:** https://smart-api-gateway.vercel.app

> **Note:** The backend runs on Render's free tier and may take 30-60 seconds to wake up on first request.

---

## What it demonstrates

- **JWT authentication middleware** — Spring `OncePerRequestFilter` validates every request before it reaches any controller
- **Request/response audit logging** — every gateway request is automatically persisted to MongoDB
- **MongoDB aggregation pipeline** — real-time stats (total requests, error rate, avg latency, top routes)
- **TTL index** — gateway events auto-expire after 7 days at the database level
- **Server-Sent Events (SSE)** — live event stream pushed from Spring Boot to the React dashboard
- **Reverse proxy routing** — Nginx proxies `/api` calls to Spring Boot in the Docker stack
- **Multi-stage Docker builds** — Alpine-based images (backend ~120MB, frontend ~15MB)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | Java 17, Spring Boot 4, Spring Security |
| Database | MongoDB 7 (Atlas), Spring Data MongoDB |
| Auth | JWT (JJWT 0.12.6), filter chain |
| Frontend | React 18, Vite, Tailwind CSS, Recharts |
| Serving | Nginx Alpine (reverse proxy + SPA) |
| Dev | Docker Compose, multi-stage builds |
| Cloud | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## Architecture