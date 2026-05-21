# SoulSync Backend

> AI-Powered Mental Health Support API

SoulSync Backend is a Node.js/Express REST API that powers the SoulSync mental health web application. It handles authentication, AI therapy chat sessions, mood tracking, crisis detection, and activity logging using MongoDB and Groq's LLaMA-3.3-70b model.

## Features

- 🔐 **JWT Authentication** — Secure register and login with bcrypt password hashing
- 🤖 **AI Chat Sessions** — Multi-turn therapy conversations using Groq LLaMA-3.3-70b with WHO/AFSP safe messaging system prompt
- 📊 **Mood Tracking** — Save and retrieve mood scores with timestamps
- 🚨 **Crisis Analysis** — LLM-based severity scoring (0–10) for high-risk messages
- 📈 **End-of-Session Analysis** — Full transcript mood analysis returning emotionalState, themes, riskLevel, moodScore
- 🎯 **Activity Logging** — Track yoga, breathing, games, and meditation activities
- 📝 **Winston Logging** — Structured logging to combined.log and error.log
- ⚡ **Inngest** — Event-driven background functions

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **AI Model:** Groq SDK — LLaMA-3.3-70b-versatile
- **Authentication:** JWT + bcrypt
- **Logging:** Winston
- **Background Jobs:** Inngest

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key

### Installation

```bash
git clone https://github.com/Joannadsza/soulsync-backend.git
cd soulsync-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/auth/me` | Get current user |

### Chat
| Method | Endpoint | Description |
|---|---|---|
| GET | `/chat/sessions` | Get all sessions for user |
| POST | `/chat/sessions` | Create new session |
| DELETE | `/chat/sessions/:sessionId` | Delete a session |
| GET | `/chat/sessions/:sessionId/history` | Get session messages |
| POST | `/chat/sessions/:sessionId/messages` | Send a message |
| POST | `/chat/sessions/:sessionId/analyse` | End-of-session mood analysis |
| POST | `/chat/crisis-analysis` | Crisis severity scoring |

### Mood
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/mood` | Get mood entries |
| POST | `/api/mood` | Save mood entry |

### Activity
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activity` | Get activity logs |
| POST | `/api/activity` | Log new activity |

## Project Structure
