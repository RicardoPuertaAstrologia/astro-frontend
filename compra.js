// ============================================================
// COMPRA DEL INFORME COMPLETO — Wompi
// Ricardo Puerta · Astrología
//
// Este archivo no contiene ninguna llave secreta. Le pide al
// servidor que arme y firme el cobro, y el servidor es quien
// verifica con Wompi que el pago sea real.
// ============================================================

const COMPRA_CHECKOUT = 'https://checkout.wompi.co/p/';
const COMPRA_GUARDADO = 'rp_compra';       // lo que se guarda antes de ir a pagar
const COMPRA_PERMISO = 'rp_permiso';       // permiso de lectura tras pagar

const COMPRA_TEXTOS = {
  es: {
    rotulo: 'El informe completo',
    titulo: 'Tu carta natal, completa, en PDF',
    puntos: [
      'El texto completo de tu carta natal',
      'Los tránsitos de los planetas lentos, uno por uno',
      'Tu calendario de 12 meses y tus áreas de vida activadas',
      'Las 23 edades zodiacales, con la tuya señalada'
    ],
    hoy: 'Hoy son',
    trm: 'según la TRM del Banco de la República',
    boton: 'Comprar el informe',
    correoTitulo: 'Para enviarte el informe',
    correoTexto: 'El PDF te llega a este correo apenas se confirme el pago, así no pierdas la página.',
    correo: 'Tu correo electrónico',
    correo2: 'Escríbelo otra vez',
    irapagar: 'Ir a pagar',
    errorCorreo: 'Escribe un correo válido.',
    errorIguales: 'Los dos correos no son iguales.',
    cargando: 'Preparando el pago…',
    errorServidor: 'No se pudo preparar el pago. Intenta de nuevo en un momento.',
    verificando: 'Verificando tu pago…',
    aprobadoTitulo: 'Tu pago ya fue aprobado',
    aprobadoTexto: 'Tu carta natal completa quedó abierta en esta pantalla: entra a <strong>Tu carta natal detallada</strong> y a las demás pestañas para leerla toda.',
    aprobadoCorreo: 'También te lo estamos enviando en PDF al correo que registraste',
    descargar: 'Descarga acá tu carta natal completa',
    botonPdfCompleto: 'Descargar tu informe completo',
    preparando: 'Preparando tu informe...',
    verDetalle: 'Leer mi carta natal detallada',
    flotante: 'Descargar tu informe completo',
    enviando: 'Preparando tu informe y enviándolo a tu correo…',
    enviado: 'Listo: tu informe salió hacia',
    noEnviado: 'No pudimos enviarlo al correo. Escríbeme y te lo mando yo mismo: ricardopuerta@ricardopuerta.com',
    rechazadoTitulo: 'El pago no se completó',
    rechazadoTexto: 'No se hizo ningún cobro. Puedes intentarlo otra vez.',
    cerrar: 'Cerrar'
  },
  en: {
    rotulo: 'The full report',
    titulo: 'Your complete natal chart, as a PDF',
    puntos: [
      'The complete text of your natal chart',
      'The transits of the slow planets, one by one',
      'Your 12-month calendar and the areas of life now active',
      'The 23 zodiacal ages, with yours marked'
    ],
    hoy: 'Today that is',
    trm: 'at the official Colombian exchange rate',
    boton: 'Buy the report',
    correoTitulo: 'So we can send you the report',
    correoTexto: 'The PDF reaches this address as soon as the payment is confirmed, so you cannot lose it.',
    correo: 'Your email address',
    correo2: 'Type it again',
    irapagar: 'Go to payment',
    errorCorreo: 'Please write a valid email address.',
    errorIguales: 'The two addresses are not the same.',
    cargando: 'Preparing the payment…',
    errorServidor: 'The payment could not be prepared. Please try again in a moment.',
    verificando: 'Checking your payment…',
    aprobadoTitulo: 'Your payment was approved',
    aprobadoTexto: 'Your complete natal chart is now open on this screen: go to <strong>Your natal chart in detail</strong> and the other tabs to read all of it.',
    aprobadoCorreo: 'We are also sending it to you as a PDF, to the address you registered',
    descargar: 'Download your complete natal chart here',
    botonPdfCompleto: 'Download your full report',
    preparando: 'Preparing your report...',
    verDetalle: 'Read my natal chart in detail',
    flotante: 'Download your full report',
    enviando: 'Preparing your report and sending it to your inbox…',
    enviado: 'Done: your report is on its way to',
    noEnviado: 'We could not send the email. Write to me and I will send it myself: ricardopuerta@ricardopuerta.com',
    rechazadoTitulo: 'The payment was not completed',
    rechazadoTexto: 'Nothing was charged. You can try again.',
    cerrar: 'Close'
  }
};

