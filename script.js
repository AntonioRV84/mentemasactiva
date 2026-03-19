// ==================== MENTE+ACTIVA - JavaScript ====================

// ==================== STATE ====================
let currentPage = 'welcome';
let userData = { name: '', email: '', age: '', gender: '' };
let currentQuestion = 0;
let answers = [];
let results = { stress: 0, anxiety: 0, sleep: 0 };
let showInfo = false;
let activeGame = null;

// Game states
let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = [];
let memoryMoves = 0;
let breathingActive = false;
let breathingPhase = 'ready';
let breathingTimer = 0;
let breathingInterval = null;
let mandalaColor = '#4A90A4';
let bubbles = [];
let bubbleScore = 0;
let bubbleInterval = null;
let puzzleTiles = [];
let puzzleMoves = 0;
let zenDrawing = false;
let zenColor = '#D4A574';
let zenSize = 3;
let simonSequence = [];
let simonPlayerSeq = [];
let simonLevel = 0;
let simonPlaying = false;
let simonShowingSeq = false;

// Chat state
let chatMessages = [
  { from: 'bot', text: '¡Hola! 👋 Soy tu asistente de bienestar mental. Estoy aquí para ayudarte con temas de estrés, ansiedad y calidad del sueño. ¿En qué puedo ayudarte?' }
];
let chatTyping = false;

// ==================== QUESTIONS ====================
const questions = [
  { q: '¿Con qué frecuencia te sientes tenso/a o agitado/a?', cat: 'Estrés' },
  { q: '¿Te cuesta desconectarte de tus preocupaciones diarias?', cat: 'Estrés' },
  { q: '¿Sientes que tienes demasiadas responsabilidades?', cat: 'Estrés' },
  { q: '¿Experimentas dolores de cabeza o tensión muscular?', cat: 'Estrés' },
  { q: '¿Te irritas fácilmente con las personas a tu alrededor?', cat: 'Estrés' },
  { q: '¿Sientes preocupación excesiva por el futuro?', cat: 'Ansiedad' },
  { q: '¿Experimentas nerviosismo sin razón aparente?', cat: 'Ansiedad' },
  { q: '¿Tu corazón se acelera en situaciones cotidianas?', cat: 'Ansiedad' },
  { q: '¿Evitas situaciones sociales por miedo o incomodidad?', cat: 'Ansiedad' },
  { q: '¿Tienes dificultad para concentrarte por pensamientos negativos?', cat: 'Ansiedad' },
  { q: '¿Te cuesta trabajo quedarte dormido/a por las noches?', cat: 'Sueño' },
  { q: '¿Te despiertas varias veces durante la noche?', cat: 'Sueño' },
  { q: '¿Te sientes cansado/a al despertar por la mañana?', cat: 'Sueño' },
  { q: '¿Usas el celular o pantallas antes de dormir?', cat: 'Sueño' },
  { q: '¿Tienes un horario irregular para dormir?', cat: 'Sueño' }
];

const options = ['Nunca', 'Casi nunca', 'A veces', 'Frecuentemente', 'Siempre'];

