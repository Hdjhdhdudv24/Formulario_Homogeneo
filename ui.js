// ===== Applicants dynamic table =====
const table = document.getElementById('applicantsTable');
const numApplicants = document.getElementById('numApplicants');
const form = document.getElementById('form');

const thead = `
  <div class="thead">
    <div>Nombre y apellidos</div>
    <div>Tipo identificación</div>
    <div>No. Identificación</div>
    <div>Edad</div>
    <div>Sexo</div>
    <div>Peso (kg)</div>
    <div>Estatura (cm)</div>
  </div>`;

function renderApplicants(n=1){
  const rows = [];
  for(let i=1;i<=n;i++){
    rows.push(`
      <div class="row" data-index="${i}">
        <input name="a${i}_name" placeholder="Solicitante ${i}" required />
        <select name="a${i}_idType">
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="TI">TI</option>
          <option value="PA">Pasaporte</option>
        </select>
        <input name="a${i}_id" placeholder="Documento" required />
        <input name="a${i}_age" type="number" min="0" max="120" placeholder="Edad" required />
        <select name="a${i}_sex">
          <option value="M">M</option><option value="F">F</option><option value="X">X</option>
        </select>
        <input name="a${i}_weight" type="number" step="0.1" min="0" placeholder="kg" />
        <input name="a${i}_height" type="number" step="1" min="30" placeholder="cm" />
      </div>
    `);
  }
  table.innerHTML = thead + rows.join('');
}
renderApplicants(parseInt(numApplicants.value,10));
numApplicants.addEventListener('change', e => {
  const value = parseInt(e.target.value,10);
  renderApplicants(value);
  renderQuestions();
  updateApplicantLabels();
});

