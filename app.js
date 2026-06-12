/* ============================================================
   ASTRO TRANSITS — Frontend Logic v3.0
   ============================================================ */

// ============================================================
// CONFIG — Backend URL detection
// ============================================================
// PRODUCTION_BACKEND_URL: aquí pegarás la URL de tu backend de Render
// cuando lo despliegues. Ejemplo: "https://astro-transits-api.onrender.com"
// Si lo dejas con YOUR-BACKEND-NAME, el frontend no podrá conectarse
// cuando esté en producción.
const PRODUCTION_BACKEND_URL = "https://astro-transits-api-planets.onrender.com";
function getDefaultBackendUrl() {
  const host = window.location.hostname;
  // Si estamos en localhost o IP local, usar backend local
  if (host === 'localhost' || host === '127.0.0.1' || host === '' || host.startsWith('192.168.')) {
    return 'http://127.0.0.1:8765';
  }
  // En producción, usar el backend de Render
  return PRODUCTION_BACKEND_URL;
}

// ============================================================
// I18N
// ============================================================
const i18n = {
  es: {
    backendLabel: "API Backend",
    eyebrow: "Astrología occidental · Carta natal",
    title1: "Descubre el", title2: "mapa de vida", title3: "con el que naciste",
    subtitle: "Conocerlo te permite guiarte por el camino que ya tienes escrito.",
    formTitle: "Datos de nacimiento",
    labelName: "Nombre", labelDate: "Fecha de nacimiento", labelTime: "Hora exacta", labelCity: "Ciudad de nacimiento",
    hintTime: "Si no la sabes con precisión, usa 12:00",
    hintCity: "Empieza a escribir y selecciona de la lista. Las coordenadas exactas se obtienen automáticamente.",
    lmtLabel: "Usar Local Mean Time (LMT) — solo para fechas anteriores a la estandarización de zonas horarias",
    configNote: "Plácidus · Tropical · Geocéntrico · Swiss Ephemeris",
    submitBtn: "Calcular carta",
    loadingText: "Calculando con Swiss Ephemeris",
    resultTitle: "El mapa de tu vida", resultTitle2: "Tu carta natal completa, tus tránsitos actuales y la lectura profunda de tu cielo",
    planetNow: "Planeta en este momento",
    planetHouse: "Casa natal que está transitando",
    aspectCount: "Aspectos exactos a tus planetas natales",
    tabInterpret: "Tránsitos de los planetas lentos", tabLecturaRP: "Tu carta natal detallada", tabAspects: "Aspectos de los tránsitos", tabCalendar: "Tu calendario · 12 meses",
    tabChart: "Los datos de tu carta", tabSummary: "Tus áreas de vida activadas",
    aspectsTitle: "Aspectos exactos por tránsito",
    chartTitle: "Tu carta natal completa",
    planetsTitle: "Planetas natales",
    housesTitle: "Casas y regentes",
    natalAspectsTitle: "Aspectos entre tus planetas natales",
    summaryTitle: "Sumario interpretativo por áreas",
    resetBtn: "← Otra carta",
    downloadPng: "Descargar imagen",
    downloadPdf: "Imprimir / PDF",
    footerNote: "Cálculos realizados con Swiss Ephemeris · Validado contra Solar Fire v9.1.0 con precisión menor a 1 minuto de arco · Sistema Plácidus · Zodíaco tropical · Geocéntrico",
    direct: "Directo", retrograde: "Retrógrado", exact: "Exacto", active: "Activo", house: "Casa",
    statusOk: "Conectado", statusFail: "Sin conexión", statusChecking: "Verificando...",
    th_planet: "Planeta", th_position: "Posición", th_house: "Casa", th_motion: "Estado", th_dignity: "Dignidad",
    th_house_n: "Casa", th_cusp: "Cúspide", th_ruler: "Regente", th_ruler_loc: "Regente está en",
    today: "hoy", tomorrow: "mañana", yesterday: "ayer", days_ago: "hace {n} días", in_days: "en {n} días",
    in_months: "en {n} meses", months_ago: "hace {n} meses",
    months: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  },
  en: {
    backendLabel: "API Backend",
    eyebrow: "Western astrology · Natal chart",
    title1: "Discover the", title2: "map of life", title3: "you were born with",
    subtitle: "Knowing it lets you navigate the path already written for you.",
    formTitle: "Birth data",
    labelName: "Name", labelDate: "Birth date", labelTime: "Exact time", labelCity: "Birth city",
    hintTime: "If you don't know it precisely, use 12:00",
    hintCity: "Start typing and select from the list. Exact coordinates are fetched automatically.",
    lmtLabel: "Use Local Mean Time (LMT) — only for dates before timezone standardization",
    configNote: "Placidus · Tropical · Geocentric · Swiss Ephemeris",
    submitBtn: "Calculate chart",
    loadingText: "Calculating with Swiss Ephemeris",
    resultTitle: "The map of your life", resultTitle2: "Your complete natal chart, your current transits, and the deep reading of your sky",
    planetNow: "Planet right now",
    planetHouse: "Natal house being transited",
    aspectCount: "Exact aspects to your natal planets",
    tabInterpret: "Transits of the slow planets", tabLecturaRP: "Your detailed natal chart", tabAspects: "Transit aspects", tabCalendar: "Your calendar · 12 months",
    tabChart: "Your chart data", tabSummary: "Your activated life areas",
    aspectsTitle: "Exact aspects by transit",
    chartTitle: "Your full natal chart",
    planetsTitle: "Natal planets",
    housesTitle: "Houses and rulers",
    natalAspectsTitle: "Aspects between your natal planets",
    summaryTitle: "Interpretive summary by life areas",
    resetBtn: "← New chart",
    downloadPng: "Download image",
    downloadPdf: "Print / PDF",
    footerNote: "Calculations powered by Swiss Ephemeris · Validated against Solar Fire v9.1.0 with sub-arcminute precision · Placidus system · Tropical zodiac · Geocentric",
    direct: "Direct", retrograde: "Retrograde", exact: "Exact", active: "Active", house: "House",
    statusOk: "Connected", statusFail: "Offline", statusChecking: "Checking...",
    th_planet: "Planet", th_position: "Position", th_house: "House", th_motion: "Motion", th_dignity: "Dignity",
    th_house_n: "House", th_cusp: "Cusp", th_ruler: "Ruler", th_ruler_loc: "Ruler is in",
    today: "today", tomorrow: "tomorrow", yesterday: "yesterday", days_ago: "{n} days ago", in_days: "in {n} days",
    in_months: "in {n} months", months_ago: "{n} months ago",
    months: ['January','February','March','April','May','June','July','August','September','October','November','December']
  }
};

let currentLang = 'es';
let currentResult = null;
let currentFocusPlanet = 'uranus';

function t(key) { return i18n[currentLang][key] || key; }

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
  });
  document.documentElement.lang = currentLang;
  checkBackend();
  if (currentResult) renderResult(currentResult);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    applyLang();
  });
});

// ============================================================
// CONSTANTS
// ============================================================
const SIGN_GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const PLANET_GLYPHS = {
  sun:'☉', moon:'☽', mercury:'☿', venus:'♀', mars:'♂',
  jupiter:'♃', saturn:'♄', uranus:'♅', neptune:'♆', pluto:'♇',
  // Puntos adicionales
  chiron:'⚷',          // Asteroide Quirón
  true_node:'☊',       // Nodo Norte (cabeza del dragón)
  south_node:'☋',      // Nodo Sur (cola del dragón)
  lilith:'⚸',          // Lilith / Luna Negra
  fortuna:'⊕',         // Parte / Rueda de la Fortuna
  infortunio:'✠'       // Parte del Infortunio (cruz templaria)
};
const PLANET_NAMES = {
  es: {
    sun:'Sol', moon:'Luna', mercury:'Mercurio', venus:'Venus', mars:'Marte',
    jupiter:'Júpiter', saturn:'Saturno', uranus:'Urano', neptune:'Neptuno', pluto:'Plutón',
    asc:'Ascendente', mc:'Medio Cielo',
    chiron:'Quirón', true_node:'Nodo Norte', south_node:'Nodo Sur',
    lilith:'Lilith', fortuna:'Rueda de la Fortuna', infortunio:'Parte del Infortunio'
  },
  en: {
    sun:'Sun', moon:'Moon', mercury:'Mercury', venus:'Venus', mars:'Mars',
    jupiter:'Jupiter', saturn:'Saturn', uranus:'Uranus', neptune:'Neptune', pluto:'Pluto',
    asc:'Ascendant', mc:'Midheaven',
    chiron:'Chiron', true_node:'North Node', south_node:'South Node',
    lilith:'Lilith', fortuna:'Part of Fortune', infortunio:'Part of Misfortune'
  }
};
const TRANSIT_PLANETS = ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

// Puntos adicionales en el orden en que se procesan
const EXTRA_POINTS = ['chiron', 'true_node', 'south_node', 'lilith', 'fortuna', 'infortunio'];

const PLANET_COLORS = {
  jupiter: '#d4823c', saturn: '#6b6b6b', uranus: '#4a8fb8',
  neptune: '#5e7fb6', pluto: '#8b3a62'
};

// Función ya no necesaria con Unicode pero la mantengo para compatibilidad
function uranusGlyphHTML(color) {
  const c = color ? `style="color:${color}"` : '';
  return `<span class="uranus-glyph" ${c} style="${color ? 'color:' + color + ';' : ''}font-family:serif;">♅</span>`;
}

function planetGlyph(planet) {
  if (planet === 'asc') return 'AC';
  if (planet === 'mc') return 'MC';
  if (planet === 'dc') return 'DC';
  if (planet === 'ic') return 'IC';
  return PLANET_GLYPHS[planet] || planet;
}

// ============================================================
// BACKEND
// ============================================================
const backendUrlInput = document.getElementById('backend-url');
backendUrlInput.value = getDefaultBackendUrl();
const backendStatus = document.getElementById('backend-status');

async function checkBackend() {
  const url = backendUrlInput.value.trim().replace(/\/$/, '');
  backendStatus.textContent = t('statusChecking');
  backendStatus.className = 'backend-status checking';
  try {
    const res = await fetch(url + '/');
    if (res.ok) {
      backendStatus.textContent = '✓ Swiss Ephemeris';
      backendStatus.className = 'backend-status ok';
      return true;
    }
    throw new Error();
  } catch (e) {
    backendStatus.textContent = '✕ ' + t('statusFail');
    backendStatus.className = 'backend-status fail';
    return false;
  }
}
backendUrlInput.addEventListener('change', checkBackend);

// ============================================================
// GEOCODING
// ============================================================
const cityInput = document.getElementById('city');
const suggestionsList = document.getElementById('suggestions');
let selectedCity = null;
let geocodeTimer;

cityInput.addEventListener('input', e => {
  clearTimeout(geocodeTimer);
  selectedCity = null;
  const q = e.target.value.trim();
  if (q.length < 3) { suggestionsList.style.display = 'none'; return; }
  geocodeTimer = setTimeout(async () => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': currentLang } });
      const data = await res.json();
      if (data.length === 0) { suggestionsList.style.display = 'none'; return; }
      suggestionsList.innerHTML = data.map((r, i) => `<div class="suggestion-item" data-idx="${i}">${r.display_name}</div>`).join('');
      suggestionsList.style.display = 'block';
      suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          selectedCity = data[parseInt(item.dataset.idx)];
          cityInput.value = selectedCity.display_name;
          suggestionsList.style.display = 'none';
        });
      });
    } catch (e) { console.error(e); }
  }, 350);
});

document.addEventListener('click', e => {
  if (!cityInput.contains(e.target) && !suggestionsList.contains(e.target)) {
    suggestionsList.style.display = 'none';
  }
});

document.getElementById('birthdate').addEventListener('change', e => {
  const year = parseInt(e.target.value.split('-')[0]);
  document.getElementById('use-lmt').checked = year < 1893;
});

// ============================================================
// INTERPRETATION DATA
// ============================================================
const houseInterp = {
  es: {
    1: { short: "Identidad y apariencia", full: "tu modo de presentarte al mundo, tu cuerpo físico y tu primera impresión sobre los demás" },
    2: { short: "Recursos y valores", full: "tu relación con el dinero, los bienes materiales y tu sentido de autoestima" },
    3: { short: "Mente y comunicación", full: "tu manera de pensar, hablar, aprender y relacionarte con hermanos y entorno cercano" },
    4: { short: "Hogar y raíces", full: "tu hogar, tu familia de origen, tus raíces emocionales y tu sentido de pertenencia" },
    5: { short: "Creatividad y placer", full: "tu expresión creativa, los romances, los hijos y todo lo que te llena de alegría" },
    6: { short: "Trabajo y salud", full: "tu rutina diaria, tu trabajo, tu salud física y los servicios que prestas" },
    7: { short: "Vínculos y pareja", full: "tus relaciones uno-a-uno, sociedades, matrimonio y proyecciones" },
    8: { short: "Transformación", full: "tus crisis profundas, la sexualidad, los recursos compartidos y los procesos de muerte y renacimiento" },
    9: { short: "Filosofía y expansión", full: "tus creencias, viajes lejanos, estudios superiores y búsqueda de sentido" },
    10: { short: "Vocación y reconocimiento", full: "tu vocación, tu lugar en la sociedad, tu autoridad y tu camino profesional" },
    11: { short: "Amistades y proyectos", full: "tus amistades, grupos, proyectos colectivos y tus ideales de futuro" },
    12: { short: "Inconsciente", full: "tu mundo interior, lo invisible, los sueños y las dimensiones espirituales" }
  },
  en: {
    1: { short: "Identity and appearance", full: "how you present yourself to the world, your physical body, and first impressions" },
    2: { short: "Resources and values", full: "your relationship with money, material goods and self-worth" },
    3: { short: "Mind and communication", full: "how you think, speak, learn and relate to siblings and immediate surroundings" },
    4: { short: "Home and roots", full: "your home, family of origin, emotional roots and sense of belonging" },
    5: { short: "Creativity and pleasure", full: "creative expression, romance, children and joy" },
    6: { short: "Work and health", full: "daily routine, work, physical health and service" },
    7: { short: "Bonds and partnership", full: "one-to-one relationships, partnerships, marriage" },
    8: { short: "Transformation", full: "deep crises, sexuality, shared resources, death-rebirth processes" },
    9: { short: "Philosophy and expansion", full: "beliefs, long journeys, higher studies, search for meaning" },
    10: { short: "Vocation", full: "your vocation, place in society, authority, professional path" },
    11: { short: "Friendships and projects", full: "friendships, groups, collective projects, ideals for the future" },
    12: { short: "Unconscious", full: "inner world, the invisible, dreams, spiritual dimensions" }
  }
};

const planetMeanings = {
  es: {
    sun: "tu identidad esencial, tu vitalidad y tu propósito de vida",
    moon: "tu mundo emocional, tu sensibilidad y tus necesidades más íntimas",
    mercury: "tu mente, tu manera de pensar y de comunicar",
    venus: "tu manera de amar, lo que valoras y lo que te resulta bello",
    mars: "tu fuerza, tu deseo y tu capacidad de actuar",
    jupiter: "tu impulso de expansión, tu fe y tu búsqueda de sentido",
    saturn: "tus estructuras, tus límites y tu sentido de responsabilidad",
    uranus: "tu necesidad de libertad, tu originalidad y tu chispa rebelde",
    neptune: "tu sensibilidad espiritual, tus sueños y tu capacidad de disolverte",
    pluto: "tu poder profundo, tus crisis transformadoras y tu intensidad",
    asc: "tu identidad visible, la máscara con la que te presentas",
    mc: "tu vocación, tu rol público y tu lugar en el mundo"
  },
  en: {
    sun: "your essential identity, vitality, and life purpose",
    moon: "your emotional world, sensitivity, and intimate needs",
    mercury: "your mind, way of thinking and communicating",
    venus: "your way of loving, what you value, what feels beautiful",
    mars: "your strength, desire, and capacity to act",
    jupiter: "your drive for expansion, faith, and search for meaning",
    saturn: "your structures, limits, and sense of responsibility",
    uranus: "your need for freedom, originality, and rebellious spark",
    neptune: "your spiritual sensitivity, dreams, and capacity to dissolve",
    pluto: "your deep power, transformative crises, and intensity",
    asc: "your visible identity, the mask you present",
    mc: "your vocation, public role, and place in the world"
  }
};

// Características arquetípicas de cada planeta de tránsito
const transitArchetypes = {
  es: {
    jupiter: { word: "expansión", phrase: "Júpiter abre puertas, agranda lo que toca, llena de fe y oportunidades.", verb: "expande" },
    saturn:  { word: "estructura", phrase: "Saturno consolida, prueba, exige madurez y enseña los límites necesarios.", verb: "estructura" },
    uranus:  { word: "ruptura", phrase: "Urano sacude, libera, ilumina con destellos lo que estaba estancado.", verb: "despierta" },
    neptune: { word: "disolución", phrase: "Neptuno disuelve, espiritualiza, conecta con lo sutil y lo invisible.", verb: "disuelve" },
    pluto:   { word: "transformación", phrase: "Plutón transforma desde la raíz, pone en crisis y regenera con poder.", verb: "transforma" }
  },
  en: {
    jupiter: { word: "expansion", phrase: "Jupiter opens doors, magnifies what it touches, fills with faith and opportunity.", verb: "expands" },
    saturn:  { word: "structure", phrase: "Saturn consolidates, tests, demands maturity and teaches necessary limits.", verb: "structures" },
    uranus:  { word: "rupture", phrase: "Uranus shakes, liberates, illuminates with sudden flashes what was stuck.", verb: "awakens" },
    neptune: { word: "dissolution", phrase: "Neptune dissolves, spiritualizes, connects with the subtle and invisible.", verb: "dissolves" },
    pluto:   { word: "transformation", phrase: "Pluto transforms from the root, throws into crisis and regenerates with power.", verb: "transforms" }
  }
};

const aspectVerbs = {
  es: { 'Conjunción': "se funde con", 'Sextil': "estimula creativamente a", 'Cuadratura': "tensiona y desafía a", 'Trígono': "fluye armoniosamente con", 'Oposición': "polariza y confronta a" },
  en: { 'Conjunction': "merges with", 'Sextile': "creatively stimulates", 'Square': "tensions and challenges", 'Trine': "flows harmoniously with", 'Opposition': "polarizes and confronts" }
};

const aspectMeanings = {
  es: {
    conjunction: "fusión total — la energía del tránsito se vuelve indistinguible del planeta natal",
    sextile: "oportunidad creativa — flujo suave que requiere tu acción consciente para activarse",
    square: "tensión productiva — fricción que es el motor del cambio si no te resistes",
    trine: "fluidez natural — puertas que se abren sin pedir esfuerzo, momento fértil",
    opposition: "espejo confrontativo — exterior te muestra lo interno no integrado"
  },
  en: {
    conjunction: "total fusion — transit energy becomes indistinguishable from the natal planet",
    sextile: "creative opportunity — gentle flow requiring your conscious action to activate",
    square: "productive tension — friction that is the engine of change if you don't resist",
    trine: "natural flow — doors that open without effort, fertile time",
    opposition: "confrontational mirror — outside shows you what's unintegrated within"
  }
};

// ============================================================
// DEEP ASPECT INTERPRETATION
// Base de datos para textos detallados de aspectos tránsito → planeta natal
// ============================================================

