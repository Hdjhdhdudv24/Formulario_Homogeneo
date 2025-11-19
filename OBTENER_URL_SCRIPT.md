# 🔗 Cómo Obtener la URL del Google Apps Script

## ⚠️ IMPORTANTE: Diferencia entre URLs

### ❌ URL INCORRECTA (Hoja de Sheets)
```
https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit
```
**Esta NO es la que necesitas** - Es solo para ver/editar la hoja.

### ✅ URL CORRECTA (Script Desplegado)
```
https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXX/exec
```
**Esta SÍ es la que necesitas** - Es la URL del script desplegado como aplicación web.

---

## 📋 Pasos para Obtener la URL Correcta

### Paso 1: Abrir Google Apps Script
1. Abre tu Google Sheet:
   - https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit

2. Ve a **Extensiones** > **Apps Script**
   - Se abrirá una nueva pestaña con el editor de Apps Script

### Paso 2: Verificar el Código
1. Verifica que el código de `GoogleAppsScript.js` esté pegado completo
2. Si no está, cópialo desde el archivo `GoogleAppsScript.js` del proyecto
3. Guarda el proyecto (Ctrl+S o Cmd+S)

### Paso 3: Desplegar como Aplicación Web
1. Haz clic en el botón **"Desplegar"** (arriba a la derecha)
2. Selecciona **"Nueva implementación"**
3. Configura:
   - **Tipo:** Selecciona "Aplicación web"
   - **Nombre:** Puedes dejarlo como está o poner "Formulario API"
   - **Ejecutar como:** Selecciona "Yo" (tu cuenta)
   - **Quién tiene acceso:** ⚠️ **IMPORTANTE:** Selecciona **"Cualquiera"**
     - Esto es necesario para que funcione desde el navegador
4. Haz clic en **"Desplegar"**

### Paso 4: Copiar la URL
1. Después de desplegar, aparecerá una ventana con la URL
2. La URL tendrá este formato:
   ```
   https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXX/exec
   ```
3. **Copia esta URL completa**

### Paso 5: Pegar en ui.js
1. Abre el archivo `ui.js` del proyecto
2. Ve a la línea 701 (aproximadamente)
3. Busca:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec';
   ```
4. Reemplaza `'https://script.google.com/macros/s/TU_SCRIPT_ID/exec'` con la URL que copiaste
5. Debe quedar así:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXX/exec';
   ```
6. Guarda el archivo

---

## ✅ Verificar que Funciona

1. Abre el formulario en tu navegador
2. Llena un formulario de prueba
3. Haz clic en "Continuar"
4. Deberías ver:
   - ✅ Notificación: "✓ Formulario enviado correctamente"
   - ✅ Nueva fila en tu Google Sheet
   - ✅ Correo recibido con la imagen (si configuraste el correo)

---

## 🐛 Problemas Comunes

### "No se recibieron datos" en Google Sheets
- Verifica que el código de `GoogleAppsScript.js` esté completo en Apps Script
- Verifica que el script esté desplegado (no solo guardado)

### Error CORS o "No autorizado"
- Verifica que el acceso esté configurado como **"Cualquiera"**
- Vuelve a desplegar si cambiaste la configuración

### La URL no funciona
- Verifica que la URL termine en `/exec` (no `/edit`)
- Verifica que no sea la URL de la hoja de Sheets
- Asegúrate de haber desplegado como "Aplicación web", no solo guardado

---

## 📝 Nota Importante

Si ya desplegaste el script antes, puedes:
1. Ir a **"Desplegar"** > **"Gestionar implementaciones"**
2. Ver todas las implementaciones activas
3. Copiar la URL de la implementación más reciente

---

¡Listo! Una vez que tengas la URL correcta en `ui.js`, el formulario podrá enviar datos correctamente. 🎉

