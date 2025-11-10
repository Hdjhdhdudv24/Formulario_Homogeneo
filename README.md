# 📋 Formulario de Asegurabilidad - Seguros Bolívar

Aplicación web progresiva (PWA) para la declaración de asegurabilidad con funcionalidad offline-first.

## ✨ Características

- ✅ PWA instalable (Android/Desktop)
- ✅ Funciona offline después de la primera visita
- ✅ Cola de envíos automática cuando no hay conexión
- ✅ Integración con Google Sheets para almacenamiento
- ✅ Formulario dinámico con múltiples solicitantes
- ✅ Cuestionario médico estructurado por persona

## 🚀 Inicio Rápido

### Prueba Local

1. Ejecuta `test-local-server.bat` (Windows) o:
   ```bash
   python -m http.server 8000
   ```
2. Abre `http://localhost:8000`

### Configurar Google Sheets

1. Abre `GoogleAppsScript.js` y sigue las instrucciones
2. Despliega el script como "Aplicación web"
3. Copia la URL y pégala en `ui.js` (línea 508)

Ver `INSTRUCCIONES.md` para más detalles.

## 📦 Deploy

### Netlify (Recomendado)

Ver `DEPLOY_NETLIFY.md` para instrucciones completas.

**Resumen:**
1. Crea el repo en GitHub: `Formulario_Homogeneos`
2. Conecta el repo local:
   ```bash
   git remote add origin https://github.com/kevinhr2304/Formulario_Homogeneos.git
   git push -u origin main
   ```
3. En Netlify: Import from GitHub > Selecciona el repo

## 📁 Estructura

```
├── index.html          # Página principal
├── ui.js              # Lógica de la aplicación
├── styles.css         # Estilos
├── service-worker.js  # Service Worker para offline
├── manifest.json      # Configuración PWA
├── offline.html       # Página offline
├── GoogleAppsScript.js # Script para Google Sheets
└── assets/            # Recursos estáticos
```

## 🔧 Tecnologías

- HTML5 / CSS3
- JavaScript (ES6+)
- Service Workers
- IndexedDB
- Google Apps Script

## 📝 Licencia

Proyecto interno - Seguros Bolívar