// ==================== CHATBOT KNOWLEDGE ====================
const chatKnowledge = {
  estres: {
    keywords: ['estrés', 'estres', 'estresado', 'estresada', 'tension', 'tensión', 'presion', 'presión', 'agobiado', 'agobiada', 'abrumado', 'abrumada'],
    response: '😤 El estrés es una respuesta natural del cuerpo ante situaciones desafiantes. Aquí te comparto algunas estrategias:\n\n🧘 **Respiración profunda**: Inhala 4 seg, mantén 7 seg, exhala 8 seg\n🚶 **Actividad física**: 30 min de caminata reducen el cortisol\n📝 **Journaling**: Escribe tus pensamientos para procesarlos\n🎵 **Música relajante**: Reduce la frecuencia cardíaca\n⏰ **Gestión del tiempo**: Prioriza tareas con la matriz de Eisenhower\n\n¿Te gustaría saber más sobre alguna técnica específica?'
  },
  ansiedad: {
    keywords: ['ansiedad', 'ansioso', 'ansiosa', 'nervioso', 'nerviosa', 'nervios', 'preocupado', 'preocupada', 'miedo', 'pánico', 'panico', 'angustia'],
    response: '😰 La ansiedad es más común de lo que crees y tiene solución. Te recomiendo:\n\n🌟 **Técnica 5-4-3-2-1**: Identifica 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas\n🧘 **Mindfulness**: Enfócate en el presente, no en el futuro\n💪 **Ejercicio regular**: Libera endorfinas que combaten la ansiedad\n📵 **Desconexión digital**: Reduce el tiempo en redes sociales\n🗣️ **Habla con alguien**: Compartir tus sentimientos alivia la carga\n✍️ **Registro de pensamientos**: Identifica patrones de pensamiento negativos\n\n¿Hay algo específico que te genera ansiedad?'
  },
  sueno: {
    keywords: ['sueño', 'sueno', 'dormir', 'insomnio', 'descanso', 'descansar', 'noche', 'despertar', 'cansado', 'cansada', 'fatiga', 'somnolencia'],
    response: '😴 La calidad del sueño es fundamental para tu bienestar. Te sugiero:\n\n🌙 **Horario fijo**: Acuéstate y levántate a la misma hora\n📱 **Sin pantallas**: Evita dispositivos 1 hora antes de dormir\n🌡️ **Temperatura ideal**: Mantén tu habitación entre 18-22°C\n☕ **Sin cafeína**: Evítala después de las 2 PM\n🧘 **Relajación**: Prueba meditación o lectura antes de dormir\n🛏️ **Solo para dormir**: No trabajes ni comas en la cama\n🌿 **Infusiones**: Manzanilla o valeriana antes de dormir\n\n¿Tienes algún problema específico con tu sueño?'
  },
  respiracion: {
    keywords: ['respiración', 'respiracion', 'respirar', 'técnica', 'tecnica', 'ejercicio respiración', 'respirar mejor'],
    response: '🌬️ ¡La respiración es tu herramienta más poderosa! Te enseño varias técnicas:\n\n**Respiración 4-7-8:**\n1. Inhala por la nariz 4 segundos\n2. Mantén el aire 7 segundos\n3. Exhala por la boca 8 segundos\n4. Repite 4 veces\n\n**Respiración Cuadrada:**\n1. Inhala 4 segundos\n2. Mantén 4 segundos\n3. Exhala 4 segundos\n4. Mantén 4 segundos\n\n**Respiración Diafragmática:**\n1. Coloca una mano en el pecho y otra en el abdomen\n2. Inhala haciendo que solo se mueva el abdomen\n3. Exhala lentamente\n\n💡 Prueba el juego de Respiración Guiada en la sección de juegos.'
  },
  meditacion: {
    keywords: ['meditación', 'meditacion', 'meditar', 'mindfulness', 'mente', 'calma', 'calmar', 'relajar', 'relajación', 'relajacion', 'tranquilidad', 'paz'],
    response: '🧘 La meditación es excelente para tu salud mental:\n\n**Para principiantes (5 min):**\n1. Siéntate cómodamente con la espalda recta\n2. Cierra los ojos suavemente\n3. Enfócate en tu respiración\n4. Si tu mente divaga, regresa sin juzgarte\n5. Comienza con 5 minutos y aumenta gradualmente\n\n**Body Scan:**\n1. Recorre mentalmente cada parte de tu cuerpo\n2. Desde los pies hasta la cabeza\n3. Nota tensiones y relájalas\n\n**Beneficios comprobados:**\n• Reduce el cortisol (hormona del estrés)\n• Mejora la concentración\n• Reduce la ansiedad\n• Mejora la calidad del sueño\n\n🎯 Intenta meditar todos los días a la misma hora.'
  },
  ayuda: {
    keywords: ['ayuda', 'help', 'qué puedes hacer', 'que puedes hacer', 'funciones', 'hola', 'hi', 'hello', 'buenos días', 'buenas tardes', 'buenas noches', 'hey'],
    response: '👋 ¡Hola! Soy el asistente de MENTE+ACTIVA. Puedo ayudarte con:\n\n🔹 **Estrés**: Técnicas para manejarlo y reducirlo\n🔹 **Ansiedad**: Estrategias para controlar la ansiedad\n🔹 **Sueño**: Tips para mejorar tu calidad de sueño\n🔹 **Respiración**: Ejercicios de respiración guiada\n🔹 **Meditación**: Técnicas de mindfulness y relajación\n🔹 **Ejercicio**: Cómo la actividad física ayuda tu mente\n🔹 **Alimentación**: Nutrientes que mejoran tu bienestar\n🔹 **Hábitos**: Rutinas saludables para tu salud mental\n\n💬 Pregúntame lo que necesites sobre estos temas.'
  },
  ejercicio: {
    keywords: ['ejercicio', 'deporte', 'actividad física', 'actividad fisica', 'caminar', 'correr', 'yoga', 'gimnasio'],
    response: '🏃 ¡El ejercicio es medicina para tu mente!\n\n**Beneficios mentales del ejercicio:**\n• Libera endorfinas (hormona de la felicidad)\n• Reduce cortisol (hormona del estrés)\n• Mejora la calidad del sueño\n• Aumenta la autoestima\n\n**Ejercicios recomendados:**\n🚶 **Caminata**: 30 min diarios\n🧘 **Yoga**: Combina movimiento y mindfulness\n🏊 **Natación**: Bajo impacto, muy relajante\n🚴 **Ciclismo**: Libera tensión acumulada\n💃 **Baile**: Diversión + ejercicio\n\n**Rutina anti-estrés (15 min):**\n1. Estiramiento suave (3 min)\n2. Caminata rápida (5 min)\n3. Sentadillas suaves (3 min)\n4. Respiración profunda (2 min)\n5. Estiramiento final (2 min)\n\n💡 La clave es la constancia, no la intensidad.'
  },
  alimentacion: {
    keywords: ['alimentación', 'alimentacion', 'comida', 'comer', 'dieta', 'nutrición', 'nutricion', 'alimentos'],
    response: '🥗 La alimentación impacta directamente en tu salud mental:\n\n**Alimentos que reducen el estrés:**\n🍫 Chocolate oscuro (70%+ cacao)\n🥑 Aguacate (rico en B6)\n🍌 Plátano (triptófano)\n🥜 Nueces y almendras (omega-3)\n🍵 Té verde (L-teanina)\n🫐 Arándanos (antioxidantes)\n\n**Alimentos para mejor sueño:**\n🍒 Cerezas (melatonina natural)\n🥛 Leche tibia (triptófano)\n🍯 Miel (facilita el sueño)\n🐟 Pescado (omega-3 y vitamina D)\n\n**Evita antes de dormir:**\n❌ Cafeína después de las 2 PM\n❌ Comidas pesadas 3 horas antes\n❌ Alcohol (fragmenta el sueño)\n❌ Azúcar refinada en exceso'
  },
  habitos: {
    keywords: ['hábitos', 'habitos', 'rutina', 'costumbres', 'día a día', 'dia a dia', 'cambiar', 'mejorar', 'bienestar', 'salud mental'],
    response: '📋 Hábitos para una mente sana:\n\n**Rutina matutina ideal:**\n☀️ Despierta a la misma hora\n💧 Bebe agua al levantarte\n🧘 5 min de meditación\n🏃 Ejercicio ligero\n📵 No revises el celular primero\n\n**Durante el día:**\n⏰ Toma pausas cada 90 minutos\n🌳 Sal al aire libre al menos 15 min\n💬 Conecta con alguien que te importe\n📝 Escribe 3 cosas por las que estés agradecido\n\n**Rutina nocturna:**\n📱 Sin pantallas 1 hora antes\n🛁 Baño tibio relajante\n📖 Lee algo ligero\n🌙 Acuéstate a la misma hora\n\n🎯 Implementa UN hábito a la vez durante 21 días.'
  },
  gracias: {
    keywords: ['gracias', 'thanks', 'genial', 'excelente', 'perfecto', 'bien', 'bueno', 'ok', 'vale', 'entiendo', 'comprendo'],
    response: '😊 ¡Me alegra poder ayudarte! Recuerda:\n\n💚 Tu bienestar mental es importante\n🌟 Pequeños cambios generan grandes resultados\n🤗 No tienes que enfrentar todo solo/a\n🧠 Cuidar tu mente es tan importante como cuidar tu cuerpo\n\n¿Hay algo más en lo que pueda ayudarte? Estoy aquí para ti. 💪'
  },
  profesional: {
    keywords: ['psicólogo', 'psicologo', 'profesional', 'terapeuta', 'terapia', 'doctor', 'grave', 'urgente', 'suicidio', 'autolesión', 'autolesion', 'morir'],
    response: '🏥 **Tu bienestar es lo más importante.**\n\nSi estás pasando por una situación difícil, te recomiendo buscar ayuda profesional:\n\n📞 **Línea de la Vida**: 800 911 2000 (México, 24/7)\n📞 **SAPTEL**: 55 5259 8121\n👨‍⚕️ **Acude con un profesional de salud mental**\n\n⚠️ Si tú o alguien que conoces está en peligro, llama al 911 inmediatamente.\n\nNo hay vergüenza en pedir ayuda. Los profesionales están capacitados para brindarte el apoyo que necesitas. 💚'
  },
  trabajo: {
    keywords: ['trabajo', 'laboral', 'oficina', 'jefe', 'compañeros', 'burnout', 'agotado', 'productividad', 'escuela', 'estudiar', 'examen', 'exámenes', 'tarea', 'tareas'],
    response: '💼 El estrés laboral/escolar es muy común. Te recomiendo:\n\n**Técnica Pomodoro:**\n🍅 Trabaja 25 min concentrado\n☕ Descanso 5 min\n🔄 Repite 4 veces\n⏰ Descanso largo de 15-30 min\n\n**Gestión del estrés:**\n📋 Haz listas de tareas priorizadas\n🚫 Aprende a decir "no" cuando es necesario\n🎯 Divide proyectos grandes en tareas pequeñas\n🌿 Toma pausas activas cada hora\n⚖️ Establece límites claros\n\n**En momentos de presión:**\n1. Para y respira profundo 3 veces\n2. Identifica qué puedes controlar\n3. Enfócate en una sola tarea\n4. Pide ayuda si la necesitas\n\n🎯 Recuerda: tu salud está primero.'
  }
};