// Descripción profunda de cada tipo de aspecto (extendida)
const aspectDeepMeaning = {
  es: {
    conjunction: {
      short: "fusión",
      lead: "El tránsito se funde con tu planeta natal, intensificando su naturaleza al máximo y borrando la frontera entre ambos. Es un momento de reset profundo en esa zona de tu vida — lo que sucede ahora marca el inicio de un ciclo completo. Las conjunciones suelen sentirse como un despertar súbito o una crisis fértil: algo nuevo necesita nacer, y el viejo equilibrio ya no sostiene.",
      detail: "Las conjunciones son los aspectos más potentes del zodíaco porque las dos energías ocupan el mismo punto. Por unas semanas o meses, lo que el tránsito representa se convierte en lo que el planeta natal expresa, sin filtros ni mediaciones. Un ciclo entero arranca aquí: las semillas que siembres durante esta conjunción germinarán y darán fruto durante años. Si el tránsito es de un planeta lento como Plutón o Urano, este es un punto de inflexión que la persona recordará el resto de su vida. La invitación es escuchar profundamente qué quiere transformarse — y permitirlo, en vez de aferrarse a lo que ya cumplió su función."
    },
    sextile: {
      short: "oportunidad",
      lead: "El tránsito ofrece un puente suave y benevolente hacia tu planeta natal. Las puertas están abiertas, las personas indicadas aparecen, las ideas llegan claras — pero los sextiles no se activan solos: necesitas dar el paso, mostrarte, comprometerte con el movimiento. Es la gracia que te encuentra solo cuando te has puesto en camino.",
      detail: "Los sextiles son aspectos amables y constructivos que requieren acción consciente. A diferencia del trígono que fluye automático, el sextil pide tu participación activa. La energía está disponible, los apoyos llegan, las sincronicidades se multiplican — pero solo si te muestras dispuesto a moverte. No es tiempo de esperar pasivamente: es tiempo de tomar iniciativas con confianza, de pedir lo que necesitas, de mostrarte donde antes te escondías. Los sextiles premian a quien actúa antes de que el aspecto se cierre. Si dejas pasar el momento, la próxima oportunidad similar no llega pronto."
    },
    square: {
      short: "tensión",
      lead: "El tránsito choca con tu planeta natal en ángulo recto, generando fricción concreta y una demanda inevitable de cambio. Las cuadraturas son los aspectos más incómodos pero también los más transformadores — son la presión que rompe lo que ya no servía y abre el camino a algo nuevo. Lo que se resista, se quebrará; lo que se mueva, crecerá.",
      detail: "Las cuadraturas son los aspectos más fértiles para el crecimiento real, precisamente porque son los más incómodos de vivir. La tensión que producen no es castigo: es exactamente el combustible que un proceso de transformación profunda necesita. Si te resistes a su demanda de cambio, la presión aumenta hasta que algo se rompe — una relación, una situación, un proyecto, a veces el cuerpo. Pero si reconoces la tensión como un llamado a moverte, descubres una fuerza interior que no sabías que tenías. Las cuadraturas son maestros estrictos: enseñan rápido y bien, pero no permiten saltarse la lección. Después de atravesarlas, la persona sale con una capacidad nueva, una autoridad ganada en el cuerpo. La pregunta clave es: ¿qué necesita morir para que algo nuevo viva?"
    },
    trine: {
      short: "fluidez",
      lead: "El tránsito armoniza con tu planeta natal en un ángulo de 120° — la geometría más amable del zodíaco. Las cosas se mueven sin esfuerzo, lo que estaba estancado se desbloquea, las personas dicen sí donde antes decían no. Es una bendición real que pide ser reconocida: si no la usas activamente, pasa de largo y se pierde.",
      detail: "Los trígonos son los aspectos más fluidos del zodíaco. Lo que normalmente cuesta, ahora se da. Lo que estaba bloqueado, ahora se mueve sin que tengas que empujar. Pero aquí está la trampa de los trígonos: como todo fluye fácil, es muy posible no notar el regalo y dejar pasar la oportunidad. Los trígonos premian a quien sabe agradecer y aprovechar conscientemente. Son momentos para pedir cosas grandes, para hacer movimientos importantes, para integrar aprendizajes que estaban dispersos. Los trígonos de planetas lentos pueden durar meses y son ventanas de gracia que no vuelven a abrirse pronto. La instrucción astrológica clásica es: durante un trígono, no esperes — actúa. La energía cooperante está limitada en el tiempo, pero los frutos de lo que siembres con ella duran años."
    },
    opposition: {
      short: "espejo",
      lead: "El tránsito se planta exactamente enfrente de tu planeta natal, en un ángulo de 180°, creando una crisis de polaridades. Algo o alguien externo encarna lo que tú no has integrado adentro, y la realidad te lo pone en frente para que lo veas. Las oposiciones son momentos de toma de conciencia profunda — duros pero clarificadores.",
      detail: "Las oposiciones son los aspectos del descubrimiento. Algo o alguien aparece con la misma intensidad de tu planeta natal pero desde el polo opuesto, y de pronto ves con claridad lo que llevabas dentro sin reconocerlo. La tentación primera es proyectar la responsabilidad en lo de afuera, en el otro, en las circunstancias. Pero el aprendizaje real es darse cuenta de que ese 'otro' es un mensajero perfectamente diseñado para mostrarte algo de ti mismo. Las relaciones cobran protagonismo durante las oposiciones — son el espejo más eficaz. Cuando integras la polaridad sin descartarla, ganas una madurez que solo se obtiene atravesando confrontaciones reales. Las oposiciones llevan a culminaciones, a momentos de cosecha de ciclos largos, a decisiones que no admiten más postergación. La pregunta clave es: ¿qué parte de mí está hablando a través de este otro?"
    }
  },
  en: {
    conjunction: {
      short: "fusion",
      lead: "The transit merges with your natal planet, intensifying its nature to the maximum and erasing the boundary between them. It's a deep reset moment in that area of your life — what happens now marks the start of a complete cycle. Conjunctions often feel like a sudden awakening or a fertile crisis: something new needs to be born, and the old equilibrium no longer holds.",
      detail: "Conjunctions are the most potent aspects of the zodiac because the two energies occupy the same point. For weeks or months, what the transit represents becomes what the natal planet expresses, without filters or mediation. An entire cycle begins here: the seeds you plant during this conjunction will germinate and bear fruit for years. If the transit involves a slow planet like Pluto or Uranus, this is a turning point the person will remember for the rest of their life. The invitation is to listen deeply to what wants to transform — and allow it, instead of clinging to what has fulfilled its purpose."
    },
    sextile: {
      short: "opportunity",
      lead: "The transit offers a gentle, benevolent bridge toward your natal planet. Doors are open, the right people appear, ideas arrive clearly — but sextiles don't activate themselves: you need to step forward, show up, commit to the movement. It's grace that finds you only when you've put yourself on the path.",
      detail: "Sextiles are friendly, constructive aspects that require conscious action. Unlike the trine which flows automatically, the sextile asks for your active participation. Energy is available, support arrives, synchronicities multiply — but only if you show willingness to move. Not time to wait passively: it's time to take initiatives with confidence, ask for what you need, show up where you used to hide. Sextiles reward those who act before the aspect closes. If you let the moment pass, the next similar opportunity won't come soon."
    },
    square: {
      short: "tension",
      lead: "The transit clashes with your natal planet at a right angle, generating concrete friction and an inevitable demand for change. Squares are the most uncomfortable but also the most transformative aspects — they are the pressure that breaks what no longer served and opens the way to something new. What resists, will shatter; what moves, will grow.",
      detail: "Squares are the most fertile aspects for real growth, precisely because they're the most uncomfortable to live. The tension they produce isn't punishment: it's exactly the fuel a deep transformation process needs. If you resist their demand for change, pressure increases until something breaks — a relationship, a situation, a project, sometimes the body. But if you recognize the tension as a call to move, you discover an inner strength you didn't know you had. Squares are strict teachers: they teach quickly and well, but don't allow skipping the lesson. After crossing through them, the person emerges with new capacity, an authority earned in the body. The key question is: what needs to die so something new can live?"
    },
    trine: {
      short: "flow",
      lead: "The transit harmonizes with your natal planet at 120° — the most amiable geometry of the zodiac. Things move effortlessly, what was stuck unblocks, people say yes where before they said no. It's a real blessing that asks to be recognized: if you don't actively use it, it passes by and is lost.",
      detail: "Trines are the most fluid aspects of the zodiac. What usually costs, now happens. What was blocked, now moves without you having to push. But here's the trap of trines: since everything flows easily, it's very possible not to notice the gift and let opportunity pass. Trines reward those who know how to be grateful and consciously take advantage. They're moments to ask for big things, to make important moves, to integrate scattered learnings. Slow planet trines can last months and are windows of grace that won't reopen soon. The classical astrological instruction is: during a trine, don't wait — act. Cooperative energy is limited in time, but the fruits of what you plant with it last for years."
    },
    opposition: {
      short: "mirror",
      lead: "The transit stands directly opposite your natal planet at 180°, creating a crisis of polarities. Something or someone external embodies what you haven't integrated within, and reality places it in front of you to be seen. Oppositions are moments of deep awareness — hard but clarifying.",
      detail: "Oppositions are aspects of discovery. Something or someone appears with the same intensity as your natal planet but from the opposite pole, and suddenly you see clearly what you carried within without recognizing. The first temptation is to project responsibility onto the outside, the other, the circumstances. But real learning is realizing that 'other' is a perfectly designed messenger to show you something about yourself. Relationships take center stage during oppositions — they're the most efficient mirror. When you integrate the polarity without dismissing it, you gain maturity that can only be obtained by crossing through real confrontations. Oppositions lead to culminations, harvest moments of long cycles, decisions that admit no more postponement. The key question is: what part of me is speaking through this other?"
    }
  }
};

// ============================================================
// PLANET PROFILES — Arquetipo, regencias, dones, dificultades
// Esta base de datos enriquece la interpretación de cada combinación
// ============================================================
const planetProfile = {
  es: {
    sun: {
      archetype: "El Héroe / Rey",
      rules: "rige tu identidad esencial, tu vitalidad, tu propósito de vida, tu padre, la voluntad consciente, el corazón, tu capacidad de brillar y ser visto",
      facilitates: "la autoexpresión, el liderazgo, la coherencia entre ser y hacer, el reconocimiento, la vitalidad física",
      hinders: "la humildad, la entrega del control, dejar que otros brillen, las decisiones colectivas, la receptividad"
    },
    moon: {
      archetype: "La Madre / Niño Interior",
      rules: "rige tu mundo emocional, tus necesidades íntimas, tu memoria, la madre, el hogar, los ciclos, la nutrición, el inconsciente personal, la receptividad",
      facilitates: "la empatía, el cuidado, la intuición emocional, el sentido de pertenencia, la sensibilidad",
      hinders: "la objetividad, la distancia emocional, las decisiones racionales puras, soltar lo familiar, la confrontación directa"
    },
    mercury: {
      archetype: "El Mensajero / Trickster",
      rules: "rige la mente racional, la palabra, la escritura, los aprendizajes, los hermanos, los viajes cortos, el comercio, la curiosidad, los nervios",
      facilitates: "la comunicación, el aprendizaje, las negociaciones, las conexiones, la versatilidad, la agilidad mental",
      hinders: "la profundidad emocional, el silencio contemplativo, los compromisos a largo plazo, la quietud, la consistencia"
    },
    venus: {
      archetype: "La Amante / Artista",
      rules: "rige tu manera de amar, lo que valoras, tu sentido estético, las relaciones cercanas, el dinero, los placeres, la dulzura, la armonía, lo bello",
      facilitates: "el amor, el disfrute, la belleza, la diplomacia, el atractivo, la cooperación, las finanzas suaves",
      hinders: "el conflicto necesario, la disciplina austera, las decisiones difíciles, la confrontación, la soledad"
    },
    mars: {
      archetype: "El Guerrero / Pionero",
      rules: "rige tu fuerza, tu deseo, la acción, la sexualidad, la competencia, la ira, el coraje, la iniciativa, los músculos, la sangre",
      facilitates: "la acción decidida, la defensa, la conquista, el deseo, la energía física, la determinación",
      hinders: "la paciencia, la diplomacia, la espera, la receptividad, los procesos lentos, la cooperación"
    },
    jupiter: {
      archetype: "El Sabio / Maestro Generoso",
      rules: "rige la expansión, la fe, la filosofía, los viajes largos, la educación superior, la abundancia, la sabiduría, la suerte, lo religioso, lo extranjero",
      facilitates: "el crecimiento, las oportunidades, el optimismo, la confianza, la abundancia, la enseñanza",
      hinders: "los límites necesarios, la moderación, la prudencia, la concentración en lo pequeño, la disciplina austera"
    },
    saturn: {
      archetype: "El Anciano / Padre Severo",
      rules: "rige las estructuras, los límites, el tiempo, la responsabilidad, la autoridad, los huesos, la madurez, las pruebas, la disciplina, lo duradero",
      facilitates: "la perseverancia, la solidez, los logros que duran, la maestría, la autoridad ganada con esfuerzo",
      hinders: "la espontaneidad, el placer ligero, la flexibilidad, la diversión sin propósito, la rapidez"
    },
    uranus: {
      archetype: "El Rebelde / Despertador",
      rules: "rige la libertad, la originalidad, la disrupción, los cambios súbitos, la tecnología, las amistades, la genialidad, lo inesperado, la rebeldía",
      facilitates: "la innovación, la liberación, los despertares, las soluciones originales, la individualidad, los cambios necesarios",
      hinders: "la estabilidad emocional, los compromisos tradicionales, la continuidad, las jerarquías, las rutinas seguras"
    },
    neptune: {
      archetype: "El Místico / Soñador",
      rules: "rige la espiritualidad, los sueños, la imaginación, lo invisible, la compasión, el arte sublime, la disolución, la mística, lo trascendente",
      facilitates: "la conexión espiritual, la inspiración artística, la empatía universal, la rendición, la creatividad, los estados sutiles",
      hinders: "los límites claros, la objetividad, las decisiones prácticas, los contratos firmes, la confrontación con la realidad densa"
    },
    pluto: {
      archetype: "El Mago / Señor del Inframundo",
      rules: "rige el poder profundo, la transformación radical, la sexualidad intensa, los recursos compartidos, la muerte y renacimiento, lo subterráneo, lo tabú",
      facilitates: "la regeneración profunda, el poder real, las transformaciones definitivas, la sanación profunda, el contacto con lo esencial",
      hinders: "la superficialidad cómoda, los cambios suaves, la inocencia mantenida, lo que solo es de fachada, el control sin entrega"
    },
    asc: {
      archetype: "La Máscara / Puerta",
      rules: "rige tu identidad visible, cómo te presentas al mundo, tu cuerpo físico, tu primera impresión, el filtro a través del cual experimentas la vida",
      facilitates: "la presencia, la individuación, la apariencia auténtica, el inicio de cosas nuevas",
      hinders: "el anonimato, pasar desapercibido, las decisiones que no involucran tu imagen pública"
    },
    mc: {
      archetype: "La Vocación / Cima",
      rules: "rige tu vocación, tu rol social, tu carrera profesional, tu autoridad pública, tu lugar visible en la sociedad",
      facilitates: "el reconocimiento, los logros profesionales, la visibilidad pública, el ejercicio de autoridad",
      hinders: "la vida privada protegida, los caminos profesionales tradicionales sin pasión, mantener bajo perfil"
    }
  },
  en: {
    sun: {
      archetype: "The Hero / King",
      rules: "rules your essential identity, vitality, life purpose, the father, conscious will, the heart, your capacity to shine and be seen",
      facilitates: "self-expression, leadership, coherence between being and doing, recognition, physical vitality",
      hinders: "humility, surrendering control, letting others shine, collective decisions, receptivity"
    },
    moon: {
      archetype: "The Mother / Inner Child",
      rules: "rules your emotional world, intimate needs, memory, the mother, home, cycles, nourishment, the personal unconscious, receptivity",
      facilitates: "empathy, care, emotional intuition, sense of belonging, sensitivity",
      hinders: "objectivity, emotional distance, purely rational decisions, letting go of the familiar, direct confrontation"
    },
    mercury: {
      archetype: "The Messenger / Trickster",
      rules: "rules the rational mind, the word, writing, learning, siblings, short trips, commerce, curiosity, the nerves",
      facilitates: "communication, learning, negotiations, connections, versatility, mental agility",
      hinders: "emotional depth, contemplative silence, long-term commitments, stillness, consistency"
    },
    venus: {
      archetype: "The Lover / Artist",
      rules: "rules your way of loving, what you value, your aesthetic sense, close relationships, money, pleasures, sweetness, harmony, the beautiful",
      facilitates: "love, enjoyment, beauty, diplomacy, attractiveness, cooperation, smooth finances",
      hinders: "necessary conflict, austere discipline, hard decisions, confrontation, solitude"
    },
    mars: {
      archetype: "The Warrior / Pioneer",
      rules: "rules your strength, desire, action, sexuality, competition, anger, courage, initiative, muscles, blood",
      facilitates: "decisive action, defense, conquest, desire, physical energy, determination",
      hinders: "patience, diplomacy, waiting, receptivity, slow processes, cooperation"
    },
    jupiter: {
      archetype: "The Sage / Generous Teacher",
      rules: "rules expansion, faith, philosophy, long journeys, higher education, abundance, wisdom, luck, the religious, the foreign",
      facilitates: "growth, opportunities, optimism, confidence, abundance, teaching",
      hinders: "necessary limits, moderation, prudence, focus on the small, austere discipline"
    },
    saturn: {
      archetype: "The Elder / Stern Father",
      rules: "rules structures, limits, time, responsibility, authority, the bones, maturity, tests, discipline, the lasting",
      facilitates: "perseverance, solidity, achievements that last, mastery, authority earned through effort",
      hinders: "spontaneity, light pleasure, flexibility, purposeless fun, speed"
    },
    uranus: {
      archetype: "The Rebel / Awakener",
      rules: "rules freedom, originality, disruption, sudden changes, technology, friendships, genius, the unexpected, rebellion",
      facilitates: "innovation, liberation, awakenings, original solutions, individuality, necessary changes",
      hinders: "emotional stability, traditional commitments, continuity, hierarchies, safe routines"
    },
    neptune: {
      archetype: "The Mystic / Dreamer",
      rules: "rules spirituality, dreams, imagination, the invisible, compassion, sublime art, dissolution, mysticism, the transcendent",
      facilitates: "spiritual connection, artistic inspiration, universal empathy, surrender, creativity, subtle states",
      hinders: "clear limits, objectivity, practical decisions, firm contracts, confrontation with dense reality"
    },
    pluto: {
      archetype: "The Magician / Lord of the Underworld",
      rules: "rules deep power, radical transformation, intense sexuality, shared resources, death and rebirth, the subterranean, the taboo",
      facilitates: "deep regeneration, real power, definitive transformations, deep healing, contact with the essential",
      hinders: "comfortable superficiality, soft changes, maintained innocence, mere facade, control without surrender"
    },
    asc: {
      archetype: "The Mask / Doorway",
      rules: "rules your visible identity, how you present yourself to the world, your physical body, first impression, the filter through which you experience life",
      facilitates: "presence, individuation, authentic appearance, beginning of new things",
      hinders: "anonymity, going unnoticed, decisions that don't involve your public image"
    },
    mc: {
      archetype: "The Vocation / Summit",
      rules: "rules your vocation, social role, professional career, public authority, your visible place in society",
      facilitates: "recognition, professional achievements, public visibility, exercise of authority",
      hinders: "protected private life, traditional professional paths without passion, keeping low profile"
    }
  }
};


