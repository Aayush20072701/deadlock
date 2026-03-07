# ⚔️ Deadlock — Real-Time Competitive Coding Platform

## Stack
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion + Monaco Editor
- **Backend**: Node.js + Express + Socket.io
- **Database**: MongoDB + Mongoose
- **Cache / Real-time State**: Redis (Upstash)
- **Code Execution**: Piston API (free, no key needed)
- **AI Review**: Google Gemini API

## Quick Start

### 1. Extract and open project
```
cd Deadlock_Claude
```

### 2. Setup Server
```
cd server
copy .env.example .env        # Windows
# Fill in .env with your keys
npm install
node seed.js                  # Seed problems into MongoDB
npm run dev
```

### 3. Setup Client (new terminal)
```
cd client
copy .env.example .env        # Windows
npm install
npm run dev
```

### 4. Open browser
- Frontend: http://localhost:5173
- Backend:  http://localhost:3001/health

## Environment Variables

### server/.env
```
PORT=3001
MONGODB_URI=mongodb+srv://...
REDIS_URL=rediss://...
JWT_SECRET=any_long_random_string
GEMINI_API_KEY=your_gemini_key
CLIENT_URL=http://localhost:5173
```

### client/.env
```
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

## Services to Set Up (all free)
1. **MongoDB** → mongodb.com (free M0 cluster)
2. **Redis** → upstash.com (free tier)
3. **Gemini API** → aistudio.google.com (free tier)
