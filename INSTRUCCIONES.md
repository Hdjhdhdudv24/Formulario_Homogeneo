# 📋 Instrucciones de Configuración y Pruebas

## 🧪 Probar Localmente (Sin Host)

### Opción 1: Script Automático (Windows)
1. Haz doble clic en `test-local-server.bat`
2. Se abrirá un servidor en `http://localhost:8000`
3. Abre tu navegador y ve a esa URL

### Opción 2: Python (Si tienes Python instalado)
```bash
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

### Opción 3: Node.js (Si tienes Node.js)
```bash
npx http-server -p 8000 -c-1
```
Luego abre: `http://localhost:8000`

### ⚠️ Importante
- **NO uses `file://`** (abrir directamente el HTML). Los Service Workers requieren HTTP/HTTPS
- Usa siempre `localhost` o un servidor HTTP
- Para probar offline: abre DevTools > Application > Service Workers > Offline

---

## 📊 Configurar Google Sheets

### Paso 1: Crear el Script de Google Apps Script

1. Abre tu Google Sheet:
   https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit

2. Ve a **Extensiones** > **Apps Script**

3. **Borra todo** el código que haya y pega el contenido completo de `GoogleAppsScript.js`

4. Guarda el proyecto (Ctrl+S o Cmd+S) y dale un nombre como "Formulario Asegurabilidad"

5. Haz clic en **"Desplegar"** > **"Nueva implementación"**

6. Configura:
   - **Tipo**: "Aplicación web"
   - **Nombre**: "Formulario API" (o el que quieras)
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: **"Cualquiera"** (importante para que funcione desde el navegador)

7. Haz clic en **"Desplegar"**

8. **Copia la URL** que te aparece (algo como: `https://script.google.com/macros/s/AKfycby.../exec`)

### Paso 2: Configurar la URL en el Código

1. Abre `ui.js` en tu editor

2. Busca la línea que dice:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec';
   ```

3. Reemplaza `'https://script.google.com/macros/s/TU_SCRIPT_ID/exec'` con la URL que copiaste (entre comillas)

4. Guarda el archivo

### Paso 3: Probar

1. Abre el formulario en `http://localhost:8000`
2. Llena un formulario de prueba
3. Haz clic en "Continuar"
4. Ve a tu Google Sheet y verifica que se haya guardado la fila

---

## 🚀 Opciones de Hosting (Fácil y Gratis)

### Opción 1: Netlify (⭐ Más Fácil)

1. Ve a https://www.netlify.com y crea cuenta (gratis con GitHub/Google)

2. **Opción A - Drag & Drop:**
   - Arrastra toda la carpeta del proyecto a https://app.netlify.com/drop
   - ¡Listo! Te dará una URL como `https://random-name-123.netlify.app`

3. **Opción B - GitHub:**
   - Sube tu proyecto a GitHub
   - En Netlify: "New site from Git" > Conecta GitHub > Selecciona tu repo
   - Deploy automático en cada push

**Ventajas:**
- HTTPS automático
- Deploy instantáneo
- URL personalizada gratuita
- Perfecto para PWA

---

### Opción 2: Vercel (Similar a Netlify)

1. Ve a https://vercel.com y crea cuenta

2. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. En la carpeta del proyecto:
   ```bash
   vercel
   ```

4. Sigue las instrucciones

**Ventajas:**
- Muy rápido
- HTTPS automático
- URL personalizada

---

### Opción 3: GitHub Pages (Gratis, pero más lento)

1. Sube tu proyecto a GitHub

2. Ve a Settings > Pages

3. Source: "Deploy from a branch" > Selecciona "main" o "master"

4. Guarda. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo/`

**Nota:** Necesitas ajustar las rutas en `index.html` si usas subdirectorio:
- Cambia `./` por `./nombre-repo/` en los links

---

### Opción 4: Firebase Hosting (Google)

1. Instala Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Inicia sesión:
   ```bash
   firebase login
   ```

3. En tu carpeta del proyecto:
   ```bash
   firebase init hosting
   ```

4. Configura:
   - Public directory: `.` (punto)
   - Single-page app: No
   - Overwrite index.html: No

5. Despliega:
   ```bash
   firebase deploy
   ```

**Ventajas:**
- Gratis
- HTTPS automático
- URL: `https://tu-proyecto.web.app`

---

## ✅ Checklist de Pruebas

- [ ] Servidor local funciona en `http://localhost:8000`
- [ ] Service Worker se registra (DevTools > Application > Service Workers)
- [ ] Formulario se puede llenar offline
- [ ] Datos se guardan en Google Sheets
- [ ] Cola de envíos funciona (probar offline, luego online)
- [ ] Manifest válido (DevTools > Application > Manifest)
- [ ] Iconos cargan (si los creaste)

---

## 🔧 Troubleshooting

### El Service Worker no se registra
- Asegúrate de usar `http://localhost` y NO `file://`
- Revisa la consola del navegador para errores

### Los datos no se guardan en Google Sheets
- Verifica que la URL del script esté correcta en `ui.js`
- Revisa que el script tenga permisos "Cualquiera"
- Abre la consola del navegador para ver errores

### Error CORS en Google Sheets
- El script debe estar desplegado como "Aplicación web" con acceso "Cualquiera"
- Usa `mode: 'no-cors'` en el fetch (ya está configurado)

---

## 📝 Notas Importantes

1. **Google Sheets tiene límites:**
   - ~5 millones de celdas por hoja
   - ~10,000,000 celdas por cuenta
   - Para producción, considera migrar a una base de datos real

2. **Seguridad:**
   - El script de Google es público (cualquiera puede ver la URL)
   - No expongas datos sensibles sin autenticación
   - Para producción, añade validación en el script

3. **HTTPS:**
   - Los Service Workers requieren HTTPS (o localhost)
   - Todos los hosts mencionados dan HTTPS gratis

