# Start both Backend and Frontend servers
# This script opens two new PowerShell windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Task Management System" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$currentPath = Get-Location

# Check if backend/.env exists
if (-not (Test-Path "backend/.env")) {
    Write-Host "⚠ Warning: backend/.env not found!" -ForegroundColor Red
    Write-Host "Please create backend/.env from backend/.env.example" -ForegroundColor Yellow
    Write-Host ""
}

# Check if frontend/.env exists
if (-not (Test-Path "frontend/.env")) {
    Write-Host "⚠ Warning: frontend/.env not found!" -ForegroundColor Red
    Write-Host "Please create frontend/.env from frontend/.env.example" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\backend'; Write-Host 'Backend Server Starting...' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 2

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\frontend'; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm start"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Servers Starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two PowerShell windows have been opened." -ForegroundColor Yellow
Write-Host "Close those windows to stop the servers." -ForegroundColor Yellow
Write-Host ""