// ============================================================
// KEYWORDS — Palabras clave compactas para calendario y sumario
// Cada planeta tiene 3-4 palabras esenciales que resumen su naturaleza
// Cada aspecto tiene 2-3 palabras que describen su dinámica
// ============================================================
const planetKeywords = {
  es: {
    sun: "identidad, vitalidad, voluntad, propósito",
    moon: "emociones, hogar, intuición, nutrición",
    mercury: "mente, palabra, aprendizaje, conexiones",
    venus: "amor, belleza, valores, placer",
    mars: "acción, deseo, coraje, conflicto",
    jupiter: "expansión, fe, abundancia, sabiduría",
    saturn: "estructura, límite, madurez, autoridad",
    uranus: "libertad, ruptura, originalidad, despertar",
    neptune: "espiritualidad, sueños, disolución, misticismo",
    pluto: "poder, transformación, crisis, regeneración",
    asc: "identidad visible, presencia, imagen",
    mc: "vocación, carrera, reconocimiento público",
    chiron: "herida, sanación, maestría del dolor",
    true_node: "propósito kármico, dirección de vida",
    south_node: "talentos pasados, zona de confort",
    lilith: "sombra, poder reprimido, autonomía",
    fortuna: "flujo, suerte, prosperidad natural",
    infortunio: "pruebas, esfuerzo, carácter forjado"
  },
  en: {
    sun: "identity, vitality, will, purpose",
    moon: "emotions, home, intuition, nurturing",
    mercury: "mind, word, learning, connections",
    venus: "love, beauty, values, pleasure",
    mars: "action, desire, courage, conflict",
    jupiter: "expansion, faith, abundance, wisdom",
    saturn: "structure, limit, maturity, authority",
    uranus: "freedom, rupture, originality, awakening",
    neptune: "spirituality, dreams, dissolution, mysticism",
    pluto: "power, transformation, crisis, regeneration",
    asc: "visible identity, presence, image",
    mc: "vocation, career, public recognition",
    chiron: "wound, healing, mastery through pain",
    true_node: "karmic purpose, life direction",
    south_node: "past talents, comfort zone",
    lilith: "shadow, repressed power, autonomy",
    fortuna: "flow, luck, natural prosperity",
    infortunio: "trials, effort, forged character"
  }
};

const aspectKeywords = {
  es: {
    conjunction: "fusión, intensidad, inicio de ciclo",
    sextile: "oportunidad, fluidez con acción consciente",
    square: "tensión, fricción transformadora, exigencia",
    trine: "armonía, fluidez natural, gracia",
    opposition: "polaridad, espejo, confrontación clarificadora"
  },
  en: {
    conjunction: "fusion, intensity, cycle beginning",
    sextile: "opportunity, flow with conscious action",
    square: "tension, transformative friction, demand",
    trine: "harmony, natural flow, grace",
    opposition: "polarity, mirror, clarifying confrontation"
  }
};


// Texto específico para combinación tránsito × planeta natal (45 combinaciones × 2 idiomas)
// Estructura: [transitPlanet][natalPlanet] = { es: "...", en: "..." }
const transitToNatalMeaning = {
  jupiter: {
    sun: { es: "Júpiter expande tu identidad y vitalidad. Es un período de optimismo, reconocimiento y oportunidades de crecimiento personal. Algo de ti que estaba contenido busca brillar.", en: "Jupiter expands your identity and vitality. A period of optimism, recognition, and personal growth opportunities. Something contained in you seeks to shine." },
    moon: { es: "Júpiter abre tu mundo emocional. Las relaciones afectivas se amplían, hay temas de hogar, familia o maternidad/paternidad que toman protagonismo, y la sensibilidad se convierte en don.", en: "Jupiter opens your emotional world. Emotional relationships expand, themes of home, family, or parenthood take center stage, and sensitivity becomes a gift." },
    mercury: { es: "Júpiter agranda tu mente. Aprendizajes, viajes mentales, escritura, comunicación pública. Las ideas crecen y se vuelven contagiosas — es buen momento para enseñar o compartir lo que sabes.", en: "Jupiter expands your mind. Learning, mental journeys, writing, public communication. Ideas grow and become contagious — a good time to teach or share what you know." },
    venus: { es: "Júpiter agranda tu manera de amar y de disfrutar. Romance generoso, abundancia estética, momentos de gozo legítimo. Si estás soltero, alguien expansivo aparece. Si tienes pareja, hay celebración.", en: "Jupiter expands your way of loving and enjoying. Generous romance, aesthetic abundance, moments of legitimate joy. If single, someone expansive appears. If partnered, celebration." },
    mars: { es: "Júpiter le da combustible a tu acción. Proyectos que estaban dormidos despiertan, la energía física aumenta, los objetivos parecen más alcanzables. Cuidado con sobreextenderse.", en: "Jupiter gives fuel to your action. Dormant projects awaken, physical energy increases, goals seem more reachable. Be careful not to overextend." },
    jupiter: { es: "Tu Júpiter natal recibe el regreso de Júpiter (cada 12 años). Es un momento de balance: ¿en qué creías hace 12 años, en qué crees ahora? Nuevos votos espirituales, filosóficos, vitales.", en: "Your natal Jupiter receives Jupiter's return (every 12 years). A balance moment: what did you believe 12 years ago, what do you believe now? New spiritual, philosophical, vital vows." },
    saturn: { es: "Júpiter encuentra a Saturno natal — la expansión y la estructura se negocian. Es momento de hacer crecer lo que ya tienes con disciplina, no de lanzarte a aventuras nuevas sin base.", en: "Jupiter meets natal Saturn — expansion and structure negotiate. A time to grow what you already have with discipline, not to launch into new ventures without foundation." },
    uranus: { es: "Júpiter activa tu Urano natal. Tu chispa rebelde recibe oportunidades reales: lo original puede materializarse, lo libre encuentra apoyo, las ideas innovadoras prosperan.", en: "Jupiter activates your natal Uranus. Your rebellious spark receives real opportunities: the original can materialize, the free finds support, innovative ideas prosper." },
    neptune: { es: "Júpiter abraza a Neptuno natal. Tu sensibilidad espiritual se expande, los sueños toman dimensión, lo creativo florece — pero cuidado con idealizar en exceso o creer demasiado fácil.", en: "Jupiter embraces natal Neptune. Your spiritual sensitivity expands, dreams take dimension, the creative flourishes — but beware of over-idealizing or believing too easily." },
    pluto: { es: "Júpiter expande el poder de Plutón natal. Tu fuerza interior crece, los recursos compartidos pueden multiplicarse, hay oportunidades en transformaciones profundas.", en: "Jupiter expands the power of natal Pluto. Your inner force grows, shared resources may multiply, opportunities arise in deep transformations." },
    asc: { es: "Júpiter cruza tu Ascendente. Cambias visiblemente: la imagen, el cuerpo, la presencia. Es uno de los tránsitos más afortunados — una nueva versión de ti se presenta al mundo.", en: "Jupiter crosses your Ascendant. You change visibly: image, body, presence. One of the most fortunate transits — a new version of you presents itself to the world." },
    mc: { es: "Júpiter toca tu Medio Cielo. Reconocimiento profesional, nuevas posibilidades de carrera, status que se eleva. Es momento de visibilidad pública estratégica.", en: "Jupiter touches your Midheaven. Professional recognition, new career possibilities, rising status. Time for strategic public visibility." }
  },
  saturn: {
    sun: { es: "Saturno pesa sobre tu identidad. Es momento de madurar, de asumir responsabilidades reales, de soltar máscaras juveniles. Lo que construyas ahora será tu autoridad de los próximos años.", en: "Saturn weighs on your identity. Time to mature, take real responsibilities, drop youthful masks. What you build now will be your authority for years to come." },
    moon: { es: "Saturno enfrenta tu mundo emocional. Sensación de soledad o seriedad afectiva, replanteamiento de relaciones de cuidado, llegada del adulto interior. Sin huida posible: hay que sentir y madurar.", en: "Saturn confronts your emotional world. Feeling of solitude or emotional seriousness, rethinking caregiving relationships, arrival of inner adult. No escape: feel and mature." },
    mercury: { es: "Saturno disciplina tu mente. Pensamientos serios, decisiones que requieren rigor, posibles bloqueos comunicativos que en realidad son llamados a hablar con más sustancia.", en: "Saturn disciplines your mind. Serious thoughts, decisions requiring rigor, possible communication blocks that are actually calls to speak with more substance." },
    venus: { es: "Saturno prueba tu manera de amar. Las relaciones se vuelven más serias o se ponen a prueba; lo superficial se aleja, lo real se consolida. Posible compromiso o fin definitivo.", en: "Saturn tests your way of loving. Relationships become more serious or are tested; superficial moves away, real consolidates. Possible commitment or definitive ending." },
    mars: { es: "Saturno frena a Marte natal. La acción se vuelve más metódica, los impulsos se calman, la energía requiere disciplina. Frustración si pretendes ir rápido.", en: "Saturn restrains natal Mars. Action becomes more methodical, impulses calm, energy requires discipline. Frustration if you push for speed." },
    jupiter: { es: "Saturno regula a Júpiter natal. Tu fe se pone a prueba, las creencias optimistas se contrastan con la realidad concreta. Lo que sobreviva será sabiduría real, no fantasía.", en: "Saturn regulates natal Jupiter. Your faith is tested, optimistic beliefs are contrasted with concrete reality. What survives will be real wisdom, not fantasy." },
    saturn: { es: "Saturno regresa a su lugar natal (cada 29 años) o cuadra/se opone a sí mismo. Hito de madurez vital. Revisión total de tu estructura existencial.", en: "Saturn returns to its natal place (every 29 years) or squares/opposes itself. Life maturity milestone. Total review of your existential structure." },
    uranus: { es: "Saturno encuentra a Urano natal. Tensión entre tu necesidad de libertad y la demanda de responsabilidad. ¿Cómo ser original sin desarmarlo todo? Pregunta clave.", en: "Saturn meets natal Uranus. Tension between your need for freedom and demand for responsibility. How to be original without dismantling everything? Key question." },
    neptune: { es: "Saturno aterriza a Neptuno natal. Los sueños deben demostrar viabilidad concreta. Posible desencanto inicial seguido de la maduración del don espiritual o creativo.", en: "Saturn grounds natal Neptune. Dreams must show concrete viability. Possible initial disenchantment followed by maturation of spiritual or creative gift." },
    pluto: { es: "Saturno encuentra el poder de Plutón natal. Reestructuración profunda de tus recursos de fuerza interior. Lo que era poder bruto se vuelve autoridad madura.", en: "Saturn meets natal Pluto's power. Deep restructuring of your inner force resources. What was raw power becomes mature authority." },
    asc: { es: "Saturno cruza tu Ascendente. Reformulación de tu presentación al mundo, posible envejecimiento visible que en realidad es cristalización de identidad. Cambio de imagen serio.", en: "Saturn crosses your Ascendant. Reformulation of your presentation to the world, possible visible aging that is actually identity crystallization. Serious image change." },
    mc: { es: "Saturno toca tu Medio Cielo. Cumbre o crisis profesional. Lo construido se prueba; si tiene base, se consolida; si era inflado, colapsa. Llamado a tomar autoridad real.", en: "Saturn touches your Midheaven. Professional summit or crisis. What was built is tested; if it has foundation, it consolidates; if it was inflated, it collapses. Call to take real authority." }
  },
  uranus: {
    sun: { es: "Urano sacude tu identidad. Sentimiento de querer ser otra persona, intolerancia a las viejas etiquetas, ráfagas de claridad sobre quién eres realmente. Cambios externos siguiendo la liberación interna.", en: "Uranus shakes your identity. Feeling of wanting to be someone else, intolerance for old labels, flashes of clarity about who you really are. External changes following inner liberation." },
    moon: { es: "Urano libera tu mundo emocional. Cambios bruscos en cómo te sientes, en con quién quieres estar, en qué te nutre. La rutina afectiva ya no funciona — algo nuevo necesita nacer.", en: "Uranus liberates your emotional world. Abrupt changes in how you feel, with whom you want to be, what nourishes you. The emotional routine no longer works — something new needs to be born." },
    mercury: { es: "Urano electrifica tu mente. Pensamientos brillantes y disruptivos, ideas que llegan como rayos, comunicaciones inesperadas. Tu manera de hablar y escribir se vuelve más original.", en: "Uranus electrifies your mind. Brilliant disruptive thoughts, ideas arriving like lightning, unexpected communications. Your way of speaking and writing becomes more original." },
    venus: { es: "Urano revoluciona tu vida amorosa. Atracciones inusuales, relaciones que ya no caben, formas no convencionales de amar. Si estás en pareja: prueba o transformación; si estás solo: encuentros sorpresa.", en: "Uranus revolutionizes your love life. Unusual attractions, relationships that no longer fit, unconventional ways of loving. If partnered: test or transformation; if single: surprise encounters." },
    mars: { es: "Urano potencia tu Marte. La acción se vuelve impulsiva pero brillante, decisiones rápidas, ganas de iniciar lo que sea. Cuidado con la temeridad — la energía es real pero exige timing.", en: "Uranus boosts your Mars. Action becomes impulsive but brilliant, quick decisions, desire to initiate anything. Beware recklessness — energy is real but demands timing." },
    jupiter: { es: "Urano amplifica a Júpiter natal. Las creencias se renuevan súbitamente, viajes inesperados, cambios filosóficos profundos. Una nueva visión del mundo emerge desde lo que parecía caos.", en: "Uranus amplifies natal Jupiter. Beliefs renew suddenly, unexpected journeys, deep philosophical changes. A new worldview emerges from what seemed chaos." },
    saturn: { es: "Urano confronta a Saturno natal. Ruptura de estructuras viejas que ya no sirven. Liberación de obligaciones que cargabas por inercia. Posible reinvención profesional o de roles.", en: "Uranus confronts natal Saturn. Rupture of old structures that no longer serve. Liberation from obligations carried by inertia. Possible professional or role reinvention." },
    uranus: { es: "Urano hace cuadratura/oposición a sí mismo (crisis de mediana edad ~42 años) o regresa (~84 años). Hito vital de individuación. La verdadera identidad pide manifestarse.", en: "Uranus squares/opposes itself (midlife crisis ~age 42) or returns (~age 84). Vital individuation milestone. True identity asks to manifest." },
    neptune: { es: "Urano despierta a Neptuno natal. Visiones nuevas, ruptura de espejismos, posibles experiencias místicas o creativas potentes. Lo espiritual se vuelve revolucionario.", en: "Uranus awakens natal Neptune. New visions, rupture of mirages, possible powerful mystical or creative experiences. The spiritual becomes revolutionary." },
    pluto: { es: "Urano libera el poder de Plutón natal. Transformaciones radicales aceleradas, cambios profundos en cómo ejerces tu poder personal, ruptura con dinámicas tóxicas heredadas.", en: "Uranus liberates natal Pluto's power. Accelerated radical transformations, deep changes in how you exercise personal power, rupture with inherited toxic dynamics." },
    asc: { es: "Urano cruza tu Ascendente. Cambio de imagen total, despertar de quien realmente eres, posibles cambios físicos visibles. Es un nuevo nacimiento — tres a cinco años de redefinición.", en: "Uranus crosses your Ascendant. Total image change, awakening of who you really are, possible visible physical changes. A new birth — three to five years of redefinition." },
    mc: { es: "Urano toca tu Medio Cielo. Cambio brusco de carrera o vocación, ruptura con expectativas familiares o sociales sobre tu rol público. Tu trabajo se vuelve más auténticamente tuyo.", en: "Uranus touches your Midheaven. Abrupt career or vocation change, breaking from family or social expectations about your public role. Your work becomes more authentically yours." }
  },
  neptune: {
    sun: { es: "Neptuno disuelve los bordes de tu identidad. Sensación de no saber quién eres, mayor sensibilidad y conexión espiritual, posible confusión sobre tu rumbo. Tiempo de meditar, no de decidir.", en: "Neptune dissolves your identity boundaries. Feeling of not knowing who you are, greater sensitivity and spiritual connection, possible confusion about your direction. Time to meditate, not decide." },
    moon: { es: "Neptuno bañ tus emociones. Hipersensibilidad, sueños vívidos, conexión empática con los demás, pero también posible disolución de límites afectivos. Cuidado con quien te rodea.", en: "Neptune bathes your emotions. Hypersensitivity, vivid dreams, empathic connection with others, but also possible dissolution of emotional boundaries. Be careful who surrounds you." },
    mercury: { es: "Neptuno difumina tu mente. Pensamiento poético e intuitivo, pero menos lógico. Buen tiempo para arte, espiritualidad o escritura inspirada — mal tiempo para contratos legales.", en: "Neptune blurs your mind. Poetic and intuitive thinking, but less logical. Good time for art, spirituality, or inspired writing — bad time for legal contracts." },
    venus: { es: "Neptuno romantiza tu Venus. Idealización en el amor, atracción por lo místico o artístico, posibles desilusiones si proyectas demasiado. Compasión genuina o fantasía: la línea es fina.", en: "Neptune romanticizes your Venus. Idealization in love, attraction to the mystical or artistic, possible disillusionment if you project too much. Genuine compassion or fantasy: the line is thin." },
    mars: { es: "Neptuno disuelve tu Marte. La energía se vuelve esquiva, los objetivos confusos, la acción menos definida. Pero también es momento de orientarla a causas espirituales o creativas.", en: "Neptune dissolves your Mars. Energy becomes elusive, goals confusing, action less defined. But also a time to direct it toward spiritual or creative causes." },
    jupiter: { es: "Neptuno expande la fe de Júpiter natal. Visiones grandiosas, idealismo elevado, espiritualidad amplia. Cuidado con creer demasiado fácil o prometer más de lo posible.", en: "Neptune expands natal Jupiter's faith. Grand visions, elevated idealism, broad spirituality. Beware of believing too easily or promising more than possible." },
    saturn: { es: "Neptuno disuelve la estructura de Saturno natal. Lo que parecía sólido se cuestiona, las certezas se vuelven dudas. Llamado a una autoridad más sutil, basada en sabiduría no en rigidez.", en: "Neptune dissolves natal Saturn's structure. What seemed solid is questioned, certainties become doubts. Call to subtler authority, based on wisdom not rigidity." },
    uranus: { es: "Neptuno encuentra a Urano natal. Visiones revolucionarias se mezclan con sensibilidad espiritual. Posibles experiencias místicas que cambian tu manera de ver lo posible.", en: "Neptune meets natal Uranus. Revolutionary visions mix with spiritual sensitivity. Possible mystical experiences changing your view of the possible." },
    neptune: { es: "Neptuno hace cuadratura a sí mismo (~40 años) u otro aspecto. Crisis espiritual o creativa, llamado al servicio o a la mística genuina. La realidad se redefine.", en: "Neptune squares itself (~age 40) or other aspect. Spiritual or creative crisis, call to service or genuine mysticism. Reality redefines itself." },
    pluto: { es: "Neptuno disuelve el poder denso de Plutón natal. Transformaciones que ya no son brutales sino sutiles, espiritualizadas. Lo que muere muere con compasión.", en: "Neptune dissolves natal Pluto's dense power. Transformations no longer brutal but subtle, spiritualized. What dies, dies with compassion." },
    asc: { es: "Neptuno cruza tu Ascendente. Tu imagen se vuelve más etérea, las personas te perciben como misterioso o espiritual. Posible pérdida de definición — necesitas anclar la identidad.", en: "Neptune crosses your Ascendant. Your image becomes more ethereal, people perceive you as mysterious or spiritual. Possible loss of definition — you need to anchor identity." },
    mc: { es: "Neptuno toca tu Medio Cielo. Vocación que se vuelve más espiritual, artística o de servicio. Posible confusión profesional que es en realidad un llamado a una nueva dirección.", en: "Neptune touches your Midheaven. Vocation becoming more spiritual, artistic, or service-oriented. Possible professional confusion that is actually a call to a new direction." }
  },
  pluto: {
    sun: { es: "Plutón transforma tu identidad desde la raíz. Crisis de poder, encuentros con la sombra, muerte simbólica de quien eras. Lo que emerja después será más auténtico y poderoso.", en: "Pluto transforms your identity from the root. Power crisis, encounters with shadow, symbolic death of who you were. What emerges will be more authentic and powerful." },
    moon: { es: "Plutón remueve el fondo de tus emociones. Material reprimido sale a la luz, vínculos profundos se confrontan, posible duelo o renacimiento emocional. Trabajo terapéutico recomendado.", en: "Pluto stirs the bottom of your emotions. Repressed material surfaces, deep bonds are confronted, possible grief or emotional rebirth. Therapeutic work recommended." },
    mercury: { es: "Plutón intensifica tu mente. Pensamientos obsesivos pero también investigaciones profundas, palabras con peso real, comunicaciones que transforman. Posible giro intelectual radical.", en: "Pluto intensifies your mind. Obsessive thoughts but also deep investigations, words with real weight, communications that transform. Possible radical intellectual turn." },
    venus: { es: "Plutón transforma tu Venus. Encuentros amorosos intensos hasta lo obsesivo, relaciones que no admiten medias tintas, vínculos donde se juega la vida emocional. Pasión o ruptura.", en: "Pluto transforms your Venus. Love encounters intense to the obsessive, relationships that admit no halftones, bonds where emotional life is at stake. Passion or rupture." },
    mars: { es: "Plutón potencia tu Marte. Energía explosiva, capacidad de acción transformadora, pero también posibilidad de conflictos profundos. Tu fuerza encuentra su nivel real.", en: "Pluto boosts your Mars. Explosive energy, capacity for transformative action, but also possibility of deep conflicts. Your strength finds its real level." },
    jupiter: { es: "Plutón intensifica a Júpiter natal. Crecimiento radical en lo filosófico o espiritual, encuentros que cambian tu visión del mundo, expansiones que tienen carácter de iniciación.", en: "Pluto intensifies natal Jupiter. Radical growth in philosophy or spirituality, encounters that change worldview, expansions with initiatory character." },
    saturn: { es: "Plutón confronta a Saturno natal. Reestructuración profunda de tu autoridad, posible derrumbe de estructuras viejas, llamado a construir desde el poder real.", en: "Pluto confronts natal Saturn. Deep restructuring of your authority, possible collapse of old structures, call to build from real power." },
    uranus: { es: "Plutón encuentra a Urano natal. Revoluciones internas profundas, cambios irreversibles en la manera de ejercer tu libertad, ruptura definitiva con lo que te ataba.", en: "Pluto meets natal Uranus. Deep internal revolutions, irreversible changes in how you exercise freedom, definitive rupture with what bound you." },
    neptune: { es: "Plutón transforma a Neptuno natal. Sueños y espiritualidad atraviesan crisis profunda, posibles desencantos que llevan a una mística más madura. Lo ilusorio cae.", en: "Pluto transforms natal Neptune. Dreams and spirituality undergo deep crisis, possible disenchantments leading to more mature mysticism. The illusory falls." },
    pluto: { es: "Plutón hace cuadratura/oposición a sí mismo (mediana edad). Iniciación profunda, encuentro con la mortalidad o el poder real, total redefinición de lo que importa.", en: "Pluto squares/opposes itself (midlife). Deep initiation, encounter with mortality or real power, total redefinition of what matters." },
    asc: { es: "Plutón cruza tu Ascendente. Renacimiento total de tu identidad visible. Pasados varios años, no eres ni físicamente ni psicológicamente la misma persona. Iniciación profunda.", en: "Pluto crosses your Ascendant. Total rebirth of your visible identity. After several years, you are neither physically nor psychologically the same person. Deep initiation." },
    mc: { es: "Plutón toca tu Medio Cielo. Transformación radical de tu carrera o vocación, posible derrumbe de la fachada profesional para que emerja lo auténtico. Reinvención total.", en: "Pluto touches your Midheaven. Radical transformation of career or vocation, possible collapse of professional facade so the authentic can emerge. Total reinvention." }
  }
};

