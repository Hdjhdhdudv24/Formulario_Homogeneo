/**
 * Google Apps Script para recibir datos del formulario
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

function doPost(e) {
  try {
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
    
    // Parsear el JSON recibido
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No se recibieron datos');
    }
    
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
    
    // Insertar en la hoja
    sheet.appendRow(row);
    
    // Devolver éxito con headers CORS para desarrollo
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Datos guardados correctamente',
      submission_id: data.submission_id
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // En caso de error, devolver mensaje
    Logger.log('Error en doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
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