// --- Estilos propios ---
(function () {
  if (document.getElementById('compra-estilos')) return;
  const s = document.createElement('style');
  s.id = 'compra-estilos';
  s.textContent = `
  .compra-flotante { position: fixed; right: 18px; bottom: 18px; z-index: 60;
    background: #1a1a1a; color: #fff; border: none; border-radius: 999px;
    padding: .8rem 1.3rem; font-size: .85rem; font-weight: 500; cursor: pointer;
    box-shadow: 0 6px 22px rgba(0,0,0,.22); display: inline-flex; align-items: center; gap: .5rem; }
  .compra-flotante:hover { background: #000; }
  .compra-flotante[disabled] { opacity: .6; cursor: default; }
  @media print { .compra-flotante { display: none !important; } }
  @media (max-width: 520px) { .compra-flotante { right: 10px; bottom: 10px; padding: .7rem 1rem; font-size: .8rem; } }
  .compra-caja { margin-top: 2.5rem; border: 1px solid var(--gold, #c9a961); border-radius: 12px;
    padding: 1.8rem 1.6rem; background: #fff; }
  .compra-rotulo { font-size: .7rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--gold, #c9a961); font-weight: 700; margin-bottom: .5rem; }
  .compra-titulo { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.55rem; line-height: 1.2; margin-bottom: 1rem; }
  .compra-caja ul { list-style: none; margin: 0 0 1.3rem; padding: 0; }
  .compra-caja li { position: relative; padding-left: 1.3rem; margin-bottom: .45rem; font-size: .95rem; line-height: 1.5; }
  .compra-caja li::before { content: ''; position: absolute; left: 0; top: .5rem; width: .5rem; height: .5rem;
    border-radius: 50%; border: 1.5px solid var(--accent, #4a8fb8); }
  .compra-precio { display: flex; align-items: baseline; gap: .6rem; flex-wrap: wrap; margin-bottom: 1.3rem;
    padding-top: 1.1rem; border-top: 1px solid var(--line, #e2ded4); }
  .compra-usd { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2rem; font-weight: 500; line-height: 1; }
  .compra-cop { font-size: .85rem; color: var(--ink-faint, #5a5f67); }
  .compra-btn { display: inline-block; border: 0; border-radius: 999px; cursor: pointer;
    background: var(--ink, #15181d); color: #fff; font: 600 .82rem/1 inherit; letter-spacing: .08em;
    text-transform: uppercase; padding: 1rem 2rem; transition: background .25s; }
  .compra-btn:hover { background: var(--accent-deep, #4a8fb8); }
  .compra-velo { position: fixed; inset: 0; z-index: 9000; background: rgba(11,14,18,.72);
    display: none; align-items: center; justify-content: center; padding: 1rem; }
  .compra-velo.abierto { display: flex; }
  .compra-ventana { position: relative; background: #fff; border-radius: 14px; width: min(100%, 460px);
    padding: 2rem 1.8rem 1.6rem; max-height: 92vh; overflow: auto; }
  .compra-ventana h3 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.6rem; margin: 0 0 .4rem; }
  .compra-ventana p.sub { font-size: .9rem; color: var(--ink-faint, #5a5f67); margin: 0 0 1.4rem; line-height: 1.55; }
  .compra-campo { margin-bottom: 1rem; }
  .compra-campo label { display: block; font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
    color: var(--ink-faint, #5a5f67); font-weight: 600; margin-bottom: .35rem; }
  .compra-campo input { width: 100%; font: 400 1rem inherit; padding: .75rem .9rem; border-radius: 9px;
    border: 1px solid var(--line, #e2ded4); background: #fff; color: var(--ink, #15181d); }
  .compra-campo input:focus { outline: none; border-color: var(--accent, #4a8fb8); }
  .compra-error { display: none; color: #a33; font-size: .84rem; margin-bottom: .8rem; }
  .compra-cerrar { position: absolute; top: .7rem; right: .9rem; border: 0; background: none; font-size: 1.6rem;
    line-height: 1; color: var(--ink-faint, #5a5f67); cursor: pointer; }
  .compra-aviso { margin: 0 0 1.4rem; padding: 1rem 1.2rem; border-radius: 10px; font-size: .92rem; line-height: 1.6; }
  .compra-aviso.bien { background: rgba(201,169,97,.12); border: 1px solid var(--gold, #c9a961); }
  .compra-aviso.mal { background: rgba(170,51,51,.08); border: 1px solid #a33; }
  .compra-aviso .titulo { display: block; font-weight: 700; margin-bottom: .25rem; }
  .compra-aviso .acciones { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 1rem; }
  .compra-aviso .acciones .compra-btn { padding: .85rem 1.5rem; font-size: .76rem; }
  .compra-aviso .secundario { background: none; color: var(--ink, #15181d); border: 1px solid var(--ink, #15181d); }
  .compra-aviso .secundario:hover { background: var(--ink, #15181d); color: #fff; }
  .compra-aviso .estado { margin-top: .9rem; font-size: .88rem; color: var(--ink-faint, #5a5f67); }
  @media print { .compra-caja, .compra-velo, .compra-aviso { display: none !important; } }
  `;
  document.head.appendChild(s);
})();