// Hash de aspecto en español/inglés a clave canónica
function aspectKey(name) {
  const map = {
    'Conjunción':'conjunction', 'Conjunction':'conjunction',
    'Sextil':'sextile', 'Sextile':'sextile',
    'Cuadratura':'square', 'Square':'square',
    'Trígono':'trine', 'Trine':'trine',
    'Oposición':'opposition', 'Opposition':'opposition'
  };
  return map[name] || null;
}

// ============================================================
// FORMAT HELPERS
// ============================================================
function relativeDate(dateStr) {
  const datePart = dateStr.split(' ')[0]; // YYYY-MM-DD
  const targetDate = new Date(datePart + 'T12:00:00Z');
  const now = new Date();
  const diffMs = targetDate - now;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return t('today');
  if (diffDays === 1) return t('tomorrow');
  if (diffDays === -1) return t('yesterday');
  if (diffDays > 0 && diffDays < 60) return t('in_days').replace('{n}', diffDays);
  if (diffDays < 0 && diffDays > -60) return t('days_ago').replace('{n}', Math.abs(diffDays));
  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths > 0) return t('in_months').replace('{n}', diffMonths);
  return t('months_ago').replace('{n}', Math.abs(diffMonths));
}

function formatLongDate(dateStr) {
  const [datePart, timePart] = dateStr.split(' ');
  const [y, m, d] = datePart.split('-').map(Number);
  const months = i18n[currentLang].months;
  return `${d} ${months[m-1]} ${y}`;
}

function shortDate(dateStr) {
  const [datePart] = dateStr.split(' ');
  const [y, m, d] = datePart.split('-').map(Number);
  const months = i18n[currentLang].months;
  return `${d} ${months[m-1].slice(0,3)}`;
}

// ============================================================
// CHART DRAWING (SVG)
// ============================================================
function drawNatalChart(data) {
  const svg = document.getElementById('natal-chart');
  const cx = 240, cy = 240;
  const rOuter = 230, rZodiac = 200, rCusp = 165, rPlanet = 130, rInner = 75;
  const asc = data.natal_chart.asc.longitude;

  // Map ecliptic longitude to chart angle (counter-clockwise convention)
  // ASC (longitude = asc) -> 180° (left side of chart, 9 o'clock)
  // Increasing longitude -> counter-clockwise (towards bottom, then right, then top)
  // SVG y-axis is inverted, so we negate the sin in plot calls — but the angle math
  // here returns standard math angles where increasing angle = counter-clockwise
  function lonToAngle(lon) {
    return ((180 + (lon - asc)) % 360 + 360) % 360 * Math.PI / 180;
  }

  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const inkColor = dark ? '#efece5' : '#1a1a1a';
  const lineColor = dark ? '#3d3a35' : '#d4d2c8';
  const lineSoftColor = dark ? '#2c2a26' : '#e8e6df';
  const inkSoftColor = dark ? '#b5b0a3' : '#57564f';
  const inkFaintColor = dark ? '#807a6e' : '#8a897f';
  const bgColor = dark ? '#1a1816' : '#fafaf7';

  let s = '';

  // Outer ring (zodiac)
  s += `<circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="none" stroke="${lineColor}" stroke-width="0.5"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rZodiac}" fill="none" stroke="${inkColor}" stroke-width="0.8"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rCusp}" fill="none" stroke="${lineColor}" stroke-width="0.4" stroke-dasharray="2,3"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rInner}" fill="none" stroke="${lineColor}" stroke-width="0.5"/>`;

  // Zodiac divisions every 30°, ticks every 5°
  for (let i = 0; i < 360; i += 5) {
    const angle = lonToAngle(i);
    const isMajor = i % 30 === 0;
    const isMid = i % 10 === 0;
    const tickIn = isMajor ? rZodiac : (isMid ? rZodiac + 4 : rZodiac + 6);
    const tickOut = rOuter;
    const x1 = cx + tickIn * Math.cos(angle);
    const y1 = cy - tickIn * Math.sin(angle);
    const x2 = cx + tickOut * Math.cos(angle);
    const y2 = cy - tickOut * Math.sin(angle);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isMajor ? inkColor : (isMid ? inkSoftColor : lineColor)}" stroke-width="${isMajor ? 0.7 : 0.3}"/>`;
  }

  // Sign glyphs
  for (let i = 0; i < 12; i++) {
    const midAngle = lonToAngle(i * 30 + 15);
    const gx = cx + ((rZodiac + rOuter) / 2) * Math.cos(midAngle);
    const gy = cy - ((rZodiac + rOuter) / 2) * Math.sin(midAngle);
    s += `<text x="${gx}" y="${gy}" font-size="15" text-anchor="middle" dominant-baseline="middle" fill="${inkSoftColor}" font-family="serif">${SIGN_GLYPHS[i]}</text>`;
  }

  // House cusps + degrees
  for (let i = 0; i < 12; i++) {
    const lon = data.natal_chart.houses[i].longitude;
    const angle = lonToAngle(lon);
    const x1 = cx + rInner * Math.cos(angle);
    const y1 = cy - rInner * Math.sin(angle);
    const x2 = cx + rZodiac * Math.cos(angle);
    const y2 = cy - rZodiac * Math.sin(angle);
    const houseNum = i + 1;
    const isAngle = (houseNum === 1 || houseNum === 4 || houseNum === 7 || houseNum === 10);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isAngle ? inkColor : lineColor}" stroke-width="${isAngle ? 1.2 : 0.5}" ${isAngle ? '' : 'stroke-dasharray="3,3"'}/>`;

    // House number (in inner area)
    const nextLon = data.natal_chart.houses[(i + 1) % 12].longitude;
    let arc = (nextLon - lon + 360) % 360;
    let midLon = (lon + arc/2) % 360;
    const nAngle = lonToAngle(midLon);
    const nx = cx + (rInner + 14) * Math.cos(nAngle);
    const ny = cy - (rInner + 14) * Math.sin(nAngle);
    s += `<text x="${nx}" y="${ny}" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${inkFaintColor}" font-weight="500">${houseNum}</text>`;

    // Cusp degree label (small)
    const deg = Math.floor(lon % 30);
    const dx = cx + (rZodiac - 10) * Math.cos(angle);
    const dy = cy - (rZodiac - 10) * Math.sin(angle);
    s += `<text x="${dx}" y="${dy}" font-size="7" text-anchor="middle" dominant-baseline="middle" fill="${inkFaintColor}">${deg}°</text>`;
  }

  // ASC, DC, MC, IC labels outside
  const labels = [
    { lon: data.natal_chart.asc.longitude, text: 'AC' },
    { lon: (data.natal_chart.asc.longitude + 180) % 360, text: 'DC' },
    { lon: data.natal_chart.mc.longitude, text: 'MC' },
    { lon: (data.natal_chart.mc.longitude + 180) % 360, text: 'IC' }
  ];
  labels.forEach(l => {
    const angle = lonToAngle(l.lon);
    const lx = cx + (rOuter + 12) * Math.cos(angle);
    const ly = cy - (rOuter + 12) * Math.sin(angle);
    s += `<text x="${lx}" y="${ly}" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="${inkColor}" font-weight="600">${l.text}</text>`;
  });

  // Aspect lines between natal planets (inner)
  if (data.natal_chart.aspects) {
    const aspectColors = {
      'Conjunción': '#999', 'Conjunction': '#999',
      'Sextil': '#5e9b76', 'Sextile': '#5e9b76',
      'Cuadratura': '#c44f4f', 'Square': '#c44f4f',
      'Trígono': '#4a8fb8', 'Trine': '#4a8fb8',
      'Oposición': '#8b3a62', 'Opposition': '#8b3a62'
    };
    data.natal_chart.aspects.forEach(asp => {
      // Skip aspects involving ASC/MC for visual clarity (they're shown separately)
      if (asp.planet1 === 'asc' || asp.planet2 === 'asc' || asp.planet1 === 'mc' || asp.planet2 === 'mc') return;
      const a1 = lonToAngle(asp.lon1);
      const a2 = lonToAngle(asp.lon2);
      const x1 = cx + rInner * Math.cos(a1);
      const y1 = cy - rInner * Math.sin(a1);
      const x2 = cx + rInner * Math.cos(a2);
      const y2 = cy - rInner * Math.sin(a2);
      const color = aspectColors[asp.aspect.name_es] || '#999';
      const opacity = Math.max(0.15, 1 - asp.aspect.orb / 8);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="0.5" opacity="${opacity.toFixed(2)}"/>`;
    });
  }

  // Natal planets — anti-collision
  // Combinar planetas principales + puntos extras (si existen)
  const planetList = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'];
  const extras = data.natal_chart.extras || {};

  // Construir lista combinada
  const positions = [];
  planetList.forEach(p => {
    if (data.natal_chart.planets[p]) {
      positions.push({
        name: p,
        lon: data.natal_chart.planets[p].longitude,
        retro: data.natal_chart.planets[p].retrograde,
        deg: data.natal_chart.planets[p].degree,
        min: data.natal_chart.planets[p].minute,
        kind: 'planet'
      });
    }
  });
  EXTRA_POINTS.forEach(p => {
    if (extras[p]) {
      positions.push({
        name: p,
        lon: extras[p].longitude,
        retro: extras[p].retrograde,
        deg: extras[p].degree,
        min: extras[p].minute,
        kind: 'extra'
      });
    }
  });

  positions.sort((a,b) => a.lon - b.lon);
  const placedRadii = positions.map(() => rPlanet);
  for (let i = 0; i < positions.length; i++) {
    for (let j = i+1; j < positions.length; j++) {
      let diff = Math.abs(positions[i].lon - positions[j].lon);
      if (diff > 180) diff = 360 - diff;
      if (diff < 8 && placedRadii[i] === placedRadii[j]) placedRadii[j] = rPlanet - 24;
    }
  }

  positions.forEach((p, idx) => {
    const angle = lonToAngle(p.lon);
    const r = placedRadii[idx];
    const px = cx + r * Math.cos(angle);
    const py = cy - r * Math.sin(angle);

    // Tick from planet to zodiac
    const tickIn = cx + (rCusp + 1) * Math.cos(angle);
    const tickInY = cy - (rCusp + 1) * Math.sin(angle);
    const tickOut = cx + (rZodiac - 1) * Math.cos(angle);
    const tickOutY = cy - (rZodiac - 1) * Math.sin(angle);
    s += `<line x1="${tickIn}" y1="${tickInY}" x2="${tickOut}" y2="${tickOutY}" stroke="${inkSoftColor}" stroke-width="0.4"/>`;

    // Estilo distinto para puntos extras (más sutil)
    const isExtra = p.kind === 'extra';
    const radius = isExtra ? 10 : 12;
    const fontSize = isExtra ? 12 : 14;
    const opacity = isExtra ? 0.75 : 1.0;
    const strokeWidth = isExtra ? 0.4 : 0.6;
    const textColor = isExtra ? inkSoftColor : inkColor;

    s += `<circle cx="${px}" cy="${py}" r="${radius}" fill="${bgColor}" stroke="${inkColor}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
    s += `<text x="${px}" y="${py}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle" fill="${textColor}" font-family="serif" opacity="${opacity}">${PLANET_GLYPHS[p.name]}</text>`;

    if (p.retro) {
      s += `<text x="${px+10}" y="${py-9}" font-size="7" text-anchor="middle" fill="#b85c5c" font-weight="600">℞</text>`;
    }

    // Degree label below planet
    s += `<text x="${px}" y="${py+22}" font-size="7" text-anchor="middle" fill="${inkFaintColor}">${p.deg}°${String(p.min).padStart(2,'0')}'</text>`;
  });

  // Transit planets (the 5 slow ones)
  TRANSIT_PLANETS.forEach(tp => {
    if (!data.transits.positions[tp]) return;
    const tLon = data.transits.positions[tp].longitude;
    const tRetro = data.transits.positions[tp].retrograde;
    const angle = lonToAngle(tLon);
    const r = rZodiac - 14;
    const tx = cx + r * Math.cos(angle);
    const ty = cy - r * Math.sin(angle);
    const color = PLANET_COLORS[tp];
    const isFocus = tp === currentFocusPlanet;
    const sz = isFocus ? 13 : 10;

    s += `<circle cx="${tx}" cy="${ty}" r="${sz}" fill="${bgColor}" stroke="${color}" stroke-width="${isFocus ? 1.8 : 1.2}" opacity="${isFocus ? 1 : 0.7}"/>`;
    s += `<text x="${tx}" y="${ty}" font-size="${sz*1.05}" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-family="serif" opacity="${isFocus ? 1 : 0.85}">${PLANET_GLYPHS[tp]}</text>`;
    if (tRetro) {
      s += `<text x="${tx+sz*0.7}" y="${ty-sz*0.7}" font-size="7" text-anchor="middle" fill="#b85c5c" font-weight="600">℞</text>`;
    }
  });

  s += `<circle cx="${cx}" cy="${cy}" r="2" fill="${inkColor}"/>`;
  svg.innerHTML = s;
}

