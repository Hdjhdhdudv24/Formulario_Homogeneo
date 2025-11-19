# 🔧 Solución: Error 401 Unauthorized en Google Apps Script

## ⚠️ Problema Identificado

El error **401 Unauthorized** indica que el Google Apps Script está rechazando la petición. Esto puede deberse a:

1. **El script no está desplegado correctamente**
2. **El acceso no está configurado como "Cualquiera"**
3. **La URL del script es incorrecta o está desactualizada**
4. **El script necesita ser re-desplegado después de cambios**

---

## ✅ SOLUCIÓN PASO A PASO

### Paso 1: Verificar y Actualizar Google Apps Script

1. **Abre tu Google Sheet:**
   - https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit

2. **Ve a Extensiones > Apps Script**

3. **Verifica que el código esté actualizado:**
   - Debe tener la función `doOptions()` para manejar CORS
   - Debe tener logging extensivo
   - Debe tener el código completo de `GoogleAppsScript.js`

4. **Guarda el proyecto** (Ctrl+S)

### Paso 2: Re-desplegar el Script (CRÍTICO)

1. **Haz clic en "Desplegar" > "Gestionar implementaciones"**

2. **Edita la implementación existente:**
   - Haz clic en el ícono de edición (lápiz) de la implementación activa
   - O crea una **"Nueva implementación"**

3. **Configura EXACTAMENTE así:**
   - **Tipo:** "Aplicación web"
   - **Nombre:** "Formulario API" (o el que prefieras)
   - **Ejecutar como:** "Yo" (tu cuenta de Google)
   - **Quién tiene acceso:** ⚠️ **"Cualquiera"** (MUY IMPORTANTE)
   - **Versión:** "Nueva versión" (si editas) o "Nueva implementación"

4. **Haz clic en "Desplegar"**

5. **Copia la URL que aparece** (debería ser algo como):
   ```
   https://script.google.com/a/macros/segurosbolivar.com/s/AKfycbw.../exec
   ```

### Paso 3: Verificar la URL en ui.js

1. **Abre `ui.js`** en tu editor

2. **Busca la línea 757** (aproximadamente):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/a/macros/segurosbolivar.com/s/.../exec';
   ```

3. **Verifica que la URL sea EXACTAMENTE la misma** que copiaste del despliegue

4. **Si es diferente, actualízala**

5. **Guarda el archivo**

### Paso 4: Limpiar Caché y Probar

1. **Espera 2-3 minutos** a que Netlify despliegue los cambios (si usas Netlify)

2. **Limpia la caché del navegador:**
   - Chrome/Edge: Ctrl+Shift+Delete > "Caché de imágenes y archivos" > Borrar
   - O simplemente: Ctrl+Shift+R (recarga forzada)

3. **Abre el formulario** y prueba de nuevo

---

## 🔍 Verificar que Funciona

### En la Consola del Navegador:

Deberías ver:
```
[sendPayload] Enviando payload: {...}
[sendPayload] Enviado con no-cors (no se puede verificar respuesta del servidor)
[sendPayload] IMPORTANTE: Verifica en Google Sheets si los datos se guardaron correctamente
```

**NO deberías ver:**
- ❌ Error 401 Unauthorized
- ❌ Error CORS (aunque puede aparecer, es normal con no-cors)

### En Google Sheets:

1. **Abre tu Google Sheet**
2. **Verifica que se agregó una nueva fila** con los datos del formulario
3. **Si hay datos, el envío funcionó** (aunque el navegador no pueda verificar la respuesta)

### En Google Apps Script Logs:

1. **Ve a Apps Script > Ver > Registros de ejecución**
2. **Deberías ver logs como:**
   ```
   === doPost llamado ===
   Parseando desde postData.contents
   Datos recibidos: {...}
   Insertando fila en la hoja...
   Fila insertada correctamente
   ```

---

## 🐛 Si Aún No Funciona

### Verificar Permisos del Script:

1. **En Apps Script, ve a "Desplegar" > "Gestionar implementaciones"**
2. **Verifica que el acceso sea "Cualquiera"**
3. **Si dice "Solo yo", edítalo y cámbialo a "Cualquiera"**
4. **Vuelve a desplegar**

### Verificar que el Script Esté Activo:

1. **En Apps Script, ve a "Ver" > "Registros de ejecución"**
2. **Intenta enviar un formulario**
3. **Deberías ver una nueva ejecución de `doPost`**
4. **Si no aparece, el script no está recibiendo las peticiones**

### Verificar la URL:

1. **Abre la URL del script directamente en el navegador:**
   ```
   https://script.google.com/a/macros/segurosbolivar.com/s/.../exec
   ```
2. **Debería mostrar un error (esto es normal, el script solo acepta POST)**
3. **Si muestra "401" o "No autorizado", el script no está desplegado correctamente**

### Probar Manualmente:

1. **Abre la consola del navegador (F12)**
2. **Ejecuta este código:**
   ```javascript
   fetch('TU_URL_DEL_SCRIPT', {
     method: 'POST',
     mode: 'no-cors',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ test: 'data' })
   })
   ```
3. **Verifica en Google Sheets si llegó algo**

---

## 📝 Notas Importantes

1. **Con `no-cors` no podemos verificar la respuesta del servidor** - esto es normal y esperado con Google Apps Script

2. **El error 401 significa que el script está rechazando la petición** - generalmente por permisos incorrectos

3. **Siempre verifica en Google Sheets** si los datos llegaron, ya que el navegador no puede confirmarlo con no-cors

4. **Si cambias el código del script, DEBES re-desplegarlo** para que los cambios surtan efecto

---

## ✅ Checklist Final

- [ ] Google Apps Script tiene el código actualizado
- [ ] Script desplegado como "Aplicación web"
- [ ] Acceso configurado como "Cualquiera"
- [ ] URL en `ui.js` coincide con la URL del despliegue
- [ ] Caché del navegador limpiada
- [ ] Prueba de envío realizada
- [ ] Datos aparecen en Google Sheets
- [ ] Logs en Apps Script muestran ejecución exitosa

---

¡Con estos pasos, el error 401 debería resolverse! 🎉