function compraIdioma() {
  return (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en' : 'es';
}

function compraServidor() {
  const campo = document.getElementById('backend-url');
  const url = (campo && campo.value ? campo.value : '').trim().replace(/\/$/, '');
  return url || 'https://astro-transits-api-planets.onrender.com';
}

function compraPesos(n) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

function compraCorreoValido(c) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(c).trim());
}

// ------------------------------------------------------------
// LA CAJA DE COMPRA
// ------------------------------------------------------------
async function renderCompra(contenedorId) {
  const cont = document.getElementById(contenedorId);
  if (!cont) return;
  if (compraTienePermiso()) { cont.innerHTML = ''; compraAjustarBotonPDF(); compraBotonFlotante(); return; }

  const t = COMPRA_TEXTOS[compraIdioma()];
  let precio = null;
  try {
    const r = await fetch(compraServidor() + '/precio');
    if (r.ok) precio = await r.json();
  } catch (e) { /* si no se puede, se muestra sin el valor en pesos */ }

  cont.innerHTML = `
    <div class="compra-caja">
      <div class="compra-rotulo">${t.rotulo}</div>
      <div class="compra-titulo">${t.titulo}</div>
      <ul>${t.puntos.map(p => '<li>' + p + '</li>').join('')}</ul>
      <div class="compra-precio">
        <span class="compra-usd">US$ ${precio ? precio.usd.toFixed(2) : '24.99'}</span>
        ${precio ? `<span class="compra-cop">${t.hoy} ${compraPesos(precio.cop)} COP · ${t.trm}</span>` : ''}
      </div>
      <button type="button" class="compra-btn" id="compra-abrir">${t.boton}</button>
    </div>
  `;
  const b = document.getElementById('compra-abrir');
  if (b) b.addEventListener('click', compraAbrirVentana);
}