// ============================================================
// EXTRA POINTS INTERPRETATION
// ============================================================
function generateExtraPointsInterpretation(data) {
  const lang = currentLang;
  const extras = data.natal_chart.extras;
  if (!extras) return '';

  const houseInfo = (h) => houseInterp[lang][h];

  let html = `<h3>${lang === 'es' ? 'Puntos kármicos y arábigos en tu carta' : 'Karmic and Arabic points in your chart'}</h3>`;

  if (lang === 'es') {
    html += `<p>Más allá de los planetas, tu carta natal tiene puntos sensibles que aportan capas de significado profundo: la herida del alma, las direcciones kármicas, la sombra creativa, y las claves de fortuna y dificultad.</p>`;
  } else {
    html += `<p>Beyond the planets, your natal chart has sensitive points that add layers of deep meaning: the soul's wound, karmic directions, the creative shadow, and the keys to fortune and difficulty.</p>`;
  }

  // Quirón
  if (extras.chiron) {
    const c = extras.chiron;
    if (lang === 'es') {
      html += `<h3>⚷ Quirón en ${c.sign}, Casa ${c.house}</h3>`;
      html += `<p>Quirón es <em>el sanador herido</em>, el centauro mítico que enseñaba a los héroes lo que nunca pudo curarse en sí mismo. En tu carta, Quirón está en <strong>${c.sign}</strong>, lo cual indica el sabor energético de tu herida más profunda — esa que cargas desde antes de saber por qué duele. Su ubicación en tu <strong>Casa ${c.house}</strong> (${houseInfo(c.house).short}) muestra el área de tu vida donde esa herida se hace más visible.</p>`;
      html += `<p>La paradoja de Quirón es generosa: aquello que más te ha dolido es exactamente lo que puedes ofrecer al mundo como medicina. Las personas vienen a ti instintivamente buscando lo que tú aprendiste a vivir con dolor. No tienes que estar completamente sano para servir desde Quirón — basta con haber atravesado.</p>`;
    } else {
      html += `<h3>⚷ Chiron in ${c.sign}, House ${c.house}</h3>`;
      html += `<p>Chiron is <em>the wounded healer</em>, the mythical centaur who taught heroes what he could never heal in himself. In your chart, Chiron is in <strong>${c.sign}</strong>, indicating the energetic flavor of your deepest wound — the one you carry from before knowing why it hurts. Its location in your <strong>House ${c.house}</strong> (${houseInfo(c.house).short}) shows where this wound becomes most visible.</p>`;
      html += `<p>Chiron's paradox is generous: what has hurt you most is exactly what you can offer the world as medicine. People come to you instinctively seeking what you learned to live through with pain. You don't have to be fully healed to serve from Chiron — having crossed through is enough.</p>`;
    }
  }

  // Nodos lunares (Norte y Sur juntos — son un eje)
  if (extras.true_node && extras.south_node) {
    const nn = extras.true_node;
    const sn = extras.south_node;
    if (lang === 'es') {
      html += `<h3>☊ Nodo Norte en ${nn.sign}, Casa ${nn.house} · ☋ Nodo Sur en ${sn.sign}, Casa ${sn.house}</h3>`;
      html += `<p>Los Nodos Lunares son el eje kármico de tu carta. El <strong>Nodo Sur</strong> en ${sn.sign}, Casa ${sn.house} (${houseInfo(sn.house).short}) representa lo que ya dominas — los regalos y comodidades de otras vidas, las habilidades que ya no necesitas demostrar. Es tu zona de confort, donde puedes operar con los ojos cerrados pero ya no encuentras crecimiento real.</p>`;
      html += `<p>El <strong>Nodo Norte</strong> en ${nn.sign}, Casa ${nn.house} (${houseInfo(nn.house).short}) indica hacia dónde te llama la vida en esta encarnación. Es el rumbo desconocido, el que se siente extraño al principio pero donde tu alma está creciendo. Cada vez que te empujes a habitar las cualidades del Nodo Norte aunque te incomoden, estás cumpliendo tu propósito de vida.</p>`;
      html += `<div class="pull">El secreto de los Nodos no es renunciar al Sur, sino llevar sus dones al territorio nuevo del Norte.</div>`;
    } else {
      html += `<h3>☊ North Node in ${nn.sign}, House ${nn.house} · ☋ South Node in ${sn.sign}, House ${sn.house}</h3>`;
      html += `<p>The Lunar Nodes are the karmic axis of your chart. The <strong>South Node</strong> in ${sn.sign}, House ${sn.house} (${houseInfo(sn.house).short}) represents what you already master — gifts from past lives, skills you no longer need to prove. It's your comfort zone where you can operate with eyes closed but no longer find real growth.</p>`;
      html += `<p>The <strong>North Node</strong> in ${nn.sign}, House ${nn.house} (${houseInfo(nn.house).short}) indicates where life is calling you in this incarnation. It's the unknown direction, strange at first, but where your soul is growing. Every time you push yourself to inhabit North Node qualities even when uncomfortable, you're fulfilling your life purpose.</p>`;
      html += `<div class="pull">The Nodes' secret isn't renouncing the South, but bringing its gifts into the North's new territory.</div>`;
    }
  }

  // Lilith
  if (extras.lilith) {
    const l = extras.lilith;
    if (lang === 'es') {
      html += `<h3>⚸ Lilith en ${l.sign}, Casa ${l.house}</h3>`;
      html += `<p>Lilith es la <em>luna negra</em> — la primera mujer del mito hebreo que se negó a someterse y fue exiliada. En astrología representa lo que has reprimido, lo que la sociedad te dijo que no era aceptable expresar, tu poder más salvaje y autónomo. En <strong>${l.sign}</strong>, Casa ${l.house} (${houseInfo(l.house).short}), Lilith muestra el espacio de tu carta donde guardas tu sombra creativa y sexual.</p>`;
      html += `<p>Trabajar con Lilith no es dejarla salir descontroladamente — es dejar de avergonzarse de su existencia. Cuando integras a Lilith, dejas de pedir permiso para ser tú mismo en esa área de tu vida.</p>`;
    } else {
      html += `<h3>⚸ Lilith in ${l.sign}, House ${l.house}</h3>`;
      html += `<p>Lilith is the <em>black moon</em> — the first woman of Hebrew myth who refused to submit and was exiled. In astrology she represents what you've repressed, what society told you wasn't acceptable to express, your wildest and most autonomous power. In <strong>${l.sign}</strong>, House ${l.house} (${houseInfo(l.house).short}), Lilith shows where you keep your creative and sexual shadow.</p>`;
      html += `<p>Working with Lilith isn't letting her out wildly — it's no longer being ashamed of her existence. When you integrate Lilith, you stop asking permission to be yourself in that area of your life.</p>`;
    }
  }

  // Fortuna
  if (extras.fortuna) {
    const f = extras.fortuna;
    const isDiurnal = data.birth_data.is_diurnal;
    if (lang === 'es') {
      html += `<h3>⊕ Rueda de la Fortuna en ${f.sign}, Casa ${f.house}</h3>`;
      html += `<p>Calculada como ASC + Luna − Sol (porque tu carta es ${isDiurnal ? 'diurna' : 'nocturna'}), la <strong>Rueda de la Fortuna</strong> es un punto sensible que indica dónde se acumula naturalmente el flujo de la suerte y los recursos a tu favor. En <strong>${f.sign}</strong>, Casa ${f.house} (${houseInfo(f.house).short}), señala el área donde, sin esfuerzo desproporcionado, las cosas tienden a acomodarse a tu favor cuando estás alineado con tu identidad esencial.</p>`;
      html += `<p>No es magia ni regalo del cielo: es la zona donde tu Sol y tu Luna conspiran a través del filtro de tu Ascendente. Cuando integras estos tres (identidad consciente, mundo emocional, presentación al mundo), la Fortuna activa.</p>`;
    } else {
      html += `<h3>⊕ Wheel of Fortune in ${f.sign}, House ${f.house}</h3>`;
      html += `<p>Calculated as ASC + Moon − Sun (because your chart is ${isDiurnal ? 'diurnal' : 'nocturnal'}), the <strong>Wheel of Fortune</strong> is a sensitive point indicating where the flow of luck and resources naturally accumulate in your favor. In <strong>${f.sign}</strong>, House ${f.house} (${houseInfo(f.house).short}), it points to the area where, without disproportionate effort, things tend to fall into place when you're aligned with your essential identity.</p>`;
      html += `<p>It's not magic or gift from heaven: it's the zone where your Sun and Moon conspire through your Ascendant's filter. When you integrate these three (conscious identity, emotional world, presentation to the world), Fortune activates.</p>`;
    }
  }

  // Infortunio
  if (extras.infortunio) {
    const i = extras.infortunio;
    if (lang === 'es') {
      html += `<h3>✠ Parte del Infortunio en ${i.sign}, Casa ${i.house}</h3>`;
      html += `<p>Calculada con la fórmula clásica ASC + Marte − Saturno, la <strong>Parte del Infortunio</strong> indica el área donde las energías de la acción (Marte) y la limitación (Saturno) se cruzan filtradas por tu identidad. En <strong>${i.sign}</strong>, Casa ${i.house} (${houseInfo(i.house).short}), señala el terreno de tus pruebas más persistentes y de los obstáculos que regresan hasta que aprendes su lección.</p>`;
      html += `<p>El glifo de la cruz templaria que la simboliza no es casual: es la cruz de los caballeros que comprendían que las pruebas son entrenamiento. Lo que el Infortunio te pone delante no es castigo — es la dificultad concreta que, cuando la atraviesas, te entrega una autoridad ganada con esfuerzo. Donde otros tienen suerte natural (Fortuna), tú tienes esta zona donde el carácter se forja.</p>`;
    } else {
      html += `<h3>✠ Part of Misfortune in ${i.sign}, House ${i.house}</h3>`;
      html += `<p>Calculated with the classical formula ASC + Mars − Saturn, the <strong>Part of Misfortune</strong> indicates where the energies of action (Mars) and limitation (Saturn) cross through your identity. In <strong>${i.sign}</strong>, House ${i.house} (${houseInfo(i.house).short}), it marks the terrain of your most persistent trials and the obstacles that return until you learn their lesson.</p>`;
      html += `<p>The Templar cross symbolizing it is not accidental: it's the cross of knights who understood that trials are training. What Misfortune puts before you is not punishment — it's the concrete difficulty that, when you cross through, hands you authority earned with effort. Where others have natural luck (Fortune), you have this zone where character is forged.</p>`;
    }
  }

  return html;
}


// ============================================================
// INTERPRETATION
// ============================================================
function generateInterpretation(data, name, focusPlanet) {
  const lang = currentLang;
  const planetData = data.transits.positions[focusPlanet];
  const aspects = data.transits.aspects[focusPlanet] || [];
  const houseNum = planetData.house_in_natal;
  const houseInfo = houseInterp[lang][houseNum];
  const planetName = PLANET_NAMES[lang][focusPlanet];
  const archetype = transitArchetypes[lang][focusPlanet];

  let html = '';

  // LEAD
  if (lang === 'es') {
    html += `<p class="lead">Hola${name ? ' ' + name : ''}. <strong>${planetName}</strong>, el planeta de la <em>${archetype.word}</em>, está atravesando hoy <strong>${planetData.formatted}</strong> ${planetData.retrograde ? '(retrógrado)' : ''}, y sobre tu carta natal está activando tu <strong>Casa ${houseNum} — ${houseInfo.short}</strong>. Eso significa que durante este período, todo lo relacionado con ${houseInfo.full} está siendo ${archetype.verb} desde dentro.</p>`;
  } else {
    html += `<p class="lead">Hello${name ? ' ' + name : ''}. <strong>${planetName}</strong>, the planet of <em>${archetype.word}</em>, is currently crossing <strong>${planetData.formatted}</strong> ${planetData.retrograde ? '(retrograde)' : ''}, and on your natal chart is activating your <strong>House ${houseNum} — ${houseInfo.short}</strong>. This means that during this period, everything related to ${houseInfo.full} is being ${archetype.verb} from within.</p>`;
  }

  // ARCHETYPE
  html += `<h3>${lang === 'es' ? `Lo que significa este tránsito de ${planetName}` : `What this transit of ${planetName} means`}</h3>`;
  html += `<p>${archetype.phrase}</p>`;

  if (lang === 'es') {
    if (focusPlanet === 'jupiter') html += `<p>Júpiter pasa por cada signo aproximadamente un año. Su tránsito por una casa de tu carta indica el área que está en expansión, que recibe oportunidades, viajes, aprendizajes, encuentros que amplían tu visión. Es un tiempo para decir "sí" más a menudo, para pedir más, para confiar más.</p>`;
    else if (focusPlanet === 'saturn') html += `<p>Saturno pasa entre 2 y 3 años por cada signo. Su tránsito por una casa de tu carta indica el área donde la vida te está pidiendo madurar, asumir responsabilidad, construir estructura. Puede sentirse como una carga, pero al final del tránsito esa área queda fortalecida.</p>`;
    else if (focusPlanet === 'uranus') html += `<p>Urano pasa unos 7 años por cada signo. Su tránsito por una casa de tu carta indica el área donde estás siendo invitado a romper con lo establecido, a probar lo nuevo, a liberarte de lo que ya no eres. No siempre es cómodo, pero es donde más originalidad puede emerger.</p>`;
    else if (focusPlanet === 'neptune') html += `<p>Neptuno pasa unos 14 años por cada signo. Su tránsito por una casa de tu carta indica el área donde se están disolviendo límites, donde lo espiritual entra en escena, donde puedes sentirte más sensible o confundido. También donde más arte, intuición y compasión pueden florecer.</p>`;
    else if (focusPlanet === 'pluto') html += `<p>Plutón pasa entre 12 y 30 años por cada signo (varía mucho). Su tránsito por una casa de tu carta indica el área que está en transformación profunda, en muerte y renacimiento. Es lento, intenso, y al final lo que queda es más auténtico que lo que había.</p>`;
  } else {
    if (focusPlanet === 'jupiter') html += `<p>Jupiter passes through each sign in about one year. Its transit through a house of your chart indicates the area in expansion, receiving opportunities, journeys, learnings, encounters that broaden your vision. A time to say "yes" more often, to ask for more, to trust more.</p>`;
    else if (focusPlanet === 'saturn') html += `<p>Saturn spends 2-3 years in each sign. Its transit through a house of your chart indicates the area where life is asking you to mature, take responsibility, build structure. It can feel like a burden, but at the end the area is strengthened.</p>`;
    else if (focusPlanet === 'uranus') html += `<p>Uranus spends about 7 years in each sign. Its transit through a house of your chart indicates the area where you're invited to break with the established, try the new, free yourself from what you no longer are. Not always comfortable, but where the most originality can emerge.</p>`;
    else if (focusPlanet === 'neptune') html += `<p>Neptune spends about 14 years in each sign. Its transit through a house of your chart indicates where boundaries are dissolving, where the spiritual enters, where you may feel more sensitive or confused. Also where art, intuition, and compassion can flourish.</p>`;
    else if (focusPlanet === 'pluto') html += `<p>Pluto spends between 12 and 30 years in each sign (varies). Its transit through a house indicates the area in deep transformation, death and rebirth. Slow, intense, and what remains at the end is more authentic.</p>`;
  }

  // HOUSE
  html += `<h3>${lang === 'es' ? `En tu Casa ${houseNum} — ${houseInfo.short}` : `In your House ${houseNum} — ${houseInfo.short}`}</h3>`;
  if (lang === 'es') {
    html += `<p>El área de ${houseInfo.full} es donde más se siente el trabajo de ${planetName} en este momento. Aquí es donde puedes notar los cambios más evidentes: experiencias nuevas, decisiones que se imponen, sensaciones que aparecen sin que las busques.</p>`;
  } else {
    html += `<p>The area of ${houseInfo.full} is where ${planetName}'s work is most felt right now. Here you may notice the most evident changes: new experiences, decisions that impose themselves, feelings that arise unbidden.</p>`;
  }

  // ASPECTS
  if (aspects.length > 0) {
    html += `<h3>${lang === 'es' ? 'Los aspectos a tus planetas natales' : 'Aspects to your natal planets'}</h3>`;
    if (lang === 'es') html += `<p>${planetName} está formando aspectos exactos con ${aspects.length} planeta${aspects.length > 1 ? 's' : ''} de tu carta natal:</p>`;
    else html += `<p>${planetName} is forming exact aspects with ${aspects.length} planet${aspects.length > 1 ? 's' : ''} of your natal chart:</p>`;

    aspects.forEach(asp => {
      const np = PLANET_NAMES[lang][asp.natal_planet];
      const pm = planetMeanings[lang][asp.natal_planet];
      const an = lang === 'es' ? asp.aspect.name_es : asp.aspect.name_en;
      const av = aspectVerbs[lang][an];
      html += `<div class="pull">${lang === 'es' ? `${planetName} ${av} tu ${np} natal` : `${planetName} ${av} your natal ${np}`} <span style="opacity:0.6;">(${asp.aspect.orb.toFixed(2)}° ${lang === 'es' ? 'de orbe' : 'of orb'})</span></div>`;

      const an_lower = an.toLowerCase();
      let key = null;
      if (an === 'Conjunción' || an === 'Conjunction') key = 'conjunction';
      else if (an === 'Sextil' || an === 'Sextile') key = 'sextile';
      else if (an === 'Cuadratura' || an === 'Square') key = 'square';
      else if (an === 'Trígono' || an === 'Trine') key = 'trine';
      else if (an === 'Oposición' || an === 'Opposition') key = 'opposition';

      const meaning = aspectMeanings[lang][key];
      if (lang === 'es') {
        html += `<p>El aspecto es de <strong>${meaning}</strong>. ${planetName} ${av} ${pm}, lo que abre un proceso específico en esa zona de tu vida.</p>`;
      } else {
        html += `<p>The aspect is of <strong>${meaning}</strong>. ${planetName} ${av} ${pm}, opening a specific process in that area of your life.</p>`;
      }
    });
  } else {
    html += `<h3>${lang === 'es' ? 'Sin aspectos exactos en este momento' : 'No exact aspects right now'}</h3>`;
    if (lang === 'es') html += `<p>${planetName} no está formando aspectos cerrados (dentro de 2° de orbe) a tus planetas natales personales. El simple paso por tu casa natal ya está moviendo cosas. Mira el calendario de los próximos 12 meses para ver cuándo se activarán nuevos aspectos.</p>`;
    else html += `<p>${planetName} is not forming tight aspects (within 2° of orb) to your natal planets. The simple passage through your natal house is already moving things. Check the 12-month calendar for upcoming aspects.</p>`;
  }

  // PUNTOS ADICIONALES (Quirón, Nodos, Lilith, Fortuna, Infortunio)
  html += generateExtraPointsInterpretation(data);

  // CLOSING
  html += `<h3>${lang === 'es' ? 'Cómo navegar este tiempo' : 'How to navigate this time'}</h3>`;
  if (lang === 'es') {
    if (focusPlanet === 'jupiter') html += `<p>Júpiter premia a quien actúa con confianza. No esperes que las oportunidades te encuentren: muévete hacia ellas. La trampa de Júpiter es exagerar, prometer demasiado, dispersarse. Mantén foco mientras te expandes.</p>`;
    else if (focusPlanet === 'saturn') html += `<p>Saturno premia el trabajo y la disciplina. No es momento de atajos. Lo que construyas con esfuerzo durará. La trampa es el desánimo: si te parece todo cuesta arriba, recuerda que estás puliendo algo que durará años.</p>`;
    else if (focusPlanet === 'uranus') html += `<p>Urano no negocia. Si te abres a lo nuevo, descubrirás libertades que no sabías que necesitabas. Si te resistes, sentirás que la realidad te empuja igual. Permítete experimentar y cambiar de opinión.</p>`;
    else if (focusPlanet === 'neptune') html += `<p>Neptuno disuelve estructuras viejas y a veces también la claridad. Cuídate de idealizaciones, de promesas vagas, de personas que parecen "salvadoras". Pero también ábrete: el arte, la meditación, la espiritualidad están más vivas que nunca.</p>`;
    else if (focusPlanet === 'pluto') html += `<p>Plutón es lento e intenso. Lo que muere en este tránsito muere para que algo más auténtico nazca. No te aferres a lo que ya no eres. La transformación de Plutón te entrega más poder real del que tenías antes.</p>`;
  } else {
    if (focusPlanet === 'jupiter') html += `<p>Jupiter rewards those who act with confidence. Don't wait for opportunities to find you: move toward them. Jupiter's trap is exaggerating, promising too much, scattering. Keep focus as you expand.</p>`;
    else if (focusPlanet === 'saturn') html += `<p>Saturn rewards work and discipline. Not a time for shortcuts. What you build with effort will last. The trap is discouragement: if everything seems uphill, remember you're polishing something that will endure for years.</p>`;
    else if (focusPlanet === 'uranus') html += `<p>Uranus doesn't negotiate. If you open to the new, you'll discover freedoms you didn't know you needed. If you resist, reality pushes anyway. Allow yourself to experiment and change your mind.</p>`;
    else if (focusPlanet === 'neptune') html += `<p>Neptune dissolves old structures and sometimes clarity itself. Beware of idealizations, vague promises, "savior" figures. But also open up: art, meditation, spirituality are more alive than ever.</p>`;
    else if (focusPlanet === 'pluto') html += `<p>Pluto is slow and intense. What dies in this transit dies so something more authentic can be born. Don't cling to who you no longer are. Pluto's transformation gives you more real power than you had before.</p>`;
  }

  return html;
}