const defaultResponse = '🤔 Entiendo tu consulta, pero solo puedo ayudarte con temas relacionados al **estrés**, **ansiedad** y **calidad del sueño**.\n\nPuedes preguntarme sobre:\n• Técnicas de respiración\n• Manejo del estrés\n• Control de la ansiedad\n• Mejorar el sueño\n• Meditación y relajación\n• Ejercicio y alimentación\n• Hábitos saludables\n\n¿Sobre cuál tema te gustaría saber?';

// ==================== RENDER ====================
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderSpheres()}
    ${renderNav()}
    <div class="main-content">
      ${renderPage()}
    </div>
    ${renderInfoButton()}
  `;
  attachEvents();
  if (currentPage === 'games' && activeGame) {
    initGame(activeGame);
  }
}

function renderSpheres() {
  return `
    <div class="sphere sphere-1"></div>
    <div class="sphere sphere-2"></div>
    <div class="sphere sphere-3"></div>
  `;
}

function renderNav() {
  const pages = [
    { id: 'welcome', label: '🏠 Inicio' },
    { id: 'register', label: '📝 Registro' },
    { id: 'test', label: '📋 Test' },
    { id: 'results', label: '📊 Resultados' },
    { id: 'games', label: '🎮 Juegos' },
    { id: 'chat', label: '🤖 Chat' }
  ];
  return `
    <nav class="nav">
      <div class="nav-brand">🧠 MENTE+ACTIVA</div>
      <div class="nav-links">
        ${pages.map(p => `
          <button class="nav-btn ${currentPage === p.id ? 'active' : ''}" onclick="navigate('${p.id}')">${p.label}</button>
        `).join('')}
      </div>
    </nav>
  `;
}

function renderPage() {
  switch (currentPage) {
    case 'welcome': return renderWelcome();
    case 'register': return renderRegister();
    case 'test': return renderTest();
    case 'results': return renderResults();
    case 'games': return renderGames();
    case 'chat': return renderChat();
    default: return renderWelcome();
  }
}

// ==================== WELCOME ====================
function renderWelcome() {
  return `
    <div class="welcome-container">
      <span class="welcome-brain">🧠</span>
      <h1 class="welcome-title">MENTE+ACTIVA</h1>
      <p class="welcome-subtitle">
        Tu espacio seguro para evaluar y mejorar tu bienestar mental.
        Descubre tu nivel de estrés, ansiedad y calidad del sueño,
        y recibe herramientas personalizadas para sentirte mejor.
      </p>
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">📋</span>
          <h3 class="feature-title">Evaluación Integral</h3>
          <p class="feature-desc">Test profesional de 15 preguntas que evalúa tu estrés, ansiedad y calidad del sueño.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">💡</span>
          <h3 class="feature-title">Recomendaciones</h3>
          <p class="feature-desc">Tips personalizados, ejercicios guiados y técnicas de relajación basadas en tus resultados.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🎮</span>
          <h3 class="feature-title">Juegos Terapéuticos</h3>
          <p class="feature-desc">7 juegos interactivos diseñados para reducir el estrés y mejorar tu bienestar mental.</p>
        </div>
      </div>
      <button class="btn-primary" onclick="navigate('register')">Comenzar Ahora ✨</button>
    </div>
  `;
}

// ==================== REGISTER ====================
function renderRegister() {
  return `
    <div class="register-container">
      <div class="glass-card">
        <h2 class="register-title">📝 Registro</h2>
        <p class="register-subtitle">Completa tus datos para personalizar tu experiencia</p>
        <div class="form-group">
          <label class="form-label">👤 Nombre completo</label>
          <input type="text" class="form-input" id="reg-name" placeholder="Tu nombre completo" value="${userData.name}">
        </div>
        <div class="form-group">
          <label class="form-label">📧 Correo Gmail</label>
          <input type="email" class="form-input" id="reg-email" placeholder="tu.correo@gmail.com" value="${userData.email}">
        </div>
        <div class="form-group">
          <label class="form-label">🎂 Edad</label>
          <input type="number" class="form-input" id="reg-age" placeholder="Tu edad" min="10" max="100" value="${userData.age}">
        </div>
        <div class="form-group">
          <label class="form-label">⚧ Género</label>
          <select class="form-select" id="reg-gender">
            <option value="">Selecciona tu género</option>
            <option value="masculino" ${userData.gender === 'masculino' ? 'selected' : ''}>Masculino</option>
            <option value="femenino" ${userData.gender === 'femenino' ? 'selected' : ''}>Femenino</option>
            <option value="otro" ${userData.gender === 'otro' ? 'selected' : ''}>Otro</option>
            <option value="no-decir" ${userData.gender === 'no-decir' ? 'selected' : ''}>Prefiero no decir</option>
          </select>
        </div>
        <button class="btn-primary" style="width:100%;margin-top:1rem;" onclick="submitRegister()">Continuar al Test →</button>
        <div class="form-note">🔒 Tu información es confidencial y solo se usa para personalizar tus resultados.</div>
      </div>
    </div>
  `;
}

function submitRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const age = document.getElementById('reg-age').value.trim();
  const gender = document.getElementById('reg-gender').value;

  if (!name) { alert('Por favor ingresa tu nombre'); return; }
  if (!email || !email.includes('@')) { alert('Por favor ingresa un correo válido'); return; }
  if (!age || age < 10 || age > 100) { alert('Por favor ingresa una edad válida'); return; }
  if (!gender) { alert('Por favor selecciona tu género'); return; }

  userData = { name, email, age, gender };
  currentQuestion = 0;
  answers = [];
  navigate('test');
}

// ==================== TEST ====================
function renderTest() {
  if (currentQuestion >= questions.length) {
    calculateResults();
    navigate('results');
    return '';
  }
  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;
  const catClass = q.cat === 'Estrés' ? 'cat-stress' : q.cat === 'Ansiedad' ? 'cat-anxiety' : 'cat-sleep';

  return `
    <div class="test-container">
      <div class="glass-card">
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-category ${catClass}">${q.cat === 'Estrés' ? '😤' : q.cat === 'Ansiedad' ? '😰' : '😴'} ${q.cat}</span>
            <span class="progress-text">${currentQuestion + 1} / ${questions.length}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="question-card" id="question-card">
          <div class="question-number">Pregunta ${currentQuestion + 1}</div>
          <h2 class="question-text">${q.q}</h2>
          <div class="options-list">
            ${options.map((opt, i) => `
              <button class="option-btn" onclick="answerQuestion(${i})">
                <span class="option-number">${i + 1}</span>
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function answerQuestion(value) {
  answers.push(value);
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    calculateResults();
    currentPage = 'results';
  }
  render();
}

function calculateResults() {
  let stress = 0, anxiety = 0, sleep = 0;
  for (let i = 0; i < 5; i++) stress += (answers[i] || 0);
  for (let i = 5; i < 10; i++) anxiety += (answers[i] || 0);
  for (let i = 10; i < 15; i++) sleep += (answers[i] || 0);
  results = {
    stress: Math.round((stress / 20) * 100),
    anxiety: Math.round((anxiety / 20) * 100),
    sleep: Math.round((sleep / 20) * 100)
  };
}

// ==================== RESULTS ====================
function getLevel(val) {
  if (val <= 30) return { text: 'Bajo', cls: 'level-low' };
  if (val <= 60) return { text: 'Moderado', cls: 'level-medium' };
  return { text: 'Alto', cls: 'level-high' };
}

function getColor(val) {
  if (val <= 30) return '#22c55e';
  if (val <= 60) return '#f59e0b';
  return '#ef4444';
}

function renderResults() {
  const sLevel = getLevel(results.stress);
  const aLevel = getLevel(results.anxiety);
  const slLevel = getLevel(results.sleep);

  return `
    <div class="results-container">
      <h2 class="results-title">📊 Tus Resultados</h2>
      <p class="results-name">Resultados personalizados para ${userData.name || 'ti'}</p>

      <div class="results-grid">
        ${renderResultCard('Estrés', results.stress, sLevel, getColor(results.stress))}
        ${renderResultCard('Ansiedad', results.anxiety, aLevel, getColor(results.anxiety))}
        ${renderResultCard('Calidad del Sueño', results.sleep, slLevel, getColor(results.sleep))}
      </div>

      <h3 class="section-title">💡 Recomendaciones Personalizadas</h3>
      <div class="rec-grid">
        ${getRecommendations('stress', results.stress)}
        ${getRecommendations('anxiety', results.anxiety)}
        ${getRecommendations('sleep', results.sleep)}
      </div>

      <h3 class="section-title">🧘 Ejercicios Recomendados</h3>
      <div class="exercise-grid">
        <div class="exercise-card">
          <h4 class="exercise-name">🌬️ Respiración 4-7-8</h4>
          <ol class="exercise-steps">
            <li>Inhala por la nariz durante 4 segundos</li>
            <li>Mantén el aire durante 7 segundos</li>
            <li>Exhala lentamente por la boca durante 8 segundos</li>
            <li>Repite el ciclo 4 veces</li>
          </ol>
        </div>
        <div class="exercise-card">
          <h4 class="exercise-name">💪 Relajación Muscular Progresiva</h4>
          <ol class="exercise-steps">
            <li>Tensa los músculos de los pies 5 segundos</li>
            <li>Relaja y siente la diferencia 10 segundos</li>
            <li>Sube: piernas, abdomen, brazos, cara</li>
            <li>Finaliza con 3 respiraciones profundas</li>
          </ol>
        </div>
        <div class="exercise-card">
          <h4 class="exercise-name">🧠 Meditación de Atención Plena</h4>
          <ol class="exercise-steps">
            <li>Siéntate cómodo y cierra los ojos</li>
            <li>Enfócate solo en tu respiración</li>
            <li>Si tu mente divaga, regresa sin juzgarte</li>
            <li>Comienza con 5 minutos diarios</li>
          </ol>
        </div>
      </div>

      <div class="results-buttons">
        <button class="btn-primary" onclick="navigate('games')">🎮 Ir a Juegos</button>
        <button class="btn-secondary" onclick="navigate('chat')">🤖 Hablar con ChatBot</button>
      </div>
    </div>
  `;
}

function renderResultCard(label, value, level, color) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (value / 100) * circumference;
  return `
    <div class="result-card">
      <div class="circle-container">
        <svg class="circle-svg" viewBox="0 0 130 130">
          <circle class="circle-bg" cx="65" cy="65" r="45"/>
          <circle class="circle-progress" cx="65" cy="65" r="45"
            stroke="${color}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
          />
        </svg>
        <div class="circle-text" style="color:${color}">${value}%</div>
      </div>
      <div class="result-label">${label}</div>
      <span class="result-level ${level.cls}">${level.text}</span>
    </div>
  `;
}

function getRecommendations(type, value) {
  const recs = {
    stress: {
      low: { icon: '😊', title: 'Estrés Bajo', text: '¡Excelente manejo del estrés! Mantén tus hábitos actuales: ejercicio regular, buena alimentación y tiempo para ti.' },
      med: { icon: '⚠️', title: 'Estrés Moderado', text: 'Incorpora pausas activas cada 90 minutos. Practica la respiración profunda y considera actividades como yoga o caminatas al aire libre.' },
      high: { icon: '🚨', title: 'Estrés Alto', text: 'Es importante que tomes acción. Identifica tus fuentes de estrés, establece límites saludables y considera hablar con un profesional de salud mental.' }
    },
    anxiety: {
      low: { icon: '😌', title: 'Ansiedad Baja', text: '¡Bien! Tu nivel de ansiedad es saludable. Sigue practicando mindfulness y mantén tus redes de apoyo social.' },
      med: { icon: '😰', title: 'Ansiedad Moderada', text: 'Practica la técnica 5-4-3-2-1 cuando sientas ansiedad. Reduce el consumo de cafeína y dedica tiempo diario a la relajación.' },
      high: { icon: '❗', title: 'Ansiedad Alta', text: 'Te recomendamos buscar apoyo profesional. Mientras tanto, practica ejercicios de respiración y evita situaciones que incrementen tu ansiedad innecesariamente.' }
    },
    sleep: {
      low: { icon: '😴', title: 'Buen Sueño', text: '¡Tu sueño parece saludable! Mantén horarios regulares y un ambiente cómodo para dormir.' },
      med: { icon: '🌙', title: 'Sueño Regular', text: 'Establece una rutina nocturna: sin pantallas 1 hora antes, temperatura fresca, y horario fijo para acostarte y levantarte.' },
      high: { icon: '⚡', title: 'Sueño Deficiente', text: 'Tu calidad de sueño necesita atención. Elimina cafeína después de las 2 PM, crea un ambiente oscuro y silencioso, y considera técnicas de relajación antes de dormir.' }
    }
  };
  const level = value <= 30 ? 'low' : value <= 60 ? 'med' : 'high';
  const rec = recs[type][level];
  return `
    <div class="rec-card">
      <h4 class="rec-card-title">${rec.icon} ${rec.title}</h4>
      <p class="rec-card-text">${rec.text}</p>
    </div>
  `;
}

// ==================== GAMES ====================
const gamesList = [
  { id: 'breathing', icon: '🌬️', name: 'Respiración Guiada', desc: 'Sigue el ritmo de respiración 4-7-8 para reducir el estrés y la ansiedad al instante.' },
  { id: 'memory', icon: '🃏', name: 'Memoria Zen', desc: 'Encuentra los pares de emojis. Ejercita tu memoria y concentración mientras te relajas.' },
  { id: 'mandala', icon: '🎨', name: 'Mandala Digital', desc: 'Colorea secciones de un mandala digital. El arte como terapia para calmar tu mente.' },
  { id: 'bubbles', icon: '🫧', name: 'Atrapa la Calma', desc: 'Toca las burbujas antes de que desaparezcan. Un ejercicio de atención plena divertido.' },
  { id: 'puzzle', icon: '🧩', name: 'Rompecabezas Zen', desc: 'Resuelve este puzzle deslizante. Mantén tu mente enfocada y olvida las preocupaciones.' },
  { id: 'garden', icon: '🏖️', name: 'Jardín Zen', desc: 'Dibuja libremente en la arena digital. Crea patrones relajantes a tu propio ritmo.' },
  { id: 'simon', icon: '🔴', name: 'Secuencia Mental', desc: 'Memoriza y repite secuencias de colores. Entrena tu memoria y concentración.' }
];

function renderGames() {
  if (activeGame) {
    return renderActiveGame();
  }
  return `
    <div class="games-container">
      <h2 class="games-title">🎮 Juegos Anti-Estrés</h2>
      <p class="games-subtitle">7 juegos diseñados para reducir tu estrés y mejorar tu bienestar mental</p>
      <div class="games-grid">
        ${gamesList.map((g, i) => `
          <div class="game-card" style="animation-delay:${i * 0.1}s" onclick="openGame('${g.id}')">
            <span class="game-icon">${g.icon}</span>
            <h3 class="game-name">${g.name}</h3>
            <p class="game-desc">${g.desc}</p>
            <button class="btn-game">Jugar →</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openGame(id) {
  activeGame = id;
  render();
}

function closeGame() {
  activeGame = null;
  if (breathingInterval) clearInterval(breathingInterval);
  if (bubbleInterval) clearInterval(bubbleInterval);
  breathingActive = false;
  render();
}

function renderActiveGame() {
  const game = gamesList.find(g => g.id === activeGame);
  return `
    <div class="game-modal-overlay" onclick="event.target===this && closeGame()">
      <div class="game-modal">
        <button class="game-modal-close" onclick="closeGame()">✕</button>
        <h3 class="game-modal-title">${game.icon} ${game.name}</h3>
        <div id="game-content">${getGameContent(activeGame)}</div>
      </div>
    </div>
  `;
}

function getGameContent(id) {
  switch (id) {
    case 'breathing': return renderBreathingGame();
    case 'memory': return renderMemoryGame();
    case 'mandala': return renderMandalaGame();
    case 'bubbles': return renderBubbleGame();
    case 'puzzle': return renderPuzzleGame();
    case 'garden': return renderGardenGame();
    case 'simon': return renderSimonGame();
    default: return '';
  }
}

// ----- BREATHING GAME -----
function renderBreathingGame() {
  return `
    <div class="breathing-circle-container">
      <div class="breathing-circle ${breathingPhase}" id="breathing-circle">
        <span class="breathing-timer" id="breathing-timer">${breathingActive ? breathingTimer : '🌬️'}</span>
      </div>
      <p class="breathing-instruction" id="breathing-text">
        ${breathingActive ? getBreathingText() : 'Presiona iniciar para comenzar la respiración guiada 4-7-8'}
      </p>
      <button class="btn-primary" onclick="toggleBreathing()">${breathingActive ? 'Detener' : 'Iniciar Respiración'}</button>
    </div>
  `;
}

function getBreathingText() {
  if (breathingPhase === 'inhale') return '🌬️ INHALA por la nariz...';
  if (breathingPhase === 'hold') return '⏸️ MANTÉN el aire...';
  if (breathingPhase === 'exhale') return '💨 EXHALA por la boca...';
  return 'Preparándose...';
}

function toggleBreathing() {
  if (breathingActive) {
    breathingActive = false;
    breathingPhase = 'ready';
    if (breathingInterval) clearInterval(breathingInterval);
    updateGameContent();
    return;
  }
  breathingActive = true;
  runBreathingCycle();
}

function runBreathingCycle() {
  if (!breathingActive) return;
  breathingPhase = 'inhale';
  breathingTimer = 4;
  updateBreathingUI();

  breathingInterval = setInterval(() => {
    if (!breathingActive) { clearInterval(breathingInterval); return; }
    breathingTimer--;
    if (breathingTimer <= 0) {
      clearInterval(breathingInterval);
      if (breathingPhase === 'inhale') {
        breathingPhase = 'hold';
        breathingTimer = 7;
        updateBreathingUI();
        breathingInterval = setInterval(() => {
          if (!breathingActive) { clearInterval(breathingInterval); return; }
          breathingTimer--;
          if (breathingTimer <= 0) {
            clearInterval(breathingInterval);
            breathingPhase = 'exhale';
            breathingTimer = 8;
            updateBreathingUI();
            breathingInterval = setInterval(() => {
              if (!breathingActive) { clearInterval(breathingInterval); return; }
              breathingTimer--;
              if (breathingTimer <= 0) {
                clearInterval(breathingInterval);
                runBreathingCycle();
              } else { updateBreathingUI(); }
            }, 1000);
          } else { updateBreathingUI(); }
        }, 1000);
      }
    } else { updateBreathingUI(); }
  }, 1000);
}

function updateBreathingUI() {
  const circle = document.getElementById('breathing-circle');
  const timer = document.getElementById('breathing-timer');
  const text = document.getElementById('breathing-text');
  if (circle) {
    circle.className = 'breathing-circle ' + breathingPhase;
    timer.textContent = breathingTimer;
    text.textContent = getBreathingText();
  }
}

function updateGameContent() {
  const gc = document.getElementById('game-content');
  if (gc) gc.innerHTML = getGameContent(activeGame);
  if (activeGame) initGame(activeGame);
}

// ----- MEMORY GAME -----
function initMemory() {
  const emojis = ['🧘','🌿','🦋','🌸','🌊','🎵','☀️','🌙'];
  const pairs = [...emojis, ...emojis];
  memoryCards = pairs.sort(() => Math.random() - 0.5);
  memoryFlipped = [];
  memoryMatched = new Array(memoryCards.length).fill(false);
  memoryMoves = 0;
}

function renderMemoryGame() {
  if (memoryCards.length === 0) initMemory();
  const allMatched = memoryMatched.every(m => m);
  if (allMatched && memoryCards.length > 0) {
    return `
      <div class="game-win">
        <span class="game-win-emoji">🎉</span>
        <p class="game-win-text">¡Felicidades! Completaste el juego en ${memoryMoves} movimientos</p>
        <button class="btn-primary" onclick="initMemory(); updateGameContent();">Jugar de nuevo</button>
      </div>
    `;
  }
  return `
    <p class="memory-score">Movimientos: ${memoryMoves}</p>
    <div class="memory-grid">
      ${memoryCards.map((card, i) => {
        const isFlipped = memoryFlipped.includes(i);
        const isMatched = memoryMatched[i];
        return `<div class="memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}" onclick="flipCard(${i})">${(isFlipped || isMatched) ? card : '?'}</div>`;
      }).join('')}
    </div>
  `;
}

function flipCard(index) {
  if (memoryFlipped.length >= 2 || memoryFlipped.includes(index) || memoryMatched[index]) return;
  memoryFlipped.push(index);
  memoryMoves++;
  updateGameContent();

  if (memoryFlipped.length === 2) {
    const [a, b] = memoryFlipped;
    if (memoryCards[a] === memoryCards[b]) {
      memoryMatched[a] = true;
      memoryMatched[b] = true;
      memoryFlipped = [];
      setTimeout(() => updateGameContent(), 300);
    } else {
      setTimeout(() => {
        memoryFlipped = [];
        updateGameContent();
      }, 800);
    }
  }
}

// ----- MANDALA GAME -----
function renderMandalaGame() {
  const colors = ['#4A90A4','#6B9F78','#D4A574','#E8A0BF','#9B8EC4','#F0C674','#E06C75','#56B6C2','#C678DD','#98C379'];
  const sections = [];
  for (let ring = 0; ring < 4; ring++) {
    const r1 = 30 + ring * 30;
    const r2 = r1 + 28;
    const numSections = 8 + ring * 4;
    for (let s = 0; s < numSections; s++) {
      const a1 = (s / numSections) * Math.PI * 2;
      const a2 = ((s + 1) / numSections) * Math.PI * 2;
      const id = `m-${ring}-${s}`;
      const x1i = 150 + Math.cos(a1) * r1;
      const y1i = 150 + Math.sin(a1) * r1;
      const x1o = 150 + Math.cos(a1) * r2;
      const y1o = 150 + Math.sin(a1) * r2;
      const x2i = 150 + Math.cos(a2) * r1;
      const y2i = 150 + Math.sin(a2) * r1;
      const x2o = 150 + Math.cos(a2) * r2;
      const y2o = 150 + Math.sin(a2) * r2;
      const largeArc = (a2 - a1) > Math.PI ? 1 : 0;
      const path = `M ${x1i} ${y1i} L ${x1o} ${y1o} A ${r2} ${r2} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${r1} ${r1} 0 ${largeArc} 0 ${x1i} ${y1i}`;
      sections.push({ id, path });
    }
  }
  return `
    <div class="mandala-container">
      <div class="mandala-colors">
        ${colors.map(c => `<button class="mandala-color-btn ${mandalaColor === c ? 'active' : ''}" style="background:${c}" onclick="mandalaColor='${c}'; updateGameContent();"></button>`).join('')}
      </div>
      <div class="mandala-svg-container">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="28" fill="rgba(74,144,164,0.3)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          ${sections.map(s => `<path class="mandala-section" id="${s.id}" d="${s.path}" fill="rgba(255,255,255,0.05)" onclick="colorMandala('${s.id}')"/>`).join('')}
        </svg>
      </div>
      <button class="btn-secondary" onclick="updateGameContent();">🔄 Reiniciar</button>
    </div>
  `;
}

function colorMandala(id) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('fill', mandalaColor);
}

// ----- BUBBLE GAME -----
function renderBubbleGame() {
  return `
    <p class="bubble-score">Puntuación: <span id="bubble-score-val">${bubbleScore}</span></p>
    <div class="bubble-area" id="bubble-area"></div>
    <div style="text-align:center;">
      <button class="btn-primary" onclick="startBubbles()">🫧 ${bubbleInterval ? 'Reiniciar' : 'Iniciar'}</button>
    </div>
  `;
}

function startBubbles() {
  bubbleScore = 0;
  if (bubbleInterval) clearInterval(bubbleInterval);
  const area = document.getElementById('bubble-area');
  if (area) area.innerHTML = '';
  const scoreEl = document.getElementById('bubble-score-val');
  if (scoreEl) scoreEl.textContent = '0';

  bubbleInterval = setInterval(() => {
    const area = document.getElementById('bubble-area');
    if (!area) { clearInterval(bubbleInterval); return; }
    const bubble = document.createElement('div');
    const size = 40 + Math.random() * 40;
    const left = Math.random() * (area.offsetWidth - size);
    const bottom = 0;
    const emojis = ['🫧','💧','🌊','✨','💎','🔮','🌸'];
    bubble.className = 'bubble';
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + 'px';
    bubble.style.bottom = bottom + 'px';
    bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(74,144,164,0.6), rgba(107,159,120,0.3))`;
    bubble.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    bubble.onclick = function() {
      bubbleScore += 10;
      const scoreEl = document.getElementById('bubble-score-val');
      if (scoreEl) scoreEl.textContent = bubbleScore;
      this.style.transform = 'scale(1.5)';
      this.style.opacity = '0';
      setTimeout(() => this.remove(), 200);
    };
    area.appendChild(bubble);
    setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 3000);
  }, 600);
}