// ------------------------------------------------------------
// VENTANA DEL CORREO
// ------------------------------------------------------------
function compraAbrirVentana() {
  const t = COMPRA_TEXTOS[compraIdioma()];
  let velo = document.getElementById('compra-velo');
  if (!velo) {
    velo = document.createElement('div');
    velo.className = 'compra-velo';
    velo.id = 'compra-velo';
    document.body.appendChild(velo);
    velo.addEventListener('click', e => { if (e.target === velo) velo.classList.remove('abierto'); });
  }
  velo.innerHTML = `
    <div class="compra-ventana">
      <button type="button" class="compra-cerrar" id="compra-x" aria-label="${t.cerrar}">×</button>
      <h3>${t.correoTitulo}</h3>
      <p class="sub">${t.correoTexto}</p>
      <div class="compra-campo"><label for="compra-c1">${t.correo}</label><input id="compra-c1" type="email" autocomplete="email"></div>
      <div class="compra-campo"><label for="compra-c2">${t.correo2}</label><input id="compra-c2" type="email" autocomplete="off"></div>
      <div class="compra-error" id="compra-error"></div>
      <button type="button" class="compra-btn" id="compra-pagar" style="width:100%">${t.irapagar}</button>
    </div>
  `;
  velo.classList.add('abierto');
  document.getElementById('compra-x').addEventListener('click', () => velo.classList.remove('abierto'));
  document.getElementById('compra-pagar').addEventListener('click', compraIrAPagar);
  setTimeout(() => document.getElementById('compra-c1').focus(), 60);
}

async function compraIrAPagar() {
  const t = COMPRA_TEXTOS[compraIdioma()];
  const err = document.getElementById('compra-error');
  const c1 = document.getElementById('compra-c1').value.trim();
  const c2 = document.getElementById('compra-c2').value.trim();

  const mostrarError = (m) => { err.textContent = m; err.style.display = 'block'; };
  if (!compraCorreoValido(c1)) return mostrarError(t.errorCorreo);
  if (c1.toLowerCase() !== c2.toLowerCase()) return mostrarError(t.errorIguales);
  err.style.display = 'none';

  const boton = document.getElementById('compra-pagar');
  boton.disabled = true;
  boton.textContent = t.cargando;

  let cobro;
  try {
    const r = await fetch(compraServidor() + '/cobro/crear', { method: 'POST' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    cobro = await r.json();
  } catch (e) {
    boton.disabled = false;
    boton.textContent = t.irapagar;
    return mostrarError(t.errorServidor);
  }

  // Se guarda todo lo necesario para volver a armar la pantalla al regresar de Wompi.
  try {
    sessionStorage.setItem(COMPRA_GUARDADO, JSON.stringify({
      referencia: cobro.referencia,
      correo: c1,
      idioma: compraIdioma(),
      carta: (typeof currentResult !== 'undefined' && currentResult) ? currentResult : null
    }));
  } catch (e) { /* si el navegador no deja guardar, el pago igual sigue */ }

  const volverA = location.origin + location.pathname;
  const form = document.createElement('form');
  form.method = 'GET';
  form.action = COMPRA_CHECKOUT;
  const campos = {
    'public-key': cobro.llave_publica,
    'currency': cobro.moneda,
    'amount-in-cents': cobro.monto_en_centavos,
    'reference': cobro.referencia,
    'signature:integrity': cobro.firma_integridad,
    'redirect-url': volverA,
    'customer-data:email': c1
  };
  Object.keys(campos).forEach(k => {
    const i = document.createElement('input');
    i.type = 'hidden'; i.name = k; i.value = campos[k];
    form.appendChild(i);
  });
  document.body.appendChild(form);
  form.submit();
}

// ------------------------------------------------------------
// EL REGRESO DESDE WOMPI
// ------------------------------------------------------------
function compraTienePermiso() {
  try {
    const g = JSON.parse(sessionStorage.getItem(COMPRA_PERMISO) || 'null');
    return !!(g && g.permiso && g.vence > Date.now());
  } catch (e) { return false; }
}

function compraPermiso() {
  try {
    const g = JSON.parse(sessionStorage.getItem(COMPRA_PERMISO) || 'null');
    return (g && g.vence > Date.now()) ? g.permiso : '';
  } catch (e) { return ''; }
}

function compraAviso(tipo, titulo, texto, extra) {
  const destino = document.getElementById('compra-aviso-lugar')
    || document.getElementById('result-view')
    || document.body;
  const anterior = destino.querySelector('.compra-aviso');
  if (anterior) anterior.remove();
  const d = document.createElement('div');
  d.className = 'compra-aviso ' + tipo;
  d.id = 'compra-aviso';
  d.innerHTML = `<span class="titulo">${titulo}</span>${texto}${extra || ''}`;
  destino.insertBefore(d, destino.firstChild);
  return d;
}

// Imprime TODO (la versión completa), no solo el gráfico y los datos.
async function compraDescargarCompleto(evento) {
  const boton = evento && evento.currentTarget ? evento.currentTarget : null;
  const etiquetaOriginal = boton ? boton.textContent : '';
  const t = COMPRA_TEXTOS[compraIdioma()];

  const nacimiento = compraNacimiento();

  // Sin permiso o sin datos no hay nada que pedirle al servidor:
  // se cae al método de siempre, imprimir desde el navegador.
  if (!compraTienePermiso() || !nacimiento) {
    document.body.classList.remove('pdf-basico');
    window.print();
    return;
  }

  if (boton) { boton.disabled = true; boton.textContent = t.preparando; }
  try {
    const r = await fetch(compraServidor() + '/cobro/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        permiso: compraPermiso(),
        lang: compraIdioma(),
        nacimiento: nacimiento,
        imagen: await compraImagenCarta(),
        secciones: compraSecciones()
      })
    });
    if (!r.ok) throw new Error('el servidor respondió ' + r.status);
    const archivo = await r.blob();
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = ('Carta natal - ' + ((nacimiento && nacimiento.name) || 'informe')).trim() + '.pdf';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    setTimeout(function () { URL.revokeObjectURL(enlace.href); }, 4000);
  } catch (e) {
    console.warn('No se pudo bajar el PDF del servidor:', e);
    document.body.classList.remove('pdf-basico');
    window.print();
  } finally {
    if (boton) { boton.disabled = false; boton.textContent = etiquetaOriginal; }
  }
}