// ============================================================
// SUMMARY (interpretive by life areas)
// ============================================================
function generateSummary(data) {
  const lang = currentLang;
  const planets = data.natal_chart.planets;

  // Areas y sus correspondencias astrológicas
  const areas = lang === 'es' ? [
    { title: '💖 Pareja y vínculos', planets: ['venus','mars'], houses: [7], description: '' },
    { title: '💼 Trabajo y vocación', planets: ['saturn','sun'], houses: [6,10], description: '' },
    { title: '💰 Dinero y recursos', planets: ['venus','jupiter'], houses: [2,8], description: '' },
    { title: '🧠 Mente y comunicación', planets: ['mercury'], houses: [3,9], description: '' },
    { title: '⚡ Energía y vitalidad', planets: ['sun','mars'], houses: [1], description: '' },
    { title: '❤️ Familia y hogar', planets: ['moon'], houses: [4], description: '' },
    { title: '🎨 Creatividad', planets: ['venus','sun'], houses: [5], description: '' },
    { title: '🌟 Transformación profunda', planets: ['pluto','uranus'], houses: [8,12], description: '' },
  ] : [
    { title: '💖 Partnership & bonds', planets: ['venus','mars'], houses: [7], description: '' },
    { title: '💼 Work & vocation', planets: ['saturn','sun'], houses: [6,10], description: '' },
    { title: '💰 Money & resources', planets: ['venus','jupiter'], houses: [2,8], description: '' },
    { title: '🧠 Mind & communication', planets: ['mercury'], houses: [3,9], description: '' },
    { title: '⚡ Energy & vitality', planets: ['sun','mars'], houses: [1], description: '' },
    { title: '❤️ Family & home', planets: ['moon'], houses: [4], description: '' },
    { title: '🎨 Creativity', planets: ['venus','sun'], houses: [5], description: '' },
    { title: '🌟 Deep transformation', planets: ['pluto','uranus'], houses: [8,12], description: '' },
  ];

  // For each area, find natal planet location and current transits to it
  return areas.map(area => {
    const natalSummary = area.planets.map(p => {
      const pl = planets[p];
      return lang === 'es'
        ? `${PLANET_NAMES[lang][p]} en ${pl.sign} (Casa ${pl.house})`
        : `${PLANET_NAMES[lang][p]} in ${pl.sign} (House ${pl.house})`;
    }).join(', ');

    // Find active transits to those planets — store structured data
    const activeTransits = [];
    Object.entries(data.transits.aspects).forEach(([transitP, asps]) => {
      asps.forEach(asp => {
        if (area.planets.includes(asp.natal_planet)) {
          activeTransits.push({
            transit: transitP,
            natal: asp.natal_planet,
            aspect: asp.aspect,
            orb: asp.aspect.orb
          });
        }
      });
    });

    // Construir descripción rica con palabras clave
    let desc = '';
    const labelChart = lang === 'es' ? 'Tu carta' : 'Your chart';
    const labelActive = lang === 'es' ? 'Tránsitos activos ahora' : 'Active transits now';
    const labelNone = lang === 'es' ? 'Sin tránsitos exactos en este momento.' : 'No exact transits right now.';

    desc = `<div style="margin-bottom: 0.85rem;"><span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--ink-faint); font-weight: 600; display: block; margin-bottom: 0.3rem;">${labelChart}</span><span style="font-size: 0.9rem;">${natalSummary}</span></div>`;

    if (activeTransits.length > 0) {
      desc += `<div><span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--ink-faint); font-weight: 600; display: block; margin-bottom: 0.5rem;">${labelActive}</span>`;

      activeTransits.forEach(t => {
        const tpName = PLANET_NAMES[lang][t.transit];
        const npName = PLANET_NAMES[lang][t.natal];
        const aspectName = lang === 'es' ? t.aspect.name_es : t.aspect.name_en;
        const tpColor = PLANET_COLORS[t.transit] || 'var(--uranus)';

        // Keywords compactas
        const tpKw = planetKeywords[lang][t.transit] || '';
        const npKw = planetKeywords[lang][t.natal] || '';
        const aKey = aspectKey(aspectName);
        const aspKw = aKey ? aspectKeywords[lang][aKey] || '' : '';

        desc += `<div style="margin-bottom: 0.85rem; padding-bottom: 0.85rem; border-bottom: 1px dashed var(--line); font-size: 0.85rem; line-height: 1.55;">
          <div style="margin-bottom: 0.4rem;">
            <span style="color:${tpColor}; font-weight: 500;">${PLANET_GLYPHS[t.transit]} ${tpName}</span>
            <span style="margin: 0 0.25rem;">${t.aspect.glyph}</span>
            <span style="font-weight: 500;">${PLANET_GLYPHS[t.natal]} ${npName}</span>
            <span style="opacity: 0.55; font-size: 0.82em; margin-left: 0.3rem;">${aspectName}</span>
          </div>
          <div style="font-size: 0.78rem; line-height: 1.45; color: var(--ink-soft);">
            <div style="margin-bottom: 0.2rem;"><span style="color: ${tpColor}; font-weight: 500;">${tpName}:</span> <em>${tpKw}</em></div>
            <div style="margin-bottom: 0.2rem;"><span style="font-weight: 500;">${npName}:</span> <em>${npKw}</em></div>
            <div><span style="font-weight: 500;">${aspectName}:</span> <em>${aspKw}</em></div>
          </div>
        </div>`;
      });

      // Quitar el último border-bottom dashed
      desc = desc.replace(/border-bottom: 1px dashed var\(--line\);(?=[^<]*<\/div>\s*$)/, '');
      desc += `</div>`;
    } else {
      desc += `<div style="font-size: 0.85rem; font-style: italic; color: var(--ink-faint);">${labelNone}</div>`;
    }

    return { title: area.title, description: desc };
  });
}

// ============================================================
// RENDER MAIN
// ============================================================
function renderResult(data) {
  currentResult = data;
  const tabs = i18n[currentLang];

  // Header
  document.getElementById('result-name-display').textContent =
    data.birth_data.name || (currentLang === 'es' ? 'Tu carta natal' : 'Your natal chart');
  document.getElementById('result-meta').textContent =
    `${data.birth_data.datetime} · ${data.birth_data.city.split(',')[0]} · ${data.birth_data.timezone}`;

  // Transit selector pills
  const selector = document.getElementById('transit-selector');
  selector.innerHTML = TRANSIT_PLANETS.map(tp => {
    const active = tp === currentFocusPlanet ? 'active' : '';
    const glyph = tp === 'uranus' ? uranusGlyphHTML() : `<span class="glyph">${PLANET_GLYPHS[tp]}</span>`;
    const aspectCount = (data.transits.aspects[tp] || []).length;
    const badge = aspectCount > 0 ? ` <span style="opacity:0.6;font-size:0.85em;">(${aspectCount})</span>` : '';
    return `<button class="transit-pill ${active}" data-planet="${tp}">${glyph} ${PLANET_NAMES[currentLang][tp]}${badge}</button>`;
  }).join('');
  selector.querySelectorAll('.transit-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      currentFocusPlanet = pill.dataset.planet;
      // Re-fetch with new focus planet (only for calendar)
      // Actually the calendar is for the focus planet only; we need to refetch
      refreshFocusPlanet();
    });
  });

  // Main info blocks for focus planet
  const fp = data.transits.positions[currentFocusPlanet];
  const focusName = PLANET_NAMES[currentLang][currentFocusPlanet];
  document.getElementById('info-label-pos').textContent =
    `${focusName} ${currentLang === 'es' ? 'en este momento' : 'right now'}`;
  document.getElementById('planet-position').innerHTML = fp.formatted;
  document.getElementById('planet-motion').innerHTML =
    `<span class="uranus-badge" style="background: ${PLANET_COLORS[currentFocusPlanet]}22; color: ${PLANET_COLORS[currentFocusPlanet]};">${fp.retrograde ? '℞ ' + tabs.retrograde : '→ ' + tabs.direct}</span>`;

  document.getElementById('planet-house').textContent = `${tabs.house} ${fp.house_in_natal}`;
  document.getElementById('planet-house-meaning').textContent =
    houseInterp[currentLang][fp.house_in_natal].short;
  document.getElementById('aspect-count').textContent =
    (data.transits.aspects[currentFocusPlanet] || []).length;

  // Calendar title
  document.getElementById('calendar-title').textContent =
    currentLang === 'es' ? `Próximos 12 meses · ${focusName}` : `Next 12 months · ${focusName}`;

  // INTERPRETATION
  document.getElementById('interpretation-content').innerHTML =
    generateInterpretation(data, data.birth_data.name, currentFocusPlanet);

  // ASPECTS BY TRANSIT
  renderAspectsByTransit(data);

  // CALENDAR
  renderCalendar(data);

  // CHART DETAIL
  renderChartDetail(data);

  // SUMMARY
  renderSummary(data);

  // Draw chart
  drawNatalChart(data);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAspectsByTransit(data) {
  const lang = currentLang;
  let html = '';

  TRANSIT_PLANETS.forEach(tp => {
    const aspects = data.transits.aspects[tp] || [];
    const tp_data = data.transits.positions[tp];
    const planetName = PLANET_NAMES[lang][tp];
    const tp_glyph = `<span style="color:${PLANET_COLORS[tp]};font-family:serif;font-size:1.2em">${PLANET_GLYPHS[tp]}</span>`;

    // Siempre mostrar el planeta, incluso sin aspectos exactos
    // (el tránsito por casa y el dual reading siguen siendo significativos)

    html += `<div style="margin-bottom: 3.5rem;">`;

    // === HEADER del planeta ===
    html += `<div style="display:flex; align-items:center; gap:0.6rem; margin-bottom: 0.5rem;">
      <h4 style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 500; margin: 0;">
        ${tp_glyph} ${planetName}
      </h4>
      <span style="opacity:0.5; font-size:0.85rem;">${tp_data.formatted}${tp_data.retrograde ? ' ℞' : ''}</span>
    </div>`;

    // === DUAL READING DEL TRÁNSITO ===
    html += renderDualReading(tp, tp_data, data);

    // === ASPECTOS A PLANETAS NATALES ===
    if (aspects.length > 0) {
      html += `<div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line);">
        <div class="info-label" style="margin-bottom: 1rem;">${lang === 'es' ? `Aspectos exactos a tus planetas natales (${aspects.length})` : `Exact aspects to your natal planets (${aspects.length})`}</div>`;

      aspects.forEach((asp, idx) => {
        html += renderAspectCard(tp, asp, idx, lang);
      });

      html += `</div>`;
    } else {
      html += `<p style="font-size: 0.9rem; color: var(--ink-faint); font-style: italic; margin-top: 1rem;">${lang === 'es' ? 'Sin aspectos exactos a planetas natales en este momento — pero el tránsito por la casa sigue activo.' : 'No exact aspects to natal planets right now — but the house transit remains active.'}</p>`;
    }

    html += `</div>`;
  });

  if (!html) {
    html = `<p style="text-align:center; color: var(--ink-faint); padding: 2rem;">${lang === 'es' ? 'Sin aspectos exactos a tus planetas natales en este momento.' : 'No exact aspects to your natal planets right now.'}</p>`;
  }
  document.getElementById('aspects-by-transit').innerHTML = html;

  // Activar comportamiento de "leer más"
  document.querySelectorAll('.read-more-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        const isHidden = target.style.display === 'none' || !target.style.display;
        target.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden
          ? (lang === 'es' ? '— Leer menos' : '— Read less')
          : (lang === 'es' ? '+ Leer más' : '+ Read more');
      }
    });
  });
}

// Dual reading: combina la casa transitada con la(s) casa(s) regida(s) por el signo del tránsito
function renderDualReading(transitPlanet, transitData, fullData) {
  const lang = currentLang;
  const planetName = PLANET_NAMES[lang][transitPlanet];
  const transitedHouse = transitData.house_in_natal;
  const ruledHouses = transitData.sign_rules_houses || [];
  const transitedHouseInfo = houseInterp[lang][transitedHouse];

  let html = `<div style="background: var(--surface-2); border-left: 3px solid ${PLANET_COLORS[transitPlanet]}; padding: 1.25rem 1.5rem; border-radius: 4px; margin-top: 0.5rem;">`;

  // Lectura primaria: casa transitada
  if (lang === 'es') {
    html += `<p style="margin-bottom: 0.85rem;"><strong style="color: ${PLANET_COLORS[transitPlanet]};">${planetName} transita tu Casa ${transitedHouse} — ${transitedHouseInfo.short}.</strong> El planeta está moviéndose ahora por la zona de tu carta que rige ${transitedHouseInfo.full}.</p>`;
  } else {
    html += `<p style="margin-bottom: 0.85rem;"><strong style="color: ${PLANET_COLORS[transitPlanet]};">${planetName} transits your House ${transitedHouse} — ${transitedHouseInfo.short}.</strong> The planet is now moving through the area of your chart that governs ${transitedHouseInfo.full}.</p>`;
  }

  // Lectura secundaria: signo regente
  // Solo mostramos si el signo rige otra casa diferente a la transitada (más interpretativo)
  const otherRuledHouses = ruledHouses.filter(h => h !== transitedHouse);

  if (otherRuledHouses.length > 0) {
    if (lang === 'es') {
      html += `<p style="margin-bottom: 0;">Pero ${planetName} está en <strong>${transitData.sign}</strong>, signo que rige tu(s) `;
      const houseDescriptions = otherRuledHouses.map(h => `<strong>Casa ${h}</strong> (${houseInterp[lang][h].short.toLowerCase()})`).join(' y ');
      html += `${otherRuledHouses.length === 1 ? '' : ''}${houseDescriptions}. `;
      html += `Esto significa que la transformación de Casa ${transitedHouse} se manifiesta también a través de los temas de ${otherRuledHouses.map(h => houseInterp[lang][h].full).join(' y ')}. Las dos áreas están conectadas en este tránsito.</p>`;
    } else {
      html += `<p style="margin-bottom: 0;">But ${planetName} is in <strong>${transitData.sign}</strong>, the sign ruling your `;
      const houseDescriptions = otherRuledHouses.map(h => `<strong>House ${h}</strong> (${houseInterp[lang][h].short.toLowerCase()})`).join(' and ');
      html += `${houseDescriptions}. `;
      html += `This means the transformation in House ${transitedHouse} also manifests through the themes of ${otherRuledHouses.map(h => houseInterp[lang][h].full).join(' and ')}. The two areas are connected during this transit.</p>`;
    }
  } else if (ruledHouses.length > 0 && ruledHouses[0] === transitedHouse) {
    // El signo rige exactamente la casa que está transitando — coherencia perfecta
    if (lang === 'es') {
      html += `<p style="margin-bottom: 0;"><em>${transitData.sign}, el signo donde está ${planetName}, rige precisamente esa misma Casa ${transitedHouse} en tu carta. Esta coherencia hace que el tránsito sea especialmente intenso y enfocado.</em></p>`;
    } else {
      html += `<p style="margin-bottom: 0;"><em>${transitData.sign}, the sign where ${planetName} is, rules precisely that same House ${transitedHouse} in your chart. This coherence makes the transit especially intense and focused.</em></p>`;
    }
  }

  html += `</div>`;
  return html;
}

