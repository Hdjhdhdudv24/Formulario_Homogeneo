/**
 * Google Apps Script para recibir datos del formulario y enviar correo
 * 
 * INSTRUCCIONES:
 * 1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1DQEXdDxKK-zK-Fb69mV899A91DepD6GLycOsosS6Z2c/edit
 * 2. Ve a Extensiones > Apps Script
 * 3. Pega este código completo
 * 4. Guarda el proyecto (Ctrl+S)
 * 5. Haz clic en "Desplegar" > "Nueva implementación"
 * 6. Tipo: "Aplicación web"
 * 7. Ejecutar como: "Yo"
 * 8. Quién tiene acceso: "Cualquiera"
 * 9. Haz clic en "Desplegar"
 * 10. Copia la URL que te da (algo como: https://script.google.com/macros/s/.../exec)
 * 11. Pega esa URL en ui.js en la variable GOOGLE_SCRIPT_URL
 */

// Manejar CORS preflight (OPTIONS request)
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    Logger.log('=== doPost llamado ===');
    Logger.log('e.postData:', e.postData);
    Logger.log('e.parameter:', e.parameter);
    
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Crear encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'submission_id',
        'timestamp',
        'schema_version',
        'product',
        'contactEmail',
        'numApplicants',
        'applicants',
        'medical',
        'createdAt'
      ]);
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1b5e20');
      headerRange.setFontColor('#ffffff');
    }
    
    // Parsear el JSON recibido - intentar múltiples métodos
    let data;
    
    // Método 1: postData.contents (método estándar)
    if (e.postData && e.postData.contents) {
      Logger.log('Parseando desde postData.contents');
      data = JSON.parse(e.postData.contents);
    }
    // Método 2: parameter.data (si viene como parámetro)
    else if (e.parameter && e.parameter.data) {
      Logger.log('Parseando desde parameter.data');
      data = JSON.parse(e.parameter.data);
    }
    // Método 3: leer directamente del body
    else if (e.postData && e.postData.type === 'application/json') {
      Logger.log('Parseando desde postData directo');
      data = JSON.parse(e.postData.contents);
    }
    else {
      Logger.log('ERROR: No se encontraron datos en ningún formato');
      Logger.log('e completo:', JSON.stringify(e));
      throw new Error('No se recibieron datos. Verifica el formato del request.');
    }
    
    // Log datos sin imagen para no saturar logs
    const dataForLog = {};
    for (var key in data) {
      if (key === 'imageBase64' && data[key]) {
        const imageSizeKB = (data[key].length * 3) / 4 / 1024;
        dataForLog[key] = '[IMAGEN: ' + imageSizeKB.toFixed(2) + 'KB]';
      } else {
        dataForLog[key] = data[key];
      }
    }
    Logger.log('Datos recibidos:', JSON.stringify(dataForLog));
    
    // Validar que tenga submission_id (idempotencia)
    if (!data.submission_id) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Falta submission_id'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Verificar si ya existe este submission_id (evitar duplicados)
    const existingData = sheet.getDataRange().getValues();
    const submissionIdCol = 0; // Columna A
    const exists = existingData.slice(1).some(row => row[submissionIdCol] === data.submission_id); // slice(1) para saltar encabezado
    
    if (exists) {
      // Ya existe, devolver éxito (idempotencia)
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Submission ya procesado',
        submission_id: data.submission_id
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Preparar fila para insertar
    const timestamp = new Date().toISOString();
    const row = [
      data.submission_id,                    // A: submission_id
      timestamp,                              // B: timestamp
      data.schema_version || '',              // C: schema_version
      data.product || '',                     // D: product
      data.contactEmail || '',               // E: contactEmail
      data.numApplicants || 0,               // F: numApplicants
      JSON.stringify(data.applicants || []),  // G: applicants (JSON)
      JSON.stringify(data.medical || []),     // H: medical (JSON)
      data.createdAt || timestamp            // I: createdAt
    ];
    
    // Insertar en la hoja PRIMERO (antes de procesar imagen)
    Logger.log('Insertando fila en la hoja...');
    sheet.appendRow(row);
    Logger.log('Fila insertada correctamente');
    
    // Devolver éxito INMEDIATAMENTE para evitar timeout
    // El correo se enviará en segundo plano si es posible
    Logger.log('Devolviendo respuesta exitosa (antes de enviar correo)');
    const response = ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Datos guardados correctamente',
      submission_id: data.submission_id
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
    // Intentar enviar correo (pero no bloquear la respuesta)
    if (data.contactEmail) {
      Logger.log('Verificando envío de correo...');
      Logger.log('contactEmail:', data.contactEmail);
      Logger.log('tiene imageBase64:', !!data.imageBase64);
      
      try {
        if (data.imageBase64) {
          // Validar tamaño de imagen antes de procesar
          const imageSizeKB = (data.imageBase64.length * 3) / 4 / 1024;
          Logger.log('Tamaño de imagen:', imageSizeKB.toFixed(2), 'KB');
          
          if (imageSizeKB > 2000) {
            Logger.log('Imagen muy grande, enviando correo sin imagen');
            // Enviar correo sin imagen si es muy grande
            MailApp.sendEmail({
              to: data.contactEmail,
              subject: 'Formulario de Asegurabilidad - Seguros Bolívar',
              body: `Estimado/a entrevistador/a,\n\nSe ha recibido y procesado correctamente el formulario de declaración de asegurabilidad.\n\nDetalles:\n- ID de envío: ${data.submission_id}\n- Fecha: ${new Date().toLocaleString('es-ES')}\n\nNota: La imagen del formulario no pudo ser adjuntada debido a su tamaño.\n\nAtentamente,\nSistema de Formularios - Seguros Bolívar`,
              name: 'Seguros Bolívar - Sistema de Formularios'
            });
          } else {
            Logger.log('Enviando correo con imagen...');
            sendEmailWithImage(data.contactEmail, data.submission_id, data.imageBase64);
            Logger.log('Correo enviado exitosamente');
          }
        } else {
          Logger.log('No hay imagen para enviar en el correo');
          // Enviar correo sin imagen
          MailApp.sendEmail({
            to: data.contactEmail,
            subject: 'Formulario de Asegurabilidad - Seguros Bolívar',
            body: `Estimado/a entrevistador/a,\n\nSe ha recibido y procesado correctamente el formulario de declaración de asegurabilidad.\n\nDetalles:\n- ID de envío: ${data.submission_id}\n- Fecha: ${new Date().toLocaleString('es-ES')}\n\nAtentamente,\nSistema de Formularios - Seguros Bolívar`,
            name: 'Seguros Bolívar - Sistema de Formularios'
          });
          Logger.log('Correo sin imagen enviado exitosamente');
        }
      } catch (emailError) {
        Logger.log('Error al enviar correo: ' + emailError.toString());
        // No fallar el proceso si el correo falla - los datos ya están guardados
      }
    } else {
      Logger.log('No hay contactEmail, no se enviará correo');
    }
    
    return response;
    
  } catch (error) {
    // En caso de error, devolver mensaje
    Logger.log('ERROR en doPost: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: 'Error al procesar el formulario'
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para enviar correo con imagen adjunta
function sendEmailWithImage(email, submissionId, imageBase64) {
  try {
    // Detectar formato de imagen (JPEG o PNG)
    const isJPEG = imageBase64.length < 1000000; // JPEGs comprimidos son generalmente más pequeños
    const mimeType = isJPEG ? 'image/jpeg' : 'image/png';
    const fileName = isJPEG ? 'formulario-asegurabilidad.jpg' : 'formulario-asegurabilidad.png';
    
    // Convertir base64 a blob
    const imageBlob = Utilities.newBlob(
      Utilities.base64Decode(imageBase64),
      mimeType,
      fileName
    );
    
    // Preparar el cuerpo del correo
    const subject = 'Formulario de Asegurabilidad - Seguros Bolívar';
    const body = `
Estimado/a entrevistador/a,

Se ha recibido y procesado correctamente el formulario de declaración de asegurabilidad.

Detalles:
- ID de envío: ${submissionId}
- Fecha: ${new Date().toLocaleString('es-ES')}

Adjunto encontrará una imagen del formulario completado.

Este es un correo automático, por favor no responda.

Atentamente,
Sistema de Formularios - Seguros Bolívar
    `.trim();
    
    // Enviar correo
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body,
      attachments: [imageBlob],
      name: 'Seguros Bolívar - Sistema de Formularios'
    });
    
    Logger.log('Correo enviado exitosamente a: ' + email);
    
  } catch (error) {
    Logger.log('Error al enviar correo: ' + error.toString());
    throw error;
  }
}

// Función para crear los encabezados si la hoja está vacía
function onOpen() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'submission_id',
      'timestamp',
      'schema_version',
      'product',
      'contactEmail',
      'numApplicants',
      'applicants',
      'medical',
      'createdAt'
    ]);
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1b5e20');
    headerRange.setFontColor('#ffffff');
  }
}