// ----- PUZZLE GAME -----
function initPuzzle() {
  puzzleTiles = [1,2,3,4,5,6,7,8,0];
  puzzleMoves = 0;
  // Shuffle
  for (let i = 0; i < 200; i++) {
    const emptyIdx = puzzleTiles.indexOf(0);
    const moves = getValidMoves(emptyIdx);
    const move = moves[Math.floor(Math.random() * moves.length)];
    [puzzleTiles[emptyIdx], puzzleTiles[move]] = [puzzleTiles[move], puzzleTiles[emptyIdx]];
  }
}

function getValidMoves(emptyIdx) {
  const moves = [];
  const row = Math.floor(emptyIdx / 3);
  const col = emptyIdx % 3;
  if (row > 0) moves.push(emptyIdx - 3);
  if (row < 2) moves.push(emptyIdx + 3);
  if (col > 0) moves.push(emptyIdx - 1);
  if (col < 2) moves.push(emptyIdx + 1);
  return moves;
}

function renderPuzzleGame() {
  if (puzzleTiles.length === 0) initPuzzle();
  const solved = puzzleTiles.every((t, i) => t === (i + 1) % 9);
  if (solved && puzzleMoves > 0) {
    return `
      <div class="game-win">
        <span class="game-win-emoji">🧩</span>
        <p class="game-win-text">¡Resolviste el puzzle en ${puzzleMoves} movimientos!</p>
        <button class="btn-primary" onclick="initPuzzle(); updateGameContent();">Jugar de nuevo</button>
      </div>
    `;
  }
  return `
    <p class="puzzle-moves">Movimientos: ${puzzleMoves}</p>
    <div class="puzzle-grid">
      ${puzzleTiles.map((tile, i) => `
        <button class="puzzle-tile ${tile === 0 ? 'empty' : 'filled'}" onclick="moveTile(${i})">
          ${tile === 0 ? '' : tile}
        </button>
      `).join('')}
    </div>
  `;
}

