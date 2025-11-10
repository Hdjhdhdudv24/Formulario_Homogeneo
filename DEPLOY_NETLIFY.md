# 🚀 Deploy a Netlify con GitHub

## Paso 1: Crear el Repositorio en GitHub

1. Ve a https://github.com/new
2. **Repository name**: `Formulario_Homogeneos`
3. **Description**: "Formulario de declaración de asegurabilidad PWA - Seguros Bolívar"
4. **Visibility**: Elige Público o Privado (según prefieras)
5. **NO marques** "Add a README file" (ya tenemos archivos)
6. Haz clic en **"Create repository"**

## Paso 2: Conectar el Repo Local con GitHub

Después de crear el repo, GitHub te mostrará instrucciones. Ejecuta estos comandos en la terminal (en esta carpeta):

```bash
git remote add origin https://github.com/kevinhr2304/Formulario_Homogeneos.git
git branch -M main
git push -u origin main
```

**Nota:** Si GitHub te pide autenticación, usa un Personal Access Token en lugar de tu contraseña.

### Si necesitas crear un Personal Access Token:

1. Ve a https://github.com/settings/tokens
2. Click en "Generate new token" > "Generate new token (classic)"
3. Dale un nombre como "Netlify Deploy"
4. Selecciona el scope `repo` (todos los permisos de repo)
5. Genera y **copia el token** (solo se muestra una vez)
6. Úsalo como contraseña cuando git te pida autenticación

## Paso 3: Conectar con Netlify

### Opción A: Desde GitHub (Recomendado)

1. Ve a https://app.netlify.com
2. Si no tienes cuenta, créala con GitHub (es gratis)
3. Click en **"Add new site"** > **"Import an existing project"**
4. Selecciona **"GitHub"** y autoriza Netlify
5. Busca y selecciona el repo `Formulario_Homogeneos`
6. Netlify detectará automáticamente la configuración:
   - **Build command**: (dejar vacío, es un sitio estático)
   - **Publish directory**: `.` (punto)
7. Click en **"Deploy site"**

### Opción B: Drag & Drop (Más Rápido para Pruebas)

1. Ve a https://app.netlify.com/drop
2. Arrastra toda la carpeta del proyecto
3. ¡Listo! Te dará una URL temporal

**Nota:** Con drag & drop tendrás que volver a subir manualmente cada vez que hagas cambios. La Opción A se actualiza automáticamente.

## Paso 4: Configurar Variables (Opcional)

Si quieres cambiar la URL del Google Script desde Netlify:

1. En Netlify, ve a tu sitio > **Site settings** > **Environment variables**
2. Añade: `GOOGLE_SCRIPT_URL` con tu URL del script
3. Actualiza `ui.js` para leerla: `const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '...'`

## Paso 5: Personalizar la URL (Opcional)

1. En Netlify, ve a **Site settings** > **Change site name**
2. Cambia a algo como `formulario-seguros-bolivar` (si está disponible)
3. Tu URL será: `https://formulario-seguros-bolivar.netlify.app`

## ✅ Verificar que Funciona

1. Abre tu URL de Netlify
2. Abre DevTools > Application > Service Workers
3. Verifica que el Service Worker esté registrado
4. Prueba llenar un formulario y verificar que se guarde en Google Sheets

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Netlify detectará el push y desplegará automáticamente en ~2 minutos.

---

## 🆘 Troubleshooting

### El Service Worker no funciona
- Verifica que estés usando HTTPS (Netlify lo da automáticamente)
- Revisa la consola del navegador para errores

### Los datos no se guardan en Google Sheets
- Verifica que la URL del script esté correcta en `ui.js`
- Revisa que el script de Google esté desplegado como "Aplicación web" con acceso "Cualquiera"

### Error 404 en Netlify
- Verifica que `index.html` esté en la raíz del proyecto
- Asegúrate de que el "Publish directory" sea `.` (punto)

