#!/bin/bash

# Function to kill processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM EXIT

echo "--- AI Store Setup Engine ---"

# Start Backend
echo "Step 1: Starting Backend (Port 3000)..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to initialize
sleep 2

# Start Frontend
echo "Step 2: Starting Frontend..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!

echo "Both servers are running!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:8080 (or similar)"
echo "Press Ctrl+C to stop."

wait
