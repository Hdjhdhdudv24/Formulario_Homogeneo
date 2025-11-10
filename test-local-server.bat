@echo off
echo Iniciando servidor local para probar PWA...
echo.
echo El servidor estara disponible en: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
python -m http.server 8000
if errorlevel 1 (
    echo.
    echo Python no encontrado. Intentando con Node.js...
    echo.
    npx http-server -p 8000 -c-1
)