function compraIrAlDetalle() {
  const pestana = document.querySelector('.tab[data-tab="lectura-rp"]');
  if (pestana) {
    pestana.click();
    pestana.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// El gráfico de la carta, convertido en imagen para el PDF del correo.
function compraImagenCarta() {
  return new Promise(function (listo) {
    try {
      const original = document.getElementById('natal-chart');
      if (!original) return listo(null);
      const svg = original.cloneNode(true);
      svg.setAttribute('viewBox', '-20 -20 520 520');
      const texto = new XMLSerializer().serializeToString(svg);
      const url = URL.createObjectURL(new Blob([texto], { type: 'image/svg+xml;charset=utf-8' }));
      const img = new Image();
      img.onload = function () {
        const lienzo = document.createElement('canvas');
        lienzo.width = 1400; lienzo.height = 1400;
        const ctx = lienzo.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, lienzo.width, lienzo.height);
        ctx.drawImage(img, 0, 0, lienzo.width, lienzo.height);
        URL.revokeObjectURL(url);
        try { listo(lienzo.toDataURL('image/png')); } catch (e) { listo(null); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); listo(null); };
      img.src = url;
    } catch (e) { listo(null); }
  });
}

// Lo que ya está escrito en pantalla, para que también vaya en el PDF.
// Las pestañas que no están abiertas están ocultas, y de algo oculto el
// navegador entrega el texto sin saltos de línea: "Tu carta" se pega con
// el valor. Así que se le devuelve el diseño un instante, fuera de la
// pantalla, se lee el texto bien formado y se deja todo como estaba.
function compraConDiseno(caja, trabajo) {
  const abierta = caja.classList.contains('active');
  const estiloPrevio = caja.getAttribute('style');
  if (!abierta) {
    caja.setAttribute('style',
      'display:block;position:absolute;left:-10000px;top:0;width:760px;opacity:1;');
  }
  try {
    return trabajo(caja);
  } finally {
    if (!abierta) {
      if (estiloPrevio === null) caja.removeAttribute('style');
      else caja.setAttribute('style', estiloPrevio);
    }
  }
}

function compraLineas(elemento) {
  return (elemento.innerText || elemento.textContent || '').split('\n')
    .map(function (l) { return l.replace(/\s+/g, ' ').trim(); })
    .filter(function (l) { return l.length > 1; });
}

function compraSecciones() {
  const secciones = [];

  // Tránsitos de los planetas lentos, y calendario de 12 meses:
  // texto corrido, tal como se ve en pantalla.
  [['interpretation', 'Tránsitos de los planetas lentos'],
   ['calendar', 'Tu calendario · 12 meses']].forEach(function (p) {
    const caja = document.getElementById('tab-' + p[0]);
    if (!caja) return;
    const lineas = compraConDiseno(caja, compraLineas);
    if (lineas.length) {
      secciones.push({ titulo: p[1], bloques: [{ subtitulo: '', parrafos: lineas }] });
    }
  });

  // Áreas de vida: cada área va como un bloque con su propio título, para
  // que en el PDF el nombre del área salga destacado en negrilla y no
  // perdido dentro de un párrafo corrido.
  const cajaAreas = document.getElementById('tab-summary');
  if (cajaAreas) {
    const bloques = compraConDiseno(cajaAreas, function (caja) {
      const salida = [];
      caja.querySelectorAll('.summary-card').forEach(function (tarjeta) {
        const h = tarjeta.querySelector('h4');
        const titulo = h ? (h.innerText || h.textContent || '').trim() : '';
        // El cuerpo no está en un solo elemento: el navegador reacomoda
        // los <div> que vienen dentro del <p>. Así que se lee la tarjeta
        // entera y se descuenta el título.
        const lineas = compraLineas(tarjeta).filter(function (l) { return l !== titulo; });
        if (titulo || lineas.length) {
          salida.push({ subtitulo: titulo, parrafos: lineas });
        }
      });
      return salida;
    });
    if (bloques.length) {
      secciones.push({ titulo: 'Tus áreas de vida activadas', bloques: bloques });
    }
  }

  return secciones;
}

// Arma los datos de nacimiento a partir de la carta que está en pantalla.
function compraNacimiento() {
  if (typeof currentResult === 'undefined' || !currentResult) return null;
  const bd = currentResult.birth_data || {};
  const f = String(bd.datetime || '');
  const n = {
    name: bd.name || '',
    year: parseInt(f.slice(0, 4), 10),
    month: parseInt(f.slice(5, 7), 10),
    day: parseInt(f.slice(8, 10), 10),
    hour: parseInt(f.slice(11, 13), 10),
    minute: parseInt(f.slice(14, 16), 10),
    latitude: bd.latitude,
    longitude: bd.longitude,
    city_name: bd.city || '',
    use_lmt: !!bd.use_lmt
  };
  if (!n.year || n.latitude === undefined) return null;
  return n;
}

// Le pide al servidor que arme el PDF y lo mande al correo.
async function compraPedirInforme(id, referencia, correo, cajaAviso) {
  const t = COMPRA_TEXTOS[compraIdioma()];
  if (!correo || typeof currentResult === 'undefined' || !currentResult) return;
  const nacimiento = compraNacimiento();
  if (!nacimiento) return;

  const estado = document.createElement('div');
  estado.className = 'estado';
  estado.textContent = t.enviando;
  if (cajaAviso) cajaAviso.appendChild(estado);

  let imagen = null;
  try { imagen = await compraImagenCarta(); } catch (e) {}

  try {
    const r = await fetch(compraServidor() + '/cobro/entregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id, referencia: referencia, correo: correo, lang: compraIdioma(),
        nacimiento: nacimiento, imagen: imagen, secciones: compraSecciones()
      })
    });
    const datos = await r.json();
    estado.textContent = (r.ok && datos.correo_enviado)
      ? (t.enviado + ' ' + correo)
      : t.noEnviado;
  } catch (e) {
    estado.textContent = t.noEnviado;
  }
}

