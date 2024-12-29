#!/bin/bash

FRONTEND_DIR="./frontend/linko-ui"
BACKEND_DIR="./backend"

BACKEND_PORT=5000
FRONTEND_PORT=3000

kill_process_on_port() {
    local PORT=$1
    echo "Checking if port $PORT is in use..."
    PID=$(lsof -ti :$PORT)
    if [ -n "$PID" ]; then
        echo "Port $PORT is in use by process $PID. Terminating..."
        kill -9 $PID
        echo "Process $PID terminated."
    else
        echo "Port $PORT is not in use."
    fi
}

start_backend() {
    echo "Starting Flask backend on port $BACKEND_PORT..."
    cd "$BACKEND_DIR" || exit

    kill_process_on_port $BACKEND_PORT

    source .venv/bin/activate
    python3 app.py --port=$BACKEND_PORT &
    BACKEND_PID=$!
    echo "Flask backend started with PID $BACKEND_PID"
    cd - > /dev/null || exit
}

start_frontend() {
    echo "Starting React frontend on port $FRONTEND_PORT..."
    cd "$FRONTEND_DIR" || exit

    kill_process_on_port $FRONTEND_PORT

    npm start --port $FRONTEND_PORT &
    FRONTEND_PID=$!
    echo "React frontend started with PID $FRONTEND_PID"
    cd - > /dev/null || exit
}

cleanup() {
    echo "Stopping servers..."
    kill "$BACKEND_PID" 2>/dev/null
    kill "$FRONTEND_PID" 2>/dev/null
    echo "Servers stopped."
}

trap cleanup SIGINT

start_backend
start_frontend

wait