function moveTile(index) {
  const emptyIdx = puzzleTiles.indexOf(0);
  const validMoves = getValidMoves(emptyIdx);
  if (validMoves.includes(index)) {
    [puzzleTiles[emptyIdx], puzzleTiles[index]] = [puzzleTiles[index], puzzleTiles[emptyIdx]];
    puzzleMoves++;
    updateGameContent();
  }
}

// ----- ZEN GARDEN -----
function renderGardenGame() {
  const colors = ['#D4A574','#8B7355','#6B9F78','#4A90A4','#E8A0BF','#ffffff'];
  return `
    <div class="zen-canvas-container">
      <div class="zen-tools">
        ${colors.map(c => `<button class="zen-tool-btn ${zenColor === c ? 'active' : ''}" style="background:${c};width:32px;height:32px;border-radius:50%;padding:0;min-width:32px;" onclick="zenColor='${c}'; document.querySelectorAll('.zen-tool-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"></button>`).join('')}
        <button class="zen-tool-btn" onclick="clearZenCanvas()">🗑️ Limpiar</button>
      </div>
      <canvas id="zen-canvas" class="zen-canvas" width="500" height="350"></canvas>
      <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:0.5rem;">Dibuja con el mouse o el dedo para crear patrones relajantes</p>
    </div>
  `;
}

