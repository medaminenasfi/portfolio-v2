@echo off
echo ========================================
echo   Portfolio Backend - Database Setup
echo ========================================
echo.

echo [1/3] Building backend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo ✓ Build complete
echo.

echo [2/3] Running database migrations...
call npm run migration:run
if %errorlevel% neq 0 (
    echo WARNING: Migrations may have already been run or failed
    echo You can run them manually later with: npm run migration:run
)
echo.

echo [3/3] Starting development server...
call npm run start:dev

pause
