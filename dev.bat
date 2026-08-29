@echo off
chcp 65001 >nul
title NUR Academy - Desktop-Entwicklung (ohne EXE)
color 0B
setlocal enabledelayedexpansion

set URL=http://localhost:5173
set APP_NAME=NUR Academy - Dev

echo.
echo ========================================================
echo   NUR ACADEMY - Desktop-Entwicklung
echo   Dev-Server + App-Fenster ^(keine EXE, kein Packaging^)
echo ========================================================
echo.

REM --- Node.js pruefen ---
where node >nul 2>nul
if errorlevel 1 (
    echo [FEHLER] Node.js wurde nicht gefunden.
    echo          Bitte Node.js installieren: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js gefunden.

REM --- Abhaengigkeiten installieren, falls noetig ---
if not exist "node_modules" (
    echo [INFO] node_modules nicht vorhanden - installiere Pakete...
    call npm install
    if errorlevel 1 (
        echo [FEHLER] npm install fehlgeschlagen.
        pause
        exit /b 1
    )
)

REM --- Bereits laufenden Server auf dem Port erkennen ---
curl -s -o nul %URL% >nul 2>nul
if not errorlevel 1 (
    echo [INFO] Auf %URL% laeuft bereits ein Server - oeffne nur das App-Fenster.
    goto :open_app
)

REM --- Dev-Server in eigenem Fenster starten ---
echo [INFO] Starte Vite Dev-Server auf %URL% ...
start "%APP_NAME% - Server" cmd /k "title %APP_NAME% - Server && npm run dev -- --port 5173 --strictPort --host"

REM --- Warten, bis der Server antwortet ---
echo [INFO] Warte auf Server...
set /a TRIES=0
:wait_loop
curl -s -o nul %URL% >nul 2>nul
if not errorlevel 1 goto :open_app
set /a TRIES+=1
if !TRIES! geq 20 (
    echo [WARN] Server antwortet nicht rechtzeitig - versuche trotzdem zu oeffnen.
    goto :open_app
)
timeout /t 1 /nobreak >nul
goto :wait_loop

:open_app
echo [OK] Server ist erreichbar.
echo [INFO] Oeffne Desktop-App-Fenster ^(App-Modus, ohne Browserleiste^)...

REM --- Microsoft Edge (App-Modus) ---
set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "EDGE86=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" (
    start "" "%EDGE%" --app=%URL% --window-size=1366,868
    echo [OK] Geoeffnet mit Microsoft Edge ^(App-Modus^).
    goto :done
)
if exist "%EDGE86%" (
    start "" "%EDGE86%" --app=%URL% --window-size=1366,868
    echo [OK] Geoeffnet mit Microsoft Edge ^(App-Modus^).
    goto :done
)

REM --- Google Chrome (App-Modus) ---
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CHROME86=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "CHROMELOCAL=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (
    start "" "%CHROME%" --app=%URL% --window-size=1366,868
    echo [OK] Geoeffnet mit Google Chrome ^(App-Modus^).
    goto :done
)
if exist "%CHROME86%" (
    start "" "%CHROME86%" --app=%URL% --window-size=1366,868
    echo [OK] Geoeffnet mit Google Chrome ^(App-Modus^).
    goto :done
)
if exist "%CHROMELOCAL%" (
    start "" "%CHROMELOCAL%" --app=%URL% --window-size=1366,868
    echo [OK] Geoeffnet mit Google Chrome ^(App-Modus^).
    goto :done
)

REM --- Fallback: Standardbrowser ---
echo [INFO] Kein Edge/Chrome gefunden - oeffne Standardbrowser.
start "" %URL%

:done
echo.
echo ========================================================
echo   Die App laeuft im Desktop-Fenster.
echo   - Hot-Reload ist aktiv: Aenderungen erscheinen sofort.
echo   - Server beenden: Im Server-Fenster STRG+C druecken
echo     oder dieses Fenster schliessen.
echo ========================================================
echo.
timeout /t 6 /nobreak >nul
endlocal
exit /b 0