// Renderizar tarjeta de aspecto con texto profundo enriquecido
function renderAspectCard(transitPlanet, asp, idx, lang) {
  const planetName = PLANET_NAMES[lang][transitPlanet];
  const np = PLANET_NAMES[lang][asp.natal_planet];
  const an = lang === 'es' ? asp.aspect.name_es : asp.aspect.name_en;
  const orb = asp.aspect.orb.toFixed(2);
  const aspKey = aspectKey(an);
  const aspectInfo = aspKey ? aspectDeepMeaning[lang][aspKey] : null;
  const tpToNp = transitToNatalMeaning[transitPlanet] && transitToNatalMeaning[transitPlanet][asp.natal_planet];
  const tpToNpText = tpToNp ? tpToNp[lang] : null;

  // Perfiles de cada planeta
  const tProfile = planetProfile[lang][transitPlanet];
  const nProfile = planetProfile[lang][asp.natal_planet];

  const tp_glyph = `<span style="color:${PLANET_COLORS[transitPlanet]};font-family:serif;font-size:1.15em">${PLANET_GLYPHS[transitPlanet]}</span>`;
  const np_glyph = `<span style="font-family:serif;font-size:1.15em">${planetGlyph(asp.natal_planet)}</span>`;
  const status = asp.aspect.orb < 0.3 ? 'exact' : 'applying';
  const statusLabel = asp.aspect.orb < 0.3 ? t('exact') : t('active');

  const cardId = `aspect-${transitPlanet}-${asp.natal_planet}-${idx}`;

  let html = `<div class="aspect-card transit-${transitPlanet}" style="margin-bottom: 1rem;">
    <div class="aspect-header">
      <span class="aspect-type">${asp.aspect.glyph} ${an}</span>
      <span class="aspect-orb">${lang === 'es' ? 'orbe' : 'orb'} ${orb}°</span>
    </div>
    <div class="aspect-planets" style="margin-bottom: 1rem;">
      ${tp_glyph} ${planetName} ${asp.aspect.glyph} ${np_glyph} ${np}
      <span class="aspect-status ${status}" style="margin-left: 0.5rem;">${statusLabel}</span>
    </div>`;

  if (tpToNpText && aspectInfo) {

    // === Sección 1: Identificación del encuentro ===
    if (lang === 'es') {
      html += `<p style="margin-bottom: 1rem; line-height: 1.65; font-size: 1rem;">
        <strong>${planetName} en ${an.toLowerCase()} a tu ${np}.</strong>
        Aspecto de <em>${aspectInfo.short}</em>: ${aspectInfo.lead}
      </p>`;
    } else {
      html += `<p style="margin-bottom: 1rem; line-height: 1.65; font-size: 1rem;">
        <strong>${planetName} ${an.toLowerCase()} your ${np}.</strong>
        Aspect of <em>${aspectInfo.short}</em>: ${aspectInfo.lead}
      </p>`;
    }

    // === Sección 2: Quiénes son los dos planetas (arquetipo + regencias) ===
    if (tProfile && nProfile) {
      const labelTransit = lang === 'es' ? 'El planeta que transita' : 'The transiting planet';
      const labelNatal = lang === 'es' ? 'El planeta natal afectado' : 'The natal planet affected';

      html += `<div style="background: var(--surface-2); padding: 1rem 1.15rem; border-radius: 4px; margin-bottom: 1rem; font-size: 0.92rem; line-height: 1.6;">
        <p style="margin-bottom: 0.7rem;">
          <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--ink-faint); font-weight: 500; display: block; margin-bottom: 0.3rem;">${labelTransit}</span>
          ${tp_glyph} <strong>${planetName} — ${tProfile.archetype}</strong>: ${tProfile.rules}.
        </p>
        <p style="margin-bottom: 0;">
          <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--ink-faint); font-weight: 500; display: block; margin-bottom: 0.3rem;">${labelNatal}</span>
          ${np_glyph} <strong>${np} — ${nProfile.archetype}</strong>: ${nProfile.rules}.
        </p>
      </div>`;
    }

    // === Sección 3: Texto específico de la combinación ===
    html += `<p style="margin-bottom: 1rem; line-height: 1.65;">${tpToNpText}</p>`;

    // === Sección 4: Lo que se facilita y lo que se dificulta con esta combinación ===
    if (tProfile && nProfile) {
      const labelEase = lang === 'es' ? 'Lo que se facilita' : 'What is facilitated';
      const labelChallenge = lang === 'es' ? 'Lo que se dificulta' : 'What is challenged';

      // Modular según el aspecto: trígono y sextil potencian lo facilitado;
      // cuadratura y oposición intensifican lo dificultado;
      // conjunción amplifica todo
      const isHarmonic = aspKey === 'trine' || aspKey === 'sextile';
      const isTense = aspKey === 'square' || aspKey === 'opposition';

      let easeIntro = '';
      let challengeIntro = '';

      if (lang === 'es') {
        if (isHarmonic) {
          easeIntro = `Este aspecto armónico potencia especialmente:`;
          challengeIntro = `Aún en la fluidez del aspecto, sigue costando:`;
        } else if (isTense) {
          easeIntro = `Aún con la tensión del aspecto, sigue activándose:`;
          challengeIntro = `La tensión del aspecto pone en evidencia las dificultades naturales:`;
        } else {
          // Conjunción
          easeIntro = `La fusión de las energías intensifica:`;
          challengeIntro = `Y al mismo tiempo amplifica las dificultades de:`;
        }

        html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.6;">
          <div style="padding: 0.85rem; background: color-mix(in srgb, var(--success) 8%, transparent); border-radius: 4px; border-left: 2px solid var(--success);">
            <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--success); font-weight: 600; display: block; margin-bottom: 0.4rem;">↗ ${labelEase}</span>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--ink-soft); font-style: italic;">${easeIntro}</p>
            <p style="margin: 0;">${tProfile.facilitates}; ${nProfile.facilitates}.</p>
          </div>
          <div style="padding: 0.85rem; background: color-mix(in srgb, var(--error) 8%, transparent); border-radius: 4px; border-left: 2px solid var(--error);">
            <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--error); font-weight: 600; display: block; margin-bottom: 0.4rem;">↘ ${labelChallenge}</span>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--ink-soft); font-style: italic;">${challengeIntro}</p>
            <p style="margin: 0;">${tProfile.hinders}; ${nProfile.hinders}.</p>
          </div>
        </div>`;
      } else {
        if (isHarmonic) {
          easeIntro = `This harmonic aspect particularly enhances:`;
          challengeIntro = `Even in the aspect's flow, it remains difficult:`;
        } else if (isTense) {
          easeIntro = `Even with the aspect's tension, it activates:`;
          challengeIntro = `The aspect's tension highlights the natural difficulties:`;
        } else {
          easeIntro = `The fusion of energies intensifies:`;
          challengeIntro = `And simultaneously amplifies the difficulties of:`;
        }

        html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.6;">
          <div style="padding: 0.85rem; background: color-mix(in srgb, var(--success) 8%, transparent); border-radius: 4px; border-left: 2px solid var(--success);">
            <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--success); font-weight: 600; display: block; margin-bottom: 0.4rem;">↗ ${labelEase}</span>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--ink-soft); font-style: italic;">${easeIntro}</p>
            <p style="margin: 0;">${tProfile.facilitates}; ${nProfile.facilitates}.</p>
          </div>
          <div style="padding: 0.85rem; background: color-mix(in srgb, var(--error) 8%, transparent); border-radius: 4px; border-left: 2px solid var(--error);">
            <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--error); font-weight: 600; display: block; margin-bottom: 0.4rem;">↘ ${labelChallenge}</span>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--ink-soft); font-style: italic;">${challengeIntro}</p>
            <p style="margin: 0;">${tProfile.hinders}; ${nProfile.hinders}.</p>
          </div>
        </div>`;
      }
    }

    // === Sección 5: Contexto temporal y cierre práctico ===
    html += `<p style="margin-bottom: 0; line-height: 1.65; color: var(--ink-soft); font-size: 0.92rem;">${getTransitContext(transitPlanet, aspKey, lang)}</p>`;

    // === Botón "Profundizar en el aspecto" ===
    html += `<button class="read-more-toggle" data-target="${cardId}-detail" style="background: none; border: none; color: var(--uranus); font-family: inherit; font-size: 0.8rem; font-weight: 500; cursor: pointer; padding: 0.85rem 0 0; text-transform: uppercase; letter-spacing: 0.1em;">${lang === 'es' ? '+ Profundizar en el aspecto' : '+ Go deeper on the aspect'}</button>`;
    html += `<div id="${cardId}-detail" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--line); font-size: 0.92rem; line-height: 1.7; color: var(--ink-soft);">
      <p>${aspectInfo.detail}</p>
    </div>`;
  } else if (tpToNpText) {
    html += `<p style="line-height: 1.65;">${tpToNpText}</p>`;
  }

  html += `</div>`;
  return html;
}

// Contexto temporal y práctico del tránsito según el planeta y el aspecto
function getTransitContext(transitPlanet, aspectKey, lang) {
  const durations = {
    es: {
      jupiter: { short: 'Júpiter pasa rápido por cada aspecto (días o pocas semanas)', long: 'pero deja semillas que florecen durante el año siguiente' },
      saturn: { short: 'Saturno permanece en cada aspecto entre 2 y 6 semanas, y suele volver dos veces más por retrogradación', long: 'lo que se trabaja durante este tiempo se consolida por décadas' },
      uranus: { short: 'Urano pasa por cada aspecto en períodos de 1 a 3 meses, con dos o tres pases por retrogradación', long: 'los cambios que activa son irreversibles cuando se permiten' },
      neptune: { short: 'Neptuno tarda meses en formar y disolver cada aspecto, con múltiples pases por retrogradación', long: 'su efecto es sutil pero profundo: lo que sucede ahora se entiende años después' },
      pluto: { short: 'Plutón puede permanecer en aspecto durante uno o dos años con sus retrogradaciones', long: 'lo que transforma queda definitivamente cambiado, sin posibilidad de regresar a la versión anterior' }
    },
    en: {
      jupiter: { short: 'Jupiter passes through each aspect quickly (days or a few weeks)', long: 'but leaves seeds that bloom over the following year' },
      saturn: { short: 'Saturn stays in each aspect for 2 to 6 weeks, and usually returns two more times through retrogradation', long: 'what is worked on during this time consolidates for decades' },
      uranus: { short: 'Uranus passes through each aspect in periods of 1 to 3 months, with two or three passes through retrogradation', long: 'the changes it activates are irreversible when allowed' },
      neptune: { short: 'Neptune takes months to form and dissolve each aspect, with multiple retrograde passes', long: 'its effect is subtle but profound: what happens now is understood years later' },
      pluto: { short: 'Pluto can remain in aspect for one or two years with its retrogradations', long: 'what it transforms remains definitively changed, with no possibility of returning to the previous version' }
    }
  };

  const closings = {
    es: {
      conjunction: 'Aprovecha esta fusión para iniciar conscientemente lo que quieres en esta área.',
      sextile: 'La oportunidad está abierta — actuar con iniciativa la activa, esperar la deja pasar.',
      square: 'No huyas de la tensión: es exactamente la presión que necesita lo nuevo para nacer.',
      trine: 'Es momento de pedir grande y moverte hacia lo que has querido — el universo coopera.',
      opposition: 'Mira con atención lo que aparece afuera: ahí está el mensaje de lo que pide integración.'
    },
    en: {
      conjunction: 'Use this fusion to consciously initiate what you want in this area.',
      sextile: 'The opportunity is open — acting with initiative activates it, waiting lets it pass.',
      square: "Don't run from the tension: it's exactly the pressure the new needs to be born.",
      trine: "It's time to ask big and move toward what you've wanted — the universe cooperates.",
      opposition: 'Look carefully at what appears outside: that is the message of what asks for integration.'
    }
  };

  const dur = durations[lang][transitPlanet];
  const closing = aspectKey && closings[lang][aspectKey] ? closings[lang][aspectKey] : '';

  if (lang === 'es') {
    return `<em>${dur.short}, ${dur.long}.</em> ${closing}`;
  } else {
    return `<em>${dur.short}, ${dur.long}.</em> ${closing}`;
  }
}

function renderCalendar(data) {
  const events = data.calendar_12mo.events;
  const focusPlanet = data.calendar_12mo.focus_planet;
  const focusName = PLANET_NAMES[currentLang][focusPlanet];

  if (events.length === 0) {
    document.getElementById('calendar-list').innerHTML =
      `<div style="padding:2rem; text-align:center; color: var(--ink-faint);">${currentLang === 'es' ? 'Sin aspectos exactos en los próximos 12 meses.' : 'No exact aspects in the next 12 months.'}</div>`;
    return;
  }

  // Group by month
  const grouped = {};
  events.forEach(ev => {
    const [datePart] = ev.date.split(' ');
    const [y, m] = datePart.split('-');
    const key = `${y}-${m}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  });

  // Palabras clave del planeta foco (siempre el mismo en el calendario)
  const focusKw = planetKeywords[currentLang][focusPlanet] || '';
  const focusColor = PLANET_COLORS[focusPlanet] || 'var(--uranus)';

  let html = '';
  Object.entries(grouped).forEach(([monthKey, monthEvents]) => {
    const [y, m] = monthKey.split('-').map(Number);
    const monthName = i18n[currentLang].months[m-1];
    html += `<div class="cal-month-header">${monthName} ${y}</div>`;
    monthEvents.forEach(ev => {
      const np = PLANET_NAMES[currentLang][ev.natal_planet];
      const an = currentLang === 'es' ? ev.aspect_es : ev.aspect_en;
      const npGlyph = planetGlyph(ev.natal_planet);
      const focusGlyph = `<span style="color:${focusColor};font-family:serif;font-size:1.1em">${PLANET_GLYPHS[focusPlanet]}</span>`;

      // Palabras clave para esta combinación
      const natalKw = planetKeywords[currentLang][ev.natal_planet] || '';

      // Detectar la clave del aspecto
      const aKey = aspectKey(an);
      const aspKw = aKey ? aspectKeywords[currentLang][aKey] || '' : '';

      const labelTransit = currentLang === 'es' ? 'Tránsito' : 'Transit';
      const labelNatal = currentLang === 'es' ? 'Natal' : 'Natal';
      const labelAspect = currentLang === 'es' ? 'Aspecto' : 'Aspect';

      html += `<div class="cal-event-rich">
        <div class="cal-event-main">
          <div class="cal-date">${shortDate(ev.date)}</div>
          <div class="cal-aspect">
            ${focusGlyph}
            <span style="color:${focusColor}">${focusName}</span>
            <span class="cal-aspect-glyph">${ev.aspect_glyph}</span>
            <span style="font-family:serif;font-size:1.05em;">${npGlyph}</span>
            ${np}
            <span style="opacity:0.6; font-size:0.85em;">— ${an}</span>
          </div>
          <div class="cal-relative">${relativeDate(ev.date)}</div>
        </div>
        <div class="cal-event-keywords">
          <div class="cal-kw">
            <span class="cal-kw-label" style="color:${focusColor};">${labelTransit} · ${focusName}</span>
            <span class="cal-kw-value">${focusKw}</span>
          </div>
          <div class="cal-kw">
            <span class="cal-kw-label">${labelNatal} · ${np}</span>
            <span class="cal-kw-value">${natalKw}</span>
          </div>
          <div class="cal-kw">
            <span class="cal-kw-label">${labelAspect} · ${an}</span>
            <span class="cal-kw-value">${aspKw}</span>
          </div>
        </div>
      </div>`;
    });
  });
  document.getElementById('calendar-list').innerHTML = html;
}

function renderChartDetail(data) {
  const tabs = i18n[currentLang];

  // Planets table
  let pHtml = `<table><thead><tr>
    <th></th><th>${tabs.th_planet}</th><th>${tabs.th_position}</th>
    <th>${tabs.th_house}</th><th>${tabs.th_motion}</th><th>${tabs.th_dignity}</th>
  </tr></thead><tbody>`;

  pHtml += `<tr><td class="glyph-cell">AC</td><td>${PLANET_NAMES[currentLang].asc}</td>
    <td class="pos-cell">${data.natal_chart.asc.formatted}</td><td>I</td><td>—</td><td>—</td></tr>`;
  pHtml += `<tr><td class="glyph-cell">MC</td><td>${PLANET_NAMES[currentLang].mc}</td>
    <td class="pos-cell">${data.natal_chart.mc.formatted}</td><td>X</td><td>—</td><td>—</td></tr>`;

  ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'].forEach(p => {
    const pl = data.natal_chart.planets[p];
    const glyph = PLANET_GLYPHS[p] || '';
    const motion = pl.retrograde ? '<span class="retro">℞</span>' : '→';
    let dignity = '—';
    if (pl.dignity) {
      const dignName = pl.dignity[currentLang];
      const dignClass = pl.dignity.en;
      dignity = `<span class="dignity-pill dignity-${dignClass}">${dignName}</span>`;
    }
    pHtml += `<tr>
      <td class="glyph-cell">${glyph}</td>
      <td>${PLANET_NAMES[currentLang][p]}</td>
      <td class="pos-cell">${pl.formatted}</td>
      <td>${pl.house}</td>
      <td>${motion}</td>
      <td>${dignity}</td>
    </tr>`;
  });

  // Separador visual antes de los puntos extras
  if (data.natal_chart.extras) {
    pHtml += `<tr><td colspan="6" style="background: var(--surface-2); padding: 0.4rem 1rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--ink-faint); font-weight: 500;">${currentLang === 'es' ? 'Puntos adicionales' : 'Additional points'}</td></tr>`;

    EXTRA_POINTS.forEach(p => {
      const pl = data.natal_chart.extras[p];
      if (!pl) return;
      const glyph = PLANET_GLYPHS[p] || '';
      const motion = pl.retrograde ? '<span class="retro">℞</span>' : (p === 'fortuna' || p === 'infortunio' ? '—' : '→');
      pHtml += `<tr style="opacity: 0.85;">
        <td class="glyph-cell">${glyph}</td>
        <td>${PLANET_NAMES[currentLang][p]}</td>
        <td class="pos-cell">${pl.formatted}</td>
        <td>${pl.house}</td>
        <td>${motion}</td>
        <td>—</td>
      </tr>`;
    });
  }

  pHtml += '</tbody></table>';
  document.getElementById('planets-table-wrap').innerHTML = pHtml;

  // Houses table
  let hHtml = `<table><thead><tr>
    <th>${tabs.th_house_n}</th><th>${tabs.th_cusp}</th><th>${tabs.th_ruler}</th><th>${tabs.th_ruler_loc}</th>
  </tr></thead><tbody>`;
  data.natal_chart.houses.forEach(h => {
    const ruler = h.ruler ? PLANET_NAMES[currentLang][h.ruler] : '—';
    const rulerGlyph = h.ruler ? (PLANET_GLYPHS[h.ruler] || '') : '';
    const rulerLoc = h.ruler_house ? `${currentLang === 'es' ? 'Casa' : 'House'} ${h.ruler_house} (${h.ruler_sign})` : '—';
    hHtml += `<tr>
      <td class="num">${h.house_number}</td>
      <td class="pos">${h.formatted}</td>
      <td><span style="font-family:serif;font-size:1.1em;">${rulerGlyph}</span> ${ruler}</td>
      <td>${rulerLoc}</td>
    </tr>`;
  });
  hHtml += '</tbody></table>';
  document.getElementById('houses-table-wrap').innerHTML = hHtml;

  // Natal aspects
  const naHtml = data.natal_chart.aspects.map(asp => {
    const an = currentLang === 'es' ? asp.aspect.name_es : asp.aspect.name_en;
    const p1 = PLANET_NAMES[currentLang][asp.planet1];
    const p2 = PLANET_NAMES[currentLang][asp.planet2];
    const g1 = planetGlyph(asp.planet1);
    const g2 = planetGlyph(asp.planet2);
    return `<div class="aspect-card transit-uranus" style="border-left-color: var(--ink-faint);">
      <div class="aspect-header">
        <span class="aspect-type">${asp.aspect.glyph} ${an}</span>
        <span class="aspect-orb">${asp.aspect.orb.toFixed(2)}°</span>
      </div>
      <div class="aspect-planets">
        <span style="font-family:serif;font-size:1.1em;">${g1}</span> ${p1}
        ${asp.aspect.glyph}
        <span style="font-family:serif;font-size:1.1em;">${g2}</span> ${p2}
      </div>
    </div>`;
  }).join('');
  document.getElementById('natal-aspects-grid').innerHTML = naHtml || `<p style="color: var(--ink-faint);">${currentLang === 'es' ? 'Sin aspectos detectados.' : 'No aspects detected.'}</p>`;
}

function renderSummary(data) {
  const summary = generateSummary(data);
  const html = summary.map(s => `
    <div class="summary-card">
      <h4>${s.title}</h4>
      <p>${s.description}</p>
    </div>
  `).join('');
  document.getElementById('summary-grid').innerHTML = html;
}

// ============================================================
// LECTURA RICARDO PUERTA — Integración con biblioteca de 367 textos
// ============================================================

// Etiquetas de cada tipo de interpretación
const RP_TIPO_LABELS = {
  es: {
    ascendente: 'Ascendente',
    planeta_en_signo: 'Planetas en signos',
    planeta_en_casa: 'Planetas en casas',
    nodo_norte: 'Nodo Norte',
    nodo_sur: 'Nodo Sur',
    fortuna_signo: 'Parte de la Fortuna en signo',
    fortuna_casa: 'Parte de la Fortuna en casa',
    aspecto: 'Aspectos planetarios'
  },
  en: {
    ascendente: 'Ascendant',
    planeta_en_signo: 'Planets in signs',
    planeta_en_casa: 'Planets in houses',
    nodo_norte: 'North Node',
    nodo_sur: 'South Node',
    fortuna_signo: 'Part of Fortune in sign',
    fortuna_casa: 'Part of Fortune in house',
    aspecto: 'Planetary aspects'
  }
};

const RP_ORDEN_CATEGORIAS = ['ascendente', 'planeta_en_signo', 'planeta_en_casa', 'nodo_norte', 'nodo_sur', 'fortuna_signo', 'fortuna_casa', 'aspecto'];

// Convierte texto plano con \n\n y **bold** a HTML con párrafos y negritas
// Si se pasa aspectoFiltrar, filtra el texto para mostrar solo ese aspecto específico
function rpFormatTexto(texto, aspectoFiltrar) {
  if (!texto) return '';

  // Si hay un aspecto a filtrar, hacer el filtrado antes de procesar el HTML
  if (aspectoFiltrar) {
    texto = rpFiltrarPorAspecto(texto, aspectoFiltrar);
  }

  // Escapar HTML peligroso
  let html = texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // Convertir **texto** a <strong>texto</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Convertir \n\n a párrafos separados
  const parrafos = html.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 0);
  return parrafos.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

