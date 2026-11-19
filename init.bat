@echo off
setlocal
cd /d "%~dp0"

set "PORT=8000"
set "NODE="
set "PYTHON="

where node >nul 2>nul
if not errorlevel 1 (
    node --version >nul 2>nul
    if not errorlevel 1 set "NODE=node"
)

if not defined NODE (
    where py >nul 2>nul
    if not errorlevel 1 (
        py -3 --version >nul 2>nul
        if not errorlevel 1 set "PYTHON=py -3"
    )
)

if not defined NODE if not defined PYTHON (
    where python >nul 2>nul
    if not errorlevel 1 (
        python --version >nul 2>nul
        if not errorlevel 1 set "PYTHON=python"
    )
)

if not defined NODE if not defined PYTHON (
    echo Node.js ou Python 3 nao foi encontrado.
    echo Instale Node.js ou Python 3 e execute este arquivo novamente.
    pause
    exit /b 1
)

echo.
echo LifeHub disponivel nesta maquina:
echo   http://localhost:%PORT%/
echo.
echo Enderecos para abrir no celular conectado a mesma rede Wi-Fi:
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /i "IPv4"') do (
    for /f "tokens=* delims= " %%B in ("%%A") do echo   http://%%B:%PORT%/
)
echo.
echo Escolha o endereco da rede Wi-Fi. Se o Windows perguntar, permita o acesso em redes privadas.
echo Use somente em uma rede confiavel; nao configure redirecionamento desta porta para a internet.
echo Pressione Ctrl+C para encerrar o servidor.
echo.

if defined NODE (
    node "%~dp0server.js"
) else (
    %PYTHON% -m http.server %PORT% --bind 0.0.0.0
)
if errorlevel 1 (
    echo.
    echo O servidor nao iniciou. Verifique se a porta %PORT% ja esta em uso.
    pause
    exit /b 1
)
