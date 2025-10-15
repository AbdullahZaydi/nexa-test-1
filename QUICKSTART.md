# 🚀 Quick Start Guide

> **Note**: This project is built with **TypeScript** for maximum type safety and production-grade code quality.

## Start the Application

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm start

# OR use dev mode with auto-reload
npm run dev
```

Server will be running at:
- **Main Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

## Test It Out

### 1. Submit Tasks via Web Interface
1. Open http://localhost:3000
2. Enter a task description
3. Select task type
4. Click "Submit Task"
5. View results on the dashboard

### 2. Test via API (curl)

```bash
# Submit a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description": "Analyze leads from Q4 2024", "type": "analyze_leads"}'

# Check statistics
curl http://localhost:3000/api/stats

# View all tasks
curl http://localhost:3000/api/tasks

# Check queue status
curl http://localhost:3000/api/queue/status
```

## What to Expect

✅ **TypeScript Compilation**: Code compiles to JavaScript in `dist/`  
✅ **Task Submission**: Instant confirmation with task ID  
✅ **Queue Processing**: Tasks processed in order (FIFO)  
✅ **Processing Time**: Random 2-5 second delay per task  
✅ **AI Responses**: Type-safe, contextual responses based on task type  
✅ **Real-time Updates**: Dashboard auto-refreshes every 2 seconds  
✅ **Persistence**: All tasks saved to `store/tasks.json`

## Example Tasks to Try

```
"Analyze leads from last quarter"
"Summarize client calls this week"
"Update Q4 client report"
"Review sales performance metrics"
"Prepare monthly business review"
```

## Features Demo

1. **Queue System**: Submit 3-4 tasks quickly and watch them process one by one
2. **Real-time Dashboard**: Keep dashboard open while submitting tasks
3. **AI Intelligence**: Try different task types to see varied responses
4. **Data Persistence**: Check `store/tasks.json` after processing

## Architecture Highlights

- ✅ **TypeScript with strict type checking** (zero `any` types)
- ✅ **Comprehensive interfaces** (ITask, IAIResponse, etc.)
- ✅ **Modular code structure** (services, models, routes)
- ✅ **In-memory queue** with event-driven architecture
- ✅ **Async AI simulator** with background processing
- ✅ **JSON file storage** for persistence
- ✅ **Modern UI** with real-time updates
- ✅ **RESTful API** with proper error handling
- ✅ **Type-safe enum constants** (TaskStatus, TaskType)

---

## 📘 TypeScript Implementation

This project is written in **strict TypeScript** with:

**Type Definitions** (`src/types/index.ts`):
- All interfaces: ITask, IAIResponse, ITaskStats, etc.
- Type-safe enums: TaskStatus, TaskType
- Generic API response types

**Source Files** (`.ts`):
- `src/server.ts` - Main server
- `src/services/*.ts` - Business logic
- `src/models/*.ts` - Data models
- `src/routes/*.ts` - API routes

**Compilation**:
- Source: TypeScript in `src/`
- Compiled: JavaScript in `dist/`
- Runtime: Node.js executes compiled `.js` files

For detailed TypeScript documentation, see `TYPESCRIPT.md`

---

**Ready for production with type-safe, enterprise-grade code!** 🚀