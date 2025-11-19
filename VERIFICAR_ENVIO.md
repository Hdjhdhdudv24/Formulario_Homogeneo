# 🔍 Cómo Verificar si el Envío Está Funcionando

## ⚠️ Problema Actual

Con `no-cors`, el navegador **NO puede verificar** si el envío fue exitoso. Esto es normal con Google Apps Script, pero hace difícil saber si funcionó.

---

## ✅ Métodos de Verificación

### Método 1: Verificar Logs en Google Apps Script (MÁS IMPORTANTE)

1. **Abre tu Google Sheet**
2. **Ve a Extensiones > Apps Script**
3. **Haz clic en "Ver" > "Registros de ejecución"**
4. **Intenta enviar un formulario**
5. **Deberías ver una nueva ejecución de `doPost`**

**Si ves logs como estos, el script ESTÁ recibiendo las peticiones:**
```
=== doPost llamado ===
Timestamp: 2025-01-27T...
e.postData existe: true
Parseando desde postData.contents
Datos recibidos: {...}
Insertando fila en la hoja...
Fila insertada correctamente en la fila: 2
```

**Si NO ves ninguna ejecución nueva:**
- El script NO está recibiendo las peticiones
- Verifica que la URL en `ui.js` sea correcta
- Verifica que el script esté desplegado como "Aplicación web" con acceso "Cualquiera"

---

### Método 2: Verificar en Google Sheets

1. **Abre tu Google Sheet**
2. **Verifica si se agregó una nueva fila** después de enviar el formulario
3. **Si hay datos, el envío funcionó** ✅
4. **Si no hay datos, revisa los logs** (Método 1)

---

### Método 3: Probar Manualmente con la Consola

1. **Abre el formulario en el navegador**
2. **Abre la consola (F12 > Console)**
3. **Ejecuta este código:**
   ```javascript
   const testData = {
     submission_id: 'test-' + Date.now(),
     schema_version: 'ph041.v1',
     contactEmail: 'test@ejemplo.com',
     product: 'SALUD_INDIVIDUAL',
     numApplicants: 1,
     applicants: [{ idx: 1, name: 'Test', idType: 'CC', idNumber: '123', age: 30, sex: 'M' }],
     medical: [],
     createdAt: new Date().toISOString()
   };
   
   fetch('TU_URL_DEL_SCRIPT', {
     method: 'POST',
     mode: 'no-cors',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(testData)
   }).then(() => console.log('Enviado (no se puede verificar respuesta)'));
   ```
4. **Reemplaza `TU_URL_DEL_SCRIPT` con tu URL real**
5. **Verifica en Google Sheets si llegó una fila con "test-"**

---

## 🐛 Si No Funciona

### Paso 1: Verificar que el Script Esté Desplegado

1. **En Apps Script, ve a "Desplegar" > "Gestionar implementaciones"**
2. **Debe haber una implementación activa**
3. **Verifica que el acceso sea "Cualquiera"**
4. **Si no, edítalo y cámbialo a "Cualquiera"**
5. **Vuelve a desplegar**

### Paso 2: Verificar la URL

1. **Abre `ui.js` y busca `GOOGLE_SCRIPT_URL`**
2. **Copia la URL**
3. **Ábrela en el navegador** (debería mostrar un error, esto es normal)
4. **Si muestra "401" o "No autorizado", el script no está desplegado correctamente**

### Paso 3: Verificar Permisos

1. **En Apps Script, ve a "Ver" > "Registros de ejecución"**
2. **Si ves errores de permisos, el script necesita autorización**
3. **Ejecuta manualmente el script una vez para autorizar permisos**

---

## 📝 Checklist de Diagnóstico

- [ ] El script está desplegado como "Aplicación web"
- [ ] El acceso está configurado como "Cualquiera"
- [ ] La URL en `ui.js` coincide con la URL del despliegue
- [ ] Aparecen ejecuciones nuevas en "Registros de ejecución" cuando envío un formulario
- [ ] Los logs muestran "doPost llamado"
- [ ] Los logs muestran "Fila insertada correctamente"
- [ ] Aparecen datos en Google Sheets

---

## 🆘 Si Nada Funciona

1. **Comparte los logs de Google Apps Script** (Ver > Registros de ejecución)
2. **Comparte la URL del script** (sin el ID completo por seguridad)
3. **Comparte los errores de la consola del navegador** (F12 > Console)

Con esta información podré ayudarte mejor.

---

## 💡 Nota Importante

**Con `no-cors`, el navegador NO puede verificar la respuesta del servidor.** Esto es normal y esperado con Google Apps Script. La única forma de saber si funcionó es:

1. ✅ Verificar en Google Sheets si llegaron los datos
2. ✅ Verificar en los logs de Google Apps Script si se ejecutó `doPost`

Si ambos muestran que funcionó, entonces está funcionando correctamente, aunque el navegador no pueda confirmarlo.

