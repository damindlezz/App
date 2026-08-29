@echo off
chcp 65001 >nul
title NUR Academy - Kompilieren (Production Build)
color 0A

echo.
echo ========================================================
echo   NUR ACADEMY - Projekt kompilieren
echo   Vite Production Build
echo ========================================================
echo.

REM --- Node.js pruefen ---
where node >nul 2>nul
if errorlevel 1 (
    echo [FEHLER] Node.js wurde nicht gefunden.
    echo          Bitte Node.js installieren: https://nodejs.org
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do echo [OK] Node.js %%v gefunden.

REM --- npm pruefen ---
where npm >nul 2>nul
if errorlevel 1 (
    echo [FEHLER] npm wurde nicht gefunden.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('npm -v') do echo [OK] npm %%v gefunden.
echo.

REM --- Abhaengigkeiten installieren, falls noetig ---
if not exist "node_modules" (
    echo [INFO] node_modules nicht vorhanden.
    echo        Installiere Pakete ^(npm install^)... das kann einen Moment dauern.
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [FEHLER] npm install ist fehlgeschlagen.
        pause
        exit /b 1
    )
    echo.
)

REM --- Build ausfuehren ---
echo [INFO] Starte Production Build ^(npm run build^)...
echo --------------------------------------------------------
call npm run build
if errorlevel 1 (
    echo --------------------------------------------------------
    echo.
    echo [FEHLER] Der Build ist fehlgeschlagen. Bitte Fehler oben pruefen.
    pause
    exit /b 1
)
echo --------------------------------------------------------
echo.

REM --- Ergebnis pruefen ---
if exist "dist\index.html" (
    echo [OK] Build erfolgreich!
    echo      Ausgabe: dist\index.html
    echo.
    echo      Die fertige App liegt im Ordner "dist" und kann
    echo      von jedem Webserver / Static-Hoster ausgeliefert werden.
) else (
    echo [WARN] dist\index.html nicht gefunden. Bitte Ausgabe oben pruefen.
)

echo.
echo ========================================================
pause
