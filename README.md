# Nexa AI Assistant Module

A minimal yet functional AI assistant module built with **TypeScript** that simulates intelligent task processing with an in-memory queue system, async processing, and real-time dashboard updates. Features strict type checking, comprehensive interfaces, and production-ready architecture.

## 🚀 Features

- **TypeScript Implementation**: 100% strict TypeScript with comprehensive interfaces
- **Task Submission**: Submit business tasks through a clean web interface
- **In-Memory Queue**: FIFO queue system for task management
- **AI Simulator**: Async worker that processes tasks with 2-5 second delays
- **Persistent Storage**: JSON file-based storage for task history
- **Real-Time Dashboard**: Live updates showing queued, processing, and completed tasks
- **Smart Responses**: Context-aware AI responses based on task types
- **Modern UI**: Beautiful, responsive interface with gradient backgrounds
- **Type Safety**: Zero `any` types, strict null checks, comprehensive error handling

## 📁 Project Structure

```
nexa-test-1/
├── src/
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces & types
│   ├── config/
│   │   └── constants.ts           # Configuration constants
│   ├── models/
│   │   └── Task.ts                # Task model with type safety
│   ├── services/
│   │   ├── storageService.ts      # JSON file operations
│   │   ├── queueService.ts        # In-memory queue management
│   │   └── aiSimulator.ts         # AI processing simulator
│   ├── routes/
│   │   └── taskRoutes.ts          # API endpoints
│   └── server.ts                  # Express server & app entry
├── dist/                          # Compiled JavaScript (auto-generated)
├── public/
│   ├── css/
│   │   └── styles.css             # Modern styling
│   └── js/
│       ├── main.js                # Task submission logic
│       └── dashboard.js           # Dashboard real-time updates
├── views/
│   ├── index.ejs                  # Main task submission page
│   └── dashboard.ejs              # Dashboard page
├── store/
│   └── tasks.json                 # Task storage (auto-created)
├── tsconfig.json                  # TypeScript configuration
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Language**: TypeScript (Strict Mode)
- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla JavaScript + EJS templating
- **Storage**: JSON file system
- **Queue**: In-memory event-driven queue
- **Styling**: Custom CSS with modern gradients
- **Type Safety**: Comprehensive interfaces and type definitions

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd nexa-test-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the TypeScript code**
   ```bash
   npm run build
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload and TypeScript compilation:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Main Page: [http://localhost:3000](http://localhost:3000)
   - Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 🎯 Usage

### Submitting Tasks

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Enter your task description (e.g., "Analyze leads from Q4")
3. Select the task type from the dropdown
4. Click "Submit Task"
5. View real-time progress on the dashboard

### Task Types

- **General Task**: Default processing
- **Analyze Leads**: Lead analysis with conversion metrics
- **Summarize Calls**: Call summary with sentiment analysis
- **Update Client Report**: Report generation with key metrics

### Monitoring Progress

Visit the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to see:
- Live statistics (total, queued, processing, completed)
- Tasks currently in queue
- Tasks being processed (with elapsed time)
- Completed tasks with AI-generated responses

The dashboard auto-refreshes every 2 seconds for real-time updates.

## 🏗️ Architecture

### Flow Diagram
```
User → Submit Task → Queue Service → AI Simulator → Storage Service
                          ↓              ↓              ↓
                    In-Memory Queue  Processing   JSON Storage
                                        (2-5s)
```

### Core Components

#### 1. Queue Service (`queueService.ts`)
- Manages in-memory FIFO queue with strict typing
- Event-driven architecture with EventEmitter
- Provides type-safe enqueue/dequeue operations

#### 2. AI Simulator (`aiSimulator.ts`)
- Continuously polls the queue
- Processes tasks asynchronously
- Random processing time (2-5 seconds)
- Generates contextual, type-safe responses

#### 3. Storage Service (`storageService.ts`)
- Handles JSON file read/write operations with types
- Auto-creates storage file if missing
- Updates task status throughout lifecycle

#### 4. Task Model (`Task.ts`)
- Implements ITask interface
- Tracks status transitions (pending → processing → completed)
- Stores timestamps and processing metrics with type safety

## 🔌 API Endpoints

### POST `/api/tasks`
Submit a new task
```json
{
  "description": "Analyze leads from last quarter",
  "type": "analyze_leads"
}
```

### GET `/api/tasks`
Retrieve all tasks

### GET `/api/tasks/:id`
Get specific task by ID

### GET `/api/queue/status`
Get current queue status

### GET `/api/stats`
Get task statistics

## 🎨 UI Features

- **Gradient Background**: Modern purple gradient design
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Animations**: Smooth transitions and pulse effects
- **Responsive Design**: Mobile-friendly layout
- **Real-time Updates**: Live dashboard without page refresh
- **Status Indicators**: Color-coded task statuses

## 🧪 Testing

### Manual Testing Steps

1. **Submit multiple tasks** to see queue behavior
2. **Monitor the dashboard** to see real-time processing
3. **Check tasks.json** file to verify persistence
4. **Test different task types** to see varied AI responses
5. **Submit concurrent tasks** to test queue handling

### Example Tasks to Try
- "Analyze leads from last quarter"
- "Summarize all client calls this week"
- "Update the Q4 client report"
- "Review sales performance metrics"

## 📊 Task Lifecycle

```
1. PENDING    → Task submitted, waiting in queue
2. PROCESSING → AI Simulator picked up the task
3. COMPLETED  → Task processed with AI response
4. FAILED     → Error occurred during processing
```

## 🔄 Async Processing

The AI Simulator runs as a background worker:
- Continuously checks the queue every 500ms
- Processes one task at a time
- Random delay between 2-5 seconds per task
- Updates task status in real-time
- Generates intelligent, context-aware responses

## 🌟 Highlights

### TypeScript Excellence
- **Strict Mode**: No implicit `any`, full type safety
- **Comprehensive Interfaces**: ITask, IAIResponse, ITaskStats, etc.
- **Type-Safe Enums**: TaskStatus, TaskType
- **Null Safety**: Explicit null handling throughout
- **Zero Compilation Errors**: Production-ready code

### Modular Architecture
Clean separation of concerns with distinct layers:
- Types (interfaces & enums)
- Models (data structure with type implementation)
- Services (type-safe business logic)
- Routes (typed API endpoints)
- Views (presentation)

### Event-Driven Queue
Uses Node.js EventEmitter for reactive queue operations with typed events

### Smart AI Responses
Context-aware, type-safe response generation:
- Lead analysis includes conversion rates and recommendations
- Call summaries include sentiment analysis
- Reports include metrics and next steps
- All responses conform to strict interfaces

### Production-Ready Patterns
- TypeScript strict mode enabled
- Comprehensive error handling with typed errors
- Graceful shutdown handling
- Auto-recovery for missing files
- Input validation with type guards

## 📝 Configuration

Edit `src/config/constants.ts` to customize:
- Task statuses
- Task types
- Storage path
- Processing time range

## 🚦 Status Codes

- `201` - Task created successfully
- `400` - Bad request (invalid input)
- `404` - Task not found
- `500` - Server error

## 🛡️ Error Handling

- Validates task descriptions
- Handles missing storage files
- Catches processing errors
- Returns user-friendly error messages

## 📈 Future Enhancements

Potential improvements for production:
- WebSocket for true real-time updates
- Redis for distributed queue
- PostgreSQL/MongoDB for scalable storage
- Worker pools for parallel processing
- Authentication & authorization
- Rate limiting
- Task prioritization
- Scheduled tasks

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Watch mode - recompile on changes
npm run watch

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📘 TypeScript Features

### Strict Type Checking
- All files use strict TypeScript with comprehensive type safety
- No implicit `any` types allowed
- Strict null checks enabled

### Comprehensive Interfaces
- `ITask` - Complete task structure
- `IAIResponse` - AI response format
- `ITaskStats` - Statistics structure
- `IQueueStatus` - Queue state
- Type-safe API responses

### Enums for Constants
```typescript
enum TaskStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

enum TaskType {
  ANALYZE_LEADS = 'analyze_leads',
  SUMMARIZE_CALLS = 'summarize_calls',
  UPDATE_REPORT = 'update_client_report',
  GENERAL = 'general'
}
```

## 📄 License

ISC

---

**Built for Nexa Technical Assessment**

*A demonstration of TypeScript excellence, clean architecture, async processing, and modern web development practices with strict type safety.*