// ===== Questions =====
const questions = [
  {
    id: 1,
    code: "Q1_CARDIO",
    title: "1. ¿Enfermedades del corazón o del sistema cardiovascular?",
    hint:
      "Hipertensión arterial, arritmias, enfermedad coronaria, infarto cardíaco, angina, afecciones de las válvulas del corazón, evento cerebrovascular, tromboembolismo, trombosis, accidente isquémico transitorio, aneurismas."
  },
  {
    id: 2,
    code: "Q2_ENDOCRINO",
    title: "2. ¿Enfermedades endocrinas, metabólicas?",
    hint:
      "Diabetes, pre diabetes, resistencia a la insulina, nódulos tiroideos, hipertiroidismo, hiperprolactinemia, Enfermedad de Graves, obesidad, Enfermedad de Addison, Enfermedad de Cushing, cirugía bariátrica."
  },
  {
    id: 3,
    code: "Q3_MEDICACION",
    title:
      "3. ¿Está tomando algún medicamento actualmente o está bajo algún tratamiento médico, terapia y/o rehabilitación?",
    hint:
      "Física, psicología, fonoaudiología, ocupacional, neuropsicología. En caso afirmativo indique nombre de medicamento y/o tratamiento y el diagnóstico."
  },
  { id: 4, code: "Q4_EMBARAZO", title: "4. MUJERES ¿Está embarazada actualmente o sospecha que está embarazada?", hint: "" },
  {
    id: 5,
    code: "Q5_AUTOINMUNE",
    title: "5. ¿Enfermedades autoinmunes o del colágeno?",
    hint:
      "Lupus, artritis reumatoidea, vasculitis, espondilitis, colitis ulcerativa, esclerodermia, glomerulopatías o enfermedad del colágeno no determinada, miastenia gravis, síndrome de Sjögren, esclerosis lateral amiotrófica, fibrosis quística, enfermedades huérfanas, artritis psoriásica, espondilitis anquilosante."
  },
  {
    id: 6,
    code: "Q6_NEURO",
    title: "6. ¿Enfermedades o eventos neurológicos y/o lesión en órganos de los sentidos?",
    hint:
      "Evento cerebrovascular, accidente isquémico transitorio, trombosis, epilepsia, convulsiones, esclerosis múltiple, Alzheimer, Guillain-Barré, parálisis, tumores cerebrales, migraña o cefaleas crónicas, neuralgias, meningitis, aneurismas cerebrales, fístulas, hidrocefalia, Parkinson, TEC (Traumatismo craneoencefálico), neuropatías; y/o pérdida o disminución visual, pérdida o disminución auditiva, desviación del tabique nasal."
  },
  {
    id: 7,
    code: "Q7_PSIQ",
    title: "7. ¿Alteración del desarrollo y/o desorden psiquiátrico?",
    hint:
      "Depresión, ansiedad, trastorno bipolar, esquizofrenia, déficit de atención, hiperactividad, trastorno del espectro autista, alteraciones del lenguaje o desarrollo psicomotor, trastornos alimenticios, autismo, dependencia al alcohol, consumo y/o dependencia a drogas ilícitas o psicotrópicas, demencia."
  },
  {
    id: 8,
    code: "Q8_OSEO",
    title: "8. ¿Enfermedades, amputaciones o lesiones de los huesos o articulaciones?",
    hint:
      "Hombro, tobillo, rodillas, cadera, codo, dedos de las manos, muñeca, dedos de los pies, afecciones en meniscos, luxaciones, artrosis, fracturas, desviaciones de la columna, hernias discales, osteoporosis, distrofia muscular, gota, artritis gotosa o síndrome de Lobstein."
  },
  {
    id: 9,
    code: "Q9_PULMONAR",
    title: "9. ¿Enfermedades pulmonares?",
    hint:
      "Asma, EPOC (enfermedad pulmonar obstructiva crónica), síndrome bronco obstructivo recurrente, nódulos pulmonares, fibrosis pulmonar, enfisema pulmonar, trasplante pulmonar."
  },
  {
    id: 10,
    code: "Q10_CANCER",
    title: "10. ¿Cáncer o similares?",
    hint:
      "Linfoma, leucemia, tumores, masas, nódulos, quistes, lesiones premalignas, pólipos, lipomas, bromas, nevos o lunares; mujeres: nódulos mamarios."
  },
  {
    id: 11,
    code: "Q11_UROGENITAL",
    title: "11. ¿Enfermedades de riñones, próstata (hombres) o aparato urogenital?",
    hint:
      "Cálculos, cólico renal, hiperplasia de la próstata, insuficiencia renal, glomerulonefritis, sangre en la orina, proteínas en la orina, síndrome nefrótico, infección de vías urinarias recurrentes, incontinencia urinaria, cistocele, prolapso uterino, vejiga neurógena."
  },
  {
    id: 12,
    code: "Q12_GASTRO",
    title: "12. ¿Enfermedades del hígado, gástricas, colón?",
    hint:
      "Cirrosis, hepatitis C, pólipos en colon, úlceras, colitis, divertículos, enfermedad por reflujo gastroesofágico, esófago de Barrett, hernia(s) (diafragmática, hiatal, inguinal, umbilical), cálculos biliares, pancreatitis aguda y/o crónica, enfermedad de Crohn, sangrados del tubo digestivo, rectocele."
  },
  {
    id: 13,
    code: "Q13_HEMATO",
    title: "13. ¿Enfermedades de la sangre o infecciosas?",
    hint:
      "Trastornos de la coagulación, talasemia, trombocitopenia, leucopenia, anemia actual, leucemia, hemofilia, infección por VIH y/o VIH-SIDA, púrpura trombocitopénica, síndrome antifosfolípidos, virus del papiloma humano."
  },
  {
    id: 14,
    code: "Q14_PENDIENTE",
    title:
      "14. ¿Algún tratamiento médico y/o quirúrgico pendiente? ¿Y/o alguna enfermedad no mencionada en las preguntas anteriores o enfermedades congénitas/genéticas o malformaciones?",
    hint: "Si su respuesta es afirmativa, por favor ampliarla."
  },
  {
    id: 15,
    code: "Q15_DISCAPACIDAD",
    title:
      "15. ¿Algún tipo de discapacidad que le impida desempeñar sus tareas diarias o ha tenido en el último año alguna incapacidad médica por tiempo mayor a 1 mes?",
    hint: "Detalle la discapacidad del titular y/o dependiente."
  }
];

