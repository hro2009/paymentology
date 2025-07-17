# Task Checklist Backend API

A simple Express.js backend API for managing task checklists with in-memory storage.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start with Docker
docker-compose up -d
```

Server runs on `http://localhost:5001`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle status
- `GET /api/tasks/search?q=term` - Search tasks

## Example Usage

```bash
# Create task
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Check logs","description":"Investigate API failures"}'

# List tasks
curl http://localhost:5001/api/tasks

# Search tasks
curl "http://localhost:5001/api/tasks/search?q=api"
```

## Features

- ✅ Task CRUD operations
- ✅ Status toggle (To Do ↔ Done)
- ✅ Search by title
- ✅ Zod validation
- ✅ TypeScript
- ✅ Docker support

## Data Model

```json
{
  "id": "1",
  "title": "Check API logs",
  "description": "Investigate failures",
  "status": "To Do",
  "createdAt": "2025-07-17T18:44:52.243Z",
  "updatedAt": "2025-07-17T18:44:52.243Z"
}
```

## Docker

```bash
# Build and run
docker-compose up -d

# Stop
docker-compose down
```

## Notes

- In-memory storage (data resets on restart)
- CORS enabled for frontend
- No authentication (dev only) 