// Filtra el texto de aspectos para mostrar solo el aspecto específico
// que tiene la persona, manteniendo introducción y cierre genéricos
function rpFiltrarPorAspecto(texto, nombreAspecto) {
  if (!texto || !nombreAspecto) return texto;

  // Los 5 tipos de aspectos en el orden en que aparecen en los textos
  const aspectos = ['Conjunción', 'Sextil', 'Cuadratura', 'Trígono', 'Oposición'];

  // Verificar que el aspecto a filtrar es uno de los conocidos
  if (!aspectos.includes(nombreAspecto)) return texto;

  // Dividir en párrafos
  const parrafos = texto.split(/\n\n+/);

  const intro = [];           // Párrafos antes del primer aspecto
  const aspectoElegido = [];  // Párrafos del aspecto que aplica
  const cierre = [];          // Párrafos finales (Spoiler ácido, trabajo evolutivo)

  let estadoActual = 'intro'; // 'intro' | 'aspecto_actual' | 'otro_aspecto' | 'cierre'

  for (const p of parrafos) {
    // Detectar si el párrafo empieza con un encabezado de aspecto (**Conjunción...**, **Sextil...**, etc.)
    let esEncabezadoAspecto = false;
    let aspectoDelParrafo = null;
    for (const asp of aspectos) {
      // Regex: empieza con **Aspecto (signo glyph)** o **Aspecto X-Y**
      const regex = new RegExp(`^\\*\\*${asp}\\b`, 'i');
      if (regex.test(p.trim())) {
        esEncabezadoAspecto = true;
        aspectoDelParrafo = asp;
        break;
      }
    }

    // Detectar si el párrafo empieza con "Spoiler ácido" o cierre típico
    const esCierre = /^(Spoiler ácido|Otro pecado|Y un tercer|Otro riesgo|Tu camino evolutivo|Tu trabajo evolutivo|Cuando alineas)/i.test(p.trim());

    if (esEncabezadoAspecto) {
      if (aspectoDelParrafo === nombreAspecto) {
        estadoActual = 'aspecto_actual';
        aspectoElegido.push(p);
      } else {
        estadoActual = 'otro_aspecto';
      }
    } else if (esCierre) {
      estadoActual = 'cierre';
      cierre.push(p);
    } else {
      // Continuar en el estado actual
      if (estadoActual === 'intro') {
        intro.push(p);
      } else if (estadoActual === 'aspecto_actual') {
        aspectoElegido.push(p);
      } else if (estadoActual === 'cierre') {
        cierre.push(p);
      }
      // Si es 'otro_aspecto', se ignora (no se agrega a nada)
    }
  }

  // Reconstruir: intro + aspecto elegido + cierre
  return [...intro, ...aspectoElegido, ...cierre].join('\n\n');
}

// Genera el título de cada interpretación según su tipo
function rpTituloInterpretacion(clave, item, lang) {
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const PLANETA_LABEL = {
    es: { sol:'Sol', luna:'Luna', mercurio:'Mercurio', venus:'Venus', marte:'Marte', jupiter:'Júpiter', saturno:'Saturno', urano:'Urano', neptuno:'Neptuno', pluton:'Plutón', quiron:'Quirón' },
    en: { sol:'Sun', luna:'Moon', mercurio:'Mercury', venus:'Venus', marte:'Mars', jupiter:'Jupiter', saturno:'Saturn', urano:'Uranus', neptuno:'Neptune', pluton:'Pluto', quiron:'Chiron' }
  };
  const SIGNO_LABEL = {
    es: { aries:'Aries', tauro:'Tauro', geminis:'Géminis', cancer:'Cáncer', leo:'Leo', virgo:'Virgo', libra:'Libra', escorpio:'Escorpio', sagitario:'Sagitario', capricornio:'Capricornio', acuario:'Acuario', piscis:'Piscis' },
    en: { aries:'Aries', tauro:'Taurus', geminis:'Gemini', cancer:'Cancer', leo:'Leo', virgo:'Virgo', libra:'Libra', escorpio:'Scorpio', sagitario:'Sagittarius', capricornio:'Capricorn', acuario:'Aquarius', piscis:'Pisces' }
  };
  const en = lang === 'en';
  const casaWord = en ? 'House' : 'Casa';
  const inWord = en ? 'in' : 'en';

  if (item.tipo === 'planeta_en_signo') {
    return `${PLANETA_LABEL[lang][item.planeta]} ${inWord} ${SIGNO_LABEL[lang][item.signo]}`;
  }
  if (item.tipo === 'planeta_en_casa') {
    return `${PLANETA_LABEL[lang][item.planeta]} ${inWord} ${casaWord} ${item.casa}`;
  }
  if (item.tipo === 'nodo_norte') {
    return `${en ? 'North Node' : 'Nodo Norte'} ${inWord} ${SIGNO_LABEL[lang][item.signo]}`;
  }
  if (item.tipo === 'nodo_sur') {
    return `${en ? 'South Node' : 'Nodo Sur'} ${inWord} ${SIGNO_LABEL[lang][item.signo]}`;
  }
  if (item.tipo === 'fortuna_signo') {
    return `${en ? 'Part of Fortune' : 'Parte de la Fortuna'} ${inWord} ${SIGNO_LABEL[lang][item.signo]}`;
  }
  if (item.tipo === 'fortuna_casa') {
    return `${en ? 'Part of Fortune' : 'Parte de la Fortuna'} ${inWord} ${casaWord} ${item.casa}`;
  }
  if (item.tipo === 'aspecto') {
    const aspectoLabel = item.aspecto || '';
    return `${PLANETA_LABEL[lang][item.planeta1]} — ${PLANETA_LABEL[lang][item.planeta2]} (${aspectoLabel})`;
  }
  if (item.tipo === 'ascendente') {
    return `${en ? 'Ascendant' : 'Ascendente'} ${inWord} ${SIGNO_LABEL[lang][item.signo]}`;
  }
  return clave;
}

// Cache para evitar re-fetch innecesario
let rpCachedKey = null;
let rpCachedHtml = null;

async function cargarLecturaRP() {
  if (!currentResult) return;

  const container = document.getElementById('lectura-rp-content');
  if (!container) return;

  const lang = currentLang;
  const bd = currentResult.birth_data;
  // Crear clave única para cache (datos + idioma)
  const cacheKey = `${bd.datetime}|${bd.latitude}|${bd.longitude}|${lang}`;

  // Si ya cargamos lo mismo, no volver a llamar al backend
  if (rpCachedKey === cacheKey && rpCachedHtml) {
    container.innerHTML = rpCachedHtml;
    return;
  }

  container.innerHTML = `<p style="text-align:center; color: var(--ink-faint); padding: 2rem;">${lang === 'es' ? 'Cargando lectura profunda...' : 'Loading deep reading...'}</p>`;

  const backendUrl = backendUrlInput.value.trim().replace(/\/$/, '');

  try {
    const res = await fetch(backendUrl + '/interpret-chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: bd.name,
        year: parseInt(bd.datetime.slice(0, 4)),
        month: parseInt(bd.datetime.slice(5, 7)),
        day: parseInt(bd.datetime.slice(8, 10)),
        hour: parseInt(bd.datetime.slice(11, 13)),
        minute: parseInt(bd.datetime.slice(14, 16)),
        latitude: bd.latitude,
        longitude: bd.longitude,
        city_name: bd.city,
        use_lmt: bd.use_lmt,
        transit_planet: currentFocusPlanet
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const interpretaciones = data.interpretaciones && data.interpretaciones.textos ? data.interpretaciones.textos : {};
    const total = data.interpretaciones && data.interpretaciones.total ? data.interpretaciones.total : 0;

    // Agrupar por categoría
    const porCategoria = {};
    Object.entries(interpretaciones).forEach(([clave, item]) => {
      const tipo = item.tipo || 'aspecto';
      if (!porCategoria[tipo]) porCategoria[tipo] = [];
      porCategoria[tipo].push({ clave, item });
    });

    // Construir HTML
    let html = `<p class="lead">${lang === 'es' ? `Lectura profunda de tu carta natal — <strong>${total} interpretaciones</strong> en la voz de Ricardo Puerta.` : `Deep reading of your natal chart — <strong>${total} interpretations</strong> in Ricardo Puerta's voice.`}</p>`;

    RP_ORDEN_CATEGORIAS.forEach(cat => {
      if (!porCategoria[cat] || porCategoria[cat].length === 0) return;

      const catLabel = RP_TIPO_LABELS[lang][cat] || cat;
      html += `<h3 style="border-top: 1px solid var(--line); padding-top: 2rem; margin-top: 3rem;">${catLabel}</h3>`;

      porCategoria[cat].forEach(({ clave, item }) => {
        const titulo = rpTituloInterpretacion(clave, item, lang);
        // Si es aspecto, pasar el nombre del aspecto para filtrar el texto
        const aspectoFiltrar = item.tipo === 'aspecto' ? item.aspecto : null;
        const textoHtml = rpFormatTexto(item.texto || '', aspectoFiltrar);

        // Detectar si es un aspecto entre planetas transgeneracionales / kármicos
        // (estos textos no tienen secciones específicas por aspecto)
        const planetasTransgeneracionales = ['saturno', 'urano', 'neptuno', 'pluton', 'quiron'];
        const esTransgeneracional = item.tipo === 'aspecto' &&
          planetasTransgeneracionales.includes(item.planeta1) &&
          planetasTransgeneracionales.includes(item.planeta2);

        // Generar nota explicativa según el tipo de aspecto
        let notaTransgeneracional = '';
        if (esTransgeneracional && item.aspecto) {
          const aspectoLower = item.aspecto.toLowerCase();
          let matizDescripcion = '';
          if (lang === 'es') {
            if (aspectoLower === 'trígono' || aspectoLower === 'sextil') {
              matizDescripcion = `el matiz específico del <strong>${item.aspecto}</strong> se vive como una versión más fluida y armónica de esta dinámica`;
            } else if (aspectoLower === 'cuadratura' || aspectoLower === 'oposición') {
              matizDescripcion = `el matiz específico del <strong>${item.aspecto}</strong> se vive como una versión más tensa y exigente de esta dinámica`;
            } else if (aspectoLower === 'conjunción') {
              matizDescripcion = `el matiz específico de la <strong>Conjunción</strong> se vive como una fusión intensa de esta dinámica`;
            } else {
              matizDescripcion = `el matiz específico del <strong>${item.aspecto}</strong> modula esta dinámica`;
            }
            notaTransgeneracional = `<div style="background: var(--accent-soft); border-left: 3px solid var(--accent); padding: 0.85rem 1.15rem; border-radius: 4px; margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6;">
              <strong style="color: var(--accent);">ℹ️ Aspecto transgeneracional</strong> — El texto que sigue describe la dinámica general entre estos dos planetas, que afecta a generaciones enteras. Para tu carta personal, ${matizDescripcion}.
            </div>`;
          } else {
            if (aspectoLower === 'trine' || aspectoLower === 'sextile') {
              matizDescripcion = `the specific nuance of the <strong>${item.aspecto}</strong> is experienced as a more fluid, harmonic version of this dynamic`;
            } else if (aspectoLower === 'square' || aspectoLower === 'opposition') {
              matizDescripcion = `the specific nuance of the <strong>${item.aspecto}</strong> is experienced as a tenser, more demanding version of this dynamic`;
            } else if (aspectoLower === 'conjunction') {
              matizDescripcion = `the specific nuance of the <strong>Conjunction</strong> is experienced as an intense fusion of this dynamic`;
            } else {
              matizDescripcion = `the specific nuance of the <strong>${item.aspecto}</strong> modulates this dynamic`;
            }
            notaTransgeneracional = `<div style="background: var(--accent-soft); border-left: 3px solid var(--accent); padding: 0.85rem 1.15rem; border-radius: 4px; margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6;">
              <strong style="color: var(--accent);">ℹ️ Transgenerational aspect</strong> — The text that follows describes the general dynamic between these two planets, which affects entire generations. For your personal chart, ${matizDescripcion}.
            </div>`;
          }
        }

        html += `<div style="margin-bottom: 2.5rem;">`;
        html += `<h4 style="font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 500; color: var(--uranus); margin: 1.5rem 0 1rem 0;">${titulo}</h4>`;
        html += notaTransgeneracional;
        html += textoHtml;
        html += `</div>`;
      });
    });

    // Guardar en cache
    rpCachedKey = cacheKey;
    rpCachedHtml = html;

    container.innerHTML = html;
  } catch (err) {
    console.error('Error cargando Lectura RP:', err);
    container.innerHTML = `<p style="text-align:center; color: var(--error); padding: 2rem;">${lang === 'es' ? 'Error al cargar la lectura. Verifica la conexión con el backend.' : 'Error loading reading. Check backend connection.'}<br><small style="opacity:0.7;">${err.message}</small></p>`;
  }
}

// ============================================================
// REFETCH WITH NEW FOCUS PLANET
// ============================================================
async function refreshFocusPlanet() {
  if (!currentResult) return;
  const backendUrl = backendUrlInput.value.trim().replace(/\/$/, '');
  document.getElementById('loading').classList.add('visible');
  document.getElementById('result-view').classList.remove('visible');
  try {
    const res = await fetch(backendUrl + '/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: currentResult.birth_data.name,
        year: parseInt(currentResult.birth_data.datetime.slice(0,4)),
        month: parseInt(currentResult.birth_data.datetime.slice(5,7)),
        day: parseInt(currentResult.birth_data.datetime.slice(8,10)),
        hour: parseInt(currentResult.birth_data.datetime.slice(11,13)),
        minute: parseInt(currentResult.birth_data.datetime.slice(14,16)),
        latitude: currentResult.birth_data.latitude,
        longitude: currentResult.birth_data.longitude,
        city_name: currentResult.birth_data.city,
        use_lmt: currentResult.birth_data.use_lmt,
        transit_planet: currentFocusPlanet
      })
    });
    const data = await res.json();
    document.getElementById('loading').classList.remove('visible');
    document.getElementById('result-view').classList.add('visible');
    renderResult(data);
  } catch (e) {
    document.getElementById('loading').classList.remove('visible');
    document.getElementById('result-view').classList.add('visible');
    console.error(e);
  }
}

// ============================================================
// TABS
// ============================================================
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    if (tab.dataset.tab === 'lectura-rp') cargarLecturaRP();
  });
});

// ============================================================
// SUBMIT FORM
// ============================================================
const submitBtn = document.getElementById('submit-btn');
const inputView = document.getElementById('input-view');
const loadingView = document.getElementById('loading');
const resultView = document.getElementById('result-view');
const errorDisplay = document.getElementById('error-display');

submitBtn.addEventListener('click', async () => {
  errorDisplay.innerHTML = '';
  const name = document.getElementById('name').value.trim();
  const birthdate = document.getElementById('birthdate').value;
  const birthtime = document.getElementById('birthtime').value;
  const useLmt = document.getElementById('use-lmt').checked;

  if (!birthdate || !birthtime) {
    errorDisplay.innerHTML = `<div class="error-box">${currentLang === 'es' ? 'Por favor completa fecha y hora.' : 'Please complete date and time.'}</div>`;
    return;
  }
  if (!selectedCity) {
    errorDisplay.innerHTML = `<div class="error-box">${currentLang === 'es' ? 'Por favor selecciona tu ciudad de la lista.' : 'Please select your city.'}</div>`;
    return;
  }

  const backendUrl = backendUrlInput.value.trim().replace(/\/$/, '');
  const [year, month, day] = birthdate.split('-').map(Number);
  const [hour, minute] = birthtime.split(':').map(Number);

  inputView.style.display = 'none';
  loadingView.classList.add('visible');

  try {
    const res = await fetch(backendUrl + '/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, year, month, day, hour, minute,
        latitude: parseFloat(selectedCity.lat),
        longitude: parseFloat(selectedCity.lon),
        city_name: selectedCity.display_name,
        use_lmt: useLmt,
        transit_planet: currentFocusPlanet
      })
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${res.status}`);
    }
    const data = await res.json();
    loadingView.classList.remove('visible');
    resultView.classList.add('visible');
    renderResult(data);
  } catch (e) {
    loadingView.classList.remove('visible');
    inputView.style.display = 'block';
    errorDisplay.innerHTML = `<div class="error-box">${currentLang === 'es' ? 'Error de conexión' : 'Connection error'}: ${e.message}</div>`;
  }
});

// ============================================================
// DOWNLOAD ACTIONS
// ============================================================
document.getElementById('reset-btn').addEventListener('click', () => {
  resultView.classList.remove('visible');
  inputView.style.display = 'block';
  currentResult = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('download-pdf-btn').addEventListener('click', () => {
  window.print();
});

document.getElementById('download-png-btn').addEventListener('click', async () => {
  // Convert SVG to PNG via canvas with logo watermark
  const originalSvg = document.getElementById('natal-chart');

  // Clonar el SVG y expandir su viewBox para que MC/IC/C/D no se corten
  const svg = originalSvg.cloneNode(true);
  const VIEWBOX_EXPAND = 20; // píxeles de expansión en cada lado del viewBox
  svg.setAttribute('viewBox', `-${VIEWBOX_EXPAND} -${VIEWBOX_EXPAND} ${480 + (VIEWBOX_EXPAND * 2)} ${480 + (VIEWBOX_EXPAND * 2)}`);

  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  // Tamaños: carta con padding + zona del logo
  const CANVAS_WIDTH = 1400;
  const CHART_PADDING = 60;
  const CHART_SIZE = 1200;
  const LOGO_AREA_HEIGHT = 280;
  const CANVAS_HEIGHT = CHART_SIZE + (CHART_PADDING * 2) + LOGO_AREA_HEIGHT;

  const img = new Image();
  img.onload = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Colores según modo
    const bgColor = dark ? '#1a1816' : '#fafaf7';
    const inkColor = dark ? '#efece5' : '#1a1a1a';
    const lineColor = dark ? '#3d3a35' : '#d4d2c8';
    const inkFaintColor = dark ? '#807a6e' : '#8a897f';
    // Fondo
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Dibujar la carta natal con padding (centrada horizontalmente)
    const chartX = (CANVAS_WIDTH - CHART_SIZE) / 2;
    const chartY = CHART_PADDING;
    ctx.drawImage(img, chartX, chartY, CHART_SIZE, CHART_SIZE);

    // Línea divisoria sutil
    const dividerY = CHART_SIZE + (CHART_PADDING * 2) - 20;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH * 0.2, dividerY);
    ctx.lineTo(CANVAS_WIDTH * 0.8, dividerY);
    ctx.stroke();

    // Función auxiliar: descarga el PNG
    const descargarPNG = () => {
      canvas.toBlob(b => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        const name = (currentResult?.birth_data?.name || 'carta_natal').replace(/[^a-z0-9]/gi, '_');
        a.download = `${name}_carta_natal.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      }, 'image/png');
      URL.revokeObjectURL(url);
    };

    // Función auxiliar: dibujar texto del logo con canvas
    const dibujarTextoLogo = (centerY) => {
      ctx.fillStyle = inkColor;
      ctx.font = '600 38px "Inter", "Source Sans Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('RICARDO PUERTA ISAZA', CANVAS_WIDTH / 2, centerY);
      ctx.fillStyle = inkFaintColor;
      ctx.font = '400 italic 22px "Inter", "Source Sans Pro", sans-serif';
      ctx.fillText('arquitecto y astrólogo', CANVAS_WIDTH / 2, centerY + 38);
    };

    // Cargar el SÍMBOLO del logo y dibujarlo debajo
    try {
      const logoResponse = await fetch('assets/logo-simbolo.svg');
      let logoSvgText = await logoResponse.text();
      logoSvgText = logoSvgText.replace(/currentColor/g, inkColor);
      const logoBlob = new Blob([logoSvgText], { type: 'image/svg+xml;charset=utf-8' });
      const logoUrl = URL.createObjectURL(logoBlob);

      const logoImg = new Image();
      logoImg.onload = () => {
        const symbolSize = 120;
        const symbolX = (CANVAS_WIDTH - symbolSize) / 2;
        const symbolY = dividerY + 30;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(logoImg, symbolX, symbolY, symbolSize, symbolSize);
        ctx.globalAlpha = 1.0;
        URL.revokeObjectURL(logoUrl);
        const textCenterY = symbolY + symbolSize + 30;
        dibujarTextoLogo(textCenterY);
        descargarPNG();
      };
      logoImg.onerror = () => {
        console.warn('No se pudo cargar el símbolo del logo');
        const textCenterY = dividerY + 60;
        dibujarTextoLogo(textCenterY);
        descargarPNG();
      };
      logoImg.src = logoUrl;
    } catch (err) {
      console.warn('Error cargando logo:', err);
      const textCenterY = dividerY + 60;
      dibujarTextoLogo(textCenterY);
      descargarPNG();
    }
  };
  img.src = url;
});

// Init
document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];
checkBackend();