function initZenCanvas() {
  const canvas = document.getElementById('zen-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2a1f1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }
  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = zenColor;
    ctx.lineWidth = zenSize;
    ctx.lineCap = 'round';
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
  }
  function stopDraw() { drawing = false; }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', startDraw);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDraw);
}

function clearZenCanvas() {
  const canvas = document.getElementById('zen-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#2a1f1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// ----- SIMON GAME -----
function renderSimonGame() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  return `
    <div class="simon-container">
      <p class="simon-info">Nivel: ${simonLevel} | ${simonShowingSeq ? 'Observa la secuencia...' : simonPlaying ? 'Tu turno - repite la secuencia' : 'Presiona iniciar'}</p>
      <div class="simon-grid">
        ${colors.map(c => `<button class="simon-btn ${c}" id="simon-${c}" onclick="simonPress('${c}')"></button>`).join('')}
      </div>
      <button class="btn-primary" onclick="startSimon()">🔴 ${simonPlaying ? 'Reiniciar' : 'Iniciar'}</button>
    </div>
  `;
}

function startSimon() {
  simonSequence = [];
  simonPlayerSeq = [];
  simonLevel = 0;
  simonPlaying = true;
  simonShowingSeq = false;
  nextSimonRound();
}

function nextSimonRound() {
  simonLevel++;
  simonPlayerSeq = [];
  const colors = ['red', 'blue', 'green', 'yellow'];
  simonSequence.push(colors[Math.floor(Math.random() * 4)]);
  simonShowingSeq = true;
  updateGameContent();
  showSimonSequence();
}

function showSimonSequence() {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= simonSequence.length) {
      clearInterval(interval);
      simonShowingSeq = false;
      updateGameContent();
      return;
    }
    highlightSimon(simonSequence[i]);
    i++;
  }, 800);
}

