# 🧪 Guía Completa de Pruebas

## ✅ Checklist Pre-Pruebas

Antes de probar, verifica:

- [ ] El sitio está desplegado en: https://formulariohomogeneo.netlify.app
- [ ] Google Apps Script configurado (si quieres probar el guardado en Sheets)
- [ ] Tienes acceso a DevTools del navegador (F12)

---

## 1️⃣ Pruebas Básicas de Funcionalidad

### Test 1: Carga Inicial
1. Abre https://formulariohomogeneo.netlify.app
2. **Verifica:**
   - ✅ La página carga correctamente
   - ✅ El logo de Seguros Bolívar aparece
   - ✅ El indicador "En línea" está visible
   - ✅ El formulario se muestra completo

### Test 2: Llenar Formulario Básico
1. Llena el formulario con datos de prueba:
   - Correo: `test@ejemplo.com`
   - Producto: Selecciona "Salud Individual"
   - Número de solicitantes: 1
   - Datos del solicitante:
     - Nombre: "Juan Pérez"
     - Tipo ID: CC
     - Número ID: "1234567890"
     - Edad: 30
     - Sexo: M
     - Peso: 75
     - Estatura: 175

2. **Verifica:**
   - ✅ Todos los campos se llenan correctamente
   - ✅ No hay errores de validación

### Test 3: Múltiples Solicitantes
1. Cambia "Número de solicitantes" a 3
2. **Verifica:**
   - ✅ Aparecen 3 filas en la tabla
   - ✅ Puedes llenar datos de cada uno
   - ✅ Los nombres se actualizan en el cuestionario médico

### Test 4: Cuestionario Médico
1. Marca "SÍ" en alguna pregunta (ej: "Enfermedades del corazón")
2. **Verifica:**
   - ✅ Aparecen los chips de selección de solicitantes
   - ✅ Puedes seleccionar múltiples solicitantes
   - ✅ Aparecen subformularios para cada solicitante seleccionado
   - ✅ Puedes llenar diagnóstico, fechas, complicaciones, estado

3. Llena datos en los subformularios
4. **Verifica:**
   - ✅ Los datos se guardan correctamente

### Test 5: Vista Previa y Descarga JSON
1. Haz clic en "Vista previa"
2. **Verifica:**
   - ✅ Se muestra el JSON estructurado
   - ✅ Tiene `submission_id`, `schema_version`, `applicants`, `medical`
   - ✅ El formato es correcto

3. Haz clic en "Descargar JSON"
4. **Verifica:**
   - ✅ Se descarga un archivo JSON
   - ✅ El contenido es correcto

---

## 2️⃣ Pruebas de PWA (Service Worker)

### Test 6: Registro de Service Worker
1. Abre DevTools (F12) > **Application** > **Service Workers**
2. **Verifica:**
   - ✅ El Service Worker está registrado
   - ✅ Estado: "activated and is running"
   - ✅ Scope: `https://formulariohomogeneo.netlify.app/`

### Test 7: Cache del App Shell
1. En DevTools > **Application** > **Cache Storage**
2. **Verifica:**
   - ✅ Existe un cache llamado `seguros-bolivar-ph041-v2`
   - ✅ Contiene: index.html, styles.css, ui.js, manifest.json, etc.

### Test 8: Funcionalidad Offline
1. En DevTools > **Network** > Marca la casilla **"Offline"**
2. Recarga la página (F5)
3. **Verifica:**
   - ✅ La página carga normalmente
   - ✅ El formulario es funcional
   - ✅ Puedes llenar datos
   - ✅ El indicador cambia a "Sin conexión"

4. Desmarca "Offline" y recarga
5. **Verifica:**
   - ✅ Vuelve a "En línea"

### Test 9: Página Offline
1. Con "Offline" activado, intenta navegar a una ruta que no existe
2. **Verifica:**
   - ✅ Se muestra `offline.html` con mensaje apropiado

---

## 3️⃣ Pruebas de Cola de Envíos

### Test 10: Envío Offline
1. Llena un formulario completo
2. Activa "Offline" en DevTools
3. Haz clic en "Continuar"
4. **Verifica:**
   - ✅ Aparece notificación: "Sin conexión. Datos guardados localmente..."
   - ✅ Aparece el botón "Reintentar envíos"
   - ✅ Los datos se guardan en IndexedDB

5. En DevTools > **Application** > **IndexedDB** > **SegurosBolivarDB**
6. **Verifica:**
   - ✅ Existe la tabla `submissionQueue`
   - ✅ Hay un item con status "pending"

### Test 11: Sincronización Automática
1. Con un envío pendiente en la cola
2. Desactiva "Offline" (vuelve a estar online)
3. **Verifica:**
   - ✅ Aparece notificación: "Conexión restaurada. Sincronizando datos..."
   - ✅ El item se intenta enviar automáticamente
   - ✅ Si Google Sheets está configurado, se guarda
   - ✅ El botón "Reintentar envíos" desaparece si todo se envió

### Test 12: Botón Manual de Reintento
1. Con items pendientes en la cola
2. Haz clic en "Reintentar envíos"
3. **Verifica:**
   - ✅ El botón muestra "Reintentando..."
   - ✅ Se intentan enviar los items
   - ✅ Aparece notificación del resultado

---

## 4️⃣ Pruebas de Manifest PWA

