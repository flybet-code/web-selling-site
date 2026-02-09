#!/bin/bash

echo "Starting Tech Services Platform..."

# Start backend in the background
echo "Starting backend server..."
cd backend && npm run start:dev &
BACKEND_PID=$!

# Give backend a moment to start
sleep 3

# Start frontend in the background
echo "Starting frontend server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Function to stop servers on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID
    exit
}

# Trap exit signals
trap cleanup EXIT INT TERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID