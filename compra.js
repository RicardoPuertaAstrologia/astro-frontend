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
    aprobadoTitulo: 'Pago aprobado',
    aprobadoTexto: 'Gracias. Tu informe completo ya está abierto en esta pantalla.',
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
    aprobadoTitulo: 'Payment approved',
    aprobadoTexto: 'Thank you. Your full report is now open on this screen.',
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
  .compra-aviso strong { display: block; margin-bottom: .2rem; }
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
  if (compraTienePermiso()) { cont.innerHTML = ''; return; }

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

function compraAviso(tipo, titulo, texto) {
  const destino = document.getElementById('compra-aviso-lugar')
    || document.getElementById('result-view')
    || document.body;
  const d = document.createElement('div');
  d.className = 'compra-aviso ' + tipo;
  d.innerHTML = `<strong>${titulo}</strong>${texto}`;
  destino.insertBefore(d, destino.firstChild);
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

  compraAviso('bien', t.aprobadoTitulo, t.aprobadoTexto);
}

window.renderCompra = renderCompra;
window.compraPermiso = compraPermiso;
window.compraTienePermiso = compraTienePermiso;
window.addEventListener('DOMContentLoaded', compraRevisarRegreso);