function highlightSimon(color) {
  const btn = document.getElementById('simon-' + color);
  if (btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 500);
  }
}

function simonPress(color) {
  if (simonShowingSeq || !simonPlaying) return;
  highlightSimon(color);
  simonPlayerSeq.push(color);
  const idx = simonPlayerSeq.length - 1;
  if (simonPlayerSeq[idx] !== simonSequence[idx]) {
    simonPlaying = false;
    alert('¡Juego terminado! Llegaste al nivel ' + simonLevel);
    simonLevel = 0;
    updateGameContent();
    return;
  }
  if (simonPlayerSeq.length === simonSequence.length) {
    setTimeout(nextSimonRound, 1000);
  }
}

function initGame(id) {
  if (id === 'garden') setTimeout(initZenCanvas, 100);
}

// ==================== CHATBOT ====================
function renderChat() {
  return `
    <div class="chat-container">
      <h2 class="chat-title">🤖 Asistente de Bienestar</h2>
      <p class="chat-subtitle">Pregúntame sobre estrés, ansiedad o calidad del sueño</p>
      <div class="chat-box">
        <div class="chat-messages" id="chat-messages">
          ${chatMessages.map(m => renderChatMessage(m)).join('')}
          ${chatTyping ? `
            <div class="chat-message bot">
              <div class="chat-avatar">🤖</div>
              <div class="chat-bubble">
                <div class="typing-indicator">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
        <div class="quick-questions">
          <button class="quick-btn" onclick="sendQuickQuestion('¿Cómo puedo reducir mi estrés?')">😤 Reducir estrés</button>
          <button class="quick-btn" onclick="sendQuickQuestion('¿Cómo controlo la ansiedad?')">😰 Controlar ansiedad</button>
          <button class="quick-btn" onclick="sendQuickQuestion('¿Cómo puedo dormir mejor?')">😴 Dormir mejor</button>
          <button class="quick-btn" onclick="sendQuickQuestion('¿Qué ejercicios de respiración me recomiendas?')">🌬️ Respiración</button>
          <button class="quick-btn" onclick="sendQuickQuestion('¿Cómo puedo meditar?')">🧘 Meditación</button>
        </div>
        <div class="chat-input-area">
          <input type="text" class="chat-input" id="chat-input" placeholder="Escribe tu pregunta..." onkeydown="if(event.key==='Enter')sendMessage()">
          <button class="chat-send" onclick="sendMessage()">➤</button>
        </div>
      </div>
    </div>
  `;
}

function renderChatMessage(msg) {
  return `
    <div class="chat-message ${msg.from}">
      <div class="chat-avatar">${msg.from === 'bot' ? '🤖' : '👤'}</div>
      <div class="chat-bubble">${formatMessage(msg.text)}</div>
    </div>
  `;
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function sendQuickQuestion(text) {
  chatMessages.push({ from: 'user', text });
  chatTyping = true;
  render();
  scrollChat();
  setTimeout(() => {
    chatTyping = false;
    const response = getBotResponse(text);
    chatMessages.push({ from: 'bot', text: response });
    render();
    scrollChat();
  }, 1000 + Math.random() * 1000);
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  chatMessages.push({ from: 'user', text });
  chatTyping = true;
  render();
  scrollChat();
  setTimeout(() => {
    chatTyping = false;
    const response = getBotResponse(text);
    chatMessages.push({ from: 'bot', text: response });
    render();
    scrollChat();
  }, 1000 + Math.random() * 1000);
}

function scrollChat() {
  setTimeout(() => {
    const el = document.getElementById('chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }, 100);
}

function getBotResponse(input) {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const key in chatKnowledge) {
    const cat = chatKnowledge[key];
    for (const kw of cat.keywords) {
      const normalizedKw = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      if (lower.includes(normalizedKw)) {
        return cat.response;
      }
    }
  }
  return defaultResponse;
}

// ==================== INFO PANEL ====================
function renderInfoButton() {
  return `
    <button class="info-btn" onclick="toggleInfo()">?</button>
    ${showInfo ? `
      <div class="info-panel" id="info-panel">
        <h3 class="info-panel-title">🧠 MENTE+ACTIVA</h3>
        <div class="info-section">
          <div class="info-section-title">🏫 Institución</div>
          <p class="info-name">CEtis 116</p>
        </div>
        <div class="info-section">
          <div class="info-section-title">👨‍💻 Desarrolladores</div>
          <p class="info-name">
            Alan Alberto Hernández Carrasco<br>
            José Azael Jaime Nogueda<br>
            Félix Maximino Gorsillo Martínez<br>
            Axel Said López Pérez
          </p>
        </div>
        <div class="info-section">
          <div class="info-section-title">👨‍🏫 Asesores</div>
          <p class="info-name">
            Antonio Rodríguez Vázquez<br>
            Carolina López Martínez
          </p>
        </div>
        <div class="info-copyright">© 2026 CEtis 116</div>
      </div>
    ` : ''}
  `;
}

function toggleInfo() {
  showInfo = !showInfo;
  render();
}

// ==================== NAVIGATION ====================
function navigate(page) {
  currentPage = page;
  activeGame = null;
  if (breathingInterval) clearInterval(breathingInterval);
  if (bubbleInterval) clearInterval(bubbleInterval);
  breathingActive = false;
  render();
  window.scrollTo(0, 0);
}

// ==================== EVENTS ====================
function attachEvents() {
  // Events are attached inline via onclick
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  render();
});
