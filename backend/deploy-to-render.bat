@echo off
echo ========================================
echo   Render Deployment Helper
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH!
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo [1/4] Checking .nvmrc file...
if exist ".nvmrc" (
    echo ✓ .nvmrc file exists
    set /p NODE_VERSION=<.nvmrc
    echo   Node version: !NODE_VERSION!
) else (
    echo ERROR: .nvmrc file not found!
    echo Creating .nvmrc with Node 20...
    echo 20 > .nvmrc
    echo ✓ Created .nvmrc
)
echo.

echo [2/4] Current Git status...
git status --short
echo.

echo [3/4] Committing changes for Render deployment...
git add .nvmrc backend\.env
git commit -m "Configure for Render deployment with Node 20"
if %ERRORLEVEL% NEQ 0 (
    echo No changes to commit or commit failed
)
echo.

echo [4/4] Pushing to GitHub...
echo This will trigger automatic deployment on Render
echo.
set /p CONFIRM="Push to GitHub? (y/n): "
if /i "!CONFIRM!"=="y" (
    git push origin main
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ========================================
        echo   ✓ Successfully pushed to GitHub!
        echo   → Check Render Dashboard for deployment status
        echo   → Visit: https://dashboard.render.com
        echo ========================================
    ) else (
        echo.
        echo ERROR: Push failed! Check your Git credentials.
    )
) else (
    echo.
    echo Skipped push. Run 'git push origin main' manually when ready.
)

echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo 1. Go to https://dashboard.render.com
echo 2. Check your service logs
echo 3. Verify deployment completed successfully
echo 4. Test your API at: https://your-app.onrender.com/health
echo.
echo For detailed instructions, see: RENDER_DEPLOYMENT_GUIDE.md
echo ========================================
pause
