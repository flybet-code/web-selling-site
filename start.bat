@echo off
echo Starting Tech Services Platform...

REM Start backend in a separate window
start "Backend Server" cmd /k "cd backend && npm run start:dev"

REM Give backend a moment to start
timeout /t 3 /nobreak >nul

REM Start frontend in a separate window
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo Servers started. Check the new windows for logs.
pause