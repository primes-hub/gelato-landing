@echo off
REM Start a local HTTP server for the Gelato Landing project
REM This allows the project to run under http://localhost instead of file://

echo Starting local HTTP server...
echo.
echo The project will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server.
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python to start HTTP server...
    python -m http.server 8000
) else (
    REM Try Python 3
    python3 --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo Using Python 3 to start HTTP server...
        python3 -m http.server 8000
    ) else (
        echo Error: Python is not installed or not in PATH.
        echo Please install Python from https://www.python.org/
        echo Make sure to check "Add Python to PATH" during installation.
        pause
        exit /b 1
    )
)