async function compraRevisarRegreso() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) return;

  // Se limpia la dirección para que al recargar no se repita la verificación.
  history.replaceState({}, '', location.origin + location.pathname);

  let guardado = null;
  try { guardado = JSON.parse(sessionStorage.getItem(COMPRA_GUARDADO) || 'null'); } catch (e) {}
  const t = COMPRA_TEXTOS[(guardado && guardado.idioma === 'en') ? 'en' : compraIdioma()];

  let r;
  try {
    const url = compraServidor() + '/cobro/verificar?id=' + encodeURIComponent(id)
      + (guardado ? '&referencia=' + encodeURIComponent(guardado.referencia) : '');
    const resp = await fetch(url);
    r = await resp.json();
  } catch (e) {
    compraAviso('mal', t.rechazadoTitulo, t.rechazadoTexto);
    return;
  }

  if (!r || !r.aprobado) {
    compraAviso('mal', t.rechazadoTitulo, t.rechazadoTexto);
    return;
  }

  try {
    sessionStorage.setItem(COMPRA_PERMISO, JSON.stringify({
      permiso: r.permiso,
      referencia: r.referencia,
      correo: guardado ? guardado.correo : '',
      vence: Date.now() + (r.horas || 6) * 3600 * 1000
    }));
  } catch (e) {}

  // Volver a pintar la carta que la persona estaba viendo antes de pagar.
  if (guardado && guardado.carta && typeof renderResult === 'function') {
    try {
      currentResult = guardado.carta;
      document.getElementById('input-view').style.display = 'none';
      document.getElementById('result-view').classList.add('visible');
      renderResult(guardado.carta);
    } catch (e) { console.warn('No se pudo rearmar la carta:', e); }
  }

  const botones = `
    <div class="acciones">
      <button type="button" class="compra-btn" id="compra-descargar">${t.descargar}</button>
      <button type="button" class="compra-btn secundario" id="compra-detalle">${t.verDetalle}</button>
    </div>
    <div class="estado">${t.aprobadoCorreo}${guardado && guardado.correo ? ': ' + guardado.correo : '.'}</div>`;
  const caja = compraAviso('bien', t.aprobadoTitulo, t.aprobadoTexto, botones);

  const bDesc = document.getElementById('compra-descargar');
  if (bDesc) bDesc.addEventListener('click', compraDescargarCompleto);
  const bDet = document.getElementById('compra-detalle');
  if (bDet) bDet.addEventListener('click', compraIrAlDetalle);
  compraAjustarBotonPDF();
  compraBotonFlotante();

  compraPedirInforme(id, r.referencia || (guardado ? guardado.referencia : ''),
                     guardado ? guardado.correo : '', caja);
}

