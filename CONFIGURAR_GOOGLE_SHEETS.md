# 📊 Configurar Google Sheets y Envío de Correos

## Paso 1: Configurar Google Apps Script

1. **Abre tu Google Sheet:**
   https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit

2. **Ve a Extensiones > Apps Script**

3. **Borra todo** el código que haya y pega el contenido completo de `GoogleAppsScript.js`

4. **Guarda el proyecto** (Ctrl+S o Cmd+S) y dale un nombre como "Formulario Asegurabilidad"

5. **Autorizar permisos:**
   - La primera vez que ejecutes, Google te pedirá autorización
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado" > "Ir a [nombre del proyecto] (no seguro)"
   - Haz clic en "Permitir"

6. **Desplegar como aplicación web:**
   - Haz clic en **"Desplegar"** > **"Nueva implementación"**
   - **Tipo**: "Aplicación web"
   - **Nombre**: "Formulario API" (o el que quieras)
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: **"Cualquiera"** ⚠️ (IMPORTANTE: debe ser "Cualquiera" para que funcione desde el navegador)
   - Haz clic en **"Desplegar"**

7. **Copia la URL:**
   - Se mostrará una URL como: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copia esta URL completa**

## Paso 2: Configurar la URL en el Código

1. **Abre `ui.js`** en tu editor

2. **Busca la línea 508** (aproximadamente) que dice:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec';
   ```

3. **Reemplaza** `'https://script.google.com/macros/s/TU_SCRIPT_ID/exec'` con la URL que copiaste (entre comillas)

4. **Guarda el archivo**

5. **Haz commit y push:**
   ```bash
   git add ui.js
   git commit -m "Configurar URL de Google Apps Script"
   git push
   ```

## Paso 3: Verificar que Funciona

1. **Espera ~2 minutos** a que Netlify despliegue los cambios

2. **Abre el formulario:** https://formulariohomogeneo.netlify.app

3. **Llena un formulario de prueba** con:
   - Correo del entrevistador: tu correo real
   - Datos de solicitantes
   - Al menos una pregunta médica marcada como "SÍ"

4. **Haz clic en "Continuar"**

5. **Verifica:**
   - ✅ Aparece notificación: "✓ Formulario enviado correctamente. Se enviará un correo con la imagen."
   - ✅ Abre tu Google Sheet y verifica que se agregó una nueva fila
   - ✅ Revisa tu correo (y spam) - deberías recibir un correo con la imagen adjunta

## 🔧 Troubleshooting

### Los datos no se guardan en Google Sheets

1. **Verifica la URL:**
   - Abre `ui.js` y confirma que `GOOGLE_SCRIPT_URL` tiene la URL correcta
   - La URL debe terminar en `/exec`

2. **Verifica permisos del script:**
   - Ve a Apps Script > Ver > Registros de ejecución
   - Si hay errores, aparecerán ahí

3. **Verifica que el script esté desplegado:**
   - Ve a Apps Script > Desplegar > Gestionar implementaciones
   - Debe haber una implementación activa con acceso "Cualquiera"

4. **Revisa la consola del navegador:**
   - F12 > Console
   - Busca errores en rojo

### No se recibe el correo

1. **Verifica el correo del entrevistador:**
   - Asegúrate de haber llenado el campo "Correo del entrevistador"
   - Verifica que sea un correo válido

2. **Revisa la carpeta de spam:**
   - Los correos automáticos a veces van a spam

3. **Verifica los logs de Apps Script:**
   - Ve a Apps Script > Ver > Registros de ejecución
   - Busca errores relacionados con el envío de correo

4. **Verifica permisos de Gmail:**
   - El script necesita permisos para enviar correos
   - Si no los tiene, Google te pedirá autorización

### Error "No se recibieron datos"

1. **Verifica que el formulario tenga datos:**
   - Asegúrate de llenar al menos los campos requeridos

2. **Revisa la consola del navegador:**
   - Puede haber un error de red o CORS

### El correo se envía pero sin imagen

1. **Verifica que html2canvas esté cargado:**
   - Abre la consola y escribe: `typeof html2canvas`
   - Debe decir: `"function"`

2. **Revisa los logs de Apps Script:**
   - Puede haber un error al procesar la imagen base64

## 📝 Notas Importantes

- **Límites de Google Sheets:**
  - ~5 millones de celdas por hoja
  - ~10,000,000 celdas por cuenta
  - Para producción, considera migrar a una base de datos real

- **Límites de Gmail:**
  - 500 correos por día desde Apps Script
  - Si necesitas más, considera usar un servicio de correo dedicado

- **Seguridad:**
  - El script es público (cualquiera puede ver la URL)
  - No expongas datos sensibles sin autenticación adicional
  - Para producción, añade validación y rate limiting

- **Tamaño de imagen:**
  - Las imágenes se envían en base64, lo que aumenta el tamaño
  - Google Apps Script tiene límites de tamaño de payload
  - Si el formulario es muy grande, puede fallar

## ✅ Checklist Final

- [ ] Google Apps Script desplegado como "Aplicación web"
- [ ] Acceso configurado como "Cualquiera"
- [ ] URL copiada y pegada en `ui.js`
- [ ] Permisos de Gmail autorizados
- [ ] Prueba de envío exitosa
- [ ] Datos aparecen en Google Sheets
- [ ] Correo recibido con imagen adjunta

---

¡Listo! 🎉

