# 🔧 Solución: Problema de Envío a Google Sheets y Correo

## ✅ Cambios Realizados

He corregido varios problemas en el código:

### 1. **Frontend (ui.js)**
- ✅ Mejorado el manejo de errores en `sendPayload()`
- ✅ Añadido logging detallado para debugging
- ✅ Intentar primero con CORS para ver la respuesta
- ✅ Fallback a no-cors si CORS falla
- ✅ Mejor manejo de errores y reintentos

### 2. **Backend (GoogleAppsScript.js)**
- ✅ Añadido logging extensivo para debugging
- ✅ Múltiples métodos para parsear datos (postData.contents, parameter.data)
- ✅ Mejor manejo de errores
- ✅ Envío de correo incluso sin imagen
- ✅ Función `doOptions()` para manejar CORS preflight

---

## 📋 PASOS PARA APLICAR LA SOLUCIÓN

### Paso 1: Actualizar Google Apps Script

1. **Abre tu Google Sheet:**
   - https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit

2. **Ve a Extensiones > Apps Script**

3. **Borra TODO el código actual** y pega el contenido completo del archivo `GoogleAppsScript.js` actualizado

4. **Guarda el proyecto** (Ctrl+S o Cmd+S)

5. **Vuelve a desplegar:**
   - Haz clic en **"Desplegar"** > **"Gestionar implementaciones"**
   - Haz clic en el ícono de edición (lápiz) de la implementación activa
   - O crea una **"Nueva implementación"**
   - Configura:
     - **Tipo:** "Aplicación web"
     - **Ejecutar como:** "Yo"
     - **Quién tiene acceso:** "Cualquiera"
   - Haz clic en **"Desplegar"**

6. **IMPORTANTE:** Si cambias la URL, actualízala en `ui.js` línea 699

---

### Paso 2: Verificar que el Código Frontend Está Actualizado

El archivo `ui.js` ya está actualizado con las mejoras. Verifica que tengas la versión más reciente.

---

### Paso 3: Probar el Envío

1. **Abre el formulario** en tu navegador
2. **Abre la consola del navegador** (F12 > Console)
3. **Llena un formulario de prueba:**
   - Correo del entrevistador: tu correo real
   - Producto: Selecciona uno
   - Datos de solicitante(s)
   - Al menos una pregunta médica marcada como "SÍ"
4. **Haz clic en "Continuar"**
5. **Observa la consola** - deberías ver logs como:
   ```
   [sendPayload] Enviando payload: {...}
   [sendPayload] Respuesta exitosa: {...}
   ```

---

### Paso 4: Verificar Logs en Google Apps Script

Si algo no funciona, revisa los logs:

1. **En Google Apps Script:**
   - Ve a **"Ver"** > **"Registros de ejecución"**
   - Deberías ver logs detallados de cada envío

2. **Busca errores** en los logs:
   - Si ves "ERROR: No se encontraron datos", el problema es el formato del request
   - Si ves "Error al enviar correo", el problema es con Gmail
   - Si ves "Error al insertar fila", el problema es con Google Sheets

---

## 🐛 Troubleshooting

### Problema: "No se guarda en Google Sheets"

**Solución:**
1. Verifica los logs en Google Apps Script (Ver > Registros de ejecución)
2. Verifica que el script esté desplegado correctamente
3. Verifica que la URL en `ui.js` sea correcta
4. Verifica que la hoja de Google Sheets tenga permisos de escritura

### Problema: "No se envía el correo"

**Solución:**
1. Verifica que el campo "Correo del entrevistador" esté lleno
2. Verifica los logs en Google Apps Script para ver si hay errores de Gmail
3. Verifica que tu cuenta de Google tenga permisos para enviar correos
4. Revisa la carpeta de spam

### Problema: "Error CORS en la consola"

**Solución:**
- Esto es normal si el script usa `no-cors` como fallback
- El código maneja esto automáticamente
- Si ves el error pero los datos se guardan, está funcionando correctamente

### Problema: "No veo logs en la consola"

**Solución:**
1. Asegúrate de tener la consola abierta (F12)
2. Verifica que no tengas filtros activos en la consola
3. Recarga la página y prueba de nuevo

---

## ✅ Verificación Final

Después de aplicar los cambios, verifica:

- [ ] El formulario se puede enviar sin errores en la consola
- [ ] Los datos aparecen en Google Sheets
- [ ] Se recibe el correo (con o sin imagen)
- [ ] Los logs en Google Apps Script muestran el proceso completo

---

## 📝 Notas Importantes

1. **Logging:** Ahora hay logging extensivo tanto en el frontend (consola del navegador) como en el backend (Google Apps Script). Esto te ayudará a identificar problemas.

2. **CORS:** Para URLs de organización de Google Workspace, puede haber problemas con CORS. El código maneja esto automáticamente con un fallback.

3. **Correo sin imagen:** Ahora el sistema envía correo incluso si no hay imagen, solo con los datos del formulario.

4. **Múltiples formatos:** El script ahora acepta datos en múltiples formatos para mayor compatibilidad.

---

## 🆘 Si Aún No Funciona

Si después de aplicar estos cambios aún no funciona:

1. **Comparte los logs:**
   - Logs de la consola del navegador (F12 > Console)
   - Logs de Google Apps Script (Ver > Registros de ejecución)

2. **Verifica:**
   - Que el Google Apps Script esté desplegado
   - Que la URL en `ui.js` sea correcta
   - Que tengas permisos en Google Sheets
   - Que tu cuenta de Google pueda enviar correos

3. **Prueba manualmente:**
   - Abre la URL del script en el navegador
   - Debería mostrar un error (esto es normal, el script solo acepta POST)
   - Si muestra un error diferente, compártelo

---

¡Listo! Con estos cambios, el envío debería funcionar correctamente. 🎉