// Un botón que acompaña la lectura: quien ya pagó puede descargar en
// cualquier momento, sin tener que bajar hasta el final de la página.
function compraBotonFlotante() {
  if (!compraTienePermiso()) return;
  if (document.getElementById('compra-flotante')) return;
  const b = document.createElement('button');
  b.type = 'button';
  b.id = 'compra-flotante';
  b.className = 'compra-flotante';
  b.textContent = COMPRA_TEXTOS[compraIdioma()].flotante;
  b.addEventListener('click', compraDescargarCompleto);
  document.body.appendChild(b);
}


// Con el informe comprado, el botón de siempre baja el PDF COMPLETO.
function compraAjustarBotonPDF() {
  if (!compraTienePermiso()) return;
  const viejo = document.getElementById('download-pdf-btn');
  if (!viejo || viejo.dataset.completo === 'si') return;
  const nuevo = viejo.cloneNode(true);   // el clon no trae los oyentes anteriores
  nuevo.dataset.completo = 'si';
  const etiqueta = nuevo.querySelector('[data-i18n="downloadPdf"]') || nuevo;
  etiqueta.textContent = COMPRA_TEXTOS[compraIdioma()].botonPdfCompleto;
  etiqueta.removeAttribute('data-i18n');
  viejo.parentNode.replaceChild(nuevo, viejo);
  nuevo.addEventListener('click', compraDescargarCompleto);
}

window.renderCompra = renderCompra;
window.compraPermiso = compraPermiso;
window.compraTienePermiso = compraTienePermiso;
window.addEventListener('DOMContentLoaded', compraRevisarRegreso);