### Test 13: Manifest Válido
1. DevTools > **Application** > **Manifest**
2. **Verifica:**
   - ✅ Name: "Declaración de Asegurabilidad - Seguros Bolívar"
   - ✅ Short name: "Asegurabilidad SB"
   - ✅ Start URL: correcto
   - ✅ Theme color: #1b5e20
   - ⚠️ Icons: Puede mostrar advertencia si no existen (no crítico)

### Test 14: Instalación PWA (Desktop)
1. En la barra de direcciones, busca el ícono de instalación
2. O ve a: Menú > "Instalar Formulario..."
3. **Verifica:**
   - ✅ Se puede instalar
   - ✅ Se abre como app independiente
   - ✅ Funciona sin conexión

### Test 15: Instalación PWA (Android)
1. Abre el sitio en Chrome Android
2. Menú > "Agregar a pantalla de inicio"
3. **Verifica:**
   - ✅ Se crea el ícono en la pantalla de inicio
   - ✅ Se abre como app independiente
   - ✅ Funciona sin conexión

---

## 5️⃣ Pruebas de Integración con Google Sheets

### Test 16: Configuración del Script
1. Asegúrate de haber desplegado el Google Apps Script
2. Verifica que la URL esté en `ui.js` línea 508
3. **Verifica:**
   - ✅ La URL no es el placeholder `TU_SCRIPT_ID`

### Test 17: Envío a Google Sheets
1. Llena un formulario completo
2. Asegúrate de estar online
3. Haz clic en "Continuar"
4. **Verifica:**
   - ✅ Aparece notificación de éxito
   - ✅ Abre tu Google Sheet
   - ✅ Se agregó una nueva fila con los datos
   - ✅ Los datos están en las columnas correctas

### Test 18: Idempotencia (Evitar Duplicados)
1. Intenta enviar el mismo formulario dos veces (mismo submission_id)
2. **Verifica:**
   - ✅ Solo se guarda una vez en Google Sheets
   - ✅ El script detecta duplicados

---

## 6️⃣ Pruebas de Actualización de Service Worker

### Test 19: Detección de Actualizaciones
1. Modifica algún archivo (ej: cambia un texto en index.html)
2. Haz commit y push a GitHub
3. Espera ~2 minutos a que Netlify despliegue
4. Recarga la página
5. **Verifica:**
   - ✅ Aparece banner: "🔄 Nueva versión disponible"
   - ✅ Al hacer clic en "Actualizar ahora", se recarga con la nueva versión

---

## 7️⃣ Pruebas de Rendimiento y UX

### Test 20: Responsive Design
1. Abre DevTools > Toggle device toolbar (Ctrl+Shift+M)
2. Prueba diferentes tamaños: Mobile (375px), Tablet (768px), Desktop
3. **Verifica:**
   - ✅ El diseño se adapta correctamente
   - ✅ Los formularios son usables en móvil
   - ✅ Los botones son accesibles

### Test 21: Validaciones
1. Intenta enviar el formulario sin llenar campos requeridos
2. **Verifica:**
   - ✅ El navegador muestra mensajes de validación
   - ✅ No se puede enviar sin datos requeridos

### Test 22: Notificaciones
1. Prueba diferentes escenarios que generan notificaciones
2. **Verifica:**
   - ✅ Las notificaciones aparecen en la esquina superior derecha
   - ✅ Desaparecen después de 4 segundos
   - ✅ Los colores son apropiados (verde=éxito, amarillo=advertencia, azul=info)

---

## 🐛 Problemas Comunes y Soluciones

### El Service Worker no se registra
- **Causa:** No estás usando HTTPS o localhost
- **Solución:** Asegúrate de usar https://formulariohomogeneo.netlify.app

### Los iconos no aparecen
- **Causa:** Los archivos icon-192.png e icon-512.png no existen
- **Solución:** No crítico, la PWA funciona sin ellos. Para añadirlos, genera iconos desde el logo.

### Los datos no se guardan en Google Sheets
- **Causa 1:** La URL del script no está configurada
- **Solución:** Revisa `ui.js` línea 508
- **Causa 2:** El script no está desplegado como "Aplicación web"
- **Solución:** Revisa las instrucciones en `GoogleAppsScript.js`

### El formulario no funciona offline
- **Causa:** El Service Worker no está activo
- **Solución:** Ve a DevTools > Application > Service Workers > "Unregister" y recarga

### Error 404 en Netlify
- **Causa:** Rutas incorrectas
- **Solución:** Verifica que todas las rutas usen `./` (relativas)

---

## 📊 Métricas de Éxito

Tu aplicación está lista para producción si:

- ✅ Todos los tests 1-15 pasan
- ✅ El Service Worker funciona offline
- ✅ Los datos se guardan correctamente (local y Google Sheets)
- ✅ La PWA es instalable
- ✅ No hay errores en la consola (DevTools > Console)

---

## 🎯 Próximos Pasos Opcionales

1. **Generar iconos PWA:** Crea icon-192.png e icon-512.png desde el logo
2. **Añadir analytics:** Google Analytics o similar
3. **Mejorar validaciones:** Validaciones más estrictas en el frontend
4. **Añadir tests automatizados:** Jest, Cypress, etc.
5. **Optimizar imágenes:** Comprimir el logo si es muy pesado

---

¡Listo para probar! 🚀