const qContainer = document.getElementById('questions');

function getApplicantsSnapshot(){
  const fd = new FormData(form);
  const n = parseInt(fd.get('numApplicants')||'1',10);
  const list = [];
  for(let i=1;i<=n;i++){
    list.push({
      idx: i,
      name: fd.get(`a${i}_name`) || `Solicitante ${i}`
    });
  }
  return list;
}

function toNumber(value){
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function uuidv4(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random()*16|0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function makeQuestionHTML(q){
  const applicants = getApplicantsSnapshot();
  const whoHTML = applicants.map(a => `
      <label class="who-chip">
        <input type="checkbox" data-applicant="${a.idx}" name="q${q.id}_who_a${a.idx}" value="${a.idx}">
        <span data-applicant-label="${a.idx}">${a.idx}. ${a.name}</span>
      </label>
  `).join('');
  const formsHTML = applicants.map(a => `
      <div class="who-form hidden" data-applicant="${a.idx}">
        <div class="who-form-header" data-applicant-label="${a.idx}">${a.idx}. ${a.name}</div>
        <div class="who-form-grid">
          <label class="field">
            <span>Diagnóstico</span>
            <input name="q${q.id}_a${a.idx}_diagnosis" placeholder="Diagnóstico principal">
          </label>
          <label class="field">
            <span>Fechas / evolución</span>
            <input name="q${q.id}_a${a.idx}_dates" placeholder="Ej: 2018 - actualidad">
          </label>
          <label class="field">
            <span>Complicaciones / secuelas</span>
            <textarea name="q${q.id}_a${a.idx}_complications" rows="2" placeholder="Detalle complicaciones relevantes"></textarea>
          </label>
          <label class="field">
            <span>Estado actual</span>
            <input name="q${q.id}_a${a.idx}_status" placeholder="Estable / En tratamiento / Controlado ...">
          </label>
        </div>
      </div>
  `).join('');
  return `
  <div class="q-item" data-q="${q.id}">
    <div class="q-head">
      <div class="q-title">${q.title} ${q.hint ? ('<span class="badge">Ej.: ' + q.hint + '</span>') : ''}</div>
      <div class="q-controls">
        <label class="switch"><input type="radio" name="q${q.id}_ans" value="NO" checked> NO</label>
        <label class="switch"><input type="radio" name="q${q.id}_ans" value="YES"> SÍ</label>
      </div>
    </div>
    <div class="q-body">
      <div class="field">
        <span>¿A qué solicitantes aplica?</span>
        <div class="who-list">${whoHTML || '<span class="muted">Agrega solicitantes para habilitar esta sección.</span>'}</div>
      </div>
      <div class="who-forms">
        ${formsHTML}
      </div>
    </div>
  </div>`;
}

function renderQuestions(){
  qContainer.innerHTML = questions.map(makeQuestionHTML).join('');
  // handlers
  qContainer.querySelectorAll('.q-item').forEach(item => {
    const head = item.querySelector('.q-head');
    const body = item.querySelector('.q-body');
    const checkboxes = item.querySelectorAll('.who-chip input[type=checkbox]');
    function syncForms(){
      checkboxes.forEach(cb=>{
        const formEl = item.querySelector(`.who-form[data-applicant="${cb.value}"]`);
        if (!formEl) return;
        const isActive = cb.checked;
        formEl.classList.toggle('hidden', !isActive);
        formEl.classList.toggle('who-form-active', isActive);
        if (!isActive){
          formEl.querySelectorAll('input, textarea').forEach(node => {
            if (node.value) node.value = '';
          });
        }
      });
    }
    head.addEventListener('click', (e)=>{
      if (e.target.tagName.toLowerCase() === 'input') return; // ignore radios
      body.classList.toggle('open');
    });
    // Show body only if answer is SI
    const radios = item.querySelectorAll('input[type=radio][name^=q][name$=_ans]');
    function refresh(){
      const val = [...radios].find(r=>r.checked)?.value || 'NO';
      const isYes = val === 'YES';
      body.classList.toggle('open', isYes);
      if (!isYes){
        let changed = false;
        checkboxes.forEach(cb=>{
          if (cb.checked){
            cb.checked = false;
            changed = true;
          }
        });
        if (changed) syncForms();
      }
    }
    radios.forEach(r=> r.addEventListener('change', refresh));
    checkboxes.forEach(cb=> cb.addEventListener('change', syncForms));
    refresh();
    syncForms();
  });
}

function updateApplicantLabels(){
  const snapshot = getApplicantsSnapshot();
  snapshot.forEach(applicant=>{
    const labelText = `${applicant.idx}. ${applicant.name || `Solicitante ${applicant.idx}`}`;
    document.querySelectorAll(`[data-applicant-label="${applicant.idx}"]`).forEach(el=>{
      el.textContent = labelText;
    });
  });
}

renderQuestions();
updateApplicantLabels();

// ===== Preview (collect form to JSON) =====
const btnPreview = document.getElementById('btnPreview');
const btnDownload = document.getElementById('btnDownload');
const prevWrap = document.getElementById('preview');
const prevJson = document.getElementById('previewJson');

// Esperar a que html2canvas se cargue antes de configurar el botón de descarga
function waitForHtml2Canvas(callback, maxAttempts = 100) {
  // Verificar si ya está disponible
  if (typeof html2canvas !== 'undefined' && (window.html2canvasReady || typeof html2canvas === 'function')) {
    callback();
    return;
  }
  
  // Escuchar el evento personalizado
  const handler = () => {
    if (typeof html2canvas !== 'undefined') {
      window.removeEventListener('html2canvasReady', handler);
      callback();
    }
  };
  window.addEventListener('html2canvasReady', handler);
  
  // Fallback: intentar cada 100ms
  if (maxAttempts > 0) {
    setTimeout(() => {
      if (typeof html2canvas !== 'undefined') {
        window.removeEventListener('html2canvasReady', handler);
        callback();
      } else {
        waitForHtml2Canvas(callback, maxAttempts - 1);
      }
    }, 100);
  } else {
    console.error('html2canvas no se cargó después de 10 segundos');
    window.removeEventListener('html2canvasReady', handler);
  }
}

// Función para generar imagen del formulario en base64
async function generateFormImage() {
  return new Promise(async (resolve, reject) => {
    try {
      // Verificar que html2canvas esté disponible
      if (typeof html2canvas === 'undefined') {
        reject(new Error('html2canvas no está disponible'));
        return;
      }
      
      const formElement = document.getElementById('form');
      if (!formElement) {
        reject(new Error('No se encontró el formulario'));
        return;
      }
      
      // Ocultar elementos que no queremos en la captura
      const actionsDiv = formElement.querySelector('.actions');
      const swBanner = document.getElementById('swUpdateBanner');
      const previewSection = document.getElementById('preview');
      
      const originalActionsDisplay = actionsDiv ? actionsDiv.style.display : '';
      const originalBannerDisplay = swBanner ? swBanner.style.display : '';
      
      if (actionsDiv) actionsDiv.style.display = 'none';
      if (swBanner) swBanner.style.display = 'none';
      if (previewSection) previewSection.classList.add('hidden');
      
      // Esperar un momento para que se apliquen los cambios
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Capturar el formulario como imagen
      const canvas = await html2canvas(formElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        width: formElement.scrollWidth,
        height: formElement.scrollHeight,
        windowWidth: formElement.scrollWidth,
        windowHeight: formElement.scrollHeight
      });
      
      // Restaurar elementos ocultos
      if (actionsDiv) actionsDiv.style.display = originalActionsDisplay;
      if (swBanner) swBanner.style.display = originalBannerDisplay;
      if (previewSection) previewSection.classList.remove('hidden');
      
      // Convertir canvas a base64
      const base64 = canvas.toDataURL('image/png').split(',')[1]; // Remover el prefijo data:image/png;base64,
      resolve(base64);
      
    } catch (error) {
      reject(error);
    }
  });
}

// --- Data collection reusable ---
async function buildPayload(includeImage = false){
  const fd = new FormData(form);
  const n = parseInt(fd.get('numApplicants')||'1',10);
  const applicants = [];
  for(let i=1;i<=n;i++){
    applicants.push({
      idx:i,
      name: fd.get(`a${i}_name`)||'',
      idType: fd.get(`a${i}_idType`)||'',
      idNumber: fd.get(`a${i}_id`)||'',
      age: toNumber(fd.get(`a${i}_age`)),
      sex: fd.get(`a${i}_sex`)||'',
      weight: toNumber(fd.get(`a${i}_weight`)),
      height: toNumber(fd.get(`a${i}_height`))
    });
  }
  const medical = questions.map(q=>{
    const answer = fd.get(`q${q.id}_ans`) === 'YES' ? 'YES' : 'NO';
    const entry = {
      qCode: q.code,
      answer
    };
    if (answer === 'YES'){
      const appliesTo = [];
      const details = [];
      for(let i=1;i<=n;i++){
        if (fd.get(`q${q.id}_who_a${i}`)){
          appliesTo.push(i);
          details.push({
            idx: i,
            diagnosis: fd.get(`q${q.id}_a${i}_diagnosis`)||'',
            dates: fd.get(`q${q.id}_a${i}_dates`)||'',
            complications: fd.get(`q${q.id}_a${i}_complications`)||'',
            status: fd.get(`q${q.id}_a${i}_status`)||''
          });
        }
      }
      if (appliesTo.length) entry.appliesTo = appliesTo;
      if (details.length){
        entry.details = details;
      }
    }
    return entry;
  });
  
  const payload = {
    submission_id: uuidv4(),
    schema_version: 'ph041.v1',
    contactEmail: fd.get('contactEmail') || '',
    product: fd.get('product')||null,
    numApplicants: n,
    applicants,
    medical,
    createdAt: new Date().toISOString()
  };
  
  // Añadir imagen si se solicita
  if (includeImage) {
    try {
      payload.imageBase64 = await generateFormImage();
    } catch (error) {
      console.error('Error al generar imagen:', error);
      // Continuar sin imagen si falla
    }
  }
  
  return payload;
}

// --- Preview ---
btnPreview.addEventListener('click', async ()=>{
  const out = await buildPayload(false); // No incluir imagen en preview
  prevJson.textContent = JSON.stringify(out, null, 2);
  prevWrap.classList.remove('hidden');
});

// --- Download formulario como imagen ---
waitForHtml2Canvas(() => {
  btnDownload.addEventListener('click', async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    
    // Verificar que html2canvas esté disponible
    if (typeof html2canvas === 'undefined' || typeof html2canvas !== 'function') {
      alert('Error: La librería de captura no está cargada. Por favor, recarga la página.\n\nSi el problema persiste, verifica tu conexión a internet.');
      console.error('html2canvas no está disponible. Tipo:', typeof html2canvas);
      return;
    }
  
  // Mostrar indicador de carga
  const originalText = btnDownload.textContent;
  btnDownload.disabled = true;
  btnDownload.textContent = 'Generando imagen...';
  
  try {
    // Obtener el elemento del formulario completo (incluyendo el contenedor)
    const formElement = document.getElementById('form');
    if (!formElement) {
      throw new Error('No se encontró el formulario');
    }
    
    // Ocultar elementos que no queremos en la captura (botones de acción)
    const actionsDiv = formElement.querySelector('.actions');
    const swBanner = document.getElementById('swUpdateBanner');
    const previewSection = document.getElementById('preview');
    
    const originalActionsDisplay = actionsDiv ? actionsDiv.style.display : '';
    const originalBannerDisplay = swBanner ? swBanner.style.display : '';
    const originalPreviewDisplay = previewSection ? previewSection.style.display : '';
    
    if (actionsDiv) actionsDiv.style.display = 'none';
    if (swBanner) swBanner.style.display = 'none';
    if (previewSection) previewSection.classList.add('hidden');
    
    // Esperar un momento para que se apliquen los cambios
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Capturar el formulario como imagen
    const canvas = await html2canvas(formElement, {
      backgroundColor: '#ffffff',
      scale: 2, // Mayor calidad
      logging: false,
      useCORS: true,
      allowTaint: false,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      width: formElement.scrollWidth,
      height: formElement.scrollHeight,
      windowWidth: formElement.scrollWidth,
      windowHeight: formElement.scrollHeight
    });
    
    // Restaurar elementos ocultos
    if (actionsDiv) actionsDiv.style.display = originalActionsDisplay;
    if (swBanner) swBanner.style.display = originalBannerDisplay;
    if (previewSection) previewSection.classList.remove('hidden');
    
    // Convertir canvas a blob y descargar
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Error al generar la imagen');
      }
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const ts = new Date().toISOString().replace(/[:T]/g,'-').slice(0,19);
      a.href = url;
      a.download = `formulario-asegurabilidad-${ts}.png`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Limpiar después de un momento
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      // Restaurar botón
      btnDownload.disabled = false;
      btnDownload.textContent = originalText;
      
      showNotification('✓ Imagen descargada correctamente', 'success');
    }, 'image/png', 0.95);
    
  } catch (error) {
    console.error('Error al generar imagen:', error);
    showNotification('⚠️ Error al generar la imagen: ' + error.message, 'warning');
    btnDownload.disabled = false;
    btnDownload.textContent = originalText;
  }
  });
});

// --- Offline queue (IndexedDB) ---
// Migrado de localStorage a IndexedDB para mayor cuota y atomicidad
const DB_NAME = 'SegurosBolivarDB';
const DB_VERSION = 1;
const STORE_NAME = 'submissionQueue';

// Inicializar IndexedDB
let db = null;
function initDB() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: false });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('submission_id', 'payload.submission_id', { unique: true });
      }
    };
  });
}

// Cargar cola desde IndexedDB
async function loadQueue() {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error al cargar cola:', error);
    return [];
  }
}

// Guardar cola completa (reemplaza todo)
async function saveQueue(queue) {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Limpiar todo primero
      store.clear().onsuccess = () => {
        // Añadir todos los items
        if (queue.length === 0) {
          resolve();
          return;
        }
        let completed = 0;
        queue.forEach((item) => {
          const addRequest = store.add(item);
          addRequest.onsuccess = () => {
            completed++;
            if (completed === queue.length) resolve();
          };
          addRequest.onerror = () => reject(addRequest.error);
        });
      };
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error al guardar cola:', error);
  }
}

// Añadir item a la cola
async function enqueue(payload) {
  try {
    // Validar que payload tenga submission_id
    if (!payload.submission_id) {
      console.error('Payload debe tener submission_id');
      return;
    }
    
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Verificar si ya existe por submission_id (idempotencia)
      const index = store.index('submission_id');
      const checkRequest = index.get(payload.submission_id);
      
      checkRequest.onsuccess = () => {
        if (checkRequest.result) {
          console.log('Submission ya existe en cola:', payload.submission_id);
          resolve();
          return;
        }
        
        // Añadir nuevo item
        const item = {
          id: Date.now() + Math.random(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          payload
        };
        
        const addRequest = store.add(item);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      };
      
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error al encolar:', error);
  }
}

// URL del Google Apps Script desplegado
// Esta es la URL del script desplegado como "Aplicación web" en Google Apps Script
// Formato para organización: https://script.google.com/a/macros/segurosbolivar.com/s/.../exec
const GOOGLE_SCRIPT_URL = 'https://script.google.com/a/macros/segurosbolivar.com/s/AKfycbwRtUwJGQFnhOwZsXblhlCDXVDzpqldfA5tgt3KJqqB-XXsmmshHOXvUk4s4eiSekoDEA/exec';

// Función para enviar datos al servidor (Google Sheets via Apps Script)
// El backend debe ser idempotente: si recibe el mismo submission_id, devolver éxito sin duplicar
async function sendPayload(item, retryCount = 0) {
  if (!navigator.onLine) {
    console.log('[sendPayload] Sin conexión');
    return false;
  }
  
  // Backoff exponencial: 500ms, 1s, 2s, 4s...
  const delay = Math.min(500 * Math.pow(2, retryCount), 10000);
  if (retryCount > 0) {
    console.log(`[sendPayload] Reintentando (intento ${retryCount + 1}) después de ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  try {
    console.log('[sendPayload] Enviando payload:', {
      submission_id: item.payload.submission_id,
      contactEmail: item.payload.contactEmail,
      numApplicants: item.payload.numApplicants,
      hasImage: !!item.payload.imageBase64
    });
    
    // Intentar primero con cors para ver la respuesta
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item.payload)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('[sendPayload] Respuesta exitosa:', result);
        if (result.success) {
          return true;
        } else {
          console.error('[sendPayload] Error en respuesta:', result.error);
          return false;
        }
      } else {
        console.error('[sendPayload] Error HTTP:', response.status, response.statusText);
        // Si falla por CORS, intentar con no-cors como fallback
        throw new Error('CORS error, intentando con no-cors');
      }
    } catch (corsError) {
      // Si falla por CORS, usar no-cors (no podemos verificar respuesta pero intentamos)
      console.log('[sendPayload] CORS falló, usando no-cors como fallback');
      console.log('[sendPayload] Error CORS:', corsError.message);
      
      // Método alternativo: usar formulario HTML para evitar CORS
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_SCRIPT_URL;
      form.style.display = 'none';
      
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'data';
      input.value = JSON.stringify(item.payload);
      form.appendChild(input);
      
      document.body.appendChild(form);
      
      // Enviar y esperar un momento
      return new Promise((resolve) => {
        // Usar fetch con no-cors como último recurso
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item.payload)
        })
        .then(() => {
          console.log('[sendPayload] Enviado con no-cors (asumiendo éxito)');
          document.body.removeChild(form);
          // Con no-cors no podemos verificar, pero asumimos éxito si no hay error
          resolve(true);
        })
        .catch((error) => {
          console.error('[sendPayload] Error con no-cors:', error);
          document.body.removeChild(form);
          resolve(false);
        });
      });
    }
    
  } catch (error) {
    console.error('[sendPayload] Error general:', error);
    // Si es error de red y no hemos intentado mucho, reintentar
    if (retryCount < 3 && (error.name === 'TypeError' || error.message?.includes('fetch'))) {
      return sendPayload(item, retryCount + 1);
    }
    return false;
  }
}

// Sincronizar cola: intentar enviar todos los pendientes
async function trySyncQueue() {
  if (!navigator.onLine) return;
  
  try {
    const q = await loadQueue();
    const pending = q.filter(item => item.status === 'pending');
    if (pending.length === 0) {
      // Ocultar botón de reintentar si no hay pendientes
      const retryBtn = document.getElementById('btnRetry');
      if (retryBtn) retryBtn.style.display = 'none';
      return;
    }
    
    let changed = false;
    const updated = [...q];
    
    for (const item of pending) {
      const ok = await sendPayload(item);
      if (ok) {
        const idx = updated.findIndex(i => i.id === item.id);
        if (idx >= 0) {
          updated[idx].status = 'sent';
          updated[idx].sentAt = new Date().toISOString();
          changed = true;
        }
      }
    }
    
    if (changed) {
      // Purga enviados para no crecer el storage
      const remaining = updated.filter(it => it.status !== 'sent');
      await saveQueue(remaining);
      
      // Mostrar notificación si quedan pendientes
      const stillPending = remaining.filter(it => it.status === 'pending');
      if (stillPending.length > 0) {
        showNotification(`✓ ${pending.length - stillPending.length} envíos completados. ${stillPending.length} pendientes.`, 'info');
      } else {
        showNotification('✓ Todos los envíos completados', 'success');
      }
      
      // Actualizar visibilidad del botón de reintentar
      const retryBtn = document.getElementById('btnRetry');
      if (retryBtn) {
        retryBtn.style.display = stillPending.length > 0 ? 'inline-block' : 'none';
      }
    }
  } catch (error) {
    console.error('Error al sincronizar cola:', error);
  }
}

// Botón manual de reintentar envíos
const btnRetry = document.getElementById('btnRetry');
if (btnRetry) {
  btnRetry.addEventListener('click', async () => {
    btnRetry.disabled = true;
    btnRetry.textContent = 'Reintentando...';
    await trySyncQueue();
    btnRetry.disabled = false;
    btnRetry.textContent = 'Reintentar envíos';
  });
  
  // Mostrar botón si hay items pendientes al cargar
  loadQueue().then(q => {
    const pending = q.filter(item => item.status === 'pending');
    if (pending.length > 0) {
      btnRetry.style.display = 'inline-block';
    }
  });
}

// --- Indicador de estado de conexión ---
function updateConnectionStatus() {
  const isOnline = navigator.onLine;
  const statusEl = document.getElementById('connectionStatus');
  if (statusEl) {
    statusEl.textContent = isOnline ? 'En línea' : 'Sin conexión';
    statusEl.className = isOnline ? 'status-online' : 'status-offline';
  }
  
  // Actualizar mensaje en el formulario
  const formNote = document.getElementById('formNote');
  if (formNote) {
    if (!isOnline) {
      formNote.textContent = '⚠️ Sin conexión. Los datos se guardarán localmente y se enviarán cuando se recupere la conexión.';
      formNote.style.display = 'block';
    } else {
      formNote.textContent = '';
      formNote.style.display = 'none';
    }
  }
}

// Eventos de conexión
window.addEventListener('online', () => {
  updateConnectionStatus();
  trySyncQueue();
  showNotification('Conexión restaurada. Sincronizando datos...', 'success');
});

window.addEventListener('offline', () => {
  updateConnectionStatus();
  showNotification('Sin conexión. Los datos se guardarán localmente.', 'warning');
});

// Sincronizar cuando la pestaña vuelve a estar visible (puede haber recuperado conexión)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && navigator.onLine) {
    trySyncQueue();
  }
});

// Inicializar estado
updateConnectionStatus();

// --- Notificaciones visuales ---
function showNotification(message, type = 'info') {
  // Crear elemento de notificación si no existe
  let notification = document.getElementById('notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    document.body.appendChild(notification);
  }
  
  notification.textContent = message;
  notification.className = `notification notification-${type}`;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 4000);
}

// --- Submit: guarda offline y sincroniza ---
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  
  // Mostrar indicador de carga
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalSubmitText = submitBtn ? submitBtn.textContent : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Generando imagen y enviando...';
  }
  
  try {
    // Generar payload con imagen incluida
    const payload = await buildPayload(true); // Incluir imagen
    const isOnline = navigator.onLine;
    
    if (isOnline) {
      // Intentar enviar inmediatamente
      const item = { id: Date.now(), status: 'pending', payload };
      const sent = await sendPayload(item);
      
      if (sent) {
        showNotification('✓ Formulario enviado correctamente. Se enviará un correo con la imagen.', 'success');
        form.reset();
        renderApplicants(1);
        renderQuestions();
        updateApplicantLabels();
      } else {
        // Si falla, guardar en cola
        await enqueue(payload);
        showNotification('⚠️ Error al enviar. Guardado en cola para reintentar.', 'warning');
        // Mostrar botón de reintentar
        const retryBtn = document.getElementById('btnRetry');
        if (retryBtn) retryBtn.style.display = 'inline-block';
      }
    } else {
      // Sin conexión: guardar en cola
      await enqueue(payload);
      showNotification('📱 Sin conexión. Datos guardados localmente. Se enviarán automáticamente cuando haya conexión.', 'info');
      // Mostrar botón de reintentar
      const retryBtn = document.getElementById('btnRetry');
      if (retryBtn) retryBtn.style.display = 'inline-block';
    }
    
    // Intentar sincronizar cola pendiente
    await trySyncQueue();
    
  } catch (error) {
    console.error('Error al procesar formulario:', error);
    showNotification('⚠️ Error al procesar el formulario. Intenta nuevamente.', 'warning');
  } finally {
    // Restaurar botón
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalSubmitText;
    }
  }
});

table.addEventListener('input', (e)=>{
  if (e.target.name?.startsWith('a') && e.target.name?.endsWith('_name')) {
    updateApplicantLabels();
  }
});
